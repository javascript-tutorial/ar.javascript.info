تقوم الطريقة `()date.getDay` بإرجاع رقم يوم الأسبوع المقابل، بدءاً من يوم الأحد.

لنقم بإنشاء مصفوفة من أيام الأسبوع، حتى نتمكن من الحصول على اسم اليوم المقابل من خلال رقمه:

```js run demo
function getWeekDay(date) {
  let days = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

  return days[date.getDay()];
}

let date = new Date(2014, 0, 3); // 3 Jan 2014
alert( getWeekDay(date) ); // FR
```
