# تركيب جملة دالة جديدة "new Function"

هناك طريقة أخرى لبناء الدالة. هذه الطريقة نادرة الإستخدام لكن أحياناً لا يوجد بديل لها.

## تركيب الجملة

تركيب جملة بناء الدالة:

```js
let func = new Function([arg1, arg2, ...argN], functionBody);
```

بهذا التركيب تم صُنع دالة وإرسال لها العوامل الأتية `arg1...argN` و إرسال لها جسم الدالة الذي يحتوي علي ما نريد فعله بداخلها `functionBody`.

دعنا نبسط الأمر بمثال لدالة تحتاج إلى عاملين:

```js run
let sum = new Function('a', 'b', 'return a + b');

alert(sum(1, 2)); // 3
```

هذا مثال أخر لدالة لا تحتاج إلى عوامل فقط نرسل لها جسم الدالة:

```js run
let sayHi = new Function('alert("Hello")');

sayHi(); // Hello
```

الفرق الأساسي بين هذه الطريقة وباقي الطرق التي تبني الدالة هو أن الدالة تُبني من نص `string` يمكن أن نرسله للدالة أثناء تشغيل البرنامج.

كل الطرق السابقة كانت تتطلب مننا كمبرمجين أن نكتب الدالة عن طريق الكود.

لكن كلمة دالة جديدة `new Function` تتيح لنا تحويل النص `string` إلى دالة

مثلا يمكننا أن نستلم الدالة الجديدة من الخادم البعيد ثم ننفذها:

```js
let str = ... receive the code from a server dynamically ...

let func = new Function(str);
func();
```

هذه الطريقة تستخدم في حالات خاصة جداً مثلاً عندما نتسلم كود من الخادم, أو لتجميع الدالة بطريقة تلقائية من القالب وهذا يستخدم في تطبيقات الويب المعقدة.

## Closure

عادة, تتذكر الدالة دائماً من أين تمت مناداتها في خاصية خاصة بالدالة تسمي `[[Environment]]`. وهذه الخاصية تشير إلى حسد لغوي Lexical Environment تدلنا أين تم بناء هذه الدالة ( تمت تغطية هذه الجزئية في هذا الفصل <info:closure> )

لكن عندما عندما نستخدم طريقة دالة جديدة `new Function`, هذه الخاصية `[[Environment]]` لم تعد تشير إلى الحسد اللغوي Lexical Environment كما ذكرنا في الأعلي وإنما تشير الحدس الشامل إلى `Global Lexical Enviroment`.

```js run
function getFunc() {
  let value = "test";

*!*
  let func = new Function('alert(value)');
*/!*

  return func;
}

getFunc()(); // error: value is not defined
```

قارن الأن بينه وبين الطريقة التقليدية:

```js run
function getFunc() {
  let value = "test";

*!*
  let func = function() { alert(value); };
*/!*

  return func;
}

getFunc()(); // *!*"test"*/!*, from the Lexical Environment of getFunc
```

هذه الخاصية الموجودة في دالة جديدة `new Function` تبدو غريبة, لكنها عند التطبيق مفيدة جداً.

تخيل أننا نريد بناء دالة من نص `string`. الكود الخاص بالدالة الأن غير معروف في الوقت الذي تكتب فيه البرنامج ( لهذا السبب لا نستخدم الطريقة التقليدية للدالة ) لكن سيكون معروف أثناء التشغيل. ومن الممكن أن نستلم كود الدالة من الخادم البعيد أو من مصدر أخر.

دالتنا الجديدة تحتاج إلى التفاعل مع الكود الأساسي.

لكن ماذا سيحدث إذا استطاعت الدالة الوصول إلى المتغيرات الخارجية ولم تكن تمتلك الخاصية المذكورة في الأعلي؟

المشكلة هي أن قبل أن يتم نشر مشروع جافا سكريبت الخاص بك للإنتاج. يتم ضغطه عن طريق إستخدام شئ يسمي -- _minifier_ -- يعتبر هذا البرنامج خاص بتقليص حجم الكود الخاص بك عن طريق مسح الزيادات مثل التعليقات و المسافات و الأهم من ذلك أنه يغير أسماء المتغيرات المحلية الطويلة إلى أسماء متغيرات أقصر.

مثلاً اذاً كانت دالة تحتوي علي `let userName` الـ -- _minifier_ -- يحولها إلى `let a` (أو أي شئ أخر إذا كان هذا الأسم غير متاح), ويقوم بهذا في كل مكان تم ذكر فيه هذا المتغير وهو شئ آمن لأن المتغير يعتبر محلي داخل الدالة ولا يستطيع أي شئ خارج الدالة الوصول إليه, وداخل الدالة يغير الـ -- _minifier_ -- كل مرة ذكر فيها الأسم. _minifier_ يعتبر ذكي لأنه يحلل تركيب الكود لكي لايعطل شئ وليس فقط القيام بالتبديل.

For instance, if a function has `let userName`, minifier replaces it with `let a` (or another letter if this one is occupied), and does it everywhere. That's usually a safe thing to do, because the variable is local, nothing outside the function can access it. And inside the function, minifier replaces every mention of it. Minifiers are smart, they analyze the code structure, so they don't break anything. They're not just a dumb find-and-replace.

إذا استطاعت الدالة الجديدة `new Function` الوصول للمتغبرات الخارجية ستكون هذه مشكلة كبير قد تعطل البرنامج لهذا السبب هي زُودت بخاصية عدم الوصول إلى المتغيرات الخارجية الذي ذكرناه بالأعلي

إذا أردنا الدالة أن تصل إلى متغير خارجي معين علينا أن نرسله كعامل لها,

## الملخص

طريقة تركيب الجملة:

```js
let func = new Function([arg1, arg2, ...argN], functionBody);
```

لأسباب تاريخية, العوامل يمكن أن نرسلها علي شكل قائمة مفصولة بفاصلات.

لاحظ أن الثلاث توضيحات القادة كلهم يحملون نفس المعني:

```js
new Function('a', 'b', 'return a + b'); // basic syntax
new Function('a,b', 'return a + b'); // comma-separated
new Function('a , b', 'return a + b'); // comma-separated with spaces
```

الدوال التي تم بناءها عن طريق `new Function`, تمتلك خاصية `[[Environment]]` التي تشير إلى الحدس الشامل "global Lexical Environment", وليس الحدس الخارجي. ولذلك هذه الدالة لاتستطيع الوصول للمتغيرات الخارجية ولكن هذا شئ جيد لانه لولا حدوثه ستحدث أخطاء كثيرة جداً عند تقليص الكود. وعند الحاجة إلى متغير خارجي نرسله علي شكل عامل للدالة ذلك يمنع كل المشاكل التي ذكرناها في الأعلي.
