"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProvinceId = void 0;
const value_object_base_1 = require("../../../../../libs/ddd/value-object.base");
const oxide_ts_1 = require("oxide.ts");
class ProvinceId extends value_object_base_1.ValueObject {
    constructor(value) {
        super(value);
    }
    static create(id) {
        if (!Number.isInteger(id) || id <= 0) {
            return (0, oxide_ts_1.Err)(new Error('Invalid Province ID'));
        }
        return (0, oxide_ts_1.Ok)(new ProvinceId(id));
    }
    static createList(ids) {
        if (!ids || ids.length === 0) {
            return (0, oxide_ts_1.Ok)([]);
        }
        const provinceIds = [];
        for (const id of ids) {
            const provinceIdOrError = ProvinceId.create(id);
            if (provinceIdOrError.isErr()) {
                return (0, oxide_ts_1.Err)(provinceIdOrError.unwrapErr());
            }
            provinceIds.push(provinceIdOrError.unwrap());
        }
        return (0, oxide_ts_1.Ok)(provinceIds);
    }
    get value() {
        return this.props;
    }
}
exports.ProvinceId = ProvinceId;
//# sourceMappingURL=province-id.vo.js.map