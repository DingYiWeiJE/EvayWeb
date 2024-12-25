import React from "react";
import TranslateComponent from "./TranslateComponent";

export interface TranslateProps {
}

export const Translate: React.FC<TranslateProps> = () => {
    return (
        <div >
           <TranslateComponent />
        </div>
    );
}