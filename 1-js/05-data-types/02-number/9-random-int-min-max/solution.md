# الطريقة السهلة والخطأ

الحل الأسهل لكنه خطأ سيكون بتوليد قيمة من `min` إلى `max` وتقريبها:

```js run
function randomInteger(min, max) {
  let rand = min + Math.random() * (max - min); 
  return Math.round(rand);
}

alert( randomInteger(1, 3) );
```

الدالة تعمل لكنها خطأ. احتمال ظهور القيم الطرفية `min` و `max` أقل بمرتين من باقي القيم. إن شغلنا المثال أعلاه لعدة مرات، فينرى ظهور `2` بصورة أكبر.

يحدث ذلك لأن `Math.round()‎` تأخذ رقما من الفترة `1..3` وتُدَوِرها كما يلي:

```js no-beautify
values from 1    ... to 1.4999999999  become 1
values from 1.5  ... to 2.4999999999  become 2
values from 2.5  ... to 2.9999999999  become 3
```

نلاحظ الآن أن لدى `1` قيم أقل بمرتين من `2` وكذلك `3`.

# الطريقة الصحيحة

يوجد العديد من الطرق الصحيحة لحل هذه المهمة. إحداها هو بتعديل حدود الفترة. للتأكد من وجود  فرص متساوية، نُوَلِّد قيمًا من `0.5` إلى `3.5`، ثم إضافة الاحتمالات الممكنة للأطراف:

```js run
*!*
function randomInteger(min, max) {
  // (max+0.5) إلى (min-0.5) التقريب الآن من
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}
*/!*

alert( randomInteger(1, 3) );
```

طريقة بديلة هي استخدام الدالة `Math.floor` لرقم عشوائي من `min` إلى `max+1`:

```js run
*!*
function randomInteger(min, max) {
  // (max+1) إلى min التقريب الآن من 
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
*/!*

alert( randomInteger(1, 3) );
```

جميع الفترات أصبحت متوازنة الآن:

```js no-beautify
values from 1  ... to 1.9999999999  become 1
values from 2  ... to 2.9999999999  become 2
values from 3  ... to 3.9999999999  become 3
```

لدى جميع الفترات الطول ذاته مما يجعل التوزيع النهائي موحدًا.
