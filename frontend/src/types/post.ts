// src/types.ts

export interface Post {
    title: string;
    link: string;
    content: string;
    date_modified: string;
    author: string;
    date_created: string;
    tags: string[];
}

export interface PostResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Post[];
}