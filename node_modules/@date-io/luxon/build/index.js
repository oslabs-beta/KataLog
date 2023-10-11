'use strict';

var luxon = require('luxon');

const defaultFormats = {
    dayOfMonth: "d",
    fullDate: "DD",
    fullDateWithWeekday: "DDDD",
    fullDateTime: "ff",
    fullDateTime12h: "DD, hh:mm a",
    fullDateTime24h: "DD, T",
    fullTime: "t",
    fullTime12h: "hh:mm a",
    fullTime24h: "HH:mm",
    hours12h: "hh",
    hours24h: "HH",
    keyboardDate: "D",
    keyboardDateTime: "D t",
    keyboardDateTime12h: "D hh:mm a",
    keyboardDateTime24h: "D T",
    minutes: "mm",
    seconds: "ss",
    month: "LLLL",
    monthAndDate: "MMMM d",
    monthAndYear: "LLLL yyyy",
    monthShort: "MMM",
    weekday: "cccc",
    weekdayShort: "ccc",
    normalDate: "d MMMM",
    normalDateWithWeekday: "EEE, MMM d",
    shortDate: "MMM d",
    year: "yyyy",
};
class LuxonUtils {
    constructor({ locale, formats, } = {}) {
        this.lib = "luxon";
        this.date = (value) => {
            if (typeof value === "undefined") {
                return luxon.DateTime.local();
            }
            if (value === null) {
                return null;
            }
            if (typeof value === "string") {
                return luxon.DateTime.fromJSDate(new Date(value), { locale: this.locale });
            }
            if (luxon.DateTime.isDateTime(value)) {
                return value;
            }
            return luxon.DateTime.fromJSDate(value, { locale: this.locale });
        };
        this.toJsDate = (value) => {
            return value.toJSDate();
        };
        this.parseISO = (isoString) => {
            return luxon.DateTime.fromISO(isoString);
        };
        this.toISO = (value) => {
            return value.toISO({ format: "extended" });
        };
        this.parse = (value, formatString) => {
            if (value === "") {
                return null;
            }
            return luxon.DateTime.fromFormat(value, formatString, { locale: this.locale });
        };
        /* istanbul ignore next */
        this.is12HourCycleInCurrentLocale = () => {
            var _a, _b;
            if (typeof Intl === "undefined" || typeof Intl.DateTimeFormat === "undefined") {
                return true; // Luxon defaults to en-US if Intl not found
            }
            return Boolean((_b = (_a = new Intl.DateTimeFormat(this.locale, { hour: "numeric" })) === null || _a === void 0 ? void 0 : _a.resolvedOptions()) === null || _b === void 0 ? void 0 : _b.hour12);
        };
        this.getFormatHelperText = (format) => {
            // Unfortunately there is no way for luxon to retrieve readable formats from localized format
            return "";
        };
        /* istanbul ignore next */
        this.getCurrentLocaleCode = () => {
            return this.locale || luxon.Settings.defaultLocale;
        };
        this.addSeconds = (date, count) => {
            return date.plus({ seconds: count });
        };
        this.addMinutes = (date, count) => {
            return date.plus({ minutes: count });
        };
        this.addHours = (date, count) => {
            return date.plus({ hours: count });
        };
        this.addDays = (date, count) => {
            return date.plus({ days: count });
        };
        this.addWeeks = (date, count) => {
            return date.plus({ weeks: count });
        };
        this.addMonths = (date, count) => {
            return date.plus({ months: count });
        };
        this.addYears = (date, count) => {
            return date.plus({ years: count });
        };
        this.isValid = (value) => {
            var _a, _b;
            if (luxon.DateTime.isDateTime(value)) {
                return value.isValid;
            }
            if (value === null) {
                return false;
            }
            return (_b = (_a = this.date(value)) === null || _a === void 0 ? void 0 : _a.isValid) !== null && _b !== void 0 ? _b : false;
        };
        this.isEqual = (value, comparing) => {
            var _a, _b;
            if (value === null && comparing === null) {
                return true;
            }
            // make sure that null will not be passed to this.date
            if (value === null || comparing === null) {
                return false;
            }
            if (!this.date(comparing)) {
                /* istanbul ignore next */
                return false;
            }
            return (_b = (_a = this.date(value)) === null || _a === void 0 ? void 0 : _a.equals(this.date(comparing))) !== null && _b !== void 0 ? _b : false;
        };
        this.isSameDay = (date, comparing) => {
            return date.hasSame(comparing, "day");
        };
        this.isSameMonth = (date, comparing) => {
            return date.hasSame(comparing, "month");
        };
        this.isSameYear = (date, comparing) => {
            return date.hasSame(comparing, "year");
        };
        this.isSameHour = (date, comparing) => {
            return date.hasSame(comparing, "hour");
        };
        this.isAfter = (value, comparing) => {
            return value > comparing;
        };
        this.isBefore = (value, comparing) => {
            return value < comparing;
        };
        this.isBeforeDay = (value, comparing) => {
            const diff = value.diff(comparing.startOf("day"), "days").toObject();
            return diff.days < 0;
        };
        this.isAfterDay = (value, comparing) => {
            const diff = value.diff(comparing.endOf("day"), "days").toObject();
            return diff.days > 0;
        };
        this.isBeforeMonth = (value, comparing) => {
            const diff = value.diff(comparing.startOf("month"), "months").toObject();
            return diff.months < 0;
        };
        this.isAfterMonth = (value, comparing) => {
            const diff = value.diff(comparing.startOf("month"), "months").toObject();
            return diff.months > 0;
        };
        this.isBeforeYear = (value, comparing) => {
            const diff = value.diff(comparing.startOf("year"), "years").toObject();
            return diff.years < 0;
        };
        this.isAfterYear = (value, comparing) => {
            const diff = value.diff(comparing.endOf("year"), "years").toObject();
            return diff.years > 0;
        };
        this.getDiff = (value, comparing, unit) => {
            if (typeof comparing === "string") {
                comparing = luxon.DateTime.fromJSDate(new Date(comparing));
            }
            if (!comparing.isValid) {
                return 0;
            }
            if (unit) {
                return Math.floor(value.diff(comparing).as(unit));
            }
            return value.diff(comparing).as("millisecond");
        };
        this.startOfDay = (value) => {
            return value.startOf("day");
        };
        this.endOfDay = (value) => {
            return value.endOf("day");
        };
        this.format = (date, formatKey) => {
            return this.formatByString(date, this.formats[formatKey]);
        };
        this.formatByString = (date, format) => {
            return date.setLocale(this.locale).toFormat(format);
        };
        this.formatNumber = (numberToFormat) => {
            return numberToFormat;
        };
        this.getHours = (value) => {
            return value.get("hour");
        };
        this.setHours = (value, count) => {
            return value.set({ hour: count });
        };
        this.getMinutes = (value) => {
            return value.get("minute");
        };
        this.setMinutes = (value, count) => {
            return value.set({ minute: count });
        };
        this.getSeconds = (value) => {
            return value.get("second");
        };
        this.setSeconds = (value, count) => {
            return value.set({ second: count });
        };
        this.getMonth = (value) => {
            // See https://github.com/moment/luxon/blob/master/docs/moment.md#major-functional-differences
            return value.get("month") - 1;
        };
        this.getDaysInMonth = (value) => {
            return value.daysInMonth;
        };
        this.setMonth = (value, count) => {
            return value.set({ month: count + 1 });
        };
        this.getYear = (value) => {
            return value.get("year");
        };
        this.setYear = (value, year) => {
            return value.set({ year });
        };
        this.getDate = (value) => {
            return value.get("day");
        };
        this.setDate = (value, day) => {
            return value.set({ day });
        };
        this.mergeDateAndTime = (date, time) => {
            return date.set({
                second: time.second,
                hour: time.hour,
                minute: time.minute,
            });
        };
        this.startOfYear = (value) => {
            return value.startOf("year");
        };
        this.endOfYear = (value) => {
            return value.endOf("year");
        };
        this.startOfMonth = (value) => {
            return value.startOf("month");
        };
        this.endOfMonth = (value) => {
            return value.endOf("month");
        };
        this.startOfWeek = (value) => {
            return value.startOf("week");
        };
        this.endOfWeek = (value) => {
            return value.endOf("week");
        };
        this.getNextMonth = (value) => {
            return value.plus({ months: 1 });
        };
        this.getPreviousMonth = (value) => {
            return value.minus({ months: 1 });
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
        this.getWeekdays = () => {
            return luxon.Info.weekdaysFormat("short", { locale: this.locale });
        };
        this.getWeekArray = (date) => {
            const { days } = date
                .endOf("month")
                .endOf("week")
                .diff(date.startOf("month").startOf("week"), "days")
                .toObject();
            const weeks = [];
            new Array(Math.round(days))
                .fill(0)
                .map((_, i) => i)
                .map((day) => date.startOf("month").startOf("week").plus({ days: day }))
                .forEach((v, i) => {
                if (i === 0 || (i % 7 === 0 && i > 6)) {
                    weeks.push([v]);
                    return;
                }
                weeks[weeks.length - 1].push(v);
            });
            return weeks;
        };
        this.getYearRange = (start, end) => {
            const startDate = start.startOf("year");
            const endDate = end.endOf("year");
            let current = startDate;
            const years = [];
            while (current < endDate) {
                years.push(current);
                current = current.plus({ year: 1 });
            }
            return years;
        };
        this.getMeridiemText = (ampm) => {
            return luxon.Info.meridiems({ locale: this.locale }).find((v) => v.toLowerCase() === ampm.toLowerCase());
        };
        this.isNull = (date) => {
            return date === null;
        };
        this.isWithinRange = (date, [start, end]) => {
            return (date.equals(start) ||
                date.equals(end) ||
                (this.isAfter(date, start) && this.isBefore(date, end)));
        };
        this.locale = locale || "en-US";
        this.formats = Object.assign({}, defaultFormats, formats);
    }
}

module.exports = LuxonUtils;
