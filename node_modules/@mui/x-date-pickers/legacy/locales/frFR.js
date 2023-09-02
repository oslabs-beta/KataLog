import { getPickersLocalization } from './utils/getPickersLocalization';
var views = {
  hours: 'heures',
  minutes: 'minutes',
  seconds: 'secondes'
};
var viewTranslation = {
  calendar: 'calendrier',
  clock: 'horloge'
};
var frFRPickers = {
  // Calendar navigation
  previousMonth: 'Mois précédent',
  nextMonth: 'Mois suivant',
  // View navigation
  openPreviousView: 'Ouvrir la vue précédente',
  openNextView: 'Ouvrir la vue suivante',
  calendarViewSwitchingButtonAriaLabel: function calendarViewSwitchingButtonAriaLabel(view) {
    return view === 'year' ? 'La vue année est ouverte, ouvrir la vue calendrier' : 'La vue calendrier est ouverte, ouvrir la vue année';
  },
  inputModeToggleButtonAriaLabel: function inputModeToggleButtonAriaLabel(isKeyboardInputOpen, viewType) {
    return isKeyboardInputOpen ? "passer du champ text au ".concat(viewTranslation[viewType]) : "passer du ".concat(viewTranslation[viewType], " au champ text");
  },
  // DateRange placeholders
  start: 'Début',
  end: 'Fin',
  // Action bar
  cancelButtonLabel: 'Annuler',
  clearButtonLabel: 'Vider',
  okButtonLabel: 'OK',
  todayButtonLabel: "Aujourd'hui",
  // Toolbar titles
  // datePickerDefaultToolbarTitle: 'Select date',
  // dateTimePickerDefaultToolbarTitle: 'Select date & time',
  // timePickerDefaultToolbarTitle: 'Select time',
  // dateRangePickerDefaultToolbarTitle: 'Select date range',
  // Clock labels
  clockLabelText: function clockLabelText(view, time, adapter) {
    return "Choix des ".concat(views[view], ". ").concat(time === null ? 'Aucune heure choisie' : "L'heure choisie est ".concat(adapter.format(time, 'fullTime')));
  },
  hoursClockNumberText: function hoursClockNumberText(hours) {
    return "".concat(hours, " heures");
  },
  minutesClockNumberText: function minutesClockNumberText(minutes) {
    return "".concat(minutes, " minutes");
  },
  secondsClockNumberText: function secondsClockNumberText(seconds) {
    return "".concat(seconds, " secondes");
  },
  // Open picker labels
  openDatePickerDialogue: function openDatePickerDialogue(rawValue, utils) {
    return rawValue && utils.isValid(utils.date(rawValue)) ? "Choisir la date, la date s\xE9lectionn\xE9e est ".concat(utils.format(utils.date(rawValue), 'fullDate')) : 'Choisir la date';
  },
  openTimePickerDialogue: function openTimePickerDialogue(rawValue, utils) {
    return rawValue && utils.isValid(utils.date(rawValue)) ? "Choisir l'heure, l'heure s\xE9lectionn\xE9e est ".concat(utils.format(utils.date(rawValue), 'fullTime')) : "Choisir l'heure";
  },
  // Table labels
  timeTableLabel: "choix de l'heure",
  dateTableLabel: 'choix de la date'
};
export var frFR = getPickersLocalization(frFRPickers);