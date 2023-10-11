import { getPickersLocalization } from './utils/getPickersLocalization';
var trTRPickers = {
  // Calendar navigation
  previousMonth: 'Önceki ay',
  nextMonth: 'Sonraki ay',
  // View navigation
  openPreviousView: 'sonraki görünüm',
  openNextView: 'önceki görünüm',
  calendarViewSwitchingButtonAriaLabel: function calendarViewSwitchingButtonAriaLabel(view) {
    return view === 'year' ? 'yıl görünümü açık, takvim görünümüne geç' : 'takvim görünümü açık, yıl görünümüne geç';
  },
  inputModeToggleButtonAriaLabel: function inputModeToggleButtonAriaLabel(isKeyboardInputOpen, viewType) {
    return isKeyboardInputOpen ? "metin giri\u015Fi g\xF6r\xFCn\xFCm\xFC a\xE7\u0131k, \u015Furaya gidin: ".concat(viewType, " g\xF6r\xFCn\xFCm\xFC") : "".concat(viewType, " g\xF6r\xFCn\xFCm a\xE7\u0131k, metin giri\u015Fi g\xF6r\xFCn\xFCm\xFCne gidin");
  },
  // DateRange placeholders
  start: 'Başlangıç',
  end: 'Bitiş',
  // Action bar
  cancelButtonLabel: 'iptal',
  clearButtonLabel: 'Temizle',
  okButtonLabel: 'Tamam',
  todayButtonLabel: 'Bugün',
  // Toolbar titles
  datePickerDefaultToolbarTitle: 'Tarih Seç',
  dateTimePickerDefaultToolbarTitle: 'Tarih & Saat seç',
  timePickerDefaultToolbarTitle: 'Saat seç',
  dateRangePickerDefaultToolbarTitle: 'Tarih aralığı seçin',
  // Clock labels
  clockLabelText: function clockLabelText(view, time, adapter) {
    return "".concat(view, " se\xE7.  ").concat(time === null ? 'Zaman seçilmedi' : "Se\xE7ilen zaman: ".concat(adapter.format(time, 'fullTime')));
  },
  hoursClockNumberText: function hoursClockNumberText(hours) {
    return "".concat(hours, " saat");
  },
  minutesClockNumberText: function minutesClockNumberText(minutes) {
    return "".concat(minutes, " dakika");
  },
  secondsClockNumberText: function secondsClockNumberText(seconds) {
    return "".concat(seconds, " saniye");
  },
  // Open picker labels
  openDatePickerDialogue: function openDatePickerDialogue(value, utils) {
    return value !== null && utils.isValid(value) ? "Tarih se\xE7in, se\xE7ilen tarih: ".concat(utils.format(value, 'fullDate')) : 'Tarih seç';
  },
  openTimePickerDialogue: function openTimePickerDialogue(value, utils) {
    return value !== null && utils.isValid(value) ? "Saat se\xE7in, se\xE7ilen saat: ".concat(utils.format(value, 'fullTime')) : 'Saat seç';
  },
  // Table labels
  timeTableLabel: 'saat seç',
  dateTableLabel: 'tarih seç'
};
export var trTR = getPickersLocalization(trTRPickers);