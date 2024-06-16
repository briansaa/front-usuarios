'use server'

import { redirect } from "next/navigation"

export const redirectClient = async (url?: string, props?: any) => {
    redirect(url || '/', props)
}