import { useState } from "react";
import { IUser } from "../../../types/user";
import { registerUserAsync } from "@services/User";
import { Navigate } from "react-router-dom";

const RegisterForm = () => {
    
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
        const response = await registerUserAsync(formData);
        if(!response.error) return <Navigate to={'/'} />
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