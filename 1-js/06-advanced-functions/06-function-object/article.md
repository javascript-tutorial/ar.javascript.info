
# كائن الدالة و تعبير الدالة المُسَمَّى

كما نعرف جميعاً أن الدالة في الجافاسكريبت تعتبر قيمة.

وكل قيمة في هذه اللغة لها نوع. إذا ما هو نوع الدالة؟

في لغة الجافاسكريبت تعتبر الدوال ( أشياء/كائنات ) "Objects". 

 و الطريقة الجيدة كي تستطيع تخيل الدوال هي أن تعتبرها أشياء تقوم ببعض الأفعال. لا نستطيع فقط مناداتها بل ومعاملتها كأنها أشياء أيضاً كإضافة و إزالة أي خاصية بداخلها أو تخزين مرجع يشير إليها و كل العمليات التي نقوم بها علي الأشياء.


## خاصية "الإسم"

كائن الدالة يحتوي علي بعض الخواص التي يعاد استخدامها كثيراً

مثلاً إسم الدالة يعتبر متاح علي شكل خاصية الإسم "name property".

```js run
function sayHi() {
  alert("Hi");
}

alert(sayHi.name); // sayHi
```

والظريف فى الأمر ايضاً, منطق إضافة الإسم هنا يعتبر ذكياً. إنها ايضاً تضيف الإسم الصحيح للدالة حتي وإن كانت الدالة تم إنشائها بدون إسم ولكن تم إضافته بعد صنعها فوراً: 


```js run
let sayHi = function() {
  alert("Hi");
};

alert(sayHi.name); // sayHi (there's a name!)
```

إنها تعمل أيضاً في حال إذا كانت الإضافة تتم عن طريق قيمة إفتراضية:


```js run
function f(sayHi = function() {}) {
  alert(sayHi.name); // sayHi (works!)
}

f();
```
في مواصفات الدالة هذه الخاصية تسمي الإسم السياقي "contextual name". وإذا كانت الدالة لا توفر لنا واحداً, فإن هذه الخاصية عند الإضافة تستطيع معرفته من السياق.


هذا الكلام يشمل طرق الأشياء أيضاً:


```js run
let user = {

  sayHi() {
    // ...
  },

  sayBye: function() {
    // ...
  }

}

alert(user.sayHi.name); // sayHi
alert(user.sayBye.name); // sayBye
```
لا يوجد سحر هنا. لأنه في بعض الحالات لا يستطيع المحرك أن يعرف الإسم الصحيح. لذلك في هذه الحالة خاصية الإسم تصبح فارغة, مثل هذه الحالة:

```js run
// function created inside array
let arr = [function() {}];

alert( arr[0].name ); // <empty string>

// المحرك لم يجد طريقة لتسمية الإسم الصحيح, لذلك لا يجد إسم

```

لكن هذه حالات ضعيفة و أغلب الدوال لها خاصية الإسم.


## The "length" property

هناك خاصية أخرى تمتلكها الدوال وهي خاصية الطول "length". هذه الخاصية تعطينا عدد العوامل الدالة, مثلاً:

```js run
function f1(a) {}
function f2(a, b) {}
function many(a, b, ...more) {}

alert(f1.length); // 1
alert(f2.length); // 2
alert(many.length); // 2
```
هنا نلاحظ أن العوامل الباقية (rest parameters) لا تُعد.

خاصية الطول `length` تستخدم أحياناً لـ[إستبطان الذات](https://en.wikipedia.org/wiki/Type_introspection) داخل الدوال التي تعتمد على دوال اخرى

مثلاً الكود الذي فى الأسفل الدالة `ask` تقبل العامل `question` لتسأله وعدد عشوائي من الـ `handler` دوال لتنفيذها.

بمجرد أن يقدم المستخدم الإجابة, الدالة تنادي الـ handler. يمكن أن نمرر نوعين من الـ handlers:

- دالة لا تمتلك عوامل, التي تُنادى فقط عندما يعطي المستخدم إجابة بالإيجاب 
- دالة لديها عوامل, وتُنادى في كلتا الحالتين وتعطينا إجابة.

لتتم مناداة الدالة `handler` بالطريقة الصحيحة, نفحص خاصية `handlers.length`.

الفكرة هى أن لدينا دالة بسيطة ليس لها عوامل للحالات الإيجابية, لكن تستطيع دعم الـ handlers ايضاً:


```js run
function ask(question, ...handlers) {
  let isYes = confirm(question);

  for(let handler of handlers) {
    if (handler.length == 0) {
      if (isYes) handler();
    } else {
      handler(isYes);
    }
  }

}
// للإيجابات الإجابية تتم مناداة الدالتين 
// للإيجابات السلبية تتم مناداة الدالة الثانية فقط

ask("Question?", () => alert('You said yes'), result => alert(result));
```

هذه الحالة تُسمي [تعدد الأشكال](https://en.wikipedia.org/wiki/Polymorphism_(computer_science)) -- معاملة العوامل بطرق مختلفة إعتماداً على نوعهم أو في حالتنا إعتماداً على الطول `length`. الفكرة عامةً لها إستخدام فى مكتبات الجافاسكريبت.

## خصائص مخصصة

نحن نستطيع أيضاً إضافة الخاصية التي نريدها إلى الدالة.

فى هذا المثال سنضع خاصية `counter` لنستطيع تحديد عدد المناديات الكلي للدالة: 


```js run
function sayHi() {
  alert("Hi");

  *!*
  // لنحسب عدد مرات تنفيذ الدالة
  sayHi.counter++;
  */!*
}
sayHi.counter = 0; // قيمة إبتدائية

sayHi(); // Hi
sayHi(); // Hi

alert( `Called ${sayHi.counter} times` ); // Called 2 times
```

```warn header="الخاصية ليست متغيراً"
الخاصية التي تضاف للدالة مثل `sayHi.counter = 0` *لا* تعرّف كمتغير محلي `counter` داخلها. 
أو بطريقة أخرى الخاصية `counter` والمتغير `let counter` شيئان ليس لهما علاقة ببعضهم

يمكن أن نعامل الدالة مثل معاملة الشئ, تخزين خصائص داخلها لكن ليس لها تأثر علي تنفيذها. المتغيرات ليست خصائص للدالة والعكس صحيح.

```
خواص الدالة يمكن أن تستبدل عمليات الإغلاق أحياناً. مثلاً يمكننا إعادة كتابة مثال دالة العداد الموجود فى هذا الفصل <info:closure> لإستخدام خاصية الدالة:


```js run
function makeCounter() {
  // بدلاً من : 
  // let count = 0

  function counter() {
    return counter.count++;
  };

  counter.count = 0;

  return counter;
}

let counter = makeCounter();
alert( counter() ); // 0
alert( counter() ); // 1
```

`count`  الأن تم تخزينه في الدالة مباشراً, ليس في حدسها الخارجي Lexical Environment

هل هذا يعتبر أفضل أم أسوء من إستخدام الإغلاق؟

الإختلاف الأساسي هو أن قيمة `count` تعيش داخل متغير خارجي لذلك الكود الخاردي لا يستطيع الوصول إليه. وحدها الدوال المتداخلة هي التي من الممكن أن تستطيع تعديله. لكن إذا كان مقيّداً بالدالة , إذاً هذا من السهل حدوثه وهذا هو الإختلاف بينهم:

```js run
function makeCounter() {

  function counter() {
    return counter.count++;
  };

  counter.count = 0;

  return counter;
}

let counter = makeCounter();

*!*
counter.count = 10;
alert( counter() ); // 10
*/!*
```

لذلك إختيار طريقة الكتابة والبناء تعتمد علي أهدافنا في المشروع.


## تعبير الدالة المُسَمَّى

تعبير الدالة المُسَمَّى أو (NFE) اختصاراً لـ Named Function Expression, يعتبر تعريف للدالة يحتوي علي إسم.

مثلاً, لنأخذ مثال لتعبير دالة:


```js
let sayHi = function(who) {
  alert(`Hello, ${who}`);
};
```
ونضيف إسم لها: 

```js
let sayHi = function *!*func*/!*(who) {
  alert(`Hello, ${who}`);
};
```
هل حققنا أى شئ هنا؟ ما هو غرض زيادة إسم `"func"`؟

أولاً دعنا نلاحظ أننا مازال لدينا تعبير دالة. وإضافة إسم `"func"` بعد  `function` لم يقم بتعريف الدالة لأنها مازالت جزء من توضيح تعبير الدالة.

و وضع هذا الإسم لم يعطل أى شئ.

والدالة مازالت متاحة كـ `sayHi()`:

إذاً ما هى فائدتها.!!

```js run
let sayHi = function *!*func*/!*(who) {
  alert(`Hello, ${who}`);
};

sayHi("John"); // Hello, John
```

هناك شيئين حول الإسم `func`, هما السبب في كتابتنا لهم.

1. إنه يسمح للدالة بالإشارة إلى نفسها داخلياً.
2. إنه لا يُري خارج الدالة

مثلاً الدالة `sayHi` تنادي نفسها مرة أخرى بالـ `"Guest"` إذا لم يكن `who` مُعطى.


```js run
let sayHi = function *!*func*/!*(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
*!*
    func("Guest"); // لمناداة الدالة مرة أخرى
*/!*
  }
};

sayHi(); // Hello, Guest

// لكن هذا لن يعمل لأن هذا الإسم لا يري في خارج تعريف الدالة :
func(); // Error, func is not defined (not visible outside of the function)
```

لماذا إستخدمنا `func`؟ ولم نستخدم `sayHi` ؟ للمناداة الأخرى.

في الواقع نحن يمكننا فعل ذلك ولن يسبب أخطاء :

```js
let sayHi = function(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
*!*
    sayHi("Guest");
*/!*
  }
};
```

لكن المشكلة مع الكود هي أن `sayHi` يمكن أن تتغير فى الكود الخارجي. إذا تمت تعيين الدالة لمتغير أخر في المقابل, الكود سيبدأ فى إظهار أخطاء: 

```js run
let sayHi = function(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
*!*
    sayHi("Guest"); // Error: sayHi is not a function
*/!*
  }
};

let welcome = sayHi;
sayHi = null;

welcome(); // Error, the nested sayHi call doesn't work any more!
```

هذا حدث الدالة أخذت `sayHi` من حدثها الخارجي lexical environment. ولا يوجد متغير محلي اسمه `sayHi`, لذلك المتغير الخارجى مستخدم. و وفى لحظة المناداة `sayHi` يعتبر `null`.

هنا يأتي دور الإسم الذى وضعناه داخل تعبير الدالة.

هو من يحل هذه المشاكل.

دعنا نستخدم هذا ونصلح الكود الخاص بنا.

```js run
let sayHi = function *!*func*/!*(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
*!*
    func("Guest"); // Now all fine
*/!*
  }
};

let welcome = sayHi;
sayHi = null;

welcome(); // Hello, Guest (nested call works)
```
الأن هذا يعمل, لأن الإسم `"func"` يعتبر دالة محلية. هذا لا يؤخذ من الخارج. هذه الخاصية تضمن لنا أنها ستكون دائماً تشير إلي الدالة الحالية.

الكود الخارجي يظل يملك المتغير `sayHi` أو `welcome`. و `func` تعتبر إسم داخلي للدالة.



```smart header="لا يوجد هذا الشئ في تعريف الدالة العادية"

خاصية إسم دالة متاحة فقط لتعبير الدالة  Function Expressions وليس لتعريف الدالة Function Declarations. بالنسبة لتعريف الدالة لا توجد طريقة لتعريف إسم داخلي.

في بعض الأحيان عندما نحتاج إلي إسم داخلي يكون هذا السبب لتحويل تعريف الدالة إلى NFE أو تعبير الدالة المُسمى.

```

## المُلخص

الدوال أشياء.

هنا سنغطي ما شرحناه مسبقاً عن خصائصها : 

- الإسم `name` -- إسم الدالة. عادة يؤخذ من تعريف الدالة, ولكن إذا كان لا يوجد إسم. الجافاسكريبت تحاول تخمينه من السياق.
- الطول `length` -- عدد العوامل في تعريف الدالة. والعوامل الباقية Rest parameters لا تّحسب.

إذا تم تعريف الدالة علي أنها تعبير دالة وتحمل إسم, ذلك يدعي NFE تعبير الدالة المُسَمَّى. الإسم يمكن أن يستخدم في داخل الدالة لتشير إلي نفسها, للتكرار أو أي شئ

أيضاً, الدالة يمكن أن تحمل خواص أخري. الكثير من المكتبات المعروفة للجافاسكريبت تجعل إستخدام كبير من هذه الخاصية.

<<<<<<< HEAD
هم يصنعوا دالة أساسية ويلحق بها دوال أخرى مساعدة لها. مثلاً مكتبة الـ [jQuery](https://jquery.com) تصنع دالة تُسمي `$`. مكتبة [lodash](https://lodash.com) تصنع دالة `_`, ثم تضيف `_.clone` و `_.keyBy` و خواص أخرى لها. يمكنك أن تعرف أكثر عن هذه المكتبة من هنا [docs](https://lodash.com/docs). هم يفعلون ذلك في الواقع لتقليل تلوث الفراغ الشامل, لذلك المكتبة الواحدة تعطي فقط متغير عالمي. ذلك يقلل إحتمالية تداخل الأسماء.
=======
They create a "main" function and attach many other "helper" functions to it. For instance, the [jQuery](https://jquery.com) library creates a function named `$`. The [lodash](https://lodash.com) library creates a function `_`, and then adds `_.clone`, `_.keyBy` and other properties to it (see the [docs](https://lodash.com/docs) when you want to learn more about them). Actually, they do it to lessen their pollution of the global space, so that a single library gives only one global variable. That reduces the possibility of naming conflicts.
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c

لذلك الدالة يمكنها القيام بواجب رائع من نفسها ويمكن أن تحمل الكثير من الخواص الأخري في داخلها.

