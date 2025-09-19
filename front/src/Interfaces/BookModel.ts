
export interface BookModel{
    //authorName: ReactNode;
    id:string|null;
    title:string|null;
    description:string|null;
    isbn:string|null;
    price:number|null;
    stockQty: number | null;
    publishedDate: string | null; // ose Date nëse do me e përdor si objekt Date
    photoUrl?: string | null;
   // categoryName: string | null;
    categoryId: string | null;
    publisherId: string | null;
   // publisherName: string | null;
    authorIds?: string[];
    //authors?:AuthorModel[];
     //authorName?: string | null;//per ni autor
       authorNames?: string[];//per shume autor
}