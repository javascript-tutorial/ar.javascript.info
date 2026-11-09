# الكائن العمومي Global object

تقدّم الكائنات العمومية متغيراتَ ودوال يمكن استعمالها من أي مكان. هذه الكائنات مضمّنة في بنية اللغة أو البيئة مبدئيًا.

في المتصفّحات تُدعى بالنافذة `‎window‎` وفي Node.js تُدعى بالعموميات `‎global‎` وفي باقي البيئات تُدعى بأيّ اسم مناسب يراه مطوّروها.

Recently, `globalThis` was added to the language, as a standardized name for a global object, that should be supported across all environments. It's supported in all major browsers.

سنستعمل هنا `‎window‎` على فرضية بأنّ البيئة هي المتصفّح نفسه. لو كنت ستشغّل السكربت الذي تكتبه في بيئات أخرى فربما تستعمل `‎globalThis‎` بدل النافذة تلك.

يمكننا طبعًا الوصول إلى كافة خصائص الكائن العمومي مباشرةً:

```js run
alert('Hello');
// تتطابق تمامًا مع
window.alert('Hello');
```

يمكنك في المتصفّحات التصريح عن الدوال العمومية والمتغيرات باستعمال `‎var‎` (وليس `‎let/const‎` !) لتصير خاصيات للكائن العمومي:

```js run untrusted refresh
var gVar = 5;

alert(window.gVar); // ‫5 (تصير خاصية من خاصيات الكائن العمومي)
```

Function declarations have the same effect (statements with `function` keyword in the main code flow, not function expressions).

Please don't rely on that! This behavior exists for compatibility reasons. Modern scripts use [JavaScript modules](info:modules) where such a thing doesn't happen.

لن يحدث هذا لو استعملنا `‎let‎` هنا:

```js run untrusted refresh
let gLet = 5;

alert(window.gLet); // ‫غير معرّف (لا تصير خاصية للكائن العمومي)
```

لو كانت القيمة هامّة جدًا جدًا وأردت أن تدخل عليها من أيّ مكان عمومي فاكتبها على أنّها خاصية مباشرةً:

```js run
// نجعل من معلومات المستخدم الحالي عمومية لتصل إليها كلّ السكربتات
window.currentUser = {
  name: 'John',
};

// وفي مكان آخر يريدها أحد
alert(currentUser.name); // John

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
  alert('Your browser is really old!'); // ‫تستعمل متصفّحا قديماً!
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

       تشمل المتغيرات هذه كل ما هو مضمّن في بنية لغة جافا سكريبت مثل
        المصفوفات `‎Array‎` والقيم المخصّصة للبيئة مثل `‎window.innerHeight‎` (ارتفاع نافذة المتصفّح).

- للكائن العمومي اسم عام في المواصفة: `‎globalThis‎`.

  ...But more often is referred by "old-school" environment-specific names, such as `window` (browser) and `global` (Node.js).

- We should store values in the global object only if they're truly global for our project. And keep their number at minimum.
- In-browser, unless we're using [modules](info:modules), global functions and variables declared with `var` become a property of the global object.
- To make our code future-proof and easier to understand, we should access properties of the global object directly, as `window.x`.
