import useFetch from "@/hooks/useFetch";
import { CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

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
    <div className="py-12 px-4 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-5xl font-extrabold text-yellow-600 uppercase tracking-wide">
          Ekipi Ynë
        </h1>
        <p className="text-gray-600 mt-4">
          Shfaqja e anëtarëve të ekipit nga databaza me opsion për fshirje dhe përditësim
        </p>
      </div>

      <div className="text-center pb-10">
        <Link href={"/create/team"}>
          <button className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition">
            Shto Anëtar
          </button>
        </Link>
      </div>

      {teamLoading ? (
        <div className="flex justify-center items-center h-40">
          <CircularProgress />
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {teamData?.map((member) => (
            <div
              key={member._id}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between transition duration-300 hover:shadow-2xl"
            >
              {member.image && (
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              <h2 className="text-2xl font-bold text-gray-800 mb-1">{member.name}</h2>
              <p className="text-yellow-600 font-medium">{member.role}</p>
              <p className="text-gray-600 mt-2">{member.description}</p>
              <p className="text-sm text-gray-500 mt-2">
                Krijuar më:{" "}
                {member.createdAt
                  ? new Date(member.createdAt).toLocaleDateString()
                  : "N/A"}
              </p>

              <div className="flex justify-between items-center mt-4 space-x-2">
                <Link href={`/update/team/${member._id}`}>
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium py-2 px-4 rounded-xl transition duration-200">
                    Update
                  </button>
                </Link>
                <button
                  onClick={() => handleDeleteTeam(member._id)}
                  className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-2 px-4 rounded-xl transition duration-200"
                >
                  Fshi
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

TeamPage.displayName = "TeamPage";
