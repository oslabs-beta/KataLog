import type { DebouncedFunc } from 'lodash';
import { Props, ReactResizeDetectorDimensions } from './types';
export type PatchedResizeObserverCallback = DebouncedFunc<ResizeObserverCallback> | ResizeObserverCallback;
export declare const patchResizeHandler: (resizeCallback: ResizeObserverCallback, refreshMode: Props['refreshMode'], refreshRate: Props['refreshRate'], refreshOptions: Props['refreshOptions']) => PatchedResizeObserverCallback;
export declare const isFunction: (fn: unknown) => boolean;
export declare const isSSR: () => boolean;
export declare const isDOMElement: (element: unknown) => boolean;
export declare const createNotifier: (setSize: React.Dispatch<React.SetStateAction<ReactResizeDetectorDimensions>>, handleWidth: boolean, handleHeight: boolean) => ({ width, height }: ReactResizeDetectorDimensions) => void;
