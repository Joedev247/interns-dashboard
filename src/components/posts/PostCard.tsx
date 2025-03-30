// src/components/products/ProductCard.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Product } from '../../services/api';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card>
      <CardHeader>
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-48 object-cover rounded-t"
        />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <CardTitle className="text-xl">{product.title}</CardTitle>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {product.description}
          </p>
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold">${product.price}</span>
            <Badge variant="secondary">
              {product.category}
            </Badge>
          </div>
          <div className="text-sm text-gray-500">
            Stock: {product.stock}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
