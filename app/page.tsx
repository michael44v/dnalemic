// app/page.tsx  –– Next.js 13+ App Router entry page
// Drop this file into: app/page.tsx
// Drop DnalemicSite.tsx into: app/_components/DnalemicSite.tsx  (or anywhere you prefer)
// Add the font links + FA stylesheet to app/layout.tsx (see comment at the bottom of this file)

import DnalemicSite from "@/components/Dnalemicsite";

export default function Home() {
  return <DnalemicSite />;
}
