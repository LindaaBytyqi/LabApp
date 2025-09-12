import axios from "axios";
import { SelectListItem } from "../Interfaces/SelectListItem";
import { AuthorModel } from "../Interfaces/AuthorModel";

export class AuthorService {
    private static baseUrl = "https://localhost:7141/api/Author";
    public static async DeleteAuthor(id: string): Promise<void> {
      var result = await axios.delete(`${AuthorService.baseUrl}/${id}`);
    }
    public static async GetAllAuthors(): Promise<AuthorModel[]> {
      const result = await axios.get(AuthorService.baseUrl);
      return result.data;
    }
    public static async GetAuthorsDetails(id: string): Promise<AuthorModel> {
        const result = await axios.get(`${AuthorService.baseUrl}/${id}`);
        return result.data;
    }
   public static async EditOrAddAuthor(model: AuthorModel): Promise<void> {
    const result = await axios.post(`${AuthorService.baseUrl}`, model);
  }
 
  public static async GetSelectList(): Promise<SelectListItem[]> {
  const result = await axios.get(`${AuthorService.baseUrl}/GetAuthors`);
  return result.data;
}
   public static async CountAuthors():Promise<number>{ 
  const result = await axios.get(`${AuthorService.baseUrl}/countAuthors`);
  return result.data;
}

}