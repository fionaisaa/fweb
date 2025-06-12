
import useFetch from "@/hooks/useFetch";
import { CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import Link from "next/link";
import { MenuItem } from "@/pages/api/models/Menu";
import router, { useRouter } from "next/router";
import React from "react";
import { Trash2, Pencil } from "lucide-react";
import { useSession } from "next-auth/react";

interface Post {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image?: string;
}

interface Post {
  id: number;
  title: string;
  body: string;
}

export default function Menu() {
  const router = useRouter();

   const { data: session } = useSession();
  const isAdmin = session?.user && (session.user as any).role === "admin";

  const { data: initialPosts, loading: postsLoading } = useFetch<Post[]>(
    "https://jsonplaceholder.typicode.com/posts?_limit=3"
  );
  const [posts, setPosts] = useState<Post[]>([]);

  const {
    data: initialMenuItemData,
    loading: menusLoading,
    deleteData,
  } = useFetch<MenuItem[]>("/api/menu");

  const [menuData, setMenuItemData] = useState<MenuItem[]>([]);

  useEffect(() => {
    if (initialMenuItemData) {
      setMenuItemData(initialMenuItemData);
    }
  }, [initialMenuItemData]);

  useEffect(() => {
    if (initialPosts) {
      setPosts(initialPosts);
    }
  }, [initialPosts]);

  const handleDelete = (id: number) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  const handleDeleteMenuItem = async (id: string) => {
    const confirmed = confirm("A jeni sigurt që dëshironi të fshini këtë menu?");
    if (!confirmed) return;

    try {
      await deleteData(`/api/menu/${id}`);
      alert("U fshi me sukses!");
      setMenuItemData(menuData.filter((menu) => menu._id !== id));
    } catch (error) {
      console.error("Gabim gjatë fshirjes:", error);
      alert("Ndodhi një gabim gjatë fshirjes së menuit");
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/update/menu/${id}`);
  };

  return (
    <div className="min-h-screen pt-24 py-12 px-6 bg-[#fff8f0]">
      <h1 className="text-4xl font-bold text-center text-[#5a2d0c] mb-12 uppercase tracking-wide">
        Menu / Price List
      </h1>
      {isAdmin && (<div className="text-center pb-10">
        <Link href="/create/menu">
          <button className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition">
            Shto Menu
          </button>
        </Link>
      </div>)}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {menusLoading ? (
          <div className="col-span-full flex justify-center">
            <span className="text-yellow-600">Duke u ngarkuar...</span>
          </div>
        ) : menuData && menuData.length > 0 ? (
          menuData.map((menu) => (
            <div
              key={menu._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform transform hover:scale-105 border border-orange-100 relative"
            >
              {menu.image && (
                <img
                  src={menu.image}
                  alt={menu.name}
                  className="w-full h-52 object-cover rounded-t-2xl"
                />
              )}
              <div className="p-5">
                <div className="mb-3">
                  <h2 className="text-xl font-bold text-[#3b1f0d]">{menu.name}</h2>
                </div>
                <p className="text-gray-700 mb-3 text-sm leading-relaxed">
                  {menu.description}
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  Kategoria: <span className="font-medium">{menu.category}</span>
                </p>
                <p className="text-green-600 font-semibold text-lg mb-3">
                  €{menu.price}
                </p>
                { isAdmin && (<div className="absolute top-3 right-3 flex gap-2">
                  <button
                    onClick={() => handleEdit(menu._id)}
                    className="bg-yellow-100 text-yellow-700 p-2 rounded-full hover:bg-yellow-200"
                    title="Edito"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteMenuItem(menu._id)}
                    className="bg-red-100 text-red-700 p-2 rounded-full hover:bg-red-200"
                    title="Fshij"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>)}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">Asnjë meny nuk u gjet.</p>
        )}
      </div>
    </div>
  );
}