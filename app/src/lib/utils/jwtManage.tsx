'use server'

import { JWTVerifyResult, base64url, jwtVerify } from 'jose'
import { TJWTAuthoritiesModel } from '@/models/auth'


export const validateToken = async (token: string) => {
    try { return await jwtVerify(token, base64url.decode(process.env.secretKey!)) }
    catch (error) { return undefined }
}

export const hasRole = (token: JWTVerifyResult, role: string) => {
    if (!token) return false

    const authorities = token.payload.authorities as TJWTAuthoritiesModel[]

    return authorities.some((aut: TJWTAuthoritiesModel) => aut.authority === role)
}

export enum Roles {
    ADMIN_ROLE = 'ADMIN_ROLE',
    USER_ROLE = 'USER_ROLE'
}