type InputValue = Date | string | number | null;
export declare function fDate(date: InputValue, newFormat?: string): string;
export declare function fDateTime(date: InputValue, newFormat?: string): string;
export declare function fTimestamp(date: InputValue): string | number;
export declare function fToNow(date: InputValue): string;
export {};
