import { motion } from "framer-motion";
import CustomImage from "@/assets/images/fabout.jpg";
import Image from "next/image";

export default function About() {
  return (
    <div className="pt-14">
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#fff9f4]">

        {/* Hero Section */}
        <motion.section
          className="w-full py-24 bg-gradient-to-r from-[#9C661F] via-[#D2691E] to-[#7B3F00] text-white text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl font-extrabold mb-4 tracking-wider drop-shadow-lg font-[Playfair_Display]">Rreth Nesh</h1>
          <p className="text-2xl max-w-3xl mx-auto drop-shadow-md font-[Playfair_Display] ">
            Mirë se vini në restaurantin tonë – një vend ku shijet tradicionale takojnë kreativitetin modern në një atmosferë të ngrohtë dhe mikpritëse.
          </p>
        </motion.section>

        {/* Historiku Section me foto anash */}
        <motion.section
          className="max-w-6xl py-20 px-8 bg-[#fdf6f0] rounded-3xl  mx-4 md:mx-auto mt-16"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold mb-8 text-[#D2691E] text-center md:text-left">Historiku i Restorantit</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Teksti */}
            <p className="text-gray-700 text-lg leading-relaxed max-w-4xl mx-auto md:mx-0">
              Restoranti ynë u themelua në vitin 1995 me qëllim të ruajtjes së traditës së shijes autentike shqiptare, duke e kombinuar atë me teknikat bashkëkohore të gatimit. 
              Gjatë dekadave, ne kemi rritur përkushtimin ndaj cilësisë dhe mikpritjes, duke u bërë një destinacion i preferuar për familjet dhe vizitorët që kërkojnë një eksperiencë kulinare të paharrueshme.
            </p>
            {/* Foto */}
            <div className="flex justify-center md:justify-end">
              <Image
                src={CustomImage}
                alt="Foto Historiku Restorantit"
                width={450}
                height={300}
                className="rounded-2xl shadow-lg object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
          <p className="mt-6 italic text-[#A0522D] font-semibold text-center md:text-left">
            "Një histori e shijes dhe pasionit në çdo pjatë."
          </p>
        </motion.section>

        {/* Mission Section me max-w-7xl dhe padding më të madh */}
        <motion.section
          className="max-w-7xl py-20 px-12 text-center mx-auto"
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold mb-6 text-[#D2691E]">Misioni Ynë</h2>
          <p className="text-gray-700 text-lg max-w-none mx-auto">
            Të ofrojmë përvojën më të mirë të ngrënies për klientët tanë, përmes ushqimit të freskët, shërbimit të përzemërt dhe një ambienti të rehatshëm ku secili ndihet si në shtëpi.
          </p>
        </motion.section>

        {/* Vision Section me max-w-7xl dhe padding më të madh */}
        <motion.section
          className="w-full py-20 bg-[#fff8f2] text-center px-12"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="container max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-6 text-[#D2691E]">Vizioni Ynë</h2>
            <p className="max-w-none mx-auto text-gray-700 text-base mb-12">
              Ne jemi të përkushtuar të sjellim një përvojë të veçantë kulinare që ndërtohet mbi pasionin, përkushtimin dhe dashurinë për ushqimin cilësor.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <motion.div
                className="p-8 bg-white rounded-xl shadow-lg text-gray-800 text-lg leading-relaxed relative overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                <p>
                  Ne synojmë të bëhemi <span className="font-semibold text-[#D2691E]">restoranti më i dashur në qytet</span>, 
                  duke ndërtuar besim përmes cilësisë, qëndrueshmërisë dhe përkushtimit ndaj klientit çdo ditë.
                </p>
                <p className="italic text-[#D2691E] mt-6">
                  “Shija e mirë nuk harrohet kurrë.”
                </p>
              </motion.div>
              <motion.div
                className="flex justify-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
              >
                <Image
                  src={CustomImage}
                  alt="Foto Vizioni"
                  width={400}
                  height={300}
                  className="rounded-xl shadow-xl object-cover transition-transform duration-500 hover:scale-105"
                />
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Values Section */}
        <motion.section
          className="w-full py-20 text-center bg-[#fdf6f0] text-black"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold mb-10 text-[#D2691E]">Vlerat Tona</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-2xl font-semibold mb-2 text-[#7B3F00]">Freski</h3>
              <p>Ushqim i përgatitur çdo ditë me përbërës të freskët dhe vendas.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-2xl font-semibold mb-2 text-[#7B3F00]">Respekt</h3>
              <p>Respektojmë çdo klient dhe punonjës, duke ndërtuar një komunitet të fortë.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-2xl font-semibold mb-2 text-[#7B3F00]">Përkushtim</h3>
              <p>Punojmë çdo ditë për të ofruar përvojën më të mirë të ngrënies.</p>
            </div>
          </div>
        </motion.section>

      </div>
    </div>
  );
}

About.displayName = "about";
