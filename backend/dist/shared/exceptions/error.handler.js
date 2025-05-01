"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
const common_1 = require("@nestjs/common");
class ErrorHandler {
    static badRequest(message) {
        return {
            statusCode: common_1.HttpStatus.BAD_REQUEST,
            error: 'Bad Request',
            message
        };
    }
    static unauthorized(message = 'Unauthorized') {
        return {
            statusCode: common_1.HttpStatus.UNAUTHORIZED,
            error: 'Unauthorized',
            message
        };
    }
    static forbidden(message = 'Forbidden') {
        return {
            statusCode: common_1.HttpStatus.FORBIDDEN,
            error: 'Forbidden',
            message
        };
    }
    static notFound(message = 'Not Found') {
        return {
            statusCode: common_1.HttpStatus.NOT_FOUND,
            error: 'Not Found',
            message
        };
    }
    static internalServerError(message = 'Internal Server Error') {
        return {
            statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'Internal Server Error',
            message
        };
    }
}
exports.ErrorHandler = ErrorHandler;
//# sourceMappingURL=error.handler.js.map