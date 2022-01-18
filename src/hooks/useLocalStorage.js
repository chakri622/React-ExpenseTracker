
import {useState, useEffect } from 'react';
export default function useLocalStorage(key,defaultValue){
    const [value, setvalue] = useState(()=>{
        const jsonvalue=localStorage.getItem(key);
        if(jsonvalue!=null) return JSON.parse(jsonvalue);
        if(typeof defaultValue === "function"){
            return defaultValue();
        }
        return defaultValue;
    })
    useEffect(() => {
        localStorage.setItem(key,JSON.stringify(value));
      
    }, [key,value])
    return [value,setvalue];
}