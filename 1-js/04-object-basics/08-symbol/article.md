# الرمز (Symbol type)

كما ذُكر فى المصدر, فإن صفات الكائنات
(Object properties keys)
يمكن أن تكون نصًا
(string)
أو رمزًا
(symbol)
. ليست رقما أو قيمه منطقيه (boolean) وإنما عباره عن نصوص أو رموز, فقط هذين النوعين.

<<<<<<< HEAD
لقد استخدمنا حتى الآن النص فقط. فهيا نرى الفوائد التى يمكن أن توفرها لنا الرموز.

## الرموز
=======
By specification, only two primitive types may serve as object property keys:

- string type, or
- symbol type.

Otherwise, if one uses another type, such as number, it's autoconverted to string. So that `obj[1]` is the same as `obj["1"]`, and `obj[true]` is the same as `obj["true"]`.

Until now we've been using only strings.

Now let's explore symbols, see what they can do for us.
>>>>>>> 5dff42ba283bce883428c383c080fa9392b71df8

كلمة رمز فى الإنجليزيه تعنى معَرٌِف فريد من نوعه أى لا شئ مماثل له
Unique Identifier.

يمكن إنشاء قيمه من نوع الرمز باستخدام الداله `Symbol()`:

```js
let id = Symbol();
```

<<<<<<< HEAD
عند الإنشاء, يمكننا إعطاء الرمز وصفًا (ويمكن تسميته أيضا إسم الرمز), وهذا مفيد غالبا فى البحث عن الأخطاء وحلها.
=======
Upon creation, we can give symbols a description (also called a symbol name), mostly useful for debugging purposes:
>>>>>>> 5dff42ba283bce883428c383c080fa9392b71df8

```js
// id is a symbol with the description "id"
let id = Symbol('id');
```

<<<<<<< HEAD
إن الرموز مضمون بتفرُّدها. حتى فى حالة إنشاء عدة رموز بنفس الوصف, ولكنهم مختلفين فى القيمه. فالوصف مجرد وَسْم لا يؤثر على أى شيء.
=======
Symbols are guaranteed to be unique. Even if we create many symbols with exactly the same description, they are different values. The description is just a label that doesn't affect anything.
>>>>>>> 5dff42ba283bce883428c383c080fa9392b71df8

على سبيل المثال, هذان الرمزان لهما نفس الوصف -- ولكنهما غير متساويين:

```js run
let id1 = Symbol("id");
let id2 = Symbol("id");

*!*
alert(id1 == id2); // false
*/!*
```

إذا كنت تعرف لغة برمجه مثل
(Ruby)
أو أى لغة برمجة أخرى لديها شئ قريب من الرموز فلا تحتار

<<<<<<< HEAD
````warn header="الرموز لا تتحول إلى نص تلقائياً"
أغلب القيم فى جافا سكريبت يمكن تحويلها ضمنيًا إلى نص (string).
على سبيل المثال, يمكننا أن نعرض أى قيمه فى دالة التنبيه (`alert()`),
وستعمل, ولكن الرموز (Symbols) لها طابع خاص. فلا تسرى عليهم القاعده نفسها.
=======
So, to summarize, a symbol is a "primitive unique value" with an optional description. Let's see where we can use them.

````warn header="Symbols don't auto-convert to a string"
Most values in JavaScript support implicit conversion to a string. For instance, we can `alert` almost any value, and it will work. Symbols are special. They don't auto-convert.
>>>>>>> 5dff42ba283bce883428c383c080fa9392b71df8

على سبيل المثال, هذا الكود سيؤدى إلى ظهور خطأ:

```js run
let id = Symbol("id");
*!*
alert(id); // TypeError: Cannot convert a Symbol value to a string
*/!*
```

هذا لمنع الأخطاء غير المقصوده, لأن النصوص والرموز مختلفين تمام ولا يجب أن يتم تغيير واحد إلى الآخر عن طريق الخطأ.

<<<<<<< HEAD
إذا كنا نريد أن نعرض الرمز كما هو, فإننا نحتاج إلى أن نستدعى الداله
`.toString()`
مع هذا الرمز, كالمثال أدناه:
=======
If we really want to show a symbol, we need to explicitly call `.toString()` on it, like here:

>>>>>>> 5dff42ba283bce883428c383c080fa9392b71df8
```js run
let id = Symbol("id");
*!*
alert(id.toString()); // Symbol(id), now it works
*/!*
```

<<<<<<< HEAD
 أو نستدعى الخاصيه
`symbol.description`
لعرض الوصف فقط:
=======
Or get `symbol.description` property to show the description only:

>>>>>>> 5dff42ba283bce883428c383c080fa9392b71df8
```js run
let id = Symbol("id");
*!*
alert(id.description); // id
*/!*
```

````

## الخصائص المخفيه

<<<<<<< HEAD
باستخدام الرموز يمكننا أن ننشئ خصائص مخفيه لكائن ما
(object)
حيث لا يمكن لأى جزء آخر فى الكود أن يصل إليها ولا أن يعدل قيمتها عن طريق الخطأ.
=======

Symbols allow us to create "hidden" properties of an object, that no other part of code can accidentally access or overwrite.
>>>>>>> 5dff42ba283bce883428c383c080fa9392b71df8

على سبيل المثال, إذا كنا نعمل على كائن
`user`
والذى لا ينتمي إلى هذا الكود ولكننا نريد أن نضيف بعض الخصائص إليه.

هيا نستخدم رمزا من أجل ذلك:

```js run
let user = {
  // belongs to another code
  name: 'John',
};

let id = Symbol('id');

user[id] = 1;

alert(user[id]); // we can access the data using the symbol as the key
```

إذا ماهى فائدة استخدام
`Symbol("id")`
بدلا من النص
`"id"` ؟

<<<<<<< HEAD
حيث أن الكائن `user` ينتمي لكود خارجي وهذا الكود يعمل جيدا, إذا فلا يصح أن نضيف أى خاصيه لهذا الكائن. ولكن الرمز لا يمكن الوصول إليه عن طريق الخطأ مثل النص حيث أن الكود الخارجى لا يمكن أن يراه من الأساس, ولذلك هذه الطريقه تُعد صحيحه.

تخيل أيضا لو أن هناك برنامج (script) آخر يريد أن يضيف خاصية بداخل الكائن `user` لأغراضه الخاصه, هذا البرنامج الآخر يمكنه أن يكون مكتبه مبنية بجافا سكريبت ولذلك فإن هذه البرامج لا تعرف شيئا عن بعضها البعض.
=======
As `user` objects belong to another codebase, it's unsafe to add fields to them, since we might affect pre-defined behavior in that other codebase. However, symbols cannot be accessed accidentally. The third-party code won't be aware of newly defined symbols, so it's safe to add symbols to the `user` objects.

Also, imagine that another script wants to have its own identifier inside `user`, for its own purposes.
>>>>>>> 5dff42ba283bce883428c383c080fa9392b71df8

لذلك هذا البرنامج يمكنه أن ينشئ
`Symbol("id")`
الخاص به كالآتي:

```js
// ...
let id = Symbol('id');

user[id] = 'Their id value';
```

لن يكون هناك أى تعارض بين الخصائص وبعضها لأن الرموز دائما مختلفه ولا يمكن أن تتساوى حتى إن كان لهم نفس الإسم.

...ولكن ماذا لو استخدمنا نصًا بدلًا من رمز لنفس الغرض, فسيكون هناك تعارض:

```js
let user = { name: 'John' };

// Our script uses "id" property
user.id = 'Our id value';

// ...Another script also wants "id" for its purposes...

user.id = 'Their id value';
// Boom! overwritten by another script!
```

### Symbols in an object literal

إذا كنا نريد أن نضع رمزا بداخل كائن كخاصيه, فإننا نحتاج أن نضع حول الرمز أقواس مربعه `[]`

كالمثال الآتى:

```js
let id = Symbol("id");

let user = {
  name: "John",
*!*
  [id]: 123 // not "id": 123
*/!*
};
```

هذا لأننا نريد قيمة المتغير `id` كإسم للخاصيه ولا نريد النص "id".

### الرموز يتم تخطيها فى التكرار for .. in

الخصائص من نوع الرمز لا تشارك فى التكرار `for .. in`.

على سبيل المثال:

```js run
let id = Symbol("id");
let user = {
  name: "John",
  age: 30,
  [id]: 123
};

*!*
for (let key in user) alert(key); // name, age (no symbols)
*/!*

// the direct access by the symbol works
alert( "Direct: " + user[id] ); // Direct: 123
```

<<<<<<< HEAD
وأيضا يتم تجاهل الخصائص من نوع الرمز عند استخدام `Object.keys(user)`. لأن هذا جزء من المبدأ العام "إخفاء الخصائص الرمزيه"
"hiding symbolic properties". وبالمثل إذا كان هناك أى برنامج آخر يقوم أو مكتبه تقوم بالتكرار على الخصائص فى هذا الكائن فإنها لن تستطيع أن تصل إلى الخاصيه من نوع الرمز.
=======
[Object.keys(user)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) also ignores them. That's a part of the general "hiding symbolic properties" principle. If another script or a library loops over our object, it won't unexpectedly access a symbolic property.
>>>>>>> 5dff42ba283bce883428c383c080fa9392b71df8

على النقيض تماما فإن
[Object.assign](mdn:js/Object/assign)
تقوم بنسخ خصائص الكائن كلها سواءًا النصيه أو الرمزيه.

```js run
let id = Symbol('id');
let user = {
  [id]: 123,
};

let clone = Object.assign({}, user);

alert(clone[id]); // 123
```

هذا ليس تناقضا. هذا موجود فى تصميم اللغة نفسها. فالفكره وراء هذا هى أنه عندما نريد أن ننسخ كائنا ما فإننا نريد أن ننسخ كل الخصائص بما فيها من خصائص رمزيه.

## الرموز العامه

كما قلنا سابقًا, فإن الرموز عادةً ما تكون مختلفة حتى وإن كان لها نفس الوصف. ولكن فى بعض الأوقات أن نصل إلى هذا الرمز بالتحديد. على سبيل المثال, إذا كان هناك أجزاء مختلفه من البرنامج الخاص بنا تريد أن تصل إلى الرمز `"id"` تحديدا.

ليتم تنفيذ ذلك, فإن هناك مايسمى _مكان تسجيل الرموز العامه_
_global symbol registry_.
حيث يمكننا أن ننشئ رمزًا ومن خلال هذا المكان نستطيع أن نصل إليه فى وقت لاحق, ومكان تسجيل الرموز يضمن لنا أن تكرار محاولات الوصول إلى الرمز بنفس الإسم سيقوم بإرجاع نفس هذا الرمز فى كل محاوله.

لقراءة (أو يمكن أن نقول إنشاء رمز فى حالة عدم وجوده) فى مكان التسجيل, استخدم
`Symbol.for(key)`.

هذه الداله ترى إن كان هناك رمز فى مكان التسجيل تم وصفه باستخدام `key` ستقوم بإرجاعها. أما غير ذلك فستقوم بإنشاء رمز جديد `Symbol(key)` وتخزينه فى مكان التسجيل باستخدام الوصف `key`.

على سبيل المثال:

```js run
// read from the global registry
let id = Symbol.for('id'); // if the symbol did not exist, it is created

// read it again (maybe from another part of the code)
let idAgain = Symbol.for('id');

// the same symbol
alert(id === idAgain); // true
```

الرموز بداخل مكان التسجيل تسمي _رموزًا عامه_. فإذا كنا نريد رمزا متاحا فى البرنامج بأكمله ويمكن الوصول إليه من أى مكان -- فهذا هو سبب وجودها.

```smart header="هذا يبدو مثل لغة البرمجه Ruby"
فى بعض لغات البرمجه مثل Ruby فإن هناك رمزًا لكل إسم.

<<<<<<< HEAD
فى جافا سكريبت كما نرى فإن هذا صحيح بالنسبة إلى الرموز العامه.
=======
In JavaScript, as we can see, that's true for global symbols.
>>>>>>> 5dff42ba283bce883428c383c080fa9392b71df8
```

### Symbol.keyFor

<<<<<<< HEAD
بالنسبة إلى الرموز العامه فإنه لايوجد `Symbol.for(key)` التى تقوم بإرجاع الرمز باستخدام الإسم فقط، ولكن يوجد أيضا العكس `Symbol.keyFor(sym)` الذى يقوم بإرجاع الإسم باستخدام الرمز العام.
=======
We have seen that for global symbols, `Symbol.for(key)` returns a symbol by name. To do the opposite -- return a name by global symbol -- we can use: `Symbol.keyFor(sym)`:
>>>>>>> 5dff42ba283bce883428c383c080fa9392b71df8

على سبيل المثال:

```js run
// get symbol by name
let sym = Symbol.for('name');
let sym2 = Symbol.for('id');

// get name by symbol
alert(Symbol.keyFor(sym)); // name
alert(Symbol.keyFor(sym2)); // id
```

الداله `Symbol.keyFor` عندما تعمل تقوم باستخدام مكان تسجيل الرموز العام للبحث عن إسم للرمز, ولذلك فإنها لا تعمل إلا مع الرموز العامه. فإذا كان الرمز غير عام فلن تستطيع إيجاده وستقوم بإرجاع `undefined`.

<<<<<<< HEAD
يقال بأن كل رمز يملك الخاصيه `description`.
=======
That said, all symbols have the `description` property.
>>>>>>> 5dff42ba283bce883428c383c080fa9392b71df8

على سبيل المثال:

```js run
let globalSymbol = Symbol.for('name');
let localSymbol = Symbol('name');

alert(Symbol.keyFor(globalSymbol)); // name, global symbol
alert(Symbol.keyFor(localSymbol)); // undefined, not global

alert(localSymbol.description); // name
```

## الرموز الموجودة تلقائيا

هناك رموز كثيرة تستخدمها جافا سكريبت داخليًا ويمكننا استخدامها لأغراض معينه فى الكائنات الخاصه بنا.

هذه الرموز موجوده فى المصدر فى جدول [Well-known symbols](https://tc39.github.io/ecma262/#sec-well-known-symbols):

- `Symbol.hasInstance`
- `Symbol.isConcatSpreadable`
- `Symbol.iterator`
- `Symbol.toPrimitive`
- ...وغيرها.

على سبيل المثال، `Symbol.toPrimitive` تمكننا أن نحول الكائن إلى قيمه فرديه (primitive). وسنرى هذا فى القريب العاجل.

الرموز الأخرى أيضا ستكون مألوفه عندما ندرس استخداماتها فى مواضيع أخرى.

## الملخص

الرمز هو قيمه فرديه لخصائص فريده من نوعها (unique identifiers).

يتم إنشاء الرموز باستخدام الداله `Symbol()` ويمكن إضافه وصف بشكل اختيارى.

الرموز دائما ما تكون قيَمها مختلفه حتى وإن كانت بنفس الإسم. وإذا كنا نريد أن نصل إلى رمز بعينه فيجب علينا استخدام مكان التسجيل العام `global registry`: `Symbol.for(key)` تقوم بإرجاع (أو إنشاء فى حالة عدم وجوده) رمزًا عامًا حيث `jey` هو الإسم. والإستدعاء المتكرر للداله `Symbol.for` بنفس الإسم `key` ستقوم دائما بإرجاع نفس الرمز.

يتم استخدام الرموز فى حالتين:

1. خصائص الكائن المخفيه.

<<<<<<< HEAD
إذا كنا نريد أن نضيف خاصيه إلى كائن لا ينتمى إلى هذا الكود بل إلى برنامج آخر أو مكتبه، فعندئذ يمكننا إنشاء رمز واستخدامه كخاصيه. والخاصيه من نوع الرمز لا تظهر فى التكرار `for .. in`, ولذلك لا يمكن الوصول إلى الخاصيه عن طريق الخطأ أو أن تتعارض مع أى خاصية أخرى وذلك لأن البرنامج الآخر لا يملك الرمز الخاص بنا. وبالتالى ستظل الخاصيه محميه من الوصول إليها أو التعديل عليها.
=======
1. "Hidden" object properties.

    If we want to add a property into an object that "belongs" to another script or a library, we can create a symbol and use it as a property key. A symbolic property does not appear in `for..in`, so it won't be accidentally processed together with other properties. Also it won't be accessed directly, because another script does not have our symbol. So the property will be protected from accidental use or overwrite.
>>>>>>> 5dff42ba283bce883428c383c080fa9392b71df8

ولذلك يمكننا أن نُخفى أى شئ بداخل كائنات نحتاجها ولا يستطيع أى برنامج الوصول إليها باستخدام الخصائص من نوع الرموز.

2. هناك الكثير من الرموز الموجوده بالفعل فى جافا سكريبت والتى يمكن الوصول إليها عن طريق `Symbol.*`. ويمكننا استخدامهم لتغيير بعض السلوك الموجود بالفعل فى اللغه. على سبيل المثال فإننا فى موضوع مقبل سنستخدم `Symbol.iterator` من أجل التكراريات [iterables](info:iterable) وغيرها.

<<<<<<< HEAD
عمليًا، فإن الرموز لا تكون مخفية بالكامل. ولكن هناك داله موجوده تسمى [Object.getOwnPropertySymbols(obj)](mdn:js/Object/getOwnPropertySymbols) والتى تمكننا من الوصول إلى كل الرموز. ,توجد أيضًا دالة تسمي [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) والتى تقوم بإرجاع _كل_ الخصائص بداخل كائن معين بما فيها الخصائص التى من نوع الرمز. ولذلك فإن هذه الخصائص ليست مخفية بالكامل. ولكن أعلب المكتبات والدوال لا تستخدم هذه الوسائل.
=======
Technically, symbols are not 100% hidden. There is a built-in method [Object.getOwnPropertySymbols(obj)](mdn:js/Object/getOwnPropertySymbols) that allows us to get all symbols. Also there is a method named [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) that returns *all* keys of an object including symbolic ones. But most libraries, built-in functions and syntax constructs don't use these methods.
>>>>>>> 5dff42ba283bce883428c383c080fa9392b71df8
