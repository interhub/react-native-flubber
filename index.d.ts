/// <reference types="react" />
export declare type FlubberConfig = {
    step?: number;
    initialIndex?: number;
};
declare const useFlubber: (paths: string[], config?: FlubberConfig) => {
    pathRef: import("react").MutableRefObject<any>;
    setFlubberIndex: import("react").Dispatch<import("react").SetStateAction<number>>;
};
export default useFlubber;
