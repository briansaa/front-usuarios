export interface TEducationalAndFacilityModel {
    identifier: string
    description: string
    recreationalHours: TEducationalAndRecreationalHourModel[]
    reservations: TReservationModel[]
}

export interface TEducationalAndRecreationalHourModel {
    identifier: string
    startTime: string
    endTime: string
}

export interface TReservationModel {
    identifier: string
    member: string
    memberDescription: string
    reservationDate: string
    startTime: string
    endTime: string
}