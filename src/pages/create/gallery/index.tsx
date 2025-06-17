import { useRouter } from "next/router";
import { useState } from "react";
import useFetch from "@/hooks/useFetch";

export default function CreateGallery() {
  const router = useRouter();
  const [newGalleryPhoto, setNewGalleryPhoto] = useState({
    image: "",
  });

  const { postData } = useFetch("/api/gallery");

  const handleCreate = async () => {
    if (!newGalleryPhoto.image) return;
    await postData(newGalleryPhoto);
    router.push("/gallery");
  };

  return (
    <div className="pt-12">
      <div className="flex flex-col items-center justify-center min-h-screen gap-y-20">
        <div className="mb-10 max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-black text-2xl font-semibold mb-4">
            Shto foto te re
          </h2>
          

          <input
            type="text"
            placeholder="URL e fotos"
            value={newGalleryPhoto.image}
            onChange={(e) =>
              setNewGalleryPhoto({ ...newGalleryPhoto, image: e.target.value })
            }
            className="w-full px-4 py-2 mb-4 border rounded placeholder-gray-400 text-black"
          />

          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
          >
            Krijo nje gallery
          </button>
        </div>
      </div>
    </div>
  );
}
