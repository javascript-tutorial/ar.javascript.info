_الأهمية: 5_

---

# العمل مع prototype

إليك شيفرة تُنشئ كائنين وتعدّلها.

ما القيم الّتي ستظهر في هذه العملية؟


```js
let animal = {
  jumps: null
};
let rabbit = {
  __proto__: animal,
  jumps: true
};

alert( rabbit.jumps ); // ? (1)

delete rabbit.jumps;

alert( rabbit.jumps ); // ? (2)

delete animal.jumps;

alert( rabbit.jumps ); // ? (3)
```

 هنالك ثلاث إجابات.
