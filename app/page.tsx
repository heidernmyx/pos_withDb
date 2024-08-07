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

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = `${process.env.NEXT_PUBLIC_URL}/php/login.php`;
    const data = {
      username: username,
      password: password,
    };
    
    const formData = new FormData();
    formData.append('json', JSON.stringify(data))
    try {
      const response = await axios({
        url: url,
        method: "POST",
        data: formData
      });

      console.log(response.data.user_role );
      const { user_id, user_role, fullname } = response.data;
      
      
      if (user_role == 1) {
        sessionStorage.setItem('user_id', user_id);
        sessionStorage.setItem('user_role', user_role);
        sessionStorage.setItem('fullname', fullname);
        
        router.push('/dashboard')

      } 
      else if (user_role == 2){
        
      }
      
      else if (user_role == 3){
        sessionStorage.setItem('user_id', user_id);
        sessionStorage.setItem('user_role', user_role);
        sessionStorage.setItem('fullname', fullname);
        
        router.push('/admin_dashboard')
      }
    } catch (error) {
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <Card className="w-full max-w-sm">
        <form onSubmit={login}>
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
