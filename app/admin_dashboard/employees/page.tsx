"use client"
import React from 'react'
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
import { Label } from "@/components/ui/label";
import axios from 'axios';
import { AddEmployeeDetails, EmployeeDetails } from '@/lib/utils'
import { useRouter } from 'next/navigation'

export default function EmployeeList() {

  // console.log(true)

  const session = sessionStorage.getItem('user_role');
  const [ employeeList, setEmployeeList ] = useState<EmployeeDetails[]>([]);

  const router = useRouter();
  useEffect(()=> {
    if (!session) {
      router.push('/')
    }
    if (session == null || session != '3') { // Adjust the key to your specific session key
      // clearSessionAndRedirect();
      if (session == '1') {
        router.push('/dashboard')
      }
    }
  })
  useEffect(() => {
    const getEmployee = async () => {
      const response = await axios.get<EmployeeDetails>(`${process.env.NEXT_PUBLIC_URL}/php/employee.php`, {
        params: {operation: "getEmployee"}
      })

      console.log(response.data)
      const List:  EmployeeDetails[]= Array.isArray(response.data) ? response.data.map((employee: EmployeeDetails) => ({
        user_id: employee.user_id,
        user_role: employee.user_role,
        fullname: employee.fullname,
        date_added: employee.date_added
      })) : []  ;

      setEmployeeList(List)
    }
    getEmployee();
  }, [])

  const [ employeeUsername, setEmployeeUsername ] = useState('');
  const [ employeePassword, setEmployeePassword ] = useState('');
  const [ employeeFullname, seEmployeeFullname ] = useState('');
  const [ employeeType, setEmployeeType ] = useState(1);
  const [ newEmployeeType, setNewEmployeeType ] = useState(1);


  const employeeEditRef = useRef<HTMLButtonElement>(null);
  const addEMployeeRef = useRef<HTMLButtonElement>(null);

  const addEmployee = async () => {
    const url = `${process.env.NEXT_PUBLIC_URL}/php/employee.php`;
    const employeeDetails: AddEmployeeDetails = {
      user_role: employeeType,
      username: employeeUsername,
      password: employeePassword,
      fullname: employeeFullname,
    }
    console.log(employeeDetails)

    const formData = new FormData();
    formData.append('operation', 'addEmployee');
    formData.append('json', JSON.stringify(employeeDetails));

    const response = await axios({
      url: url,
      method: "POST",
      data: formData
    })

    console.log(response.data);
  }

  return (
    <>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 flex-col md:p-8">
        <Tabs defaultValue="all">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="draft">Inactive</TabsTrigger>
              <TabsTrigger value="archived" className="hidden sm:flex">
                Discontinued
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
                    Cashier
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Employee</DropdownMenuCheckboxItem>
                  {/* <DropdownMenuCheckboxItem>
                    Discontinued
                  </DropdownMenuCheckboxItem> */}
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
                <span
                  onClick={() => addEMployeeRef.current?.click()} 
                  className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add Employee
                </span>
              </Button>
            </div>
          </div>
          <TabsContent value="all">
            <Card x-chunk="dashboard-06-chunk-0">
              <CardHeader>
                <CardTitle>Employees</CardTitle>
                <CardDescription>
                  Manage your products and view their sales performance.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="hidden w-[100px] sm:table-cell">
                        {/* <span className="sr-only">Employee ID:</span> */}
                        Employee ID:
                      </TableHead>
                      <TableHead>Employee Name</TableHead>
                      <TableHead>Employee Type</TableHead>
                      
                      <TableHead className="hidden md:table-cell">
                        Created at
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Actions
                      </TableHead>
                      <TableHead>
                        <span className="sr-only">Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {employeeList.map((employee, index) => (
                      <TableRow key={index}>
                      <TableCell className="hidden sm:table-cell">
                        {employee.user_id}
                      </TableCell>
                      <TableCell className="font-medium">
                        {employee.fullname}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-base px-[1vw] py-[1vh]">{employee.user_role}</Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {employee.date_added}
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
                            <DropdownMenuItem onClick={() => employeeEditRef.current?.click()}

                              >Edit</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
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
        <AlertDialogTrigger ref={addEMployeeRef} className="hidden">
          Open
        </AlertDialogTrigger>
        <AlertDialogContent className="w-[27vw] px-[4vw] py-[5vh]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">Add New Employee</AlertDialogTitle>
            <br />
            <AlertDialogDescription className="flex flex-col">
              {/* <div className="mb-[1vh] flex justify-start items-center space-x-2">
                <Label className="text-lg font-semibold">Product ID: </Label>
                <span className="font-semibold">{selectedProductID}</span>
              </div> */}
              <Label className="pr-[1vw] mb-[1vh]">Employee Username:</Label>
              <Input
                onChange={(e) => setEmployeeUsername(e.target.value)}
                // ref={}
                // value={newName}
                type="text"
                placeholder=""
                className="pl-4 w-full text-black mb-[1vh]"
              />
              {/* <br /> */}
              <Label className="pr-[1vw] mb-[1vh]">Employee Password:</Label>
              <Input
                onChange={(e) => setEmployeePassword(e.target.value)}
                type="password"
                placeholder=""
                className="pl-4 w-full text-black mb-[1vh]"
              />
              <Label className="pr-[1vw] mb-[1vh]">Employee Fullname:</Label>
              <Input
                onChange={(e) => seEmployeeFullname(e.target.value)}
                type="text"
                placeholder=""
                className="pl-4 w-full text-black mb-[1vh]"
              />
              <Label className="pr-[1vw] mb-[1vh]">Employee Type:</Label>
              <select onChange={(e) => setEmployeeType(parseInt(e.target.value))} defaultValue={1} className="flex text-black h-10 w-full rounded-md border border-black bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" title="status">
                <option value="1">Cashier</option>
                <option value="2">Supervisor</option>
              </select>
              <div className="flex mt-[5vh] justify-between">
                <AlertDialogCancel className="w-[45%] border-black">Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => addEmployee()} className="w-[45%]">Add Employee</AlertDialogAction>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog>

  <AlertDialogTrigger ref={employeeEditRef} className="hidden">Open</AlertDialogTrigger>
  <AlertDialogContent className="w-[25vw] px-[2vw] py-[1vw]">
    <AlertDialogHeader>
      <AlertDialogTitle>Edit Employee Details</AlertDialogTitle>
      <AlertDialogDescription>
        <div>
          <Label htmlFor="username text-lg mb-1">Username</Label>
          <Input className='mb-[1vh]'
          // onChange={(e) => {SetNewQuantity(parseInt(e.target.value))}}
          id="username" type="number" title='username' required />
          <Label htmlFor="username text-lg mb-1">Password</Label>
          <Input className='mb-[1vh]'
          // onChange={(e) => {SetNewQuantity(parseInt(e.target.value))}}
          id="username" type="number" title='password' required />
          <Label htmlFor="username text-lg mb-1">Fullname</Label>
          <Input className="mb-[1vh]" 
          // onChange={(e) => {SetNewQuantity(parseInt(e.target.value))}}
          id="username" type="number" title='fullname' required />
          <Label htmlFor="username text-lg mb-[1vh]">User role</Label>
          <select onChange={(e) => setNewEmployeeType(parseInt(e.target.value))} defaultValue={1} className="flex text-black h-10 w-full rounded-md border border-black bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" title="status">
            <option value="1">Cashier</option>
            <option value="2">Supervisor</option>
          </select><>{newEmployeeType}</>
        </div>
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction 
      // onClick={() => {updateItemQty(selectedIndex, newQuantity)}}
      >Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
    </>
  )
}

;