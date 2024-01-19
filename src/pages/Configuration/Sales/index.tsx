import { useEffect, useState } from "react";
import ConfigNavigator from "../../../components/navigations/ConfigNavigator";
import { FormProvider, useForm } from "react-hook-form";
import SettingsPageTitle from "../../../components/typographies/SettingsPageTitle";
import { FlexForm } from "../../../components/forms";
import { getCurrentGroup, getDefaultValues } from "../helpers";
import { GroupProps } from "../../../types/Settings/GroupProps";
import { fetchSettings } from "../actions";


const Sales = (props: GroupProps) => {

    const { 
        children, 
        dispatch, 
        onSubmit, 
        section, 
        settingState 
    } = props;

    const { data } = settingState;

    const [group, setGroup] = useState(getCurrentGroup(children));
    
    const defaultValues = {
        ...getDefaultValues(data),
        section: `${section}/${group.code}`
    };
    
    const formMethods = useForm({
        defaultValues: defaultValues
    });

    const {
        handleSubmit,
        reset
    } = formMethods;

    useEffect(() => {
        reset(defaultValues);
    }, [data])

    useEffect(() => {
        reset(defaultValues);
        dispatch(fetchSettings({
            section,
            group: group.code
        }));
    }, [group])

    return (
        <FormProvider {...formMethods}>
            <FlexForm onSubmit={handleSubmit(onSubmit)}>
                <SettingsPageTitle
                    titles={[
                        'Sales',
                        group.label
                    ]}
                    section={section}
                    group={group.code}
                />

                <div className="flex flex-1 py-4 px-4">
                    <ConfigNavigator items={children} setGroup={setGroup} />
                    
                    {
                        children.map((item: any, index: number) => (
                            group.code === item.code ? 
                                <item.element 
                                    key={index} 
                                    data={data}
                                /> : null
                        ))
                    }
                </div>
            </FlexForm>
        </FormProvider>
    )
}

export default Sales;