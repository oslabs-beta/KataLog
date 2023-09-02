"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdapterDateFns = void 0;

var _dateFns = _interopRequireDefault(require("@date-io/date-fns"));

var _enUS = _interopRequireDefault(require("date-fns/locale/en-US"));

var _longFormatters = _interopRequireDefault(require("date-fns/_lib/format/longFormatters"));

// @ts-ignore
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

class AdapterDateFns extends _dateFns.default {
  constructor(...args) {
    super(...args);
    this.formatTokenMap = formatTokenMap;

    this.expandFormat = format => {
      const longFormatRegexp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g; // @see https://github.com/date-fns/date-fns/blob/master/src/format/index.js#L31

      return format.match(longFormatRegexp).map(token => {
        const firstCharacter = token[0];

        if (firstCharacter === 'p' || firstCharacter === 'P') {
          const longFormatter = _longFormatters.default[firstCharacter];
          const locale = this.locale || _enUS.default;
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

exports.AdapterDateFns = AdapterDateFns;