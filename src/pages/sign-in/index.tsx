import { getCsrfToken, signIn } from "next-auth/react";
import router from "next/router";
import { useState } from "react";

export default function SignIn({ csrfToken }: { csrfToken: string }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (res?.error) {
      setError(res.error);
    } else if (res?.url) {
      router.push("/");
    }
  };

 return (
  <div className="pt-12">
    <div className="flex flex-col items-center justify-center min-h-screen gap-y-20">
      <div className="mb max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-black text-2xl font-semibold mb-4">Kycu</h2>
        {error && (
          <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 mb-4 border rounded placeholder-gray-400 text-black"
          />
          <input
            type="password"
            placeholder="Fjalëkalimi"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mb-4 border rounded placeholder-gray-400 text-black"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
              
              >
            Kyqu
          </button>
        </form>
      </div>
    </div>
  </div>
);

}

SignIn.getInitialProps = async (context: any) => {
  return {
    csrfToken: await getCsrfToken(context),
  };
};

SignIn.displayName = "Sign In | My Application";
