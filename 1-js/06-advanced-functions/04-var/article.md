# إفادة «var» القديمة

```smart header="هذه المقالة من أجل فهم النصوص القديمة"
المعلومات داخل هذه المقالة تساعدنا فى فهم النصوص القديمة أكثر ولا تحتوي علي أي معلومات عن كيفية كتابة كود جديد

<<<<<<< HEAD
=======
```smart header="This article is for understanding old scripts"
The information in this article is useful for understanding old scripts.

That's not how we write new code.
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602
```

ذكرنا في أوائل الفصول حين تكلمنا عن [المتغيرات](info:variables), ذكرنا ثلاث طرائق للتصريح عنها:

1. `let`
2. `const`
3. `var`

تصرّف كلا الإفادتين `‎let‎` و`‎const‎` بذات الطريقة (بالمقايسة مع البيئات المُعجمية).

بينما `‎var‎` فهو وحش آخر مختلف جذريًا ويعود في أصله إلى قرون سحيقة. لا نستعمله عادةً في السكربتات الحديثة ولكنّك ستجده حتمًا خلف إحدى صخور السكربتات القديمة.

لو لم ترغب بالتعرّف على هذه السكربتات فيمكنك تخطّي هذا الفصل أو تأجيله لوقت لاحق. ولكن لا تنسَ احتمالية ندمك لاحقًا فيغدر بك هذا الوحش.

من أول وهلة نرى بأنّ تصرّف `‎var‎` يشابه تصرّف `‎let‎`، أي أنّه يُصرّح (مثل الثاني) عن متغير:

````js run
function sayHi() {
  var phrase = "Hello"; // ‫متغير محلي، استعملنا «var» بدل «let»

  alert(phrase); // Hello
}
=======
The `var` declaration is similar to `let`. Most of the time we can replace `let` by `var` or vice-versa and expect things to work:

```js run
var message = "Hi";
alert(message); // Hi
````

But internally `var` is a very different beast, that originates from very old times. It's generally not used in modern scripts, but still lurks in the old ones.

alert(phrase); // ‫خطأ، phrase غير معرّف

````

ولكن... ما خفي كان أعظم. إليك الفروق.
=======
If you don't plan on meeting such scripts you may even skip this chapter or postpone it.

On the other hand, it's important to understand differences when migrating old scripts from `var` to `let`, to avoid odd errors.

## "var" has no block scope

Variables, declared with `var`, are either function-scoped or global-scoped. They are visible through blocks.


```js run
if (true) {
  var test = true; // ‫نستعمل «var» بدل «let»
}

alert(test); // ‫الناتج true، أي أنّ المتغير «حيّ يُرزق» بعد إفادة if

````

تجاهل `‎var‎` كتل الشيفرة، وبهذا صار متغير `‎test‎` عموميًا.

لو استعملنا `‎let test‎` بدل `‎var test‎` فسيكون المتغير ظاهرًا لباقي الشيفرة داخل إفادة `‎if‎` فقط لا غير:

```js run
if (true) {
  let test = true; // ‫نستعمل «let»
}

*!*
alert(test); // ReferenceError: test is not defined
*/!*
```

````
يسري الأمر ذاته على الحلقات فلا يمكن أن يكون `‎var‎` محليًا حسب الكتلة أو حسب الحلقة:

```js
for (var i = 0; i < 10; i++) {
  var one = 1;
  // ...
}

*!*
alert(i);   // 10, "i" is visible after loop, it's a global variable
alert(one); // 1, "one" is visible after loop, it's a global variable
*/!*
````

لو كتبت كتلة شيفرة في دالة فسيصير `‎var‎` متغيرًا على مستوى الدالة كاملةً.

```js run
function sayHi() {
  if (true) {
    var phrase = 'Hello';
  }

  alert(phrase); // يمكننا فعل هذا
}

sayHi();
alert(phrase); // ReferenceError: phrase is not defined
```

As we can see, `var` pierces through `if`, `for` or other code blocks. That's because a long time ago in JavaScript, blocks had no Lexical Environments, and `var` is a remnant of that.

## تُعالج التصريحات باستعمال `‎var‎` عند بدء الدالة

# ُعالج التصريحات باستعمال `‎var‎` متى ما بدأت الدالة (أو بدأ السكربت، للمتغيرات العمومية).

## "var" tolerates redeclarations

If we declare the same variable with `let` twice in the same scope, that's an error:

```js run
let user;
let user; // SyntaxError: 'user' has already been declared
```

With `var`, we can redeclare a variable any number of times. If we use `var` with an already-declared variable, it's just ignored:

```js run
var user = 'Pete';

var user = 'John'; // this "var" does nothing (already declared)
// ...it doesn't trigger an error

alert(user); // John
```

## "var" variables can be declared below their use

أي أنّ متغيرات `‎var‎` تُعرّف من بداية الدالة مهما كان مكان تعريفها (هذا لو لم يكن التعريف في دالة متداخلة أخرى).

يعني ذلك أنّ هذه الشيفرة:

```js run
function sayHi() {
  phrase = 'Hello';

  alert(phrase);

  var phrase;
}
sayHi();
```

متطابقة تقنيًا مع هذه (بتحريك `‎var phrase‎` إلى أعلى):

```js run
function sayHi() {
  var phrase;

  phrase = 'Hello';

  alert(phrase);
}
sayHi();
```

أو حتى هذه (لا تنسَ بأنّ كُتل الشيفرات مُهملة):

```js run
function sayHi() {
  phrase = 'Hello'; // (*)

  if (false) {
    var phrase;
  }

  alert(phrase);
}
sayHi();
```

يدعو الناس هذا السلوك بسلوك «الطفو» _hoisting_ (أو الرفع) إذ أنّ متغيرات `‎var‎` «تطفو» إلى أعلى الدالة (أو ترتفع إلى أعلاها).

أي أنّه في المثال أعلاه، الفرع `‎if (false)‎` من الإفادة لا يعمل قط ولكن هذا ليس بمهم، إذ أنّ `‎var‎` داخله سيُعالج في بداية الدالة، وحين تصل عملية التنفيذ إلى `‎(*)‎` سيكون المتغير موجودًا لا محالة.

**التصريحات تطفو صحيح، ولكنّ ليس عبارات الإسناد.**

الأفضل لو نمثّل ذلك في هذا المثال:

```js run
function sayHi() {
  alert(phrase);

  var phrase = 'Hello';
}

sayHi();
```

في السطر `‎var phrase = "Hello"‎` إجراءان اثنان:

1. التصريح عن المتغير باستعمال `var`
2. إسناد قيمة للمتغير باستعمال `‎=‎`.

يتعامل المحرّك مع التصريحات متى بدء تنفيذ الدالة (إذ التصريحات تطفو)، ولكنّ عبارة الإسناد لا تعمل إلّا حيثما ظهرت، فقط. إذًا فالشيفرة تعمل بهذا النحو فعليًا:

```js run
function sayHi() {
  var phrase; // ‫بادئ ذي بدء، يعمل التصريح...

  alert(phrase); // غير معرّف

  phrase = 'Hello'; // ‫...هنا.
}

sayHi();
```

يُعالج المحرّك التصريحات `‎var‎` حين تبدأ الدوال، وبهذا يمكننا الإشارة إليها أينما أردنا في الشيفرة. ولكن انتبه فالمتغيرات غير معرّفة حتى تُسند إليها قيم.

في الأمثلة أعلاه عمل التابِع `‎alert‎` دون أيّ أخطاء إذ أن المتغير `‎phrase‎` موجود. ولكن لم تُسند فيه قيمة بعد فعرض `‎undefined‎`.

In both examples above, `alert` runs without an error, because the variable `phrase` exists. But its value is not yet assigned, so it shows `undefined`.

## IIFE

In the past, as there was only `var`, and it has no block-level visibility, programmers invented a way to emulate it. What they did was called "immediately-invoked function expressions" (abbreviated as IIFE).

"**I**mmediately-**I**nvoked **f**unction **E**xpressions"

هذا لا يستخدم حالياً, لكن تستطيع إيجادهم في النصوص القديمة.

طريقة كتابة (IIFE):

```js run
(function () {
  var message = 'Hello';

  alert(message); // Hello
})();
```

هذا يعتبر تعريف دالة صُنعت وتمت مناداتها على الفور. لذلك يتم تنفيذ الكود ولها متغيراتها الخاصة.

Here, a Function Expression is created and immediately called. So the code executes right away and has its own private variables.

The Function Expression is wrapped with parenthesis `(function {...})`, because when JavaScript engine encounters `"function"` in the main code, it understands it as the start of a Function Declaration. But a Function Declaration must have a name, so this kind of code will give an error:

```js run
// Tries to declare and immediately call a function
function() { // <-- SyntaxError: Function statements require a function name

  var message = "Hello";

  alert(message); // Hello

}();
```

حتي لو وضعنا إسم, لن يعمل هذا, لأن جافا سكريبت لا تسمح بتعريف دالة ستتم مناداتها فورياً:

```js run
// هذا خطأ بسبب الأقواس الموجودة بالأسفل
function go() {

}();
```

لذلك, الأقواس حول الدالة تعتبر خدعة لجعل جافا سكريبت فهم أننا نصنع سياق أخر للتعريف, لذلك إن تعريف الدالة: لا يحتاج إلي اسم لذلك تتم مناداتها علي الفور

هناك أيضاً طرق أخرى:

```js run
// Ways to create IIFE

(function() {
  alert("Parentheses around the function");
}*!*)*/!*();

(function() {
  alert("Parentheses around the whole thing");
}()*!*)*/!*;

*!*!*/!*function() {
  alert("Bitwise NOT operator starts the expression");
}();

*!*+*/!*function() {
  alert("Unary plus starts the expression");
}();
```

## ملخص

هناك فرقين جوهرين بين `‎var‎` موازنةً بِـ `‎let/const‎`:

1. ليس لمتغيرات `‎var‎` نطاقًا كتليًا وأصغر نطاق لها هو في الدوال.
2. تُعالج التصريحات باستعمال `‎var‎` عند بدء الدالة (أو بدء السكربت، للمتغيرات العمومية).

3. `var` variables have no block scope, their visibility is scoped to current function, or global, if declared outside function.
4. `var` declarations are processed at function start (script start for globals).

بهذا، غالبًا ما يكون استعمال `‎var‎` أسوأ بكثير من `‎let‎` بعدما عرفت الفروق بينها، فالمتغيرات على مستوى الكُتل أمر رائع جدًا ولهذا السبب تمامًا أُضيفت `‎let‎` إلى معيار اللغة منذ زمن وصارت الآن الطريقة الأساسية (هي و`‎const‎`) للتصريح عن متغير.
