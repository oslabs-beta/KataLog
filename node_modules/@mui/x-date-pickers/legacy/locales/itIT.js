import { getPickersLocalization } from './utils/getPickersLocalization';
var views = {
  hours: 'le ore',
  minutes: 'i minuti',
  seconds: 'i secondi'
};
var itITPickers = {
  // Calendar navigation
  previousMonth: 'Mese precedente',
  nextMonth: 'Mese successivo',
  // View navigation
  openPreviousView: 'apri la vista precedente',
  openNextView: 'apri la vista successiva',
  calendarViewSwitchingButtonAriaLabel: function calendarViewSwitchingButtonAriaLabel(view) {
    return view === 'year' ? "la vista dell'anno è aperta, passare alla vista del calendario" : "la vista dell'calendario è aperta, passare alla vista dell'anno";
  },
  inputModeToggleButtonAriaLabel: function inputModeToggleButtonAriaLabel(isKeyboardInputOpen, viewType) {
    return isKeyboardInputOpen ? "la vista del campo di testo \xE8 aperta, passare alla vista ".concat(viewType) : "la vista aperta \xE8: ".concat(viewType, ", vai alla vista del campo di testo");
  },
  // DateRange placeholders
  start: 'Inizio',
  end: 'Fine',
  // Action bar
  cancelButtonLabel: 'Cancellare',
  clearButtonLabel: 'Sgomberare',
  okButtonLabel: 'OK',
  todayButtonLabel: 'Oggi',
  // Toolbar titles
  datePickerDefaultToolbarTitle: 'Seleziona data',
  dateTimePickerDefaultToolbarTitle: 'Seleziona data e orario',
  timePickerDefaultToolbarTitle: 'Seleziona orario',
  dateRangePickerDefaultToolbarTitle: 'Seleziona intervallo di date',
  // Clock labels
  clockLabelText: function clockLabelText(view, time, adapter) {
    return "Seleziona ".concat(views[view], ". ").concat(time === null ? 'Nessun orario selezionato' : "L'ora selezionata \xE8 ".concat(adapter.format(time, 'fullTime')));
  },
  hoursClockNumberText: function hoursClockNumberText(hours) {
    return "".concat(hours, " ore");
  },
  minutesClockNumberText: function minutesClockNumberText(minutes) {
    return "".concat(minutes, " minuti");
  },
  secondsClockNumberText: function secondsClockNumberText(seconds) {
    return "".concat(seconds, " secondi");
  },
  // Open picker labels
  openDatePickerDialogue: function openDatePickerDialogue(rawValue, utils) {
    return rawValue && utils.isValid(utils.date(rawValue)) ? "Scegli la data, la data selezionata \xE8 ".concat(utils.format(utils.date(rawValue), 'fullDate')) : 'Scegli la data';
  },
  openTimePickerDialogue: function openTimePickerDialogue(rawValue, utils) {
    return rawValue && utils.isValid(utils.date(rawValue)) ? "Scegli l'ora, l'ora selezionata \xE8 ".concat(utils.format(utils.date(rawValue), 'fullTime')) : "Scegli l'ora";
  },
  // Table labels
  timeTableLabel: "scegli un'ora",
  dateTableLabel: 'scegli una data'
};
export var itIT = getPickersLocalization(itITPickers);