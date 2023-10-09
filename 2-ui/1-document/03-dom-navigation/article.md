libs:

- d3
- domtree

---

# المشي في الـ DOM

يسمح لنا الـ DOM بالقيام بأي شيء مع العناصر ومحتوياتها، ولكن أولاً يجب علينا الوصول إلى كائن DOM المقابل.

تبدأ جميع العمليات على الـ DOM مع كائن `document`. هذه هي النقطة الرئيسية للدخول إلى DOM. من خلاله يمكننا الوصول إلى أي عقدة.

هذه صورة لروابط تسمح بالسفر بين عقد DOM:

![](dom-links.svg)

دعونا نناقشهم بمزيد من التفصيل.

## في الأعلى: documentElement و body

تتوفر العقد الشجرية العليا مباشرة كخصائص `document`:

`html>` = `document.documentElement>`
: العقدة الوثيقة العليا هي `document.documentElement`. هذه هي عقدة DOM للعلامة `<html>`.

`body>` = `document.body>`
: عقدة DOM أخرى مستخدمة على نطاق واسع هي عنصر `body>` -- `document.body>`.

`head>` = `document.head>`
: تتوفر علامة `<head>` كـ `document.head`.

````warn header="هناك مشكلة: يمكن أن يكون `document.body`قيمته`null`"
لا يمكن للبرنامج النصي الوصول إلى عنصر غير موجود في لحظة التشغيل.

على وجه الخصوص، إذا كان البرنامج النصي داخل `<head>`، فإن `document.body` غير متاح، لأن المتصفح لم يقرأه بعد.

لذلك، في المثال أدناه يظهر التنبيه الأول `null`:

```html run
<html>

  <head>
    <script>
      *!*
          alert( "من HEAD: " + document.body ); // null، لا يوجد <body> بعد
      */!*
    </script>
  </head>

  <body>

    <script>
      alert("من BODY: " + document.body); // HTMLBodyElement، الآن يوجد
    </script>

  </body>
</html>
```
`````

```smart header="فى عالم ال `null` DOM تعنى \"غير موجود\""
في ال DOM، تعني قيمة `null` "غير موجود" أو "لا يوجد مثل هذه العقدة".
```

## الأطفال: childNodes، firstChild، lastChild

هناك مصطلحان سنستخدمهما من الآن فصاعدًا:

- **عقد الأطفال (أو الأطفال)** -- العناصر التي هي أطفال مباشرين. بعبارة أخرى، هم متداخلون بالضبط في المعطى. على سبيل المثال، `<head>` و `<body>` هما أطفال عنصر `<html>`.
- **السلالة** -- جميع العناصر المتداخلة في المعطى، بما في ذلك الأطفال وأطفالهم وهكذا.

على سبيل المثال، هنا `<body>` لديه أطفال `<div>` و `<ul>` (وبعض العقد النصية الفارغة):

```html run
<html>
<body>
  <div>بداية</div>

  <ul>
    <li>
      <b>معلومات</b>
    </li>
  </ul>
</body>
</html>
```

...وسلالة `<body>` ليست فقط الأطفال المباشرين `<div>`، `<ul>` ولكن أيضًا العناصر المتداخلة بشكل أعمق، مثل `<li>` (طفل `<ul>`) و `<b>` (طفل `<li>`) -- الشجرة الفرعية بأكملها.

**تدرج مجموعة `childNodes` جميع عقد الأطفال، بما في ذلك العقد النصية.**

يوضح المثال أدناه أطفال `document.body`:

```html run
<html>
<body>
  <div>بداية</div>

  <ul>
    <li>معلومات</li>
  </ul>

  <div>نهاية</div>

  <script>
*!*
    for (let i = 0; i < document.body.childNodes.length; i++) {
      alert( document.body.childNodes[i] ); // Text, DIV, Text, UL, ..., SCRIPT
    }
*/!*
  </script>
  ...المزيد من المحتوى...
</body>
</html>
```

يرجى ملاحظة تفصيل مثير للاهتمام هنا. إذا قمنا بتشغيل المثال أعلاه ، فإن آخر عنصر يظهر هو `<script>`. في الواقع ، يحتوي المستند على المزيد من المحتوى أدناه ، ولكن في لحظة تنفيذ البرنامج النصي لم يقرأ المتصفح بعد ، لذلك لا يرى البرنامج النصي.

*توفر الخصائص `firstChild` و `lastChild` إمكانية الوصول السريع إلى الأطفال الأول والأخير.**

إنهم مجرد اختصارات. إذا كانت هناك عقد فرعية ، فإن التالي صحيح دائمًا:
```js
elem.childNodes[0] === elem.firstChild
elem.childNodes[elem.childNodes.length - 1] === elem.lastChild
```

هناك أيضًا وظيفة خاصة `elem.hasChildNodes()` للتحقق مما إذا كانت هناك أي عقد فرعية.

### مجموعات DOM

كما نرى ، يبدو `childNodes` كمصفوفة. ولكن في الواقع ليس مجموعة ، بل *مجموعة* - كائن قابل للتكرار يشبه المصفوفة.

هناك نتيجتان مهمتان:

1. يمكننا استخدام `for..of` للتكرار عليه:
  ```js
  for (let node of document.body.childNodes) {
    alert(node); // يظهر جميع العقد من المجموعة
  }
  ```
  هذا لأنه قابل للتكرار (يوفر خاصية `Symbol.iterator` ، كما هو مطلوب).

2. لن تعمل طرق المصفوفة ، لأنها ليست مصفوفة:
  ```js run
  alert(document.body.childNodes.filter); // undefined (لا يوجد طريقة تصفية!)
  ```

الشيء الأول جميل. الثانية محتملة ، لأنه يمكن استخدام `Array.from` لإنشاء مصفوفة "حقيقية" من المجموعة ، إذا كانت نرغب في استخدام طرق المصفوفات:

  ```js run
  alert( Array.from(document.body.childNodes).filter ); // function
  ```

```warn header="مجموعات DOM للقراءة فقط"
مجموعات DOM ، وحتى أكثر - *جميع* خصائص التنقل المدرجة في هذا الفصل للقراءة فقط.

لا يمكننا استبدال الطفل بشيء آخر عن طريق تعيين `childNodes[i] = ...`.

تغيير DOM يحتاج إلى طرق أخرى. سنراهم في الفصل التالي.
```

```warn header="مجموعات DOM حية"
تكاد تكون جميع مجموعات DOM بدون استثناءات قليلة *حية*. بعبارة أخرى ، فهي تعكس الحالة الحالية لـ DOM.

إذا قمنا بالاحتفاظ بإشارة إلى `elem.childNodes` ، وإضافة / إزالة العقد في DOM ، فإنها تظهر في المجموعة تلقائيًا.
```

````warn header="لا تستخدم `for..in` للتكرار على المجموعات"
تكون المجموعات قابلة للتكرار باستخدام `for..of`. في بعض الأحيان يحاول الناس استخدام `for..in` لذلك.

من فضلك، لا. يتكرر حلقة `for..in` على جميع الخصائص القابلة للتعداد. والمجموعات لديها بعض الخصائص "الإضافية" التي نادرًا ما نستخدمها والتي عادةً ما لا نرغب في الحصول عليها:

```html run
<body>
<script>
  // يظهر 0 و 1 والطول والعنصر والقيم والمزيد.
  for (let prop in document.body.childNodes) alert(prop);
</script>
</body>
`````

## الأشقاء والوالد

_الأشقاء_ هم العقد التي هي أطفال من نفس الوالد.

على سبيل المثال، هنا `<head>` و `<body>` هم أشقاء:

```html
<html>
  <head>...</head><body>...</body>
</html>
```

- يقال أن `<body>` هو الشقيق "التالي" أو "الأيمن" لـ `<head>`,
- يقال أن `<head>` هو الشقيق "السابق" أو "الأيسر" لـ `<body>`.

الشقيق التالي موجود في خاصية `nextSibling`، والسابق - في `previousSibling`.

الوالد متاح كـ `parentNode`.

على سبيل المثال:

```js run
// والد <body> هو <html>
alert(document.body.parentNode === document.documentElement); // صحيح

// بعد <head> يأتي <body>
alert(document.head.nextSibling); // HTMLBodyElement

// قبل <body> يأتي <head>
alert(document.body.previousSibling); // HTMLHeadElement
```

## التنقل الخاص بالعناصر فقط

<<<<<<< HEAD
تشير خصائص التنقل المذكورة أعلاه إلى _جميع_ العقد. على سبيل المثال، في `childNodes` يمكننا رؤية كل من عقد النصوص وعقد العناصر وحتى عقد التعليقات إذا كانت موجودة.
=======
Navigation properties listed above refer to *all* nodes. For instance, in `childNodes` we can see both text nodes, element nodes, and even comment nodes if they exist.
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c

ولكن للعديد من المهام لا نريد عقد النصوص أو التعليقات. نريد التلاعب بعقد العناصر التي تمثل العلامات وتشكل هيكل الصفحة.

لذلك دعونا نرى المزيد من روابط التنقل التي تأخذ _عقد العناصر_ فقط في الاعتبار:

![](dom-links-elements.svg)

الروابط مشابهة لتلك المعطاة أعلاه، فقط مع كلمة `Element` بداخلها:

- `children` -- فقط تلك الأطفال التي هي عقد عناصر.
- `firstElementChild`، `lastElementChild` -- أول وآخر أطفال العناصر.
- `previousElementSibling`، `nextElementSibling` -- عناصر الجوار.
- `parentElement` -- عنصر الوالد.

````smart header="لماذا `parentElement`؟ هل يمكن أن يكون الوالد *ليس* عنصرًا؟"
تعيد خاصية `parentElement`الوالد "العنصر"، بينما تعيد`parentNode` الوالد "أي عقدة". هذه الخصائص عادة متشابهة: كلاهما يحصل على الوالد.

مع استثناء واحد لـ `document.documentElement`:

```js run
alert(document.documentElement.parentNode); // document
alert(document.documentElement.parentElement); // null
```

السبب هو أن العقدة الجذر `document.documentElement` (`<html>`) لديها `document` كوالدها. لكن `document` ليس عقدة عنصر، لذلك تعيد `parentNode` ولا تعيد `parentElement`.

قد يكون هذا التفصيل مفيدًا عندما نريد السفر من عنصر عشوائي `elem` إلى `<html>`، ولكن ليس إلى `document`:
```js
while ((elem = elem.parentElement)) { // اذهب لأعلى حتى <html>
  alert(elem);
}
```
````

دعونا نعدل أحد الأمثلة أعلاه: استبدل `childNodes` بـ `children`. الآن يظهر العناصر فقط:

```html run
<html>
<body>
  <div>بداية</div>

  <ul>
    <li>معلومات</li>
  </ul>

  <div>نهاية</div>

  <script>
*!*
    for (let elem of document.body.children) {
      alert(elem); // DIV، UL، DIV، SCRIPT
    }
*/!*
  </script>
  ...
</body>
</html>
```

## المزيد من الروابط: الجداول [#dom-navigation-tables]

حتى الآن قمنا بوصف خصائص التنقل الأساسية.

قد توفر أنواع معينة من عناصر DOM خصائص إضافية، محددة لنوعها، للراحة.

الجداول هي مثال رائع على ذلك، وتمثل حالة مهمة بشكل خاص:

**عنصر `<table>`** يدعم (بالإضافة إلى المعطى أعلاه) هذه الخصائص:
- `table.rows` -- مجموعة عناصر `<tr>` في الجدول.
- `table.caption/tHead/tFoot` -- مراجع لعناصر `<caption>`، `<thead>`، `<tfoot>`.
- `table.tBodies` -- مجموعة عناصر `<tbody>` (يمكن أن يكون هناك العديد وفقًا للمعيار، ولكن سيكون هناك دائمًا واحد على الأقل - حتى لو لم يكن في HTML المصدر، سيضعه المتصفح في DOM).

**عناصر `<thead>` و `<tfoot>` و `<tbody>`** توفر خاصية `rows`:
- `tbody.rows` -- مجموعة `<tr>` بداخلها.

**`<tr>`:**
- `tr.cells` -- مجموعة الخلايا `<td>` و `<th>` داخل `<tr>` المعطى.
- `tr.sectionRowIndex` -- الموضع (الفهرس) لـ `<tr>` المعطى داخل `<thead>/<tbody>/<tfoot>` المحيط.
- `tr.rowIndex` -- رقم `<tr>` في الجدول ككل (بما في ذلك جميع صفوف الجدول).

**`<td>` و `<th>`:**
- `td.cellIndex` -- عدد الخلايا داخل التغليف`<tr>`.

مثال على الاستخدام:

```html run height=100
<table id="table">
  <tr>
    <td>واحد</td><td>اثنان</td>
  </tr>
  <tr>
    <td>ثلاثة</td><td>أربعة</td>
  </tr>
</table>

<script>
  // احصل على td مع "اثنان" (الصف الأول، العمود الثاني)
  let td = table.*!*rows[0].cells[1]*/!*;
  td.style.backgroundColor = "red"; // قم بتسليط الضوء عليه
</script>
```

المواصفات: [بيانات جدولية](https://html.spec.whatwg.org/multipage/tables.html).

هناك أيضًا خصائص تنقل إضافية لنماذج HTML. سننظر إليهم لاحقًا عندما نبدأ في العمل مع النماذج.

## ملخص

بالنظر إلى عقدة DOM، يمكننا الذهاب إلى جيرانها المباشرين باستخدام خصائص التنقل.

هناك مجموعتان رئيسيتان منهم:

- لجميع العقد: `parentNode`، `childNodes`، `firstChild`، `lastChild`، `previousSibling`، `nextSibling`.
- لعقد العنصر فقط: `parentElement`، `children`، `firstElementChild`، `lastElementChild`، `previousElementSibling`، `nextElementSibling`.

توفر بعض أنواع عناصر DOM، مثل الجداول، خصائص ومجموعات إضافية للوصول إلى محتوياتها.
