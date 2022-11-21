# أساسيات Arrow functions

هناك طريقة أبسط لتعريف الدالة وغالبًا تكون أفضل من Function Expressions.

تسمى "arrow functions" لأنها تشبه السهم:

```js
let func = (arg1, arg2, ..., argN) => expression;
```

<<<<<<< HEAD
...هذا ينشئ دالة `func` تأخذ قيم `arg1..argN` وتنفذ `expression` الطرف الأيمن باستخدامهم وترجع النتيجة.
=======
This creates a function `func` that accepts arguments `arg1..argN`, then evaluates the `expression` on the right side with their use and returns its result.
>>>>>>> 746ad803c878e33182e7fab1578c0d15b9b75ca0

بصيغة أخرى فهي إختصار ل:

```js
let func = function(arg1, arg2, ..., argN) {
  return expression;
};
```

لنرى أمثلة:

```js run
let sum = (a, b) => a + b;

/* هذه arrow function إختصار ل:

let sum = function(a, b) {
  return a + b;
};
*/

alert(sum(1, 2)); // 3
```

<<<<<<< HEAD
كما ترى فإن `(a, b) => a + b` تعني أن الدالة تستقبل قيمتين `a` و `b`. وتنفذ التعبير `a + b` وترجع نتيجته.
=======
As you can see, `(a, b) => a + b` means a function that accepts two arguments named `a` and `b`. Upon the execution, it evaluates the expression `a + b` and returns the result.
>>>>>>> 746ad803c878e33182e7fab1578c0d15b9b75ca0

-   إذا كان لديك معامل واحد فقط فيمكن حذف الأقواس الدائرية من حوله لجعل التعبير أقصر.

    مثل:

    ```js run
    *!*
    let double = n => n * 2;
    // تمامًا مثل: let double = function(n) { return n * 2 }
    */!*

    alert( double(3) ); // 6
    ```

<<<<<<< HEAD
-   إذا لم يوجد معاملات يتم ترك الأقواس فارغة (ولكن يجب كتابتها):
=======
- If there are no arguments, parentheses are empty, but they must be present:
>>>>>>> 746ad803c878e33182e7fab1578c0d15b9b75ca0

    ```js run
    let sayHi = () => alert("Hello!");

    sayHi();
    ```

يمكن استخدام Arrow functions بنفس طريقة Function Expressions.

على سبيل المثال إذا أردنا إنشاء دالة بطريقة ديناميكية:

```js run
let age = prompt("What is your age?", 18);

<<<<<<< HEAD
let welcome = age < 18 ? () => alert("Hello") : () => alert("Greetings!");
=======
let welcome = (age < 18) ?
  () => alert('Hello!') :
  () => alert("Greetings!");
>>>>>>> 746ad803c878e33182e7fab1578c0d15b9b75ca0

welcome();
```

ربما تكون Arrow functions غير معروفة وذات بنية غريبة لا يمكن التعرف عليها في البداية ولكن مع كثرة الاستخدام ستعتاد عينك عليها.

هي مناسبة جدًا للأحداث التي تتطلب سطر واحد ولكننا كسالى لنكتب كلمات كثيرة.

## Multiline arrow functions

<<<<<<< HEAD
المثال بالأعلى يأخذ القيم على يسار `=>` وينفذ التعبير على اليمين باستخدامهم.

أحيانًا نريد شئ أكثر تعقيدًا كتنفيذ عدة أوامر. عندها يمكن وصعهم داخل أقواس معقوفة ولكن يجب استخدام `return` الطبيعية معهم.
=======
The arrow functions that we've seen so far were very simple. They took arguments from the left of `=>`, evaluated and returned the right-side expression with them.

Sometimes we need a more complex function, with multiple expressions and statements. In that case, we can enclose them in curly braces. The major difference is that curly braces require a `return` within them to return a value (just like a regular function does).
>>>>>>> 746ad803c878e33182e7fab1578c0d15b9b75ca0

Like this:

```js run
let sum = (a, b) => {  // the curly brace opens a multiline function
  let result = a + b;
*!*
  return result; // if we use curly braces, then we need an explicit "return"
*/!*
};

alert( sum(1, 2) ); // 3
```

```smart header="الكثير آتٍ"
تعرفنا على arrow functions بإيجاز ولكن هذا ليس كل شئ

Arrow functions لديها العديد من المميزات الشيقة.

لدراستها بعمق سنحتاج معرفة بأشياء أكثر في جافا سكريبت لذلك سنرجع إليها مرة أخرى في فصل <info:arrow-functions>.

للآن يمكننا استخدامها لأحداث السطر الواحد و callbacks.
```

## ملخص

<<<<<<< HEAD
Arrow functions تأتي بصيغتين:

1. بدون أقواس معقوفة: `(...args) => expression` -- تقوم الدالة بتنفيذ التعبير الموجود بالجزء الأيمن وترجع نتيحته.
2. مع أقواس معقوفة: `(...args) => { body }` -- تسمح لنا بتنفيذ أكثر من أمر ولكن يجب وضع `return` لكي نرجع قيمة ما.
=======
Arrow functions are handy for simple actions, especially for one-liners. They come in two flavors:

1. Without curly braces: `(...args) => expression` -- the right side is an expression: the function evaluates it and returns the result. Parentheses can be omitted, if there's only a single argument, e.g. `n => n*2`.
2. With curly braces: `(...args) => { body }` -- brackets allow us to write multiple statements inside the function, but we need an explicit `return` to return something.
>>>>>>> 746ad803c878e33182e7fab1578c0d15b9b75ca0
