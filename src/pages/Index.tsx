import { useState } from "react";
import Icon from "@/components/ui/icon";


type Section = "home" | "news" | "study" | "educator" | "methodical" | "events" | "schedule" | "cabinet";

const NAV_ITEMS = [
  { id: "home", label: "Главная", icon: "Home" },
  { id: "news", label: "Новости", icon: "Newspaper" },
  { id: "study", label: "Учебная деятельность", icon: "BookOpen" },
  { id: "educator", label: "Воспитательная деятельность", icon: "Heart" },
  { id: "methodical", label: "Методическая деятельность", icon: "FileText" },
  { id: "events", label: "Мероприятия", icon: "Calendar" },
  { id: "schedule", label: "Расписание", icon: "Clock" },
  { id: "cabinet", label: "Личный кабинет", icon: "User" },
] as const;

const HERO_IMAGE = "https://cdn.poehali.dev/projects/f50c38c5-ff43-4ce5-add8-b1154e599888/files/0ffcf3b4-a294-4716-b429-2fb92212c4df.jpg";
const SCHEDULE_IMAGE = "https://cdn.poehali.dev/projects/f50c38c5-ff43-4ce5-add8-b1154e599888/files/efefb61f-3255-484d-b11d-ff3cb3340bf5.jpg";

export default function Index() {
  const [active, setActive] = useState<Section>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f6f7fb] font-body">
      {/* Top Header */}
      <header className="mesh-bg text-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-edu-orange flex items-center justify-center">
              <Icon name="GraduationCap" size={22} className="text-white" />
            </div>
            <div>
              <h1 className="font-display font-black text-lg leading-tight">ЭдуПлатформа</h1>
              <p className="text-xs text-white/60">Система онлайн-обучения</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setActive("cabinet")}
              className="flex items-center gap-2 px-4 py-2 glass rounded-xl text-sm font-semibold hover:bg-white/15 transition-all"
            >
              <Icon name="User" size={16} />
              Войти
            </button>
          </div>
          <button
            className="md:hidden glass p-2 rounded-xl"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="max-w-7xl mx-auto px-4 pb-0">
          <div className="hidden md:flex gap-1 overflow-x-auto pb-0">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => setActive(item.id as Section)}
                className={`flex items-center gap-2 px-4 py-3 rounded-t-xl text-sm font-semibold whitespace-nowrap transition-all ${
                  active === item.id
                    ? "bg-[#f6f7fb] text-[#0f0c29]"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon name={item.icon} size={15} />
                {item.label}
              </button>
            ))}
          </div>
          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-2 flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setActive(item.id as Section); setMobileMenuOpen(false); }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all text-left ${
                    active === item.id ? "bg-edu-orange text-white" : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Icon name={item.icon} size={16} />
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </nav>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {active === "home" && <HomePage onNavigate={setActive} />}
        {active === "news" && <NewsPage />}
        {active === "study" && <StudyPage />}
        {active === "educator" && <EducatorPage />}
        {active === "methodical" && <MethodicalPage />}
        {active === "events" && <EventsPage />}
        {active === "schedule" && <SchedulePage />}
        {active === "cabinet" && <CabinetPage />}
      </main>

      {/* Footer */}
      <footer className="mesh-bg text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-edu-orange flex items-center justify-center">
                <Icon name="GraduationCap" size={18} className="text-white" />
              </div>
              <span className="font-display font-bold text-lg">ЭдуПлатформа</span>
            </div>
            <p className="text-white/60 text-sm">Современная образовательная платформа для студентов и преподавателей</p>
          </div>
          <div>
            <p className="font-semibold mb-3 text-white/80">Разделы</p>
            <div className="flex flex-col gap-2">
              {NAV_ITEMS.slice(0, 4).map(i => (
                <button key={i.id} onClick={() => setActive(i.id as Section)} className="text-white/60 hover:text-white text-sm text-left transition-colors">{i.label}</button>
              ))}
            </div>
          </div>
          <div>
            <p className="font-semibold mb-3 text-white/80">Контакты</p>
            <div className="flex flex-col gap-2 text-white/60 text-sm">
              <span className="flex items-center gap-2"><Icon name="Phone" size={14} />+7 (800) 000-00-00</span>
              <span className="flex items-center gap-2"><Icon name="Mail" size={14} />info@eduplatform.ru</span>
              <span className="flex items-center gap-2"><Icon name="MapPin" size={14} />г. Москва, ул. Образования, 1</span>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 max-w-7xl mx-auto px-4 py-4 text-center text-white/40 text-xs">
          © 2026 ЭдуПлатформа. Все права защищены.
        </div>
      </footer>
    </div>
  );
}

/* ===== HOME PAGE ===== */
function HomePage({ onNavigate }: { onNavigate: (s: Section) => void }) {
  const stats = [
    { value: "1 200+", label: "Студентов" },
    { value: "48", label: "Курсов" },
    { value: "120", label: "Уроков" },
    { value: "98%", label: "Довольных" },
  ];

  const quickCards = [
    { id: "study", icon: "BookOpen", label: "Учебная деятельность", desc: "Курсы, уроки, задания", color: "gradient-card-orange" },
    { id: "educator", icon: "Heart", label: "Воспитательная деятельность", desc: "Развитие и наставничество", color: "gradient-card-blue" },
    { id: "methodical", icon: "FileText", label: "Методическая деятельность", desc: "Материалы и разработки", color: "gradient-card-purple" },
    { id: "events", icon: "Calendar", label: "Мероприятия", desc: "События и олимпиады", color: "gradient-card-green" },
    { id: "schedule", icon: "Clock", label: "Расписание занятий", desc: "Календарь учебных событий", color: "gradient-card-pink" },
    { id: "news", icon: "Newspaper", label: "Новости", desc: "Актуальные события", color: "gradient-card-orange" },
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <div className="relative rounded-3xl overflow-hidden mb-10 min-h-[340px] flex items-end">
        <img src={HERO_IMAGE} alt="hero" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0c29] via-[#0f0c29]/50 to-transparent" />
        <div className="relative z-10 p-8 md:p-12 max-w-2xl">
          <span className="inline-block px-3 py-1 rounded-full bg-edu-orange text-white text-xs font-bold uppercase tracking-wider mb-4">Добро пожаловать</span>
          <h2 className="font-display font-black text-3xl md:text-5xl text-white leading-tight mb-4">
            Образование нового поколения
          </h2>
          <p className="text-white/80 text-lg mb-6">
            Современная платформа для обучения, развития и достижения новых вершин
          </p>
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => onNavigate("study")}
              className="px-6 py-3 bg-edu-orange text-white rounded-xl font-bold hover:bg-orange-500 transition-all hover-lift"
            >
              Начать обучение
            </button>
            <button
              onClick={() => onNavigate("schedule")}
              className="px-6 py-3 glass text-white rounded-xl font-bold hover:bg-white/20 transition-all"
            >
              Расписание
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-6 text-center shadow-sm hover-lift">
            <div className="stat-number text-4xl mb-1">{s.value}</div>
            <div className="text-muted-foreground text-sm font-medium">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Nav Cards */}
      <h3 className="font-display font-bold text-2xl text-foreground mb-5">Разделы платформы</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {quickCards.map((card) => (
          <button
            key={card.id}
            onClick={() => onNavigate(card.id as Section)}
            className={`${card.color} text-white rounded-2xl p-6 text-left hover-lift group`}
          >
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4 group-hover:bg-white/30 transition-all">
              <Icon name={card.icon} size={24} className="text-white" />
            </div>
            <h4 className="font-display font-bold text-lg leading-tight mb-1">{card.label}</h4>
            <p className="text-white/75 text-sm">{card.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ===== NEWS PAGE ===== */
function NewsPage() {
  const news = [
    { date: "02 июня 2026", tag: "Важное", title: "Начало нового учебного модуля", desc: "Со 2 июня стартует третий модуль по математике и информатике. Студентам необходимо подтвердить участие до 5 июня.", color: "bg-edu-orange" },
    { date: "28 мая 2026", tag: "Событие", title: "Межшкольная олимпиада по физике", desc: "Поздравляем участников олимпиады! Результаты опубликованы в личных кабинетах.", color: "bg-edu-blue" },
    { date: "20 мая 2026", tag: "Обновление", title: "Новые курсы по программированию", desc: "На платформе появились 8 новых курсов по Python, JavaScript и основам алгоритмов.", color: "bg-edu-purple" },
    { date: "15 мая 2026", tag: "Мероприятие", title: "День открытых дверей — онлайн", desc: "Приглашаем родителей и студентов на онлайн-день открытых дверей 20 мая в 15:00.", color: "bg-edu-green" },
  ];

  return (
    <div className="animate-fade-in">
      <PageHeader icon="Newspaper" title="Новости" subtitle="Актуальные события и объявления платформы" />
      <div className="grid gap-5">
        {news.map((n, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 shadow-sm hover-lift flex gap-5">
            <div className={`w-1.5 rounded-full ${n.color} flex-shrink-0`} />
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-white text-[10px] font-bold uppercase tracking-wider ${n.color}`}>{n.tag}</span>
                <span className="text-muted-foreground text-sm">{n.date}</span>
              </div>
              <h3 className="font-display font-bold text-lg text-foreground mb-2">{n.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{n.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ===== STUDY PAGE ===== */
function StudyPage() {
  const courses = [
    { name: "Математика. Модуль 3", teacher: "Иванова Н.А.", progress: 65, lessons: 12, color: "bg-edu-orange" },
    { name: "Информатика и ИКТ", teacher: "Петров С.В.", progress: 40, lessons: 8, color: "bg-edu-blue" },
    { name: "Физика. Механика", teacher: "Сидорова Е.М.", progress: 80, lessons: 15, color: "bg-edu-purple" },
    { name: "История России", teacher: "Козлов А.Д.", progress: 20, lessons: 10, color: "bg-edu-green" },
    { name: "Английский язык", teacher: "Смирнова И.П.", progress: 55, lessons: 20, color: "bg-edu-pink" },
  ];

  return (
    <div className="animate-fade-in">
      <PageHeader icon="BookOpen" title="Учебная деятельность" subtitle="Курсы, уроки и учебные материалы" />
      <div className="grid gap-4">
        {courses.map((c, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 shadow-sm hover-lift">
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl ${c.color} flex items-center justify-center flex-shrink-0`}>
                <Icon name="BookOpen" size={22} className="text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <h3 className="font-display font-bold text-base text-foreground">{c.name}</h3>
                    <p className="text-muted-foreground text-sm">{c.teacher} · {c.lessons} уроков</p>
                  </div>
                  <span className="text-sm font-bold text-foreground">{c.progress}%</span>
                </div>
                <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${c.color} transition-all`}
                    style={{ width: `${c.progress}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">Прогресс курса</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ===== EDUCATOR PAGE ===== */
function EducatorPage() {
  const activities = [
    { icon: "Users", title: "Классный час «Мы — команда»", date: "10 июня 2026", type: "Групповое", color: "gradient-card-blue" },
    { icon: "Heart", title: "Волонтёрский проект «Помощь рядом»", date: "15 июня 2026", type: "Социальное", color: "gradient-card-green" },
    { icon: "Star", title: "Конкурс «Лучший студент месяца»", date: "20 июня 2026", type: "Конкурс", color: "gradient-card-orange" },
    { icon: "Smile", title: "Психологический тренинг «Уверенность»", date: "25 июня 2026", type: "Тренинг", color: "gradient-card-purple" },
  ];

  return (
    <div className="animate-fade-in">
      <PageHeader icon="Heart" title="Воспитательная деятельность" subtitle="Мероприятия для развития личности студентов" />
      <div className="grid sm:grid-cols-2 gap-5">
        {activities.map((a, i) => (
          <div key={i} className={`${a.color} text-white rounded-2xl p-6 hover-lift`}>
            <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center mb-4">
              <Icon name={a.icon} size={22} className="text-white" />
            </div>
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider mb-3">{a.type}</span>
            <h3 className="font-display font-bold text-lg leading-tight mb-2">{a.title}</h3>
            <p className="text-white/75 text-sm flex items-center gap-1">
              <Icon name="CalendarDays" size={13} />
              {a.date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ===== METHODICAL PAGE ===== */
function MethodicalPage() {
  const docs = [
    { icon: "FileText", name: "Рабочая программа по математике", size: "1.2 МБ", type: "PDF", color: "text-edu-orange" },
    { icon: "FileText", name: "Методическое пособие по физике", size: "3.5 МБ", type: "PDF", color: "text-edu-blue" },
    { icon: "Presentation", name: "Презентация «Основы алгоритмов»", size: "8.7 МБ", type: "PPT", color: "text-edu-purple" },
    { icon: "FileText", name: "Программа воспитательной работы", size: "0.9 МБ", type: "DOCX", color: "text-edu-green" },
    { icon: "FileText", name: "Критерии оценивания работ", size: "0.4 МБ", type: "PDF", color: "text-edu-pink" },
    { icon: "Folder", name: "Банк заданий для контрольных работ", size: "5.1 МБ", type: "ZIP", color: "text-edu-orange" },
  ];

  return (
    <div className="animate-fade-in">
      <PageHeader icon="FileText" title="Методическая деятельность" subtitle="Учебно-методические материалы и разработки" />
      <div className="grid gap-3">
        {docs.map((d, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 shadow-sm hover-lift flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
              <Icon name={d.icon} size={22} className={d.color} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground text-sm">{d.name}</h3>
              <p className="text-muted-foreground text-xs mt-0.5">{d.type} · {d.size}</p>
            </div>
            <button className="flex items-center gap-1 text-xs font-semibold text-edu-orange hover:text-orange-600 transition-colors">
              <Icon name="Download" size={14} />
              Скачать
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ===== EVENTS PAGE ===== */
function EventsPage() {
  const events = [
    { date: "08 июн", day: "Вс", title: "Олимпиада по информатике", place: "Онлайн", time: "10:00–14:00", color: "border-edu-orange bg-orange-50" },
    { date: "12 июн", day: "Чт", title: "Научная конференция студентов", place: "Актовый зал", time: "13:00–17:00", color: "border-edu-blue bg-blue-50" },
    { date: "18 июн", day: "Ср", title: "День открытых уроков", place: "Все корпуса", time: "09:00–15:00", color: "border-edu-purple bg-purple-50" },
    { date: "22 июн", day: "Вс", title: "Спортивный фестиваль «Здоровье»", place: "Стадион", time: "11:00–16:00", color: "border-edu-green bg-green-50" },
    { date: "30 июн", day: "Пн", title: "Торжественное вручение дипломов", place: "Конференц-зал", time: "15:00–18:00", color: "border-edu-pink bg-pink-50" },
  ];

  return (
    <div className="animate-fade-in">
      <PageHeader icon="Calendar" title="Мероприятия" subtitle="Предстоящие события и мероприятия платформы" />
      <div className="grid gap-4">
        {events.map((e, i) => (
          <div key={i} className={`rounded-2xl p-5 border-l-4 ${e.color} hover-lift flex gap-5 items-start`}>
            <div className="text-center min-w-[52px]">
              <div className="font-display font-black text-2xl leading-none text-foreground">{e.date.split(" ")[0]}</div>
              <div className="text-muted-foreground text-xs uppercase font-semibold">{e.date.split(" ")[1]}</div>
              <div className="text-xs text-muted-foreground mt-1">{e.day}</div>
            </div>
            <div className="flex-1">
              <h3 className="font-display font-bold text-base text-foreground mb-1">{e.title}</h3>
              <div className="flex gap-4 text-sm text-muted-foreground flex-wrap">
                <span className="flex items-center gap-1"><Icon name="MapPin" size={13} />{e.place}</span>
                <span className="flex items-center gap-1"><Icon name="Clock" size={13} />{e.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ===== SCHEDULE PAGE ===== */
function SchedulePage() {
  const days = ["Пн", "Вт", "Ср", "Чт", "Пт"];
  const schedule: Record<string, { time: string; subject: string; teacher: string; room: string; color: string }[]> = {
    "Пн": [
      { time: "08:00", subject: "Математика", teacher: "Иванова Н.А.", room: "304", color: "border-edu-orange" },
      { time: "09:50", subject: "Физика", teacher: "Сидорова Е.М.", room: "201", color: "border-edu-blue" },
      { time: "11:40", subject: "Английский", teacher: "Смирнова И.П.", room: "105", color: "border-edu-purple" },
    ],
    "Вт": [
      { time: "08:00", subject: "Информатика", teacher: "Петров С.В.", room: "Компьютерный 1", color: "border-edu-green" },
      { time: "09:50", subject: "История", teacher: "Козлов А.Д.", room: "402", color: "border-edu-orange" },
      { time: "11:40", subject: "Физкультура", teacher: "Орлов К.Н.", room: "Спортзал", color: "border-edu-pink" },
    ],
    "Ср": [
      { time: "08:00", subject: "Математика", teacher: "Иванова Н.А.", room: "304", color: "border-edu-orange" },
      { time: "09:50", subject: "Английский", teacher: "Смирнова И.П.", room: "105", color: "border-edu-purple" },
      { time: "11:40", subject: "Химия", teacher: "Волкова Т.Р.", room: "Лаборатория", color: "border-edu-blue" },
      { time: "13:30", subject: "История", teacher: "Козлов А.Д.", room: "402", color: "border-edu-orange" },
    ],
    "Чт": [
      { time: "08:00", subject: "Физика", teacher: "Сидорова Е.М.", room: "201", color: "border-edu-blue" },
      { time: "09:50", subject: "Информатика", teacher: "Петров С.В.", room: "Компьютерный 1", color: "border-edu-green" },
      { time: "11:40", subject: "Математика", teacher: "Иванова Н.А.", room: "304", color: "border-edu-orange" },
    ],
    "Пт": [
      { time: "08:00", subject: "Английский", teacher: "Смирнова И.П.", room: "105", color: "border-edu-purple" },
      { time: "09:50", subject: "Физкультура", teacher: "Орлов К.Н.", room: "Спортзал", color: "border-edu-pink" },
      { time: "11:40", subject: "Химия", teacher: "Волкова Т.Р.", room: "Лаборатория", color: "border-edu-blue" },
    ],
  };

  const [selectedDay, setSelectedDay] = useState("Пн");

  return (
    <div className="animate-fade-in">
      <PageHeader icon="Clock" title="Расписание занятий" subtitle="Учебный календарь и расписание уроков" />

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          {/* Day Tabs */}
          <div className="flex gap-2 mb-5 flex-wrap">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  selectedDay === day
                    ? "bg-edu-orange text-white shadow-lg shadow-orange-200"
                    : "bg-white text-foreground hover:bg-muted"
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Lessons */}
          <div className="grid gap-3">
            {(schedule[selectedDay] || []).map((lesson, i) => (
              <div key={i} className={`schedule-card border-l-4 ${lesson.color} bg-white rounded-r-2xl p-5 shadow-sm`}>
                <div className="flex items-start gap-4">
                  <div className="text-center min-w-[56px]">
                    <div className="font-display font-bold text-sm text-foreground">{lesson.time}</div>
                    <div className="text-muted-foreground text-xs mt-0.5">{i + 1} урок</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-bold text-base text-foreground">{lesson.subject}</h3>
                    <div className="flex gap-4 text-sm text-muted-foreground mt-1 flex-wrap">
                      <span className="flex items-center gap-1"><Icon name="User" size={12} />{lesson.teacher}</span>
                      <span className="flex items-center gap-1"><Icon name="MapPin" size={12} />Каб. {lesson.room}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Calendar widget */}
        <div>
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover-lift">
            <img src={SCHEDULE_IMAGE} alt="Календарь" className="w-full h-44 object-cover" />
            <div className="p-5">
              <h4 className="font-display font-bold text-base mb-3">Ближайшие события</h4>
              <div className="flex flex-col gap-3">
                {[
                  { title: "Контрольная по математике", date: "08 июня", color: "bg-edu-orange" },
                  { title: "Научная конференция", date: "12 июня", color: "bg-edu-blue" },
                  { title: "Олимпиада онлайн", date: "18 июня", color: "bg-edu-purple" },
                ].map((ev, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${ev.color} flex-shrink-0`} />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-foreground leading-tight">{ev.title}</p>
                      <p className="text-xs text-muted-foreground">{ev.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===== CABINET PAGE ===== */
function CabinetPage() {
  return (
    <div className="animate-fade-in max-w-2xl mx-auto">
      <PageHeader icon="User" title="Личный кабинет" subtitle="Управление профилем и данными" />

      <div className="bg-white rounded-2xl p-8 shadow-sm mb-5">
        <div className="flex items-center gap-5 mb-6">
          <div className="w-20 h-20 rounded-2xl gradient-card-orange flex items-center justify-center text-white text-3xl font-display font-bold">
            АС
          </div>
          <div>
            <h3 className="font-display font-bold text-xl">Алексей Смирнов</h3>
            <p className="text-muted-foreground">Студент · 3-А группа</p>
            <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-bold">Активен</span>
          </div>
        </div>

        <div className="grid gap-4">
          {[
            { label: "Email", value: "a.smirnov@eduplatform.ru", icon: "Mail" },
            { label: "Телефон", value: "+7 (999) 123-45-67", icon: "Phone" },
            { label: "Группа", value: "3-А · Направление «ИТ»", icon: "Users" },
            { label: "Куратор", value: "Иванова Наталья Александровна", icon: "GraduationCap" },
          ].map((f, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-muted/50">
              <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center">
                <Icon name={f.icon} size={16} className="text-edu-orange" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">{f.label}</p>
                <p className="text-sm font-semibold text-foreground">{f.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-5">
        {[
          { label: "Выполнено заданий", value: "47", icon: "CheckCircle", color: "text-edu-green" },
          { label: "Средний балл", value: "4.7", icon: "Star", color: "text-edu-orange" },
          { label: "Дней посещений", value: "124", icon: "Calendar", color: "text-edu-blue" },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 text-center shadow-sm">
            <Icon name={s.icon} size={22} className={`${s.color} mx-auto mb-2`} />
            <div className="font-display font-bold text-2xl text-foreground">{s.value}</div>
            <div className="text-muted-foreground text-xs mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <button className="w-full py-3.5 bg-edu-orange text-white rounded-xl font-bold hover:bg-orange-500 transition-all hover-lift">
        Редактировать профиль
      </button>
    </div>
  );
}

/* ===== SHARED ===== */
function PageHeader({ icon, title, subtitle }: { icon: string; title: string; subtitle: string }) {
  return (
    <div className="mb-7 flex items-start gap-4">
      <div className="w-12 h-12 rounded-2xl gradient-card-orange flex items-center justify-center flex-shrink-0">
        <Icon name={icon} size={24} className="text-white" />
      </div>
      <div>
        <h2 className="font-display font-bold text-2xl text-foreground">{title}</h2>
        <p className="text-muted-foreground text-sm mt-0.5">{subtitle}</p>
      </div>
    </div>
  );
}