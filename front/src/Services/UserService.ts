import axios from "axios";
import { UserModel } from "../Interfaces/UserModel";
import { toast } from "react-toastify";
import { LoginModel } from "../Interfaces/LoginModel";
import { AuthenticationModel } from "../Interfaces/AuthenticationModel";
 import { store } from "../store";

export class UserService {
  private static baseUrl = "https://localhost:7141/api/User";
  public static LoggedInUser: UserModel | null = null;
  public static token: string | null = null;
  public static role: string | null = null;

  public static async Login(user: LoginModel): Promise<AuthenticationModel> {
    const response = await axios.post<AuthenticationModel>(
      `${UserService.baseUrl}/login`,
      user
    );
    localStorage.setItem("jwt", response.data.token);
    UserService.token = response.data?.token;
    localStorage.setItem("refreshToken", response.data.refreshToken);
    localStorage.setItem("userModel", JSON.stringify(response.data.userData));
    UserService.LoggedInUser = response.data?.userData;
    localStorage.setItem("role", response.data.userRole);
    UserService.role = response.data?.userRole;
    toast.success("Logged in successfuly");
    const userId = response.data.userData.id;
   

  // Optionally mark them as read in the backend
    return response.data;
  }
  public static LogOut(): void {

    console.log("Logging out...");

    localStorage.removeItem("jwt");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("token");
    localStorage.removeItem("userModel");
    localStorage.removeItem("role");
    localStorage.removeItem("userRole");
    localStorage.removeItem("id");
   

    UserService.token = null;
    UserService.role = null;
    UserService.LoggedInUser = null;
  }
   public static isAuthenticated() {
    if (UserService.token) {
      return true;
    }
    const token = localStorage.getItem("jwt");
    return token != null;
  }
  public static GetUserRole(): string | null {
    return localStorage.getItem("role")!;
  }
  public static async DeleteUser(id: string): Promise<void> {
    await axios.delete(`${UserService.baseUrl}/${id}`);
  }

  public static async GetAllUsers(): Promise<UserModel[]> {
    const result = await axios.get(UserService.baseUrl);
    return result.data;
  }
  public static async GetAllAdmins(): Promise<UserModel[]> {
    const result = await axios.get(`${UserService.baseUrl}/admins`);
    return result.data;
  }

  public static async GetUserDetails(id: string): Promise<UserModel> {
    const result = await axios.get(`${UserService.baseUrl}/${id}`);
    return result.data;
  }

  public static async EditOrAddUser(model: UserModel): Promise<void> {
    await axios.post(UserService.baseUrl, model);
  }
  public static async GetSelectList(): Promise<UserModel[]> {
    const result = await axios.get(`${this.baseUrl}`);
    return result.data;
  }
   public static isAdmin(): boolean{
     return UserService.GetUserRole() ==='Admin';
  }
  public static getUserId(): string {
  // Nëse user është loguar, përdor ID e tij
  if (UserService.LoggedInUser?.id) {
    return UserService.LoggedInUser.id;
  }

  // Për guest, shiko në localStorage
  let guestId = localStorage.getItem("guestUserId");
  if (!guestId) {
    guestId = crypto.randomUUID(); // krijon Guid
    localStorage.setItem("guestUserId", guestId);
  }
  return guestId;
}



}