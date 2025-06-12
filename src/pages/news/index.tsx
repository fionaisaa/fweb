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
        const confirmDelete = confirm("A jeni i sigurt që doni të fshini këtë lajm?");
        if (confirmDelete) {
            const response = await fetch(`/api/news/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                setNews((prevNews) => prevNews.filter((newsItem) => newsItem._id !== id));
            } else {
                alert("Fshirja dështoi");
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#fff8f0] py-12 pt-24 px-6">
            <h1 className="text-4xl font-bold text-center text-[#5a2d0c] mb-12 uppercase tracking-wide">
                Lajmet e Fundit
            </h1>
            <div className="flex flex-col items-center justify-center gap-y-12">
                {loading ? (
                    <CircularProgress />
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
                            {news && news.length > 0 ? (
                                news.map((post: News) => (
                                    <motion.div
                                        key={post._id}
                                        className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:shadow-xl transition duration"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        <h2 className="text-2xl font-semibold text-[#c2410c] mb-3 line-clamp-2 uppercase">
                                            {post.title}
                                        </h2>
                                        <p className="text-gray-800 mb-6 line-clamp-4">{post.body}</p>
                                        <div className="flex justify-end gap-4 mt-auto">
                                            <Tooltip title="Përditëso">
                                                <IconButton onClick={() => router.push("/update/news/" + post._id)}>
                                                    <Edit className="text-orange-500" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Fshij">
                                                <IconButton onClick={() => handleDeleteNews(post._id)}>
                                                    <Trash className="text-red-500" />
                                                </IconButton>
                                            </Tooltip>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="text-center text-gray-600 text-xl font-medium py-16">
                                    Nuk ka lajme në databazë.
                                </div>
                            )}
                        </div>
                        <div className="text-center pt-8">
                            <Link href="/create/news">
                                <button className="px-6 py-2 bg-[#5a2d0c] text-white hover:bg-[#7c3d1c] rounded-xl transition">
                                    Shto Lajm
                                </button>
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}


