import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps, Post } from "@/types";
import { Link } from "@inertiajs/react";

export default function ListPosts({
    auth,
    posts,
}: PageProps & { posts: Post[] }) {
    console.log(posts);
    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="p-5 dark:text-white">
                <div className="flex">
                    <h1 className="text-4xl font-bold flex-grow">Posts</h1>
                    <button>Hey</button>
                </div>
                <div className="flex flex-col gap-3 mt-5">
                    {posts.map((post) => {
                        return (
                            <div
                                key={post.id}
                                className="border border-gray-200 dark:border-gray-700 p-4"
                            >
                                <h2 className="border-b border-gray-100 dark:border-gray-800 p-2 text-xl font-semibold">
                                    <Link
                                        href={route("view-post", {
                                            id: post.id,
                                        })}
                                        className="hover:underline text-blue-400"
                                    >
                                        {post.title}
                                    </Link>
                                </h2>

                                <p className="px-2 py-3 text-sm">
                                    {post.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
