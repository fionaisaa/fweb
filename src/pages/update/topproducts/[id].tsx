import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useFetch from "@/hooks/useFetch";
import { CircularProgress } from "@mui/material";

type TopProduct = {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
};

export default function UpdateTopProduct() {
  const router = useRouter();
  const { id } = router.query;
  const { data: product, loading, putData } = useFetch<TopProduct>(id ? `/api/topproducts/${id}` : null);
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        category: product.category,
        image: product.image || "",
      });
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id) {
      alert("ID e produktit nuk është e përcaktuar!");
      return;
    }

    const parsedPrice = parseFloat(formData.price);
    if (isNaN(parsedPrice)) {
      alert("Çmimi duhet të jetë një numër.");
      return;
    }

    try {
      await putData({ ...formData, price: parsedPrice });
      alert("Produkti u përditësua me sukses!");
      router.push("/topproducts");
    } catch (error) {
      console.error("Gabim gjatë përditësimit:", error);
      alert("Ndodhi një gabim gjatë përditësimit të produktit");
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
    <div className="min-h-screen bg-[#fff8f0] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-[#5a2d0c] mb-8">
          Përditëso Produkt
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Emri i produktit"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />

          <textarea
            name="description"
            placeholder="Përshkrimi"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            rows={4}
            required
          />

          <input
            type="text"
            name="price"
            placeholder="Çmimi (€)"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Kategoria"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />

          <input
            type="text"
            name="image"
            placeholder="URL e fotos"
            value={formData.image}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
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
