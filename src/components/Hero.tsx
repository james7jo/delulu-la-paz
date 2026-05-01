import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-pink-50 min-h-screen flex flex-col items-center justify-center p-6 text-center">
      {/* Tu logo Coquette o una imagen bonita */}
      <div className="relative w-40 h-40 mb-6">
        <Image
          src="/images/logo-delulu.png" // Luego pondremos tu logo aquí
          alt="Logo Delulu La Paz"
          fill
          className="object-contain"
          priority
        />
      </div>

      <h1 className="text-4xl md:text-6xl font-bold text-pink-700 mb-4 leading-tight">
        Haz que mamá sonría <br /> desde temprano 🎀
      </h1>

      <p className="text-lg text-gray-700 max-w-md mb-8">
        ¿Aún no sabes qué regalarle? 🤔 Los detalles más lindos y deliciosos de
        La Paz están aquí. 👇
      </p>

      {/* Botón CTA gigante para celulares */}
      <a
        href="#catalogo"
        className="bg-pink-500 hover:bg-pink-600 text-white text-xl font-semibold px-10 py-4 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95"
      >
        Ver Catálogo de Madres
      </a>
    </section>
  );
}
