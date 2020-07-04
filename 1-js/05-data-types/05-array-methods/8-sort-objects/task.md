importance: 5

---

# فرز المستخدمين حسب أعمارهم

اكتب دالة sortByAge(users)‎ تأخذ مصفوفة من الكائنات بالصفة age وتُرتبّها حسب أعمارهم age.

مثال:

```js no-beautify
let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 28 };

let arr = [pete, john, mary];

sortByAge(arr);

// now: [john, mary, pete]
alert(arr[0].name); // John
alert(arr[1].name); // Mary
alert(arr[2].name); // Pete
```
