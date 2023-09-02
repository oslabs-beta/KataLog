import defaultMoment from 'moment';

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
class MomentUtils {
    constructor({ locale, formats, instance } = {}) {
        this.lib = "moment";
        this.is12HourCycleInCurrentLocale = () => {
            return /A|a/.test(this.moment.localeData(this.getCurrentLocaleCode()).longDateFormat("LT"));
        };
        this.getFormatHelperText = (format) => {
            var _a, _b;
            // @see https://github.com/moment/moment/blob/develop/src/lib/format/format.js#L6
            const localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})|./g;
            return ((_b = (_a = format
                .match(localFormattingTokens)) === null || _a === void 0 ? void 0 : _a.map((token) => {
                const firstCharacter = token[0];
                if (firstCharacter === "L" || firstCharacter === ";") {
                    return this.moment
                        .localeData(this.getCurrentLocaleCode())
                        .longDateFormat(token);
                }
                return token;
            }).join("").replace(/a/gi, "(a|p)m").toLocaleLowerCase()) !== null && _b !== void 0 ? _b : format);
        };
        this.getCurrentLocaleCode = () => {
            return this.locale || this.moment.locale();
        };
        this.parseISO = (isoString) => {
            return this.moment(isoString, true);
        };
        this.toISO = (value) => {
            return value.toISOString();
        };
        this.parse = (value, format) => {
            if (value === "") {
                return null;
            }
            if (this.locale) {
                return this.moment(value, format, this.locale, true);
            }
            return this.moment(value, format, true);
        };
        this.date = (value) => {
            if (value === null) {
                return null;
            }
            const moment = this.moment(value);
            if (this.locale) {
                moment.locale(this.locale);
            }
            return moment;
        };
        this.toJsDate = (value) => {
            return value.toDate();
        };
        this.isValid = (value) => {
            return this.moment(value).isValid();
        };
        this.isNull = (date) => {
            return date === null;
        };
        this.getDiff = (date, comparing, unit) => {
            if (!this.moment(comparing).isValid()) {
                return 0;
            }
            return date.diff(comparing, unit);
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
        this.isBeforeMonth = (date, value) => {
            return date.isBefore(value, "month");
        };
        this.isAfterMonth = (date, value) => {
            return date.isAfter(value, "month");
        };
        this.isBeforeYear = (date, value) => {
            return date.isBefore(value, "year");
        };
        this.isAfterYear = (date, value) => {
            return date.isAfter(value, "year");
        };
        this.startOfDay = (date) => {
            return date.clone().startOf("day");
        };
        this.endOfDay = (date) => {
            return date.clone().endOf("day");
        };
        this.format = (date, formatKey) => {
            return this.formatByString(date, this.formats[formatKey]);
        };
        this.formatByString = (date, formatString) => {
            const clonedDate = date.clone();
            if (this.locale) {
                clonedDate.locale(this.locale);
            }
            return clonedDate.format(formatString);
        };
        this.formatNumber = (numberToFormat) => {
            return numberToFormat;
        };
        this.getHours = (date) => {
            return date.get("hours");
        };
        this.addSeconds = (date, count) => {
            return count < 0
                ? date.clone().subtract(Math.abs(count), "seconds")
                : date.clone().add(count, "seconds");
        };
        this.addMinutes = (date, count) => {
            return count < 0
                ? date.clone().subtract(Math.abs(count), "minutes")
                : date.clone().add(count, "minutes");
        };
        this.addHours = (date, count) => {
            return count < 0
                ? date.clone().subtract(Math.abs(count), "hours")
                : date.clone().add(count, "hours");
        };
        this.addDays = (date, count) => {
            return count < 0
                ? date.clone().subtract(Math.abs(count), "days")
                : date.clone().add(count, "days");
        };
        this.addWeeks = (date, count) => {
            return count < 0
                ? date.clone().subtract(Math.abs(count), "weeks")
                : date.clone().add(count, "weeks");
        };
        this.addMonths = (date, count) => {
            return count < 0
                ? date.clone().subtract(Math.abs(count), "months")
                : date.clone().add(count, "months");
        };
        this.addYears = (date, count) => {
            return count < 0
                ? date.clone().subtract(Math.abs(count), "years")
                : date.clone().add(count, "years");
        };
        this.setHours = (date, count) => {
            return date.clone().hours(count);
        };
        this.getMinutes = (date) => {
            return date.get("minutes");
        };
        this.setMinutes = (date, count) => {
            return date.clone().minutes(count);
        };
        this.getSeconds = (date) => {
            return date.get("seconds");
        };
        this.setSeconds = (date, count) => {
            return date.clone().seconds(count);
        };
        this.getMonth = (date) => {
            return date.get("month");
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
        this.setMonth = (date, count) => {
            return date.clone().month(count);
        };
        this.getMeridiemText = (ampm) => {
            if (this.is12HourCycleInCurrentLocale()) {
                // AM/PM translation only possible in those who have 12 hour cycle in locale.
                return this.moment
                    .localeData(this.getCurrentLocaleCode())
                    .meridiem(ampm === "am" ? 0 : 13, 0, false);
            }
            return ampm === "am" ? "AM" : "PM"; // fallback for de, ru, ...etc
        };
        this.startOfYear = (date) => {
            return date.clone().startOf("year");
        };
        this.endOfYear = (date) => {
            return date.clone().endOf("year");
        };
        this.startOfMonth = (date) => {
            return date.clone().startOf("month");
        };
        this.endOfMonth = (date) => {
            return date.clone().endOf("month");
        };
        this.startOfWeek = (date) => {
            return date.clone().startOf("week");
        };
        this.endOfWeek = (date) => {
            return date.clone().endOf("week");
        };
        this.getNextMonth = (date) => {
            return date.clone().add(1, "month");
        };
        this.getPreviousMonth = (date) => {
            return date.clone().subtract(1, "month");
        };
        this.getMonthArray = (date) => {
            const firstMonth = date.clone().startOf("year");
            const monthArray = [firstMonth];
            while (monthArray.length < 12) {
                const prevMonth = monthArray[monthArray.length - 1];
                monthArray.push(this.getNextMonth(prevMonth));
            }
            return monthArray;
        };
        this.getYear = (date) => {
            return date.get("year");
        };
        this.setYear = (date, year) => {
            return date.clone().set("year", year);
        };
        this.getDate = (date) => {
            return date.get("date");
        };
        this.setDate = (date, year) => {
            return date.clone().set("date", year);
        };
        this.mergeDateAndTime = (date, time) => {
            return date.hour(time.hour()).minute(time.minute()).second(time.second());
        };
        this.getWeekdays = () => {
            return this.moment.weekdaysShort(true);
        };
        this.isEqual = (value, comparing) => {
            if (value === null && comparing === null) {
                return true;
            }
            return this.moment(value).isSame(comparing);
        };
        this.getWeekArray = (date) => {
            const start = date.clone().startOf("month").startOf("week");
            const end = date.clone().endOf("month").endOf("week");
            let count = 0;
            let current = start;
            const nestedWeeks = [];
            while (current.isBefore(end)) {
                const weekNumber = Math.floor(count / 7);
                nestedWeeks[weekNumber] = nestedWeeks[weekNumber] || [];
                nestedWeeks[weekNumber].push(current);
                current = current.clone().add(1, "day");
                count += 1;
            }
            return nestedWeeks;
        };
        this.getYearRange = (start, end) => {
            const startDate = this.moment(start).startOf("year");
            const endDate = this.moment(end).endOf("year");
            const years = [];
            let current = startDate;
            while (current.isBefore(endDate)) {
                years.push(current);
                current = current.clone().add(1, "year");
            }
            return years;
        };
        this.isWithinRange = (date, [start, end]) => {
            return date.isBetween(start, end, null, "[]");
        };
        this.moment = instance || defaultMoment;
        this.locale = locale;
        this.formats = Object.assign({}, defaultFormats, formats);
    }
}

export { MomentUtils as default };
