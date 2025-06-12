import useFetch from "@/hooks/useFetch";
import { News } from "@/pages/api/models/News";
import router, { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function UpdateNews() {
  const router = useRouter();
  const { id } = router.query;
  const [newNews, setNewNews] = useState({ title: "", body: "" });

  const {
    data: existingNews,
    loading,
    putData,
  } = useFetch<News>(`/api/news/${id}`);

  useEffect(() => {
    if (existingNews) {
      setNewNews({
        title: existingNews.title,
        body: existingNews.body,
      });
    }
  }, [existingNews]);

  const handleUpdate = async () => {
    if (!newNews.title || !newNews.body || !id) return;
    await putData(newNews);
    router.push("/news");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-600">Duke u ngarkuar...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fff8f0] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-[#5a2d0c] mb-8">
          Përditëso News
        </h2>

        <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }} className="space-y-4">
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
            Ruaj Ndryshimet
          </button>
        </form>
      </div>
    </div>
  );
}
