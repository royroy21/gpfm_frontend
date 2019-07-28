import { connect } from 'react-redux'
import {postRegister} from "../../store/actions/register";

const mapStateToProps = (state) => {
  return {
    store: {
      token: state.token,
      user: state.user,
      register: state.register,
    },
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      postRegister: (data) => {
        dispatch(postRegister(data))
      }
    }
  }
};

const RegisterWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default RegisterWrapper
