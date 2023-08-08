import { useDispatch } from "react-redux";
import { onLogout } from "../../utils/authUtils";

function Dashboard () {

  const dispatch = useDispatch();

  const handleLogout = () => {
    onLogout(dispatch)
  }
  return (
    <div className="flex justify-center w-full h-full overflow-auto p-2">
      <div className="mx-auto bg-white rounded-sm p-8 self-center">
        <h6>Dashboard </h6>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}

export default Dashboard;