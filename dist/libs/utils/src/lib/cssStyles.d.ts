interface BgBlurProps {
    blur?: number;
    opacity?: number;
    color?: string;
    imgUrl?: string;
}
type StyleType = Record<string, string | number | Record<string, string | number>>;
export declare function bgBlur(props?: BgBlurProps): StyleType;
interface BgGradientProps {
    direction?: string;
    color?: string;
    startColor?: string;
    endColor?: string;
    imgUrl?: string;
}
export declare function bgGradient(props?: BgGradientProps): StyleType;
export declare function textGradient(value: string): StyleType;
export declare function filterStyles(value: string): StyleType;
export declare const hideScrollbarY: {
    readonly msOverflowStyle: "none";
    readonly scrollbarWidth: "none";
    readonly overflowY: "scroll";
    readonly "&::-webkit-scrollbar": {
        readonly display: "none";
    };
};
export declare const hideScrollbarX: {
    readonly msOverflowStyle: "none";
    readonly scrollbarWidth: "none";
    readonly overflowX: "scroll";
    readonly "&::-webkit-scrollbar": {
        readonly display: "none";
    };
};
export {};
