import { Trash } from "../../../assets/svgs"
import { showConfirmDialog } from "../../../components/alerts/actions"
import { GhostBtn } from "../../../components/buttons"
import { H1 } from "../../../components/typographies"
import { Category } from "../../../types/Inventory/Category"
import { deleteCategory } from "../actions"
import * as ToastActions from '../../../components/toasts/actions'
import { Paths } from "../../../constants"

interface Props {
  dispatch: any,
  navigate: any,
  selected: Category,
}

export function CategoryHeader ({
  dispatch,
  selected,
} : Props) {

  const handleDelete = async () => {
    showConfirmDialog({
      title: "Delete Category?",
      content: "This action cannot be undone.",
      onConfirm: async () => {

        dispatch(deleteCategory(selected._id));
          // let result = await deleteCategory(dispatch, selected._id);
          // if(result) {
          //   ToastActions.showSuccessMessage(dispatch, "Category deleted successfully");
          //   navigate(Paths.CATEGORY)
          // }
      }
  })
  }

  return (
    <div className="flex mx-2 mt-4 mb-8">
      <H1 className="flex-1">
        {
          selected && selected._id  ? selected.name : "CREATE NEW"
        }
      </H1>
      {
        selected && selected._id && (
          <GhostBtn 
            className="text-red-600"
            onClick={handleDelete}
          >
            <Trash />
            <span>DELETE</span>
          </GhostBtn>
        )
      }
    </div>
  )
}