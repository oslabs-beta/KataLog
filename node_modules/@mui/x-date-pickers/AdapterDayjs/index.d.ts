import { Dayjs } from 'dayjs';
import BaseAdapterDayjs from '@date-io/dayjs';
import { MuiFormatTokenMap, MuiPickerFieldAdapter } from '../internals/models';
export declare class AdapterDayjs extends BaseAdapterDayjs implements MuiPickerFieldAdapter<Dayjs> {
    formatTokenMap: MuiFormatTokenMap;
    /**
     * The current getFormatHelperText method uses an outdated format parsing logic.
     * We should use this one in the future to support all localized formats.
     */
    expandFormat: (format: string) => string;
    getFormatHelperText: (format: string) => string;
}
