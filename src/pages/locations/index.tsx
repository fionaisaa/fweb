
import { motion } from "framer-motion";
import CustomImage from "@/assets/images/fabout.jpg"
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
            <h2 className="text-4xl font-bold mb-10 text-[#D2691E]">Vizioni Ynë</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="p-8 bg-white rounded-xl shadow-lg text-gray-800 text-lg leading-relaxed">
                Ne synojmë të bëhemi një restaurant më i dashur në qytet, duke ndërtuar besim përmes cilësisë, qëndrueshmërisë dhe përkushtimit ndaj klientit çdo ditë.
              </div>
              <div className="flex justify-center">
                <Image
                  src={CustomImage}
                  alt="Ekipi ynë"
                  width={500}
                  height={300}
                  className="rounded-xl shadow-xl object-cover"
                />
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

About.displayName = "about";
