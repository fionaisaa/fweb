import { GetStaticPaths, GetStaticProps } from "next";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params?.id}`);
  const menu = await res.json();

  return {
    props: { menu },
    notFound: !menu.id,
  };
};

export default function MenuSSG({ menu }: any) {
  return (
    <div className="p-6">
      <h2 className="text-4xl font-bold text-yellow-600 mb-4">Menu ID: {menu.id}</h2>
      <h1 className="text-2xl mb-2">{menu.title}</h1>
      <p>{menu.body}</p>
      <p className="text-sm text-gray-500 mt-4">Renderuar në build time (SSG)</p>
    </div>
  );
}