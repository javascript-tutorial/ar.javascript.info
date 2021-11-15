# المهام الصغيرة

Promise معالجات الـ `.then`/`.catch`/`.finally` غير متزامنة دائما

حتى عندما يتم حل promise على الفور ، فإن الكود الموجود على الأسطر _ أدناه _ `.then` /` .catch` / `.finally` ستستمر قبل تنفيذ هذه المعالجات.

هنا عرض توضيحي:

```js run
let promise = Promise.resolve();

promise.then(() => alert('promise done!'));

alert('code finished'); // this alert shows first
```

إذا قمت بتشغيله, ستلاحظ `code finished` أولا, ثم بعد ذلك`promise done!`.

هذا غريب ، لأن الpromise يتم بالتأكيد من البداية.

لماذا تم تشغيل ".then" بعد ذلك؟ ماذا يحدث هنا؟

## طابور المهام الصغيرة

Asynchronous tasks need proper management. For that, the ECMA standard specifies an internal queue `PromiseJobs`, more often referred to as the "microtask queue" (V8 term).

كما هو مذكور في [المواصفات] (https://tc39.github.io/ecma262/#sec-jobs-and-job-queues):

<<<<<<< HEAD
- قائمة الانتظار هي أول ما يخرج أولاً: يتم تنفيذ المهام المحددة أولاً.
- يبدأ تنفيذ المهمة فقط في حالة عدم تشغيل أي شيء آخر.
=======
Or, to put it more simply, when a promise is ready, its `.then/catch/finally` handlers are put into the queue; they are not executed yet. When the JavaScript engine becomes free from the current code, it takes a task from the queue and executes it.
>>>>>>> a82915575863d33db6b892087975f84dea6cb425

أو ، ببساطة ، عندما يكون الوعد جاهزًا ، يتم وضع معالجات "then / catch / وأخيرا" في قائمة الانتظار ؛ لم يتم إعدامهم بعد. عندما يصبح محرك JavaScript خاليًا من التعليمات البرمجية الحالية ، فإنه يأخذ مهمة من قائمة الانتظار وينفذها.

هذا هو السبب في أن "الرمز انتهى" في المثال أعلاه يظهر أولاً.
![](promiseQueue.svg)

تمر معالجات الوعد دائمًا من خلال قائمة الانتظار الداخلية هذه.

إذا كانت هناك سلسلة تحتوي على عدة ".then / catch / أخيرا" ، فسيتم تنفيذ كل واحد منها بشكل غير متزامن. أي أنه يتم وضعه في قائمة الانتظار أولاً ، ثم يتم تنفيذه عند اكتمال الرمز الحالي والانتهاء من معالجات قائمة الانتظار السابقة.

<<<<<<< HEAD
** ماذا لو كان الأمر يهمنا؟ كيف يمكننا أن نجعل "الشفرة منتهية" تعمل بعد "الوعد"؟ **
=======
**What if the order matters for us? How can we make `code finished` appear after `promise done`?**
>>>>>>> a82915575863d33db6b892087975f84dea6cb425

سهل ، ما عليك سوى وضعها في قائمة الانتظار باستخدام ".then`:

```js run
Promise.resolve()
  .then(() => alert('promise done!'))
  .then(() => alert('code finished'));
```

الآن الأمر كما هو مقصود.

## رفض غير معالج

هل تتذكر حدث `unhandledrejection` من المقالة <info: promo-error-handling>؟

الآن يمكننا أن نرى بالضبط كيف تكتشف جافا سكريبت وجود رفض غير معالج.

** يحدث "رفض غير معالج" عندما لا تتم معالجة خطأ الوعد في نهاية قائمة المهام الدقيقة. **

عادةً ، إذا توقعنا خطأ ، فإننا نضيف ".catch" إلى سلسلة الوعود للتعامل معه:

```js run
let promise = Promise.reject(new Error("Promise Failed!"));
*!*
promise.catch(err => alert('caught'));
*/!*

// doesn't run: error handled
window.addEventListener('unhandledrejection', event => alert(event.reason));
```

ولكن إذا نسينا إضافة ".catch" ، فعندما تصبح قائمة انتظار المهام الدقيقة فارغة ، يقوم المحرك بتشغيل الحدث:

```js run
let promise = Promise.reject(new Error('Promise Failed!'));

// Promise Failed!
window.addEventListener('unhandledrejection', (event) => alert(event.reason));
```

ماذا لو تعاملنا مع الخطأ لاحقًا؟ مثله:

```js run
let promise = Promise.reject(new Error("Promise Failed!"));
*!*
setTimeout(() => promise.catch(err => alert('caught')), 1000);
*/!*

// Error: Promise Failed!
window.addEventListener('unhandledrejection', event => alert(event.reason));
```

الآن ، إذا قمنا بتشغيله ، فسنرى "فشل الوعد!" أولاً ثم "تم الإمساك".

إذا لم نكن نعرف عن قائمة انتظار المهام الصغيرة ، فيمكننا أن نتساءل: "لماذا تم تشغيل معالج" عدم التعامل مع رفض "؟ لقد أمسكنا بالخطأ ومعالجته!"

ولكننا نفهم الآن أن "رفضًا غير معالَج" يتم إنشاؤه عند اكتمال قائمة انتظار المهام المصغرة: يقوم المحرك بفحص الوعود ، وإذا كان أي منها في حالة "مرفوضة" ، يتم تشغيل الحدث.

في المثال أعلاه ، يتم تشغيل `.catch` بواسطة` setTimeout` أيضًا. ولكنه يفعل ذلك لاحقًا ، بعد حدوث "رفض غير معالَج" بالفعل ، لذلك لا يغير أي شيء.

## ملخص

Promise handling is always asynchronous, as all promise actions pass through the internal "promise jobs" queue, also called "microtask queue" (V8 term).

لذلك يتم دائمًا استدعاء معالجات `.then / catch / أخيرا` بعد انتهاء الكود الحالي.

إذا احتجنا إلى ضمان تنفيذ جزء من الرمز بعد ".then / catch / أخيرا" ، يمكننا إضافته إلى مكالمة ".then" المتسلسلة.

في معظم محركات جافا سكريبت ، بما في ذلك المتصفحات و Node.js ، يرتبط مفهوم المهام الدقيقة ارتباطًا وثيقًا بـ "حلقة الأحداث" و "المهام الكبيرة". نظرًا لأن هذه ليست لها علاقة مباشرة بالوعود ، فقد تم تناولها في جزء آخر من البرنامج التعليمي ، في المقالة <info: event-loop>.
