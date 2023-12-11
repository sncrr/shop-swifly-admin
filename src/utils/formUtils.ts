
export function getFormData(target: any) {

    const form = new FormData(target);

    const formData: any = {};

    form.forEach(function (value: any, key: any) {
        formData[key] = value == "None" ? null : value;
    });

    return formData;
}