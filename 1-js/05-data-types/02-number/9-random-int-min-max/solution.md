# الحل البسيط ولكن الخاطئ

الأبسط، ولكن الحل الخاطئ هو إنتاج قيمة من `min` الي `max` و تقريبها:

```js run
function randomInteger(min, max) {
  let rand = min + Math.random() * (max - min); 
  return Math.round(rand);
}

alert( randomInteger(1, 3) );
```

الـ function تعمل، ولكن هذا غير صحيح. احتمال الحصول على قيم متميزة `min` و `max` أقل بمرتين من أي مرة أخرى.

اذا استعنت بالمثال اعلاه عدة مرات، فسترى بسهولة ان  `2` يظهر في اغلب الاحيان.

هذا يحدث لأن `Math.round()` يحصل على أرقام عشوائية من الفترة الفاصلة `1..3` وتقربهم كما يلي:

```js no-beautify
values from 1    ... to 1.4999999999  become 1
values from 1.5  ... to 2.4999999999  become 2
values from 2.5  ... to 2.9999999999  become 3
```

الآن يمكننا أن نرى بوضوح أن `1` يحصل على قيم أقل بمرتين من `2`. ونفس الشيء مع `3`.

# الحل الصحيح

هناك العديد من الحلول الصحيحة لهذه المهمة. أحدها هو تعديل الحدود الفاصلة. لضمان نفس الفواصل، يمكننا خلق قيم من `0.5 to 3.5`، وبذلك نضيف الاحتمالات المطلوبة إلى الأطراف:

```js run
*!*
function randomInteger(min, max) {
  // now rand is from  (min-0.5) to (max+0.5)
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}
*/!*

alert( randomInteger(1, 3) );
```

يمكن أن تكون الطريقة البديلة هي استخدام `Math.floor` لرقم عشوائي من `min` الي `max+1`:

```js run
*!*
function randomInteger(min, max) {
  // here rand is from min to (max+1)
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
*/!*

alert( randomInteger(1, 3) );
```

الآن كل الفواصل مرسومة بهذه الطريقة:

```js no-beautify
values from 1  ... to 1.9999999999  become 1
values from 2  ... to 2.9999999999  become 2
values from 3  ... to 3.9999999999  become 3
```

فجميع الفترات الفاصلة متساوية الطول، مما يجعل التوزيع النهائي متماثلا.
