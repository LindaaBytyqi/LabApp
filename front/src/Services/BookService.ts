//import AxiosInstance from "./AxiosInstance";
import { BookModel } from "../Interfaces/BookModel";
import { AuthorModel } from "../Interfaces/AuthorModel";
import { PublisherModel } from "../Interfaces/PublisherModel";
import { CategoryModel } from "../Interfaces/CategoryModel";
import { SelectListItem } from "../Interfaces/SelectListItem";

import axios from "axios";
export class BookService {
    private static baseUrl = "https://localhost:7141/api/Book";
    public static async DeleteBook(id: string): Promise<void> {
      var result = await axios.delete(`${BookService.baseUrl}/${id}`);
    }
    public static async GetAllBooks(): Promise<BookModel[]> {
      const result = await axios.get(BookService.baseUrl);
      return result.data;
    }
    public static async GetBooksDetails(id: string): Promise<BookModel> {
        const result = await axios.get(`${BookService.baseUrl}/${id}`);
        return result.data;
    }
   public static async EditOrAddBook(model: BookModel): Promise<void> {
    const result = await axios.post(`${BookService.baseUrl}`, model);
  }
  public static async GetAuthorSelectList() : Promise<AuthorModel[]> {
    const result = await axios.get(`${BookService.baseUrl}/GetAuthors`);
    return result.data;
  }
  public static async GetCategorySelectList(): Promise<CategoryModel[]> {
  const result = await axios.get(`${BookService.baseUrl}/GetCategories`);
  return result.data;
  }
   public static async GetPublisherSelectList(): Promise<PublisherModel[]> {
  const result = await axios.get(`${BookService.baseUrl}/GetPublishers`);
  return result.data;
  }

}
  