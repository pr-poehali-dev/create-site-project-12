import { useState } from "react";
import Icon from "@/components/ui/icon";

const AUTH_URL = "https://functions.poehali.dev/b91014b0-a2ba-41fc-a4c3-2b345cbe04c4";

type Section = "home" | "cabinet";

interface Teacher {
  name: string;
  subject: string;
  login: string;
  token: string;
}

const NAV_ITEMS = [
  { id: "home", label: "Главная", icon: "Home" },
  { id: "cabinet", label: "Личный кабинет", icon: "User" },
] as const;

const HERO_IMAGE = "https://cdn.poehali.dev/projects/f50c38c5-ff43-4ce5-add8-b1154e599888/files/0ffcf3b4-a294-4716-b429-2fb92212c4df.jpg";

export default function Index() {
  const [active, setActive] = useState<Section>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [showLogin, setShowLogin] = useState(false);

  const handleLogout = () => {
    if (teacher) {
      fetch(AUTH_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Session-Id": teacher.token },
        body: JSON.stringify({ action: "logout" }),
      });
    }
    setTeacher(null);
    setActive("home");
  };

  return (
    <div className="min-h-screen bg-[#f6f7fb] font-body">
      {/* Login Modal */}
      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onSuccess={(t) => { setTeacher(t); setShowLogin(false); setActive("cabinet"); }}
        />
      )}

      {/* Header */}
      <header className="mesh-bg text-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-edu-orange flex items-center justify-center">
              <Icon name="GraduationCap" size={22} className="text-white" />
            </div>
            <div>
              <h1 className="font-display font-black text-lg leading-tight">Электронная учительская</h1>
              <p className="text-xs text-white/60">Система онлайн-обучения</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-3">
            {teacher ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 glass rounded-xl text-sm">
                  <Icon name="User" size={15} />
                  <span className="font-semibold">{teacher.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 glass rounded-xl text-sm font-semibold hover:bg-white/15 transition-all"
                >
                  <Icon name="LogOut" size={15} />
                  Выйти
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                className="flex items-center gap-2 px-4 py-2 glass rounded-xl text-sm font-semibold hover:bg-white/15 transition-all"
              >
                <Icon name="LogIn" size={16} />
                Войти
              </button>
            )}
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
              {!teacher && (
                <button
                  onClick={() => { setShowLogin(true); setMobileMenuOpen(false); }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-white/70 hover:text-white hover:bg-white/10 text-left"
                >
                  <Icon name="LogIn" size={16} />Войти
                </button>
              )}
            </div>
          )}
        </nav>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {active === "home" && <HomePage onLogin={() => setShowLogin(true)} teacher={teacher} />}
        {active === "cabinet" && <CabinetPage teacher={teacher} onLogin={() => setShowLogin(true)} onLogout={handleLogout} />}
      </main>

      {/* Footer */}
      <footer className="mesh-bg text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-edu-orange flex items-center justify-center">
                <Icon name="GraduationCap" size={18} className="text-white" />
              </div>
              <span className="font-display font-bold text-lg">Электронная учительская</span>
            </div>
            <p className="text-white/60 text-sm">Современная образовательная платформа для учителей</p>
          </div>
          <div>
            <p className="font-semibold mb-3 text-white/80">Разделы</p>
            <div className="flex flex-col gap-2">
              {NAV_ITEMS.map(i => (
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
          © 2026 Электронная учительская. Все права защищены.
        </div>
      </footer>
    </div>
  );
}

/* ===== LOGIN MODAL ===== */
function LoginModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: (t: Teacher) => void }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(AUTH_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "login", login, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Ошибка входа");
      } else {
        onSuccess({ ...data, login });
      }
    } catch {
      setError("Ошибка соединения. Попробуйте ещё раз.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl animate-scale-in">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-xl hover:bg-muted transition-colors">
          <Icon name="X" size={18} className="text-muted-foreground" />
        </button>

        <div className="flex flex-col items-center mb-6">
          <div className="w-14 h-14 rounded-2xl gradient-card-orange flex items-center justify-center mb-3">
            <Icon name="GraduationCap" size={28} className="text-white" />
          </div>
          <h2 className="font-display font-black text-xl text-foreground">Вход для учителей</h2>
          <p className="text-muted-foreground text-sm mt-1">Введите данные вашего аккаунта</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">Логин</label>
            <div className="relative">
              <Icon name="User" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={login}
                onChange={e => setLogin(e.target.value)}
                placeholder="Ваш логин"
                className="w-full pl-9 pr-4 py-3 rounded-xl border border-border bg-muted/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-edu-orange focus:border-transparent transition-all"
                required
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">Пароль</label>
            <div className="relative">
              <Icon name="Lock" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Ваш пароль"
                className="w-full pl-9 pr-4 py-3 rounded-xl border border-border bg-muted/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-edu-orange focus:border-transparent transition-all"
                required
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 rounded-xl px-4 py-3">
              <Icon name="AlertCircle" size={15} />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-edu-orange text-white rounded-xl font-bold hover:bg-orange-500 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? <><Icon name="Loader" size={16} className="animate-spin" />Вход...</> : "Войти"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ===== HOME PAGE ===== */
function HomePage({ onLogin, teacher }: { onLogin: () => void; teacher: Teacher | null }) {
  return (
    <div className="animate-fade-in">
      <div className="relative rounded-3xl overflow-hidden min-h-[420px] flex items-end">
        <img src={HERO_IMAGE} alt="hero" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0c29] via-[#0f0c29]/50 to-transparent" />
        <div className="relative z-10 p-8 md:p-12 max-w-2xl">
          <span className="inline-block px-3 py-1 rounded-full bg-edu-orange text-white text-xs font-bold uppercase tracking-wider mb-4">Добро пожаловать</span>
          <h2 className="font-display font-black text-3xl md:text-5xl text-white leading-tight mb-4">
            Электронная учительская
          </h2>
          <p className="text-white/80 text-lg mb-6">
            Современная платформа для учителей — всё необходимое в одном месте
          </p>
          {!teacher && (
            <button
              onClick={onLogin}
              className="px-6 py-3 bg-edu-orange text-white rounded-xl font-bold hover:bg-orange-500 transition-all hover-lift"
            >
              Войти в систему
            </button>
          )}
          {teacher && (
            <div className="glass px-5 py-3 rounded-xl inline-flex items-center gap-2">
              <Icon name="CheckCircle" size={18} className="text-edu-green" />
              <span className="text-white font-semibold">Добро пожаловать, {teacher.name}!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ===== CABINET PAGE ===== */
function CabinetPage({ teacher, onLogin, onLogout }: { teacher: Teacher | null; onLogin: () => void; onLogout: () => void }) {
  if (!teacher) {
    return (
      <div className="animate-fade-in max-w-md mx-auto text-center py-16">
        <div className="w-20 h-20 rounded-3xl gradient-card-orange flex items-center justify-center mx-auto mb-5">
          <Icon name="Lock" size={36} className="text-white" />
        </div>
        <h2 className="font-display font-black text-2xl text-foreground mb-3">Личный кабинет</h2>
        <p className="text-muted-foreground mb-6">Войдите в систему, чтобы получить доступ к личному кабинету</p>
        <button
          onClick={onLogin}
          className="px-8 py-3.5 bg-edu-orange text-white rounded-xl font-bold hover:bg-orange-500 transition-all hover-lift"
        >
          Войти в систему
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in max-w-2xl mx-auto">
      <div className="mb-7 flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl gradient-card-orange flex items-center justify-center flex-shrink-0">
          <Icon name="User" size={24} className="text-white" />
        </div>
        <div>
          <h2 className="font-display font-bold text-2xl text-foreground">Личный кабинет</h2>
          <p className="text-muted-foreground text-sm mt-0.5">Данные вашего профиля</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-sm mb-5">
        <div className="flex items-center gap-5 mb-6">
          <div className="w-20 h-20 rounded-2xl gradient-card-orange flex items-center justify-center text-white text-3xl font-display font-bold">
            {teacher.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-display font-bold text-xl">{teacher.name}</h3>
            <p className="text-muted-foreground">{teacher.subject}</p>
            <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-bold">Активен</span>
          </div>
        </div>

        <div className="grid gap-4">
          {[
            { label: "Логин", value: teacher.login, icon: "User" },
            { label: "Предмет / Роль", value: teacher.subject, icon: "BookOpen" },
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

      <button
        onClick={onLogout}
        className="w-full py-3.5 border-2 border-border text-foreground rounded-xl font-bold hover:border-red-300 hover:text-red-600 hover:bg-red-50 transition-all flex items-center justify-center gap-2"
      >
        <Icon name="LogOut" size={16} />
        Выйти из системы
      </button>
    </div>
  );
}