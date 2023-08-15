import { connect } from "react-redux";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { StoreList } from "./StoreList";
import { StoreForm } from "./StoreForm";

function Main ({state}:any) {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <section>
        <StoreList />
        <StoreForm />
    </section>
  )
}

const mapStateToProps = (state: any) => ({
  state: state.store
});

const Store = connect(mapStateToProps)(Main);

export default Store;