'use server'

import { TEducationalAndFacilityModel } from "@/models/facility"
import { buildHeader } from "@/lib/utils/fetchUtil"
import { ApiResponse } from "@/models/api"

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

export { fetchEducationalAndFacilityByTypeIdentifier, fetchEducationalAndFacilityByIdentifier }