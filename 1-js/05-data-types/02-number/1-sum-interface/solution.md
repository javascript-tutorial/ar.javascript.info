

```js run demo
let a = +prompt("The first number?", "");
let b = +prompt("The second number?", "");

alert( a + b );
```

لاحظ عامل الجمع الأحادي `+` قبل `prompt`. يحوِّل القيم إلى أعداد. وإلا فإن `a` و `b` ستكون نصوصًا وسيكون مجموعهما بدمجهما: `"1" + "2" = "12"`.