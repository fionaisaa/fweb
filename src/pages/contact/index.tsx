import { motion } from "framer-motion";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(null); // reset error when user types
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const { name, email, message } = formData;

    // ✅ VALIDIMET
    if (!name.trim()) {
      setError("Ju lutem shënoni emrin.");
      return;
    }

    if (email.trim().toLowerCase() === "pa@") {
      setError("Emaili 'pa@' nuk lejohet.");
      return;
    }

    if (message.trim().length < 3) {
      setError("Mesazhi duhet të përmbajë të paktën 3 shkronja.");
      return;
    }

    // Nëse kalon validimin
    console.log("Form Data Submitted:", formData);
    setFormData({ name: "", email: "", message: "" });
    setError(null);
    alert("Mesazhi u dërgua me sukses!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#fdf6f0]">
      <motion.section
        className="w-full max-w-2xl py-10 px-6 bg-white shadow-lg rounded-lg text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl font-bold mb-6 text-red-800">
          Formulari ynë
        </h2>

        {/* Mesazhi i gabimit */}
        {error && (
          <div className="mb-4 text-red-600 font-medium">{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4 text-left">
            <label className="block font-medium mb-1 text-black">Emri</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg text-black"
              placeholder="Shkruani emrin tuaj"
            />
          </div>

          <div className="mb-4 text-left">
            <label className="block font-medium mb-1 text-black">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg text-black"
              placeholder="Shkruani email-in tuaj"
            />
          </div>

          <div className="mb-4 text-left">
            <label className="block font-medium mb-1 text-black">Mesazhi</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg text-black"
              placeholder="Shkruani mesazhin tuaj"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2 bg-red-900 text-white rounded-lg hover:bg-red-800"
          >
            Dërgo
          </button>
        </form>
      </motion.section>
    </div>
  );
}
