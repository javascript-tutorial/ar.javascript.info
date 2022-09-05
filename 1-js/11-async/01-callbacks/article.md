

# مقدمة: callbacks

```warn header="نستخدم طرق المتصفح في الأمثلة هنا"
لتوضيح استخدام الاسترجاعات والوعود والمفاهيم المجردة الأخرى ، سنستخدم بعض طرق المتصفح: على وجه التحديد ، تحميل البرامج النصية وأداء التلاعب بالمستندات البسيطة.

إذا لم تكن على دراية بهذه الطرق ، وكان استخدامها في الأمثلة مربكًا ، فقد ترغب في قراءة بعض الفصول من [الجزء التالي](/document) من الدورة التعليمية.

على الرغم من أننا سنحاول توضيح الأمور على أي حال. لن يكون هناك أي شيء معقد بالفعل في المتصفح.
```

يتم توفير العديد من الوظائف من خلال بيئات استضافة JavaScript التي تسمح لك بجدولة الاحداث *الغير متزامنة*. بعبارة أخرى ، الإجراءات التي نبدأها الآن ، لكنها تنتهي لاحقًا.

علي سبيل المثال, داله واحده مثل دالة ال `setTimeout`.

هناك أمثلة أخرى على أرض الواقع من الإجراءات غير المتزامنة ، مثل تحميل البرامج النصية والوحدات (سنغطيها في الفصول اللاحقة).

ألق نظرة علي الدالة `loadScript(src)`, والتي تقوم بتحميل برنامج نصي عند أعطاءها مصدر البرنامج `src`:

```js
function loadScript(src) {
  // أنشئ العنصر <script> و قم بأضافته الي الصفحة
  // هذا الذي يفعله البرنامج النصي عند أعطاءه ال src لكي يبدأ تحميل ومن ثم يشغل البرنامج عند الاكتمال
  let script = document.createElement('script');
  script.src = src;
  document.head.append(script);
}
```

<<<<<<< HEAD
يتم إلحاق المستند الجديد ، الذي تم إنشاؤه ديناميكيًا ، العنصر `<script src="…">` نعطي له مصدر البرنامج النصي `src`. المتصفح بتحميله تلقائياً و يقوم بتشغيله عند اكتمال التحميل.
=======
It inserts into the document a new, dynamically created, tag `<script src="…">` with the given `src`. The browser automatically starts loading it and executes when complete.
>>>>>>> 53b35c16835b7020a0a5046da5a47599d313bbb8

نحن نستطيع أستخدام هذه الدالة كما موضح بالأسفل:

```js
// تحميل وتنفيذ البرنامج النصي في المسار المحدد
loadScript('/my/script.js');
```

يتم تنفيذ البرنامج النصي "بشكل غير متزامن" ، حيث يبدأ التحميل الآن ، ولكن يتم تشغيله لاحقًا ، عندما تنتهي الوظيفة بالفعل.

اذا كان هناك أي كود أسفل ال `loadScript(…)`, فأنه لن ينتظر حتي أنتهاء تحميل الملف النصي.

```js
loadScript('/my/script.js');
// الكود أسفل ال loadScript
// لا ينتظر تحميل البرنامج النصي حتى ينتهي
// ...
```

لنفترض أننا بحاجة إلى استخدام البرنامج النصي الجديد بمجرد تحميله. تعلن وظائف جديدة ، ونريد تشغيلها.

ولكن أذا فعلنا ذلك مباشرةً بعد أستدعاء الدالة `loadScript(…)`, هذا لن يعمل:

```js
loadScript('/my/script.js'); // البرنامج النصي يمتلك "function newFunction() {…}"

*!*
newFunction(); // لا يوجد مثل هذه الوظيفة!
*/!*
```

بطبيعة الحال ، ربما لم يكن لدى المتصفح وقت لتحميل البرنامج النصي. اعتبارا من الآن، الدالة `loadScript` لا توفر الوظيفة طريقة لتتبع إكمال التحميل. يتم تحميل البرنامج النصي وتشغيله في النهاية ، هذا كل ما في الأمر. ولكن نود أن نعرف متى يحدث ذلك ، لاستخدام وظائف ومتغيرات جديدة من هذا البرنامج النصي.

دعنا نضيف وظيفة `callback` كوسيطة ثانية إلى` loadScript` التي يجب تنفيذها عند تحميل البرنامج النصي:

```js
function loadScript(src, *!*callback*/!*) {
  let script = document.createElement('script');
  script.src = src;

*!*
  script.onload = () => callback(script);
*/!*

  document.head.append(script);
}
```

<<<<<<< HEAD
الآن إذا أردنا استدعاء وظائف جديدة من البرنامج النصي ، يجب أن نكتب ذلك في رد الاتصال:
=======
The `onload` event is described in the article <info:onload-onerror#loading-a-script>, it basically executes a function after the script is loaded and executed.

Now if we want to call new functions from the script, we should write that in the callback:
>>>>>>> 53b35c16835b7020a0a5046da5a47599d313bbb8

```js
loadScript('/my/script.js', function() {
  // يعمل دالة ال callback بعد تحميل البرنامج النصي
  newFunction(); // حتى الآن يعمل
  ...
});
```

هذه هي الفكرة: الوسيطة الثانية هي وظيفة (عادة ما تكون مجهولة المصدر) يتم تشغيلها عند اكتمال الإجراء.

إليك مثال قابل للتشغيل مع نص حقيقي:

```js run
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;
  script.onload = () => callback(script);
  document.head.append(script);
}

*!*
loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js', script => {
  alert(`Cool, the script ${script.src} is loaded`);
<<<<<<< HEAD
  alert( _ ); // دالة معلن عنها في البرنامج النصي المحمل
=======
  alert( _ ); // _ is a function declared in the loaded script
>>>>>>> 53b35c16835b7020a0a5046da5a47599d313bbb8
});
*/!*
```

وهذا ما يسمى نمط "قائم على الاسترجاع" للبرمجة غير المتزامنة. يجب أن توفر الدالة التي تفعل شيئًا بشكل غير متزامن وسيطة `callback` حيث نضع الوظيفة قيد التشغيل بعد اكتمالها.


هنا فعلنا ذلك `loadScript`, ولكن بالطبع هذا نهج عام.

## Callback في callback

كيف يمكننا تحميل نصين على التوالي: الأول والثاني بعده؟

الحل الطبيعي أن نضع أستدعاء ال `loadScript` الثاني داخل دالة الcallback, مثل هذا:

```js
loadScript('/my/script.js', function(script) {

  alert(`Cool, the ${script.src} is loaded, let's load one more`);

*!*
  loadScript('/my/script2.js', function(script) {
    alert(`Cool, the second script is loaded`);
  });
*/!*

});
```

بعد اكتمال "loadScript" الخارجي ، يبدأ الاستدعاء الداخلي.

ماذا لو أردنا اكثر من برنامج نصي آخر ...؟

```js
loadScript('/my/script.js', function(script) {

  loadScript('/my/script2.js', function(script) {

*!*
    loadScript('/my/script3.js', function(script) {
      // ...استمر بعد تحميل جميع البرامج النصية
    });
*/!*

  });

});
```

لذا ، فإن كل عمل جديد يكون داخل دالة ال callback. هذا جيد لبعض الإجراءات ، ولكن ليس جيدًا للعديد ، لذلك سنرى متغيرات أخرى قريبًا.

## معالجة الأخطاء

في الأمثلة المذكورة أعلاه لم نعتبر الأخطاء. ماذا لو فشل تحميل البرنامج النصي؟ يجب أن يكون دالة callback  الخاص بنا قادرًا على الرد على ذلك.

فيما يلي نسخة محسنة من `loadScript` الذي يتتبع أخطاء التحميل:

```js
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

*!*
  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));
*/!*

  document.head.append(script);
}
```

أنها تستدعي `callback(null, script)` للتحميل الناجح وتستدعي `callback(error)` لغير ذلك.

الاستخدام:
```js
loadScript('/my/script.js', function(error, script) {
  if (error) {
    // معالجة الخطأ هنا
  } else {
    // البرنامج النصي تم تحميله بنجاح
  }
});
```

مره أخري, الوصفة التي أستخدامناها لل `loadScript` هي في الواقع شائعة جداً. تُسمي النمط "error-first callback".

الاتفاقية هي:
1. الوسيطة الأولى لـ `callback` محجوزة لخطأ إذا حدث. ثم يتم أستدعاء ال `callback(err)`.
2. الوسيطة الثانية (وواحدة اخري أذا احتاجنا) تكون للنتيجة الناجحة. ثم يتم أستدعاء ال `callback(null, result1, result2…)`.

لذلك يتم استخدام وظيفة `callback` الفردية للإبلاغ عن الأخطاء وإرجاع النتائج.

## هرم الموت

<<<<<<< HEAD
من النظرة الأولى ، إنها طريقة قابلة للتطبيق للتشفير غير المتزامن. وهو كذلك بالفعل. بالنسبة لأستدعاء واحد أو ربما أستدعائين متداخليين ، تبدو جيدة.

ولكن بالنسبة إلى العديد من الإجراءات غير المتزامنة التي تتبع واحدًا تلو الآخر ، سيكون لدينا كود مثل هذا:
=======
At first glance, it looks like a viable approach to asynchronous coding. And indeed it is. For one or maybe two nested calls it looks fine.

But for multiple asynchronous actions that follow one after another, we'll have code like this:
>>>>>>> 53b35c16835b7020a0a5046da5a47599d313bbb8

```js
loadScript('1.js', function(error, script) {

  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('2.js', function(error, script) {
      if (error) {
        handleError(error);
      } else {
        // ...
        loadScript('3.js', function(error, script) {
          if (error) {
            handleError(error);
          } else {
  *!*
            // ...continue after all scripts are loaded (*)
  */!*
          }
        });

      }
    });
  }
});
```

<<<<<<< HEAD
في الكود الذي بالأعلي:
1. نحن نحمل ال `1.js`, أذا لم يكن هناك خطأ.
2. نحن نحمل ال `2.js`, أذا لم يكن هناك خطأ.
3. نحن نحمل ال `3.js`, أذا لم يكن هناك خطأ -- أفعل بعض الشئ غيره `(*)`.
=======
In the code above:
1. We load `1.js`, then if there's no error...
2. We load `2.js`, then if there's no error...
3. We load `3.js`, then if there's no error -- do something else `(*)`.
>>>>>>> 53b35c16835b7020a0a5046da5a47599d313bbb8

عندما تصبح الأستدعاءات أكثر تداخلًا ، تصبح الشفرة أعمق وتزداد صعوبة إدارتها ، خاصة إذا كان لدينا رمز حقيقي بدلاً من `...` قد يتضمن المزيد من الحلقات ، والعبارات الشرطية وما إلى ذلك.

وهذا ما يُطلق عليه أحيانًا "أسترجاع الجحيم" أو "هرم الموت".

<!--
loadScript('1.js', function(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('2.js', function(error, script) {
      if (error) {
        handleError(error);
      } else {
        // ...
        loadScript('3.js', function(error, script) {
          if (error) {
            handleError(error);
          } else {
            // ...
          }
        });
      }
    });
  }
});
-->

![](callback-hell.svg)

ينمو "هرم" الأستدعاءات المتداخلة إلى اليمين مع كل إجراء غير متزامن. سرعان ما يخرج عن السيطرة.

لذا فإن طريقة كتابة الكود هذه ليست جيدة جدًا.

يمكننا محاولة التخفيف من المشكلة عن طريق جعل كل عمل وظيفة قائمة بذاتها ، مثل هذا:

```js
loadScript('1.js', step1);

function step1(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('2.js', step2);
  }
}

function step2(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('3.js', step3);
  }
}

function step3(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...يتم تنفيذ الاكواد هنا بعد تحميل كل الملفات (*)
  }
}
```

<<<<<<< HEAD
نرى؟ إنه يفعل نفس الشيء ، ولا يوجد تداخل عميق الآن لأننا جعلنا كل إجراء وظيفة منفصلة من المستوى الأعلى.
=======
See? It does the same thing, and there's no deep nesting now because we made every action a separate top-level function.
>>>>>>> 53b35c16835b7020a0a5046da5a47599d313bbb8

إنه يعمل ، لكن الرمز يبدو وكأنه جدول بيانات ممزق. من الصعب قراءتها ، وربما لاحظت أن المرء يحتاج إلى القفز بين القطع أثناء قراءتها. هذا غير مريح ، خاصة إذا لم يكن القارئ على دراية بالكود ولا يعرف أين يقفز.

أيضاً, الدوال التي تم تسميتها `step*` كلها تستخدم علي حدي, يتم إنشاؤها فقط لتجنب "هرم الموت". لا أحد سيعيد استخدامها خارج سلسلة العمل. لذلك هناك القليل من فوضى مساحة الاسم هنا.

نود الحصول على شيء أفضل.

<<<<<<< HEAD
لحسن الحظ ، هناك طرق أخرى لتجنب مثل هذه الأهرامات. أحد أفضل الطرق هو استخدام "promises" الموضحة في الفصل التالي.
=======
Luckily, there are other ways to avoid such pyramids. One of the best ways is to use "promises", described in the next chapter.
>>>>>>> 53b35c16835b7020a0a5046da5a47599d313bbb8
