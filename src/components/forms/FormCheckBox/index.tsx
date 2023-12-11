import { useState } from "react";

interface Props {
    id?: string,
    name?: string,
    defaultValue?: number,
    onChange?: any
}

export function FormCheckBox(props: Props) {

    const [value, setValue] = useState(props.defaultValue ? props.defaultValue : 0);

    return (
        <div>
            <input
                className='w-0 h-0 opacity-0'
                type="number"
                name={props.name}
                value={value}
                onChange={() => { }}
            />
            <input
                id={props.id}
                type="checkbox"
                defaultChecked={props.defaultValue ? true : false}
                onChange={e => {
                    setValue(e.target.checked ? 1 : 0);
                    props.onChange ? props.onChange(e) : {};
                }}
            />
        </div>
    )
}