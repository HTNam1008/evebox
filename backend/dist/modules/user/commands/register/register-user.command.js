"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUserCommand = void 0;
class RegisterUserCommand {
    constructor(name, email, password, re_password, phone, role_id, province_id) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.re_password = re_password;
        this.phone = phone;
        this.role_id = role_id;
        this.province_id = province_id;
    }
}
exports.RegisterUserCommand = RegisterUserCommand;
//# sourceMappingURL=register-user.command.js.map