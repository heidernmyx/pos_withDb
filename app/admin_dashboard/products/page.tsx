"use client"
import Image from "next/image"
import Link from "next/link"
import {
  File,
  Home,
  LineChart,
  ListFilter,
  MoreHorizontal,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRef, useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import axios from "axios"
import type { ProductList } from "@/lib/utils"

interface ProductDetails {
  productName: string
  productPrice: number
}
interface UpdateProductDetails {
  productID: number
  productName: string
  productPrice: number
  productStatus: string
}
export default function ProductList() {

  const [ productName, setProductName ] = useState('');
  const [ productPrice, setProductPrice ] = useState(0);
  
  const [ newName, setNewName ] = useState('');
  const [ newPrice, setNewPrice ] = useState(0);
  const [ newStatus, setNewStatus ] = useState('Active');
  const [ selectedProductID, setSelectedProductId ] = useState(0);

  const [ productList, setProductList ] = useState<ProductList[]>([]);
  

  const addItemRef = useRef<HTMLButtonElement>(null);
  const productInputRef = useRef<HTMLInputElement>(null);
  const editItemRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    
    const getProducts = async () => {

      const url = `${process.env.NEXT_PUBLIC_URL}php/product.php`;
      // or
      const url2 = "http://localhost/git/pos_withDb/php/product.php";
      try {
        const response = await axios.get<ProductList[]>('http://localhost/git/pos_withDb/php/product.php', {
          params: {operation: 'getProducts'}
        });
        console.log(response)
        const List: ProductList[] = response.data.map(product => ({
          product_id: product.product_id,
          product_name: product.product_name,
          product_price: product.product_price,
          product_sales: product.product_sales,
          created_at: product.created_at,
          status: product.status
        }));
        setProductList(List);
      } catch (error) {
        
      }
    }
    getProducts();

  }, []);


  // const addProduct = async () => {

  //   const productDetails: ProductDetails = {
  //     productName: productName,
  //     productPrice: productPrice,
  //   }
  //   try {
  //     const response = await axios.post(`${process.env.NEXT_PUBLIC_URL}/app/php/product.php`, productDetails,  {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });

  //   const { data } = await response;
  //   console.log(data)
  //   }
  //   catch (err) {
  //     console.log(err)
  //   }
  // }
  const addProduct = async () => {
    const url = `${process.env.NEXT_PUBLIC_URL}/php/product.php`;
    console.log('http://localhost/git/pos_withDb/php/product.php')
    console.log(url)
    const productDetails: ProductDetails = {
      productName: productName,
      productPrice: productPrice,
    }
    console.log(productDetails);
    const formData = new FormData();
    formData.append('operation', 'insert');
    formData.append('json', JSON.stringify(productDetails));
    
    console.log(formData);
    const response = await axios({
      url: url,
      method: 'POST',
      data: formData
    })
    console.log(response);
  }

  const editProduct = async(selectedProductID: number, newName: string, newPrice: number) => {
    const url = `${process.env.NEXT_PUBLIC_URL}/php/product.php`;
    // console.log(first)
    const updateProductDets: UpdateProductDetails= {
      productID: selectedProductID,
      productName: newName,
      productPrice: newPrice,
      productStatus: newStatus
    }
    console.log(updateProductDets);
    const formData = new FormData();
    formData.append('operation', 'update');
    formData.append('json', JSON.stringify(updateProductDets));

    const response = await axios({
      url: url,
      method: "POST",
      data: formData
    });

    const { data } = response;
    console.log(data);
  }

  const deleteProduct = async(selectedProductID: number) => {
    const url = `${process.env.NEXT_PUBLIC_URL}/php/product.php`;
    const formData = new FormData();
    formData.append('operation', 'delete');
    formData.append('selectedProductID', selectedProductID.toString());
    console.log(formData);
    const response = await axios({
      url: url,
      method: "POST",
      data: formData
    });

    const { data } = response;
    console.log(data);
    // if () {

    // }
  }
  

  return (
    <>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 flex-col md:p-8">
        <Tabs defaultValue="all">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="draft">Draft</TabsTrigger>
              <TabsTrigger value="archived" className="hidden sm:flex">
                Archived
              </TabsTrigger>
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <ListFilter className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Filter
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem checked>
                    Active
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>
                    Archived
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              {/* <Button size="sm" variant="outline" className="h-8 gap-1">
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Export
                </span>
              </Button> */}
              <Button size="sm" className="h-8 gap-1">
                <PlusCircle className="h-3.5 w-3.5"/>
                <span onClick={() => {addItemRef.current?.click(); productInputRef.current?.focus()}} className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add Product
                </span>
              </Button>
            </div>
          </div>
          <TabsContent value="all">
            <Card x-chunk="dashboard-06-chunk-0">
              <CardHeader>
                <CardTitle>Products</CardTitle>
                <CardDescription>
                  Manage your products and view their sales performance.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Price
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Total Sales
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Created at
                      </TableHead>
                      <TableHead>
                        <span className="sr-only">Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {productList.map((product, index) => (
                      <TableRow key={index}>
                      <TableCell className="hidden sm:table-cell">
                        {/* <Image
                          alt="Product image"
                          className="aspect-square rounded-md object-cover"
                          height="64"
                          src="/placeholder.svg"
                          width="64"
                        /> */}
                        <span className="font-semibold text-base">{product.product_id}</span>
                      </TableCell>
                      <TableCell className="font-medium text-base">
                        {product.product_name}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-base px-[1vw] py-[1vh]">{product.status}</Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {product.product_price}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                      {product.product_sales}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                      {product.created_at}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => {
                              editItemRef.current?.click();
                              setSelectedProductId(product.product_id);
                              setNewName(product.product_name);
                              setNewPrice(product.product_price)
                            }}>Edit</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => deleteProduct(product.product_id)}>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              {/* <CardFooter>
                <div className="text-xs text-muted-foreground">
                  Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                  products
                </div>
              </CardFooter> */}
            </Card>
          </TabsContent>
        </Tabs>
      </main>


      <AlertDialog>
        <AlertDialogTrigger ref={addItemRef} className="hidden">
          Open
        </AlertDialogTrigger>
        <AlertDialogContent className="w-[27vw] px-[4vw] py-[5vh]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">Add New Item</AlertDialogTitle>
            <AlertDialogDescription className="flex flex-col">
              <Label className="pr-[1vw] mb-[1vh]">Product Name:</Label>
              <Input
                onChange={(e) => setProductName(e.target.value)}
                ref={productInputRef}
                type="text"
                placeholder=""
                className="pl-4 w-full text-black mb-[1vh]"
              />
              <br />
              <Label className="pr-[1vw] mb-[1vh]">Product Price:</Label>
              <Input
                onChange={(e) => setProductPrice(Number(e.target.value))}
                type="number"
                placeholder=""
                className="pl-4 w-full text-black mb-[1vh]"
              />
              <div className="flex mt-[5vh] justify-between">
                <AlertDialogCancel className="w-[45%] border-black">Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => addProduct()} className="w-[45%]">Add Product</AlertDialogAction>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>



      <AlertDialog>
        <AlertDialogTrigger ref={editItemRef} className="hidden">
          Open
        </AlertDialogTrigger>
        <AlertDialogContent className="w-[27vw] px-[4vw] py-[5vh]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">Update Product: {newName}</AlertDialogTitle>
            <br />
            <AlertDialogDescription className="flex flex-col">
              <div className="mb-[1vh] flex justify-start items-center space-x-2">
                <Label className="text-lg font-semibold">Product ID: </Label>
                <span className="font-semibold">{selectedProductID}</span>
              </div>
              <br/>
              <Label className="pr-[1vw] mb-[1vh]">Product Name:</Label>
              <Input
                onChange={(e) => setNewName(e.target.value)}
                ref={productInputRef}
                value={newName}
                type="text"
                placeholder=""
                className="pl-4 w-full text-black mb-[1vh]"
              />
              {/* <br /> */}
              <Label className="pr-[1vw] mb-[1vh]">Product Price:</Label>
              <Input
                onChange={(e) => {
                  const value = Math.max(0, Number(e.target.value));
                  setNewPrice(value);
                }}
                type="number"
                value={newPrice}
                placeholder=""
                className="pl-4 w-full text-black mb-[1vh]"
              />
              <Label className="pr-[1vw] mb-[1vh]">Product Price:</Label>
              <select onChange={(e) => setNewStatus(e.target.value)} value={newStatus}  className="flex h-10 w-full text-black rounded-md border border-black bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" title="status">
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Discontinued">Discontinued</option>
              </select>
              <div className="flex mt-[5vh] justify-between">
                <AlertDialogCancel className="w-[45%] border-black">Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => editProduct(selectedProductID, newName, newPrice)} className="w-[45%]">Update Product</AlertDialogAction>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
