import Image from "next/image";
import { motion } from "framer-motion";
import CustomBanner from "@/assets/images/fine-dining-restaurant-table-setting-wine-glasses.jpg";
import CustomImage from "@/assets/images/-1x-1.webp";
import CustomImage1 from "@/assets/images/new-york-august-26-2021-600nw-2033054912.webp";
import Button from "@/components/shared/Button";
import Card from "@/components/shared/Card";
import { Rocket, BarChart, ShieldCheck } from "lucide-react";
import useFetch from "@/hooks/useFetch";
import { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import router from "next/router";
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet" />

export interface Post {
  id: string;
  title: string;
  body: string;
}

export default function Home() {
  const { data: initialPosts, loading } = useFetch<Post[]>(
    "https://jsonplaceholder.typicode.com/posts?_limit=3"
  );
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (initialPosts) {
      setPosts(initialPosts);
    }
  }, [initialPosts]);

  return (
    <div className="pt-14">
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#fff3e0]">
        
        {/* Hero Section */}
        <motion.section
          className="relative w-full py-32 text-white text-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Background Image with Blur */}
          <div
            className="absolute inset-0 bg-center bg-cover blur-none brightness-40"
            style={{
              backgroundImage: `url(${CustomBanner.src})`,
            }}
          />

          {/* Overlay Content */}
          <div className="relative z-10 px-4">
            <h1 className="text-5xl font-[Playfair_Display]  mb-4 drop-shadow-xl text-gray-100">
              Mirë se Vini në Apulia Restaurant!
            </h1>
            <p className="text-xl  font-[Playfair_Display] drop-shadow-lg text-orange-300">
              Tradita jonë në çdo shije – përjetoni shërbim të shkëlqyer dhe ambient të ngrohtë.
            </p>
          </div>
        </motion.section>

        {/* About Section */}
        <motion.section
          className="max-w-6xl py-20 px-6 text-center"
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-5xl font-[Playfair_Display] mb-6 text-[#D2691E]">Rreth Nesh</h2>
          <p className="text-gray-700 mb-6  font-[Playfair_Display] text-4xl ">
            Ne përgatisim ushqime të shijshme me përkushtim dhe dashuri. Cilësia është prioriteti ynë.
          </p>
          <div className="flex justify-center gap-x-6 flex-wrap">
            <Image src={CustomImage} alt="Imazh 1" width={400} height={250} className="rounded-xl shadow-lg" />
            <Image src={CustomImage1} alt="Imazh 2" width={400} height={250} className="rounded-xl shadow-lg" />
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section
          className="w-full py-20 bg-[#fff8f2] text-center"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="container m-auto">
            <h2 className="text-4xl  font-[Playfair_Display] mb-10 text-[#D2691E]">Pse të na Zgjidhni</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card title="Shije Unike" description="Receta të veçanta tradicionale dhe moderne." icon={Rocket} />
              <Card title="Ambient Komod" description="Krijuar për rehati dhe relaksim." icon={BarChart} />
              <Card title="Cilësi & Siguri" description="Standarde të larta në çdo hap." icon={ShieldCheck} />
            </div>
          </div>
        </motion.section>

        {/* Testimonials Section */}
        <motion.section
          className="w-full py-20 bg-[#fdf6f0] text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl  font-[Playfair_Display]  mb-10 text-[#D2691E]">Çfarë Thonë Klientët Tanë</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <p className="text-gray-800 italic">
                “Ushqimi ishte i mrekullueshëm dhe shërbimi i pakrahasueshëm. Do të rikthehem patjetër!”
              </p>
              <p className="mt-4 font-semibold text-[#7B3F00]">– Ardita K.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <p className="text-gray-800 italic">
                “Ambienti është shumë i këndshëm dhe menyja ka shumëllojshmëri. 5 yje!”
              </p>
              <p className="mt-4 font-semibold text-[#7B3F00]">– Driton R.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <p className="text-gray-800 italic">
                “Përvoja më e mirë që kam pasur në një restorant lokal. E rekomandoj ngrohtësisht.”
              </p>
              <p className="mt-4 font-semibold text-[#7B3F00]">– Elira M.</p>
            </div>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          className="w-full py-20 bg-[#7B3F00] text-white text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl  font-[Playfair_Display] mb-6 bg-[#7B3F00]" >Contact Us</h2>
          <p>Email: kontakt@restoranti.com</p>
          <p>Tel: +383 123 456 789</p>
          <p>Adresa: Prishtinë, Kosovë</p>
          <div className="mt-6">
            <Button text="Contact Us" variant="secondary" onClick={() => router.push("/contact")} />
          </div>
        </motion.section>

      </div>
    </div>
  );
}

Home.displayName = "My Application";
