import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  // Định nghĩa route cho upload ảnh sản phẩm
  productImage: f({ image: { maxFileSize: "4MB", maxFileCount: 4 } })
    .middleware(async () => {
      // Kiểm tra xác thực ở đây nếu cần
      return { userId: "admin" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("File URL:", file.url);
    }),

  // Route cho avatar người dùng
  avatar: f({ image: { maxFileSize: "1MB", maxFileCount: 1 } })
    .middleware(async () => {
      return { userId: "user" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Avatar uploaded for userId:", metadata.userId);
      console.log("Avatar URL:", file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter; 