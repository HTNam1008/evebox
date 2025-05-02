export declare class TempUserStore {
    private store;
    save(key: string, value: any, ttl: number): void;
    get(key: string): any;
    delete(key: string): void;
}
