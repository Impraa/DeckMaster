import { useState } from "react";
import { IUpdateUserData } from "../../../types/user";
import Input from "./Input";
import { IEditProfileForm } from "@/types/propTypes";
import { DisplayErrorMessage } from "@/utils/helperFunctions";
import Button from "./Button";

const EditProfileForm: React.FC<IEditProfileForm> = ({user, updateUser, setError, error}) => {
  
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
        const { oldPassword, newPassword, confirmNewPassword } = formData;
        console.log(user);
        if (user)
        {
            if (!formData.username || !formData.email) setError('Username and email can not be empty, please try again');
            else
            { 
                if (oldPassword)
                {
                    if (!newPassword || !confirmNewPassword) setError('New passwords are missing');
                    else if (newPassword !== confirmNewPassword) setError('New passwords are different');
                    else {
                        delete formData.confirmNewPassword;
                        await updateUser(user.id, formData);
                    }
                }
                else updateUser(user.id, formData);
            }
        }
    }

    return (
        <>
            {error && <DisplayErrorMessage error={error} />}
            <form onSubmit={handleSubmit} className="flex flex-col items-start">
                <Input inputType="text" inputName="username" labelText="Username" handleChange={handleChange} value={user?.username} />
                <Input inputType="text" inputName="email" labelText="Email" handleChange={handleChange} value={user?.email} />
                <Input inputType="password" inputName="oldPassword" labelText="Old Password" handleChange={handleChange} value={formData.oldPassword} />
                <Input inputType="password" inputName="newPassword" labelText="New Password" handleChange={handleChange} value={formData.newPassword} />
                <Input inputType="password" inputName="confirmNewPassword" labelText="Confirm New Password" handleChange={handleChange} value={formData.confirmNewPassword} />
                <Button type="submit" style="normal">Save</Button>
            </form>
        </>
    )
}

export default EditProfileForm;
