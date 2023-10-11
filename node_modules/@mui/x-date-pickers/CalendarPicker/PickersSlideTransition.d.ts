import * as React from 'react';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';
import { PickersSlideTransitionClasses } from './pickersSlideTransitionClasses';
export declare type SlideDirection = 'right' | 'left';
export interface SlideTransitionProps extends Omit<CSSTransitionProps, 'timeout'> {
    children: React.ReactElement;
    className?: string;
    reduceAnimations: boolean;
    slideDirection: SlideDirection;
    transKey: React.Key;
    classes?: Partial<PickersSlideTransitionClasses>;
}
export declare const slideAnimationDuration = 350;
/**
 * @ignore - do not document.
 */
export declare const PickersSlideTransition: (props: SlideTransitionProps) => JSX.Element;
