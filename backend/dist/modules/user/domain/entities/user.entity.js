"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const aggregate_root_base_1 = require("../../../../libs/ddd/aggregate-root.base");
const user_id_vo_1 = require("../value-objects/user/user-id.vo");
const user_role_enum_1 = require("../enums/user-role.enum");
const role_vo_1 = require("../value-objects/user/role.vo");
const user_registered_domain_event_1 = require("../events/user/user-registered.domain-event");
const oxide_ts_1 = require("oxide.ts");
const user_reset_password_domain_event_1 = require("../events/user/user-reset-password.domain-event");
class User extends aggregate_root_base_1.AggregateRoot {
    constructor(id, props) {
        super(id, props);
    }
    static async createNew(name, email, password, phone, provinceIds, role = user_role_enum_1.UserRole.CUSTOMER) {
        const roleOrError = role_vo_1.Role.create(role);
        if (roleOrError.isErr()) {
            return (0, oxide_ts_1.Err)(roleOrError.unwrapErr());
        }
        const roleVo = roleOrError.unwrap();
        try {
            const id = user_id_vo_1.UserId.generate();
            const user = new User(id, {
                id,
                name,
                email,
                password,
                phone,
                role: roleVo,
                provinceIds,
            });
            user.addDomainEvent(new user_registered_domain_event_1.UserRegisteredDomainEvent(user));
            return (0, oxide_ts_1.Ok)(user);
        }
        catch (error) {
            return (0, oxide_ts_1.Err)(new Error('Failed to create user: ' + error.message));
        }
    }
    static createExisting(id, name, email, password, phone, role, provinceIds) {
        return (0, oxide_ts_1.Ok)(new User(id, {
            id,
            name,
            email,
            password,
            phone,
            role,
            provinceIds,
        }));
    }
    updatePassword(newPassword) {
        this.props.password = newPassword;
        this.addDomainEvent(new user_reset_password_domain_event_1.UserPasswordResetDomainEvent(this));
    }
    get name() {
        return this.props.name;
    }
    get email() {
        return this.props.email;
    }
    get password() {
        return this.props.password;
    }
    get phone() {
        return this.props.phone;
    }
    get role() {
        return this.props.role;
    }
    get provinceIds() {
        return this.props.provinceIds;
    }
    addProvince(provinceId) {
        this.props.provinceIds.push(provinceId);
    }
}
exports.User = User;
//# sourceMappingURL=user.entity.js.map