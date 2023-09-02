import { getPickersLocalization } from './utils/getPickersLocalization';
var urPKPickers = {
  // Calendar navigation
  previousMonth: 'پچھلا مہینہ',
  nextMonth: 'اگلا مہینہ',
  // View navigation
  openPreviousView: 'پچھلا ویو کھولیں',
  openNextView: 'اگلا ویو کھولیں',
  calendarViewSwitchingButtonAriaLabel: function calendarViewSwitchingButtonAriaLabel(view) {
    return view === 'year' ? 'سال والا ویو کھلا ہے۔ کیلنڈر والا ویو کھولیں' : 'کیلنڈر والا ویو کھلا ہے۔ سال والا ویو کھولیں';
  },
  inputModeToggleButtonAriaLabel: function inputModeToggleButtonAriaLabel(isKeyboardInputOpen, viewType) {
    return isKeyboardInputOpen ? "\u060C\u0679\u06CC\u06A9\u0633\u0679 \u0648\u06CC\u0648 \u06A9\u06BE\u0644\u0627 \u06C1\u06D2 ".concat(viewType, " \u0648\u06CC\u0648 \u06A9\u06BE\u0648\u0644\u06CC\u06BA") : "".concat(viewType, " \u0648\u06CC\u0648 \u06A9\u06BE\u0644\u0627 \u06C1\u06D2\u060C \u0679\u06CC\u06A9\u0633\u0679 \u0648\u06CC\u0648 \u06A9\u06BE\u0648\u0644\u06CC\u06BA");
  },
  // DateRange placeholders
  start: 'شروع',
  end: 'ختم',
  // Action bar
  cancelButtonLabel: 'کینسل',
  clearButtonLabel: 'کلئیر',
  okButtonLabel: 'اوکے',
  todayButtonLabel: 'آج',
  // Toolbar titles
  datePickerDefaultToolbarTitle: 'تاریخ منتخب کریں',
  dateTimePickerDefaultToolbarTitle: 'تاریخ اور وقت منتخب کریں',
  timePickerDefaultToolbarTitle: 'وقت منتخب کریں',
  dateRangePickerDefaultToolbarTitle: 'تاریخوں کی رینج منتخب کریں',
  // Clock labels
  clockLabelText: function clockLabelText(view, time, adapter) {
    return "".concat(view, " \u0645\u0646\u062A\u062E\u0628 \u06A9\u0631\u06CC\u06BA ").concat(time === null ? 'کوئی وقت منتخب نہیں' : "\u0645\u0646\u062A\u062E\u0628 \u0648\u0642\u062A \u06C1\u06D2 ".concat(adapter.format(time, 'fullTime')));
  },
  hoursClockNumberText: function hoursClockNumberText(hours) {
    return "".concat(hours, " \u06AF\u06BE\u0646\u0679\u06D2");
  },
  minutesClockNumberText: function minutesClockNumberText(minutes) {
    return "".concat(minutes, " \u0645\u0646\u0679");
  },
  secondsClockNumberText: function secondsClockNumberText(seconds) {
    return "".concat(seconds, " \u0633\u06CC\u06A9\u0646\u0688");
  },
  // Open picker labels
  openDatePickerDialogue: function openDatePickerDialogue(value, utils) {
    return value !== null && utils.isValid(value) ? "\u062A\u0627\u0631\u06CC\u062E \u0645\u0646\u062A\u062E\u0628 \u06A9\u0631\u06CC\u06BA\u060C \u0645\u0646\u062A\u062E\u0628 \u0634\u062F\u06C1 \u062A\u0627\u0631\u06CC\u062E \u06C1\u06D2 ".concat(utils.format(value, 'fullDate')) : 'تاریخ منتخب کریں';
  },
  openTimePickerDialogue: function openTimePickerDialogue(value, utils) {
    return value !== null && utils.isValid(value) ? "\u0648\u0642\u062A \u0645\u0646\u062A\u062E\u0628 \u06A9\u0631\u06CC\u06BA\u060C \u0645\u0646\u062A\u062E\u0628 \u0634\u062F\u06C1 \u0648\u0642\u062A \u06C1\u06D2 ".concat(utils.format(value, 'fullTime')) : 'وقت منتخب کریں';
  },
  // Table labels
  timeTableLabel: 'وقت منتخب کریں',
  dateTableLabel: 'تاریخ منتخب کریں'
};
export var urPK = getPickersLocalization(urPKPickers);