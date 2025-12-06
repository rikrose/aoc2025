"use client";

import { Schema } from "effect";
import { Upload } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Dropzone, FileUpload } from "@/components/ui/file-upload";
import { Day, Part } from "@/services/schema";

export default function Page(props: PageProps<"/[day]/[part]">) {
  const [files, setFiles] = useState<File[]>([]);
  const pathSegments = usePathname().split("/");

  const day = Schema.decodeUnknownSync(Day)(pathSegments[1]);
  const part = Schema.decodeUnknownSync(Part)(pathSegments[2]);

  return (
    <FileUpload
      maxFiles={1}
      className="w-full max-w-md"
      value={files}
      onValueChange={setFiles}
    >
      <Dropzone>
        <div className="flex flex-col items-center gap-1 text-center">
          <div className="flex items-center justify-center rounded-full border p-2.5">
            <Upload className="size-6 text-muted-foreground" />
          </div>
          <p className="font-medium text-sm">Drop input data here</p>
        </div>
      </Dropzone>
    </FileUpload>
  );
}
