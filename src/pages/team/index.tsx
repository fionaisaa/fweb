import useFetch from "@/hooks/useFetch";
import { CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export interface Team {
  _id: string;
  name: string;
  role: string;
  description: string;
  image?: string;
  createdAt?: string;
}

export default function TeamPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const isAdmin = session?.user && (session.user as any).role === "admin";

  const {
    data: initialTeamData,
    loading: teamLoading,
    deleteData,
  } = useFetch<Team[]>("/api/team");

  const [teamData, setTeamData] = useState<Team[]>([]);

  useEffect(() => {
    if (initialTeamData) {
      setTeamData(initialTeamData);
    }
  }, [initialTeamData]);

  const handleDeleteTeam = async (id: string) => {
    const confirmed = confirm("A jeni të sigurt që doni ta fshini këtë anëtar?");
    if (!confirmed) return;

    try {
      await deleteData(`/api/team/${id}`);
      alert("Fshirë me sukses!");
      setTeamData(teamData.filter((t) => t._id !== id));
    } catch (error) {
      console.error("Gabim gjatë fshirjes:", error);
      alert("Ndodhi një gabim gjatë fshirjes së anëtarit");
    }
  };

  return (
    <div className="pt-24 px-4 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-5xl font-extrabold text-yellow-600 uppercase tracking-wide">
          Ekipi Ynë
        </h1>
        <p className="text-gray-600 mt-4">
          Ekipi ynë përbëhet nga profesionistë të përkushtuar në kuzhinë, shërbim dhe menaxhim, të cilët punojnë së bashku për të ofruar një përvojë të shkëlqyer për çdo klient. Çdo anëtar sjell përvojë, pasion dhe kujdes në punën e tij për të garantuar cilësi të lartë në çdo detaj.
        </p>
      </div>

      {isAdmin && (
        <div className="text-center pb-10">
          <Link href={"/create/team"}>
            <button className="px-6 py-2 bg-yellow-600 text-white rounded-full hover:bg-yellow-700 transition">
              ➕ Shto Anëtar
            </button>
          </Link>
        </div>
      )}

      {teamLoading ? (
        <div className="flex justify-center items-center h-40">
          <CircularProgress />
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {teamData?.map((member) => (
            <div
              key={member._id}
              className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition duration-300"
            >
              {member.image && (
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 object-cover rounded-full mb-4 shadow-sm border-2 border-yellow-500"
                />
              )}
              <h2 className="text-xl font-bold text-gray-800">{member.name}</h2>
              <p className="text-yellow-600 font-medium">{member.role}</p>
              <p className="text-gray-600 mt-2 text-sm">{member.description}</p>
              

              {isAdmin && (
                <div className="flex gap-2 mt-4">
                  <Link href={`/update/team/${member._id}`}>
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs px-4 py-1 rounded-full transition">
                      Përditëso
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDeleteTeam(member._id)}
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

TeamPage.displayName = "TeamPage";
