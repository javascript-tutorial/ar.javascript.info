# بيئة المتصفح ومواصفاته

تم إنشاء لغة JavaScript فى البداية لمتصفحات الويب، منذ ذلك الحين أصبح لها استخدمات ومنصات عديدة.

قد تكون تلك المنصة متصفح، خادوم ويب او *مضيف* آخر ولكن لكل واحد منهم وظيفته الخاصة التى يقوم بها .خصائص الـ JavaScript تسمى هذا *ببيئة المضيف*.

توفر بيئة العمل كائنات و وظائف خاصة إلى نواة اللغة. تعتبر المتصفحات وسيلة للتحكم بصفحات الويب. وتوفر الـ Node.js خواص من جانب الخادم, وما إلى ذلك.

إليك نظرة شاملة لما لدينا عند تشغيل جافا سكريبت في متصفح ويب:

![](windowObjects.svg)

لدينا كائن "الجذر" `window` . له دورين:

1. أولا، هو كائن عام لشفرة JavaScript، كما وصِف فى فصل <info:global-object>
2. ثانيًا، يمثل "نافذة المتصفح" ويوفر طرقا للتحكم فيها.
على سبيل المثال، نستخدمها هنا ككائن عام:

```js run
function sayHi() {
  alert("Hello");
}

// الدالات العامة هي طرق الكائن العام:
window.sayHi();
```

وهنا نستخدمها كنافذة متصفح لرؤية ارتفاع النافذة:

```js run
alert(window.innerHeight); // ارتفاع النافذة الداخلية
```

هناك المزيد من الأساليب والخصائص الخاصة بالنافذة، وسنغطيها لاحقًا.

## DOM (Document Object Model)

يمثل نموذج كائن المستند، أو اختصار DOM، محتوى الصفحة بالكامل ككائنات يمكن تعديلها.

كائن `document` هو "نقطة الدخول" الرئيسية للصفحة. يمكننا تغيير أو إنشاء أي شيء على الصفحة باستخدامه.

على سبيل المثال:

```js run
// تغيير لون الخلفية إلى اللون الأحمر
document.body.style.background = "red";

// تغييره مرة أخرى بعد ثانية واحدة
setTimeout(() => document.body.style.background = "", 1000);
```

استخدمنا هنا `document.body.style`، ولكن هناك الكثير والكثير. يتم وصف الخصائص والأساليب في المواصفات: **DOM الحالة القياسية** فى <https://dom.spec.whatwg.org>

```smart header="DOM ليس فقط للمتصفحات"
 توضح مواصفات الـ DOM بنية المستند وتوفر كائنات لمعالجته. هناك أدوات غير المتصفح تستخدم الـ DOM أيضًا.

على سبيل المثال، يمكن للبرامج النصية من جانب الخادوم التي تقوم بتنزيل صفحات HTML ومعالجتها أيضًا استخدام الـDOM. قد يدعمون جزءًا فقط من المواصفات بالرغم من ذلك.
```

يتم استخدام CSSOM مع الـ DOM عند تعديل قواعد النمط للمستند. من الناحية العملية، نادرًا ما تكون CSSOM مطلوبة، لأن قواعد CSS عادة ما تكون ثابتة. نادرًا ما نحتاج إلى إضافة/إزالة قواعد الـ CSS من الـ JavaScript، ولكن هذا ممكن أيضًا.

```smart header="CSSOM للتصنيف"
يتم تنظيم قواعد CSS وأوراق الأنماط بطريقة مختلفة عن HTML. هناك مواصفات منفصلة، [CSS Object Model (CSSOM)](https://www.w3.org/TR/cssom-1/), يشرح كيف يتم تمثيلها ككائنات، وكيفية قراءتها وكتابتها.
```

## BOM (Browser Object Model)

يمثل نموذج كائن المتصفح (BOM) كائنات إضافية يوفرها المتصفح (البيئة المضيفة) للعمل مع كل شيء باستثناء المستند.

على سبيل المثال:

- يوفر كائن [navigator](mdn:api/Window/navigator) معلومات أساسية حول المتصفح ونظام التشغيل. هناك العديد من الخصائص ، لكن الأكثر شهرة هما: `navigator.userAgent` -- حول المتصفح الحالي، و `navigator.platform` -- حول النظام الأساسي (يمكن أن يساعد على تحديد الاختلاف بين Windows/Linux/Mac إلخ).
- يسمح لنا كائن [location](mdn:api/Window/location) بقراءة عنوان URL الحالي ويمكنه إعادة توجيه المتصفح إلى عنوان جديد.

إليك كيفية استخدام كائن `location`:

```js run
alert(location.href); //يظهر الـ URL الحالى
if (confirm("Go to Wikipedia?")) {
  location.href = "https://wikipedia.org"; //إعادة توجيه المتصفح إلى عنوان URL آخر
}
```

تعد الدوال `alert/confirm/prompt` جزءًا من الـ BOM: فهي لا تتعلق مباشرة بالمستند، ولكنها تمثل طرق متصفح خالصة للتواصل مع المستخدم.

```smart header="مواصفات"
BOM هو جزء من مواصفات[HTML specification](https://html.spec.whatwg.org).

نعم سمعت ذلك جيدا. مواصفات الـ HTML في  <https://html.spec.whatwg.org>لا تتعلق فقط بـ "لغة HTML" (العلامات، السمات) ،ولكنه يغطي أيضًا مجموعة من الكائنات والأساليب وإضافات DOM الخاصة بالمتصفح. هذا هو "الـ HTML بعبارات عامة".أيضًا، تحتوي بعض الأجزاء على مواصفات إضافية مدرجة في <https://spec.whatwg.org>.
```

## ملخص

بالحديث عن المعايير، لدينا:

مواصفات الـ DOM
: يصف هيكل الوثيقة والتلاعب والأحداث، راجع <https://dom.spec.whatwg.org>.

مواصفات الـ CSSOM
: يصف أوراق الأنماط وقواعد الأنماط والتلاعب بها وربطها بالمستندات، راجع <https://www.w3.org/TR/cssom-1/>.

مواصفات الـ HTML
: تصف لغة HTML (مثل العلامات) وكذلك BOM (طراز كائن المتصفح) - وظائف المتصفح المختلفة: `setTimeout`, `alert`, `location` وما إلى ذلك، راجع <https://html.spec.whatwg.org>. يأخذ مواصفات الـ DOM ويوسعها بالعديد من الخصائص والأساليب الإضافية.

بالإضافة إلى ذلك، يتم وصف بعض الفئات بشكل منفصل في <https://spec.whatwg.org/>.

يرجى ملاحظة هذه الروابط، حيث أن هناك الكثير من الأشياء لمعرفة أنه من المستحيل تغطية وتذكر كل شيء.

عندما ترغب في القراءة عن خاصية أو طريقة ما، فإن دليل Mozilla على <https://developer.mozilla.org/en-US/search> هو أيضًا مورد جيد، ولكن المواصفات المقابلة قد تكون أفضل: إنها أكثر تعقيدًا وأطول وقتًا للقراءة، ولكنها ستجعل معرفتك الأساسية سليمة وكاملة.

للعثور على شيء ما، غالبًا ما يكون من الملائم استخدام البحث على الإنترنت "WHATWG [مصطلح]" او "MDN [مصطلح]", مثل <https://google.com?q=whatwg+localstorage>, <https://google.com?q=mdn+localstorage>.

سنبدأ الآن في تعلم الـ DOM, لأن المستند يلعب الدور المركزي في واجهة المستخدم.
