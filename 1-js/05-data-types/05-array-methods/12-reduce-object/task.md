importance: 4

---

# انشاء مفاتيح خاصة بكائنات المصفوفة

<<<<<<< HEAD
دعنا نقول أننا نستقبل مصفوفة خاصة بالمستخدمين داخل form مكونة `{id:..., name:..., age... }`
=======
Let's say we received an array of users in the form `{id:..., name:..., age:... }`.
>>>>>>> a6fdfda09570a8ce47bb0b83cd7a32a33869cfad

اكتب دالة `groupById(arr)` لانشاء كائن منها يحتوى على `id` كمفتاح و عناصر المصفوفة كقيم

مثال :

```js
let users = [
  { id: "john", name: "John Smith", age: 20 },
  { id: "ann", name: "Ann Smith", age: 24 },
  { id: "pete", name: "Pete Peterson", age: 31 }
];

let usersById = groupById(users);

/*
// after the call we should have:

usersById = {
  john: {id: 'john', name: "John Smith", age: 20},
  ann: {id: 'ann', name: "Ann Smith", age: 24},
  pete: {id: 'pete', name: "Pete Peterson", age: 31},
}
*/
```

هذه الوظيفة مفيدة حقًا عند العمل مع بيانات الخادم.

في هذه المهمة نفترض أن `id` فريد. قد لا يكون هناك عنصران للصفيف بنفس "المعرف".

يُرجى استخدام طريقة الصفيف `.reduce` في الحل.
