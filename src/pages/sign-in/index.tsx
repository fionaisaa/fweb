import { getCsrfToken, getProviders, signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";

interface SignInProps {
  csrfToken: string;
  providers: any;
}

export default function SignIn({ csrfToken, providers }: SignInProps) {
  const router = useRouter();
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
    <div className="pt-20 min-h-screen flex items-center justify-center bg-[#fdf6f0]">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl border border-gray-200">
        <h2 className="text-3xl font-bold text-red-600 text-center mb-6">
          Kyçu në Llogarinë Tënde
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 mb-4 rounded-md text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input type="hidden" name="csrfToken" value={csrfToken} />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg placeholder-gray-400 text-black focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <input
            type="password"
            placeholder="Fjalëkalimi"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg placeholder-gray-400 text-black focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition duration-200"
          >
            Kyçu
          </button>
        </form>

       {providers?.google && (
      <div className="mt-4">
    <button
      onClick={() => signIn("google", { callbackUrl: "/" })}
      className="w-full flex items-center justify-center border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition"
    >
      <img
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="Google Icon"
        className="w-5 h-5 mr-2"
      />
      <span className="text-sm font-medium text-gray-700">
        Kyçu me Google
      </span>
    </button>
  </div>
)}
        <p className="text-sm text-center text-gray-500 mt-4">
          Nuk ke llogari?{" "}
          <span
            onClick={() => router.push("/sign-up")}
            className="text-red-600 hover:underline cursor-pointer"
          >
            Regjistrohu
          </span>
        </p>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const csrfToken = await getCsrfToken(context);
  const providers = await getProviders();
  return {
    props: {
      csrfToken,
      providers,
    },
  };
}



