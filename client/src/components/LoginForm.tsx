import { useState } from "react";
import { LoginUser} from '../../../types/user';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import { DisplayErrorMessage } from "@/utils/helperFunctions";
import Button from "./Button";
import useUserContext from "@hooks/useUserContext";

const LoginForm = () => {
    const userContext = useUserContext();
    const navigate = useNavigate();

    const { user, loginUser, error } = userContext;
  
    useEffect(() => {
        if(user) 
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
    const [formFieldValue, setFormFieldValue] = useState<string>('');

    const handleSubmit = async (e:  React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        loginUser(formData);
    }

    const handleIDChange = (e:  React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setFormFieldValue(value);
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
            {error && <DisplayErrorMessage error={error} />}
            <form onSubmit={handleSubmit} className="flex flex-col items-start">
                <Input inputName="identificator" inputType="text" labelText="Email/Username" handleChange={handleIDChange} value={formFieldValue} />
                <Input inputName="password" inputType="password" labelText="Password" handleChange={handlePassChange} value={formData.password} />
                <Input inputName="rememberMe" inputType="checkbox" labelText="Remember me" handleChange={handleRememberMe} />
                <Button type="submit" style="normal">Login</Button>
            </form>
        </>
    )
}

export default LoginForm;