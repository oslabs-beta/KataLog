import { getPickersLocalization } from './utils/getPickersLocalization';
var isISPickers = {
  // Calendar navigation
  previousMonth: 'Fyrri mánuður',
  nextMonth: 'Næsti mánuður',
  // View navigation
  openPreviousView: 'opna fyrri skoðun',
  openNextView: 'opna næstu skoðun',
  calendarViewSwitchingButtonAriaLabel: function calendarViewSwitchingButtonAriaLabel(view) {
    return view === 'year' ? 'ársskoðun er opin, skipta yfir í dagatalsskoðun' : 'dagatalsskoðun er opin, skipta yfir í ársskoðun';
  },
  inputModeToggleButtonAriaLabel: function inputModeToggleButtonAriaLabel(isKeyboardInputOpen, viewType) {
    var viewTypeTranslated = viewType === 'calendar' ? 'dagatals' : 'klukku';
    return isKeyboardInputOpen ? "textainnsl\xE1ttur er opinn, fara \xED ".concat(viewTypeTranslated, "sko\xF0un") : "".concat(viewTypeTranslated, "sko\xF0un er opin, opna fyrir textainnsl\xE1tt");
  },
  // DateRange placeholders
  start: 'Upphaf',
  end: 'Endir',
  // Action bar
  cancelButtonLabel: 'Hætta við',
  clearButtonLabel: 'Hreinsa',
  okButtonLabel: 'OK',
  todayButtonLabel: 'Í dag',
  // Toolbar titles
  datePickerDefaultToolbarTitle: 'Velja dagsetningu',
  dateTimePickerDefaultToolbarTitle: 'Velja dagsetningu og tíma',
  timePickerDefaultToolbarTitle: 'Velja tíma',
  dateRangePickerDefaultToolbarTitle: 'Velja tímabil',
  // Clock labels
  clockLabelText: function clockLabelText(view, time, adapter) {
    return "Select ".concat(view, ". ").concat(time === null ? 'Enginn tími valinn' : "Valinn t\xEDmi er ".concat(adapter.format(time, 'fullTime')));
  },
  hoursClockNumberText: function hoursClockNumberText(hours) {
    return "".concat(hours, " klukkustundir");
  },
  minutesClockNumberText: function minutesClockNumberText(minutes) {
    return "".concat(minutes, " m\xEDn\xFAtur");
  },
  secondsClockNumberText: function secondsClockNumberText(seconds) {
    return "".concat(seconds, " sek\xFAndur");
  },
  // Open picker labels
  openDatePickerDialogue: function openDatePickerDialogue(rawValue, utils) {
    return rawValue && utils.isValid(utils.date(rawValue)) ? "Velja dagsetningu, valin dagsetning er ".concat(utils.format(utils.date(rawValue), 'fullDate')) : 'Velja dagsetningu';
  },
  openTimePickerDialogue: function openTimePickerDialogue(rawValue, utils) {
    return rawValue && utils.isValid(utils.date(rawValue)) ? "Velja t\xEDma, valinn t\xEDmi er ".concat(utils.format(utils.date(rawValue), 'fullTime')) : 'Velja tíma';
  },
  // Table labels
  timeTableLabel: 'velja tíma',
  dateTableLabel: 'velja dagsetningu'
};
export var isIS = getPickersLocalization(isISPickers);