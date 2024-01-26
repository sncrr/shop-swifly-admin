
export const getCurrentGroup = (groups: any[]) => {

    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    const groupValue = url.searchParams.get('group');

    if (groupValue) {
        return groups.find((item) => item.code == groupValue)
    } else {
        return groups[0];
    }
}


export const mapSettingsFromForm = (values: any) => {
    let data = [];

    for (let key in values) {
        if (values.hasOwnProperty(key) && key !== 'section') {
            data.push({
                section: values.section,
                code: `${values.section}/${key}`,
                field: key,
                value: values[key]
            });
        }
    }
    
    return data;
}

export const getDefaultValues = (data: any[]) => {
    let defaultValues: any = {};

    for(let item of data) {
        defaultValues[item.field] = item.value;
    }

    return defaultValues;
}