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
>>>>>>> 9e3fa1351f80cfd6353a778a55b2c86bca9e895f

```js
let calculator = {
  // ... your code ...
};

calculator.read();
alert( calculator.sum() );
alert( calculator.mul() );
```

[demo]
