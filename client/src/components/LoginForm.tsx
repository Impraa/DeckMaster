import { useState } from "react";
import {IUser} from '../../../types/user';

const LoginForm = () => {
    const [formData, setFormData] = useState<Omit<IUser, 'id'>>({
        username: "",
        email: "",
        password: "",
      });

    const handleSubmit = (e:  React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData)
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
    

    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col w-[50%]">
                <input type="text" placeholder="E-mail/Username" name="identificator" onChange={handleIDChange}/>
                <input type="text" placeholder="Password" name="password" onChange={handlePassChange}/>
                <button type="submit">Login</button>
            </form>
        </>
    )
}

export default LoginForm;