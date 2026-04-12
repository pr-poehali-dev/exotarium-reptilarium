import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/488a9909-aede-49bf-ae6d-d32ad8f7bfae/files/caf7e8f3-b80a-41c9-9323-05d5e333709e.jpg";

const animals = [
  { emoji: "🦎", name: "Ящерицы", desc: "Гигантские зелёные красавцы. Дают себя гладить и любят тепло рук.", color: "bg-green-500" },
  { emoji: "🐍", name: "Удавы", desc: "Спокойные и ласковые. Можно подержать на шее!", color: "bg-teal-500" },
  { emoji: "🐢", name: "Черепахи", desc: "Медлительные мудрецы. Отлично подходят для детей.", color: "bg-purple-600" },
  { emoji: "🦎", name: "Гекконы", desc: "Маленькие и юркие. Умеют ходить по стенам и светятся яркими красками.", color: "bg-lime-500" },
];

const services = [
  { icon: "Users", title: "Групповые экскурсии", desc: "Для школ, детских садов и корпоративов. От 30 человек.", price: "от 300 ₽/чел" },
  { icon: "Home", title: "Наша резиденция", desc: "Приехать в гости в наш зоопарк и познакомиться с каждым. Будние дни — бесконтактный, в выходные и праздничные дни — контактный.", price: "500–800 ₽/чел" },
  { icon: "Truck", title: "Выездное шоу", desc: "Привезём животных к вам домой, в офис или на мероприятие.", price: "от 10 000 ₽" },
];

const prices = [
  { name: "Взрослый", price: "500 ₽", note: "Полный тариф" },
  { name: "Детский (3–12 лет)", price: "350 ₽", note: "Со скидкой" },
  { name: "До 3 лет", price: "Бесплатно", note: "С родителем" },
  { name: "Семейный (2+2)", price: "1 400 ₽", note: "Экономия 300 ₽" },
];

const reviews = [
  { name: "Анна К.", text: "Были с дочкой на 8-летие — она в восторге! Подержала питона и даже не испугалась. Спасибо!", stars: 5, avatar: "👩" },
  { name: "Максим Р.", text: "Организовали корпоратив. Все коллеги были в шоке от игуан. Очень профессионально!", stars: 5, avatar: "👨" },
  { name: "Светлана Д.", text: "Приходим уже третий раз. Каждый раз что-то новое. Дети не хотят уходить!", stars: 5, avatar: "👩‍🦰" },
  { name: "Игорь В.", text: "Заказали выезд на детский праздник. Всё прошло идеально, животные дружелюбные.", stars: 5, avatar: "🧔" },
];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    const el = ref.current;
    if (el) obs.observe(el);
    return () => { if (el) obs.unobserve(el); };
  }, []);
  return { ref, visible };
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeAnimal, setActiveAnimal] = useState(0);

  const navLinks = [
    { href: "#about", label: "О нас" },
    { href: "#animals", label: "Животные" },
    { href: "#services", label: "Услуги" },
    { href: "#prices", label: "Цены" },
    { href: "#reviews", label: "Отзывы" },
    { href: "#contacts", label: "Контакты" },
  ];

  return (
    <div style={{ background: "#0D1B0F", color: "#fff", fontFamily: "'Montserrat', sans-serif", overflowX: "hidden" }}>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, background: "rgba(13,27,15,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "12px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="#" style={{ fontFamily: "'Pacifico', cursive", fontSize: 24, color: "#FFD600", textDecoration: "none" }}>
            🦎 Экзотариум
          </a>
          <div className="hidden md:flex" style={{ gap: 24, alignItems: "center" }}>
            {navLinks.map(l => (
              <a key={l.href} href={l.href} style={{ color: "rgba(255,255,255,0.75)", fontWeight: 600, fontSize: 14, textDecoration: "none" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#FFD600")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}>
                {l.label}
              </a>
            ))}
            <a href="#contacts" style={{ background: "#FF6B00", color: "#fff", fontWeight: 700, fontSize: 14, padding: "8px 20px", borderRadius: 999, textDecoration: "none" }}>
              Записаться
            </a>
          </div>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer" }}>
            <Icon name={menuOpen ? "X" : "Menu"} size={28} />
          </button>
        </div>
        {menuOpen && (
          <div style={{ background: "#0D1B0F", borderTop: "1px solid rgba(255,255,255,0.08)", padding: "16px 20px", display: "flex", flexDirection: "column", gap: 16 }}>
            {navLinks.map(l => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                style={{ color: "rgba(255,255,255,0.8)", fontWeight: 600, textDecoration: "none" }}>{l.label}</a>
            ))}
            <a href="#contacts" onClick={() => setMenuOpen(false)}
              style={{ background: "#FF6B00", color: "#fff", fontWeight: 700, padding: "12px 20px", borderRadius: 999, textAlign: "center", textDecoration: "none" }}>
              Записаться
            </a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 70, overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img src={HERO_IMG} alt="Экзотариум" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.4 }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(13,27,15,0.5), rgba(13,27,15,0.2) 40%, #0D1B0F)" }} />
        </div>

        {["🦎","🐍","🦜","🐢","🦋","🦔"].map((e, i) => (
          <span key={i} style={{
            position: "absolute", fontSize: "clamp(32px, 5vw, 64px)", opacity: 0.5, pointerEvents: "none", userSelect: "none",
            left: `${10 + i * 15}%`, top: `${15 + (i % 3) * 25}%`,
            animation: `float ${3 + i * 0.4}s ease-in-out infinite`, animationDelay: `${i * 0.5}s`
          }}>{e}</span>
        ))}

        <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 20px", maxWidth: 900 }}>
          <div style={{ display: "inline-block", background: "rgba(255,214,0,0.15)", border: "1px solid rgba(255,214,0,0.4)", color: "#FFD600", fontWeight: 700, fontSize: 13, padding: "6px 16px", borderRadius: 999, marginBottom: 24 }}>
            🔥 Можно трогать руками!
          </div>
          <h1 style={{ fontFamily: "'Pacifico', cursive", fontSize: "clamp(40px, 8vw, 90px)", lineHeight: 1.15, marginBottom: 24 }}>
            <span style={{ color: "#FFD600" }}>Живая</span>{" "}
            <span style={{ color: "#fff" }}>экзотика</span>
            <br />
            <span style={{ color: "#00C853" }}>рядом с тобой</span>
          </h1>
          <p style={{ fontSize: "clamp(16px, 2vw, 22px)", color: "rgba(255,255,255,0.75)", maxWidth: 600, margin: "0 auto 40px", lineHeight: 1.6 }}>
            Контактный зоопарк — гладь, держи, фотографируйся и влюбись в природу!
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#animals" style={{ background: "#FF6B00", color: "#fff", fontWeight: 700, fontSize: 18, padding: "16px 36px", borderRadius: 999, textDecoration: "none", boxShadow: "0 8px 30px rgba(255,107,0,0.35)" }}>
              Познакомиться с животными 🦎
            </a>
            <a href="#prices" style={{ background: "rgba(255,255,255,0.08)", border: "2px solid rgba(255,255,255,0.25)", color: "#fff", fontWeight: 700, fontSize: 18, padding: "16px 36px", borderRadius: 999, textDecoration: "none" }}>
              Узнать цены
            </a>
          </div>
          <div style={{ marginTop: 60, display: "flex", justifyContent: "center", gap: 48, flexWrap: "wrap" }}>
            {[["50+", "видов животных"], ["10 000+", "счастливых гостей"], ["5★", "рейтинг"]].map(([n, l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Pacifico', cursive", fontSize: 40, color: "#FFD600" }}>{n}</div>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "96px 20px", maxWidth: 1200, margin: "0 auto" }}>
        <Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 64, alignItems: "center" }}>
            <div>
              <div style={{ color: "#00C853", fontWeight: 700, fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>О нас</div>
              <h2 style={{ fontFamily: "'Pacifico', cursive", fontSize: "clamp(32px, 5vw, 56px)", lineHeight: 1.2, marginBottom: 24 }}>
                Место, где<br /><span style={{ color: "#FFD600" }}>рождаются</span><br />эмоции
              </h2>
              <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 17, lineHeight: 1.7, marginBottom: 16 }}>
                Экзотариум — место живых ощущений, где каждый может прикоснуться к настоящей природе. Наши животные выращены в любви и привыкли к людям.
              </p>
              <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 17, lineHeight: 1.7, marginBottom: 32 }}>
                Работаем с 2018 года, приняли более 10 000 гостей. Безопасность — наш приоритет.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                {[["10", "лет опыта"], ["50+", "животных"], ["100%", "безопасно"]].map(([n, l]) => (
                  <div key={l} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: 16, textAlign: "center" }}>
                    <div style={{ fontFamily: "'Pacifico', cursive", fontSize: 28, color: "#FF6B00" }}>{n}</div>
                    <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 11, marginTop: 4 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {["🌿 Контактный зоопарк", "📸 Фотосессии", "🎂 Праздники", "🚌 Выезд к вам"].map((item, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 24, padding: 24, textAlign: "center", transition: "transform 0.3s" }}
                  onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-6px)")}
                  onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}>
                  <div style={{ fontSize: 36, marginBottom: 12 }}>{item.split(" ")[0]}</div>
                  <div style={{ color: "#fff", fontWeight: 600, fontSize: 13 }}>{item.split(" ").slice(1).join(" ")}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ANIMALS */}
      <section id="animals" style={{ padding: "96px 20px", background: "rgba(0,0,0,0.2)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div style={{ color: "#FF6B00", fontWeight: 700, fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>Наши обитатели</div>
              <h2 style={{ fontFamily: "'Pacifico', cursive", fontSize: "clamp(36px, 6vw, 72px)" }}>
                Познакомься<br />с <span style={{ color: "#00C853" }}>жителями</span>
              </h2>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
            {animals.map((a, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <div
                  onClick={() => setActiveAnimal(i)}
                  style={{
                    borderRadius: 24, padding: 32, cursor: "pointer", transition: "all 0.3s",
                    background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
                    border: `2px solid ${activeAnimal === i ? "#FFD600" : "rgba(255,255,255,0.08)"}`,
                    transform: activeAnimal === i ? "scale(1.03)" : "scale(1)",
                  }}
                  onMouseEnter={e => { if (activeAnimal !== i) (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.2)"; }}
                  onMouseLeave={e => { if (activeAnimal !== i) (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.08)"; }}
                >
                  <div style={{ fontSize: 56, marginBottom: 16, animation: `float ${3 + i * 0.3}s ease-in-out infinite`, animationDelay: `${i * 0.3}s` }}>{a.emoji}</div>
                  <h3 style={{ fontFamily: "'Pacifico', cursive", fontSize: 24, color: "#fff", marginBottom: 8 }}>{a.name}</h3>
                  <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 13, lineHeight: 1.6 }}>{a.desc}</p>
                  <div style={{ marginTop: 16, display: "inline-block", background: "#00C853", color: "#fff", fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 999 }}>
                    Можно трогать!
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ padding: "96px 20px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div style={{ color: "#00BFA5", fontWeight: 700, fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>Что мы предлагаем</div>
              <h2 style={{ fontFamily: "'Pacifico', cursive", fontSize: "clamp(36px, 6vw, 72px)" }}>
                Наши <span style={{ color: "#FFD600" }}>услуги</span>
              </h2>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
            {services.map((s, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 24, padding: 32, transition: "all 0.3s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,107,0,0.4)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.08)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}>
                  <div style={{ background: "rgba(255,107,0,0.15)", borderRadius: 16, padding: 16, display: "inline-flex", marginBottom: 20 }}>
                    <Icon name={s.icon} size={32} className="text-orange-400" fallback="Star" />
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: 20, color: "#fff", marginBottom: 8 }}>{s.title}</h3>
                  <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>{s.desc}</p>
                  <div style={{ fontFamily: "'Pacifico', cursive", color: "#FFD600", fontSize: 22 }}>{s.price}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" style={{ padding: "96px 20px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div style={{ color: "#FF1F7D", fontWeight: 700, fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>Что говорят гости</div>
              <h2 style={{ fontFamily: "'Pacifico', cursive", fontSize: "clamp(36px, 6vw, 72px)", color: "#FFD600" }}>Отзывы</h2>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
            {reviews.map((r, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 24, padding: 28, transition: "transform 0.3s" }}
                  onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.transform = "translateY(-5px)"}
                  onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
                    <div style={{ fontSize: 40 }}>{r.avatar}</div>
                    <div>
                      <div style={{ fontWeight: 700, color: "#fff" }}>{r.name}</div>
                      <div>{Array(r.stars).fill("⭐").join("")}</div>
                    </div>
                  </div>
                  <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 13, lineHeight: 1.7, fontStyle: "italic" }}>"{r.text}"</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" style={{ padding: "96px 20px", background: "rgba(0,0,0,0.2)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div style={{ color: "#00BFA5", fontWeight: 700, fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>Мы ждём вас</div>
              <h2 style={{ fontFamily: "'Pacifico', cursive", fontSize: "clamp(36px, 6vw, 72px)", color: "#FFD600" }}>Контакты</h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 40 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                {[
                  { icon: "MapPin", label: "Адрес", value: "ул. Тропическая, 12, Москва", color: "#FF6B00" },
                  { icon: "Phone", label: "Телефон", value: "+7 (999) 123-45-67", color: "#00C853" },
                  { icon: "Mail", label: "Email", value: "hello@exotarium.ru", color: "#00BFA5" },
                  { icon: "Clock", label: "Режим работы", value: "Ежедневно 10:00–20:00", color: "#FFD600" },
                ].map((c, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 14, padding: 12 }}>
                      <Icon name={c.icon} size={22} style={{ color: c.color }} fallback="Info" />
                    </div>
                    <div>
                      <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 11 }}>{c.label}</div>
                      <div style={{ color: "#fff", fontWeight: 600, fontSize: 15 }}>{c.value}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ background: "rgba(255,107,0,0.1)", border: "1px solid rgba(255,107,0,0.25)", borderRadius: 24, padding: 32 }}>
                <h3 style={{ fontFamily: "'Pacifico', cursive", fontSize: 24, color: "#fff", marginBottom: 24 }}>Записаться на визит</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <input type="text" placeholder="Ваше имя"
                    style={{ width: "100%", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 14, padding: "12px 16px", color: "#fff", outline: "none", fontSize: 15, boxSizing: "border-box" }} />
                  <input type="tel" placeholder="Телефон"
                    style={{ width: "100%", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 14, padding: "12px 16px", color: "#fff", outline: "none", fontSize: 15, boxSizing: "border-box" }} />
                  <select style={{ width: "100%", background: "#1a2e1c", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 14, padding: "12px 16px", color: "rgba(255,255,255,0.75)", outline: "none", fontSize: 15, boxSizing: "border-box" }}>
                    <option value="">Выберите услугу</option>
                    <option value="tour">Обычный тур</option>
                    <option value="vip">VIP-тур</option>
                    <option value="birthday">День рождения</option>
                    <option value="event">Выездное шоу</option>
                  </select>
                  <button style={{ width: "100%", background: "#FF6B00", color: "#fff", fontWeight: 700, fontSize: 17, padding: "16px 0", borderRadius: 14, border: "none", cursor: "pointer", transition: "background 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "#e55e00")}
                    onMouseLeave={e => (e.currentTarget.style.background = "#FF6B00")}>
                    Отправить заявку 🦎
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.08)", padding: "40px 20px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <div style={{ fontFamily: "'Pacifico', cursive", fontSize: 22, color: "#FFD600" }}>🦎 Экзотариум</div>
          <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, textAlign: "center" }}>
            © 2024 Экзотариум. Все права защищены.<br />
            <span style={{ color: "rgba(255,214,0,0.5)" }}>С любовью к животным и людям 🌿</span>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            {["Instagram", "Youtube", "MessageCircle"].map((icon, i) => (
              <button key={i} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "50%", padding: 10, cursor: "pointer", color: "rgba(255,255,255,0.5)", display: "flex" }}>
                <Icon name={icon} size={18} fallback="Globe" />
              </button>
            ))}
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::placeholder { color: rgba(255,255,255,0.35); }
      `}</style>
    </div>
  );
}