import { FormEventHandler } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Container } from "@/Components/Container";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";

export default function CreatePost({ auth }: PageProps) {
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        description: "",
        body: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("posts.store"));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="flex-grow flex items-center align-center font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    New Post
                </h2>
            }
        >
            <Head title="New Post" />

            <Container>
                <form onSubmit={submit}>
                    <div>
                        <InputLabel htmlFor="title" value="Title" />

                        <Input
                            id="title"
                            type="text"
                            name="title"
                            value={data.title}
                            className="mt-1 block w-full"
                            onChange={(e) => setData("title", e.target.value)}
                        />

                        <InputError message={errors.title} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="description" value="Description" />

                        <Input
                            id="description"
                            type="text"
                            name="description"
                            value={data.description}
                            className="mt-1 block w-full"
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                        />

                        <InputError
                            message={errors.description}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="body" value="Body" />

                        <Textarea
                            id="body"
                            name="body"
                            value={data.body}
                            className="mt-1 block w-full min-h-[150px]"
                            onChange={(e) => setData("body", e.target.value)}
                        />

                        <InputError message={errors.body} className="mt-2" />
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <PrimaryButton className="ms-4" disabled={processing}>
                            Create
                        </PrimaryButton>
                    </div>
                </form>
            </Container>
        </AuthenticatedLayout>
    );
}
