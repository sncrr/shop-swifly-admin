import { connect } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { StoreList } from "./StoreList";
import { StoreForm } from "./StoreForm";
import { Paths } from "../../constants";

function Main ({state}:any) {

  return (
    <Routes>
      <Route path={`/${Paths.BASE}`} element={<StoreList stores={state.stores} />} />
      <Route path={`/${Paths.CREATE}`} element={<StoreForm />} />
      <Route path={`/${Paths.EDIT}`} element={<StoreForm />} />
    </Routes>
  )
}

const mapStateToProps = (state: any) => ({
  state: state.store
});

const Store = connect(mapStateToProps)(Main);

export default Store;