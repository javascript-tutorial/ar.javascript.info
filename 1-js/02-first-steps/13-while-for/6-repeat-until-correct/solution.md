
```js run demo
let num;

do {
  num = prompt("ادخل رقم أكبر من 100?", 0);
} while (num <= 100 && num);
```

حلقة `do..while` تكرر طالما الشرطين محققين:

<<<<<<< HEAD
1. شرط `num <= 100` -- أن القيمة لا تزال أقل من أو تساوي `100`.
2. والشرط `&& num` يكون false عندما `num` تكون `null` أو نص فارغ. وهنا تتوقف حلقة `while`.
=======
1. The check for `num <= 100` -- that is, the entered value is still not greater than `100`.
2. The check `&& num` is false when `num` is `null` or an empty string. Then the `while` loop stops too.
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5

لاحظ أن إذا كان `num` يساوي `null` يكون الشرط `num <= 100` يساوي `true` لذلك لن تتوقف عملية الإدخال إذا قام المستخدم بإلغائها فكلا الشرطين مطلوب.
