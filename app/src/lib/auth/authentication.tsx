'use server'

import { TAuthModel } from "@/models/auth";

const baseUrl = process.env.baseUrl;

export const login = async (username: string, password: string) => {
    const response = await fetch(`${baseUrl}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            password,
        }),
    })

    if (response.status === 401) return undefined

    return await response.json() as TAuthModel;
}