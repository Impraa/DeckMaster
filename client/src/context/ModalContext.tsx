import { IModalContextValue } from "@/types/contextTypes";
import { createContext, ReactNode, useMemo, useState } from "react";

export const ModalContext = createContext<IModalContextValue | null>(null);

const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [display, setDisplay] = useState<ReactNode>(<></>);
    const [isVisible, setIsVisible] = useState<boolean>(true);

    const value = useMemo(() => ({ display, isVisible, setDisplay, setIsVisible }), [display, isVisible]);
    return <ModalContext.Provider value={value} >{ children }</ModalContext.Provider> 
}

export default ModalProvider;