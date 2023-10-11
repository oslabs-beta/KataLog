import { MuiPickersAdapterContextValue } from '../../LocalizationProvider/LocalizationProvider';
export declare const useLocalizationContext: <T>() => MuiPickersAdapterContextValue<T>;
export declare const useUtils: <T>() => import("..").MuiPickersAdapter<T>;
export declare const useDefaultDates: <T>() => {
    minDate: T;
    maxDate: T;
};
export declare const useLocaleText: <T>() => import("../..").PickersLocaleText<T>;
export declare const useNow: <TDate>() => TDate;
