import { getPickersLocalization } from './utils/getPickersLocalization';
var views = {
  // maps TimeView to its translation
  hours: 'гадзіны',
  minutes: 'хвіліны',
  seconds: 'секунды',
  // maps PickersToolbar["viewType"] to its translation
  calendar: 'календара',
  clock: 'часу'
};
var beBYPickers = {
  // Calendar navigation
  previousMonth: 'Папярэдні месяц',
  nextMonth: 'Наступны месяц',
  // View navigation
  openPreviousView: 'адкрыць папярэдні выгляд',
  openNextView: 'адкрыць наступны выгляд',
  calendarViewSwitchingButtonAriaLabel: function calendarViewSwitchingButtonAriaLabel(view) {
    return view === 'year' ? 'гадавы выгляд адкрыты, перайсці да каляндарнага выгляду' : 'каляндарны выгляд адкрыты, перайсці да гадавога выгляду';
  },
  inputModeToggleButtonAriaLabel: function inputModeToggleButtonAriaLabel(isKeyboardInputOpen, viewType) {
    return isKeyboardInputOpen ? "\u0442\u044D\u043A\u0441\u0442\u0430\u0432\u0430\u0435 \u043F\u043E\u043B\u0435 \u0430\u0434\u043A\u0440\u044B\u0442\u0430, \u043F\u0435\u0440\u0430\u0439\u0441\u0446\u0456 \u0434\u0430 \u0432\u044B\u0433\u043B\u044F\u0434\u0443 ".concat(views[viewType]) : "\u0412\u044B\u0433\u043B\u044F\u0434 ".concat(views[viewType], " \u0437\u0430\u0440\u0430\u0437 \u0430\u0434\u043A\u0440\u044B\u0442\u044B, \u043F\u0435\u0440\u0430\u0439\u0441\u0446\u0456 \u0434\u0430 \u0442\u044D\u043A\u0441\u0442\u0430\u0432\u0430\u0433\u0430 \u043F\u043E\u043B\u044F");
  },
  // DateRange placeholders
  start: 'Пачатак',
  end: 'Канец',
  // Action bar
  cancelButtonLabel: 'Адмена',
  clearButtonLabel: 'Ачысціць',
  okButtonLabel: 'OK',
  todayButtonLabel: 'Сёння',
  // Toolbar titles
  datePickerDefaultToolbarTitle: 'Абраць дату',
  dateTimePickerDefaultToolbarTitle: 'Абраць дату і час',
  timePickerDefaultToolbarTitle: 'Абраць час',
  dateRangePickerDefaultToolbarTitle: 'Абраць каляндарны перыяд',
  // Clock labels
  clockLabelText: function clockLabelText(view, time, adapter) {
    return "\u0410\u0431\u044F\u0440\u044B\u0446\u0435 ".concat(views[view], ". ").concat(time === null ? 'Час не абраны' : "\u0410\u0431\u0440\u0430\u043D\u044B \u0447\u0430\u0441 ".concat(adapter.format(time, 'fullTime')));
  },
  hoursClockNumberText: function hoursClockNumberText(hours) {
    return "".concat(hours, " \u0433\u0430\u0434\u0437\u0456\u043D");
  },
  minutesClockNumberText: function minutesClockNumberText(minutes) {
    return "".concat(minutes, " \u0445\u0432\u0456\u043B\u0456\u043D");
  },
  secondsClockNumberText: function secondsClockNumberText(seconds) {
    return "".concat(seconds, " \u0441\u0435\u043A\u0443\u043D\u0434");
  },
  // Open picker labels
  openDatePickerDialogue: function openDatePickerDialogue(value, utils) {
    return value !== null && utils.isValid(value) ? "\u0410\u0431\u0440\u0430\u0446\u044C \u0434\u0430\u0442\u0443, \u0430\u0431\u0440\u0430\u043D\u0430 \u0434\u0430\u0442\u0430  ".concat(utils.format(value, 'fullDate')) : 'Абраць дату';
  },
  openTimePickerDialogue: function openTimePickerDialogue(value, utils) {
    return value !== null && utils.isValid(value) ? "\u0410\u0431\u0440\u0430\u0446\u044C \u0447\u0430\u0441, \u0430\u0431\u0440\u044B\u043D\u044B \u0447\u0430\u0441  ".concat(utils.format(value, 'fullTime')) : 'Абраць час';
  },
  // Table labels
  timeTableLabel: 'абраць час',
  dateTableLabel: 'абраць дату'
};
export var beBY = getPickersLocalization(beBYPickers);