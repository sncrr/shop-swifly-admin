import { RouterProvider, createRouter } from "@tanstack/react-router";
import { ModalContainer } from "./components/modals";
import { ToastContainer } from "./components/toasts";
import { routeTree } from "./root/router";

const router = createRouter({ routeTree })

function App() {

  return (
    <>
      <ModalContainer />
      <ToastContainer />
      {/* <Root /> */}
      <RouterProvider router={router} />
    </>
  );
}

export default App
