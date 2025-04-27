import axios from "axios";
import { CartItem, CheckoutData } from "@/interfaces/interfaces";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Użycie zmiennej środowiskowej
  headers: {
    "Content-Type": "application/json",
  },
});

//Dodanie Authorization: Bearer token do każdego żądania HTTP jeśli token istnieje, w celu weryfikacji czy użytkownik jest zalogowany na backendzie
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

//Funckje do obsługi koszyka

export const addToCart = async (item: CartItem) => {
  const response = await api.post("/api/cart", item);
  return response.data;
};

export const updateCartItem = async (itemId: number, quantity: number) => {
  const response = await api.put(`/api/cart/${itemId}`, { quantity });

  return response.data;
};

export const removeFromCart = async (itemId: number) => {
  const response = await api.delete(`/api/cart/${itemId}`);
  return response.data;
};

export const removeAllProductsFromCart = async () => {
  const response = await api.delete("/api/cart");
  return response.data;
};

export const getCart = async () => {
  const response = await api.get("/api/cart/cart"); //tylko tu inna ścieżka tak dla rożróżnienia
  return response.data;
};

export const completeCheckout = async (checkoutData: CheckoutData) => {
  console.log("Sending checkoutData:", { checkoutData });
  const response = await api.post("/api/checkout/checkout", { checkoutData });
  return response.data;
};

// Nowa funkcja do pobierania ostatniego zamówienia
export const getLastOrder = async () => {
  const response = await api.get("/api/checkout/last-order");
  return response.data.order;
};
