"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const value_object_base_1 = require("../../../../../libs/ddd/value-object.base");
const user_role_enum_1 = require("../../enums/user-role.enum");
const oxide_ts_1 = require("oxide.ts");
class Role extends value_object_base_1.ValueObject {
    constructor(props) {
        super(props);
    }
    static create(role) {
        if (!Object.values(user_role_enum_1.UserRole).includes(role)) {
            return (0, oxide_ts_1.Err)(new Error('Invalid user role'));
        }
        return (0, oxide_ts_1.Ok)(new Role({ value: role }));
    }
    getValue() {
        return this.props.value;
    }
    isAdmin() {
        return (this.props.value === user_role_enum_1.UserRole.ADMIN ||
            this.props.value === user_role_enum_1.UserRole.SYSTEM_ADMIN);
    }
    isOrganizer() {
        return this.props.value === user_role_enum_1.UserRole.ORGANIZER;
    }
    isCustomer() {
        return this.props.value === user_role_enum_1.UserRole.CUSTOMER;
    }
}
exports.Role = Role;
//# sourceMappingURL=role.vo.js.map