import { getPickersLocalization } from './utils/getPickersLocalization';
var nbNOPickers = {
  // Calendar navigation
  previousMonth: 'Forrige måned',
  nextMonth: 'Neste måned',
  // View navigation
  openPreviousView: 'åpne forrige visning',
  openNextView: 'åpne neste visning',
  calendarViewSwitchingButtonAriaLabel: function calendarViewSwitchingButtonAriaLabel(view) {
    return view === 'year' ? 'årsvisning er åpen, bytt til kalendervisning' : 'kalendervisning er åpen, bytt til årsvisning';
  },
  // inputModeToggleButtonAriaLabel: (isKeyboardInputOpen: boolean, viewType: 'calendar' | 'clock') => isKeyboardInputOpen ? `text input view is open, go to ${viewType} view` : `${viewType} view is open, go to text input view`,
  // DateRange placeholders
  start: 'Start',
  end: 'Slutt',
  // Action bar
  cancelButtonLabel: 'Avbryt',
  clearButtonLabel: 'Fjern',
  okButtonLabel: 'OK',
  todayButtonLabel: 'I dag',
  // Toolbar titles
  // datePickerDefaultToolbarTitle: 'Select date',
  // dateTimePickerDefaultToolbarTitle: 'Select date & time',
  // timePickerDefaultToolbarTitle: 'Select time',
  // dateRangePickerDefaultToolbarTitle: 'Select date range',
  // Clock labels
  clockLabelText: function clockLabelText(view, time, adapter) {
    return "Velg ".concat(view, ". ").concat(time === null ? 'Ingen tid valgt' : "Valgt tid er ".concat(adapter.format(time, 'fullTime')));
  },
  hoursClockNumberText: function hoursClockNumberText(hours) {
    return "".concat(hours, " timer");
  },
  minutesClockNumberText: function minutesClockNumberText(minutes) {
    return "".concat(minutes, " minutter");
  },
  secondsClockNumberText: function secondsClockNumberText(seconds) {
    return "".concat(seconds, " sekunder");
  },
  // Open picker labels
  openDatePickerDialogue: function openDatePickerDialogue(rawValue, utils) {
    return rawValue && utils.isValid(utils.date(rawValue)) ? "Velg dato, valgt dato er ".concat(utils.format(utils.date(rawValue), 'fullDate')) : 'Velg dato';
  },
  openTimePickerDialogue: function openTimePickerDialogue(rawValue, utils) {
    return rawValue && utils.isValid(utils.date(rawValue)) ? "Velg tid, valgt tid er ".concat(utils.format(utils.date(rawValue), 'fullTime')) : 'Velg tid';
  },
  // Table labels
  timeTableLabel: 'velg tid',
  dateTableLabel: 'velg dato'
};
export var nbNO = getPickersLocalization(nbNOPickers);