import toast from "react-hot-toast";
import api from "../lib/axios"
import { create } from "zustand";

export const useProductStore = create((set) => ({
    products: [],
    loading: false,

    setProducts: (products) => set({ products }),

    createProduct: async (productData) => {
        set({ loading: true })
        try {
            const res = await api.post("/products", productData);
            set((preveState) => ({
                products: [...preveState.products, res.data],
                loading: false,
            }))
        } catch (error) {
            toast.error(error.res?.data.message)
            set({ loading: false })
        }
    },
    fetchAllProducts: async () => {
        set({ loading: true })
        try {
            const res = await api.get("/products")
            set({ products: res.data, loading: false })
            console.log("hee", products)
        } catch (error) {
            set({ error: error.res?.data.message, loading: false })
            // toast.error(error.res?.data.message || "Failed to fetch products")
        }
    },
    fetchProductsByCategory: async (category)=>{
        set({ loading: true })
        try {
            const res = await api.get(`/products/category/${category}`);
            set({products:res.data.products, loading: false})
        } catch (error) {
            set({ error: error.res?.data.message, loading: false })
        }
    },
    fetchFeaturedProducts: async () => {
        set({loading: true})
        try {
            const res = await api.get("products/featured");
            set({products: res.data, loading: false});
        } catch (error) {
            set({error: error.res?.data.message, loading: false})
            console.log("error in featured products")
        }
    },

    deleteProduct: async (productId) => {
        set({ loading: true })
        try {
            await api.delete(`/products/${productId}`);

            set((prevProducts) => ({
                products: prevProducts.products.filter((product) => product._id !== productId),
                loading: false
            }))
            // toast.success(res?.data.message)
        } catch (error) {
            set({ loading: false })
            toast.error(error.res?.data.message)

        }

    },
    toggleFeaturedProduct: async (productId) => {
        set({ loading: true })
        try {
            const res = await api.patch(`/products/${productId}`);

            set((prevProducts) => ({
                products: prevProducts.products.map((product) =>
                    product._id === productId ? { ...product, isFeatured: res.data.isFeatured } : product),
                loading: false,
            }))
        } catch (error) {
            set({ loading: false })
            toast.error(error.res?.data.message || "Failed to fetch products")
        }
    }
}))