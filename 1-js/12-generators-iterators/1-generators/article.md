# المُنشِئات Generators

تقوم الدوال العادية بإرجاع قيمة واحدة فقط أو لا شئ.

أما الـgenertors فيمكنها أن تقوم بإرجاع عدة قيم, واحدة بعد الأخرى. وهذه الدوال تعمل بشكل جيد جدًا مع المتكررات [iterables](info:iterable) وتسمح بإنشاء تيارات من البيانات (data streams) بكل سهوله.

## الدوال الـGenerator

لإنشاء generator سنحتاج إلى طريقة مخصّصة لذلك: `function*`، ولذلك تسمي "دالة generator".

ويتم كتابتها كالآتى:

```js
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}
```

تعمل الدوال الـGenerators بشكل مختلف من الدوال العادية. فعندما يتم استدعاء هذه الدالة فهي لا تقوم بتشغيل الكود بداخلها ولكن بدلًا من ذلك تقوم بإرجاع كائن (object) يسمي بـ"generator object" والذى يقوم بالتحكم فى التنفيذ.

ألق نظرة هنا:

```js run
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

// "generator function" تنشئ "generator object"
let generator = generateSequence();
*!*
alert(generator); // [object Generator]
*/!*
```

تنفيذ الكود فى الدالة لم يبدأ بعد:

![](generateSequence-1.svg)

والدالة `next()` هي الدالة الأساسية فى الـgenerator. فعند استدعائها تقوم بتنفيذ الكود حتي أول جملة `yield <value>` (ويمكن حذف `value` وتكون عندئذ `undefined`) ثم يقف تنفيذ الدالة مؤقتًا ويتم إرجاع `value` للكود خارج الدالة.

ونتيجة استدعاء `next()` يكون دائمًا كائن يحتوى علي خاصيتين :

- `value`: القيمة المنتَجة.
- `done`: وتكون قيمتها `true` إذا انتعي تنفيذ الكود وتكون `false` إذا لم ينتهي بعد.

علي سبيل المثال، هنا قمنا بإنشاء generator والحصول على قيمته المنتَجة:

```js run
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

let generator = generateSequence();

*!*
let one = generator.next();
*/!*

alert(JSON.stringify(one)); // {value: 1, done: false}
```

والآن، حصلنا علي أول قيمة فقط وتنفيذ الدالة متوقف عند السطر الثانى:

![](generateSequence-2.svg)

هيا نقوم باستدعاء `generator.next()` مرة أخرى، ستقوم باستكمال تنفيذ الكود وإرجاع الإنتاج التالي `yield`:

```js
let two = generator.next();

alert(JSON.stringify(two)); // {value: 2, done: false}
```

![](generateSequence-3.svg)

وإذا استدعينا الدالة مرة ثالثة فإن التنفيذ سيصل إلى جملة الـ`return` والتى تنهى تنفيذ الدالة:

```js
let three = generator.next();

alert(JSON.stringify(three)); // {value: 3, *!*done: true*/!*}
```

![](generateSequence-4.svg)

والآن انتهي عمل الـgenerator ويجب أن نرى هذا فى `done:true` واستخراج `value:3` كقيمة نهائية.

وليس منطقيًا استدعاء `generator.next()` بعد ذلك. إذا قمنا بذلك مرة أخرى ستكون القيمة المسترجعة نفس الكائن: `{done: true}`.

```smart header="`function* f(…)` أم `function *f(…)`?"
كلا الطرقيتين صحيحة.

ولكن عادةً ما يُفضل استخدام أول طريقة `function* f(…)` لأن النجمة `*` تعنى أن هذه الدالة هي generator فهي تصف النوع لا الإسم ولذلك يجب أن تكون بجانب كلمة `function`.

````

## الدوال الـGenerators تُعدّ متكررة iterable

كما أنك من المحتمل قد خمنت بالفعل عند استخدام الدالة `next()`، فإن الـGenerators هي متكررات [iterable](info:iterable).

يمكننا أن نقوم بالتكرار عليهم باستخدام التكرار `for..of`:

```js run
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

let generator = generateSequence();

for(let value of generator) {
  alert(value); // 1, then 2
}
````

تبدو ألطف من استدعاء `.next().value`، أليس كذلك؟

...ولكن لاحظ: المثال أعلاه يُظهر `1` ثم `2` وهذا فقط ولا يُظهر `3`!

وهذا لأن التكرار `for..of` يتجاهل آخر قيمة عندما تكون `done: true`، ولذلك إذا كنا نريد أن نُظهر كل النتائج باستخدام التكرار `for..of`، إذًا يجب أن نُرجع هذه القيم باستخدام `yield`:

```js run
function* generateSequence() {
  yield 1;
  yield 2;
*!*
  yield 3;
*/!*
}

let generator = generateSequence();

for(let value of generator) {
  alert(value); // 1, then 2, then 3
}
```

بما أن الـgenerators قابلة للتكرار (iterable)، إذًا يمكننا أن نستخدم كل الوظائف المتعلقة بذلك مثل طريقة النشر (spread syntax) `...`:

```js run
function* generateSequence() {
  yield 1;
  yield 2;
  yield 3;
}

let sequence = [0, ...generateSequence()];

alert(sequence); // 0, 1, 2, 3
```

فى المثال أعلاه حوّلت `...generateSequence()` الكائن المتكرر إلى قائمة (array) من العناصر (إقرأ المزيد عن طريقة النشر فى فصل [](info:rest-parameters-spread#spread-syntax))

## استخدام الـgenerators مع المتكررات (iterables)

فى وقت سابق فى فصل [](info:iterable) قمنا بإنشاء كائن متكرر يسمي `range` والذي يقوم بإرجاع القيم `from..to`.

هيا نتذكر الكود:

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

يمكننا استخدام دالة generator للتكرار عن طريق إنشائها كـ`Symbol.iterator`.

هنا الكائن `range` ولكن بإيجاز أكثر:

```js run
let range = {
  from: 1,
  to: 5,

  *[Symbol.iterator]() {
    // اختصارًا لـ [Symbol.iterator]: function*()
    for (let value = this.from; value <= this.to; value++) {
      yield value;
    }
  },
};

alert([...range]); // 1,2,3,4,5
```

إنها تعمل وذلك لأن `range[Symbol.iterator]()` تقوم بإرجاع generator والدوال التى هي عبارة عن generator هي ما يحتاجه التكرار `for..of` تمامًا:

- تحتوى على الدالة `.next()`
- تقوم بإرجاع القيمة كهذا الشكل: `{value: ..., done: true/false}`

وهذا بالطبع ليس بصدفة. فإن الـGenerators تمت إضافتها إلى الجافاسكريبت للمساعدة فى عمل المتكررات بشكل أسهل.

والمحتلف مع أى generator هو أنه مختصر أكثر من الكود المتكرر العادى `range` ويحتفظ بأدائه.

```smart header="يمكن أن تُرجع الـGenerators قيمًا للأبد"
فى المثال أعلاه أنشأنا تسلسلًا محدودًا ولكن يمكن أيضًا أن ننشئ generator يقوم بإنتاج قيم للأبد. على سبيل المثال، عدد غير منتهٍ من الأرقام العشوائية.

وهذا بالطبع يحتاج إلى `break` (أو `return`) فى التكرار على هذا الـgenerator باستخدام التكرار `for..of`. وإلا فإن التكرار سيعمل إلى الأبد و يتجمد.
```

## تكوين الـGenerator

تكوين الـGenerator هي خاصية مميزة للـgenerators والتى تسمح بتكوين بتضمين generator بداخل آخر.

على سبيل المثال، لدينا دالة تقوم بإنشاء تسلسل من أرقم:

```js
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) yield i;
}
```

والآن نودّ أن ننشئ تسلسلًا أكثر تعقيدًا:

- أولًا, الأرقام `0..9` (مع أرقام الأحرف فى الجدول ASCII من 48..57),
- متبوعة بالأحرف الأبجدية `A..Z` (مع أرقام الأحرف فى الجدول ASCII من 65..90)
- متبوعة بالأحرف الأبجدية `a..z` (مع أرقام الأحرف فى الجدول ASCII من 97..122)

يمكننا استخدام هذا التسلسل فى إنشاء كلمة سر على سبيل المثال عن طريق اختيار أحرف منها (ويمكن إضافة أحرف لبناء الجملة) ولكن هيا ننشئها أولًا.

حتى ندمج النتائج من دوال ممتعددة أخرى فى الدوال العادية فإننا نستدعيهم ونخزن القيم ثم ندمجهم فى النهاية.

أما فى الـgenerators فهناك شكل خاص `yield*` لتضمين generator بداخل آخر.

الـgenerator المُضمَّن:

```js run
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) yield i;
}

function* generatePasswordCodes() {

*!*
  // 0..9
  yield* generateSequence(48, 57);

  // A..Z
  yield* generateSequence(65, 90);

  // a..z
  yield* generateSequence(97, 122);
*/!*

}

let str = '';

for(let code of generatePasswordCodes()) {
  str += String.fromCharCode(code);
}

alert(str); // 0..9A..Za..z
```

الشكل `yield*` يقوم _بتفويض_ التنفيذ إلى generator آخر. هذا المصطلح يعني أن `yield* gen` تقوم بالتكرار على هذا الـgenerator `gen` و ترسل منتجاتها خارجًا كأن هذه القيم تم إنتاجها بالـgenerator الخارجى.

إن النتيجة هي نفسها كما لو أننا وضعنا الكود كما هو بداخل generators واحد:

```js run
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) yield i;
}

function* generateAlphaNum() {

*!*
  // yield* generateSequence(48, 57);
  for (let i = 48; i <= 57; i++) yield i;

  // yield* generateSequence(65, 90);
  for (let i = 65; i <= 90; i++) yield i;

  // yield* generateSequence(97, 122);
  for (let i = 97; i <= 122; i++) yield i;
*/!*

}

let str = '';

for(let code of generateAlphaNum()) {
  str += String.fromCharCode(code);
}

alert(str); // 0..9A..Za..z
```

تكوين الـgenerators هي طريقة طبيعية لوضع عمل generator بداخل آخر. ولا تحتاج إلى ذاكرة إضافية لتخزين أى نتائج وسيطه.

## "yield" طريق باتجاهين

حتى هذه اللحظه كانت الـgenerators شبيهة بالكائنات المتكررة مع طريقة خاصة لإنشاء القيم. ولكن فى الحقيقة فهم أكثر قوة ومرونة.

وهذا لأن `yield` هي طريق باتجاهين: فهي لا تقوم بإرجاع القيمة خارجًا فقط ولكن أيضًا يمكنها أن تمرر القيمة بداخل الـgenerator.

لفعل ذلك، يجب أن نستدعي `generator.next(arg)` بداخلها متغير وهذا المتغير سيكون نتيجة الـ`yield`.

هيا نرى مثالًا:

```js run
function* gen() {
*!*
  // تمرير السؤال إلى الخارج وانتظار الإجابة
  let result = yield "2 + 2 = ?"; // (*)
*/!*

  alert(result);
}

let generator = gen();

let question = generator.next().value; // <-- تخزين السؤال

generator.next(4); // --> تمرير الإجابة
```

![](genYield2.svg)

1. أول استدعاء `generator.next()` يجب أن يتم دائما بلا متغيرات (سيتم تجاهل المتغير إذا تم تمريره). فتبدأ التنفيذ وتقوم بإرجاع قيمة `yield "2+2=?"` الأول. عند هذه النقطة يقف الـgenerator عن التنفيذ بينما يقف عند السطر `(*)`.
1. بعد ذلك، وكما هو موضح في الصورة أعلاه، فإن قيمة `yield` تُخزن فى المتغير `question`.
1. عند استدعاء `generator.next(4)` فإن الـgenerator يستأنف عمله ونسترجع `4` كقيمة: `let result = 4`.

لاحظ أن الكود الخارجي لا يجب أن يقوم باستدعاء `next(4)` فورًا، فهذا ليس بمشكلة: سينتظر الـgenerator.

علي سبيل المثال:

```js
// استئناف الgenerator بعد بعض الوقت
setTimeout(() => generator.next(4), 1000);
```

كما نرى، وهذا لا يحدث فى الدوال العادية، فإن الـgenerator والكود الذي يتم تنفيذه يمكنهما تبادل النتائج وتمرير القيم فى `next/yield`.

لجعل الأمور أكثر وضوحًا، إليك مثال آخر باستدعاءات أكثر:

```js run
function* gen() {
  let ask1 = yield "2 + 2 = ?";

  alert(ask1); // 4

  let ask2 = yield "3 * 3 = ?";

  alert(ask2); // 9
}

let generator = gen();

alert(generator.next().value); // "2 + 2 = ?"

alert(generator.next(4).value); // "3 * 3 = ?"

alert(generator.next(9).done); // true
```

صورة التشغيل:

![](genYield2-2.svg)

1. أول استدعاء `.next()` بدأ التنفيذ... حتى وصل إلى أول `yield`.
2. تم إرجاع النتيجة إلى الكود خارجًا.
3. الإستدعاء الثانى `.next(4)` مرّر `4` إلى الـgenerator كنتيجة لأول `yield` واستكمل التنفيذ.
4. ...وصلنا إلى ثاني `yield` وأصبحت نتيجة استدعاء الـgenerator.
5. ثالث استدعاء `next(9)` مرّر `9` للـgenerator كنتيجة لثاني `yield` واستأنف التنفيذ حتى وصل إلى نهاية الدالة ولذلك أصبحت `done: true`.

هذا يشبه لعبة "ping-pong" حيث أن كل `next(value)` (عدا أول استدعاء) تمرّر القيمة إلى الـgenerator وهي تصبح قيمة `yield` الحالية وبعد ذلك تحصل علي نتيجة `yield` التالية.

## generator.throw

كما لاحظنا فى المثال أعلاه فإن الكود الخارجي يمكنه أن يمرر قيمة إلى الـgenerator كنتيجة لـ`yield`.

...ولكن يمكنه أيضًا أن ينشئ خطأًا هناك. وهذا طبيعي خطأ كنتيجة.

لتمرير خطأ إلى `yield`، يجب أن نستدعى `generator.throw(err)` وفى هذه الحالة فإن `err` يتم إلقاؤه\ظهوره فى السطر الموجودة فيه `yield`.

علي سبيل المثال، فى قيمة yield `"2 + 2 = ?"` ستؤدي إلى خطأ:

```js run
function* gen() {
  try {
    let result = yield "2 + 2 = ?"; // (1)

    alert("لن يصل التنفيذ إلى هنا لأن الخطأ تم إلقاؤه فى السطر أعلاه");
  } catch(e) {
    alert(e); // يعرض الخطأ
  }
}

let generator = gen();

let question = generator.next().value;

*!*
generator.throw(new Error("The answer is not found in my database")); // (2)
*/!*
```

تم إلقاء الخطأ إلى الـgenerator فى السطر `(2)` مما أدي إلى استثناء (exception) فى السطر `(1)` مع `yield`.
فى المثال أعلاه ستجد `try..catch` قد استقبلت الخطأ وعرضته.

إذا لم نستقبل الخطأ فإنه مثل أى خطأ فإنه يُنهي الـgenerator.

إن السطر الحالي من الإستدعاء هو الذي فيه `generator.throw` والمُعلَّم بـ `(2)` ولذلك يمكننا أن نستقبل الخطأ هنا كالآتى:

```js run
function* generate() {
  let result = yield "2 + 2 = ?"; // خطأ فى هذا السطر
}

let generator = generate();

let question = generator.next().value;

*!*
try {
  generator.throw(new Error("The answer is not found in my database"));
} catch(e) {
  alert(e); // يعرض الخطأ
}
*/!*
```

إذا لم نستقبل الخطأ هناك فإنه كالمعتاد سيُنهي الـgenerator ويخرج إلى الكود خارج الـgenerator (إذا كان هناك) وإذا لم يتم التعامل معه سيُنهي السكريبت (script).

## الملخص

- يتم إنشاء الـGenerators عن طريق دوال الـGenerator `function* f(…) {…}`.
- بداخل الـgenerator توجد `yield` فقط.
- الكود الخارجي والـ generator يمكنهما تبادل أى نتائج عن طريق `next/yield`.

فى الجافاسكريبت الحديثة يندر استخدام الـgenerators ولكن فى بعض الأوقات يصبحون مفيدين جدًا وهذا لقدرة الدالة لتبادل البيانات مع الكود الخارجي خلال التنفيذ وهذا فريد من نوعه. وبالطبع فإنهم مفيدين جدا لإنشاء كائنات متكررة (iterable objects).

وسنتعلم فى الفصل القادم الـgenerators الغير متزامنة (async generators) والتي تستخدم في قراءة تدفق البيانات بشكل غير متزامن (asynchronously) فى التكرار `for await ... of`.

فى برمجة الويب نتعامل غالبًا مع بيانات متدفقة streamed data ولذلك فإن هذه حالة أخري مهمة جدًا.
