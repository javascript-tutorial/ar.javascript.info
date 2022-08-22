# التدفق و الإلتقاط

لنبدأ بمثال.

تم تعيين هذا المعالج إلى `<div>`, ولكن يتم تشغيله أيضاً إذا نقرت فوق أي علامة متداخلة مثل `<em>` أو `<code>`:

```html autorun height=60
<div onclick="alert('المعالج!')">
  <em> <code>DIV</code> فانه يتم تشغيل المعالج علي. <code>EM</code>اذا نقرت علي,</em>
</div>
```

أليس هذا غريباً بعض الشيء؟ لماذا يقوم المعالج بالتشغيل علي `<div>` إذا كانت النقرت الفعلية علي `<em>`?

## التدفق

إن مبدأ التدفق بسيط.

**عندما يحدث حدث على عنصر، فإنه يقوم أولاً بتشغيل المعالجات عليه، ثم على والده، ثم على طول الطريق إلى أعلى على أسلافه الآخرين.**

لنفترض أن لدينا 3 عناصر متداخلة `FORM > DIV > P` مع معالج على كل منها:

```html run autorun
<style>
  body * {
    margin: 10px;
    border: 1px solid blue;
  }
</style>

<form onclick="alert('form')">
  FORM
  <div onclick="alert('div')">
    DIV
    <p onclick="alert('p')">P</p>
  </div>
</form>
```

بالنقر فوق `<p>` الداخلي يتم التشغيل لأول `onclick`:

1. على ذلك ال `<p>`.
2. ثم على الخارجي `<div>`.
3. ثم على الخارجي `<form>`.
4. وهكذا إلى أعلى حتى `document` كائن.

![](event-order-bubbling.svg)

لذا، إذا نقرت فوق `<p>`, سنرى بعد ذلك 3 تنبيهات: `p` -> `div` -> `form`.

تسمى العملية "التدفق", لأن الأحداث "تدفق" من العنصر الداخلي إلى أعلى إلى الآباء مثل فقاعة في الماء.

```warn header="*تقريبا* كل الأحداث تتدفق."
الكلمة الأساسية في هذه العبارة هي "تقريبا".

فعلى سبيل المثال, الحدث `focus`  لا يتدفق. وهناك أمثلة أخرى أيضاً، سوف نلتقي بها. ولكن ما زال هذا يشكل استثناءً وليس قاعدة، حيث أن أغلب الأحداث لا تزال تتدفق.
```

## event.target

يمكن أن يحصل المعالج الموجود على العنصر الأصل دائمًا على التفاصيل حول المكان الذي حدث فيه بالفعل.

**ويسمى العنصر الأكثر تداخلا والذي تسبب في الحدث العنصر _الاساسي_ , الذي يمكن الوصول إليه كـ `event.target`.**

لاحظ الاختلافات من `this` (=`event.currentTarget`):

- `event.target` -- هو عنصر "الهدف" الذي بدأ الحدث، ولا يتغير من خلال عملية التدفق.
- `this` -- هو العنصر "الحالي"، العنصر الذي يحتوي على معالج قيد التشغيل حاليًا.

فعلى سبيل المثال, إذا كان لدينا معالج واحد `form.onclick`, ثم يمكن "الامساك" بكل النقرات داخل form. بغض النظر عن مكان حدوث النقر, سوف تدفق لأعلى `<form>` ويتم تشغيل المعالج.

في معالج `form.onclick` :

- `this` (=`event.currentTarget`) هي العنصر `<form>` , لأن المعالج يعمل عليه.
- `event.target` العنصر الفعلي داخل النموذج الذي تم النقر فوقه.

تحقق من ذلك:

[codetabs height=220 src="bubble-target"]

من المحتمل أن `event.target` يمكن أن يساوي `this` -- يحدث ذلك عندما يتم إجراء النقر مباشرة على العنصر `<form>` .

## إيقاف التدفق

يستمر تدفق الحدث من العنصر المستهدف إلى الأعلى مباشرة. عادة ما ينتقل إلى أعلى حتى `<html>`, وبعد ذلك إلى الكائن `document` , بل إن بعض الأحداث قد تصل إلى حد بعيد `window`, وتقوم باستدعاء كافة المعالجات على المسار.

ولكن أي معالج قد يقرر أن الحدث قد تم تجهيزه بالكامل وأن يوقف التدفق.

الدالة لذلك هي `()event.stopPropagation` .

فعلى سبيل المثال,هنا `body.onclick` لا يعمل إذا نقرت فوق `<button>`:

```html run autorun height=60
<body onclick="alert(`the bubbling doesn't reach here`)">
  <button onclick="event.stopPropagation()">انقر علي</button>
</body>
```

```smart header="()event.stopImmediatePropagation"
إذا كان هناك عنصر لديه العديد من معالجات الأحداث على حدث واحد، ثم حتى إذا توقف أحدهم عن تنفيذ التدفق، فإن العناصر الأخرى لا تزال  تنفذ التدفق.

وبعبارة أخرى, `()event.stopPropagation` توقف الحركة لأعلى, ولكن على العنصر الحالي فإن كل المعالجات الأخرى سوف تعمل.

لإيقاف تشغيل التدفق ومنع المعالجات الموجودة على العنصر الحالي من التشغيل, هناك دالة `()event.stopImmediatePropagation`. بعد ذلك لن تقوم أي معالجات أخرى بالتنفيذ.
```

```warn header="لا توقف التدفق دون الحاجة إلي ذلك!"
التدفق مناسب. لا توقف ذلك دون حاجة حقيقية: فكر وقم بالادارة بوضوح .

أحيانا `()event.stopPropagation` ينشئ مخاطر مخفية قد تصبح مشاكل في وقت لاحق.

على سبيل المثال:

1. نحن ننشئ قائمة متداخلة. تعالج كل قائمة فرعية النقرات على العناصر وتنادي علي `stopPropagation` وبذلك  لا يتم تشغيل القائمة الخارجية.
2. وفي وقت لاحق قررنا التقاط النقرات على النافذة بالكامل, لتعقب سلوك المستخدمين (حيث يقوم الأشخاص بالنقر). والواقع أن بعض الأنظمة التحليلية تفعل ذلك. عادة الكود المستخدم هو `document.addEventListener('click'…)` لالتقاط كل النقرات.
3. لن يعمل التحليل لدينا في المنطقة التي تتوقف فيها النقرات بواسطة `stopPropagation`. للأسف، قد وصلنا الي "منطقة ميتة".

لا توجد حاجة حقيقية عادة لمنع حدوث التدفق .فالمهمة تبدو وكأنها تتطلب حل هذه المشكلة بوسائل أخرى. ومن بين هذه الأحداث استخدام أحداث مخصصة,سنتناولها لاحقًا. كما يمكننا كتابة بياناتنا في كائن  `event`  في معالج واحد وقراءته في معالج آخر, حتى نتمكن من تمرير معلومات إلى المدعين حول معالجة المعلومات أدناه.
```

## الإلتقاط

هناك مرحلة أخرى من معالجة الأحداث تسمى "الإلتقاط". ونادرًا ما يتم استخدامها في الكود, ولكن قد يكون مفيداً في بعض الأحيان.

معيار[DOM Events](http://www.w3.org/TR/DOM-Level-3-Events/) يصف ثلاث مراحل من نشر الحدث:

1. مرحلة الالتقاط-- ينتقل الحدث إلى اسفل ليصل الي العنصر.
2. مرحلة الهدف -- يصل الحدث إلى العنصر المستهدف.
3. مرحلة التدفق -- يتدفق الحدث لأعلي من العنصر.

<<<<<<< HEAD
إليك صورة النقر فوق `<td>` داخل جدول، مأخوذ من المواصفات:
=======
Here's the picture, taken from the specification, of the capturing `(1)`, target `(2)` and bubbling `(3)` phases for a click event on a `<td>` inside a table:
>>>>>>> 1edb0a38330b54d2e1916f5193fc043e6fbbea78

![](eventflow.svg)

وهذا هو: بالنقر فوق `<td>` يمر الحدث أولاً عبر سلسلة الأجداد نزولاً إلى العنصر (مرحلة الالتقاط), ثم تصل إلى الهدف وتتسبب في تشغيل ذلك الهدف (مرحلة الهدف), ثم يرتفع لأعلي (مرحلة التدفق), مناديا للمعالجين في طريقه.

<<<<<<< HEAD
**قبل أن نتحدث عن التدفق فقط، لأن مرحلة الالتقاط نادراً ما تستخدم. عادة ما تكون غير مرئية بالنسبة لنا.**

تمت إضافة معالجات باستخدام خاصية `on<event>`-او باستخدام خواص HTML او باستخدام two-argument `addEventListener(event, handler)` لا تعرف أي شيء عن الالتقاط, وهي تعمل فقط على المرحلتين الثانية والثالثة.
=======
Until now, we only talked about bubbling, because the capturing phase is rarely used.

In fact, the capturing phase was invisible for us, because handlers added using `on<event>`-property or using HTML attributes or using two-argument `addEventListener(event, handler)` don't know anything about capturing, they only run on the 2nd and 3rd phases.
>>>>>>> 1edb0a38330b54d2e1916f5193fc043e6fbbea78

لالتقاط حدث في مرحلة الالتقاط, يجب أن نضبط اختيار المعالج `capture` الي `true`:

```js
elem.addEventListener(..., {capture: true})
<<<<<<< HEAD
//  {capture: true} هو اسم مستعار لـ "true" أو فقط
=======

// or, just "true" is an alias to {capture: true}
>>>>>>> 1edb0a38330b54d2e1916f5193fc043e6fbbea78
elem.addEventListener(..., true)
```

توجد قيمتان محتملتان لـلاختيار `capture` :

- اذا كانت`false` (default),يتم ضبط المعالج على مرحلة التدفق.
- اذا كانت `true`, يتم ضبط المعالج على مرحلة الالتقاط.

لاحظ أنه على الرغم من وجود ثلاث مراحل رسمية, المرحلة الثانية ("مرحلة الهدف": وصول الحدث إلى العنصر) لا يتم التعامل معها بشكل منفصل: ومن ثم فإن المعالجات علي كلا من مرحلتي الالتقاط والتدفق يتم تشغيلها علي تلك المرحلة.

دعونا نرى كلاً من التدفق والالتقاط في اجراء ما:

```html run autorun height=140 edit
<style>
  body * {
    margin: 10px;
    border: 1px solid blue;
  }
</style>

<form>
  FORM
  <div>
    DIV
    <p>P</p>
  </div>
</form>

<script>
  for (let elem of document.querySelectorAll('*')) {
    elem.addEventListener('click', (e) => alert(`Capturing: ${elem.tagName}`), true);
    elem.addEventListener('click', (e) => alert(`Bubbling: ${elem.tagName}`));
  }
</script>
```

يقوم الكود بوضع معالجات النقر على _كل_ عنصر في المستند لمعرفة أي منها تعمل.

إذا نقرت على `<p>`, ثم يكون التسلسل:

<<<<<<< HEAD
1. `HTML` -> `BODY` -> `FORM` -> `DIV` (مرحلة الالتقاط, المستمع الأول):
2. `P` (مرحلة الهدف, يتم تشغيلها مرتين, كما وضعنا مستمعين: الالتقاط والتدفق)
3. `DIV` -> `FORM` -> `BODY` -> `HTML` (مرحلة التدفق, المستمع الثاني).
=======
1. `HTML` -> `BODY` -> `FORM` -> `DIV -> P` (capturing phase, the first listener):
2. `P` -> `DIV` -> `FORM` -> `BODY` -> `HTML` (bubbling phase, the second listener).

Please note, the `P` shows up twice, because we've set two listeners: capturing and bubbling. The target triggers at the end of the first and at the beginning of the second phase.
>>>>>>> 1edb0a38330b54d2e1916f5193fc043e6fbbea78

توجد خاصية`event.eventPhase` وهي تخبرنا بعدد المرحلة التي يتم فيها وقوع الحدث. ولكنها نادرًا ما يتم استخدامها، لأننا نعرفه عادةً في المعالج.

```smart header="لإزالة المعالج, `removeEventListener`يحتاج إلى المرحلة نفسها" اذا وضعنا`addEventListener(..., true)`, يتعين علينا أن نذكر نفس المرحلة في `removeEventListener(..., true)` لإزالة المعالج بشكل صحيح.

`````

````smart header="المستمعون على نفس العنصر ونفس المرحلة يتم تشغيلهم بالنسبة لترتيبهم"
إذا كان لدينا العديد من معالجات الأحداث في نفس المرحلة, تم تعيينها للعنصر نفسه مع `addEventListener`, يتم تشغيلها بنفس الترتيب الذي تم إنشاؤها به:

```js
elem.addEventListener("click", e => alert(1)); // guaranteed to trigger first
elem.addEventListener("click", e => alert(2));
`````

```

```smart header="The `event.stopPropagation()` during the capturing also prevents the bubbling"
The `event.stopPropagation()` method and its sibling `event.stopImmediatePropagation()` can also be called on the capturing phase. Then not only the futher capturing is stopped, but the bubbling as well.

In other words, normally the event goes first down ("capturing") and then up ("bubbling"). But if `event.stopPropagation()` is called during the capturing phase, then the event travel stops, no bubbling will occur.
```


## الخلاصة

عندما يحدث حدث ما -- يكون العنصر الأكثر تداخل حيث يحدث يسمي "العنصر المستهدف" (`event.target`).

- Then the event moves down from the document root to `event.target`, calling handlers assigned with `addEventListener(..., true)` on the way (`true` is a shorthand for `{capture: true}`).
- Then handlers are called on the target element itself.
- Then the event bubbles up from `event.target` to the root, calling handlers assigned using `on<event>`, HTML attributes and `addEventListener` without the 3rd argument or with the 3rd argument `false/{capture:false}`.

يمكن لكل معالج الوصول إلى خصائص كائن "الحدث":

- `event.target` -- العنصر الأعمق الذي نشأ عن الحدث.
- `event.currentTarget` (=`this`) -- العنصر الحالي الذي يعالج الحدث (لذي يكون المعالج عليه)
- `event.eventPhase` -- المرحلة الحالية (الالتقاط=1, الهدف=2, التدفق=3).

يمكن أن يوقف معالج الأحداث الحدث باستخدام `event.stopPropagation()`, ولكن هذا غير موصى به, لأننا لا نستطيع أن نتأكد من أننا لن نحتاج إليها أعلاه، ربما لأشياء مختلفة تماماً.

<<<<<<< HEAD
تُستخدم مرحلة الالتقاط نادرًا جدًا, وعادة ما نتعامل مع الأحداث الجارية في مرحلة التدفق. وهناك منطق وراء ذلك.
=======
The capturing phase is used very rarely, usually we handle events on bubbling. And there's a logical explanation for that.
>>>>>>> 1edb0a38330b54d2e1916f5193fc043e6fbbea78

في العالم الحقيقي، حين يقع حادث ما, فالسلطات المحلية ترد أولاً. فهم يعرفون المنطقة التي حدث فيا جيدا. ثم سلطات أعلى مستوى إذا لزم الأمر.

The same for event handlers. The code that set the handler on a particular element knows maximum details about the element and what it does. A handler on a particular `<td>` may be suited for that exactly `<td>`, it knows everything about it, so it should get the chance first. Then its immediate parent also knows about the context, but a little bit less, and so on till the very top element that handles general concepts and runs the last one.

وضع التدفق والالتقاط الأساس لـ "تفويض الحدث" -- نمط قوي للغاية للتعامل مع الأحداث ندرسه الفصل التالي.
```
