"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserId = void 0;
const oxide_ts_1 = require("oxide.ts");
const identifier_base_1 = require("../../../../../libs/ddd/identifier.base");
const uuid_1 = require("uuid");
class UserId extends identifier_base_1.Identifier {
    static generate() {
        return new UserId((0, uuid_1.v4)());
    }
    static create(id) {
        if (!id || id.trim().length === 0) {
            throw (0, oxide_ts_1.Err)(new Error('UserId value cannot be empty or undefined'));
        }
        return (0, oxide_ts_1.Ok)(new UserId(id));
    }
}
exports.UserId = UserId;
//# sourceMappingURL=user-id.vo.js.map