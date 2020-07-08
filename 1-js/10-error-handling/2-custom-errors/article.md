# الاخطاء المخصصة وتوسعة صنف Error
متى نكون نطوّر البرامج نحتاج إلى أصناف أخطاء خاصة بنا لتوضّح تمامًا ما قد يحدث خطأً في المهام التي نقوم بها. فمثلًا لأخطاء
الشبكة نستعمل `HttpError`، ولعمليات قواعد البيانات `DbError` ولعمليات البحث `NotFoundError` وهكذا.
وعلى هذه الأخطاء أن تدعم الخاصيات الأساسية مثل الرسالة `message` والاسم `name` والمَكدس `stack` (يفضّل ذلك)،
ولكن يمكن أن تحتوي على خصائص أخرى خاصة بها مثل خاصية `statusCode` لكائنات `HttpError` وتحمل قيمة من قيم
رموز الحالة `404` أو `403` أو `500`.
تتيح لنا جافاسكربت استعمال `throw` بتمرير أيّ وسيط، لذا فأصناف الخطأ الخاصة بنا يمكن ألّا ترث (تقنيًا) من كائن الخطأ
`Error`، ولكن لو ورثنا منها فيمكنن للجميع استعمال `obj instanceof Error` لاحقًا لتتعرّف على كائنات الخطأ، بذلك يكون
أفضل لو ورثناها.
وكلّما كبر التطبيق شكّلت الأخطاء التي خصّصناها شجرة، فمثلًا سيرث الصنف `HttpTimeoutError` الصنفَ
`HttpError`، وهكذا دواليك.
## توسعة Error
لنأخذ مثالًا دالةَ `readUser(json)‎` تقرأ كائن JSON في بيانات المستخدم.
وهذا مثال عن كائن `json` صالح:
```
let json = `{ "name": "John", "age": 30 }`;
```
سنستعمل في الشيفرة التابِع `JSON.parse`، وإن استلم كائن `json` معطوب رمى خطأ `SyntaxError`. ولكن، حتّى لو
كان الكائن صحيحًا صياغيًا، فلا يعني هذا أنّ المستخدم صالحًا أيضًا، أم لا؟ لربّما لا يحتوي بعض البيانات مثل خاصيتي الاسم
`json` والعمر `name` الضروريتين للمستخدمين.
بهذا لن تقرأ الدالة `readUser(json)‎` كائن JSON فحسب، بل ستفحص (”تتحقّق من“) البيانات، فلو لم تكن الحقول المطلوبة
موجودة، أو كان تنسيق الكائن مغلوطًا، فهنا نكون أمام خطأ... وهذا الخطأ ليس خطأً صياغيًا `SyntaxError` إذ أنّ البيانات
صحيحة صياغيًا، بل نوع آخر من الأخطاء. سنسمّي هذا النوع `ValidationError` ونصنع صنف له. على هذا النوع من
الأخطاء احتواء ما يلزم من معلومات تخصّ الحقل المخالف.
يفترض علينا وراثة الصنف المضمّن في اللغة `Error` لصنفنا `ValidationError`. إليك شيء عن شيفرة الصنف المضمّن
لنعرف ما نحاول توسعته:
```
// شيفرة مبسّطة لصنف الخطأ ‫Error المضمّن في لغة جافاسكربت نفسها
class Error {
constructor(message) {
this.message = message;
this.name = "Error"; // (تختلف الأسماء باختلاف أصناف الأخطاء المضمّنة)
this.stack = <call stack>; // ليست قياسية، إلّا أنّ أغلب البيئات تدعمها
}
}
```

الآن صار وقت أن يرث الصنف `ValidationError` منها:
```
class ValidationError extends Error {
constructor(message) {
super(message); // (1)
this.name = "ValidationError"; // خطأ في التحقّق (2)
}
}
function test() {
throw new ValidationError("Whoops!"); // آخ
}
try {
test();
} catch(err) {
alert(err.message); // آخ!
alert(err.name); // خطأ في التحقّق
alert(err.stack); // قائمة من الاستدعاءات المتداخلة في كلّ منها رقم السطر
}
```
لاحظ كيف أنّنا في السطر `(1)` استدعينا الباني الأب، إذ تطلب منا لغة جافاسكربت استدعاء `super` في البانيات الابنة، أي أنّه
أمر إلزامي. يضبط الباني الأب خاصية الرسالة `message`.
كما يضبط أيضًا خاصية الاسم `name` لتكون `"Error"`، ولذلك نُعدّلها إلى القيمة الصحيحة في السطر `(2)`.
فلنحاول الآن استعماله في `readUser(json)‎`:
```
class ValidationError extends Error {
constructor(message) {
super(message);
this.name = "ValidationError"; // خطأ في التحقّق
}
}
// الاستعمال
function readUser(json) {
let user = JSON.parse(json);
if (!user.age) {
throw new ValidationError("No field: age"); // حقل غير موجود: العمر
}
if (!user.name) {
throw new ValidationError("No field: name"); // حقل غير موجود: الاسم
}

return user;
}
// هنا نجرّب باستعمال try..catch
try {
let user = readUser('{ "age": 25 }');
} catch (err) {
if (err instanceof ValidationError) {
alert("Invalid data: " + err.message); // البيانات غير صالحة: حقل غير موجود: الاسم
} else if (err instanceof SyntaxError) { // (*)
alert("JSON Syntax Error: " + err.message); // ‫خطأ صياغي لكائن JSON
} else {
throw err; // خطأ لا نعرفه، علينا إعادة رميه (**)
}
}
```
تتعامل كتلة `try..catch` في الشيفرة أعلاه النوعين من الأخطاء: `ValidationError` والخطأ المضمّن `SyntaxError`
الذي يرميه التابِع `JSON.parse`.
لاحِظ أيضًا كيف استعملنا `instanceof` لفحص نوع الخطأ في السطر `(*)`.
يمكننا أيضًا مطالعة `err.name` هكذا:
```
// ...
// بدل ‫(err instanceof SyntaxError)
} else if (err.name == "SyntaxError") { // (*)
// ...
```
ولكنّ استعمال `instanceof` أفضل بكثير إذ يحدث ونوسّع مستقبلًا الصنف `ValidationError` بأصناف فرعية منه مثل
`PropertyRequiredError`، والفحص عبر `instanceof` سيظلّ يعمل للأصناف الموروثة منه،
كما من المهمّ أن تُعيد كتلة `catch` رمي الأخطاء التي لا تفهمها، كما في السطر `(**)`. ليس على هذه الكتلة إلّا التعامل مع
أخطاء التحقّق والصياغة، أمّا باقي الأخطاء (والتي قد تحدث بسبب الأخطاء المطبعية في الشيفرة أو غيرها من أمور غريبة عجيبة)
فيجب أن تسقط أرضًا.
## تعميق الوراثة
صنف الخطأ `ValidationError` عامٌ جدًا جدًا، إذ يمكن أن تحصل أمور كثيرة خطأً في خطأ. لربّما كانت الخاصية غير
موجودة أو كان نسقها خطأ (مثل تقديم سلسلة نصية قيمةً للعمر `age`). لنصنع الصنف .... `PropertyRequiredError`
ونستعمله فقط للخاصيات غير الموجودة، وسيحتوي على أيّة معلومات إضافية عن الخاصية الناقصة.
```
class ValidationError extends Error {

constructor(message) {
super(message);
this.name = "ValidationError"; // خطأ في التحقّق
}
}
// هذا
class PropertyRequiredError extends ValidationError {
constructor(property) {
super("No property: " + property); // خاصية غير موجودة
this.name = "PropertyRequiredError"; // خطأ إذ الخاصية مطلوبة
this.property = property;
}
}
// الاستعمال
function readUser(json) {
let user = JSON.parse(json);
if (!user.age) {
throw new PropertyRequiredError("age"); // العمر
}
if (!user.name) {
throw new PropertyRequiredError("name"); // الاسم
}
return user;
}
// هنا نجرّب باستعمال ‫try..catch
try {
let user = readUser('{ "age": 25 }');
} catch (err) {
if (err instanceof ValidationError) {
alert("Invalid data: " + err.message); // البيانات غير صالحة: خاصية غير موجودة: الاسم
alert(err.name); // PropertyRequiredError
alert(err.property); // name
} else if (err instanceof SyntaxError) {
alert("JSON Syntax Error: " + err.message); // خطأ صياغي لكائن ‫JSON
} else {
throw err; // خطأ لا نعرفه، علينا إعادة رميه
}
}
```
يسهُل علينا استعمال الصنف الجديد `PropertyRequiredError`، فكلّ ما علينا تمريره هو اسم الخاصية: `new
PropertyRequiredError(property)‎`، وسيُولّد الباني الرسالةَ `message` التي نفهمها نحن البشر.

لاحظ كيف أنّنا أسندنا الخاصية `this.name` في باني `PropertyRequiredError` يدويًا، مرّة ثانية. قد ترى هذا الأمر
مُتعبًا حيث ستُسند قيمة `this.name = <class name>‎` في كلّ صنف خطأ تصنعه. يمكن تجنّب هذا العناء وإسناد قيمة
مناسبة لصنف ”الخطأ الأساس“ `this.name = this.constructor.name`، وبعدها نرث من هذا الصنف كلّ أصناف
الأخطاء المخصّصة.
لنسمّه مثلًا `MyError`. إليك شيفرة `MyError` وغيرها من أصناف أخطاء مخصّصة، ولكن مبسّطة:
```
class MyError extends Error {
constructor(message) {
super(message);
this.name = this.constructor.name; // هنا
}
}
class ValidationError extends MyError { }
class PropertyRequiredError extends ValidationError {
constructor(property) {
super("No property: " + property); // خاصية غير موجودة
this.property = property;
}
}
// الاسم صحيح
alert( new PropertyRequiredError("field").name ); // PropertyRequiredError
```
الآن صارت شيفرات الأخطاء المخصّصة أقصر بكثير (خاصّة `ValidationError`) إذ حذفنا السطر `"this.name = ...‎"`
في الباني.
## تغليف الاستثناءات
هدف الدالة `readUser` في الشيفرة أعلاه هو ”قراءة بيانات المستخدم“، ويمكن أن تحدث مختلف الأخطاء أثناء تنفيذ ذلك. حاليًا
نرى `SyntaxError` و`ValidationError` فقط، ولكن في المستقبل العاجل ستصير الدالة `readUser` أكبر وأكبر وقد
تُولّد لنا أنواع أخرى من الأخطاء.
ومَن يتعامل مع هذه الأخطاء؟ الشيفرة التي تستدعي `readUser`! حاليًا لا تستعمل إلا بضعة تعابير شرطية `if` في كُتل
`catch` (تفحص الصنف وتتعامل مع الأخطاء وتُعيد رمي ما لا تفهم)،
وسيكون المخطط هكذا:
```
try {
...
readUser() // الخطأ الأساسي هنا
...
} catch (err) {

if (err instanceof ValidationError) {
// ‫معالحة أخطاء ValidationError
} else if (err instanceof SyntaxError) {
// ‫معالجة الأخطاء الصياغية SyntaxError
} else {
throw err; // خطأ مجهول فلنُعد رميه من جديد
}
}
```
نرى في الشيفرة البرمجية أعلاه نوعين من الأخطاء ولكن ممكن أن يكون أكثر من ذلك.
ولكن متى ولّدت الدالة `readUser` أنواع أخرى من الأخطاء، فعلينا طرح السؤال: هل علينا حقًا فحص كلّ نوع من أنواع
الأخطاء واحدًا واحدًا في كلّ شيفرة تستدعي `readUser`؟
عادةً ما يكون الجواب هو ”لا“، فالشيفرة الخارجية تفضّل أن تكون ”على مستوًى أعلى من ذلك المستوى“، أي أن تستلم ما يشبه
”خطأ في قراءة البيانات“، أمّا عن سبب حدوثه فلا علاقة لها به (طالما رسالة الخطأ تصف نفسها). أو ربّما (وهذا أفضل) تكون
هناك طريقة لتحصل فيها على بيانات الخطأ، لو أرادت الشيفرة ذلك.
تدعى الطريقة التي وصفناها بتغليف الاستثناءات.
1. لنصنع الآن صنف ”خطأ في القراءة“ `ReadError` لنمثّل هذه الأخطاء.
2. متى حدثت أخطاء داخل الدالة `readUser`، سنلتقطها فيها ونُولّد خطأ `ReadError`، بدلًا من `ValidationError` و
`SyntaxError`.
3. الكائن `ReadError` سيُبقي أيضًا إشارة إلى الخطأ الأصلي في خاصية السبب `cause`.
لذا و هكذا لن يكون للشيفرة الخارجية (التي ستستدعي `readUser`) إلّا فحص `ReadError`. وليس كلّ نوع من أخطاء
قراءة البيانات. وإن كان يحتاج لمزيد من التفاصيل عن الخطأ يمكنه العودة إلى الخاصية `cause` والتحقق منها.
إليك الشيفرة التي نُعرّف فيها الخطأ `ReadError` ونمثّل طريقة استعماله في الدالة `readUser` وفي `try..catch`:
```
class ReadError extends Error {
constructor(message, cause) {
super(message);
this.cause = cause;
this.name = 'ReadError'; // خطأ في القراءة
}
}
class ValidationError extends Error { /*...*/ }
class PropertyRequiredError extends ValidationError { /* ... */ }
function validateUser(user) {
if (!user.age) {
throw new PropertyRequiredError("age"); // العمر
}
if (!user.name) {
throw new PropertyRequiredError("name"); // الاسم

}
}
function readUser(json) {
let user;
try {
user = JSON.parse(json);
} catch (err) {
// هنا
if (err instanceof SyntaxError) {
throw new ReadError("Syntax Error", err); // خطأ صياغي
} else {
throw err;
}
}
try {
validateUser(user);
} catch (err) {
// وهنا
if (err instanceof ValidationError) {
throw new ReadError("Validation Error", err); // خطأ في التحقّق
} else {
throw err;
}
}
}
try {
readUser('{bad json}');
} catch (e) {
if (e instanceof ReadError) {
// هنا alert(e);
// Original error: SyntaxError: Unexpected token b in JSON at position 1
alert("Original error: " + e.cause); // الخطأ الأصل
} else {
throw e;
}
}
```
في الشيفرة أعلاه تعمل الدالة `readUser` تمامًا كم وصفها، تلتقط أخطاء الصياغة والتحقّق وترمي أخطاء قراءة
`ReadError` بدلها (كما وتُعيد رمي الأخطاء المجهولة أيضًا).
هكذا ليس على الشيفرة الخارجية إلّا فحص `instanceof ReadError` فقط، لا داعٍ للتحقّق من كلّ خطأ يمكن أن يحصل في
هذه المجرّة.

يُسمّى هذا النهج ”بتغليف الاستثناءات“ حيث نستلم نحن ”الاستثناءات في المستوى المنخفض من البرمجة“ (low level) و”نُغلّفها“
داخل خطأ `ReadError` يكون أكثر بساطة وأسهل استعمالًا للشيفرات التي تنادي على الدوال. هذا النهج مستعمل بكثرة في
البرمجة كائنية التوجّه.
## خلاصة
- يمكننا وراثة صنف الخطأ `Error` وغيرها من أخطاء مضمّنة كما الوراثة العادية. المهم أن ننتبه من خاصية الاسم `name`
ولا ننسى استدعاء `super`.
- يمكننا استعمال `instanceof` لفحص ما نريد من أخطاء بدقّة، كما ويعمل المُعامل مع الوراثة. أحيانًا نستلم كائن خطأ من مكتبة
طرف ثالث وما من طريقة سهلة لنعرف اسم صنفها. هنا يمكن استعمال خاصية الاسم `name` لإجراء هذا الفحص.
- أسلوب تغليف الاستثناءات هو أسلوب منتشر الاستعمال، فيه تتعامل الدالة مع الاستثناءات في المستوى المنخفض من البرمجة،
وتصنع أخطاء مستواها عالٍ بدل تلك المنخفضة. وأحيانًا تصير الاستثناءات المنخفضة خصائص لكائن الخطأ (تمامًا مثل
`err.cause` في الأمثلة أعلاه)، ولكنّ هذا ليس إلزاميًا أبدًا.
## تمارين
### الوراثة من SyntaxError
_الأهمية: 5_
اصنع الصنف `FormatError` ليرث من الصنف المضمّن `SyntaxError`.
يجب أن يدعم الصنف خصائص الاسم `name` والرسالة `message` والمَكدس `stack`.
طريقة الاستعمال:
```
let err = new FormatError("formatting error"); // خطأ في التنسيق
alert( err.message ); // خطأ في التنسيق
alert( err.name ); // FormatError
alert( err.stack ); // المَكدس
alert( err instanceof FormatError ); // true
alert( err instanceof SyntaxError ); // ‫true (إذ يرث الصنف الصنفَ SyntaxError)
```
#### الحل
```
class FormatError extends SyntaxError {
constructor(message) {
super(message);
this.name = this.constructor.name;
}
}
let err = new FormatError("formatting error");
alert( err.message ); // خطأ في التنسيق
alert( err.name ); // خطأ في التنسيق

alert( err.stack ); // stack(المَكدس)
alert( err instanceof SyntaxError ); // true
```
ترجمة -وبتصرف- للفصل [Custom errors, extending Error](https://javascript.info/custom-
errors) من كتاب [The JavaScript language](https://javascript.info/js)