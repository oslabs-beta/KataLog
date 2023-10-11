import { getPickersLocalization } from './utils/getPickersLocalization';
var svSEPickers = {
  // Calendar navigation
  previousMonth: 'Föregående månad',
  nextMonth: 'Nästa månad',
  // View navigation
  openPreviousView: 'öppna föregående vy',
  openNextView: 'öppna nästa vy',
  calendarViewSwitchingButtonAriaLabel: function calendarViewSwitchingButtonAriaLabel(view) {
    return view === 'year' ? 'årsvyn är öppen, byt till kalendervy' : 'kalendervyn är öppen, byt till årsvy';
  },
  // inputModeToggleButtonAriaLabel: (isKeyboardInputOpen: boolean, viewType: 'calendar' | 'clock') => isKeyboardInputOpen ? `text input view is open, go to ${viewType} view` : `${viewType} view is open, go to text input view`,
  // DateRange placeholders
  start: 'Start',
  end: 'Slut',
  // Action bar
  cancelButtonLabel: 'Avbryt',
  clearButtonLabel: 'Rensa',
  okButtonLabel: 'OK',
  todayButtonLabel: 'Idag',
  // Toolbar titles
  // datePickerDefaultToolbarTitle: 'Select date',
  // dateTimePickerDefaultToolbarTitle: 'Select date & time',
  // timePickerDefaultToolbarTitle: 'Select time',
  // dateRangePickerDefaultToolbarTitle: 'Select date range',
  // Clock labels
  clockLabelText: function clockLabelText(view, time, adapter) {
    return "Select ".concat(view, ". ").concat(time === null ? 'Ingen tid vald' : "Vald tid \xE4r ".concat(adapter.format(time, 'fullTime')));
  },
  hoursClockNumberText: function hoursClockNumberText(hours) {
    return "".concat(hours, " timmar");
  },
  minutesClockNumberText: function minutesClockNumberText(minutes) {
    return "".concat(minutes, " minuter");
  },
  secondsClockNumberText: function secondsClockNumberText(seconds) {
    return "".concat(seconds, " sekunder");
  },
  // Open picker labels
  openDatePickerDialogue: function openDatePickerDialogue(rawValue, utils) {
    return rawValue && utils.isValid(utils.date(rawValue)) ? "V\xE4lj datum, valt datum \xE4r ".concat(utils.format(utils.date(rawValue), 'fullDate')) : 'Välj datum';
  },
  openTimePickerDialogue: function openTimePickerDialogue(rawValue, utils) {
    return rawValue && utils.isValid(utils.date(rawValue)) ? "V\xE4lj tid, vald tid \xE4r ".concat(utils.format(utils.date(rawValue), 'fullTime')) : 'Välj tid';
  },
  // Table labels
  timeTableLabel: 'välj tid',
  dateTableLabel: 'välj datum'
};
export var svSE = getPickersLocalization(svSEPickers);