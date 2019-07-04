import React from 'react';

import TextField from "@material-ui/core/TextField";

class Login extends React.Component {

  render (){
    return (
      <form>
        <TextField
          id="username"
          label="Username"
          // value={values.name}
          // onChange={handleChange('name')}
          margin="normal"
        /><br />
        <TextField
          id="password"
          label="Password"
          // value={values.name}
          // onChange={handleChange('name')}
          margin="normal"
        />
      </form>
    )
  }
}

export default Login
