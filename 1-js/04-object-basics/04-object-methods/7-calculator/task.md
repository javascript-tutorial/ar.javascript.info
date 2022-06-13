الأهمية: 5

---

# إنشاء آلة حاسِبة

أنشئ كائنًا باسم `calculator` يحوي الدوال الثلاث التالية:

<<<<<<< HEAD
- `read()‎` تطلب قيمتين وتحفظها كخصائص الكائن.
- `sum()‎` تُرجِع مجموع القيم المحفوظة.
- `mul()‎` تضرب القيم المحفوظة وتُرجِع النتيجة.
=======
- `read()` prompts for two values and saves them as object properties with names `a` and `b` respectively.
- `sum()` returns the sum of saved values.
- `mul()` multiplies saved values and returns the result.
>>>>>>> 7bb6066eb6ea3a030b875cdc75433c458f80997e

```js
let calculator = {
  // ... your code ...
};

calculator.read();
alert( calculator.sum() );
alert( calculator.mul() );
```

[demo]
