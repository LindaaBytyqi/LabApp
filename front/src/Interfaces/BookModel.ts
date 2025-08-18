export interface BookModel{
    id:string|null;
    title:string|null;
    isbn:string|null;
    price:number|null;
    stockQty: number | null;
    publisher: string | null;
    publishedDate: string | null; // ose Date nëse do me e përdor si objekt Date
    photoUrl?: string | null;

    categoryId: string | null;
    authorIds?: string[];
}