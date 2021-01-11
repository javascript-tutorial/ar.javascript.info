
# الكائن العمومي Global object

تقدّم الكائنات العمومية متغيراتَ ودوال يمكن استعمالها من أي مكان. هذه الكائنات مضمّنة في بنية اللغة أو البيئة مبدئيًا.

في المتصفّحات تُدعى بالنافذة `‎window‎` وفي Node.js تُدعى بالعموميات `‎global‎` وفي باقي البيئات تُدعى بأيّ اسم مناسب يراه مطوّروها.

<<<<<<< HEAD
أُضيف حديثًا الكائن `‎globalThis‎` إلى اللغة ليكون اسم قياسيًا للكائن العمومي على أن تدعمه كلّ البيئات. ولكن بعض المتصفّحات (وبالخصوص عدا Chromium Edge) لا تدعم هذا الكائن بعد، ولكن يمكنك «ترقيعه تعدّديًا» بسهولة تامة.
=======
Recently, `globalThis` was added to the language, as a standardized name for a global object, that should be supported across all environments. It's supported in all major browsers.
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f

سنستعمل هنا `‎window‎` على فرضية بأنّ البيئة هي المتصفّح نفسه. لو كنت ستشغّل السكربت الذي تكتبه في بيئات أخرى فربما تستعمل `‎globalThis‎` بدل النافذة تلك.

يمكننا طبعًا الوصول إلى كافة خصائص الكائن العمومي مباشرةً:

```js run
alert("Hello");
// تتطابق تمامًا مع
window.alert("Hello");

```

يمكنك في المتصفّحات التصريح عن الدوال العمومية والمتغيرات باستعمال `‎var‎` (وليس `‎let/const‎` !) لتصير خاصيات للكائن العمومي:

```js run untrusted refresh
var gVar = 5;

alert(window.gVar); // ‫5 (تصير خاصية من خاصيات الكائن العمومي)

```

<<<<<<< HEAD
ولكن أرجوك ألا تعتمد على هذا الأمر! هذا السلوك موجود للتوافقية لا غير. تستعمل السكربتات الحديثة [وحداتَ جافاسكربت](info:modules) حيث لا يحدث هكذا أمر.
=======
The same effect have function declarations (statements with `function` keyword in the main code flow, not function expressions).

Please don't rely on that! This behavior exists for compatibility reasons. Modern scripts use [JavaScript modules](info:modules) where such thing doesn't happen.
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f

لن يحدث هذا لو استعملنا `‎let‎` هنا:

```js run untrusted refresh
let gLet = 5;

alert(window.gLet); // ‫غير معرّف (لا تصير خاصية للكائن العمومي)

```

لو كانت القيمة هامّة جدًا جدًا وأردت أن تدخل عليها من أيّ مكان عمومي فاكتبها على أنّها خاصية مباشرةً:

```js run
// نجعل من معلومات المستخدم الحالي عمومية لتصل إليها كلّ السكربتات
window.currentUser = {
  name: "John"
};

// وفي مكان آخر يريدها أحد
alert(currentUser.name);  // John

// ‫أو (لو كان هناك المتغير المحلي ذا الاسم «currentUser»
// فنأخذها جهارةً من النافذة (وهذا آمن!)
alert(window.currentUser.name); // John

```

نختم هنا بأنّ استعمال المتغيرات العمومية غير محبّذ بالمرة ويجب أن يكون عددها بأقل ما يمكن. يُعدّ مبدأ تصميم الشيفرات حين تأخذ الدالة المتغيرات «الداخلة» وتُعطينا «نواتج» معيّنة - يُعدّ هذا المبدأ أفضل وأقلّ عُرضة للأخطاء وأسهل للاختبار موازنةً بالمتغيرات الخارجية أو العمومية.


## استعمالها للترقيع تعدديًا

المجال الذي نستعمل الكائنات العمومية فيه هو اختبار لو كانت البيئة تدعم مزايا اللغة الحديثة.

فمثلًا يمكننا اختبار لو كانت كائنات الوعود `‎Promise‎` المضمّنة في اللغة مضمّنة حقًا (لم تكن كذلك في المتصفحات العتيقة):

```js run
if (!window.Promise) {
  alert("Your browser is really old!"); // ‫تستعمل متصفّحا قديماً!
}
```

لو لم نجد هذه الكائنات (مثلًا نستعمل متصفّحًا قديمًا) فيمكننا «ترقيعه تعدّديًا»: أي إضافة الدوال التي لا تدعمها البيئة بينما هي موجودة في معيار اللغة الحديث.

```js run
if (!window.Promise) {
  window.Promise = ... // شيفرة نكتبها بنفسنا تؤدّي الميزة الحديثة في اللغة هذه
}

```

## ملخص

- The global object holds variables that should be available everywhere.

       تشمل المتغيرات هذه كل ما هو مضمّن في بنية لغة جافاسكربت مثل
        المصفوفات `‎Array‎` والقيم المخصّصة للبيئة مثل `‎window.innerHeight‎` (ارتفاع نافذة المتصفّح).
- للكائن العمومي اسم عام في المواصفة: `‎globalThis‎`.

<<<<<<< HEAD
        ولكن... دومًا ما نُشير إليه بالأسماء «الأثرية» حسب كل بيئة مثل `‎window‎` (في المتصفحات) و`‎global‎` (في Node.js)
        ، إذ أنّ `‎globalThis‎` هو مُقترح جديد على اللغة وليس مدعومًا في المتصفّحات عدة Chromium Edge (ولكن يمكننا ترقيعه تعدّديًا).
- علينا ألا نخزّن القيم في الكائن العمومي إلّا لو كانت حقًا وفعلًا عمومية للمشروع الذي نعمل عليه. كما ويجب أن يبقى عددها بأقل ما يمكن.
- حين نطوّر لاستعمال الشيفرات في المتصفّحات (لو لم نستعمل الوحدات، [وحدات](info:modules))، تصير الدوال العمومية والمتغيرات باستعمال `‎var‎` خاصيات للكائن العمومي.
- علينا استعمال خاصيات الكائن العمومي مباشرةً (مثل `‎window.x‎`) لتكون الشيفرة سهلة الصيانة مستقبلًا وأسهل فهمًا.
=======
    ...But more often is referred by "old-school" environment-specific names, such as `window` (browser) and `global` (Node.js).
- We should store values in the global object only if they're truly global for our project. And keep their number at minimum.
- In-browser, unless we're using [modules](info:modules), global functions and variables declared with `var` become a property of the global object.
- To make our code future-proof and easier to understand, we should access properties of the global object directly, as `window.x`.
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f
