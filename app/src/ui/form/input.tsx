//use client

import { ChangeEvent, ChangeEventHandler, useState } from "react";


const useField = () => {
    const [value, setValue] = useState("");

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value);

    return { value, handleChange }
}


const InputForm = ({ type, id, placeholder, handleEvent }: { type: string, id: string, placeholder: string, handleEvent: ChangeEventHandler<HTMLInputElement> }) => {

    return (
        <input type={type} id={id} placeholder={placeholder} onChange={handleEvent}
            className="outline-none rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300
            placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-400 sm:text-sm sm:leading-6" />
    )
}

export { useField, InputForm }