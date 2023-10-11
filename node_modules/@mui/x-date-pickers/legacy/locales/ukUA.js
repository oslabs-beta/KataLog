import { getPickersLocalization } from './utils/getPickersLocalization';
var ukUAPickers = {
  // Calendar navigation
  previousMonth: 'Попередній місяць',
  nextMonth: 'Наступний місяць',
  // View navigation
  openPreviousView: 'відкрити попередній вигляд',
  openNextView: 'відкрити наступний вигляд',
  calendarViewSwitchingButtonAriaLabel: function calendarViewSwitchingButtonAriaLabel(view) {
    return view === 'year' ? 'річний вигляд відкрито, перейти до календарного вигляду' : 'календарний вигляд відкрито, перейти до річного вигляду';
  },
  inputModeToggleButtonAriaLabel: function inputModeToggleButtonAriaLabel(isKeyboardInputOpen, viewType) {
    return isKeyboardInputOpen ? "\u0442\u0435\u043A\u0441\u0442\u043E\u0432\u0435 \u043F\u043E\u043B\u0435 \u0432\u0456\u0434\u043A\u0440\u0438\u0442\u0435, \u043F\u0435\u0440\u0435\u0439\u0442\u0438 \u0434\u043E  ".concat(viewType, " \u0432\u0438\u0433\u043B\u044F\u0434\u0443") : "".concat(viewType, " \u0432\u0438\u0433\u043B\u044F\u0434 \u043D\u0430\u0440\u0430\u0437\u0456 \u0432\u0456\u0434\u043A\u0440\u0438\u0442\u043E, \u043F\u0435\u0440\u0435\u0439\u0442\u0438 \u0434\u043E \u0442\u0435\u043A\u0441\u0442\u043E\u0432\u043E\u0433\u043E \u043F\u043E\u043B\u044F");
  },
  // DateRange placeholders
  start: 'Початок',
  end: 'Кінець',
  // Action bar
  cancelButtonLabel: 'Відміна',
  clearButtonLabel: 'Очистити',
  okButtonLabel: 'OK',
  todayButtonLabel: 'Сьогодні',
  // Toolbar titles
  datePickerDefaultToolbarTitle: 'Вибрати дату',
  dateTimePickerDefaultToolbarTitle: 'Вибрати дату і час',
  timePickerDefaultToolbarTitle: 'Вибрати час',
  dateRangePickerDefaultToolbarTitle: 'Вибрати календарний період',
  // Clock labels
  clockLabelText: function clockLabelText(view, time, adapter) {
    return "Select ".concat(view, ". ").concat(time === null ? 'Час не вибраний' : "\u0412\u0438\u0431\u0440\u0430\u043D\u043E \u0447\u0430\u0441 ".concat(adapter.format(time, 'fullTime')));
  },
  hoursClockNumberText: function hoursClockNumberText(hours) {
    return "".concat(hours, " \u0433\u043E\u0434\u0438\u043D");
  },
  minutesClockNumberText: function minutesClockNumberText(minutes) {
    return "".concat(minutes, " \u0445\u0432\u0438\u043B\u0438\u043D");
  },
  secondsClockNumberText: function secondsClockNumberText(seconds) {
    return "".concat(seconds, " \u0441\u0435\u043A\u0443\u043D\u0434");
  },
  // Open picker labels
  openDatePickerDialogue: function openDatePickerDialogue(value, utils) {
    return value !== null && utils.isValid(value) ? "\u041E\u0431\u0435\u0440\u0456\u0442\u044C \u0434\u0430\u0442\u0443, \u043E\u0431\u0440\u0430\u043D\u0430 \u0434\u0430\u0442\u0430  ".concat(utils.format(value, 'fullDate')) : 'Оберіть дату';
  },
  openTimePickerDialogue: function openTimePickerDialogue(value, utils) {
    return value !== null && utils.isValid(value) ? "\u041E\u0431\u0435\u0440\u0456\u0442\u044C \u0447\u0430\u0441, \u043E\u0431\u0440\u0430\u043D\u0438\u0439 \u0447\u0430\u0441  ".concat(utils.format(value, 'fullTime')) : 'Оберіть час';
  },
  // Table labels
  timeTableLabel: 'оберіть час',
  dateTableLabel: 'оберіть дату'
};
export var ukUA = getPickersLocalization(ukUAPickers);