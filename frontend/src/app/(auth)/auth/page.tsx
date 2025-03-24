"use client"
import api from '@/app/lib/api';
import { ACCESS_TOKEN, authFormSchema, REFRESH_TOKEN } from '@/app/lib/utils';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

export default function page() {
  const router = useRouter()
  const [formType, setFormType] = useState("login")
  const formSchema = authFormSchema(formType)
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    const RefreshToken = async () => {
      const refresh_token = document.cookie
        .split('; ')
        .find(row => row.startsWith(REFRESH_TOKEN))
        ?.split('=')[1];


      if (refresh_token) {
        try {
          const res = await api.post("/api/users/refresh/", { refresh: refresh_token })

          if (res.status === 200) {
            document.cookie = `${ACCESS_TOKEN}=${res.data.access}; path=/; SameSite=Strict`
            router.push("/")
          }
        } catch (error) {

        }
      }
    }

    RefreshToken()
  }, [])


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const { email, password, username } = data

    try {
      let res
      if (formType === "login") {
        res = await api.post("/api/users/login/", {
          email,
          password,
        })
      } else if (formType === "register") {
        res = await api.post("/api/users/register/", {
          email,
          username,
          password,
        })
      }

      if (res?.status === 200 || res?.status === 201) {
        document.cookie = `${ACCESS_TOKEN}=${res.data.access}; path=/; SameSite=Strict`
        document.cookie = `${REFRESH_TOKEN}=${res.data.refresh}; path=/; SameSite=Strict`;
      
        router.push("/")
      }

    } catch (error:any) {
      if (error?.status === 409) {
        setErrorMessage("Account already exist")
        return;
      }
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full h-screen bg-[#171717] flex items-center justify-center font-sans'>
        <div className='w-full max-w-[650px] bg-[#1F1F1F] flex flex-col px-10 py-12 mx-4 border-4 border-[#D8BFD8] rounded-[23px]'>
          <div className='text-center'>
            <p className='text-white font-semibold text-[28px]'>Welcome{formType === "login" ? " back" : ""}!</p>
            <p className='text-gray-400 font-medium text-[17px]'>We're so excited to see you{formType === "login" ? " again" : ""}!</p>
          </div>


          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className='mt-3'>
                <FormLabel className='text-[#D8BFD8] font-bold'>EMAIL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Email"
                    {...field}

                    className='text-gray-200 outline-none border-none bg-[#33333E] rounded-[3px] py-6' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {formType === "register" ? (
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className='mt-5 mb-2'>
                  <FormLabel className='text-[#D8BFD8] font-bold'>USERNAME</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} className='text-gray-200 outline-none border-none bg-[#33333E] rounded-[3px] py-6' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : ""}

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className='mt-5 mb-2'>
                <FormLabel className='text-[#D8BFD8] font-bold'>PASSWORD</FormLabel>
                <FormControl>
                  <Input type='password' placeholder="Password" {...field} className='text-gray-200 outline-none border-none bg-[#33333E] rounded-[3px] py-6' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <p className='text-[#9E689E] font-bold text-[14px] cursor-pointer'>Forgot your password?</p>

          <Button type="submit" className='bg-[#9E689E] hover:bg-[#402640] text-gray-100 rounded-[3px] py-6 text-[17px] mt-7'>{formType === "login" ? "Log In" : "Register"}</Button>

          <div className='flex font-bold text-[14px] mt-2'>
            <p className='text-[#D8BFD8] select-none'>{formType === "login" ? "Need an account?" : "Already have an account?"}&nbsp;</p>
            <p
              onClick={() => {
                formType === "login" ? setFormType("register") : setFormType("login")
              }}
              className='text-[#9E689E] cursor-pointer'>
              {formType === "login" ? "Register " : "Log In!"}
            </p>
          </div>
          <div className='relative mt-1'>
            <p className='absolute text-red-500 font-semibold text-[14px]'>{errorMessage}</p>
          </div>
        </div>

      </form>
    </Form>
  )
}
