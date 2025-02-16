import ModalDetails from "@components/ModalDetails";
import { ModalContext } from "@context/ModalContext";
import useCallContext from "@hooks/useUserContext";
import { Navigate } from "react-router-dom";

const Modal = () => {

    const modalContext = useCallContext(ModalContext);

    if (!modalContext) return <Navigate to={'/'} />
    
    const { isVisible, setIsVisible } = modalContext;

    const handleOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if(e.target === e.currentTarget) setIsVisible(false);
    }

    if (isVisible)
    {
        return (
            <div onClick={handleOnClick}  className="fixed top-0 left-0 flex justify-center items-center bg-black/50 h-[100vh] w-[100vw]">
                <div className="bg-white w-[85dvw] h-[85dvh] lg:w-[75dvw] lg:h-[75dvh] flex">
                    <ModalDetails />
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