import Image from "next/image";
//import { Geist, Geist_Mono } from "next/font/google";
import { motion } from "framer-motion";
import CustomBanner from "@/assets/images/fine-dining-restaurant-table-setting-wine-glasses.jpg"
import CustomImage from "@/assets/images/-1x-1.webp"
import CustomImage1 from "@/assets/images/new-york-august-26-2021-600nw-2033054912.webp"
import Button from "@/components/shared/Button";
import Card from "@/components/shared/Card";
import { Rocket, BarChart, ShieldCheck, Shield } from "lucide-react";
import useFetch from "@/hooks/useFetch";
import { useState } from "react";
import { useEffect } from "react";
import { CircularProgress } from "@mui/material";

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
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        {/* Hero Section */}
        <motion.section
          className="w-full py-32 text-white text-center"
           style={{
    backgroundImage: `url(${CustomBanner.src})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1 }}
>
          <h1 className="text-5xl font-bold mb-4">
            Mirë se Vini në Aplikacionin Tonë!
          </h1>
          <p className="text-xl">
            Ndërtoni aplikacione të fuqishme dhe të shpejta me Next.js
          </p>

          <Button text="Meso me shume" variant="secondary"  onClick={() => alert('redirect')} />
        </motion.section>

        {/* About Section */}
                        <motion.section
                  className="max-w-6xl py-20 px-6 text-center"
                  initial={{ x: -100 }}
                  animate={{ x: 0 }}
                  transition={{ duration: 1 }}
                >
                  <h2 className="text-4xl font-bold mb-6 text-red-700">
                    Rreth Nesh
                  </h2>
                  <p className="text-gray-700 mb-6">
                    Ne krijojmë aplikacione të avancuara duke përdorur teknologjitë më të fundit. Fokusimi ynë kryesor është të ofrojmë produkte të optimizuara dhe SEO-friendly.
                  </p>
                  
                  <div className="flex justify-center gap-x-6">
                    <Image
                      src={CustomImage}
                      alt="Imazh Rreth Nesh"
                      width={500}
                      height={300}
                      className="rounded-xl"
                    />
                    <Image
                      src={CustomImage1}
                      alt="Imazh Rreth Nesh"
                      width={500}
                      height={300}
                      className="rounded-xl"
                    />
                  </div>
                </motion.section>


              {/* Features Section */}
                <motion.section
                  className="w-full py-20 bg-gray-300 text-center"
                  initial={{ y: 100 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1 }}
                >
                  <div className="container m-auto">
                    <h2 className="text-4xl font-bold mb-6 text-red-700">
                      Karakteristikat Kryesore
                    </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card title="Shpejtesi & Perfomance" description="Ranku me i mire" 
                  icon={Rocket} />
                   
                  <Card title="SEO e Avancuar" description="Ranku me i mire" 
                  icon={BarChart} />

            <Card title="Siguri Maksimale" description="Ranku me i mire" 
                  icon={ShieldCheck} />

                   </div>
                  </div>
                </motion.section>

                {/* Services Section */}
              <motion.section
                className="max-w-6xl py-20 px-6 text-center"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1 }}
              >
                <h2 className="text-4xl font-bold mb-6 text-red-700">
                  Shërbimet Tona
                </h2>
                <p className="text-gray-700 mb-6">
                  Ofrojmë një gamë të gjerë shërbimesh duke përfshirë zhvillimin e aplikacioneve web, optimizimin për SEO dhe integrimin me API të jashtme.
                </p>

                <Button 
                  text="Shiko Sherbimet"
                  variant="secondary"
                  onClick={() => alert('redirect')} />
              </motion.section>

                            {/* Contact Section */}

                  <div className="grid grid-cols-3 py-20 bg-gray-300">
                  {loading ? (
                    
                  <CircularProgress />
                  ) : (

                    <>
                    {posts && posts.map((post) => (
                    <motion.section
                      key={post.id}
                      className="bg-white p-6 rounded-lg shadow-md m-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h3 className="text-2xl font-bold mb-4">{post.title}</h3>
                      <p className="text-gray-700 py-4">{post.body}</p>
                      <Button text="Lexo me shume" variant="secondary" onClick={() => alert('redirect')} />
                      <div className="flex justify-between items-center mt-4 px-4 ">
                        <span className="text-gray-500">Postuar nga: {post.id}</span>
                        {/* <span className="text-gray-500">Data: {new Date().toLocaleDateString()}</span> */}
                      </div>
                    </motion.section>
                  ))}


                    </>




                  )}


</div>

              {/* Contact Section */}
              <motion.section
                className="w-full py-20 bg-blue-900 text-black text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <h2 className="text-4xl font-bold mb-6">Contact Us</h2>
                <p>Email: contact@mycompany.com</p>
                <p>Tel: +383 123 456 789</p>
                <p>Adresa: Prishtinë, Kosovë</p>

                <Button 
                  text="Na Kontaktoni"
                  variant="secondary"
                  onClick={() => alert('opening contact form')} />
              </motion.section>




      </div>
    </div>
  );
}

Home.displayName = "My Application";
