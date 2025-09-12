//import AxiosInstance from "./AxiosInstance";
import { PublisherModel } from "../Interfaces/PublisherModel";
import axios from "axios";
export class PublisherService {
    private static baseUrl = "https://localhost:7141/api/Publisher";
    public static async DeletePublisher(id: string): Promise<void> {
      var result = await axios.delete(`${PublisherService.baseUrl}/${id}`);
    }
    public static async GetAllPublishers(): Promise<PublisherModel[]> {
      const result = await axios.get(PublisherService.baseUrl);
      return result.data;
    }
    public static async GetPublishersDetails(id: string): Promise<PublisherModel> {
        const result = await axios.get(`${PublisherService.baseUrl}/${id}`);
        return result.data;
    }
   public static async EditOrAddPublisher(model: PublisherModel): Promise<void> {
    const result = await axios.post(`${PublisherService.baseUrl}`, model);
  }
  //GetPublishers
  public static async GetSelectList() : Promise<PublisherModel[]> {
    const result = await axios.get(`${PublisherService.baseUrl}/GetPublisherSelectListAsync`);
    return result.data;
  }
     public static async CountPublishers():Promise<number>{ 
  const result = await axios.get(`${PublisherService.baseUrl}/countPublishers`);
  return result.data;
}
}
