import { connect } from "react-redux";

interface Props {

}

const Main = (props : Props) => {


  return (
    <div>
      
    </div>
  )
  
}

const mapStateToProps = (state: any) => ({
	state: state.customer
});

const Customer = connect(mapStateToProps)(Main);

export default Customer;