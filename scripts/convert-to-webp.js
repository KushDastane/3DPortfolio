import imagemin from "imagemin";
import imageminWebp from "imagemin-webp";

await imagemin(["raw-images/*.{jpg,png,jpeg}"], {
  destination: "public/images",
  plugins: [
    imageminWebp({
      quality: 80,
    }),
  ],
});

console.log("✅ Images converted to WebP");
