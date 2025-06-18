import useFetch from "@/hooks/useFetch";
import { CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Trash2, Pencil } from "lucide-react";
import { useSession } from "next-auth/react";

interface TopProduct {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image?: string;
}

export default function TopProducts() {
  const router = useRouter();
  const { data: session } = useSession();
  const isAdmin = session?.user && (session.user as any).role === "admin";

  const {
    data: initialTopProducts,
    loading: loadingTopProducts,
    deleteData,
  } = useFetch<TopProduct[]>("/api/topproducts");

  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);

  useEffect(() => {
    if (initialTopProducts) {
      setTopProducts(initialTopProducts);
    }
  }, [initialTopProducts]);

  const handleDeleteTopProduct = async (id: string) => {
    if (!confirm("A jeni të sigurt që dëshironi të fshini këtë produkt?")) return;

    try {
      await deleteData(`/api/topproducts/${id}`);
      alert("Produkti u fshi me sukses!");
      setTopProducts(topProducts.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Gabim gjatë fshirjes së produktit:", error);
      alert("Ndodhi një gabim gjatë fshirjes.");
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/update/topproducts/${id}`);
  };

  return (
    <div className="min-h-screen font-[Playfair_Display] pt-24 py-12 px-6 bg-[#fff3e0]">
      <h1 className="text-4xl font-[Playfair_Display] text-center text-[#5a2d0c] mb-12 uppercase tracking-wide">
        Top Products
      </h1>
      {isAdmin && (
        <div className="text-center pb-10">
          <Link href="/create/topproducts">
            <button className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition font-[Playfair_Display]">
              Shto Produkt
            </button>
          </Link>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {loadingTopProducts ? (
          <div className="col-span-full flex justify-center font-[Playfair_Display]">
            <CircularProgress color="warning" />
          </div>
        ) : topProducts.length > 0 ? (
          topProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform transform hover:scale-105 border border-orange-100 relative"
            >
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-52 object-cover rounded-t-2xl"
                />
              )}
              <div className="p-5">
                <h2 className="text-xl font-bold text-[#3b1f0d] mb-3">{product.name}</h2>
                <p className="text-gray-700 mb-3 text-sm leading-relaxed">{product.description}</p>
                <p className="text-sm text-gray-500 mb-1">
                  Kategoria: <span className="font-medium">{product.category}</span>
                </p>
                <p className="text-green-600 font-semibold text-lg mb-3">€{product.price}</p>

                {isAdmin && (
                  <div className="absolute top-3 right-3 flex gap-2">
                    <button
                      onClick={() => handleEdit(product._id)}
                      className="bg-yellow-100 text-yellow-700 p-2 rounded-full hover:bg-yellow-200"
                      title="Edito"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteTopProduct(product._id)}
                      className="bg-red-100 text-red-700 p-2 rounded-full hover:bg-red-200"
                      title="Fshij"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full font-[Playfair_Display]">
            Asnjë produkt nuk u gjet.
          </p>
        )}
      </div>
    </div>
  );
}
