import { ModalContainer } from "./components/modals";
import { ToastContainer } from "./components/toasts";
import { MainRoute } from "./routes";



function App() {


  return (
    <>
      <ModalContainer />
      <ToastContainer />
      <MainRoute />
    </>
  );
}

export default App
