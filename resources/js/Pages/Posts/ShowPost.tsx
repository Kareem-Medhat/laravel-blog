import { Container } from "@/Components/Container";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps, EagerPost, Comment as CommentType } from "@/types";
import { Head, Link, router, useForm, useRemember } from "@inertiajs/react";
import { FormEventHandler, useState } from "react";

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

    const deleteSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        router.delete(
            route("posts.destroy", {
                id: post.id,
            })
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
                <div className="flex py-2 border-b border-gray-200 dark:border-gray-700">
                    <p className="flex-grow">{post.description}</p>
                    {post.user.id === auth.user.id && (
                        <div className="flex gap-2">
                            <Button asChild>
                                <Link
                                    href={route("posts.edit", {
                                        id: post.id,
                                    })}
                                >
                                    Edit
                                </Link>
                            </Button>
                            <form onSubmit={deleteSubmit}>
                                <Button
                                    className="dark:bg-red-200 dark:text-red-800 bg-red-200 text-red-800"
                                    type="submit"
                                >
                                    Delete
                                </Button>
                            </form>
                        </div>
                    )}
                </div>

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
                        <Button className="ms-4" disabled={processing}>
                            Comment
                        </Button>
                    </div>
                </form>

                <div className="flex flex-col gap-3 mt-4">
                    {post.comments.map((comment) => (
                        <Comment key={comment.id} comment={comment} />
                    ))}
                </div>
            </Container>
        </AuthenticatedLayout>
    );
}

function Comment({ comment }: { comment: CommentType }) {
    const { data, setData, patch, processing, errors, reset } = useForm({
        contents: comment.contents,
    });

    const [isEditing, setIsEditing] = useRemember(false);

    return (
        <div className=" rounded border border-gray-200 dark:border-gray-700 p-4">
            {isEditing ? (
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        patch(
                            route("comments.update", {
                                id: comment.id,
                            }),
                            {
                                onSuccess() {
                                    setIsEditing(false);
                                    reset("contents");
                                },
                            }
                        );
                    }}
                    className="py-2"
                >
                    <InputLabel
                        htmlFor={`comment-${comment.id}-contents`}
                        value="Contents"
                        className="py-1"
                    />

                    <div className="flex gap-2">
                        <Input
                            id={`comment-${comment.id}-contents`}
                            type="text"
                            name="contents"
                            value={data.contents}
                            onChange={(e) =>
                                setData("contents", e.target.value)
                            }
                        />
                        <Button disabled={processing}>Edit</Button>
                    </div>

                    <InputError message={errors.contents} className="mt-2" />
                </form>
            ) : (
                <p>{comment.contents}</p>
            )}

            <div className="text-sm text-gray-500 dark:text-gray-400">
                <p>
                    Posted by {comment.user.name} on{" "}
                    {new Date(comment.created_at).toLocaleDateString()}
                </p>
                <div className="pt-1">
                    <button
                        onClick={() => {
                            setIsEditing((v) => !v);
                        }}
                        className="transition hover:text-blue-500"
                    >
                        {isEditing ? "Back" : "Edit"}
                    </button>{" "}
                    -{" "}
                    <form
                        className="inline"
                        onSubmit={(e) => {
                            e.preventDefault();
                            router.delete(
                                route("comments.destroy", {
                                    id: comment.id,
                                })
                            );
                        }}
                    >
                        <button className="transition hover:text-red-500">
                            Delete
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
