import { ModalContainer } from "./components/modals";
import { ToastContainer } from "./components/toasts";
import { MainRoutes } from "./routes";



function App() {


  return (
    <>
      <ModalContainer />
      <ToastContainer />
      <MainRoutes />
    </>
  );
}

export default App
