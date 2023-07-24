# عامل التحقق من الفراغ '??'

[recent browser="new"]

يتم كتابة عامل التحقق من الفراغ كعلامتي استفهام `??`.

<<<<<<< HEAD
نظرًا لأنه يعامل `null` و `undefined` بطريقة مماثلة ، سنستخدم مصطلحًا خاصًا هنا ، في هذه المقالة. سنقول أن التعبير "محدد" عندما لا يكون `null` ولا `undefined`.
=======
As it treats `null` and `undefined` similarly, we'll use a special term here, in this article. For brevity, we'll say that a value is "defined" when it's neither `null` nor `undefined`.
>>>>>>> d694e895efe89922a109702085b6ca1efeffea10

نتيجة `a ?? b` هي:
- إذا كان `a` محددًا ، فإن `a`،
- إذا لم يتم تحديد `a` ، فإن `b`.

بعبارة أخرى ، يعيد `??` الوسيطة الأولى إذا لم يكن `null/undefined`. وإلا ، الثانية.

عامل التحقق من الفراغ ليس شيئًا جديدًا تمامًا. إنه مجرد صياغة جميلة للحصول على القيمة "المحددة" الأولى من اثنين.

يمكننا إعادة كتابة `result = a ?? b` باستخدام العوامل التي نعرفها بالفعل ، مثل هذا:

```js
result = (a !== null && a !== undefined) ? a : b;
```

الآن يجب أن يكون من الواضح تمامًا ما يفعله `??`. دعنا نرى أين يساعد.

<<<<<<< HEAD
حالة الاستخدام الشائعة لـ `??` هي توفير قيمة افتراضية لمتغير محتمل أن يكون غير محدد.

على سبيل المثال ، هنا نعرض `user` إذا تم تحديده ، وإلا `Anonymous`:
=======
The common use case for `??` is to provide a default value.

For example, here we show `user` if its value isn't `null/undefined`, otherwise `Anonymous`:
>>>>>>> d694e895efe89922a109702085b6ca1efeffea10

```js run
let user;

<<<<<<< HEAD
alert(user ?? "مجهول الهوية"); // مجهول الهوية (لم يتم تحديد المستخدم)
=======
alert(user ?? "Anonymous"); // Anonymous (user is undefined)
>>>>>>> d694e895efe89922a109702085b6ca1efeffea10
```

هذا مثال على `user` المعين لاسم:

```js run
let user = "John";

<<<<<<< HEAD
alert(user ?? "مجهول الهوية"); // John (تم تحديد المستخدم)
=======
alert(user ?? "Anonymous"); // John (user is not null/undefined)
>>>>>>> d694e895efe89922a109702085b6ca1efeffea10
```

يمكننا أيضًا استخدام تسلسل `??` لتحديد القيمة الأولى من قائمة ليست `null/undefined`.

<<<<<<< HEAD
لنفترض أن لدينا بيانات المستخدم في المتغيرات `firstName` و `lastName` أو `nickName`. قد لا يتم تحديد كل منهما ، إذا قرر المستخدم عدم إدخال قيمة.

نود عرض اسم المستخدم باستخدام أحد هذه المتغيرات ، أو عرض "مجهول الهوية" إذا لم يتم تحديد كل منهم.
=======
Let's say we have a user's data in variables `firstName`, `lastName` or `nickName`. All of them may be not defined, if the user decided not to fill in the corresponding values.

We'd like to display the user name using one of these variables, or show "Anonymous" if all of them are `null/undefined`.
>>>>>>> d694e895efe89922a109702085b6ca1efeffea10

لنستخدم عامل التحقق من الفراغ `??` لذلك:

```js run
let firstName = null;
let lastName = null;
let nickName = "Supercoder";

// يعرض القيمة المحددة الأولى:
*!*
alert(firstName ?? lastName ?? nickName ?? "مجهول الهوية"); // Supercoder
*/!*
```

## المقارنة مع ||

هذا مشابه جدًا للمعامل `||`. في الحقيقة يمكننا استبدال `??` ب `||` في المثال السابق وسنحصل على نفس النتيجة. كما وصفنا في [الفصل السابق](info:logical-operators#or-finds-the-first-truthy-value).

يمكن استخدام عامل OR `||` بنفس الطريقة التي يتم فيها استخدام `??` ، كما تم وصفه في [الفصل السابق](info:logical-operators#or-finds-the-first-truthy-value).

على سبيل المثال ، في الكود أعلاه يمكننا استبدال `??` بـ `||` ولا يزال نحصل على نفس النتيجة:

```js run
let firstName = null;
let lastName = null;
let nickName = "Supercoder";

// يعرض القيمة الحقيقية الأولى:
*!*
alert(firstName || lastName || nickName || "مجهول الهوية"); // Supercoder
*/!*
```

<<<<<<< HEAD
تاريخيًا ، كان عامل OR `||` هناك أولاً. لقد كان موجودًا منذ بداية JavaScript ، لذلك كان المطورون يستخدمونه لمثل هذه الأغراض لفترة طويلة.
=======
Historically, the OR `||` operator was there first. It's been there since the beginning of JavaScript, so developers were using it for such purposes for a long time.
>>>>>>> d694e895efe89922a109702085b6ca1efeffea10

من ناحية أخرى ، تمت إضافة عامل التحقق من الفراغ `??` إلى JavaScript مؤخرًا فقط ، وكان السبب في ذلك أن الناس لم يكونوا راضين تمامًا عن `||`.

الفرق الهام بينهما هو أن:
- `||` يعيد القيمة الحقيقية الأولى.
- `??` يعيد القيمة المحددة الأولى.

بعبارة أخرى ، لا يميز `||` بين `false` و `0` والسلسلة الفارغة `""` و `null/undefined`. كلهم متشابهون - قيم زائفة. إذا كان أي منهم هو الوسيطة الأولى لـ `||` ، فسنحصل على الوسيطة الثانية كنتيجة.

على الرغم من ذلك ، في الممارسة قد نرغب في استخدام قيمة افتراضية فقط عندما يكون المتغير `null/undefined`. أي عندما تكون القيمة مجهولة / غير محددة حقًا.

على سبيل المثال ، خذ هذا:

```js run
let height = 0;

alert(height || 100); // 100
alert(height ?? 100); // 0
```

- يتحقق `height || 100` من `height` لكونه قيمة زائفة ، وهو `0` ، زائف بالفعل.
 - لذلك نتيجة `||` هي الوسيطة الثانية ، `100`.
- يتحقق `height ?? 100` من `height` لكونه `null/undefined` ، وليس كذلك ،
 - لذلك النتيجة هي `height` "كما هو" ، أي `0`.

في الممارسة ، يعد الارتفاع الصفري قيمة صالحة في كثير من الأحيان ، والتي يجب عدم استبدالها بالقيمة الافتراضية. لذلك يفعل `??` ما يجب.

## الأولوية

<<<<<<< HEAD
تعادل أولوية عامل التحقق من الفراغ `??` تقريبًا نفس `||` ، فقط قليلًا أدنى. يساوي `5` في [جدول MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table) ، بينما `||` هو `6`.
=======
The precedence of the `??` operator is the same as `||`. They both equal `3` in the [MDN table](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table).
>>>>>>> d694e895efe89922a109702085b6ca1efeffea10

وهذا يعني أنه مثل `||` ، يتم تقييم عامل التحقق من الفراغ `??` قبل `=` و `؟` ، ولكن بعد معظم العمليات الأخرى مثل `+` و `*`.

<<<<<<< HEAD
لذلك إذا كنا نرغب في اختيار قيمة مع `??` في تعبير مع عوامل أخرى ، فكر في إضافة أقواس:
=======
So we may need to add parentheses in expressions like this:
>>>>>>> d694e895efe89922a109702085b6ca1efeffea10

```js run
let height = null;
let width = null;

// مهم: استخدم الأقواس
let area = (height ?? 100) * (width ?? 50);

alert(area); // 5000
```

وإلا ، إذا تجاهلنا الأقواس ، فبما أن `*` لديه أولوية أعلى من `??` ، فسيتم تنفيذه أولاً مما يؤدي إلى نتائج غير صحيحة.

```js
// بدون أقواس
let area = height ?? 100 * width ?? 50;

<<<<<<< HEAD
// ... يعمل بنفس الطريقة كهذا (ربما ليس ما نريده):
=======
// ...works this way (not what we want):
>>>>>>> d694e895efe89922a109702085b6ca1efeffea10
let area = height ?? (100 * width) ?? 50;
```

### استخدام ?? مع && أو ||

نظرًا لأسباب السلامة ، يحظر JavaScript استخدام `??` مع عوامل التشغيل `&&` و `||` ، ما لم يتم تحديد الأولوية صراحةً بالأقواس.

هذا سينتج خطأ لغوي:

```js run
let x = 1 && 2 ?? 3; // Syntax error
```

الحد هو بالتأكيد قابل للنقاش ، تم إضافته إلى مواصفات اللغة بهدف تجنب أخطاء البرمجة ، عندما يبدأ الناس في التبديل من `||` إلى `??`.

استخدم الأقواس لتجنب الخطأ:

```js run
*!*
let x = (1 && 2) ?? 3; // تعمل دون مشاكل
*/!*
alert(x); // 2
```

## ملخص

- يوفر المشغل الفارغ المتحد `??` طريقة قصيرة لاختيار القيمة "المحددة" الأولى من قائمة.

يستخدم لوضع قيم افتراضية للمتغيرات:

```js
// اجعل height=100 إذا كان null أو undefined
height = height ?? 100;
```

- يحتوي المشغل `??` على أولوية منخفضة جدًا ، فقط قليلًا أعلى من `؟` و `=` ، لذلك يجب عليك النظر في إضافة الأقواس عند استخدامه في تعبير.
- يحظر استخدامه مع `||` أو `&&` بدون أقواس صريحة.
