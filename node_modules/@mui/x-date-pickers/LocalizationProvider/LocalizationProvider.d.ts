import * as React from 'react';
import { DateIOFormats } from '@date-io/core/IUtils';
import { MuiPickersAdapter } from '../internals/models';
import { PickersLocaleText } from '../locales';
export interface MuiPickersAdapterContextValue<TDate> {
    defaultDates: {
        minDate: TDate;
        maxDate: TDate;
    };
    utils: MuiPickersAdapter<TDate>;
    localeText: PickersLocaleText<TDate>;
}
export declare const MuiPickersAdapterContext: React.Context<MuiPickersAdapterContextValue<unknown> | null>;
export interface LocalizationProviderProps {
    children?: React.ReactNode;
    /** DateIO adapter class function */
    dateAdapter: new (...args: any) => MuiPickersAdapter<unknown>;
    /** Formats that are used for any child pickers */
    dateFormats?: Partial<DateIOFormats>;
    /**
     * Date library instance you are using, if it has some global overrides
     * ```jsx
     * dateLibInstance={momentTimeZone}
     * ```
     */
    dateLibInstance?: any;
    /** Locale for the date library you are using
     * @deprecated Use `adapterLocale` instead
     */
    locale?: string | object;
    /** Locale for the date library you are using
     */
    adapterLocale?: string | object;
    /**
     * Locale for components texts
     */
    localeText?: Partial<PickersLocaleText<unknown>>;
}
/**
 * @ignore - do not document.
 */
export declare function LocalizationProvider(inProps: LocalizationProviderProps): JSX.Element;
export declare namespace LocalizationProvider {
    var propTypes: any;
}
