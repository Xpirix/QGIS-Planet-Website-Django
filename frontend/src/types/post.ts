// src/types.ts

export interface Post {
    id: number;
    title: string;
    link: string;
    content: string;
    date_modified: string;
    guid: string;
    author: string;
    author_email: string;
    comments: string;
    date_created: string;
    feed: number;
    tags: string[];
}

export interface PostResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Post[];
}