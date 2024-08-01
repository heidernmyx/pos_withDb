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
} from "@/components/ui/alert-dialog"
import Clock from "@/components/clock";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Label } from "@/components/ui/label";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';


interface Item {
  product: string,
  quantity: number,
  price: number,
}

export default function Dashboard() {

  const [ session, setSession ] = useState('');
  const [ itemInput, setItemInput ] = useState('');
  const [ quantity, setQuantity ] = useState(0);
  const [ itemList, setItemlist ] = useState([]);

  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(()=> {
    setSession(sessionStorage.fullname);
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === '+') {
        trigger.current?.click();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
      document.body.style.overflow = 'auto';
    };
  }, )

  useEffect(() => {
    
    const fetchItems = async () => {
      try {
        const fetch = await axios.get('http://localhost/git/pos/php/product.php');
      }
      catch (err) {
        console.log(err)
      }

    }
    fetchItems();
  }, [])

  const keyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    // setKey(event.key);
    // const addItem = event.key.
    console.log(true)
    console.log(event.key)
    if (event.key === 'N' || event.key === 'n') {
      trigger.current?.click();
    }
  };
  
  return (
    <>
      <div>
        <Container className="h-[90vh] p-[2vh] border border-black mx-[5vw] my-[5vh]">
          <Col>
            <Container className="d-flex justify-content-between align-items-center px-[3vh] mb-[2vh]">
              <Row className="d-inline-flex">
                <div className="flex justify-between text-start">
                  <Image className="ml-[5vw]" src={'/assets/images/ororama.png'} height={75} width={350} alt="ororama"/>
                  <div className="flex flex-col justify-center items-center text-center space-y-5">
                    <pre>
                      <span className="flex">Time   : <Clock/></span>
                      <span>Cashier: {session}</span>
                    </pre>
                  </div>
                </div>
              </Row>
            </Container>
            <hr className="border-black mb-[2vh]"/>
            <Container>
              <Col>
                <Row className="flex space-x-4">
                  <Col className="flex flex-col">
                    <Label className="text-lg">Item</Label>
                    <input onChange={(e) => setItemInput(e.target.value)} className="w-[15vw] rounded-none outline-none border border-black py-1 px-2" 
                      type="number" 
                      placeholder="item #"/>
                    <Label className="text-lg">Quantity</Label>
                    <input onChange={(e) => setQuantity(e.target.value)} className="w-[15vw] rounded-none outline-none border border-black py-1 px-2" 
                      type="number" 
                      placeholder="item #"
                    />
                    <Label className="text-lg">Item</Label>
                    {/* <input onChange={(e) => setItemInput(e.target.value)} className="w-[15vw] rounded-none outline-none border border-black py-1 px-2" 
                      type="" 
                      placeholder="item #"
                    /> */}
                    <select className="border border-solid border-black py-1 px-2" title="test">
                      <option>data</option>
                      <option>data</option>
                      <option>data</option>
                    </select>
                  </Col>
                  <Table className="border border-solid border-black">
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader>
                      <TableRow className="bg-slate-200 border-black">
                        <TableHead className="w-[100px] text-left text-lg">Product ID</TableHead>
                        <TableHead className="text-lg">Product Name</TableHead>
                        <TableHead className="text-lg">Quantity</TableHead>
                        <TableHead className="text-right text-lg">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium text-left">INV001</TableCell>
                        <TableCell>Paid</TableCell>
                        <TableCell>Credit Card</TableCell>
                        <TableCell className="text-right">$250.00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium text-left">INV001</TableCell>
                        <TableCell>Paid</TableCell>
                        <TableCell>Credit Card</TableCell>
                        <TableCell className="text-right">$250.00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium text-left">INV001</TableCell>
                        <TableCell>Paid</TableCell>
                        <TableCell>Credit Card</TableCell>
                        <TableCell className="text-right">$250.00</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Row>
              </Col>
            </Container>

          </Col>
        </Container>
      </div>
      <AlertDialog>
  <AlertDialogTrigger ref={trigger} onKeyDown={keyDown} className="hidden">Open</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Add Item</AlertDialogTitle>
      <AlertDialogDescription>
        <input className="px-2 py-1 border border-black border-solid outline-none" title="add" type="text" placeholder=""/>
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
    </>
  );
}
