import { ModalContext } from "@context/ModalContext";
import useCallContext from "@hooks/useCallContext";
import { Navigate } from "react-router-dom";

const Modal = () => {

    const modalContext = useCallContext(ModalContext);

    if (!modalContext) return <Navigate to={'/'} />
    
    const { isVisible, display } = modalContext;

    if (isVisible)
    {
        return (
            <div className="fixed top-0 left-0 flex justify-center items-center bg-black/50 h-[100vh] w-[100vw]">
                <div className="bg-white w-[75vw] h-[50vh]">
                    Content
                    {display}
                </div>
            </div>
        )
    }
    else
    {
        <></>    
    }
}

export default Modal;