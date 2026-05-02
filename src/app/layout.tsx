export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        {/* Favicon que ya arreglamos */}
        <link rel="icon" href="/DELULUICON.png" type="image/png" />

        {/* Etiquetas Open Graph para que se vea el logo al compartir el link */}
        <meta property="og:title" content="Delulu La Paz 🌸 Eventos Petit" />
        <meta
          property="og:description"
          content="Desayunos gourmet fotorrealistas y detalles premium para mamá en La Paz y El Alto."
        />
        <meta
          property="og:image"
          content="https://delulu-la-paz.vercel.app/DELULUICON.png"
        />
        <meta property="og:url" content="https://delulu-la-paz.vercel.app" />
        <meta property="og:type" content="website" />

        {/* Etiquetas para Twitter/X */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Delulu La Paz 🌸" />
        <meta
          name="twitter:description"
          content="Detalles premium para la reina del hogar."
        />
        <meta
          name="twitter:image"
          content="https://delulu-la-paz.vercel.app/DELULUICON.png"
        />

        {/* Ícono de la página (Favicon) */}
        <link rel="icon" href="/DELULUICON.png" type="image/png" />

        <script src="https://cdn.tailwindcss.com"></script>
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            tailwind.config = {
              theme: {
                extend: {
                  colors: {
                    delulu: {
                      pink: '#FF85A1',
                      dark: '#4A0E0E',
                      soft: '#FFF5F5',
                      gold: '#D4AF37'
                    }
                  },
                  fontFamily: {
                    sans: ['Outfit', 'sans-serif'],
                  }
                }
              }
            }
          `,
          }}
        />
      </head>
      {/* suppressHydrationWarning evita el error #418 por los scripts externos */}
      <body
        suppressHydrationWarning={true}
        className="bg-delulu-soft antialiased font-sans text-delulu-dark"
      >
        {children}
      </body>
    </html>
  );
}
