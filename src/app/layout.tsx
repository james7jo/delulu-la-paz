export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
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
