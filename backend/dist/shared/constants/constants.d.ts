export declare class OTPConstants {
    static readonly MAX_ATTEMPTS = 5;
    static readonly RESEND_COOLDOWN = 60;
}
export declare const USER_MESSAGES: {
    SUCCESS: {
        LOGIN: string;
        REGISTER: string;
        LOGOUT: string;
        USER_FETCHED: string;
        PASSWORD_RESET: string;
        OTP_VERIFIED: string;
        OTP_SENT: string;
        OTP_RESENT: string;
    };
    ERRORS: {
        USER_NOT_FOUND: string;
        INVALID_CREDENTIALS: string;
        EMAIL_EXISTS: string;
        PASSWORDS_MISMATCH: string;
        INVALID_OTP: string;
        OTP_EXPIRED: string;
        REGISTER_ERROR: string;
        SERVER_ERROR: string;
        FAILED_CREATE_USER: string;
        LOGOUT_FAILED: (error: string) => string;
        RESET_PASSWORD_FAILED: string;
        LOGIN_FAILED: string;
    };
};
export declare const OTP_MESSAGES: {
    SUCCESS: {
        VERIFIED: string;
        FORGOT_PASSWORD: string;
        REGISTER: string;
    };
    ERRORS: {
        TYPE_REQUIRED: string;
        INVALID_OR_EXPIRED: (attempts: number) => string;
        MAX_ATTEMPTS_REACHED: string;
        USER_NOT_FOUND: string;
        LOCAL_STORAGE_USER_NOT_FOUND: string;
        INVALID_TYPE: string;
        INVALID_REQUEST_TOKEN: string;
    };
};
export declare const REFRESH_TOKEN_MESSAGES: {
    SUCCESS: {
        REFRESHED: string;
    };
    ERRORS: {
        MISSING_REFRESH_TOKEN: string;
        FAILED_REFRESH_TOKEN: string;
    };
};
export declare const RESET_TOKEN_MESSAGES: {
    ERRORS: {
        INVALID_RESET_TOKEN: string;
    };
};
export declare const OTP_VALIDATION: {
    MAX_ATTEMPTS: number;
    TOKEN_LENGTH: number;
    EXPIRY_TIME: number;
};
