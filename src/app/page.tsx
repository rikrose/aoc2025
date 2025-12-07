import Link from "next/link";

const ASCII_TREE = `
       *
      /|\\
     /_|_\\
    /__|__\\
   /___|___\\
  /____|____\\
 /_____|_____\\
      |||
`;

const DAYS = Array.from({ length: 25 }, (_, i) => i + 1);

export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
      {/* Header Section */}
      <div className="text-center mb-12">
        <pre className="ascii-art text-terminal-green mb-6 hidden sm:block">
          {ASCII_TREE}
        </pre>

        <h1 className="font-pixel text-4xl sm:text-5xl text-star-gold glow-gold mb-4">
          ADVENT OF CODE
        </h1>

        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="text-star-gold text-2xl animate-twinkle">*</span>
          <span className="font-pixel text-2xl sm:text-3xl text-terminal-green">
            2025
          </span>
          <span
            className="text-star-gold text-2xl animate-twinkle"
            style={{ animationDelay: "0.5s" }}
          >
            *
          </span>
        </div>

        <p className="text-muted-foreground text-sm max-w-md mx-auto font-terminal">
          <span className="text-terminal-green">&gt;</span> Select a day to
          solve puzzles and collect <span className="text-star-gold">*</span>
          <span className="text-star-silver">*</span> stars
        </p>
      </div>

      {/* Calendar Grid */}
      <div className="w-full max-w-2xl">
        <div className="grid grid-cols-5 gap-3 sm:gap-4">
          {DAYS.map((day) => {
            const isUnlocked = day <= 6; // Only first 6 days are "unlocked" for demo

            return (
              <Link
                key={day}
                href={isUnlocked ? `/${day}/1` : "#"}
                className={`
                  group relative aspect-square flex flex-col items-center justify-center
                  border rounded transition-all duration-300
                  ${
                    isUnlocked
                      ? "border-border hover:border-star-gold hover:shadow-[0_0_20px_rgba(255,255,102,0.3)] cursor-pointer bg-card/50 hover:bg-card"
                      : "border-border/30 bg-card/20 cursor-not-allowed opacity-50"
                  }
                `}
              >
                {/* Day number */}
                <span
                  className={`
                  font-pixel text-lg sm:text-xl transition-colors duration-300
                  ${isUnlocked ? "text-foreground group-hover:text-star-gold" : "text-muted-foreground/50"}
                `}
                >
                  {day}
                </span>

                {/* Stars indicator */}
                {isUnlocked && (
                  <div className="absolute bottom-1 flex gap-0.5">
                    {day === 1 && (
                      <>
                        <span className="text-star-gold text-xs">*</span>
                        <span className="text-star-gold text-xs">*</span>
                      </>
                    )}
                    {day > 1 && day <= 3 && (
                      <>
                        <span className="text-star-gold text-xs">*</span>
                        <span className="text-muted-foreground/30 text-xs">
                          *
                        </span>
                      </>
                    )}
                    {day > 3 && day <= 6 && (
                      <>
                        <span className="text-muted-foreground/30 text-xs">
                          *
                        </span>
                        <span className="text-muted-foreground/30 text-xs">
                          *
                        </span>
                      </>
                    )}
                  </div>
                )}

                {/* Hover glow effect */}
                {isUnlocked && (
                  <div className="absolute inset-0 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-star-gold/5 to-transparent pointer-events-none" />
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Stats Section */}
      <div className="mt-12 flex items-center gap-8 text-sm font-terminal">
        <div className="flex items-center gap-2">
          <span className="text-star-gold text-lg">*</span>
          <span className="text-muted-foreground">Gold Stars:</span>
          <span className="text-star-gold font-bold">4</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-star-silver text-lg">*</span>
          <span className="text-muted-foreground">Total:</span>
          <span className="text-star-silver font-bold">4/50</span>
        </div>
      </div>

      {/* Terminal Footer */}
      <div className="mt-12 w-full max-w-lg">
        <div className="border border-border rounded bg-card/30 p-4">
          <div className="flex items-center gap-2 mb-2 text-xs">
            <span className="w-3 h-3 rounded-full bg-berry" />
            <span className="w-3 h-3 rounded-full bg-terminal-amber" />
            <span className="w-3 h-3 rounded-full bg-terminal-green" />
            <span className="text-muted-foreground ml-2">aoc2025.solver</span>
          </div>
          <div className="font-terminal text-sm">
            <p className="text-terminal-green">
              <span className="text-muted-foreground">$</span> ./solve --day 1
              --part 1
            </p>
            <p className="text-muted-foreground mt-1">
              Ready to accept puzzle input...
            </p>
            <p className="text-terminal-green mt-1">
              <span className="text-muted-foreground">$</span>{" "}
              <span className="animate-cursor-blink">_</span>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
