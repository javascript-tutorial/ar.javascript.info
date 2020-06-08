# أحجام النوافذ والتمرير

كيف نجد عرض وارتفاع نافذة المتصفح؟ كيف نحصل على العرض والارتفاع الكاملين للوثيقة ، بما في ذلك الجزء المسحوب؟ كيف ننتقل الصفحة باستخدام جافا سكريبت؟

بالنسبة لمعظم هذه الطلبات ، يمكننا استخدام عنصر المستند الجذر `document.documentElement` ، الذي يتوافق مع العلامة` <html> `. ولكن هناك طرق وخصائص إضافية مهمة بما يكفي للنظر فيها.

## عرض / ارتفاع النافذة

للحصول على عرض النافذة وارتفاعها ، يمكننا استخدام `clientWidth / clientHeight` من` document.documentElement`:

![](document-client-width-height.svg)

```online
على سبيل المثال ، يعرض هذا الزر ارتفاع النافذة:

<button onclick="alert(document.documentElement.clientHeight)">alert(document.documentElement.clientHeight)</button>
```

````warn header="ليس `window.innerWidth / Height`"
كما تدعم المستعرضات الخصائص `window.innerWidth / innerHeight`. يبدون مثل ما نريد. فلماذا لا تستخدمها بدلاً من ذلك؟

إذا كان هناك شريط تمرير ، ويحتل بعض المساحة ، يوفر `clientWidth / clientHeight` العرض / الارتفاع بدونه (اطرحه). بمعنى آخر ، تقوم بإرجاع عرض / ارتفاع الجزء المرئي من المستند المتاح للمحتوى.

... و `window.innerWidth / innerHeight` تتضمن شريط التمرير.

إذا كان هناك شريط تمرير ، ويشغل بعض المساحة ، فإن هذين الخطين يعرضان قيمًا مختلفة:
```js run
alert( window.innerWidth ); // full window width
alert( document.documentElement.clientWidth ); // window width minus the scrollbar
```

في معظم الحالات ، نحتاج إلى عرض النافذة * المتوفرة *: لرسم شيء ما أو وضعه. هذا هو: داخل أشرطة التمرير إذا كان هناك أي. لذا يجب علينا استخدام `documentElement.clientHeight / Width`.
`` ``

`` `warn header =" "DOCTYPE` مهم"
يرجى ملاحظة: قد تعمل خصائص الهندسة عالية المستوى بشكل مختلف قليلاً عندما لا يكون هناك <! DOCTYPE HTML> `في HTML. الأشياء الغريبة ممكنة.

في HTML الحديثة يجب أن نكتب دائمًا "DOCTYPE".
``

## عرض / ارتفاع الوثيقة

نظريًا ، نظرًا لأن عنصر المستند الجذر هو `document.documentElement` ، ويشتمل على كل المحتوى ، يمكننا قياس حجم المستند بالكامل على أنه` document.documentElement.scrollWidth / ScrollHeight`.

ولكن في هذا العنصر ، بالنسبة للصفحة بأكملها ، لا تعمل هذه الخصائص على النحو المنشود. في Chrome / Safari / Opera إذا لم يكن هناك تمرير ، فقد يكون `documentElement.scrollHeight` أقل من` documentElement.clientHeight`! يبدو هراء ، غريب ، أليس كذلك؟

للحصول على ارتفاع المستند بشكل موثوق ، يجب أن نأخذ الحد الأقصى من هذه الخصائص:

```js run
let scrollHeight = Math.max(
  document.body.scrollHeight, document.documentElement.scrollHeight,
  document.body.offsetHeight, document.documentElement.offsetHeight,
  document.body.clientHeight, document.documentElement.clientHeight
);

alert('Full document height, with scrolled out part: ' + scrollHeight);
```

لما ذلك؟ من الأفضل ألا تسأل. هذه التناقضات تأتي من العصور القديمة ، وليس منطق "ذكي".

## احصل على التمرير الحالي [# page-roll]

عناصر DOM لها حالة التمرير الحالية في `elem.scrollLeft / rollTop`.

بالنسبة إلى تمرير المستند ، يعمل المستند document.documentElement.scrollLeft / Top` في معظم المتصفحات ، باستثناء المتصفحات القديمة التي تستند إلى WebKit ، مثل Safari (الخطأ [5991] (https://bugs.webkit.org/show_bug.cgi؟id=5991) ) ، حيث يجب أن نستخدم `document.body` بدلاً من` document.documentElement`.

لحسن الحظ ، ليس علينا أن نتذكر هذه الخصائص على الإطلاق ، لأن التمرير متاح في الخصائص الخاصة `window.pageXOffset/pageYOffset`:

```js run
alert('Current scroll from the top: ' + window.pageYOffset);
alert('Current scroll from the left: ' + window.pageXOffset);
```

هذه الخصائص للقراءة فقط.

## التمرير: التمرير إلى التمرير التمرير التمرير العرضي [# window-تمرير]

احذر
لتمرير الصفحة من JavaScript ، يجب بناء DOM بالكامل.

على سبيل المثال ، إذا حاولنا تمرير الصفحة من البرنامج النصي في `<head>` ، فلن تعمل.
``

يمكن تمرير العناصر العادية عن طريق تغيير `التمرير / التمرير لليسار`.

يمكننا فعل الشيء نفسه للصفحة باستخدام `document.documentElement.scrollTop / Left` (باستثناء Safari ، حيث يجب استخدام` document.body.scrollTop / Left` بدلاً من ذلك).

بدلاً من ذلك ، هناك حل أبسط وعالمي: طرق خاصة [window.scrollBy (x، y)] (mdn: api / Window / rollBy) و [window.scrollTo (pageX، pageY)] (mdn: api / Window / rollTo) .

- طريقة `التمرير (x، y) 'تقوم بتمرير الصفحة * بالنسبة إلى موقعها الحالي *. على سبيل المثال ، يؤدي `التمرير (0،10)` إلى تمرير الصفحة `10 بكسل` لأسفل.

    `` online
    يوضح الزر أدناه هذا:

    <button onclick = "window.scrollBy (0،10)"> window.scrollBy (0،10) </button>
    ``
- طريقة `التمرير (pageX ، pageY)` تقوم بتمرير الصفحة * إلى إحداثيات مطلقة * ، بحيث يكون للزاوية العلوية اليسرى للجزء المرئي إحداثيات `((pageX ، pageY)` بالنسبة إلى الزاوية العلوية اليسرى للمستند. الأمر أشبه بإعداد `التمرير الأيسر / التمرير العلوي`.

    للتمرير إلى البداية ، يمكننا استخدام `التمرير (0،0)`.
    ```online
    <button onclick="window.scrollTo(0,0)">window.scrollTo(0,0)</button>
    ```

تعمل هذه الطرق لجميع المتصفحات بنفس الطريقة.

## scrollIntoView

للاستكمال ، دعنا نغطي طريقة أخرى: [elem.scrollIntoView (top)] (mdn: api / Element / rollIntoView).

يؤدي استدعاء `elem.scrollIntoView (أعلى)` إلى تمرير الصفحة لإظهار `elem`. لها حجة واحدة:

- إذا كان `top = true` (هذا هو الافتراضي) ، فسيتم تمرير الصفحة لإظهار` elem` في أعلى النافذة. يتم محاذاة الحافة العلوية للعنصر مع أعلى النافذة.
- إذا كان `top = false` ، فتمرر الصفحة لتظهر` elem` في الأسفل. يتم محاذاة الحافة السفلية للعنصر مع أسفل النافذة.

```online
يمرر الزر أدناه الصفحة لإظهار نفسها في أعلى النافذة:

<button onclick = "this.scrollIntoView ()"> this.scrollIntoView () </button>

وهذا الزر يقوم بتمرير الصفحة لإظهارها في الأسفل:

<button onclick="this.scrollIntoView(false)">this.scrollIntoView(false)</button>
```

## منع التمرير

نحتاج أحيانًا إلى جعل المستند "غير قابل للتمرير". على سبيل المثال ، عندما نحتاج إلى تغطيتها برسالة كبيرة تتطلب اهتمامًا فوريًا ، ونريد من الزائر أن يتفاعل مع هذه الرسالة ، وليس مع المستند.

لجعل المستند غير قابل للتمرير ، يكفي تعيين `document.body.style.overflow =" hidden "`. سيتم تجميد الصفحة في التمرير الحالي.

```online
جربها:

<button onclick="document.body.style.overflow = 'hidden'">document.body.style.overflow = 'hidden'</button>

<button onclick="document.body.style.overflow = ''">document.body.style.overflow = ''</button>

يجمد الزر الأول التمرير ، ويستأنفه الزر الثاني.
``

يمكننا استخدام نفس التقنية "لتجميد" التمرير للعناصر الأخرى ، وليس فقط لـ `المستند.

عيب الطريقة هو اختفاء شريط التمرير. إذا كانت تحتل بعض المساحة ، فإن هذه المساحة الآن خالية ، ويزداد المحتوى لملئها.

يبدو هذا غريبًا بعض الشيء ، ولكن يمكن التعامل معه إذا قارنا `ClientWidth` قبل التجميد وبعده ، وإذا زاد (اختفى شريط التمرير) ، فأضف` padding` إلى `document.body` بدلاً من شريط التمرير ، إلى حافظ على عرض المحتوى كما هو.

## الملخص

الهندسة:

- عرض / ارتفاع الجزء المرئي من المستند (عرض / ارتفاع منطقة المحتوى): `document.documentElement.clientWidth / Height`
- عرض / ارتفاع الوثيقة بأكملها ، مع الجزء الممرر:

    ```js
    let scrollHeight = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    );
    ```

التمرير:

- قراءة التمرير الحالي: `window.pageYOffset / pageXOffset`.
- تغيير التمرير الحالي:

    - `window.scrollTo (pageX ، pageY)` - الإحداثيات المطلقة ،
     - `window.scrollBy (x، y)` - انتقل نسبيًا إلى المكان الحالي ،
     - `elem.scrollIntoView (أعلى)` - قم بالتمرير لجعل `elem` مرئيًا (محاذاة مع الجزء العلوي / السفلي من النافذة).
