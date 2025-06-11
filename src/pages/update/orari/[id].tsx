import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useFetch from "@/hooks/useFetch";
import { CircularProgress } from "@mui/material";
import { Orari } from "@/pages/api/models/Orari";

export default function UpdateOrari() {
  const router = useRouter();
  const { id } = router.query;
  const { data: orari, loading, putData } = useFetch<Orari>(id ? `/api/orari/${id}` : null);
  const [formData, setFormData] = useState({
    emri: "",
    orari: ""
  });

  useEffect(() => {
    if (orari) {
      setFormData({
        emri: orari.emri,
        orari: orari.orari
      });
    }
  }, [orari]);

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
      alert("ID e orarit nuk është e përcaktuar!");
      return;
    }

    try {
      await putData(formData);
      alert("Orari u përditësua me sukses!");
      router.push("/orari");
    } catch (error) {
      console.error("Gabim gjatë përditësimit:", error);
      alert("Ndodhi një gabim gjatë përditësimit të orarit");
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
      <h1 className="text-3xl font-bold mb-6">Përditëso Orarin</h1>
      
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="emri">
            Emri
          </label>
          <input
            id="emri"
            name="emri"
            type="text"
            value={formData.emri}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="orari">
            Orari
          </label>
          <textarea
            id="orari"
            name="orari"
            value={formData.orari}
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