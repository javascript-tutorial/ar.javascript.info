نحن بحاجة إلى "رسم" كل القيم من الفترة 0..1 إلى قيم من `min` الي `max`.

يمكن القيام بذلك على مرحلتين:

1. إذا ضَربنَا عدد عشوائي مِنْ 0..1 مِنْ خِلال `max-min`, ثم تزداد الفترة الفاصلة بين القيم المحتملة `0..1` الي `0..max-min`.
2. الآن إذا أضفنا `min`, الفترة المحتملة تصبح من `min` الي `max`.

الـ function:

```js run
function random(min, max) {
  return min + Math.random() * (max - min);
}

alert( random(1, 5) ); 
alert( random(1, 5) ); 
alert( random(1, 5) ); 
```

