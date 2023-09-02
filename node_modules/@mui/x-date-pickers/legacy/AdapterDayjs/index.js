import _createClass from "@babel/runtime/helpers/esm/createClass";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import BaseAdapterDayjs from '@date-io/dayjs';
var formatTokenMap = {
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
export var AdapterDayjs = /*#__PURE__*/function (_BaseAdapterDayjs) {
  _inherits(AdapterDayjs, _BaseAdapterDayjs);

  var _super = _createSuper(AdapterDayjs);

  function AdapterDayjs() {
    var _this;

    _classCallCheck(this, AdapterDayjs);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.formatTokenMap = formatTokenMap;

    _this.expandFormat = function (format) {
      var _this$rawDayJsInstanc;

      var localeFormats = (_this$rawDayJsInstanc = _this.rawDayJsInstance.Ls[_this.locale || 'en']) == null ? void 0 : _this$rawDayJsInstanc.formats; // @see https://github.com/iamkun/dayjs/blob/dev/src/plugin/localizedFormat/index.js

      var t = function t(formatBis) {
        return formatBis.replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function (_, a, b) {
          return a || b.slice(1);
        });
      };

      return format.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, function (_, a, b) {
        var B = b && b.toUpperCase();
        return a || localeFormats[b] || t(localeFormats[B]);
      });
    };

    _this.getFormatHelperText = function (format) {
      return _this.expandFormat(format).replace(/a/gi, '(a|p)m').toLocaleLowerCase();
    };

    return _this;
  }

  return _createClass(AdapterDayjs);
}(BaseAdapterDayjs);