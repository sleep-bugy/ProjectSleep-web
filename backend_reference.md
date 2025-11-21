# Project Sleep - Backend Reference Implementation (Arch Linux & VS Code)

This document contains the necessary code and setup instructions to create the Laravel backend, specifically tailored for an **Arch Linux** environment and **Visual Studio Code** workflow.

## 1. Arch Linux Setup & Installation

Arch Linux requires manual configuration of PHP extensions and services.

### Step 1.1: Install Dependencies
Open your terminal (or VS Code terminal) and run:

```bash
# Update system
sudo pacman -Syu

# Install PHP, Composer, and MariaDB (MySQL drop-in replacement)
sudo pacman -S php composer mariadb git unzip
```

### Step 1.2: Configure MariaDB
1.  Initialize the database directory:
    ```bash
    sudo mariadb-install-db --user=mysql --basedir=/usr
    ```
2.  Start and enable the service:
    ```bash
    sudo systemctl enable --now mariadb
    ```
3.  Secure the installation (set root password, remove anonymous users):
    ```bash
    sudo mariadb-secure-installation
    ```
    *Follow the prompts. Remember the root password you set.*

4.  Create the database:
    ```bash
    mariadb -u root -p
    # Enter password
    CREATE DATABASE project_sleep;
    EXIT;
    ```

### Step 1.3: Configure PHP
On Arch, extensions are disabled by default. You must enable them.

1.  Open `php.ini`:
    ```bash
    sudo nano /etc/php/php.ini
    # OR use VS Code if you have permissions: code /etc/php/php.ini
    ```
2.  **Uncomment** (remove `;`) the following lines to enable extensions required by Laravel:
    ```ini
    extension=bcmath
    extension=curl
    extension=iconv
    extension=mysqli
    extension=pdo_mysql
    extension=zip
    extension=gd
    ```
3.  Save and exit.

---

## 2. VS Code Workflow & Project Init

### Step 2.1: Create Project
Navigate to your workspace folder and create the project:

```bash
composer create-project laravel/laravel project-sleep-backend
cd project-sleep-backend
```

### Step 2.2: Open in VS Code
```bash
code .
```

### Recommended VS Code Extensions
Search for and install these extensions for a better experience:
1.  **PHP Intelephense** (Ben Mewburn) - Essential PHP intelligence.
2.  **Laravel Extra Intellisense** (Amir) - Autocomplete for routes, views, etc.
3.  **DotENV** (mikestead) - Syntax highlighting for `.env` files.

### Step 2.3: Install Sanctum (Auth)
Open the VS Code integrated terminal (`Ctrl + ` `) and run:
```bash
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
```

### Step 2.4: Environment Config
Open `.env` file in the editor and update the database section:
```ini
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=project_sleep
DB_USERNAME=root
DB_PASSWORD=YOUR_MARIADB_PASSWORD

# Allow Frontend Access
FRONTEND_URL=http://localhost:3000
```

---

## 3. Database Migrations

Create the tables. Run in VS Code terminal:
`php artisan make:migration create_project_sleep_tables`

Open the newly created file in `database/migrations/` and paste:

```php
<?php

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
        
        // Add 'role' to users table
        if (!Schema::hasColumn('users', 'role')) {
            Schema::table('users', function (Blueprint $table) {
                $table->string('role')->default('user');
            });
        }
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

Run the migration:
```bash
php artisan migrate
```

---

## 4. API Routes & Controllers

### Step 4.1: Routes
Open `routes/api.php` and replace contents with:

```php
<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DeviceController;
use App\Http\Controllers\RomController;
use App\Http\Controllers\FeatureController;
use App\Http\Controllers\TeamController;

// Auth
Route::post('/login', [AuthController::class, 'login']);

// Public Read
Route::get('/devices', [DeviceController::class, 'index']);
Route::get('/roms', [RomController::class, 'index']);
Route::get('/roms/{id}', [RomController::class, 'show']);
Route::get('/features', [FeatureController::class, 'index']);
Route::get('/team', [TeamController::class, 'index']);
Route::post('/applications', [TeamController::class, 'apply']);

// Admin Protected
Route::middleware(['auth:sanctum', 'ability:admin'])->group(function () {
    // ROMs
    Route::post('/roms', [RomController::class, 'store']);
    Route::put('/roms/{id}', [RomController::class, 'update']);
    Route::delete('/roms/{id}', [RomController::class, 'destroy']);

    // Devices
    Route::post('/devices', [DeviceController::class, 'store']);
    Route::put('/devices/{id}', [DeviceController::class, 'update']);
    
    // Features
    Route::post('/features', [FeatureController::class, 'store']);
    Route::put('/features/{id}', [FeatureController::class, 'update']);
    Route::delete('/features/{id}', [FeatureController::class, 'destroy']);

    // Applications
    Route::get('/admin/applications', [TeamController::class, 'getApplications']);
    Route::put('/admin/applications/{id}/status', [TeamController::class, 'updateStatus']);
});
```

### Step 4.2: Create Controllers
Run in terminal:
```bash
php artisan make:controller AuthController
php artisan make:controller DeviceController
php artisan make:controller RomController
php artisan make:controller FeatureController
php artisan make:controller TeamController
```

**`app/Http/Controllers/AuthController.php`**:
```php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AuthController extends Controller {
    public function login(Request $request) {
        $creds = $request->validate(['email' => 'required|email', 'password' => 'required']);
        if (Auth::attempt($creds)) {
            $user = Auth::user();
            if ($user->role !== 'admin') return response()->json(['message' => 'Unauthorized'], 403);
            $token = $user->createToken('admin', ['admin'])->plainTextToken;
            return response()->json(['user' => $user, 'token' => $token]);
        }
        return response()->json(['message' => 'Invalid credentials'], 401);
    }
}
```

**`app/Http/Controllers/RomController.php`**:
```php
namespace App\Http\Controllers;
use App\Models\Rom;
use Illuminate\Http\Request;

class RomController extends Controller {
    public function index(Request $request) {
        $query = Rom::with('device');
        if ($request->q) {
            $q = $request->q;
            $query->where('title', 'like', "%$q%")
                  ->orWhereHas('device', fn($d) => $d->where('name', 'like', "%$q%"));
        }
        if ($request->types) {
            $query->whereIn('os_type', explode(',', $request->types));
        }
        return response()->json(['data' => $query->latest('upload_date')->get()]);
    }
    public function store(Request $request) {
        $data = $request->validate([
            'device_id' => 'required', 'title' => 'required', 'version' => 'required',
            'os_type' => 'required', 'file_size' => 'required', 'download_url' => 'required',
            'changelog' => 'required', 'checksum' => 'nullable', 'notes' => 'nullable'
        ]);
        $data['upload_date'] = now();
        return response()->json(['data' => Rom::create($data)], 201);
    }
    public function update(Request $request, $id) {
        Rom::findOrFail($id)->update($request->all());
        return response()->json(['success' => true]);
    }
    public function destroy($id) {
        Rom::destroy($id);
        return response()->json(['success' => true]);
    }
}
```

*(Note: You will need to fill in DeviceController, FeatureController, and TeamController similarly with basic CRUD operations)*

---

## 5. Models

Ensure `app/Models/Rom.php` looks like this:
```php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Rom extends Model {
    protected $guarded = [];
    public function device() { return $this->belongsTo(Device::class); }
}
```
*(Repeat for Device, Feature, TeamMember, TeamApplication)*

---

## 6. Create Admin User

Open `database/seeders/DatabaseSeeder.php`:
```php
public function run(): void
{
    \App\Models\User::create([
        'name' => 'Admin',
        'email' => 'admin@projectsleep.com',
        'password' => bcrypt('admin'), // Change this!
        'role' => 'admin',
    ]);
}
```
Run: `php artisan db:seed`

---

## 7. Run the Server

In VS Code terminal:
```bash
php artisan serve
```

Your backend is now live at `http://localhost:8000`.
Set `USE_MOCK_API = false` in your frontend's `services/api.ts` to connect.
