'use server'

import { cookies } from "next/headers"

export const setCookie = (name: string, value: string, options: any) => {
    cookies().set(name, btoa(value), { path: options.path, secure: options.secure, expires: options.expires || new Date(Date.now() + (1000 * 60 * 60 * 24)) })
}

export const getCookie = (name: string) => atob(cookies().get(name)?.value || '')

export const removeCookie = (name: string) => cookies().delete(name)