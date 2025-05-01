import { HttpStatus } from "@nestjs/common";
export declare class ErrorHandler {
    static badRequest(message: string): {
        statusCode: HttpStatus;
        error: string;
        message: string;
    };
    static unauthorized(message?: string): {
        statusCode: HttpStatus;
        error: string;
        message: string;
    };
    static forbidden(message?: string): {
        statusCode: HttpStatus;
        error: string;
        message: string;
    };
    static notFound(message?: string): {
        statusCode: HttpStatus;
        error: string;
        message: string;
    };
    static internalServerError(message?: string): {
        statusCode: HttpStatus;
        error: string;
        message: string;
    };
}
