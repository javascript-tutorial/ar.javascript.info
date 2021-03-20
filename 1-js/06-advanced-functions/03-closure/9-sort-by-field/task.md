_الأهمية: 5_

---

### الترشيح حسب حقل الاستمارة

أمامنا مصفوفة كائنات علينا ترتيبها:

```js
let users = [
  { name: "John", age: 20, surname: "Johnson" },
  { name: "Pete", age: 18, surname: "Peterson" },
  { name: "Ann", age: 19, surname: "Hathaway" }
];
```
الطريقة الطبيعية هي الآتي:

```js
// by name (Ann, John, Pete)
users.sort((a, b) => a.name > b.name ? 1 : -1);

// by age (Pete, Ann, John)
users.sort((a, b) => a.age > b.age ? 1 : -1);
```

هل يمكن أن تكون بحروف أقل، هكذا مثلًا؟

```js
users.sort(byField('name'));
users.sort(byField('age'));
```

أي، بدل أن نكتب دالة، نضع `‎byField(fieldName)‎` فقط.

اكتب الدالة `‎byField‎` لنستعملها هكذا.

