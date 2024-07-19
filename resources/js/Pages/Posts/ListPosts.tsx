import { Container } from "@/Components/Container";
import { Button } from "@/Components/ui/button";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps, Post } from "@/types";
import { Head, Link } from "@inertiajs/react";

export default function ListPosts({
    auth,
    posts,
}: PageProps & { posts: Post[] }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex">
                    <h2 className="flex-grow flex items-center align-center font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Posts
                    </h2>
                    <Button asChild>
                        <Link href={route("posts.create")}>New Post</Link>
                    </Button>
                </div>
            }
        >
            <Head title="Posts" />
            <Container>
                <div className="flex flex-col gap-3">
                    {posts.map((post) => {
                        return (
                            <div
                                key={post.id}
                                className="border rounded-lg border-gray-200 dark:border-gray-700 p-4"
                            >
                                <h2 className="border-b border-gray-100 dark:border-gray-800 p-2 text-xl font-semibold">
                                    <Link
                                        href={route("posts.show", {
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
            </Container>
        </AuthenticatedLayout>
    );
}
