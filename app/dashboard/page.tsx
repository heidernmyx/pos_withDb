'use client'

import Image from "next/image";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect, useRef, useState } from "react";
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
import Clock from "@/components/clock";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { ProductList, ProductCart } from "@/lib/utils";
import { exit } from "process";

export default function Dashboard() {

  const [session, setSession] = useState('');
  const [inputProduct, setProductInput] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [ displayQuantity, setDisplayQuantity ] = useState(0);
  const [ subTotal, setSubTotal] = useState(0);
  const [ total, setTotal] = useState(0);


  const [productList, setProductList] = useState<ProductList[]>([]);
  const [productCart, setProductCart] = useState<ProductCart[]>([]);
  const [ foundProduct, setFoundProduct ] = useState<ProductList>();

  const alertDialogRef = useRef<HTMLButtonElement>(null);
  const itemRef = useRef<HTMLInputElement>(null);
  const productListRef = useRef<HTMLButtonElement>(null);
  const alertContentRef = useRef<HTMLDivElement>(null);
  const productTableRef = useRef<HTMLTableElement>(null);
  const quantityRef = useRef<HTMLInputElement>(null);
  const mopRef = useRef<HTMLSelectElement>(null);
  const calculateRef = useRef<HTMLButtonElement>(null);


  useEffect(() => {
    console.log('Quantity:', quantity);
  }, [quantity]);
  
  useEffect(() => {
    itemRef.current?.focus();
    setQuantity(1);
  }, [])

  useEffect(() => {
    setSubTotal(getTotal)
    setQuantity(1);
  }, [productCart])

  useEffect(() => {
    setSession(sessionStorage.fullname);
    document.body.style.overflow = 'hidden';

    const fetchItems = async () => {
      try {
        const response = await axios.get<ProductList[]>('http://localhost/git/pos/php/product.php');
        const { data } = response;
        const List: ProductList[] = data.map(product => ({
          product_id: product.product_id,
          product_name: product.product_name,
          price: product.price
        }));
        setProductList(List);
      } catch (err) {
        console.error(err);
      }
    };
    fetchItems();

    const handleKeyDown = (event: KeyboardEvent) => {
      console.log(event.key)
      if (event.key === '+') {
        alertDialogRef.current?.click();
      } else if (event.key === 'n' || event.key === 'N') {
        itemRef.current?.focus();
      } else if (event.key === '*') {
        productListRef.current?.click();
        setTimeout(() => {
          productTableRef.current?.click();
        }, 1000);
      } else if (event.key === 'Escape') {
        // handle escape
      } else if (event.key === 'Delete') {
        // handle delete
      } else if (event.key === 't' || event.key === 'T') {
        const validation = quantity === 0 ? false: true;
        if (validation) {
          const foundProduct = productList.find(product => product.product_id.toString() === inputProduct);
          setFoundProduct(foundProduct);
          
          const existingProductIndex = productCart.findIndex(product => product.product_name === foundProduct?.product_name);
          
          if (existingProductIndex !== -1) {
            const updatedCart = [...productCart];
            updatedCart[existingProductIndex].quantity += quantity;
            updatedCart[existingProductIndex].amount = updatedCart[existingProductIndex].price * updatedCart[existingProductIndex].quantity;
            setProductCart(updatedCart);

          } else {
            setProductCart([...productCart, {
              product_name: foundProduct?.product_name || '', 
              price: foundProduct?.price || 0,
              quantity: quantity,
              amount: foundProduct!.price * quantity
            }]);
          }

          setDisplayQuantity(quantity);
          setProductInput('');
          setQuantity(1);
          quantityRef.current?.blur();
          quantityRef.current!.value = '1';

        } else if (!validation) {
          alert('Enter a valid Quantity!');
          console.log(quantity)
          return;
        }
      } 
      else if (event.key === "c") {
        calculateRef.current?.click();
      }
      else if (event.key === "m"
        
      ) {
        mopRef.current?.focus();  
      }
      else if (event.key === 'PageDown' || event.key === 'PageUp') {
        if (alertContentRef.current) {
          const scrollAmount = 50;
          productTableRef.current?.click();
          alertContentRef.current.scrollBy({
            top: event.key === 'PageDown' ? scrollAmount : -scrollAmount,
            behavior: 'smooth',
          });
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [productList, inputProduct]);

  // Logging inputProduct changes
  useEffect(() => {
    console.log('Input Product:', inputProduct);
  }, [inputProduct]);
  const getTotal = () => {
    // console.log(product.amount)
    return productCart.reduce((acc, product) => acc + product.amount, 0);
    // var total = 0; 
    // productCart.forEach(product => {
    //   total += product.price
    // })
    return total;
  }


  return (
    <>
      <div>
        <Container className="h-[90vh] p-[2vh] border border-black mx-[5vw] my-[5vh]">
          <Col>
            <Container className="d-flex justify-content-between align-items-center px-[3vh] mb-[2vh]">
              <Row className="d-inline-flex">
                <div className="flex justify-between text-start">
                  <Image className="ml-[5vw]" src={'/assets/images/ororama.png'} height={75} width={350} alt="ororama" />
                  <div className="flex flex-col justify-center items-center text-center space-y-5">
                    <pre>
                      <span className="flex">Time   : <Clock /></span>
                      <span>Cashier: {session}</span>
                    </pre>
                  </div>
                </div>
              </Row>
            </Container>
            <hr className="border-black mb-[2vh]" />
            <Container>
              <Col>
                <Row className="flex space-x-4">
                  <Col className="flex flex-col">
                    <Label className="text-lg">Item</Label>
                    <input
                      ref={itemRef}
                      value={inputProduct}
                      onChange={(e) => {
                        setProductInput(e.target.value);
                      }}
                      className="w-[15vw] rounded-none border border-black py-1 px-2"
                      type="number"
                      placeholder="item #"
                    />
                    <Label className="text-lg">Quantity</Label>
                    <input
                      defaultValue={1}
                      ref={quantityRef}
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                      className="w-[15vw] rounded-none border border-black py-1 px-2"
                      type="number"
                      placeholder="quantity"
                    />
                    <Label className="text-lg">Mode of Payment</Label>
                    <select ref={mopRef} title="mop" className="border border-solid border-black py-1 px-2">
                      {/* {itemList.map((item, index) => (
                        <option key={index} value={item.product}>
                          {item.product}
                        </option>
                      ))} */}
                      <option value='Cash'> Cash</option>
                      <option value='Credit Card'> Credit Card</option>
                      <option value='Gcash'> Gcash</option>
                      <option value='ATM'> ATM</option>
                    </select>
                    { foundProduct && 
                    <Container className="border border-black border-solid px-[2vh] py-[1vh] mt-[5vw]">
                      <h1 className="text-center font-semibold text-lg">Item Details</h1><br/>
                      <pre className="flex flex-col justify-between">
                        <div className="flex justify-between">
                          <span className="space-x-">Product ID:   </span><p>{foundProduct?.product_id}</p>
                        </div>
                        <div className="flex justify-between">
                          <span className="space-x-">Product Name:   </span><p>{foundProduct?.product_name}</p>
                        </div>
                        <div className="flex justify-between">
                          <span className="space-x-">Price:   </span><p>{foundProduct?.price}</p>
                        </div>
                        <div className="flex justify-between">
                          <span>Quantity:   </span><p>{displayQuantity}</p>
                        </div><br/>
                        <div className="flex justify-between">
                          <strong>Total:   </strong><p>{displayQuantity * foundProduct.price}</p>
                        </div>
                      </pre>
                    </Container>}
                  </Col>
                  <div className="flex flex-col max-h-[60vh] overflow-y-auto w-full">
                    <Table className="border border-solid border-black">
                      <TableCaption>A list of your recent invoices.</TableCaption>
                      <TableHeader className="sticky top-0 bg-white z-10">
                        <TableRow className="bg-slate-200 border-black">
                          <TableHead className="w-[13vw] text-left text-lg">Product #</TableHead>
                          <TableHead className="w-[13vw] text-left text-lg">Product Name</TableHead>
                          <TableHead className="text-lg">Price</TableHead>
                          <TableHead className="text-lg">Quantity</TableHead>
                          <TableHead className="text-right text-lg">Amount</TableHead>
                          <TableHead className="text-right text-lg"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {productCart.map((product, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium text-left">{index + 1}</TableCell>
                            <TableCell className="font-medium text-left">{product.product_name}</TableCell>
                            <TableCell>{product.price}</TableCell>
                            <TableCell>{product.quantity}</TableCell>
                            <TableCell className="text-right">{product.amount}</TableCell>
                            <TableCell className="flex justify-center">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="icon"
                                    className="flex flex-col justify-center items-center h-8 w-8 p-0 bg-[rgba(0,0,0,0.1)] hover:bg-[rgba(0,0,0,0.3)]"
                                  >
                                    <span className="sr-only"></span>
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>Remove</DropdownMenuItem>
                                  <DropdownMenuItem>???</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <hr className="bg-black" />
                    { true && <pre className="text-lg font-semibold">
                    <p className="text-lg">Subtotal:   {subTotal}</p>
                    <p className="text-xl">Total  :  {total}</p>
                  </pre>
                  }
                </div>
                  
                </Row>
              </Col>
            </Container>
            
          </Col>
          
        </Container>
        
      </div>
      <AlertDialog>
        <AlertDialogTrigger ref={alertDialogRef} className="hidden">
          Open
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Add Item</AlertDialogTitle>
            <AlertDialogDescription>
              <input
                className="px-2 py-1 border border-black border-solid outline-none"
                title="add"
                type="text"
                placeholder=""
              />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog>
        <AlertDialogTrigger ref={productListRef} className="hidden">
        </AlertDialogTrigger>
        <AlertDialogContent 
          ref={alertContentRef} 
          className="w-[600px] max-w-[90vw] max-h-[70vh] overflow-hidden"
        >
          <AlertDialogHeader>
            <AlertDialogTitle>Product List</AlertDialogTitle>
            <AlertDialogDescription className="overflow-y-auto max-h-[50vh]">
              <div className="max-h-[50vh] overflow-y-auto w-full">
                <Table ref={productTableRef} className="border border-solid border-black">
                  <TableCaption>A list of all products</TableCaption>
                  <TableHeader>
                    <TableRow className="bg-slate-200 border-black">
                      <TableHead className="text-left text-lg">Product ID</TableHead>
                      <TableHead className="text-lg text-left">Product Name</TableHead>
                      <TableHead className="text-lg text-left">Price</TableHead>
                      <TableHead className="text-right text-lg"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {productList.map((product, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium text-left">{product.product_id}</TableCell>
                        <TableCell className="text-left">{product.product_name}</TableCell>
                        <TableCell className="text-left">{product.price}</TableCell>
                        <TableCell className="flex justify-center">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="icon"
                                className="flex flex-col justify-center items-center h-8 w-8 p-0 bg-[rgba(0,0,0,0.1)] hover:bg-[rgba(0,0,0,0.3)]"
                              >
                                <span className="sr-only"></span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>View product details</DropdownMenuItem>
                              <DropdownMenuItem>Add to cart</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog>
        <AlertDialogTrigger ref={calculateRef} className="hidden">
          Open
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-semibold">Calculate</AlertDialogTitle>
            <AlertDialogDescription>
              <pre className="text-lg ">
                Total
              </pre>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}