# الإحداثيات

لتحريك العناصر ، يجب أن نكون على دراية بالإحداثيات.

تتعامل معظم طرق JavaScript مع أحد نظامي الإحداثيات:

1. ** نسبة إلى النافذة ** - تشبه "الموضع: ثابت" ، محسوبة من أعلى النافذة / الحافة اليسرى.
    - سنشير إلى هذه الإحداثيات كـ "clientX / clientY" ، وسيصبح سبب هذا الاسم واضحًا لاحقًا ، عندما ندرس خصائص الحدث.
2. ** بالنسبة إلى المستند ** - يشبه "الموضع: مطلق" في جذر المستند ، محسوبًا من أعلى المستند / الحافة اليسرى.
    - سنشير لهم `pageX / pageY`.

عندما يتم تمرير الصفحة إلى البداية ، بحيث يكون الركن العلوي / الأيسر من النافذة هو بالضبط أعلى / يسار الزاوية ، فإن هذه الإحداثيات تساوي بعضها البعض. ولكن بعد تغيرات المستند ، تتغير الإحداثيات النسبية للعناصر ، حيث تتحرك العناصر عبر النافذة ، بينما تظل الإحداثيات النسبية للمستندات كما هي.

في هذه الصورة ، نأخذ نقطة في المستند ونعرض إحداثياتها قبل التمرير (يسار) وبعده (يمين):

![](document-and-window-coordinates-scrolled.svg)

عند تمرير المستند:
- `pageY` - ظلت الإحداثيات النسبية للمستندات كما هي ، يتم حسابها من أعلى المستند (تم التمرير الآن).
- `العميل '- تغيرت إحداثيات النافذة (أصبح السهم أقصر) ، حيث اقتربت نفس النقطة من أعلى النافذة.

## إحداثيات العنصر: getBoundingClientRect

تُرجع الطريقة `elem.getBoundingClientRect ()` إحداثيات النافذة لمستطيل صغير يشتمل على "elem" ككائن [DOMRect] مدمج (https://www.w3.org/TR/geometry-1/#domrect ) صف دراسي.

خصائص `DOMRect` الرئيسية:

- `x / y` - إحداثيات X / Y لأصل المستطيل بالنسبة للنافذة ،
- `العرض / الارتفاع` - عرض / ارتفاع المستطيل (يمكن أن يكون سالبًا).

بالإضافة إلى ذلك ، هناك خصائص مشتقة:

- `أعلى / أسفل` - إحداثي Y لحافة المستطيل العلوي / السفلي ،
- "يسار / يمين" - إحداثي X لحافة المستطيل الأيسر / الأيمن.

```online
على سبيل المثال ، انقر فوق هذا الزر لرؤية إحداثيات نافذته:

<p><input id="brTest" type="button" value="Get coordinates using button.getBoundingClientRect() for this button" onclick='showRect(this)'/></p>

<script>
function showRect(elem) {
  let r = elem.getBoundingClientRect();
  alert(`x:${r.x}
y:${r.y}
width:${r.width}
height:${r.height}
top:${r.top}
bottom:${r.bottom}
left:${r.left}
right:${r.right}
`);
}
</script>

إذا قمت بتمرير الصفحة وتكرارها ، فستلاحظ أنه مع تغير موضع الزر النسبي للنافذة ، تتغير إحداثيات نافذتها (`y / top / bottom` إذا قمت بالتمرير عموديًا) أيضًا.
```

إليكم صورة ناتج `elem.getBoundingClientRect ()`:

![](coordinates.svg)

كما ترى ، يصف `x / y` و` width / height` المستطيل بالكامل. يمكن حساب الخصائص المشتقة منها بسهولة:

- `left = x`
- `top = y`
- `right = x + width`
- `bottom = y + height`

يرجى الملاحظة:

- قد تكون الإحداثيات كسور عشرية ، مثل `10.5`. هذا طبيعي ، يستخدم المتصفح داخليًا الكسور في الحسابات. لا يتعين علينا تقريبها عند الضبط على `style.left / top`.
- قد تكون الإحداثيات سلبية. على سبيل المثال ، إذا تم تمرير الصفحة بحيث يكون "elem" أعلى النافذة الآن ، فإن "elem.getBoundingClientRect (). top" هو سلبي.

```عنوان مختصر="لماذا هناك حاجة إلى الخصائص المشتقة؟ لماذا يوجد "أعلى / يسار" إذا كان هناك "x / y"؟"
رياضيا ، يتم تعريف المستطيل بشكل فريد بنقطة البداية `` (س ، ص) `وناقل الاتجاه` (العرض والارتفاع) `. لذا فإن الخصائص الإضافية المشتقة هي للسهولة في التعامل بها.

من الناحية الفنية ، من الممكن أن يكون "العرض / الارتفاع" سالبًا ، مما يسمح للمستطيل "الموجه" ، على سبيل المثال لتمثيل اختيار الماوس مع بداية ونهاية تم وضع علامة عليها بشكل صحيح.

تعني قيم "العرض / الارتفاع" السلبية أن المستطيل يبدأ من الزاوية السفلية اليمنى ثم "ينمو" إلى اليسار.

إليك مستطيل يحتوي على "عرض" و "ارتفاع" سالب (على سبيل المثال ، "عرض = -200" ، "ارتفاع = -100"):

![](coordinates-negative.svg)

كما ترى ، `اليسار / الأعلى` لا يساوي` x / y` في هذه الحالة.

من الناحية العملية ، يُرجع `elem.getBoundingClientRect ()` دائمًا العرض / الارتفاع الموجب ، وهنا نذكر `العرض / الارتفاع` السلبي فقط لكي تفهم لماذا هذه الخصائص التي تبدو مكررة ليست في الواقع مكررة.
```

```عنوان تحذيري"Internet Explorer و Edge: لا يوجد دعم لـ`x/y`"
لا يدعم Internet Explorer و Edge خصائص `x / y` لأسباب تاريخية.

لذلك يمكننا إما إنشاء ملف متعدد (أضف حروفًا في `DomRect.prototype`) أو فقط استخدام` أعلى / يسار` ، لأنها دائمًا ما تكون مثل `x / y` لـ` عرض / ارتفاع` إيجابي ، خاصة في نتيجة `elem.getBoundingClientRect ()`.
```

```عنوان تحذيري="الإحداثيات إلى اليمين / الأسفل تختلف عن خصائص موضع CSS"
هناك تشابه واضح بين الإحداثيات النسبية للنافذة و "الموضع: ثابت" في CSS.

ولكن في وضع CSS ، تعني خاصية `right` المسافة من الحافة اليمنى ، وتعني خاصية` bottom` المسافة من الحافة السفلية.

إذا نظرنا فقط إلى الصورة أعلاه ، يمكننا أن نرى أنه في JavaScript ليس كذلك. يتم حساب جميع إحداثيات النوافذ من الزاوية العلوية اليسرى ، بما في ذلك هذه الإحداثيات.
```

## elementFromPoint (x، y) [#elementFromPoint]

يؤدي استدعاء "document.elementFromPoint (x، y)` إلى إرجاع العنصر الأكثر تداخلاً في إحداثيات النافذة `(x، y)`.

الصيغة هي:

```js
let elem = document.elementFromPoint(x, y);
```

على سبيل المثال ، يبرز الرمز أدناه ويخرج علامة العنصر الموجود الآن في منتصف النافذة:

```js run
let centerX = document.documentElement.clientWidth / 2;
let centerY = document.documentElement.clientHeight / 2;

let elem = document.elementFromPoint(centerX, centerY);

elem.style.background = "red";
alert(elem.tagName);
```

نظرًا لأنه يستخدم إحداثيات النافذة ، فقد يختلف العنصر اعتمادًا على موضع التمرير الحالي.

````عنوان تحذيري="بالنسبة إلى إحداثيات خارج النافذة ، يُرجع` elementFromPoint` `القيمة الخالية`
لا تعمل الطريقة `document.elementFromPoint (x، y)` إلا إذا كانت "(x، y)` داخل المنطقة المرئية.

إذا كانت أي من الإحداثيات سلبية أو تجاوزت عرض / ارتفاع النافذة ، فتُرجع `null`.

إليك خطأ نموذجي قد يحدث إذا لم نتحقق منه:

```js
let elem = document.elementFromPoint(x, y);
// if the coordinates happen to be out of the window, then elem = null
*!*
elem.style.background = ''; // Error!
*/!*
```
````

## استخدام الوضع "الثابت"

معظم الوقت نحتاج إحداثيات من أجل وضع شيء ما.

لإظهار شيء بالقرب من عنصر ، يمكننا استخدام `getBoundingClientRect` للحصول على إحداثياته ، ثم CSS` position` مع `left / top` (أو` right / bottom`).

على سبيل المثال ، تعرض الدالة `createMessageUnder (elem، html)` أدناه الرسالة تحت `elem`:

```js
let elem = document.getElementById("coords-show-mark");

function createMessageUnder(elem, html) {
  // create message element
  let message = document.createElement('div');
  // better to use a css class for the style here
  message.style.cssText = "position:fixed; color: red";

*!*
  // عند تعيين إحداثيات  ، لا تنسى "px"!
  let coords = elem.getBoundingClientRect();

  message.style.left = coords.left + "px";
  message.style.top = coords.bottom + "px";
*/!*

  message.innerHTML = html;

  return message;
}

/// الاستخدام:
// أضفه لمدة 5 ثوانٍ في document
let message = createMessageUnder(elem, 'Hello, world!');
document.body.append(message);
setTimeout(() => message.remove(), 5000);
```

```online
Click the button to run it:

<button id="coords-show-mark">Button with id="coords-show-mark", the message will appear under it</button>
```

يمكن تعديل الكود لإظهار الرسالة على اليسار ، اليمين ، أدناه ، تطبيق الرسوم المتحركة CSS "تتلاشى فيه" وهلم جرا. هذا سهل ، لأن لدينا جميع إحداثيات وأحجام العنصر.

لكن لاحظ التفاصيل المهمة: عندما يتم تمرير الصفحة ، تتدفق الرسالة بعيدًا عن الزر.

والسبب واضح: يعتمد عنصر الرسالة على "الموضع: ثابت" ، لذلك يبقى في نفس مكان النافذة أثناء تمرير الصفحة بعيدًا.

لتغيير ذلك ، نحتاج إلى استخدام الإحداثيات المستندة إلى المستندات و "الموضع: مطلق".

## إحداثيات المستند [#getCoords]

تبدأ الإحداثيات المتعلقة بالمستند من الزاوية العلوية اليسرى من المستند ، وليس النافذة.

في CSS ، تتوافق إحداثيات النافذة مع "الموضع: ثابت" ، في حين أن إحداثيات المستند تشبه "الموضع: مطلق" في الأعلى.

يمكننا استخدام "الموضع: مطلق" و "أعلى / يسار" لوضع شيء ما في مكان معين من المستند ، بحيث يبقى هناك أثناء تمرير الصفحة. لكننا بحاجة إلى الإحداثيات الصحيحة أولاً.

لا توجد طريقة قياسية للحصول على إحداثيات المستند لعنصر. ولكن من السهل كتابتها.

يتم توصيل نظامي الإحداثيات بواسطة الصيغة:
- `pageY` =` clientY` + ارتفاع الجزء الرأسي القابل للتمرير من المستند.
- `pageX` =` clientX` + عرض الجزء الأفقي القابل للتمرير من المستند.

ستأخذ الدالة `getCoords (elem)` إحداثيات النافذة من `elem.getBoundingClientRect ()` وتضيف التمرير الحالي إليها:


```js
// get document coordinates of the element
function getCoords(elem) {
  let box = elem.getBoundingClientRect();

  return {
    top: box.top + window.pageYOffset,
    right: box.right + window.pageXOffset,
    bottom: box.bottom + window.pageYOffset,
    left: box.left + window.pageXOffset
  };
}
```

إذا استخدمناها في المثال أعلاه مع "الموضع: مطلق" ، فستظل الرسالة بالقرب من العنصر عند التمرير.

وظيفة `createMessageUnder` المعدلة:

```js
function createMessageUnder(elem, html) {
  let message = document.createElement('div');
  message.style.cssText = "*!*position:absolute*/!*; color: red";

  let coords = *!*getCoords(elem);*/!*

  message.style.left = coords.left + "px";
  message.style.top = coords.bottom + "px";

  message.innerHTML = html;

  return message;
}
```

## ملخص

تحتوي أي نقطة في الصفحة على إحداثيات:

1. بالنسبة إلى النافذة - `elem.getBoundingClientRect ()`.
2. بالنسبة إلى المستند - `elem.getBoundingClientRect ()` بالإضافة إلى تمرير الصفحة الحالية.

إحداثيات النوافذ رائعة للاستخدام مع "الموضع: ثابت" ، وإحداثيات المستند جيدة مع "الموضع: مطلق".

كلا النظامين المنسقين لهما إيجابيات وسلبيات ؛ هناك أوقات نحتاج فيها إلى واحد أو الآخر ، تمامًا مثل CSS `position`` مطلق` و` ثابت`.
