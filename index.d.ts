/// <reference types="react" />
export declare type FlubberConfig = {
    step?: number;
    initialIndex?: number;
    onChange?: (path: string, frame: number) => void;
};
export declare const useFlubber: (paths: string[], config?: FlubberConfig) => {
    animatedProps: Partial<{
        d: string;
    }>;
    setFlubberIndex: import("react").Dispatch<import("react").SetStateAction<number>>;
    sharedPathValue: {
        value: string;
    };
    currentIndex: number;
};
