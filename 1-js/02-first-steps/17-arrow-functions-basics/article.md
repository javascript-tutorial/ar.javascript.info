# أساسيات Arrow functions

هناك طريقة أبسط لتعريف الدالة وغالبًا تكون أفضل من Function Expressions.

تسمى "arrow functions" لأنها تشبه السهم:

```js
let func = (arg1, arg2, ...argN) => expression;
```

...هذا ينشئ دالة `func` تأخذ قيم `arg1..argN` وتنفذ `expression` الطرف الأيمن باستخدامهم وترجع النتيجة.

بصيغة أخرى فهي إختصار ل:

```js
let func = function (arg1, arg2, ...argN) {
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

كما ترى فإن `(a, b) => a + b` تعني أن الدالة تستقبل قيمتين `a` و `b`. وتنفذ التعبير `a + b` وترجع نتيجته.

-   إذا كان لديك معامل واحد فقط فيمكن حذف الأقواس الدائرية من حوله لجعل التعبير أقصر.

    مثل:

    ```js run
    *!*
    let double = n => n * 2;
    // تمامًا مثل: let double = function(n) { return n * 2 }
    */!*

    alert( double(3) ); // 6
    ```

-   إذا لم يوجد معاملات يتم ترك الأقواس فارغة (ولكن يجب كتابتها):

    ```js run
    let sayHi = () => alert("Hello!");

    sayHi();
    ```

يمكن استخدام Arrow functions بنفس طريقة Function Expressions.

على سبيل المثال إذا أردنا إنشاء دالة بطريقة ديناميكية:

```js run
let age = prompt("What is your age?", 18);

let welcome = age < 18 ? () => alert("Hello") : () => alert("Greetings!");

welcome();
```

ربما تكون Arrow functions غير معروفة وذات بنية غريبة لا يمكن التعرف عليها في البداية ولكن مع كثرة الاستخدام ستعتاد عينك عليها.

هي مناسبة جدًا للأحداث التي تتطلب سطر واحد ولكننا كسالى لنكتب كلمات كثيرة.

## Multiline arrow functions

المثال بالأعلى يأخذ القيم على يسار `=>` وينفذ التعبير على اليمين باستخدامهم.

أحيانًا نريد شئ أكثر تعقيدًا كتنفيذ عدة أوامر. عندها يمكن وصعهم داخل أقواس معقوفة ولكن يجب استخدام `return` الطبيعية معهم.

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

لدراستها بعمق سنحتاج معرفة بأشياء أكثر في الجافاسكربت لذلك سنرجع إليها مرة أخرى في فصل <info:arrow-functions>.

للآن يمكننا استخدامها لأحداث السطر الواحد و callbacks.
```

## ملخص

Arrow functions تأتي بصيغتين:

1. بدون أقواس معقوفة: `(...args) => expression` -- تقوم الدالة بتنفيذ التعبير الموجود بالجزء الأيمن وترجع نتيحته.
2. مع أقواس معقوفة: `(...args) => { body }` -- تسمح لنا بتنفيذ أكثر من أمر ولكن يجب وضع `return` لكي نرجع قيمة ما.
