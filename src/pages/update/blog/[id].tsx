import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useFetch from "@/hooks/useFetch";
import { CircularProgress } from "@mui/material";
import { Blog } from "@/pages/api/models/Blog";

export default function UpdateBlog() {
  const router = useRouter();
  const { id } = router.query;
  const { data: blog, loading, putData } = useFetch<Blog>(id ? `/api/blogs/${id}` : null);
  const [formData, setFormData] = useState({
    title: "",
    body: ""
  });

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title,
        body: blog.body
      });
    }
  }, [blog]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!id) {
      alert("ID e blogut nuk është e përcaktuar!");
      return;
    }

    try {
      await putData(formData);
      alert("Blogu u përditësua me sukses!");
      router.push("/blogs");
    } catch (error) {
      console.error("Gabim gjatë përditësimit:", error);
      alert("Ndodhi një gabim gjatë përditësimit të blogut");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Përditëso Blogun</h1>
      
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="title">
            Titulli
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="body">
            Përmbajtja
          </label>
          <textarea
            id="body"
            name="body"
            value={formData.body}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg h-40"
            required
          />
        </div>
        
        <button
          type="submit"
          className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700"
        >
          Përditëso
        </button>
      </form>
    </div>
  );
}