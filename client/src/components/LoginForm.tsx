import { useState } from "react";
import { LoginUser} from '../../../types/user';
import { UserContext } from "@context/UserContext";
import useCallContext from "@hooks/useCallContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import { DisplayErrorMessage } from "@/utils/helperFunctions";

const LoginForm = () => {
    const userContext = useCallContext(UserContext);
    const navigate = useNavigate();
  
    useEffect(() => {
        if(userContext && userContext.user) 
        {
            navigate('/');
            return;
        }
    },[navigate, userContext]);

    const [formData, setFormData] = useState<LoginUser>({
        username: "",
        email: "",
        password: "",
        rememberMe: false,
      });

    const handleSubmit = async (e:  React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(userContext) userContext.loginUser(formData);
    }

    const handleIDChange = (e:  React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if(value.includes('@')) setFormData({...formData, email: value, username: ""});
        else setFormData({...formData, username: value, email: ""});
    }
    
    const handlePassChange = (e:  React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setFormData({...formData, password: value});
    }

    const handleRememberMe = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.target;
        setFormData({...formData, rememberMe: checked});
    }
    
    return (
        <>
            {userContext && <DisplayErrorMessage error={userContext.error} />}
            <form onSubmit={handleSubmit} className="flex flex-col items-start">
                <Input inputName="identificator" inputType="text" labelText="Email/Username" handleChange={handleIDChange} />
                <Input inputName="password" inputType="password" labelText="Password" handleChange={handlePassChange} />
                <Input inputName="rememberMe" inputType="checkbox" labelText="Remember me" handleChange={handleRememberMe} />
                <button type="submit">Login</button>
            </form>
        </>
    )
}

export default LoginForm;