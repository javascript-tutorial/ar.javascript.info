# حجم العنصر والتمرير

هناك العديد من خصائص JavaScript التي تسمح لنا بقراءة معلومات حول عرض العنصر وارتفاعه وميزات الهندسة الأخرى.

غالبًا ما نحتاج إليها عند تحريك العناصر أو وضعها في JavaScript.

## عنصر العينة

كعنصر عينة لإثبات الخصائص ، سنستخدم الخاصية الواردة أدناه:

```html no-beautify
<div id="example">
  ...Text...
</div>
<style>
  #example {
    width: 300px;
    height: 200px;
    border: 25px solid #E8C48F;
    padding: 20px;              
    overflow: auto;             
  }
</style>
```

لديها الحدود والحشو والتمرير. مجموعة كاملة من الميزات. لا توجد هوامش ، لأنها ليست جزءًا من العنصر نفسه ، ولا توجد خصائص خاصة لهم.

يبدو العنصر كما يلي:

![](metric-css.svg)

You can [open the document in the sandbox](sandbox:metric).

```smart header="Mind the scrollbar"
توضح الصورة أعلاه الحالة الأكثر تعقيدًا عندما يكون للعنصر شريط تمرير. تحتفظ بعض المتصفحات (وليس كلها) بالفضاء الخاص بها من خلال أخذها من المحتوى (المسمى "عرض المحتوى" أعلاه).

لذلك ، بدون شريط التمرير ، سيكون عرض المحتوى `300 بكسل` ، ولكن إذا كان شريط التمرير بعرض` 16 بكسل` (قد يختلف العرض بين الأجهزة والمتصفحات) ، فعندئذٍ يبقى `300 - 16 = 284 بكسل` فقط ، ويجب أن نأخذه في الاعتبار . لهذا السبب تفترض أمثلة من هذا الفصل وجود شريط تمرير. بدونه ، بعض الحسابات أبسط.
```

```smart header="The `padding-bottom` aقد تكون مليئة بالنص "
عادةً ما يتم عرض الحشو فارغة على الرسوم التوضيحية الخاصة بنا ، ولكن إذا كان هناك الكثير من النص في العنصر وتجاوزه ، فإن المتصفحات تعرض النص "الفائض" في "الحشو السفلي" ، فهذا أمر طبيعي.
```

## الهندسة

فيما يلي الصورة العامة بخصائص الهندسة:

! [] (metric-all.svg)

قيم هذه الخصائص هي أرقام تقنيًا ، لكن هذه الأرقام هي "بكسل" ، لذا فهي قياسات بكسل.

لنبدأ في استكشاف الخصائص بدءًا من خارج العنصر.

## offsetParent, offsetLeft/Top

نادرًا ما تكون هذه الخصائص مطلوبة ، لكنها لا تزال هي الخصائص الهندسية "الخارجية" ، لذلك سنبدأ بها.

يعد "offsetParent" أقرب سلف يستخدمه المتصفح لحساب الإحداثيات أثناء العرض.

هذا هو أقرب سلف وهو واحد مما يلي:

1- وضع CSS ("الموضع" هو "مطلق" ، "قريب" ، "ثابت" أو "ثابت") ، أو
2. `<td>` أو `<th>` أو `<table>` أو
3. `<body>`.

توفر الخصائص `offsetLeft / offsetTop` إحداثيات س / ص نسبة إلى` `offsetParent` الزاوية العلوية اليسرى.

في المثال أدناه ، يحتوي `<div>` الداخلي على `<main>` كـ `offsetParent` و` offsetLeft / offsetTop` من الزاوية العلوية اليسرى (`180`):

```html run height=10
<main style="position: relative" id="main">
  <article>
    <div id="example" style="position: absolute; left: 180px; top: 180px">...</div>
  </article>
</main>
<script>
  alert(example.offsetParent.id); // main
  alert(example.offsetLeft); // 180 (note: a number, not a string "180px")
  alert(example.offsetTop); // 180
</script>
```

![](metric-offset-parent.svg)

هناك عدة مناسبات عندما يكون "offsetParent" "فارغًا":

1. للعناصر غير المعروضة (`display: none` أو not in the document).
2. بالنسبة لـ "<body>` و "<html>`.
3- للعناصر ذات "الموضع: ثابت".

## offsetWidth/Height

الآن دعنا ننتقل إلى العنصر نفسه.

هاتان الخاصيتان هما الأبسط. توفر العرض / الارتفاع "الخارجي" للعنصر. أو بعبارة أخرى حجمها الكامل بما في ذلك الحدود.

![](metric-offset-width-height.svg)

لعنصر العينة لدينا:

- `offsetWidth = 390` - العرض الخارجي ، يمكن حسابه على أنه عرض CSS داخلي (` 300 بكسل`) بالإضافة إلى حشوات (`2 * 20 بكسل`) وحدود (` 2 * 25 بكسل`).
- `offsetHeight = 290` - الارتفاع الخارجي.

````smart header="خصائص الهندسة هي صفر / قيمة للعناصر التي لا يتم عرضها"
يتم حساب خصائص الهندسة فقط للعناصر المعروضة.

إذا كان أحد العناصر (أو أي من أسلافه) يحتوي على "عرض: لا شيء" أو غير موجود في المستند ، فإن جميع الخصائص الهندسية تكون صفرية (أو "خالية" لـ "offsetParent").

على سبيل المثال ، `offsetParent` هي` null` ، و `offsetWidth` ،` offsetHeight` هي `0` عندما أنشأنا عنصرًا ، ولكننا لم نقم بإدراجه في المستند حتى الآن ، أو (أو أصله) يحتوي على` عرض : لا شيء.

يمكننا استخدام هذا للتحقق مما إذا كان العنصر مخفيًا ، مثل هذا:

```js
function isHidden(elem) {
  return !elem.offsetWidth && !elem.offsetHeight;
}
```

يرجى ملاحظة أن مثل `isHidden` يعرض` true` للعناصر التي تظهر على الشاشة ، ولكن بدون أحجام (مثل `<div>` فارغ).
````

## clientTop/Left

داخل العنصر لدينا الحدود.

لقياسها ، هناك خصائص `clientTop` و` clientLeft`.

في مثالنا:

- `clientLeft = 25` -- left border width
- `clientTop = 25` -- top border width

![](metric-client-left-top.svg)

ولكن على وجه الدقة - هذه الخصائص ليست عرض / ارتفاع الحد ، بل هي إحداثيات نسبية للجانب الداخلي من الجانب الخارجي.

ماهو الفرق؟

تصبح مرئية عندما يكون المستند من اليمين إلى اليسار (نظام التشغيل باللغة العربية أو العبرية). شريط التمرير ليس بعد ذلك على اليمين ، ولكن على اليسار ، ثم يتضمن "clientLeft" أيضًا عرض شريط التمرير.

في هذه الحالة ، لن يكون "clientLeft" `25` ، ولكن بعرض شريط التمرير` 25 + 16 = 41`.

هذا هو المثال بالعبرية:

![](metric-client-left-top-rtl.svg)

## clientWidth/Height

توفر هذه الخصائص حجم المنطقة داخل حدود العنصر.

تتضمن عرض المحتوى مع الحشو ، لكن بدون شريط التمرير:

![](metric-client-width-height.svg)

في الصورة أعلاه ، لنفكر أولاً في "clientHeight".

لا يوجد شريط تمرير أفقي ، لذلك فهو بالضبط مجموع ما يوجد داخل الحدود: ارتفاع CSS `200 بكسل` بالإضافة إلى حشوات علوية وسفلية (` 2 * 20 بكسل`) إجمالي `240 بكسل`.

الآن "clientWidth" - هنا ليس عرض المحتوى "300 بكسل" ، ولكن "284 بكسل" ، لأن "16 بكسل" مشغول بشريط التمرير. لذلك يكون المجموع `284 بكسل` بالإضافة إلى حشوات اليسار واليمين ، إجمالي` 324 بكسل`.

** إذا لم تكن هناك حشوات ، فإن "clientWidth / Height" هي بالضبط منطقة المحتوى ، داخل الحدود وشريط التمرير (إن وجد). **


![](metric-client-width-nopadding.svg)

لذلك عندما لا يكون هناك أي مساحة ، يمكننا استخدام `clientWidth / clientHeight` للحصول على حجم منطقة المحتوى.

## scrollWidth/Height

هذه الخصائص مثل `clientWidth / clientHeight` ، ولكنها تشمل أيضًا الأجزاء التي تم تمريرها (المخفية):

![](metric-roll-width-height.svg)

في الصورة أعلاه:

- `التمرير = 723` - الارتفاع الداخلي الكامل لمنطقة المحتوى بما في ذلك الأجزاء التي تم تمريرها.
- `التمرير العرضي = 324` - هو العرض الداخلي الكامل ، وهنا ليس لدينا تمرير أفقي ، لذا فهو يساوي` clientWidth`.

يمكننا استخدام هذه الخصائص لتوسيع العنصر إلى عرضه / ارتفاعه الكامل.

مثله:

```js
// expand the element to the full content height
element.style.height = `${element.scrollHeight}px`;
```

```online
انقر فوق الزر لمد العنصر:

<div id="element" style="width:300px;height:200px; padding: 0;overflow: auto; border:1px solid black;">text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text</div>

<button style="padding:0" onclick="element.style.height = `${element.scrollHeight}px`">element.style.height = `${element.scrollHeight}px`</button>
```

## scrollLeft/scrollTop

الخصائص `التمرير لليسار / التمرير العلوي` هي عرض / ارتفاع الجزء المخفي من العنصر.

في الصورة أدناه ، يمكننا رؤية "التمرير" و "التمرير العلوي" للكتلة ذات التمرير العمودي.

![](metric-scroll-top.svg)

وبعبارة أخرى ، فإن "rollTop" هو "مقدار التمرير".

````smart header = "يمكن تعديل" التمرير لليسار / التمرير العلوي "
معظم الخصائص الهندسية هنا للقراءة فقط ، ولكن يمكن تغيير `التمرير لليسار / التمرير العلوي` ، وسوف يقوم المتصفح بتمرير العنصر.

```online
إذا قمت بالنقر فوق العنصر أدناه ، فسيتم تنفيذ الرمز `elem.scrollTop + = 10`. هذا يجعل محتوى العنصر بالتمرير `10px` للأسفل.


<div onclick="this.scrollTop+=10" style="cursor:pointer;border:1px solid black;width:100px;height:80px;overflow:auto">Click<br>Me<br>1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9</div>
```

يؤدي تعيين "scrollTop" إلى "0" أو "إنفينيتي" إلى جعل العنصر ينتقل إلى الأعلى/الأسفل على التوالي.
````

## لا تأخذ العرض / الارتفاع من CSS

لقد غطينا للتو الخصائص الهندسية لعناصر DOM ، والتي يمكن استخدامها للحصول على العرض والارتفاعات وحساب المسافات.

ولكن كما نعلم من الفصل <info: styles-and-classes> ، يمكننا قراءة ارتفاع وعرض CSS باستخدام `getComputedStyle`.

فلماذا لا تقرأ عرض عنصر باستخدام `getComputedStyle` ، مثل هذا؟

```js run
let elem = document.body;

alert( getComputedStyle(elem).width ); // show CSS width for elem
```

لماذا يجب أن نستخدم الخصائص الهندسية بدلاً من ذلك؟ هناك سببان:

1. أولاً ، يعتمد "عرض / ارتفاع" CSS على خاصية أخرى: "تحجيم المربع" الذي يحدد "ما هو" عرض وارتفاع CSS. قد يؤدي التغيير في "تحجيم المربع" لأغراض CSS إلى كسر جافا سكريبت.
2. ثانيًا ، قد يكون "عرض / ارتفاع" CSS "تلقائي" ، على سبيل المثال لعنصر مضمن:

    ```html run
    <span id="elem">Hello!</span>

    <script>
    *!*
      alert( getComputedStyle(elem).width ); // auto
    */!*
    </script>
    ```

    من وجهة نظر CSS ، يعد `العرض: تلقائي` أمرًا طبيعيًا تمامًا ، ولكن في جافا سكريبت نحتاج إلى حجم دقيق في` بكسل` يمكننا استخدامه في العمليات الحسابية. حتى هنا عرض CSS عديم الفائدة.

وهناك سبب آخر: شريط التمرير. في بعض الأحيان ، تصبح الشفرة التي تعمل بشكل جيد بدون شريط تمرير عربات التي تجرها الدواب ، لأن شريط التمرير يأخذ المساحة من المحتوى في بعض المتصفحات. لذا فإن العرض الحقيقي المتاح للمحتوى هو * أقل * من عرض CSS. و "clientWidth / clientHeight" يأخذ ذلك في الاعتبار.

... ولكن مع "getComputedStyle (elem) .width" ، الوضع مختلف. تعرض بعض المتصفحات (مثل Chrome) العرض الداخلي الحقيقي مطروحًا منه شريط التمرير ، وبعضها (مثل Firefox) - عرض CSS (تجاهل شريط التمرير). هذه الاختلافات بين المتصفحات هي السبب في عدم استخدام `getComputedStyle` ، بل الاعتماد على الخصائص الهندسية.

```online
إذا كان المستعرض الخاص بك يحتفظ بمساحة شريط التمرير (معظم المستعرضات لنظام Windows) ، فيمكنك اختباره أدناه.

[iframe src = "cssWidthScroll" حدود الرابط = 1]

يحتوي العنصر الذي يحتوي على نص على CSS `width: 300px`.

على نظام التشغيل Windows Desktop و Firefox و Chrome و Edge ، كلهم ​​يحجزون مساحة شريط التمرير. لكن Firefox يُظهر `300 بكسل` ، بينما يُظهر Chrome و Edge أقل. ذلك لأن Firefox يعرض عرض CSS وتعرض المستعرضات الأخرى العرض "الحقيقي".
``

يرجى ملاحظة أن الفرق الموضح هو فقط حول قراءة `getComputedStyle (...). width` من JavaScript ، كل شيء بصريًا صحيح.

## الملخص

العناصر لها خصائص الهندسة التالية:

- `offsetParent` - أقرب سلف تم وضعه أو` td` أو `th` أو` table` أو `body`.
- `offsetLeft / offsetTop` - الإحداثيات المتعلقة بالحافة العلوية اليسرى لـ` offsetParent`.
- "offsetWidth / offsetHeight" - العرض / الارتفاع "الخارجي" للعنصر بما في ذلك الحدود.
- `clientLeft / clientTop` - المسافات من الزاوية الخارجية العلوية اليسرى إلى الزاوية الداخلية العلوية اليسرى (المحتوى + المساحة). بالنسبة لنظام التشغيل من اليسار إلى اليمين ، تكون دائمًا عروض الحدود اليسرى / العلوية. بالنسبة لنظام التشغيل من اليمين إلى اليسار ، يكون شريط التمرير الرأسي على اليسار بحيث يتضمن "clientLeft" عرضه أيضًا.
- "clientWidth / clientHeight" - عرض / ارتفاع المحتوى بما في ذلك البطانات ، ولكن بدون شريط التمرير.
- "التمرير / التمرير" - عرض / ارتفاع المحتوى ، مثل "clientWidth / clientHeight" ، ولكن يشمل أيضًا الجزء غير المرئي من العنصر.
- `التمرير لليسار / التمرير العلوي` - عرض / ارتفاع الجزء العلوي الذي تم تمريره للخارج من العنصر ، بدءًا من الزاوية العلوية اليسرى.

جميع الخصائص للقراءة فقط باستثناء `التمرير الأيسر / التمرير العلوي` والتي تجعل المتصفح يقوم بتمرير العنصر إذا تم تغييره.
