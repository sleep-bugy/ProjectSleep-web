import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      nav: { home: "Home", features: "Features", download: "Download", team: "Team", about: "About", login: "Login", logout: "Logout", admin: "Admin" },
      hero: { title: "Project Sleep", subtitle: "Experience the ultimate Android performance.", cta: "Download Now" },
      download: { searchPlaceholder: "Search devices...", filter: "Filter OS", sort: "Sort", notes: "Notes", changelog: "Changelog" },
      team: { title: "Our Team", apply: "Apply to Join" },
      common: { loading: "Loading...", error: "An error occurred" }
    }
  },
  id: { 
    translation: { 
      nav: { home: "Beranda", features: "Fitur", download: "Unduh", team: "Tim", about: "Tentang", login: "Masuk", logout: "Keluar", admin: "Admin" }, 
      hero: { title: "Proyek Sleep", subtitle: "Rasakan performa Android terbaik.", cta: "Unduh Sekarang" },
      download: { searchPlaceholder: "Cari perangkat...", filter: "Filter OS", sort: "Urutkan", notes: "Catatan", changelog: "Log Perubahan" },
      team: { title: "Tim Kami", apply: "Lamar Bergabung" },
      common: { loading: "Memuat...", error: "Terjadi kesalahan" }
    } 
  },
  hi: { 
    translation: { 
      nav: { home: "होम", features: "सुविधाएँ", download: "डाउनलोड", team: "टीम", about: "के बारे में", login: "लॉग इन", logout: "लॉग आउट", admin: "व्यवस्थापक" },
      hero: { title: "प्रोजेक्ट स्लीप", subtitle: "सर्वश्रेष्ठ एंड्रॉइड प्रदर्शन का अनुभव करें।", cta: "अभी डाउनलोड करें" },
      download: { searchPlaceholder: "उपकरण खोजें...", filter: "OS फ़िल्टर करें", sort: "क्रमबद्ध करें", notes: "नोट्स", changelog: "परिवर्तन सूची" },
      team: { title: "हमारी टीम", apply: "शामिल होने के लिए आवेदन करें" },
      common: { loading: "लोड हो रहा है...", error: "एक त्रुटि हुई" }
    } 
  },
  ru: { 
    translation: { 
      nav: { home: "Главная", features: "Функции", download: "Скачать", team: "Команда", about: "О нас", login: "Вход", logout: "Выход", admin: "Админ" },
      hero: { title: "Project Sleep", subtitle: "Испытайте максимальную производительность Android.", cta: "Скачать сейчас" },
      download: { searchPlaceholder: "Поиск устройств...", filter: "Фильтр ОС", sort: "Сортировка", notes: "Заметки", changelog: "Список изменений" },
      team: { title: "Наша Команда", apply: "Подать заявку" },
      common: { loading: "Загрузка...", error: "Произошла ошибка" }
    } 
  },
  th: { 
    translation: { 
      nav: { home: "หน้าแรก", features: "คุณสมบัติ", download: "ดาวน์โหลด", team: "ทีมงาน", about: "เกี่ยวกับ", login: "เข้าสู่ระบบ", logout: "ออกจากระบบ", admin: "ผู้ดูแล" },
      hero: { title: "Project Sleep", subtitle: "สัมผัสประสิทธิภาพ Android ขั้นสูงสุด", cta: "ดาวน์โหลดเลย" },
      download: { searchPlaceholder: "ค้นหาอุปกรณ์...", filter: "กรอง OS", sort: "เรียงลำดับ", notes: "หมายเหตุ", changelog: "บันทึกการเปลี่ยนแปลง" },
      team: { title: "ทีมงานของเรา", apply: "สมัครเข้าร่วม" },
      common: { loading: "กำลังโหลด...", error: "เกิดข้อผิดพลาด" }
    } 
  },
  vi: { 
    translation: { 
      nav: { home: "Trang chủ", features: "Tính năng", download: "Tải xuống", team: "Đội ngũ", about: "Giới thiệu", login: "Đăng nhập", logout: "Đăng xuất", admin: "Quản trị" },
      hero: { title: "Project Sleep", subtitle: "Trải nghiệm hiệu năng Android tối thượng.", cta: "Tải xuống ngay" },
      download: { searchPlaceholder: "Tìm thiết bị...", filter: "Lọc OS", sort: "Sắp xếp", notes: "Ghi chú", changelog: "Nhật ký thay đổi" },
      team: { title: "Đội ngũ của chúng tôi", apply: "Ứng tuyển" },
      common: { loading: "Đang tải...", error: "Đã xảy ra lỗi" }
    } 
  },
  ar: { 
    translation: { 
      nav: { home: "الرئيسية", features: "الميزات", download: "تنزيل", team: "الفريق", about: "حول", login: "دخول", logout: "خروج", admin: "مسؤول" },
      hero: { title: "مشروع سليب", subtitle: "جرب أداء أندرويد الفائق.", cta: "تحميل الآن" },
      download: { searchPlaceholder: "بحث عن الأجهزة...", filter: "تصفية النظام", sort: "ترتيب", notes: "ملاحظات", changelog: "سجل التغييرات" },
      team: { title: "فريقنا", apply: "تقدم للانضمام" },
      common: { loading: "جار التحميل...", error: "حدث خطأ" }
    } 
  },
  ka: { 
    translation: { 
      nav: { home: "მთავარი", features: "ფუნქციები", download: "ჩამოტვირთვა", team: "გუნდი", about: "შესახებ", login: "შესვლა", logout: "გასვლა", admin: "ადმინი" },
      hero: { title: "Project Sleep", subtitle: "გამოცადეთ Android-ის უმაღლესი წარმადობა.", cta: "ჩამოტვირთეთ ახლა" },
      download: { searchPlaceholder: "მოწყობილობების ძებნა...", filter: "OS ფილტრი", sort: "დალაგება", notes: "შენიშვნები", changelog: "ცვლილებების სია" },
      team: { title: "ჩვენი გუნდი", apply: "შემოუერთდით გუნდს" },
      common: { loading: "იტვირთება...", error: "დაფიქსირდა შეცდომა" }
    } 
  },
  bn: { 
    translation: { 
      nav: { home: "হোম", features: "বৈশিষ্ট্য", download: "ডাউনলোড", team: "দল", about: "সম্পর্কে", login: "লগইন", logout: "লগআউট", admin: "অ্যাডমিন" },
      hero: { title: "প্রজেক্ট স্লিপ", subtitle: "সেরা অ্যান্ড্রয়েড পারফরম্যান্সের অভিজ্ঞতা নিন।", cta: "এখনই ডাউনলোড করুন" },
      download: { searchPlaceholder: "ডিভাইস খুঁজুন...", filter: "OS ফিল্টার", sort: "বাছাই", notes: "নোট", changelog: "পরিবর্তন লগ" },
      team: { title: "আমাদের দল", apply: "যোগদানের জন্য আবেদন করুন" },
      common: { loading: "লোড হচ্ছে...", error: "একটি ত্রুটি ঘটেছে" }
    } 
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;