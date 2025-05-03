import { ChangeEvent } from "react";

export interface ProfileInfoProps {
    form: {
        name: string;
        email: string;
        dob: string;
    };
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}