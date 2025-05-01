"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OTPId = void 0;
const identifier_base_1 = require("../../../../../libs/ddd/identifier.base");
const uuid_1 = require("uuid");
class OTPId extends identifier_base_1.Identifier {
    static generate() {
        return new OTPId((0, uuid_1.v4)());
    }
}
exports.OTPId = OTPId;
//# sourceMappingURL=otp-id.vo.js.map