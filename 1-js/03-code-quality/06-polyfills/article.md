# تعدد الأشكال

# البوليفيلز والمترجمات

<<<<<<< HEAD
الفرق خلف محركات جافا سكريبت لديهم افكارهم الخاصه عن ماذا يقوموا بتنفيذه اولاً. قد يقررون تنفيذ المقترحات الموجودة في المسودة وتأجيل الأشياء الموجودة بالفعل في المواصفات, لأنهم أقل إثارة للاهتمام أو يصعب القيام بهم.
=======
The JavaScript language steadily evolves. New proposals to the language appear regularly, they are analyzed and, if considered worthy, are appended to the list at <https://tc39.github.io/ecma262/> and then progress to the [specification](https://www.ecma-international.org/publications-and-standards/standards/ecma-262/).
>>>>>>> d694e895efe89922a109702085b6ca1efeffea10

لذا فمن الشائع تمامًا أن يقوم المحرك بتطبيق الجزء القياسي فقط.

<<<<<<< HEAD
صفحة جيدة لمعرفة الحالة الحالية لدعم ميزات اللغة هي <https://kangax.github.io/compat-table/es6/> (إنها ضخمه, لدينا الكثير لندرسه بعد).
=======
So it's quite common for an engine to implement only part of the standard.
>>>>>>> d694e895efe89922a109702085b6ca1efeffea10

كمبرمجين، نود استخدام الميزات الأحدث. كلما كان هناك المزيد من الميزات الجيدة - كلما كان أفضل!

من ناحية أخرى، كيف يمكننا جعل شفرتنا الحديثة تعمل على محركات أقدم لا تفهم الميزات الحديثة بعد؟

هناك أداتان لذلك:

1. المترجمات.
2. البوليفيلز.

هنا، في هذا الفصل، هدفنا هو الحصول على فكرة عامة حول كيفية عملهما، ومكانتهما في تطوير الويب.

## المحوّلات اللغوية

المحوّل اللغوي (Transpiler) هو برنامج خاص يمكنه تحليل الشفرة الحديثة وإعادة كتابتها باستخدام بنى بناء لغوية أقدم، بحيث يتم الحصول على نفس النتيجة.

<<<<<<< HEAD
على سبيل المثال، كان لغة JavaScript قبل عام 2020 لا تتضمن "عامل تجميع القيم الفارغة Nullish Coalescing" `??`. لذلك، إذا استخدم الزائر متصفح قديم، فقد يفشل في فهم الشفرة مثل `height = height ?? 100`.
=======
A [transpiler](https://en.wikipedia.org/wiki/Source-to-source_compiler) is a special piece of software that translates source code to another source code. It can parse ("read and understand") modern code and rewrite it using older syntax constructs, so that it'll also work in outdated engines.
>>>>>>> d694e895efe89922a109702085b6ca1efeffea10

في هذه الحالة، يقوم المحوّل اللغوي بتحليل الشفرة وإعادة كتابة `height ?? 100` إلى `(height !== undefined && height !== null) ? height : 100`.

```js
// قبل تشغيل المحول
height = height ?? 100;

// بعد تشغيل المحول
height = (height !== undefined && height !== null) ? height : 100;
```

الآن، أصبحت الشفرة المعدّلة مناسبة لمحرّكات JavaScript القديمة.

عادةً، يقوم المطوّر بتشغيل المحوّل اللغوي على جهازه الخاص، ثم ينشر الشفرة المحوّلة على الخادم.

<<<<<<< HEAD
وبالنسبة للاسم، فإن [Babel](https://babeljs.io) هو أحد أشهر المحوّلات اللغوية المتاحة.

توفر أنظمة بناء المشاريع الحديثة، مثل [webpack](http://webpack.github.io/)، وسائل لتشغيل المحوّل اللغوي تلقائيًا عند كل تغيير في الشفرة، لذلك فمن السهل جدًا دمجه في عملية التطوير.
=======
Speaking of names, [Babel](https://babeljs.io) is one of the most prominent transpilers out there.

Modern project build systems, such as [webpack](https://webpack.js.org/), provide a means to run a transpiler automatically on every code change, so it's very easy to integrate into the development process.
>>>>>>> d694e895efe89922a109702085b6ca1efeffea10

## البوليفيلز

قد تشمل الميزات اللغوية الجديدة لغة البرمجةليست مجرد بنى بناء لغوية وعوامل تجميع، بل يمكن أيضًا أن تشمل وظائف مدمجة.

<<<<<<< HEAD
على سبيل المثال، تعتبر `Math.trunc(n)` وظيفة تقوم بـ "قص" الجزء العشري من رقم، على سبيل المثال `Math.trunc(1.23) = 1`.
=======
For example, `Math.trunc(n)` is a function that "cuts off" the decimal part of a number, e.g `Math.trunc(1.23)` returns `1`.
>>>>>>> d694e895efe89922a109702085b6ca1efeffea10

في بعض محركات JavaScript القديمة جدًا، لا يوجد `Math.trunc`، لذلك ستفشل هذه الشفرة.

نظرًا لأننا نتحدث عن وظائف جديدة، وليس تغييرات في البنى اللغوية، فلا حاجة لتحويل أي شيء هنا. نحتاج فقط إلى إعلان الوظيفة المفقودة.

يُطلق على البرنامج النصي الذي يحدث/يضيف الوظائف الجديدة هناك "برنامج الإضافات" "polyfill". يعمل هذا البرنامج على "ملء الفجوة" وإضافة التنفيذات المفقودة.

بالنسبة لهذه الحالة الخاصة، فإن Polyfill لـ `Math.trunc` هو برنامج ينفذه، مثل هذا: 

```js
if (!Math.trunc) { // إذا لم يوجد هذه الوظيفة
  // اضفها
  Math.trunc = function(number) {
    // تعتبر Math.ceil و Math.floor متوفرتين حتى في محركات JavaScript القديمة
    // سيتم شرحهما لاحقا في الدرس
    return number < 0 ? Math.ceil(number) : Math.floor(number);
  };
}
```

<<<<<<< HEAD
JavaScript هي لغة ديناميكية بشكل كبير، حيث يمكن للنصوص البرمجية إضافة/تعديل أي وظائف، بما في ذلك تلك المدمجة في اللغة.

هناك مكتبتان جديرتان بالاهتمام من بين مكتبات Polyfills:
- [core-js](https://github.com/zloirock/core-js) التي تدعم العديد من الميزات، وتسمح بتضمين الميزات المطلوبة فقط.
- خدمة [polyfill.io](http://polyfill.io) التي توفر برنامجًا نصّيًّا مع Polyfills، يعتمد على الميزات ومتصفح المستخدم.
=======
JavaScript is a highly dynamic language. Scripts may add/modify any function, even built-in ones.

Two interesting polyfill libraries are:
- [core js](https://github.com/zloirock/core-js) that supports a lot, allows to include only needed features.
- [polyfill.io](https://polyfill.io/) service that provides a script with polyfills, depending on the features and user's browser.
>>>>>>> d694e895efe89922a109702085b6ca1efeffea10


## الملخص

في هذا الفصل، نود تحفيزك على دراسة ميزات اللغة الحديثة وحتى "الحافة الحادة"، حتى لو لم يتم دعمها بشكل جيد بواسطة محركات JavaScript.

<<<<<<< HEAD
ولكن لا تنسَ استخدام المترجم (إذا استخدمت بنية عبارات أو عمليات حديثة) والبوليفيلز (لإضافة الوظائف التي قد تفتقر إليها). وسيضمنون أن يعمل الكود.

على سبيل المثال، عندما تصبح متعودًا على JavaScript، يمكنك إعداد نظام بناء الشفرة على أساس [webpack](http://webpack.github.io/) مع ملحق [babel-loader](https://github.com/babel/babel-loader).
=======
Just don't forget to use a transpiler (if using modern syntax or operators) and polyfills (to add functions that may be missing). They'll ensure that the code works.

For example, later when you're familiar with JavaScript, you can setup a code build system based on [webpack](https://webpack.js.org/) with the [babel-loader](https://github.com/babel/babel-loader) plugin.
>>>>>>> d694e895efe89922a109702085b6ca1efeffea10

هناك موارد جيدة توضح الحالة الحالية لدعم العديد من الميزات، وهي:
- <https://kangax.github.io/compat-table/es6/> - للجافاسكريبت الخام.
- <https://caniuse.com/> - لوظائف المتصفح.

ومن المعروف أن جوجل كروم هو الأكثر تحديثًا بالنسبة لميزات اللغة، جرب استخدامه إذا فشل تطبيق تعليمي. ومع ذلك، يعمل معظم تطبيقات التعليمات البرمجية مع أي متصفح حديث.

