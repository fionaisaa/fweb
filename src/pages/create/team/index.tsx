import { useRouter } from "next/router";
import { useState } from "react";
import useFetch from "@/hooks/useFetch";

export default function CreateTeam() {
  const router = useRouter();
  const [newTeamMember, setNewTeamMember] = useState({
    name: "",
    role: "",
    description: "",
    image: "",
  });

  const { postData } = useFetch("/api/team");

  const handleCreate = async () => {
    if (!newTeamMember.name || !newTeamMember.role || !newTeamMember.description) return;
    await postData(newTeamMember);
    router.push("/team");
  };

  return (
    <div className="pt-12">
      <div className="flex flex-col items-center justify-center min-h-screen gap-y-20">
        <div className="mb-10 max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-black text-2xl font-semibold mb-4">
            Shto Anëtar të Ri në Ekip
          </h2>

          <input
            type="text"
            placeholder="Emri"
            value={newTeamMember.name}
            onChange={(e) =>
              setNewTeamMember({ ...newTeamMember, name: e.target.value })
            }
            className="w-full px-4 py-2 mb-4 border rounded placeholder-gray-400 text-black"
          />

          <input
            type="text"
            placeholder="Pozita (p.sh. Kuzhinier)"
            value={newTeamMember.role}
            onChange={(e) =>
              setNewTeamMember({ ...newTeamMember, role: e.target.value })
            }
            className="w-full px-4 py-2 mb-4 border rounded placeholder-gray-400 text-black"
          />

          <textarea
            placeholder="Përshkrimi"
            value={newTeamMember.description}
            onChange={(e) =>
              setNewTeamMember({ ...newTeamMember, description: e.target.value })
            }
            className="w-full px-4 py-2 mb-4 border rounded placeholder-gray-400 text-black"
          />

          <input
            type="text"
            placeholder="URL e fotos"
            value={newTeamMember.image}
            onChange={(e) =>
              setNewTeamMember({ ...newTeamMember, image: e.target.value })
            }
            className="w-full px-4 py-2 mb-4 border rounded placeholder-gray-400 text-black"
          />

          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
          >
            Krijo Anëtar
          </button>
        </div>
      </div>
    </div>
  );
}
