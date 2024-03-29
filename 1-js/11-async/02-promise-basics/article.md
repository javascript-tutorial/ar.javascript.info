# Promise

Imagine that you're a top singer, and fans ask day and night for your upcoming song.

To get some relief, you promise to send it to them when it's published. You give your fans a list. They can fill in their email addresses, so that when the song becomes available, all subscribed parties instantly receive it. And even if something goes very wrong, say, a fire in the studio, so that you can't publish the song, they will still be notified.

Everyone is happy: you, because the people don't crowd you anymore, and fans, because they won't miss the song.

This is a real-life analogy for things we often have in programming:

1. A "producing code" that does something and takes time. For instance, some code that loads the data over a network. That's a "singer".
2. A "consuming code" that wants the result of the "producing code" once it's ready. Many functions may need that result. These are the "fans".
3. A _promise_ is a special JavaScript object that links the "producing code" and the "consuming code" together. In terms of our analogy: this is the "subscription list". The "producing code" takes whatever time it needs to produce the promised result, and the "promise" makes that result available to all of the subscribed code when it's ready.

The analogy isn't terribly accurate, because JavaScript promises are more complex than a simple subscription list: they have additional features and limitations. But it's fine to begin with.

The constructor syntax for a promise object is:

```js
let promise = new Promise(function (resolve, reject) {
  // ‫المُنفِّذ (الشيفرة المُنتجة، مثل ”المغنّي“)
});
```

تُدعى الدالة الممرّرة إلى `new Promise` ”بالمُنفِّذ“. متى صُنع الوعد `new Promise` عملت الدالة تلقائيًا. يحتوي هذا
المُنفِّذ الشيفرة المُنتجِة، ويمكن أن تقدّم لنا في النهاية ناتجًا. في مثالنا أعلاه، فالمُنفِّذ هذا هو ”المغنّي“.
تقدّم جافا سكريبت الوسيطين `resolve` و `reject` وهما ردود نداء. كما ولا نضع الشيفرة التي نريد تنفيذها إلا داخل المُنفِّذ.
لا يهمّنا متى سيعرف المُنفِّذ الناتجَ (آجلًا كان ذلك أم عاجلًا)، بل أنّ عليه نداء واحدًا من ردود النداء هذه:

- `resolve(value)‎`: لو اكتملت المهمّة بنجاح. القيمة تسجّل في `value`.
- `reject(error)‎` — لو حدث خطأ. `error` هو كائن الخطأ.
  إذًا نُلخّص: يعمل المُنفِّذ تلقائيًا وعليه مهمّة استدعاء `resolve` أو `reject`.
  لكائن الوعد `promise` الذي أعاده الباني `new Promise` خاصيتين داخليتين:
- الحالة `state`: تبدأ بالقيمة `"pending"` وبعدها تنتقل إلى `"fulfilled"` متى استُدعت `resolve`، أو إلى `&"rejected"`
  متى استُدعت `reject`.
- الناتج `result`: يبدأ أولًا غير معرّف `undefined`، وبعدها يتغيّر إلى `value` متى استُدعت `resolve(value)‎` أو
  يتغيّر إلى `error` متى استُدعت `reject(error)‎`.

وفي النهاية ينقل المُنفِّذ الوعدَ `promise` ليصير بإحدى الحالات الآتية:
[promise-resolve-reject.png]
سنرى لاحقًا كيف سيشترك ”مُعجبونا“ بهذه التغييرات.
إليك مثالًا عن بانيًا للوعود ودالة مُنفِّذ بسيطة فيها ”شيفرة مُنتجِة“ تأخذ بعض الوقت (باستعمال `setTimeout`):

```
let promise = new Promise(function(resolve, reject) {
// تُنفّ الدالة مباشرةً ما إن يُصنع الوعد
// ‫وبعد ثانية واحدة نبعث بإشارة بأنّ المهمة انتهت والنتيجة هي ”تمت“ (done)
setTimeout(() => resolve("done"), 1000);
});
```

بتشغيل الشيفرة أعلاه، نرى أمرين اثنين:

1. يُستدعى المُنفِّذ تلقائيًا ومباشرةً (عند استعمال `new Promise`).
2. يستلم المُنفِّذ وسيطين: دالة الحلّ `resolve` ودالة الرفض `reject`، وهي دوال معرّفة مسبقًا في محرّك جافا سكريبت، ولا داعٍ
   بأن نصنعها نحن، بل استدعاء واحدة ما إن تجهز النتيجة.
   بعد سنة من عملية ”المعالجة“ يستدعي المُنفِّذ الدالةَ `resolve("done")‎` لتُنتج الناتج. هكذا تتغيّر حالة كائن `promise`:
   [promise-resolve-1.png]
   كان هذا مثالًا عن مهمّة اكتملت بنجاح، أو ”وعد تحقّق“.
   والآن سنرى مثالًا عن مُنفِّذ يرفض الوعد مُعيدًا خطأً:

```
let promise = new Promise(function(resolve, reject) {
// بعد ثانية واحدة نبعث بإشارة بأنّ المهمة انتهت ونُعيد خطأً
setTimeout(() => reject(new Error("Whoops!")), 1000);
});
```

باستدعاء `reject(...)‎` ننقل حالة كائن الوعد إلى حالة الرفض `"rejected"`:
[promise-reject-1.png]
ملخّص القول هو أنّ على المُنفِّذ تنفيذ المهمة (أي ما يأخذ بعض الوقت ليكتمل) وثمّ يستدعي واحدةً من الدالتين `resolve` أو
`reject` لتغيير حالة كائن الوعد المرتبط بالمُنفِّذ.
يُسمّى الوعد الذي تحقّق أو نُكث الوعد المنُجز، على العكس من الوعد المعلّق.

**ملاحظة**: إما أن تظهر نتيجة واحدة أو خطأ، يجب على المنفّذ أن يستدعي إما `resolve` أو `reject`. أي تغيير في الحالة
يعدّ تغييرًا نهائيًا.
وسيُتجاهل جميع الاستدعاءات اللاحقة سواءً أكانت `resolve` أو `reject`:

```
let promise = new Promise(function(resolve, reject) {
resolve("done");
reject(new Error("…")); // ستتجاهل
setTimeout(() => resolve("…")); // ستتجاهل
});
```

الفكرة هنا أن خرج عمل المنفذّ سيعرض إما نتيجة معينة أو خطأ.
وتتوقع التعليمتين `resolve`/`reject` وسيطًا واحدًا مُررًا (أو بدون وسطاء نهائيًا) وأي وسطاء إضافية ستُتجاهل.
**ملاحظة**: الرفض مع كائن `Error`
في حال حدوث خطأ ما، يجب على المنفذّ أن يستدعي تعليمة `reject`. ويمكن تمرير أي نوع من الوسطاء (تمامًا مثل:
`resolve`). ولكن يوصى باستخدام كائنات `Error` (أو أي كائنات ترث من `Error`). وقريبًا سنعرف بوضوح سبب ذلك.
**ملاحظة**: استدعاء `resolve`/`reject` الفوري
عمليًا عادة ينجز المنفذّ عمله بشكل متزامن ويستدعي `resolve`/`reject` بعد مرور بعض الوقت، ولكن الأمر ليس إلزاميًا،
يمكننا استدعاء `resolve` أو `reject` فورًا، هكذا:

```
let promise = new Promise(function(resolve, reject) {
// يمكننا القيام بالمهمة مباشرة
resolve(123); // أظهر مباشرة النتيجة: 123
});
```

على سبيل المثال من الممكن أن يحدث ذلك في حال البدء بمهمة معينة ولكن تكتشف بأن كلّ شيء أنجز وخزّن في الذاكرة المؤقتة.
هذا جيد، فعندها يجب أن ننجز الوعد فورًا.
**ملاحظة**: الحالة `state` و النتيجة `result` الداخليتين
تكون خصائص الحالة `state` و النتيجة `result` لكائن الوعد داخلية. ولا يمكننا الوصول إليهم مباشرة. يمكننا استخدام التوابِع
`‎.then`/`.catch`/`.finally` لذلك والتي سنشرحُها أدناه.

## الاستهلاك: عبارات then وcatch وfinally

كائن الوعد هو كالوصلة بين المُنفِّذ (أي ”الشيفرة المُنتِجة“ أو ”المغنّي“) والدوال المُستهلكة (أي ”المُعجبون“) التي ستسلم الناتج أو
الخطأ. يمكن تسجيل دوال الاستهلاك (أو أن تشترك، كما في المثال العملي ذاك) باستعمال التوابِع `‎.then` و`‎.catch`
و`‎.finally`.

### then

يُعدّ `‎.then` أهمّها وعِماد القصة كلها. صياغته هي:

```
promise.then(
function(result) { /* نتعامل مع الناتج الصحيح */ },
function(error) { /* نتعامل مع الخطأ */ }
);
```

الوسيط الأوّل من التابِع `‎.then` يُعدّ دالة تُشغّل إن تحقّق الوعد، ويكون الوسيطُ الناتج.
بينما الوسيط الثاني يُعدّ دالةً تُشغّل إن رُفض الوعد، ويكون الوسيطُ الخطأ.
إليك مثال نتعامل فيه مع وعد تحقّق بنجاح:

```
let promise = new Promise(function(resolve, reject) {
setTimeout(() => resolve("done"), 1000);
});
// ‫تُنفِّذ resolve أول دالة في ‎.then
promise.then(
result => alert(result), // shows "done" after 1 second
error => alert(error) // doesn't run
);
```

هكذا نرى الدالة الأولى هي التي نُفّذت.
وإليك المثال في حالة الرفض:

```
let promise = new Promise(function(resolve, reject) {
setTimeout(() => reject(new Error("Whoops")), 1000);
});
// ‫تُنفِّذ reject ثاني دالة في ‎.then
promise.then(
result => alert(result), // لا تعمل
error => alert(error) // ‫ إظهار "Error: Whoops!‎" بعد ثانية
);
```

لو لم نُرِد إلّا حالات الانتهاء الناجحة، فيمكن أن نقدّم دالةً واحدة وسيطًا إلى `‎.then` فقط:

```
let promise = new Promise(resolve => {
setTimeout(() => resolve("done!"), 1000);
});

promise.then(alert); // ‫ إظهار "done!‎" بعد ثانية
```

### catch

لو لم نكن نهتمّ إلّا بالأخطاء، فعلينا استعمال `null` وسيطًا أولًا: `‎.then(null, errorHandlingFunction)‎`، أو نستعمل
`‎.catch(errorHandlingFunction)‎` وهو يؤدّي ذات المبدأ تمامًا ولا فرق إلّا قصر الثانية مقارنة بالأولى:

```
let promise = new Promise((resolve, reject) =&gt; {
setTimeout(() => reject(new Error("Whoops!")), 1000);
});

// .catch(f) is the same as promise.then(null, f)
promise.catch(alert); // ‫إظهار "Error: Whoops!‎" بعد ثانية
```

### finally

كما المُنغلِقة `finally` في عبارات `try {...} catch {...}‎` العادية، فهناك مثلها في الوعود.
استدعاء `‎.finally(f)‎` يشبه استدعاء `‎.then(f, f)‎`، ووجه الشبه هو أنّ الدالة `f` تعمل دومًا متى .... الوعد، كان قد تحقّق أو
نُكث.
استعمال `finally` مفيد جدًا لتنظيف ما تبقّى من أمور مهمًا كان ناتج الوعد، مثل إيقاف أيقونات التحميل (فلم نعد نحتاجها). هكذا
مثلًا:

```
new Promise((resolve, reject) => {
// ‫افعل شيئًا يستغرق وقتًا ثم استدع resolve/reject lre
})
// runs when the promise is settled, doesn't matter successfully or not
.finally(() => stop loading indicator)

.then(result => show result, err => show error)
```

ولكنها ليست متطابقة تمامًا مع `then(f,f)‎`، فهناك فروقات مهمّة:

1. ليس لدالة المُعالجة `finally` أيّ وسطاء. أي لسنا نعلم في `finally` أكان الوعد تحقّق أو نُكث، وهذه ليست مشكلة إذ ما نريده
   عادةً هو تنفيذ بعض الأمور ”العامّة“ لنُنهي ما بدأنا به.
2. يمرُّ مُعالج `finally` على النتائج والأخطاء وبعدها إلى المعالج التالي.
   مثال على ذلك هو الناتج الذي تمرّر من `finally` إلى `then` هنا:

```
new Promise((resolve, reject) => {
setTimeout(() => resolve("result"), 2000)
})
*!*
  // runs when the promise is settled, doesn't matter successfully or not
  .finally(() => stop loading indicator)
  // so the loading indicator is always stopped before we process the result/error
*/!*
  .then(result => show result, err => show error)
```

That said, `finally(f)` isn't exactly an alias of `then(f,f)` though. There are few subtle differences:

1. A `finally` handler has no arguments. In `finally` we don't know whether the promise is successful or not. That's all right, as our task is usually to perform "general" finalizing procedures.
2. A `finally` handler passes through results and errors to the next handler.

   For instance, here the result is passed through `finally` to `then`:

   ```js run
   new Promise((resolve, reject) => {
     setTimeout(() => resolve('result'), 2000);
   })
     .finally(() => alert('Promise ready'))
     .then((result) => alert(result)); // <-- .then handles the result
   ```

   And here there's an error in the promise, passed through `finally` to `catch`:

   ```js run
   new Promise((resolve, reject) => {
     throw new Error('error');
   })
     .finally(() => alert('Promise ready'))
     .catch((err) => alert(err)); // <-- .catch handles the error object
   ```

That's very convenient, because `finally` is not meant to process a promise result. So it passes it through.

We'll talk more about promise chaining and result-passing between handlers in the next chapter.

````smart header="We can attach handlers to settled promises"
If a promise is pending, `.then/catch/finally` handlers wait for it. Otherwise, if a promise has already settled, they just run:

```js run
// the promise becomes resolved immediately upon creation
let promise = new Promise(resolve => resolve("done!"));
promise.then(alert); // done! (تظهر الآن)
```

Note that this makes promises more powerful than the real life "subscription list" scenario. If the singer has already released their song and then a person signs up on the subscription list, they probably won't receive that song. Subscriptions in real life must be done prior to the event.

Promises are more flexible. We can add handlers any time: if the result is already there, they just execute.
````

Next, let's see more practical examples of how promises can help us write asynchronous code.

## Example: loadScript [#loadscript]

أمامنا من الفصل الماضي الدالة `loadScript` لتحميل السكربتات.
إليك الدالة بطريقة ردود النداء، لنتذكّرها لا أكثر ولا أقل:

```
function loadScript(src, callback) {
let script = document.createElement('script');
script.src = src;
script.onload = () => callback(null, script);
// خطأ في تحميل السكربت كذا
script.onerror = () => callback(new Error(`Script load error for ${src}`));
document.head.append(script);
}
```

هيًا نُعد كتابتها باستعمال الوعود.
لن تطلب دالة `loadScript` الجديدة أيّ ردود نداء، بل ستصنع كائن وعد يتحقّق متى اكتمل التحميل، وتُعيده. يمكن للشيفرة
الخارجية إضافة الدوال المُعالجة (أي دوال الاشتراك) إليها باستعمال `.then`:

```
function loadScript(src) {
return new Promise(function(resolve, reject) {
let script = document.createElement('script');
script.src = src;
script.onload = () => resolve(script);
script.onerror = () => reject(new Error(`Script load error for ${src}`));
document.head.append(script);
});
}
```

الاستعمال:

```
let promise = loadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js");
promise.then(
script => alert(`${script.src} is loaded!`),
error => alert(`Error: ${error.message}`)
);
promise.then(script => alert('Another handler...'));

```

بنظرة خاطفة يمكن أن نرى فوائد هذه الطريقة موازنةً بطريقة ردود النداء:
| الوعود | ردود النداء |
|----------|-----------|
|تتيح لنا الوعود تنفيذ الأمور بترتيبها الطبيعي أولًا نشغّل `loadScript(script)‎` ومن بعدها `‎.then` نكتب ما نريد فعله
بالنتيجة. | يجب أن يكون تابِع `callback` تحت تصرفنا عند استدعاء `loadScript(script, callback)‎`. بعبارة أخرى
يجب أن نعرف ما سنفعله بالنتيجة **قبل** استدعاء `loadScript`. |
| يمكننا استدعاء `‎.then` في الوعد عدة مرات كما نريد. في كلّ مرة نضيف معجب جديدة "fan"، هنالك تابع سيضيف مشتركين
جُدد إلى قائمة المشتركين. سنرى المزيد حول هذا الأمر في الفصل القادم:"" | يمكن أن يكون هنالك ردّ واحد فقط. |

إذًا، فالوعود تقدّم لنا تحكمًا مرنًا بالشيفرة وسير تنفيذها، وما زالت هنالك الكثير من الأمور الرائعة التي سنتعرف عليها الفصل
القادم.

## تمارين

### إعادة ... الوعد؟

ما ناتج الشيفرة أدناه؟

```
let promise = new Promise(function(resolve, reject) {
resolve(1);
setTimeout(() => resolve(2), 1000);
});
promise.then(alert);
```

#### الحل

الناتج هو: `1`.
يُهمل استدعاء `resolve` الثاني إذ لا يتهمّ المحرّك إلّا بأول استدعاء من `reject/resolve`، والباقي كلّه يُهمل.

### التأخير باستعمال الوعود

تستعمل الدالة المضمّنة في اللغة `setTimeout` ردودَ النداء. اصنع واحدة تستعمل الوعود.
على الدالة `delay(ms)‎` إعادة وعد ويجب أن ... هذا الوعد خلال `ms` مليثانية، ونُضيف تابِع `.then` إليه هكذا:

```
function delay(ms) {
// شيفرتك هنا
}
delay(3000).then(() => alert('runs after 3 seconds'));
```

#### الحل

```
function delay(ms) {
return new Promise(resolve => setTimeout(resolve, ms));
}
delay(3000).then(() => alert('runs after 3 seconds'));
```

لاحظ أنّنا في هذا التمرين استدعينا `resolve` بلا وسطاء، ولم نُعد أيّ قيمة من `delay` بل ... فقط

### صورة دائرة متحركة مع وعد

أعِد كتابة الدالة `showCircle` في حلّ التمرين
[السابق](https://academy.hsoub.com/programming/javascript/%D9%85%D9%82%D8%AF%D9
%85%D8%A9-%D8%A5%D9%84%D9%89-%D8%B1%D8%AF%D9%88%D8%AF-
%D8%A7%D9%84%D9%86%D8%AF%D8%A7%D8%A1-callbacks-%D9%81%D9%8A-
%D8%AC%D8%A7%D9%81%D8%A7%D8%B3%D9%83%D8%B1%D8%A8%D8%AA-
r914/) لتُعيد وعدًا بدل أن تستلم ردّ نداء. ويكون استعمالها الجديد هكذا:

```
showCircle(150, 150, 100).then(div => {
div.classList.add('message-ball');
div.append("Hello, world!");
});
```

ليكن الحلّ في التمرين المذكور أساس المسألة الآن.

#### الحل

يمكنك مشاهدة الحل عبر [المثال الحي](https://plnkr.co/edit/Q1jyGXvy9INMRG3Y?p=preview).
ترجمة -وبتصرف- للفصل [Promise](https://javascript.info/promise-basics) من كتاب [The
JavaScript language](https://javascript.info/js)
