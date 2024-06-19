'use server'

import { RedirectType, redirect } from "next/navigation"

export const redirectClient = async (url?: string, props?: any) => {
    redirect(url || '/', props)
}