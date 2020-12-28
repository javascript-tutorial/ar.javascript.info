# تعدد الأشكال

<<<<<<< HEAD
تتطور لغة جافاسكريبت بثبات. تظهر مقترحات جديدة للغة بانتظام, يتم تحليلها و, إذا كانت جديرة بالإهتمام, يتم إضافتها إلى القائمة في <https://tc39.github.io/ecma262/> و من ثم التقدم في [specification](http://www.ecma-international.org/publications/standards/Ecma-262.htm).
=======
# Polyfills and transpilers
>>>>>>> 13da056653754765b50aa5a9f706f84a4a0d6293

الفرق خلف محركات جافاسكريبت لديهم افكارهم الخاصه عن ماذا يقوموا بتنفيذه اولاً. قد يقررون تنفيذ المقترحات الموجودة في المسودة وتأجيل الأشياء الموجودة بالفعل في المواصفات, لأنهم أقل إثارة للاهتمام أو يصعب القيام بهم.

لذا فمن الشائع تمامًا أن يقوم المحرك بتطبيق الجزء القياسي فقط.

صفحة جيدة لمعرفة الحالة الحالية لدعم ميزات اللغة هي <https://kangax.github.io/compat-table/es6/> (إنها ضخمه, لدينا الكثير لندرسه بعد).

As programmers, we'd like to use most recent features. The more good stuff - the better!

<<<<<<< HEAD
عندما نستخدم الميزات الحديثة للغة, قد تفشل بعض المحركات في دعم مثل هذا الكود. كما يقال, لا يتم تنفيذ جميع الميزات في كل مكان.

هنا `Babel` تأتي لإنقاذ الموقف.

[Babel](https://babeljs.io) هي [transpiler](https://en.wikipedia.org/wiki/Source-to-source_compiler). إنها تعيد كتابة كود جافاسكريبت الحديث إلى معايير سابقة.

فعلياً, يوجد قسمين في `Babel`:

1. الأول, برنامج المترجم, الذي يعيد كتابة الكود. يقوم المطور بتشغيله على جهاز الكمبيوتر الخاص به. إنه يعيد كتابة الكود للمعايير القديمة. ثم يتم تسليم الكود إلى الموقع الإلكتروني للمستخدمين. أنظمة بناء المشاريع الحديثة مثل [webpack](http://webpack.github.io/) توفير وسائل لتشغيل الترجمة تلقائيًا عند كل تغيير للكود, بحيث يسهل الاندماج في عملية التطوير.

2. الثاني, تعدد الأشكال.

   قد تتضمن ميزات اللغة الجديدة وظائف مضمنة جديدة وتركيبات بناء جملة.
   المترجم يقوم بإعادة بناء الكود, تحويل بناء الجملة إلى التركيبات القديمة. و لكن بالنسبة للدوال المُضمنه الجديدة, نريد تنفيذهم. جافاسكريبت هى لغه ديناميكيه للغايه, الـ سكريبتات يمكن ان تقول بـ إضافة/تعديل أي دوال, بحيث يتصرفون وفقًا للمعايير الحديثة.

   الـ سكريبت الذي يقوم بـ تعديل/إضافة الدوال الجديده يسمى "polyfill". إنه "يملأ" الفجوة و يضيف كل الدوال المفقودة.

   إثنان مهمان من `polyfills` هما:

   - [core js](https://github.com/zloirock/core-js) الذي يوفر الكثير, يسمح بتضمين الميزات المطلوبة فقط.
   - [polyfill.io](http://polyfill.io) خدمة توفر سكريبت مع `polyfills`, اعتمادًا على الميزات ومتصفح المستخدم.

لذا, إذا كنا سنستخدم ميزات اللغة الحديثة, الـ `transpiler` و `polyfill` ضروريان.

## أمثلة في البرنامج التعليمي

````online
يمكن تشغيل معظم الأمثلة في مكانها, مثل ذلك:

```js run
alert('إضغط زر "Play" في الجزء الأيمن العلوي للتشغيل');
```

لن تعمل الأمثلة التي تستخدم جافاسكريبت الحديثة إلا إذا كان متصفحك يدعمها.
````

```offline
بما أنك تقرأ النسخة بلا إنترنت, الأمثله غير قابلة للتشغيل في `PDF`. في `EPUB` يمكن لبعضهم أن يعمل.
```

عادةً ما يكون `Google Chrome` هو الأحدث مع ميزات اللغة, جيد فى تشغيل العروض التوضيحيه بدون اى مترجمات `transpilers`, ولكن المتصفحات الحديثة الأخرى تعمل أيضًا بشكل جيد.
=======
From the other hand, how to make out modern code work on older engines that don't understand recent features yet?

There are two tools for that:

1. Transpilers.
2. Polyfills.

Here, in this chapter, our purpose is to get the gist of how they work, and their place in web development.

## Transpilers

A [transpiler](https://en.wikipedia.org/wiki/Source-to-source_compiler) is a special piece of software that can parse ("read and understand") modern code, and rewrite it using older syntax constructs, so that the result would be the same.

E.g. JavaScript before year 2020 didn't have the "nullish coalescing operator" `??`. So, if a visitor uses an outdated browser, it may fail to understand the code like `height = height ?? 100`.

A transpiler would analyze our code and rewrite `height ?? 100` into `(height !== undefined && height !== null) ? height : 100`.

```js
// before running the transpiler
height = height ?? 100;

// after running the transpiler
height = (height !== undefined && height !== null) ? height : 100;
```

Now the rewritten code is suitable for older JavaScript engines.

Usually, a developer runs the transpiler on their own computer, and then deploys the transpiled code to the server.

Speaking of names, [Babel](https://babeljs.io) is one of the most prominent transpilers out there. 

Modern project build systems, such as [webpack](http://webpack.github.io/), provide means to run transpiler automatically on every code change, so it's very easy to integrate into development process.

## Polyfills

New language features may include not only syntax constructs and operators, but also built-in functions.

For example, `Math.trunc(n)` is a function that "cuts off" the decimal part of a number, e.g `Math.trunc(1.23) = 1`.

In some (very outdated) JavaScript engines, there's no `Math.trunc`, so such code will fail.

As we're talking about new functions, not syntax changes, there's no need to transpile anything here. We just need to declare the missing function.

A script that updates/adds new functions is called "polyfill". It "fills in" the gap and adds missing implementations.

For this particular case, the polyfill for `Math.trunc` is a script that implements it, like this:

```js
if (!Math.trunc) { // if no such function
  // implement it
  Math.trunc = function(number) {
    // Math.ceil and Math.floor exist even in ancient JavaScript engines
    // they are covered later in the tutorial
    return number < 0 ? Math.ceil(number) : Math.floor(number);
  };
}
```

JavaScript is a highly dynamic language, scripts may add/modify any functions, even including built-in ones. 

Two interesting libraries of polyfills are:
- [core js](https://github.com/zloirock/core-js) that supports a lot, allows to include only needed features.
- [polyfill.io](http://polyfill.io) service that provides a script with polyfills, depending on the features and user's browser.


## Summary

In this chapter we'd like to motivate you to study modern and even "bleeding-edge" language features, even if they aren't yet well-supported by JavaScript engines.

Just don't forget to use transpiler (if using modern syntax or operators) and polyfills (to add functions that may be missing). And they'll ensure that the code works.

For example, later when you're familiar with JavaScript, you can setup a code build system based on [webpack](http://webpack.github.io/) with [babel-loader](https://github.com/babel/babel-loader) plugin.

Good resources that show the current state of support for various features:
- <https://kangax.github.io/compat-table/es6/> - for pure JavaScript.
- <https://caniuse.com/> - for browser-related functions.

P.S. Google Chrome is usually the most up-to-date with language features, try it if a tutorial demo fails. Most tutorial demos work with any modern browser though.

>>>>>>> 13da056653754765b50aa5a9f706f84a4a0d6293
