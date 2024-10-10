'use client'

import { ModalProvider } from "./context/ModalContext";
import ModalController from "./custom/ModalController";
import React from "react";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
    return (
        <ModalProvider>
            {children}
            <ModalController />
        </ModalProvider>
    );
};