import { Container } from "@/Components/Container";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import { Input } from "@/Components/ui/input";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps, EagerPost } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler, useEffect } from "react";

export default function ShowPost({
    auth,
    post,
}: PageProps & { post: EagerPost }) {
    const {
        data,
        setData,
        post: postRequest,
        processing,
        errors,
        reset,
    } = useForm({
        contents: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        postRequest(
            route("posts.comment", {
                id: post.id,
            }),
            {
                onSuccess() {
                    reset("contents");
                },
            }
        );
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    {post.title}
                </h2>
            }
        >
            <Head title={`${post.title} - Posts`} />
            <Container>
                <p className="py-2 border-b border-gray-200 dark:border-gray-700">
                    {post.description}
                </p>
                <div className="flex items-center justify-end py-1">
                    <p className="text-gray-500 dark:text-gray-400">
                        Posted by {post.user.name} on{" "}
                        {new Date(post.created_at).toLocaleDateString()}
                    </p>
                </div>
                <main className="whitespace-pre-line min-h-[150px]">
                    {post.body}
                </main>

                <form onSubmit={submit} className="py-4">
                    <div>
                        <InputLabel htmlFor="comment" value="Comment" />

                        <Input
                            id="comment"
                            type="text"
                            name="comment"
                            value={data.contents}
                            className="mt-1 block w-full"
                            onChange={(e) =>
                                setData("contents", e.target.value)
                            }
                        />

                        <InputError
                            message={errors.contents}
                            className="mt-2"
                        />
                    </div>
                    <div className="flex items-center justify-end mt-4">
                        <PrimaryButton className="ms-4" disabled={processing}>
                            Comment
                        </PrimaryButton>
                    </div>
                    <div className="flex flex-col gap-3 mt-4">
                        {post.comments.map((comment) => (
                            <div
                                key={comment.id}
                                className="rounded border border-gray-200 dark:border-gray-700 p-4"
                            >
                                <p>{comment.contents}</p>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                    Posted by {comment.user.name} on{" "}
                                    {new Date(
                                        comment.created_at
                                    ).toLocaleDateString()}
                                </div>
                            </div>
                        ))}
                    </div>
                </form>
            </Container>
        </AuthenticatedLayout>
    );
}
