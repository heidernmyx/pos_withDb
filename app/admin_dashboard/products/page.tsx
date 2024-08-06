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

interface ProductDetails {
  productName: string
  productPrice: number
}
export default function ProductList() {

  const [ productName, setProductName ] = useState('');
  const [ productPrice, setProductPrice ] = useState(0);

  

  const addItemRef = useRef<HTMLButtonElement>(null);
  const productInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    
    const getProducts = async () => {

      const url = `${process.env.NEXT_PUBLIC_URL}php/product.php`;
      const url2 = "http://localhost/git/pos_withDb/php/product.php";
      try {
        
        const response = await axios.get(url)
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
    console.log(url);
    console.log(true)

    const productDetails: ProductDetails = {
      productName: productName,
      productPrice: productPrice,
    }
    const formData = new FormData();
    formData.append('operation', 'insert');
    formData.append('json', JSON.stringify(productDetails));


    const response = await axios({
      url: url,
      method: 'POST',
      data: formData
    })
    // var response = await axios.post(url, {
    //   params:{json: JSON.stringify(productDetails), operation: "insert"}
    // });
    console.log(response);
    //check if valid user
    
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
                <PlusCircle className="h-3.5 w-3.5" />
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
                      <TableHead className="hidden w-[100px] sm:table-cell">
                        <span className="sr-only">Image</span>
                      </TableHead>
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
                    <TableRow>
                      <TableCell className="hidden sm:table-cell">
                        <Image
                          alt="Product image"
                          className="aspect-square rounded-md object-cover"
                          height="64"
                          src="/placeholder.svg"
                          width="64"
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        Laser Lemonade Machine
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Draft</Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        $499.99
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        25
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        2023-07-12 10:42 AM
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
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="hidden sm:table-cell">
                        <Image
                          alt="Product image"
                          className="aspect-square rounded-md object-cover"
                          height="64"
                          src="/placeholder.svg"
                          width="64"
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        Luminous VR Headset
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Active</Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        $199.99
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        30
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        2024-02-14 02:14 PM
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
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="hidden sm:table-cell">
                        <Image
                          alt="Product image"
                          className="aspect-square rounded-md object-cover"
                          height="64"
                          src="/placeholder.svg"
                          width="64"
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        Luminous VR Headset
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Active</Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        $199.99
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        30
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        2024-02-14 02:14 PM
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
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="hidden sm:table-cell">
                        <Image
                          alt="Product image"
                          className="aspect-square rounded-md object-cover"
                          height="64"
                          src="/placeholder.svg"
                          width="64"
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        Luminous VR Headset
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Active</Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        $199.99
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        30
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        2024-02-14 02:14 PM
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
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                    
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
            <br/>
            <AlertDialogDescription className="flex flex-col">
              <Label className="pr-[1vw] mb-[1vh] ">Product Name:</Label>
              <Input
                onChange={(e) => setProductName(e.target.value)}
                ref={productInputRef}
                type="text"
                placeholder=""
                className="pl-4 w-[100%] text-black sm:w-[300px] md:w-[200px] lg:w-[300px] "
              />
              <br/>
              <Label className="pr-[1vw] mb-[1vh]">Product Price:</Label>
              <Input
                onChange={(e) => setProductPrice(Number(e.target.value))}
                type="number"
                placeholder=""
                className="pl-4 sm:w-[300px] text-black md:w-[200px] lg:w-[300px]"
              />
              <div className="flex mt-[5vh] justify-between">
                <AlertDialogCancel className="w-[45%] border-black">Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => addProduct()} className="w-[45%]">Add Product</AlertDialogAction>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
