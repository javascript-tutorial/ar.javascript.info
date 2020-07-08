لا يمكننا استبدال الحرف الأول، لأن النصوص في JavaScript غير قابلة للتعديل. لكن، يمكننا إنشاء نص جديد وفقًا للنص الموجود، مع تكبير الحرف الأول: 

```js
let newStr = str[0].toUpperCase() + str.slice(1);
```

لكن، يوجد مشكلة صغيرة، وهي إن كان `str` فارغًا، فسيصبح `str[0]‎` قيمة غير معرفة `undefined`، ولأن `undefined` لا يملك الدالة `toUpperCase()‎` فسيظهر خطأ.

يوجد طريقتين بديلتين هنا:
1- استخدام `str.charAt(0)‎`، لأنها تُرجِع نصًا دائمًا (ربما نصًا فارغًا).
2- إضافة اختبار في حال كان النص فارغًا.

هنا الخيار الثاني:


```js run demo
function ucFirst(str) {
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1);
}

alert( ucFirst("john") ); // John
```

