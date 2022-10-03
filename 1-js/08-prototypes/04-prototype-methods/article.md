# أدوات النموذج والإستغناء عن الخاصية proto

فى أول فصل من هذا الجزء تكلمنا عن أن هناك دوال جديدة لعمل نموذج (prototype).

تعتبر الخاصية `__proto__` قديمة وغير مدعومة (فى عمل جافا سكريبت فى المتصفحات فقط).

<<<<<<< HEAD
الدوال الحديثة هي:
=======
Setting or reading the prototype with `obj.__proto__` is considered outdated and somewhat deprecated (moved to the so-called "Annex B" of the JavaScript standard, meant for browsers only).
>>>>>>> 18b1314af4e0ead5a2b10bb4bacd24cecbb3f18e

The modern methods to get/set a prototype are:

- [Object.getPrototypeOf(obj)](mdn:js/Object/getPrototypeOf) -- returns the `[[Prototype]]` of `obj`.
- [Object.getPrototypeOf(obj)](mdn:js/Object/getPrototypeOf) -- تقوم بإرجاع الخاصية `[[Prototype]]` من الكائن `obj`.
- [Object.setPrototypeOf(obj, proto)](mdn:js/Object/setPrototypeOf) -- تجعل الخاصية `[[Prototype]]` من الكائن `obj` تشير إلى `proto`.

<<<<<<< HEAD
وهذه الدوال يجب استخدامها بلًا من `__proto__`.
=======
The only usage of `__proto__`, that's not frowned upon, is as a property when creating a new object: `{ __proto__: ... }`.

Although, there's a special method for this too:

- [Object.create(proto, [descriptors])](mdn:js/Object/create) -- creates an empty object with given `proto` as `[[Prototype]]` and optional property descriptors.
>>>>>>> 18b1314af4e0ead5a2b10bb4bacd24cecbb3f18e

عل ىسبيل المثال:

```js run
let animal = {
  eats: true
};

// تقوم بإنشاء كان جديد حيث أن الكائن animal نموذج له
*!*
let rabbit = Object.create(animal); // same as {__proto__: animal}
*/!*

alert(rabbit.eats); // true

*!*
alert(Object.getPrototypeOf(rabbit) === animal); // true
*/!*

*!*
Object.setPrototypeOf(rabbit, {}); // تغيير نموذج الكائن rabbit إلى {}
*/!*
```

<<<<<<< HEAD
تستقبل الدالة `Object.create` متغيرًا إضافيًا بشكل اختيارى وهو واصف الخاصية (property descriptors) حيث يمكننا إضافة خصائص إضافية للكائن الجديد كالآتى:
=======
The `Object.create` method is a bit more powerful, as it has an optional second argument: property descriptors.

We can provide additional properties to the new object there, like this:
>>>>>>> 18b1314af4e0ead5a2b10bb4bacd24cecbb3f18e

```js run
let animal = {
  eats: true,
};

let rabbit = Object.create(animal, {
  jumps: {
    value: true,
  },
});

alert(rabbit.jumps); // true
```

وتكون الواصفات على نفس الطريقة الموصوفة سابقًا فى فصل <info:property-descriptors>.

يمكننا استخدام `Object.create` للقيام بنسخ كائن بشكل أفضل من نسخ الخصائص باستخدام التكرار `for..in`:

```js
<<<<<<< HEAD
// كائن جديد مماثل تمامًا
let clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
=======
let clone = Object.create(
  Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj)
);
>>>>>>> 18b1314af4e0ead5a2b10bb4bacd24cecbb3f18e
```

هذا الإستدعاء يقوم بإنشاء نسخه طبق الأصل من الكائن `obj` بما فيه من خصائص سواءًا كانت معدودة (enumerable) أم لا وكذلك الجالبات والمغيرات (getters & setters) -- كل شيئ وبالخاصية `[[Prototype]]` الصحيحة.

<<<<<<< HEAD
## نبذة من التاريخ

إذا عددنا كل الطرق للتحكم فى `[[Prototype]]`، فهناك الكثير! توجد الكثير من الطرق للقيام بنفس الشيئ!

لماذا؟
=======

## Brief history

There're so many ways to manage `[[Prototype]]`. How did that happen? Why?
>>>>>>> 18b1314af4e0ead5a2b10bb4bacd24cecbb3f18e

هذا لأسباب تاريخية متأصّلة.

<<<<<<< HEAD
- خاصية ال`"prototype"` لدالة بانية (constructor function) موجودة من زمان بعيد.
- لاحقًا فى عام 2012 ظهرت الدالة `Object.create`. حيث تمكِّن من إنشاء كائنات بنموذج مُعطي ولكن لا تعطي الإمكانية لجلب أو تعديل الخصائص، ولذلك قامت المتصفحات بإضافة الخاصية `__proto__` الغير موثقة فى المصدر والتى تسمح للمستخدم أن يجلب أو يعدل النموذج فى أى وقت.
- لاحقًا فى عام 2015 ظهرت الدالتين `Object.setPrototypeOf` و `Object.getPrototypeOf` للقيام بنفس وظيفة الخاصية `__proto__` وحيث أن الخاصية `__proto__` موجودة فى كل مكان تقريبًا فقد أصبحت قديمة وأصبحت فى طريقها إلى (Annex B) من المصدر وبالتالى أصبحت اختيارية لبيئة جافا سكريبت غير المتصفحات.

والآن أصبح فى تصرفنا كل هذه الطرق.

لماذا تم استبدال الخاصية `__proto__` بالدوال `getPrototypeOf/setPrototypeOf`؟ هذا سؤال مهم ويستدعينا أن نفهم لماذا تعد الخاصية `__proto__` سيئة. أكمل القراءة لتحصل على الإجابة.
=======
The prototypal inheritance was in the language since its dawn, but the ways to manage it evolved over time.

- The `prototype` property of a constructor function has worked since very ancient times. It's the oldest way to create objects with a given prototype.
- Later, in the year 2012, `Object.create` appeared in the standard. It gave the ability to create objects with a given prototype, but did not provide the ability to get/set it. Some browsers implemented the non-standard `__proto__` accessor that allowed the user to get/set a prototype at any time, to give more flexibility to developers.
- Later, in the year 2015, `Object.setPrototypeOf` and `Object.getPrototypeOf` were added to the standard, to perform the same functionality as `__proto__`. As `__proto__` was de-facto implemented everywhere, it was kind-of deprecated and made its way to the Annex B of the standard, that is: optional for non-browser environments.
- Later, in the year 2022, it was officially allowed to use `__proto__` in object literals `{...}` (moved out of Annex B), but not as a getter/setter `obj.__proto__` (still in Annex B).

Why was `__proto__` replaced by the functions `getPrototypeOf/setPrototypeOf`?

Why was `__proto__` partially rehabilitated and its usage allowed in `{...}`, but not as a getter/setter?

That's an interesting question, requiring us to understand why `__proto__` is bad.

And soon we'll get the answer.
>>>>>>> 18b1314af4e0ead5a2b10bb4bacd24cecbb3f18e

```warn header="لا تغير الخاصية `[[Prototype]]`فى كائن موجود إذا كانت السرعة تهمك" عمليًا يمكننا أن نجلب أو نعدّل الخاصية`[[Prototype]]`فى أى وقت، ولكن عادة ما نضع ليها قيمة فقط عند إنشاء الكائن ولا نعدلها بعد ذلك: يرث الكائن`rabbit`من الكائن`animal` وهذا لن يتغير.

ومحركات جافا سكريبت جاهزة للتعامل مع ذلك بسرعة فائقة. فتغيير النموذج وقت التنفيذ باستخدام `Object.setPrototypeOf` أو `obj.__proto__=` بطيئ جدًا ويبطئ عملية استجلاب الخصائص. ولذلك تجنب ذلك إلا إذا كنت تعرف ماذا تفعل أو أن السرعة لا تهمك.

````

## الكائنات "العادية جدًا" [#very-plain]

كما نعلم، فإنه يمكن استخدام الكائنات كقوائم مترابطة لتخزين خاصية بقيمتها.

...ولكن إذا حاولنا أن نخزن خصائص أعطاها المستخدم فيها فيمكننا أن نرى خللًا مهمًا: كل الخصائص تعمل جيدًا عدا `"__proto__"`.

أنظر إلى هذا المثال:

```js run
let obj = {};

let key = prompt("What's the key?", "__proto__");
obj[key] = "some value";

alert(obj[key]); // [object Object], وليست "some value"!
````

<<<<<<< HEAD
هنا إذا قام المستخدم بكتابة `__proto__`، فإن ماكتبه سيتم تجاهله!

هذا لا يجب أن يفاجئنا، فالخاصية `__proto__` لها تعامل خاص: لأنها يجب أن تكون كائنًا أو `null`، ولا يمكن أن يكون النص نموذجًا.
=======
Here, if the user types in `__proto__`, the assignment in line 4 is ignored!

That could surely be surprising for a non-developer, but pretty understandable for us. The `__proto__` property is special: it must be either an object or `null`. A string can not become a prototype. That's why an assignment a string to `__proto__` is ignored.
>>>>>>> 18b1314af4e0ead5a2b10bb4bacd24cecbb3f18e

ولكننا لم نقصد أن نفعل ذلك، أليس كذلك؟ نريد أن نخزن خاصية بقيمتها واسم الخاصية `"__proto__"` لم يتم حفظه. فهذا إذن خلل!

<<<<<<< HEAD
الآثار هنا ليست كارثية، ولكن فى حالات أخرى يمكن أن نضع خاصية بقيمتها ثم يتغير النموذج بالفعل. ونتيجة لذلك سيعطى التنفيذ نتائج غير صحيحة وغير متوقعة.
=======
Here the consequences are not terrible. But in other cases we may be storing objects instead of strings in `obj`, and then the prototype will indeed be changed. As a result, the execution will go wrong in totally unexpected ways.
>>>>>>> 18b1314af4e0ead5a2b10bb4bacd24cecbb3f18e

وأسوأ من ذلك -- لا يفكر المطورون عادة عن إمكانية كهذه أبدًا. وهذا يجعل الخطأ صعب الملاحظة ويمكن أن يتحول إلى ثغرة خصوصًا إذا كان البرنامج يعمل على السيرفر.

<<<<<<< HEAD
ويمكن أن تحدث أيضًا أشياء غير متوقعة عند وضع قيمة للدالة `toString` والتى هي دالة بطبيعتها وكذلك لدوال أخرى.
=======
Unexpected things also may happen when assigning to `obj.toString`, as it's a built-in object method.
>>>>>>> 18b1314af4e0ead5a2b10bb4bacd24cecbb3f18e

كيف يمكننا تجنب هذه المشكلة؟

<<<<<<< HEAD
أولًا، يمكننا أن نتحوّل لاستخدام الـ`Map` للتخزين بدلًا من الكائنات العادية وسيكون كل شيئ بخير.

ولكن يمكن للـ `Object` أن يخدمنا بشكل جيد هنا، لأن صنّاع اللغة أعطو اهتمامًا لهذه المشكلة من وقت طويل.

إن الخاصية `__proto__` ليست بخاصية عادية وإنما موصّل للخاصية `Object.prototype`:
=======
First, we can just switch to using `Map` for storage instead of plain objects, then everything's fine:

```js run
let map = new Map();

let key = prompt("What's the key?", "__proto__");
map.set(key, "some value");

alert(map.get(key)); // "some value" (as intended)
```

...But `Object` syntax is often more appealing, as it's more concise.

Fortunately, we *can* use objects, because language creators gave thought to that problem long ago.

As we know, `__proto__` is not a property of an object, but an accessor property of `Object.prototype`:
>>>>>>> 18b1314af4e0ead5a2b10bb4bacd24cecbb3f18e

![](object-prototype-2.svg)

ولذلك إذا كان استخدام `obj.__proto__` للقراءة أو التعديل فإن الجالب أو المعدّل المناسب سيتم استدعاؤه من النموذج وستقوم بجلب أو تعديل الخاصية `[[Prototype]]`.

كما قيل فى بداية هذا الجزء: `__proto__` هي طريقة للوصول إلى الخاصية `[[Prototype]]` وليست الخاصية `[[Prototype]]` بنفسها.

والآن إذا أردنا أن نستخدم الكائن كقائمة مترابطة وخالية من مشاكل كهذه، يمكننا أن نفعل ذلك بحيلة بسيطة:

```js run
*!*
let obj = Object.create(null);
// or: obj = { __proto__: null }
*/!*

let key = prompt("What's the key?", "__proto__");
obj[key] = "some value";

alert(obj[key]); // "some value"
```

تنشئ `Object.create(null)` كائنًا ليس له نموذج (`[[Prototype]]` قيمتها `null`):

![](object-prototype-null.svg)

ولذلك ليس هناك جالب أو معدل موروث لـ `__proto__`. والآن يمكن التعامل معها كخاصية عادية وسيعمل المثال أعلاه بشكل صحيح.

يمكننا أن ندعو هذا الكائن "عادى جدًا" أو "very plain" أو "pure dictionary" لأنهم أبسط من الكائن العادى المعروف `{...}`.

ولكن العيب فى هذا أن هذا الكائن لا يحتوى بعض الدوال الموجودة بالفعل مثل `toString`:

```js run
*!*
let obj = Object.create(null);
*/!*

alert(obj); // Error (no toString)
```

...ولكن عادةً ما يكون هذا جيدًا للقوائم المترابطة.

لا حظ أن أغلب الدوال المتعلقة بالكائن تتبع الصيغة `Object.something(...)`, مثل `Object.keys(obj)` -- فهم ليسو فى النموذج ولذلك مازال يمكن استخدامهم مع كائنات كهذه:

```js run
let chineseDictionary = Object.create(null);
chineseDictionary.hello = '你好';
chineseDictionary.bye = '再见';

alert(Object.keys(chineseDictionary)); // hello,bye
```

## الملخص

<<<<<<< HEAD
الدوال الحديثة لإنشاء نموذج و الوصول إليه هي:

- [Object.create(proto, [descriptors])](mdn:js/Object/create) -- creates an empty object with a given `proto` as `[[Prototype]]` (can be `null`) and optional property descriptors.
- [Object.getPrototypeOf(obj)](mdn:js/Object/getPrototypeOf) -- returns the `[[Prototype]]` of `obj` (same as `__proto__` getter).
- [Object.setPrototypeOf(obj, proto)](mdn:js/Object/setPrototypeOf) -- sets the `[[Prototype]]` of `obj` to `proto` (same as `__proto__` setter).

و `__proto__` الموجودة بالفعل والتي تقوم بجلب أو تعديل الخصائص ليست آمنة للإستخدام إذا كنا نريد أن ننشئ خصائص بأسماء يعطيها المستخدم للكائن وذلك لأن المستخدم يمكن أن يُدخل اسم الخاصية كـ `"__proto__"` وسيكون هناك خطأًا وبآثار ونتائج غير متوقعة.

لذا يمكننا استخدام `Object.create(null)` لإنشاء كائن عادى جدًا "very plain" بدون `__proto__` أو استخدام الـ `Map` لهذا.

وأيضًا، تعطي الدالة `Object.create` طريقة سهل لنسخ الكائن بكل الواصفات (descriptors):
=======
- To create an object with the given prototype, use:

    - literal syntax: `{ __proto__: ... }`, allows to specify multiple properties
    - or [Object.create(proto, [descriptors])](mdn:js/Object/create), allows to specify property descriptors.

    The `Object.create` provides an easy way to shallow-copy an object with all descriptors:

    ```js
    let clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
    ```
>>>>>>> 18b1314af4e0ead5a2b10bb4bacd24cecbb3f18e

- Modern methods to get/set the prototype are:

<<<<<<< HEAD
وقد أوضحنا أيضًا أن `__proto__` هو جالب أو معدّل للخاصية `[[Prototype]]` ويوجد فى `Object.prototype` مثل غيره من الدوال.

ويمكننا أن ننشئ كائنًا من غير نموذج باستخدام `Object.create(null)`، وهذه الكائنات تستخدم ككائنات عادية "pure dictionaries" حيث لا توجد لديها أى مشاكل إذا قام المستخدم بإدخال `"__proto__"` كإسم للخاصية.

دوال أخرى:

- [Object.keys(obj)](mdn:js/Object/keys) / [Object.values(obj)](mdn:js/Object/values) / [Object.entries(obj)](mdn:js/Object/entries) -- تقوم بإرجاع قائمة من خصائص الكائن المعدودة (enumerable) سواءًا أسماء أو قيم أو الإثنين معًأ.
- [Object.getOwnPropertySymbols(obj)](mdn:js/Object/getOwnPropertySymbols) -- تقوم بإرجاع قائمة بخصائص الكائن من نوع الرمز (symbolic properties).
- [Object.getOwnPropertyNames(obj)](mdn:js/Object/getOwnPropertyNames) -- تقوم بإرجاع كل االخصائص من نوع النص (string properties).
- [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) -- تقوم بإرجاع قائمة بكل الخصائص التى يحتويها الكائن.
- [obj.hasOwnProperty(key)](mdn:js/Object/hasOwnProperty): returns `true` if `obj` has its own (not inherited) key named `key`.
- [obj.hasOwnProperty(key)](mdn:js/Object/hasOwnProperty): تقوم بإرجاع `true` إذا احتوي الكائن وليس نموذجه على خاصية تسمى `key`.

كل الدوال التى تقوم بإرجاع خصائص الكائن (مثل `Object.keys` وغيرها) -- تقوم بإرجاع الخصائص الموجودة فى الكائن فقط وليست الموجودة فى نموذجه (its prototype). فإذا كنا نريد إرجاع الموجودة فى النموذج أيضًا فيمكننا استخدام التكرار `for..in`.
=======
    - [Object.getPrototypeOf(obj)](mdn:js/Object/getPrototypeOf) -- returns the `[[Prototype]]` of `obj` (same as `__proto__` getter).
    - [Object.setPrototypeOf(obj, proto)](mdn:js/Object/setPrototypeOf) -- sets the `[[Prototype]]` of `obj` to `proto` (same as `__proto__` setter).

- Getting/setting the prototype using the built-in `__proto__` getter/setter isn't recommended, it's now in the Annex B of the specification.

- We also covered prototype-less objects, created with `Object.create(null)` or `{__proto__: null}`.

    These objects are used as dictionaries, to store any (possibly user-generated) keys.

    Normally, objects inherit built-in methods and `__proto__` getter/setter from `Object.prototype`, making corresponding keys "occupied" and potentially causing side effects. With `null` prototype, objects are truly empty.
>>>>>>> 18b1314af4e0ead5a2b10bb4bacd24cecbb3f18e
