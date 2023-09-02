import React, { PureComponent } from 'react';
import { ReactResizeDetectorDimensions, ResizeDetectorProps } from './types';
declare class ResizeDetector<ElementT extends HTMLElement = HTMLElement> extends PureComponent<ResizeDetectorProps<ElementT>, ReactResizeDetectorDimensions> {
    skipOnMount: boolean | undefined;
    targetRef: any;
    observableElement: any;
    resizeHandler: any;
    resizeObserver: any;
    constructor(props: ResizeDetectorProps<ElementT>);
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    cancelHandler: () => void;
    attachObserver: () => void;
    getElement: () => Element | Text | null;
    createResizeHandler: ResizeObserverCallback;
    getRenderType: () => string;
    render(): string | number | boolean | React.ReactFragment | JSX.Element | null | undefined;
}
export default ResizeDetector;
