'use strict';

var addDays = require('date-fns/addDays');
var addSeconds = require('date-fns/addSeconds');
var addMinutes = require('date-fns/addMinutes');
var addHours = require('date-fns/addHours');
var addWeeks = require('date-fns/addWeeks');
var addMonths = require('date-fns/addMonths');
var addYears = require('date-fns/addYears');
var differenceInYears = require('date-fns/differenceInYears');
var differenceInQuarters = require('date-fns/differenceInQuarters');
var differenceInMonths = require('date-fns/differenceInMonths');
var differenceInWeeks = require('date-fns/differenceInWeeks');
var differenceInDays = require('date-fns/differenceInDays');
var differenceInHours = require('date-fns/differenceInHours');
var differenceInMinutes = require('date-fns/differenceInMinutes');
var differenceInSeconds = require('date-fns/differenceInSeconds');
var differenceInMilliseconds = require('date-fns/differenceInMilliseconds');
var eachDayOfInterval = require('date-fns/eachDayOfInterval');
var endOfDay = require('date-fns/endOfDay');
var endOfWeek = require('date-fns/endOfWeek');
var endOfYear = require('date-fns/endOfYear');
var format = require('date-fns/format');
var getDate = require('date-fns/getDate');
var getDay = require('date-fns/getDay');
var getDaysInMonth = require('date-fns/getDaysInMonth');
var getHours = require('date-fns/getHours');
var getMinutes = require('date-fns/getMinutes');
var getMonth = require('date-fns/getMonth');
var getSeconds = require('date-fns/getSeconds');
var getYear = require('date-fns/getYear');
var isAfter = require('date-fns/isAfter');
var isBefore = require('date-fns/isBefore');
var isEqual = require('date-fns/isEqual');
var isSameDay = require('date-fns/isSameDay');
var isSameYear = require('date-fns/isSameYear');
var isSameMonth = require('date-fns/isSameMonth');
var isSameHour = require('date-fns/isSameHour');
var isValid = require('date-fns/isValid');
var dateFnsParse = require('date-fns/parse');
var setDate = require('date-fns/setDate');
var setHours = require('date-fns/setHours');
var setMinutes = require('date-fns/setMinutes');
var setMonth = require('date-fns/setMonth');
var setSeconds = require('date-fns/setSeconds');
var setYear = require('date-fns/setYear');
var startOfDay = require('date-fns/startOfDay');
var startOfMonth = require('date-fns/startOfMonth');
var endOfMonth = require('date-fns/endOfMonth');
var startOfWeek = require('date-fns/startOfWeek');
var startOfYear = require('date-fns/startOfYear');
var parseISO = require('date-fns/parseISO');
var formatISO = require('date-fns/formatISO');
var isWithinInterval = require('date-fns/isWithinInterval');
var longFormatters = require('date-fns/_lib/format/longFormatters');
var defaultLocale = require('date-fns/locale/en-US');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var addDays__default = /*#__PURE__*/_interopDefaultLegacy(addDays);
var addSeconds__default = /*#__PURE__*/_interopDefaultLegacy(addSeconds);
var addMinutes__default = /*#__PURE__*/_interopDefaultLegacy(addMinutes);
var addHours__default = /*#__PURE__*/_interopDefaultLegacy(addHours);
var addWeeks__default = /*#__PURE__*/_interopDefaultLegacy(addWeeks);
var addMonths__default = /*#__PURE__*/_interopDefaultLegacy(addMonths);
var addYears__default = /*#__PURE__*/_interopDefaultLegacy(addYears);
var differenceInYears__default = /*#__PURE__*/_interopDefaultLegacy(differenceInYears);
var differenceInQuarters__default = /*#__PURE__*/_interopDefaultLegacy(differenceInQuarters);
var differenceInMonths__default = /*#__PURE__*/_interopDefaultLegacy(differenceInMonths);
var differenceInWeeks__default = /*#__PURE__*/_interopDefaultLegacy(differenceInWeeks);
var differenceInDays__default = /*#__PURE__*/_interopDefaultLegacy(differenceInDays);
var differenceInHours__default = /*#__PURE__*/_interopDefaultLegacy(differenceInHours);
var differenceInMinutes__default = /*#__PURE__*/_interopDefaultLegacy(differenceInMinutes);
var differenceInSeconds__default = /*#__PURE__*/_interopDefaultLegacy(differenceInSeconds);
var differenceInMilliseconds__default = /*#__PURE__*/_interopDefaultLegacy(differenceInMilliseconds);
var eachDayOfInterval__default = /*#__PURE__*/_interopDefaultLegacy(eachDayOfInterval);
var endOfDay__default = /*#__PURE__*/_interopDefaultLegacy(endOfDay);
var endOfWeek__default = /*#__PURE__*/_interopDefaultLegacy(endOfWeek);
var endOfYear__default = /*#__PURE__*/_interopDefaultLegacy(endOfYear);
var format__default = /*#__PURE__*/_interopDefaultLegacy(format);
var getDate__default = /*#__PURE__*/_interopDefaultLegacy(getDate);
var getDay__default = /*#__PURE__*/_interopDefaultLegacy(getDay);
var getDaysInMonth__default = /*#__PURE__*/_interopDefaultLegacy(getDaysInMonth);
var getHours__default = /*#__PURE__*/_interopDefaultLegacy(getHours);
var getMinutes__default = /*#__PURE__*/_interopDefaultLegacy(getMinutes);
var getMonth__default = /*#__PURE__*/_interopDefaultLegacy(getMonth);
var getSeconds__default = /*#__PURE__*/_interopDefaultLegacy(getSeconds);
var getYear__default = /*#__PURE__*/_interopDefaultLegacy(getYear);
var isAfter__default = /*#__PURE__*/_interopDefaultLegacy(isAfter);
var isBefore__default = /*#__PURE__*/_interopDefaultLegacy(isBefore);
var isEqual__default = /*#__PURE__*/_interopDefaultLegacy(isEqual);
var isSameDay__default = /*#__PURE__*/_interopDefaultLegacy(isSameDay);
var isSameYear__default = /*#__PURE__*/_interopDefaultLegacy(isSameYear);
var isSameMonth__default = /*#__PURE__*/_interopDefaultLegacy(isSameMonth);
var isSameHour__default = /*#__PURE__*/_interopDefaultLegacy(isSameHour);
var isValid__default = /*#__PURE__*/_interopDefaultLegacy(isValid);
var dateFnsParse__default = /*#__PURE__*/_interopDefaultLegacy(dateFnsParse);
var setDate__default = /*#__PURE__*/_interopDefaultLegacy(setDate);
var setHours__default = /*#__PURE__*/_interopDefaultLegacy(setHours);
var setMinutes__default = /*#__PURE__*/_interopDefaultLegacy(setMinutes);
var setMonth__default = /*#__PURE__*/_interopDefaultLegacy(setMonth);
var setSeconds__default = /*#__PURE__*/_interopDefaultLegacy(setSeconds);
var setYear__default = /*#__PURE__*/_interopDefaultLegacy(setYear);
var startOfDay__default = /*#__PURE__*/_interopDefaultLegacy(startOfDay);
var startOfMonth__default = /*#__PURE__*/_interopDefaultLegacy(startOfMonth);
var endOfMonth__default = /*#__PURE__*/_interopDefaultLegacy(endOfMonth);
var startOfWeek__default = /*#__PURE__*/_interopDefaultLegacy(startOfWeek);
var startOfYear__default = /*#__PURE__*/_interopDefaultLegacy(startOfYear);
var parseISO__default = /*#__PURE__*/_interopDefaultLegacy(parseISO);
var formatISO__default = /*#__PURE__*/_interopDefaultLegacy(formatISO);
var isWithinInterval__default = /*#__PURE__*/_interopDefaultLegacy(isWithinInterval);
var longFormatters__default = /*#__PURE__*/_interopDefaultLegacy(longFormatters);
var defaultLocale__default = /*#__PURE__*/_interopDefaultLegacy(defaultLocale);

const defaultFormats = {
    dayOfMonth: "d",
    fullDate: "PP",
    fullDateWithWeekday: "PPPP",
    fullDateTime: "PP p",
    fullDateTime12h: "PP hh:mm aaa",
    fullDateTime24h: "PP HH:mm",
    fullTime: "p",
    fullTime12h: "hh:mm aaa",
    fullTime24h: "HH:mm",
    hours12h: "hh",
    hours24h: "HH",
    keyboardDate: "P",
    keyboardDateTime: "P p",
    keyboardDateTime12h: "P hh:mm aaa",
    keyboardDateTime24h: "P HH:mm",
    minutes: "mm",
    month: "LLLL",
    monthAndDate: "MMMM d",
    monthAndYear: "LLLL yyyy",
    monthShort: "MMM",
    weekday: "EEEE",
    weekdayShort: "EEE",
    normalDate: "d MMMM",
    normalDateWithWeekday: "EEE, MMM d",
    seconds: "ss",
    shortDate: "MMM d",
    year: "yyyy",
};
class DateFnsUtils {
    constructor({ locale, formats, } = {}) {
        this.lib = "date-fns";
        // Note: date-fns input types are more lenient than this adapter, so we need to expose our more
        // strict signature and delegate to the more lenient signature. Otherwise, we have downstream type errors upon usage.
        this.is12HourCycleInCurrentLocale = () => {
            var _a;
            if (this.locale) {
                return /a/.test((_a = this.locale.formatLong) === null || _a === void 0 ? void 0 : _a.time());
            }
            // By default date-fns is using en-US locale with am/pm enabled
            return true;
        };
        this.getFormatHelperText = (format) => {
            var _a, _b;
            // @see https://github.com/date-fns/date-fns/blob/master/src/format/index.js#L31
            const longFormatRegexp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
            const locale = this.locale || defaultLocale__default["default"];
            return ((_b = (_a = format
                .match(longFormatRegexp)) === null || _a === void 0 ? void 0 : _a.map((token) => {
                const firstCharacter = token[0];
                if (firstCharacter === "p" || firstCharacter === "P") {
                    const longFormatter = longFormatters__default["default"][firstCharacter];
                    return longFormatter(token, locale.formatLong, {});
                }
                return token;
            }).join("").replace(/(aaa|aa|a)/g, "(a|p)m").toLocaleLowerCase()) !== null && _b !== void 0 ? _b : format);
        };
        this.parseISO = (isoString) => {
            return parseISO__default["default"](isoString);
        };
        this.toISO = (value) => {
            return formatISO__default["default"](value, { format: "extended" });
        };
        this.getCurrentLocaleCode = () => {
            var _a;
            return ((_a = this.locale) === null || _a === void 0 ? void 0 : _a.code) || "en-US";
        };
        this.addSeconds = (value, count) => {
            return addSeconds__default["default"](value, count);
        };
        this.addMinutes = (value, count) => {
            return addMinutes__default["default"](value, count);
        };
        this.addHours = (value, count) => {
            return addHours__default["default"](value, count);
        };
        this.addDays = (value, count) => {
            return addDays__default["default"](value, count);
        };
        this.addWeeks = (value, count) => {
            return addWeeks__default["default"](value, count);
        };
        this.addMonths = (value, count) => {
            return addMonths__default["default"](value, count);
        };
        this.addYears = (value, count) => {
            return addYears__default["default"](value, count);
        };
        this.isValid = (value) => {
            return isValid__default["default"](this.date(value));
        };
        this.getDiff = (value, comparing, unit) => {
            var _a;
            // we output 0 if the compare date is string and parsing is not valid
            const dateToCompare = (_a = this.date(comparing)) !== null && _a !== void 0 ? _a : value;
            if (!this.isValid(dateToCompare)) {
                return 0;
            }
            switch (unit) {
                case "years":
                    return differenceInYears__default["default"](value, dateToCompare);
                case "quarters":
                    return differenceInQuarters__default["default"](value, dateToCompare);
                case "months":
                    return differenceInMonths__default["default"](value, dateToCompare);
                case "weeks":
                    return differenceInWeeks__default["default"](value, dateToCompare);
                case "days":
                    return differenceInDays__default["default"](value, dateToCompare);
                case "hours":
                    return differenceInHours__default["default"](value, dateToCompare);
                case "minutes":
                    return differenceInMinutes__default["default"](value, dateToCompare);
                case "seconds":
                    return differenceInSeconds__default["default"](value, dateToCompare);
                default: {
                    return differenceInMilliseconds__default["default"](value, dateToCompare);
                }
            }
        };
        this.isAfter = (value, comparing) => {
            return isAfter__default["default"](value, comparing);
        };
        this.isBefore = (value, comparing) => {
            return isBefore__default["default"](value, comparing);
        };
        this.startOfDay = (value) => {
            return startOfDay__default["default"](value);
        };
        this.endOfDay = (value) => {
            return endOfDay__default["default"](value);
        };
        this.getHours = (value) => {
            return getHours__default["default"](value);
        };
        this.setHours = (value, count) => {
            return setHours__default["default"](value, count);
        };
        this.setMinutes = (value, count) => {
            return setMinutes__default["default"](value, count);
        };
        this.getSeconds = (value) => {
            return getSeconds__default["default"](value);
        };
        this.setSeconds = (value, count) => {
            return setSeconds__default["default"](value, count);
        };
        this.isSameDay = (value, comparing) => {
            return isSameDay__default["default"](value, comparing);
        };
        this.isSameMonth = (value, comparing) => {
            return isSameMonth__default["default"](value, comparing);
        };
        this.isSameYear = (value, comparing) => {
            return isSameYear__default["default"](value, comparing);
        };
        this.isSameHour = (value, comparing) => {
            return isSameHour__default["default"](value, comparing);
        };
        this.startOfYear = (value) => {
            return startOfYear__default["default"](value);
        };
        this.endOfYear = (value) => {
            return endOfYear__default["default"](value);
        };
        this.startOfMonth = (value) => {
            return startOfMonth__default["default"](value);
        };
        this.endOfMonth = (value) => {
            return endOfMonth__default["default"](value);
        };
        this.startOfWeek = (value) => {
            return startOfWeek__default["default"](value, { locale: this.locale });
        };
        this.endOfWeek = (value) => {
            return endOfWeek__default["default"](value, { locale: this.locale });
        };
        this.getYear = (value) => {
            return getYear__default["default"](value);
        };
        this.setYear = (value, count) => {
            return setYear__default["default"](value, count);
        };
        this.date = (value) => {
            if (typeof value === "undefined") {
                return new Date();
            }
            if (value === null) {
                return null;
            }
            return new Date(value);
        };
        this.toJsDate = (value) => {
            return value;
        };
        this.parse = (value, formatString) => {
            if (value === "") {
                return null;
            }
            return dateFnsParse__default["default"](value, formatString, new Date(), { locale: this.locale });
        };
        this.format = (date, formatKey) => {
            return this.formatByString(date, this.formats[formatKey]);
        };
        this.formatByString = (date, formatString) => {
            return format__default["default"](date, formatString, { locale: this.locale });
        };
        this.isEqual = (date, comparing) => {
            if (date === null && comparing === null) {
                return true;
            }
            return isEqual__default["default"](date, comparing);
        };
        this.isNull = (date) => {
            return date === null;
        };
        this.isAfterDay = (date, value) => {
            return isAfter__default["default"](date, endOfDay__default["default"](value));
        };
        this.isBeforeDay = (date, value) => {
            return isBefore__default["default"](date, startOfDay__default["default"](value));
        };
        this.isBeforeYear = (date, value) => {
            return isBefore__default["default"](date, startOfYear__default["default"](value));
        };
        this.isAfterYear = (date, value) => {
            return isAfter__default["default"](date, endOfYear__default["default"](value));
        };
        this.isWithinRange = (date, [start, end]) => {
            return isWithinInterval__default["default"](date, { start, end });
        };
        this.formatNumber = (numberToFormat) => {
            return numberToFormat;
        };
        this.getMinutes = (date) => {
            return getMinutes__default["default"](date);
        };
        this.getDate = (date) => {
            return getDate__default["default"](date);
        };
        this.setDate = (date, count) => {
            return setDate__default["default"](date, count);
        };
        this.getMonth = (date) => {
            return getMonth__default["default"](date);
        };
        this.getDaysInMonth = (date) => {
            return getDaysInMonth__default["default"](date);
        };
        this.setMonth = (date, count) => {
            return setMonth__default["default"](date, count);
        };
        this.getMeridiemText = (ampm) => {
            return ampm === "am" ? "AM" : "PM";
        };
        this.getNextMonth = (date) => {
            return addMonths__default["default"](date, 1);
        };
        this.getPreviousMonth = (date) => {
            return addMonths__default["default"](date, -1);
        };
        this.getMonthArray = (date) => {
            const firstMonth = startOfYear__default["default"](date);
            const monthArray = [firstMonth];
            while (monthArray.length < 12) {
                const prevMonth = monthArray[monthArray.length - 1];
                monthArray.push(this.getNextMonth(prevMonth));
            }
            return monthArray;
        };
        this.mergeDateAndTime = (date, time) => {
            return this.setSeconds(this.setMinutes(this.setHours(date, this.getHours(time)), this.getMinutes(time)), this.getSeconds(time));
        };
        this.getWeekdays = () => {
            const now = new Date();
            return eachDayOfInterval__default["default"]({
                start: startOfWeek__default["default"](now, { locale: this.locale }),
                end: endOfWeek__default["default"](now, { locale: this.locale }),
            }).map((day) => this.formatByString(day, "EEEEEE"));
        };
        this.getWeekArray = (date) => {
            const start = startOfWeek__default["default"](startOfMonth__default["default"](date), { locale: this.locale });
            const end = endOfWeek__default["default"](endOfMonth__default["default"](date), { locale: this.locale });
            let count = 0;
            let current = start;
            const nestedWeeks = [];
            let lastDay = null;
            while (isBefore__default["default"](current, end)) {
                const weekNumber = Math.floor(count / 7);
                nestedWeeks[weekNumber] = nestedWeeks[weekNumber] || [];
                const day = getDay__default["default"](current);
                if (lastDay !== day) {
                    lastDay = day;
                    nestedWeeks[weekNumber].push(current);
                    count += 1;
                }
                current = addDays__default["default"](current, 1);
            }
            return nestedWeeks;
        };
        this.getYearRange = (start, end) => {
            const startDate = startOfYear__default["default"](start);
            const endDate = endOfYear__default["default"](end);
            const years = [];
            let current = startDate;
            while (isBefore__default["default"](current, endDate)) {
                years.push(current);
                current = addYears__default["default"](current, 1);
            }
            return years;
        };
        this.locale = locale;
        this.formats = Object.assign({}, defaultFormats, formats);
    }
    isBeforeMonth(value, comparing) {
        return isBefore__default["default"](value, startOfMonth__default["default"](comparing));
    }
    isAfterMonth(value, comparing) {
        return isAfter__default["default"](value, startOfMonth__default["default"](comparing));
    }
}

module.exports = DateFnsUtils;
