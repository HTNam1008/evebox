import { AggregateRoot } from 'src/libs/ddd/aggregate-root.base';
import { Result } from 'oxide.ts';
import { OTPId } from '../value-objects/otp/otp-id.vo';
import { Email } from '../value-objects/user/email.vo';
import { OTPType } from '../enums/otp-type.enum';
interface OTPProps {
    id: OTPId;
    email: Email;
    otp: string;
    type: OTPType;
    expiresAt: Date;
    isUsed: boolean;
    createdAt: Date;
    attempts: number;
    resendCooldown: number;
}
export declare class OTP extends AggregateRoot<OTPId, OTPProps> {
    private static readonly MAX_ATTEMPTS;
    private static readonly RESEND_COOLDOWN;
    private constructor();
    static generateOTP(): string;
    static create(email: Email, type: OTPType): Result<OTP, Error>;
    get email(): Email;
    get otp(): string;
    get type(): OTPType;
    get expiresAt(): Date;
    get isUsed(): boolean;
    get createdAt(): Date;
    get attempts(): number;
    get resendCooldown(): number;
    set otp(value: string);
    canAttempt(): boolean;
    getRemainingAttempts(): number;
    incrementAttempt(): Result<void, Error>;
    isValid(): boolean;
    markAsUsed(): Result<void, Error>;
    static createExisting(id: OTPId, email: Email, otp: string, type: OTPType, expiresAt: Date, isUsed: boolean, createdAt: Date, attempts?: number): Result<OTP, Error>;
}
export {};
