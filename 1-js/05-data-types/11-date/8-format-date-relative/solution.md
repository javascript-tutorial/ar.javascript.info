للحصول على الوقت المنصرم منذ التاريخ `date` حتى الآن -- لنقم بطرح التاريخين.

```js run demo
function formatDate(date) {
  let diff = new Date() - date; // الفرق من مرتبة المللي ثانية

  if (diff < 1000) { // أقل من ثانية
    return 'الآن';
  }

  let sec = Math.floor(diff / 1000); // تحويل الفرق لمرتبة الثواني

  if (sec < 60) {
    return 'منذ ' + sec + ' ثانية';
  }

  let min = Math.floor(diff / 60000); // تحويل الفرق لمرتبة الدقائق
  if (min < 60) {
    return 'منذ ' + min + ' دقيقة';
  }

  // تنسيق التاريخ
  // إضافة الأصفار بادئة إلى اليوم/الشهر/الساعات/الدقائق المكونة من رقم واحد
  let d = date;
  d = [
    '0' + d.getDate(),
    '0' + (d.getMonth() + 1),
    '' + d.getFullYear(),
    '0' + d.getHours(),
    '0' + d.getMinutes()
  ].map(component => component.slice(-2)); // أخذ آخر رقمين من كل مكوّن

  // جمع المكونات في تاريخ واحد
  return d.slice(0, 3).join('.') + ' ' + d.slice(3).join(':');
}

alert( formatDate(new Date(new Date - 1)) ); // "الآن"

alert( formatDate(new Date(new Date - 30 * 1000)) ); // "منذ 30 ثانية"

alert( formatDate(new Date(new Date - 5 * 60 * 1000)) ); // "منذ 5 دقيقة"

// تاريخ الغد كـ 20:00 31.12.2016
alert( formatDate(new Date(new Date - 86400 * 1000)) );
```

حل بديل:

```js run
function formatDate(date) {
  let dayOfMonth = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let diffMs = new Date() - date;
  let diffSec = Math.round(diffMs / 1000);
  let diffMin = diffSec / 60;
  let diffHour = diffMin / 60;

  // التنسيق
  year = year.toString().slice(-2);
  month = month < 10 ? '0' + month : month;
  dayOfMonth = dayOfMonth < 10 ? '0' + dayOfMonth : dayOfMonth;
  hour = hour < 10 ? '0' + hour : hour;
  minutes = minutes < 10 ? '0' + minutes : minutes;

  if (diffSec < 1) {
    return 'الآن';  
  } else if (diffMin < 1) {
    return `منذ ${diffSec} ثواني`;
  } else if (diffHour < 1) {
    return `منذ ${diffMin} دقيقة`;
  } else {
    return `${dayOfMonth}.${month}.${year} ${hour}:${minutes}`
  }
}
```
