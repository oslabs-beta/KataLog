/// <reference types="react" />
import { DialogActionsProps } from '@mui/material/DialogActions';
import { WrapperVariant } from '../internals/components/wrappers/WrapperVariantContext';
export declare type PickersActionBarAction = 'clear' | 'cancel' | 'accept' | 'today';
export interface PickersActionBarProps extends DialogActionsProps {
    /**
     * Ordered array of actions to display.
     * If empty, does not display that action bar.
     * @default `['cancel', 'accept']` for mobile and `[]` for desktop
     */
    actions?: PickersActionBarAction[] | ((wrapperVariant: WrapperVariant) => PickersActionBarAction[]);
    onAccept: () => void;
    onClear: () => void;
    onCancel: () => void;
    onSetToday: () => void;
}
export declare const PickersActionBar: (props: PickersActionBarProps) => JSX.Element | null;
