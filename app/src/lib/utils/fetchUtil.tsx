import { getCookie } from "./cookiesManage"

const buildHeader = async() => {
    return new Headers({
        // 'Content-Type': 'application/json',
        'Authorization': `Bearer ${await getCookie('jwt-token')}`
    })
}

export { buildHeader }