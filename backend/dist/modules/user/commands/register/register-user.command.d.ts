export declare class RegisterUserCommand {
    readonly name: string;
    readonly email: string;
    readonly password: string;
    readonly re_password: string;
    readonly phone?: string;
    readonly role_id?: number;
    readonly province_id?: number[];
    constructor(name: string, email: string, password: string, re_password: string, phone?: string, role_id?: number, province_id?: number[]);
}
