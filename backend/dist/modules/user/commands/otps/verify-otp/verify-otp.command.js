"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyOTPCommand = void 0;
class VerifyOTPCommand {
    constructor(email, otp, type, request_token) {
        this.email = email;
        this.otp = otp;
        this.type = type;
        this.request_token = request_token;
    }
    static create(dto) {
        return new VerifyOTPCommand(dto.email, dto.otp, dto.type, dto.request_token);
    }
}
exports.VerifyOTPCommand = VerifyOTPCommand;
//# sourceMappingURL=verify-otp.command.js.map