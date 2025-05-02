"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Password = void 0;
const value_object_base_1 = require("../../../../../libs/ddd/value-object.base");
const bcryptjs_1 = require("bcryptjs");
const oxide_ts_1 = require("oxide.ts");
class Password extends value_object_base_1.ValueObject {
    constructor(props) {
        super(props);
    }
    static async create(plainPassword) {
        if (!plainPassword || plainPassword.length < 6) {
            return (0, oxide_ts_1.Err)(new Error('Password must be at least 6 characters long'));
        }
        try {
            const hashedPassword = await (0, bcryptjs_1.hash)(plainPassword, 10);
            return (0, oxide_ts_1.Ok)(new Password({ value: hashedPassword }));
        }
        catch (error) {
            return (0, oxide_ts_1.Err)(new Error('Failed to hash password'));
        }
    }
    static createHashed(hashedPassword) {
        return (0, oxide_ts_1.Ok)(new Password({ value: hashedPassword }));
    }
    async comparePassword(plainPassword) {
        return await (0, bcryptjs_1.compare)(plainPassword, this.props.value);
    }
    getHashedValue() {
        return this.props.value;
    }
}
exports.Password = Password;
//# sourceMappingURL=password.vo.js.map