# الجدولة: المهلة setTimeout والفترة setInterval 

وأنت تكتب الشيفرة، ستقول في نفسك «أريد تشغيل هذه الدالة بعد قليل وليس الآن الآن. هذا ما نسمّيه "بجدولة الاستدعاءات" (scheduling a call).

إليك دالتين اثنتين لهذه الجدولة:


- يتيح لك ‎`setTimeout`‎ تشغيل الدالة مرّة واحدة بعد فترة من الزمن.
- يتيح لك ‎`setInterval`‎ تشغيل الدالة تكراريًا يبدأ ذلك بعد فترة من الزمن ويتكرّر كلّ فترة حسب تلك الفترة التي حدّدتها.

صحيح أنّ هاتين الدالتين ليستا في مواصفة لغة جافاسكربت إلّا أنّ أغلب البيئات فيها مُجدوِل داخلي يقدّمهما لنا. وللدقّة، فكلّ المتصّفحات كما وNode.js تدعمهما.

## setTimeout

صياغة الكود:

```js
let timerId = setTimeout(func|code, [delay], [arg1], [arg2], ...)
```

المتغيرات:

`func|code`
: ما يجب تنفيذه أكان دالة أو سلسلة نصية فيها شيفرة. 
عادةً, هي دالة ولكن كعادة الأسباب التاريخية (أيضًا) يمكن تمرير سلسلة نصية فيها شيفرة، ولكنّ ذلك ليس بالأمر المستحسن.


`delay`
: The delay before run, in milliseconds (1000 ms = 1 second), by default 0.

`arg1`, `arg2`...
: وُسطاء الدالة (ليست مدعومة في IE9-‎)

إليك هذه الشيفرة التي تستدعي ‎sayHi()‎ بعد ثانيةً واحدة:

```js run
function sayHi() {
  alert('Hello');
}

*!*
setTimeout(sayHi, 1000);
*/!*
```

مع المتغيرات:

```js run
function sayHi(phrase, who) {
  alert( phrase + ', ' + who );
}

*!*
setTimeout(sayHi, 1000, "Hello", "John"); // Hello, John
*/!*
```

If the first argument is a string, then JavaScript creates a function from it.

So, this will also work:

```js run no-beautify
setTimeout("alert('Hello')", 1000);
```

But using strings is not recommended, use arrow functions instead of them, like this:

```js run no-beautify
setTimeout(() => alert('Hello'), 1000);
```

````smart header="Pass a function, but don't run it"
 يُخطئ المبرمجون المبتدئون أحيانًا فيُضيفون أقواس ‎()‎ بعد الدالة:

```js
// wrong!
setTimeout(sayHi(), 1000);
```
لن يعمل ذلك إذ يتوقّع ‎setTimeout‎ إشارة إلى الدالة، بينما هنا ‎sayHi()‎ يشغّل الدالة وناتج التنفيذ هو الذي يُمرّر إلى ‎setTimeout‎. في حالتنا ناتج ‎sayHi()‎ ليس معرّفًا ‎undefined‎ (إذ لا تُعيد الدالة شيئًا)، ويعني ذلك أنّ عملنا ذهب سدًى ولم نُجدول أي شيء.
````

### الإلغاء بإستعمال دالة clearTimeout 

نستلمُ حين نستدعي ‎setTimeout‎ «هويّةَ المؤقّت» ‎timerId‎ ويمكن استعمالها لإلغاء عملية التنفيذ.

The syntax to cancel:

```js
let timerId = setTimeout(...);
clearTimeout(timerId);
```

In the code below, we schedule the function and then cancel it (changed our mind). As a result, nothing happens:

```js run no-beautify
let timerId = setTimeout(() => alert("never happens"), 1000);
alert(timerId); // timer identifier

clearTimeout(timerId);
alert(timerId); // same identifier (doesn't become null after canceling)
```

يمكن أن نرى من ناتج التابِع ‎alert‎ أنّ هويّة المؤقّت (في المتصفّحات) هي عدد. يمكن أن تكون في البيئات الأخرى أيّ شيء آخر. فمثلًا في Node.js نستلم كائن مؤقّت فيه توابِع أخرى.

Again, there is no universal specification for these methods, so that's fine.

يمكنك مراجعة مواصفة HTML5 للمؤقّتات (داخل المتصفّحات) في فصل المؤقّتات.

## setInterval

صياغة الدالة ‎`setInterval`‎ هي ذات `‎`setTimeout‎:

```js
let timerId = setInterval(func|code, [delay], [arg1], [arg2], ...)
```

ولكلّ المُعاملات ذات المعنى. ولكن على العكس من ‎setTimeout‎ فهذا التابِع يشغّل الدالة مرّة واحدة ثمّ أخرى وأخرى وأخرى تفصلها تلك الفترة المحدّدة.

يمكن أن نستدعي ‎clearInterval(timerId)‎ لنُوقف الاستدعاءات اللاحقة.

سيعرض المثال الآتي الرسالة كلّ ثانيتين اثنتين، وبعد خمس ثوان يتوقّف ناتجها:


```js run
// repeat with the interval of 2 seconds
let timerId = setInterval(() => alert('tick'), 2000);

// after 5 seconds stop
setTimeout(() => { clearInterval(timerId); alert('stop'); }, 5000);
```

```smart header="الوقت لا يتوقّف حين تظهر مُنبثقة ‎"
تُواصل عقارب ساعة المؤقّت الداخلي (في أغلب المتصفّحات بما فيها كروم وفَيَرفُكس) بالمضيّ حتّى حين عرض ‎alert/confirm/prompt‎.
```

## Nested setTimeout

There are two ways of running something regularly.

الأولى هي ‎setInterval‎. والثانية هي ‎setTimeout‎ متداخلة هكذا:

```js
/** instead of:
let timerId = setInterval(() => alert('tick'), 2000);
*/

let timerId = setTimeout(function tick() {
  alert('tick');
*!*
  timerId = setTimeout(tick, 2000); // (*)
*/!*
}, 2000);
```

تابِع ‎setTimeout‎ أعلاه يُجدول الاستدعاء التالي ليحدث بعد نهاية الأول (لاحظ ‎(*)‎).

كتابة توابِع ‎setTimeout‎ متداخلة يعطينا شيفرة مطواعة أكثر من ‎setInterval‎. بهذه الطريقة يمكن تغيير جدولة الاستدعاء التالي حسب ناتج الحالي.

فمثلًا علينا كتابة خدمة تُرسل طلب بيانات إلى الخادوم كلّ خمس ثوان، ولكن لو كان الخادوم مُثقلًا بالعمليات فيجب أن تزداد الفترة إلى 10 فَـ 20 فَـ 40 ثانية وهكذا…

إليك فكرة عن الشيفرة:

```js
let delay = 5000;

let timerId = setTimeout(function request() {
  ...send request...

  if (request failed due to server overload) {
    // increase the interval to the next run
    delay *= 2;
  }

  timerId = setTimeout(request, delay);

}, delay);
```


And if the functions that we're scheduling are CPU-hungry, then we can measure the time taken by the execution and plan the next call sooner or later.

**يتيح لنا تداخل التوابِع ‎setTimeout‎ بضبط الفترة بين عمليات التنفيذ بدقّة أعلى ممّا تقدّمه ‎setInterval‎.**

لنرى الفرق بين الشيفرتين أسفله. الأولى تستعمل ‎setInterval‎:

```js
let i = 1;
setInterval(function() {
  func(i++);
}, 100);
```

الثانية تستعمل ‎setTimeout‎ متداخلة:

```js
let i = 1;
setTimeout(function run() {
  func(i++);
  setTimeout(run, 100);
}, 100);
```

سيُشغّل المُجدول الداخلي ‎func(i++)‎ كلّ 100 مليثانية حسب ‎setInterval‎:

![](setinterval-interval.svg)

Did you notice?

التأخير الفعلي بين استدعاءات ‎func‎ التي ينفّذها ‎setInterval‎ أقل مما هي عليه في الشيفرة!

هذا طبيعي إذ أنّ الوقت الذي يأخذه تنفيذ ‎func‎ يستهلك بعضًا من تلك الفترة أيضًا.

يمكن أيضًا بأن يصير تنفيذ ‎func‎ أكبر ممّا توقعناه على حين غرّة ويأخذ وقتًا أطول من 100 مليثانية.

في هذه الحال ينتظر المحرّك انتهاء ‎func‎ ثمّ يرى المُجدول: لو انقضى الوقت يشغّل الدالة مباشرةً.

دومًا ما تأخذ الدالة وقتًا أطول من ‎delay‎ مليثانية في هذه الحالات الهامشية، إذ تجري الاستدعاءات واحدةً بعد الأخرى دون هوادة.

وإليك صورة ‎setTimeout‎ المتداخلة:

![](settimeout-interval.svg)

**تضمن ‎setTimeout‎ المتداخلة لنا التأخير الثابت (100 مليثانية في حالتنا).**

That's because a new call is planned at the end of the previous one.


````smart header="كنس المهملات وردود نداء الدالتين setInterval و setTimeout"
تُنشأ إشارة داخلية إلى الدالة (وتُحفظ في المُجدول) متى مرّرتها إلى إلى ‎setInterval/setTimeout‎، وهذا يمنع كنس الدالة على أنّها مهملات، حتّى لو لم تكن هناك إشارات إليها.

```js
// the function stays in memory until the scheduler calls it
setTimeout(function() {...}, 100);
```

For `setInterval` the function stays in memory until `clearInterval` is called.

ولكن هناك تأثير جانبي لذلك كالعادة، فالدوال تُشير إلى بيئتها المُعجمية الخارجية. لذا طالما «تعيش»، تعيش معها المتغيرات الخارجية أيضًا، وهي أحيانًا كبيرة تأخذ ذاكرة أكبر من الدالة ذاتها. لذا، متى ما لم ترد تلك الدالة المُجدولة فالأفضل أن تُلغيها حتّى لو كانت صغيرة جدًا.
````

## جدولة setTimeout بتأخير صفر

إليك الحالة الخاصة: ‎setTimeout(func, 0)‎ أو ‎setTimeout(func)‎.


يُجدول هذا التابِع ليحدث تنفيذ ‎func‎ بأسرع ما يمكن، إلّا أن المُجدول لن يشغّلها إلا بعد انتهاء السكربت الذي يعمل حاليًا.

So the function is scheduled to run "right after" the current script.

على سبيل المثال, هذا تكون نتيجته "Hello", ثم فوراً "World":


```js run
setTimeout(() => alert("World"));

alert("Hello");
```

عني السطر الأوّل «ضع الاستدعاء في التقويم بعد 0 مليثانية»، إلّا أنّ المُجدول لا «يفحص تقويمه» إلّا بعد انتهاء السكربت الحالي، بهذا تصير `‎"Hello"‎` أولًا وبعدها تأتي ‎"World"‎.

كما أنّ هناك استعمالات متقدّمة خصّيصًا للمتصفّحات للمهلة بالتأخير صفر هذه، وسنشرحها في الفصل «حلقة الأحداث: المهام على المستويين الجُسيمي والذرّي». 

````smart header="في الواقع، فالتأخير الصفر هذا ليس صفرًا (في المتصفّحات)"
تحدّ المتصفّحات من التأخير بين تشغيل المؤقّتات المتداخلة. تقول مواصفة [HTML5 standard](https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers) HTML5: «بعد المؤقّتات المتداخلة الخمسة الأولى، تُجبر الفترة لتكون أربع مليثوان على الأقل.».

لنرى ما يعني ذلك بهذا المثال أسفله. يُعيد استدعاء ‎setTimeout‎ جدولة نفسه بمدّة تأخير تساوي صفر، ويتذكّر كل استدعاء الوقت الفعلي بينه وبين آخر استدعاء في مصفوفة ‎times‎. ولكن، ما هي التأخيرات الفعلية؟ لنرى بأعيننا:

```js run
let start = Date.now();
let times = [];

setTimeout(function run() {
  times.push(Date.now() - start); // remember delay from the previous call

  if (start + 100 < Date.now()) alert(times); // show the delays after 100ms
  else setTimeout(run); // else re-schedule
});

// an example of the output:
// 1,1,1,1,9,15,20,24,30,35,40,45,50,55,59,64,70,75,80,85,90,95,100
```

تعمل المؤقّتات الأولى مباشرةً (كما تقول المواصفة)، وبعدها نرى ‎9, 15, 20, 24...‎. تلك الأربع مليثوان الإضافية هي التأخير المفروض بين الاستدعاءات.

حتّى مع ‎setInterval‎ بدل ‎setTimeout‎، ذات الأمر: تعمل الدالة ‎setInterval(f)‎ أوّل ‎f‎ مرّة بمدّة تأخير صفر، وبعدها تزيد أربع مليثوان لباقي الاستدعاءات.

سبب وجود هذا الحدّ هو من العصور الحجرية (متعوّدة دايمًا) وتعتمد شيفرات كثيرة على هذا السلوك.

بينما مع نسخة الخواديم من جافاسكربت فهذا الحدّ ليس له وجود، وهناك أيضًا طُرق أخرى لبدء المهام التزامنية مباشرةً، مثل setImmediate للغة Node.js، هذا قلنا بأنّ هذا يخصّ المتصفّحات فقط.
````

## ملخص

- يتيح لنا التابِعان ‎setTimeout(func, delay, ...args)‎ و‎setInterval(func, delay, ...args)‎ تشيل الدالة ‎func‎ مرّة أو كلّ فترة حسب كذا مليثانية (‎delay‎).
- لإلغاء التنفيذ علينا استدعاء ‎clearTimeout/clearInterval‎ بالقيمة التي أعاداها ‎setTimeout/setInterval‎.
يُعدّ استدعاء الدوال ‎setTimeout‎ تداخليًا خيارًا أفضل من ‎setInterval‎ إذ يُتيح لنا ضبط الوقت بين كلّ عملية استدعاء بدقّة.
- الجدولة بضبط التأخير على الصفر باستعمال ‎setTimeout(func, 0)‎ (كما واستعمال ‎setTimeout(func)‎) يكون حين نريدها «بأقصى سرعة ممكنة، متى انتهى السكربت الحالي».
- يَحدّ المتصفّح من أدنى تأخير بعد استدعاء ‎setTimeout‎ أو ‎setInterval‎ المتداخل الخامس (أو أكثر) - يَحدّه إلى 4 مليثوان، وهذا لأسباب تاريخية

لاحظ بأنّ توابِع الجدولة لا تضمن التأخير كما هو حرفيًا.

فمثلًا يمكن أن تكون مؤقّتات المتصفّحات أبطأ لأسباب عديدة:
- المعالج مُثقل بالعمليات.
- المتصفّح يعمل في الخلفية.
- يعمل الحاسوب المحمول على البطارية.

يمكن لهذا كله رفع دقّة المؤقّت الدنيا (أي أدنى تأخير ممكن) لتصير 300 مليثانية أو حتى 1000 مليثانية حسب المتصفّح وإعدادات الأداء في نظام التشغيل.
