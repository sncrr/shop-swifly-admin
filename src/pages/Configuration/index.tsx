import { Route, Routes } from "react-router-dom";
import { settingsPaths } from "./configs";
import { connect, useDispatch } from "react-redux";
import { saveSetting } from "./actions";
import { mapSettingsFromForm } from "./helpers";

const Main = ({state}: any) => {

    const dispatch = useDispatch();
    
    const onSubmit = (values: any) => {
        
        let settings = mapSettingsFromForm(values);

        dispatch(saveSetting({
            data: settings
        }));
    }

    return (
        <Routes>
            {
                settingsPaths.map((item, index) => {
                    return item.element ? (
                        <Route
                            key={index}
                            path={`/${item.code}`}
                            element={
                                <item.element 
                                    children={item.children} 
                                    section={item.code}
                                    onSubmit={onSubmit}
                                    settingState={state}
                                    dispatch={dispatch}
                                />}
                        />
                    ) : null
                })
            }
        </Routes>
    )
}

const mapStateToProps = (state: any) => ({
    state: state.settings
});

const Settings = connect(mapStateToProps)(Main);

export default Settings;