لا يمكننا استبدال الحرف الأول، لأن النصوص في JavaScript غير قابلة للتعديل. لكن، يمكننا إنشاء نص جديد وفقًا للنص الموجود، مع تكبير الحرف الأول: 

```js
let newStr = str[0].toUpperCase() + str.slice(1);
```

لكن، يوجد مشكلة صغيرة، وهي إن كان `str` فارغًا، فسيصبح `str[0]‎` قيمة غير معرفة `undefined`، ولأن `undefined` لا يملك الدالة `toUpperCase()‎` فسيظهر خطأ.

<<<<<<< HEAD
يوجد طريقتين بديلتين هنا:
1- استخدام `str.charAt(0)‎`، لأنها تُرجِع نصًا دائمًا (ربما نصًا فارغًا).
2- إضافة اختبار في حال كان النص فارغًا.

هنا الخيار الثاني:

=======
The easiest way out is to add a test for an empty string, like this:
>>>>>>> 9e3fa1351f80cfd6353a778a55b2c86bca9e895f

```js run demo
function ucFirst(str) {
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1);
}

alert( ucFirst("john") ); // John
```
