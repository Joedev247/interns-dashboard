// src/services/api.ts
import axios from 'axios';

const BASE_URL = 'https://dummyjson.com';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  thumbnail: string;
  category: string;
  stock: number;
}

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface Comment {
  id: number;
  body: string;
  postId: number;
  user: {
    id: number;
    username: string;
  };
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface PostsResponse {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
}

export interface CommentsResponse {
  comments: Comment[];
  total: number;
  skip: number;
  limit: number;
}

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  token: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

const api = {
  login: async (username: string, password: string): Promise<LoginResponse> => {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      username,
      password,
    });
    return response.data;
  },

  getProducts: async (): Promise<ProductsResponse> => {
    const response = await axios.get(`${BASE_URL}/products`);
    return response.data;
  },

  getPosts: async (): Promise<PostsResponse> => {
    const response = await axios.get(`${BASE_URL}/posts`);
    return response.data;
  },

  getComments: async (): Promise<CommentsResponse> => {
    const response = await axios.get(`${BASE_URL}/comments`);
    return response.data;
  },

  // New methods for managing products
  createProduct: async (product: Omit<Product, 'id'>): Promise<Product> => {
    const response = await axios.post(`${BASE_URL}/products/add`, product);
    return response.data;
  },

  updateProduct: async (id: number, product: Partial<Product>): Promise<Product> => {
    const response = await axios.put(`${BASE_URL}/products/${id}`, product);
    return response.data;
  },

  deleteProduct: async (id: number): Promise<void> => {
    await axios.delete(`${BASE_URL}/products/${id}`);
  },
};

export default api;
