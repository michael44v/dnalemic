
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dnalemic International Limited",
  description:
    "An indigenous metering, instrumentation and tank service multifaceted engineering company in Nigeria.",
  icons: { icon: "https://dnalemic.com/assets/img/fav.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
