import { useRouter } from "next/router";
import { useState } from "react";
import useFetch from "@/hooks/useFetch";

export default function CreateBlog() {
  const router = useRouter();
  const [newBlog, setNewBlog] = useState({ title: "", body: "" });
  const { postData } = useFetch("/api/blogs");

  const handleCreate = async () => {
    if (!newBlog.title || !newBlog.body) return;
    await postData(newBlog);
    router.push("/blogs");
  };

  return (
    <div className="pt-12">
      <div className="flex flex-col items-center justify-center min-h-screen gap-y-20">
        <div className="mb-10 max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-black text-2xl font-semibold mb-4">
            Shto Blog të ri
          </h2>
          <input
            type="text"
            placeholder="Titulli"
            value={newBlog.title}
            onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
            className="w-full px-4 py-2 mb-4 border rounded placeholder-gray-400 text-black"
          />
          <textarea
            placeholder="Përmbajtja"
            value={newBlog.body}
            onChange={(e) => setNewBlog({ ...newBlog, body: e.target.value })}
            className="w-full px-4 py-2 mb-4 border rounded placeholder-gray-400 text-black"
          />
          <button onClick={handleCreate} className="px-4 py-2 bg-blue-500 text-white rounded">
            Krijo Blog
          </button>
        </div>
      </div>
    </div>
  );
}
