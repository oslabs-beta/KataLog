import { getPickersLocalization } from './utils/getPickersLocalization'; // maps ClockPickerView to its translation

var timeViews = {
  hours: 'Hodiny',
  minutes: 'Minuty',
  seconds: 'Sekundy'
}; // maps PickersToolbar["viewType"] to its translation

var pickerViews = {
  calendar: 'kalendáře',
  clock: 'času'
};
var csCZPickers = {
  // Calendar navigation
  previousMonth: 'Další měsíc',
  nextMonth: 'Předchozí month',
  // View navigation
  openPreviousView: 'otevřít předchozí zobrazení',
  openNextView: 'otevřít další zobrazení',
  calendarViewSwitchingButtonAriaLabel: function calendarViewSwitchingButtonAriaLabel(view) {
    return view === 'year' ? 'roční zobrazení otevřeno, přepněte do zobrazení kalendáře' : 'zobrazení kalendáře otevřeno, přepněte do zobrazení roku';
  },
  inputModeToggleButtonAriaLabel: function inputModeToggleButtonAriaLabel(isKeyboardInputOpen, viewType) {
    return isKeyboardInputOpen ? "Zobrazen\xED pro zad\xE1v\xE1n\xED textu je otev\u0159en\xE9, p\u0159epn\u011Bte do zobrazen\xED ".concat(pickerViews[viewType]) : "Zobrazen\xED ".concat(pickerViews[viewType], " je otev\u0159en\xE9, p\u0159epn\u011Bte do zobrazen\xED textov\xE9ho pole");
  },
  // DateRange placeholders
  start: 'Začátek',
  end: 'Konec',
  // Action bar
  cancelButtonLabel: 'Zrušit',
  clearButtonLabel: 'Vymazat',
  okButtonLabel: 'Potvrdit',
  todayButtonLabel: 'Dnes',
  // Toolbar titles
  datePickerDefaultToolbarTitle: 'Vyberte datum',
  dateTimePickerDefaultToolbarTitle: 'Vyberte datum a čas',
  timePickerDefaultToolbarTitle: 'Vyberte čas',
  dateRangePickerDefaultToolbarTitle: 'Vyberete rozmezí dat',
  // Clock labels
  clockLabelText: function clockLabelText(view, time, adapter) {
    var _timeViews$view;

    return "".concat((_timeViews$view = timeViews[view]) != null ? _timeViews$view : view, " vybr\xE1ny. ").concat(time === null ? 'Není vybrán čas' : "Vybran\xFD \u010Das je ".concat(adapter.format(time, 'fullTime')));
  },
  hoursClockNumberText: function hoursClockNumberText(hours) {
    return "".concat(hours, " hodin");
  },
  minutesClockNumberText: function minutesClockNumberText(minutes) {
    return "".concat(minutes, " minut");
  },
  secondsClockNumberText: function secondsClockNumberText(seconds) {
    return "".concat(seconds, " sekund");
  },
  // Open picker labels
  openDatePickerDialogue: function openDatePickerDialogue(value, utils) {
    return value !== null && utils.isValid(value) ? "Vybran\xE9 datum, vybran\xE9 datum je ".concat(utils.format(value, 'fullDate')) : 'Vyberte datum';
  },
  openTimePickerDialogue: function openTimePickerDialogue(value, utils) {
    return value !== null && utils.isValid(value) ? "Vybran\xE9 \u010Das, vybran\xFD \u010Das je ".concat(utils.format(value, 'fullTime')) : 'Vyberte čas';
  },
  // Table labels
  timeTableLabel: 'vyberte čas',
  dateTableLabel: 'vyberte datum'
};
export var csCZ = getPickersLocalization(csCZPickers);