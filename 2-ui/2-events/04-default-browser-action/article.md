# الإجراءات الافتراضية للمتصفح

تؤدي العديد من الأحداث تلقائيًا إلى إجراءات معينة يقوم بها المتصفح.

:على سبيل المثال

- النقر على رابط - يبدأ الانتقال إلى URL الخاص به.
- النقر على زر إرسال النموذج - يبدأ تقديم البيانات إلى الخادم server.
- النقر على زر الماوس فوق النص مع الحركة - يقوم بتحديد النص.

إذا تعاملنا مع حدث في الجافا اسكريبت ، يمكن ألا نرغب في تنفيذ إجراء المتصفح المقابل لهذا الحدث ، ونريد تنفيذ سلوك آخر بدلاً من ذلك.

## منع إجراءات المتصفح

:هناك طريقتان لإخبار المتصفح أننا لا نريده أن يعمل

- الطريقة الرئيسية هي استخدام كائن الحدث `event`. هناك طريقة `event.preventDefault()`.
- إذا تم تعيين المعالج handler باستخدام `on<event>` (وليس عن طريق `addEventListener`)، عندئذ فإن ارجاع القيمة `false` يعمل بنفس الطريقة.

<<<<<<< HEAD
:في هذه الصفحة النقر على الرابط لا يؤدي إلى التنقل، ولا يقوم المتصفح بأي شيئ
=======
In this HTML, a click on a link doesn't lead to navigation; the browser doesn't do anything:
>>>>>>> 53b35c16835b7020a0a5046da5a47599d313bbb8

```html autorun height=60 no-beautify
<a href="/" onclick="return false">Click here</a>
أو
<a href="/" onclick="event.preventDefault()">here</a>
```

.في المثال التالي سنستخدم هذه التقنية لإنشاء قائمة مدعومة من الجافا اسكريبت

```warn header="إعادة `false` من معالج يعد استثناء"
عادةً ما يتم تجاهل القيمة التي يتم إرجاعها بواسطة معالج الأحداث.

الاستثناء الوحيد هو `إرجاع false` من معالج مخصص باستخدام `on<event>`.

في كل الحالات الأخرى ، `إرجاع` قيمة يتم تجاهله. بشكل خاص، لا معنى من إرجاع قيمة `true`.
```

### مثال: القائمة

:قائمة موقع مثل هذه

```html
<ul id="menu" class="menu">
  <li><a href="/html">HTML</a></li>
  <li><a href="/javascript">JavaScript</a></li>
  <li><a href="/css">CSS</a></li>
</ul>
```

وهكذا تبدو بإضافة CSS:

[iframe height=70 src="menu" link edit]

عناصر القائمة مستخدمة ك `<a>`، وليس أزرار `<button>`. :هناك عدة أسباب لفعل ذلك، على سبيل المثال

- العديد من الأشخاص يفضلون استخدام "right click" -- "open in a new window". إذا استخدمنا `<button>` أو `<span>`، لن نستطيع فعل ذلك.
- تتبع محركات البحث `<a href="...">` الروابط أثناء الفهرسة.

لذلك نستخدم `<a>` في الترميز.لكننا عادةً نعتزم التعامل مع النقرات في الجافا اسكريبت. لذلك يجب علينا منع إجراء المتصفح الافتراضي.

:مثلما هو الحال هنا

```js
menu.onclick = function(event) {
  if (event.target.nodeName != 'A') return;

  let href = event.target.getAttribute('href');
  alert( href ); // ...يمكن تحميله من الخادم ، وإنشاء واجهة المستخدم وما إلى ذلك

*!*
  return false; // منع إجراء المتصفح (لا تذهب إلى URL)
*/!*
};
```

إذا حذفنا `إرجاع خطأ` ، فبعد تنفيذ الكود الخاص بنا ، سيقوم المتصفح بتنفيذ `الإجراء الافتراضي` - الانتقال إلى عنوان URL في `href`. ولسنا بحاجة إلى ذلك هنا ، لأننا نتعامل مع النقر بأنفسنا.

بالمناسبة استخدام تفويض الحدث event delegation يجعل قائمتنا مرنة للغاية. يمكننا إضافة قوائم متداخلة وتصميمها باستخدام CSS "slide down للانزلاق إلى أسفل".

````smart header="Follow-up events"
أحداث معينة تتدفق بعضها إلى أخرى. إذا منعنا الحدث الأول ، فلن يكون هناك ثاني. إذا منعنا الحدث الأول ، لن يصبح هنالك حدث ثاني.

على سبيل المثال ، `mousedown`في حقل `<input>`  يؤدي إلى التركيز عليه وحدوث حدث `focus`. إذا منعنا حدث `mousedown`  لن يحدث focus.

جرب أن نقر على أول  `<input>` بالأسفل --  `focus` يحدث الحدث. لكن إذا قمت بالنقر على الثاني فلن يحدث focus.

```html run autorun
<input value="Focus works" onfocus="this.value=''">
<input *!*onmousedown="return false"*/!* onfocus="this.value=''" value="Click me">
```

هذا بسبب إلغاء إجراء اللمتصفح في `mousedown`. لا يزال التركيز ممكناً إذا قمنا استخدمنا طريقة أخرى لإدخال المدخلات. على سبيل المثال ،`key:Tab` key  للتبديل من الإدخال الأول إلى الثاني. ولكن ليس مع النقر بالماوس بعد الآن.
````

##  passive "خيار المعامل "الخامل

الاختيار الغير إلزامي `passive: true` خيار `addEventListener` يشير إلى المتصفح بأن المعالج لن يستدعي الأمر `preventDefault()`.

<<<<<<< HEAD
لماذا قد تكون هناك حاجة لذلك؟
=======
Why might that be needed?
>>>>>>> 53b35c16835b7020a0a5046da5a47599d313bbb8

هناك بعض الأحداث مثل `touchmove` على أجهزة المحمول (عندما يحرك المستخدم إصبعه عبر الشاشة)، هذا يتسبب في scrolling افتراضي ، ولكن يمكن منع هذا باستخدام ` PreventionDefault () ` في المعالج.

لذا عندما يكتشف المتصفح حدثاً كهذا، تحتاج في البداية إلى العمل على كل المعالجات، ثم إذا لم يتم مناداة `preventDefault`في أي مكان، يمكن أن تستمر مع scrolling. قد يتسبب هذا في تأخيرات لا داعي لها "jitters" في UI.

الخيار `passive: true` يخبر المتصفح أن المعالج لن يقوم بإلغاء scrolling. بعد ذلك يقوم المتصفح فوراً بالحركة scroll  مقدماً بذلك أقصى تجربة سلسة، ويتم التعامل مع الحدث .

بالنسبة لبعض المتصفحات (Firefox، Chrome)، `passive` يكون`true` بشكل افتراضي لحدث `touchstart` و `touchmove`.


## event.defaultPrevented

الخاصية `event.defaultPrevented` تكون `صحيحة` إذا تم منع الإجراء الافتراضي، و تكون `خطأ` في الحالة المغايرة.

هناك حالة استخدام مثيرة للاهتمام لذلك.

هل تتذكر في فصل <info:bubbling-and-capturing> تحدثنا عن `event.stopPropagation()` أمر سيئ؟ bubbling ولماذا إيقاف 

بدلاً من ذلك أحياناً يمكننا استخدام `event.defaultPrevented`، للإشارة إلى معالجات الأحداث الأخرى بأنه تم التعامل مع الحدث.

لنرى مثالاً عملياً.

المتصفح افتراضياً في حدث`contextmenu` (النقر على الزر الأيمن للفأرة) يعرض context menu بخيارات قياسية. يمكننا منع :ذلك وإظهار القائمة الخاصةبنا، مثل

```html autorun height=50 no-beautify run
<button>Right-click shows browser context menu</button>

<button *!*oncontextmenu="alert('Draw our menu'); return false"*/!*>
  Right-click shows our context menu
</button>
```

الآن ، بالإضافة إلى قائمة السياق هذه ، نود تنفيذ قائمة السياق على مستوى المستند.

عند النقر بزر الماوس الأيمن ، يجب أن تظهر أقرب قائمة سياق.

```html autorun height=80 no-beautify run
<p>Right-click here for the document context menu</p>
<button id="elem">Right-click here for the button context menu</button>

<script>
  elem.oncontextmenu = function(event) {
    event.preventDefault();
    alert("Button context menu");
  };

  document.oncontextmenu = function(event) {
    event.preventDefault();
    alert("Document context menu");
  };
</script>
```

المشكلة هنا أنه عند النقر على `elem`، نحصل على قائمتين:  مستوى الزر button-level و (the event bubbles up) القائمة على مستوى المستند.

كيف نصلح ذلك؟ أحد الحلول هو التفكير مثل: "عندما نتعامل مع النقر بزر الماوس الأيمن في معالج الزر ، فلنتوقف عن الفقاعة" ولنستخدم `event.stopPropagation()`:

```html autorun height=80 no-beautify run
<p>Right-click for the document menu</p>
<button id="elem">Right-click for the button menu (fixed with event.stopPropagation)</button>

<script>
  elem.oncontextmenu = function(event) {
    event.preventDefault();
*!*
    event.stopPropagation();
*/!*
    alert("Button context menu");
  };

  document.oncontextmenu = function(event) {
    event.preventDefault();
    alert("Document context menu");
  };
</script>
```

الآن تعمل قائمة مستوى الزر على النحو المطلوب. لكن تكلفة ذلك عالية. نحن نرفض إلى الأبد الوصول إلى معلومات حول النقرات الصحيحة لأي رمز خارجي ، بما في ذلك العدادات التي تجمع الإحصاءات وما إلى ذلك. هذا أمر غير حكيم.

الحل البديل هو التحقق من معالج `المستند` . إذا ما تم منع الإجراء الافتراضي؟ إذا كان كذلك إذاً فقد تم العامل مع الحدث ولسنا بحاجة للرد عليه.


```html autorun height=80 no-beautify run
<p>Right-click for the document menu (added a check for event.defaultPrevented)</p>
<button id="elem">Right-click for the button menu</button>

<script>
  elem.oncontextmenu = function(event) {
    event.preventDefault();
    alert("Button context menu");
  };

  document.oncontextmenu = function(event) {
*!*
    if (event.defaultPrevented) return;
*/!*

    event.preventDefault();
    alert("Document context menu");
  };
</script>
```

والآن كل شيئ يعمل بشكل صحيح. إذاكان لدينا عناصر متداخلة nested elements، ولكل منهم قائمة سياق خاصة به، فذلك سوف يعمل أيضاً. فقط تأكد من التحقق من `event.defaultPrevented` في كل معالج `contextmenu`.

```smart header="event.stopPropagation() and event.preventDefault()"
كما نرى بوضوح، `event.stopPropagation()` و `event.preventDefault()` (المعروف أيضاً ب `return false`) هما شيئان مختلفان. لا يرتبطان ببعضهما البعض.
```

```smart header="Nested context menus architecture"
هناك أيضاً طرق بديلة لتنفيذ قوائم السياق المتداخلة nested context menus. واحدة منه هو أن يكون لديك كائن واحد معالج ل `document.oncontextmenu`، وطرق أخرى تسمح لا بتخزين معالجات handlers أخرى فيه.

سوف يلتقط الكائن أي نقرة بزر الماوس الأيمن ، وينظر خلال المعالجات المخزنة ويقوم بتشغيل المعالج المناسب.

ولكن فيما بعد، يجب أن يعرف كل جزء من الكود -والذي يريد قائمة سياق- عن هذا الكائن وأن يستخدم مساعدته بدلاً من معالج قائمة السياق  `contextmenu`.
```

## الملخص

:هناك العديد من إجراءات المتصفح الافتراضية

- `mousedown` -- يبدأ التحديد (حرك الماوس للتحديد).
- `click` على `<input type="checkbox">` -- يختار/يزيل اختيار `input`.
- `submit` -- النقر على `<input type="submit">` أو ضغط مفتاح `key:Enter` داخل حقل النموذج يتسبب في حدوث هذا الحدث ، ويقوم المتصفح بإرسال النموذج بعده.
- `keydown` -- قد يؤدي الضغط على مفتاح إلى إضافة حرف إلى حقل أو إجراءات أخرى.
- `contextmenu` -- يحدث الحدث عند النقر بزر الماوس الأيمن ، يتمثل الإجراء في إظهار قائمة سياق المتصفح.
- ...وهناك أكثر...

يمكن منع جميع الإجراءات الافتراضية إذا أردنا التعامل مع الحدث حصريًا بواسطةالجافا اسكريبت.

لمنع حدوث إجراء افتراضي -- استخدم إما `event.preventDefault()` أو  `return false`. الطريق الثانية عمل فقط مع المعالجات المعنية ب `on<event>`.

خيار `passive: true` الخاص ب `addEventListener` يخبر المتصفح أنه لن يتم منع الإجراء. وهذا مفيد لبعض الأحداث في الهواتف المحمولة، مثل `touchstart` و `touchmove`، لإخبار المتصفح بأنه يجب ألا ينتظر حتى تنتهي جميع المعالجات قبل التمرير scrolling.

إذا تم منع لحدث الافتراضي، فإن قيمة `event.defaultPrevented` تصبح `true`، وإلا فهي تكون `false`.

```warn header="ابق على الدلالات ولا تسئ الاستخدام"
من الناحية الفنية، بمنع الإجرائات الافتراضية وإضافة الجافا اسكريبت نستطيع تعديل سلوك أي عنصر.مثلاً، يمكننا أن نجعل الرابط `<a>` يعمل مثل الزر، ونجعل الزر `<button>` يتصرف مثل الرابط (يعيد توجيهنا إلى عنوان آخر أو نحو ذلك).

لكن يجب علينا عمومًا الاحتفاظ بالمعنى الدلالي لعناصر HTML. على سبيل المثال ، يجب أن يقوم `<a>`  بالتنقل ، وليس الزر.

بالإضافة إلى كون ذلك "مجرد شيء جيد" ، فهذا يجعل HTML الخاص بك أفضل من حيث إمكانية الوصول.

وأيضاً إذا أخذنا في الاعتبار المثال الخاص ب `<a>`، إذاً يرجى ملاحظة: أن المتصفح يسمح لنا بفتح مثل هذه الروابط في نوافذ أخرى (عن طريق النقر بزر الماوس الأيمن عليها وغيرها من الوسائل). والناس ااعتادت ذلك وتحب هذه الطريقة. ولكن إذا جعلنا زرًا يتصرف كرابط باستخدام الجافا اسكريبت وحتى بدا وكأنه رابط باستخدام CSS ، فلن تعمل ميزات المتصفح المحددة `<a>` من أجله.
```
