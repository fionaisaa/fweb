import useFetch from "@/hooks/useFetch";
import { useNewsContext } from "@/lib/contexts/NewsContext";
import { useRouter } from "next/router";
import { News } from "../api/models/News";
import { useEffect } from "react";
import { CircularProgress, IconButton, Tooltip } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";
import { Edit, Trash } from "lucide-react";
import { div } from "framer-motion/client";

/*export default function NewsPage() {

    const router = useRouter();
    const { news, setNews } = useNewsContext();
    const { data, loading } = useFetch<News[]>("/api/news");

  useEffect(() => {
    if (data) {
        setNews(data);
    }}, [data])

  const handleDeleteNews = async (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this news?");
    if (confirmDelete) {
        const response = await fetch(`/api/news/${id}`, {
            method: "DELETE",
        });
        if (response.ok) {
            setNews((prevNews) => prevNews.filter((newsItem) => newsItem._id !== id));
        } else {
            alert("Failed to delete news");
        }}
    } 

 return(

    <div className="pt-12 ">

        <div className="flex flex-col items-center justify-center min-h-screen gap-y-20">
            {loading ? ( <CircularProgress /> 
            
            ) : (
            
            
            <> <div className="bg-gray-200 w-full">
                        <h1 className="text-4xl font-bold pt-20 pb-6 text-black text-center">Shfaqja e news nga databaza jone</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                            {news && news.length > 0 ? (
                                news.map((post: News) => (
                                    <motion.section
                                        key={post._id}
                                        className="bg-white rounded-3xl shadow-lg p-8 flex flex-col justify-between hover:shadow-xl transition duration"
                                        initial={{ opacity:0, y:20}}
                                        animate={{ opacity:1, y:0}}
                                        transition={{ duration: 0.6 }}
                                    >
                                        <h2 className="text-4xl font-bold mb-4 text-red-600 line-clamp-2 uppercase">
                                            {post.title}
                                        </h2>
                                        <p className="text-gray-700 mb-6 line-clamp-4">{post.body}</p>
                                        <div className="flex flex-col sm:flex-row justify-end gap-4 mt-auto">
                                         
                                            <Tooltip title="update">
                                                <IconButton onClick={() => router.push("update/news/" + post._id)}>
                                                    <Edit className="text-grey-400"/>
                                                </IconButton>
                                            </Tooltip>
                                       
                                         <Tooltip title="delte" >
                                         <IconButton onClick={() => handleDeleteNews(post._id)}>
                                            <Trash className="text-grey-400" />
                                          </IconButton>
                                          </Tooltip>
                                        </div>
                                    </motion.section>
                                ))
                            ) : (
                                <div className="py-20 text-center text0gray-600 text-xl font-medium">
                                    Nuk ka news ne databaze
                                </div>  
                            )}
                        </div>
                        <div className="text-center pb-10">
                            <Link href="/create/news">
                                <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl transition">
                                    Shto News
                                </button>
                            </Link>
                        </div>
                    </div>
                 )}

               </div
        </div>

    </div>
 )
 }*/
export default function NewsPage() {
    const router = useRouter();
    const { news, setNews } = useNewsContext();
    const { data, loading } = useFetch<News[]>("/api/news");

    useEffect(() => {
        if (data) {
            setNews(data);
        }
    }, [data]);

    const handleDeleteNews = async (id: string) => {
        const confirmDelete = confirm("Are you sure you want to delete this news?");
        if (confirmDelete) {
            const response = await fetch(`/api/news/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                setNews((prevNews) => prevNews.filter((newsItem) => newsItem._id !== id));
            } else {
                alert("Failed to delete news");
            }
        }
    };

    return (
        <div className="pt-12">
            <div className="flex flex-col items-center justify-center min-h-screen gap-y-20">
                {loading ? (
                    <CircularProgress />
                ) : (
                    <>
                        <div className="bg-gray-200 w-full">
                            <h1 className="text-4xl font-bold pt-20 pb-6 text-black text-center">
                                Shfaqja e news nga databaza jone
                            </h1>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                                {news && news.length > 0 ? (
                                    news.map((post: News) => (
                                        <motion.section
                                            key={post._id}
                                            className="bg-white rounded-3xl shadow-lg p-8 flex flex-col justify-between hover:shadow-xl transition duration"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6 }}
                                        >
                                            <h2 className="text-4xl font-bold mb-4 text-red-600 line-clamp-2 uppercase">
                                                {post.title}
                                            </h2>
                                            <p className="text-gray-700 mb-6 line-clamp-4">{post.body}</p>
                                            <div className="flex flex-col sm:flex-row justify-end gap-4 mt-auto">
                                                <Tooltip title="update">
                                                    <IconButton onClick={() => router.push("update/news/" + post._id)}>
                                                        <Edit className="text-grey-400" />
                                                    </IconButton>
                                                </Tooltip>

                                                <Tooltip title="delete">
                                                    <IconButton onClick={() => handleDeleteNews(post._id)}>
                                                        <Trash className="text-grey-400" />
                                                    </IconButton>
                                                </Tooltip>
                                            </div>
                                        </motion.section>
                                    ))
                                ) : (
                                    <div className="py-20 text-center text-gray-600 text-xl font-medium">
                                        Nuk ka news ne databaze
                                    </div>
                                )}
                            </div>

                            <div className="text-center pb-10">
                                <Link href="/create/news">
                                    <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl transition">
                                        Shto News
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}





NewsPage.displayName = "NewsPage";

