# تعديل الوثيقة 

DOM التعديل هو مفتاح إنشاء صفحات "حية".

سنرى هنا كيفية إنشاء عناصر جديدة "بسرعة" وتعديل محتوى الصفحة الحالية.

## مثال: إظهار رسالة

دعونا نتظاهر باستخدام مثال. سنضيف رسالة على الصفحة تبدو أجمل من "تنبيه".

إليك كيف ستبدو:

```html autorun height="80"
<style>
.alert {
  padding: 15px;
  border: 1px solid #d6e9c6;
  border-radius: 4px;
  color: #3c763d;
  background-color: #dff0d8;
}
</style>

*!*
<div class="alert">
  <strong>Hi there!</strong> You've read an important message.
</div>
*/!*
```

كان هذا مثال HTML. الآن دعنا ننشئ نفس `div` باستخدام JavaScript (على افتراض أن الأنماط موجودة في HTML أو ملف CSS خارجي).

## إنشاء عنصر

لإنشاء عقد DOM ، هناك طريقتان:

`document.createElement(tag)`
: Creates a new *element node* with the given tag:

    ```js
    let div = document.createElement('div');
    ```

`document.createTextNode(text)`
: Creates a new *text node* with the given text:

    ```js
    let textNode = document.createTextNode('Here I am');
    ```

في حالتنا، تكون الرسالة `div` مع فئة` تنبيه 'و HTML فيها:

### إنشاء الرسالة

في حالتنا، إنشاء `div` الرسالة ينطلب 3 مراحل:

```js
// 1. Create <div> element
let div = document.createElement('div');

// 2. Set its class to "alert"
div.className = "alert";

// Fill it with the content
div.innerHTML = "<strong>Hi there!</strong> You've read an important message.";
```

لقد أنشأنا العنصر ، ولكن حتى الآن إنه متغير فقط. لا يمكننا رؤية العنصر على الصفحة ، لأنه ليس جزءًا من المستند حتى الآن

## طرق الإدراج

لعرض "div" ، نحتاج إلى إدراجه في مكان ما في "المستند". على سبيل المثال ، في `document.body`. هناك طريقة خاصة `append` لذلك:` document.body.append (div) `.

توفر هذه المجموعة من الطرق المزيد من الطرق لإدراج:

- `node.append (... nodes or strings)` - إلحاق عقد أو سلاسل في نهاية `node` ،
- `node.prepend (... العقد أو السلاسل)` - إدراج العقد أو السلاسل في بداية `العقدة` ،
- `node.before (... nodes or strings)` –- أدخل العقد أو السلاسل قبل `node` ،
- `node.after(...nodes or strings)` - إدراج العقد أو السلاسل بعد `العقدة` ،
- `node.replaceWith (... العقد أو السلاسل)` - - يستبدل `العقدة` بالعقد أو السلاسل المعطاة.

فيما يلي مثال على استخدام هذه الأساليب لإضافة عناصر إلى قائمة والنص قبلها / بعدها:

```html autorun
<ol id="ol">
  <li>0</li>
  <li>1</li>
  <li>2</li>
</ol>

<script>
  ol.before('before'); // insert string "before" before <ol>
  ol.after('after'); // insert string "after" after <ol>

  let liFirst = document.createElement('li');
  liFirst.innerHTML = 'prepend';
  ol.prepend(liFirst); // insert liFirst at the beginning of <ol>

  let liLast = document.createElement('li');
  liLast.innerHTML = 'append';
  ol.append(liLast); // insert liLast at the end of <ol>
</script>
```

هذه صورة بصرية عن الأساليب التي تفعلها:

![](before-prepend-append-after.svg)

لذا ستكون القائمة النهائية:

```html
before
<ol id="ol">
  <li>prepend</li>
  <li>0</li>
  <li>1</li>
  <li>2</li>
  <li>append</li>
</ol>
after
```

يمكن لهذه الطرق إدراج قوائم متعددة للعقد والقطع النصية في مكالمة واحدة.

على سبيل المثال ، هنا يتم إدراج سلسلة وعنصر:

```html run
<div id="div"></div>
<script>
  div.before('<p>Hello</p>', document.createElement('hr'));
</script>
```

يتم إدراج كل النص * كنص *. 

إذن HTML النهائي هو:

```html run
*!*
&lt;p&gt;Hello&lt;/p&gt;
*/!*
<hr>
<div id="div"></div>
```

بمعنى آخر ، يتم إدخال السلاسل بطريقة آمنة ، مثل `` elem.textContent` يفعل ذلك.

لذلك ، لا يمكن استخدام هذه الطرق إلا لإدراج عقد DOM أو أجزاء نصية.

ولكن ماذا لو أردنا إدراج HTML "كـ html" ، مع عمل جميع العلامات والأشياء ، مثل `elem.innerHTML`?

## insertAdjacentHTML / Text / Element

لذلك يمكننا استخدام طريقة أخرى متعددة الاستخدامات: `elem.insertAdjacentHTML (حيث ، html)`.

المعلمة الأولى هي كلمة كود ، تحدد مكان إدراج نسبة إلى `elem`. يجب أن يكون واحدًا مما يلي:

- "beforebegin" "- أدخل" html "مباشرةً قبل" elem "،
- "afterbegin" "- أدخل" html "في" elem "في البداية ،
- "قبل" "- أدخل" html "في" elem "، في النهاية ،
- "" بعد نهاية "" - أدخل "html" مباشرة بعد "elem".

المعلمة الثانية هي سلسلة HTML ، يتم إدراجها "كـ HTML".

على سبيل المثال:

```html run
<div id="div"></div>
<script>
  div.insertAdjacentHTML('beforebegin', '<p>Hello</p>');
  div.insertAdjacentHTML('afterend', '<p>Bye</p>');
</script>
```

... سيؤدي إلى:

```html run
<p>Hello</p>
<div id="div"></div>
<p>Bye</p>
```

هذه هي الطريقة التي يمكننا بها إلحاق HTML التعسفي بالصفحة.

إليك صورة متغيرات الإدراج:

! [] (insert-adjacent.svg)!

يمكننا أن نلاحظ بسهولة أوجه التشابه بين هذا والصورة السابقة. نقاط الإدراج هي نفسها في الواقع ، ولكن هذه الطريقة تدخل HTML.

الطريقة لديها شقيقان:

- `elem.insertAdjacentText (حيث ، نص)` - نفس البنية ، ولكن يتم إدراج سلسلة "نص" "كنص" بدلاً من HTML ،
- `elem.insertAdjacentElement (أين ، elem)` - نفس البنية ، ولكن إدراج عنصر.

وهي موجودة بشكل أساسي لجعل بناء الجملة "موحدًا". عمليًا ، يتم استخدام `insertAdjacentHTML` فقط معظم الوقت. لأن العناصر والنصوص ، لدينا طرق "إلحاق / قبل / قبل / بعد" - فهي أقصر في الكتابة ويمكنها إدراج العقد / أجزاء النص.

لذا إليك متغير بديل لعرض رسالة:

```html run
<style>
.alert {
  padding: 15px;
  border: 1px solid #d6e9c6;
  border-radius: 4px;
  color: #3c763d;
  background-color: #dff0d8;
}
</style>

<script>
  document.body.insertAdjacentHTML("afterbegin", `<div class="alert">
    <strong>Hi there!</strong> You've read an important message.
  </div>`);
</script>
```

## إزالة العقدة

لإزالة العقدة ، هناك طريقة `node.remove ()`.

دعونا نجعل رسالتنا تختفي بعد ثانية:

```html run untrusted
<style>
.alert {
  padding: 15px;
  border: 1px solid #d6e9c6;
  border-radius: 4px;
  color: #3c763d;
  background-color: #dff0d8;
}
</style>

<script>
  let div = document.createElement('div');
  div.className = "alert";
  div.innerHTML = "<strong>Hi there!</strong> You've read an important message.";

  document.body.append(div);
*!*
  setTimeout(() => div.remove(), 1000);
*/!*
</script>
```

يرجى ملاحظة: إذا أردنا * نقل * عنصر إلى مكان آخر - فلا حاجة لإزالته من العنصر القديم.

** تقوم جميع طرق الإدراج تلقائيًا بإزالة العقدة من المكان القديم. **

على سبيل المثال ، دعنا نتبادل العناصر:

```html run height=50
<div id="first">First</div>
<div id="second">Second</div>
<script>
  // no need to call remove
  second.after(first); // take #second and after it insert #first
</script>
```

## عقد الاستنساخ: cloneNode

كيفية إدراج رسالة أخرى مماثلة؟

يمكننا عمل دالة ووضع الكود هناك. لكن الطريقة البديلة ستكون * استنساخ * "div" الموجود وتعديل النص الموجود بداخله (إذا لزم الأمر).

في بعض الأحيان عندما يكون لدينا عنصر كبير ، قد يكون ذلك أسرع وأبسط.

- الاستدعاء "elem.cloneNode (true)" يخلق استنساخ "عميق" للعنصر - مع جميع السمات والعناصر الفرعية. إذا كنا نسمي `elem.cloneNode (false)` ، فإن الاستنساخ يتم بدون عناصر تابعة.

مثال لنسخ الرسالة:

```html run height="120"
<style>
.alert {
  padding: 15px;
  border: 1px solid #d6e9c6;
  border-radius: 4px;
  color: #3c763d;
  background-color: #dff0d8;
}
</style>

<div class="alert" id="div">
  <strong>Hi there!</strong> You've read an important message.
</div>

<script>
*!*
  let div2 = div.cloneNode(true); // clone the message
  div2.querySelector('strong').innerHTML = 'Bye there!'; // change the clone

  div.after(div2); // show the clone after the existing div
*/!*
</script>
```

## DocumentFragment [# document-fragment]

`DocumentFragment` عبارة عن عقدة DOM خاصة تعمل كغلاف لتمرير قوائم العقد.

يمكننا إلحاق العقد الأخرى بها ، ولكن عندما ندرجها في مكان ما ، يتم إدراج محتواها بدلاً من ذلك.

على سبيل المثال ، يُنشئ `getListContent` أدناه جزءًا يحتوي على عناصر` <li> `، والتي يتم إدراجها لاحقًا في` <ul> `:

```html run
<ul id="ul"></ul>

<script>
function getListContent() {
  let fragment = new DocumentFragment();

  for(let i=1; i<=3; i++) {
    let li = document.createElement('li');
    li.append(i);
    fragment.append(li);
  }

  return fragment;
}

*!*
ul.append(getListContent()); // (*)
*/!*
</script>
```

يرجى ملاحظة أنه في السطر الأخير `(*)` نلحق `DocumentFragment` ، ولكنه" يمتزج "، وبالتالي فإن البنية الناتجة ستكون:

```html
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
</ul>
```

`DocumentFragment` نادرا ما يستخدم صراحة. لماذا تضيف إلى نوع خاص من العقدة ، إذا كان بإمكاننا إرجاع مجموعة من العقد بدلاً من ذلك؟ مثال معاد كتابته:

```html run
<ul id="ul"></ul>

<script>
function getListContent() {
  let result = [];

  for(let i=1; i<=3; i++) {
    let li = document.createElement('li');
    li.append(i);
    result.push(li);
  }

  return result;
}

*!*
ul.append(...getListContent()); // append + "..." operator = friends!
*/!*
</script>
```

نذكر `DocumentFragment` بشكل أساسي نظرًا لوجود بعض المفاهيم فوقه ، مثل عنصر [template] (info: template-element) ، الذي سنغطيه لاحقًا.

## طريقة إدخال / إزالة المدرسة القديمة

[قديم]

هناك أيضًا طرق معالجة DOM "المدرسة القديمة" ، موجودة لأسباب تاريخية.

تأتي هذه الأساليب من العصور القديمة حقًا. في الوقت الحاضر ، لا يوجد سبب لاستخدامها ، حيث أن الأساليب الحديثة ، مثل "إلحاق" ، "قبل" ، "قبل" ، "بعد" ، "إزالة" ، "استبدال" ، تكون أكثر مرونة.

السبب الوحيد لإدراج هذه الطرق هنا هو أنه يمكنك العثور عليها في العديد من النصوص القديمة:

`الوالدان. appendChild (العقدة)`
: إلحاق `العقدة` بآخر طفل لـ" الوالدين ".

     يضيف المثال التالي `<li>` جديدة إلى نهاية `<ol>`:

    ```html run height=100
    <ol id="list">
      <li>0</li>
      <li>1</li>
      <li>2</li>
    </ol>

    <script>
      let newLi = document.createElement('li');
      newLi.innerHTML = 'Hello, world!';

      list.appendChild(newLi);
    </script>
    ```

`parentElem.insertBefore(node, nextSibling)`
:إدراج "العقدة" قبل "nextSibling" في "motherElem".

     يدرج الكود التالي عنصر قائمة جديد قبل الثانية `<li>`:

    ```html run height=100
    <ol id="list">
      <li>0</li>
      <li>1</li>
      <li>2</li>
    </ol>
    <script>
      let newLi = document.createElement('li');
      newLi.innerHTML = 'Hello, world!';

    *!*
      list.insertBefore(newLi, list.children[1]);
    */!*
    </script>
    ```
    لإدراج `newLi` كعنصر أول ، يمكننا القيام بذلك على النحو التالي:

    ```js
    list.insertBefore(newLi, list.firstChild);
    ```

`parentElem.replaceChild(node, oldChild)`
:يستبدل `oldChild` بـ" عقدة "بين أطفال" الوالدين ".

`الوالدلمحذف الطفل (عقدة)`
: يزيل `العقدة` من` الوالدين` (بافتراض أن `العقدة` هي تابعها).

     المثال التالي يزيل `` <li> `أولاً من` <ol> `:

    ```html run height=100
    <ol id="list">
      <li>0</li>
      <li>1</li>
      <li>2</li>
    </ol>

    <script>
      let li = list.firstElementChild;
      list.removeChild(li);
    </script>
    ```

كل هذه الأساليب ترجع العقدة المدرجة / المُزالة. بمعنى آخر ، تُرجع `parents 'appendChild (العقدة)` العقدة`. ولكن عادة لا يتم استخدام القيمة التي تم إرجاعها ، نقوم فقط بتشغيل الطريقة.

## كلمة عن "document.write"

هناك طريقة أخرى قديمة جدًا لإضافة شيء ما إلى صفحة الويب: `document.write`.

الصيغة:

```html run
<p>Somewhere in the page...</p>
*!*
<script>
  document.write('<b>Hello from JS</b>');
</script>
*/!*
<p>The end</p>
```

يؤدي استدعاء "document.write (html)` إلى كتابة "html" في الصفحة "هنا والآن". يمكن إنشاء سلسلة `html` ديناميكيًا ، لذا فهي مرنة نوعًا ما. يمكننا استخدام JavaScript لإنشاء صفحة ويب كاملة وكتابتها.

تأتي الطريقة من الأوقات التي لم يكن فيها DOM ، ولا معايير ... الأوقات القديمة حقًا. إنها لا تزال حية ، لأن هناك سكربتات تستخدمها.

في النصوص الحديثة نادرًا ما نراها بسبب القيود المهمة التالية:

** لا يعمل الاتصال بـ `document.write` إلا أثناء تحميل الصفحة. **

إذا نسميها بعد ذلك ، فسيتم مسح محتوى المستند الحالي.

على سبيل المثال:

```html run
<p>After one second the contents of this page will be replaced...</p>
*!*
<script>
  // document.write after 1 second
  // that's after the page loaded, so it erases the existing content
  setTimeout(() => document.write('<b>...By this.</b>'), 1000);
</script>
*/!*
```

لذا فهو غير قابل للاستخدام في مرحلة "بعد التحميل" ، على عكس طرق DOM الأخرى التي تناولناها أعلاه.

هذا هو الجانب السلبي.

هناك جانب صاعد أيضا. من الناحية الفنية ، عندما يتم استدعاء `document.write` أثناء قراءة المستعرض لـ HTML (" تحليل ") ، ويكتب شيئًا ، يستهلكه المستعرض تمامًا كما لو كان موجودًا في البداية ، في نص HTML.

لذلك يعمل بسرعة فائقة ، لأنه لا يوجد * تعديل DOM * المعنية. يكتب مباشرة في نص الصفحة ، بينما لم يتم بناء DOM بعد.

لذا إذا احتجنا إلى إضافة الكثير من النص إلى HTML ديناميكيًا ، ونحن في مرحلة تحميل الصفحة ، وكانت السرعة مهمة ، فقد يساعد ذلك. لكن في الواقع نادرا ما تجتمع هذه المتطلبات. وعادة ما يمكننا رؤية هذه الطريقة في البرامج النصية لمجرد أنها قديمة.

## ملخص

- طرق إنشاء العقد الجديدة:
    - `document.createElement (علامة)` - ينشئ عنصرًا بالعلامة المحددة ،
    - `document.createTextNode (القيمة)` - إنشاء عقدة نصية (نادرًا ما تستخدم) ،
    - `elem.cloneNode (deep)` - استنساخ العنصر ، إذا كان `deep == true` ثم مع جميع الأحفاد.

- الإدخال والفك:
    - `node.append (... nodes or strings)` - أدخل في `node` ، في النهاية ،
    - `node.prepend (... العقد أو السلاسل)` - أدخل في `العقدة` ، في البداية ،
    - `node.before (... nodes or strings)` –- أدخل مباشرة قبل `node` ،
    - `node.after (... nodes or strings)` –- أدخل مباشرة بعد `node` ،
    - `node.replaceWith (... العقد أو السلاسل)` –- استبدال `العقدة`.
    - `node.remove ()` –- قم بإزالة `العقدة`.

    يتم إدراج السلاسل النصية "كنص".

- هناك أيضًا طرق "المدرسة القديمة":
    - `الوالد. appendChild (العقدة)`
    - `mother.insertBefore (عقدة ، nextSibling)`
    - `mother.removeChild (node)`
    - `الأصل. إعادة مكان الطفل (newElem ، عقدة)`

    جميع هذه الطرق تُرجع `العقدة`.

- بالنظر إلى بعض HTML في `html` ،` elem.insertAdjacentHTML (حيث ، html) `يُدخلها بناءً على قيمة` أين`:
    - "beforebegin" "- أدخل" html "قبل" elem "مباشرةً ،
    - "afterbegin" "- أدخل" html "في" elem "في البداية ،
    - "قبل" "- أدخل" html "في" elem "، في النهاية ،
    - "" بعد نهاية "" - أدخل "html" مباشرةً بعد "elem".

    هناك أيضًا طرق مشابهة ، `elem.insertAdjacentText` و` elem.insertAdjacentElement` ، والتي تُدرج سلاسل نصية وعناصر ، ولكن نادرًا ما يتم استخدامها.

- لإلحاق HTML بالصفحة قبل أن ينتهي التحميل:
    - `document.write (html)`

    بعد تحميل الصفحة تقوم هذه المكالمة بمسح المستند. غالبا ما ينظر إليها في النصوص القديمة.
