import { getPickersLocalization } from './utils/getPickersLocalization';
// maps ClockPickerView to its translation
var clockViews = {
  hours: 'Stunden',
  minutes: 'Minuten',
  seconds: 'Sekunden'
}; // maps PickersToolbar["viewType"] to its translation

var pickerViews = {
  calendar: 'Kalenderansicht',
  clock: 'Uhransicht'
};
var deDEPickers = {
  // Calendar navigation
  previousMonth: 'Letzter Monat',
  nextMonth: 'Nächster Monat',
  // View navigation
  openPreviousView: 'Letzte Ansicht öffnen',
  openNextView: 'Nächste Ansicht öffnen',
  calendarViewSwitchingButtonAriaLabel: function calendarViewSwitchingButtonAriaLabel(view) {
    return view === 'year' ? 'Jahresansicht ist geöffnet, zur Kalenderansicht wechseln' : 'Kalenderansicht ist geöffnet, zur Jahresansicht wechseln';
  },
  inputModeToggleButtonAriaLabel: function inputModeToggleButtonAriaLabel(isKeyboardInputOpen, viewType) {
    return isKeyboardInputOpen ? "Texteingabeansicht ist ge\xF6ffnet, zur ".concat(pickerViews[viewType], " wechseln") : "".concat(pickerViews[viewType], " ist ge\xF6ffnet, zur Texteingabeansicht wechseln");
  },
  // DateRange placeholders
  start: 'Beginn',
  end: 'Ende',
  // Action bar
  cancelButtonLabel: 'Abbrechen',
  clearButtonLabel: 'Löschen',
  okButtonLabel: 'OK',
  todayButtonLabel: 'Heute',
  // Toolbar titles
  datePickerDefaultToolbarTitle: 'Datum auswählen',
  dateTimePickerDefaultToolbarTitle: 'Datum & Uhrzeit auswählen',
  timePickerDefaultToolbarTitle: 'Uhrzeit auswählen',
  dateRangePickerDefaultToolbarTitle: 'Datumsbereich auswählen',
  // Clock labels
  clockLabelText: function clockLabelText(view, time, adapter) {
    var _clockViews$view;

    return "".concat((_clockViews$view = clockViews[view]) != null ? _clockViews$view : view, " ausw\xE4hlen. ").concat(time === null ? 'Keine Uhrzeit ausgewählt' : "Gew\xE4hlte Uhrzeit ist ".concat(adapter.format(time, 'fullTime')));
  },
  hoursClockNumberText: function hoursClockNumberText(hours) {
    return "".concat(hours, " ").concat(clockViews.hours);
  },
  minutesClockNumberText: function minutesClockNumberText(minutes) {
    return "".concat(minutes, " ").concat(clockViews.minutes);
  },
  secondsClockNumberText: function secondsClockNumberText(seconds) {
    return "".concat(seconds, "  ").concat(clockViews.seconds);
  },
  // Open picker labels
  openDatePickerDialogue: function openDatePickerDialogue(rawValue, utils) {
    return rawValue && utils.isValid(utils.date(rawValue)) ? "Datum ausw\xE4hlen, gew\xE4hltes Datum ist ".concat(utils.format(utils.date(rawValue), 'fullDate')) : 'Datum auswählen';
  },
  openTimePickerDialogue: function openTimePickerDialogue(rawValue, utils) {
    return rawValue && utils.isValid(utils.date(rawValue)) ? "Uhrzeit ausw\xE4hlen, gew\xE4hlte Uhrzeit ist ".concat(utils.format(utils.date(rawValue), 'fullTime')) : 'Uhrzeit auswählen';
  },
  // Table labels
  timeTableLabel: 'Uhrzeit auswählen',
  dateTableLabel: 'Datum auswählen'
};
export var deDE = getPickersLocalization(deDEPickers);