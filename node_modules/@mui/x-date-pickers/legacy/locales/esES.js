import { getPickersLocalization } from './utils/getPickersLocalization';
var views = {
  hours: 'las horas',
  minutes: 'los minutos',
  seconds: 'los segundos'
};
var esESPickers = {
  // Calendar navigation
  previousMonth: 'Último mes',
  nextMonth: 'Próximo mes',
  // View navigation
  openPreviousView: 'abrir la última vista',
  openNextView: 'abrir la siguiente vista',
  calendarViewSwitchingButtonAriaLabel: function calendarViewSwitchingButtonAriaLabel(view) {
    return view === 'year' ? 'la vista del año está abierta, cambie a la vista de calendario' : 'la vista de calendario está abierta, cambie a la vista del año';
  },
  inputModeToggleButtonAriaLabel: function inputModeToggleButtonAriaLabel(isKeyboardInputOpen, viewType) {
    return isKeyboardInputOpen ? "la vista de entrada de texto est\xE1 abierta, ir a la vista ".concat(viewType) : "la vista ".concat(viewType, " est\xE1 abierta, ir a la vista de entrada de texto");
  },
  // DateRange placeholders
  start: 'Empezar',
  end: 'Terminar',
  // Action bar
  cancelButtonLabel: 'Cancelar',
  clearButtonLabel: 'Limpiar',
  okButtonLabel: 'OK',
  todayButtonLabel: 'Hoy',
  // Toolbar titles
  datePickerDefaultToolbarTitle: 'Seleccionar fecha',
  dateTimePickerDefaultToolbarTitle: 'Seleccionar fecha & hora',
  timePickerDefaultToolbarTitle: 'Seleccionar hora',
  dateRangePickerDefaultToolbarTitle: 'Seleccionar rango de fecha',
  // Clock labels
  clockLabelText: function clockLabelText(view, time, adapter) {
    return "Seleccione ".concat(views[view], ". ").concat(time === null ? 'Sin tiempo seleccionado' : "El tiempo seleccionado es ".concat(adapter.format(time, 'fullTime')));
  },
  hoursClockNumberText: function hoursClockNumberText(hours) {
    return "".concat(hours, " horas");
  },
  minutesClockNumberText: function minutesClockNumberText(minutes) {
    return "".concat(minutes, " minutos");
  },
  secondsClockNumberText: function secondsClockNumberText(seconds) {
    return "".concat(seconds, " segundos");
  },
  // Open picker labels
  openDatePickerDialogue: function openDatePickerDialogue(rawValue, utils) {
    return rawValue && utils.isValid(utils.date(rawValue)) ? "Elige la fecha, la fecha elegida es ".concat(utils.format(utils.date(rawValue), 'fullDate')) : 'Elige la fecha';
  },
  openTimePickerDialogue: function openTimePickerDialogue(rawValue, utils) {
    return rawValue && utils.isValid(utils.date(rawValue)) ? "Elige la hora, la hora elegido es ".concat(utils.format(utils.date(rawValue), 'fullTime')) : 'Elige la hora';
  },
  // Table labels
  timeTableLabel: 'elige la fecha',
  dateTableLabel: 'elige la hora'
};
export var esES = getPickersLocalization(esESPickers);