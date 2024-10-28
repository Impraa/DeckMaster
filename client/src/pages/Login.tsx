import LoginForm from "@components/LoginForm";
import { UserContext } from "@context/UserContext";
import useCallContext from "@hooks/useCallContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const userContext = useCallContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
      if(userContext && userContext.user) 
      {
          navigate('/');
          return;
      }
  },[navigate, userContext]);


  return (
  <div className="flex flex-col items-center">
    <h1>Login</h1>
    <LoginForm/>
  </div>
  );
};

export default Login;
