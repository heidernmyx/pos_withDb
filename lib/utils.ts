import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// export interface ProductList {
//   product_id: string;
//   product_name: string
//   price: number;
// }

export interface ProductList {
  product_id: string
  product_name: string
  price: number
  total_sales: number
  date_created: Date
}
export interface ProductCart {
  product_name: string,
  price: number,
  quantity: number
  amount: number
}

export interface SortConfig {
  key: number; // or keyof YourDataType if you're using keys from a specific data type
  direction: 'ascending' | 'descending';
}

