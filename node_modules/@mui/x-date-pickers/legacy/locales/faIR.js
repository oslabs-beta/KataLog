import { getPickersLocalization } from './utils/getPickersLocalization';
var faIRPickers = {
  // Calendar navigation
  previousMonth: 'ماه گذشته',
  nextMonth: 'ماه آینده',
  // View navigation
  openPreviousView: 'نمای قبلی',
  openNextView: 'نمای بعدی',
  calendarViewSwitchingButtonAriaLabel: function calendarViewSwitchingButtonAriaLabel(view) {
    return view === 'year' ? 'نمای سال باز است، رفتن به نمای تقویم' : 'نمای تقویم باز است، رفتن به نمای سال';
  },
  inputModeToggleButtonAriaLabel: function inputModeToggleButtonAriaLabel(isKeyboardInputOpen, viewType) {
    return isKeyboardInputOpen ? "\u0646\u0645\u0627\u06CC \u0648\u0631\u0648\u062F\u06CC \u0645\u062A\u0646 \u0628\u0627\u0632 \u0627\u0633\u062A\u060C \u0631\u0641\u062A\u0646 \u0628\u0647 \u0646\u0645\u0627\u06CC ".concat(viewType) : "\u0646\u0645\u0627\u06CC ".concat(viewType, " \u0628\u0627\u0632 \u0627\u0633\u062A\u060C \u0631\u0641\u062A\u0646 \u0628\u0647 \u0646\u0645\u0627\u06CC \u0648\u0631\u0648\u062F\u06CC \u0645\u062A\u0646");
  },
  // DateRange placeholders
  start: 'شروع',
  end: 'پایان',
  // Action bar
  cancelButtonLabel: 'لغو',
  clearButtonLabel: 'پاک کردن',
  okButtonLabel: 'اوکی',
  todayButtonLabel: 'امروز',
  // Toolbar titles
  datePickerDefaultToolbarTitle: 'تاریخ را انتخاب کنید',
  dateTimePickerDefaultToolbarTitle: 'تاریخ و ساعت را انتخاب کنید',
  timePickerDefaultToolbarTitle: 'ساعت را انتخاب کنید',
  dateRangePickerDefaultToolbarTitle: 'محدوده تاریخ را انتخاب کنید',
  // Clock labels
  clockLabelText: function clockLabelText(view, time, adapter) {
    return "Select ".concat(view, ". ").concat(time === null ? 'هیچ ساعتی انتخاب نشده است' : "\u0633\u0627\u0639\u062A \u0627\u0646\u062A\u062E\u0627\u0628 ".concat(adapter.format(time, 'fullTime'), " \u0645\u06CC \u0628\u0627\u0634\u062F"));
  },
  hoursClockNumberText: function hoursClockNumberText(hours) {
    return "".concat(hours, " \u0633\u0627\u0639\u062A \u0647\u0627");
  },
  minutesClockNumberText: function minutesClockNumberText(minutes) {
    return "".concat(minutes, " \u062F\u0642\u06CC\u0642\u0647 \u0647\u0627");
  },
  secondsClockNumberText: function secondsClockNumberText(seconds) {
    return "".concat(seconds, " \u062B\u0627\u0646\u06CC\u0647 \u0647\u0627");
  },
  // Open picker labels
  openDatePickerDialogue: function openDatePickerDialogue(rawValue, utils) {
    return rawValue && utils.isValid(utils.date(rawValue)) ? "\u062A\u0627\u0631\u06CC\u062E \u0631\u0627 \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646\u06CC\u062F\u060C \u062A\u0627\u0631\u06CC\u062E \u0627\u0646\u062A\u062E\u0627\u0628 \u0634\u062F\u0647 ".concat(utils.format(utils.date(rawValue), 'fullDate'), " \u0645\u06CC \u0628\u0627\u0634\u062F") : 'تاریخ را انتخاب کنید';
  },
  openTimePickerDialogue: function openTimePickerDialogue(rawValue, utils) {
    return rawValue && utils.isValid(utils.date(rawValue)) ? "\u0633\u0627\u0639\u062A \u0631\u0627 \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646\u06CC\u062F\u060C \u0633\u0627\u0639\u062A \u0627\u0646\u062A\u062E\u0627\u0628 \u0634\u062F\u0647 ".concat(utils.format(utils.date(rawValue), 'fullTime'), " \u0645\u06CC \u0628\u0627\u0634\u062F") : 'ساعت را انتخاب کنید';
  },
  // Table labels
  timeTableLabel: 'انتخاب تاریخ',
  dateTableLabel: 'انتخاب ساعت'
};
export var faIR = getPickersLocalization(faIRPickers);