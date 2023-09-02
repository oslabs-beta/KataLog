import BaseAdapterDateFns from '@date-io/date-fns';
import defaultLocale from 'date-fns/locale/en-US'; // @ts-ignore

import longFormatters from 'date-fns/_lib/format/longFormatters';
const formatTokenMap = {
  y: 'year',
  yy: 'year',
  yyy: 'year',
  yyyy: 'year',
  MMMM: 'month',
  MM: 'month',
  DD: 'day',
  d: 'day',
  dd: 'day',
  H: 'hour',
  HH: 'hour',
  h: 'hour',
  hh: 'hour',
  mm: 'minute',
  ss: 'second',
  a: 'am-pm',
  aa: 'am-pm',
  aaa: 'am-pm'
};
export class AdapterDateFns extends BaseAdapterDateFns {
  constructor(...args) {
    super(...args);
    this.formatTokenMap = formatTokenMap;

    this.expandFormat = format => {
      const longFormatRegexp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g; // @see https://github.com/date-fns/date-fns/blob/master/src/format/index.js#L31

      return format.match(longFormatRegexp).map(token => {
        const firstCharacter = token[0];

        if (firstCharacter === 'p' || firstCharacter === 'P') {
          const longFormatter = longFormatters[firstCharacter];
          const locale = this.locale || defaultLocale;
          return longFormatter(token, locale.formatLong, {});
        }

        return token;
      }).join('');
    };

    this.getFormatHelperText = format => {
      return this.expandFormat(format).replace(/(aaa|aa|a)/g, '(a|p)m').toLocaleLowerCase();
    };
  }

}