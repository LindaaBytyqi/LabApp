//import AxiosInstance from "./AxiosInstance";
import { CategoryModel } from "../Interfaces/CategoryModel";
import axios from "axios";
export class CategoryService {
    private static baseUrl = "https://localhost:7141/api/Category";
    public static async DeleteCategory(id: string): Promise<void> {
      var result = await axios.delete(`${CategoryService.baseUrl}/${id}`);
    }
    public static async GetAllCategories(): Promise<CategoryModel[]> {
      const result = await axios.get(CategoryService.baseUrl);
      return result.data;
    }
    public static async GetCategoriesDetails(id: string): Promise<CategoryModel> {
        const result = await axios.get(`${CategoryService.baseUrl}/${id}`);
        return result.data;
    }
   public static async EditOrAddCategory(model: CategoryModel): Promise<void> {
    const result = await axios.post(`${CategoryService.baseUrl}`, model);
  }
  public static async GetSelectList() : Promise<CategoryModel[]> {
    const result = await axios.get(`${CategoryService.baseUrl}/GetAuthors`);
    return result.data;
  }
  public static async GetBooksByCategory(): Promise<{ name: string; value: number }[]> {
    const result = await axios.get(`${CategoryService.baseUrl}/GetBooksByCategory`);
    return result.data;
  }

}
