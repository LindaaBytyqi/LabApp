// export interface CartItemModel {
//   bookId: string;
//   quantity: number;
//   title: string;
//   category: string;
//   price: number;
// }
import { BookModel } from "./BookModel";

export interface CartItemModel {
  photoUrl:string;
  bookId: string;
  quantity: number;
  title: string;
  category: string;
  price: number;
}
