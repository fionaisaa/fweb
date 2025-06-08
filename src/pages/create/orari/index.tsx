import { useRouter } from "next/router";
import { useState } from "react";
import useFetch from "@/hooks/useFetch";

export default function CreateOrari() {
  const router = useRouter();
  const [newOrari, setNewOrari] = useState({ emri: "", orari: "" });
  const { postData } = useFetch("/api/orari");

  const handleCreate = async () => {
    if (!newOrari.emri || !newOrari.orari) return;
    await postData(newOrari);
    router.push("/orari");
  };

  return (
    <div className="pt-12">
      <div className="flex flex-col items-center justify-center min-h-screen gap-y-20">
        <div className="mb-10 max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-black text-2xl font-semibold mb-4">
            Shto Orar të ri
          </h2>
          <input
            type="text"
            placeholder="Emri"
            value={newOrari.emri}
            onChange={(e) => setNewOrari({ ...newOrari, emri: e.target.value })}
            className="w-full px-4 py-2 mb-4 border rounded placeholder-gray-400 text-black"
          />
          <textarea
            placeholder="Orari"
            value={newOrari.orari}
            onChange={(e) => setNewOrari({ ...newOrari, orari: e.target.value })}
            className="w-full px-4 py-2 mb-4 border rounded placeholder-gray-400 text-black"
          />
          <button onClick={handleCreate} className="px-4 py-2 bg-blue-500 text-white rounded">
            Krijo Orar
          </button>
        </div>
      </div>
    </div>
  );
}