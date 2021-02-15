# Nullish Coalescing Operator '??'

[recent browser="new"]

<<<<<<< HEAD
Nullish Coalescing Operator `??` يقدم طريقة مختصرة لإختيار أول قيمة معرفة من قائمة متغيرات.

نتيجة `a ?? b` تكون:

-   `a` إذا لم تكن `null` أو `undefined`,
-   `b`, غير ذلك.

لذلك فإن `x = a ?? b` طريقة مختصرة للتالي:

```js
x = a !== null && a !== undefined ? a : b;
```

هذا مثال أطول.


لنفترض أن لدينا مستخدم ولديه المتغيرات `firstName`, `lastName` أو `nickName` وجميعهم اختياريين.

لنختار القيمة المعرفة ونعرضها (أو نعرض "Anonymous" إذا لم يحدد أي شئ):

لنستخدم `??` لتحديد أول عامل محدد
=======
The nullish coalescing operator is written as two question marks `??`.

As it treats `null` and `undefined` similarly, we'll use a special term here, in this article. We'll say that an expression is "defined" when it's neither `null` nor `undefined`.

The result of `a ?? b` is:
- if `a` is defined, then `a`,
- if `a` isn't defined, then `b`.

In other words, `??` returns the first argument if it's not `null/undefined`. Otherwise, the second one.

The nullish coalescing operator isn't anything completely new. It's just a nice syntax to get the first "defined" value of the two.

We can rewrite `result = a ?? b` using the operators that we already know, like this:

```js
result = (a !== null && a !== undefined) ? a : b;
```

Now it should be absolutely clear what `??` does. Let's see where it helps.

The common use case for `??` is to provide a default value for a potentially undefined variable.

For example, here we show `user` if defined, otherwise `Anonymous`:

```js run
let user;

alert(user ?? "Anonymous"); // Anonymous (user not defined)
```

Here's the example with `user` assigned to a name:

```js run
let user = "John";

alert(user ?? "Anonymous"); // John (user defined)
```

We can also use a sequence of `??` to select the first value from a list that isn't `null/undefined`.

Let's say we have a user's data in variables `firstName`, `lastName` or `nickName`. All of them may be not defined, if the user decided not to enter a value.

We'd like to display the user name using one of these variables, or show "Anonymous" if all of them aren't defined.

Let's use the `??` operator for that:
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c

```js run
let firstName = null;
let lastName = null;
let nickName = "Supercoder";

// shows the first defined value:
*!*
alert(firstName ?? lastName ?? nickName ?? "Anonymous"); // Supercoder
*/!*
```

## المقارنة مع ||

هذا مشابه جدًا للمعامل `||`. في الحقيقة يمكننا استبدال `??` ب `||` في المثال السابق وسنحصل على نفس النتيجة. كما وصفنا في [الفصل السابق](info:logical-operators#or-finds-the-first-truthy-value).

<<<<<<< HEAD
الفرق الجوهري بينهما أن:

-   `||` يرجع أول قيمة _truthy_.
-   `??` يرجع أول قيمة _defined_.

هذا مهم جدًا عندما نريد معاملة `null/undefined` بطريقة مختلفة عن `0`.

مثلًا:
=======
The OR `||` operator can be used in the same way as `??`, as it was described in the [previous chapter](info:logical-operators#or-finds-the-first-truthy-value).

For example, in the code above we could replace `??` with `||` and still get the same result:

```js run
let firstName = null;
let lastName = null;
let nickName = "Supercoder";
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c

// shows the first truthy value:
*!*
alert(firstName || lastName || nickName || "Anonymous"); // Supercoder
*/!*
```

<<<<<<< HEAD
هذا يجعل `height` يساوي `100` إذا لم يعرف. ولكن إذا كان `height` يساوي `0` سيبقى كما هو.

لنقارنه مع `||`:
=======
Historically, the OR `||` operator was there first. It exists since the beginning of JavaScript, so developers were using it for such purposes for a long time.

On the other hand, the nullish coalescing operator `??` was added to JavaScript only recently, and the reason for that was that people weren't quite happy with `||`.

The important difference between them is that:
- `||` returns the first *truthy* value.
- `??` returns the first *defined* value.

In other words, `||` doesn't distinguish between `false`, `0`, an empty string `""` and `null/undefined`. They are all the same -- falsy values. If any of these is the first argument of `||`, then we'll get the second argument as the result.

In practice though, we may want to use default value only when the variable is `null/undefined`. That is, when the value is really unknown/not set.

For example, consider this:
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c

```js run
let height = 0;

alert(height || 100); // 100
alert(height ?? 100); // 0
```

<<<<<<< HEAD
هنا `height || 100` تعامل الصفر كـ `null`, `undefined` أو أي قيمة زائفة. اذا الصفر يصبح `100`.

ولكن `height ?? 100` ترجع `100` إذا كان فقط `height` يساوي تمامًا `null` أو `undefined`. اذا الصفر يبقى "كما هو".

يعتمد السلوك الافضل على حالة الاستخدام. تكون `??` الطريقة الافضل عندما يكون صفر height قيمة صالحة.
=======
- The `height || 100` checks `height` for being a falsy value, and it's `0`, falsy indeed.
    - so the result of `||` is the second argument, `100`.
- The `height ?? 100` checks `height` for being `null/undefined`, and it's not,
    - so the result is `height` "as is", that is `0`.

In practice, the zero height is often a valid value, that shouldn't be replaced with the default. So `??` does just the right thing.
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c

## الأولوية

<<<<<<< HEAD
أولوية العامل `??` هي قليلة: `7` وتساوي [MDN جدول](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table).

هذا أقل من معظم المعاملات وأكبر بقليل من `=` و `?`.

لذلك إذا أردنا استخدام `??` في تعبيرات معقدة نقوم بإضافة أقواس:
=======
The precedence of the `??` operator is about the same as `||`, just a bit lower. It equals `5` in the [MDN table](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table), while `||` is `6`.

That means that, just like `||`, the nullish coalescing operator `??` is evaluated before `=` and `?`, but after most other operations, such as `+`, `*`.

So if we'd like to choose a value with `??` in an expression with other operators, consider adding parentheses:
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c

```js run
let height = null;
let width = null;

// مهم: استخدم الأقواس
let area = (height ?? 100) * (width ?? 50);

alert(area); // 5000
```

<<<<<<< HEAD
من ناحية اخرى، إذا لم نستخدم الأقواس فإن `*` له أولوية أعلى وسينفذ أولًا كأننا كتبنا:

```js
// غير صحيح
let area = height ?? 100 * width ?? 50;
```

هناك أيضًا قيود لغوية.

**لأسباب أمنية، لا يمكن استخدام `??` مع `&&` و `||`.**
=======
Otherwise, if we omit parentheses, then as `*` has the higher precedence than `??`, it would execute first, leading to incorrect results.

```js
// without parentheses
let area = height ?? 100 * width ?? 50;

// ...works the same as this (probably not what we want):
let area = height ?? (100 * width) ?? 50;
```

### Using ?? with && or ||

Due to safety reasons, JavaScript forbids using `??` together with `&&` and `||` operators, unless the precedence is explicitly specified with parentheses.
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c

هذا سينتج خطأ لغوي:

```js run
let x = 1 && 2 ?? 3; // Syntax error
```

<<<<<<< HEAD
هذا القيد قد لا يبدو منطقيًا ولكن لبعض الأسباب تم إضافته للغة.
=======
The limitation is surely debatable, it was added to the language specification with the purpose to avoid programming mistakes, when people start to switch from `||` to `??`.
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c

استخدم الأقواس لتجنب الخطأ:

```js run
*!*
let x = (1 && 2) ?? 3; // تعمل دون مشاكل
*/!*
alert(x); // 2
```

## ملخص

<<<<<<< HEAD
-   عامل حذف null `??` يقدم طريقة مختصرة لإختيار أول قيمة معرفة من قائمة قيم.
=======
- The nullish coalescing operator `??` provides a short way to choose the first "defined" value from a list.
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c

    يستخدم لوضع قيم افتراضية للمتغيرات:

    ```js
    // اجعل height=100 إذا كان null أو undefined
    height = height ?? 100;
    ```

<<<<<<< HEAD
-   العامل `??` لديه أولوية قليلة جدًا لكن أعلة قليلًا من `?` و `=`.
-   يمنع استخدامه مع `||` أو `&&` بدون أقواس.
=======
- The operator `??` has a very low precedence, only a bit higher than `?` and `=`, so consider adding parentheses when using it in an expression.
- It's forbidden to use it with `||` or `&&` without explicit parentheses.
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c
