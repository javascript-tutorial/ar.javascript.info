نريد تعيين جميع القيم من الفترة 0…1 إلى القيم من `min` إلى `max`. يمكن القيام بذلك في مرحلتين:
1. إذا ضربنا قيمة عشوائية من 0…1 في `max-min`. فإن فترة القيم الممكنة تزيد `0..1` إلى `0..max-min`.
2. إذا أضفنا `min` الآن، تصبح الفترة من `min` إلى `max`.

الدالة:


```js run
function random(min, max) {
  return min + Math.random() * (max - min);
}

alert( random(1, 5) ); 
alert( random(1, 5) ); 
alert( random(1, 5) ); 
```

