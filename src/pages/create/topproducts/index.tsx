import { useRouter } from "next/router";
import { useState } from "react";
import useFetch from "@/hooks/useFetch";

export default function CreateTopProduct() {
  const router = useRouter();
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  const { postData } = useFetch("/api/topproducts");

  const handleCreate = async () => {
    if (!newProduct.name || !newProduct.description || !newProduct.price || !newProduct.category || !newProduct.image) {
      alert("Ju lutem plotësoni të gjitha fushat.");
      return;
    }

    const parsedPrice = parseFloat(newProduct.price);
    if (isNaN(parsedPrice)) {
      alert("Çmimi duhet të jetë një numër.");
      return;
    }

    await postData({ ...newProduct, price: parsedPrice });
    router.push("/topproducts");
  };

  return (
    <div className="min-h-screen bg-[#fff8f0] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-[#5a2d0c] mb-8">Shto Produkt të Ri</h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Emri i produktit"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />

          <textarea
            placeholder="Përshkrimi"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />

          <input
            type="text"
            placeholder="Çmimi (€)"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />

          <input
            type="text"
            placeholder="Kategoria"
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />

          <input
            type="text"
            placeholder="URL e fotos"
            value={newProduct.image}
            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />

          <button
            onClick={handleCreate}
            className="w-full py-3 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 transition duration-200"
          >
            Krijo Produkt
          </button>
        </div>
      </div>
    </div>
  );
}
