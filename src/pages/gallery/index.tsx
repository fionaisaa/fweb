import Image from "next/image";


import Img1 from "@/assets/images/pexels-photo-262978.jpeg";
import Img2 from "@/assets/images/360_F_324739203_keeq8udvv0P2h1MLYJ0GLSlTBagoXS48.jpg";
import Img3 from "@/assets/images/Drinks-Glass-Bar-Design..jpg";
import Img4 from "@/assets/images/amiralto-roof-bar.jpg";
import Img5 from "@/assets/images/ai-generated-generative-ai-busy-chefs-working-on-the-restaurant-kitchen-blurred-background-photo.jpg";
import Img6 from "@/assets/images/Hotel_and_Restaurant_Entrance_(geograph_5511387).jpg";
import img7 from "@/assets/images/img7.jpeg";
import img8 from"@/assets/images/img8.jpg";
import img9 from"@/assets/images/img9.jpg";
const images = [
  { src: Img1, alt: "Foto 1" },
  { src: Img2, alt: "Foto 2" },
  { src: Img3, alt: "Foto 3" },
  { src: Img4, alt: "Foto 4" },
  { src: Img5, alt: "Foto 5" },
  { src: Img6, alt: "Foto 6" },
  { src: img7, alt: "Foto 7" },
  { src: img8, alt: "Foto 8" },
  { src: img9, alt: "Foto 9" },
];

export default function Gallery() {
  return (
    <div className="pt-20 bg-[#fff3e0] min-h-screen">
    <h1 className="font-dancing text-5xl text-center text-[#7B3F00] tracking-wider mb-1">
        Aromat e traditës në pamje
      </h1>
      <div className="container mx-auto px-6 pt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map(({ src, alt }, i) => (
          <div key={i} className="overflow-hidden rounded-lg shadow-lg">
            <Image
              src={src}
              alt={alt}
              width={400}
              height={300}
              className="object-cover w-full h-60 hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
