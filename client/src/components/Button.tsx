import { IButton } from "@/types/propTypes";

const Button: React.FC<IButton> = ({ children, type, style, onClick = () => {}}) => {
    let stylesToApply = '';

    switch (style)
    {
        case 'inverted':
            stylesToApply = 'bg-white border-2 border-primary text-black hover:bg-primary hover:text-white';
            break;
        case "danger":
            stylesToApply = 'bg-danger border-2 border-danger hover:bg-white hover:text-black';
            break;
        case "success":
            stylesToApply = 'bg-success border-2 border-success hover:bg-white hover:text-black';
            break;
        default:
            stylesToApply = 'bg-primary border-2 border-primary hover:bg-white hover:text-black';
            break;
    }
    
    return (
        <button onClick={onClick} type={type} className={`text-white px-6 py-1 font-medium transition-all rounded-md ${stylesToApply}`}>
            {children}
        </button>
    )
}

export default Button;