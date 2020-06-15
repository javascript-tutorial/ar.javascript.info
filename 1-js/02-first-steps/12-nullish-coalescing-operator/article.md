# Nullish Coalescing Operator '??'

[recent browser="new"]

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

```js run
let firstName = null;
let lastName = null;
let nickName = "Supercoder";

// show the first not-null/undefined value
*!*
alert(firstName ?? lastName ?? nickName ?? "Anonymous"); // Supercoder
*/!*
```

## المقارنة مع ||

هذا مشابه جدًا للمعامل `||`. في الحقيقة يمكننا استبدال `??` ب `||` في المثال السابق وسنحصل على نفس النتيجة. كما وصفنا في [الفصل السابق](info:logical-operators#or-finds-the-first-truthy-value).

الفرق الجوهري بينهما أن:

-   `||` يرجع أول قيمة _truthy_.
-   `??` يرجع أول قيمة _defined_.

هذا مهم جدًا عندما نريد معاملة `null/undefined` بطريقة مختلفة عن `0`.

مثلًا:

```js
height = height ?? 100;
```

هذا يجعل `height` يساوي `100` إذا لم يعرف. ولكن إذا كان `height` يساوي `0` سيبقى كما هو.

لنقارنه مع `||`:

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
Here, `height || 100` treats zero height as unset, same as `null`, `undefined` or any other falsy value. So the result is `100`.

The `height ?? 100` returns `100` only if `height` is exactly `null` or `undefined`. So the `alert` shows the height value `0` "as is".

Which behavior is better depends on a particular use case. When zero height is a valid value, then `??` is preferrable.
>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6

## الأولوية

أولوية العامل `??` هي قليلة: `7` وتساوي [MDN جدول](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table).

هذا أقل من معظم المعاملات وأكبر بقليل من `=` و `?`.

لذلك إذا أردنا استخدام `??` في تعبيرات معقدة نقوم بإضافة أقواس:

```js run
let height = null;
let width = null;

// مهم: استخدم الأقواس
let area = (height ?? 100) * (width ?? 50);

alert(area); // 5000
```

من ناحية اخرى، إذا لم نستخدم الأقواس فإن `*` له أولوية أعلى وسينفذ أولًا كأننا كتبنا:

```js
// غير صحيح
let area = height ?? 100 * width ?? 50;
```

هناك أيضًا قيود لغوية.

**لأسباب أمنية، لا يمكن استخدام `??` مع `&&` و `||`.**

هذا سينتج خطأ لغوي:

```js run
let x = 1 && 2 ?? 3; // Syntax error
```

هذا القيد قد لا يبدو منطقيًا ولكن لبعض الأسباب تم إضافته للغة.

استخدم الأقواس لتجنب الخطأ:

```js run
*!*
let x = (1 && 2) ?? 3; // تعمل دون مشاكل
*/!*
alert(x); // 2
```

## ملخص

-   عامل حذف null `??` يقدم طريقة مختصرة لإختيار أول قيمة معرفة من قائمة قيم.

    يستخدم لوضع قيم افتراضية للمتغيرات:

    ```js
    // اجعل height=100 إذا كان null أو undefined
    height = height ?? 100;
    ```

-   العامل `??` لديه أولوية قليلة جدًا لكن أعلة قليلًا من `?` و `=`.
-   يمنع استخدامه مع `||` أو `&&` بدون أقواس.
