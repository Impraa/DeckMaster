import { useState } from "react";
import { IUser } from "../../../types/user";
import { UserContext } from "@context/UserContext";
import useCallContext from "@hooks/useCallContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DisplayErrorMessage } from "@/utils/helperFunctions";
import Input from "./Input";
import Button from "./Button";

const RegisterForm = () => {

    const userContext = useCallContext(UserContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState<Omit<IUser, 'id' | 'role'> & { confirmPassword?: string }>({
        username: "",
        email: "",
        password: ""
    });

    useEffect(() => {
        if (userContext && userContext.user) return navigate('/');
    },[navigate, userContext]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((oldFormData) => ({...oldFormData, [name]: value}));
    }

    const handleSubmit = async (e:  React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (userContext)
        {
            if (!formData.username) userContext.setError('Username not given, try again');
            else if (!formData.email || !formData.email.includes('@')) userContext.setError('Wrong email, try again');
            else if (!formData.password) userContext.setError('Password not given, try again');
            else if (!formData.confirmPassword) userContext.setError('Password not confirmed, try again');
            else if (formData.confirmPassword !== formData.password) userContext.setError("Passwords are not matching, try again");
            else
            {
                const confirmPassowordField = document.querySelector('[name="confirmPassword"]') as HTMLInputElement;
                confirmPassowordField!.value = '';
                delete formData.confirmPassword;
                userContext.registerUser(formData); 
            }
        }
    }

    return (
        <>
            {userContext && <DisplayErrorMessage error={userContext.error} />}
            <form onSubmit={handleSubmit} className="flex flex-col items-start">
                <Input labelText={"Username"} inputType={"text"} inputName={"username"} handleChange={handleChange} />
                <Input labelText={"Email"} inputType={"text"} inputName={"email"} handleChange={handleChange} />
                <Input labelText={"Password"} inputType={"password"} inputName={"password"} handleChange={handleChange} />
                <Input labelText={"Confirm Password"} inputType={"password"} inputName={"confirmPassword"} handleChange={handleChange} />
                <Button type="submit" style="normal" >Register</Button>
            </form>
        </>
    )
}

export default RegisterForm;