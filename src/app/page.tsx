"use client";

import { useEffect, useRef, useState } from "react";

// ─── Config ────────────────────────────────────────────────────────────────
const WA_NUMBER = "59175259225";
const TIKTOK_URL = "https://www.tiktok.com/@delulu08.0";
const waLink = (msg: string) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

// ─── Types ─────────────────────────────────────────────────────────────────
interface Product {
  id: number;
  badge: string;
  badgeColor: "dark" | "pink";
  image: string;
  name: string;
  subtitle: string;
  price: number;
  adelanto: number;
  tags: string[];
  contents: string[];
  packType: string;
}

interface Review {
  name: string;
  tag: string;
  text: string;
}

// ─── Data ──────────────────────────────────────────────────────────────────
const PRODUCTS: Product[] = [
  {
    id: 1,
    badge: "✨ Premium",
    badgeColor: "pink",
    image:
      "https://res.cloudinary.com/dh1xm1ov8/image/upload/v1777613850/pack_platinium_rqcf5f.png",
    name: "Pack Platinum",
    subtitle: "Caja de acetato transparente · se ve todo el amor adentro",
    price: 260,
    adelanto: 130,
    packType: "Caja acetato transparente",
    tags: ["Caja acetato", "Presentación única", "Fotografiable"],
    contents: [
      "2 Croissants artesanales",
      "Panqueques con maple",
      "Jugo de naranja natural",
      "Mousse de frutilla",
      "Bowl de frutas frescas",
      "Chocolate caliente",
    ],
  },
  {
    id: 2,
    badge: "🎀 Clásico",
    badgeColor: "dark",
    image:
      "https://res.cloudinary.com/dh1xm1ov8/image/upload/v1777614050/packplata_vt8zx0.png",
    name: "Pack Plata",
    subtitle: "Cajita cerrada con lazo · la sorpresa perfecta",
    price: 230,
    adelanto: 115,
    packType: "Caja cerrada premium",
    tags: ["Caja cerrada", "Lazo ribbon", "Sorpresa total"],
    contents: [
      "2 Croissants artesanales",
      "Panqueques con maple",
      "Jugo de naranja natural",
      "Mousse de frutilla",
      "Bowl de frutas frescas",
      "Chocolate caliente",
    ],
  },
];

const EXTRAS = [
  "+ Nota escrita a mano",
  "+ Globos decorativos",
  "+ Flores extra",
  "+ Champagne / espumante",
];

const STEPS = [
  {
    title: "Elige tu pack",
    desc: "Pack Platinum en caja acetato o Pack Plata en cajita cerrada. Ambos con el mismo desayuno gourmet.",
  },
  {
    title: "Escríbenos tu pedido",
    desc: "Mándanos tu consulta desde la card del producto. Respondemos en minutos por WhatsApp.",
  },
  {
    title: "Confirma con adelanto",
    desc: "Toda reserva se asegura con el 50% de adelanto. Sin adelanto, no hay reserva garantizada.",
  },
  {
    title: "Coordina la entrega",
    desc: "Elegís horario y dirección en La Paz. Mínimo 72h de anticipación para reservar.",
  },
  {
    title: "¡Momento fotorrealista!",
    desc: "Tu mamá recibe el detalle más lindo de su día. Hecho para el feed, guardado en el corazón. 📸",
  },
];

const SEED_REVIEWS: Review[] = [
  {
    name: "Valentina M.",
    tag: "Pack Platinum · Sopocachi",
    text: "El pack platinum fue una locura se veía todo perfectamente antes de abrirla. Definitivamente lo más lindo.",
  },
  {
    name: "Camila R.",
    tag: "Pack Plata · Miraflores",
    text: "El pack plata llego con el lazo llegó perfecta. El mousse de frutilla estaba espectacular. ¡Gracias Delulu por hacer el día tan especial!",
  },
  {
    name: "Luciana P.",
    tag: "Pack Platinum · San Miguel",
    text: "Pedí con 3 días de anticipación y todo salió perfecto. La presentación es increíble, igual a las fotos. 100% recomendado.",
  },
];

// ─── Hooks ─────────────────────────────────────────────────────────────────
function useCountdown(targetDate: Date) {
  const calc = () => {
    const diff = targetDate.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, mins: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      mins: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const t = setInterval(() => setTime(calc()), 30000);
    return () => clearInterval(t);
  }, []);
  return time;
}

// ─── Icons ─────────────────────────────────────────────────────────────────
function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function TikTokIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="13"
      height="13"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      viewBox="0 0 24 24"
    >
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

// ─── ProductCard ────────────────────────────────────────────────────────────
function ProductCard({
  product,
  onWaClick,
}: {
  product: Product;
  onWaClick: () => void;
}) {
  const [note, setNote] = useState("");

  const buildMessage = () => {
    let msg = `Buenas, Delulu La Paz 🌸 Quisiera agendar mi pedido del *${product.name}* (${product.price} Bs.)`;
    if (note.trim()) {
      msg += `\n\nTengo esta consulta / personalización:\n"${note.trim()}"`;
    }
    msg += `\n\nQuedo pendiente, gracias! 🎀`;
    return msg;
  };

  const handleWa = () => {
    onWaClick();
    window.open(waLink(buildMessage()), "_blank");
  };

  return (
    <div className="group bg-white rounded-[32px] overflow-hidden border border-pink-100 shadow-lg shadow-pink-50/60 transition-transform active:scale-[0.99]">
      {/* Image */}
      <div className="relative h-56 overflow-hidden bg-pink-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div
          className={`absolute top-3 left-3 text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-wide ${
            product.badgeColor === "pink" ? "bg-[#e8427a]" : "bg-[#1a1a1a]"
          }`}
        >
          {product.badge}
        </div>
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-[10px] font-bold text-[#1a1a1a] px-3 py-1.5 rounded-full border border-pink-100">
          {product.packType}
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        {/* Header */}
        <div className="flex justify-between items-start gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-black tracking-tight leading-none">
              {product.name}
            </h3>
            <p className="text-gray-400 text-xs mt-1 leading-relaxed">
              {product.subtitle}
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-2xl font-black text-[#e8427a] leading-none">
              {product.price}
            </div>
            <div className="text-[10px] text-gray-400 font-medium">Bs.</div>
          </div>
        </div>

        {/* Adelanto badge */}
        <div className="inline-flex items-center gap-1.5 mt-3 bg-pink-50 border border-pink-100 rounded-full px-3 py-1">
          <span className="text-[10px] font-bold text-[#e8427a]">
            Adelanto:
          </span>
          <span className="text-[10px] font-black text-[#1a1a1a]">
            {product.adelanto} Bs.
          </span>
          <span className="text-[10px] text-gray-400">(50% para reservar)</span>
        </div>

        {/* Contents */}
        <div className="mt-4">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
            Incluye
          </p>
          <div className="grid grid-cols-2 gap-y-1.5 gap-x-2">
            {product.contents.map((item) => (
              <div key={item} className="flex items-center gap-1.5">
                <span className="text-[#e8427a] flex-shrink-0">
                  <CheckIcon />
                </span>
                <span className="text-xs text-gray-600 leading-tight">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-semibold text-pink-700 bg-pink-50 border border-pink-100 px-2.5 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Note input */}
        <div className="mt-4">
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="¿Alguna consulta o personalización? ej: ¿pueden agregar flores?"
            rows={2}
            className="w-full text-xs text-gray-700 placeholder-gray-300 bg-gray-50 border border-pink-100 rounded-2xl px-4 py-3 resize-none focus:outline-none focus:border-[#e8427a] transition-colors"
          />
        </div>

        {/* CTA */}
        <button
          onClick={handleWa}
          className="flex items-center justify-between w-full mt-3 bg-[#e8427a] text-white px-5 py-3.5 rounded-2xl hover:opacity-90 active:scale-[0.98] transition-all"
        >
          <span className="text-xs font-black tracking-wide">
            AGENDAR ESTE PACK
          </span>
          <WhatsAppIcon size={16} />
        </button>
      </div>
    </div>
  );
}

// ─── ReviewCard ─────────────────────────────────────────────────────────────
function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="bg-white rounded-2xl p-4 border border-pink-100">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-black">{review.name}</span>
        <span className="text-[#e8427a] text-xs tracking-wider">★★★★★</span>
      </div>
      <p className="text-xs text-gray-500 leading-relaxed">{review.text}</p>
      <p className="text-[10px] text-gray-300 font-bold mt-2 tracking-widest uppercase">
        {review.tag}
      </p>
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────────────
export default function DeluloDiaMadre() {
  const TARGET = new Date("2026-05-27T00:00:00");
  const { days, hours, mins } = useCountdown(TARGET);

  // Client counter — starts at 123, bumps on every WA click (session only)
  const [clientCount, setClientCount] = useState(123);
  const handleWaClick = () => setClientCount((c) => c + 1);

  // Scroll refs
  const catalogRef = useRef<HTMLElement>(null);
  const personalizaRef = useRef<HTMLElement>(null);

  const scrollTo = (ref: React.RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Extras state
  const [activeExtras, setActiveExtras] = useState<Set<string>>(new Set());
  const toggleExtra = (e: string) =>
    setActiveExtras((prev) => {
      const next = new Set(prev);
      next.has(e) ? next.delete(e) : next.add(e);
      return next;
    });

  const personalizaMsg = () => {
    const extras = [...activeExtras];
    const base =
      "Hola Delulu La Paz 🌸 Quiero consultar sobre personalización para el Día de la Madre.";
    if (extras.length === 0) return base;
    return `${base}\n\nMe interesan estos extras:\n${extras
      .map((x) => `• ${x}`)
      .join("\n")}\n\n¿Me pueden cotizar? 🎀`;
  };

  // Reviews
  const [reviews] = useState<Review[]>(SEED_REVIEWS);
  const [reviewName, setReviewName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewSent, setReviewSent] = useState(false);

  const submitReview = () => {
    if (!reviewName.trim() || !reviewText.trim()) return;
    setReviewSent(true);
    // Mensaje enviado al servidor inexistente 😂
    setTimeout(() => {
      setReviewName("");
      setReviewText("");
    }, 300);
  };

  return (
    <main className="min-h-screen bg-[#fdf6f0] text-[#1a1a1a] pb-28">
      {/* ── Floating Buttons ───────────────────────────────────────────── */}
      {/* WhatsApp */}
      <a
        href={waLink(
          "Hola Delulu La Paz! 🌸 Quiero reservar para el Día de la Madre 🎀",
        )}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleWaClick}
        aria-label="Contactar por WhatsApp"
        className="fixed bottom-6 right-5 z-50 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-transform"
        style={{ boxShadow: "0 8px 24px rgba(37,211,102,0.35)" }}
      >
        <WhatsAppIcon size={26} />
      </a>
      {/* TikTok */}
      <a
        href={TIKTOK_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Ver TikTok de Delulu"
        className="fixed bottom-24 right-5 z-50 w-14 h-14 bg-[#1a1a1a] text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-transform"
        style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.25)" }}
      >
        <TikTokIcon size={22} />
      </a>

      {/* ── Countdown Bar ──────────────────────────────────────────────── */}
      <div className="bg-[#e8427a] text-white text-center py-2.5 px-4 text-xs font-semibold tracking-wide">
        ¡Solo quedan{" "}
        <span className="font-black text-sm">
          {days}d {hours}h {mins}m
        </span>{" "}
        — Reserva antes del 27 de mayo
      </div>

      {/* ── Nav ────────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-40 flex justify-between items-center px-5 py-3 bg-[#fdf6f0]/80 backdrop-blur-xl border-b border-pink-100">
        <span className="font-black text-lg tracking-tighter text-[#e8427a]">
          DELULU ✿
        </span>
        {/* botón eliminado — reemplazado por flotante de WA */}
      </nav>

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="px-6 pt-10 pb-8 text-center">
        <div className="inline-block bg-white text-[#e8427a] text-[10px] font-bold tracking-[2px] uppercase px-4 py-1.5 rounded-full border border-pink-100 shadow-sm mb-5">
          ✦ Especial Día de la Madre · La Paz ✦
        </div>
        <h1 className="text-5xl font-black leading-[0.9] tracking-tighter">
          Para la mamá
          <br />
          <span
            className="text-[#e8427a] italic"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            más real.
          </span>
        </h1>
        <p className="mt-4 text-gray-400 text-sm leading-relaxed max-w-xs mx-auto">
          Desayunos gourmet y cajas sorpresa con entrega en La Paz. Hechos con
          amor, fotografiados para el feed.
        </p>
        <div className="flex gap-3 justify-center mt-6">
          <button
            onClick={() => scrollTo(catalogRef)}
            className="bg-[#e8427a] text-white text-xs font-bold px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
          >
            Ver productos
          </button>
          <button
            onClick={() => scrollTo(personalizaRef)}
            className="bg-transparent text-[#1a1a1a] border-[1.5px] border-[#1a1a1a] text-xs font-bold px-6 py-3 rounded-full hover:bg-[#1a1a1a] hover:text-white transition-colors"
          >
            Personalizar
          </button>
        </div>
      </section>

      {/* ── Stats ──────────────────────────────────────────────────────── */}
      <div className="flex border-y border-pink-100">
        {[
          { num: String(clientCount), label: "Pedidos" },
          { num: "72h", label: "Anticipación" },
          { num: "24/05", label: "Fecha límite" },
        ].map((s, i) => (
          <div
            key={i}
            className={`flex-1 py-4 text-center ${i < 2 ? "border-r border-pink-100" : ""}`}
          >
            <div className="text-2xl font-black text-[#e8427a] leading-none tabular-nums">
              {s.num}
            </div>
            <div className="text-[10px] font-semibold text-gray-400 tracking-widest uppercase mt-1">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* ── Catálogo ───────────────────────────────────────────────────── */}
      <section ref={catalogRef} className="px-5 mt-8 scroll-mt-16">
        <div className="mb-5">
          <p className="text-[10px] font-bold tracking-[2px] text-[#e8427a] uppercase">
            ✦ Catálogo
          </p>
          <h2 className="text-3xl font-black tracking-tight mt-1">
            Elige tu <span className="text-[#e8427a]">pack.</span>
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Ambos incluyen el mismo desayuno gourmet. La diferencia está en el
            empaque.
          </p>
        </div>
        <div className="flex flex-col gap-6">
          {PRODUCTS.map((p) => (
            <ProductCard key={p.id} product={p} onWaClick={handleWaClick} />
          ))}
        </div>
      </section>

      {/* ── Personalización ────────────────────────────────────────────── */}
      <section
        ref={personalizaRef}
        id="personaliza"
        className="mx-5 mt-8 scroll-mt-16 bg-pink-50 rounded-[28px] p-6 border border-pink-100"
      >
        <div className="text-3xl mb-2">🎀</div>
        <h2 className="text-xl font-black tracking-tight">
          ¿Lo quieres <span className="text-[#e8427a]">único?</span>
        </h2>
        <p className="text-xs text-pink-700 mt-2 leading-relaxed">
          Seleccioná los extras que querés y te cotizamos al instante por
          WhatsApp.
        </p>
        <div className="grid grid-cols-2 gap-2 mt-4">
          {EXTRAS.map((extra) => (
            <button
              key={extra}
              onClick={() => toggleExtra(extra)}
              className={`text-[11px] font-semibold py-2.5 px-3 rounded-2xl border transition-all text-center active:scale-95 ${
                activeExtras.has(extra)
                  ? "bg-[#e8427a] text-white border-[#e8427a] shadow-md shadow-pink-200"
                  : "bg-white text-pink-700 border-pink-200 hover:border-[#e8427a]"
              }`}
            >
              {extra}
            </button>
          ))}
        </div>
        <a
          href={waLink(personalizaMsg())}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleWaClick}
          className="flex items-center justify-between mt-5 bg-[#1a1a1a] text-white px-5 py-3.5 rounded-2xl hover:opacity-90 active:scale-[0.98] transition-all"
        >
          <span className="text-xs font-black tracking-wide">
            CONSULTAR PERSONALIZACIÓN
          </span>
          <WhatsAppIcon size={16} />
        </a>
      </section>

      {/* ── Cómo funciona ──────────────────────────────────────────────── */}
      <section className="px-5 mt-8">
        <div className="mb-5">
          <p className="text-[10px] font-bold tracking-[2px] text-[#e8427a] uppercase">
            ✦ ¿Cómo funciona?
          </p>
          <h2 className="text-3xl font-black tracking-tight mt-1">
            Así de <span className="text-[#e8427a]">fácil.</span>
          </h2>
        </div>
        <div className="flex flex-col divide-y divide-pink-100">
          {STEPS.map((step, i) => (
            <div key={i} className="flex gap-4 items-start py-4">
              <div className="w-8 h-8 rounded-full bg-[#e8427a] text-white text-sm font-black flex items-center justify-center flex-shrink-0 mt-0.5">
                {i + 1}
              </div>
              <div>
                <p className="text-sm font-bold">{step.title}</p>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Adelanto callout */}
        <div className="mt-4 bg-[#1a1a1a] text-white rounded-2xl p-4 flex gap-3 items-start">
          <span className="text-xl flex-shrink-0">💳</span>
          <div>
            <p className="text-xs font-black tracking-wide">
              RESERVA CON ADELANTO
            </p>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed">
              Toda reserva requiere el 50% de adelanto para garantizar tu
              pedido. Pack Platinum: 130 Bs. · Pack Plata: 115 Bs.
            </p>
          </div>
        </div>
      </section>

      {/* ── Opiniones ──────────────────────────────────────────────────── */}
      <section className="px-5 mt-8">
        <div className="mb-5">
          <p className="text-[10px] font-bold tracking-[2px] text-[#e8427a] uppercase">
            ✦ Opiniones
          </p>
          <h2 className="text-3xl font-black tracking-tight mt-1">
            Lo que <span className="text-[#e8427a]">dicen.</span>
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {reviews.map((r, i) => (
            <ReviewCard key={i} review={r} />
          ))}
        </div>

        {/* Dejar opinión */}
        <div className="mt-5 bg-white rounded-[24px] p-5 border border-pink-100">
          <p className="text-sm font-black mb-3">
            ¿Ya pediste con nosotras? ✨
          </p>
          {reviewSent ? (
            <div className="text-center py-6">
              <div className="text-4xl mb-3">🌸</div>
              <p className="text-sm font-black text-[#e8427a]">
                ¡Mensaje enviado!
              </p>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed max-w-[220px] mx-auto">
                Nuestros servidores lo aprobarán dentro de poco.{" "}
                <span className="text-gray-300"></span>
              </p>
            </div>
          ) : (
            <>
              <input
                type="text"
                value={reviewName}
                onChange={(e) => setReviewName(e.target.value)}
                placeholder="Tu nombre"
                className="w-full text-xs text-gray-700 placeholder-gray-300 bg-gray-50 border border-pink-100 rounded-xl px-4 py-2.5 mb-2.5 focus:outline-none focus:border-[#e8427a] transition-colors"
              />
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Contanos tu experiencia 💕"
                rows={3}
                className="w-full text-xs text-gray-700 placeholder-gray-300 bg-gray-50 border border-pink-100 rounded-xl px-4 py-2.5 resize-none focus:outline-none focus:border-[#e8427a] transition-colors"
              />
              <button
                onClick={submitReview}
                disabled={!reviewName.trim() || !reviewText.trim()}
                className="w-full mt-2 bg-[#e8427a] disabled:opacity-40 text-white text-xs font-black py-3 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all tracking-wide"
              >
                ENVIAR OPINIÓN
              </button>
            </>
          )}
        </div>
      </section>

      {/* ── CTA Final ──────────────────────────────────────────────────── */}
      <section className="mx-5 mt-8 bg-[#1a1a1a] rounded-[32px] p-8 text-white text-center relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 flex items-center justify-center text-[110px] font-black text-white/[0.035] leading-none pointer-events-none select-none"
        >
          mama
        </div>
        <div className="relative z-10">
          <h2 className="text-4xl font-black leading-none tracking-tighter">
            ¿Lista para{" "}
            <em
              className="text-[#e8427a] not-italic"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              sorprender?
            </em>
          </h2>
          <p className="text-gray-400 text-sm mt-3">
            Reservas limitadas · 27 de mayo · La Paz
          </p>
          <div className="inline-block mt-4 bg-[#e8427a]/20 text-pink-300 text-[11px] font-bold tracking-wide px-4 py-1.5 rounded-full">
            📅 Reserva con 72h de anticipación
          </div>
          <a
            href={waLink(
              "Hola Delulu La Paz! 🌸 Quiero reservar para el Día de la Madre 🎀",
            )}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWaClick}
            className="flex items-center justify-center gap-3 mt-6 bg-[#25D366] text-white font-black text-sm py-4 px-6 rounded-full hover:opacity-90 active:scale-[0.98] transition-all tracking-wide"
          >
            <WhatsAppIcon size={18} />
            RESERVAR AHORA
          </a>
          <a
            href={TIKTOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 mt-3 text-gray-500 text-[11px] font-semibold hover:text-gray-300 transition-colors"
          >
            <TikTokIcon size={13} />
            @delulu08.0
          </a>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer className="text-center mt-8 text-gray-300 text-[11px]">
        Hecho con 💕 por Delulu La Paz · @delulu08.0
      </footer>
    </main>
  );
}
