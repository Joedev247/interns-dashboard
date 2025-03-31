export interface Product {
    id: number;
    title: string;
    price: number;
    rating: number;
    category: string;
    thumbnail: string;
    stock?: number;
    description?: string;
  }
  
  export interface Category {
    slug: string;
    name: string;
    url: string;
  }
  
  export interface ApiResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
  }
  