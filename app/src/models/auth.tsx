export interface TAuthModel {
    accessToken: string
    expirationTime: number
    tokenType: string
}

export interface TJWTAuthoritiesModel {
    authority: string
}