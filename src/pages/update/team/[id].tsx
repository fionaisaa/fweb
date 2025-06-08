import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useFetch from "@/hooks/useFetch";
import { CircularProgress } from "@mui/material";

export interface Team {
  _id: string;
  name: string;
  role: string;
  description: string;
  image?: string;
  createdAt?: string;
}

export default function UpdateTeam() {
  const router = useRouter();
  const { id } = router.query;
  const { data: teamMember, loading, putData } = useFetch<Team>(id ? `/api/team/${id}` : null);

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    if (teamMember) {
      setFormData({
        name: teamMember.name,
        role: teamMember.role,
        description: teamMember.description,
        image: teamMember.image || "",
      });
    }
  }, [teamMember]);

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
      alert("ID i anëtarit të ekipit nuk është përcaktuar!");
      return;
    }

    try {
      await putData(formData);
      alert("Anëtari i ekipit u përditësua me sukses!");
      router.push("/team"); // ndrysho këtë në rrugën tënde të ekipit
    } catch (error) {
      console.error("Gabim gjatë përditësimit:", error);
      alert("Ndodhi një gabim gjatë përditësimit të anëtarit të ekipit");
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
      <h1 className="text-3xl font-bold mb-6">Përditëso Anëtarin e Ekipit</h1>

      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 mb-2">
            Emri
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="role" className="block text-gray-700 mb-2">
            Roli
          </label>
          <input
            id="role"
            name="role"
            type="text"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 mb-2">
            Përshkrimi
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg h-24"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 mb-2">
            URL e Fotos (opsionale)
          </label>
          <input
            id="image"
            name="image"
            type="text"
            value={formData.image}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>

        {/* Këtu e shfaqim foton në katror 150x150, me object-contain që nuk e pret */}
        {formData.image && (
          <img
            src={formData.image}
            alt="Foto e anëtarit"
            style={{
              display: "block",
              margin: "20px auto",
              width: "150px",
              height: "150px",
              objectFit: "contain",
              borderRadius: "8px",
              border: "1px solid #ccc",
              backgroundColor: "#f9f9f9",
            }}
          />
        )}

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
