import BaseAdapterDayjs from '@date-io/dayjs';
const formatTokenMap = {
  YY: 'year',
  YYYY: 'year',
  M: 'month',
  MM: 'month',
  MMM: 'month',
  MMMM: 'month',
  D: 'day',
  DD: 'day',
  H: 'hour',
  HH: 'hour',
  h: 'hour',
  hh: 'hour',
  m: 'minute',
  mm: 'minute',
  s: 'second',
  ss: 'second',
  A: 'am-pm',
  a: 'am-pm'
};
export class AdapterDayjs extends BaseAdapterDayjs {
  constructor(...args) {
    super(...args);
    this.formatTokenMap = formatTokenMap;

    this.expandFormat = format => {
      var _this$rawDayJsInstanc;

      const localeFormats = (_this$rawDayJsInstanc = this.rawDayJsInstance.Ls[this.locale || 'en']) == null ? void 0 : _this$rawDayJsInstanc.formats; // @see https://github.com/iamkun/dayjs/blob/dev/src/plugin/localizedFormat/index.js

      const t = formatBis => formatBis.replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, (_, a, b) => a || b.slice(1));

      return format.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, (_, a, b) => {
        const B = b && b.toUpperCase();
        return a || localeFormats[b] || t(localeFormats[B]);
      });
    };

    this.getFormatHelperText = format => {
      return this.expandFormat(format).replace(/a/gi, '(a|p)m').toLocaleLowerCase();
    };
  }

}