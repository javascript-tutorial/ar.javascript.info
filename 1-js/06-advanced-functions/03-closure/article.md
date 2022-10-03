# نطاق المُتغير

# Variable scope, closure

JavaScript is a very function-oriented language. It gives us a lot of freedom. A function can be created at any moment, passed as an argument to another function, and then called from a totally different place of code later.

We already know that a function can access variables outside of it ("outer" variables).

But what happens if outer variables change since a function is created? Will the function get newer values or the old ones?

And what if a function is passed along as an argument and called from another place of code, will it get access to outer variables at the new place?

Let's expand our knowledge to understand these scenarios and more complex ones.

سنتحدث عن المُتغيرات `let/const` هنا

```smart header="سنتحَدث عن المُتغيرات `let/const` هنا"

فى جافا سكريبت, هناك ثلاث طُرق لتعريف متغير: `let`, `const` (الأحدث), و `var` (الأقدم)

- فى هذا المقال سنستخدم مُتغيرات `let` فى الأمثلة.
- المُتغيرات, المٌعرًفة بإستخدام `const`, تتصرف بنفس الطريقة لذلك هذه المقالة عن `const` أيضاً.
- `var` القديمة لها بعض الإختلافات الملحوظة, سيتم تغطيتها في هذا المقال <info:var>.

````

## كُتل الكود

إذا تم تعريف مُتغير داخل كتلة من الكود `{...}`, هذا المٌتغير يمكن رؤيته فقط داخل هذه الكتلة.

مثلاً:


```js run
{
  // تعريف مُتغير محلي لا يمكن أن تتم رؤيته في الخارج


  let message = "Hello"; // مرئي فقط داخل هذه الكتلة

  alert(message); // Hello
}

alert(message); // خطأ: message غير مُعرًفة
````

يمكن أن نستخدم هذا فى عزل جزء من الكود للقيام بمهمة خاصةٍ به بإستخدام المُتغيرات التي تنتمي إليه فقط:

```js run
{
  // إظهار رسالة
  let message = 'Hello';
  alert(message);
}

{
  // إظهار رسالة أخرى
  let message = 'Goodbye';
  alert(message);
}
```

سيكون هناك خطاء بدون الأقواس

````smart header="سيكون هناك خطاء بدون الأقواس"

يرجي ملاحظة, بدون فصل الكُتل سيكون هناك خطأ عند إستخدام `let` مع إسم مُتغير موجود بالفعل::

```js run
// إظهار رسالة
let message = "Hello";
alert(message);

// إظهار رسالة أخرى
*!*
let message = "Goodbye"; // خطأ: مُتغير موجود بالفعل
*/!*
alert(message);
```
````

لكلِ من `if`, `for`, `while` وهكذا كل المُتغيرات المُعرًفة بداخلها `{...}` يمكن رؤيتها فقط داخل الأقواس:

```js run
if (true) {
  let phrase = 'Hello!';

  alert(phrase); // Hello!
}

alert(phrase); // خطأ, مُتغير غير موجود!
```

هنا, بعد إنتهاء `if`, `alert` لن ترى `phrase` لذلك يوجد خطأ

هذا عظيم, هذا يسمح لنا بإنشاء متغير محلي للكتلة خاص فقط بفرع `if`.

نفس الشئ عند القيام بـ `for` و `while`:

```js run
for (let i = 0; i < 3; i++) {
  // المتغير i لا يمكن رؤيته إلا داخل الـ for
  alert(i); // 0, then 1, then 2
}

alert(i); // خطأ, مُتغير غير موجود!
```

لاحظ أن بصرياً `let i` تعتبر خارج الأقواس `{...}`. لكن `for` تعتبر حالة بناء خاصة لأن كل ما تم تعريفه بداخلها يعتبر داخل الأقواس.

## الدوال المتداخلة

تسمي الدالة متداخلة عندما يتم إنشاتها داخل دالة أخري.

هذا سهل القيام به في جافا سكريبت.

يمكن إستخدام هذا في تنظيم الكود الخاص بنا, مثل هذا:

```js
function sayHiBye(firstName, lastName) {
  // دالة متداخلة للمساعدة
  function getFullName() {
    return firstName + ' ' + lastName;
  }

  alert('Hello, ' + getFullName());
  alert('Bye, ' + getFullName());
}
```

هنا الدالة المتداخلة `getFullName()` صُنعت للإقناع. هذه الدالة يمكنها الوصول للمُتغيرات الخارجية وتُرجع الإسم بالكامل. تعتبر الدوال المتداخلة إلى حد ما شائعة الإستخدام في جافا سكريبت.

والمثير للإهتمام ايضاً أن الدالة المتداخلة يمكن إرجاعها!
إما علي شكل خاصية لكائن أو نتيجة إذا كانت تقوم ببعض العمليات.
أيضا يمكن إستخدامها فى أي مكان أخر ليس من المهم أين لكنها مازالت تستطيع الوصول لنفس المُتغيرات الخارجية.

في الأسفل, `makeCounter` صَنعت "counter" و دالة أخرى تُرجع الرقم التالي مع كل نداء:

```js run
function makeCounter() {
  let count = 0;

  return function () {
    return count++;
  };
}

let counter = makeCounter();

alert(counter()); // 0
alert(counter()); // 1
alert(counter()); // 2
```

بالرغم من أن هذا المثال بسيط جداً إلا أنه يستخدم في الحياة العملية كمثال: [موْلد رقم عشوائي](https://en.wikipedia.org/wiki/Pseudorandom_number_generator) لصُنع قيمة عشوائية للتجارب الاوتوماتيكية.

كيف يعمل هذا؟ هل إذا صنعنا عدادات كثير سيكونوا غير معتمدين علي بعضهم؟ ماذا يحدث مع المتغيرات هنا؟

فهم هذه الأشياء يعد عظيماً للمعلومات الشاملة لجافا سكريبت ومفيد جداً في حالة السيناريوهات المعقدة. لذلك هيا نتعمق أكثر في أمور أكثر صعوبة وتحتاج إلي تركيز.

<<<<<<< HEAD
## البيئات المعجمية
=======
Understanding such things is great for the overall knowledge of JavaScript and beneficial for more complex scenarios. So let's go a bit in-depth.
>>>>>>> 18b1314af4e0ead5a2b10bb4bacd24cecbb3f18e

```warn header="هنا يجب أن تكون شديد التركيز!"

كل الشرح المتعمق السابق كان شرح مع تجنب الدخول في تفاصيل ذات مستوي منخفض من اللغة لكن أي فهم دون هذه التفاصيل يعتبر ناقص, لذلك كُن مستعد للأننا سنتعمق في مستويات منخفضة من اللغة

```

للإيضاح, سينقسم الشرح إلي عدة خطوات

### الخطوة الأولي: المُتغيرات

في لغة جافا سكريبت، تملك كلّ دالة عاملة أو كتلة شفرات `‎{...}‎` أو حتّى السكربت كلّه - تملك كائنًا داخليًا مرتبطًا بها (ولكنّه مخفي) يُدعى _بالبيئة المُعجمية_ _Lexical Environment_.

تتألّف كائنات البيئات المُعجمية هذه من قسمين:

1. _سجلّ مُعجمي_ _Environment Record_: وهو كائن يخزّن كافة المتغيرات المحلية على أنّها خاصيات له (كما وغيرها من معلومات مثل قيمة `‎this‎`).
2. إشارة إلى _البيئة المُعجمية الخارجية_ - أي المرتبطة مع الكود الخارجي للكائن المُعجمي.

**ليس «المتغير» إلا خاصية لإحدى الكائنات الداخلية الخاصة: السجل المُعجمي `‎Environment Record‎`. وحين نعني «بأخذ المتغير أو تغيير قيمته» فنعني «بأخذ خاصية ذلك الكائن أو تغيير قيمتها».**

إليك هذه الكود البسيط مثالًا (فيها بيئة مُعجمية واحدة فقط):

![lexical environment](lexical-environment-global.svg)

هذا ما نسمّيه البيئة المُعجمية العمومية (global) وهي مرتبطة بالسكربت كاملًَا.

نعني بالمستطيل (في الصورة أعلاه) السجل المُعجمي (أي مخزن المتغيرات)، ونعني بالسهم الإشارة الخارجية له. وطالما أنّ البيئة المُعجمية العمومية ليس لها إشارة خارجية، فذاك السهم يُشير إلى `‎null‎`.

عندما يتم تنفيذ الكود, تتغير البيئة المُعجمية.

هاهو مثال أطول بقليل:

![lexical environment](closure-variable-phrase.svg)

نرى في المستطيلات على اليمين كيف تتغيّر البيئة المُعجمية العمومية أثناء تنفيذ الكود:

1. عندما يبدأ السكريبت بالعمل, تكون البيئة المُعجمية مجهزة بكل المُتغيرات المٌعرفة داخلها.
   - في البداية يكونوا فى حالة تسمي **غير مُعرف**. هذه الحالة تعني أن المحرك يعرف عن المُتغيرات لكن لا يستطيع الإشارة إليهم حتي يتم تعريفهم عن طريق `let`.
2. بعدها يظهر التصريح `‎let phrase‎`، لكن لم تُسند للمتغيّر أيّ قيمة، لذا تخزّن البيئة `‎undefined‎`.
3. تُسند للمتغير `‎phrase‎` قيمة.
4. وهنا تتغيّر قيمة `‎phrase‎`.

# بسيط حتّى الآن، أم لا؟

1. When the script starts, the Lexical Environment is pre-populated with all declared variables.
   - Initially, they are in the "Uninitialized" state. That's a special internal state, it means that the engine knows about the variable, but it cannot be referenced until it has been declared with `let`. It's almost the same as if the variable didn't exist.
2. Then `let phrase` definition appears. There's no assignment yet, so its value is `undefined`. We can use the variable from this point forward.
3. `phrase` is assigned a value.
4. `phrase` changes the value.

- المتغير هو فعليًا خاصية لإحدى الكائنات الداخلية الخاصة، وهذا الكائن مرتبط بالكتلة أو الدالة أو السكربت الذي يجري تنفيذه حاليًا.
- حين نعمل مع المتغيرات نكون في الواقع نعمل مع خصائص ذلك الكائن.

```smart header="تعتبر البيئة المُعجمية من مواصفات الكائن"
تعتبر البيئة المُعجمية من مواصفات الكائن: إنها توجد فقط بشكل نظري هنا: [مواصفات اللغة](https://tc39.es/ecma262/#sec-lexical-environments) لوصف كيف تعمل الأمور. لكن لا نستطيع أن نأتي بهذا الكائن في كودنا الخاص ونعدل عليه.

محركات جافا سكريبت أيضاً يمكن أن تحسن هذا, بالتغاضي عن المُتغيرات الغير مستخدمة لتوفير المساحة وعمل خدع داخلة, طالما كان التصرف المرئي كما تم وصفه.

```

### الخطوة الثانية: التصريح بالدوال

الدالة أيضاً تعتبر قيمة, مثل المُتغير.

لكن الإختلاف أن التصريح بالدالة

**لكن الدوال على عكس متغيرات `‎let‎`، فليست تُهيّأ تمامًا حين تصلها عملية التنفيذ، لا، بل قبل ذلك حين تُنشأ البيئة المُعجمية.**

وحين نتكلم عن أعلى الدوال مستوًى، فنعني ذلك لحظة بدء السكربت.

ولهذا السبب يمكننا استدعاء الدوال التي صرّحناها حتّى قبل أن نرى ذاك التعريف.

نرى في الكود أدناه كيف أنّ البيئة المُعجمية تحتوي شيئًا منذ بداية التنفيذ (وليست فارغة)، وما تحتويه هي `‎say‎` إذ أنّها تصريح عن دالة. وبعدها تسجّل `‎phrase‎` المُصرّح باستعمال `‎let‎`:

![](closure-function-declaration.svg)

هذا التصرف موجود فقط تصاريح الدالة Function Declarations وليس تعابير الدالة Function Expressions لأن تعابير الدالة تعامل معاملة المُتغير لأنها تخزن في متغير. مثل `let say = function(name)...`.

### الخطوة الثالثة: البيئات المُعجمية الداخلية والخارجية

عندما تبدأ الدالة بالعمل, في بداية لحظة مناداتها تُنشأ بيئة مُعجمية تلقائيًا ما إن تعمل الدالة وتخزّن المتغيرات المحلية ومُعاملات ذلك الاستدعاء

فمثلًا هكذا تبدو بيئة استدعاء `‎say("John")‎` (وصل التنفيذ السطر الذي عليه سهم):

<!--
    ```js
    let phrase = "Hello";

    function say(name) {
     alert( `${phrase}, ${name}` );
    }

    say("John"); // Hello, John
    ```-->

![](lexical-environment-simple.svg)

إذًا... حين نكون داخل استدعاءً لأحد الدوال نرى لدينا بيئتين مُعجميتين: الداخلية (الخاصة باستدعاء الدالة) والخارجية (العمومية):

- ترتبط البيئة المُعجمية الداخلية مع عملية التنفيذ الحالية للدالة `‎say‎`. تملك خاصية واحدة فقط: `‎name‎` (وسيط الدالة). ونحن استدعينا `‎say("John")‎` بهذا تكون قيمة `‎name‎` هي `‎"John"‎`.
- البيئة المُعجمية الخارجية وهي هنا البيئة المُعجمية العمومية. تملك متغير `‎phrase‎` والدالة ذاتها.

للبيئة المُعجمية الداخلية إشارة إلى تلك «الخارجية».

**حين يريد الكود الوصول إلى متغير من المتغيرات، يجري البحث أولًا في البيئة المُعجمية الداخلية، وبعدها الخارجية، والخارجية أكثر وأكثر وكثر حتى نصل العمومية.**

لو لم يوجد المتغير في عملية البحث تلك فسترى خطأً (لو استعملت النمط الصارم _Strict Mode_). لو لم تستعمل `‎use strict‎` فسيُنشئ الإسناد إلى متغير غير موجود (مثل `‎user = "John"‎`) متغيرًا عموميًا جديدًا باسم `‎user‎`. سبب ذلك هو التوافق مع الإصدارات السابقة.

لنرى عملية البحث تلك في مثالنا:

- حين تحاول `‎alert‎` في دالة `‎say‎` الوصول إلى المتغير `‎name‎` تجده مباشرةً في البيئة المُعجمية للدالة.
- وحين تحاول الوصول إلى متغير `‎phrase‎` ولا تجده محليًا، تتبع الإشارة في البيئة المحلية وتصل البيئة المُعجمية خارجها، وتجد المتغير فيها.

![lexical environment lookup](lexical-environment-simple-lookup.svg)

### الخطوة الرابعة: إعادة/إرجاع دالة

إليك ما يجري في مثال `‎makeCounter‎` خطوةً بخطوة

```js
function makeCounter() {
  let count = 0;

  return function () {
    return count++;
  };
}

let counter = makeCounter();
```

تُنشأ بيئة مُعجمية لحظة استدعاء `‎makeCounter()‎` لتحمل متغيراتها ومُعاملاتها.

إذاً نحن نمتلك بيئتين مُعجميتين, كما هو في المثال الأعلى:

![](closure-makecounter.svg)

ماهذا الإختلاف!, أثناء تشغيل `makeCounter()` هناك دالة صغيرة تم صنعها بداخلها تحتوي فقط علي سطر واحد `return count++` ولم نقم بمناداتها فقط صنعناها.

جميع الدوال تتذكر البيئة المثعجمية حيث المكان الذي صُنعوا فيه. تقنياً, لا يوجد سحر هنا: كل دالة لها خاصية مخفية تسمي `[[Environment]]`, التي تحتفظ بالبيئة المُعجمية حيث تم صنعها:

![](closure-makecounter-environment.svg)

إذا `counter.[[Environment]]` يشير إلي البيئة المعجمية `{count: 0}`. هكذا تتذكر الدالة أين تم صُنعها.
`[[Environment]]` يتم وضع قسمته مرة واحدة فقط ولا يتم تغيرها.
وهذه المرة عندما يتم صنع الدالة

فيما بعد عندما تتم مناداة `counter()`, تظهر بيئة مُعجمية جديدة والبيئة المعجمية الخارجية لها تؤخذ من هنا `counter.[[Environment]]`:

![](closure-makecounter-nested-call.svg)

# الأن عندما يبدأ الكود في البحث عن المتغير `count` داخل الدالة `counter()`, يبحث أولاً في البيئة المعجمية الخاصة به وإذا كانت فارفة يبحث في البيئة المعجمية الخارجية, ثم الخارج ثم الخارج حتي يجده.

Now when the code inside `counter()` looks for `count` variable, it first searches its own Lexical Environment (empty, as there are no local variables there), then the Lexical Environment of the outer `makeCounter()` call, where it finds and changes it.

** المتغير تم تعديله في البيئة المعجمية حيث يعيش.**

ها هي الحالة بعد التنفيذ:

![](closure-makecounter-nested-call-2.svg)

إذا نادينا `counter()` مراتٍ عديدة, المتغير `count` سيزيد إلي `2`, `3` وهكذا في نفس المكان

```smart header="المنغلقات"
هناك مصطلح عام يُستعمل في البرمجة باسم «المُنغلِق» _Clousure_ ويُفترض أن يعلم به المطوّرون.

A [المنغلقات](https://en.wikipedia.org/wiki/Closure_(computer_programming)) is a function that remembers هو دالة تتذكّر متغيراتها الخارجية كما ويمكنها أن تصل إليها. هذا الأمر -في بعض اللغات- مستحيل، أو أنّه يلزم كتابة الدالة بطريقة معيّنة ليحدث ذلك. ولكن كما شرحنا أعلاه ففي لغة جافا سكريبت، كلّ الدوال مُنغلِقات بطبيعتها (وطبعًا ثمّة استثناء واحد أوحد نشرحه في فصل  <info:new-function>).

يعني ذلك بأنّ الدوال تتذكّر أين أُنشئت باستعمال خاصية `‎[[Environment]]‎` المخفية، كما ويمكن للدوال كافة الوصول إلى متغيراتها الخارجية.

لو كنت عزيزي مطوّر الواجهات في مقابلةً وأتاك السؤال «ما هو المُنغلِق؟» فيمكنك أن تقدّم تعريفه شرحًا، كما وتُضيف بأنّ الدوال في جافا سكريبت كلّها مُنغلِقات، وربما شيء من عندك تفاصيل تقنية مثل خاصية `‎[[Environment]]‎` وطريقة عمل البيئات المُعجمية.

```

## كنس المهملات

عادةً ما تُمسح وتُحذف البيئة المُعجمية بعدما تعمل الدالة

However, if there's a nested function that is still reachable after the end of a function, then it has `[[Environment]]` property that references the lexical environment.

In that case the Lexical Environment is still reachable even after the completion of the function, so it stays alive.

مثال:

```js
function f() {
  let value = 123;

  return function () {
    alert(value);
  };
}

let g = f(); // g.[[Environment]] stores a reference to the Lexical Environment
// of the corresponding f() call
```

Please note that if `f()` is called many times, and resulting functions are saved, then all corresponding Lexical Environment objects will also be retained in memory. In the code below, all 3 of them:

```js
function f() {
  let value = Math.random();

  return function () {
    alert(value);
  };
}

// في المصفوفة ثلاث دوال تُشير كلّ منها إلى البيئة المُعجمية
// ‫في عملية التنفيذ f()‎ المقابلة لكلّ واحدة

let arr = [f(), f(), f()];
```

يموت كائن البيئة المُعجمية حين لا يمكن أن يصل إليه شيء (كما الحال مع أيّ كائن آخر). بعبارة أخرى فهو موجود طالما ثمّة دالة متداخلة واحدة (على الأقل) في الكود تُشير إليه.

في الكود أسفله، بعدما تصير `‎g‎` محالة الوصول تُمسح بيئتها المُعجمية فيها (ومعها متغير `‎value‎`) من الذاكرة:

```js
function f() {
  let value = 123;

  return function () {
    alert(value);
  };
}

let g = f(); // ‫طالما يمكن أن تصل func بإشارة إلى g، ستظلّ تشغل حيّزًا في الذاكرة

g = null; // ...والآن لم تعد كذلك ونكون قد نظّفنا الذاكرة
```

### التحسينات على أرض الواقع

كما رأينا، فنظريًا طالما الدالة «حيّة تُرزق» تبقى معها كل متغيراتها الخارجية.

**An important side effect in V8 (Chrome, Edge, Opera) is that such variable will become unavailable in debugging.**

**ثمّة -في محرّك V8 (كروم وأوبرا)- تأثير مهمّ ألا وهو أنّ هذا المتغير لن يكون مُتاحًا أثناء التنقيح.**

جرّب تشغيل المثال الآتي في «أدوات المطوّرين» داخل متصفّح كروم.

ما إن يُلبث تنفيذ الشيفرة، اكتب `‎alert(value)‎` في الطرفية.

```js run
function f() {
  let value = Math.random();

  function g() {
    debugger; // in console: type alert(value); No such variable!
  }

  return g;
}

let g = f();
g();
```

كما رأينا، ما من متغير كهذا! يُفترض نظريًا أن نصل إليه ولكنّ المحرّك حسّن أداء الشيفرة وحذفه.

يؤدّي ذلك أحيانًا إلى مشاكل مضحكة (هذا إن لم تجلس عليها اليوم بطوله لحلّها) أثناء التنقيح. إحدى هذه المشاكل هي أن نرى المتغير الخارجي بدل الذي توقّعنا أن نراه (يحمل كلاهما نفس الاسم):

```js run global
let value = 'Surprise!';

function f() {
  let value = 'the closest value';

  function g() {
    debugger; // in console: type alert(value); Surprise!
  }

  return g;
}

let g = f();
g();
```

This feature of V8 is good to know. If you are debugging with Chrome/Edge/Opera, sooner or later you will meet it.

That is not a bug in the debugger, but rather a special feature of V8. Perhaps it will be changed sometime. You can always check for it by running the examples on this page.
