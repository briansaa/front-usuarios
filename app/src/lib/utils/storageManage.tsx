'use client'

export const storageValueString = (key: string, value: string) => {
    window.localStorage.setItem(key, value)
}

export const storageValueObject = (key: string, value: object) => {
    window.localStorage.setItem(key, btoa(JSON.stringify(value)))
}

export const getStorageValueString = (key: string) => {
    return window.localStorage.getItem(key)
}

export const getStorageValueObject = (key: string) => {
    return JSON.parse(atob(window.localStorage.getItem(key) || '{}'))
}