import { connect } from "react-redux";

import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { StoreList } from "./StoreList";
import { StoreForm } from "./StoreForm";
import { Paths } from "../../constants";

function Main ({state}:any) {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path={`/${Paths.BASE}`} element={<StoreList stores={state.stores} />} />
      <Route path={`/${Paths.ADD}`} element={<StoreForm />} />
      <Route path={`/${Paths.EDIT}`} element={<StoreForm />} />
    </Routes>
  )
}

const mapStateToProps = (state: any) => ({
  state: state.store
});

const Store = connect(mapStateToProps)(Main);

export default Store;