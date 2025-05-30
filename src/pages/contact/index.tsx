import { motion } from "framer-motion";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      {/* Form Submission Section */}
      <motion.section
        className="w-full max-w-2xl py-10 px-6 bg-white shadow-lg rounded-lg text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl font-bold mb-6 text-red-800">
          Formulari ynë
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 text-left">
            <label className="block font-medium mb-1 text-[#333]">Emri</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Shkruani emrin tuaj"
            />
          </div>
          <div className="mb-4 text-left">
            <label className="block font-medium mb-1 text-[#333]">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Shkruani email-in tuaj"
            />
          </div>
          <div className="mb-4 text-left">
            <label className="block font-medium mb-1 text-[#333]">Mesazhi</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Shkruani mesazhin tuaj"
            ></textarea>
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-red-900 text-white rounded-lg"
          >
            Dërgo
          </button>
        </form>
      </motion.section>
    </div>
  );
}
