import BaseAdapterDateFns from '@date-io/date-fns';
import { MuiFormatTokenMap, MuiPickerFieldAdapter } from '../internals/models';
export declare class AdapterDateFns extends BaseAdapterDateFns implements MuiPickerFieldAdapter<Date> {
    formatTokenMap: MuiFormatTokenMap;
    expandFormat: (format: string) => string;
    getFormatHelperText: (format: string) => string;
}
