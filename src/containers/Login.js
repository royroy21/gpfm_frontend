import { connect } from 'react-redux'
import { postToken } from '../store/actions/token'
import Login from '../components/User/Login'

const mapStateToProps = (state) => {
  return {
    store: {
      token: state.token
    }
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      postToken: (data) => {
        dispatch(postToken(data))
      }
    }
  }
};

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

export default LoginContainer
