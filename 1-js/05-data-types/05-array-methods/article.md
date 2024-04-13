# توابع المصفوفات (Array methods)

تقدّم المصفوفات توابِع عديدة تُسهِّل التعامل معها. ولتبسيطها سنقسّمها إلى مجموعات بحسب الوظيفة في هذا الفصل ونشرح كل منها على حدة.

## إضافة العناصر وإزالتها

عرفنا من الفصل الماضي بالتوابِع التي تُضيف العناصر وتُزيلها من بداية أو نهاية المصفوفة:

- `arr.push(...items)` -- يُضيف العناصر إلى النهاية،
- `arr.pop()` -- يستخرج عنصرًا من النهاية،
- `arr.shift()` يستخرج عنصرًا من البداية،g,
- `arr.unshift(...items)` -- يُضيف العناصر إلى البداية.

وهذه أخرى غيرها.

### الوصل splice

كيف نحذف أحد عناصر المصفوفة؟

المصفوفات كائنات، يمكننا تجربة delete وربما تنجح:

```js run
let arr = ["I", "go", "home"];

delete arr[1]; // remove "go"

alert(arr[1]); // undefined

// now arr = ["I",  , "home"];
alert(arr.length); // 3
```

أُزيل العنصر صحيح، ولكنّ ما زال في المصفوفة ثلاثة عناصر، كما نرى في arr.length == 3.

هذا طبيعي، إذ يُزيل delete obj.key القيمة بمفتاحها key… وهذا فقط. ينفع للكائنات ربّما، لكنّا نريدها للمصفوفات أن تنتقل كل العناصر على اليمين وتأخذ الفراغ الجديد. أي أننا نتوقع أن تصغر المصفوفة الآن.

لهذا السبب علينا استعمال توابِع خاصّة لذلك.

طريقة [arr.splice](mdn:js/Array/splice) هي سكين سويسري للمصفوفات. يمكنها القيام بكل شيء: إدراج، إزالة، واستبدال العناصر.

هذه صياغته:

```js
arr.splice(start[, deleteCount, elem1, ..., elemN])
```

تعديل `arr` يبدأ من الفهرس `start`: يزيل `deleteCount` عناصر ثم يقوم بإدراج `elem1, ..., elemN` مكانها. يعيد مصفوفة العناصر المحذوفة.

فهم هذا التابِع بالأمثلة أبسط.

فلنبدأ أولًا بالحذف:

```js run
let arr = ["I", "study", "JavaScript"];

*!*
arr.splice(1, 1); // from index 1 remove 1 element
*/!*

alert( arr ); // ["I", "JavaScript"]
```

رأيت؟ سهلة. نبدأ من العنصر ذي الفهرس 1 ونُزيل عنصرًا واحدًا (1).

الآن، نُزيل ثلاثة عناصر ونستبدلها بعنصرين آخرين:

```js run
let arr = [*!*"I", "study", "JavaScript",*/!* "right", "now"];

// أزِل الثلاث عناصر الأولى وعوّضها بتلك الأخرى
arr.splice(0, 3, "Let's", "dance");

alert( arr ) // now [*!*"Let's", "dance"*/!*, "right", "now"]
```

أمّا هنا فكيف يُعيد splice مصفوفةً بالعناصر المُزالة.

```js run
let arr = [*!*"I", "study",*/!* "JavaScript", "right", "now"];

// أزِل أوّل عنصرين
let removed = arr.splice(0, 2);

alert( removed ); // "I", "study" <-- قائمة بالعناصر المُزالة
```

يمكن أن يُدرج تابِع splice العناصر دون إزالة أيّ شيء أيضًا. كيف؟ نضع deleteCount يساوي الصفر 0:

```js run
let arr = ["I", "study", "JavaScript"];

// from index 2
// delete 0
// then insert "complex" and "language"
arr.splice(2, 0, "complex", "language");

alert(arr); // "I", "study", "complex", "language", "JavaScript"
```

````
الفهارس السالبة ممكنة أيضًا يمكننا هنا وفي توابِع المصفوفات الأخرى استعمال الفهارس السالبة. وظيفتها تحديد المكان بدءًا من نهاية المصفوفة، هكذا:


```js run
let arr = [1, 2, 5];

// from index -1 (one step from the end)
// delete 0 elements,
// then insert 3 and 4
arr.splice(-1, 0, 3, 4);

alert( arr ); // 1,2,3,4,5
```
````

### القطع slice

التابِع arr.slice أبسط بكثير من شبيهه arr.splice.

صياغته هي:

```js
arr.slice([start], [end]);
```

وهو يُعيد مصفوفة جديدةً بنسخ العناصر من الفهرس `start` إلى `end` (باستثناء `end`). يمكن أن تكون `start` وحتّى `end` سالبتان، بهذا يُعدّ المحرّك القيمتان أماكن بدءًا من نهاية المصفوفة.

هذا التابِع يشبه تابِع السلاسل النصية `str.slice`، ولكن بدل السلاسل النصية الفرعية، يُعيد المصفوفات الفرعية. إليك المثال الآتي:

For instance:

```js run
let arr = ["t", "e", "s", "t"];

alert(arr.slice(1, 3)); // (نسخة تبدأ من 1 وتنتهي عند 3)

alert(arr.slice(-2)); //  ‫(نسخة تبدأ من ‎-2 وتنتهي في النهاية)
```

يمكننا أيضًا استدعائها بلا وُسطاء: يُنشئ `arr.slice()`)‎ نسخة عن `arr`. نستعمل هذا غالبًا لأخذ نسخة وإجراء تعديلات عليها دون تعديل المصفوفة الأصلية، وتركها كما هي.

### الربط concat

يُنشئ التابِع [arr.concat] مصفوفةً جديدة فيها القيم الموجودة في المصفوفات والعناصر الأخرى.

صياغته هي:

```js
arr.concat(arg1, arg2...)
```

وهو يقبل أيّ عدد من الوُسطاء، أكانت مصفوفات أو قيم. أمّا ناتجه هو مصفوفة جديدة تحوي العناصر من arr، ثم arg1 فَـ arg2 وهكذا دواليك. لو كان الوسيط argN نفسه مصفوفة، فستُنسخ كل عناصره، وإلّا فسيُنسخ الوسيط نفسه. لاحِظ هذا المثال:

```js run
let arr = [1, 2];

// ‫اصنع مصفوفة فيها العنصرين: arr و [3,4]
alert(arr.concat([3, 4])); // 1,2,3,4

// ‫اصنع مصفوفة فيها العناصر: arr و[3,4] و[5,6]
alert(arr.concat([3, 4], [5, 6])); // 1,2,3,4,5,6

// ‫اصنع مصفوفة فيها العنصرين: arr و[3,4]، بعدها أضِف القيمتين 5 و 6
alert(arr.concat([3, 4], 5, 6)); // 1,2,3,4,5,6
```

عادةً تنسخ المصفوفة عناصر المصفوفات الأخرى. بينما الكائنات الأخرى (حتّى لو كانت مثل المصفوفات) فستُضاف كتلة كاملة.

```js run
let arr = [1, 2];

let arrayLike = {
  0: "something",
  length: 1
};

alert(arr.concat(arrayLike)); // 1,2,[object Object]
```

… ولكن لو كان للكائن الشبيه بالمصفوفات خاصية Symbol.isConcatSpreadable، فستتعامل معه concat مثلما تتعامل مع المصفوفات: ستُضاف عناصره بدل كيانه:

```js run
let arr = [1, 2];

let arrayLike = {
  0: "something",
  1: "else",
*!*
  [Symbol.isConcatSpreadable]: true,
*/!*
  length: 2
};

alert( arr.concat(arrayLike) ); // 1,2,something,else
```

## التكرار: لكلّ forEach

يتيح لنا التابِع arr.forEach تشغيل إحدى الدوال على كلّ عنصر من عناصر المصفوفة.

الصياغة:

```js
arr.forEach(function(item, index, array) {
  // ... استعملهما فيما تريد
});
```

مثال على عرض كلّ عنصر من عناصر المصفوفة:

```js run
// ‫لكلّ عنصر، استدعِ دالة التنبيه alert
["Bilbo", "Gandalf", "Nazgul"].forEach(alert);
```

بينما هذه الشيفرة تحبّ الكلام الزائد ومكانها في المصفوفة المحدّدة:

```js run
["Bilbo", "Gandalf", "Nazgul"].forEach((item, index, array) => {
  alert(`${item} is at index ${index} in ${array}`);
});
```

ناتج التابِع (لو أعادَ شيئًا أصلًا) يُهمل ويُرمى.

## البحث في المصفوفات

أمّا الآن لنرى التوابع التي تبحث في المصفوفة.

### التوابِع indexOf و lastIndexOf و includes

للتوابِع arr.indexOf و arr.lastIndexOf و arr.includes نفس الصياغة ووظيفتها هي ذات وظيفة تلك بنسخة النصوص النصية، الفرق أنها هنا تتعامل مع العناصر بدل المحارف:

- `arr.indexOf(item, from)` -- يبحث عن العنصر item بدءًا من الفهرس from، ويُعيد فهرسه حيث وجده. ولو لم يجده، يُعيد -1.
- `arr.lastIndexOf(item, from)` -- نفسه، ولكن البحث يبدأ من اليمين وينتهي في اليسار..
- `arr.includes(item, from)` -- يبحث عن العنصر item بدءًا من الفهرس from، ويُعيد true إن وجدته.

مثال:

```js run
let arr = [1, 0, false];

alert(arr.indexOf(0)); // 1
alert(arr.indexOf(false)); // 2
alert(arr.indexOf(null)); // -1

alert(arr.includes(1)); // true
```

لاحظ أنّ التوابِع تستعمل الموازنة بِـ ===. لذا لو كنّا نبحث عن false، فستبحث هي عن false نفسها وليس الصفر.

لو أردت معرفة فيما كانت تحتوي المصفوفة على عنصر معيّن، ولا تريد معرفة فهرسه، فدالة arr.includes مناسبة لك.

وهناك أيضًا أمر، تختلف includes عن سابقاتها indexOf/lastIndexOf بأنّها تتعامل مع NaN كما ينبغي:

```js run
const arr = [NaN];
alert(arr.indexOf(NaN)); // ‫يُعيد ‎-1 (الصحيح هو 0 إلّا أنّ الموازنة === لا تعمل مع NaN)
alert(arr.includes(NaN)); // true (الآن صحيح)
```

### البحث عبر find و findIndex

لنقل أنّ لدينا مصفوفة من الكائنات، كيف نجد الكائن حسب شرط معيّن؟

هنا يمكننا استغلال التابِع arr.find(fn).

صياغته هي:

```js
let result = arr.find(function(item, index, array) {
  // ‫لو أُعيدت القيمة true، فيُعاد العنصر ويتوقّف التعداد
  // ‫لو لم نجد ما نريد نُعيد undefinedd
});
```

تُستدعى الدالة على كل عنصر من عناصر المصفوفة، واحدًا بعد الآخر:

- `item` : العنصر.
- `index` : الفهرس.
- `array` : المصفوفة نفسها.

لو أعادت true، يتوقّف البحث ويُعاد العنصر item. إن لم يوجد شيء فيُعاد undefined.

نرى في هذا المثال مصفوفة من المستخدمين، لكلّ مستخدم حقلان id وname. نريد الذي يتوافق مع الشرط id == 1:

```js run
let users = [
  { id: 1, name: "John" },
  { id: 2, name: "Pete" },
  { id: 3, name: "Mary" }
];

let user = users.find(item => item.id == 1);

alert(user.name); // John
```

في الحياة العملية، يكثُر استعمال الكائنات في المصفوفات، ولهذا فالتابِع find مفيد جدًا لنا.

يمكنك ملاحظة بأنّا في المثال مرّرنا للتابِع find الدالة item => item.id == 1 وفيها وسيط واحد. هذا طبيعي فنادرًا ما نستعمل الوُسطاء البقية في هذه الدالة

يتشابه التابِع [arr.findIndex](mdn:js/Array/findIndex) كثيرًا مع هذا، عدا على أنّه يُعيد فهرس العنصر الذي وجده بدل العنصر نفسه، ويُعيد ‎-1 لو لم يجد شيئًا.

### الترشيح filter

يبحث التابِع find عن أوّل عنصر (واحد فقط) يُحقّق للدالة شرطها فتُعيد true.

لو أردت إعادة أكثر من واحد فيمكن استعمال [arr.filter(fn)](mdn:js/Array/filter).

تشبه صياغة `filter` التابِع `find`، الفرق هو إعادته لمصفوفة بكلّ العناصر المتطابقة:

```js
let results = arr.filter(function(item, index, array) {
  // ‫لو كانت true فتُضاف القائمة إلى مصفوفة النتائج ويتواصل التكرار
  // يُعيد مصفوفة فارغة إن لم يجد شيئًا
});
```

For instance:

```js run
let users = [
  { id: 1, name: "John" },
  { id: 2, name: "Pete" },
  { id: 3, name: "Mary" }
];

// يُعيد مصفوفة تحتوي على أوّل مستخدمَين اثنين
let someUsers = users.filter(item => item.id < 3);

alert(someUsers.length); // 2
```

## التعديل على عناصر المصفوفات

لنرى الآن التوابِع التي تُعدّل المصفوفة وتُعيد ترتيبها.

### الخارطة map

يُعدّ التابِع [arr.map](mdn:js/Array/map) أكثرها استخدامًا وفائدةً أيضًا. ما يفعله هو استدعاء الدالة على كلّ عنصر من المصفوفة وإعادة مصفوفة بالنتائج.

صياغته هي:

```js
let result = arr.map(function(item, index, array) {
  // يُعيد القيمة الجديدة عوض العنصر
});
```

مثلًا، هنا نعدّل كل عنصر فنحوّله إلى طوله:

```js run
let lengths = ["Bilbo", "Gandalf", "Nazgul"].map(item => item.length);
alert(lengths); // 5,7,6
```

### sort(fn)‎

نُرتّب باستدعاء [arr.sort()](mdn:js/Array/sort)‎ المصفوفة كما هي دون نسخها فنغيّر ترتيب عناصرها. هي الأخرى تُعيد المصفوفة المُرتّبة، ولكن غالبًا ما نُهمل القيمة المُعادة فالمصفوفة arr هي التي تتغيّر.

مثال:

```js run
let arr = [1, 2, 15];

// يعيد التابع ترتيب محتوى المصفوفة
arr.sort();

alert(arr); // *!*1, 15, 2*/!*
```

هل لاحظت بأنّ الناتج غريب؟ صار ‎1, 15, 2. ليس هذا ما نريد. ولكن، لماذا؟

**مبدئيًا، تُرتّب العناصر وكأنها سلاسل نصية.**

بالمعنى الحرفي للكلمة: تُحوّل كل العناصر إلى سلاسل نصية عند الموازنة. والترتيب المعجماتي هو المتّبع لترتيب السلاسل النصية، ‎"2" > "15"‎ صحيحة حقًا.

علينا لاستعمال الترتيب الذي نريده تمريرَ دالة تكون وسيطًا للتابِع arr.sort()‎.

على الدالة موازنة قيمتين اثنتين (أيًا كانتا) وإعادة الناتج:

```js
function compare(a, b) {
  if (a > b) return 1; // if the first value is greater than the second
  if (a == b) return 0; // if values are equal
  if (a < b) return -1; // if the first value is less than the second
}
```

مثال عن الترتيب لو كانت القيم أعدادًا:

```js run
function compareNumeric(a, b) {
  if (a > b) return 1;
  if (a == b) return 0;
  if (a < b) return -1;
}

let arr = [ 1, 2, 15 ];

*!*
arr.sort(compareNumeric);
*/!*

alert(arr);  // *!*1, 2, 15*/!*
```

الآن صارت تعمل كما نريد.

لنتوقف لحظة ونفكّر فيما يحدث تمامًا. أنتّفق بأنّ المصفوفة arr يمكن أن تحتوي أيّ شيء؟ أيّ شيء من الأعداد أو السلاسل النصية أو الكائنات أو غيرها. كلّ ما لدينا هو مجموعة من العناصر. لترتيبها نحتاج دالة ترتيب تعرف طرقة مقارنة عناصر المصفوفة. مبدئيًا، الترتيب يكون بالسلاسل النصية.

The `arr.sort(fn)` method implements a generic sorting algorithm. We don't need to care how it internally works (an optimized [quicksort](https://en.wikipedia.org/wiki/Quicksort) or [Timsort](https://en.wikipedia.org/wiki/Timsort) most of the time). It will walk the array, compare its elements using the provided function and reorder them, all we need is to provide the `fn` which does the comparison.
تقوم طريقة `arr.sort(fn)` بتنفيذ خوارزمية ترتيب عامة. لا نحتاج إلى الاهتمام بكيفية عملها داخليًا (فمعظم الوقت يتم استخدام [ترتيب سريع](https://en.wikipedia.org/wiki/Quicksort) محسّن  أو [تيمسورت](https://en.wikipedia.org/wiki/Timsort)). ستمر عبر المصفوفة، تقارن عناصرها باستخدام الدالة المقدمة، وتعيد ترتيبها. كل ما نحتاجه هو توفير الدالة `fn` التي تقوم بالمقارنة.

بالمناسبة، لو أردت معرفة العناصر التي تُوازنها الدالة حاليًا، فلا بأس. لن يقتلك أحد لو عرضتها:

```js run
[1, -2, 15, 2, 0, 8].sort(function(a, b) {
  alert( a + " <> " + b );
  return a - b;
});
```

يمكن أن تقارن الخوارزمية العنصر مع غيره من العناصر، ولكنّها تحاول قدر الإمكان تقليص عدد الموازنات.

````يمكن أن تُعيد دالة الموازنة أيّ عدد في الواقع، ليس على دالة الموازنة إلّا إعادة عدد موجب بدلالة «هذا أكبر من ذاك» وسالب بدلالة «هذا أصغر من ذاك».

يمكننا هكذا كتابة الدوال بأسطر أقل: That allows to write shorter functions:


```js run
let arr = [ 1, 2, 15 ];

arr.sort(function(a, b) { return a - b; });

alert(arr);  // *!*1, 2, 15*/!*
```
````

````تحيا الدوال السهمية أتذكر الدوال السهمية من فصل تعابير الدوال والدوال السهمية؟ يمكننا استعمالها أيضًا لتبسيط كود الفرز:



```js
arr.sort( (a, b) => a - b );
```

لا تفرق هذه عن تلك الطويلة بشيء، البتة.

````

تذكر الـ [strings](info:string#correct-comparisons) فى مقارنة الخوارزميات؟
انها تُقارن الحروب عن طريق الكود الخاص بها .

بالنسبة للعديد من الحروف الأبجدية ، من الأفضل استخدام `str.localeCompare` لترتيب الحروف بشكل صحيح
على سبيل المثال :
دعنا نرتب القليل من البلاد بالألمانية

```js run
let countries = ["Österreich", "Andorra", "Vietnam"];

alert(countries.sort((a, b) => (a > b ? 1 : -1))); // Andorra, Vietnam, Österreich (خطأ)

alert(countries.sort((a, b) => a.localeCompare(b))); // Andorra,Österreich,Vietnam (صحيح!)
```

### العكس reverse

يعكس التابِع [arr.reverse](mdn:js/Array/reverse) ترتيب العناصر في المصفوفة arr.

مثال:

```js run
let arr = [1, 2, 3, 4, 5];
arr.reverse();

alert(arr); // 5,4,3,2,1
```

كما ويُعيد المصفوفة arr بعد عكسها.

### التقسيم split والدمج join

إليك موقفًا من الحياة العملية. تحاول الآن برمجة تطبيق مراسلة، ويُدخل المستخدم قائمة المستلمين بفاصلة بين كلّ واحد: John, Pete, Mary. ولكن لنا نحن المبرمجين، فالمصفوفة التي تحتوي الأسماء أسهل بكثير من السلسلة النصية. كيف السبيل إذًا؟

هذا ما يفعله التابِع [str.split(delim)](mdn:js/String/split‎. يأخذ السلسلة النصية ويقسمها إلى مصفوفة حسب محرف القاسِم delim المقدّم.

في المثال أعلاه نقسم حسب «فاصلة بعدها مسافة»:

```js run
let names = "Bilbo, Gandalf, Nazgul";

let arr = names.split(", ");

for (let name of arr) {
  alert(`A message to ${name}.`); // A message to Bilbo  (والبقية)
}
```

للتابِع split وسيطًا عدديًا اختياريًا أيضًا، وهو يحدّ طول المصفوفة. لو قدّمته فستُهمل العناصر الأخرى. ولكن في الواقع العملي، نادرًا ما ستفيدك هذا:

```js run
let arr = "Bilbo, Gandalf, Nazgul, Saruman".split(", ", 2);

alert(arr); // Bilbo, Gandalf
```

التقسيم إلى أحرف لو ناديت split(s)‎ وتركت s فارغًا فستُسقم السلسلة النصية إلى مصفوفة من الأحرف:

```js run
let str = "test";

alert(str.split("")); // t,e,s,t
```

اذا ناديت [arr.join(glue)](mdn:js/Array/join) فانها تقوم بعمل عكسى لـ `split ، أى أنها تعيد لصق عناصر المصفوفة كما لو أنها تلصقها بمادة لاصقة

مثال :

```js run
let arr = ["Bilbo", "Gandalf", "Nazgul"];

let str = arr.join(";"); // glue the array into a string using ;

alert(str); // Bilbo;Gandalf;Nazgul
```

### التابِعان reduce و reduceRight

متى ما أردنا أن نمرّ على عناصر المصفوفة، استعملنا forEach أو for أو for..of. ومتى ما أردنا أن نمرّ ونُعيد بيانات كلّ عنصر، استعملنا map.

نفس الحال مع التابعين [arr.reduce](mdn:js/Array/reduce) و[arr.reduceRight](mdn:js/Array/reduceRight)، إلّا أنهما ليسا بالسهولة نفسها. يُستعمل هذان التابعان لحساب قيمة واحدة حسب عناصر المصفوفة.

هذه الصياغة:

```js
let value = arr.reduce(
  function(accumulator, item, index, array) {
    // ...
  },
  [initial]
);
```

تُطبّق الدالة على كل عناصر المصفوفة واحدًا بعد الآخر، و«تنقل» النتيجة إلى النداء التالي لها:

وُسطاء الدالة:

- `accumulator` -- هو نتيجة للكل الدوال السابقة و يتعبر مساويا لـ `initial` فى أول مرة .
- `item` -- العنصر الحالي في المصفوفة.
- `index` -- مكان العنصر.
- `array` -- المصفوفة نفسه.

حين تُطبّق الدالة، تُمرّر إليها نتيجة النداء السابق في أوّل وسيط. أجل، معقّد قليلًا، لكن ليس كما تتخيّل لو قلنا أنّ الوسيط الأول بمثابة «ذاكرة» تخزّن النتيجة النهائية من إجراءات التنفيذ التي سبقتها. وفي آخر نداء تصير نتيجة التابِع reduce.

ربّما نقدّم مثالًا لتسهيل المسألة. هنا نعرف مجموعة عناصر المصفوفة في سطر برمجي واحد:

```js run
let arr = [1, 2, 3, 4, 5];

let result = arr.reduce((sum, current) => sum + current, 0);

alert(result); // 15
```

الدالة المُمرّرة إلى reduce تستعمل وسيطين اثنين فقط، وهذا كافٍ عادةً.

لنرى تفاصيل النداءات.

1. في أوّل مرّة، قيمة sum هي قيمة initial (آخر وسيط في reduce) وتساوي 0، وcurrent هي أوّل عنصر في المصفوفة وتساوي 1. إذًا فناتج الدالة هو 1.

2. في النداء التالي، sum = 1 ونُضيف العنصر الثاني في المصفوفة (2) ونُعيد القيمة.

3. في النداء الثالث، sum = 3، ونُضيف العنصر التالي في المصفوفة، وهكذا دواليك إلى آخر نداء…

هذا سير العملية الحسابية:

![](reduce.svg)

وهكذا نمثّلها في جدول (كلّ صف يساوي نداء واحد للدالة على العنصر التالي في المصفوفة):

|                 | `sum` | `current` | result |
| --------------- | ----- | --------- | ------ |
| the first call  | `0`   | `1`       | `1`    |
| the second call | `1`   | `2`       | `3`    |
| the third call  | `3`   | `3`       | `6`    |
| the fourth call | `6`   | `4`       | `10`   |
| the fifth call  | `10`  | `5`       | `15`   |

هكذا نرى بوضوح شديد كيف يصير ناتج النداء السابق أوّل وسيط في النداء الذي يلحقه.

يمكننا أيضًا حذف القيمة الأولية:

```js run
let arr = [1, 2, 3, 4, 5];

// ‫أزلنا القيمة الأولية من التابِع reduce (اختفت القيمة 0)
let result = arr.reduce((sum, current) => sum + current);

alert(result); // 15
```

وستكون النتيجة متطابقة، إذ أنّ reduce تأخذ أول عنصر من المصفوفة على أنّه قيمة أولية (لو لم نقدّم نحن قيمة أولية) وتبدأ العملية من العنصر الثاني.

جدول العملية الحسابية مُطابق للجدول أعلاه، لو حذفنا أول سطر فيه. ولكن عليك أن تحترس حين لا تقدّم تلك القيمة. لو كانت المصفوفة فارغة فنداء reduce بدون القيمة الأولية سيعطيك خطأً.

مثال على ذلك:

```js run
let arr = [];

arr.reduce((sum, current) => sum + current);
```

الشيفرة السابقة ستطلق خطأ، إذ لا يمكن استدعاء reduce مع مصفوفة فارغة دون قيمة أولية، وتحل المشكلة بتوفير قيمة أولية، وستعاد آنذاك. لذا خُذ هذه النصيحة وحدّد قيمة أولية دومًا.

لا يختلف التابِع [arr.reduceRight](mdn:js/Array/reduceRight)عن هذا أعلاه إلا بأنّه يبدأ من اليمين وينتهي على اليسار.

## Array.isArray

المصفوفات ليست نوعًا منفصلًا في اللغة، بل هي مبنيّة على الكائنات. لذا typeof لن تفيدك في التفريق بين الكائن العادي والمصفوفة:

```js run
alert(typeof {}); // object
alert(typeof []); // same
```

…ولكن، المصفوفات تستعمل كثيرًا جدًا لدرجة تقديم تابِع خاص لهذا الغرض: Array.isArray(value)‎. يُعيد هذا التابِع true لو كانت value مصفوفة حقًا، وfalse لو لم تكن.

```js run
alert(Array.isArray({})); // false

alert(Array.isArray([])); // true
```

## تدعم أغلب التوابِع thisArg

تقبل أغلب توابِع المصفوفات تقريبًا، التوابع التي تستدعي دوالًا (مثل find وfilter وmap، عدا sort) - تقبل المُعامل الاختياري thisArg.

لم نشرح هذا المُعامل في الأقسام أعلاه إذ أنّه نادرًا ما يُستعمل. ولكن علينا الحديث عنه لألا يكون الشرح ناقصًا.

هذه الصياغة الكاملة لهذه التوابِع:

```js
arr.find(func, thisArg);
arr.filter(func, thisArg);
arr.map(func, thisArg);
// ...
// ‫الوسيط thisArg هو آخر وسيط اختياري
```

تكون قيمة المُعامل thisArg للدالة func تساوي this. هنا مثلًا نستعمل تابِع كائن army على أنّه مرشّح، والوسيط thisArg يمرّر سياق التنفيذ وذلك لإيجاد المستخدمين الذين يعيد التابع army.canJoin القيمة true:

```js run
let army = {
  minAge: 18,
  maxAge: 27,
  canJoin(user) {
    return user.age >= this.minAge && user.age < this.maxAge;
  }
};

let users = [
  {age: 16},
  {age: 20},
  {age: 23},
  {age: 30}
];

*!*
// find users, for who army.canJoin returns true
let soldiers = users.filter(army.canJoin, army);
*/!*

alert(soldiers.length); // 2
alert(soldiers[0].age); // 20
alert(soldiers[1].age); // 23
```

يمكن استبدال استدعاء `users.filter(army.canJoin)` بالتعليمة التي تُؤدّي ذات الغرض `users.filter(user => army.canJoin(user))`. نستعمل الأولى أكثر من الثانية إذ أنّ الناس تفهمها أكثر من تلك.

## ملخص

ورقة فيها كل توابِع الدوال (غُشّ منها):

A call to `users.filter(army.canJoin, army)` can be replaced with `users.filter(user => army.canJoin(user))`, that does the same. The latter is used more often, as it's a bit easier to understand for most people.

* `push(...items)` -- تُضيف العناصر items إلى النهاية،
* `pop()` -- تستخرج عنصرًا من النهاية،
* `shift()` -- تستخرج عنصرًا من البداية،
* `unshift(...items)` -- تُضيف العناصر items إلى البداية.
* `splice(pos, deleteCount, ...items)` --- بدءًا من العنصر ذي الفهرس pos، احذف deleteCount من العناصر وأدرِج مكانه العناصر items.
* `slice(start, end)` -- أنشِئ مصفوفة جديدة وانسخ عناصرها بدءًا من start وحتّىend(ولكن دونend).
* `concat(...items)` -- أعِد مصفوفة جديدة: انسخ كل عناصر المصفوفة الحالية وأضَِف إليها العناصر items. لو كانت واحدة من عناصر items مصفوفة أيضًا، فستُنسخ عناصرها بدل..

* لتبحث عن العناصر:

- To add/remove elements:
  - `push(...items)` -- adds items to the end,
  - `pop()` -- extracts an item from the end,
  - `shift()` -- extracts an item from the beginning,
  - `unshift(...items)` -- adds items to the beginning.
  - `splice(pos, deleteCount, ...items)` -- at index `pos` deletes `deleteCount` elements and inserts `items`.
  - `slice(start, end)` -- creates a new array, copies elements from index `start` till `end` (not inclusive) into it.
  - `concat(...items)` -- returns a new array: copies all members of the current one and adds `items` to it. If any of `items` is an array, then its elements are taken.

* للمرور على عناصر المصفوفة:

- `forEach(func)` -- يستدعي `func` لكلّ عنصر ولا يُعيد أيّ شيء.

- To transform the array:
  - `map(func)` -- creates a new array from results of calling `func` for every element.
  - `sort(func)` -- sorts the array in-place, then returns it.
  - `reverse()` -- reverses the array in-place, then returns it.
  - `split/join` -- convert a string to array and back.
  - `reduce/reduceRight(func, initial)` -- calculate a single value over the array by calling `func` for each element and passing an intermediate result between the calls.

  - `map(func)` -- أنشِئ مصفوفة جديدة من نتائج استدعاء func لكلّ من عناصر المصفوفة.
  - `sort(func)` -- افرز المصفوفة كما هي وأعِد ناتج الفرز.
  - `reverse()` -- اعكس عناصر المصفوفة كما هي وأعِد ناتج العكس.
  - `split/join` -- حوّل المصفوفة إلى سلسلة نصية، والعكس أيضًا.
  - `reduce(func, initial)`-- احسب قيمة من المصفوفة باستدعاء func على كلّ عنصر فيها وتمرير الناتج بين كلّ استدعاء وآخر.

* Additionally:
  - `Array.isArray(arr)` ‎ يفحص لو كانت `arr` مصفوفة أم لا.
    لاحظ أنّ التوابِع`sort`, `reverse` و `splice` تُعدّل المصفوفة نفسها.

هذه التوابِع أعلاه هي أغلب ما تحتاج وما تريد أغلب الوقت (99.99%). ولكن هناك طبعًا غيرها: +

- [arr.some(fn)](mdn:js/Array/some)/[arr.every(fn)](mdn:js/Array/every) check the array.

تُنادى الدالة fn على كلّ عنصر من المصفوفة (مثل map). لو كانت أيًا من (أو كل) النتائج true، فيُعيد true، وإلًا يُعيد false.

  These methods behave sort of like `||` and `&&` operators: if `fn` returns a truthy value, `arr.some()` immediately returns `true` and stops iterating over the rest of items; if `fn` returns a falsy value, `arr.every()` immediately returns `false` and stops iterating over the rest of items as well.

  We can use `every` to compare arrays:
  ```js run
  function arraysEqual(arr1, arr2) {
    return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
  }

  alert( arraysEqual([1, 2], [1, 2])); // true
  ```

- [arr.fill(value, start, end)](mdn:js/Array/fill) -- fills the array with repeating `value` from index `start` to `end`.

- [arr.copyWithin(target, start, end)](mdn:js/Array/copyWithin) -- ينسخ العناصر من العنصر ذا الفهرس start إلى ذا الفهرس end ويلصقها داخلها عند الفهرس target (تعوّض ما هو موجود مكانها في المصفوفة).

- [arr.flat(depth)](mdn:js/Array/flat)/[arr.flatMap(fn)](mdn:js/Array/flatMap) create a new flat array from a multidimensional array.

For the full list, see the [manual](mdn:js/Array).

قد يبدو من النظرة الأولى أن هناك العديد من الطرق ، يصعب تذكرها. ولكن في الواقع هذا أسهل بكثير.

انظر من خلال ورقة الغش فقط لتكون على دراية بها. ثم حل مهام هذا الفصل للممارسة ، بحيث يكون لديك خبرة في أساليب الصفيف.

بعد ذلك كلما احتجت إلى القيام بشيء مع مصفوفة ، ولا تعرف كيف - تعال هنا ، انظر إلى ورقة الغش وابحث عن الطريقة الصحيحة. ستساعدك الأمثلة على كتابتها بشكل صحيح. قريباً سوف تتذكر الأساليب تلقائيًا ، دون بذل جهود محددة من جانبك.
