import { Outlet } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { mapSettingsFromForm } from "./helpers";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { SettingState, saveSettings } from "./slice";
import { RootState } from "../../root/reducers";

interface Props {
	settingState: SettingState,
}

export interface SettingsContext {
	dispatch: Dispatch<AnyAction>,
    onSubmit: any,
	settingState: SettingState,
}

const Main = (props: Props) => {

    const dispatch = useDispatch();
    
    const onSubmit = (values: any) => {
        
        let settings = mapSettingsFromForm(values);

        dispatch(saveSettings({
            data: settings
        }));
    }
    
    return (
		<Outlet 
            context={{
                dispatch,
                onSubmit,
                settingState: props.settingState
            } satisfies SettingsContext} 
        />
	)
}

const mapStateToProps = (state: RootState) => ({
    settingState: state.settings
});

const Settings = connect(mapStateToProps)(Main);

export default Settings;