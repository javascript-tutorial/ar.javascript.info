# بيئة المتصفح ومواصفاته

<<<<<<< HEAD
تم إنشاء لغة JavaScript فى البداية لمتصفحات الويب، منذ ذلك الحين أصبح لها استخدمات ومنصات عديدة.

قد تكون تلك المنصة متصفح، خادوم ويب او *مضيف* آخر ولكن لكل واحد منهم وظيفته الخاصة التى يقوم بها .خصائص الـ JavaScript تسمى هذا *ببيئة المضيف*.

توفر بيئة العمل كائنات و وظائف خاصة إلى نواة اللغة. تعتبر المتصفحات وسيلة للتحكم بصفحات الويب. وتوفر الـ Node.js خواص من جانب الخادم, وما إلى ذلك.
=======
The JavaScript language was initially created for web browsers. Since then, it has evolved into a language with many uses and platforms.

A platform may be a browser, or a web-server or another *host*, or even a "smart" coffee machine if it can run JavaScript. Each of these provides platform-specific functionality. The JavaScript specification calls that a *host environment*.

A host environment provides its own objects and functions in addition to the language core. Web browsers give a means to control web pages. Node.js provides server-side features, and so on.
>>>>>>> 30a5d5e2a7c3504c9afd5028f83f4a696e60aede

إليك نظرة شاملة لما لدينا عند تشغيل جافا سكريبت في متصفح ويب:

![](windowObjects.svg)

لدينا كائن "الجذر" `window` . له دورين:

<<<<<<< HEAD
1. أولا، هو كائن عام لشفرة JavaScript، كما وصِف فى فصل <info:global-object>
2. ثانيًا، يمثل "نافذة المتصفح" ويوفر طرقا للتحكم فيها.
على سبيل المثال، نستخدمها هنا ككائن عام:
=======
1. First, it is a global object for JavaScript code, as described in the chapter <info:global-object>.
2. Second, it represents the "browser window" and provides methods to control it.

For instance, we can use it as a global object:
>>>>>>> 30a5d5e2a7c3504c9afd5028f83f4a696e60aede

```js run global
function sayHi() {
  alert("Hello");
}

// الدالات العامة هي طرق الكائن العام:
window.sayHi();
```

<<<<<<< HEAD
وهنا نستخدمها كنافذة متصفح لرؤية ارتفاع النافذة:
=======
And we can use it as a browser window, to show the window height:
>>>>>>> 30a5d5e2a7c3504c9afd5028f83f4a696e60aede

```js run
alert(window.innerHeight); // ارتفاع النافذة الداخلية
```

<<<<<<< HEAD
هناك المزيد من الأساليب والخصائص الخاصة بالنافذة، وسنغطيها لاحقًا.

## DOM (Document Object Model)

يمثل نموذج كائن المستند، أو اختصار DOM، محتوى الصفحة بالكامل ككائنات يمكن تعديلها.

كائن `document` هو "نقطة الدخول" الرئيسية للصفحة. يمكننا تغيير أو إنشاء أي شيء على الصفحة باستخدامه.
=======
There are more window-specific methods and properties, which we'll cover later.

## DOM (Document Object Model)

The Document Object Model, or DOM for short, represents all page content as objects that can be modified.
>>>>>>> 30a5d5e2a7c3504c9afd5028f83f4a696e60aede

على سبيل المثال:

```js run
// تغيير لون الخلفية إلى اللون الأحمر
document.body.style.background = "red";

// تغييره مرة أخرى بعد ثانية واحدة
setTimeout(() => document.body.style.background = "", 1000);
```

<<<<<<< HEAD
استخدمنا هنا `document.body.style`، ولكن هناك الكثير والكثير. يتم وصف الخصائص والأساليب في المواصفات: **DOM الحالة القياسية** فى <https://dom.spec.whatwg.org>
=======
Here, we used `document.body.style`, but there's much, much more. Properties and methods are described in the specification: [DOM Living Standard](https://dom.spec.whatwg.org).
>>>>>>> 30a5d5e2a7c3504c9afd5028f83f4a696e60aede

```smart header="DOM ليس فقط للمتصفحات"
 توضح مواصفات الـ DOM بنية المستند وتوفر كائنات لمعالجته. هناك أدوات غير المتصفح تستخدم الـ DOM أيضًا.

<<<<<<< HEAD
على سبيل المثال، يمكن للبرامج النصية من جانب الخادوم التي تقوم بتنزيل صفحات HTML ومعالجتها أيضًا استخدام الـDOM. قد يدعمون جزءًا فقط من المواصفات بالرغم من ذلك.
=======
For instance, server-side scripts that download HTML pages and process them can also use the DOM. They may support only a part of the specification though.
>>>>>>> 30a5d5e2a7c3504c9afd5028f83f4a696e60aede
```

يتم استخدام CSSOM مع الـ DOM عند تعديل قواعد النمط للمستند. من الناحية العملية، نادرًا ما تكون CSSOM مطلوبة، لأن قواعد CSS عادة ما تكون ثابتة. نادرًا ما نحتاج إلى إضافة/إزالة قواعد الـ CSS من الـ JavaScript، ولكن هذا ممكن أيضًا.

<<<<<<< HEAD
```smart header="CSSOM للتصنيف"
يتم تنظيم قواعد CSS وأوراق الأنماط بطريقة مختلفة عن HTML. هناك مواصفات منفصلة، [CSS Object Model (CSSOM)](https://www.w3.org/TR/cssom-1/), يشرح كيف يتم تمثيلها ككائنات، وكيفية قراءتها وكتابتها.
=======
The CSSOM is used together with the DOM when we modify style rules for the document. In practice though, the CSSOM is rarely required, because we rarely need to modify CSS rules from JavaScript (usually we just add/remove CSS classes, not modify their CSS rules), but that's also possible.
>>>>>>> 30a5d5e2a7c3504c9afd5028f83f4a696e60aede
```

## BOM (Browser Object Model)

يمثل نموذج كائن المتصفح (BOM) كائنات إضافية يوفرها المتصفح (البيئة المضيفة) للعمل مع كل شيء باستثناء المستند.

على سبيل المثال:

<<<<<<< HEAD
- يوفر كائن [navigator](mdn:api/Window/navigator) معلومات أساسية حول المتصفح ونظام التشغيل. هناك العديد من الخصائص ، لكن الأكثر شهرة هما: `navigator.userAgent` -- حول المتصفح الحالي، و `navigator.platform` -- حول النظام الأساسي (يمكن أن يساعد على تحديد الاختلاف بين Windows/Linux/Mac إلخ).
- يسمح لنا كائن [location](mdn:api/Window/location) بقراءة عنوان URL الحالي ويمكنه إعادة توجيه المتصفح إلى عنوان جديد.
=======
- The [navigator](mdn:api/Window/navigator) object provides background information about the browser and the operating system. There are many properties, but the two most widely known are: `navigator.userAgent` -- about the current browser, and `navigator.platform` -- about the platform (can help to differentiate between Windows/Linux/Mac etc).
- The [location](mdn:api/Window/location) object allows us to read the current URL and can redirect the browser to a new one.
>>>>>>> 30a5d5e2a7c3504c9afd5028f83f4a696e60aede

إليك كيفية استخدام كائن `location`:

```js run
alert(location.href); //يظهر الـ URL الحالى
if (confirm("Go to Wikipedia?")) {
  location.href = "https://wikipedia.org"; //إعادة توجيه المتصفح إلى عنوان URL آخر
}
```

<<<<<<< HEAD
تعد الدوال `alert/confirm/prompt` جزءًا من الـ BOM: فهي لا تتعلق مباشرة بالمستند، ولكنها تمثل طرق متصفح خالصة للتواصل مع المستخدم.

```smart header="مواصفات"
BOM هو جزء من مواصفات[HTML specification](https://html.spec.whatwg.org).

نعم سمعت ذلك جيدا. مواصفات الـ HTML في  <https://html.spec.whatwg.org>لا تتعلق فقط بـ "لغة HTML" (العلامات، السمات) ،ولكنه يغطي أيضًا مجموعة من الكائنات والأساليب وإضافات DOM الخاصة بالمتصفح. هذا هو "الـ HTML بعبارات عامة".أيضًا، تحتوي بعض الأجزاء على مواصفات إضافية مدرجة في <https://spec.whatwg.org>.
=======
The functions `alert/confirm/prompt` are also a part of the BOM: they are not directly related to the document, but represent pure browser methods for communicating with the user.

```smart header="Specifications"
The BOM is a part of the general [HTML specification](https://html.spec.whatwg.org).

Yes, you heard that right. The HTML spec at <https://html.spec.whatwg.org> is not only about the "HTML language" (tags, attributes), but also covers a bunch of objects, methods, and browser-specific DOM extensions. That's "HTML in broad terms". Also, some parts have additional specs listed at <https://spec.whatwg.org>.
>>>>>>> 30a5d5e2a7c3504c9afd5028f83f4a696e60aede
```

## ملخص

بالحديث عن المعايير، لدينا:

<<<<<<< HEAD
مواصفات الـ DOM
: يصف هيكل الوثيقة والتلاعب والأحداث، راجع <https://dom.spec.whatwg.org>.

مواصفات الـ CSSOM
: يصف أوراق الأنماط وقواعد الأنماط والتلاعب بها وربطها بالمستندات، راجع <https://www.w3.org/TR/cssom-1/>.
=======
DOM specification
: Describes the document structure, manipulations, and events, see <https://dom.spec.whatwg.org>.

CSSOM specification
: Describes stylesheets and style rules, manipulations with them, and their binding to documents, see <https://www.w3.org/TR/cssom-1/>.
>>>>>>> 30a5d5e2a7c3504c9afd5028f83f4a696e60aede

مواصفات الـ HTML
: تصف لغة HTML (مثل العلامات) وكذلك BOM (طراز كائن المتصفح) - وظائف المتصفح المختلفة: `setTimeout`, `alert`, `location` وما إلى ذلك، راجع <https://html.spec.whatwg.org>. يأخذ مواصفات الـ DOM ويوسعها بالعديد من الخصائص والأساليب الإضافية.

بالإضافة إلى ذلك، يتم وصف بعض الفئات بشكل منفصل في <https://spec.whatwg.org/>.

<<<<<<< HEAD
يرجى ملاحظة هذه الروابط، حيث أن هناك الكثير من الأشياء لمعرفة أنه من المستحيل تغطية وتذكر كل شيء.

عندما ترغب في القراءة عن خاصية أو طريقة ما، فإن دليل Mozilla على <https://developer.mozilla.org/en-US/search> هو أيضًا مورد جيد، ولكن المواصفات المقابلة قد تكون أفضل: إنها أكثر تعقيدًا وأطول وقتًا للقراءة، ولكنها ستجعل معرفتك الأساسية سليمة وكاملة.
=======
Please note these links, as there's so much to learn that it's impossible to cover everything and remember it all.

When you'd like to read about a property or a method, the Mozilla manual at <https://developer.mozilla.org/en-US/> is also a nice resource, but the corresponding spec may be better: it's more complex and longer to read, but will make your fundamental knowledge sound and complete.
>>>>>>> 30a5d5e2a7c3504c9afd5028f83f4a696e60aede

للعثور على شيء ما، غالبًا ما يكون من الملائم استخدام البحث على الإنترنت "WHATWG [مصطلح]" او "MDN [مصطلح]", مثل <https://google.com?q=whatwg+localstorage>, <https://google.com?q=mdn+localstorage>.

<<<<<<< HEAD
سنبدأ الآن في تعلم الـ DOM, لأن المستند يلعب الدور المركزي في واجهة المستخدم.
=======
Now, we'll get down to learning the DOM, because the document plays the central role in the UI.
>>>>>>> 30a5d5e2a7c3504c9afd5028f83f4a696e60aede
