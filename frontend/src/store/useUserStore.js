import api from "../lib/axios.js";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useUserStore = create((set, get) => ({
    user: null,
    loading: false,
    checkingAuth: true,

    signup: async ({ name, email, password, confirmPassword, navigate }) => {
        set({ loading: true });

        if (password !== confirmPassword) {
            set({ loading: false });
            return toast.error("Password do not match");
        }
        try {
            const res = await api.post("/auth/signup", { name, email, password }, { withCredentials: true });
            set({ user: res.data, loading: false })
            toast.success("User created successfully")
        } catch (error) {
            set({ loading: false });            
            const msg = error.response?.data?.message || "Error creating user";

            if (error.response?.status === 429) {
                toast.error(msg);
                return navigate("/rate-limit");
            }
            toast.error(msg);
        }
    },

    login: async (email, password,navigate) => {
        set({ loading: true });

        try {
            const res = await api.post("/auth/login", { email, password }, { withCredentials: true });
            set({ user: res.data, loading: false })
            if (res.data.message === "User already logged in") {
                toast("You are already logged in!", { icon: "ℹ️" });
            } else {
                toast.success("User logged in successfully");
            }
        } catch (error) {
            set({ loading: false });
              const msg = error.response?.data?.message || "Error logging in user";

            if (error.response?.status === 429) {
                toast.error(msg);
                return navigate("/rate-limit");
            }
            toast.error(msg);
        }
    },

    logout: async () => {
        set({ loading: true });

        try {
            const res = await api.post("auth/logout", { withCredentials: true });
            set({ user: null, loading: false })
            toast.success(res.data.message || "User logged out successfully")
        } catch (error) {
            set({ loading: false });
            toast.error(error.response.data.message || "Error logging out user")
            
          
        }
    },

    checkAuth: async (navigate) => {
        set({ checkingAuth: true })
        try {
            const res = await api.get("auth/profile");
            set({ user: res.data, checkingAuth: false })
        } catch (error) {
            set({ checkingAuth: false });
               const msg = error.response?.data?.message || "Error checking auth";

        // ✅ If rate limit hit
        if (error.response?.status === 429) {
            toast.error(msg);
            return navigate('/rate-limit');
        }
        // ✅ If user is not logged in, don't show toast
        if (error.response?.status !== 401) {
            toast.error(msg);
        }
        }
    }
}))