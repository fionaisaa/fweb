import useFetch from "@/hooks/useFetch";
import { News } from "@/pages/api/models/News";
import router from "next/router";
import { useState } from "react";

export default function CreateNews() {
  const [newNews, setNewNews] = useState({ title: "", body: "" });
  const { postData } = useFetch<News[]>("/api/news");

  const handleCreate = async () => {
    if (!newNews.title || !newNews.body) return;
    await postData(newNews);
    setNewNews({ title: "", body: "" });
    router.push("/news");
  };

  return (
    <div className="min-h-screen bg-[#fff8f0] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-[#5a2d0c] mb-8">
          Shto News të ri
        </h2>

        <form onSubmit={(e) => { e.preventDefault(); handleCreate(); }} className="space-y-4">
          <input
            type="text"
            placeholder="Titulli"
            value={newNews.title}
            onChange={(e) => setNewNews({ ...newNews, title: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />

          <textarea
            placeholder="Përmbajtja"
            value={newNews.body}
            onChange={(e) => setNewNews({ ...newNews, body: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            rows={4}
            required
          />

          <button
            type="submit"
            className="w-full py-3 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 transition duration-200"
          >
            Shto News
          </button>
        </form>
      </div>
    </div>
  );
}
