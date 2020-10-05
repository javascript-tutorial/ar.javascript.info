
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
>>>>>>> 181cc781ab6c55fe8c43887a0c060db7f93fb0ca

لاحظ أن إذا كان `num` يساوي `null` يكون الشرط `num <= 100` يساوي `true` لذلك لن تتوقف عملية الإدخال إذا قام المستخدم بإلغائها فكلا الشرطين مطلوب.
