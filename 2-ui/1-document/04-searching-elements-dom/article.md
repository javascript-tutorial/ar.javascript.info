# البحث: getElement* و querySelector*

تكون خصائص التنقل في DOM رائعة عندما تكون العناصر قريبة من بعضها البعض. ماذا لو لم تكن كذلك؟ كيف يمكن الحصول على عنصر عشوائي من الصفحة؟

هناك طرق بحث أو methods إضافية لذلك.

## document.getElementById أو فقط id

إذا كان للعنصر سمة `id` أو id attribute ، فيمكننا جلب العنصر باستخدام ال method `docment.getElementBylementById(id)`، بغض النظر عن مكان وجوده.

على سبيل المثال :

```html run
<div id="elem">
  <div id="elem-content">Element</div>
</div>

<script>
    // get the element
  *!*
    let elem = document.getElementById('elem');
  */!*

    // make its background red
    elem.style.background = 'red';
</script>
```

وهنالك أيضا متغير عام سُمي بواسطة ال `id` الذي يشير إلى العنصر:

```html run
<div id="*!*elem*/!*">
  <div id="*!*elem-content*/!*">Element</div>
</div>

<script>
  // elem is a reference to DOM-element with id="elem"
  elem.style.background = "red";

  // id="elem-content" has a hyphen inside, so it can't be a variable name
  // ...but we can access it using square brackets: window['elem-content']
</script>
```

...هذا في حال لم نقم بتسمية متغير جافا سكريبت بنفس الاسم، أما إذا قمنا بذلك فستكون لمتغير جافا سكريبت الأولوية:

```html run untrusted height=0
<div id="elem"></div>

<script>
  let elem = 5; // now elem is 5, not a reference to <div id="elem">

  alert(elem); // 5
</script>
```

```warn header="يرجى عدم استخدام المتغيرات العامة المسماة بال id للوصول إلى العناصر"
تم وصف هذا التصرف [في المواصفات](http://www.whatwg.org/specs/web-apps/current-work/#dom-window-nameditem), لذا فهو قياسي نوعاً ما. ولكنه مدعوم بشكل أساسي للتوافق.

يحاول المتصفح مساعدتنا عن طريق مزج أسماء النطاقات namespaces بين JavaScript ونموذج الكائنات DOM. هذا أمر لا بأس فيه للنصوص البسيطة المضمنة في HTML، ولكن عموما لا ينصح بذلك. فقد تحدث تعارضات في الأسماء. بالإضافة إلى ذلك، عندما يقرأ شخص ما كود JavaScript ولا يكون لديه ملف HTML، فلن يكون واضحا من أين أتى المتغير.

في هذا الدرس، نستخدم`id` للإشارة مباشرة إلى عنصر بغرض الاختصار، عندما يكون واضحا من أين يأتي العنصر.

في الحياة العملية، تٌعتبر` document.getElementById` الطريقة المفضلة.
```

```smart header="ال `id` يجب أن يكون فريداً"
ال`id`يجب أن يكون فريداً. بمعنى أنه لا يمكن لأكثر من عنصر في المستند أن يحمل نفس ال`id`.

إذا كانت هناك عناصر متعددة تحمل نفس `id`، فإن سلوك الطرق التي تستخدمه لا يمكن التنبؤ به، على سبيل المثال قد يُرجع `doc.getElementById` أيًا من هذه العناصر عشوائيًا. لذا يرجى الالتزام بالقاعدة وإبقاء `id` فريدًا.

````

```warn header="فقط `document.getElementById`, وليس `anyElem.getElementById`"
يمكن استدعاء ال  getElementById` method` على كائن ال `document` فقط .فهي تقوم بالبحث عن ال `id` المٌعطى في المستند بأكمله.
````

## querySelectorAll [#querySelectorAll]

حتى الآن، ,ال method الأكثر مرونة, `elem.querySelectorAll(css)` تقوم بإرجاع العناصر التي بداخل ال `elem` والتي تطابق المحدد (CSS selector) المُعطى.

هنا نقوم يالبحث عن جميع عناصر ال `li` والتي هي last children:

```html run
<ul>
  <li>The</li>
  <li>test</li>
</ul>
<ul>
  <li>has</li>
  <li>passed</li>
</ul>
<script>
  *!*
    let elements = document.querySelectorAll('ul > li:last-child');
  */!*

    for (let elem of elements) {
      alert(elem.innerHTML); // "test", "passed"
    }
</script>
```

هذه الطريقة بالفعل قوية وفعالة، لأنه يمكن استخدام أي محدد (CSS selector).

```smart header="يمكن إستخدام pseudo-classes أيضاً"
Pseudo-classes في ال CSS مثل `:hover` و  `:active` ايضاً مدعومة. مثلا `document.querySelectorAll(':hover')` ستقوم بإرجاع مجموعة collection بالعناصر التي يقف عليها المؤشر الان (في ترتيب ضمني in nesting order من الأبعد `<html>` الى العنصر الاكثر تضميناً).
```

## querySelector [#querySelector]

إستدعاء `elem.querySelector(css)` تقوم بإرجاع أول عنصر ل CSS selector المُعطى.

بمعنى آخر، النتيجة هي نفسها ك `elem.querySelectorAll(css)[0]`، ولكن الأخيرة تبحث عن _كل_ العناصر وتختار واحداً، بينما `elem.querySelector` تبحث عن عنصر واحد فقط.لذلك فهي أسرع وأيضا اقصر في الكتابه.

## matches المطابقات

ال methods السابقه كانت تبحث في ال DOM.

ال [elem.matches(css)](http://dom.spec.whatwg.org/#dom-element-matches) لاتقوم بالبحث عن أي شي، أنها فقط تقوم بالفحص فيما اذا كان ال `elem` يطابق CSS-selector المعُطى، وترجع لنا `true` أو `false`.

تكون هذه ال method مفيدة عندما نقوم بتكرار iterating over العناصر (كتلك التي في مصفوفة array أو شيء ما مشابه) ونحاول تصفية تلك التي تهمنا.

على سبيل المثال:

```html run
<a href="http://example.com/file.zip">...</a>
<a href="http://ya.ru">...</a>

<script>
    // can be any collection instead of document.body.children
    for (let elem of document.body.children) {
  *!*
      if (elem.matches('a[href$="zip"]')) {
  */!*
        alert("The archive reference: " + elem.href );
      }
    }
</script>
```

## closest الأقرب

_الأجداد_ _Ancestors_ لعنصر ما هم: الأب، والأب للأب، والأب للأب للأب، وهكذا. يشكل الأجداد سلسلة من الآباء من العنصر إلى الأعلى.

ال `elem.closest(css)` method تبحث عن أقرب جد ancestor يتطابق مع CSS selector . العنصر `elem` نفسه مشمول أيضًا في البحث.

بعبارة أخرى، تقوم `closest` method بالانتقال للأعلى من العنصر وفحص كل واحد من الآباء. إذا تطابق أحدهم مع المحدد CSS selector، يتوقف البحث ويتم إرجاع الجد ancestor.

على سبيل المثال:

```html run
<h1>Contents</h1>

<div class="contents">
  <ul class="book">
    <li class="chapter">Chapter 1</li>
    <li class="chapter">Chapter 1</li>
  </ul>
</div>

<script>
  let chapter = document.querySelector(".chapter"); // LI

  alert(chapter.closest(".book")); // UL
  alert(chapter.closest(".contents")); // DIV

  alert(chapter.closest("h1")); // null (because h1 is not an ancestor)
</script>
```

## getElementsBy\*

هناك أيضًا طرق أخرى للبحث عن العُقد nodes بإستخدام (tag) أو (class) وغيرها.

لكن حالياً، فإن هذه الأساليب أصبحت في الغالب تاريخية، حيث أن `querySelector` أكثر قوة وأقصر في الكتابة.

لذلك، سنغطيها هنا بصورة خاصة لإكتمال المعلومات، في حين أنه ما زال بإمكانك العثور عليها في الأكواد القديمة.

- `elem.getElementsByTagName(tag)` تبحث عن العناصر التي تحمل العلامة (tag) المعطاة وتعيدهم كمجموعه collection . يمكن أن يكون المعامل او ال `tag` parameter أيضًا نجمة `"*"` للإشارة إلى "أي علامة او tag".
- `elem.getElementsByClassName(className)` تعيد العناصر التي تحمل ال(class) المعطى في CSS.
- `document.getElementsByName(name)` يعيد العناصر التي تحمل السمة (attribute) المعطاة بالاسم (name) على مستوى المستند بأكمله. هذه الطريقة نادراً ما تستخدم.

على سبيل المثال:

```js
// get all divs in the document
let divs = document.getElementsByTagName("div");
```

لنبحث عن جميع عناصر input داخل الجدول:

```html run height=50
<table id="table">
  <tr>
    <td>Your age:</td>

    <td>
      <label>
        <input type="radio" name="age" value="young" checked /> less than 18
      </label>
      <label>
        <input type="radio" name="age" value="mature" /> from 18 to 50
      </label>
      <label>
        <input type="radio" name="age" value="senior" /> more than 60
      </label>
    </td>
  </tr>
</table>

<script>
  *!*
    let inputs = table.getElementsByTagName('input');
  */!*

    for (let input of inputs) {
      alert( input.value + ': ' + input.checked );
    }
</script>
```

```warn header='لا تنسى حرف "s" !'
ينسى المطورون المبتدئون أحيانًا الحرف` \"s\"`. وهذا يعني أنهم يحاولون استدعاء `"getElementByTagName"` بدلاً من <code>getElement<b>s</b>ByTagName</code>.

 الحرف `'s' `غير موجود في` 'getElementById'`، لأنه يُرجع عنصرًا واحدًا. لكن `"getElementByTagName"` يُرجع مجموعة من العناصر، لذا يوجد حرف `"s"` بداخله.

```

````warn header="يُرجع مجموعة وليس عنصرًا!"
ومن الأخطاء الأخرى المنتشرة على نطاق واسع بين المبتدئين كتابة:

```js
// لن ينجح
document.getElementsByTagName('input').value = 5;
```

لن ينجح ذلك، لأنه يأخذ _مجموعة_ _collection_ من المدخلات ويعين القيمة لها بدلًا من العناصر الموجودة بداخلها.

يجب علينا إما أن نكرر على المجموعة iterate over the collection أو أن نحصل على عنصر من خلال فهرسه index، ثم نعيّنه assign، هكذا:

```js
// يجب أن يعمل (إذا كان هناك مدخلات)
document.getElementsByTagName("input")[0].value = 5;
```

````

البحث عن عناصر `.article` :

```html run height=50
<form name="my-form">
  <div class="article">Article</div>
  <div class="long article">Long article</div>
</form>

<script>
  // find by name attribute
  let form = document.getElementsByName("my-form")[0];

  // find by class inside the form
  let articles = form.getElementsByClassName("article");
  alert(articles.length); // 2, found two elements with class "article"
</script>
```

## المجموعات الحية Live collections

تُرجع جميع `"getElementsBy methods*"`مجموعة حية\* \*live collection. تعكس هذه المجموعات دائمًا الحالة الحالية للمستند و"التحديث التلقائي" عندما تتغير.

في المثال أدناه، يوجد نصان برمجيان.

1. الأول ينشئ مرجعًا إلى مجموعة`<div>`. في الوقت الحالي، طوله `1`.
2. يعمل النص البرمجي الثاني بعد أن يلتقي المتصفح بـ`div`آخر ، لذا فإن طوله هو`2`.

```html run
<div>First div</div>

<script>
  let divs = document.getElementsByTagName("div");
  alert(divs.length); // 1
</script>

<div>Second div</div>

<script>
  *!*
    alert(divs.length); // 2
  */!*
</script>
```

في المقابل، يُرجع`querySelectorAll`مجموعة _ثابتة_ _static collection_. إنها مثل مصفوفة ثابتة من العناصر.

إذا استخدمناه بدلاً من ذلك، فإن كلا البرنامجين النصيين سيخرجان`1`:

```html run
<div>First div</div>

<script>
  let divs = document.querySelectorAll("div");
  alert(divs.length); // 1
</script>

<div>Second div</div>

<script>
  *!*
    alert(divs.length); // 1
  */!*
</script>
```

يمكننا الآن رؤية الفرق بسهولة. لم تزد المجموعة الثابتة static collection بعد ظهور `div` جديد في المستند.

## ملخص

هناك 6 طرق رئيسية methods للبحث عن العقد nodes في DOM:

<table>
<thead>
<tr>
<td>Method</td>
<td>Searches by...</td>
<td>Can call on an element?</td>
<td>Live?</td>
</tr>
</thead>
<tbody>
<tr>
<td><code>querySelector</code></td>
<td>CSS-selector</td>
<td>✔</td>
<td>-</td>
</tr>
<tr>
<td><code>querySelectorAll</code></td>
<td>CSS-selector</td>
<td>✔</td>
<td>-</td>
</tr>
<tr>
<td><code>getElementById</code></td>
<td><code>id</code></td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td><code>getElementsByName</code></td>
<td><code>name</code></td>
<td>-</td>
<td>✔</td>
</tr>
<tr>
<td><code>getElementsByTagName</code></td>
<td>tag or <code>'*'</code></td>
<td>✔</td>
<td>✔</td>
</tr>
<tr>
<td><code>getElementsByClassName</code></td>
<td>class</td>
<td>✔</td>
<td>✔</td>
</tr>
</tbody>
</table>

الأكثر استخدامًا حتى الآن هما `querySelector` و `querySelectorAll`، ولكن يمكن أن تكون `getElement(s)By*` مفيدة بشكل متقطع أو موجودة في النصوص القديمة.

بالإضافة إلى ذلك:

- يوجد`elem.matches(CSS)` للتحقق مما إذا كان`elem` يطابق محدد CSS المُعطى.
- هناك `elem.closest(CSS)` للبحث عن أقرب سلف ancestor يطابق محدد CSS المحدد. يتم أيضًا التحقق من `elem` `العنصر` نفسه.

ودعنا نذكر طريقة أخرى هنا للتحقق من العلاقة بين الابن والوالد، حيث أنها مفيدة أحيانًا:

- يُرجِع `elemA.contains(elemB)` صوابًا true إذا كان `elemB`داخل`elemA` (سليل أو descendant ل `elemA`) أو عندما يكون `elemA==elemB`.
