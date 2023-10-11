"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.splitFormatIntoSections = exports.setSectionValue = exports.getSectionVisibleValue = exports.getSectionValueNumericBoundaries = exports.getMonthsMatchingQuery = exports.getDateSectionNameFromFormatToken = exports.createDateStrFromSections = exports.cleanTrailingZeroInNumericSectionValue = exports.adjustInvalidDateSectionValue = exports.adjustDateSectionValue = exports.addPositionPropertiesToSections = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

// TODO: Improve and test with different calendars (move to date-io ?)
const getDateSectionNameFromFormatToken = (utils, formatToken) => {
  const dateSectionName = utils.formatTokenMap[formatToken];

  if (dateSectionName == null) {
    throw new Error(`getDatePartNameFromFormat doesn't understand the format ${formatToken}`);
  }

  return dateSectionName;
};

exports.getDateSectionNameFromFormatToken = getDateSectionNameFromFormatToken;

const getDeltaFromKeyCode = keyCode => {
  switch (keyCode) {
    case 'ArrowUp':
      return 1;

    case 'ArrowDown':
      return -1;

    case 'PageUp':
      return 5;

    case 'PageDown':
      return -5;

    default:
      return 0;
  }
};

const adjustDateSectionValue = (utils, date, dateSectionName, keyCode) => {
  const delta = getDeltaFromKeyCode(keyCode);
  const isStart = keyCode === 'Home';
  const isEnd = keyCode === 'End';

  switch (dateSectionName) {
    case 'day':
      {
        if (isStart) {
          return utils.startOfMonth(date);
        }

        if (isEnd) {
          return utils.endOfMonth(date);
        }

        return utils.addDays(date, delta);
      }

    case 'month':
      {
        if (isStart) {
          return utils.startOfYear(date);
        }

        if (isEnd) {
          return utils.endOfYear(date);
        }

        return utils.addMonths(date, delta);
      }

    case 'year':
      {
        return utils.addYears(date, delta);
      }

    case 'am-pm':
      {
        return utils.addHours(date, (delta > 0 ? 1 : -1) * 12);
      }

    case 'hour':
      {
        if (isStart) {
          return utils.startOfDay(date);
        }

        if (isEnd) {
          return utils.endOfDay(date);
        }

        return utils.addHours(date, delta);
      }

    case 'minute':
      {
        if (isStart) {
          return utils.setMinutes(date, 0);
        }

        if (isEnd) {
          return utils.setMinutes(date, 59);
        }

        return utils.addMinutes(date, delta);
      }

    case 'second':
      {
        if (isStart) {
          return utils.setSeconds(date, 0);
        }

        if (isEnd) {
          return utils.setSeconds(date, 59);
        }

        return utils.addSeconds(date, delta);
      }

    default:
      {
        return date;
      }
  }
};

exports.adjustDateSectionValue = adjustDateSectionValue;

const adjustInvalidDateSectionValue = (utils, section, keyCode) => {
  const today = utils.date();
  const delta = getDeltaFromKeyCode(keyCode);
  const isStart = keyCode === 'Home';
  const isEnd = keyCode === 'End';
  const shouldSetAbsolute = section.value === '' || isStart || isEnd;

  switch (section.dateSectionName) {
    case 'year':
      {
        if (section.value === '') {
          return utils.formatByString(today, section.formatValue);
        }

        return utils.formatByString(utils.setYear(today, Number(section.value) + delta), section.formatValue);
      }

    case 'month':
      {
        let newDate;

        if (shouldSetAbsolute) {
          if (delta > 0 || isEnd) {
            newDate = utils.endOfYear(today);
          } else {
            newDate = utils.startOfYear(today);
          }
        } else {
          newDate = utils.addMonths(utils.parse(section.value, section.formatValue), delta);
        }

        return utils.formatByString(newDate, section.formatValue);
      }

    case 'day':
      {
        let newDate;

        if (shouldSetAbsolute) {
          if (delta > 0 || isEnd) {
            newDate = utils.endOfMonth(today);
          } else {
            newDate = utils.startOfMonth(today);
          }
        } else {
          newDate = utils.addDays(utils.parse(section.value, section.formatValue), delta);
        }

        return utils.formatByString(newDate, section.formatValue);
      }

    case 'am-pm':
      {
        const am = utils.formatByString(utils.startOfDay(today), section.formatValue);
        const pm = utils.formatByString(utils.endOfDay(today), section.formatValue);

        if (section.value === '') {
          if (delta > 0 || isEnd) {
            return pm;
          }

          return am;
        }

        if (section.value === am) {
          return pm;
        }

        return am;
      }

    case 'hour':
      {
        let newDate;

        if (shouldSetAbsolute) {
          if (delta > 0 || isEnd) {
            newDate = utils.endOfDay(today);
          } else {
            newDate = utils.startOfDay(today);
          }
        } else {
          newDate = utils.addHours(utils.setHours(today, Number(section.value)), delta);
        }

        return utils.formatByString(newDate, section.formatValue);
      }

    case 'minute':
      {
        let newDate;

        if (section.value === '') {
          // TODO: Add startOfHour and endOfHours to adapters to avoid hard-coding those values
          const newNumericValue = delta > 0 || isEnd ? 59 : 0;
          newDate = utils.setMinutes(today, newNumericValue);
        } else {
          newDate = utils.addMinutes(utils.setMinutes(today, Number(section.value)), delta);
        }

        return utils.formatByString(newDate, section.formatValue);
      }

    case 'second':
      {
        let newDate;

        if (section.value === '') {
          // TODO: Add startOfMinute and endOfMinute to adapters to avoid hard-coding those values
          const newNumericValue = delta > 0 || isEnd ? 59 : 0;
          newDate = utils.setSeconds(today, newNumericValue);
        } else {
          newDate = utils.addSeconds(utils.setSeconds(today, Number(section.value)), delta);
        }

        return utils.formatByString(newDate, section.formatValue);
      }

    default:
      {
        throw new Error(`Invalid date section name`);
      }
  }
};

exports.adjustInvalidDateSectionValue = adjustInvalidDateSectionValue;

const getSectionVisibleValue = section => section.value || section.emptyValue;

exports.getSectionVisibleValue = getSectionVisibleValue;

const addPositionPropertiesToSections = sections => {
  let position = 0;
  const newSections = [];

  for (let i = 0; i < sections.length; i += 1) {
    var _section$separator$le, _section$separator;

    const section = sections[i];
    const end = position + getSectionVisibleValue(section).length + ((_section$separator$le = (_section$separator = section.separator) == null ? void 0 : _section$separator.length) != null ? _section$separator$le : 0);
    newSections.push((0, _extends2.default)({}, section, {
      start: position,
      end
    }));
    position = end;
  }

  return newSections;
};

exports.addPositionPropertiesToSections = addPositionPropertiesToSections;

const formatDateWithPlaceholder = (utils, date, format) => {
  if (date == null) {
    return '';
  }

  return utils.formatByString(date, format);
};

const splitFormatIntoSections = (utils, format, date) => {
  let currentTokenValue = '';
  const sections = [];
  const expandedFormat = utils.expandFormat(format);

  for (let i = 0; i < expandedFormat.length; i += 1) {
    const char = expandedFormat[i];

    if (!char.match(/([A-zÀ-ú]+)/g)) {
      if (currentTokenValue === '') {
        sections[sections.length - 1].separator += char;
      } else {
        const dateForCurrentToken = formatDateWithPlaceholder(utils, date, currentTokenValue);

        if (dateForCurrentToken === currentTokenValue) {
          sections[sections.length - 1].separator += currentTokenValue;
          currentTokenValue = '';
        } else {
          const dateSectionName = getDateSectionNameFromFormatToken(utils, currentTokenValue);
          sections.push({
            formatValue: currentTokenValue,
            value: dateForCurrentToken,
            emptyValue: dateSectionName,
            dateSectionName,
            separator: char,
            query: null
          });
          currentTokenValue = '';
        }
      }
    } else {
      currentTokenValue += char;
    }

    if (i === expandedFormat.length - 1) {
      const dateForCurrentToken = formatDateWithPlaceholder(utils, date, currentTokenValue);

      if (dateForCurrentToken === currentTokenValue) {
        sections[sections.length - 1].separator += currentTokenValue;
      } else {
        const dateSectionName = getDateSectionNameFromFormatToken(utils, currentTokenValue);
        sections.push({
          formatValue: currentTokenValue,
          value: dateForCurrentToken,
          emptyValue: dateSectionName,
          dateSectionName,
          separator: null,
          query: null
        });
      }
    }
  }

  return sections;
};

exports.splitFormatIntoSections = splitFormatIntoSections;

const createDateStrFromSections = sections => sections.map(section => {
  let sectionValueStr = getSectionVisibleValue(section);

  if (section.separator != null) {
    sectionValueStr += section.separator;
  }

  return sectionValueStr;
}).join('');

exports.createDateStrFromSections = createDateStrFromSections;

const setSectionValue = (sections, sectionIndex, sectionNewValue, sectionNewQuery) => {
  const newSections = [...sections];
  const modifiedSection = (0, _extends2.default)({}, newSections[sectionIndex], {
    value: sectionNewValue
  });

  if (sectionNewQuery !== undefined) {
    modifiedSection.query = sectionNewQuery;
  }

  newSections[sectionIndex] = modifiedSection;
  return addPositionPropertiesToSections(newSections);
};

exports.setSectionValue = setSectionValue;

const getMonthsMatchingQuery = (utils, format, query) => {
  const monthList = utils.getMonthArray(utils.date()).map(month => utils.formatByString(month, format));
  return monthList.filter(month => month.toLowerCase().startsWith(query));
};

exports.getMonthsMatchingQuery = getMonthsMatchingQuery;

const getSectionValueNumericBoundaries = (utils, date, dateSectionName) => {
  const dateWithFallback = utils.isValid(date) ? date : utils.date();
  const endOfYear = utils.endOfYear(dateWithFallback);

  switch (dateSectionName) {
    case 'day':
      return {
        minimum: 1,
        maximum: utils.getDaysInMonth(dateWithFallback)
      };

    case 'month':
      {
        return {
          minimum: 1,
          maximum: utils.getMonth(endOfYear) + 1
        };
      }

    case 'year':
      return {
        minimum: 1,
        maximum: 9999
      };

    case 'hour':
      {
        return {
          minimum: 0,
          maximum: utils.getHours(endOfYear)
        };
      }

    case 'minute':
      {
        return {
          minimum: 0,
          maximum: utils.getMinutes(endOfYear)
        };
      }

    case 'second':
      {
        return {
          minimum: 0,
          maximum: utils.getSeconds(endOfYear)
        };
      }

    default:
      {
        return {
          minimum: 0,
          maximum: 0
        };
      }
  }
};

exports.getSectionValueNumericBoundaries = getSectionValueNumericBoundaries;

const cleanTrailingZeroInNumericSectionValue = (value, maximum) => {
  const maximumStr = maximum.toString();
  let cleanValue = value; // We remove the trailing zeros

  cleanValue = Number(cleanValue).toString(); // We add enough trailing zeros to fill the section

  while (cleanValue.length < maximumStr.length) {
    cleanValue = `0${cleanValue}`;
  }

  return cleanValue;
};

exports.cleanTrailingZeroInNumericSectionValue = cleanTrailingZeroInNumericSectionValue;