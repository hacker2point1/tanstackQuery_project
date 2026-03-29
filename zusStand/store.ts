
import { create } from "zustand";
import { Cookies } from "react-cookie";
import { AxiosInstance } from "@/api/axios/axios";
import { endpoints } from "@/api/endpoints/endpoints";
import { toast } from "sonner";

interface UserState {
  token: string | null;
  setTokenAndUser: (token: string) => void;
  logout: () => Promise<void>;
  initializeToken: () => void;
}

const useUserStore = create<UserState>((set) => ({
  token: null,

  setTokenAndUser: (token) => {
    const cookie = new Cookies();
    if (token) {
      cookie.set("token", token, { path: "/" });
    }
    set({ token });
  },

  logout: async () => {
    const cookie = new Cookies();

    
    try {
      await AxiosInstance.post(endpoints.auth.logout);
    } catch (err) {
      
    }

    //when we logout this function will remove the access token and the refresh token from the cookies and also remove the userId and email from localStorage and then set the token in the zustand store to null.
    
    try {
      cookie.remove("token", { path: "/" });
    } catch (error) {
      console.log(error,"error")
    }
    try {
      cookie.remove("refreshToken", { path: "/" });
    } catch (error) {
      console.log(error,"error")
    }

   
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem("userId");
        localStorage.removeItem("email");
      }
    } catch (error) {
      console.log(error,"error")
    }

    
    set({ token: null });
    try {
      toast.success("Logged out successfully");
    } catch (error) {
      console.log(error, "error")
    }
  },

  initializeToken: () => {
    if (typeof window !== "undefined") {
      const cookie = new Cookies();
      const token = cookie.get("token") || null;
      set({ token });
    }
  },
}));

export default useUserStore;



