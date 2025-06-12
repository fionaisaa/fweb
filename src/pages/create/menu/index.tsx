import { useRouter } from "next/router";
import { useState } from "react";
import useFetch from "@/hooks/useFetch";

export default function CreateMenu() {
  const router = useRouter();
  const [newMenu, setNewMenu] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  const { postData } = useFetch("/api/menu");

  const handleCreate = async () => {
    if (!newMenu.name || !newMenu.description || !newMenu.price || !newMenu.category || !newMenu.image) {
      alert("Ju lutem plotësoni të gjitha fushat.");
      return;
    }

    const parsedPrice = parseFloat(newMenu.price);
    if (isNaN(parsedPrice)) {
      alert("Çmimi duhet të jetë një numër.");
      return;
    }

    await postData({ ...newMenu, price: parsedPrice });
    router.push("/menu");
  };

  return (
    <div className="min-h-screen bg-[#fff8f0] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-[#5a2d0c] mb-8">Shto Menu të Re</h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Emri i menusë"
            value={newMenu.name}
            onChange={(e) => setNewMenu({ ...newMenu, name: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />

          <textarea
            placeholder="Përshkrimi"
            value={newMenu.description}
            onChange={(e) => setNewMenu({ ...newMenu, description: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />

          <input
            type="text"
            placeholder="Çmimi (€)"
            value={newMenu.price}
            onChange={(e) => setNewMenu({ ...newMenu, price: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />

          <input
            type="text"
            placeholder="Kategoria"
            value={newMenu.category}
            onChange={(e) => setNewMenu({ ...newMenu, category: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />

          <input
            type="text"
            placeholder="URL e fotos"
            value={newMenu.image}
            onChange={(e) => setNewMenu({ ...newMenu, image: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />

          <button
            onClick={handleCreate}
            className="w-full py-3 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 transition duration-200"
          >
            Krijo Menu
          </button>
        </div>
      </div>
    </div>
  );
}