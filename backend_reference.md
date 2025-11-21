# Project Sleep - Backend Reference Implementation

This document contains the necessary code to set up a Laravel backend compatible with the Project Sleep frontend.

## 1. Installation & Setup

### Requirements
- PHP 8.1+
- Composer
- MySQL / PostgreSQL
- Laravel 10+

### Init Project
```bash
composer create-project laravel/laravel project-sleep-backend
cd project-sleep-backend
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
```

### .env Configuration
Configure your database credentials in `.env`:
```ini
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=project_sleep
DB_USERNAME=root
DB_PASSWORD=admin123

FRONTEND_URL=http://localhost:3000
```

---

## 2. Database Migrations

Run `php artisan make:migration create_project_sleep_tables`. Copy content below:

```php
// database/migrations/xxxx_xx_xx_create_project_sleep_tables.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('devices', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('model')->unique(); // Codename e.g., 'cepheus'
            $table->string('manufacturer');
            $table->string('photo')->nullable();
            $table->timestamps();
        });

        Schema::create('roms', function (Blueprint $table) {
            $table->id();
            $table->foreignId('device_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->string('version');
            $table->enum('os_type', ['SleepOS', 'AOSP', 'Port']);
            $table->string('file_size');
            $table->string('download_url');
            $table->string('checksum')->nullable();
            $table->text('changelog');
            $table->text('notes')->nullable();
            $table->date('upload_date');
            $table->integer('download_count')->default(0);
            $table->timestamps();
        });

        Schema::create('features', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->string('image_url');
            $table->timestamps();
        });

        Schema::create('team_members', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('role');
            $table->string('country_code', 2);
            $table->string('avatar')->nullable();
            $table->timestamps();
        });

        Schema::create('team_applications', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('role');
            $table->string('github')->nullable();
            $table->text('message');
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->timestamps();
        });
        
        // Add 'role' to users table (modify default migration or add here)
        Schema::table('users', function (Blueprint $table) {
            $table->string('role')->default('user'); // 'admin' or 'user'
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('team_applications');
        Schema::dropIfExists('team_members');
        Schema::dropIfExists('features');
        Schema::dropIfExists('roms');
        Schema::dropIfExists('devices');
    }
};
```

Run migrations:
```bash
php artisan migrate
```

---

## 3. API Routes

**`routes/api.php`**

```php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DeviceController;
use App\Http\Controllers\RomController;
use App\Http\Controllers\FeatureController;
use App\Http\Controllers\TeamController;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/
Route::post('/login', [AuthController::class, 'login']);

Route::get('/devices', [DeviceController::class, 'index']);
Route::get('/roms', [RomController::class, 'index']);
Route::get('/roms/{id}', [RomController::class, 'show']);
Route::get('/features', [FeatureController::class, 'index']);
Route::get('/team', [TeamController::class, 'index']);
Route::post('/applications', [TeamController::class, 'apply']);

/*
|--------------------------------------------------------------------------
| Protected Admin Routes
|--------------------------------------------------------------------------
*/
Route::middleware(['auth:sanctum', 'ability:admin'])->group(function () {
    
    // ROM Management
    Route::post('/roms', [RomController::class, 'store']);
    Route::put('/roms/{id}', [RomController::class, 'update']);
    Route::delete('/roms/{id}', [RomController::class, 'destroy']);

    // Device Management
    Route::post('/devices', [DeviceController::class, 'store']);
    Route::put('/devices/{id}', [DeviceController::class, 'update']);

    // Feature Management
    Route::post('/features', [FeatureController::class, 'store']);
    Route::put('/features/{id}', [FeatureController::class, 'update']);
    Route::delete('/features/{id}', [FeatureController::class, 'destroy']);

    // Application Management
    Route::get('/admin/applications', [TeamController::class, 'getApplications']);
    Route::put('/admin/applications/{id}/status', [TeamController::class, 'updateStatus']);
});
```

---

## 4. Controllers

### AuthController

```php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            // Only admins can login to dashboard
            if ($user->role !== 'admin') {
                return response()->json(['message' => 'Unauthorized'], 403);
            }
            
            $token = $user->createToken('admin-token', ['admin'])->plainTextToken;

            return response()->json([
                'user' => [
                    'id' => $user->id,
                    'email' => $user->email,
                    'role' => $user->role
                ],
                'token' => $token
            ]);
        }

        return response()->json(['message' => 'Invalid credentials'], 401);
    }
}
```

### RomController

```php
namespace App\Http\Controllers;

use App\Models\Rom;
use Illuminate\Http\Request;

class RomController extends Controller
{
    public function index(Request $request)
    {
        $query = Rom::with('device');

        if ($request->has('q')) {
            $search = $request->q;
            $query->where('title', 'like', "%{$search}%")
                  ->orWhereHas('device', function($q) use ($search) {
                      $q->where('name', 'like', "%{$search}%")
                        ->orWhere('model', 'like', "%{$search}%");
                  });
        }

        if ($request->has('types')) {
            $types = explode(',', $request->types);
            $query->whereIn('os_type', $types);
        }

        return response()->json(['data' => $query->orderBy('upload_date', 'desc')->get()]);
    }

    public function store(Request $request)
    {
        // Validation logic here...
        $rom = Rom::create([
            'device_id' => $request->deviceId,
            'title' => $request->title,
            'version' => $request->version,
            'os_type' => $request->osType,
            'file_size' => $request->fileSize,
            'download_url' => $request->downloadUrl,
            'checksum' => $request->checksum,
            'changelog' => $request->changelog,
            'notes' => $request->notes,
            'upload_date' => now(),
        ]);

        return response()->json(['data' => $rom], 201);
    }

    // Implement update, destroy similarly...
}
```

---

## 5. Seeding Admin User

In `database/seeders/DatabaseSeeder.php`:

```php
public function run(): void
{
    \App\Models\User::create([
        'name' => 'Admin',
        'email' => 'admin@projectsleep.com',
        'password' => bcrypt('admin'),
        'role' => 'admin',
    ]);
}
```

Run: `php artisan db:seed`

---

## 6. CORS Configuration

To allow the React frontend to talk to the backend, update `config/cors.php`:

```php
'paths' => ['api/*', 'sanctum/csrf-cookie'],
'allowed_methods' => ['*'],
'allowed_origins' => ['http://localhost:3000'], // React port
'allowed_headers' => ['*'],
'supports_credentials' => true,
```

## 7. Serving

Start the Laravel server:
```bash
php artisan serve
```
This will default to `http://127.0.0.1:8000`. The React app is configured to look for the API here.
