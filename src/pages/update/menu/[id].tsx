import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useFetch from "@/hooks/useFetch";
import { CircularProgress } from "@mui/material";

type Menu = {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
};

export default function UpdateMenu() {
  const router = useRouter();
  const { id } = router.query;
  const { data: menu, loading, putData } = useFetch<Menu>(id ? `/api/menu/${id}` : null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });

  useEffect(() => {
    if (menu) {
      setFormData({
        name: menu.name,
        description: menu.description,
        price: menu.price.toString(),
        category: menu.category,
      });
    }
  }, [menu]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id) {
      alert("ID e menusë nuk është e përcaktuar!");
      return;
    }

    const parsedPrice = parseFloat(formData.price);
    if (isNaN(parsedPrice)) {
      alert("Çmimi duhet të jetë një numër.");
      return;
    }

    try {
      await putData({ ...formData, price: parsedPrice });
      alert("Menuja u përditësua me sukses!");
      router.push("/menu");
    } catch (error) {
      console.error("Gabim gjatë përditësimit:", error);
      alert("Ndodhi një gabim gjatë përditësimit të menusë");
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
          Përditëso Menu
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Emri i menusë"
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

