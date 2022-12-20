import {Navigate} from "react-router-dom";

const AuthProvider = ({element}) => {
  const isAuth = true;

  if (!isAuth) {
    return (
      <Navigate to={{pathname: '/auth'}} />
    );
  } else {
    return (element);
  }
};

export default AuthProvider;
