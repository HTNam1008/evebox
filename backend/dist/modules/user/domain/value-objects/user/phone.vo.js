"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Phone = void 0;
const value_object_base_1 = require("../../../../../libs/ddd/value-object.base");
const oxide_ts_1 = require("oxide.ts");
class Phone extends value_object_base_1.ValueObject {
    constructor(props) {
        super(props);
    }
    static create(phone) {
        const phoneRegex = /^[0-9]{10,15}$/;
        if (!phoneRegex.test(phone)) {
            return (0, oxide_ts_1.Err)(new Error('Invalid phone number format'));
        }
        return (0, oxide_ts_1.Ok)(new Phone({ value: phone }));
    }
    get value() {
        return this.props.value;
    }
}
exports.Phone = Phone;
//# sourceMappingURL=phone.vo.js.map