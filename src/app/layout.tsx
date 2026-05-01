export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
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
      <body className="bg-delulu-soft antialiased font-sans text-delulu-dark">
        {children}
      </body>
    </html>
  );
}
