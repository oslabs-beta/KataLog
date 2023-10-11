import { getPickersLocalization } from './utils/getPickersLocalization';
var views = {
  hours: 'tunnit',
  minutes: 'minuutit',
  seconds: 'sekuntit'
};
var viewTranslation = {
  calendar: 'kalenteri',
  clock: 'kello'
};
var fiFIPickers = {
  // Calendar navigation
  previousMonth: 'Edellinen kuukausi',
  nextMonth: 'Seuraava kuukausi',
  // View navigation
  openPreviousView: 'avaa edellinen kuukausi',
  openNextView: 'avaa seuraava kuukausi',
  calendarViewSwitchingButtonAriaLabel: function calendarViewSwitchingButtonAriaLabel(view) {
    return view === 'year' ? 'vuosinäkymä on auki, vaihda kalenterinäkymään' : 'kalenterinäkymä on auki, vaihda vuosinäkymään';
  },
  inputModeToggleButtonAriaLabel: function inputModeToggleButtonAriaLabel(isKeyboardInputOpen, viewType) {
    return isKeyboardInputOpen ? "tekstikentt\xE4 on auki, mene ".concat(viewTranslation[viewType], "n\xE4kym\xE4\xE4n") : "".concat(viewTranslation[viewType], "n\xE4kym\xE4 on auki, mene tekstikentt\xE4\xE4n");
  },
  // DateRange placeholders
  start: 'Alku',
  end: 'Loppu',
  // Action bar
  cancelButtonLabel: 'Peruuta',
  clearButtonLabel: 'Tyhjennä',
  okButtonLabel: 'OK',
  todayButtonLabel: 'Tänään',
  // Toolbar titles
  datePickerDefaultToolbarTitle: 'Valitse päivä',
  dateTimePickerDefaultToolbarTitle: 'Valitse päivä ja aika',
  timePickerDefaultToolbarTitle: 'Valitse aika',
  dateRangePickerDefaultToolbarTitle: 'Valitse aikaväli',
  // Clock labels
  clockLabelText: function clockLabelText(view, time, adapter) {
    return "Valitse ".concat(views[view], ". ").concat(time === null ? 'Ei aikaa valittuna' : "Valittu aika on ".concat(adapter.format(time, 'fullTime')));
  },
  hoursClockNumberText: function hoursClockNumberText(hours) {
    return "".concat(hours, " tuntia");
  },
  minutesClockNumberText: function minutesClockNumberText(minutes) {
    return "".concat(minutes, " minuuttia");
  },
  secondsClockNumberText: function secondsClockNumberText(seconds) {
    return "".concat(seconds, " sekunttia");
  },
  // Open picker labels
  openDatePickerDialogue: function openDatePickerDialogue(rawValue, utils) {
    return rawValue && utils.isValid(utils.date(rawValue)) ? "Valitse p\xE4iv\xE4, valittu p\xE4iv\xE4 on ".concat(utils.format(utils.date(rawValue), 'fullDate')) : 'Valitse päivä';
  },
  openTimePickerDialogue: function openTimePickerDialogue(rawValue, utils) {
    return rawValue && utils.isValid(utils.date(rawValue)) ? "Valitse aika, valittu aika on ".concat(utils.format(utils.date(rawValue), 'fullTime')) : 'Valitse aika';
  },
  // Table labels
  timeTableLabel: 'valitse aika',
  dateTableLabel: 'valitse päivä'
};
export var fiFI = getPickersLocalization(fiFIPickers);