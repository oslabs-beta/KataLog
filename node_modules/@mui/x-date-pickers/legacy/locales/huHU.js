import { getPickersLocalization } from './utils/getPickersLocalization'; // maps TimeView to its translation

var timeViews = {
  hours: 'Óra',
  minutes: 'Perc',
  seconds: 'Másodperc'
}; // maps PickersToolbar["viewType"] to its translation

var pickerViews = {
  calendar: 'naptár',
  clock: 'óra'
};
var huHUPickers = {
  // Calendar navigation
  previousMonth: 'Előző hónap',
  nextMonth: 'Következő hónap',
  // View navigation
  openPreviousView: 'Előző nézet megnyitása',
  openNextView: 'Következő nézet megnyitása',
  calendarViewSwitchingButtonAriaLabel: function calendarViewSwitchingButtonAriaLabel(view) {
    return view === 'year' ? 'az évválasztó már nyitva, váltson a naptárnézetre' : 'a naptárnézet már nyitva, váltson az évválasztóra';
  },
  inputModeToggleButtonAriaLabel: function inputModeToggleButtonAriaLabel(isKeyboardInputOpen, viewType) {
    return isKeyboardInputOpen ? "sz\xF6veges beviteli n\xE9zet akt\xEDv, v\xE1lt\xE1s ".concat(pickerViews[viewType], " n\xE9zetre") : "".concat(pickerViews[viewType], " beviteli n\xE9zet akt\xEDv, v\xE1lt\xE1s sz\xF6veges beviteli n\xE9zetre");
  },
  // DateRange placeholders
  start: 'Kezdő dátum',
  end: 'Záró dátum',
  // Action bar
  cancelButtonLabel: 'Mégse',
  clearButtonLabel: 'Törlés',
  okButtonLabel: 'OK',
  todayButtonLabel: 'Ma',
  // Toolbar titles
  datePickerDefaultToolbarTitle: 'Dátum kiválasztása',
  dateTimePickerDefaultToolbarTitle: 'Dátum és idő kiválasztása',
  timePickerDefaultToolbarTitle: 'Idő kiválasztása',
  dateRangePickerDefaultToolbarTitle: 'Dátumhatárok kiválasztása',
  // Clock labels
  clockLabelText: function clockLabelText(view, time, adapter) {
    var _timeViews$view;

    return "".concat((_timeViews$view = timeViews[view]) != null ? _timeViews$view : view, " kiv\xE1laszt\xE1sa. ").concat(time === null ? 'Nincs kiválasztva idő' : "A kiv\xE1lasztott id\u0151 ".concat(adapter.format(time, 'fullTime')));
  },
  hoursClockNumberText: function hoursClockNumberText(hours) {
    return "".concat(hours, " ").concat(timeViews.hours.toLowerCase());
  },
  minutesClockNumberText: function minutesClockNumberText(minutes) {
    return "".concat(minutes, " ").concat(timeViews.minutes.toLowerCase());
  },
  secondsClockNumberText: function secondsClockNumberText(seconds) {
    return "".concat(seconds, "  ").concat(timeViews.seconds.toLowerCase());
  },
  // Open picker labels
  openDatePickerDialogue: function openDatePickerDialogue(value, utils) {
    return value !== null && utils.isValid(value) ? "V\xE1lasszon d\xE1tumot, a kiv\xE1lasztott d\xE1tum: ".concat(utils.format(value, 'fullDate')) : 'Válasszon dátumot';
  },
  openTimePickerDialogue: function openTimePickerDialogue(value, utils) {
    return value !== null && utils.isValid(value) ? "V\xE1lasszon id\u0151t, a kiv\xE1lasztott id\u0151: ".concat(utils.format(value, 'fullTime')) : 'Válasszon időt';
  },
  // Table labels
  timeTableLabel: 'válasszon időt',
  dateTableLabel: 'válasszon dátumot'
};
export var huHU = getPickersLocalization(huHUPickers);