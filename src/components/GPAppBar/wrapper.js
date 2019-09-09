import { connect } from 'react-redux'
import { POST_TOKEN_SUCCESS } from '../../store/actions/token';
import { getIPAPI } from '../../store/actions/ipapi';
import { getUser } from '../../store/actions/user';

const mapStateToProps = (state) => {
  return {
    store: {
      user: state.user,
      token: state.token,
    },
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      updateToken: (data) => {
        dispatch({type: POST_TOKEN_SUCCESS, payload: {data}});
      },
      getUser: () => {
        dispatch(getUser());
      },
      getIPAPI: () => {
        dispatch(getIPAPI());
      },
    }
  }
};


const GPAppBarWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default GPAppBarWrapper
