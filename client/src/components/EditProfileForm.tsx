import { useState } from "react";
import { IUpdateUserData, IUser } from "../../../types/user";

const EditProfileForm: React.FC<{user: IUser | null, updateUser: (id: number, formData: IUpdateUserData) => void}> = ({user, updateUser}) => {
  
    const [formData, setFormData] = useState<(IUpdateUserData & { confirmNewPassword?: string })>(
        {
            email: user ? user.email : '',
            username: user ? user.username : '',
        });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((oldFormData) => ({...oldFormData, [name]: value }));
    }

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
        const { oldPassword, newPassword, confirmNewPassword } = formData;
        if (user) {
            if (oldPassword) {
                if (!newPassword || !confirmNewPassword) console.log('fale nove sifre');
                else if (newPassword !== confirmNewPassword) console.log('nove sifre se ne podudaraju');
                else {
                    delete formData.confirmNewPassword;
                    await updateUser(user.id, formData);
                }
            }
            else {
                updateUser(user.id, formData);
            }
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center w-[50%]">
            <input type="text" name="username" value={formData.username} onChange={handleChange}/>
            <input type="text" name="email" value={formData.email} onChange={handleChange}/>
            <input type="text" name="oldPassword" onChange={handleChange}/>
            <input type="text" name="newPassword" onChange={handleChange}/>
            <input type="text" name="confirmNewPassword" onChange={handleChange}/>
            <button type="submit">Save</button>  
        </form>
    )
}

export default EditProfileForm;
