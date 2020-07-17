الفكرة بسيطة: نقوم بطرح عدد معين من الأيام من التاريخ `date`:

```js
function getDateAgo(date, days) {
  date.setDate(date.getDate() - days);
  return date.getDate();
}
```

...ولكن يجب أن لا يغير التابع قيمة غرض التاريخ الممرر `date`. وهذه ملاحظة مهمة، لأن الكود الخارجي الذي يقوم بتمرير قيمة الغرض لا يتوقع أن يقوم التابع الخاص بنا بتعديل هذه القيمة.

لتنفيذ الطلب السابق، دعنا نقم باستنساخ التاريخ، كالتالي:

```js run demo
function getDateAgo(date, days) {
  let dateCopy = new Date(date);

  dateCopy.setDate(date.getDate() - days);
  return dateCopy.getDate();
}

let date = new Date(2015, 0, 2);

alert( getDateAgo(date, 1) ); // 1, (1 Jan 2015)
alert( getDateAgo(date, 2) ); // 31, (31 Dec 2014)
alert( getDateAgo(date, 365) ); // 2, (2 Jan 2014)
```
