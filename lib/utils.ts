import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export interface ProductList {
  product_id: string;
  product_name: string
  price: number;
}


export interface ProductCart {
  product_name: string,
  price: number,
  quantity: number
  amount: number
}

