import { styled } from "styled-components"

const Container = styled.div`
    

`

export function SuccessToast ({message}:any) {

    return (
        <div className="bg-green-400 rounded p-2 w-72 h-12 m-2 text-white select-none">
            <h1 className="font-bold">{message}</h1>
        </div>
    )
}