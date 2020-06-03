السبب هو أن موجه إرجاع إدخال المستخدم كسلسلة.

حتى المتغيرات لها قيم "1" و "2" على التوالي.
```js run
let a = "1"; // prompt("First number?", 1);
let b = "2"; // prompt("Second number?", 2);

alert(a + b); // 12
```

ما يجب علينا فعله هو تحويل السلاسل إلى أرقام قبل `+`. على سبيل المثال ، استخدام `Number ()` أو إلحاقها بـ `+`.

على سبيل المثال ، قبل "prompt" مباشرةً:

```js run
let a = +prompt("First number?", 1);
let b = +prompt("Second number?", 2);

alert(a + b); // 3
```

أو في  `alert`:

```js run
let a = prompt("First number?", 1);
let b = prompt("Second number?", 2);

alert(+a + +b); // 3
```

استخدام كل من `+` أحادي وثنائي `في آخر كود. يبدو مضحك ، أليس كذلك؟