
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

    
    try {
      cookie.remove("token", { path: "/" });
    } catch (e) {
      
    }
    try {
      cookie.remove("refreshToken", { path: "/" });
    } catch (e) {
      
    }

   
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem("userId");
        localStorage.removeItem("email");
      }
    } catch (e) {
      
    }

    
    set({ token: null });
    try {
      toast.success("Logged out successfully");
    } catch (e) {
      
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




// import { create } from "zustand";
// import { Cookies } from "react-cookie";

// interface UserState {
//   token: string | null;
//   setTokenAndUser: (token: string) => void;
//   logout: () => void;
//   initializeToken: () => void;
// }

// const useUserStore = create<UserState>((set) => ({
//   token: null,

//   setTokenAndUser: (token) => {
//     const cookie = new Cookies();
//     if (token) {
//       cookie.set("token", token, { path: "/" });
//     }
//     set({ token });
//   },

//   logout: () => {
//     const cookie = new Cookies();
//     cookie.remove("token", { path: "/" });
//     set({ token: null });
//   },

//   initializeToken: () => {
//     if (typeof window !== "undefined") {
//       const cookie = new Cookies();
//       const token = cookie.get("token") || null;
//       set({ token });
//     }
//   },
// }));

// export default useUserStore;