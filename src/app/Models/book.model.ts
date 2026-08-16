export interface Book {
    id: string;
    title: string;
    author: string;
    image: string;
    rating: number;
    status: BookStatus;
}

export type BookStatus = 'Want to Read' | 'Currently Reading' | 'Read';