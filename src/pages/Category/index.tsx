import { useEffect } from "react";
import { CategoryForm } from "./CategoryForm";
import { CategoryTree } from "./CategoryTree";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleGetCategories } from "./actions";

function Category () {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categoryState = useSelector((state:any) => state.category)

  const {
    categories
  } = categoryState;

  useEffect(() => {
    handleGetCategories(dispatch);
  }, [])


  return (
    <section className="flex">
      <div className="w-80">
        <CategoryTree categories={categories} navigate={navigate} />
      </div>
      <div className="flex-1 p-2">
        <CategoryForm categories={categories} dispatch={dispatch} navigate={navigate}/>
      </div>
    </section>
  )
}

export default Category;