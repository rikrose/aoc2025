"use client";

import { Schema } from "effect";
import {
  ArrowLeft,
  ChevronRight,
  Loader2,
  Sparkles,
  Terminal,
  Upload,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Dropzone, FileUpload } from "@/components/ui/file-upload";
import { getSolution } from "@/lib/rpc-client";
import { Day, Part } from "@/services/schema";

export default function Page(props: PageProps<"/[day]/[part]">) {
  const [files, setFiles] = useState<File[]>([]);
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inputPreview, setInputPreview] = useState<string[]>([]);
  const pathSegments = usePathname().split("/");

  const day = Schema.decodeUnknownSync(Day)(Number(pathSegments[1]));
  const part = Schema.decodeUnknownSync(Part)(Number(pathSegments[2]));

  const handleFileChange = async (newFiles: File[]) => {
    setFiles(newFiles);
    setAnswer(null);
    setError(null);
    setInputPreview([]);

    if (newFiles.length === 0) return;

    setLoading(true);
    try {
      const text = await newFiles[0].text();
      const lines = text.split("\n").filter((line) => line.trim().length > 0);

      // Show first few lines as preview
      setInputPreview(lines.slice(0, 5));

      if (lines.length === 0) {
        setError("File is empty");
        setLoading(false);
        return;
      }

      const result = await getSolution({
        day,
        part,
        body: lines as [string, ...string[]],
      });
      setAnswer(result.answer);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to get solution");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 flex flex-col items-center px-4 py-8">
      {/* Navigation Header */}
      <div className="w-full max-w-2xl mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-terminal-green transition-colors text-sm font-terminal group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Calendar</span>
        </Link>
      </div>

      {/* Day/Part Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="text-star-gold text-xl animate-twinkle">*</span>
          <h1 className="font-pixel text-3xl sm:text-4xl text-foreground">
            DAY {day}
          </h1>
          <span
            className="text-star-gold text-xl animate-twinkle"
            style={{ animationDelay: "0.3s" }}
          >
            *
          </span>
        </div>

        {/* Part Tabs */}
        <div className="flex items-center justify-center gap-1 bg-card/50 rounded p-1 border border-border">
          <Link
            href={`/${day}/1`}
            className={`px-4 py-2 rounded font-terminal text-sm transition-all ${
              part === 1
                ? "bg-terminal-green text-background"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Part 1
          </Link>
          <Link
            href={`/${day}/2`}
            className={`px-4 py-2 rounded font-terminal text-sm transition-all ${
              part === 2
                ? "bg-terminal-green text-background"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Part 2
          </Link>
        </div>
      </div>

      {/* Terminal-style Input Area */}
      <div className="w-full max-w-2xl">
        <div className="border border-border rounded-lg overflow-hidden bg-card/30">
          {/* Terminal Header */}
          <div className="flex items-center gap-2 px-4 py-3 bg-card/50 border-b border-border">
            <span className="w-3 h-3 rounded-full bg-berry" />
            <span className="w-3 h-3 rounded-full bg-terminal-amber" />
            <span className="w-3 h-3 rounded-full bg-terminal-green" />
            <span className="text-muted-foreground text-xs ml-2 font-terminal">
              puzzle_input.txt
            </span>
          </div>

          {/* File Drop Zone */}
          <div className="p-6">
            <FileUpload
              maxFiles={1}
              className="w-full"
              value={files}
              onValueChange={handleFileChange}
            >
              <Dropzone>
                <div
                  className={`
                  flex flex-col items-center gap-4 p-8 rounded border-2 border-dashed
                  transition-all duration-300
                  ${loading ? "border-terminal-amber bg-terminal-amber/5" : "border-border hover:border-terminal-green hover:bg-terminal-green/5"}
                `}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-10 h-10 text-terminal-amber animate-spin" />
                      <div className="text-center">
                        <p className="font-terminal text-terminal-amber">
                          Computing solution...
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Processing {inputPreview.length > 0 ? "input" : "..."}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="p-4 rounded-full border border-border bg-card/50">
                        <Upload className="w-8 h-8 text-terminal-green" />
                      </div>
                      <div className="text-center">
                        <p className="font-terminal text-foreground">
                          Drop your puzzle input here
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          or click to browse files
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </Dropzone>
            </FileUpload>

            {/* Input Preview */}
            {inputPreview.length > 0 && !loading && (
              <div className="mt-4 p-3 bg-background/50 rounded border border-border">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                  <Terminal className="w-3 h-3" />
                  <span>Input preview:</span>
                </div>
                <pre className="text-xs text-terminal-green font-terminal overflow-x-auto">
                  {inputPreview.map((line, i) => (
                    <div key={i} className="flex">
                      <span className="text-muted-foreground w-6 shrink-0">
                        {i + 1}
                      </span>
                      <span>{line}</span>
                    </div>
                  ))}
                  {inputPreview.length >= 5 && (
                    <div className="text-muted-foreground">...</div>
                  )}
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mt-4 p-4 rounded border border-destructive bg-destructive/10">
            <div className="flex items-start gap-3">
              <span className="text-destructive text-lg">!</span>
              <div>
                <p className="font-terminal text-destructive text-sm">
                  Error occurred
                </p>
                <p className="text-xs text-muted-foreground mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Answer Display */}
        {answer && (
          <div className="mt-6 relative">
            {/* Success glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-terminal-green/20 via-star-gold/20 to-terminal-green/20 rounded-lg blur-lg opacity-75" />

            <div className="relative p-6 rounded-lg border border-terminal-green bg-card">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-star-gold animate-pulse" />
                <span className="font-pixel text-terminal-green text-sm">
                  SOLUTION FOUND
                </span>
                <Sparkles className="w-5 h-5 text-star-gold animate-pulse" />
              </div>

              <div className="flex items-center gap-4">
                <span className="text-muted-foreground font-terminal text-sm">
                  Answer:
                </span>
                <span className="font-pixel text-3xl text-star-gold glow-gold">
                  {answer}
                </span>
              </div>

              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                <p className="text-xs text-muted-foreground font-terminal">
                  Copy this answer to adventofcode.com
                </p>
                <button
                  onClick={() => navigator.clipboard.writeText(answer)}
                  className="text-xs font-terminal text-terminal-green hover:text-star-gold transition-colors flex items-center gap-1"
                >
                  Copy <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Part navigation hint */}
      {answer && part === 1 && (
        <div className="mt-8 text-center">
          <Link
            href={`/${day}/2`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded border border-star-gold text-star-gold hover:bg-star-gold hover:text-background transition-all font-terminal text-sm group"
          >
            Continue to Part 2
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      )}
    </main>
  );
}
