export interface User {
    id: number;
    username: string;
    email: string;
  }
  
  export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
  }
  
  export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    thumbnail: string;
    category: string;
    stock: number;
  }
  
  export interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
    tags: string[];
    reactions: number;
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