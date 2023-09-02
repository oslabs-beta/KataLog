import { getPickersLocalization } from './utils/getPickersLocalization';
var nlNLPickers = {
  // Calendar navigation
  previousMonth: 'Vorige maand',
  nextMonth: 'Volgende maand',
  // View navigation
  openPreviousView: 'open vorige view',
  openNextView: 'open volgende view',
  calendarViewSwitchingButtonAriaLabel: function calendarViewSwitchingButtonAriaLabel(view) {
    return view === 'year' ? 'jaarweergave is geopend, schakel over naar kalenderweergave' : 'kalenderweergave is geopend, switch naar jaarweergave';
  },
  // inputModeToggleButtonAriaLabel: (isKeyboardInputOpen: boolean, viewType: 'calendar' | 'clock') => isKeyboardInputOpen ? `text input view is open, go to ${viewType} view` : `${viewType} view is open, go to text input view`,
  // DateRange placeholders
  start: 'Start',
  end: 'Einde',
  // Action bar
  cancelButtonLabel: 'Annuleren',
  clearButtonLabel: 'Resetten',
  okButtonLabel: 'OK',
  todayButtonLabel: 'Vandaag',
  // Toolbar titles
  // datePickerDefaultToolbarTitle: 'Select date',
  // dateTimePickerDefaultToolbarTitle: 'Select date & time',
  // timePickerDefaultToolbarTitle: 'Select time',
  // dateRangePickerDefaultToolbarTitle: 'Select date range',
  // Clock labels
  clockLabelText: function clockLabelText(view, time, adapter) {
    return "Selecteer ".concat(view, ". ").concat(time === null ? 'Geen tijd geselecteerd' : "Geselecteerde tijd is ".concat(adapter.format(time, 'fullTime')));
  },
  hoursClockNumberText: function hoursClockNumberText(hours) {
    return "".concat(hours, " uren");
  },
  minutesClockNumberText: function minutesClockNumberText(minutes) {
    return "".concat(minutes, " minuten");
  },
  secondsClockNumberText: function secondsClockNumberText(seconds) {
    return "".concat(seconds, " seconden");
  },
  // Open picker labels
  openDatePickerDialogue: function openDatePickerDialogue(rawValue, utils) {
    return rawValue && utils.isValid(utils.date(rawValue)) ? "Kies datum, geselecteerde datum is ".concat(utils.format(utils.date(rawValue), 'fullDate')) : 'Kies datum';
  },
  openTimePickerDialogue: function openTimePickerDialogue(rawValue, utils) {
    return rawValue && utils.isValid(utils.date(rawValue)) ? "Kies tijd, geselecteerde tijd is ".concat(utils.format(utils.date(rawValue), 'fullTime')) : 'Kies tijd';
  },
  // Table labels
  timeTableLabel: 'kies tijd',
  dateTableLabel: 'kies datum'
};
export var nlNL = getPickersLocalization(nlNLPickers);