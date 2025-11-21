import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      nav: { home: "Home", features: "Features", download: "Download", team: "Team", about: "About", login: "Login", logout: "Logout", admin: "Admin" },
      hero: { title: "Project Sleep", subtitle: "Experience the ultimate Android performance.", cta: "Download Now" },
      home: {
        cards: {
          sleepos_desc: "HyperOS-based stability with custom features.",
          aosp_desc: "Pure Android experience, clean and bloat-free.",
          port_desc: "Experience other OEM skins on your device."
        },
        explore: "Explore",
        community_title: "Community Driven.\nPerformance Focused.",
        community_desc: "Project Sleep starts where the manufacturer left off. We breathe new life into your device with optimized kernels, enhanced UI, and the latest security patches.",
        read_mission: "Read our mission"
      },
      features: {
        title: "Features",
        subtitle: "Discover what makes SleepOS unique.",
        add: "Add Feature",
        edit: "Edit Feature",
        delete: "Delete",
        save: "Save Feature",
        cancel: "Cancel",
        form: { title: "Title", image: "Image URL", desc: "Description" }
      },
      download: { 
        searchPlaceholder: "Search devices...", 
        filter: "Filter OS", 
        sort: "Sort", 
        notes: "Notes", 
        changelog: "Changelog",
        upload_build: "Upload Build",
        get: "Get",
        details: "Details",
        download_now: "Download Now",
        terms: "By downloading, you agree to our terms of use.",
        edit: "Edit ROM",
        save: "Save Changes"
      },
      team: { 
        title: "Our Team", 
        subtitle: "Meet the passionate minds behind Project Sleep.",
        apply: "Apply to Join",
        want_contribute: "Want to contribute? We are always looking for talent.",
        success_title: "Application Sent!",
        success_msg: "We will contact you shortly at your email address.",
        send_another: "Send another",
        form: {
          name: "Name",
          email: "Email",
          github: "GitHub / Portfolio",
          role: "Role Applying For",
          message: "Why do you want to join?",
          submit: "Submit Application",
          sending: "Sending...",
          roles: { developer: "Developer", designer: "Designer", maintainer: "Maintainer", community_manager: "Community Manager" }
        }
      },
      about: {
        title: "About Project Sleep",
        mission_title: "Our Mission",
        mission_desc: "Project Sleep aims to provide a seamless, stable, and highly performant Android experience. We believe that your device should sleep when you sleep—no battery drain, no lags, just pure performance when you need it. We combine the best features of various ROMs into a cohesive ecosystem.",
        community_title: "Community",
        community_desc: "We are driven by the community. Join our Discord or Telegram groups to chat with developers, report bugs, or just hang out with fellow enthusiasts.",
        opensource_title: "Open Source",
        opensource_desc: "We believe in transparency. Our code is open source and available on GitHub. Feel free to audit, contribute, or fork our repositories.",
        coc_title: "Code of Conduct",
        coc_desc: "We are committed to providing a friendly, safe and welcoming environment for all, regardless of gender, sexual orientation, ability, ethnicity, socioeconomic status, and religion (or lack thereof)."
      },
      login: {
        title: "Admin Access",
        subtitle: "Restricted area for authorized personnel only.",
        email: "Email Address",
        password: "Password",
        submit: "Login",
        verifying: "Verifying...",
        required: "Required"
      },
      common: { loading: "Loading...", error: "An error occurred" }
    }
  },
  id: { 
    translation: { 
      nav: { home: "Beranda", features: "Fitur", download: "Unduh", team: "Tim", about: "Tentang", login: "Masuk", logout: "Keluar", admin: "Admin" }, 
      hero: { title: "Proyek Sleep", subtitle: "Rasakan performa Android terbaik.", cta: "Unduh Sekarang" },
      home: {
        cards: {
          sleepos_desc: "Stabilitas berbasis HyperOS dengan fitur kustom.",
          aosp_desc: "Pengalaman Android murni, bersih dan tanpa bloatware.",
          port_desc: "Rasakan skin OEM lain di perangkat Anda."
        },
        explore: "Jelajahi",
        community_title: "Didorong Komunitas.\nFokus Performa.",
        community_desc: "Project Sleep dimulai di mana produsen berhenti. Kami menghidupkan kembali perangkat Anda dengan kernel yang dioptimalkan, UI yang ditingkatkan, dan patch keamanan terbaru.",
        read_mission: "Baca misi kami"
      },
      features: {
        title: "Fitur",
        subtitle: "Temukan keunikan SleepOS.",
        add: "Tambah Fitur",
        edit: "Edit Fitur",
        delete: "Hapus",
        save: "Simpan",
        cancel: "Batal",
        form: { title: "Judul", image: "URL Gambar", desc: "Deskripsi" }
      },
      download: { 
        searchPlaceholder: "Cari perangkat...", 
        filter: "Filter OS", 
        sort: "Urutkan", 
        notes: "Catatan", 
        changelog: "Log Perubahan",
        upload_build: "Unggah Build",
        get: "Unduh",
        details: "Detail",
        download_now: "Unduh Sekarang",
        terms: "Dengan mengunduh, Anda menyetujui ketentuan penggunaan kami.",
        edit: "Edit ROM",
        save: "Simpan Perubahan"
      },
      team: { 
        title: "Tim Kami", 
        subtitle: "Temui para pemikir penuh semangat di balik Project Sleep.",
        apply: "Lamar Bergabung",
        want_contribute: "Ingin berkontribusi? Kami selalu mencari bakat baru.",
        success_title: "Lamaran Terkirim!",
        success_msg: "Kami akan segera menghubungi Anda melalui email.",
        send_another: "Kirim lagi",
        form: {
          name: "Nama",
          email: "Email",
          github: "GitHub / Portofolio",
          role: "Posisi yang Dilamar",
          message: "Mengapa Anda ingin bergabung?",
          submit: "Kirim Lamaran",
          sending: "Mengirim...",
          roles: { developer: "Pengembang", designer: "Desainer", maintainer: "Pemelihara", community_manager: "Manajer Komunitas" }
        }
      },
      about: {
        title: "Tentang Project Sleep",
        mission_title: "Misi Kami",
        mission_desc: "Project Sleep bertujuan untuk memberikan pengalaman Android yang mulus, stabil, dan berkinerja tinggi. Kami percaya perangkat Anda harus tidur saat Anda tidur—tanpa baterai boros, tanpa lag, hanya performa murni saat dibutuhkan.",
        community_title: "Komunitas",
        community_desc: "Kami didorong oleh komunitas. Bergabunglah dengan grup Discord atau Telegram kami untuk mengobrol dengan pengembang, melaporkan bug, atau sekadar bersantai dengan sesama penggemar.",
        opensource_title: "Sumber Terbuka",
        opensource_desc: "Kami percaya pada transparansi. Kode kami open source dan tersedia di GitHub. Silakan audit, berkontribusi, atau fork repositori kami.",
        coc_title: "Kode Etik",
        coc_desc: "Kami berkomitmen untuk menyediakan lingkungan yang ramah, aman, dan menyambut bagi semua, tanpa memandang gender, orientasi seksual, kemampuan, etnis, status sosial ekonomi, dan agama."
      },
      login: {
        title: "Akses Admin",
        subtitle: "Area terbatas hanya untuk personel berwenang.",
        email: "Alamat Email",
        password: "Kata Sandi",
        submit: "Masuk",
        verifying: "Memverifikasi...",
        required: "Wajib diisi"
      },
      common: { loading: "Memuat...", error: "Terjadi kesalahan" }
    } 
  },
  hi: { 
    translation: { 
      nav: { home: "होम", features: "सुविधाएँ", download: "डाउनलोड", team: "टीम", about: "के बारे में", login: "लॉग इन", logout: "लॉग आउट", admin: "व्यवस्थापक" },
      hero: { title: "प्रोजेक्ट स्लीप", subtitle: "सर्वश्रेष्ठ एंड्रॉइड प्रदर्शन का अनुभव करें।", cta: "अभी डाउनलोड करें" },
      home: {
        cards: {
          sleepos_desc: "कस्टम सुविधाओं के साथ HyperOS-आधारित स्थिरता।",
          aosp_desc: "शुद्ध एंड्रॉइड अनुभव, स्वच्छ और बिना किसी ब्लोटवेयर के।",
          port_desc: "अपने डिवाइस पर अन्य OEM स्किन्स का अनुभव करें।"
        },
        explore: "अन्वेषण करें",
        community_title: "समुदाय संचालित।\nप्रदर्शन केंद्रित।",
        community_desc: "प्रोजेक्ट स्लीप वहीं से शुरू होता है जहां निर्माता ने छोड़ा था। हम अनुकूलित कर्नेल और बेहतर यूआई के साथ आपके डिवाइस में नई जान डालते हैं।",
        read_mission: "हमारा मिशन पढ़ें"
      },
      features: {
        title: "सुविधाएँ",
        subtitle: "जानें कि SleepOS को क्या खास बनाता है।",
        add: "सुविधा जोड़ें",
        edit: "सुविधा संपादित करें",
        delete: "हटाएं",
        save: "सहेजें",
        cancel: "रद्द करें",
        form: { title: "शीर्षक", image: "छवि URL", desc: "विवरण" }
      },
      download: { 
        searchPlaceholder: "उपकरण खोजें...", 
        filter: "OS फ़िल्टर करें", 
        sort: "क्रमबद्ध करें", 
        notes: "नोट्स", 
        changelog: "परिवर्तन सूची",
        upload_build: "बिल्ड अपलोड करें",
        get: "प्राप्त करें",
        details: "विवरण",
        download_now: "अभी डाउनलोड करें",
        terms: "डाउनलोड करके, आप हमारी उपयोग की शर्तों से सहमत हैं।",
        edit: "ROM संपादित करें",
        save: "परिवर्तन सहेजें"
      },
      team: { 
        title: "हमारी टीम", 
        subtitle: "प्रोजेक्ट स्लीप के पीछे के उत्साही लोगों से मिलें।",
        apply: "शामिल होने के लिए आवेदन करें",
        want_contribute: "योगदान देना चाहते हैं? हम हमेशा प्रतिभा की तलाश में रहते हैं।",
        success_title: "आवेदन भेजा गया!",
        success_msg: "हम शीघ्र ही आपके ईमेल पर संपर्क करेंगे।",
        send_another: "दूसरा भेजें",
        form: {
          name: "नाम",
          email: "ईमेल",
          github: "गिटहब / पोर्टफोलियो",
          role: "किस भूमिका के लिए आवेदन कर रहे हैं",
          message: "आप क्यों शामिल होना चाहते हैं?",
          submit: "आवेदन जमा करें",
          sending: "भेजा जा रहा है...",
          roles: { developer: "डेवलपर", designer: "डिजाइनर", maintainer: "मेंटेनर", community_manager: "कम्युनिटी मैनेजर" }
        }
      },
      about: {
        title: "प्रोजेक्ट स्लीप के बारे में",
        mission_title: "हमारा मिशन",
        mission_desc: "प्रोजेक्ट स्लीप का उद्देश्य एक सहज, स्थिर और उच्च प्रदर्शन वाला एंड्रॉइड अनुभव प्रदान करना है। हम मानते हैं कि जब आप सोते हैं तो आपके डिवाइस को भी सोना चाहिए - कोई बैटरी ड्रेन नहीं, कोई लैग नहीं।",
        community_title: "समुदाय",
        community_desc: "हम समुदाय द्वारा संचालित हैं। डेवलपर्स के साथ चैट करने या बग रिपोर्ट करने के लिए हमारे डिस्कॉर्ड या टेलीग्राम समूहों में शामिल हों।",
        opensource_title: "ओपन सोर्स",
        opensource_desc: "हम पारदर्शिता में विश्वास करते हैं। हमारा कोड गिटहब पर ओपन सोर्स और उपलब्ध है।",
        coc_title: "आचार संहिता",
        coc_desc: "हम लिंग, यौन अभिविन्यास, क्षमता, जातीयता, सामाजिक-आर्थिक स्थिति और धर्म की परवाह किए बिना सभी के लिए एक अनुकूल और सुरक्षित वातावरण प्रदान करने के लिए प्रतिबद्ध हैं।"
      },
      login: {
        title: "व्यवस्थापक एक्सेस",
        subtitle: "केवल अधिकृत कर्मियों के लिए प्रतिबंधित क्षेत्र।",
        email: "ईमेल पता",
        password: "पासवर्ड",
        submit: "लॉग इन",
        verifying: "सत्यापन हो रहा है...",
        required: "आवश्यक"
      },
      common: { loading: "लोड हो रहा है...", error: "एक त्रुटि हुई" }
    } 
  },
  ru: { 
    translation: { 
      nav: { home: "Главная", features: "Функции", download: "Скачать", team: "Команда", about: "О нас", login: "Вход", logout: "Выход", admin: "Админ" },
      hero: { title: "Project Sleep", subtitle: "Испытайте максимальную производительность Android.", cta: "Скачать сейчас" },
      home: {
        cards: {
          sleepos_desc: "Стабильность на базе HyperOS с кастомными функциями.",
          aosp_desc: "Чистый опыт Android, без лишних программ.",
          port_desc: "Попробуйте оболочки других производителей на своем устройстве."
        },
        explore: "Изучить",
        community_title: "Управляется сообществом.\nФокус на производительности.",
        community_desc: "Project Sleep начинается там, где заканчивает производитель. Мы вдыхаем новую жизнь в ваше устройство с оптимизированными ядрами и улучшенным интерфейсом.",
        read_mission: "Читать нашу миссию"
      },
      features: {
        title: "Функции",
        subtitle: "Узнайте, что делает SleepOS уникальной.",
        add: "Добавить функцию",
        edit: "Редактировать",
        delete: "Удалить",
        save: "Сохранить",
        cancel: "Отмена",
        form: { title: "Название", image: "URL изображения", desc: "Описание" }
      },
      download: { 
        searchPlaceholder: "Поиск устройств...", 
        filter: "Фильтр ОС", 
        sort: "Сортировка", 
        notes: "Заметки", 
        changelog: "Список изменений",
        upload_build: "Загрузить сборку",
        get: "Скачать",
        details: "Детали",
        download_now: "Скачать сейчас",
        terms: "Скачивая, вы соглашаетесь с нашими условиями использования.",
        edit: "Ред. ROM",
        save: "Сохранить изменения"
      },
      team: { 
        title: "Наша Команда", 
        subtitle: "Познакомьтесь с энтузиастами Project Sleep.",
        apply: "Подать заявку",
        want_contribute: "Хотите внести свой вклад? Мы всегда ищем таланты.",
        success_title: "Заявка отправлена!",
        success_msg: "Мы свяжемся с вами в ближайшее время по электронной почте.",
        send_another: "Отправить еще",
        form: {
          name: "Имя",
          email: "Email",
          github: "GitHub / Портфолио",
          role: "Желаемая роль",
          message: "Почему вы хотите присоединиться?",
          submit: "Отправить заявку",
          sending: "Отправка...",
          roles: { developer: "Разработчик", designer: "Дизайнер", maintainer: "Мейнтейнер", community_manager: "Комьюнити-менеджер" }
        }
      },
      about: {
        title: "О Project Sleep",
        mission_title: "Наша Миссия",
        mission_desc: "Project Sleep стремится обеспечить плавный, стабильный и высокопроизводительный опыт Android. Мы считаем, что ваше устройство должно спать, когда спите вы — без разряда батареи и лагов.",
        community_title: "Сообщество",
        community_desc: "Мы движимы сообществом. Присоединяйтесь к нашим группам в Discord или Telegram, чтобы общаться с разработчиками и сообщать об ошибках.",
        opensource_title: "Открытый исходный код",
        opensource_desc: "Мы верим в прозрачность. Наш код открыт и доступен на GitHub. Не стесняйтесь проверять, вносить свой вклад или форкать наши репозитории.",
        coc_title: "Кодекс поведения",
        coc_desc: "Мы стремимся обеспечить дружелюбную и безопасную среду для всех, независимо от пола, ориентации, способностей, этнической принадлежности и религии."
      },
      login: {
        title: "Вход для админа",
        subtitle: "Доступ только для авторизованного персонала.",
        email: "Email адрес",
        password: "Пароль",
        submit: "Войти",
        verifying: "Проверка...",
        required: "Обязательно"
      },
      common: { loading: "Загрузка...", error: "Произошла ошибка" }
    } 
  },
  th: { 
    translation: { 
      nav: { home: "หน้าแรก", features: "คุณสมบัติ", download: "ดาวน์โหลด", team: "ทีมงาน", about: "เกี่ยวกับ", login: "เข้าสู่ระบบ", logout: "ออกจากระบบ", admin: "ผู้ดูแล" },
      hero: { title: "Project Sleep", subtitle: "สัมผัสประสิทธิภาพ Android ขั้นสูงสุด", cta: "ดาวน์โหลดเลย" },
      home: {
        cards: {
          sleepos_desc: "ความเสถียรบนพื้นฐาน HyperOS พร้อมฟีเจอร์ปรับแต่ง",
          aosp_desc: "ประสบการณ์ Android แท้ สะอาดและไม่มีโปรแกรมขยะ",
          port_desc: "สัมผัสประสบการณ์สกิน OEM อื่นๆ บนอุปกรณ์ของคุณ"
        },
        explore: "สำรวจ",
        community_title: "ขับเคลื่อนโดยชุมชน\nมุ่งเน้นประสิทธิภาพ",
        community_desc: "Project Sleep เริ่มต้นในจุดที่ผู้ผลิตหยุด เรามอบชีวิตใหม่ให้อุปกรณ์ของคุณด้วยเคอร์เนลที่ปรับแต่งมาอย่างดีและแพตช์ความปลอดภัยล่าสุด",
        read_mission: "อ่านพันธกิจของเรา"
      },
      features: {
        title: "คุณสมบัติ",
        subtitle: "ค้นพบสิ่งที่ทำให้ SleepOS ไม่เหมือนใคร",
        add: "เพิ่มคุณสมบัติ",
        edit: "แก้ไข",
        delete: "ลบ",
        save: "บันทึก",
        cancel: "ยกเลิก",
        form: { title: "ชื่อ", image: "URL รูปภาพ", desc: "คำอธิบาย" }
      },
      download: { 
        searchPlaceholder: "ค้นหาอุปกรณ์...", 
        filter: "กรอง OS", 
        sort: "เรียงลำดับ", 
        notes: "หมายเหตุ", 
        changelog: "บันทึกการเปลี่ยนแปลง",
        upload_build: "อัปโหลดบิลด์",
        get: "รับ",
        details: "รายละเอียด",
        download_now: "ดาวน์โหลดเลย",
        terms: "การดาวน์โหลดถือว่าคุณยอมรับข้อกำหนดการใช้งานของเรา",
        edit: "แก้ไข ROM",
        save: "บันทึกการเปลี่ยนแปลง"
      },
      team: { 
        title: "ทีมงานของเรา", 
        subtitle: "พบกับผู้ที่มีใจรักเบื้องหลัง Project Sleep",
        apply: "สมัครเข้าร่วม",
        want_contribute: "ต้องการมีส่วนร่วม? เรามองหาผู้มีความสามารถเสมอ",
        success_title: "ส่งใบสมัครแล้ว!",
        success_msg: "เราจะติดต่อคุณทางอีเมลในไม่ช้า",
        send_another: "ส่งอีกครั้ง",
        form: {
          name: "ชื่อ",
          email: "อีเมล",
          github: "GitHub / พอร์ตโฟลิโอ",
          role: "บทบาทที่สมัคร",
          message: "ทำไมคุณถึงอยากเข้าร่วม?",
          submit: "ส่งใบสมัคร",
          sending: "กำลังส่ง...",
          roles: { developer: "นักพัฒนา", designer: "นักออกแบบ", maintainer: "ผู้ดูแล", community_manager: "ผู้จัดการชุมชน" }
        }
      },
      about: {
        title: "เกี่ยวกับ Project Sleep",
        mission_title: "พันธกิจของเรา",
        mission_desc: "Project Sleep มุ่งหวังที่จะมอบประสบการณ์ Android ที่ลื่นไหล เสถียร และมีประสิทธิภาพสูง เราเชื่อว่าอุปกรณ์ของคุณควรหลับเมื่อคุณหลับ—ไม่มีแบตไหล ไม่มีแลค",
        community_title: "ชุมชน",
        community_desc: "เราขับเคลื่อนโดยชุมชน เข้าร่วมกลุ่ม Discord หรือ Telegram ของเราเพื่อพูดคุยกับนักพัฒนา หรือรายงานข้อผิดพลาด",
        opensource_title: "โอเพ่นซอร์ส",
        opensource_desc: "เราเชื่อในความโปร่งใส โค้ดของเราเป็นโอเพ่นซอร์สและมีอยู่บน GitHub",
        coc_title: "จรรยาบรรณ",
        coc_desc: "เรามุ่งมั่นที่จะจัดสภาพแวดล้อมที่เป็นมิตร ปลอดภัย และต้อนรับทุกคน ไม่ว่าเพศ รสนิยมทางเพศ หรือเชื้อชาติ"
      },
      login: {
        title: "เข้าสู่ระบบแอดมิน",
        subtitle: "พื้นที่จำกัดสำหรับเจ้าหน้าที่ที่ได้รับอนุญาตเท่านั้น",
        email: "ที่อยู่อีเมล",
        password: "รหัสผ่าน",
        submit: "เข้าสู่ระบบ",
        verifying: "กำลังตรวจสอบ...",
        required: "จำเป็น"
      },
      common: { loading: "กำลังโหลด...", error: "เกิดข้อผิดพลาด" }
    } 
  },
  vi: { 
    translation: { 
      nav: { home: "Trang chủ", features: "Tính năng", download: "Tải xuống", team: "Đội ngũ", about: "Giới thiệu", login: "Đăng nhập", logout: "Đăng xuất", admin: "Quản trị" },
      hero: { title: "Project Sleep", subtitle: "Trải nghiệm hiệu năng Android tối thượng.", cta: "Tải xuống ngay" },
      home: {
        cards: {
          sleepos_desc: "Ổn định dựa trên HyperOS với các tính năng tùy chỉnh.",
          aosp_desc: "Trải nghiệm Android thuần khiết, sạch sẽ và không bloatware.",
          port_desc: "Trải nghiệm giao diện OEM khác trên thiết bị của bạn."
        },
        explore: "Khám phá",
        community_title: "Cộng đồng làm chủ.\nTập trung hiệu năng.",
        community_desc: "Project Sleep bắt đầu từ nơi nhà sản xuất dừng lại. Chúng tôi thổi luồng sinh khí mới vào thiết bị của bạn với kernel được tối ưu hóa và giao diện người dùng nâng cao.",
        read_mission: "Đọc sứ mệnh của chúng tôi"
      },
      features: {
        title: "Tính năng",
        subtitle: "Khám phá điều làm nên sự độc đáo của SleepOS.",
        add: "Thêm tính năng",
        edit: "Sửa",
        delete: "Xóa",
        save: "Lưu",
        cancel: "Hủy",
        form: { title: "Tiêu đề", image: "URL Hình ảnh", desc: "Mô tả" }
      },
      download: { 
        searchPlaceholder: "Tìm thiết bị...", 
        filter: "Lọc OS", 
        sort: "Sắp xếp", 
        notes: "Ghi chú", 
        changelog: "Nhật ký thay đổi",
        upload_build: "Tải lên bản dựng",
        get: "Tải",
        details: "Chi tiết",
        download_now: "Tải xuống ngay",
        terms: "Bằng cách tải xuống, bạn đồng ý với điều khoản sử dụng của chúng tôi.",
        edit: "Sửa ROM",
        save: "Lưu thay đổi"
      },
      team: { 
        title: "Đội ngũ của chúng tôi", 
        subtitle: "Gặp gỡ những tâm hồn nhiệt huyết đằng sau Project Sleep.",
        apply: "Ứng tuyển",
        want_contribute: "Muốn đóng góp? Chúng tôi luôn tìm kiếm tài năng.",
        success_title: "Đã gửi đơn!",
        success_msg: "Chúng tôi sẽ sớm liên hệ với bạn qua email.",
        send_another: "Gửi lại",
        form: {
          name: "Tên",
          email: "Email",
          github: "GitHub / Portfolio",
          role: "Vị trí ứng tuyển",
          message: "Tại sao bạn muốn tham gia?",
          submit: "Gửi đơn",
          sending: "Đang gửi...",
          roles: { developer: "Lập trình viên", designer: "Nhà thiết kế", maintainer: "Người bảo trì", community_manager: "Quản lý cộng đồng" }
        }
      },
      about: {
        title: "Về Project Sleep",
        mission_title: "Sứ mệnh của chúng tôi",
        mission_desc: "Project Sleep nhằm cung cấp trải nghiệm Android mượt mà, ổn định và hiệu năng cao. Chúng tôi tin rằng thiết bị của bạn nên ngủ khi bạn ngủ—không hao pin, không giật lag.",
        community_title: "Cộng đồng",
        community_desc: "Chúng tôi được thúc đẩy bởi cộng đồng. Tham gia nhóm Discord hoặc Telegram của chúng tôi để trò chuyện với các nhà phát triển.",
        opensource_title: "Mã nguồn mở",
        opensource_desc: "Chúng tôi tin vào sự minh bạch. Mã nguồn của chúng tôi là mở và có sẵn trên GitHub.",
        coc_title: "Quy tắc ứng xử",
        coc_desc: "Chúng tôi cam kết cung cấp một môi trường thân thiện, an toàn và chào đón tất cả mọi người."
      },
      login: {
        title: "Truy cập quản trị",
        subtitle: "Khu vực hạn chế chỉ dành cho nhân viên được ủy quyền.",
        email: "Địa chỉ Email",
        password: "Mật khẩu",
        submit: "Đăng nhập",
        verifying: "Đang xác minh...",
        required: "Bắt buộc"
      },
      common: { loading: "Đang tải...", error: "Đã xảy ra lỗi" }
    } 
  },
  ar: { 
    translation: { 
      nav: { home: "الرئيسية", features: "الميزات", download: "تنزيل", team: "الفريق", about: "حول", login: "دخول", logout: "خروج", admin: "مسؤول" },
      hero: { title: "مشروع سليب", subtitle: "جرب أداء أندرويد الفائق.", cta: "تحميل الآن" },
      home: {
        cards: {
          sleepos_desc: "استقرار مبني على HyperOS مع ميزات مخصصة.",
          aosp_desc: "تجربة أندرويد خام، نظيفة وخالية من البرامج الزائدة.",
          port_desc: "جرب واجهات الشركات الأخرى على جهازك."
        },
        explore: "استكشف",
        community_title: "مدفوع بالمجتمع.\nيركز على الأداء.",
        community_desc: "يبدأ مشروع سليب من حيث توقفت الشركة المصنعة. نبث حياة جديدة في جهازك مع نواة محسنة وواجهة مستخدم مطورة وتحديثات أمان.",
        read_mission: "اقرأ مهمتنا"
      },
      features: {
        title: "الميزات",
        subtitle: "اكتشف ما يجعل SleepOS فريداً.",
        add: "إضافة ميزة",
        edit: "تعديل",
        delete: "حذف",
        save: "حفظ",
        cancel: "إلغاء",
        form: { title: "العنوان", image: "رابط الصورة", desc: "الوصف" }
      },
      download: { 
        searchPlaceholder: "بحث عن الأجهزة...", 
        filter: "تصفية النظام", 
        sort: "ترتيب", 
        notes: "ملاحظات", 
        changelog: "سجل التغييرات",
        upload_build: "رفع إصدار",
        get: "تحميل",
        details: "تفاصيل",
        download_now: "تحميل الآن",
        terms: "بالتحميل، أنت توافق على شروط الاستخدام.",
        edit: "تعديل",
        save: "حفظ التغييرات"
      },
      team: { 
        title: "فريقنا", 
        subtitle: "تعرف على العقول الشغوفة خلف مشروع سليب.",
        apply: "تقدم للانضمام",
        want_contribute: "تريد المساهمة؟ نحن دائما نبحث عن المواهب.",
        success_title: "تم إرسال الطلب!",
        success_msg: "سنتصل بك قريبا عبر البريد الإلكتروني.",
        send_another: "إرسال آخر",
        form: {
          name: "الاسم",
          email: "البريد الإلكتروني",
          github: "جيت هب / معرض الأعمال",
          role: "الدور المطلوب",
          message: "لماذا تريد الانضمام؟",
          submit: "إرسال الطلب",
          sending: "جار الإرسال...",
          roles: { developer: "مطور", designer: "مصمم", maintainer: "مشرف", community_manager: "مدير مجتمع" }
        }
      },
      about: {
        title: "حول مشروع سليب",
        mission_title: "مهمتنا",
        mission_desc: "يهدف مشروع سليب لتوفير تجربة أندرويد سلسة ومستقرة وعالية الأداء. نؤمن أن جهازك يجب أن ينام عندما تنام.",
        community_title: "المجتمع",
        community_desc: "نحن مدفوعون بالمجتمع. انضم إلى مجموعات Discord أو Telegram للدردشة مع المطورين.",
        opensource_title: "مفتوح المصدر",
        opensource_desc: "نؤمن بالشفافية. الكود الخاص بنا مفتوح المصدر ومتاح على GitHub.",
        coc_title: "قواعد السلوك",
        coc_desc: "نحن ملتزمون بتوفير بيئة ودية وآمنة ومرحبة للجميع."
      },
      login: {
        title: "دخول المسؤول",
        subtitle: "منطقة محظورة للموظفين المصرح لهم فقط.",
        email: "البريد الإلكتروني",
        password: "كلمة المرور",
        submit: "دخول",
        verifying: "جار التحقق...",
        required: "مطلوب"
      },
      common: { loading: "جار التحميل...", error: "حدث خطأ" }
    } 
  },
  ka: { 
    translation: { 
      nav: { home: "მთავარი", features: "ფუნქციები", download: "ჩამოტვირთვა", team: "გუნდი", about: "შესახებ", login: "შესვლა", logout: "გასვლა", admin: "ადმინი" },
      hero: { title: "Project Sleep", subtitle: "გამოცადეთ Android-ის უმაღლესი წარმადობა.", cta: "ჩამოტვირთეთ ახლა" },
      home: {
        cards: {
          sleepos_desc: "HyperOS-ზე დაფუძნებული სტაბილურობა მორგებული ფუნქციებით.",
          aosp_desc: "სუფთა Android გამოცდილება, ზედმეტი პროგრამების გარეშე.",
          port_desc: "გამოცადეთ სხვა OEM სკინები თქვენს მოწყობილობაზე."
        },
        explore: "დათვალიერება",
        community_title: "საზოგადოების მიერ მართული.\nწარმადობაზე ორიენტირებული.",
        community_desc: "Project Sleep იწყება იქ, სადაც მწარმოებელი ჩერდება. ჩვენ ახალ სიცოცხლეს ვბერავთ თქვენს მოწყობილობას ოპტიმიზებული ბირთვებითა და გაუმჯობესებული UI-ით.",
        read_mission: "წაიკითხეთ ჩვენი მისია"
      },
      features: {
        title: "ფუნქციები",
        subtitle: "აღმოაჩინეთ რა ხდის SleepOS-ს უნიკალურს.",
        add: "ფუნქციის დამატება",
        edit: "რედაქტირება",
        delete: "წაშლა",
        save: "შენახვა",
        cancel: "გაუქმება",
        form: { title: "სათაური", image: "სურათის URL", desc: "აღწერა" }
      },
      download: { 
        searchPlaceholder: "მოწყობილობების ძებნა...", 
        filter: "OS ფილტრი", 
        sort: "დალაგება", 
        notes: "შენიშვნები", 
        changelog: "ცვლილებების სია",
        upload_build: "ატვირთვა",
        get: "მიღება",
        details: "დეტალები",
        download_now: "ჩამოტვირთვა",
        terms: "ჩამოტვირთვით თქვენ ეთანხმებით მოხმარების წესებს.",
        edit: "რედაქტირება",
        save: "შენახვა"
      },
      team: { 
        title: "ჩვენი გუნდი", 
        subtitle: "გაიცანით Project Sleep-ის ენთუზიასტები.",
        apply: "შემოუერთდით გუნდს",
        want_contribute: "გსურთ წვლილის შეტანა? ჩვენ ყოველთვის ვეძებთ ნიჭიერ ხალხს.",
        success_title: "განაცხადი გაიგზავნა!",
        success_msg: "ჩვენ მალე დაგიკავშირდებით ელფოსტაზე.",
        send_another: "სხვა განაცხადის გაგზავნა",
        form: {
          name: "სახელი",
          email: "ელფოსტა",
          github: "GitHub / პორტფოლიო",
          role: "სასურველი როლი",
          message: "რატომ გსურთ შემოერთება?",
          submit: "გაგზავნა",
          sending: "იგზავნება...",
          roles: { developer: "დეველოპერი", designer: "დიზაინერი", maintainer: "მეინთეინერი", community_manager: "კომუნიტი მენეჯერი" }
        }
      },
      about: {
        title: "Project Sleep-ის შესახებ",
        mission_title: "ჩვენი მისია",
        mission_desc: "Project Sleep-ის მიზანია უზრუნველყოს Android-ის გლუვი, სტაბილური და მაღალი წარმადობის გამოცდილება.",
        community_title: "საზოგადოება",
        community_desc: "ჩვენ გვმართავს საზოგადოება. შემოუერთდით ჩვენს Discord ან Telegram ჯგუფებს.",
        opensource_title: "ღია კოდი",
        opensource_desc: "ჩვენ გვჯერა გამჭვირვალობის. ჩვენი კოდი ღიაა და ხელმისაწვდომია GitHub-ზე.",
        coc_title: "ქცევის კოდექსი",
        coc_desc: "ჩვენ ვალდებულნი ვართ უზრუნველვყოთ მეგობრული და უსაფრთხო გარემო ყველასთვის."
      },
      login: {
        title: "ადმინისტრატორის წვდომა",
        subtitle: "მხოლოდ ავტორიზებული პერსონალისთვის.",
        email: "ელფოსტა",
        password: "პაროლი",
        submit: "შესვლა",
        verifying: "მოწმდება...",
        required: "აუცილებელია"
      },
      common: { loading: "იტვირთება...", error: "დაფიქსირდა შეცდომა" }
    } 
  },
  bn: { 
    translation: { 
      nav: { home: "হোম", features: "বৈশিষ্ট্য", download: "ডাউনলোড", team: "দল", about: "সম্পর্কে", login: "লগইন", logout: "লগআউট", admin: "অ্যাডমিন" },
      hero: { title: "প্রজেক্ট স্লিপ", subtitle: "সেরা অ্যান্ড্রয়েড পারফরম্যান্সের অভিজ্ঞতা নিন।", cta: "এখনই ডাউনলোড করুন" },
      home: {
        cards: {
          sleepos_desc: "কাস্টম বৈশিষ্ট্য সহ HyperOS-ভিত্তিক স্থিতিশীলতা।",
          aosp_desc: "বিশুদ্ধ অ্যান্ড্রয়েড অভিজ্ঞতা, পরিষ্কার এবং ব্লোটওয়্যার মুক্ত।",
          port_desc: "আপনার ডিভাইসে অন্যান্য OEM স্কিন অভিজ্ঞতা নিন।"
        },
        explore: "অন্বেষণ",
        community_title: "কমিউনিটি চালিত।\nপারফরম্যান্স ফোকাসড।",
        community_desc: "প্রজেক্ট স্লিপ সেখান থেকেই শুরু হয় যেখানে নির্মাতা থামেন। আমরা অপ্টিমাইজড কার্নেল এবং উন্নত ইউআই দিয়ে আপনার ডিভাইসে নতুন প্রাণ দিই।",
        read_mission: "আমাদের মিশন পড়ুন"
      },
      features: {
        title: "বৈশিষ্ট্য",
        subtitle: "জানুন SleepOS কে কী অনন্য করে তোলে।",
        add: "বৈশিষ্ট্য যোগ করুন",
        edit: "সম্পাদনা",
        delete: "মুছুন",
        save: "সংরক্ষণ করুন",
        cancel: "বাতিল",
        form: { title: "শিরোনাম", image: "ছবির URL", desc: "বিবরণ" }
      },
      download: { 
        searchPlaceholder: "ডিভাইস খুঁজুন...", 
        filter: "OS ফিল্টার", 
        sort: "বাছাই", 
        notes: "নোট", 
        changelog: "পরিবর্তন লগ",
        upload_build: "বিল্ড আপলোড করুন",
        get: "পান",
        details: "বিবরণ",
        download_now: "এখনই ডাউনলোড করুন",
        terms: "ডাউনলোড করে, আপনি আমাদের ব্যবহারের শর্তাবলীতে সম্মত হন।",
        edit: "ROM সম্পাদনা",
        save: "পরিবর্তন সংরক্ষণ"
      },
      team: { 
        title: "আমাদের দল", 
        subtitle: "প্রজেক্ট স্লিপের পেছনের উৎসাহিত মানুষদের সাথে পরিচিত হন।",
        apply: "যোগদানের জন্য আবেদন করুন",
        want_contribute: "অবদান রাখতে চান? আমরা সবসময় প্রতিভা খুঁজছি।",
        success_title: "আবেদন পাঠানো হয়েছে!",
        success_msg: "আমরা শীঘ্রই আপনার ইমেলে যোগাযোগ করব।",
        send_another: "আরেকটি পাঠান",
        form: {
          name: "নাম",
          email: "ইমেল",
          github: "গিটহাব / পোর্টফোলিও",
          role: "আবেদনকৃত ভূমিকা",
          message: "কেন আপনি যোগ দিতে চান?",
          submit: "আবেদন জমা দিন",
          sending: "পাঠানো হচ্ছে...",
          roles: { developer: "ডেভেলপার", designer: "ডিজাইনার", maintainer: "মেইনটেইনার", community_manager: "কমিউনিটি ম্যানেজার" }
        }
      },
      about: {
        title: "প্রজেক্ট স্লিপ সম্পর্কে",
        mission_title: "আমাদের মিশন",
        mission_desc: "প্রজেক্ট স্লিপের লক্ষ্য হল একটি মসৃণ, স্থিতিশীল এবং উচ্চ কার্যক্ষম অ্যান্ড্রয়েড অভিজ্ঞতা প্রদান করা। আমরা বিশ্বাস করি যখন আপনি ঘুমান তখন আপনার ডিভাইসেরও ঘুমানো উচিত।",
        community_title: "কমিউনিটি",
        community_desc: "আমরা কমিউনিটি দ্বারা চালিত। ডেভেলপারদের সাথে চ্যাট করতে আমাদের ডিসকর্ড বা টেলিগ্রাম গ্রুপে যোগ দিন।",
        opensource_title: "ওপেন সোর্স",
        opensource_desc: "আমরা স্বচ্ছতায় বিশ্বাস করি। আমাদের কোড ওপেন সোর্স এবং গিটহাবে উপলব্ধ।",
        coc_title: "আচরণবিধি",
        coc_desc: "আমরা লিঙ্গ, যৌন অভিমুখিতা, সক্ষমতা, জাতিসত্তা এবং ধর্ম নির্বিশেষে সবার জন্য একটি বন্ধুত্বপূর্ণ এবং নিরাপদ পরিবেশ প্রদান করতে প্রতিশ্রুতিবদ্ধ।"
      },
      login: {
        title: "অ্যাডমিন অ্যাক্সেস",
        subtitle: "শুধুমাত্র অনুমোদিত কর্মীদের জন্য সংরক্ষিত এলাকা।",
        email: "ইমেল ঠিকানা",
        password: "পাসওয়ার্ড",
        submit: "লগইন",
        verifying: "যাচাই করা হচ্ছে...",
        required: "প্রয়োজন"
      },
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