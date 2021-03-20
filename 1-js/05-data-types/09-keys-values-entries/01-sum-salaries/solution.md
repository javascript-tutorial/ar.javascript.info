```js run demo
function sumSalaries(salaries) {
  let sum = 0;
  for (let salary of Object.values(salaries)) {
    sum += salary;
  }

  return sum; // 650
}

let salaries = {
  John: 100,
  Pete: 300,
  Mary: 250
};

alert(sumSalaries(salaries)); // 650
```

أو يمكننا (لو أردنا) معرفة المجموع باستعمال Object.values والتابِع reduce:

```js
// ‫يمرّ reduce على مصفوفة من الرواتب،
// ويجمعها مع بعضها ويُعيد الناتج
function sumSalaries(salaries) {
  return Object.values(salaries).reduce((a, b) => a + b, 0); // 650
}
```
