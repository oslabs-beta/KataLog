import _createClass from "@babel/runtime/helpers/esm/createClass";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import BaseAdapterDateFns from '@date-io/date-fns';
import defaultLocale from 'date-fns/locale/en-US'; // @ts-ignore

import longFormatters from 'date-fns/_lib/format/longFormatters';
var formatTokenMap = {
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
export var AdapterDateFns = /*#__PURE__*/function (_BaseAdapterDateFns) {
  _inherits(AdapterDateFns, _BaseAdapterDateFns);

  var _super = _createSuper(AdapterDateFns);

  function AdapterDateFns() {
    var _this;

    _classCallCheck(this, AdapterDateFns);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.formatTokenMap = formatTokenMap;

    _this.expandFormat = function (format) {
      var longFormatRegexp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g; // @see https://github.com/date-fns/date-fns/blob/master/src/format/index.js#L31

      return format.match(longFormatRegexp).map(function (token) {
        var firstCharacter = token[0];

        if (firstCharacter === 'p' || firstCharacter === 'P') {
          var longFormatter = longFormatters[firstCharacter];
          var locale = _this.locale || defaultLocale;
          return longFormatter(token, locale.formatLong, {});
        }

        return token;
      }).join('');
    };

    _this.getFormatHelperText = function (format) {
      return _this.expandFormat(format).replace(/(aaa|aa|a)/g, '(a|p)m').toLocaleLowerCase();
    };

    return _this;
  }

  return _createClass(AdapterDateFns);
}(BaseAdapterDateFns);