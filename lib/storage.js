export const getFromStorage = (key,json=false) => {
    const v = localStorage.getItem(key)
    return (json && v !== undefined) ? JSON.parse(v) : v
}
export const setToStorage = (key,value,json=false) => {
    const v = json ? JSON.stringify(value) : value; 
    localStorage.setItem(key,v)
}