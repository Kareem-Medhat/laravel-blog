import { Config } from "ziggy-js";

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export interface Comment {
    id: number;
    created_at: string;
    updated_at: string;
    contents: string;
    user: User;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
};

export interface Post {
    id: number;
    title: string;
    description: string;
    body: string;
    created_at: string;
    updated_at: string;
}

export type EagerPost = Post & { user: User } & { comments: Comment[] };
