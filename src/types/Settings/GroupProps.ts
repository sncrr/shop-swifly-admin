import { AnyAction, Dispatch } from "@reduxjs/toolkit"

export interface GroupProps {
    children: any[],
    section: string,
    dispatch: Dispatch<AnyAction>
    settingState: any,
    onSubmit: any 
}