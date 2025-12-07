import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Advent of Code 2025 | Puzzle Solver",
  description: "Terminal-style puzzle solver for Advent of Code 2025",
};

function Starfield() {
  const stars = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 5,
  }));

  return (
    <div className="starfield">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={
            {
              left: star.left,
              top: star.top,
              width: `${star.size}px`,
              height: `${star.size}px`,
              "--duration": `${star.duration}s`,
              "--delay": `${star.delay}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen">
        <Starfield />
        <div className="relative z-10 min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
