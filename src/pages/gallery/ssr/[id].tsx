//Static Site Generation (SSG) with Next.js
import { GetStaticPaths, GetServerSideProps } from "next";

// export const getStaticPaths: GetStaticPaths = async () => {
// return {
//     paths: [],
//     fallback: "blocking",
// }
// }

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    console.log("params", params);

    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params?.id}`);
    const post = await res.json();
    return {props: { post } };


}

export default function Gallery({ post }: any ) {
    return (
        <div>
            <h2 className="text-4xl text-center font-bold mb-6 text-yellow-600 line-clamp-2 uppercase">
            {post.id}</h2>
            <h1>{post.image}</h1>
            
            
            <p className="text-sm text-gray-500"> serverside</p>
            </div>
    );
}
