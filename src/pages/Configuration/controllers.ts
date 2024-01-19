import { request } from "../../controllers/request";


export async function getSettingsByGroup(payload: any): Promise<any> {
    try {
        const response = await request.post(`/settings/section`, payload);
        return response.data;
    }
    catch (error) {
        throw error;
    }
}

export async function saveSettings(payload: any): Promise<any> {
    try {
        const response = await request.post(`/settings`, payload);
        return response.data;
    }
    catch (error) {
        throw error;
    }
}

// { 
//     section: 'general/web', 
//     frontEndUrl: '1', 
//     mediaUrl: '2' 
// }

// [
//     { 
//         section: 'general/web', 
//         code: 'frontEndUrl', 
//         value: '1' 
//     },
//     { 
//         section: 'general/web', 
//         code: 'mediaUrl', 
//         value: '2'
//     }
// ]