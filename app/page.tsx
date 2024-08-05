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
import { useEffect, useState, useRef } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { Passero_One } from "next/font/google"

interface User {
  username: string,
  password: string,
  userrole: string,
  fullname: string,
}

export default function Home() {

  const usernameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    usernameRef.current?.focus();
  }, [])

  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log(username, password)
    // console.log(`${process.env.NEXT_URL}/php/login.php`)
    try {
      // const response = await axios<User>(
      //   'http://localhost/git/pos_withDb/php/login.php',
      //   {
      //       username: username,
      //       password: password
      //   }
      //   const response = await axios({
      //     url: 'http://localhost/git/pos_withDb/php/login.php',
      //     method: "POST",
      //     data: formData
      //   })
    //   const response = await axios.post('http://localhost/git/pos_withDb/php/login.php', {
    //     username: username,
    //     password: password
    // }, {
    //     headers: {
    //         "Content-Type": "application/json",
    //     }

    const jsonData = {
      header: {username: username , password: password },
      // detail: detailsList
    };

        const formData = new FormData();
    formData.append("operation", "saveInvoice");
    formData.append("json", JSON.stringify(jsonData));
    
    const response = await axios({
      url: 'http://localhost/git/pos_withDb/php/login.php',
      method: "POST",
      data: formData
    });

      const data = await response.data;

      console.log(data)
      if (data) {
        // sessionStorage.setItem('fullname', data.fullname);
        router.push('/dashb');
      } else {
        // Handle login failure
        console.log("Invalid username or password");
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  }

  return (
    <div className="flex h-screen justify-center items-center">
      <Card className="w-full max-w-sm">
        <form onSubmit={signIn}>
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your username below to login to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input ref={usernameRef} onChange={(e) => { setUsername(e.target.value) }} id="username" type="text" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input onChange={(e) => { setPassword(e.target.value) }} id="password" type="password" required />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">Sign in</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
