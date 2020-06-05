# تعبيرات الدوال

في الجافاسكربت فإن الدوال ليست بنية سحرية للغة ولكنها نوع خاص من القيم.

الطريقة التي استخدمناها سابقًا تسمى _Function Declaration_:

```js
function sayHi() {
    alert("Hello");
}
```

هناك طريقة أخرى لعمل دالة وتسمى _Function Expression_.

كالتالي:

```js
let sayHi = function () {
    alert("Hello");
};
```

هنا تم عمل الدالة وتخزينها في متغير مثل أي قيمة أخرى ولا يهم كيف تم تعريفها. هي فقط تخزن في متغير اسمه `sayHi`.

معنى هذا الكود كالآتي: "إنشئ دالةوضعها في المتغير `sayHi`".

يمكننا حتى طباعة هذه القيمة باستخدام `alert`:

```js run
function sayHi() {
  alert( "Hello" );
}

*!*
alert( sayHi ); // يعرض كود الدالة
*/!*
```

لاحظ أن آخر سطر لا يقوم بتنفيذ الدالة لعدم وجود قوسين بعد `sayHi`. هناك لغات برمجة حيث يمكنك استدعاء الدالة بمجرد ذكر اسمها ولكن الجافاسكربت ليست منهم.

في الجافاسكربت الدالة هي قيمة لذلك يمكننا معاملتها مثل أي قيمة والكود بالأعلى يعرض نص به الكود الخاص بها

بالتأكيد هي قيمة من نوع خاص حيث يمكن استدعائها `sayHi()`.

لكنها لا تزال قيمة يمكننا التعامل معها كأي قيمة أخرى.

يمكننا نسخ الدالة لمتغير آخر:

```js run no-beautify
function sayHi() {
    // (1) create
    alert("Hello");
}

let func = sayHi; // (2) copy

func(); // Hello     // (3) run the copy (it works)!
sayHi(); // Hello    //     this still works too (why wouldn't it)
```

هذه تفاصيل ما حدث:

1. تعريف الدالة `(1)` ينشئ دالة ويضعها في متغير اسمه `sayHi`.
2. السطر `(2)` ينسخها إلى متغير اسمه `func`. لاحظ عدم وجود أقواس بعد `sayHi`. إذا وجدت الأقواس `func = sayHi()` سيتم وضع نتيجة تنفيذ `sayHi()` داخل `func` وليس الدالة `sayHi` نفسها.
3. الآن يمكننا استدعاء الدالة عن طريق `sayHi()` أو `func()`.

لاحظ أنه يمكننا استخدام Function Expression لتعريف `sayHi` في السطر الأول:

```js
let sayHi = function () {
    alert("Hello");
};

let func = sayHi;
// ...
```

كل شئ يعمل بنفس الطريقة.

````smart header="لماذا يوجد فاصلة منقوطة في النهاية ?"
ربما تتسائل لماذا يوجد فاصلة منقوطة في نهاية Function Expression ولا يوجد مع Function Declaration:

```js
function sayHi() {
  // ...
}

let sayHi = function() {
  // ...
}*!*;*/!*
```

الإجابة بسيطة:
- لا حاجة للفاصلة المنقوطة `;` في نهاية code blocks والهياكل المشابهة مثل `if { ... }`, `for {  }`, `function f { }` الخ.
- يتم استخدام Function Expression داخل التعبير: `let sayHi = ...;` كقيمة وليس code block. يفضل استخدام الفاصلة المنقوطة `;` في نهاية التعبيرات مهما كانت القيمة. لذلك فالفاصلة المنقوطة هنا لا تخص Function Expression نفسه ولكنها فقط تنهي التعبير.
````

## Callback functions

دعنا نرى مثال على تمرير الدالة كقيمة.

سنقوم بكتابة الدالة `ask(question, yes, no)` بثلاثة معاملات:

`question`
: نص السؤال

`yes`
: دالة يتم تنفيذها إذا كانت الإجابة "Yes"

`no`
: دالة يتم تنفيذها إذا كانت الإجابة "No"

الدالة ستسأل سؤال `question` وبناءًا على جواب المستخدم ستنفذ `yes()` أو `no()`:

```js run
*!*
function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}
*/!*

function showOk() {
  alert( "You agreed." );
}

function showCancel() {
  alert( "You canceled the execution." );
}

// الاستخدام: الدوال showOk, showCancel يتم تمريرهم كمعاملات للدالة ask
ask("Do you agree?", showOk, showCancel);
```

هذه الدوال مفيدة إلى حد ما. الفرق الأساسي بين `ask` في الواقع والمثال السابق هو أن في الواقع يتم استخدام طرق أكثر تعقيدًا للتعامل مع المستخدم بدلًا من مجرد `confirm`. ربما يتم رسم نافذة سؤال بشكل لطيف ولكن هذه قصة أخرى.

**المعاملات `showOk` و `showCancel` الخاصين ب `ask` يسمون _callback functions_ أو فقط _callbacks_.**

الفكرة هي أننا نقوم بتمرير دالة ونتوقع أن يتم استدعائها لاحقًا إذا لزم الأمر. وفي حالتنا فإن `showOk` تصبح رد على الإجابة "yes" answer و `showCancel` للإجابة "no".

يمكن استخدام Function Expressions لكتابة نفس الدالة بشكل أقصر:

```js run no-beautify
function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}

*!*
ask(
  "Do you agree?",
  function() { alert("You agreed."); },
  function() { alert("You canceled the execution."); }
);
*/!*
```

هنا تم تعريف الدوال داخل استدعاء `ask(...)`. ليس لديهم أسماء ويسمون _anonymous_. وهذه الدوال لا يمكن الوصول إليها خارج `ask` (لأنه لم يتم تخزينهم في متغيرات) ولكن هذا كل ما نحتاجه هنا.

كود مثل هذا يظهر في برامجنا بشكل طبيعي. إنه في روح الجافاسكربت.

```smart header="الدالة هي قيمة تمثل حدث"
القيم العادية مثل الأرقام والنصوص تمثل بيانات.

لكن يمكن اعتبار الدالة أنها تمثل حدث.

يمكننا تمريرها بين المتغيرات وتنفيذها حيثما نشاء.
```

## Function Expression vs Function Declaration

دعنا نوضح الفرق بين Function Declarations و Expressions.

أولا طريقة الكتابة: كيف تفرق بينهم في الكود.

-   _Function Declaration:_ يتم تعريف الدالة كجزء منفصل في سريان البرنامج.

    ```js
    // Function Declaration
    function sum(a, b) {
        return a + b;
    }
    ```

-   _Function Expression:_ يتم إنشاء الدالة داخل تعبير أو جزء آخر. هنا تم إنشاء الدالة في الجزء الأيمن من "assignment expression" `=`:

    ```js
    // Function Expression
    let sum = function (a, b) {
        return a + b;
    };
    ```

الفرق الأكثر أهمية هو متي يقوم JavaScript engine بإنشاء كل منهما.

**يتم إنشاء Function Expression عندما يصل لها التنفيذ.**

عندما يصل التنفيذ إلى الجزء الأيمن من عملية التخصيص `let sum = function…` -- فمن هنا يمكننا استخدام الدالة (assigned, called, etc. ) .

Function Declarations تكون مختلفة.

**يمكن استدعاء Function Declaration قبل تعريفها.**

على سبيل المثال فإن تعريف Function Declaration على المستوى العالمي يجعلها مرئية في كل البرنامج ولا يهم من أين نستخدمها.

وفقًا لخوارزميات داخلية فعندما تقوم الجافاسكربت بالتجهيز لتنفيذ البرنامج فهي تبحث عن Function Declarations العالمية وتقوم بإنشاء هذه الدوال كخطوة في مرحلة التهيئة initialization stage.

وبعد الإنتهاء من إنشاء كل الدوال يبدأ تنفيذ البرنامج ولهذا يمكننا استخدام الدوال.

هذا المثال سيعمل جيدًا:

```js run refresh untrusted
*!*
sayHi("John"); // Hello, John
*/!*

function sayHi(name) {
  alert( `Hello, ${name}` );
}
```

تعريف الدالة `sayHi` يتم عندما تقوم الجافاسكربت بالتجهيز لتنفيذ البرنامج ويكون متاح في أي مكان.

...ولكن لو كانت Function Expression فلن تعمل:

```js run refresh untrusted
*!*
sayHi("John"); // error!
*/!*

let sayHi = function(name) {  // (*) no magic any more
  alert( `Hello, ${name}` );
};
```

يتم إنشاء Function Expressions عندما يصل لها التنفيذ أي في السطر `(*)`. وهذا متأخر دًا.

ميزة أخرى ل Function Declarations هي مجالهم الخاص.

**في strict mode عندما يتم وضع Function Declaration داخل جزء من الكود فتكون متاحة فقط بداخله وغير متاحة خارجه.**

دعنا نفترض أننا نريد عمل الدالة `welcome()` بناءًا على قيمة المتغير `age` التي نحصل عليها وقت التنفيذ. ونخطط لاستخدامها في وقت لاحق.

إذا استخدمنا Function Declaration لن تعمل كما هو متوقع:

```js run
let age = prompt("What is your age?", 18);

// conditionally declare a function
if (age < 18) {

  function welcome() {
    alert("Hello!");
  }

} else {

  function welcome() {
    alert("Greetings!");
  }

}

// ...use it later
*!*
welcome(); // Error: welcome is not defined
*/!*
```

هذا لأن Function Declaration متاحة فقط في code block الذي تم تعريفها بداخله.

مثال آخر:

```js run
let age = 16; // take 16 as an example

if (age < 18) {
*!*
  welcome();               // \   (runs)
*/!*
                           //  |
  function welcome() {     //  |
    alert("Hello!");       //  |  Function Declaration is available
  }                        //  |  everywhere in the block where it's declared
                           //  |
*!*
  welcome();               // /   (runs)
*/!*

} else {

  function welcome() {
    alert("Greetings!");
  }
}

// هنا خارج الأقواس المعقوفة
// لذا لا يمكننا استخدام الدوال المعرفة بداخلها.

*!*
welcome(); // Error: welcome is not defined
*/!*
```

ماذا يمكن أن نفعل لجعل `welcome` متاحة خارج `if`?

الطريقة الصحيحة ستكون استخدام Function Expression ووضع `welcome` داخل متغير خارج `if` يمكن الوصول إليه.

كما فعلنا هنا:

```js run
let age = prompt("What is your age?", 18);

let welcome;

if (age < 18) {

  welcome = function() {
    alert("Hello!");
  };

} else {

  welcome = function() {
    alert("Greetings!");
  };

}

*!*
welcome(); // ok now
*/!*
```

يمكننا تبسيطها باستخدام المعامل الشرطي `?`:

```js run
let age = prompt("What is your age?", 18);

let welcome = (age < 18) ?
  function() { alert("Hello!"); } :
  function() { alert("Greetings!"); };

*!*
welcome(); // ok now
*/!*
```

```smart header="متى نستخدم Function Declaration أو Function Expression?"
عندما نريد عمل دالة فأول ما يجب أن نفكر فيه هو Function Declaration فهو يعطينا حرية أكثر لتنظيم الكود لأن يمكننا استخدام الدالة قبل تعريفها.

وهذا أفضل من ناحية قراءة الكود فمن الأسهل ملاحظة `function f(…) {…}` عن `let f = function(…) {…};`..

...ولكن إذا كان Function Declaration غير مناسب لسبب ما أو نريد تعريف دالة بناءًا على شرط معين كما رأينا سابقًا فعندها يجب استخدام Function Expression.
```

## ملخص

-   الدوال هي قيم يمكن تخزينها ونسخها وتعريفها في أي مكان.
-   إذا تم تعريف الدالة كجزء منفصل في البرنامج فتسمى "Function Declaration".
-   وإذا تم تعريفها كجزء من تعبير معين فتسمى "Function Expression".
-   Function Declarations يتم عملها قبل تنفيذ الكود فتكون متاحة في أي مكان بداخله.
-   Function Expressions يتم إنشاءها عندما يصل التنفيذ إليها.

في معظم الحالات عندما نريد عمل دالة يفضل استخدام Function Declaration لأنه يكون متاح قبل التعريف نفسه. وهذا يعطينا مرونة أكثر في البرنامج.

يجب استخدام Function Expression فقط عندما يكون Function Declaration غير مناسب. ولقد رأينا أمثلة عديدة هنا وسنرى أكثر في المستقبل.
