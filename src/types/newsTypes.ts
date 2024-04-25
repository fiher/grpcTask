export interface NewsCreateInput {
    title: string;
    description: string;
    shortDescription: string;
    text: string;
    date: string;
}

export interface NewsUpdateInput {
    id: string;
    title?: string;
    description?: string;
    shortDescription?: string;
    text?: string;
    date?: string;
}