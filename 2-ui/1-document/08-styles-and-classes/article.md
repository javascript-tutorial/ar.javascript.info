# الأنماط والفصول

قبل أن نبدأ في طرق JavaScript للتعامل مع الأنماط والفئات - إليك قاعدة مهمة. آمل أن يكون الأمر واضحًا بما فيه الكفاية ، ولكن لا يزال يتعين علينا ذكره.

بشكل عام ، هناك طريقتان لتصميم عنصر ما:

1. قم بإنشاء فصل دراسي في CSS وإضافته:`<div class="...">`
2. اكتب الخصائص مباشرة في `style`: `<div style="...">`.

يمكن لـ JavaScript تعديل كل من الفئات و `style`.

يجب أن نفضل دائمًا فئات CSS على `style`. يجب استخدام الأخير فقط إذا كانت الفئات "لا يمكنها التعامل معه".

فمثلا، `style` يكون مقبولًا إذا قمنا بحساب إحداثيات عنصر ديناميكيًا وأردنا تعيينها من JavaScript ، مثل هذا:

```js
let top = /* حسابات معقدة */;
let left = /* حسابات معقدة */;

elem.style.left = left; // e.g '123px', محسوبة في وقت التشغيل
elem.style.top = top; // e.g '456px'
```

بالنسبة للحالات الأخرى ، مثل جعل النص أحمر ، إضافة رمز خلفية - صف ذلك في CSS ثم أضف الفئة (يمكن أن تفعل JavaScript ذلك). هذا أكثر مرونة وأسهل للدعم.

## className و classList

يعد تغيير الصف أحد الإجراءات الأكثر استخدامًا في البرامج النصية.

في الماضي ، كان هناك قيود في JavaScript: الكلمة المحجوزة مثل `"class"` لا يمكن أن تكون خاصية كائن. هذا القيد غير موجود الآن ، ولكن في ذلك الوقت كان من المستحيل امتلاك خاصية `"class"` ، مثل `elem.class`.

لذلك بالنسبة للفصول ، تم تقديم خاصية `"className"` ذات المظهر المشابه: يتوافق `elem.className` مع سمة `"class"`.

على سبيل المثال:

```html run
<body class="main page">
  <script>
    alert(document.body.className); // الصفحة الرئيسية
  </script>
</body>
```

إذا قمنا بتعيين شيء لـ `elem.className` ، فسيتم استبدال السلسلة الكاملة من الفئات. في بعض الأحيان هذا ما نحتاجه ، ولكن غالبًا ما نريد إضافة / إزالة فصل واحد.

هناك خاصية أخرى لذلك: `elem.classList`.

إن `elem.classList` هو كائن خاص مع طرق ل`إضافة / إزالة / تبديل` فئة واحدة.

على سبيل المثال:

```html run
<body class="main page">
  <script>
*!*
    // add a class
    document.body.classList.add('article');
*/!*

    alert(document.body.className); // مقال الصفحة الرئيسية
  </script>
</body>
```

حتى نتمكن من العمل على كل من سلسلة الفئة الكاملة باستخدام `className` أو على فئات فردية باستخدام `classList`. ما نختاره يعتمد على احتياجاتنا.

طرق `classList`:

- `elem.classList.add/remove("class")` -- يضيف / يزيل الصف
- `elem.classList.toggle("class")` -- يضيف الفصل إذا لم يكن موجودًا ،
- `elem.classList.contains("class")` --التحقق من صنف معين ، إرجاع `true / false`.

إلى جانب ذلك ، `classList` قابلة للتكرار ، لذا يمكننا سرد جميع الفئات `for..of` ، على النحو التالي:

```html run
<body class="main page">
  <script>
    for (let name of document.body.classList) {
      alert(name); //الصفحة الرئيسية ثم الصفحة
    }
  </script>
</body>
```

## نمط العنصرنمط العنصر

الخاصية `elem.style` هى كائن يتوافق مع ما هو مكتوب فى سمة النمط `"style"`. يعمل `elem.style.width="100px"` إعداد بالطريقة نفسها كما لو كان لدينا سمة  `style` سلسلة `width:100px`.

بالنسبة للملكية المتعددة الكلمات ، يتم استخدام camelCase:

```js no-beautify
background-color  => elem.style.backgroundColor
z-index           => elem.style.zIndex
border-left-width => elem.style.borderLeftWidth
```

على سبيل المثال:

```js run
document.body.style.backgroundColor = prompt('background color?', 'green');
```

````smart header="خصائص مسبقة"
خصائص المتصفح المسبوقة مثل
 `-moz-border-radius`, `-webkit-border-radius` تتبع أيضًا نفس القاعدة: الشرطة تعني الأحرف الكبيرة.

على سبيل المثال:

```js
button.style.MozBorderRadius = '5px';
button.style.WebkitBorderRadius = '5px';
```
````

## إعادة تعيين خاصية النمط

نرغب أحيانًا في تعيين خاصية نمط وإزالتها لاحقًا.

على سبيل المثال ، لإخفاء عنصر ، يمكننا تعيين `elem.style.display = "none"`.

قد نرغب فى إزالة  `style.display` كما لو لم يتم تعيينه. بدلا من `delete elem.style.display`يجب علينا تعيين سلسلة فارغة لها: `elem.style.display = ""`.

```js run
// إذا قمنا بتشغيل هذا الرمز ، فسوف يرمش <body>
document.body.style.display = "none"; // إخفاء

setTimeout(() => document.body.style.display = "", 1000); // العودة الى الوضع الطبيعى
```

إذا وضعنا `style.display` إلى سلسلة فارغة ، ثم يطبق المتصفح فئات CSS وأنماطه المضمنة بشكل طبيعي ، كما لو لم تكن هناك خاصية `style.display` على الإطلاق.

<<<<<<< HEAD
````smart header="إعادة كتابة كاملة مع `style.cssText`"
عادة نستخدم `style.*` لتعيين خصائص النمط الفردية. لا يمكننا تعيين النمط الكامل مثل `div.style="color: red; width: 100px"`, لان  `div.style` هو كائن ، وهو للقراءة فقط.
=======
Also there is a special method for that, `elem.style.removeProperty('style property')`. So, We can remove a property like this:

```js run
document.body.style.background = 'red'; //set background to red

setTimeout(() => document.body.style.removeProperty('background'), 1000); // remove background after 1 second
```

````smart header="Full rewrite with `style.cssText`"
Normally, we use `style.*` to assign individual style properties. We can't set the full style like `div.style="color: red; width: 100px"`, because `div.style` is an object, and it's read-only.
>>>>>>> 7000ede297bfd688f9a3767e8ca43abd9242f322

لتعيين النمط الكامل كسلسلة ، هناك خاصية خاصة
 `style.cssText`:

```html run
<div id="div">Button</div>

<script>
  // يمكننا تعيين علامات نمط خاص مثل "important" هنا
  div.style.cssText=`color: red !important;
    background-color: yellow;
    width: 100px;
    text-align: center;
  `;

  alert(div.style.cssText);
</script>
```

نادرًا ما يتم استخدام هذه الخاصية ، لأن هذه المهمة تزيل جميع الأنماط الموجودة: فهي لا تضيفها ، ولكنها تحل محلها. قد يحذف أحيانًا شيئًا مطلوبًا. ولكن يمكننا استخدامه بأمان للعناصر الجديدة ، عندما نعلم أننا لن نحذف نمطًا موجودًا.

يمكن تحقيق الشيء نفسه عن طريق تعيين سمة:
 `div.setAttribute('style', 'color: red...')`.
````

## احذر الوحدات

لا تنس إضافة وحدات CSS إلى القيم.

على سبيل المثال ، لا ينبغي لنا أن نضع `elem.style.top` إلى `10`، بل بالأحرى `10px`. . وإلا فلن يعمل:

```html run height=100
<body>
  <script>
  *!*
    //لا يعمل!
    document.body.style.margin = 20;
    alert(document.body.style.margin); // '' (سلسلة فارغة ، يتم تجاهل المهمة)
  */!*

    // أضف الآن وحدة CSS (px) - وهي تعمل

    document.body.style.margin = '20px';
    alert(document.body.style.margin); // 20px

    alert(document.body.style.marginTop); // 20px
    alert(document.body.style.marginLeft); // 20px
  </script>
</body>
```

يرجى ملاحظة: المتصفح "يفكك" خاصية `style.margin` في السطور الأخيرة ويدخل `style.marginLeft` و `style.marginTop` منه.

## الأنماط المحسوبة: getComputedStyle

لذا ، يعد تعديل النمط أمرًا سهلاً. لكن كيف تقرأه؟

على سبيل المثال ، نريد أن نعرف حجم العنصر وهوامشه ولونه. كيف افعلها؟

**تعمل خاصية `style` فقط على قيمة `"style"`، بدون أي شلال CSS.**

لذلك لا يمكننا قراءة أي شيء يأتي من فئات CSS باستخدام `elem.style`.

على سبيل المثال ، `style` هنا لا يرى الهامش:

```html run height=60 no-beautify
<head>
  <style> body { color: red; margin: 5px } </style>
</head>
<body>

  The red text
  <script>
*!*
    alert(document.body.style.color); // فارغة
    alert(document.body.style.marginTop); // فارغة
*/!*
  </script>
</body>
```

... ولكن ماذا لو احتجنا ، على سبيل المثال ، إلى زيادة الهامش بمقدار `20px`؟ نريد القيمة الحالية لها.

There's another method for that: `getComputedStyle`.

The syntax is:

```js
getComputedStyle(element, [pseudo])
```

element
: عنصر لقراءة القيمة لـ.

pseudo
:عنصر زائف إذا لزم الأمر ، على سبيل المثال `:: before`. سلسلة فارغة أو لا وسيطة تعني العنصر نفسه.


والنتيجة كائن يحتوي على أنماط ، مثل `elem.style` ، ولكن الآن فيما يتعلق بجميع فئات CSS.

على سبيل المثال:

```html run height=100
<head>
  <style> body { color: red; margin: 5px } </style>
</head>
<body>

  <script>
    let computedStyle = getComputedStyle(document.body);

    // الآن يمكننا قراءة الهامش واللون منه


    alert( computedStyle.marginTop ); // 5px
    alert( computedStyle.color ); // rgb(255, 0, 0)
  </script>

</body>
```

```smart header="القيم المحسوبة والمحلولة"
هناك مفهومان في [CSS](https://drafts.csswg.org/cssom/#resolved-values):

1. قيمة النمط *المحسوب* هي القيمة بعد تطبيق جميع قواعد CSS ووراثة CSS ، نتيجة سلسلة CSS المتتالية. يمكن أن تبدو
 `height:1em` أو `font-size:125%`.
2. قيمة النمط التي تم `حلها` هي القيمة التي تم تطبيقها أخيرًا على العنصر. مثل القيم `1em` أو `125%` نسبي. يأخذ المتصفح القيمة المحسوبة ويجعل جميع الوحدات ثابتة ومطلقة ، على سبيل المثال: `height:20px` أو `font-size:16px`. . بالنسبة للخصائص الهندسية ، قد تحتوي القيم التي تم حلها على نقطة عائمة ، مثل`width:50.5px`.

منذ وقت طويل تم إنشاء `getComputedStyle` للحصول على قيم محسوبة ، ولكن اتضح أن القيم التي تم حلها أكثر ملاءمة ، وتغير المعيار.

لذا في الوقت الحاضر ، تُعيد `getComputedStyle` في الواقع القيمة التي تم حلها للخاصية ، عادةً بالبكسل للهندسة.
```

````warn header="`getComputedStyle` يتطلب اسم الخاصية بالكامل"
يجب أن نسأل دائمًا عن العقار المحدد الذي نريده ، مثل `paddingLeft` أو `marginTop` أو `borderTopWidth`. وإلا فإن النتيجة الصحيحة ليست مضمونة.

على سبيل المثال ، إذا كانت هناك خصائص `paddingLeft / paddingTop` ، فماذا يجب أن نحصل عليه للحصول على `padComputedStyle (elem) .padding`؟ لا شيء ، أو ربما قيمة "مولدة" من الحشوات المعروفة؟ لا توجد قاعدة قياسية هنا.

هناك تناقضات أخرى. كمثال ، بعض المتصفحات (Chrome) تظهر `10px` في الوثيقة أدناه ، وبعضها
 (Firefox) --  لا:

```html run
<style>
  body {
    margin: 10px;
  }
</style>
<script>
  let style = getComputedStyle(document.body);
  alert(style.margin); // سلسلة فارغة في Firefox
</script>
```
````

```smart header="تم تطبيق الأنماط على `:visited` الروابط مخفية!"
قد يتم تلوين الروابط التي تمت زيارتها باستخدام `:visited` CSS صنف مستعار.

لكن `getComputedStyle` لا يمنح الوصول إلى هذا اللون ، لأنه بخلاف ذلك يمكن للصفحة العشوائية معرفة ما إذا كان المستخدم قد زار رابطًا عن طريق إنشائه على الصفحة والتحقق من الأنماط.

قد لا ترى JavaScript الأنماط المطبقة بواسطة  `:visited`. وأيضًا ، هناك قيود في CSS تمنع تطبيق أنماط تغيير الهندسة فى `:visited`. وذلك لضمان عدم وجود طريقة جانبية لصفحة شريرة لاختبار ما إذا كان قد تم زيارة رابط وبالتالي كسر الخصوصية.
```

## ملخص

لإدارة الفئات ، هناك خاصيتين DOM
- `className` -- قيمة السلسلة ، جيد لإدارة مجموعة كاملة من الفئات.
- `classList` -- الكائن بالطرق`add/remove/toggle/contains`، جيد للفئات الفردية.

لتغيير الأنماط:

- خاصية `style` هى كائن له أنماطcamelCased. القراءة والكتابة لها نفس معنى تعديل الخصائص الفردية في سمة `"style"`. لمعرفة كيفية تنفيذ  `important` وأشياء نادرة أخرى - هناك قائمة بالأساليب على [MDN](mdn:api/CSSStyleDeclaration).

- تتوافق الخاصية `style.cssText` مع السمة `"style"` بأكملها ، وهي السلسلة الكاملة من الأنماط.

لقراءة الأنماط التي تم حلها (فيما يتعلق بجميع الفئات ، بعد تطبيق جميع CSS وحساب القيم النهائية
):

- تُرجع `getComputedStyle (elem، [pseudo]) `الكائن الشبيه بالنمط معهم. يقرأ فقط.
