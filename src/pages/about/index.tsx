
import { motion } from "framer-motion";
import CustomImage from "@/assets/images/fabout.jpg"
import ChefImage from "@/assets/images/1578659_stock-photo-professional-chef-man.jpg"
import MenagerImage from "@/assets/images/1000_F_314897330_vXScKgKuQf8NdaCDKlfChDG9B87OlOTW.jpg"
import WaiterImage from "@/assets/images/young-elegant-waiter-black-waistcoat-bowtie-holding-white-towel-plate-while-standing_926199-2679749.avif"
import Image from "next/image"

/*export default function About() {
    return (
      <div className="pt-14">
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          {/* Introduction Section }
          <motion.section
            className="w-full py-20 bg-blue-900 text-black text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-5xl font-bold mb-4">Rreth Nesh</h1>
            <p className="text-xl">
              Ne jemi një ekip pasionant që ndërtojmë aplikacione moderne dhe të fuqishme me teknologji të avancuar.
            </p>
          </motion.section>
                            {/* Our Mission Section 
                        <motion.section
                        className="max-w-6xl py-20 px-6 text-center"
                        initial={{ x: -100 }}
                        animate={{ x: 0 }}
                        transition={{ duration: 1 }}
                        >
                        <h2 className="text-4xl font-bold mb-6 text-red-600">
                            Misioni Ynë
                        </h2>
                        <p className="text-gray-700 mb-6">
                            Misioni ynë është të ofrojmë zgjidhje inovative dhe të qëndrueshme
                            për zhvillimin e aplikacioneve që përmbushin nevojat e klientëve
                            tanë në mënyrë të plotë.
                        </p>
                        </motion.section>

                        {/* Vision Section *
                        <motion.section
                        className="w-full py-20 bg-gray-200 text-center"
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1 }}
                        >
                        <div className="container mx-auto">
                            <h2 className="text-4xl font-bold mb-6 text-red-600">
                            Vizioni Ynë
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="p-6 bg-black rounded-xl shadow-md">
                                <p>
                                Ne aspirojmë të bëhemi liderë në fushën e zhvillimit të aplikacioneve,
                                duke krijuar produkte të qëndrueshme dhe të adaptueshme për të gjithë përdoruesit.
                                </p>
                            </div>
                            <div>
                                <Image
                                src={CustomImage}
                                alt="Ekipi ynë"
                                width={500}
                                height={300}
                                className="rounded-xl"
                                />
                            </div>
                            </div>
                        </div>
                        </motion.section>



        </div>
      </div>
    );
  }*\
  

About.displayName = "about"*/



export default function About() {
  return (
    <div className="pt-14">
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#fdf6f0]">
        {/* Hero Section */}
        <motion.section
          className="w-full py-24 bg-[#7B3F00] text-white text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl font-extrabold mb-4 tracking-wide">Rreth Nesh</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Mirë se vini në restaurantin tonë – një vend ku shijet tradicionale takojnë kreativitetin modern në një atmosferë të ngrohtë dhe mikpritëse.
          </p>
        </motion.section>

        {/* Mission Section */}
        <motion.section
          className="max-w-6xl py-20 px-6 text-center"
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold mb-6 text-[#D2691E]">Misioni Ynë</h2>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto">
            Të ofrojmë përvojën më të mirë të ngrënies për klientët tanë, përmes ushqimit të freskët, shërbimit të përzemërt dhe një ambienti të rehatshëm ku secili ndihet si në shtëpi.
          </p>
        </motion.section>

        {/* Vision Section */}
        <motion.section
  className="w-full py-20 bg-[#fff8f2] text-center"
  initial={{ y: 100 }}
  animate={{ y: 0 }}
  transition={{ duration: 1 }}
>
  <div className="container mx-auto px-4">
    <h2 className="text-4xl font-bold mb-6 text-[#D2691E]">Vizioni Ynë</h2>
    <p className="max-w-2xl mx-auto text-gray-700 text-base mb-12">
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
          alt="Ekipi ynë"
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
          className="w-full py-20 text-center bg-[#fdf6f0]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold mb-10 text-[#D2691E]">Vlerat Tona</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-2xl font-semibold mb-2 text-[#7B3F00]">Freski</h3>
              <p>Ushqim i përgatitur çdo ditë me përbërës të freskët dhe vendas.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-2xl font-semibold mb-2 text-[#7B3F00]">Respekt</h3>
              <p>Respektojmë çdo klient dhe punonjës, duke ndërtuar një komunitet të fortë.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-2xl font-semibold mb-2 text-[#7B3F00]">Përkushtim</h3>
              <p>Punojmë çdo ditë për të ofruar përvojën më të mirë të ngrënies.</p>
            </div>
          </div>
        </motion.section>


        {/* Team Section */}
          <motion.section
            className="w-full py-20 bg-white text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-4xl font-bold mb-10 text-[#D2691E]">Ekipi Ynë</h2>
            <div className="flex flex-wrap justify-center gap-8">
              <div className="w-64 p-4 bg-[#fff8f2] rounded-xl shadow-lg">
                <div className="w-48 h-48 mx-auto mb-4 overflow-hidden rounded-full">
                  <Image
                    src={ChefImage}
                    alt="Shefi i Kuzhinës"
                    width={192}
                    height={192}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h3 className="text-xl font-semibold">Ardian Krasniqi</h3>
                <p className="text-sm text-gray-600">Shef Kuzhine</p>
              </div>

              <div className="w-64 p-4 bg-[#fff8f2] rounded-xl shadow-lg">
                <div className="w-48 h-48 mx-auto mb-4 overflow-hidden rounded-full">
                  <Image
                    src={MenagerImage}
                    alt="Menaxherja"
                    width={192}
                    height={192}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h3 className="text-xl font-semibold">Alma Berisha</h3>
                <p className="text-sm text-gray-600">Menaxhere Restoranti</p>
              </div>

              <div className="w-64 p-4 bg-[#fff8f2] rounded-xl shadow-lg">
                <div className="w-48 h-48 mx-auto mb-4 overflow-hidden rounded-full">
                  <Image
                    src={WaiterImage}
                    alt="Kamarieri"
                    width={192}
                    height={192}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h3 className="text-xl font-semibold">Dren Gashi</h3>
                <p className="text-sm text-gray-600">Kamarieri Kryesor</p>
              </div>
            </div>

          </motion.section>


      </div>
    </div>
  );
}

About.displayName = "about";
