import { useState } from "react";
import { LoginUser} from '../../../types/user';
import { loginUserAsync } from "@services/User";
import { Navigate } from "react-router-dom";

const LoginForm = () => {
    const [formData, setFormData] = useState<LoginUser>({
        username: "",
        email: "",
        password: "",
        rememberMe: false,
      });

    const handleSubmit = async (e:  React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await loginUserAsync(formData);
        console.log(response);
        if(!response.error)
        { 
            <Navigate to={'/'} />;
            return ;
        }
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
            <form onSubmit={handleSubmit} className="flex flex-col w-[50%]">
                <input type="text" placeholder="E-mail/Username" name="identificator" onChange={handleIDChange}/>
                <input type="text" placeholder="Password" name="password" onChange={handlePassChange}/>
                <input type="checkbox" onChange={handleRememberMe} />
                <button type="submit">Login</button>
            </form>
        </>
    )
}

export default LoginForm;