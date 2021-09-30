/// <reference types="react" />
export declare type FlubberConfig = {
    step?: number;
    initialIndex?: number;
};
export declare const useFlubber: (paths: string[], config?: FlubberConfig) => {
    pathRef: import("react").MutableRefObject<any>;
    setFlubberIndex: import("react").Dispatch<import("react").SetStateAction<number>>;
};
