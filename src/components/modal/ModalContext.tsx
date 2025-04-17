import React from "react";
import {ModalType} from "../../types/modal";

export interface ModalContextType {
    showModal: ModalType;
    openModal: (_: ModalType) => void;
}

export const ModalContext = React.createContext<ModalContextType>(null!);