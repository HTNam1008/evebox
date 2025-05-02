"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Email = void 0;
const value_object_base_1 = require("../../../../../libs/ddd/value-object.base");
const oxide_ts_1 = require("oxide.ts");
class Email extends value_object_base_1.ValueObject {
    constructor(props) {
        super(props);
    }
    static create(email) {
        if (!email || email.trim().length === 0) {
            return (0, oxide_ts_1.Err)(new Error('Email cannot be empty'));
        }
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        if (!emailRegex.test(email.trim())) {
            return (0, oxide_ts_1.Err)(new Error('Invalid email address'));
        }
        return (0, oxide_ts_1.Ok)(new Email({ value: email.trim() }));
    }
    get value() {
        return this.props.value;
    }
}
exports.Email = Email;
//# sourceMappingURL=email.vo.js.map