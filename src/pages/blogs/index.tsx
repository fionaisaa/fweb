import useFetch from "@/hooks/useFetch";
import { CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Blog } from "@/pages/api/models/Blog";
import { useRouter } from "next/router";

export interface Post {
  id: string;
  title: string;
  body: string;
}

export default function Blogs() {
  const router = useRouter();
  const { data: initialPosts, loading } = useFetch<Post[]>(
    "https://jsonplaceholder.typicode.com/posts?_limit=3"
  );
  const [posts, setPosts] = useState<Post[]>([]);

  // Blog nga databaza jone
  const { 
    data: initialBlogsData, 
    loading: blogsLoading, 
    deleteData 
  } = useFetch<Blog[]>("/api/blogs");
  const [blogsData, setBlogsData] = useState<Blog[]>([]);

  useEffect(() => {
    if (initialBlogsData) {
      setBlogsData(initialBlogsData);
    }
  }, [initialBlogsData]);

  useEffect(() => {
    if (initialPosts) {
      setPosts(initialPosts);
    }
  }, [initialPosts]);

  const handleDelete = (id: string) => {
    if (posts) {
      setPosts(posts.filter((post) => post.id !== id));
    }
  };

  const handleDeleteBlog = async (id: string) => {
    const confirmed = confirm("A jeni sigurt që dëshironi të fshini këtë blog?");
    if (!confirmed) return;
  
    try {
      await deleteData(`/api/blogs/${id}`);
      alert("U fshi me sukses!");
      // Në vend që të reload faqen, filtro blogjet lokalisht
      if (blogsData) {
        setBlogsData(blogsData.filter(blog => blog._id !== id));
      }
    } catch (error) {
      console.error("Gabim gjatë fshirjes:", error);
      alert("Ndodhi një gabim gjatë fshirjes së blogut");
    }
  };

  return (
    <div className="py-12 px-4 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-5xl font-extrabold text-yellow-600 uppercase tracking-wide">
          Blog Posts
        </h1>
        <p className="text-gray-600 mt-4">
          Shfaqja e blogut në single page me Static dhe Server Side Generation
        </p>
      </div>

      {/* Seksioni për blogjet nga databaza juaj */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center text-yellow-500 mb-10">
          Blogjet nga databaza jonë
        </h2>
        
        <div className="text-center pb-10">
          <Link href={"/create/blog"}>
            <button className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition">
              Shto Blog
            </button>
          </Link>
        </div>
      
        
        {blogsLoading ? (
          <div className="flex justify-center items-center h-40">
            <CircularProgress />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {blogsData?.map((blog) => (
              <div
                key={blog._id}
                className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between transition duration-300 hover:shadow-2xl"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{blog.title}</h2>
                <p className="text-gray-600 mb-4">{blog.body}</p>
                <p className="text-sm text-gray-500 mb-4">
                  Krijuar më: {new Date(blog.createdAt).toLocaleDateString()}
                </p>
                <div className="flex justify-between items-center">
                        <Link
                          href={`/blogs/${blog._id}`}
                          className="text-blue-600 hover:underline font-medium"
                        >
                          Shiko Detajet
                        </Link>
                        <div className="space-x-2">

{/* Përdorni këtë: */}
                            <Link href={`/update/blog/${blog._id}`}>
                              <button className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium py-2 px-4 rounded-xl transition duration-200">
                                Update
                              </button>
                            </Link>
                            <button
                            onClick={() => handleDeleteBlog(blog._id)}
                            className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-2 px-4 rounded-xl transition duration-200"
                          >
                            Fshi
                          </button>
                        </div>
</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Seksioni për blogjet nga JSONPlaceholder */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <CircularProgress />
        </div>
      ) : (
        <>
          <div className="mt-16 border-t pt-10">
            <h2 className="text-3xl font-bold text-center text-yellow-500 mb-10">
              Blogjet e testit (JSONPlaceholder)
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between transition duration-300 hover:shadow-2xl"
                >
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{post.title}</h2>
                  <p className="text-gray-600 mb-4">{post.body}</p>
                  <div className="flex justify-between items-center">
                    <Link
                      href={`/blogs/ssr/${post.id}`}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Shiko Detajet (SSR)
                    </Link>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-2 px-4 rounded-xl transition duration-200"
                    >
                      Fshi
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

Blogs.displayName = "Blogs";