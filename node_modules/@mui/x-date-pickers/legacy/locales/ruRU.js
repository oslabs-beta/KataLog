import { getPickersLocalization } from './utils/getPickersLocalization'; // Translation map for Clock Label

var timeViews = {
  hours: 'часы',
  minutes: 'минуты',
  seconds: 'секунды'
}; // maps PickersToolbar["viewType"] to its translation

var viewTypes = {
  calendar: 'календарный',
  clock: 'часовой'
};
var ruRUPickers = {
  // Calendar navigation
  previousMonth: 'Предыдущий месяц',
  nextMonth: 'Следующий месяц',
  // View navigation
  openPreviousView: 'открыть предыдущий вид',
  openNextView: 'открыть следующий вид',
  calendarViewSwitchingButtonAriaLabel: function calendarViewSwitchingButtonAriaLabel(view) {
    return view === 'year' ? 'открыт годовой вид, переключить на календарный вид' : 'открыт календарный вид, переключить на годовой вид';
  },
  inputModeToggleButtonAriaLabel: function inputModeToggleButtonAriaLabel(isKeyboardInputOpen, viewType) {
    return isKeyboardInputOpen ? "\u041E\u0442\u043A\u0440\u044B\u0442 \u0442\u0435\u043A\u0441\u0442\u043E\u0432\u044B\u0439 \u0432\u0438\u0434, \u043F\u0435\u0440\u0435\u0439\u0442\u0438 \u043D\u0430 ".concat(viewTypes[viewType], " \u0432\u0438\u0434") : "\u041E\u0442\u043A\u0440\u044B\u0442 ".concat(viewTypes[viewType], " \u0432\u0438\u0434, \u043F\u0435\u0440\u0435\u0439\u0442\u0438 \u043D\u0430 \u0442\u0435\u043A\u0441\u0442\u043E\u0432\u044B\u0439 \u0432\u0438\u0434");
  },
  // DateRange placeholders
  start: 'Начало',
  end: 'Конец',
  // Action bar
  cancelButtonLabel: 'Отмена',
  clearButtonLabel: 'Очистить',
  okButtonLabel: 'Ок',
  todayButtonLabel: 'Сегодня',
  // Toolbar titles
  datePickerDefaultToolbarTitle: 'Выбрать дату',
  dateTimePickerDefaultToolbarTitle: 'Выбрать дату и время',
  timePickerDefaultToolbarTitle: 'Выбрать время',
  dateRangePickerDefaultToolbarTitle: 'Выбрать период',
  // Clock labels
  clockLabelText: function clockLabelText(view, time, adapter) {
    return "\u0412\u044B\u0431\u0440\u0430\u0442\u044C ".concat(timeViews[view], ". ").concat(time === null ? 'Время не выбрано' : "\u0412\u044B\u0431\u0440\u0430\u043D\u043E \u0432\u0440\u0435\u043C\u044F ".concat(adapter.format(time, 'fullTime')));
  },
  hoursClockNumberText: function hoursClockNumberText(hours) {
    return "".concat(hours, " \u0447\u0430\u0441\u043E\u0432");
  },
  minutesClockNumberText: function minutesClockNumberText(minutes) {
    return "".concat(minutes, " \u043C\u0438\u043D\u0443\u0442");
  },
  secondsClockNumberText: function secondsClockNumberText(seconds) {
    return "".concat(seconds, " \u0441\u0435\u043A\u0443\u043D\u0434");
  },
  // Open picker labels
  openDatePickerDialogue: function openDatePickerDialogue(value, utils) {
    return value !== null && utils.isValid(value) ? "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0434\u0430\u0442\u0443, \u0432\u044B\u0431\u0440\u0430\u043D\u0430 \u0434\u0430\u0442\u0430 ".concat(utils.format(value, 'fullDate')) : 'Выберите дату';
  },
  openTimePickerDialogue: function openTimePickerDialogue(value, utils) {
    return value !== null && utils.isValid(value) ? "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0432\u0440\u0435\u043C\u044F, \u0432\u044B\u0431\u0440\u0430\u043D\u043E \u0432\u0440\u0435\u043C\u044F ".concat(utils.format(value, 'fullTime')) : 'Выберите время';
  },
  // Table labels
  timeTableLabel: 'выбрать время',
  dateTableLabel: 'выбрать дату'
};
export var ruRU = getPickersLocalization(ruRUPickers);