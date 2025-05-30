import { useState } from "react";
import { useRouter } from "next/router";
import useFetch from "@/hooks/useFetch";
import { User } from "next-auth";

export default function SignUp() {
  const router = useRouter();
  const [user, setUser] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { postData } = useFetch<User[]>("/api/auth/register", true);
  
  const handleSubmit = async () => {
    // Form validation
    if (!user.name || !user.email || !user.password) {
      setError("Ju lutem plotësoni të gjitha fushat");
      return;
    }
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      setError("Email-i nuk është i vlefshëm");
      return;
    }
    
    // Password strength check
    if (user.password.length < 3) {
      setError("Fjalëkalimi duhet të jetë të paktën 6 karaktere");
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      const result = await postData(user);
      
      if (result.error) {
        setError(result.error);
        return;
      }
      
      setSuccess(true);
      // Redirect after a short delay to show success message
      setTimeout(() => {
        router.push('/sign-in');
      }, 1500);
    } catch (err) {
      setError("Gabim i panjohur gjatë regjistrimit");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-12">
      <div className="flex flex-col items-center justify-center min-h-screen gap-y-20">
        <div className="mb-10 max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-black text-2xl font-semibold mb-4">
            Regjistrohu
          </h2>
          
          {error && (
            <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">
              {error}
            </div>
          )}
          
          {success && (
            <div className="bg-green-100 text-green-700 p-3 mb-4 rounded">
              Regjistrimi u krye me sukses! Po ju ridrejtojmë...
            </div>
          )}
          
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Emri"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="w-full px-4 py-2 border rounded placeholder-gray-400 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            
            <input
              type="email"
              placeholder="Email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full px-4 py-2 border rounded placeholder-gray-400 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            
            <input
              type="password"
              placeholder="Fjalëkalimi"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-full px-4 py-2 border rounded placeholder-gray-400 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`w-full px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Duke u regjistruar...' : 'Regjistrohu'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}