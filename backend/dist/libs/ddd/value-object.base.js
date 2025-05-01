"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValueObject = void 0;
class ValueObject {
    constructor(props) {
        this.props = Object.freeze(props);
    }
    equals(vo) {
        if (vo === null || vo === undefined) {
            return false;
        }
        if (vo.props === undefined) {
            return false;
        }
        return this.shallowEqual(this.props, vo.props);
    }
    shallowEqual(obj1, obj2) {
        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);
        if (keys1.length !== keys2.length) {
            return false;
        }
        for (const key of keys1) {
            if (obj1[key] !== obj2[key]) {
                return false;
            }
        }
        return true;
    }
}
exports.ValueObject = ValueObject;
//# sourceMappingURL=value-object.base.js.map