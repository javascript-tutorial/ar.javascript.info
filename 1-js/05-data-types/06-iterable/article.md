<<<<<<< HEAD
# المتكررات

_المتكررات_
هي تعميم للمصفوفات
(arrays).
وهذا مفهوم يسمح باستخدام أى كائن فى التكرار من نوع
`for..of`.

إن المصفوفات عباره عن متكررات
(iterables)
بالطبع. ولكن هناك كائنات أخرى موجوده بالفعل والتى هي متكرره أيضا. فعلى سبيل المثال ستجد أن النصوص
(strings)
متكررة أيضا.

إذا كان الكائن ليس فعليًا عباره عن مصفوفه ولكنها تعرض مجموعة من العناصر
(قائمة أو مجموعه)
إذًا فإن التكرار
`for..of`
هو خيار جيّد للتكرار على هذا الكائن. فهيّا بنا نرى كيف نحقق هذا.
=======

# Iterables

*Iterable* objects are a generalization of arrays. That's a concept that allows us to make any object useable in a `for..of` loop.

Of course, Arrays are iterable. But there are many other built-in objects, that are iterable as well. For instance, strings are also iterable.

If an object isn't technically an array, but represents a collection (list, set) of something, then `for..of` is a great syntax to loop over it, so let's see how to make it work.

>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c

## Symbol.iterator

يمكننا أن نفهم بسهولة مفهوم المتكررات عن طريق إنشاء واحد بنفسنا.

على سبيل المثال، إذا كان لدينا كائن ولكنه ليس مصفوقة، ولكنه مناسب للتكرار
`for..of`
مثل الكائن
`range`
الذى يعرض مجموعه من الأرقام:

```js
let range = {
  from: 1,
  to: 5,
};

// نريد أن يعمل التكرار كالآتى:
// for(let num of range) ... num=1,2,3,4,5
```

<<<<<<< HEAD
لنحوّل الكائن
`range`
متكرر (وبالتالى يقوم التكرار `for..of` بعمله)
سنقوم بإضافة دالة إلى الكائن تسمي
`Symbol.iterator`
(رمز موجود بالفعل من أجل هذا).

1. عندما يبدأ
   `for..of`,
   فإنه يقوم باستدعاء هذه الدالة مرة واحده (أو تعرض خطأًا إن وُجد). وهذه الدالة يجب أن تقوم بإرجاع _متكرر_ -- أى كائن بالدالة `next`.
2. بعد ذلك, `for..of` تعمل _حيث تعمل مع هذا الكائن الذى تم إرجاعه_.
3. عندما يحتاج التكرار `for..of` القيمة التالية، فستقوم باستدعاء الدالة `next` على هذا الكائن.
4. يجب أن تكون نتيجة استدعاء الدالة `next()` عباره عن الشكل
   `{done: Boolean, value: any}`,
   وفى حالة أن
   `done=true`
   فهذا يعني أن التكرار قد انتهي, غير ذلك فيعني أن `value` هو القيمه التالية.

هنا الكود الكامل للكائن
`range`
ببعض الملاحظات:
=======
To make the `range` object iterable (and thus let `for..of` work) we need to add a method to the object named `Symbol.iterator` (a special built-in symbol just for that).

1. When `for..of` starts, it calls that method once (or errors if not found). The method must return an *iterator* -- an object with the method `next`.
2. Onward, `for..of` works *only with that returned object*.
3. When `for..of` wants the next value, it calls `next()` on that object.
4. The result of `next()` must have the form `{done: Boolean, value: any}`, where `done=true`  means that the iteration is finished, otherwise `value` is the next value.

Here's the full implementation for `range` with remarks:
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c

```js run
let range = {
  from: 1,
  to: 5,
};

// 1. عند تشغيل التكرار for..of فهي تقوم باستدعائ هذه الدالة
range[Symbol.iterator] = function () {
  // ... وهذه الدالة تقوم بإرجاع الكائن المتكرر:
  // 2. بعد ذلك، يعمل التكرار for..of على هذا المتكرر فقط باحثًا عن القيم التالية
  return {
    current: this.from,
    last: this.to,

    // 3. يتم استدعاء الدالة next() فى كل دورة فى التكرار for..of
    next() {
      // 4. يجب أن تقوم بإرجاع القيمه على شكل الكائن {done:.., value :...}
      if (this.current <= this.last) {
        return { done: false, value: this.current++ };
      } else {
        return { done: true };
      }
    },
  };
};

// والآن التكرار يعمل!
for (let num of range) {
  alert(num); // 1, then 2, 3, 4, 5
}
```

لاحظ الميزة الأساسيه للمتكررات: الفصل بين المفاهيم
(separation of concerns).

- الكائن
  `range`
  لا يحتوى بنفسه على الدالة
  `next()`.
- بدلًا من ذلك فإن كائنًا آخر ، يدعى "المتكرر" تم إنشائه باستدعاء `range[Symbol.iterator]()`, وتقوم الدالة `next()` بإنشاء القيم للتكرار.

ولذلك فإن الكائن المتكرر ليس له علاقة بالكائن الذى يعمل عليه التكرار.

عمليًا، يمكننا أن نجمع بين الكائنين ونستخدم الكائن `range` كمتكرر لتبسيط الكود أكثر.

كالآتى:

```js run
let range = {
  from: 1,
  to: 5,

  [Symbol.iterator]() {
    this.current = this.from;
    return this;
  },

  next() {
    if (this.current <= this.to) {
      return { done: false, value: this.current++ };
    } else {
      return { done: true };
    }
  },
};

for (let num of range) {
  alert(num); // 1, then 2, 3, 4, 5
}
```

والآن تقوم
`range[Symbol.iterator]()`
تقوم بإرجاع الكائن
`range`:
فهي تحتوى على الدالة `next()` وتقوم باستذكار الدورة الحالية فى `this.current`. أليس هذا أقصر ؟ وفى بعض الأحيان يكون جيدًا أيضًا.

إن العيب الوحيد الآن هو أنه من المستحيل أن يكون هناك تكرارين من النوع `for..of` يعملان على نفس الكائن فى نفس الوقت: حيث أن كل التكرارات يتشاركون نفس حالة التكرار -- وهى الكائن نفسه. ولكن وجود تكرارين يعملان فى نفس الوقت على نفس الكائن هي حالة نادرة حتى فى الحالات المتزامنة.

```smart header="التكرارات الغير منتهية"
التكرارات الغير نتهية ممكنة أيضًا. فعلى سبيل المثال، سيصبح الكائن `range` غير منتهي عندما `range.to = Infinity`. أو يمكننا أن نصنع كائنا متكررًا والذى يقوم بإنشاء تتابعًا غير منتهي من الأرقام العشوائية. ويمكن لهذا أن يكون مفيدأ أيضًا.

لا يوجد أى حدود للدالة `next` حيث يمكنها أن تقوم بإرجاع المزيد والمزيد من القيم وهذا طبيعي.

إن التكرار من النوع `for..of` على متكرر كهذا سيكون بالطبع غير منتهي. ولكن يمكننا دائما إيقافه باستخدام `break`.
```

## النصوص كمتكررات

إن النصوص (strings) والمصفوفات (arrays) هي متكررة بالطبيعة.

بالنسبة إلى النص، فإن التكرارات من نوع `for..of` ستقوم بالتكرار على حروف النص:

```js run
for (let char of "test") {
  // يتم استدعؤها 4 مرات، مرة لكل حرف
  alert(char); // t, then e, then s, then t
}
```

وتعمل أيضا بشكل صحيح مع الأشكال!

```js run
let str = "𝒳😂";
for (let char of str) {
  alert(char); // 𝒳, and then 😂
}
```

## استدعاء المتكرر بوضوح

<<<<<<< HEAD
لفهم أعمق، هيا بنا نرى كيف يمكننا استخدام المتكرر صراحةً.
=======
For deeper understanding, let's see how to use an iterator explicitly.
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c

سنقوم بالتكرار على نص مثلما تعمل `for..of` ولكن باستدعاءات مباشرة. هذا الكود يقوم بإنشاء نص متكرر ويحصل على قيم بشكل يدوي:

```js run
let str = "Hello";

// تعمل مثل
// for (let char of str) alert(char);

*!*
let iterator = str[Symbol.iterator]();
*/!*

while (true) {
  let result = iterator.next();
  if (result.done) break;
  alert(result.value); // تُظهر الحروف واحدًا تلو الآخر
}
```

هذا نادرًا ما يحدث، ولكنه يعظينا تحكمًا أكثر بالعملية مقارنة بالتكرار `for..of`. على سبيل المثال، يمكننا فصل عملية التكرار: نكرر قليلًا ثم نقف ثم نفعل شيئًا آخر ثم نستأنف التكرار.

## المتكررات وأشباه المصفوفات (array-likes) [#array-like]

<<<<<<< HEAD
يوجد مصطلحان يبدوان شبيهين ولكنهما مختلفين تمامًا. من فضلك تأكد من فهمك لهم حتى لا تتحيّر.
=======
Two official terms look similar, but are very different. Please make sure you understand them well to avoid the confusion.
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c

- _المتكررات_ هي كائنات تستدعى الدالة `Symbol.iterator`، كما أوضحنا سابقًا.
- _أشباه المصفوفات_ هي كائنات أيضًا ولكنها تحتوى على `index` و `length`، وبالتالى فهي تشبه المصفوفة.

<<<<<<< HEAD
عندما نستخدم الجافاسكريبت لمهام فى المتصفح (browser) أو أى بيئة أخرى، يمكننا أن نجد كائنات متكررة أو شبيهة بالمصفوفه أو كلاهما.
=======
When we use JavaScript for practical tasks in a browser or any other environment, we may meet objects that are iterables or array-likes, or both.
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c

على سبيل المثال، ستجد أن النصوص (strings) عبارة عن متكرر (حيث يمكن استخدام `for..of` معها) وكذلك هي شبيهة بالمصفوفه (لأنها تحتوي على `length` و `indexes`).

ولكن المتكرر يمكن أن لا يكون شبيهًا بالمصفوفه. والعكس صحيح.

على سبيل المثال، فإن الكائن `range` الذى استخدمناه سابقًا هو متكرر ، ولكنه ليس شبيهًا بالمصفوفه لأنها لا تحتوي على `indexes` أو `length`.

ويوجد أيضًا الكائن الذى هو شبيه بالمصفوفة ولكنه ليس متكررًا:

```js run
let arrayLike = { // تحتوى على indexes & length إذًا فهي شبيهة بالمصفوفة ولكنها ليست متكررًا
  0: "Hello",
  1: "World",
  length: 2
};

*!*
// خطأ (no Symbol.iterator)
for (let item of arrayLike) {}
*/!*
```

عادة ماتكون المتكررات وأشباه المصفوفات ليست مصفوفة، حيث لا يحتوون على الدوال `push` & `pop` وهكذا. وهذا غير ملائم إذا كنا نريد أن نتعامل مع هذا الكائن كما نتعامل مع المصفوفة. مثلًا: نريد أن نتعامل مع الكائن `range` باستخدام دوال المصفوفه. كيف يمكننا فعل ذلك ؟

## Array.from

توجد دالة معروفة [Array.from](mdn:js/Array/from) والتى تستقبل متكررًا أو شبيهًا بالمصفوفه وتقوم بإنشاء مصفوفة حقيقية من هذه القيمة. وبالتالي يمكننا استخدام دوال المصفوفة عليه.

على سبيل المثال:

```js run
let arrayLike = {
  0: "Hello",
  1: "World",
  length: 2
};

*!*
let arr = Array.from(arrayLike); // (*)
*/!*
alert(arr.pop()); // World
```

إن الدالة `Array.from` عند السطر `(*)` تستقبل كائنًا، وترى إن كان متكررًا أو شبيهًا بالمصفوفة، ثم تصنع مصفوفة جديدة وتنسخ جميع العناصر إلى هذه المصفوفة الجديدة.

وهذا مايحدث أيضا للمتكرر:

```js
// على فرض أن الكائن range مأخوذ من المثال السابق
let arr = Array.from(range);
alert(arr); // 1,2,3,4,5 (يحدث التحويل من مصفوفة إلى نص باستخدام toString)
```

البناء الكامل للدالة `Array.from` يسمح لنا بأن نضيف دالة اختياريًا تقوم بالتكرار عل عناصر المصفوفة الجديدة:

```js
Array.from(obj[, mapFn, thisArg])
```

المتغير الثاني الإفتراضي الذي تستقبله الدالة `Array.from` `mapFn` يمكن أن يكون دالة تعمل على كل عنصر قبل إضافته للمصفوفة الجديدة، والمتغير `thisArg` يتيح لنا بأن نحدد قيمة `this` للعنصر.

على سبيل المثال:

```js
// على فرض أن الكائن range مأخوذ من المثال السابق

// تربيع كل رقم
let arr = Array.from(range, (num) => num * num);

alert(arr); // 1,4,9,16,25
```

فى هذا المثال استخدمنا `Array.from` لتقوم بتحويل النص إلى مصفوفة من الحروف:

```js run
let str = "𝒳😂";

// splits str into array of characters
let chars = Array.from(str);

alert(chars[0]); // 𝒳
alert(chars[1]); // 😂
alert(chars.length); // 2
```

على عكس `str.split` ، حيث تعتمد على الطبيعة المتكررة للنص، مثل `for..of` تمامًا، وتعمل جيدًا مع الأشكال.

وهى تعمل هنا عمليًا كهذا المثال:

```js run
let str = "𝒳😂";

let chars = []; // Array.from internally does the same loop
for (let char of str) {
  chars.push(char);
}

alert(chars);
```

...ولكن هذا أقصر.

حتى أنه يمكننا أن نبنى دالة `slice` متوافقة مع الأشكال أيضًا:

```js run
function slice(str, start, end) {
  return Array.from(str).slice(start, end).join("");
}

let str = "𝒳😂𩷶";

alert(slice(str, 1, 3)); // 😂𩷶

// الدالة الأساسية لا تدعم الأشكال
alert(str.slice(1, 3)); // قطعة من كل شكل!
```

## الملخص

إن الكائنات التى يمكن استخدامها فى التكرار `for..of` تدعى _متكررات_.

<<<<<<< HEAD
- فعليًا، يجب أن تحتوى المتكررات على دالة تسمى `Symbol.iterator`.
  - إن نتيجة استدعاء `obj[Symbol.iterator]` يسمى _متكررًا_. وهى تقوم بالتعامل مع عملية التكرار.
  - إن المتكرر يجب أن يحتزى على دالة تسمي `next()` والتى تقوم بإرجاع كائن على الشكل `{done: Boolean, value: any}`, وإذا كانت `done:true` فهذا يعني توقف التكرار، غير ذلك فإن الخاصية `value` تحتوى على القيمة التالية.
- إن الدالة `Symbol.iterator` يتم استدعاؤها تلقائيًا عن طريق `for..of`، ولكن يمكننا أيضًا أن نفعله مباشرةً.
- إن المتكررات الموجودة بالفعل مثل النصوص والمصفوفات تقوم أيضًا باستدعاء الدالة `Symbol.iterator`.
- النص المتكرر يدعم الأشكال.
=======
- Technically, iterables must implement the method named `Symbol.iterator`.
    - The result of `obj[Symbol.iterator]()` is called an *iterator*. It handles further iteration process.
    - An iterator must have the method named `next()` that returns an object `{done: Boolean, value: any}`, here `done:true` denotes the end of the iteration process, otherwise the `value` is the next value.
- The `Symbol.iterator` method is called automatically by `for..of`, but we also can do it directly.
- Built-in iterables like strings or arrays, also implement `Symbol.iterator`.
- String iterator knows about surrogate pairs.
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c

إن الكائنات التى تحتوى على `indexes` & `length` تسمي _أشباه المصفوفات_. هذه الكائنات يمكنها ان تحتوى أيضًا على خصائص ودوالٍ أخرى ولكنها لا تحتوى على دوال المصفوفات مثل `push` & `pop`.

إذا نظرنا إلى المصدر -- سنجد أن أغلب الدوال الموجوده بالفعل تفترض أن أنها تعمل مع متكررات أو أشباه مصفوفات بدلًا من مصفوفات، لأن هذا أكثر اختصارًا.

إن الدالة `Array.from(obj[, mapFn, thisArg])` تصنع مصفوفة حقيقية من متكرر أو شبيهٍ بالمصفوفة، وبالتالى يمكننا استخدام دوال المصفوفات عليهم. حيث أن المتغيرات `mapFn` & `thisArg` تتيح لنا أن ننفذ دالة على كل عنصر قبل إضافته للمصفوفة.

`Array.from(obj[, mapFn, thisArg])` makes a real `Array` from an iterable or array-like `obj`, and we can then use array methods on it. The optional arguments `mapFn` and `thisArg` allow us to apply a function to each item.
