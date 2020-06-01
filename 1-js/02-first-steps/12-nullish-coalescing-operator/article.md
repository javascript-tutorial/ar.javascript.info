# Nullish Coalescing Operator '??'

[recent browser="new"]

 Nullish Coalescing Operator `??` يقدم طريقة مختصرة لإختيار أول قيمة معرفة من قائمة متغيرات.

نتيجة `a ?? b` تكون:
- `a` إذا لم تكن `null` أو `undefined`,
- `b`, غير ذلك.

لذلك فإن `x = a ?? b` طريقة مختصرة للتالي:

```js
x = (a !== null && a !== undefined) ? a : b;
```

هذا مثال أطول.

<<<<<<< HEAD
لنفترض أن لدينا `firstName`, `lastName` أو `nickName` وجميعهم اختياريين.

لنختار القيمة المعرفة ونعرضها (أو نعرض "Anonymous" إذا لم يحدد أي شئ):
=======
Imagine, we have a user, and there are variables `firstName`, `lastName` or `nickName` for their first name, last name and the nick name. All of them may be undefined, if the user decided not to enter any value.

We'd like to display the user name: one of these three variables, or show "Anonymous" if nothing is set.

Let's use the `??` operator to select the first defined one:
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74

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

<<<<<<< HEAD
هذا مشابه جدًا للمعامل `||`. في الحقيقة يمكننا استبدال `??` ب `||` في المثال السابق وسنحصل على نفس النتيجة.
=======
The OR `||` operator can be used in the same way as `??`. Actually, we can replace `??` with `||` in the code above and get the same result, as it was described in the [previous chapter](info:logical-operators#or-finds-the-first-truthy-value).
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74

الفرق الجوهري بينهما أن:
- `||` يرجع أول قيمة *truthy*.
- `??` يرجع أول قيمة *defined*.

هذا مهم جدًا عندما نريد معاملة `null/undefined` بطريقة مختلفة عن `0`.

<<<<<<< HEAD
مثلًا:
=======
For example, consider this:
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74

```js
height = height ?? 100;
```

<<<<<<< HEAD
هذا يجعل `height` يساوي `100` إذا لم يعرف. ولكن إذا كان `height` يساوي `0` سيبقى كما هو.
=======
This sets `height` to `100` if it's not defined.
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74

لنقارنه مع `||`:

```js run
let height = 0;

alert(height || 100); // 100
alert(height ?? 100); // 0
```

<<<<<<< HEAD
هنا `height || 100` تعامل الصفر مثل `null`, `undefined` أو أي قيمة falsy أخرىوهذا قد لا يكون صحيح أحيانًا.

ولكن `height ?? 100` ترجع `100` إذا كان فقط `height` يساوي تمامًا `null` أو `undefined`.
=======
Here, `height || 100` treats zero height as unset, same as `null`, `undefined` or any other falsy value. So zero becames `100`.

The `height ?? 100` returns `100` only if `height` is exactly `null` or `undefined`. So zero remains "as is".

Which behavior is better depends on a particular use case. When zero height is a valid value, that we shouldn't touch, then `??` is preferrable.
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74

## الأولوية

أولوية المعامل `??` هي قليلة: `7` وتساوي [MDN جدول](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table).

<<<<<<< HEAD
هذا أقل من معظم المعاملات وأكبر بقليل من `=` و `?`.

لذلك إذا أردنا استخدام `??` في تعبيرات معقدة نقوم بإضافة أقواس:
=======
So `??` is evaluated after most other operations, but before `=` and `?`.

If we need to choose a value with `??` in a complex expression, then consider adding parentheses:
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74

```js run
let height = null;
let width = null;

// مهم: استخدم الأقواس
let area = (height ?? 100) * (width ?? 50);

alert(area); // 5000
```

<<<<<<< HEAD
إذا لم نستخدم الأقواس فإن `*` له أولوية أعلى وسينفذ أولًا كأننا كتبنا:

```js
// غير صحيح
let area = height ?? (100 * width) ?? 50;
```

هناك أيضًا قيود لغوية. لأسباب أمنية لا يمكن استخدام `??` مع `&&` أو `||`.
=======
Otherwise, if we omit parentheses, `*` has the higher precedence than `??` and would run first.

That would work be the same as:

```js
// probably not correct
let area = height ?? (100 * width) ?? 50;
```

There's also a related language-level limitation.

**Due to safety reasons, it's forbidden to use `??` together with `&&` and `||` operators.**
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74

هذا سينتج خطأ لغوي:

```js run
let x = 1 && 2 ?? 3; // Syntax error
```

<<<<<<< HEAD
هذا القيد قد لا يبدو منطقيًا ولكن لبعض الأسباب تم إضافته للغة.

استخدم الأقواس لتجنب الخطأ:

```js run
let x = (1 && 2) ?? 3; // تعمل دون مشاكل
=======
The limitation is surely debatable, but it was added to the language specification with the purpose to avoid programming mistakes, as people start to switch to `??` from `||`.

Use explicit parentheses to work around it:

```js run
*!*
let x = (1 && 2) ?? 3; // Works
*/!*

>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74
alert(x); // 2
```

## ملخص

- معامل حذف null `??` يقدم طريقة مختصرة لإختيار أول قيمة معرفة من قائمة قيم.

    يستخدم لوضع قيم افتراضية للمتغيرات:

    ```js
    // اجعل height=100 إذا كان null أو undefined
    height = height ?? 100;
    ```

- المعامل `??` لديه أولوية قليلة جدًا لكن أعلة قليلًا من `?` و `=`.
- يمنع استخدامه مع `||` أو `&&` بدون أقواس.
