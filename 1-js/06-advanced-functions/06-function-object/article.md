# كائن الدالة وتعبير الدالة المُسَمَّى

كما نعرف جميعاً أن الدالة في جافا سكريبت تعتبر قيمة.

وكل قيمة في هذه اللغة لها نوع. إذا ما هو نوع الدالة؟

في لغة جافا سكريبت، الدوال كائنات.

والطريقة الجيدة كي تستطيع تخيل الدوال هي أن تعتبرها كائنات تقوم ببعض الأفعال قابلة للاستدعاء. لا نستطيع فقط مناداتها بل ومعاملتها كأنها كائنات: إضافة/إزالة أي خاصية بداخلها، تخزين مرجع يشير إليها الخ.

## خاصية "الاسم"

كائن الدالة يحتوي علي بعض الخواص التي يعاد استخدامها كثيراً

مثلاً اسم الدالة يعتبر متاحا على شكل خاصية الاسم "name".

```js run
function sayHi() {
  alert('Hi');
}

alert(sayHi.name); // sayHi
```

والطريف فى الأمر أيضاً، منطق إضافة الاسم هنا يعتبر ذكياً. إنها أيضاً تضيف الاسم الصحيح للدالة حتى وإن كانت الدالة تم إنشائها دون اسم ولكن تم إضافته بعد صنعها فوراً:

```js run
let sayHi = function () {
  alert('Hi');
};

alert(sayHi.name); // sayHi (there's a name!)
```

إنها تعمل أيضاً في حال إذا كانت الإضافة تتم عن طريق قيمة افتراضية:

```js run
function f(sayHi = function () {}) {
  alert(sayHi.name); // sayHi (works!)
}

f();
```

في مواصفات الدالة هذه الخاصية تسمى الاسم السياقي "contextual name". وإذا كانت الدالة لا توفر لنا واحداً، فإن هذه الخاصية عند الإضافة تستطيع معرفته من السياق.

هذا الكلام يشمل دوال الكائنات أيضاً:

```js run
let user = {
  sayHi() {
    // ...
  },

  sayBye: function () {
    // ...
  },
};

alert(user.sayHi.name); // sayHi
alert(user.sayBye.name); // sayBye
```

لا سحر هنا. لأنه في بعض الحالات لا يستطيع المحرك أن يعرف الاسم الصحيح. لذلك في هذه الحالة خاصية الاسم تصبح فارغة، مثل هذه الحالة:

```js run
// function created inside array
let arr = [function () {}];

alert(arr[0].name); // <empty string>

// المحرك لم يجد طريقة لتسمية الإسم الصحيح, لذلك لا يجد إسم
```

لكن هذه حالات ضعيفة وأغلب الدوال لها خاصية الاسم.

## خاصية "length"

هناك خاصية أخرى تمتلكها الدوال وهي خاصية "length". هذه الخاصية تعطينا عدد العوامل الدالة، مثلاً:

```js run
function f1(a) {}
function f2(a, b) {}
function many(a, b, ...more) {}

alert(f1.length); // 1
alert(f2.length); // 2
alert(many.length); // 2
```

هنا نلاحظ أن العوامل الباقية (rest parameters) لا تُعد.

خاصية الطول `length` تستخدم أحياناً لـ[إستبطان الذات](https://en.wikipedia.org/wiki/Type_introspection) داخل الدوال التي تعتمد على دوال أخرى.
مثلاً بالشيفرة التي في الأسفل، الدالة `ask` تقبل العامل `question` لتسأله وعدد عشوائي من الـ `handler` دوال لتنفيذها.

بمجرد أن يقدم المستخدم الإجابة، الدالة تنادي الـ handler. يمكن أن نمرر نوعين من الـ handlers:

- دالة لا تمتلك عوامل، التي تُنادى فقط عندما يعطي المستخدم إجابة بالإيجاب،
- دالة لديها عوامل، وتُنادى في كلتا الحالتين وتعطينا إجابة.

لتتم مناداة الدالة `handler` بالطريقة الصحيحة، نفحص خاصية `handlers.length`.

الفكرة هي أن لدينا دالة ليس لها عوامل للحالات الإيجابية، لكن تستطيع دعم الـ handlers أيضاً:

```js run
function ask(question, ...handlers) {
  let isYes = confirm(question);

  for (let handler of handlers) {
    if (handler.length == 0) {
      if (isYes) handler();
    } else {
      handler(isYes);
    }
  }
}
// للإيجابات الإجابية تتم مناداة الدالتين
// للإيجابات السلبية تتم مناداة الدالة الثانية فقط

ask(
  'Question?',
  () => alert('You said yes'),
  (result) => alert(result)
);
```

هذه الحالة تُسمى [تعدد الأشكال](<https://en.wikipedia.org/wiki/Polymorphism_(computer_science)>) -- معاملة العوامل بطرق مختلفة إعتماداً على نوعهم أو في حالتنا إعتماداً على الطول `length`. الفكرة عامةً لها استخدام في مكتبات جافا سكريبت.

## خصائص مخصصة

نستطيع أيضاً إضافة الخاصية التي نريدها إلى الدالة.

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

خواص الدالة يمكن أن تستبدل عمليات الإغلاق أحياناً. مثلاً يمكننا إعادة كتابة مثال دالة العداد الموجود فى هذا الفصل <info:closure> لاستخدام خاصية الدالة:

```js run
function makeCounter() {
  // بدلاً من :
  // let count = 0

  function counter() {
    return counter.count++;
  }

  counter.count = 0;

  return counter;
}

let counter = makeCounter();
alert(counter()); // 0
alert(counter()); // 1
```

`count` الأن تم تخزينه في الدالة مباشرة، ليس في حدسها الخارجي Lexical Environment

هل هذا يعتبر أفضل أم أسوء من استخدام الإغلاق؟

الإختلاف الأساسي هو أن قيمة `count` تعيش داخل متغير خارجي لذلك الشيفرة الخارجية لا تستطيع الوصول إليه. وحدها الدوال المتداخلة هي التي من الممكن أن تستطيع تعديله. لكن إذا كان مقيّداً بالدالة، إذاً هذا من السهل حدوثه وهذا هو الإختلاف بينهم:

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

لذلك إختيار طريقة الكتابة والبناء تعتمد على أهدافنا في المشروع.

## تعبير الدالة المُسَمَّى

تعبير الدالة المُسَمَّى أو (NFE) اختصاراً لـ Named Function Expression، يعتبر تعريف للدالة يحتوي على اسم.

مثلاً، لنأخذ مثال لتعبير دالة:

```js
let sayHi = function (who) {
  alert(`Hello, ${who}`);
};
```

ونضيف اسم لها:

```js
let sayHi = function *!*func*/!*(who) {
  alert(`Hello, ${who}`);
};
```

هل حققنا أي شيء هنا؟ ما هو غرض زيادة اسم `"func"`؟

أولاً دعنا نلاحظ أننا مازال لدينا تعبير دالة. وإضافة اسم `"func"` بعد `function` لم يقم بتعريف الدالة لأنها مازالت جزءًا من توضيح تعبير الدالة.

ووضع هذا الاسم لم يعطل أي شيء.

والدالة مازالت متاحة باسم `sayHi()`:

إذاً ما هى فائدتها؟!

```js run
let sayHi = function *!*func*/!*(who) {
  alert(`Hello, ${who}`);
};

sayHi("John"); // Hello, John
```

هناك شيئين حول الإسم `func`، هما السبب في كتابتنا لهم.

1. يسمح للدالة بالإشارة إلى نفسها داخلياً.
2. لا يُري خارج الدالة

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

لماذا استخدمنا `func`؟ ولم نستخدم `sayHi` ؟ للمناداة الأخرى.

في الواقع نحن يمكننا فعل ذلك ولن يسبب أخطاء:

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

لكن المشكلة مع الشيفرة هي أن `sayHi` يمكن أن تتغير فى الشيفرة الخارجية. إذا تمت تعيين الدالة لمتغير أخر في المقابل، الشيفرة ستبدأ فى إظهار أخطاء:

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

هذا حدث الدالة أخذت `sayHi` من حدثها الخارجي lexical environment. ولا يوجد متغير محلي اسمه `sayHi`، لذلك المتغير الخارجى مستخدم. وفي لحظة المناداة `sayHi` يعتبر `null`.

هنا يأتي دور الاسم الذي وضعناه داخل تعبير الدالة.

هو من يحل هذه المشاكل.

دعنا نستخدم هذا ونصلح شيفرتنا.

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

الأن هذا يعمل، لأن الاسم `"func"` يعتبر دالة محلية. هذا لا يؤخذ من الخارج. هذه الخاصية تضمن لنا أنها ستكون دائماً تشير إلى الدالة الحالية.

الشيفرة الخارجية تظل تملك المتغير `sayHi` أو `welcome`. و `func` تعتبر اسم داخلي للدالة.

```smart header="لا يوجد هذا الشيء في تعريف الدالة العادية"

The outer code still has its variable `sayHi` or `welcome`. And `func` is an "internal function name", the way for the function to can call itself reliably.

في بعض الأحيان عندما نحتاج إلى اسم داخلي يكون هذا السبب لتحويل تعريف الدالة إلى NFE أو تعبير الدالة المُسمى.

```

## المُلخص

الدوال كائنات.

هنا سنغطي ما شرحناه مسبقاً عن خصائصها :

- الاسم `name` -- اسم الدالة. عادة يؤخذ من تعريف الدالة، ولكن إذا كان لا يوجد اسم، جافا سكريبت تحاول تخمينه من السياق.
- الطول `length` -- عدد العوامل في تعريف الدالة. والعوامل الباقية Rest parameters لا تّحسب.

إذا تم تعريف الدالة على أنها تعبير دالة وتحمل اسما، ذلك يدعي NFE تعبير الدالة المُسَمَّى. الاسم يمكن أن يستخدم في داخل الدالة لتشير إلى نفسها، للتكرار أو أي شيء.

أيضاً، الدالة يمكن أن تحمل خواص أخرى. الكثير من المكتبات المعروفة لجافا سكريبت تجعل استخدام كبير من هذه الخاصية.

They create a "main" function and attach many other "helper" functions to it. For instance, the [jQuery](https://jquery.com) library creates a function named `$`. The [lodash](https://lodash.com) library creates a function `_`, and then adds `_.clone`, `_.keyBy` and other properties to it (see the [docs](https://lodash.com/docs) when you want to learn more about them). Actually, they do it to lessen their pollution of the global space, so that a single library gives only one global variable. That reduces the possibility of naming conflicts.

لذلك الدالة يمكنها القيام بواجب رائع من نفسها ويمكن أن تحمل الكثير من الخواص الأخرى في داخلها.
