import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _extends from "@babel/runtime/helpers/esm/extends";
// TODO: Improve and test with different calendars (move to date-io ?)
export var getDateSectionNameFromFormatToken = function getDateSectionNameFromFormatToken(utils, formatToken) {
  var dateSectionName = utils.formatTokenMap[formatToken];

  if (dateSectionName == null) {
    throw new Error("getDatePartNameFromFormat doesn't understand the format ".concat(formatToken));
  }

  return dateSectionName;
};

var getDeltaFromKeyCode = function getDeltaFromKeyCode(keyCode) {
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

export var adjustDateSectionValue = function adjustDateSectionValue(utils, date, dateSectionName, keyCode) {
  var delta = getDeltaFromKeyCode(keyCode);
  var isStart = keyCode === 'Home';
  var isEnd = keyCode === 'End';

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
export var adjustInvalidDateSectionValue = function adjustInvalidDateSectionValue(utils, section, keyCode) {
  var today = utils.date();
  var delta = getDeltaFromKeyCode(keyCode);
  var isStart = keyCode === 'Home';
  var isEnd = keyCode === 'End';
  var shouldSetAbsolute = section.value === '' || isStart || isEnd;

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
        var newDate;

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
        var _newDate;

        if (shouldSetAbsolute) {
          if (delta > 0 || isEnd) {
            _newDate = utils.endOfMonth(today);
          } else {
            _newDate = utils.startOfMonth(today);
          }
        } else {
          _newDate = utils.addDays(utils.parse(section.value, section.formatValue), delta);
        }

        return utils.formatByString(_newDate, section.formatValue);
      }

    case 'am-pm':
      {
        var am = utils.formatByString(utils.startOfDay(today), section.formatValue);
        var pm = utils.formatByString(utils.endOfDay(today), section.formatValue);

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
        var _newDate2;

        if (shouldSetAbsolute) {
          if (delta > 0 || isEnd) {
            _newDate2 = utils.endOfDay(today);
          } else {
            _newDate2 = utils.startOfDay(today);
          }
        } else {
          _newDate2 = utils.addHours(utils.setHours(today, Number(section.value)), delta);
        }

        return utils.formatByString(_newDate2, section.formatValue);
      }

    case 'minute':
      {
        var _newDate3;

        if (section.value === '') {
          // TODO: Add startOfHour and endOfHours to adapters to avoid hard-coding those values
          var newNumericValue = delta > 0 || isEnd ? 59 : 0;
          _newDate3 = utils.setMinutes(today, newNumericValue);
        } else {
          _newDate3 = utils.addMinutes(utils.setMinutes(today, Number(section.value)), delta);
        }

        return utils.formatByString(_newDate3, section.formatValue);
      }

    case 'second':
      {
        var _newDate4;

        if (section.value === '') {
          // TODO: Add startOfMinute and endOfMinute to adapters to avoid hard-coding those values
          var _newNumericValue = delta > 0 || isEnd ? 59 : 0;

          _newDate4 = utils.setSeconds(today, _newNumericValue);
        } else {
          _newDate4 = utils.addSeconds(utils.setSeconds(today, Number(section.value)), delta);
        }

        return utils.formatByString(_newDate4, section.formatValue);
      }

    default:
      {
        throw new Error("Invalid date section name");
      }
  }
};
export var getSectionVisibleValue = function getSectionVisibleValue(section) {
  return section.value || section.emptyValue;
};
export var addPositionPropertiesToSections = function addPositionPropertiesToSections(sections) {
  var position = 0;
  var newSections = [];

  for (var i = 0; i < sections.length; i += 1) {
    var _section$separator$le, _section$separator;

    var section = sections[i];
    var end = position + getSectionVisibleValue(section).length + ((_section$separator$le = (_section$separator = section.separator) == null ? void 0 : _section$separator.length) != null ? _section$separator$le : 0);
    newSections.push(_extends({}, section, {
      start: position,
      end: end
    }));
    position = end;
  }

  return newSections;
};

var formatDateWithPlaceholder = function formatDateWithPlaceholder(utils, date, format) {
  if (date == null) {
    return '';
  }

  return utils.formatByString(date, format);
};

export var splitFormatIntoSections = function splitFormatIntoSections(utils, format, date) {
  var currentTokenValue = '';
  var sections = [];
  var expandedFormat = utils.expandFormat(format);

  for (var i = 0; i < expandedFormat.length; i += 1) {
    var char = expandedFormat[i];

    if (!char.match(/([A-zÀ-ú]+)/g)) {
      if (currentTokenValue === '') {
        sections[sections.length - 1].separator += char;
      } else {
        var dateForCurrentToken = formatDateWithPlaceholder(utils, date, currentTokenValue);

        if (dateForCurrentToken === currentTokenValue) {
          sections[sections.length - 1].separator += currentTokenValue;
          currentTokenValue = '';
        } else {
          var dateSectionName = getDateSectionNameFromFormatToken(utils, currentTokenValue);
          sections.push({
            formatValue: currentTokenValue,
            value: dateForCurrentToken,
            emptyValue: dateSectionName,
            dateSectionName: dateSectionName,
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
      var _dateForCurrentToken = formatDateWithPlaceholder(utils, date, currentTokenValue);

      if (_dateForCurrentToken === currentTokenValue) {
        sections[sections.length - 1].separator += currentTokenValue;
      } else {
        var _dateSectionName = getDateSectionNameFromFormatToken(utils, currentTokenValue);

        sections.push({
          formatValue: currentTokenValue,
          value: _dateForCurrentToken,
          emptyValue: _dateSectionName,
          dateSectionName: _dateSectionName,
          separator: null,
          query: null
        });
      }
    }
  }

  return sections;
};
export var createDateStrFromSections = function createDateStrFromSections(sections) {
  return sections.map(function (section) {
    var sectionValueStr = getSectionVisibleValue(section);

    if (section.separator != null) {
      sectionValueStr += section.separator;
    }

    return sectionValueStr;
  }).join('');
};
export var setSectionValue = function setSectionValue(sections, sectionIndex, sectionNewValue, sectionNewQuery) {
  var newSections = _toConsumableArray(sections);

  var modifiedSection = _extends({}, newSections[sectionIndex], {
    value: sectionNewValue
  });

  if (sectionNewQuery !== undefined) {
    modifiedSection.query = sectionNewQuery;
  }

  newSections[sectionIndex] = modifiedSection;
  return addPositionPropertiesToSections(newSections);
};
export var getMonthsMatchingQuery = function getMonthsMatchingQuery(utils, format, query) {
  var monthList = utils.getMonthArray(utils.date()).map(function (month) {
    return utils.formatByString(month, format);
  });
  return monthList.filter(function (month) {
    return month.toLowerCase().startsWith(query);
  });
};
export var getSectionValueNumericBoundaries = function getSectionValueNumericBoundaries(utils, date, dateSectionName) {
  var dateWithFallback = utils.isValid(date) ? date : utils.date();
  var endOfYear = utils.endOfYear(dateWithFallback);

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
export var cleanTrailingZeroInNumericSectionValue = function cleanTrailingZeroInNumericSectionValue(value, maximum) {
  var maximumStr = maximum.toString();
  var cleanValue = value; // We remove the trailing zeros

  cleanValue = Number(cleanValue).toString(); // We add enough trailing zeros to fill the section

  while (cleanValue.length < maximumStr.length) {
    cleanValue = "0".concat(cleanValue);
  }

  return cleanValue;
};