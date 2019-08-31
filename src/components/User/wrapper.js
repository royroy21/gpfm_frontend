import { connect } from 'react-redux'
import {CLEAR_TOKEN, postToken} from '../../store/actions/token'
import {CLEAR_USER, patchUser} from "../../store/actions/user";
import {CLEAR_REGISTER, postRegister} from "../../store/actions/register";

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
      postToken: (data) => {
        dispatch(postToken(data))
      },
      clearToken: () => {
        dispatch({type: CLEAR_TOKEN});
      },
      clearUser: () => {
        dispatch({type: CLEAR_USER});
      },
      postRegister: (data) => {
        dispatch(postRegister(data))
      },
      clearRegister: () => {
        dispatch({type: CLEAR_REGISTER});
      },
      patchUser: (data) => {
        dispatch(patchUser(data));
      },
    }
  }
};

const UserWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default UserWrapper
