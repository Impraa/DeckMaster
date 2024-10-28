import RegisterForm from "@components/RegisterForm";
import { UserContext } from "@context/UserContext";
import useCallContext from "@hooks/useCallContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {

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
            Register
            <RegisterForm/>
        </div>
    )
}

export default Register;