# تقنية Currying

مفهوم [Currying](https://en.wikipedia.org/wiki/Currying) هو تقنية متقدمة للعمل مع الدوالّ. يستخدم في العديد من اللغات البرمجية الآخرى من بينهم جافاسكربت.

Currying عبارة عن طريقة لتحويل الدوالّ التي تقيم الدالّة ذات الاستدعاء-أكثر من وسيط- `f (a، b، c)‎` لتصبح قابلة للاستدعاء -بوسيط واحد- هكذا `f(a)(b)(c)‎`.

تحول تقنية Currying الدالّة فقط ولا تستدعها.

لنرى في البداية مثالًا، لفهم ما نتحدث عنه فهمًا أفضل، وبعدها ننتقل للتطبيقات العملية.

سننشئ دالة مساعدة `curry (f)‎` والّتي ستُنفذّ تقينة Currying على الدالّة `f` التي تقبل وسيطين. بتعبير آخر، تحول الدالة `curry(f)‎` الدالّة `f(a, b)‎` ذات الوسيطين إلى دالة تعمل كوسيط واحد`f(a)(b)‎`:

```
function curry(f) { // ‫الدالةcurry(f)‎ هي من ستُنفذّ تحويل currying 
  return function(a) {
    return function(b) {
      return f(a, b);
    };
  };
}

// طريقة الاستخدام
function sum(a, b) {
  return a + b;
}

let curriedSum = curry(sum);

alert( curriedSum(1)(2) ); // 3
```

كما نرى، فإن التنفيذ بسيط: إنه مجرد مغلفين للوسطاء.

- نتيجة `curry(func)‎` هي دالة مغلّفة `function(a)‎`.
- عندما تسمى هكذا `curriedSum(1)‎`، تُحفظ الوسطاء في البيئة اللغوية للجافاسكربت (وهي نوع مواصفات اللغة تستخدم لتعريف ارتباط المعرّفات بالمتغيّرات والدوالّ المحددة وذلك بناءً على بنية الترابط اللغوية في شيفرة ECMAScript)، وتعيد غلاف جديد `function(b)‎`.
- ثمّ يُسمى هذا المغلّف باسم `2` نسبةً لوسطائه، ويُمرّر الاستدعاء إلى الدالّة `sum(a,b)‎` الأصليّة.

من الأمثلة المتقدمة باستخدام تقنية currying هو [_curry](https://lodash.com/docs#curry) من مكتبة Lodash، والتي تُعيد غِلافًا الّذي يسمح باستدعاء الدالّة طبيعيًا وجزئيًا:

```
function sum(a, b) {
  return a + b;
}

let curriedSum = _.curry(sum); // ‫استخدام ‎_.curry من مكتبة lodash

alert( curriedSum(1, 2) ); // ‫النتيجة: 3، لايزال بإمكاننا استدعاؤه طبيعيًا
alert( curriedSum(1)(2) ); // ‫النتيجة: 3، الاستدعاء الجزئي
```

## لماذا نحتاج لتقنية currying؟

لابد لنا من مثالٍ واقعي لفهم فوائد هذه التقنية.

مثلًا، ليكن لدينا دالّة التسجيل `log(date, importance, message)‎` والّتي ستُنسّق المعلومات وتعرضها. مثل هذه الدوالّ مفيدة جدًا في المشاريع الحقيقة مثل: إرسال السجلات عبر الشبكة، في مثالنا سنستخدم فقط `alert`:


```
function log(date, importance, message) {
  alert(`[${date.getHours()}:${date.getMinutes()}] [${importance}] ${message}`);
}
```
لنُنفذّ تقنية currying عليها!

```
log = _.curry(log);
```

بعد ذلك ستعمل دالّة `log` وفق المطلوب:

```
log(new Date(), "DEBUG", "some debug"); // log(a, b, c)
```
... ولكنها تعمل أيضًا بعد تحويلها بتقنية currying:

```
log(new Date())("DEBUG")("some debug"); // log(a)(b)(c)
```
الآن يمكننا بسهولة إنشاء دالّة مناسبة للسجلات الحالية:

```
// ‫logNow سيكون دالة جزئية من log مع وسيط أول ثابت
let logNow = log(new Date());

// استخدامه
logNow("INFO", "message"); // [HH:mm] INFO message
```

الآن `logNow` هو نفس الدالة `log` بوسيط أول ثابت، بمعنى آخر "دالّة مطبقة جزئيًا" أو "جزئية" للاختصار.

يمكننا المضي قدمًا وإنشاء دالّة مناسبة لسجلات تصحيح الأخطاء الحالية:

```
let debugNow = logNow("DEBUG");

debugNow("message"); // [HH:mm] DEBUG message
```

إذا:

1. لم نفقد أي شيء بعد التحويل بتقنية currying: ولا يزال يمكننا أيضًا استدعاء الدالّة `log` طبيعيًا.
2. يمكننا بسهولة إنشاء دوالّ جزئية مثل: سجلات اليوم.

## الاستخدام المتقدم لتقنية currying

في حالة رغبتك في الدخول في التفاصيل، إليك طريقة الاستخدام المتقدمة لتقنية currying للدوالّ ذات الوسطاء المتعددة والّتي يمكننا استخدامها أعلاه.

وهي مختصرة جدًا:

```
function curry(func) {

  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function(...args2) {
        return curried.apply(this, args.concat(args2));
      }
    }
  };

}
```

إليك مثالًا لطريقة استخدامه:

```
function sum(a, b, c) {
  return a + b + c;
}

let curriedSum = curry(sum);

alert( curriedSum(1, 2, 3) ); // 6, still callable normally
alert( curriedSum(1)(2,3) ); // 6, currying of 1st arg
alert( curriedSum(1)(2)(3) ); // 6, full currying
```

تبدو تقنية currying للوهلة الأولى معقدةً، ولكنها في الحقيقة سهلة الفهم جدًا.

نتيجة استدعاء `curry(func)‎` هي دالّة مُغلّفة `curried` والّتي تبدو هكذا:

```
// func is the function to transform
function curried(...args) {
  if (args.length >= func.length) { // (1)
    return func.apply(this, args);
  } else {
    return function(...args2) { // (2)
      return curried.apply(this, args.concat(args2));
    }
  }
};
```

عند تشغيله، هناك فرعين للتنفيذ من الجملة الشرطية `if`:

<<<<<<< HEAD
1. سيكون الاستدعاء الآن هكذا: إن كان عدد الوسطاء `args` المُمرّرة هو نفس العدد الدالة الأصليّة المعرّفة لدينا (`func.length`) أو أكثر، عندها نمرّر الاستدعاء له فقط.
2. وإلا سيكون الاستدعاء جزئيًا: لم تُستدعى الدالّة `func` بعد. وإنما أعيد بدلًا منها دالّة المغلِّفة أخرى `pass`، والتي ستُعيد تطبيق الدالة `curried` مع تقديم الوسطاء السابقين مع الوسطاء الجدد. وثمّ في استدعاء الجديد سنحصل إما على دالة جزئية جديدة (إن لم يكُ عدد الوسطاء كافيا) أو النتيجة النهائية.

لنرى مثلًا ما يحدث في حال الاستدعاء الدالة هكذا `sum(a, b, c)‎`. أي بثلاث وسطاء، وبذلك يكون `sum.length = 3`.

عند استدعاء `curried(1)(2)(3)‎`:

1. الاستدعاء الأول `curried (1)‎` تحفظ `1` في بيئته اللغوية، ويُعيد دالّة المغلف `pass`.
2. يُستدعى المغلّف `pass` مع الوسيط المُمرّر `(2)`: إذ يأخذ الوسطاء السابقين (`1`)، ويدمجهم مع الوسيط الذي حصل عليه وهو `(2)` ويستدعي الدالّة `curried(1, 2)‎` مع استخدام جميع ما حصل عليه من وسطاء. وبما أن عدد الوسطاء لا يزال أقل من 3 ، فإن الدالّة `curry` ستُعيد الدالّة `pass`.
3. يُستدعى المغلّف `pass` مرة أخرى مع الوسيط المُمرّر `(3)`: ومن أجل الاستدعاء التالي `pass (3)‎` سيأخذ الوسطاء السابقين (`1`,  `2`) ويضيف لهم الوسيط `3`، ليكون الاستدعاء هكذا `curried(1, 2, 3)‎`- أخيرًا لدينا ثلاث وسطاء، والّذين سيمرّرون للدالّة الأصلية.
إذا لم تتوضح الفكرة حتى الآن، فما عليك إلا تتبع تسلسل الاستدعاءات في عقلك أو على الورقة وستتوضح الأمور أكثر.

**ملاحظة**: تعمل مع الدوالّ ثابتة الطول فقط
=======
1. If passed `args` count is the same or more than the original function has in its definition (`func.length`) , then just pass the call to it using `func.apply`. 
2. Otherwise, get a partial: we don't call `func` just yet. Instead, another wrapper is returned, that will re-apply `curried` providing previous arguments together with the new ones. 

Then, if we call it, again, we'll get either a new partial (if not enough arguments) or, finally, the result.
>>>>>>> 97ef86242f9f236b13152e1baf52a55c4db8728a

يجب أن يكون للدالّة عدد ثابت من الوسطاء لتطبيق تقنية currying.

إن استخدمت دالّةّ ما معاملات البقية، مثل: `f(...args)‎`، فلا يمكن معالجتها بهذه التقنية.

**ملاحظة**: أكثر بقليل من مجرد تقنية تحويل

انطلاقًا من التعريف، يجب على تقنية currying تحويل الدالّة `sum(a, b, c)‎` إلى `sum(a)(b)(c)‎`.

لكن غالبية تطبيقات هذه التقنية في جافاسكربت متقدمة، وكما وضحنا سابقًا: فهي تحافظ على الدالّة قابلة للاستدعاء بعدة تنويعات للوسطاء المُمرّرة.

## خلاصة

_تقنية Currying_ هو عملية تحويل تجعل `f(a,b,c)` قابلة للاستدعاء كـ `f(a)(b)(c)‎`. عادةً ما تحافظ تطبيقات الجافاسكربت على الدوالّ بحيث تكون قابلة للاستدعاء بالشكل الطبيعي أو الجزئي إن كان عدد الوسطاء غير كافٍ.

كما تسمح لنا هذه التقنية أيضًا بالحصول على دوالّ جزئية بسهولة. كما رأينا في مثال التسجيل، بعد تنفيذ هذه التقنية على الدالّة العالمية ذات الثلاث وسطاء `log(date, importance, message)‎` فإن ذلك سيمنحنا دوالّ جزئية عند استدعاؤها باستخدام وسيط واحد (هكذا `log(date)‎`) أو وسيطين (هكذا `log(date, importance)‎`).

ترجمة -وبتصرف- للفصل [Currying](https://javascript.info/currying-partials) من كتاب [The JavaScript language](https://javascript.info/js)
