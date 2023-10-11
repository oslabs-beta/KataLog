import { getPickersLocalization } from './utils/getPickersLocalization';
var views = {
  hours: '시간을',
  minutes: '분을',
  seconds: '초를'
};
var koKRPickers = {
  // Calendar navigation
  previousMonth: '이전 달',
  nextMonth: '다음 달',
  // View navigation
  openPreviousView: '이전 화면 보기',
  openNextView: '다음 화면 보기',
  calendarViewSwitchingButtonAriaLabel: function calendarViewSwitchingButtonAriaLabel(view) {
    return view === 'year' ? '연도 선택 화면에서 달력 화면으로 전환하기' : '달력 화면에서 연도 선택 화면으로 전환하기';
  },
  inputModeToggleButtonAriaLabel: function inputModeToggleButtonAriaLabel(isKeyboardInputOpen, viewType) {
    return isKeyboardInputOpen ? "\uD14D\uC2A4\uD2B8 \uC785\uB825 \uD654\uBA74\uC5D0\uC11C ".concat(viewType, " \uD654\uBA74\uC73C\uB85C \uC804\uD658\uD558\uAE30") : "".concat(viewType, " \uD654\uBA74\uC5D0\uC11C \uD14D\uC2A4\uD2B8 \uC785\uB825 \uD654\uBA74\uC73C\uB85C \uC804\uD658\uD558\uAE30");
  },
  // DateRange placeholders
  start: '시작',
  end: '종료',
  // Action bar
  cancelButtonLabel: '취소',
  clearButtonLabel: '초기화',
  okButtonLabel: '확인',
  todayButtonLabel: '오늘',
  // Toolbar titles
  datePickerDefaultToolbarTitle: '날짜 선택하기',
  dateTimePickerDefaultToolbarTitle: '날짜 & 시간 선택하기',
  timePickerDefaultToolbarTitle: '시간 선택하기',
  dateRangePickerDefaultToolbarTitle: '날짜 범위 선택하기',
  // Clock labels
  clockLabelText: function clockLabelText(view, time, adapter) {
    return "".concat(views[view], " \uC120\uD0DD\uD558\uC138\uC694. ").concat(time === null ? '시간을 선택하지 않았습니다.' : "\uD604\uC7AC \uC120\uD0DD\uB41C \uC2DC\uAC04\uC740 ".concat(adapter.format(time, 'fullTime'), "\uC785\uB2C8\uB2E4."));
  },
  hoursClockNumberText: function hoursClockNumberText(hours) {
    return "".concat(hours, "\uC2DC\uAC04");
  },
  minutesClockNumberText: function minutesClockNumberText(minutes) {
    return "".concat(minutes, "\uBD84");
  },
  secondsClockNumberText: function secondsClockNumberText(seconds) {
    return "".concat(seconds, "\uCD08");
  },
  // Open picker labels
  openDatePickerDialogue: function openDatePickerDialogue(rawValue, utils) {
    return rawValue && utils.isValid(utils.date(rawValue)) ? "\uB0A0\uC9DC\uB97C \uC120\uD0DD\uD558\uC138\uC694. \uD604\uC7AC \uC120\uD0DD\uB41C \uB0A0\uC9DC\uB294 ".concat(utils.format(utils.date(rawValue), 'fullDate'), "\uC785\uB2C8\uB2E4.") : '날짜를 선택하세요';
  },
  openTimePickerDialogue: function openTimePickerDialogue(rawValue, utils) {
    return rawValue && utils.isValid(utils.date(rawValue)) ? "\uC2DC\uAC04\uC744 \uC120\uD0DD\uD558\uC138\uC694. \uD604\uC7AC \uC120\uD0DD\uB41C \uC2DC\uAC04\uC740 ".concat(utils.format(utils.date(rawValue), 'fullTime'), "\uC785\uB2C8\uB2E4.") : '시간을 선택하세요';
  },
  // Table labels
  timeTableLabel: '선택한 시간',
  dateTableLabel: '선택한 날짜'
};
export var koKR = getPickersLocalization(koKRPickers);