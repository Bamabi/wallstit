export class PostitModel {
    id?: string;
    author: string;
    quote: string;
    date: Date;
    toPerson?: string;
    context?: string;
    reply?: string;
}
