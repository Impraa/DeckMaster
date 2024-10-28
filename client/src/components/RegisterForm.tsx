import { useState } from "react";
import { IUser } from "../../../types/user";
import { UserContext } from "@context/UserContext";
import useCallContext from "@hooks/useCallContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {

    const userContext = useCallContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(userContext && userContext.user) 
        {
            navigate('/');
            return;
        }
    },[navigate, userContext]);

    const [formData, setFormData] = useState<Omit<IUser, 'id' | 'role'> & { confirmPassword?: string }>({
        username: "",
        email: "",
        password: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((oldFormData) => ({...oldFormData, [name]: value}));
    }

    const handleSubmit = async (e:  React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!formData.confirmPassword) console.log('Password not confirmed');
        if(formData.confirmPassword !== formData.password) console.log("Password's are not matching");
        delete formData.confirmPassword;
        if(userContext) userContext.registerUser(formData);
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col w-[50%]">
                <input type="text"  name="username" placeholder="Username" onChange={handleChange}/>
                <input type="text" name="email" placeholder="Email" onChange={handleChange} />
                <input type="text" name="password" placeholder="Password" onChange={handleChange} />
                <input type="text" name="confirmPassword" placeholder="Confirm password" onChange={handleChange} />
                <button type="submit">Register</button>
            </form>
        </>
    )
}

export default RegisterForm;