"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordCommand = void 0;
class ResetPasswordCommand {
    constructor(resetToken, newPassword, confirmPassword) {
        this.resetToken = resetToken;
        this.newPassword = newPassword;
        this.confirmPassword = confirmPassword;
    }
    static create(dto) {
        return new ResetPasswordCommand(dto.resetToken, dto.newPassword, dto.confirmPassword);
    }
}
exports.ResetPasswordCommand = ResetPasswordCommand;
//# sourceMappingURL=reset-password.command.js.map