import useFetch from "@/hooks/useFetch";
import { CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export interface Gallery {
  _id: string;
  image?: string;
  createdAt?: string;
}

export default function GalleryPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const isAdmin = session?.user && (session.user as any).role === "admin";

  const {
    data: initialGalleryData,
    loading: galleryLoading,
    deleteData,
  } = useFetch<Gallery[]>("/api/gallery");

  const [galleryData, setGalleryData] = useState<Gallery[]>([]);

  useEffect(() => {
    if (initialGalleryData) {
      setGalleryData(initialGalleryData);
    }
  }, [initialGalleryData]);

  const handleDeleteGallery = async (id: string) => {
    const confirmed = confirm("A jeni të sigurt që doni ta fshini këtë foto?");
    if (!confirmed) return;

    try {
      await deleteData(`/api/gallery/${id}`);
      alert("Fshirë me sukses!");
      setGalleryData(galleryData.filter((g) => g._id !== id));
    } catch (error) {
      console.error("Gabim gjatë fshirjes:", error);
      alert("Ndodhi një gabim gjatë fshirjes së anëtarit");
    }
  };

  return (
    <div className="pt-24 px-4 font-[Playfair_Display] text-2xl   bg-[#fff3e0]  min-h-screen">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-5xl font-[Playfair_Display]  text-yellow-600 uppercase tracking-wide">
          Aromat e traditës në pamje
        </h1>
        
      </div>

      {isAdmin && (
        <div className="text-center pb-10">
          <Link href={"/create/gallery"}>
            <button className="px-6 py-2 bg-yellow-600 text-white rounded-full hover:bg-yellow-700 transition">
              ➕ Shto Gallery
            </button>
          </Link>
        </div>
      )}

      {galleryLoading ? (
        <div className="flex justify-center items-center h-40">
          <CircularProgress />
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {galleryData?.map((photo) => (
            <div key={photo._id} className="flex flex-col items-center">
                {photo.image && (
                  <img
                    src={photo.image}
                    alt="gallery"
                   className="w-[370px] h-[250px] object-cover rounded-md transition-transform duration-300 ease-in-out transform hover:scale-105"
                  />
                )}
              
              

              {isAdmin && (
                <div className="flex gap-2 mt-4">
                  <Link href={`/update/gallery/${photo._id}`}>
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs px-4 py-1 rounded-full transition">
                      Përditëso
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDeleteGallery(photo._id)}
                    className="bg-red-500 hover:bg-red-600 text-white text-xs px-4 py-1 rounded-full transition"
                  >
                    Fshi
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

GalleryPage.displayName = "GalleryPage";
