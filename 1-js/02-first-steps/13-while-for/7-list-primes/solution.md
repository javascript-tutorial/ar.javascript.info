يوجد العديد من الخوارزميات لهذا السؤال.

دعنا نستخدم حلقات متداخلة:

```js
For each i in the interval {
  check if i has a divisor from 1..i
  if yes => the value is not a prime
  if no => the value is a prime, show it
}
```

الكود باستخدام عناوين:

```js run
let n = 10;

nextPrime:
for (let i = 2; i <= n; i++) { // for each i...

  for (let j = 2; j < i; j++) { // look for a divisor..
    if (i % j == 0) continue nextPrime; // not a prime, go next i
  }

  alert( i ); // a prime
}
```

يوجد العديد من الطرق لجلعه أفضل. مثلا يمكننا البحث عن القيم التي تقبل القسمة من `2` حتى الجذر التربيعي ل `i`. ولكن إذا أردنا أن نكون أفضل مع الأرقام الكبيرة يجب استخدام بعض الرياضيات المعقدة وخوارزميات مثل [Quadratic sieve](https://en.wikipedia.org/wiki/Quadratic_sieve), [General number field sieve](https://en.wikipedia.org/wiki/General_number_field_sieve) etc.
