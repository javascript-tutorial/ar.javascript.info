

```js run demo
let a = +prompt("The first number?", "");
let b = +prompt("The second number?", "");

alert( a + b );
```

لاحظ الـ  unary plus `+` قبل `prompt`. انها تحول القيمة فورا إلى رقم
.

من ناحية أخرى, `a` و `b` سيكون نصا لمجموعهم  سيكون دمجا لهم ,هذا: `"1" + "2" = "12"`.