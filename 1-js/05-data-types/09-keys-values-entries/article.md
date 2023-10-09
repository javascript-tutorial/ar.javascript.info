# مفاتيح الكائنات وقيمها ومدخلاتها

لنأخذ راحة صغيرة بعيدًا عن بنى البيانات ولنتحدّث عن طريقة المرور على عناصرها.

رأينا في الفصل السابق التوابِع `map.keys()`‎ و `map.values()`و `map.entries()`. هذه التوابِع عامّة وقد اتّفق معشر المطوّرين على استعمالها عند التعامل مع بنى البيانات. ولو أنشأنا بنية بيانات من الصفر بيدنا، فعلينا توفير "تنفيذ" تلك التوابِع أيضًا. هي أساسًا مدعومة لكلّ من:

- `Map` الخرائط
- `Set` الأطقم
- `Array` المصفوفات

كما وتدعم الكائنات العادية توابِع كتلك التوابِع باختلاف بسيط في صياغتها.

## التوابِع keys وvalues وentries

هذه هي التوابِع المتاحة للتعامل مع الكائنات العادية:

- [Object.keys(obj)](mdn:js/Object/keys) -- يُعيد مصفوفة من المفاتيح.
- [Object.values(obj)](mdn:js/Object/values) -- يُعيد مصفوفة من القيم.
- [Object.entries(obj)](mdn:js/Object/entries) -- يُعيد مصفوفة من أزواج [key, value].

لاحظ رجاءً الفروق بينها وبين الخارطة مثلًا:

|                 | Map          | Object                                   |
| --------------- | ------------ | ---------------------------------------- |
| صياغة الاستدعاء | `map.keys()` | `Object.keys(obj)`, لكن ليس `obj.keys()` |
| قيمة الإعادة    | مكرر         | مصفوفة ”حقيقية“                          |

أوّل فرق واضح جليّ: علينا استدعاء Object.keys(obj)‎ لا obj.keys()‎. ولكن لماذا؟ السبب الأساس هو مرونة الاستعمال. لا تنسَ بأنّ الكائنات هي أساس كلّ بنية بيانات معقّدة في جافا سكريبت. يحدث بأنّ لدينا كائن طوّرناه ليحمل بيانات data محدّدة، وفيه التابِع data.values()‎، ولكنّا نريد أيضًا استدعاء Object.values(data)‎ عليه.

الفرق الثاني هو أنّ التوابِع Object.\* تُعيد كائنات مصفوفات ”فعلية“ لا مُتعدَّدات فقط. يعزو ذلك لأسباب تاريخية بحتة. خُذ هذا المثال:

```js
let user = {
  name: "John",
  age: 30
};
```

- `Object.keys(user) = ["name", "age"]`
- `Object.values(user) = ["John", 30]`
- `Object.entries(user) = [ ["name","John"], ["age",30] ]`

وهذا مثال آخر عن كيف نستعمل Object.values للمرور على قيم الخاصيات:

```js run
let user = {
  name: "John",
  age: 30
};

// loop over values
for (let value of Object.values(user)) {
  alert(value); // John, then 30
}
```

```warn header="Object.keys/values/entries تتجاهل هذه التوابِع الخاصيات الرمزية"
كما تتجاهل حلقة for..in الخاصيات التي تستعمل Symbol(...)‎ مفاتيح لها، فهذه التوابِع أعلاه تتجاهلها أيضًا

غالبًا يكون هذا ما نريد، ولكن لو أردت المفاتيح الرمزية أيضًا، فعليك استعمال التابِع المنفصل [Object.getOwnPropertySymbols](mdn:js/Object/getOwnPropertySymbols) إذ يُعيد مصفوفة بالمفاتيح الرمزية فقط. هناك أيضًا التابِع [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) إذ يُعيد المفاتيح كلها.
```

## تعديل محتوى الكائنات

ليس للكائنات تلك التوابِع المفيدة المُتاحة للعناصر (مثل map وfilter وغيرها). لو أردنا تطبيق هذه التوابِع على الكائنات فيجب أوّلًا استعمال Object.entries وبعدها Object.fromEntries:

1. استعمل Object.entries(obj)‎ لتأخذ مصفوفة لها أزواج ”مفتاح/قيمة“ من الكائن obj.
2. استعمل توابِع المصفوفات على تلك المصفوفة (مثلًا map).
3. استعمل Object.fromEntries(array)‎ على المصفوفة الناتج لتُحوّلها ثانيةً إلى كائن.

<<<<<<< HEAD
إليك مثالًا لدينا كائنًا فيه تسعير البضائع، ونريد مضاعفتها (إذ ارتفع الدولار):
=======
1. Use `Object.entries(obj)` to get an array of key/value pairs from `obj`.
2. Use array methods on that array, e.g. `map`, to transform these key/value pairs.
3. Use `Object.fromEntries(array)` on the resulting array to turn it back into an object.

For example, we have an object with prices, and would like to double them:
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c

```js run
let prices = {
  banana: 1,
  orange: 2,
  meat: 4,
};

*!*
let doublePrices = Object.fromEntries(
<<<<<<< HEAD
  // ‫نحوّله إلى مصفوفة، ثمّ نستعمل الطقم، ثمّ يُعيد إلينا fromEntries الكائن المطلوب
  Object.entries(prices).map(([key, value]) => [key, value * 2])
=======
  // convert prices to array, map each key/value pair into another pair
  // and then fromEntries gives back the object
  Object.entries(prices).map(entry => [entry[0], entry[1] * 2])
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c
);
*/!*

alert(doublePrices.meat); // 8
```

<<<<<<< HEAD
ربّما تراه صعبًا أوّل وهلة، ولكن لا تقلق فسيصير أسهل أكثر متى ما بدأت استعمالها مرّة واثنتان وثلاث. يمكن أن نصنع سلسلة فعّالة من التعديلات بهذه الطريقة:
=======
It may look difficult at first sight, but becomes easy to understand after you use it once or twice. We can make powerful chains of transforms this way.
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c
