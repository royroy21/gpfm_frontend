import { connect } from 'react-redux'
import {CLEAR_TOKEN, postToken} from '../../store/actions/token'
import {CLEAR_USER} from "../../store/actions/user";

const mapStateToProps = (state) => {
  return {
    store: {
      token: state.token,
      user: state.user,
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
    }
  }
};

const LoginWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default LoginWrapper
