import { connect } from "react-redux";

function Main ({state}:any) {

  return (
    <div></div>
  )
}

const mapStateToProps = (state: any) => ({
  state: state.store
});

const Store = connect(mapStateToProps)(Main);

export default Store;