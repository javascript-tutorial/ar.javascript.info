﻿
# النوع WeakMap والنوع WeakSet: الخرائط والأطقم ضعيفة الإشارة

كما عرفنا من فصل «كنس المهملات»، فمُحرّك جافاسكربت يخُزّن القيمة في الذاكرة طالما يمكن أن يصل لها شيء (أي يمكن استعمالها لاحقًا). هكذا:

```
let john = { name: "John" };

// ‫يمكننا الوصول إلى الكائن، فـ john هو الإشارة إليه

// عوّض تلك الإِشارة
john = null;

// سيُزال الكائن من الذاكرة
```

عادةً ما تكون خاصيات الكائن أو عناصر المصفوفة أو أية بنية بيانات أخرى - عادةً ما تُعدّ "مُتاحة لباقي الشيفرة" ويُبقيها المحرّك في الذاكرة طالما بنية البيانات نفسها في الذاكرة.

لنفترض أنّا وضعنا كائنًا في مصفوفة، طالما المصفوفة موجودة ومُشار إليها، فسيكون الكائن موجودًا هو الآخر حتّى لو لم يكن هناك ما يُشير إليه. مثلما في هذه الشيفرة:

```
let john = { name: "John" };

let array = [ john ];

john = null; // عوّض الإشارة

<<<<<<< HEAD
// ‫الكائن john مخزّن داخل مصفوفة ولن يُكنس باعتباره مهملات
// ‫إذ يمكننا أخذه بهذه: array[0]‎
=======
*!*
// the object previously referenced by john is stored inside the array
// therefore it won't be garbage-collected
// we can get it as array[0]
*/!*
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c
```

وبنفس المفهوم، لو استعملنا كائنًا ليكون مفتاحًا في خارطة `Map` عادية، فسيبقى هذا الكائن موجدًا طالما الخارطة تلك موجودة، ويشغل الذاكرة مانعًا عملية كنس المهملات من تحريرها. إليك هذا المثال:

```
let john = { name: "John" };

let map = new Map();
map.set(john, "...");

john = null; // عوّض الإشارة

// ‫الكائن john مخزّن داخل خارطة
// ‫ويمكننا أخذه بهذه: map.keys()‎
```

على العكس فالخارطة ضعيفة الإشارة `WeakMap` مختلفة جذريًا عن هذا، فلا تمنع كنس مهملات أيٍّ من مفاتيحها الكائنات. لنأخذ بعض الأمثلة لتُدرك القصد هنا.

## WeakMap

<<<<<<< HEAD
أولى اختلافات الخارطة ضعيفة الإشارة `WeakMap` عن تلك العادية `Map` هي أنّها تُلزم مفاتيحها بأن تكون كائنات لا أنواع أولية:
=======
The first difference between `Map` and `WeakMap` is that keys must be objects, not primitive values:
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c

```
let weakMap = new WeakMap();

let obj = {};

weakMap.set(obj, "ok"); // لا مشاكل (المفتاح كائن)

// لا يمكن استعمال السلسلة النصية مفتاحًا
weakMap.set("test", "Whoops"); // ‫خطأ، لأنّ ”test“ ليس كائنًا
```

بعد ذلك لو استعملنا أحد الكائنات ليكون مفتاحًا فيها، ولم يكن هناك ما يُشير إلى هذا الكائن، فسيُزال الكائن من الذاكرة (والخارطة) تلقائيا.

```
let john = { name: "John" };

let weakMap = new WeakMap();
weakMap.set(john, "...");

john = null; // عوّض الإشارة

// ‫أُزيل الكائن john من الذاكرة!
```

وازِن هذه الشيفرة بشيفرة الخارطة `Map` أعلاه. الآن حتى لو لم يكن `john` موجودًا إلا مفتاحًا لِـ `WeakMap`، فسيُحذف تلقائيًا من الخارطة (ومن الذاكرة).

لا تدعم الخارطة ضعيفة الإشارة `WeakMap` التكرار (iteration) ولا التوابِع `keys()‎` أو `values()‎` أو `entries()‎`، ولهذا لا نقدر على أخذ كلّ المفاتيح أو القيم التي فيها. بل أنّ للخارطة `WeakMap` التوابِع الآتية:

- `weakMap.get(key)‎`
- `weakMap.set(key, value)‎`
- `weakMap.delete(key)‎`
- `weakMap.has(key)‎`

<<<<<<< HEAD
تفكّر بسبب وجود هذا التقييد؟ الجواب هو: أسباب تقنية. عُدّ الكائن الآن قد فقد كلّ إشارة له (مثلما حصل مع الكائن `john` في الشيفرة أعلاه)، بهذا ستُكنس مهملاته تلقائيًا، ولكن... *وقت حدوث هذا الكنس* غير موضّح تقنيًا. الواقع أنّ محرّك جافاسكربت يُحدّد ذلك: هو يُحدّد متى يمسح الذاكرة، الآن حالًا أو بعد قليل حتّى تحدث عمليات حذف أخرى. لذا فعدد العناصر الحالي داخل `WeakMap` غير معلوم تقنيًا، ربما يكون المحرّك حذفها كلها أو لم يحذفها، أو حذف بعضها، لا نعلم. لهذا السبب لا تدعم اللغة التوابِع التي تحاول الوصول إلى كلّ القيم والعناصر.

الآن بعدما عرفناها، في أيّ حالات نستعمل هذه البنية من البيانات؟
=======
The JavaScript engine decides that. It may choose to perform the memory cleanup immediately or to wait and do the cleaning later when more deletions happen. So, technically, the current element count of a `WeakMap` is not known. The engine may have cleaned it up or not, or did it partially. For that reason, methods that access all keys/values are not supported.

Now, where do we need such a data structure?
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c

## استعمالاتها: بيانات إضافية

المجال الرئيسي لتطبيقات `WeakMap` هي *تخزين البيانات الإضافية*.

لو كنّا نتعامل مع كائن ”ينتمي“ إلى شيفرة أخرى (وحتّى مكتبة من طرف ثالث) وأردنا تخزين بيانات معيّنة لترتبط بها، وهذه البيانات لا تكون موجودة إلا لو كان الكائن موجودًا، فَـ `WeakMap` هي ما نريد تمامًا: نضع البيانات في خارطة بإشارة ضعيفة `WeakMap` (مستعملين الكائن مفتاحًا لها). متى ما كُنس الكائن باعتباره مهملات، ستختفي تلك البيانات معه أيضًا.

```
weakMap.set(john, "secret documents");
// ‫إن مات john فستُدمّر تلك المستندات فائقة السرية تلقائيًا
```

لنرى مثالًا يوضّح الصورة. عُدّ بأنّ لدينا شيفرة تسجّل عدد زيارات المستخدمين - تسجّلها في خارطة، حيث كائن المستخدم هو مفتاحها وعدد زياراته هي القيمة. لا نريد أن نُسجّل عدد زياراته فيما لو غادر المستخدم (أي أنّ عملية كنس المهملات كنست ذاك الكائن).

إليك مثالًا آخر عن دالة عَدّ باستعمال `Map`:

```
// 📁 visitsCount.js
let visitsCountMap = new Map(); // خارطة: المستخدم => عدد زياراته

// تزيد عدد الزيارات
function countUser(user) {
  let count = visitsCountMap.get(user) || 0;
  visitsCountMap.set(user, count + 1);
}
```

وهذا الجزء الثاني من الشيفرة (يمكن أن يستعمل هذا الملف ذاك):

```
// 📁 main.js
let john = { name: "John" };

countUser(john); // عُدّ الزوّار
countUser(john);

// ‫بعدها يغادر john الحفلة
john = null;
```

<<<<<<< HEAD
هكذا ”يُفترض“ أن يُكنس الكائن `john` باعتباره مهملات، لكنّه سيبقى في الذاكرة إذ تستعمله الخارطة `visitsCountMap` مفتاحًا فيها.
=======
Now, `john` object should be garbage collected, but remains in memory, as it's a key in `visitsCountMap`.
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c

علينا مسح `visitsCountMap` حين نُزيل المستخدمين وإلا فسيزيد حجمها في الذاكرة إلى آباد الآبدين. لو كانت بنية البرمجية معقّدة، فستكون عملية المسح هذه مرهقة جدًا وغير عملية. لهذا يمكننا تجنّب التعب واستعمال `WeakMap` بدل العادية:

```
// 📁 visitsCount.js
let visitsCountMap = new WeakMap(); // خارطة بإشارة ضعيفة: المستخدم => عدد زياراته

// تزيد عدد الزيارات
function countUser(user) {
  let count = visitsCountMap.get(user) || 0;
  visitsCountMap.set(user, count + 1);
}
```

<<<<<<< HEAD
هكذا لا نمسح `visitsCountMap` يدويًا بل نترك للمحرّك القرار: لو لم يكن هناك ما يُشير إلى الكائن `john` عدا مفتاح `WeakMap`، سيحرّره من الذاكرة مع المعلومات التي في ذلك المفتاح داخل الخارطة ضعيفة الإشارة `WeakMap`.
=======
Now we don't have to clean `visitsCountMap`. After `john` object becomes unreachable, by all means except as a key of `WeakMap`, it gets removed from memory, along with the information by that key from `WeakMap`.
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c

## استعمالاتها: الخبيئة

<<<<<<< HEAD
يكثُر أيضًا استعمال الخرائط للخبيئة، أي حين علينا تذكّر ناتج الدالة (تخبئته ”cached“) كي يستعمل أيّ استدعاء لاحِق على هذا العنصر تلك الخبيئة.

يمكن أن نستعمل الخارطة `Map` لتخزين النتائج:
=======
Another common example is caching. We can store ("cache") results from a function, so that future calls on the same object can reuse it.

To achieve that, we can use `Map` (not optimal scenario):
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c

```
// 📁 cache.js
let cache = new Map();

// نحسب النتيجة ونتذكرها
function process(obj) {
  if (!cache.has(obj)) {
    let result = /* حسابات الكائن هذا */ obj;

    cache.set(obj, result);
  }

  return cache.get(obj);
}

// الآن نستعمل ‫process()‎ في ملف آخر:

// 📁 main.js
let obj = {/* فلنفترض وجود هذا الكائن*/};

let result1 = process(obj); // حسبنا القيمة

// ‫...بعدها، في مكان آخر من الشيفرة...
let result2 = process(obj); // تُأخذ النتيجة تلك من الخبيئة

// ‫...بعدها، لو لم نرد الكائن بعد الآن:
obj = null;

alert(cache.size); // 1 (لاا! ما زال الكائن في الخبيئة ويستهلك الذاكرة)
```

لو استدعينا `process(obj)‎` أكثر من مرّة بتمرير نفس الكائن، فستحسب الشيفرة النتيجة أوّل مرة فقط، وفي المرات القادمة تأخذها من الكائن `cache`. مشكلة هذه الطريقة هي ضرورة مسح `cache` متى ما انتفت حاجتنا من الكائن.

<<<<<<< HEAD
لكن، لو استبدلنا `Map` وعوّضناها بِـ `WeakMap` فستختفي المشكلة تمامًا، وتُزال النتيجة المُخبّأة من الذاكرة _تلقائيًا_ متى ما كُنس الكائن على أنّه مهملات.
=======
If we replace `Map` with `WeakMap`, then this problem disappears. The cached result will be removed from memory automatically after the object gets garbage collected.
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c

```
// 📁 cache.js
*!*
let cache = new WeakMap();
*/!*

// نحسب النتيجة ونتذكرها
function process(obj) {
  if (!cache.has(obj)) {
    let result = /* حسابات الكائن هذا */ obj;

    cache.set(obj, result);
  }

  return cache.get(obj);
}

// 📁 main.js
let obj = {/* كائن من الكائنات */};

let result1 = process(obj);
let result2 = process(obj);

// ‫...بعدها، لو لم نرد الكائن بعد الآن:
obj = null;

```
هنا، ‫لا يمكن أن نعرف cache.size إذ أنها خارطة بإشارة ضعيفة، ولكن الحجم صفر، أو سيكون صفر قريبًا؛ فما أن تبدأ عملية كنس المهملات على الكائن، ستُزال البيانات المُخبّأة هي الأخرى.

## WeakSet

حتّى الأطقم ضعيفة الإشارة `WeakSet` تسلك ذات السلوك:

- تشبه الأطقم العادية `Set` ولكن لا يمكننا إلّا إضافة الكائنات إلى `WeakSet` (وليس الأنواع الأولية).
- يبقى الكائن موجودًا في الطقم طالما هناك ما يصل إليه.
- ويدعم -كما تدعم `Set`- التوابِع `add` و`has` و`delete`، ولكن لا تدعم `size` أو `keys()‎` أو التعداد.

<<<<<<< HEAD
هي الأخرى تخدمنا نحن المطورون في تخزين البيانات الإضافية (إذ أنّ الإشارة إليها ”ضعيفة“)، ولكنها ليست لأيّ بيانات كانت، بل فقط التي تُعطي إجابة ”نعم/لا“. لو كان الكائن موجودًا داخل طقم بإشارة ضعيفة، فلا بدّ أنّه موجود لداعٍ.
=======
Being "weak", it also serves as additional storage. But not for arbitrary data, rather for "yes/no" facts. A membership in `WeakSet` may mean something about the object.
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c

يمكننا مثلًا إضافة المستخدمين إلى طقم بإشارة ضعيفة `WeakSet` لنسجّل من زار موقعنا:

```
let visitedSet = new WeakSet();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

visitedSet.add(john); // زارنا ‫John
visitedSet.add(pete); // وبعده ‫Pete
visitedSet.add(john); // وعاد ‫John

// ت‫حتوي visitedSet الآن على مستخدمين اثنين

// ه‫ل زارنا John؟
alert(visitedSet.has(john)); // true

// ‫هل زارتنا Mary؟
alert(visitedSet.has(mary)); // false

john = null;

// ستُنظّف ‫visitedSet تلقائيًا
```

<<<<<<< HEAD
التقييد الأهم في هذه الأنواع `WeakSet` و`WeakMap` هي عدم موجود المُكرَّرات واستحالة أخذ محتواها كله. لربّما ترى ذلك غباءً، إلّا أنّه لا يمنع هذه الأنواع من إجراء مهامها التي صُنعت لها: مخزن "إضافي" من البيانات للكائنات المخزّنة (أو المُدارة) في مكان آخر.

## خلاصة

الخارطة ضعيفة الإشارة هي تجميعة تشبه الخرائط العادية، ولا تتيح إلا استعمال الكائنات مفاتيحٍ فيها، كما وتُزيلها هي والقيمة المرتبطة بها ما إن تنعدم الإشارة إليها.
=======
The most notable limitation of `WeakMap` and `WeakSet` is the absence of iterations, and the inability to get all current content. That may appear inconvenient, but does not prevent `WeakMap/WeakSet` from doing their main job -- be an "additional" storage of data for objects which are stored/managed at another place.
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c

الطقم ضعيفة الإشارة هي تجميعة تشبه الأطقم العادية، ولا تخزّن إلا الكائنات فيها، كما وتُزيلها ما إن تنعدم الإشارة إليها.

كِلا النوعان لا يدعمان التوابِع والخاصيات التي تُشير إلى كل المفاتيح فيهما، أو حتى عددها. المسموح فقط هو العمليات على العناصر فيها عنصرًا بعنصر.

يُستعمل هذان النوعان `WeakMap` و`WeakSet` على أنّهما بنى بيانات ”ثانوية“ إلى جانب تلك ”الأساسية“ لتخزين العناصر. لو أُزيل الكائن من التخزين الأساسي، ولم يوجد له أي إشارة إلا مفتاحًا في `WeakMap` أو عنصرًا في `WeakSet`، مسحهُ المحرّك تلقائيًا.

## تمارين
### تخزين رايات ”غير مقروءة“
_الأهمية: 5_

لديك مصفوفة من الرسائل:

```
let messages = [
  {text: "Hello", from: "John"},
  {text: "How goes?", from: "John"},
  {text: "See you soon", from: "Alice"}
];
```

ويمكن للشيفرة عندك الوصول إليها، إلّا أنّ شيفرة أحدهم تُدير تلك الرسائل، فتُضيف رسائل جديدة وتُزيل قديمة، ولا تعرف متى يحدث هذا بالضبط.

السؤال هو: أيّ بنية من بنى البيانات تستعمل لتخزّن هذه المعلومة لكلّ رسالة: ”هل قُرأت؟“. يجب أن تكون البنية التي اخترتها مناسبة لتردّ على سؤال ”هل قُرأت؟“ لكلّ كائن رسالة.

ملاحظة: حين تُزال رسالة من مصفوفة `messages`، يجب أن تختفي من بنية البيانات لديك هي الأخرى.

ملاحظة أخرى: يجب ألّا نُعدّل كائنات الرسائل ولا نُضيف خاصيات من عندنا إليها؛ فيمكن أن يؤدّي هذا إلى عواقب وخيمة إذ لسنا من نديرها بل أحد آخر.

#### الحل
لنجرّب تخزين الرسائل المقروءة في طقم بإشارة ضعيفة `WeakSet`:

```
let messages = [
  {text: "Hello", from: "John"},
  {text: "How goes?", from: "John"},
  {text: "See you soon", from: "Alice"}
];

let readMessages = new WeakSet();

// قرأ المستخدم رسالتين اثنتين
readMessages.add(messages[0]);
readMessages.add(messages[1]);
// في ‫readMessages الآن عنصرين

// ‫...هيًا نُعيد قراءة أول رسالة!
readMessages.add(messages[0]);
// ما زالت في ‫readMessages عنصرين فريدين

// ‫الجواب: هل قُرئتmessage [0]‎؟
alert("Read message 0: " + readMessages.has(messages[0])); // نعم ‫true

messages.shift();
// الآن في ‫readMessages عنصر واحد (تقنيًا فستُنظّف الذاكرة فيما بعد)
```

يتيح لنا الطقم ضعيفة الإشارة تخزينَ مجموعة من الرسائل والتأكّد من وجود كلّ منها بسهولة تامة. كما وأنّها تمسح نفسها بنفسها. للأسف بهذا نُضحّي بميزة التكرار، فلا يمكن أن نجلب ”كلّ الرسائل المقروءة“ منها مباشرةً، ولكن... يمكننا المرور على عناصر كل الرسائل في `messages` وترشيح تلك التي في الطقم لدينا.

يمكن أن يكون الحل الآخر هو إضافة خاصية مثل `message.isRead=true` إلى الرسالة بعد قراءتها. ولكننّا لسنا من نُدير هذه الكائنات بل أحد آخر، ولهذا لا يُوصى بذلك بصفة عامة. ولكن، يمكننا استعمال خاصيّة رمزية فنتجنّب أي مشكلة أو تعارض.

هكذا:
```
// الخاصية الرمزية معروفة في الشيفرة لدينا، فقط
let isRead = Symbol("isRead");
messages[0][isRead] = true;
```

"لربما" الآن لن تعرف شيفرة الطرف الثالث بخاصيتنا الجديدة.

صحيح أن الرموز تتيح لنا تقليل احتمال حدوث المشاكل، إلّا أنّ استعمال `WeakSet` أفضل بعين بنية البرمجية.

### تخزين تواريخ القراءة
_الأهمية: 5_

لديك مصفوفة من الرسائل تشبه تلك في التمرين السابق، والفكرة هنا متشابهة قليلًا.

```
let messages = [
  {text: "Hello", from: "John"},
  {text: "How goes?", from: "John"},
  {text: "See you soon", from: "Alice"}
];
```

السؤال: أيّ بنية بيانات تستعمل لتخزين هذه المعلومة: " متى قُرئت هذه الرسالة؟".

كان عليك (في التمرين السابق) تخزين معلومة "نعم/لا" فقط، أمّا الآن فعليك تخزين التاريخ، ويجب أن يبقى في الذاكرة إلى أن تُكنس الرسالة على أنّها مهملات.

ملاحظة: تُخزّن التواريخ كائنات بصنف `Date` المضمّن في اللغة، وسنتكلم عنه لاحقًا.

#### الحل

يمكن أن نستعمل الخارطة ضعيفة الإشارة لتخزين التاريخ:
```
let messages = [
  {text: "Hello", from: "John"},
  {text: "How goes?", from: "John"},
  {text: "See you soon", from: "Alice"}
];

let readMap = new WeakMap();

readMap.set(messages[0], new Date(2017, 1, 1));
// سنرى أمر كائن التاريخ لاحقًا
```

<<<<<<< HEAD
ترجمة -وبتصرف- للفصل [WeakMap and WeakSet](https://javascript.info/weakmap-weakset ) من كتاب [The JavaScript language](https://javascript.info/js)

=======
Their main advantages are that they have weak reference to objects, so they can easily be removed by garbage collector.

That comes at the cost of not having support for `clear`, `size`, `keys`, `values`...

`WeakMap` and `WeakSet` are used as "secondary" data structures in addition to the "primary" object storage. Once the object is removed from the primary storage, if it is only found as the key of `WeakMap` or in a `WeakSet`, it will be cleaned up automatically.
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c
