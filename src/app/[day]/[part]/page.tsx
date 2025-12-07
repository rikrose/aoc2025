"use client";

import { Schema } from "effect";
import { Upload } from "lucide-react";
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
  const pathSegments = usePathname().split("/");

  const day = Schema.decodeUnknownSync(Day)(Number(pathSegments[1]));
  const part = Schema.decodeUnknownSync(Part)(Number(pathSegments[2]));

  const handleFileChange = async (newFiles: File[]) => {
    setFiles(newFiles);
    setAnswer(null);
    setError(null);

    if (newFiles.length === 0) return;

    setLoading(true);
    try {
      const text = await newFiles[0].text();
      const lines = text.split("\n").filter((line) => line.trim().length > 0);

      if (lines.length === 0) {
        setError("File is empty");
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
    <div className="flex flex-col items-center gap-4">
      <FileUpload
        maxFiles={1}
        className="w-full max-w-md"
        value={files}
        onValueChange={handleFileChange}
      >
        <Dropzone>
          <div className="flex flex-col items-center gap-1 text-center">
            <div className="flex items-center justify-center rounded-full border p-2.5">
              <Upload className="size-6 text-muted-foreground" />
            </div>
            <p className="font-medium text-sm">
              {loading ? "Computing..." : "Drop input data here"}
            </p>
          </div>
        </Dropzone>
      </FileUpload>

      {error && (
        <div className="text-red-500 text-sm">
          Error: {error}
        </div>
      )}

      {answer && (
        <div className="p-4 bg-green-100 dark:bg-green-900 rounded-lg">
          <p className="font-mono text-lg">Answer: {answer}</p>
        </div>
      )}
    </div>
  );
}
