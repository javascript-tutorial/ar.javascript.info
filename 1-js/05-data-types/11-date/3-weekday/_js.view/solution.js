function getLocalDay(date) {

  let day = date.getDay();

  if (day == 0) { // اليوم 0 (الأحد) هو اليوم رقم 7 في أوروبا
    day = 7;
  }

  return day;
}
