import { CategoryController } from "../../controllers";
import { Category } from "../../types/Category";
import * as CategoryReducer from './reducer';


export async function handleGetCategories (dispatch:any) {
    let result = await CategoryController.getAllCategories();
    if(result){
        dispatch(CategoryReducer.setCategories(result));
    }
}

export async function handleCreateCategory (dispatch:any, data:Category) {
    
    let result = await CategoryController.createCategory(data);

    await handleGetCategories(dispatch);
    return result;
}

export async function handleUpdateCategory (
    dispatch: any, 
    id: string, 
    data: Category
) {
    if(id == data.parent) {
        //:TODO
        console.log("ERROR")
        return;
    }

    let result = await CategoryController.updateCategory(id, data);

    //:TODO toast

    await handleGetCategories(dispatch);
    return result;
}

export async function deleteCategory (dispatch:any) {
    await handleGetCategories(dispatch);
}