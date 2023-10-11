import type { MutableRefObject } from 'react';
import type { Props, ReactResizeDetectorDimensions } from './types';
export interface useResizeDetectorProps<T extends HTMLElement> extends Props {
    targetRef?: MutableRefObject<T | null>;
}
declare function useResizeDetector<T extends HTMLElement = any>({ skipOnMount, refreshMode, refreshRate, refreshOptions, handleWidth, handleHeight, targetRef, observerOptions, onResize }?: useResizeDetectorProps<T>): UseResizeDetectorReturn<T>;
export default useResizeDetector;
export interface UseResizeDetectorReturn<T> extends ReactResizeDetectorDimensions {
    ref: MutableRefObject<T | null>;
}
