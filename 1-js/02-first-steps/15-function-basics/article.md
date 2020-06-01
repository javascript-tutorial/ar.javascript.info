# الدوال

أحيان كثيرة نريد تنفيذ نفس الأوامر في أماكن مختلفة من البرنامج.

مثلًا نريد إظهار رسالة عندما يقوم المستخدم بتسجيل الدخول أو الخروج أو أماكن أخرى.

الدوال هي وحدة البناء الأساسية لأي برنامج فهي تمكننا من تنفيذ نفس الأوامر في عدة أماكن دون تكرار.

لقد رأينا من قبل العديد من الدوال المدمجة في اللغة مثل `alert(message)`, `prompt(message, default)` و `confirm(question)`. ولكن يمكننا إنشاء الدوال الخاصة بنا.

## Function Declaration

لإنشاء دالة نستخدم *function declaration*.

مثل هذا:

```js
function showMessage() {
  alert( 'مرحبًا بالجميع' );
}
```

كلمة `function` تكتب أولا ثم يكتب *اسم الدالة* ثم قائمة *parameters* بين القوسين (يفصل بينهم بفاصلة وهي فارغة في المثال السابق) وأخيرا الكود الذي ينفذ ويسمى "the function body" بين القوسين المعقوفين.

```js
function name(parameters) {
  ...body...
}
```

يمكننا استدعاء دالتنا الجديدة عن طريق اسمها: `showMessage()`.

For instance:

```js run
function showMessage() {
  alert( 'مرحبًا بالجميع' );
}

*!*
showMessage();
showMessage();
*/!*
```

استدعاء `showMessage()` يقوم بتنفيذ الكود وتظهر لنا الرسالة مرتين.

هذا المثال يوضح الهدف الأساسي للدوال وهو تجنب تكرار الكود.

إذا أردنا تغيير الرسالة التي تعرض سيكون كافيًا تغيير الكود في مكان واحد فقط وهو الدالة التي تعرض لرسالة.

## المتغيرات المحلية

المتغير الذي يعرف داخل دالة يكون متاح داخل هذه الدالة فقط

مثلًا:

```js run
function showMessage() {
*!*
  let message = "Hello, I'm JavaScript!"; // local variable
*/!*

  alert( message );
}

showMessage(); // Hello, I'm JavaScript!

alert( message ); // <-- خطأ! المتغير متاح فقط داخل الدالة
```

## المتغيرات الخارجية

يمكن للدالة الوصول للمتغيرات خارجها مثل:

```js run no-beautify
let *!*userName*/!* = 'John';

function showMessage() {
  let message = 'Hello, ' + *!*userName*/!*;
  alert(message);
}

showMessage(); // Hello, John
```

الدالة لديها وصول كامل للمتغيرات خارجها ويمكنها أيضًا التعديل عليهم.

مثلًا:

```js run
let *!*userName*/!* = 'John';

function showMessage() {
  *!*userName*/!* = "Bob"; // (1) تغيير قيمة المتغير الخارجي

  let message = 'Hello, ' + *!*userName*/!*;
  alert(message);
}

alert( userName ); // *!*John*/!* قبل استدعاء الدالة

showMessage();

alert( userName ); // *!*Bob*/!* تم تغيير المتغير بواسطة الدالة
```

يتم استخدام المتغير الخارجي فقط إذا لم يوجد متغير محلي.

إذا تم عمل متغير محلي بنفس الاسم فيتم استخدامه بدلًا من الخارجي فعلى سبيل المثال الدالة التالية ستستخدم المتغير المحلي `userName` وتتجاهل المتغير الخارجي:

```js run
let userName = 'John';

function showMessage() {
*!*
  let userName = "Bob"; // تعريف متغير محلي
*/!*

  let message = 'Hello, ' + userName; // *!*Bob*/!*
  alert(message);
}

// ستقوم الدالة بعمل واستخدام userName الخاص بها
showMessage();

alert( userName ); // *!*John*/!*, لم يتغير, الدالة لن تصل للمتغير الخارجي
```

```smart header="المتغيرات العالمية"
المتغيرات التي تعرف خارج أي دالة مثل المتغير الخارجي `userName` في المثال السابق تسمى *global*.

المتغيرات العالمية يمكن استخدامها بواسطة أي دالة (إذا لم يتم تعرف متغير محلي بنفس الاسم).

من الأفضل التقليل من المتغيرات العالمية. ويتم تعريف المتغيرات في الدوال الخاصة بها. على الرغم من أن المتغيرات العالمية مفيدة لتخزين البيانات لاستخدامها على مستوى المشروع كله.
```

## Parameters

يمكننا تمرير أي قيم إلى الدالة باستخدام parameters (أيضًا تسمى *function arguments*) .

في هذا المثال الدالة لديها معاملين: `from` و `text`.

```js run
function showMessage(*!*from, text*/!*) { // arguments: from, text
  alert(from + ': ' + text);
}

*!*
showMessage('Ann', 'Hello!'); // Ann: Hello! (*)
showMessage('Ann', "What's up?"); // Ann: What's up? (**)
*/!*
```

عند استدعاء الدالة في السطر `(*)` و `(**)` فإن القيم الممررة تنسخ إلى المتغيرات المحلية `from` و `text`. ثم تقوم الدالة باستخدامهم.

هنا مثال آخر حيث لدينا المتغير `from` وقمنا بتمريره إلى الدالة. لاحظ أن الدالة قامت بتغيير قيمة `from` ولكن التغيير لا يؤثر في المتغير الممرر لأن الدالة تحصل على نسخة من القيمة:


```js run
function showMessage(from, text) {

*!*
  from = '*' + from + '*'; // make "from" look nicer
*/!*

  alert( from + ': ' + text );
}

let from = "Ann";

showMessage(from, "Hello"); // *Ann*: Hello

// قيمة "from" تظل كما هي لأن الدالة قامت بالتعديل على متغيرها المحلي
alert( from ); // Ann
```

## القيم الإفتراضية

إذا لم يتم تمرير قيمة Parameter يأخذ القيمة `undefined`.

على سبيل المثال الفنكشن السابقة `showMessage(from, text)` يمكن استدعائها وتمرير قيمة واحدة فقط:

```js
showMessage("Ann");
```

هذا ليس خطأ ولكن سينتج `"Ann: undefined"`. لم يتم تمرير `text` لذلك يتم افتراض أن `text === undefined`.

إذا أردت تخصيص قيمة إفتراضية ل `text` يمكن وضعها بعد `=`:

```js run
function showMessage(from, *!*text = "no text given"*/!*) {
  alert( from + ": " + text );
}

showMessage("Ann"); // Ann: no text given
```

إذا لم يتم تمرير قيمة `text` سيتم إعطائه القيمة `"no text given"`

هنا استخدمنا النص `"no text given"` ولكن يمكن أن تكون القيمة معقدة أكثر من:

```js run
function showMessage(from, text = anotherFunction()) {
  // anotherFunction() سيتم تنفيذها فقط إذا لم يحدد قيمة
  // وناتجها سيوضع كقيمة للمتغير text
}
```

```smart header="تنفيذ القيم الإفتراضية"
في الجافاسكربت يتم تنفيذ القيم الإفتراضية في كل مرة يتم استدعاء الدالة دون تمرير قيمة.

في المثال السابق سيتم تنفيذ `anotherFunction()` في كل مرة يتم استدعا `showMessage()` دون تمرير قيمة `text`.
```

### بديل القيم الإفتراضية

أحيانا نريدتحديد قيمة لإفتراضية ولكن ليس في تعريف الدالة بل في وقت لاحق أثناء التنفيذ.

لمعرفة المتغير الذي لم يمرر قيمته يمكننا مقارنته مع `undefined`:

```js run
function showMessage(text) {
*!*
  if (text === undefined) {
    text = 'empty message';
  }
*/!*

  alert(text);
}

showMessage(); // empty message
```

...أو نستخدم المعامل `||`:

```js
// إذا لم يتم تمرير قيمة text أو تم تمرير "" يجعل قيمته 'empty'
function showMessage(text) {
  text = text || 'empty';
  ...
}
```

محركات الجافاسكربت الحديثة تدعم [nullish coalescing operator](info:nullish-coalescing-operator) `??`وهوأفضل في التعامل مع falsy values مثل `0`:

```js run
// إذا لم يوجد قيمة "count" يعرض "unknown"
function showCount(count) {
  alert(count ?? "unknown");
}

showCount(0); // 0
showCount(null); // unknown
showCount(); // unknown
```

## إرجاع قيمة

يمكن للدالة إرجاع قيمة كناتج لها.

أبسط مثال هو دالة تقوم بجمع رقمين:

```js run no-beautify
function sum(a, b) {
  *!*return*/!* a + b;
}

let result = sum(1, 2);
alert( result ); // 3
```

كلمة `return` يمكن أن تكون في أي مكان في الكود وعند الوصول لها تتوقف الدالة وترجع القيمة المحددة إلى مكان الاستدعاء (وضعت في المتغير `result` بالأعلى).

يمكن حدوث أكثر من `return` في نفس الدالة:

```js run
function checkAge(age) {
  if (age >= 18) {
*!*
    return true;
*/!*
  } else {
*!*
    return confirm('Do you have permission from your parents?');
*/!*
  }
}

let age = prompt('How old are you?', 18);

if ( checkAge(age) ) {
  alert( 'Access granted' );
} else {
  alert( 'Access denied' );
}
```

يمكن استخدام `return` بدون قيمة عندما نريد إيقاف الدالة في الحال.

مثلًا:

```js
function showMovie(age) {
  if ( !checkAge(age) ) {
*!*
    return;
*/!*
  }

  alert( "Showing you the movie" ); // (*)
  // ...
}
```

في المثال بالأعلى إذا كانت `checkAge(age)` ترجع `false` عندها `showMovie` لن تكمل إلى `alert`.

````smart header="الدالة التي لديها `return` فارغة أو ليس لديها ترجع `undefined`"
إذا كانت الدالة لا ترجع قيمة فكأنها ترجع `undefined`:

```js run
function doNothing() { /* empty */ }

alert( doNothing() === undefined ); // true
```

استخدام `return` فارغة هو أيضًا مثل `return undefined`:

```js run
function doNothing() {
  return;
}

alert( doNothing() === undefined ); // true
```
````

````warn header="لا تضع سطر جديد بين `return` والقيمة"
إذا اردنا استخدام تعبير طويل مع `return` سيكون من الأفضل وضعه في سطر جديد:

```js
return
 (some + long + expression + or + whatever * f(a) + f(b))
```
هذا لن يعمل لأن الجافاسكربت ستفترض وجود فاصلة منقوطة بعد `return`. وهذا يطابق:

```js
return*!*;*/!*
 (some + long + expression + or + whatever * f(a) + f(b))
```

وبهذا سيصبح return فارغة.

إذا أردنا استخدام تعبير طويل في سطر جديد يجب وضع بدايته في نفس السطر مع `return`. أو نضعه بين قوسين كالآتي:

```js
return (
  some + long + expression
  + or +
  whatever * f(a) + f(b)
  )
```
وسيعمل كما هو متوقع.
````

## تسمية الدالة [#function-naming]

الدوال هي أفعال. لهذا ففي الغالب يكون اسمها عبارة عن فعل. يجب أن يكون مختصرًا ويوضح بقدر الإمكان ما تفعله الدالة فيمكن لأي أحد يقرأ الكود أن يعرف وظيفة الدالة بسهولة.

من الشائع أن يبدأ اسم الدالة بكلمة توصف الفعل ويجب أن يتم الإتفاق على هذه الكلمات بين أعضاء الفريق.

على سبيل المثال فالدوال التي تبدأ بكلمة `"show"` فهي في الغالب تعرض شئ معين.

Function starting with...

- `"get…"` -- ترجع قيمة,
- `"calc…"` -- تحسب شئ ما,
- `"create…"` -- تنشئ شئ ما,
- `"check…"` -- تختبر قيمة ما وترجع قيمة منطقية.

أمثلة:

```js no-beautify
showMessage(..)     // shows a message
getAge(..)          // returns the age (gets it somehow)
calcSum(..)         // calculates a sum and returns the result
createForm(..)      // creates a form (and usually returns it)
checkPermission(..) // checks a permission, returns true/false
```

استخدام هذه الكلمات يعطي فكرة عن ما تفعله الدالة وما ينتج عنها.

```smart header="دالة واحدة -- فعل واحد"
يجب أن تقوم الدالة بعمل شئ واحد فقط لا أكثر يوصفه اسمها.

الفعلين الغير معتمدين على بعضهما يتم وضع كل منهما في دالة منفصلة حتى لو سيتم استدعائها مع بعضهما (في هذه الحالة يمكن عمل دالة ثالثة تستدعيهما).

أمثلة:

- `getAge` -- لن تكون جيدة إذا كانت تعرض `alert` به العمر (فقط نحصل على القيمة منها).
- `createForm` -- لن تكون جيدة إذا كانت تقوم بتعديل الصفحة وإضافة الاستمارة لها (فقط تنشئها وترجعها).
- `checkPermission` -- لن تكون جيدة إذا كانت تعرض رسالة `access granted/denied` message (فقط تفحص وترجع الناتج).

كل هذه الأمثلة تفترض المعنى المنتشر للكلمة المستخدمة. يمكنك أنت وفريقك الاتفاق على المعاني والكلمات التي تريدون ولكن لن يكون هناك أي إختلاف ففي أي حالة يجب أن يكون لديك معرفة بمعى الكلمة المستخدمة وما يمكن للدالة أن تفعله وما لا يمكنها فعله.
```

```smart header="الاسماء القصيرة جدًا"
الدوال التي تستخدم بكثرة غالبًا يتم إعطائها اسم قصير.

على سبيل المثال مكتبة [jQuery](http://jquery.com) تعرف دالة اسمها `$`. ومكتبة [Lodash](http://lodash.com/) لديها دالة اسمها `_`.

هذه مجرد استثناءات ففي العموم يجب أن يكون اسم الدالة معبرًا.
```

## الدوال == تعليقات

الدوال يجب أن تكون قصيرة وتفعل شئ واحد فقط. إذا كانت الدالة تقوم بعمليات كثيرة لتنفيذ عملها فمن الأفضل تقسيمها إلى مجموهة دوال أصغر. هذا ليس سهلًا ولكنه الأفضل.

الدالة المقسمة ليست فقط أسهل في الإختبار واكتشاف الأخطاء -- ولكنها أيضًا تعتبر تعليق عظيم!

على سبيل المثال قارن الدالتين `showPrimes(n)` بالأسفل. كل منهما تعرض [أرقام أولية](https://en.wikipedia.org/wiki/Prime_number) حتى `n`.

الأولى تستخدم عنوان:

```js
function showPrimes(n) {
  nextPrime: for (let i = 2; i < n; i++) {

    for (let j = 2; j < i; j++) {
      if (i % j == 0) continue nextPrime;
    }

    alert( i ); // a prime
  }
}
```

الثانية تستخدم دالة منفصلة اسمها `isPrime(n)` لمعرفة إذا كانت القيمة أولية:

```js
function showPrimes(n) {

  for (let i = 2; i < n; i++) {
    *!*if (!isPrime(i)) continue;*/!*

    alert(i);  // a prime
  }
}

function isPrime(n) {
  for (let i = 2; i < n; i++) {
    if ( n % i == 0) return false;
  }
  return true;
}
```

الثانية هي الأسهل في الفهم أليس كذلك ؟ فبدلًا من الأوامر نحن نرى اسم الحدثث (`isPrime`). بعض الناس يسمون هذا الكود *self-describing*.

إذا يمكن عمل الدوال حتى لو لم نكن سنستخدمها مرات عديدة فهي تجعل الكود مقروء أكثر.

## الخلاصة

تعريف الدالة يكون كالتالي:

```js
function name(parameters, delimited, by, comma) {
  /* code */
}
```

- القيم الممرة إلى الدالة يتم نسخها إلى متغيراتها المحلية.
- يمكن للدالة الوصول للمتغيرات خارجها ولكن لا يمكن للكود بالخارج أن يصل إلى المتغيرات المحلية داخل دالة.
- يمكن للدالة إرجاع قيمة وإذا لم تفعل فيكون ناتجها `undefined`.

لجعل الكود أفضل وأسهل ينصح باستخدام المتغيرات المحلية وتجبن استخدام المتغيرات الخارجية.

من السهل فهم الدوال التي تحصل على قيم وتعمل عليها وترجع نتيجة أكثر من الدوال التي تعمل على متغيرات خارجها وتعدل عليهم.

تسمية الدوال:

- يجب أن يكون اسم الدالةواضح ويعبر عن عملها بحيث عندما نرى استدعاء الدالة نعرف ما تقوم به وما نتيجتها.
- الدالة هي فعل لذا ففي الغالب اسمها يكون فعل.
- هناك كلمات تستخدم قبل اسم الدالة `create…`, `show…`, `get…`, `check…` وغيرها لتعطي تلميح عن ما تفعل الدالة.

الدوال هي وحدة البناء الأساسية للبرنامج. الآن عرفنا الاساسيات ويمكننا البدء بصنعها واستخدامها. ولكن هذه فقط البداية وسنرجع لها مرات العديدة غائصين في اعماقها.
