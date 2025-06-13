import useFetch from "@/hooks/useFetch";
import { CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import Link from "next/link";
import type { Orari } from "../api/models/Orari";
import { useRouter } from "next/router";

export interface Post {
  id: string;
  emri: string;
  orari: string;
}

export default function Orari() {
  const router = useRouter();
  const { data: initialPosts, loading } = useFetch<Post[]>(
    "https://jsonplaceholder.typicode.com/posts?_limit=3"
  );
  const [posts, setPosts] = useState<Post[]>([]);

  const {
    data: initialOrariData,
    loading: orariLoading,
    deleteData
  } = useFetch<Orari[]>("/api/orari");
  const [orariData, setOrariData] = useState<Orari[]>([]);

  useEffect(() => {
    if (initialOrariData) {
      setOrariData(initialOrariData);
    }
  }, [initialOrariData]);

  useEffect(() => {
    if (initialPosts) {
      setPosts(initialPosts);
    }
  }, [initialPosts]);

  const handleDeleteOrari = async (id: string) => {
    const confirmed = confirm("A jeni i sigurt që dëshironi ta fshini këtë orar?");
    if (!confirmed) return;

    try {
      await deleteData(`/api/orari/${id}`);
      alert("Orari u fshi me sukses!");
      setOrariData(orariData.filter((orari) => orari._id !== id));
    } catch (error) {
      console.error("Gabim gjatë fshirjes:", error);
      alert("Gabim gjatë fshirjes së orarit!");
    }
  };

  return (
    <div className="pt-24 px-4 md:px-12 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-yellow-600 uppercase tracking-wide">
          Orari i Puntorëve
        </h1>
        <p className="text-gray-600 mt-3">
          Shfaqja e orarit në formë tabele të stilizuar
        </p>
      </div>

      <div className="text-center mb-8">
        <Link href={"/create/orari"}>
          <button className="px-6 py-3 bg-yellow-500 text-white rounded-full shadow hover:bg-yellow-600 transition-all duration-300">
            ➕ Shto Orar
          </button>
        </Link>
      </div>

      {orariLoading ? (
        <div className="flex justify-center items-center h-40">
          <CircularProgress />
        </div>
      ) : (
        <div className="overflow-x-auto max-w-6xl mx-auto shadow-xl rounded-xl bg-white">
          <table className="min-w-full table-auto rounded-xl overflow-hidden">
            <thead className="bg-yellow-500 text-white uppercase text-sm">
              <tr>
                <th className="px-6 py-4 text-left">Emri dhe Mbiemri</th>
                <th className="px-6 py-4 text-left">Orari për javën</th>
                <th className="px-6 py-4 text-center">Veprime</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orariData.map((orari, idx) => (
                <tr key={orari._id} className="hover:bg-yellow-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-800 whitespace-nowrap">
                    {orari.emri}
                  </td>
                  <td className="px-6 py-4 text-gray-600 whitespace-pre-line">
                    {orari.orari}
                  </td>
                  <td className="px-6 py-4 text-center space-x-2">
                    <Link href={`/update/orari/${orari._id}`}>
                      <button className="bg-yellow-400 hover:bg-yellow-500 text-white text-sm px-4 py-2 rounded-lg transition">
                        Përditëso
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDeleteOrari(orari._id)}
                      className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-lg transition"
                    >
                      Fshi
                    </button>
                  </td>
                </tr>
              ))}
              {orariData.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-gray-400">
                    Nuk ka të dhëna për orare.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

Orari.displayName = "Orari";
