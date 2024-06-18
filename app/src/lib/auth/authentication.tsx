'use server'

import { TAuthModel } from "@/models/auth";

const baseUrl = process.env.baseUrl;

export const login = async (username: string, password: string) => {
    const response = await fetch(`${baseUrl}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        cache: 'no-cache',
        body: JSON.stringify({
            username,
            password,
        }),
    })

    if (response.status === 401) throw new Error("Usuario o contraseña incorrectos")

    return await response.json() as TAuthModel;
}