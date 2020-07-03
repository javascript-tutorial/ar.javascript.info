importance: 5

---

# خارطة بالكائنات

لديك مصفوفة مكونة من `user`و كل كائن من هذا يحتوى على `name` و `surname` و `id`

اكتب الكود اللازم لانتاج مصفوفة آخرى تحتوى على كائنات بها `id` و `fullName` و يكون الـ `fullName` ناتج من دمج `name` مع `surname`.

مثال :

```js no-beautify
let john = { name: "John", surname: "Smith", id: 1 };
let pete = { name: "Pete", surname: "Hunt", id: 2 };
let mary = { name: "Mary", surname: "Key", id: 3 };

let users = [ john, pete, mary ];

*!*
let usersMapped = /* ... your code ... */
*/!*

/*
usersMapped = [
  { fullName: "John Smith", id: 1 },
  { fullName: "Pete Hunt", id: 2 },
  { fullName: "Mary Key", id: 3 }
]
*/

alert( usersMapped[0].id ) // 1
alert( usersMapped[0].fullName ) // John Smith
```

لذلك ، فانك بالتأكيد بحاجة لاستخدام الخرائط map فحاول استخدام `=>` للتسهيل فى الاستخدام
