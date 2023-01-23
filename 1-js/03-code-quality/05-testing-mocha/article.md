# الاختبار الآلي لشيفرات جافا سكريبت باستخدام mocha

يُستخدَم الاختبار الآلي في الكثير من المهام، كما يستخدم بكثرة في المشاريع الحقيقية.

<<<<<<< HEAD
## لم نحتاج الاختبارات؟
=======
## Why do we need tests?
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

عند كتابة دالة، يمكننا تخيل ما يجب أن تقوم به: ما هي المعاملات التي تعطي نتائج معينة. يمكننا فحص الدالة أثناء التطوير من خلال تشغيلها وموازنة مخرجاتها مع ما هو متوقع. مثلا يمكننا القيام بذلك في الطرفية.

إن كان هناك خطأ، فإننا نُصلِح الشيفرة البرمجية، ونُعيد تشغيلها، ونفحص النتائج. وهكذا حتى تصبح صحيحة. لكن هذه الطريقة «إعادة التشغيل» غير مثالية.

**عند اختبار شيفرة برمجية عن طريق إعادة التشغيل اليدوية، فمن السهل نسيان شيئٍ ما.**
=======
# الاختبار الآلي باستخدام Mocha

سيتم استخدام الاختبار الآلي في مهام قادمة ، كما أنه يستخدم على نطاق واسع في المشاريع الحقيقية.

## لماذا نحتاج إلى الاختبارات؟

عندما نكتب دالة ، يمكننا عادةً تخيل ما يجب أن تفعله: أي من المعطيات تعطي النتائج.

أثناء التطوير ، يمكننا التحقق من الدالة عن طريق تشغيلها ومقارنة النتيجة بالنتيجة المتوقعة. على سبيل المثال ، يمكننا القيام بذلك في وحدة التحكم. (console).

إذا كان هناك شيء خاطئ - ثم نقوم بإصلاح الكود ، ونعمل مرة أخرى ، ونتحقق من النتيجة - وهكذا حتى يعمل.

على سبيل المثال، عند إنشاء الدالة f. نكتب فيها بعض الشيفرات البرمجية، ثم نَفحصها: "f(1)‎" تعمل لكن "f(2)‎" لا تعمل. صلِح الشيفرة حتى تعمل "f(2)‎". ثم تبدو الدالة كأنها مكتملة، لكننا ننسى إعادة اختبار "f(1)‎" مما قد يؤدي إلى خطأ.

هذا الأمر وارد بكثرة. فعند تطوير أي شيء، نُبقِي العديد من الاحتمالات في الحسبان. لكنه من الصعب توقع أن يختبر المبرمج جميع هذه الحالات يدويا بعد كل تغيير، فيصبح من السهل إصلاح شيء ما وإفساد شيء آخر.

**يعني الاختبار الآلي أن الاختبارات تُكتب مستقلة، بالإضافة إلى الشيفرة البرمجية. تشغِّل هذه الاختبارات الدوال بعدة طرق وتوازنها مع النتائج المتوقعة.**

## التطوير المستند إلى السلوك (BDD)

لنبدأ بتقنية تسمى التطوير المستند إلى السلوك [Behavior Driven Development](http://en.wikipedia.org/wiki/Behavior-driven_development) أو كاختصار BDD.

**هذه التقنية BDD هي 3 في 1: اختبارات وتوثيق وامثلة.**

سنجرب حالة تطوير عملية لفهم BDD.

## تطوير الدالة "pow": الوصف

Lلنفترض أننا نريد إنشاء الدالة pow(x, n)‎ التي ترفع الأساس x إلى القوة n. مع الأخذ بالحسبان أن n≥0. هذه المهمة هي مجرد مثال: المعامل \*\* يقوم بهذه العملية في JavaScript، لكننا نركز هنا على تدفق التطوير الذي يمكن تطبيقه على مهام أكثر تعقيدا.

يمكننا تخيل ووصف ما يجب أن تقوم به الدالة pow قبل إنشاء شيفرتِها البرمجية. هذا الوصف يُسمى "specification" أو باختصار "spec" ويحتوي على وصف حالات الاستخدام بالإضافة إلى اختبارات لهذه الحالات كالتالي:

```js
describe("pow", function() {
  it("raises to n-th power", function() {
    assert.equal(pow(2, 3), 8);
  });
});
```

تحتوي المواصفات على 3 أجزاء رئيسية كما ترى في الأعلى:

`describe("title", function() { ... })`
<<<<<<< HEAD
: ماهي الوظيفة التي نصفها، في هذه الحالة، نحن نصف الدالة pow. تستخدم بواسطة العاملين- أجزاء it.
=======
: What functionality we're describing? In our case we're describing the function `pow`. Used to group "workers" -- the `it` blocks.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

`it("use case description", function() { ... })`
: نصف (نحن بطريقة مقروءة للبشر) حالة الاستخدام المخصصة في عنوان it، والمعامل الآخر عبارة عن دالة تفحص هذه الدالة.

`assert.equal(value1, value2)`
: الشيفرة البرمجية بداخل it يجب أن تُنَفَّذ بدون أخطاء في حال كان التنفيذ صحيحًا.

تستخدم الدوال assert.\* لِفحص ما إن كانت الدالة pow تعمل بالشكل المتوقع أم لا. تستخدم إحدى هذه الدوال في هذا المثال - assert.equal، والتي توازن معاملَين وتُرجِع خطأ في حال عدم تساويهما. في المثال تفحص هذه الدالة إن كانت نتيجة تنفيذ الدالة pow(2, 3)‎ تساوي 8. كما يوجد العديد من أنواع التحقق والمقارنة والتي سنُضيفها لاحقا.

يمكن تنفيذ الوصف، وسينفِّذ الفحص الموجود بداخل it كما سنرى لاحقا.

## تدفق التطوير

يبدو تدفق التطوير غالبا كما يلي:

<<<<<<< HEAD
1. يُكتب الوصف الأولي مع فحص للوظيفة الرئيسية.
2. يُنشَئ تنفيذ أولي.
3. لتأكد من صحة عمل التنفيذ، نُشَغِّل إطار التقييم [Mocha](http://mochajs.org/) الذي يُشَغِّل الوصف. ستظهر أخطاء في حال عدم اكتمال الوظائف. نُصحح الأخطاء حتى يصبح كل شيء صحيحًا.
4. هكذا أصبح لدينا تنفيذ مبدئي يعمل كالمطلوب بالإضافة إلى فحصه.
5. نضيف المزيد من حالات الاستخدام للوصف، ربما بعض هذه الميزات ليس مضمنا في التنفيذ بعد. حينها يبدأ الاختبار بالفشل.
6. عُد للخطوة 3 وحدِّث التنفيذ إلى أن تختفي كل الأخطاء.
7. كرر الخطوات 3-6 حتى تجهز كل الوظائف.
=======
1. An initial spec is written, with tests for the most basic functionality.
2. An initial implementation is created.
3. To check whether it works, we run the testing framework [Mocha](https://mochajs.org/) (more details soon) that runs the spec. While the functionality is not complete, errors are displayed. We make corrections until everything works.
4. Now we have a working initial implementation with tests.
5. We add more use cases to the spec, probably not yet supported by the implementations. Tests start to fail.
6. Go to 3, update the implementation till tests give no errors.
7. Repeat steps 3-6 till the functionality is ready.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

إذا، تُعد عملية التطوير تكرارية. نكتب الوصف، ننفذه، نتأكد من اجتياز التنفيذ للفحص، ثم نكتب المزيد من الاختبارات، نتأكد من صحة عملها. حتى نحصل على تنفيذ صحيح مع اختباراته في الأخير.

لنُجرب تدفق التطوير هذا على حالتنا العملية.

<<<<<<< HEAD
الخطوة 1 أصبحت جاهزة: لدينا وصفًا مبدئيًّا للدالة `pow`. الآن وقبل التنفيذ، لِنستخدم بعض مكاتب جافا سكريبت لتشغيل الاختبار حتى نتأكد من إن كانت تعمل (لن تعمل).
=======
The first step is already complete: we have an initial spec for `pow`. Now, before making the implementation, let's use a few JavaScript libraries to run the tests, just to see that they are working (they will all fail).
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

## المواصفات أثناء التنفيذ

سنستخدم في هذا الشرح مكاتب جافا سكريبت التالية للاختبار:

<<<<<<< HEAD
- [Mocha](http://mochajs.org/) -- لإطار الرئيسي: يوفر دوال الفحص الأكثر استخدامًا ما يشمل describe و it بالإضافة إلى الدوال الرئيسية التي تُشَغِّل الاختبار.
- [Chai](http://chaijs.com) -- لمكتبة المحتوية على دوال تأكيدية. تتيح لنا استخدام العديد من هذه الدوال، نحتاج الآن `assert.equal` فقط. .
- [Sinon](http://sinonjs.org/) -- a مكتبة للتجسس على الدوال، ومحاكاة الدوال المدمجة، والمزيد؛ سنحتاج هذه المكتبة لاحقا.
=======
- [Mocha](https://mochajs.org/) -- the core framework: it provides common testing functions including `describe` and `it` and the main function that runs tests.
- [Chai](https://www.chaijs.com/) -- the library with many assertions. It allows to use a lot of different assertions, for now we need only `assert.equal`.
- [Sinon](https://sinonjs.org/) -- a library to spy over functions, emulate built-in functions and more, we'll need it much later.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

تُعد هذه المكاتب مفيدة للاختبار في كل من المتصفح والخادم. سنأخذ بعين الاعتبار هنا جهة المتصفح. صفحة HTML كاملة مع هذه المكاتب ووصف الدالة pow:

يمكن تقسيم الصفحة إلى 5 أجزاء:

1. The `<head>` -- لإضافة مكاتب وأنماط للاختبارات.
2. The `<script>` يحتوي على الدالة التي سيتم اختبارها، في هذا المثال الشيفرة البرمجية للدالة `pow`.
3. الاختبار - عبارة عن سكريبت خارجي في هذا المثال test.js يحتوي على describe("pow", ...)‎ الموضح سابقا.
4. عنصر HTML ‏<div id="mocha"‎> والذي سيُستخدم بواسطة Mocha لعرض النتائج.
5. يتم بدء الاختبارات باستخدام الأمر `mocha.run()‎`.

النتائج:

[iframe height=250 src="pow-1" border=1 edit]

يفشل الاختبار ويظهر خطأ في الوقت الحالي. يُعد هذا منطقيا: فالدالة pow ما زالت فارغة، فإن pow(2,3)‎ تُرجع undefined بدلا من 8.

فى المستقبل يمكننا ملاحظة مستوى أعلى من الاطارات الخاصة بالاختبار مثل [karma](https://karma-runner.github.io/) و أخرى مثلاها من شأنها تسهيل تشغيل اختبارات مختلفة بشكل آلى

## التنفيذ الأولي

لنقم بتنفيذ مبسط للدالة pow حتى تعمل الاختبارات:

```js
function pow(x, n) {
  return 8; // :) we cheat!
}
```

الآن ستعمل…

[iframe height=250 src="pow-min" border=1 edit]

## تطوير الوصف

ما قمنا به هو غش فقط، لا تعمل الدالة كالمطلوب: إن قمنا بحساب pow(3,4)‎ فسنحصل على قيمة غير صحيحة، لكنها ستجتاز الاختبارات.

هذه الحالة غير عملية، وتحدث بكثرة. الدالة تتجاوز الاختبارات لكن آلية عملها خاطئة. هذا يعني أن الوصف غير مثالي. ونحتاج لإضافة المزيد من حالات استخدام الدالة إليه.

لنضف اختبارًا آخر للتأكد ما إن كان `pow(3, 4) = 81`.

يمكنُنا اختيار إحدى الطريقتين لتنظيم الاختبارات:

1. الخيار الأول - إضافة `assert` إلى `it`:

   ```js
   describe("pow", function() {

     it("raises to n-th power", function() {
       assert.equal(pow(2, 3), 8);
   *!*
       assert.equal(pow(3, 4), 81);
   */!*
     });

   });
   ```

2. الخيار الآخر - عمل اختبارين:

```js
describe("pow", function() {
  it("2 raised to power 3 is 8", function() {
    assert.equal(pow(2, 3), 8);
  });

  it("3 raised to power 4 is 81", function() {
    assert.equal(pow(3, 4), 81);
  });
});
```

يختلف المبدئ في أنه عند وجود خطأ في `assert` فإن `it` تتوقف عن العمل. لذا ففي الخيار الأول عند فشل `assert` الأولى فلن نرى مخرجات `assert` الأخرى. يُعد الخيار الثاني أفضل للحصول على المزيد من المعلومات حول ما يحدث بعمل اختبارين منفصلين. بالإضافة إلى وجود قاعدة أخرى من الجيد اتباعها.

**كل اختبار يفحص شيئًا واحدًا فقط.**

إن وجدنا اختبارًا يفحص شيئين مختلفين فمن الأفضل فصلُهما إلى اختبارين. لنكمل باستخدام الخيار الثاني.

النتائج:

[iframe height=250 src="pow-2" edit border="1"]
سيفشل الاختبار الثاني كَالمتوقع. فَالدالة تُرجع دوما`8`، بينما تتوقع الدالة `assert` النتيجة 27.

## تطوير التنفيذ

لنكتب شيئا أكثر واقعية لاجتياز الاختبارات:

```js
function pow(x, n) {
  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}
```

للتأكد من صحة عمل الدالة K نختبرها لأكثر من قيمة. يمكننا القيام بذلك باستخدام الحلقة `for` بدلا من تكرار `it` يدويا:

```js
describe("pow", function() {
  function makeTest(x) {
    let expected = x * x * x;
    it(`${x} in the power 3 is ${expected}`, function() {
      assert.equal(pow(x, 3), expected);
    });
  }

  for (let x = 1; x <= 5; x++) {
    makeTest(x);
  }
});
```

The result:

[iframe height=250 src="pow-3" edit border="1"]

## دالة describe متداخلة

سنضيف المزيد من الاختبارات، لكن، قبل ذلك لاحظ أنه يجب جمع الدالة المساعدة `makeTest` والدالة `for`. لن نَحتاج لاستخدام `makeTest` في باقي الاختبارات، نحتاجها فقط في `for`: لأن وظيفتهُما العامة هي فحص كيف ترفع الدالة `pow` قيمة ما إلى قوة معينة.

يتم جمع الدالتين باستخدام الدالة `describe` المتداخلة:

```js
describe("pow", function() {

*!*
  describe("raises x to power 3", function() {
*/!*

    function makeTest(x) {
      let expected = x * x * x;
      it(`${x} in the power 3 is ${expected}`, function() {
        assert.equal(pow(x, 3), expected);
      });
    }

    for (let x = 1; x <= 5; x++) {
      makeTest(x);
    }

*!*
  });
*/!*

  // ... more tests to follow here, both describe and it can be added
});
```

تُعرِّف `describe` الداخلية مجموعة فرعية جديدة من الاختبارات. يمكن ملاحظة الإزاحة في المخرجات:

[iframe height=250 src="pow-4" edit border="1"]
يمكننا إضافة المزيد من دوال `it`و `describe` في الطبقة العلوية مع دوال مساعدة لها، هذه الدوال لن ترى الدالة `makeTest`.

``smart header="`before/after` and `beforeEach/afterEach`"
يمكننا إعداد دوال `before/after` التي تُنَفَّذ قبل/بعد تنفيذ الاختبارات، كما يمكننا استخدام `beforeEach/afterEach` قبل/بعد كل `it`.

على سبيل المثال:

```js no-beautify
describe("test", function() {
  before(() => alert("Testing started – before all tests"));
  after(() => alert("Testing finished – after all tests"));

  beforeEach(() => alert("Before a test – enter a test"));
  afterEach(() => alert("After a test – exit a test"));

  it("test 1", () => alert(1));
  it("test 2", () => alert(2));
});
```

تسلسل التنفيذ سيكون كالتالي:

```
Testing started – before all tests (before)
Before a test – enter a test (beforeEach)
1
After a test – exit a test   (afterEach)
Before a test – enter a test (beforeEach)
2
After a test – exit a test   (afterEach)
Testing finished – after all tests (after)
```

[edit src="beforeafter" title="Open the example in the sandbox."]
تستخدم `beforeEach/afterEach` و `before/after` غالبا لتنفيذ الخطوات الأولية، العدادات التي تُخرج 0 أو للقيام بشيء ما بين الاختبارات أو مجموعة اختبارات.

````

## توسيع الوصف


أصبحت الوظيفة الرئيسية للدالة `pow` مكتملة. تم تجهيز الدورة الأولى من التطوير. الآن يمكننا الاحتفال بالانتهاء من ذلك وبدء تطوير الدالة.

كما ذكرنا مسبقا، فإن الدالة `pow(x, n) ستتعامل مع أرقام موجبة فقط n. تُرجع دوال جافا سكريبت دائما NaN عند وجود خطأ حسابي. لنقم بهذا الأمر مع قيم n.



أولا، نضيف هذا إلى الوصف:



```js
describe("pow", function() {

  // ...

  it("for negative n the result is NaN", function() {
*!*
    assert.isNaN(pow(2, -1));
*/!*
  });

  it("for non-integer n the result is NaN", function() {
*!*
    assert.isNaN(pow(2, 1.5));
*/!*
  });

});
```

النتائج مع الاختبارات الجديدة:



[iframe height=530 src="pow-nan" edit border="1"]

تفشل الاختبارات المُضافة مؤخرا وذلك لأن التنفيذ لا يدعمها. هكذا هي الطريقة التي يعمل بها BDD: نبدأ بكتابة الاختبارات التي نعلم بأنها ستفشل ثم نكتب التنفيذ الخاص بها.



```smart header="دوال تأكيد أخرى"
لاحظ أن الدالة assert.isNaN: تفحص وجود القيمة NaN.


لاحظ أن الدالة assert.isNaN: تفحص وجود القيمة NaN.

<<<<<<< HEAD
يوجد المزيد من دوال التأكيد في [Chai](http://chaijs.com) مثلا:



- `assert.equal(value1, value2)` -- - تفحص التساوي value1 == value2.
- `assert.strictEqual(value1, value2)` --  تفحص التساوي التام value1 === value2.
- `assert.notEqual`, `assert.notStrictEqual` --  تفحص عكس الدالتين أعلاه.
- `assert.isTrue(value)` -- تفحص أن value === true.
- `assert.isFalse(value)` -- تفحص أن value === false.
- ...يمكنك قراءة باقي الدوال في [docs](http://chaijs.com/api/assert/)
=======
There are other assertions in [Chai](https://www.chaijs.com/) as well, for instance:

- `assert.equal(value1, value2)` -- checks the equality  `value1 == value2`.
- `assert.strictEqual(value1, value2)` -- checks the strict equality `value1 === value2`.
- `assert.notEqual`, `assert.notStrictEqual` -- inverse checks to the ones above.
- `assert.isTrue(value)` -- checks that `value === true`
- `assert.isFalse(value)` -- checks that `value === false`
- ...the full list is in the [docs](https://www.chaijs.com/api/assert/)
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```

لذا، يجب أن نضيف بعض الأسطر للدالة pow:


```js
function pow(x, n) {
*!*
  if (n < 0) return NaN;
  if (Math.round(n) != n) return NaN;
*/!*

  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}
```

الآن أصبحت تعمل وتَجتاز جميع الاختبارات:



[iframe height=300 src="pow-full" edit border="1"]

[edit src="pow-full" title="Open the full final example in the sandbox."]

## الخلاصة


يكون الوصف في البداية في BDD، ثم يأتي التنفيذ. فنحصل في الأخير على كل من الوصف والشيفرة البرمجية.


يمكن استخدام الوصف بثلاث طرق:


1.  **اختبارات **  - تضمن صحة عمل الشيفرة البرمجية.
2.  **توثيق ** -- توضح العناوين في describe وit وظيفة الدالة.
3.  **أمثلة ** -- تُعد الاختبارات أمثلة فعالة تعرض كيف يمكن استخدام الدالة.

يمكننا تطوير، تغيير، أو إعادة كتابة دالة من الصفر من خلال الوصف مع ضمان صحة عملها. يعد هذا الأمر مهمًا خاصة في المشاريع الكبيرة عند استخدام دالة في عدة أماكن. فعند تغيير هذه الدالة، يكون من الصعب التحقق من صحة عملها يدويًا في كل مكان.



يوجد خيارين بدون اختبارات:



1. تنفيذ التغيير بغض النظر عن النتائج. هكذا قد نواجه الكثير من الأخطاء عند الفحص اليدوي.
2. يتجنب المطورون تحديث الشيفرة عند توقع حدوث أخطاء فادحة وعدم وجود اختبارات لفحص هذه الأخطاء فتبقى الشيفرة البرمجية بدون تحديث.


**يساعد الفحص الآلي على تجنب هذه المشاكل!**

إن كان المشروع مليئا بالاختبارات، فلن يكون هناك أي مشكلة إطلاقا. فبعد أي تغيير يمكننا تنفيذ الاختبارات لنرى العديد من التحقيقات أجريت في غضون ثوانٍ.



**علاوة على ذلك، الشيفرة البرمجية المختبرة جيدا تكون بهيكل أفضل.**

منطقيا، لأن الشيفرة البرمجية المختبرة سهلة التعديل والتطوير. مع وجود سبب آخر أيضا. يجب أن تكون الشيفرة البرمجية منظمة من أجل كتابة اختبار بحيث يكون لدى كل دالة وظيفة رئيسية موصوفة، ومدخلات ومخرجات معروفة جيدا. ذلك يعني 1 هيكلة جيدة منذ البداية.

لا يكون الأمر بهذه السهولة في الواقع. ففي بعض الأحيان يكون من الصعب كتابة وصف للدالة قبل شيفرتها البرمجية لأن سلوكها لا يكون واضحًا بعد. لكن عموما، كتابة الاختبارات يجعل التطوير أسرع وأكثر استقرارًا.

ستواجه الكثير من المهام التي تتضمن ذلك لاحقا في الشرح. فسترى المزيد من الأمثلة العملية. يتطلب كتابة الاختبارات معرفة جيدة بِجافا سكريبت. لكننا في بداية تعلمها. فلترتيب كل شيء، لست مطالبًا بكتابة الاختبارات في الوقت الحالي، لكن يجب أن تكون قادرًا على قرائتها حتى إن كانت معقدة أكثر قليلا مما تم شرحه هنا.
````
