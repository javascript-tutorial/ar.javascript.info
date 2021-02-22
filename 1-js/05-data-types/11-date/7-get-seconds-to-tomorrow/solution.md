للحصول على عدد المللي ثانية حتى الغد، يمكننا من "الغد 00:00:00" طرح التاريخ الحالي.

أولاً، لنقم بإنشاء غرض الغد من التاريخ، ثم نقوم بعملية الطرح السابقة:

```js run
function getSecondsToTomorrow() {
  let now = new Date();
  
  // غرض تاريخ الغد
  let tomorrow = new Date(now.getFullYear(), now.getMonth(), *!*now.getDate()+1*/!*);

  let diff = tomorrow - now; // الفرق من مرتبة المللي ثانية
  return Math.round(diff / 1000); // التحويل لمرتبة الثواني
}
```

حل بديل:

```js run
function getSecondsToTomorrow() {
  let now = new Date();
  let hour = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let totalSecondsToday = (hour * 60 + minutes) * 60 + seconds;
  let totalSecondsInADay = 86400;

  return totalSecondsInADay - totalSecondsToday;
}
```

يرجى ملاحظة أن العديد من البلدان لديها التوقيت الصيفي (DST)، لذلك قد يكون هناك أيام بِ 23 أو 25 ساعة. لذلك، يجب معاملة هذه الأيام بشكل منفصل.
