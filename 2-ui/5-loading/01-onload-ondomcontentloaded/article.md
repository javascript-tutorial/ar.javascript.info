# Page: DOMContentLoaded, load, beforeunload, unload

دورة حياة صفحه HTML لها ثلاثة احداث مهمة :

- `DOMContentLoaded` -- the browser fully loaded HTML, and the DOM tree is built, but external resources like pictures `<img>` and stylesheets may not yet have loaded.
- `load` -- not only HTML is loaded, but also all the external resources: images, styles etc.
- `beforeunload/unload` -- the user is leaving the page.

قد يكون كل حدث مفيد:

- `DOMContentLoaded` حدث -- DOM جاهز, بحيث يمكن للمعالج البحث عن عقد DOM , تهيئة الواجهة.
- `load` الحدث -- يتم تحميل المواد الخارجية , لذلك يتم تطبيق الأنماط, وأحجام الصور معروفة الخ.
- `beforeunload` الحدث -- عند مغادرة المستخدم: يمكننا التحقق مما إذا كان المستخدم حفظ التغييرات ونطلب منهم ما إذا كانوا يريدون حقا أن يغادر.
- `unload` -- المستخدم غادر تقريبا, ولكن لا يزال بإمكاننا بدء بعض العمليات، مثل إرسال الإحصائيات.

دعونا نستكشف تفاصيل هذه الأحداث.

## DOMContentLoaded

`DOMContentLoaded` الحدث يحدث علي `document` الكائن.

يجب ان نستخدم `addEventListener` لإمساك الحدث:

```js
document.addEventListener('DOMContentLoaded', ready);
// not "document.onDOMContentLoaded = ..."
```

على سبيل المثال:

```html run height=200 refresh
<script>
    function ready() {
      alert('DOM is ready');

      // image is not yet loaded (unless it was cached), so the size is 0x0
      alert(`Image size: ${img.offsetWidth}x${img.offsetHeight}`);
    }

  *!*
    document.addEventListener("DOMContentLoaded", ready);
  */!*
</script>

<img id="img" src="https://en.js.cx/clipart/train.gif?speed=1&cache=0" />
```

<<<<<<< HEAD
علي سبيل المثال `DOMContentLoaded` يتم تشغيل المعالج عند تحميل المستند، حتى يتمكن من رؤية كافة العناصر, متضمنا `<img>` ادناه.
=======
In the example, the `DOMContentLoaded` handler runs when the document is loaded, so it can see all the elements, including `<img>` below.
>>>>>>> 6989312841d843f2350803ab552d9082437be569

ولكن لا ينتظر حتى يتم تحميل الصورة. لذالك `alert` يظهر حجم الصفر.

للوهلة الأولى, `DOMContentLoaded` الحدث بسيط جدا. DOM جاهز -- ها هو الحدث. هناك القليل من الخصائص المميزة بالرغم من ذلك.

### DOMContentLoaded and scripts

عندما يعالج المتصفح مستند HTML ويأتي عبر علامة `<script>`, يحتاج الي التنفيذ قبل متابعة بناء DOM.هذا إجراء احترازي ، حيث قد ترغب البرامج النصية في تعديل DOM
, وحتي حدث `document.write` بداخلة, لذالك `DOMContentLoaded` يجب أن تنتظر.

لذلك DOMContentLoaded بالتأكيد يحدث بعد هذه البرامج النصية:

```html run
<script>
  document.addEventListener('DOMContentLoaded', () => {
    alert('DOM ready!');
  });
</script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.3.0/lodash.js"></script>

<script>
  alert('Library loaded, inline script executed');
</script>
```

ف المثال أعلاه, نشاهد أولاً "مكتبة محملة...", ثم "DOM ready!" (يتم تنفيذ جميع البرامج النصية).

```warn header="البرامج النصية التي لا تحظر DOMContentLoaded"
هناك نوعان من الاستثناءات من هذه القاعدة:
1. البرامج النصية ذات السمة `غير متزامن`, التي سنغطيها [بعد فترة وجيزة](info:script-async-defer), لا تحجب `DOMContentLoaded`.
2. البرامج النصية التي يتم إنشاؤها ديناميكيًا باستخدام `document.createElement('script')` ثم إضافته إلى صفحة الويب أيضًا لا تحظر هذا الحدث.
```

### DOMContentLoaded and styles

لا تؤثر أوراق الأنماط الخارجية على DOM, لذلك `DOMContentLoaded` لا تنتظرهم.

لكن هناك مأزق. إذا كان لدينا برنامج نصي بعد النمط، فيجب أن ينتظر ذلك البرنامج النصي حتى يتم تحميل ورقة الأنماط:

```html run
<link type="text/css" rel="stylesheet" href="style.css" />
<script>
  // the script doesn't not execute until the stylesheet is loaded
  alert(getComputedStyle(document.body).marginTop);
</script>
```

السبب في ذلك هو أن البرنامج النصي قد ترغب في الحصول على إحداثيات وخصائص أخرى نمط تعتمد على العناصر، كما هو الحال في المثال أعلاه.وبطبيعة الحال، فإنه يجب أن تنتظر أنماط لتحميل.

نظرا لأن `DOMContentLoaded` ينتظر البرامج النصية ، فإنه ينتظر الآن الأنماط التي تسبقها أيضًا.

### Built-in browser autofill

Firefox, Chrome , Opera تم تشغيل نماذج الملء التلقائي `DOMContentLoaded`.

على سبيل المثال ، إذا كانت الصفحة تحتوي على نموذج به معلومات تسجيل دخول وكلمة مرور ، وتذكر المتصفح القيم ، فقد يحاول ملئها تلقائيًا في `DOMContentLoaded` (إذا وافق عليه المستخدم).

لذلك إذا تم تأجيل `DOMContentLoaded` بواسطة نصوص برمجية طويلة التحميل ، فإن الملء التلقائي ينتظر أيضًا. ربما رأيت ذلك في بعض المواقع (إذا كنت تستخدم الملء التلقائي للمتصفح) - لا يتم ملء حقول تسجيل الدخول / كلمة المرور تلقائيًا على الفور ، ولكن هناك تأخير حتى يتم تحميل الصفحة بالكامل. هذا هو التأخير الفعلي حتى حدث `DOMContentLoaded` .

## window.onload [#window-onload]

يتم تشغيل حدث `load` في كائن `window` عند تحميل الصفحة بأكملها بما في ذلك الأنماط والصور والموارد الأخرى. هذا الحدث متاح عبر خاصية `onload` .

يوضح المثال أدناه أحجام الصور بشكل صحيح ، لأن `window.onload` ينتظر جميع الصور

```html run height=200 refresh
<script>
<<<<<<< HEAD
  window.onload = function () {
    // same as window.addEventListener('load', (event) => {
=======
  window.onload = function() { // can also use window.addEventListener('load', (event) => {
>>>>>>> 6989312841d843f2350803ab552d9082437be569
    alert('Page loaded');

    // image is loaded at this time
    alert(`Image size: ${img.offsetWidth}x${img.offsetHeight}`);
  };
</script>

<img id="img" src="https://en.js.cx/clipart/train.gif?speed=1&cache=0" />
```

## window.onunload

عندما يغادر زائر الصفحة ، يتم تشغيل حدث `unload` في النافذة `window`يمكننا أن نفعل شيئًا هناك لا يتضمن تأخيرًا ، مثل إغلاق النوافذ المنبثقة ذات الصلة.

الاستثناء الملحوظ هو إرسال التحليلات.

لنفترض أننا نجمع بيانات حول كيفية استخدام الصفحة: نقرات الماوس ، والتمرير ، ومناطق الصفحة المعروضة ، وما إلى ذلك.

بطبيعه الحال, حدث `unload` هو عندما يتركنا المستخدم ، ونرغب في حفظ البيانات على خادمنا.

توجد طريقة خاصة `navigator.sendBeacon(url, data)` لهذه الاحتياجات, موضوفة ف المواصفات <https://w3c.github.io/beacon/>.

يرسل البيانات في الخلفية. لا يتأخر الانتقال إلى صفحة أخرى: يغادر المتصفح الصفحة ، لكنه لا يزال ينفذ `sendBeacon`.

إليك كيفية استخدامه:

```js
let analyticsData = {
  /* object with gathered data */
};

window.addEventListener('unload', function () {
  navigator.sendBeacon('/analytics', JSON.stringify(analyticsData));
});
```

- يتم إرسال الطلب كـ POST.
- لا يمكننا إرسال سلسلة فحسب ، بل يمكننا أيضًا إرسال النماذج والتنسيقات الأخرى ، كما هو موضح في الفصل <info: fetch> ، ولكنه عادةً ما يكون كائنًا مشروطًا.
- البيانات محدودة بـ 64 كيلو بايت.

عند الانتهاء من طلب `sendBeacon` , من المحتمل أن يكون المتصفح قد غادر المستند بالفعل ، لذلك لا توجد طريقة للحصول على استجابة الخادم (والتي تكون عادةً فارغة للتحليلات).

هناك ايضا علامة `keepalive` لتنفيذ طلبات "after-page-left" في طريقة [fetch](info:fetch) لطلبات الشبكة العامة. يمكنك الحصول عل المزيد من المعلومات في الفصل <info:fetch-api>.

إذا أردنا إلغاء الانتقال إلى صفحة أخرى ، فلا يمكننا القيام بذلك هنا. لكن يمكننا استخدام حدث آخر --
`onbeforeunload`.

## window.onbeforeunload [#window.onbeforeunload]

إذا بدأ الزائر التنقل بعيدًا عن الصفحة أو حاول إغلاق النافذة ، يطلب معالج `beforeunload` تأكيدًا إضافيًا.

إذا ألغينا الحدث ، فقد يسأل المتصفح الزائر عما إذا كان متأكدًا.

يمكنك تجربتها عن طريق تشغيل هذا الرمز ثم إعادة تحميل الصفحة:

```js run
window.onbeforeunload = function () {
  return false;
};
```

لأسباب تاريخية ، يتم أيضًا اعتبار إرجاع سلسلة غير فارغة بمثابة إلغاء للحدث. منذ بعض الوقت ، اعتادت المتصفحات على إظهار الرسالة كرسالة ، ولكن كما تقول [المواصفات الحديثة](https://html.spec.whatwg.org/#unloading-documents) ، لا ينبغي لها ذلك.

هذا مثال:

```js run
window.onbeforeunload = function () {
  return 'There are unsaved changes. Leave now?';
};
```

تم تغيير السلوك لأن بعض مشرفي المواقع أساءوا استخدام معالج الحدث هذا من خلال عرض رسائل مضللة ومزعجة. لذلك قد لا تزال المتصفحات القديمة تعرضها كرسالة في الوقت الحالي ، ولكن بصرف النظر عن ذلك - لا توجد طريقة لتخصيص الرسالة المعروضة للمستخدم.

````warn header="The `event.preventDefault()` doesn't work from a `beforeunload` handler"
That may sound weird, but most browsers ignore `event.preventDefault()`.

Which means, following code may not work:
```js run
window.addEventListener("beforeunload", (event) => {
  // doesn't work, so this event handler doesn't do anything
	event.preventDefault();
});
```

Instead, in such handlers one should set `event.returnValue` to a string to get the result similar to the code above:
```js run
window.addEventListener("beforeunload", (event) => {
  // works, same as returning from window.onbeforeunload
	event.returnValue = "There are unsaved changes. Leave now?";
});
```
````

## readyState

ماذا يحدث إذا قمنا بتعيين معالج `DOMContentLoaded` بعد تحميل المستند؟

بطبيعة الحال ، لا يعمل أبدا.

هناك حالات لا نكون فيها متأكدين مما إذا كان المستند جاهزًا أم لا. نود أن يتم تنفيذ وظيفتنا عند تحميل DOM ، سواء الآن أو لاحقًا.

تخبرنا خاصية `document.readyState` عن حالة التحميل الحالية.

هناك 3 قيم محتملة:

- `"loading"` -- يتم تحميل المستند.
- `"interactive"` -- تمت قراءة المستند بالكامل.
- `"complete"` -- تمت قراءة المستند بالكامل وتحميل جميع الموارد (مثل الصور) أيضًا.

لذلك يمكننا التحقق من `document.readyState` وإعداد معالج أو تنفيذ الكود فورًا إذا كان جاهزًا.

مثل هذا:

```js
function work() {
  /*...*/
}

if (document.readyState == 'loading') {
  // still loading, wait for the event
  document.addEventListener('DOMContentLoaded', work);
} else {
  // DOM is ready!
  work();
}
```

هناك أيضًا حدث `readystatechange` الذي يتم تشغيله عندما تتغير الحالة ، لذلك يمكننا طباعة كل هذه الحالات على النحو التالي:

```js run
// current state
console.log(document.readyState);

// print state changes
document.addEventListener('readystatechange', () => console.log(document.readyState));
```

يعد الحدث `readystatechange` آلية بديلة لتتبع حالة تحميل المستند ، وقد ظهر منذ فترة طويلة. في الوقت الحاضر ، نادرًا ما يتم استخدامه.

دعونا نرى تدفق الأحداث بالكامل للتأكد من اكتمالها.

إليك مستند يحتوي على `<iframe>`, `<img>` والمعالجات التي تسجل الأحداث:

```html
<script>
  log('initial readyState:' + document.readyState);

  document.addEventListener('readystatechange', () => log('readyState:' + document.readyState));
  document.addEventListener('DOMContentLoaded', () => log('DOMContentLoaded'));

  window.onload = () => log('window onload');
</script>

<iframe src="iframe.html" onload="log('iframe onload')"></iframe>

<img src="http://en.js.cx/clipart/train.gif" id="img" />
<script>
  img.onload = () => log('img onload');
</script>
```

المثال العملي هو [in the sandbox](sandbox:readystate).

الإخراج النموذجي:

1. [1] initial readyState:loading
2. [2] readyState:interactive
3. [2] DOMContentLoaded
4. [3] iframe onload
5. [4] img onload
6. [4] readyState:complete
7. [4] window onload

تشير الأرقام الموجودة بين قوسين معقوفين إلى الوقت التقريبي لحدوث ذلك. تحدث الأحداث التي تحمل نفس الرقم تقريبًا في نفس الوقت (+ - بضع مللي ثانية).

- `document.readyState` تصبح `interactive` قبل `DOMContentLoaded`. هذان الشيئان يعنيان نفس الشيء في الواقع.
- `document.readyState` تصبح `complete` عندما تكون جميع الموارد (`iframe` and `img`) aيتم تحميلها. هنا يمكننا أن نرى أنه يحدث في نفس الوقت تقريبًا مثل `img.onload` (`img` هو المورد الأخير) و `window.onload`. التحويل الي `complete` الحالة تعني نفس `window.onload`. الفرق هو `window.onload` يعمل دائمًا بعد كل معالجات `load` الاخري.

## الملخص

أحداث تحميل الصفحة:

- `DOMContentLoaded` يتم تشغيل الحدث `document` عندما يكون DOM جاهزا. يمكننا تطبيق JavaScript على العناصر في هذه المرحلة.
  - - نص برمجي مثل `<script>...</script>` او `<script src="..."></script>` حظر DOMContentLoaded ، ينتظر المستعرض تنفيذها.
  - قد يستمر تحميل الصور والموارد الأخرى.
- يتم تحميل حدث `load` في `window` عند تحميل الصفحة وجميع الموارد. نادرًا ما نستخدمه ، لأنه لا داعي للانتظار لفترة طويلة.
- يتم تشغيل الحدث `beforeunload` في `window` عندما يريد المستخدم مغادرة الصفحة. إذا ألغينا الحدث ، يسأل المتصفح عما إذا كان المستخدم يريد حقًا المغادرة (على سبيل المثال ، لدينا تغييرات غير محفوظة).
- يتم تشغيل الحدث `unload` في `window` عندما يغادر المستخدم أخيرًا ، في المعالج يمكننا فقط القيام بأشياء بسيطة لا تنطوي على تأخير أو سؤال المستخدم. بسبب هذا القيد ، نادرًا ما يتم استخدامه. يمكننا إرسال طلب شبكة باستخدام `navigator.sendBeacon`.
- `document.readyState` هي الحالة الحالية للمستند ، يمكن تتبع التغييرات في حدث `readystatechange` :
  - `loading` -- يتم تحميل المستند.
  - `interactive` -- يتم تحليل المستند ، ويحدث في نفس الوقت تقريبًا مثل `DOMContentLoaded`, ولكن قبله.
  - `complete` -- يتم تحميل المستند والموارد ، يحدث في نفس الوقت تقريبًا مثل `window.onload`, ولكن قبل ذلك.
