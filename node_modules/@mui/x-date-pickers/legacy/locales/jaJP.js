import { getPickersLocalization } from './utils/getPickersLocalization';
// maps ClockPickerView to its translation
var clockViews = {
  hours: '時間',
  minutes: '分',
  seconds: '秒'
}; // maps PickersToolbar["viewType"] to its translation

var pickerViews = {
  calendar: 'カレンダー表示',
  clock: '時計表示'
};
var jaJPPickers = {
  // Calendar navigation
  previousMonth: '先月',
  nextMonth: '来月',
  // View navigation
  openPreviousView: '前の表示を開く',
  openNextView: '次の表示を開く',
  calendarViewSwitchingButtonAriaLabel: function calendarViewSwitchingButtonAriaLabel(view) {
    return view === 'year' ? '年選択表示からカレンダー表示に切り替える' : 'カレンダー表示から年選択表示に切り替える';
  },
  inputModeToggleButtonAriaLabel: function inputModeToggleButtonAriaLabel(isKeyboardInputOpen, viewType) {
    return isKeyboardInputOpen ? "\u30C6\u30AD\u30B9\u30C8\u5165\u529B\u8868\u793A\u304B\u3089".concat(pickerViews[viewType], "\u306B\u5207\u308A\u66FF\u3048\u308B") : "".concat(pickerViews[viewType], "\u304B\u3089\u30C6\u30AD\u30B9\u30C8\u5165\u529B\u8868\u793A\u306B\u5207\u308A\u66FF\u3048\u308B");
  },
  // DateRange placeholders
  start: '開始',
  end: '終了',
  // Action bar
  cancelButtonLabel: 'キャンセル',
  clearButtonLabel: 'クリア',
  okButtonLabel: '確定',
  todayButtonLabel: '今日',
  // Toolbar titles
  datePickerDefaultToolbarTitle: '日付を選択',
  dateTimePickerDefaultToolbarTitle: '日時を選択',
  timePickerDefaultToolbarTitle: '時間を選択',
  dateRangePickerDefaultToolbarTitle: '日付の範囲を選択',
  // Clock labels
  clockLabelText: function clockLabelText(view, time, adapter) {
    var _clockViews$view;

    return "".concat((_clockViews$view = clockViews[view]) != null ? _clockViews$view : view, "\u3092\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044 ").concat(time === null ? '時間が選択されていません' : "\u9078\u629E\u3057\u305F\u6642\u9593\u306F ".concat(adapter.format(time, 'fullTime'), " \u3067\u3059"));
  },
  hoursClockNumberText: function hoursClockNumberText(hours) {
    return "".concat(hours, " ").concat(clockViews.hours);
  },
  minutesClockNumberText: function minutesClockNumberText(minutes) {
    return "".concat(minutes, " ").concat(clockViews.minutes);
  },
  secondsClockNumberText: function secondsClockNumberText(seconds) {
    return "".concat(seconds, " ").concat(clockViews.seconds);
  },
  // Open picker labels
  openDatePickerDialogue: function openDatePickerDialogue(value, utils) {
    return value !== null && utils.isValid(value) ? "\u65E5\u4ED8\u3092\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044\u3002\u9078\u629E\u3057\u305F\u65E5\u4ED8\u306F ".concat(utils.format(value, 'fullDate'), " \u3067\u3059") : '日付を選択してください';
  },
  openTimePickerDialogue: function openTimePickerDialogue(value, utils) {
    return value !== null && utils.isValid(value) ? "\u6642\u9593\u3092\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044\u3002\u9078\u629E\u3057\u305F\u6642\u9593\u306F ".concat(utils.format(value, 'fullTime'), " \u3067\u3059") : '時間を選択してください';
  },
  // Table labels
  timeTableLabel: '時間を選択',
  dateTableLabel: '日付を選択'
};
export var jaJP = getPickersLocalization(jaJPPickers);