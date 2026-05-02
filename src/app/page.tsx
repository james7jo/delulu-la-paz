"use client";

import { useEffect, useRef, useState } from "react";

const WA_NUMBER = "59175259225";
const TIKTOK_URL = "https://www.tiktok.com/@delulu08.0";
const INSTAGRAM_URL =
  "https://www.instagram.com/_delulu.8?igsh=YjFlenM0Z3FheHp1";
const FORMSPREE_URL = "https://formspree.io/f/xeenopag";
const waLink = (msg: string) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

interface Product {
  id: number;
  badge: string;
  badgeColor: "red" | "rose";
  image: string;
  name: string;
  subtitle: string;
  price: number;
  adelanto: number;
  tags: string[];
  contents: string[];
}
interface Review {
  name: string;
  tag: string;
  text: string;
  photo?: string;
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    badge: "✨ Premium",
    badgeColor: "red",
    image:
      "https://res.cloudinary.com/dh1xm1ov8/image/upload/v1777685602/deluluplatinium_r5pbag.jpg",
    name: "Pack Platinum",
    subtitle: "Caja de acetato transparente · se ve todo el amor adentro",
    price: 260,
    adelanto: 130,
    tags: ["Caja acetato", "Presentación única", "Fotografiable"],
    contents: [
      "Mini torta con rosita",
      "2 Croissants de queso y jamón",
      "Panqueques",
      "Jugo de naranja natural",
      "Leche con chocolate",
      "Bowl de frutas picadas",
      "Mousse de frutilla con crema",
    ],
  },
  {
    id: 2,
    badge: "🎀 Clásico",
    badgeColor: "red",
    image:
      "https://res.cloudinary.com/dh1xm1ov8/image/upload/v1777685602/desayunoplata_gbv25i.jpg",
    name: "Pack Plata",
    subtitle: "Cajita cerrada con lazo · la sorpresa perfecta",
    price: 240,
    adelanto: 120,
    tags: ["Caja cerrada", "Lazo ribbon", "Sorpresa total"],
    contents: [
      "Mini torta con rosita",
      "2 Croissants de queso y jamón",
      "Panqueques",
      "Jugo de naranja natural",
      "Leche con chocolate",
      "Bowl de frutas picadas",
      "Mousse de frutilla con crema",
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
    desc: "Elegís horario y dirección. Delivery gratuito en zona urbana de La Paz y El Alto. Zonas alejadas: consultar cotización.",
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
    text: "El pack plata llegó con el lazo perfecta. El mousse de frutilla estaba espectacular. ¡Gracias Delulu por hacer el día tan especial!",
  },
  {
    name: "Luciana P.",
    tag: "Pack Platinum · San Miguel",
    text: "Pedí con 3 días de anticipación y todo salió perfecto. La presentación es increíble, igual a las fotos. 100% recomendado.",
  },
];

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

function PetalCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;
    let W = window.innerWidth,
      H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };
    window.addEventListener("resize", resize);
    const COLORS = [
      "#F4759B",
      "#E8193C",
      "#FFB3C6",
      "#D63F72",
      "#FFD6E4",
      "#FBACC8",
    ];
    type Petal = {
      x: number;
      y: number;
      r: number;
      vx: number;
      vy: number;
      angle: number;
      va: number;
      color: string;
      opacity: number;
      wobble: number;
      wobbleSpeed: number;
      wobbleAmp: number;
    };
    const MAX = 18;
    const petals: Petal[] = [];
    const spawn = (): Petal => ({
      x: Math.random() * W,
      y: -20,
      r: 5 + Math.random() * 7,
      vx: (Math.random() - 0.5) * 0.6,
      vy: 0.5 + Math.random() * 0.9,
      angle: Math.random() * Math.PI * 2,
      va: (Math.random() - 0.5) * 0.025,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      opacity: 0.55 + Math.random() * 0.35,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.012 + Math.random() * 0.018,
      wobbleAmp: 0.4 + Math.random() * 0.6,
    });
    for (let i = 0; i < MAX; i++) {
      const p = spawn();
      p.y = Math.random() * H;
      petals.push(p);
    }
    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      const rx = p.r * 0.55,
        ry = p.r;
      ctx.moveTo(0, -ry);
      ctx.quadraticCurveTo(rx, -ry * 0.3, 0, ry);
      ctx.quadraticCurveTo(-rx, -ry * 0.3, 0, -ry);
      ctx.fill();
      ctx.globalAlpha = p.opacity * 0.18;
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.ellipse(
        rx * 0.18,
        -ry * 0.25,
        rx * 0.22,
        ry * 0.28,
        -0.3,
        0,
        Math.PI * 2,
      );
      ctx.fill();
      ctx.restore();
    };
    let lastSpawn = 0;
    const tick = (now: number) => {
      ctx.clearRect(0, 0, W, H);
      if (petals.length < MAX && now - lastSpawn > 1800) {
        petals.push(spawn());
        lastSpawn = now;
      }
      for (let i = petals.length - 1; i >= 0; i--) {
        const p = petals[i];
        p.wobble += p.wobbleSpeed;
        p.x += p.vx + Math.sin(p.wobble) * p.wobbleAmp;
        p.y += p.vy;
        p.angle += p.va;
        if (p.y > H + 30) {
          petals.splice(i, 1);
          lastSpawn = 0;
        } else {
          drawPetal(p);
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30"
      aria-hidden
    />
  );
}

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
function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
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
    if (note.trim())
      msg += `\n\nTengo esta consulta / personalización:\n"${note.trim()}"`;
    msg += `\n\nQuedo pendiente, gracias! 🎀`;
    return msg;
  };
  const handleWa = () => {
    onWaClick();
    window.open(waLink(buildMessage()), "_blank");
  };
  return (
    <div className="group bg-[#FFFAF9] rounded-[32px] overflow-hidden border border-[#F5C6D8] shadow-lg shadow-rose-100/60 transition-transform active:scale-[0.99]">
      <div className="relative h-56 overflow-hidden bg-[#FFF0F5]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div
          className={`absolute top-3 left-3 text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-wide ${product.badgeColor === "red" ? "bg-[#E8193C]" : "bg-[#D63F72]"}`}
        >
          {product.badge}
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-black tracking-tight leading-none text-[#1a1a1a]">
              {product.name}
            </h3>
            <p className="text-[#C07090] text-xs mt-1 leading-relaxed">
              {product.subtitle}
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-2xl font-black text-[#E8193C] leading-none">
              {product.price}
            </div>
            <div className="text-[10px] text-[#C07090] font-medium">Bs.</div>
          </div>
        </div>
        <div className="inline-flex items-center gap-1.5 mt-3 bg-[#FFF0F5] border border-[#F5C6D8] rounded-full px-3 py-1">
          <span className="text-[10px] font-bold text-[#E8193C]">
            Adelanto:
          </span>
          <span className="text-[10px] font-black text-[#1a1a1a]">
            {product.adelanto} Bs.
          </span>
          <span className="text-[10px] text-[#C07090]">
            (50% para reservar)
          </span>
        </div>
        <div className="mt-4">
          <p className="text-[10px] font-bold text-[#C07090] uppercase tracking-widest mb-2">
            Incluye
          </p>
          <div className="grid grid-cols-2 gap-y-1.5 gap-x-2">
            {product.contents.map((item) => (
              <div key={item} className="flex items-center gap-1.5">
                <span className="text-[#E8193C] flex-shrink-0">
                  <CheckIcon />
                </span>
                <span className="text-xs text-gray-600 leading-tight">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5 mt-4">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-semibold text-[#D63F72] bg-[#FFF0F5] border border-[#F5C6D8] px-2.5 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-1.5 bg-[#F0FFF4] border border-[#A8E6C0] rounded-full px-3 py-1.5 w-fit">
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#2D9E5F"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
          <span className="text-[10px] font-bold text-[#2D9E5F]">
            Delivery gratis · La Paz y El Alto
          </span>
        </div>
        <div className="mt-4">
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="¿Alguna consulta o personalización? ej: ¿pueden agregar flores?"
            rows={2}
            className="w-full text-xs text-gray-700 placeholder-[#D4A0B5] bg-[#FFF7FA] border border-[#F5C6D8] rounded-2xl px-4 py-3 resize-none focus:outline-none focus:border-[#E8193C] transition-colors"
          />
        </div>
        <button
          onClick={handleWa}
          className="flex items-center justify-between w-full mt-3 bg-[#E8193C] text-white px-5 py-3.5 rounded-2xl hover:opacity-90 active:scale-[0.98] transition-all"
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

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="bg-[#FFFAF9] rounded-2xl p-4 border border-[#F5C6D8]">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-black text-[#1a1a1a]">{review.name}</span>
        <span className="text-[#E8193C] text-xs tracking-wider">★★★★★</span>
      </div>
      <p className="text-xs text-gray-500 leading-relaxed">{review.text}</p>
      {review.photo && (
        <img
          src={review.photo}
          alt="Foto del pedido"
          className="mt-3 w-full h-36 object-cover rounded-xl border border-[#F5C6D8]"
        />
      )}
      <p className="text-[10px] text-[#D4A0B5] font-bold mt-2 tracking-widest uppercase">
        {review.tag}
      </p>
    </div>
  );
}

export default function DeluloDiaMadre() {
  const TARGET = new Date("2026-05-27T00:00:00");
  const { days, hours, mins } = useCountdown(TARGET);
  const [clientCount, setClientCount] = useState(113);
  const handleWaClick = () => setClientCount((c) => c + 0);
  const catalogRef = useRef<HTMLElement>(null);
  const personalizaRef = useRef<HTMLElement>(null);
  const scrollTo = (ref: React.RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
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
    return `${base}\n\nMe interesan estos extras:\n${extras.map((x) => `• ${x}`).join("\n")}\n\n¿Me pueden cotizar? 🎀`;
  };
  const [reviews] = useState<Review[]>(SEED_REVIEWS);

  // ── Formspree review state ──────────────────────────────────────────────
  const [reviewName, setReviewName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewSent, setReviewSent] = useState(false);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewError, setReviewError] = useState(false);

  const submitReview = async () => {
    if (!reviewName.trim() || !reviewText.trim()) return;
    setReviewLoading(true);
    setReviewError(false);
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          nombre: reviewName.trim(),
          opinion: reviewText.trim(),
        }),
      });
      if (res.ok) {
        setReviewSent(true);
        setReviewName("");
        setReviewText("");
      } else {
        setReviewError(true);
      }
    } catch {
      setReviewError(true);
    } finally {
      setReviewLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FFFAF9] text-[#1a1a1a] pb-28">
      <PetalCanvas />

      {/* Floating buttons */}
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
      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Ver Instagram de Delulu"
        className="fixed bottom-24 right-5 z-50 w-14 h-14 text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-transform"
        style={{
          background:
            "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%)",
          boxShadow: "0 8px 24px rgba(214,36,159,0.35)",
        }}
      >
        <InstagramIcon size={22} />
      </a>
      <a
        href={TIKTOK_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Ver TikTok de Delulu"
        className="fixed bottom-[10.5rem] right-5 z-50 w-14 h-14 bg-[#1a1a1a] text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-transform"
        style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.25)" }}
      >
        <TikTokIcon size={22} />
      </a>

      {/* Countdown */}
      <div className="bg-[#E8193C] text-white text-center py-2.5 px-4 text-xs font-semibold tracking-wide">
        ¡Solo quedan{" "}
        <span className="font-black text-sm">
          {days}d {hours}h {mins}m
        </span>{" "}
        — Reserva antes del 27 de mayo
      </div>

      {/* Nav */}
      <nav className="sticky top-0 z-40 flex justify-between items-center px-5 py-3 bg-[#FFFAF9]/80 backdrop-blur-xl border-b border-[#F5C6D8]">
        <img
          src="/delulu1.png"
          alt="Delulu"
          className="h-9 w-auto object-contain"
        />
      </nav>

      {/* Hero */}
      <section className="px-6 pt-10 pb-8 text-center">
        <div className="inline-block bg-white text-[#D63F72] text-[10px] font-bold tracking-[2px] uppercase px-4 py-1.5 rounded-full border border-[#F5C6D8] shadow-sm mb-5">
          ✦ Especial Día de la Madre · La Paz ✦
        </div>
        <h1 className="text-5xl font-black leading-[0.9] tracking-tighter">
          Para la mamá
          <br />
          <span
            className="text-[#E8193C] italic"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            más real.
          </span>
        </h1>
        <p className="mt-4 text-[#C07090] text-sm leading-relaxed max-w-xs mx-auto">
          Desayunos gourmet y cajas sorpresa con entrega en La Paz y El Alto.
          Hechos con amor, fotografiados para el feed.
        </p>
        <div className="flex gap-3 justify-center mt-6">
          <button
            onClick={() => scrollTo(catalogRef)}
            className="bg-[#E8193C] text-white text-xs font-bold px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
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

      {/* Stats */}
      <div className="flex border-y border-[#F5C6D8]">
        {[
          { num: String(clientCount), label: "Pedidos" },
          { num: "72h", label: "Anticipación" },
          { num: "24/05", label: "Fecha límite" },
        ].map((s, i) => (
          <div
            key={i}
            className={`flex-1 py-4 text-center ${i < 2 ? "border-r border-[#F5C6D8]" : ""}`}
          >
            <div className="text-2xl font-black text-[#E8193C] leading-none tabular-nums">
              {s.num}
            </div>
            <div className="text-[10px] font-semibold text-[#C07090] tracking-widest uppercase mt-1">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Catálogo */}
      <section ref={catalogRef} className="px-5 mt-8 scroll-mt-16">
        <div className="mb-5">
          <p className="text-[10px] font-bold tracking-[2px] text-[#E8193C] uppercase">
            ✦ Catálogo
          </p>
          <h2 className="text-3xl font-black tracking-tight mt-1">
            Elige tu <span className="text-[#E8193C]">pack.</span>
          </h2>
          <p className="text-xs text-[#C07090] mt-1">
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

      {/* Live TikTok */}
      <section
        ref={personalizaRef}
        id="personaliza"
        className="mx-5 mt-8 scroll-mt-16 bg-[#FFFFF] border border-[#F5C6D8] rounded-[28px] p-6 text-center"
      >
        <div className="text-[22px] mb-2">🎀</div>
        <h2 className="text-xl font-black tracking-tight text-[#1a1a1a]">
          ¿Estamos en live?
        </h2>
        <p className="text-xs text-[#C07090] mt-3 leading-relaxed max-w-[260px] mx-auto">
          Si nos encontrás en vivo en TikTok, pedí tu descuento especial — solo
          mientras dure el live
        </p>
        <p className="text-[10px] text-[#D4A0B5] mt-2">
          Solemos hacer lives en las noches y al mediodía ✨
        </p>
        <a
          href={TIKTOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-5 bg-[#1a1a1a] text-white text-xs font-black px-6 py-3.5 rounded-full hover:opacity-90 active:scale-[0.98] transition-all"
        >
          <TikTokIcon size={13} />
          IR AL TIKTOK
        </a>
      </section>

      {/* Cómo funciona */}
      <section className="px-5 mt-8">
        <div className="mb-5">
          <p className="text-[10px] font-bold tracking-[2px] text-[#E8193C] uppercase">
            ✦ ¿Cómo funciona?
          </p>
          <h2 className="text-3xl font-black tracking-tight mt-1">
            Así de <span className="text-[#E8193C]">fácil.</span>
          </h2>
        </div>
        <div className="flex flex-col divide-y divide-[#F5C6D8]">
          {STEPS.map((step, i) => (
            <div key={i} className="flex gap-4 items-start py-4">
              <div className="w-8 h-8 rounded-full bg-[#E8193C] text-white text-sm font-black flex items-center justify-center flex-shrink-0 mt-0.5">
                {i + 1}
              </div>
              <div>
                <p className="text-sm font-bold">{step.title}</p>
                <p className="text-xs text-[#C07090] mt-1 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
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

      {/* Opiniones */}
      <section className="px-5 mt-8">
        <div className="mb-5">
          <p className="text-[10px] font-bold tracking-[2px] text-[#E8193C] uppercase">
            ✦ Opiniones
          </p>
          <h2 className="text-3xl font-black tracking-tight mt-1">
            Lo que <span className="text-[#E8193C]">dicen.</span>
          </h2>
        </div>
        <div className="flex flex-col gap-3">
          {reviews.map((r, i) => (
            <ReviewCard key={i} review={r} />
          ))}
        </div>

        {/* Formulario → Formspree */}
        <div className="mt-5 bg-[#FFFAF9] rounded-[24px] p-5 border border-[#F5C6D8]">
          <p className="text-sm font-black mb-3">
            ¿Ya pediste con nosotras? ✨
          </p>
          {reviewSent ? (
            <div className="text-center py-6">
              <div className="text-4xl mb-3">🌸</div>
              <p className="text-sm font-black text-[#E8193C]">
                ¡Gracias por tu reseña!
              </p>
              <p className="text-xs text-[#C07090] mt-1 leading-relaxed max-w-[220px] mx-auto">
                La revisaremos y la publicaremos pronto.
              </p>
            </div>
          ) : (
            <>
              <input
                type="text"
                value={reviewName}
                onChange={(e) => setReviewName(e.target.value)}
                placeholder="Tu nombre"
                className="w-full text-xs text-gray-700 placeholder-[#D4A0B5] bg-[#FFF7FA] border border-[#F5C6D8] rounded-xl px-4 py-2.5 mb-2.5 focus:outline-none focus:border-[#E8193C] transition-colors"
              />
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Contanos tu experiencia 💕"
                rows={3}
                className="w-full text-xs text-gray-700 placeholder-[#D4A0B5] bg-[#FFF7FA] border border-[#F5C6D8] rounded-xl px-4 py-2.5 resize-none focus:outline-none focus:border-[#E8193C] transition-colors"
              />
              {reviewError && (
                <p className="text-[10px] text-[#E8193C] mt-1 mb-1">
                  Hubo un error al enviar. Intentá de nuevo 🙏
                </p>
              )}
              <button
                onClick={submitReview}
                disabled={
                  !reviewName.trim() || !reviewText.trim() || reviewLoading
                }
                className="w-full mt-2 bg-[#E8193C] disabled:opacity-40 text-white text-xs font-black py-3 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all tracking-wide"
              >
                {reviewLoading ? "ENVIANDO..." : "ENVIAR OPINIÓN"}
              </button>
            </>
          )}
        </div>
      </section>

      {/* CTA Final */}
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
              className="text-[#F4759B] not-italic"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              sorprender?
            </em>
          </h2>
          <p className="text-gray-400 text-sm mt-3">
            Reservas limitadas · 27 de mayo · La Paz
          </p>
          <div className="inline-block mt-4 bg-[#E8193C]/20 text-red-300 text-[11px] font-bold tracking-wide px-4 py-1.5 rounded-full">
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
          <div className="flex items-center justify-center gap-4 mt-4">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-gray-500 text-[11px] font-semibold hover:text-gray-300 transition-colors"
            >
              <InstagramIcon size={13} />
              @_delulu.8
            </a>
            <span className="text-gray-700">·</span>
            <a
              href={TIKTOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-gray-500 text-[11px] font-semibold hover:text-gray-300 transition-colors"
            >
              <TikTokIcon size={13} />
              @delulu08.0
            </a>
          </div>
        </div>
      </section>

      <footer className="text-center mt-8 text-[#C07090] text-[11px]">
        Hecho con 💕 por Delulu La Paz · @_delulu.8
      </footer>
    </main>
  );
}
