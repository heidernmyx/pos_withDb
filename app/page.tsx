'use client'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { headers } from "next/headers"
import { useEffect, useState, useRef } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"

interface Cashier {
  username: string,
  password: string,
  fullname: string,
}

export default function Home() {

  const usernameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    usernameRef.current?.click();
  })
  const router = useRouter();

  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const [ cashierList, setCashiers ] = useState<Cashier[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get<Cashier[]>('http://localhost/git/pos/php/cashiers.php');
      const data = response.data;
      const List: Cashier[] = data.map(users => ({
        username: users.username,
        password: users.password,
        fullname: users.fullname
      }))
      setCashiers(List)
    }
    fetch()
  }, [])

  const signIn = () => {
    const search = cashierList.find(user => user.username == username && user.password == password);
    const fullname: string = search!.fullname;
    let isCorrectCredentials: boolean = false;
    search ?  isCorrectCredentials = true : false
    if (isCorrectCredentials) {
      sessionStorage.setItem('fullname', fullname)
      router.push('/dashboard')
    }
  }

  return (
    <div className="flex h-screen justify-center items-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input ref={usernameRef} onChange={(e) => {setUsername(e.target.value)}} id="username" type="text" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input onChange={(e) => {setPassword(e.target.value)}} id="password" type="password" required />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={signIn} className="w-full">Sign in</Button>
        </CardFooter>
      </Card>
      {/* <ul>
        {cashierList.map((users, index) => (
          <li key={index}>
            {users.username}
          </li>
        ))}
      </ul> */}
    </div>
  )
}
