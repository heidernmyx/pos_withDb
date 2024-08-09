import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// export interface ProductList {
//   product_id: string;
//   product_name: stringy
//   price: number;
// }

export interface ProductList {
  product_id: number
  product_name: string
  product_price: number
  product_sales: number
  created_at: string
  status: string
}
export interface CashierProductInterface {
  product_id: number
  product_name: string
  product_price: number
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



export interface AddEmployeeDetails {
  user_role: number,
  username: string,
  password: string,
  fullname: string
}

export interface EditEmployeeDetails {
  user_role: number,
  username: string,
  password: string,
  fullname: string
}


