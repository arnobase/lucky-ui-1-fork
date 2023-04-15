export const getFromStorage = (key,json=false) => {
    let v = localStorage.getItem(key)
    if (v==="undefined") v=undefined
    return (json && v) ? JSON.parse(v) : v
}
export const setToStorage = (key,value,json=false) => {
    const v = json ? JSON.stringify(value) : value; 
    localStorage.setItem(key,v)
}