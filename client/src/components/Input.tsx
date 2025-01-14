import { IInput } from "@/types/propTypes";

const Input: React.FC<IInput> = ({labelText, inputType, inputName, handleChange, value = ""}) => {
    return (
        <div className="flex my-2">
            <label className="text-primary font-medium">{labelText}</label>
            <input className={`box-border ml-2 ${inputType === 'text' || inputType === 'password' ? 'outline-1 outline-primary rounded-lg outline-none focus:outline-primary focus:outline-2 ' : ''} transition-all`}
                type={inputType} name={inputName} onChange={handleChange} value={value}
                max={inputName === 'level' ? 12 : undefined}
                min={inputName === 'level' || inputName === 'atk' || inputName === 'def' ? 0 : undefined} />
        </div>
    )
}

export default Input;