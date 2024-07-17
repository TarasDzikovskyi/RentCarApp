export function getTokenFromLocalStorage(): string {
    const data = localStorage.getItem('access_token');
    // console.log(data);
    return data ? JSON.parse(data) : ''
}

export function setTokenToLocalStorage(key: string, token: string): void {
    localStorage.setItem(key, JSON.stringify(token))
}

export function removeFromLocalStorage(key: string): void {
    localStorage.removeItem(key)
}

export function getCarFromLocalStorage(): string {
    const data = localStorage.getItem('car');
    return data ? JSON.parse(data) : ''
}

export function setCarToLocalStorage(key: string, car: object): void {
    localStorage.setItem(key, JSON.stringify(car))
}