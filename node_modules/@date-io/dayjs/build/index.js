'use strict';

var defaultDayjs = require('dayjs');
var customParseFormatPlugin = require('dayjs/plugin/customParseFormat');
var localizedFormatPlugin = require('dayjs/plugin/localizedFormat');
var isBetweenPlugin = require('dayjs/plugin/isBetween');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var defaultDayjs__default = /*#__PURE__*/_interopDefaultLegacy(defaultDayjs);
var customParseFormatPlugin__default = /*#__PURE__*/_interopDefaultLegacy(customParseFormatPlugin);
var localizedFormatPlugin__default = /*#__PURE__*/_interopDefaultLegacy(localizedFormatPlugin);
var isBetweenPlugin__default = /*#__PURE__*/_interopDefaultLegacy(isBetweenPlugin);

defaultDayjs__default["default"].extend(customParseFormatPlugin__default["default"]);
defaultDayjs__default["default"].extend(localizedFormatPlugin__default["default"]);
defaultDayjs__default["default"].extend(isBetweenPlugin__default["default"]);
const withLocale = (dayjs, locale) => (!locale ? dayjs : (...args) => dayjs(...args).locale(locale));
const defaultFormats = {
    normalDateWithWeekday: "ddd, MMM D",
    normalDate: "D MMMM",
    shortDate: "MMM D",
    monthAndDate: "MMMM D",
    dayOfMonth: "D",
    year: "YYYY",
    month: "MMMM",
    monthShort: "MMM",
    monthAndYear: "MMMM YYYY",
    weekday: "dddd",
    weekdayShort: "ddd",
    minutes: "mm",
    hours12h: "hh",
    hours24h: "HH",
    seconds: "ss",
    fullTime: "LT",
    fullTime12h: "hh:mm A",
    fullTime24h: "HH:mm",
    fullDate: "ll",
    fullDateWithWeekday: "dddd, LL",
    fullDateTime: "lll",
    fullDateTime12h: "ll hh:mm A",
    fullDateTime24h: "ll HH:mm",
    keyboardDate: "L",
    keyboardDateTime: "L LT",
    keyboardDateTime12h: "L hh:mm A",
    keyboardDateTime24h: "L HH:mm",
};
class DayjsUtils {
    constructor({ locale, formats, instance } = {}) {
        this.lib = "dayjs";
        this.is12HourCycleInCurrentLocale = () => {
            var _a, _b, _c;
            /* istanbul ignore next */
            return /A|a/.test((_c = (_b = (_a = this.rawDayJsInstance.Ls[this.locale || "en"]) === null || _a === void 0 ? void 0 : _a.formats) === null || _b === void 0 ? void 0 : _b.LT) !== null && _c !== void 0 ? _c : "");
        };
        this.getCurrentLocaleCode = () => {
            return this.locale || "en";
        };
        this.getFormatHelperText = (format) => {
            var _a, _b;
            // @see https://github.com/iamkun/dayjs/blob/dev/src/plugin/localizedFormat/index.js
            var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?)|./g;
            return ((_b = (_a = format
                .match(localFormattingTokens)) === null || _a === void 0 ? void 0 : _a.map((token) => {
                var _a, _b;
                var firstCharacter = token[0];
                if (firstCharacter === "L") {
                    /* istanbul ignore next */
                    return ((_b = (_a = this.rawDayJsInstance.Ls[this.locale || "en"]) === null || _a === void 0 ? void 0 : _a.formats[token]) !== null && _b !== void 0 ? _b : token);
                }
                return token;
            }).join("").replace(/a/gi, "(a|p)m").toLocaleLowerCase()) !== null && _b !== void 0 ? _b : format);
        };
        this.parseISO = (isoString) => {
            return this.dayjs(isoString);
        };
        this.toISO = (value) => {
            return value.toISOString();
        };
        this.parse = (value, format) => {
            if (value === "") {
                return null;
            }
            return this.dayjs(value, format, this.locale, true);
        };
        this.date = (value) => {
            if (value === null) {
                return null;
            }
            return this.dayjs(value);
        };
        this.toJsDate = (value) => {
            return value.toDate();
        };
        this.isValid = (value) => {
            return this.dayjs(value).isValid();
        };
        this.isNull = (date) => {
            return date === null;
        };
        this.getDiff = (date, comparing, units) => {
            if (typeof comparing === "string") {
                comparing = this.dayjs(comparing);
            }
            if (!comparing.isValid()) {
                return 0;
            }
            return date.diff(comparing, units);
        };
        this.isAfter = (date, value) => {
            return date.isAfter(value);
        };
        this.isBefore = (date, value) => {
            return date.isBefore(value);
        };
        this.isAfterDay = (date, value) => {
            return date.isAfter(value, "day");
        };
        this.isBeforeDay = (date, value) => {
            return date.isBefore(value, "day");
        };
        this.isAfterMonth = (date, value) => {
            return date.isAfter(value, "month");
        };
        this.isBeforeMonth = (date, value) => {
            return date.isBefore(value, "month");
        };
        this.isBeforeYear = (date, value) => {
            return date.isBefore(value, "year");
        };
        this.isAfterYear = (date, value) => {
            return date.isAfter(value, "year");
        };
        this.startOfDay = (date) => {
            return date.startOf("day");
        };
        this.endOfDay = (date) => {
            return date.endOf("day");
        };
        this.format = (date, formatKey) => {
            return this.formatByString(date, this.formats[formatKey]);
        };
        this.formatByString = (date, formatString) => {
            return this.dayjs(date).format(formatString);
        };
        this.formatNumber = (numberToFormat) => {
            return numberToFormat;
        };
        this.getHours = (date) => {
            return date.hour();
        };
        this.addSeconds = (date, count) => {
            return count < 0
                ? date.subtract(Math.abs(count), "second")
                : date.add(count, "second");
        };
        this.addMinutes = (date, count) => {
            return count < 0
                ? date.subtract(Math.abs(count), "minute")
                : date.add(count, "minute");
        };
        this.addHours = (date, count) => {
            return count < 0
                ? date.subtract(Math.abs(count), "hour")
                : date.add(count, "hour");
        };
        this.addDays = (date, count) => {
            return count < 0
                ? date.subtract(Math.abs(count), "day")
                : date.add(count, "day");
        };
        this.addWeeks = (date, count) => {
            return count < 0
                ? date.subtract(Math.abs(count), "week")
                : date.add(count, "week");
        };
        this.addMonths = (date, count) => {
            return count < 0
                ? date.subtract(Math.abs(count), "month")
                : date.add(count, "month");
        };
        this.addYears = (date, count) => {
            return count < 0
                ? date.subtract(Math.abs(count), "year")
                : date.add(count, "year");
        };
        this.setMonth = (date, count) => {
            return date.set("month", count);
        };
        this.setHours = (date, count) => {
            return date.set("hour", count);
        };
        this.getMinutes = (date) => {
            return date.minute();
        };
        this.setMinutes = (date, count) => {
            return date.set("minute", count);
        };
        this.getSeconds = (date) => {
            return date.second();
        };
        this.setSeconds = (date, count) => {
            return date.set("second", count);
        };
        this.getMonth = (date) => {
            return date.month();
        };
        this.getDate = (date) => {
            return date.date();
        };
        this.setDate = (date, count) => {
            return date.set("date", count);
        };
        this.getDaysInMonth = (date) => {
            return date.daysInMonth();
        };
        this.isSameDay = (date, comparing) => {
            return date.isSame(comparing, "day");
        };
        this.isSameMonth = (date, comparing) => {
            return date.isSame(comparing, "month");
        };
        this.isSameYear = (date, comparing) => {
            return date.isSame(comparing, "year");
        };
        this.isSameHour = (date, comparing) => {
            return date.isSame(comparing, "hour");
        };
        this.getMeridiemText = (ampm) => {
            return ampm === "am" ? "AM" : "PM";
        };
        this.startOfYear = (date) => {
            return date.startOf("year");
        };
        this.endOfYear = (date) => {
            return date.endOf("year");
        };
        this.startOfMonth = (date) => {
            return date.startOf("month");
        };
        this.endOfMonth = (date) => {
            return date.endOf("month");
        };
        this.startOfWeek = (date) => {
            return date.startOf("week");
        };
        this.endOfWeek = (date) => {
            return date.endOf("week");
        };
        this.getNextMonth = (date) => {
            return date.add(1, "month");
        };
        this.getPreviousMonth = (date) => {
            return date.subtract(1, "month");
        };
        this.getMonthArray = (date) => {
            const firstMonth = date.startOf("year");
            const monthArray = [firstMonth];
            while (monthArray.length < 12) {
                const prevMonth = monthArray[monthArray.length - 1];
                monthArray.push(this.getNextMonth(prevMonth));
            }
            return monthArray;
        };
        this.getYear = (date) => {
            return date.year();
        };
        this.setYear = (date, year) => {
            return date.set("year", year);
        };
        this.mergeDateAndTime = (date, time) => {
            return date.hour(time.hour()).minute(time.minute()).second(time.second());
        };
        this.getWeekdays = () => {
            const start = this.dayjs().startOf("week");
            return [0, 1, 2, 3, 4, 5, 6].map((diff) => this.formatByString(start.add(diff, "day"), "dd"));
        };
        this.isEqual = (value, comparing) => {
            if (value === null && comparing === null) {
                return true;
            }
            return this.dayjs(value).isSame(comparing);
        };
        this.getWeekArray = (date) => {
            const start = this.dayjs(date).startOf("month").startOf("week");
            const end = this.dayjs(date).endOf("month").endOf("week");
            let count = 0;
            let current = start;
            const nestedWeeks = [];
            while (current.isBefore(end)) {
                const weekNumber = Math.floor(count / 7);
                nestedWeeks[weekNumber] = nestedWeeks[weekNumber] || [];
                nestedWeeks[weekNumber].push(current);
                current = current.add(1, "day");
                count += 1;
            }
            return nestedWeeks;
        };
        this.getYearRange = (start, end) => {
            const startDate = this.dayjs(start).startOf("year");
            const endDate = this.dayjs(end).endOf("year");
            const years = [];
            let current = startDate;
            while (current.isBefore(endDate)) {
                years.push(current);
                current = current.add(1, "year");
            }
            return years;
        };
        this.isWithinRange = (date, [start, end]) => {
            return date.isBetween(start, end, null, "[]");
        };
        this.rawDayJsInstance = instance || defaultDayjs__default["default"];
        this.dayjs = withLocale(this.rawDayJsInstance, locale);
        this.locale = locale;
        this.formats = Object.assign({}, defaultFormats, formats);
    }
}

module.exports = DayjsUtils;
