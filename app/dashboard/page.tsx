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
import { Input } from '@/components/ui/input';
import { MoreHorizontal } from "lucide-react";
import { ProductList, ProductCart } from "@/lib/utils";
import { exit } from "process";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  
  const router = useRouter();

  const [ session, setSession ] = useState('');
  const [ inputProduct, setProductInput ] = useState('');
  const [ quantity, setQuantity ] = useState(1);
  const [ displayQuantity, setDisplayQuantity ] = useState(0);
  const [ subTotal, setSubTotal ] = useState(0);
  const [ total, setTotal ] = useState(0);
  const [ quantityTotal, setQuantityTOtal ] = useState(0);
  const [ mop, setMop ] = useState('');
  const [ cash, setCash ] = useState(0);
  const [ time, setTime ] = useState('');
  const [ selectedIndex, setSelectedIndex ] = useState(0);
  const [ sortConfig, setSortConfig ] = useState({ key: null, direction: 'ascending' });
  const [ date, setDate ] = useState('');
  const [ newQuantity, SetNewQuantity ] = useState(0);
  const [ isOpen, setIsOpen ] = useState(false);


  const [ productList, setProductList ] = useState<ProductList[]>([]);
  const [ productCart, setProductCart ] = useState<ProductCart[]>([]);
  const [ foundProduct, setFoundProduct ] = useState<ProductList>();

  const alertDialogRef = useRef<HTMLButtonElement>(null);
  const itemRef = useRef<HTMLInputElement>(null);
  const productListRef = useRef<HTMLButtonElement>(null);
  const alertContentRef = useRef<HTMLDivElement>(null);
  const productTableRef = useRef<HTMLTableElement>(null);
  const quantityRef = useRef<HTMLInputElement>(null);
  const mopRef = useRef<HTMLSelectElement>(null);
  const calculateRef = useRef<HTMLButtonElement>(null);
  const cashRef = useRef<HTMLInputElement>(null);
  const updateQtyRef = useRef<HTMLButtonElement>(null);
  const productsortRef = useRef<HTMLTableCellElement>(null);
  const pricesortRef = useRef<HTMLTableCellElement>(null);
  const quantitysortRef = useRef<HTMLTableCellElement>(null);
  const amountsortRef = useRef<HTMLTableCellElement>(null);

  const formattedDateTime = new Date().toLocaleString();

  useEffect(() => {
    console.log('Quantity:', quantity);
  }, [quantity]);
  
  useEffect(() => {
    
    const getProducts = async () => {
      const url = `${process.env.NEXT_PUBLIC_URL}php/product.php`;
      // or
      const url2 = "http://localhost/git/pos_withDb/php/product.php";
      try {
        const response = await axios.get<ProductList[]>('http://localhost/git/pos_withDb/php/product.php', {
          params: {operation: 'getActiveProducts'}
        });
        console.log(response)
        const List: ProductList[] = response.data.map(product => ({
          product_id: product.product_id,
          product_name: product.product_name,
          product_price: product.product_price,
          // product_sales: product.product_sales,
          // created_at: product.created_at,
          // status: product.status
        }));
        setProductList(List);
      } catch (error) {
        
      }
    }
    getProducts();
  
    itemRef.current?.focus();
    setQuantity(1);
    setTime(formattedDateTime);

  }, [])

  useEffect(() => {
    setSubTotal(getTotal)
    setQuantity(1);
    setTotal(subTotal* (12/100) + subTotal)
    setQuantityTOtal(getTotalQuantity);
    
  }, [productCart, subTotal ])

  useEffect(() => {
    setSession(sessionStorage.fullname);
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      console.log(event.key)
      if (event.key === '+') {
        alertDialogRef.current?.click();
      }
      else if (event.key === "ArrowUp" && selectedIndex > 0) {
        setSelectedIndex(selectedIndex - 1);
      } 
      else if (event.key === "ArrowDown" && selectedIndex < productCart.length - 1) {
        setSelectedIndex(selectedIndex + 1);
      } 
      else if (event.key === 'Delete') {
        // handle delete
        handleRemove(selectedIndex);
      } 
      else if (event.key === 'n' || event.key === 'N') {
        itemRef.current?.focus();
      } else if (event.key === '*') {
        productListRef.current?.click();
        setTimeout(() => {
          productTableRef.current?.click();
        }, 1000);
      } else if (event.key === 'Escape') {
        // handle escape
        sessionStorage.clear();
        router.push('/');
      } else if (event.key === 't' || event.key === 'T') {
        const validation = quantity === 0 ? false: true;
        if (validation) {
          const foundProduct = productList.find(product => product.product_id.toString() === inputProduct);

          if (!foundProduct) {
            alert('Enter valid Item ID!')
            return;
          }
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
              price: foundProduct?.product_price || 0,
              quantity: quantity,
              amount: foundProduct!.product_price * quantity
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
      else if (event.key === "q") {
        // i = i + 1;
        // console.log(i)
        // setIsOpen(true);
        if (!mop) {
          alert("Select Payment Method!")
          return;
        }
        if (mop == "Cash" && cash < total) {
          alert("Insufficient Cash")
          return;
        }
        if (productCart.length === 0) {
          alert("Add items first!")
          return;
        }

        if (isOpen) {
          console.log(true)
          setIsOpen(false);
          setProductCart([]); // Reset productCart when the dialog closes
        }
        else if (!isOpen) {
          console.log(true)
          setIsOpen(true);
          setTime(new Date().toLocaleTimeString());
          setDate(new Date().toLocaleDateString())
          calculateRef.current?.click();
        }
        
        // calculateRef.current?
      }
      
      else if (event.key === "m") {
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
      else if (event.key === "!") {
        productsortRef.current?.click();
      }
      else if (event.key === "@") {
        pricesortRef.current?.click();
      }
      else if (event.key === "#") {
        quantitysortRef.current?.click();
      }
      else if (event.key === "$") {
        amountsortRef.current?.click();
      }
    };
    if ( mop != "Cash" ) {
      cashRef.current?.click();
    }
    
    if (!sessionStorage.getItem('fullname')) { // Adjust the key to your specific session key
      // clearSessionAndRedirect();
      router.push('/')
    }
    

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [productList, inputProduct, selectedIndex, productCart]);

  useEffect(() => {
    console.log('Input Product:', inputProduct);
  }, [inputProduct]);

  // useEffect(() => {
  //   window.addEventListener("keydown", handleKeyDown);

  //   return () => {
  //     window.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, [selectedIndex, productCart]);

  const getTotal = () => {
    return productCart.reduce((acc, product) => acc + product.amount, 0);
    // var total = 0; 
    // productCart.forEach(product => {
    //   total += product.price
    // })
  }

  const getTotalQuantity = () => {
    return productCart.reduce((acc, product) => acc + product.quantity, 0);
  }

  const handleRemove = (index: number) => {
    // Remove the item from the productCart
    const updatedCart = [...productCart];
    updatedCart.splice(index, 1);
    setProductCart(updatedCart);

    // Adjust selectedIndex if necessary
    if (selectedIndex >= updatedCart.length) {
      setSelectedIndex(updatedCart.length - 1);
    }
  };

  const updateItemQty = (index: number, newQuantity: number) => {
    console.log(index, newQuantity)
    const updatedCart = [...productCart];
            updatedCart[index].quantity = newQuantity;
            updatedCart[index].amount = updatedCart[index].price * updatedCart[index].quantity;
  
    setProductCart(updatedCart);
  };

  const sortData = (key: string) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedProductCart = [...productCart].sort((a, b) => {
    if (sortConfig.key) {
      let aKey = a[sortConfig.key];
      let bKey = b[sortConfig.key];
  
      // Convert to number if the key is 'price', 'quantity', or 'amount'
      if (['price', 'quantity', 'amount'].includes(sortConfig.key)) {
        aKey = Number(aKey);
        bKey = Number(bKey);
      }
  
      if (aKey < bKey) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (aKey > bKey) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
    }
    return 0;
  });


  const handleClose = () => {
    setIsOpen(false);
    setProductCart([]); // Reset productCart when the dialog closes
  };

  return (
    <>
      <div className="">
        <Container className="h-[90vh] p-[2vh] bg-gray-300 border border-black mx-[5vw] my-[5vh]">
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
                      className="w-[15vw] rounded-none border border-black py-1 px-2 bg-[rgba(0,0,0,0.3)"
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
                    <select onChange={(e) => setMop(e.target.value)} ref={mopRef} title="mop" className="border border-solid border-black py-1 px-2">
                      {/* {itemList.map((item, index) => (
                        <option key={index} value={item.product}>
                          {item.product}
                        </option>
                      ))} */}
                      <option>---</option>
                      <option value='Cash'> Cash</option>
                      <option value='Credit Card'> Credit Card</option>
                      <option value='Gcash'> Gcash</option>
                      <option value='ATM'> ATM</option>
                    </select>
                    { mop == "Cash"  && 
                      <>
                        <Label className="text-lg">Enter Cash</Label>
                        <input
                          defaultValue={1}
                          ref={cashRef}
                          onChange={(e) => setCash(parseInt(e.target.value))}
                          className="w-[15vw] rounded-none border border-black py-1 px-2"
                          type="number"
                          placeholder="quantity"
                        />
                      </>
                    }
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
                          <span className="space-x-">Price:   </span><p>{foundProduct?.product_price}</p>
                        </div>
                        <div className="flex justify-between">
                          <span>Quantity:   </span><p>{displayQuantity}</p>
                        </div><br/>
                        <div className="flex justify-between">
                          <strong>Total:   </strong><p>{displayQuantity * foundProduct.product_price}</p>
                        </div>
                      </pre>
                    </Container>}
                  </Col>
                  <div className="flex flex-col h-[45vh] w-full border border-black border-solid">
                    <Table>
                      <TableHeader className="sticky top-0 z-10 bg-slate-300 border border-black border-solid">
                        <TableRow className="border-black">
                          {/* <TableHead className="w-[13vw] text-left text-lg">Product #</TableHead>
                          <TableHead className="w-[13vw] text-left text-lg">Product Name</TableHead>
                          <TableHead className="text-lg">Price</TableHead>
                          <TableHead className="text-lg">Quantity</TableHead>
                          <TableHead className="text-right text-lg">Amount</TableHead>
                          <TableHead className="text-right text-lg"></TableHead> */}
                          <TableHead className="w-[13vw] text-left text-lg">Product #</TableHead>
                          <TableHead ref={productsortRef} className="w-[13vw] text-left text-lg" onClick={() => sortData('product_name')}>Product</TableHead>
                          <TableHead ref={pricesortRef} className="text-lg" onClick={() => sortData('price')}>Price</TableHead>
                          <TableHead ref={quantitysortRef} className="text-lg" onClick={() => sortData('quantity')}>Quantity</TableHead>
                          <TableHead ref={amountsortRef} className="text-right text-lg" onClick={() => sortData('amount')}>Amount</TableHead>
                          <TableHead className="text-center text-lg">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody className="overflow-y-auto">
                        {sortedProductCart.map((product, index) => (
                          <TableRow
                            key={index}
                            className={`bg-muted/50 border-black ${
                              index === selectedIndex ? "bg-blue-100" : ""
                            }`}
                          >
                            <TableCell className="text-lg font-medium text-left">
                              {index + 1}
                            </TableCell>
                            <TableCell className="text-lg font-medium text-left">
                              {product.product_name}
                            </TableCell>
                            <TableCell className="text-lg">{product.price}</TableCell>
                            <TableCell className="text-lg">{product.quantity}</TableCell>
                            <TableCell className="text-lg text-right">
                              {product.amount}
                            </TableCell>
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
                                  <DropdownMenuItem onClick={() => {updateQtyRef.current?.click()}}>
                                    Edit qty
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>???</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>  
                    <hr className="bg-black" />
                    <div className=" flex fixed bottom-14 justify-evenly">
                      <div className="border border-black border-solid mx-[2-vw]">
                        <pre className="">
                          <h2 className="text-base font-semibold mx-[1vw] my-[1vh]">Manual</h2>
                          <hr className="my-[1vh] mx-[1vw] border border-black border-solid"/>
                          <div className="flex">
                            <div className="flex flex-col px-[1.25vw] py-[1vh]">
                              <span className="text-sm">Press Key &quot;n&quot; to input item id</span>
                              <span className="text-sm">Press Key &quot;t&quot; to add an item</span>
                              <span className="text-sm">Press Key &quot;m&quot; to select payment method</span>
                              <span className="text-sm">Press Key &quot;q&quot; to proceed to payment</span>
                              <span className="text-sm">Press Key &quot;*&quot; to view all product details</span>
                              <span className="text-sm">Press Key &quot;Escape&quot; to logout</span>
                            </div>
                            
                            <div className="flex flex-col px-[1.25vw] py-[1vh]">
                              <span className="text-sm">Press Key &quot;del&quot; to delete highlighted item</span>
                              <span className="text-sm">Press Key &quot;!&quot; to sort items by product name</span>
                              <span className="text-sm">Press Key &quot;@&quot; to sort items by price</span>
                              <span className="text-sm">Press Key &quot;#&quot; to sort items by quantity</span>
                              <span className="text-sm">Press Key &quot;$&quot; to sort items by amount</span>
                              <span className="text-sm">Press Key &quot;&quot; </span>
                            </div>
                          </div>
                        </pre>
                      </div>
                      <div className="w-[1.5vw]"><pre></pre></div>
                      { total != 0 && 
                        <div className="border border-black border-solid px-[1vw] py-[1vh]">
                          <pre className="">
                            <div className="flex flex-col ">
                              <p className="text-lg">Product Subtotal:   {(subTotal).toFixed(2)}</p>
                              <p className="text-lg">VAT:                {(subTotal * (12/100)).toFixed(2)}</p>
                              <p className="text-lg">Total Quantity:     {productCart.reduce((acc, product) => acc + product.quantity, 0)}</p>
                              <div className="my-[1.5vh]">
                                <hr className="bg-black border border-black"/>
                              </div><br/>
                              <p className="text-xl">Total:            {(total).toFixed(2)}</p>
                            </div>
                          </pre>
                        </div>
                      }
                    </div>
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
        <AlertDialogTrigger ref={productListRef} className="hidden" />
        <AlertDialogContent
          ref={alertContentRef}
          className="w-[600px] max-w-[90vw] max-h-[70vh] overflow-hidden"
        >
          <AlertDialogHeader>
            <AlertDialogTitle>Product List</AlertDialogTitle>
            <AlertDialogDescription className="max-h-[50vh]">
              <div className="max-h-[55vh] overflow-y-auto w-full">
                <Table ref={productTableRef} className="border border-solid border-black p-[3vw]">
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
                        <TableCell className="text-left break-words">{product.product_name}</TableCell>
                        <TableCell className="text-left">{product.product_price}</TableCell>
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
          <AlertDialogFooter className="h-[4vh]">
            {/* <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction> */}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger ref={calculateRef} className="hidden">
        Open
      </AlertDialogTrigger>
      <AlertDialogContent className="border border-black border-solid px-[3vh] py-[2vh] max-w-[90vw] min-w-[350px] w-auto">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex flex-col justify-center items-center text-center">
            <Image src={'/assets/images/ororama.png'} height={40} width={120} alt="ororama" />
          </AlertDialogTitle>
          <AlertDialogDescription className="-mt-2">
            <pre>
              <p className="text-center">Ororama Supercenter Carmen</p>
              <div className="text-center text-sm">
                Ipil St, Cagayan de Oro, 9000 <br />
                Misamis Oriental, 0926 064 0777
              </div>
            </pre>
            <p className="text-center text-lg font-semibold">Receipt</p>
            <br />
            <pre className="text-lg">
              <div className="flex flex-col">
                <p className="text-base">Date:                 {date}</p>
                <p className="text-base">Time:                 {time}</p>
                <p className="text-base">Cashier:              {session}</p>
                <div className="my-[1.5vh]">
                  <hr className="bg-black border border-black" />
                </div>
                <div className="flex flex-col">
                  {productCart.map((product, index) => (
                    <div key={index} className="flex items-center">
                      <Container className="w-[55%]">
                        <p className="text-base">{product.product_name}</p>
                      </Container>
                      <div className="ml-4">
                        <p className="text-base">{product.amount}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="my-[1.5vh]">
                  <hr className="bg-black border border-black" />
                </div>
                <p className="text-base">Product Subtotal:     {(subTotal).toFixed(2)}</p>
                <p className="text-base">VAT:                  {(subTotal * (12/100)).toFixed(2)}</p>
                <p className="text-base">Total Quantity:       {productCart.reduce((acc, product) => acc + product.quantity, 0)}</p>
                <p className="text-base">Payment Method:       {mop}</p>
                <div className="my-base.5vh]">
                  <hr className="bg-black border border-black" />
                </div><br />
                <p className="text-xl">Total:             {(total).toFixed(2)}</p>
                {mop === "Cash" && (
                  <>
                    <div className="my-[1.5vh]">
                      <hr className="bg-black border border-black" />
                    </div>
                    <span>Change:              {(cash - total).toFixed(2)}</span>
                  </>
                )}
              </div>
            </pre>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction className="hidden">Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

      <AlertDialog>
        <AlertDialogTrigger ref={updateQtyRef} className="hidden">Open</AlertDialogTrigger>
        <AlertDialogContent className="w-[18vw]">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              <div>
                <Label htmlFor="username text-lg mb-1">Enter new Quantity</Label>
                <Input className="outline" onChange={(e) => {SetNewQuantity(parseInt(e.target.value))}} id="username" type="number" required />
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => {updateItemQty(selectedIndex, newQuantity)}}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>


    </>
  );
}