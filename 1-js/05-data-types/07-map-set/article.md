# النوع Map (الخرائط) والنوع Set (الأطقم)

Till now, we've learned about the following complex data structures:

- Objects are used for storing keyed collections.
- Arrays are used for storing ordered collections.

ولكن في الحياة الواقعية، هذا لا يكفي. ولهذا تقدّم لك اللغة نوعيين آخرين: الخارطة `Map` والطقم `Set`.

## الخارطة `Map`

<<<<<<< HEAD
تُعدّ [الخارطة](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) تجميعة ذات مفاتيح من عناصر البيانات، تمامًا مثل الكائنات `Object`، مع فرق بسيط، هو أنّ الخارطة `Map` تتيح استعمال المفاتيح مهمًا كان نوعها.
=======
[Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) is a collection of keyed data items, just like an `Object`. But the main difference is that `Map` allows keys of any type.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

هذه توابِعها وخاصياتها:

<<<<<<< HEAD
- `new Map()‎` -- يُنشِئ خارطة.
- `map.set(key, value)‎` -- يضبط القيمة حسب مفتاحها.
- `map.get(key)‎` -- يجلب القيمة حسب مفتاحها، و`undefined` لو لم يوجد `key` في الخارطة.
- `map.has(key)‎` -- يُعيد `true` لو كان `key` موجودًا، وإلا فَـ `false`.
- `map.delete(key)‎` -- يُزيل القيمة حسب مفتاحها.
- `map.clear()‎` -- يُزيل كل شيء من الخارطة.
- `map.size` -- يُعيد عدد العناصر الحالي.
=======
- [`new Map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/Map) -- creates the map.
- [`map.set(key, value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/set) -- stores the value by the key.
- [`map.get(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get) -- returns the value by the key, `undefined` if `key` doesn't exist in map.
- [`map.has(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/has) -- returns `true` if the `key` exists, `false` otherwise.
- [`map.delete(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/delete) -- removes the element (the key/value pair) by the key.
- [`map.clear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/clear) -- removes everything from the map.
- [`map.size`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/size) -- returns the current element count.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

إليك المثال الآتي:

```
let map = new Map();

map.set('1', 'str1');   // المفتاح سلسلة نصية
map.set(1, 'num1');     // المفتاح عدد
map.set(true, 'bool1'); // المفتاح قيمة منطقية

// أتذكر كيف أنّ الكائن العادي يُحوّل المفاتيح لأي سلاسل نصية؟
// ‫الخارطة هنا تحترم النوع، وهذان السطران مختلفان:
alert( map.get(1)   ); // 'num1'
alert( map.get('1') ); // 'str1'

alert( map.size ); // 3
```

As we can see, unlike objects, keys are not converted to strings. Any type of key is possible.

```smart header="`map[key]`isn't the right way to use a`Map`" Although `map[key]`also works, e.g. we can set`map[key] = 2`, this is treating `map` as a plain JavaScript object, so it implies all corresponding limitations (only string/symbol keys and so on).

So we should use `map` methods: `set`, `get` and so on.

```

**يمكن أن تستعمل الخارطة الكائناتَ نفسها مفاتيح.**

مثال:

```

let john = { name: "John" };

// لنخزّن عدد زيارات كل زائر لنا
let visitsCountMap = new Map();

// ‫كائن john هو مفتاح الخارطة
visitsCountMap.set(john, 123);

alert( visitsCountMap.get(john) ); // 123

```

Using objects as keys is one of the most notable and important `Map` features. The same does not count for `Object`. String as a key in `Object` is fine, but we can't use another `Object` as a key in `Object`.

```

let john = { name: "John" };
let ben = { name: "Ben" };

let visitsCountObj = {}; // نحاول استعمال كائن

visitsCountObj[ben] = 234; // try to use ben object as the key
visitsCountObj[john] = 123; // try to use john object as the key, ben object will get replaced

_!_
// That's what got written!
alert( visitsCountObj["[object Object]"] ); // 123
_/!_

```
المتغيّر `visitsCountObj` من نوع ”كائن“، ولهذا يحوّل كلّ المفاتيح (مثل `john`) إلى سلاسل نصية. وبهذا قدّم لنا المفتاح بالسلسلة النصية `"[object Object]"`. ليس ما نريد قطعًا.

As `visitsCountObj` is an object, it converts all `Object` keys, such as `john` and `ben` above, to same string `"[object Object]"`. Definitely not what we want.

تستعمل `Map` الخوارزمية [SameValueZero](https://tc39.github.io/ecma262/#sec-samevaluezero) لتختبر تساوي المفتاح مع الآخر. تتشابه هذه الخوارزمية تقريبًا مع المساواة الصارمة `===` بفارق أنّ `NaN` تساوي `NaN` في نظرها. يعني ذلك بأنك تستطيع استعمال `NaN` كمفتاح هو الآخر.

لا يمكن تغيير هذه الخوارزمية ولا تخصيصها.

**سِلسلة الاستدعاءات**
كلّما نادينا `map.set` أعاد لنا التابِع الخارطة نفسها، وبهذا يمكن أن نستدعي التابع على ناتج الاستدعاء السابق:

```

<<<<<<< HEAD
map.set('1', 'str1')
.set(1, 'num1')
.set(true, 'bool1');

```

## المرور على خارطة
هناك ثلاث طرائق للمرور على عناصر `Map` وتطبيق عملية عليها:
=======
## Iteration over Map
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

- `map.keys()‎` -- يُعيد مُتعدَّدًا للمفاتيح،
- `map.values()‎` -- يُعيد مُتعدَّدًا للقيم،
- `map.entries()‎` -- يُعيد مُتعدَّدًا للمدخلات `[key, value]`، وهي التي تستعملها `for..of` مبدئيًا.

<<<<<<< HEAD
مثال:
=======
- [`map.keys()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/keys) -- returns an iterable for keys,
- [`map.values()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/values) -- returns an iterable for values,
- [`map.entries()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/entries) -- returns an iterable for entries `[key, value]`, it's used by default in `for..of`.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```

let recipeMap = new Map([
['cucumber', 500],
['tomatoes', 350],
['onion', 50]
]);

// نمرّ على المفاتيح (الخضراوات)‏
for (let vegetable of recipeMap.keys()) {
alert(vegetable); // cucumber, tomatoes, onion
}

// نمرّ على قيم المفاتيح (عدد الخضراوات)‏
for (let amount of recipeMap.values()) {
alert(amount); // 500, 350, 50
}

// ‫نمرّ على مدخلات [key, value]
for (let entry of recipeMap) { // ‫مثل recipeMap.entries()‎
alert(entry); // ‫cucumber,500 (وهكذا)
}

```

**ترتيب الإدخال هو المستعمل**
يسير التعداد بنفس الترتيب الذي أُدخلت به الكائنات، فالخارطة تحفظ هذا الترتيب على العكس من الكائنات `Object`.

علاوةً على ذلك، فتملك الخارطة `Map` التابِع المضمّن فيها `forEach`، كما المصفوفات `Array`:

```

// ‫تُنفّذ الدالة على كلّ زوج (key, value)
recipeMap.forEach( (value, key, map) => {
alert(`${key}: ${value}`); // ‫cucumber: 500 إلخ إلخ
});

```

## Object.entries: صنع خارطة من كائن

متى ما أُنشأت خارطة `Map` نستطيع تمرير مصفوفة (أو مُتعدَّدًا آخرًا) لها أزواج ”مفاتيح/قيم“ لتهيئتها، هكذا تمامًا:

```

// ‫مصفوفة من أزواج [key, value]
let map = new Map([
['1', 'str1'],
[1, 'num1'],
[true, 'bool1']
]);

alert( map.get('1') ); // str1

```

<<<<<<< HEAD
لو كان أمامنا كائنًا عاديًا ونريد صناعة `Map` منه، فيمكننا استعمال التابِع المضمّن في اللغة [Object.entries(obj)](https://wiki.hsoub.com/JavaScript/Object/entries) إذ يُعيد مصفوفة مكوّنة من أزواج ”مفاتيح/قيم“ للكائن، بنفس الصيغة التي يطلبها ذاك التابِع.
=======
If we have a plain object, and we'd like to create a `Map` from it, then we can use built-in method [Object.entries(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries) that returns an array of key/value pairs for an object exactly in that format.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

ولهذا يمكن أن نصنع خارطة من كائن بهذه الطريقة:

```

let obj = {
name: "John",
age: 30
};

let map = new Map(Object.entries(obj));

alert( map.get('name') ); // John

```

نرى هنا التابِع `Object.entries` يُعيد مصفوفة بأزواج ”مفاتيح/قيم“: `[ ["name","John"], ["age", 30] ]`، وهذا ما تحتاجه الخارطة.

## Object.fromEntries: صنع كائن من خارطة

رأينا كيف نصنع خارطة `Map` من كائنٍ عاديّ باستعمال `Object.entries(obj)‎`. على العكس منه فالتابع `Object.fromEntries` يأخذ خارطة فيها أزواج `[key, value]` ويصنع كائنًا منها:

```

let prices = Object.fromEntries([
['banana', 1],
['orange', 2],
['meat', 4]
]);

// now prices = { banana: 1, orange: 2, meat: 4 }

alert(prices.orange); // 2

```

يمكننا استعمال `Object.fromEntries` لنصنع كائنًا عاديًا من `Map`. يُفيدنا هذا مثلًا في تخزين البيانات في خارطة، بينما نريد تمريرها إلى شيفرة من طرف ثالثة تريد كائنًا عاديًا لا خارطة.

هذه الشيفرة المنشودة:

```

let map = new Map();
map.set('banana', 1);
map.set('orange', 2);
map.set('meat', 4);

let obj = Object.fromEntries(map.entries()); // ن‫صنع كائنًا عاديًا (\*)

//و‫هكذا انتهينا!
// obj = { banana: 1, orange: 2, meat: 4 }

alert(obj.orange); // 2

```

متى ما استدعينا `map.entries()‎` أعادت مصفوفة مؤلّفة من أزواج ”مفاتيح/قيم“ بنفس التنسيق الذي يطلبه `Object.fromEntries` تمامًا، لحسن الحظ.

يمكننا تقصير السطر المعلّم `(*)` ذاك:
```

let obj = Object.fromEntries(map); // ب‫دون ‎.entries()‎

```

النتيجة نفسها إذ أنّ التابِع `Object.fromEntries` يتوقّع كائنًا مُتعدَّدًا وسيطًا له، وليس مصفوفة بالضرورة. كما والتعداد القياسي للخارطة يتوقّع ذات أزواج ”مفاتيح/قيم“ التي يتوقّعها `map.entries()‎`، وهكذا نجد في يدنا كائنًا عاديًا له نفس ”مفاتيح/قيم“ الخارطة `map`.

## الطقم `Set`


<<<<<<< HEAD
الأطقم (`Set`) هي نوع خاصّ من التجميعات ليس له مفاتيح ولا يمكن أن يحوي أكثر من قيمة متطابقة. يمكن عدّها كأطقم المجوهرات والأسنان، حيث لا تتكرّر أي قطعة مرتين.
=======
A [`Set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) is a special type collection - "set of values" (without keys), where each value may occur only once.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

إليك توابِعه الرئيسة:

<<<<<<< HEAD
- `new Set(iterable)‎` -- يصنع الطقم. في حال مرّرت كائن `iterable` (وهو عادةً مصفوفة)، فينسخ بياناته إلى الطقم.
- `set.add(value)‎` -- يُضيف قيمة إلى الطقم ويُعيده ذاته.
- `set.delete(value)‎` -- يُزيل القيمة ويُعيد `true` لو كانت القيمة `value` موجودة عند استدعاء التابِع، وإلّا يُعيد `false`.
- `set.has(value)‎` -- يُعيد `true` لو كانت القيمة موجودة في الطقم، وإلّا يُعيد `false`.
- `set.clear()‎` -- يُزيل كلّ شيء من الطقم.
- `set.size` -- خاصية عدد العناصر في الطقم.
=======
- [`new Set([iterable])`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/Set) -- creates the set, and if an `iterable` object is provided (usually an array), copies values from it into the set.
- [`set.add(value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/add) -- adds a value, returns the set itself.
- [`set.delete(value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/delete) -- removes the value, returns `true` if `value` existed at the moment of the call, otherwise `false`.
- [`set.has(value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/has) -- returns `true` if the value exists in the set, otherwise `false`.
- [`set.clear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/clear) -- removes everything from the set.
- [`set.size`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/size) -- is the elements count.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

الميزة الأهمّ للأطقم هي أنّك لو استدعيت `set.add(value)‎` أكثر من مرّة وبنفس القيمة، فكأنّك استدعيتهُ مرّة واحدة. لهذا تظهر كل قيمة في الطقم مرّة واحدة لا غير.

عُدّ مثلًا أنّ زوّارًا قادمين إلى وليمة ونريد تذكّر كلّ واحد لإعداد ما يكفي من طعام... ولكن يجب ألّا نسجّل الزوّار مرتين، فالزائر ”واحد“ ونعدّه مرّة واحدة فقط.

الطقم هنا هو الخيار الأمثل:

```

let set = new Set();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

// زارنا الناس، وهناك من زارنا أكثر من مرة
set.add(john);
set.add(pete);
set.add(mary);
set.add(john);
set.add(mary);

// لا يحفظ الطقم إلا القيم الفريدة
alert( set.size ); // 3

for (let user of set) {
alert(user.name); // ‫John (ثمّ Pete وMary)
}

```

<<<<<<< HEAD
يمكن عوض الأطقم استعمال مصفوفة من المستخدمين، مع نصّ يتحقّق من البيانات عند إدخالها لألّا تحدث تكرارات (باستعمال [arr.find](https://wiki.hsoub.com/JavaScript/Array/find)). هذا ممكن نعم، لكن الأداء سيكون أشنع بكثير فتابِع البحث `arr.find` يمرّ على _كامل المصفوفة_ فيفحص كلّ عنصر فيها. الطقم `Set` أفضل بمراحل فأداؤه في فحص تفرّد العناصر مُحسَّن داخل بنية اللغة.
=======
The alternative to `Set` could be an array of users, and the code to check for duplicates on every insertion using [arr.find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find). But the performance would be much worse, because this method walks through the whole array checking every element. `Set` is much better optimized internally for uniqueness checks.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

## المرور على طقم

يمكن لنا المرور على عناصر الطقم باستعمال حلقة `for..of` أو تابِع `forEach`:

```

let set = new Set(["oranges", "apples", "bananas"]);

for (let value of set) alert(value);

// ‫نفس الأمر مع forEach:
set.forEach((value, valueAgain, set) => {
alert(value);
});

```

ولكن لاحظ هنا طرافة التابِع: لدالة ردّ النداء المُمرّرة إلى `forEach` ثلاث وُسطاء: قيمة `value`، و*ذات القيمة الأولى* `valueAgain`، والكائن الهدف. لاحظتَ كيف تكرّرت ذات القيمة في الوُسطاء مرّتين؟

يعزو هذا إلى توافق `Set` مع `Map` إذ لدالة ردّ التابع المُمرّرة إلى `forEach` الخارطة ثلاث وُسطاء أيضًا. معك حق، أمرها غريب، ولكنّها تفيد فتُسهّل حياتنا لو أردنا استبدال الخارطة بالطقم في حالات حرجة، كما العكس أيضًا.

كما تدعم الأطقم نفس التوابِع التي تدعمها الخارطة للتعامل مع المُتعدَّدات:

- `set.keys()‎` -- يُعيد كائنًا مُتعدَّدًا من القيم،
- `set.values()‎` -- تمامًا مثل `set.keys()‎` (موجود للتوافق مع `Map`)،
- `set.entries()‎` -- يُعيد كائنًا مُتعدَّدًا من المُدخلات `[value, value]` (موجود للتوافق مع `Map`).

## ملخص


الخارطة `Map` هي تجميعة ذات مفاتيح.

توابعها وخاصياتها:

- `new Map([iterable])‎` -- يصنع خريطة ويضع فيها أزواج `[key,value]` داخل المُتعدَّد `iteratable` الاختياري (يمكن أن يكون مثلًا مصفوفة).
- `map.set(key, value)‎` -- يخزّن القيمة حسب مفتاحها.
- `map.get(key)‎` -- يُعيد القيمة حسب مفتاحها، ويُعيد `undefined` لو لم يكن المفتاح `key` في الخارطة.
- `map.has(key)‎` -- يُعيد `true` لو كان المفتاح `key` موجودًا، وإلا يُعيد `false`.
- `map.delete(key)‎` -- يُزيل القيمة حسب مفتاحها.
- `map.clear()‎` -- يُزيل كل ما في الخارطة.
- `map.size` -- يُعيد عدد العناصر في الخارطة الآن.

اختلافاتها مع الكائنات العادية (`Object`):

- تدعم أنواع المفاتيح المختلفة، كما والكائنات نفسها أيضًا.
- فيها توابِع أخرى تفيدنا، كما وخاصية `size`.

الطقم `Set` هو تجميعة من القيم الفريدة.

توابعه وخاصياته:

- `new Set([iterable])‎` -- يصنع طقمًا ويضع فيه أزواج `[key, value]` داخل المُتعدَّد الاختياري (يمكن أن يكون مثلًا مصفوفة).
- `set.add(value)‎` -- يُضيف القيمة `value` (ولو كانت موجودة لا يفعل شيء) ثمّ يُعيد الطقم نفسه.
- `set.delete(value)‎` -- يُزيل القيمة ويُعيد `true` لو كانت موجودة عند استدعاء التابِع، وإلا يُعيد `false`.
- `set.has(value)‎` -- يُعيد `true` لو كانت القيمة في الطقم، وإلا يُعيد `false`.
- `set.clear()‎` -- يُزيل كل ما في الطقم.
- `set.size` -- عدد عناصر الطقم.

يسري ترتيب المرور على عناصر `Map` و`Set` بترتيب إدخالها فيهما _دومًا_، ولهذا لا يمكن أن نقول بأنّها تجميعات غير مرتّبة، بل أنّا لا نقدر على إعادة ترتيب عناصرها أو الحصول عليها بفهرسها فيها.

## تمارين
### ترشيح العناصر الفريدة في مصفوفة
_الأهمية: 5_

عُدّ أنّ `arr` مصفوفة. أنشِئ دالة `unique(arr)‎` تُعيد مصفوفة مؤلّفة من العناصر الفريدة في `arr`.

مثال:

```

function unique(arr) {
/_ هنا تكتب شيفرتك_/
}

let values = ["Hare", "Krishna", "Hare", "Krishna",
"Krishna", "Krishna", "Hare", "Hare", ":-O"
];

alert( unique(values) ); // Hare, Krishna, :-O

```

لاحظ أنّ السلاسل النصية استُعملت هنا، ولكن يمكن أن تكون القيم بأيّ نوع آخر.

غُشّ من هذه: استعمل `Set` لتخزين القيم الفريدة.

#### الحل
```

function unique(arr) {
return Array.from(new Set(arr));
}

```

### ترشيح الألفاظ المقلوبة
_الأهمية: 4_

<<<<<<< HEAD
تُسمّى الكلمات التي لها ذات الأحرف ولكن بترتيب مختلف [ألفاظًا مقلوبة](https://ar.wikipedia.org/wiki/%D9%84%D9%81%D8%B8_%D9%85%D9%82%D9%84%D9%88%D8%A8)، مثل هذه:
=======
That's for compatibility with `Map` where the callback passed `forEach` has three arguments. Looks a bit strange, for sure. But this may help to replace `Map` with `Set` in certain cases with ease, and vice versa.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```

<<<<<<< HEAD
nap - pan
ear - are - era
cheaters - hectares - teachers
=======
- [`set.keys()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/keys) -- returns an iterable object for values,
- [`set.values()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/values) -- same as `set.keys()`, for compatibility with `Map`,
- [`set.entries()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/entries) -- returns an iterable object for entries `[value, value]`, exists for compatibility with `Map`.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```

<<<<<<< HEAD
أو العربية:
```
=======
[`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) -- is a collection of keyed values.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

ملّ - لمّ
مسكين - سيكمن
كاتب - اكتب - كتاب

```

اكتب دالة `aclean(arr)‎` تُعيد مصفوفةً بدون هذه الألفاظ المقلوبة. هكذا:

```

let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert( aclean(arr) ); // "nap,teachers,ear" أو "PAN,cheaters,era"

```

يجب أن يكون ناتج كلّ مجموعة ألفاظ كلمة واحدة فقط، ولا يهمّنا أيّ واحدة.

#### الحل
لو أردنا البحث عن كل الألفاظ المقلوبة، سنقسم كلّ كلمة إلى حروفها ونرتّبها. متى ما رتّبناها حسب الأحرف، فستكون الألفاظ كلها متطابقة. هكذا:

```

nap, pan -> anp
ear, era, are -> aer
cheaters, hectares, teachers -> aceehrst
...

```

سنستعمل كلّ قيمة مختلفة (ولكن متطابقة بترتيب أحرفها) لتكون مفاتيح خريطة فنخزّن لفظًا واحدًا لكل مفتاح فقط:

```

function aclean(arr) {
let map = new Map();

for (let word of arr) {

    // نقسم الكلمة بأحرفها، ونرّتب الأحرف ونجمعها ثانيةً
    let sorted = word.toLowerCase().split('').sort().join(''); // (*)
    map.set(sorted, word);

}

return Array.from(map.values());
}

let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert( aclean(arr) );

```

نُنفّذ الترتيب حسب الأحرف بسلسلة استدعاءات كما في السطر `(*)`. سنقسمها على أكثر من سطر ليسهل فهمها:

```

let sorted = arr[i] // PAN
.toLowerCase() // pan
.split('') // ['p','a','n']
.sort() // ['a','n','p']
.join(''); // anp

```

هكذا يكون لدى الكلمتين المختلفتين `'PAN'` و`'nap'` ذات الشكل حين تُرتّب أحرفها: `'anp'`.

في السطر اللاحق نُضيف الكلمة إلى الخارطة.

```

map.set(sorted, word);

```

- [`new Map([iterable])`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/Map) -- creates the map, with optional `iterable` (e.g. array) of `[key,value]` pairs for initialization.
- [`map.set(key, value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/set) -- stores the value by the key, returns the map itself.
- [`map.get(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get) -- returns the value by the key, `undefined` if `key` doesn't exist in map.
- [`map.has(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/has) -- returns `true` if the `key` exists, `false` otherwise.
- [`map.delete(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/delete) -- removes the element by the key, returns `true` if `key` existed at the moment of the call, otherwise `false`.
- [`map.clear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/clear) -- removes everything from the map.
- [`map.size`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/size) -- returns the current element count.

وفي النهاية يأخذ `Array.from(map.values())‎` متُعدَّدا يمرّ على قيم الخارطة (لا نريد مفاتيحها في ناتج الدالة) فيُعيد المصفوفة نفسها.

يمكننا (في هذه المسألة) استعمال كائن عادي بدل الخارطة، إذ أنّ المفاتيح سلاسل نصية. هكذا سيبدو الحلّ لو اتبعنا هذا النهج:

```

function aclean(arr) {
let obj = {};

for (let i = 0; i < arr.length; i++) {
let sorted = arr[i].toLowerCase().split("").sort().join("");
obj[sorted] = arr[i];
}

return Object.values(obj);
}

let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert( aclean(arr) );

```

### مفاتيح مُكرَّرة
_الأهمية: 5_

نريد تسجيل المصفوفة الناتجة من `map.keys()‎` في متغيّر وثمّ استدعاء توابِع تخصّ المصفوفات عليها مثل `‎.push`. ولكنّ ذلك لم ينفع:

```

let map = new Map();

map.set("name", "John");

let keys = map.keys();

// ‫خطأ: keys.push ليست دالة
keys.push("more");

```

لماذا؟ وكيف يمكننا إصلاح الشيفرة ليعمل `keys.push`؟

#### الحل

لأنّ التابِع `map.keys()‎` يُعيد مُتعدَّدًا لا مصفوفة. يمكننا تحويله إلى مصفوفة باستعمال `Array.from`:

```

let map = new Map();

map.set("name", "John");

let keys = Array.from(map.keys());

<<<<<<< HEAD
keys.push("more");
=======
[`Set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) -- is a collection of unique values.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

alert(keys); // name, more

<<<<<<< HEAD
```


ترجمة -وبتصرف- للفصل [Map and Set](https://javascript.info/map-set) من كتاب [The JavaScript language](https://javascript.info/js)
=======
- [`new Set([iterable])`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/Set) -- creates the set, with optional `iterable` (e.g. array) of values for initialization.
- [`set.add(value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/add) -- adds a value (does nothing if `value` exists), returns the set itself.
- [`set.delete(value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/delete) -- removes the value, returns `true` if `value` existed at the moment of the call, otherwise `false`.
- [`set.has(value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/has) -- returns `true` if the value exists in the set, otherwise `false`.
- [`set.clear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/clear) -- removes everything from the set.
- [`set.size`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/size) -- is the elements count.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff


```
