لنقم بإنشاء غرض من التاريخ باستخدام الشهر التالي، ولكن لنقم بتمرير 0 الممثل لليوم:
```js run demo
function getLastDayOfMonth(year, month) {
  let date = new Date(year, month + 1, 0);
  return date.getDate();
}

alert( getLastDayOfMonth(2012, 0) ); // 31
alert( getLastDayOfMonth(2012, 1) ); // 29
alert( getLastDayOfMonth(2013, 1) ); // 28
```

تبدأ التواريخ عادة من 1، ولكن من الناحية الفنية يمكننا تمرير أية رقم، وسيقوم غرض التاريخ بتصحيح نفسه بشكل تلقائي، لذلك وعند تمرير القيمة 0، فهي تعني "يوم واحد قبل اليوم الأول من الشهر"، بمعنى آخر: "اليوم الأخير من الشهر السابق".
