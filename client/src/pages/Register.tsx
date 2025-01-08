import RegisterForm from "@components/RegisterForm";

const Register = () => {

    return (
        <div className="flex items-center justify-center h-[65dvh]">
            <div className="flex flex-col">
                <h2 className="self-start font-bold text-2xl">Register</h2>
                <RegisterForm />
            </div>
        </div>
    )
}

export default Register;