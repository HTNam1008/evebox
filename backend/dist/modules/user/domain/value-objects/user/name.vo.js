"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Name = void 0;
const value_object_base_1 = require("../../../../../libs/ddd/value-object.base");
const oxide_ts_1 = require("oxide.ts");
class Name extends value_object_base_1.ValueObject {
    constructor(props) {
        super(props);
    }
    static create(name) {
        if (!name || name.trim().length === 0) {
            return (0, oxide_ts_1.Err)(new Error('Name cannot be empty'));
        }
        const nameRegex = /^[A-Za-zÀ-ỹ\s]+$/;
        if (!nameRegex.test(name)) {
            return (0, oxide_ts_1.Err)(new Error('Name contains invalid characters'));
        }
        return (0, oxide_ts_1.Ok)(new Name({ value: name.trim() }));
    }
    get value() {
        return this.props.value;
    }
}
exports.Name = Name;
//# sourceMappingURL=name.vo.js.map