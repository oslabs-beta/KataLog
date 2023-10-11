import { getPickersLocalization } from './utils/getPickersLocalization';
var views = {
  hours: '小时',
  minutes: '分钟',
  seconds: '秒'
};
var zhCNPickers = {
  // Calendar navigation
  previousMonth: '上个月',
  nextMonth: '下个月',
  // View navigation
  openPreviousView: '前一个视图',
  openNextView: '下一个视图',
  calendarViewSwitchingButtonAriaLabel: function calendarViewSwitchingButtonAriaLabel(view) {
    return view === 'year' ? '年视图已打开，切换为日历视图' : '日历视图已打开，切换为年视图';
  },
  // inputModeToggleButtonAriaLabel: (isKeyboardInputOpen: boolean, viewType: 'calendar' | 'clock') => isKeyboardInputOpen ? `text input view is open, go to ${viewType} view` : `${viewType} view is open, go to text input view`,
  // DateRange placeholders
  start: '开始',
  end: '结束',
  // Action bar
  cancelButtonLabel: '取消',
  clearButtonLabel: '清除',
  okButtonLabel: '确认',
  todayButtonLabel: '今天',
  // Toolbar titles
  // datePickerDefaultToolbarTitle: 'Select date',
  // dateTimePickerDefaultToolbarTitle: 'Select date & time',
  // timePickerDefaultToolbarTitle: 'Select time',
  // dateRangePickerDefaultToolbarTitle: 'Select date range',
  // Clock labels
  clockLabelText: function clockLabelText(view, time, adapter) {
    return "Select ".concat(views[view], ". ").concat(time === null ? '未选择时间' : "\u5DF2\u9009\u62E9".concat(adapter.format(time, 'fullTime')));
  },
  hoursClockNumberText: function hoursClockNumberText(hours) {
    return "".concat(hours, "\u5C0F\u65F6");
  },
  minutesClockNumberText: function minutesClockNumberText(minutes) {
    return "".concat(minutes, "\u5206\u949F");
  },
  secondsClockNumberText: function secondsClockNumberText(seconds) {
    return "".concat(seconds, "\u79D2");
  },
  // Open picker labels
  openDatePickerDialogue: function openDatePickerDialogue(rawValue, utils) {
    return rawValue && utils.isValid(utils.date(rawValue)) ? "\u9009\u62E9\u65E5\u671F\uFF0C\u5DF2\u9009\u62E9".concat(utils.format(utils.date(rawValue), 'fullDate')) : '选择日期';
  },
  openTimePickerDialogue: function openTimePickerDialogue(rawValue, utils) {
    return rawValue && utils.isValid(utils.date(rawValue)) ? "\u9009\u62E9\u65F6\u95F4\uFF0C\u5DF2\u9009\u62E9".concat(utils.format(utils.date(rawValue), 'fullTime')) : '选择时间';
  },
  // Table labels
  timeTableLabel: '选择时间',
  dateTableLabel: '选择日期'
};
export var zhCN = getPickersLocalization(zhCNPickers);