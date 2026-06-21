import type { Metadata } from "next";
import Script from "next/script";
import { createElement } from "react";

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
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css"
        />
      </head>
      <body>
        {children}

        {/* createElement bypasses JSX's IntrinsicElements check, so the
            "elevenlabs-convai" custom element doesn't need a .d.ts file. */}
        {createElement("elevenlabs-convai", { "agent-id": "agent_5901kvn32189fbzraprb1xdgn626" })}

        <Script
          src="https://unpkg.com/@elevenlabs/convai-widget-embed"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}