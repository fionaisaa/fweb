//Static Site Generation (SSG) with Next.js
import { GetStaticPaths, GetStaticProps } from "next";

export const getStaticPaths: GetStaticPaths = async () => {
return {
    paths: [],
    fallback: "blocking",
}
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
    console.log("params", params);

    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params?.id}`);
    const post = await res.json();
    return {props: { post }, 
    revalidate: 10, // 10 seconds
    notFound: !post.id, // 404 if post not found
};


}

export default function Blog({ post }: any ) {
    return (
        <div>
            <h2 className="text-4xl text-center font-bold mb-6 text-yellow-600 line-clamp-2 uppercase">
            {post.id}</h2>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
            
            <p className="text-sm text-gray-500"> isr </p>
            </div>
    );
}
