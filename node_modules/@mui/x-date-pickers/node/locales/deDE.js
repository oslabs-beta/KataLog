"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deDE = void 0;

var _getPickersLocalization = require("./utils/getPickersLocalization");

// maps ClockPickerView to its translation
const clockViews = {
  hours: 'Stunden',
  minutes: 'Minuten',
  seconds: 'Sekunden'
}; // maps PickersToolbar["viewType"] to its translation

const pickerViews = {
  calendar: 'Kalenderansicht',
  clock: 'Uhransicht'
};
const deDEPickers = {
  // Calendar navigation
  previousMonth: 'Letzter Monat',
  nextMonth: 'Nächster Monat',
  // View navigation
  openPreviousView: 'Letzte Ansicht öffnen',
  openNextView: 'Nächste Ansicht öffnen',
  calendarViewSwitchingButtonAriaLabel: view => view === 'year' ? 'Jahresansicht ist geöffnet, zur Kalenderansicht wechseln' : 'Kalenderansicht ist geöffnet, zur Jahresansicht wechseln',
  inputModeToggleButtonAriaLabel: (isKeyboardInputOpen, viewType) => isKeyboardInputOpen ? `Texteingabeansicht ist geöffnet, zur ${pickerViews[viewType]} wechseln` : `${pickerViews[viewType]} ist geöffnet, zur Texteingabeansicht wechseln`,
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
  clockLabelText: (view, time, adapter) => {
    var _clockViews$view;

    return `${(_clockViews$view = clockViews[view]) != null ? _clockViews$view : view} auswählen. ${time === null ? 'Keine Uhrzeit ausgewählt' : `Gewählte Uhrzeit ist ${adapter.format(time, 'fullTime')}`}`;
  },
  hoursClockNumberText: hours => `${hours} ${clockViews.hours}`,
  minutesClockNumberText: minutes => `${minutes} ${clockViews.minutes}`,
  secondsClockNumberText: seconds => `${seconds}  ${clockViews.seconds}`,
  // Open picker labels
  openDatePickerDialogue: (rawValue, utils) => rawValue && utils.isValid(utils.date(rawValue)) ? `Datum auswählen, gewähltes Datum ist ${utils.format(utils.date(rawValue), 'fullDate')}` : 'Datum auswählen',
  openTimePickerDialogue: (rawValue, utils) => rawValue && utils.isValid(utils.date(rawValue)) ? `Uhrzeit auswählen, gewählte Uhrzeit ist ${utils.format(utils.date(rawValue), 'fullTime')}` : 'Uhrzeit auswählen',
  // Table labels
  timeTableLabel: 'Uhrzeit auswählen',
  dateTableLabel: 'Datum auswählen'
};
const deDE = (0, _getPickersLocalization.getPickersLocalization)(deDEPickers);
exports.deDE = deDE;