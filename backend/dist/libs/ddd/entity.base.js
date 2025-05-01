"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
class Entity {
    constructor(id, props) {
        this.id = id;
        this.props = props;
    }
    equals(entity) {
        if (entity === null || entity === undefined) {
            return false;
        }
        return this.id.equals(entity.id);
    }
}
exports.Entity = Entity;
//# sourceMappingURL=entity.base.js.map