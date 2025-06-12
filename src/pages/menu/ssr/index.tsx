import { GetServerSideProps } from "next";
import Link from "next/link";

interface Menu {
  id: string;
  title: string;
  body: string;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=3");
  const menus: Menu[] = await res.json();

  return { props: { menus } };
};

export default function MenusSSR({ menus }: { menus: Menu[] }) {
  return (
    <div className="p-10">
      <h1 className="text-5xl text-yellow-600 font-bold text-center mb-10">Menu SSR</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {menus.map((menu) => (
          <div key={menu.id} className="bg-white shadow-md rounded-2xl p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{menu.title}</h2>
            <p className="text-gray-600 mb-4">{menu.body}</p>
            <div className="flex justify-between items-center">
              <Link
                href={`/menus/ssg/${menu.id}`}
                className="text-blue-500 hover:underline"
              >
                Shiko me SSG
              </Link>
              <Link
                href={`/menus/isr/${menu.id}`}
                className="text-green-500 hover:underline"
              >
                Shiko me ISR
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}