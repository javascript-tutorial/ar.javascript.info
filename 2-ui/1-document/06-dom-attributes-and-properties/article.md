# الصفات والخصائص

عندما يقوم المتصفح بتحميل الصفحة ، فإنه "يقرأ" (كلمة أخرى: "يحلل ") HTML ويولد كائنات DOM منه. بالنسبة لعقد العناصر ، تصبح معظم سمات HTML القياسية تلقائيًا خصائص لكائنات DOM.

على سبيل المثال ، إذا كانت العلامة `<body id =" page ">` ، فإن كائن DOM يحتوي على `body.id =" page "`.

لكن تعيين خاصية السمة ليس واحد لواحد! في هذا الفصل ، سننتبه لفصل هذين المفهومين ، لمعرفة كيفية العمل معهم ، ومتى يكونان متماثلين ، ومتى يكونا مختلفين.

## خصائص DOM

لقد رأينا بالفعل خصائص DOM مضمنة. هناك الكثير. ولكن من الناحية الفنية ، لا أحد يحدنا ، وإذا لم يكن هناك ما يكفي ، فيمكننا إضافة الخاصة بنا.

عقد DOM هي كائنات JavaScript عادية. يمكننا تغييرها.

على سبيل المثال ، فلننشئ خاصية جديدة في `document.body`:

```js run
document.body.myData = {
  name: 'Caesar',
  title: 'Imperator'
};

alert(document.body.myData.title); // Imperator
```

كما يمكننا إضافة طريقة أو دالة أيضا:

```js run
document.body.sayTagName = function() {
  alert(this.tagName);
};

document.body.sayTagName(); // BODY (the value of "this" in the method is document.body)
```

يمكننا أيضًا تعديل النماذج الأولية المضمنة مثل `Element.prototype` وإضافة طرق جديدة لجميع العناصر:

```js run
Element.prototype.sayHi = function() {
  alert(`Hello, I'm ${this.tagName}`);
};

document.documentElement.sayHi(); // Hello, I'm HTML
document.body.sayHi(); // Hello, I'm BODY
```

لذا ، تتصرف خصائص وأساليب DOM تمامًا مثل تلك الخاصة بكائنات JavaScript العادية:

- يمكن أن يكون لها أي قيمة.
- أنها حساسة لحالة الأحرف (اكتب `elem.nodeType` ، وليس` elem.NoDeTyPe`).

## سمات HTML

في HTML ، قد تحتوي العلامات على سمات. عندما يقوم المتصفح بتحليل HTML لإنشاء كائنات DOM للعلامات ، فإنه يتعرف على السمات * القياسية * وينشئ خصائص DOM منها.

لذلك ، عندما يكون للعنصر `id` أو سمة * standard * أخرى ، يتم إنشاء الخاصية المقابلة. ولكن هذا لا يحدث إذا كانت السمة غير قياسية.

على سبيل المثال:
```html run
<body id="test" something="non-standard">
  <script>
    alert(document.body.id); // test
*!*
    // non-standard attribute does not yield a property
    alert(document.body.something); // undefined
*/!*
  </script>
</body>
```

يرجى ملاحظة أن السمة القياسية لعنصر واحد يمكن أن تكون غير معروفة لعنصر آخر. على سبيل المثال ، "" النوع "" قياسي لـ "<input>` ([HTMLInputElement] (https://html.spec.whatwg.org/#htmlinputelement)) ، ولكن ليس لـ "<body>` ([HTMLBodyElement] (https://html.spec.whatwg.org/#htmlbodyelement)). يتم وصف السمات القياسية في مواصفات فئة العنصر المقابلة.

هنا نراه:
```html run
<body id="body" type="...">
  <input id="input" type="text">
  <script>
    alert(input.type); // text
*!*
    alert(body.type); // undefined: DOM property not created, because it's non-standard
*/!*
  </script>
</body>
```

لذا ، إذا كانت السمة غير قياسية ، فلن تكون هناك خاصية DOM لها. هل هناك طريقة للوصول إلى هذه السمات؟

أكيد. يمكن الوصول إلى جميع السمات باستخدام الطرق التالية:

- `elem.hasAttribute (name)` - التحقق من الوجود.
- `elem.getAttribute (name)` - يحصل على القيمة.
- `elem.setAttribute (name، value)` - يحدد القيمة.
- `elem.removeAttribute (name)` - يزيل السمة.

تعمل هذه الطرق تمامًا مع ما هو مكتوب بلغة HTML.

يمكن للمرء أيضًا قراءة جميع السمات باستخدام `elem.attributes`: مجموعة من الكائنات التي تنتمي إلى فئة [Attr] (https://dom.spec.whatwg.org/#attr) المضمنة ، مع` name` و خصائص `القيمة`.

إليك عرض توضيحي لقراءة خاصية غير قياسية:

```html run
<body something="non-standard">
  <script>
*!*
    alert(document.body.getAttribute('something')); // non-standard
*/!*
  </script>
</body>
```

سمات HTML لها الميزات التالية:

- اسمها غير حساس لحالة الأحرف (`معرف` هو نفسه" معرف ").
- قيمهم دائمًا سلاسل.

إليك عرض توضيحي موسع للعمل مع السمات:

```html run
<body>
  <div id="elem" about="Elephant"></div>

  <script>
    alert( elem.getAttribute('About') ); // (1) 'Elephant', reading

    elem.setAttribute('Test', 123); // (2), writing

    alert( elem.outerHTML ); // (3), see if the attribute is in HTML (yes)

    for (let attr of elem.attributes) { // (4) list all
      alert( `${attr.name} = ${attr.value}` );
    }
  </script>
</body>
```

يرجى الملاحظة:

1. `getAttribute ('About')` - الحرف الأول كبير هنا ، وفي HTML كل الأحرف صغيرة. ولكن هذا لا يهم: أسماء السمات غير حساسة لحالة الأحرف.
2. يمكننا تعيين أي شيء لسمة ما ، لكنها تصبح سلسلة. إذن لدينا هنا "123" كقيمة.
3. جميع السمات بما في ذلك السمات التي حددناها مرئية في "outerHTML".
4. مجموعة "السمات" قابلة للتكرار وتحتوي على جميع سمات العنصر (قياسي وغير قياسي) ككائنات لها خصائص "الاسم" و "القيمة".

## مزامنة خاصية الخاصية

عندما تتغير سمة قياسية ، يتم تحديث الخاصية المقابلة تلقائيًا ، والعكس صحيح (مع بعض الاستثناءات).

في المثال أدناه تم تعديل `id` كخاصية ، ويمكننا أن نرى تغيير الخاصية أيضًا. ثم نفس الشيء إلى الوراء:

```html run
<input>

<script>
  let input = document.querySelector('input');

  // attribute => property
  input.setAttribute('id', 'id');
  alert(input.id); // id (updated)

  // property => attribute
  input.id = 'newId';
  alert(input.getAttribute('id')); // newId (updated)
</script>
```

ولكن هناك استثناءات ، على سبيل المثال ، تتم مزامنة `input.value` فقط من السمة -> إلى الخاصية ، ولكن ليس مرة أخرى:

```html run
<input>

<script>
  let input = document.querySelector('input');

  // attribute => property
  input.setAttribute('value', 'text');
  alert(input.value); // text

*!*
  // NOT property => attribute
  input.value = 'newValue';
  alert(input.getAttribute('value')); // text (not updated!)
*/!*
</script>
```

في المثال أعلاه:
- يؤدي تغيير السمة `القيمة` إلى تحديث العقار.
- لكن تغيير الخاصية لا يؤثر على السمة.

قد تكون هذه "الميزة" مفيدة حقًا ، لأن إجراءات المستخدم قد تؤدي إلى تغييرات `القيمة` ، وبعدها ، إذا أردنا استعادة القيمة" الأصلية "من HTML ، فهي في السمة.

## خصائص DOM مكتوبة

خصائص DOM ليست دائمًا سلاسل. على سبيل المثال ، تعد الخاصية `input.checked` (لمربعات الاختيار) منطقيةBoolean:

```html run
<input id="input" type="checkbox" checked> checkbox

<script>
  alert(input.getAttribute('checked')); // the attribute value is: empty string
  alert(input.checked); // the property value is: true
</script>
```

هناك أمثلة أخرى. سمة `style` عبارة عن سلسلة ، لكن خاصية` style` كائن Object:

```html run
<div id="div" style="color:red;font-size:120%">Hello</div>

<script>
  // string
  alert(div.getAttribute('style')); // color:red;font-size:120%

  // object
  alert(div.style); // [object CSSStyleDeclaration]
  alert(div.style.color); // red
</script>
```

معظم الخصائص عبارة عن سلاسل.

نادرًا جدًا ، حتى إذا كان نوع خاصية DOM عبارة عن سلسلة ، فقد يختلف عن السمة. على سبيل المثال ، تكون خاصية `href` DOM دائمًا عنوان URL * كامل * ، حتى إذا كانت السمة تحتوي على عنوان URL نسبي أو فقط` # علامة تجزئة '.

إليك مثال:

```html height=30 run
<a id="a" href="#hello">link</a>
<script>
  // attribute
  alert(a.getAttribute('href')); // #hello

  // property
  alert(a.href ); // full URL in the form http://site.com/page#hello
</script>
```

إذا كنا بحاجة إلى قيمة `href` أو أي سمة أخرى كما هو مكتوب تمامًا في HTML ، فيمكننا استخدام` getAttribute`.


## سمات غير قياسية ، مجموعة البيانات

عند كتابة HTML ، نستخدم الكثير من السمات القياسية. ولكن ماذا عن تلك المخصصة وغير القياسية؟ أولاً ، دعنا نرى ما إذا كانت مفيدة أم لا؟ لماذا؟

في بعض الأحيان يتم استخدام السمات غير القياسية لتمرير البيانات المخصصة من HTML إلى JavaScript ، أو "وضع علامة" على عناصر HTML لـ JavaScript.

مثله:

```html run
<!-- mark the div to show "name" here -->
<div *!*show-info="name"*/!*></div>
<!-- and age here -->
<div *!*show-info="age"*/!*></div>

<script>
  // the code finds an element with the mark and shows what's requested
  let user = {
    name: "Pete",
    age: 25
  };

  for(let div of document.querySelectorAll('[show-info]')) {
    // insert the corresponding info into the field
    let field = div.getAttribute('show-info');
    div.innerHTML = user[field]; // first Pete into "name", then 25 into "age"
  }
</script>
```

كما يمكن استخدامها لتصميم نمط عنصر.

على سبيل المثال ، بالنسبة لحالة الطلب ، يتم استخدام السمة `order-state`:

```html run
<style>
  /* styles rely on the custom attribute "order-state" */
  .order[order-state="new"] {
    color: green;
  }

  .order[order-state="pending"] {
    color: blue;
  }

  .order[order-state="canceled"] {
    color: red;
  }
</style>

<div class="order" order-state="new">
  A new order.
</div>

<div class="order" order-state="pending">
  A pending order.
</div>

<div class="order" order-state="canceled">
  A canceled order.
</div>
```

لماذا يكون استخدام السمة أفضل من وجود فئات مثل `.order-state-new` و` .order-state-pending` و `order-state-cancell`؟

لأن السمة أكثر ملاءمة للإدارة. يمكن تغيير الحالة بالسهولة التالية:

```js
// a bit simpler than removing old/adding a new class
div.setAttribute('order-state', 'canceled');
```

ولكن قد تكون هناك مشكلة محتملة في السمات المخصصة. ماذا لو استخدمنا سمة غير قياسية لأغراضنا وبعد ذلك قدمها المعيار وجعلته يفعل شيئًا؟ لغة HTML حية ، وتنمو ، وتظهر سمات أكثر تناسب احتياجات المطورين. قد تكون هناك آثار غير متوقعة في مثل هذه الحالة.

لتجنب التعارضات ، توجد سمات [data- *] (https://html.spec.whatwg.org/#embedding-custom-non-visible-data-with-the-data-*-attributes).

** جميع السمات التي تبدأ بـ "البيانات" محجوزة لاستخدام المبرمجين. وهي متوفرة في خاصية "مجموعة البيانات". **

على سبيل المثال ، إذا كان `elem` له سمة تسمى" "data-about" `، فإنه متاح باسم` elem.dataset.about`.

مثله:

```html run
<body data-about="Elephants">
<script>
  alert(document.body.dataset.about); // Elephants
</script>
```

تصبح السمات المتعددة الكلمات مثل `حالة البيانات- الحالة` مغطاةً بجمال:` مجموعة البيانات.

في ما يلي مثال على "حالة الطلب" "order state " معاد كتابته:

```html run
<style>
  .order[data-order-state="new"] {
    color: green;
  }

  .order[data-order-state="pending"] {
    color: blue;
  }

  .order[data-order-state="canceled"] {
    color: red;
  }
</style>

<div id="order" class="order" data-order-state="new">
  A new order.
</div>

<script>
  // read
  alert(order.dataset.orderState); // new

  // modify
  order.dataset.orderState = "pending"; // (*)
</script>
```

يعد استخدام سمات `البيانات *` طريقة صالحة وآمنة لتمرير البيانات المخصصة.

يرجى ملاحظة أنه لا يمكننا فقط قراءة سمات البيانات ، ولكن أيضًا تعديلها. ثم يقوم CSS بتحديث العرض وفقًا لذلك: في المثال أعلاه السطر الأخير `(*)` يغير اللون إلى الأزرق.

## ملخص

- السمات - هو ما يكتب في HTML.
- الخصائص - ما يوجد في كائنات DOM.

مقارنة صغيرة:

| | خصائص | سمات |
| ------------ | ------------ | ------------ |
| النوع | أي قيمة ، تحتوي الخصائص القياسية على أنواع موصوفة في سلسلة | A | المواصفات
| الاسم | الاسم حساس لحالة الأحرف | الاسم غير حساس لحالة الأحرف |

طرق العمل مع السمات هي:

- `elem.hasAttribute (name)` - للتحقق من وجودها.
- `elem.getAttribute (name)` - للحصول على القيمة.
- `elem.setAttribute (name، value)` - لتعيين القيمة.
- `elem.removeAttribute (name)` - لإزالة السمة.
- `elem.attributes` عبارة عن مجموعة من جميع السمات.

بالنسبة لمعظم المواقف ، يفضل استخدام خصائص DOM. يجب أن نشير إلى السمات فقط عندما لا تناسبنا خصائص DOM ، عندما نحتاج إلى سمات بالضبط ، على سبيل المثال:

- نحتاج إلى سمة غير قياسية. ولكن إذا بدأت بـ "البيانات" ، فيجب أن نستخدم "مجموعة البيانات".
- نريد قراءة القيمة "كما هو مكتوب" في HTML. قد تكون قيمة خاصية DOM مختلفة ، على سبيل المثال ، خاصية `href` هي دائمًا عنوان URL كامل ، وقد نرغب في الحصول على القيمة" الأصلية ".
