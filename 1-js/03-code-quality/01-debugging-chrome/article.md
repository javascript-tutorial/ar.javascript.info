<<<<<<< HEAD
# تصحيح الأخطاء في كروم
=======
# Debugging in the browser
>>>>>>> 291b5c05b99452cf8a0d32bd32426926dbcc0ce0

قبل كتابة أي كود معقد , فلنتحدث قليلا عن تصحيح الأخطاء.

[(Debugging) تصحيح الأخطاء](https://en.wikipedia.org/wiki/Debugging) هي عملية البحث و تصحيح الأخطاء في الكود. كل المتصفحات الحديثة و معظم بيئات العمل تدعم تصحيح الأخطاء -- تجعل أدوات مطور واجهة المستخدم الخاصة عملية تصحيح الأخطاء أسهل , فهي تسمح ايضا بتتبع الكود خطوة بخطوة لمعرفة حقيقة ما يجري.


هنا سنستخدم جوجل كروم, لأن بها من الخواص الكثير و معظم المتصفحات لها عمليات مشابهة.

## لوحة "المصادر"

قد يبدو  اصدار متصفح كروم الخاص بك مختلف قليلا ,لكن سيظل كل شئ بداخله واضح.

- افتح [صفحة المثال](debugging/index.html) في كروم.
- قم بتشغيل أدوات المطور باستخدام  `key:F12` أو   (Mac : `key:Cmd+Opt+I`).
- اختر لوحة المصادر `Sources` 

هذا هو ما ستراه اذا كنت تفتح الصفحة للوهلة الأولي:

![](chrome-open-sources.svg)

زر التبديل <span class="devtools" style="background-position:-172px -98px"></span> يفتح التبويب محتويا الملفات.

فلنضغط عليه و نختار `hello.js` في العرض الشجري . هذا هو ما سيظهر:

![](chrome-tabs.svg)

The Sources panel has 3 parts:
لوحة المصادر بها ثلاثة أقسام:

1. لوحة **مستكشف الملفات** و التي يظهر بها كل ملفات ال HTML, JavaScript, CSS و الملفات الأخري متضمنة الصور الملحقة بالصفحة. اضافات كروم قد تظهر هنا أيضا.
2. لوحة **محرر الكود** و التي يظهر بها كود الصفحة.
3. لوحة **مصحح أخطاء JavaScript** لتصحيح الأخطاء, و سيتم شرحها بعد قليل.

الآن بامكاننا الضغط علي نفس الزر <span class="devtools" style="background-position:-172px -98px"></span> لاخفاء قائمة المصادر و اعطاء الكود بعض المساحة.

## وحدة التحكم (Console)

اذا ضغطنا علي زر `key:Esc`, هنا ستظهر لوحة التحكم بالأسفل حيث يمكننا طباعة الأوامر و ضغط `key:Enter` لتنفيذها.

بعد ان يتم تنفيذ الأمر, الناتج يظهر اسفله.

<<<<<<< HEAD
كمثال, هنا  `1+2` ينتج عنها  `3` و `hello("debugger")` لا ينتج عنها شئ, لذا فالناتج يكون `undefined`.
=======
For example, here `1+2` results in `3`, while the function call `hello("debugger")` returns nothing, so the result is `undefined`:
>>>>>>> 291b5c05b99452cf8a0d32bd32426926dbcc0ce0

![](chrome-sources-console.svg)

##  نقاط التوقف (Breakpoints)

فلنري ما يحدث في أكواد [صفحة المثال](debugging/index.html). في `hello.js`, قم بالضغط علي السطر `4`, نعم, علي الرقم `4`ليس علي الكود نفسه

مبروك! لقد وضعت نقطة توقف, فلتضع اخري علي السطر رقم `8`>

من المفترض ان تبدو هكذا (الأزرق هو المكان الذي يفترض عليك الضغط عليه) :

![](chrome-sources-breakpoint.svg)

*نقطة التوقف* هي  نقطة في الكود يتوقف عندها تنفيذ كود ال JavaScript بشكل تلقائي.

في حين أن الكود في حالة توقف مؤقت, يمكننا تصفح المتغيرات الحالية, تنفيذ أوامر في وحدة التحكم,...الخ. بصيغة أخري ,نستطيع تصحيح الأخطاء فيه.

يمكننا دائمًا العثور على قائمة بنقاط التوقف في اللوحة اليمنى. هذا مفيد عندما يكون لدينا العديد من نقاط التوقف في ملفات مختلفة.فهو يتيح لنا:
- الانتقال بسرعة إلى نقطة التوقف في الكود (بالضغط عليها في اللوحة اليمنى).
- تعطيل نقطة التوقف مؤقتًا بإلغاء تحديدها.
- قم بإزالة نقطة التوقف بالنقر بزر الماوس الأيمن واختيار إزالة.
- ...و هكذا.

<<<<<<< HEAD
```smart header="نقاط التوقف المشروطة"
 *النقر بزر الماوس الأيمن* على رقم السطر يسمح بإنشاء نقطة توقف *مشروطة*. يتم تشغيلها فقط عندما يكون الشرط المعطى محقق.
=======
```smart header="Conditional breakpoints"
*Right click* on the line number allows to create a *conditional* breakpoint. It only triggers when the given expression, that you should provide when you create it, is truthy.
>>>>>>> 291b5c05b99452cf8a0d32bd32426926dbcc0ce0

يكون هذا مفيدا عند الحاجة للتوقف فقط تبعا لمتغير معين أو معاملات دالة معينة.
```

<<<<<<< HEAD
## أمر مصحح الخطأ(Debugger)
=======
## The command "debugger"
>>>>>>> 291b5c05b99452cf8a0d32bd32426926dbcc0ce0

يمكننا أيضًا إيقاف الكود مؤقتًا باستخدام الأمر `debugger` الموجود فيه ، كالتالي:

```js
function hello(name) {
  let phrase = `Hello, ${name}!`;

*!*
  debugger;  // <-- يتوقف مصحح الأخطاء هنا
*/!*

  say(phrase);
}
```
هذا الأمر مريح للغاية عندما نكون في محرر أكواد ولا نريد التبديل إلى المتصفح والبحث عن النص في أدوات المطور لتعيين نقطة التوقف.

<<<<<<< HEAD
## انتظر قليلا وانظر حولك
=======
Such command works only when the development tools are open, otherwise the browser ignores it.

## Pause and look around
>>>>>>> 291b5c05b99452cf8a0d32bd32426926dbcc0ce0

في مثالنا ، `hello()` يتم النداء عليها عند تحميل الصفحة, لذا اسهل طريقة لتفعيل مصحح الأخطاء (بعد وضع نقطة التوقف) هي اعادة تحميل الصفحة. لذا نضغط `key:F5` (Windows, Linux) أو `key:Cmd+R` (Mac).

عند تعيين نقطة التوقف ، يتوقف التنفيذ مؤقتًا عند السطر الرابع:

![](chrome-sources-debugger-pause.svg)

من فضلك افتح القوائم المنسدلة للمعلومات على اليمين (الموضح بالأسهم)و التي تسمح لك بفحص حالة الكود الحالية:

1. **`Watch` -- يعرض القيم الحالية لأي تعبيرات.**

<<<<<<< HEAD
    يمكننا النقر فوق علامة زائد `+` وإدخال تعبير. سيظهر مصحح الأخطاء قيمته في أي لحظة ، ويعيد حسابه تلقائيًا في عملية التنفيذ.
=======
    You can click the plus `+` and input an expression. The debugger will show its value, automatically recalculating it in the process of execution.
>>>>>>> 291b5c05b99452cf8a0d32bd32426926dbcc0ce0

2. **`Call Stack` -- يعرض سلسلة من الاستدعاءات المترابطة.**

    في الوقت الحالي ، يكون المصحح داخل استدعاء `hello ()` ، والذي يتم استدعاؤه بواسطة النص  في `index.html` (لا توجد دالة هناك ، لذلك يطلق عليه" مجهول ").

    إذا قمت بالنقر فوق عنصر من المجموعة (على سبيل المثال "مجهول") ، ينتقل مصحح الأخطاء إلى الكود المقابل ، ويمكن فحص جميع متغيراته أيضًا.

3. **`Scope` -- المتغيرات الحالية.**

    `Local` يظهر المتغيرات المحلية للدوال. يمكنك أيضًا رؤية قيمهم مظللة مباشرة فوق المصدر.

    `Global` له متغيرات عامة (من أي دوال).

    هنالك ايضا كلمة `this` و التي لم نطلع عليها بعد, و لكننا سنفعل قريبا.

## تتبع التنفيذ

حان الوقت الآن *لتتبع* النص.

توجد أزرار لها في أعلى اللوحة اليمنى. فلندرسهم.
<!-- https://github.com/ChromeDevTools/devtools-frontend/blob/master/front_end/Images/src/largeIcons.svg -->
<span class="devtools" style="background-position:-146px -168px"></span> -- "إكمال": الاستمرار في التنفيذ, زره السريع `key:F8`.
: استئناف التنفيذ. إذا لم تكن هناك نقاط توقف إضافية ، فسيستمر التنفيذ فقط ويفقد المصحح السيطرة.

    إليك ما يمكننا رؤيته بعد النقر عليه:

    ![](chrome-sources-debugger-trace-1.svg)

    تم استئناف التنفيذ ، ووصل إلى نقطة توقف أخرى داخل `say ()` وتوقف هناك. ألق نظرة على "Call Stack" على اليمين. وقد زادت بنداء واحد آخر. نحن داخل `say ()` الآن.

<span class="devtools" style="background-position:-200px -190px"></span> -- "خطوة": تقوم بتشغيل الأمر التالي, زره السريع `key:F9`.
: تشغيل العبارة التالية. إذا نقرنا عليه الآن ،سيظهر `alert`.

    سيؤدي النقر عليه مرة أخرى تلو الأخرى إلى استعراض كافة عبارات النص واحدًا تلو الآخر.

<span class="devtools" style="background-position:-62px -192px"></span> -- "خطوة للأمام":  تقوم بتشغيل الأمر التالي, لكن *لا تدخل بداخل الدالة*, زره السريع `key:F10`.

: يشبه الأمر "خطوة" السابق ، ولكنه يتصرف بشكل مختلف إذا كانت العبارة التالية هي استدعاء دالة. اذا لم تكن دالة مدمجة ، مثل `alert`، ولكنها دالة من انشاءنا.

    ينتقل الأمر "خطوة" إليه ويوقف التنفيذ عند السطر الأول مؤقتًا ، بينما يقوم "خطوة للأمام" باستدعاء الدالة المتداخلة بشكل غير مرئي ، مع تخطي الدوال الداخلية.

    يتم إيقاف التنفيذ بعد ذلك مباشرة بعد هذه الدالة.

    هذا أمر جيد إذا لم نرغب في معرفة ما يحدث داخل استدعاء الدالة.

<<<<<<< HEAD
<span class="devtools" style="background-position:-4px -194px"></span> -- "خطوة للداخل", زره السريع `key:F11`.

:  مشابه لـ "خطوة" ، ولكنه يتصرف بشكل مختلف في حالة نداءات دوال غير متزامنة. إذا كنت تبدأ فقط في تعلم JavaScript ، فيمكنك تجاهل الاختلاف ، حيث لا تتوفر لدينا نداءات غير متزامنة حتى الآن.

للمعرفة مستقبلا ، لاحظ فقط أن الأمر "خطوة" يتجاهل الإجراءات غير المتزامنة ، مثل `setTimeout` (نداء الدوال المجدولة) ، التي يتم تنفيذها لاحقًا. تدخل "الخطوة للداخل" في الكود الخاص بهم ،و تنتظرهم إذا لزم الأمر.
=======
<span class="devtools" style="background-position:-62px -192px"></span> -- "Step over": run the next command, but *don't go into a function*, hotkey `key:F10`.
: Similar to the previous "Step" command, but behaves differently if the next statement is a function call (not a built-in, like `alert`, but a function of our own).

    If we compare them, the "Step" command goes into a nested function call and pauses the execution at its first line, while "Step over" executes the nested function call invisibly to us, skipping the function internals.

    The execution is then paused immediately after that function call.
>>>>>>> 291b5c05b99452cf8a0d32bd32426926dbcc0ce0

لمزيد من التفاصيل , اتطلع علي  [DevTools manual](https://developers.google.com/web/updates/2018/01/devtools#async).

<span class="devtools" style="background-position:-32px -194px"></span> -- "خطوة للخارج": تابع التنفيذ حتى نهاية الدالة الحالية ، زره السريع `key:Shift+F11`.
: يستمر في التنفيذ ويوقفه في السطر الأخير من الدالة الحالية. يكون هذا مفيدا عند الدخول الي نداءات متداخلة عن طريق الخطأ  <span class="devtools" style="background-position:-200px -190px"></span>,لكنها لا تهمنا ، ونريد أن نستمر حتى نهايتها في أقرب وقت ممكن.

<span class="devtools" style="background-position:-61px -74px"></span> -- تفعيل / تعطيل جميع نقاط التوقف.
: هذا الزر لا ينقل التنفيذ. مجرد ايقاف/تفعيل كلي لكل نقاط التوقف.

<span class="devtools" style="background-position:-90px -146px"></span> -- تفعيل / تعطيل الإيقاف المؤقت التلقائي في حالة حدوث خطأ.

: عند تفعيله ، وفتح أدوات المطورين ، يؤدي خطأ النص إلى إيقاف التنفيذ تلقائيًا. ثم يمكننا تحليل المتغيرات لمعرفة الخطأ الذي حدث. لذلك إذا توقف النص بسبب وجود خطأ ، فيمكننا فتح المصحح وتمكين هذا الخيار وإعادة تحميل الصفحة لمعرفة مكان المشكلة وما هو السياق(context) في هذه اللحظة.

<<<<<<< HEAD
```smart header="متابعة الي هنا (Continue to here)"
=======
<span class="devtools" style="background-position:-90px -146px"></span> -- enable/disable automatic pause in case of an error.
: When enabled, if the developer tools is open, an error during the script execution automatically pauses it. Then we can analyze variables in the debugger to see what went wrong. So if our script dies with an error, we can open debugger, enable this option and reload the page to see where it dies and what's the context at that moment.
>>>>>>> 291b5c05b99452cf8a0d32bd32426926dbcc0ce0

انقر بزر الماوس الأيمن على سطر الكود فتفتح قائمة السياق مع خيار رائع يسمى "متابعة إلى هنا".

و هو مفيد عندما نريد لبتحرك خطوات متعددة إلى الأمام نحو الخط ، لكننا كسالى جدًا في وضع نقطة توقف.
```

## التسجيل (Logging)

To output something to console from our code, there's `console.log` .
لإخراج شيء ما إلى وحدة التحكم من الكودالخاص بنا ، هناك دالة `console.log`.

على سبيل المثال ، ينتج عن هذا القيم من `0` إلى` 4` إلى وحدة التحكم:

```js run
// افتح وحدة التحكم لترى
for (let i = 0; i < 5; i++) {
  console.log("value,", i);
}
```

لا يرى المستخدمون العاديون هذا المخرج ، فهو موجود في وحدة التحكم. لمشاهدته ، إما أن تفتح لوحة وحدة التحكم في أدوات المطورين أو اضغط على "المفتاح: Esc" أثناء وجودك في لوحة أخرى: تفتح وحدة التحكم في الأسفل.

إذا كان لدينا ما يكفي من التسجيل في الكود الخاص بنا ، فيمكننا أن نرى ما يحدث من السجلات ، دون استخدام مصحح الأخطاء.

## الملخص

كما نرى ، هناك ثلاث طرق رئيسية لإيقاف النص مؤقتًا:
1. نقطة توقف.
2. عبارة أمر مصحح الخطأ `debugger`.
3. خطأ (اذا كانت ادوات المطور مفتوحة و زر  <span class="devtools" style="background-position:-90px -146px"></span> مفعل اي قيمته "on").

<<<<<<< HEAD
عند الإيقاف المؤقت ، يمكننا تصحيح الأخطاء - فحص المتغيرات وتتبع الكود لمعرفة المكان الذي يذهب فيه التنفيذ بشكل خاطئ.
=======
When paused, we can debug: examine variables and trace the code to see where the execution goes wrong.
>>>>>>> 291b5c05b99452cf8a0d32bd32426926dbcc0ce0

هناك العديد من الخيارات في أدوات المطورين أكثر من تلك المغطاة هنا. الدليل الكامل في <https://developers.google.com/web/tools/chrome-devtools>.

المعلومات الواردة في هذا الفصل كافية لبدء تصحيح الأخطاء ، ولكن لاحقًا ، خاصة إذا كنت تقوم بالعديد من المهام الخاصة بالمتصفح ، فالرجاء الانتقال إلى هناك والبحث في الإمكانات الأكثر تقدمًا لأدوات المطورين.

يمكن أيضًا يمكنك النقر على أماكن مختلفة من أدوات التطوير ومعرفة ما يظهر. ربما هذا هو أسرع طريق لتعلم أدوات المطورين. لا تنس النقر بزر الماوس الأيمن وقوائم السياق!