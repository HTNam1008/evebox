"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Identifier = void 0;
class Identifier {
    constructor(value) {
        if (!value) {
            throw new Error('Identifier value cannot be empty');
        }
        this.value = value;
    }
    equals(id) {
        if (id === null || id === undefined) {
            return false;
        }
        return this.value === id.value;
    }
    toString() {
        return this.value.toString();
    }
}
exports.Identifier = Identifier;
//# sourceMappingURL=identifier.base.js.map