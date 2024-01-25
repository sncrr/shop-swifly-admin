import { connect } from "react-redux";
import { Routes } from "react-router-dom";

interface Props {

}

const Main = (props : Props) => {
  
  console.log(props);

  return (
    <Routes>

    </Routes>
  )
  
}

const mapStateToProps = (state: any) => ({
	state: state.customer
});

const Customer = connect(mapStateToProps)(Main);

export default Customer;