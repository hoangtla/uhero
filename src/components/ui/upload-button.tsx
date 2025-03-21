"use client";

import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/lib/uploadthing";

export function UploadButtonComponent() {
  return (
    <UploadButton<OurFileRouter, "productImage">
      endpoint="productImage"
      onClientUploadComplete={(res) => {
        console.log("Files: ", res);
        alert("Upload thành công!");
      }}
      onUploadError={(error: Error) => {
        console.error("Error: ", error);
        alert(`Lỗi: ${error.message}`);
      }}
    />
  );
} 