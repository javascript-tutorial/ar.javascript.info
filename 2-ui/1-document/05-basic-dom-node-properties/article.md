# خصائص العقدة: النوع والعلامة والمحتويات

دعنا نلقي نظرة أكثر تعمقًا على عقد DOM.

في هذا الفصل ، سنرى المزيد عن ماهيتها ونتعلم خصائصها الأكثر استخدامًا.

## فئات عقدة DOM

قد تحتوي عقد DOM المختلفة على خصائص مختلفة. على سبيل المثال ، عقدة عنصر مقابلة للعلامة `<a>` لها خصائص مرتبطة بالارتباط ، والعقدة المقابلة لـ `<input>` لها خصائص تتعلق بالإدخال وما إلى ذلك. العقد النصية ليست مثل عقد العنصر. ولكن هناك أيضًا خصائص وطرق مشتركة بينها ، لأن جميع فئات عقد DOM تشكل تسلسلًا هرميًا واحدًا.

تنتمي كل عقدة DOM إلى الفئة المضمنة المقابلة.

جذر التسلسل الهرمي هو [EventTarget] (https://dom.spec.whatwg.org/#eventtarget) ، الموروث بواسطة [Node] (http://dom.spec.whatwg.org/#interface-node ) ، وترث العقد الأخرى منه.

هذه هي الصورة والتفسيرات التي يجب اتباعها:

![](dom-class-hierarchy.svg)

الclasses هي:

- [EventTarget] (https://dom.spec.whatwg.org/#eventtarget) - هي فئة الجذر "المجردة". لا يتم إنشاء كائنات هذه الفئة أبدًا. إنه بمثابة قاعدة ، بحيث تدعم جميع عقد DOM ما يسمى "الأحداث" ، وسندرسها لاحقًا.
- [Node] (http://dom.spec.whatwg.org/#interface-node) - هي أيضًا فئة "مجردة" ، تعمل كقاعدة لعقد DOM. يوفر وظائف الشجرة الأساسية: `motherNode` و` nextSibling` و` childNodes` وما إلى ذلك (فهي عبارة عن حروف). لا يتم إنشاء كائنات فئة "العقدة" مطلقًا. ولكن هناك فئات عقدة محددة ترث منه ، وهي: `Text` للعقد النصية و` Element` لعقد العناصر والمزيد من الأنواع الغريبة مثل `Comment` لعقد التعليق.
- [Element] (http://dom.spec.whatwg.org/#interface-element) - هي فئة أساسية لعناصر DOM. يوفر التنقل على مستوى العنصر مثل `nextElementSibling` و` children` وطرق البحث مثل `getElementsByTagName` و` querySelector`. لا يدعم المتصفح HTML فحسب ، بل يدعم أيضًا XML و SVG. تعمل فئة `Element` كقاعدة لفئات أكثر تحديدًا:` SVGElement` و `XMLElement` و` HTMLElement`.
- [HTMLElement] (https://html.spec.whatwg.org/multipage/dom.html#htmlelement) - أخيرًا هو الفصل الأساسي لجميع عناصر HTML. يتم توريثه بواسطة عناصر HTML محددة:
    - [HTMLInputElement] (https://html.spec.whatwg.org/multipage/forms.html#htmlinputelement) - فئة عناصر `<input>` ،
    - [HTMLBodyElement] (https://html.spec.whatwg.org/multipage/semantics.html#htmlbodyelement) - فئة عناصر `<body>` ،
    - [HTMLAnchorElement] (https://html.spec.whatwg.org/multipage/semantics.html#htmlanchorelement) - فئة عناصر "<a>` ،
    - ... وهكذا ، كل علامة لها فئة خاصة بها قد توفر خصائص وأساليب معينة.

لذلك ، فإن المجموعة الكاملة من الخصائص والأساليب لعقدة معينة تأتي نتيجة الميراث.

على سبيل المثال ، لنفكر في كائن DOM لعنصر `<input>`. وهي تنتمي إلى فئة [HTMLInputElement] (https://html.spec.whatwg.org/multipage/forms.html#htmlinputelement).

يحصل على خصائص وأساليب تراكب (مدرج في ترتيب الميراث):

- "HTMLInputElement" - توفر هذه الفئة خصائص خاصة بالإدخال ،
- `HTMLElement` - يوفر طرق عنصر HTML الشائعة (والرسائل / المحددات) ،
- "العنصر" - يوفر طرق العناصر العامة ،
- `العقدة` - توفر خصائص عقدة DOM الشائعة ،
- `EventTarget` - يقدم الدعم للأحداث (التي سيتم تغطيتها) ،
- ... وأخيرًا يرث من `Object` ، لذلك تتوفر أيضًا طرق" الكائن العادي "مثل` hasOwnProperty`.

لرؤية اسم فئة عقدة DOM ، يمكننا أن نتذكر أن الكائن عادة ما يكون له خاصية `المنشئ`. وهي تشير إلى مُنشئ الصنف ، و `buildor.name` هو اسمه:

```js run
alert( document.body.constructor.name ); // HTMLBodyElement
```

...Or we can just `toString` it:

```js run
alert( document.body ); // [object HTMLBodyElement]
```

We also can use `instanceof` to check the inheritance:

```js run
alert( document.body instanceof HTMLBodyElement ); // true
alert( document.body instanceof HTMLElement ); // true
alert( document.body instanceof Element ); // true
alert( document.body instanceof Node ); // true
alert( document.body instanceof EventTarget ); // true
```

كما نرى ، فإن عقد DOM هي كائنات JavaScript عادية. يستخدمون الفصول القائمة على النموذج الأولي للميراث.

من السهل أيضًا رؤية ذلك عن طريق إخراج عنصر باستخدام "console.dir (elem)" في المستعرض. هناك في وحدة التحكم يمكنك مشاهدة `HTMLElement.prototype` و` Element.prototype` وما إلى ذلك.

"` `smart header =" `` console.dir (elem) `مقابل` console.log (elem) ""
تدعم معظم المتصفحات أمرين في أدوات المطورين الخاصة بهم: `console.log` و` console.dir`. يخرجون حججهم إلى وحدة التحكم. بالنسبة لكائنات JavaScript ، تقوم هذه الأوامر بنفس الشيء.

ولكن بالنسبة لعناصر DOM فهي مختلفة:

- يُظهر `console.log (elem)` عنصر شجرة DOM.
- يُظهر `console.dir (elem)` العنصر كعنصر DOM ، جيد لاستكشاف خصائصه.

جربه على `document.body`.
```

````smart header="IDL in the spec"
في المواصفات ، لا يتم وصف فئات DOM باستخدام JavaScript ، ولكن [لغة وصف واجهة خاصة] (https://en.wikipedia.org/wiki/Interface_description_language) (IDL) ، يسهل فهمها عادةً.

في IDL ، يتم إلحاق جميع الخصائص بأنواعها. على سبيل المثال ، "DOMString" و "boolean" وما إلى ذلك.

إليك مقتطف منه ، مع التعليقات:

```js
// تعريف HTMLInputElement
*! *
// النقطتين ":" تعني أن HTMLInputElement يرث من HTMLElement
* /! *
واجهة HTMLInputElement: HTMLElement {
   // here انتقل إلى خصائص وأساليب عناصر <input>

*! *
   // "DOMString" يعني أن قيمة الخاصية هي سلسلة
* /! *
   السمة DOMString تقبل ؛
   سمة DOMString alt ؛
   سمة الإكمال التلقائي لـ DOMString ؛
   قيمة DOMString ؛

*! *
   // خاصية القيمة المنطقية (صواب / خطأ)
   خاصية التركيز التلقائي المنطقي ؛
* /! *
   ...
*! *
   // now the method: يعني "void" أن الطريقة لا تُرجع أي قيمة
*/!*
  void select();
  ...
}
```
````

## خاصية "nodeType"

توفر خاصية `nodeType` طريقة أخرى" قديمة الطراز "للحصول على" نوع "عقدة DOM.

لها قيمة رقمية:
- `elem.nodeType == 1` لعقد العناصر ،
- `elem.nodeType == 3` للعقد النصية ،
- `elem.nodeType == 9` لكائن المستند ،
- هناك عدد قليل من القيم الأخرى في [المواصفات] (https://dom.spec.whatwg.org/#node).

على سبيل المثال:

```html run
<body>
  <script>  
  let elem = document.body;

  // let's examine what it is?
  alert(elem.nodeType); // 1 => element

  // and the first child is...
  alert(elem.firstChild.nodeType); // 3 => text

  // for the document object, the type is 9
  alert( document.nodeType ); // 9
  </script>
</body>
```

في النصوص الحديثة ، يمكننا استخدام "مثيل" والاختبارات الأخرى القائمة على الفصل لرؤية نوع العقدة ، ولكن في بعض الأحيان قد يكون "نوع العقدة" أبسط. يمكننا فقط قراءة `nodeType` ، وليس تغييره.

## العلامة: nodeName و tagName

بالنظر إلى عقدة DOM ، يمكننا قراءة اسم علامتها من خصائص `nodeName` أو` tagName`:

على سبيل المثال:

تشغيل شبيبة
تنبيه (document.body.nodeName) ؛ // الجسم
تنبيه (document.body.tagName) ؛ // الجسم
``

هل هناك فرق بين `tagName` و` nodeName`؟

بالتأكيد ، ينعكس الفرق في أسمائهم ، لكنه في الواقع خفي قليلاً.

- خاصية `tagName` موجودة فقط لعقد` العنصر`.
- يُعرّف "nodeName" لأي "عقدة":
    - للعناصر يعني نفس "tagName".
    - لأنواع العقد الأخرى (نص ، تعليق ، إلخ.) تحتوي على سلسلة بنوع العقدة.

بمعنى آخر ، لا يتم دعم `tagName` إلا بعقد العناصر (لأنها تنشأ من فئة` Element`) ، بينما يمكن لـ `nodeName` أن يقول شيئًا عن أنواع العقد الأخرى.

على سبيل المثال ، دعنا نقارن `tagName` و` nodeName` لـ `المستند` وعقدة التعليق:

```html run
<body><!-- comment -->

  <script>
    // for comment
    alert( document.body.firstChild.tagName ); // undefined (not an element)
    alert( document.body.firstChild.nodeName ); // #comment

    // for document
    alert( document.tagName ); // undefined (not an element)
    alert( document.nodeName ); // #document
  </script>
</body>
```

إذا تعاملنا فقط مع العناصر ، فيمكننا استخدام كل من "tagName" و "nodeName" - فلا فرق.

"` `عنوان مختصر وذكي=" اسم العلامة دائمًا ما يكون بحروف كبيرة إلا في وضع XML "
يحتوي المتصفح على وضعين لمعالجة المستندات: HTML و XML. عادة ما يتم استخدام وضع HTML لصفحات الويب. يتم تمكين وضع XML عندما يتلقى المتصفح مستند XML مع الرأس: `Content-Type: application / xml + xhtml`.

في وضع HTML ، يتم دائمًا تمييز "tagName / nodeName" بأحرف كبيرة: إنه `BODY` إما لـ` <body> `أو` <BoDy> `.

في وضع XML يتم الاحتفاظ بالحالة "كما هي". في الوقت الحاضر نادرا ما يستخدم وضع XML.
``


## innerHTML: المحتويات

تتيح خاصية [innerHTML] (https://w3c.github.io/DOM-Parsing/#widl-Element-innerHTML) الحصول على HTML داخل العنصر كسلسلة.

يمكننا أيضًا تعديله. لذا فهي واحدة من أقوى الطرق لتغيير الصفحة.

يوضح المثال محتويات `document.body` ثم يستبدلها بالكامل:

```html run
<body>
  <p>A paragraph</p>
  <div>A div</div>

  <script>
    alert( document.body.innerHTML ); // read the current contents
    document.body.innerHTML = 'The new BODY!'; // replace it
  </script>

</body>
```

يمكننا محاولة إدراج HTML غير صالح ، سيقوم المتصفح بإصلاح أخطاءنا:

```html run
<body>

  <script>
    document.body.innerHTML = '<b>test'; // forgot to close the tag
    alert( document.body.innerHTML ); // <b>test</b> (fixed)
  </script>

</body>
```

```عنوان مختصر= "البرامج النصية لا تنفذ"
إذا أدرج `innerHTML` علامة` <script> `في المستند - يصبح جزءًا من HTML ، ولكن لا يتم تنفيذه.
```

### احذر: "innerHTML + =" يقوم باستبدال كامل

يمكننا إلحاق HTML بعنصر باستخدام `elem.innerHTML + =" more html "`.

مثله:

```js
chatDiv.innerHTML += "<div>Hello<img src='smile.gif'/> !</div>";
chatDiv.innerHTML += "How goes?";
```

ولكن يجب أن نكون حذرين للغاية بشأن القيام بذلك ، لأن ما يحدث هو * ليس * إضافة ، ولكن استبدال كامل.

من الناحية الفنية ، يفعل هذان الخطان نفس الشيء:

```js
elem.innerHTML += "...";
// is a shorter way to write:
*!*
elem.innerHTML = elem.innerHTML + "..."
*/!*
```

بمعنى آخر ، يقوم `innerHTML + =` بذلك:

1. تتم إزالة المحتويات القديمة.
2. بدلاً من ذلك ، يتم كتابة "innerHTML" الجديد (سلسلة من القديم والجديد).

** نظرًا لأن المحتوى "خالي من أي شيء" وأعيد كتابته من البداية ، فسيتم إعادة تحميل جميع الصور والموارد الأخرى **.

في مثال `chatDiv` أعلى السطر` chatDiv.innerHTML + = "كيف الحال؟" `` يعيد إنشاء محتوى HTML ويعيد تحميل `smile.gif` (آمل أن يتم تخزينه مؤقتًا). إذا كان `chatDiv` يحتوي على الكثير من النصوص والصور الأخرى ، فإن إعادة التحميل تصبح مرئية بوضوح.

هناك آثار جانبية أخرى أيضًا. على سبيل المثال ، إذا تم تحديد النص الحالي بالماوس ، فإن معظم المتصفحات ستزيل التحديد عند إعادة كتابة `innerHTML`. وإذا كان هناك "<input>" مع نص أدخله الزائر ، فسيتم إزالة النص. وما إلى ذلك وهلم جرا.

لحسن الحظ ، هناك طرق أخرى لإضافة HTML إلى جانب "innerHTML" ، وسندرسها قريبًا.

## outerHTML: HTML الكامل للعنصر

تحتوي الخاصية `outerHTML` على HTML الكامل للعنصر. هذا مثل `innerHTML` بالإضافة إلى العنصر نفسه.

إليك مثال:

```html run
<div id="elem">Hello <b>World</b></div>

<script>
  alert(elem.outerHTML); // <div id="elem">Hello <b>World</b></div>
</script>
```

** احذر: على عكس "innerHTML" ، لا تؤدي الكتابة إلى "outerHTML" إلى تغيير العنصر. بدلاً من ذلك ، يتم استبداله في DOM. **

نعم ، يبدو غريبًا ، وغريبًا ، لهذا السبب نقوم بعمل ملاحظة منفصلة عنه هنا. إلق نظرة.

تأمل في المثال:

```html run
<div>Hello, world!</div>

<script>
  let div = document.querySelector('div');

*!*
  // replace div.outerHTML with <p>...</p>
*/!*
  div.outerHTML = '<p>A new element</p>'; // (*)

*!*
  // Wow! 'div' is still the same!
*/!*
  alert(div.outerHTML); // <div>Hello, world!</div> (**)
</script>
```

تبدو غريبة حقا ، أليس كذلك؟

في السطر `(*)` استبدلنا `div` بـ` <p> عنصر جديد </ p> `. في المستند الخارجي (DOM) ، يمكننا رؤية المحتوى الجديد بدلاً من `<div>`. ولكن ، كما نرى في السطر `(**)` ، لم تتغير قيمة متغير `div` القديم!

لا يقوم تعديل "outerHTML" بتعديل عنصر DOM (الكائن المشار إليه ، في هذه الحالة ، المتغير 'div') ، ولكنه يزيله من DOM ويدرج HTML الجديد في مكانه.

ما حدث في `div.outerHTML = ...` هو:
- تمت إزالة `div` من المستند.
- تم إدراج جزء آخر من HTML "<p> عنصر جديد </ p>" في مكانه.
- `div` لا تزال لها قيمتها القديمة. لم يتم حفظ HTML الجديد في أي متغير.

من السهل جدًا ارتكاب خطأ هنا: قم بتعديل `div.outerHTML` ثم تابع العمل مع` div` كما لو كان به محتوى جديد فيه. لكنها لا تفعل ذلك. هذا الشيء صحيح بالنسبة لـ "innerHTML" ، ولكن ليس لـ "outerHTML".

يمكننا الكتابة إلى "elem.outerHTML" ، ولكن يجب أن نضع في اعتبارنا أنه لا يغير العنصر الذي نكتب إليه ("elem"). بدلاً من ذلك ، تضع HTML الجديد في مكانه. يمكننا الحصول على مراجع للعناصر الجديدة عن طريق الاستعلام عن DOM.

## nodeValue / data: محتوى عقدة النص

خاصية `innerHTML` صالحة لعقد العناصر فقط.

أنواع العقد الأخرى ، مثل العقد النصية ، لها نظيرها: خصائص `nodeValue` و` data`. هذان النوعان متشابهان تقريبًا للاستخدام العملي ، ولا توجد سوى اختلافات طفيفة في المواصفات. لذا سنستخدم "البيانات" لأنها أقصر.

مثال على قراءة محتوى العقدة النصية والتعليق:

```html run height="50"
<body>
  Hello
  <!-- Comment -->
  <script>
    let text = document.body.firstChild;
*!*
    alert(text.data); // Hello
*/!*

    let comment = text.nextSibling;
*!*
    alert(comment.data); // Comment
*/!*
  </script>
</body>
```

بالنسبة للعقد النصية ، يمكننا تخيل سبب لقراءتها أو تعديلها ، ولكن لماذا التعليقات؟

في بعض الأحيان يقوم المطورون بتضمين معلومات أو تعليمات قالب في HTML ، مثل هذا:

```html
<!-- if isAdmin -->
  <div>Welcome, Admin!</div>
<!-- /if -->
```

... ثم يمكن لجافا سكريبت قراءته من خاصية `البيانات` ومعالجة التعليمات المضمنة.

## textContent: نص خالص

يوفر `textContent` الوصول إلى * text * داخل العنصر: النص فقط ، ناقص جميع` <tags> `.

على سبيل المثال:

```html run
<div id="news">
  <h1>Headline!</h1>
  <p>Martians attack people!</p>
</div>

<script>
  // Headline! Martians attack people!
  alert(news.textContent);
</script>
```

كما نرى ، يتم إرجاع النص فقط ، كما لو تم قطع جميع `<tags>` ، لكن النص فيها بقي.

من الناحية العملية ، نادرًا ما تكون هناك حاجة لقراءة مثل هذا النص.

** تعد الكتابة إلى "textContent" أكثر فائدة لأنها تتيح لك كتابة النص "بطريقة آمنة". **

لنفترض أن لدينا سلسلة عشوائية ، على سبيل المثال تم إدخالها من قبل مستخدم ، ونريد إظهارها.

- باستخدام "innerHTML" ، سنقوم بإدراج "كـ HTML" ، مع كافة علامات HTML.
- مع "textContent" سنقوم بإدراج "كنص" ، يتم التعامل مع جميع الرموز حرفياً.

قارن بين الاثنين:

```html run
<div id="elem1"></div>
<div id="elem2"></div>

<script>
  let name = prompt("What's your name?", "<b>Winnie-the-pooh!</b>");

  elem1.innerHTML = name;
  elem2.textContent = name;
</script>
```

1. يحصل الاسم الأول "<div>" على الاسم "بتنسيق HTML": تصبح جميع العلامات علامات ، لذلك نرى الاسم الغامق.
2. الثانية `<div>` تحصل على الاسم "كنص" ، لذلك نرى حرفياً "<b> Winnie-the-pooh! </b>`.

في معظم الحالات ، نتوقع النص من مستخدم ونريد معاملته كنص. لا نريد HTML غير متوقع في موقعنا. يؤدي التعيين إلى `textContent` ذلك بالضبط.

## خاصية "مخفية"

تحدد السمة "مخفي" وخاصية DOM ما إذا كان العنصر مرئيًا أم لا.

يمكننا استخدامه في HTML أو تخصيصه باستخدام JavaScript ، مثل هذا:

```html run height="80"
<div>Both divs below are hidden</div>

<div hidden>With the attribute "hidden"</div>

<div id="elem">JavaScript assigned the property "hidden"</div>

<script>
  elem.hidden = true;
</script>
```

من الناحية الفنية ، يعمل `المخفي` تمامًا مثل` style = "display: none" `. لكنها أقصر في الكتابة.

إليك عنصر وامض:

```html run height=50
<div id="elem">A blinking element</div>

<script>
  setInterval(() => elem.hidden = !elem.hidden, 1000);
</script>
```

## المزيد من الخصائص

تحتوي عناصر DOM أيضًا على خصائص إضافية ، لا سيما تلك التي تعتمد على الفئة:

- `القيمة` - قيمة` <input> `و` <select> `و` <textarea>` (`HTMLInputElement`،` HTMLSelectElement` ...).
- `href` -" href "لـ` <a href="..."> `(` HTMLAnchorElement`).
- `id` - قيمة السمة" id "، لجميع العناصر (` HTMLElement`).
- ...وأكثر بكثير...

على سبيل المثال:

```html run height="80"
<input type="text" id="elem" value="value">

<script>
  alert(elem.type); // "text"
  alert(elem.id); // "elem"
  alert(elem.value); // value
</script>
```

معظم سمات HTML القياسية لها خاصية DOM المقابلة ، ويمكننا الوصول إليها بهذه الطريقة.

إذا أردنا معرفة القائمة الكاملة للخصائص المدعومة لفئة معينة ، فيمكننا العثور عليها في المواصفات. على سبيل المثال ، يتم توثيق `HTMLInputElement` على <https://html.spec.whatwg.org/#htmlinputelement>.

أو إذا كنا نرغب في الحصول عليهم بسرعة أو مهتمون بمواصفات متصفح محددة - يمكننا دائمًا إخراج العنصر باستخدام `console.dir (elem)` وقراءة الخصائص. أو استكشف "خصائص DOM" في علامة التبويب "العناصر" في أدوات مطور المتصفح.

## ملخص

تنتمي كل عقدة DOM إلى فئة معينة. تشكل الفصول هرمية. مجموعة كاملة من الخصائص والأساليب تأتي نتيجة الميراث.

خصائص عقدة DOM الرئيسية هي:

`nodeType`
: يمكننا استخدامه لمعرفة ما إذا كانت العقدة عبارة عن نص أو عقدة عنصر. يحتوي على قيمة رقمية: `1` للعناصر ،` 3` للعقد النصية ، وبعض العناصر الأخرى لأنواع العقد الأخرى. يقرأ فقط.

`nodeName / tagName`
: للعناصر ، اسم العلامة (أحرف كبيرة ما لم يكن وضع XML). بالنسبة إلى العقد غير العنصر ، يصف `nodeName` ما هو. يقرأ فقط.

`innerHTML`
: محتوى HTML للعنصر. يمكن تعديله.

`outerHTML`
: HTML الكامل للعنصر. لا تلمس عملية الكتابة في `elem.outerHTML`` elem` نفسها. بدلاً من ذلك ، يتم استبداله بـ HTML الجديد في السياق الخارجي.

`nodeValue / data`
: محتوى عقدة غير عنصر (نص ، تعليق). هذان النوعان متشابهان تقريبًا ، وعادة ما نستخدم `البيانات '. يمكن تعديله.

`textContent`
: النص الموجود داخل العنصر: HTML ناقص جميع `<tags>`. تؤدي الكتابة فيه إلى وضع النص داخل العنصر ، مع معاملة جميع الأحرف والعلامات الخاصة كنص. يمكن إدراج النص الذي ينشئه المستخدم بأمان والحماية من إدخالات HTML غير المرغوب فيها.

"مخفي"
: عند التعيين على "true" ، يتم عرض CSS `display: none`.

تحتوي عقد DOM أيضًا على خصائص أخرى بناءً على فئتها. على سبيل المثال ، عناصر `<input>` (`HTMLInputElement`) تدعم` القيمة` ، `النوع` ، في حين أن` <a> العناصر (`HTMLAnchorElement`) تدعم` href` إلخ. معظم سمات HTML القياسية لها خاصية DOM مقابلة .

ومع ذلك ، فإن خصائص HTML وخصائص DOM ليست هي نفسها دائمًا ، كما سنرى في الفصل التالي.
