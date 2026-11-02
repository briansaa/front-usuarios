'use server'

import { TEducationalAndFacilityModel, TReservationModel } from "@/models/facility"
import { buildHeader } from "@/lib/utils/fetchUtil"
import { ApiResponse } from "@/models/api"
import { removeCookie } from "../utils/cookiesManage"

const fetchEducationalAndFacilityByTypeIdentifier = async (identifier: string) => {
    const response = await fetch(`${process.env.baseUrl}/educational/recreational/facilities/type/${identifier}`, {
        headers: await buildHeader(),
        method: 'GET',
        cache: 'no-cache'

    })
    return await response.json() as ApiResponse<TEducationalAndFacilityModel[]>
}


const fetchEducationalAndFacilityByIdentifier = async (identifier: string) => {
    const response = await fetch(`${process.env.baseUrl}/educational/recreational/facilities/${identifier}`, {
        headers: await buildHeader(),
        method: 'GET',
        cache: 'no-cache'

    })
    return await response.json() as ApiResponse<TEducationalAndFacilityModel>
}

const saveReservation = async (reservation: TReservationModel) => {
    const response = await fetch(`${process.env.baseUrl}/reservation`, {
        headers: await buildHeader(),
        method: 'POST',
        cache: 'no-cache',
        body: JSON.stringify(reservation)
    })

    if (response.status === 401) {
        removeCookie('jwt-token')
        return { status: 401, message: 'Tu sesión expiró. Vuelve a iniciar sesión.' } as ApiResponse<TReservationModel>
    }

    // La API responde 400 con un mensaje (p. ej. horario ya reservado); se devuelve para mostrarlo.
    return await response.json() as ApiResponse<TReservationModel>
}

export { fetchEducationalAndFacilityByTypeIdentifier, fetchEducationalAndFacilityByIdentifier, saveReservation }