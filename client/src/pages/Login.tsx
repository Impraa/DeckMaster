import LoginForm from "@components/LoginForm";

const Login = () => {
  return (
    <div className="flex items-center justify-center h-[65dvh]">
      <div className="flex flex-col">
        <h2 className="self-start font-bold text-2xl">Login</h2>
        <LoginForm />
      </div>
  </div>
  );
};

export default Login;
