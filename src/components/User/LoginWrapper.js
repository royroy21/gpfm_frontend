import { connect } from 'react-redux'
import { postToken } from '../../store/actions/token'

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
      }
    }
  }
};

const LoginWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default LoginWrapper
