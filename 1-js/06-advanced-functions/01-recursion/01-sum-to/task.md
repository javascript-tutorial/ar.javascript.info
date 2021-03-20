importance: 5

---

# أجمع كل الأرقام إلي الرقم المُعطى

أكتب دالة `sumTo(n)` لحساب مجموع الارقام هكذا numbers `1 + 2 + ... + n`.

Write a function `sumTo(n)` that calculates the sum of numbers `1 + 2 + ... + n`.

مثلاً:

```js no-beautify
sumTo(1) = 1
sumTo(2) = 2 + 1 = 3
sumTo(3) = 3 + 2 + 1 = 6
sumTo(4) = 4 + 3 + 2 + 1 = 10
...
sumTo(100) = 100 + 99 + ... + 2 + 1 = 5050
```

أستخدم ثلاث طرق مختلفة:

1. استخدم حلقة `for`.
2. استخدم التكرار (مساعدة: `sumTo(n) = n + sumTo(n-1)` for `n > 1`)
3. استخدم [المتتالية العددية](https://en.wikipedia.org/wiki/Arithmetic_progression).

مثال علي الناتج: 

```js
function sumTo(n) { /*... your code ... */ }

alert( sumTo(100) ); // 5050
```

1. ما الحل الاسرع؟ وما الابطأ؟ ولماذا؟

2. نستطيع إستخدام التكرار للعد `sumTo(100000)`?
