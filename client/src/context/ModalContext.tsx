import { IModalContextValue } from "@/types/contextTypes";
import { createContext, ReactNode, useMemo, useState } from "react";

export const ModalContext = createContext<IModalContextValue | null>(null);

const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const value = useMemo(() => ({ isVisible, setIsVisible }), [isVisible]);
    return <ModalContext.Provider value={value} >{ children }</ModalContext.Provider> 
}

export default ModalProvider;