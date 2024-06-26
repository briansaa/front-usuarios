import { ChangeEventHandler } from "react"

interface SelectValue {
    id: string
    key: string
    description: string
}

const SelectInput = ({ nameLabel, id, values, isLoading, handleEvent }:
    { nameLabel: string, id: string, values: SelectValue[], isLoading: boolean, handleEvent: ChangeEventHandler<HTMLSelectElement> }) => {
    return (
        <div className="flex items-center w-full">
            <label htmlFor={id} className="w-1/3 pe-5 font-semibold">{nameLabel}</label>
            <select id={id} onChange={handleEvent}
                className={`cursor-default rounded-md w-full border border-black text-gray-700 py-2
                px-4 pr-8 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${isLoading ? 'opacity-80 cursor-progress' : ''}`}
                disabled={isLoading} required>
                <option value="" >Seleccionar</option>
                {!isLoading && values.map((value) => <option key={value.id} value={value.key}>{value.description}</option>)}
            </select>
            {/* <button type="button" className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1
            ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label">
                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                    <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clip-rule="evenodd" />
                    </svg>
                </span>
            </button> */}
        </div>
    )
}

export { SelectInput }
