import { connect } from 'react-redux'
import { CLEAR_TOKEN } from '../../store/actions/token'
import { CLEAR_USER } from '../../store/actions/user'

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
      logout: () => {
        dispatch({type: CLEAR_TOKEN});
        dispatch({type: CLEAR_USER});
      }
    }
  }
};

const SideMenuWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default SideMenuWrapper;
