<<<<<<< HEAD
# أحداث الماوس
=======

# Mouse events
>>>>>>> 733ff697c6c1101c130e2996f7eca860b2aa7ab9

في هذا الفصل سنتناول المزيد حول أحداث الماوس وخصائصها.

يرجى ملاحظة: هذه الأحداث ليست مقتصرة على "الماوس " ولكن تأتى أيضاً من أجهزة أخرى مثل الهواتف والأجهزة اللوحية، والتى يتم مضاهاتها للتوافق.

## أنواع أحداث الماوس

لقد راينا بالفعل بعض هذه الأحداث:

`mousedown/mouseup`

:استخدام زر الماوس في النقر / تحرير النقر عن العنصر .

`mouseover/mouseout`
: تحريك مؤشر الماوس فوق / خارج العنصر.

`mousemove`
: يعمل هذا الحدث فعلياً مع كل حركة لمؤشر الماوس فوق العنصر.

`click`
: يعمل بعد `mousedown`ثم `mouseup` على نفس العنصر بإستخدام الزر الأيسر للماوس.

`dblclick`
: يعمل بعد النقر مرتين على نفس العنصر خلال فترة زمنية قصيرة. نادرا ما يستخدم في الوقت الحاضر.

`contextmenu`
: Triggers when the right mouse button is pressed. There are other ways to open a context menu, e.g. using a special keyboard key, it triggers in that case also, so it's not exactly the mouse event.

يعمل عندما يتم الضغط على زر الفأرة الأيمن. وهناك طرق أخرى لفتح قائمة السياق ، على سبيل المثال باستخدام مفتاح معين من لوحة المفاتيح ، ويمكن أيضًا استخدامه في هذه الحالة ، لذا فهو ليس بالضبط حدث للماوس .

... وهناك أيضا العديد من الأحداث الأخرى ، واللتى سنتطرق لها لاحقًا
.

## ترتيب الأحداث

كما ترى من القائمة السابقة ، قد يقوم إجراء المستخدم  بتشغيل أكثر من حدث أو أحداث متعددة


على سبيل المثال , عند النقر على الزر الايسر فإن أول حدث يتم تشغيله  `mousedown`, عند الضغط على الزر, ثم `mouseup` وبالتالي أيضا `click` عند تحرير النقر.

In cases when a single action initiates multiple events, their order is fixed. That is, the handlers are called in the order `mousedown` -> `mouseup` -> `click`.

```online
لمعاينة الأحداث بوضوح أنقر فوق الزر أدناه. جرب النقر مرتين أيضاً.

<<<<<<< HEAD
في التجربة التالية ، يتم تسجيل جميع أحداث الماوس ، وإذا كان هناك  تأخير لأكثر من ثانية واحدة يتم فصلها بخط أفقي متقطع.

=======
On the teststand below, all mouse events are logged, and if there is more than a 1 second delay between them, they are separated by a horizontal rule.

Also, we can see the `button` property that allows us to detect the mouse button; it's explained below.
>>>>>>> 733ff697c6c1101c130e2996f7eca860b2aa7ab9

كما يمكننا أن نرى  `button` الذي يسمح لنا باكتشاف زر الماوس ، كما هو موضح أدناه.

<input onmousedown="return logMouse(event)" onmouseup="return logMouse(event)" onclick="return logMouse(event)" oncontextmenu="return logMouse(event)" ondblclick="return logMouse(event)" value="أنقر فوقي  بزر الماوس الايمن أو الأيسر " type="button"> <input onclick="logClear('test')" value="مسح" type="button"> <form id="testform" name="testform"> <textarea style="font-size:12px;height:150px;width:360px;"></textarea></form>
```

## زر الماوس

تحتوي دائما الأحداث المتعلقة بالنقر على خاصية `button`, والتي تسمح لك بأستخدام زر الماوس.

We usually don't use it for `click` and `contextmenu` events, because the former happens only on left-click, and the latter -- only on right-click.

On the other hand, `mousedown` and `mouseup` handlers may need `event.button`, because these events trigger on any button, so `button` allows to distinguish between "right-mousedown" and "left-mousedown".

القيم المحتملة لـ `event.button` هي:

| حالة الزر | `event.button` |
|--------------|----------------|
| Left button (primary) | 0 |
| Middle button (auxiliary) | 1 |
| Right button (secondary) | 2 |
| X1 button (back) | 3 |
| X2 button (forward) | 4 |

تحتوي معظم أجهزة الماوس على الزرين الأيسر والأيمن فقط ، لذا فإن القيم المحتملة هي "0" أو "2". وكذلك الأجهزة التي تعمل باللمس أيضًا تولد أحداثًا مماثلة عندما ينقر عليها .

Also there's `event.buttons` property that has all currently pressed buttons as an integer, one bit per button. In practice this property is very rarely used, you can find details at [MDN](mdn:/api/MouseEvent/buttons) if you ever need it.

```warn header="عفا عليها الزمن `event.which`"
في الأكواد القديمة قد تجد استخدام خاصية `event.which` وهي  تعتبر طريقة قديمة غير قياسية للحصول على زر ، مع القيم المحتملة :

- `event.which == 1` – الزر الأيسر,
- `event.which == 2` – الزر الأوسط,
- `event.which == 3` – الزر الأيمن.

إعتباراً من الأن, `event.which` تم ايقافها, لذا لا يجب إستخدامها.
```

## مفاتيح التعديل: shift, alt, ctrl و meta

تتضمن جميع أحداث الماوس معلومات عند الضغط على مفاتيح التعديل

خصائص الحدث :

- `shiftKey`: `key:Shift`
- `altKey`: `key:Alt` (أو `key:Opt` لنظام تشغيل Mac)
- `ctrlKey`: `key:Ctrl`
- `metaKey`: `key:Cmd` لنظام Mac

تكون القيمة `true`   إذا تم الضغط على المفتاح المقابل أثناء الحدث.

على سبيل المثال, الزر أدناه يعمل فقط عند الضغط على  `key:Alt+Shift` ثم النقر :

```html autorun height=60
<button id="button">Alt+Shift+أنقر علي!</button>

<script>
  button.onclick = function(event) {
*!*
    if (event.altKey && event.shiftKey) {
*/!*
      alert('مرحى!');
    }
  };
</script>
```

```warn header="إنتبه: نظام Mac عادة نستخدم  `Cmd` بدلا من `Ctrl`"
في نظامى التشغيل  Windows و Linux توجد مفاتيح التعديل `key:Alt`, `key:Shift` و `key:Ctrl`. بينما نظام تشغيل  Mac هناك آخر: `key:Cmd`, يتوافق مع خاصية `metaKey`.

في معظم التطبيقات, عندما Windows/Linux بستخدم `key:Ctrl`, على Mac  نستخدم `key:Cmd`.

وهذا يعنى: عندما يقوم مستخدم Windows بالضغط على `key:Ctrl+Enter` أو `key:Ctrl+A`, فإن مستخدم Mac يضغط على `key:Cmd+Enter` أو `key:Cmd+A`, وهكذا.

لذا إذا أردنا دعم مجموعات مثل `key:Ctrl`+ النقر, فمن المنطقي بالنسبة لنظام Mac نستخدم `key:Cmd`+ النقر. وهذا يكون أكثر راحة لمستخدمي Mac .

حتى اذا أردنا إجبار مستخدمي Mac بإستخدام `key:Ctrl`+ النقر -- فهذا يعد صعباً.وتكمن المشكلة في : أن النقر الأيسر مع المفتاح `key:Ctrl` تكون بمثابة *right-click* على  MacOS, وبالتالى تقوم بتشغيل حدث `contextmenu` , وليس  `click` كما في Windows/Linux.

ولذلك إذا أردنا أن يشعر المستخدمين لجميع أنظمة التشغيل بالراحة  , بإستخدامهم  `ctrlKey` فإنه ينبغي علينا التحقق من `metaKey`.

بالنسبة لترميز  - JS  فإنه يجب علينا التحقق مما إذا كان `if (event.ctrlKey || event.metaKey)`.
```

```warn header="هناك أيضا أجهزة هواتف محمولة"
وجود لوحة مفاتيح أمر جيد كإضافة الى سير العمل. فإذا كان الزائر يستخدمها  -- فلا بأس. 

ولكن إذا لم يكن أجهزتهم بها -- فلابد أن تكون هناك طريقة للعمل بدون مفاتيح التعديل.
```

## الأحداثيات: clientX/Y, pageX/Y

 جميع أحداث الماوس توفر إحداثيات بطريقتين:

1. نسبي-للنافذة: `clientX` و `clientY`.
2. نسبي-للمستند: `pageX` و `pageY`.

وقد غطينا بالفعل الإختلاف بينهما في فصل <info:coordinates>.

بإختصار , الأحداثيات النسبية-للمستند `pageX/Y` يتم حسابها من الزاوية العلويه اليسرى للمستند, ولا تتغير أو تتأثر عند تمرير الصفحة, بينما `clientX/Y` تحسب من الواوية العلوية اليسرى للنافذة الحالية. وعندما يتم تمرير الصفحة , فإنها تتغير.

على سبيل المثال, إذا كان لدينا نافذة بحجم  500x500, ومؤشر الماوس في الزاوية العلوية اليسرى , فإن `clientX` و `clientY` تكون `0`, بغض النظر عن أى تمرير للصفحة. 

وإذا كان مؤشر الماوس في المنتصف, فإن `clientX` و `clientY` تكون `250`, بغض النظر عن مكانه في المستند. وهي تتشابه مع  `position:fixed` في هذا الجانب.

````online
حرك الماوس فوق حقل الإدخال لرؤية `clientX/clientY` (هذا المثال موجود في `iframe`, لذا فإن الأحداثيات مرتبطة بهذا `iframe`):

```html autorun height=50
<input onmousemove="this.value=event.clientX+':'+event.clientY" value="حرك الماوس فوقي">
```
````

## منع الإختيار في الماوس

<<<<<<< HEAD
النقر المزدوج بزر الماوس له تأثير جانبي قد يكون غير ملائم في بعض الواجهات: فهو يحدد النص.
=======
Double mouse click has a side effect that may be disturbing in some interfaces: it selects text.
>>>>>>> 733ff697c6c1101c130e2996f7eca860b2aa7ab9

For instance, double-clicking on the text below selects it in addition to our handler:

```html autorun height=50
<span ondblclick="alert('dblclick')">أنقر مرتين علي</span>
```

إذا قمت بالضغط مع الإستمرار على زر الماوس الأيسر,  ودون تحرير الزر ,  "إضغط مع الإستمرار على الماوس",فسيكون هناك أيضًا تحديد , وقد يكون على غير ما تريد.

هناك عدة طرق لمنع التحديد , بإمكانك أن تقرأ عنها في فصل <info:selection-range>.

 في هذه الحالة  ، فإن الطريقة الأكثر منطقية هي منع إجراء المتصفح من   `mousedown`. وسيؤدي هذا الى الغاء كل هذه التحديدات:

```html autorun height=50
قبل...
<b ondblclick="alert('Click!')" *!*onmousedown="return false"*/!*>
  أنقر مرتين علي
</b>
...بعد
```

الآن لم يتم تحديد العنصر بالخط العريض  بنقرات مزدوجة ، ولن يؤدي الضغط على الزر الأيسر عليه إلى بدء التحديد.


يرجى ملاحظة أن النص الموجود بداخله لا يزال قابلاً للتحديد. ومع ذلك ، يجب ألا يبدأ التحديد في النص نفسه ، ولكن قبله أو بعده. عادة هذا جيد للمستخدمين.

````smart header="منع النسخ"
إذا أردنا تعطيل التحديد لحماية محتوى صفحتنا من لصق النسخ ، فيمكننا استخدام حدث آخر
: `oncopy`.

```html autorun height=80 no-beautify
<div *!*oncopy="alert('Copying forbidden!');return false"*/!*>
عزيزي المستخدم،
 النسخ ممنوع لك.
 إذا كنت تعرف JS أو HTML ، فيمكنك الحصول على كل شيء من مصدر الصفحة.
</div>
```
إذا حاولت نسخ جزء من النص في `<div>`, فلن ينجح ذلك, لأن الإجراء الافتراضي  `oncopy` ممنوع.

من المؤكد أن المستخدم لديه حق الوصول إلى مصدر HTML-للصفحة, ويمكنه أخذ المحتوى من هناك, ولكن لا يعرف الجميع كيفية القيام بذلك.
````

## ملخص

تتميز أحداث الماوس بالخصائص التالية:

- زر: `button`.
- مفاتيح التعديل (`true` إذا تم الضغط عليه): `altKey`, `ctrlKey`, `shiftKey` و `metaKey` (Mac).
- إذا كنت تريد التعامل معها `key:Ctrl`, لذا لا تنسى Mac مستخدمي , عادة ما يستخدم `key:Cmd`, لذلك من الأفضل التحقق `if (e.metaKey || e.ctrlKey)`.

- إحداثيات النافذة: `clientX/clientY`.
- إحداثيات المستند: `pageX/pageY`.

الإجراء الافتراضي للحدث `mousedown` هو تحديد النص,  إذا كان من المرجح أن يتدخل في الواجهة يمكنك إلغاؤه.

في الفصل التالي ، سنرى المزيد من التفاصيل حول الأحداث التي تتبع حركة المؤشر وكيفية تتبع تغييرات العناصر تحت المؤشر