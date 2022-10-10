# تحويل الكائنات إلى قيم مفرده

ماذا يحدث فى حالة جمع كائنين `obj1 + obj2`، أو طرحهما `obj1 - obj2` أو طباعتهما باستخدام دالة التنبيه `alert(obj)` ؟

فى هذه الحالة، تتحول الكائنات إلى قيم فردية تلقائيًا، ثم يتم تنفيذ هذه العملية الحسابية.

<<<<<<< HEAD
فى قسم (تحويل الأنواع) رأينا كيف يمكن تحويل النصوص (strings) والأرقام والقيَم المنطقيه (booleans) إلى قيم فردية. ولكننا تركنا مساحة فارغة من أجل الكائنات. والآن بعد أن عرفنا الكثير عن الدوال (methods) والرموز (symbols)، أصبح الآن ممكنًا أن نملأ هذه المساحه.
=======
JavaScript doesn't allow you to customize how operators work on objects. Unlike some other programming languages, such as Ruby or C++, we can't implement a special object method to handle addition (or other operators).

In case of such operations, objects are auto-converted to primitives, and then the operation is carried out over these primitives and results in a primitive value.

That's an important limitation: the result of `obj1 + obj2` (or another math operation) can't be another object!

E.g. we can't make objects representing vectors or matrices (or achievements or whatever), add them and expect a "summed" object as the result. Such architectural feats are automatically "off the board".

So, because we can't technically do much here, there's no maths with objects in real projects. When it happens, with rare exceptions, it's because of a coding mistake.

In this chapter we'll cover how an object converts to primitive and how to customize it.

We have two purposes:

1. It will allow us to understand what's going on in case of coding mistakes, when such an operation happened accidentally.
2. There are exceptions, where such operations are possible and look good. E.g. subtracting or comparing dates (`Date` objects). We'll come across them later.

## Conversion rules
>>>>>>> 18b1314af4e0ead5a2b10bb4bacd24cecbb3f18e

1. كل الكائنات عند تحويلها إلى قيمه منطقيه (boolean) فإن قيمتها تساوى `true`. وبالتالى فإن التحويلات المتاحة هي التحويل إلى نص أو رقم.

<<<<<<< HEAD
2. يحدث التحويل إلى رقم عند طرح كائنين أو استخدام دالة حسابية. على سبيل المثال، الكائنات من نوع `Date` (سيتم شرحها فى قسم التاريخ) يمكن طرحها، ونتيجة طرح `date1 - date2` هي الفرق بين التاريخين.

3. وبالنسبه إلى التحويل إلى نص -- فإنه يحدث عادة عند طباعة الكائن باستخدام دالة التنبيه `alert(obj)` والدوال المشابهة.
=======
1. There's no conversion to boolean. All objects are `true` in a boolean context, as simple as that. There exist only numeric and string conversions.
2. The numeric conversion happens when we subtract objects or apply mathematical functions. For instance, `Date` objects (to be covered in the chapter <info:date>) can be subtracted, and the result of `date1 - date2` is the time difference between two dates.
3. As for the string conversion -- it usually happens when we output an object with `alert(obj)` and in similar contexts.

We can implement string and numeric conversion by ourselves, using special object methods.
>>>>>>> 18b1314af4e0ead5a2b10bb4bacd24cecbb3f18e

Now let's get into technical details, because it's the only way to cover the topic in-depth.

<<<<<<< HEAD
يمكننا التحكم فى التحويل إلى نص أو رقم، باستخدام بعض دوال الكائنات.

هناك ثلاث ملاحظات مختلفه على تحويل الأنواع ويطلق عليها "hints" وتم ذكرها فى [المصدر](https://tc39.github.io/ecma262/#sec-toprimitive):

`"النص"`
=======
## Hints

How does JavaScript decide which conversion to apply?

There are three variants of type conversion, that happen in various situations. They're called "hints", as described in the [specification](https://tc39.github.io/ecma262/#sec-toprimitive):
>>>>>>> 18b1314af4e0ead5a2b10bb4bacd24cecbb3f18e

: يحدث التحويل إلى نص عندما نقوم بعملية معينه على كائن تتوقع نصًا لا كائنًا مثل دالة التنبيه `alert`:

    ```js
    // output
    alert(obj);

    // using object as a property key
    anotherObj[obj] = 123;
    ```

`"الرقم"`

: يحدث التحويل إلى رقم عندما نقوم يعملية حسابيه على سبيل المثال:

    ```js
    // explicit conversion
    let num = Number(obj);

    // maths (except binary plus)
    let n = +obj; // unary plus
    let delta = date1 - date2;

    // less/greater comparison
    let greater = user1 > user2;
    ```

<<<<<<< HEAD
`"التصرف الإفتراضي"`
=======
    Most built-in mathematical functions also include such conversion.

`"default"`
: Occurs in rare cases when the operator is "not sure" what type to expect.
>>>>>>> 18b1314af4e0ead5a2b10bb4bacd24cecbb3f18e

    For instance, binary plus `+` can work both with strings (concatenates them) and numbers (adds them). So if a binary plus gets an object as an argument, it uses the `"default"` hint to convert it.

على سبيل المثال، العلامه `+` يمكن أن تعمل مع النصوص (حيث تقوم بالإضافه) أو الأرقام (حيث تقوم بالجمع)، ولذلك فإنه يمكن التحويل إلى نصوص أو أرقام. ولذلك إذا استقبلت علامة ال `+` كائنا فإنها تستخدم `"التصرف الإفتراضي"`.

وأيضًا فى حالة مقارنة كائن مع نص أو رقم أو رمز باستخدام `==` فإنه ليس واضح لأى نوع يمكن التحويل، ولذلك يتم استخدام `"التصرف الإفتراضي"`.

```js
// binary plus uses the "default" hint
let total = obj1 + obj2;

// obj == number uses the "default" hint
if (user == 1) { ... };
```

<<<<<<< HEAD
المقارنه باستخدام علامات الأكبر من أو الأصغر من مثل `<` `>`، يمكنها التعامل مع الأرقام والنصوص أيضا ولكنها مع ذلك تستخدم التحويل إلى رقم وليس الطريقه الافتراضيه، وهذا لأسباب متأصله historical reasons.

لا نحتاج إلى تذكر كل هذه التفاصيل الغريبه لأن كل الكائنات الموجوده عدا (`Date` والذي سيتم شرحه قريبا) يتم تحويلها باستخدام `"الطريقه الإفتراضيه"` مثل طريقة التحويل إلى رقم.

```smart header="لا يوجد التحويل إلى `\"القيم المنطقيه\"`"
لاحظ أن هناك ثلاث طرق (أو ملاحظات) فقط بكل بساطه.

لا توجد طريقة التحويل إلى "قيمه منطقيه" (لأن كل الكائنات قيمتها `true` عن تحويلها إلى قيمه منطقيه). وإذا تعاملنا مع `"الطريقه الإفتراضيه"` و `"الرقم"` بطريقة مشابهة مثل كل الطرق الموجوده فسيكون هناك طريقتين فقط.

````
=======
In practice though, things are a bit simpler.

All built-in objects except for one case (`Date` object, we'll learn it later) implement `"default"` conversion the same way as `"number"`. And we probably should do the same.

Still, it's important to know about all 3 hints, soon we'll see why.
>>>>>>> 18b1314af4e0ead5a2b10bb4bacd24cecbb3f18e

**عند القيام بالتحويل، تقوم جافا سكريبت باستدعاء ثلاث دوال:**

<<<<<<< HEAD
1. استدعاء `obj[Symbol.toPrimitive](hint)` - وهو رمز موجود بالفعل (built-in)، وهذا فى حالة وجود هذه الدالة.
2. فى حالة عدم وجودها وطانت الطريقه هى التحويل إلى نص
   - استخدام `obj.toString()` و `obj.valueOf()`، أيهم موجود.
3. غير ذلك، إذا كانت الطريقه هي `"الطريقه الإفتراضيه"` أو `"الرقم"`
   - استخدام `obj.valueOf()` و `obj.toString()`، أيهم موجود.
=======
1. Call `obj[Symbol.toPrimitive](hint)` - the method with the symbolic key `Symbol.toPrimitive` (system symbol), if such method exists,
2. Otherwise if hint is `"string"`
    - try calling `obj.toString()` or `obj.valueOf()`, whatever exists.
3. Otherwise if hint is `"number"` or `"default"`
    - try calling `obj.valueOf()` or `obj.toString()`, whatever exists.
>>>>>>> 18b1314af4e0ead5a2b10bb4bacd24cecbb3f18e

## Symbol.toPrimitive

لنبدأ بأول طريقه. يوجد رمز (symbol) موجود بالفعل يسمى `Symbol.toPrimitive` والذي يجب استخدامه لتسمية طريقة التحويل كالآتى:

```js
obj[Symbol.toPrimitive] = function(hint) {
  // here goes the code to convert this object to a primitive
  // it must return a primitive value
  // hint = one of "string", "number", "default"
};
````

<<<<<<< HEAD
على سبيل المثال, يطبق هذه الطريقه الكائن `user`:
=======
If the method `Symbol.toPrimitive` exists, it's used for all hints, and no more methods are needed.

For instance, here `user` object implements it:
>>>>>>> 18b1314af4e0ead5a2b10bb4bacd24cecbb3f18e

```js run
let user = {
  name: 'John',
  money: 1000,

  [Symbol.toPrimitive](hint) {
    alert(`hint: ${hint}`);
    return hint == 'string' ? `{name: "${this.name}"}` : this.money;
  },
};

// conversions demo:
alert(user); // hint: string -> {name: "John"}
alert(+user); // hint: number -> 1000
alert(user + 500); // hint: default -> 1500
```

<<<<<<< HEAD
كما نرى من المثال، فإن الكائن `user` يتحول إلى نص معبر أو إلى كم النقود بناءًا على طريقة التحويل نفسها. فإن الطريقه `user[Symbol.toPrimitive]` تتعامل مع كل طرق التحويل.

## toString/valueOf

الدوال `toString` و `valueOf`موجوده من قديم الأزل. إنهم ليسو رموزًا ولكنهم دوال تستعمل مع النصوص. ويقومون بتوفير طريقة قديمه للقيام بالتحويل.

إذا لم يكن هناك `Symbol.toPrimitive` فإن جافا سكريبت تقوم بالبحث عنهمو استخدامهم بالترتيب الآتى:

- `toString -> valueOf` فى الطريقه النصيه.
- `valueOf -> toString` غير ذلك.
=======
As we can see from the code, `user` becomes a self-descriptive string or a money amount, depending on the conversion. The single method `user[Symbol.toPrimitive]` handles all conversion cases.

## toString/valueOf

If there's no `Symbol.toPrimitive` then JavaScript tries to find methods `toString` and `valueOf`:

- For the `"string"` hint: call `toString` method, and if it doesn't exist or if it returns an object instead of a primitive value, then call `valueOf` (so `toString` has the priority for string conversions).
- For other hints: call `valueOf`, and if it doesn't exist or if it returns an object instead of a primitive value, then call `toString` (so `valueOf` has the priority for maths).

Methods `toString` and `valueOf` come from ancient times. They are not symbols (symbols did not exist that long ago), but rather "regular" string-named methods. They provide an alternative "old-style" way to implement the conversion.
>>>>>>> 18b1314af4e0ead5a2b10bb4bacd24cecbb3f18e

هذه الدوال لابد أن تقوم بإرجاع قيمه فردية. فإذا قامت هاتان الدالتان بإرجاع كائن فسيتم تجاهله.

أى كائن يمتلك افتراضيا الدالتين `toString` و `valueOf`:

- الداله `toString` تقوم بإرجاع النص `"[object Object]"`.
- الداله `valueOf` تقوم بإرجاع الكائن نفسه.

كما فى المثال:

```js run
let user = { name: 'John' };

alert(user); // [object Object]
alert(user.valueOf() === user); // true
```

لذلك إذا حاولنا أن نستخدم الكائن كنص، كما فى حالة استخدام الداله النصيه `alert` سنرى بشكل افتراضي `[object object]`.

<<<<<<< HEAD
الداله `valueOf` تم ذكرها هنا فقط لإكمال المعلومات ولتجنب أى التباس. فكما ترى فإن هذه الداله تقوم بإرجاع الكائن نفسه وبالتالى يتم تجاهله. لا تسأل لماذا فهذا لأسباب متأصله historical reasons. ولذلك يمكننا اعتبار أنها غير موجوده.

هيا نقوم باستخدام هذه الدوال.
=======
The default `valueOf` is mentioned here only for the sake of completeness, to avoid any confusion. As you can see, it returns the object itself, and so is ignored. Don't ask me why, that's for historical reasons. So we can assume it doesn't exist.

Let's implement these methods to customize the conversion.
>>>>>>> 18b1314af4e0ead5a2b10bb4bacd24cecbb3f18e

على سبيل المثال، فإن الكائن `user` هنا يقوم بنفس التصرف أعلاه عند استخدام خليط من `toString` و `valueOf` بدلًا من `Symbol.toPrimitive`:

```js run
let user = {
  name: 'John',
  money: 1000,

  // for hint="string"
  toString() {
    return `{name: "${this.name}"}`;
  },

  // for hint="number" or "default"
  valueOf() {
    return this.money;
  },
};

alert(user); // toString -> {name: "John"}
alert(+user); // valueOf -> 1000
alert(user + 500); // valueOf -> 1500
```

كما نرى هنا فإن التصرف هو نفسه الموجود فى المثال السابق عند استخدام `Symbol.toPrimitive`.

ونحن عالبا مانحتاج إلى طريقه للتعامل مع كل حالات التحويل إلى قيم فرديه (primitive values). ففى هذه الحاله يمكننا استخدام `toString` فقط كالآتى:

```js run
let user = {
  name: 'John',

  toString() {
    return this.name;
  },
};

alert(user); // toString -> John
alert(user + 500); // toString -> John500
```

فى حالة غياب `Symbol.toPrimitive` و `valueOf` فإن `toString` ستقوم بالتعامل مع كل حالات التحويل إلى قيم فرديه.

<<<<<<< HEAD
## أنواع القيم المسترجعه
=======
### A conversion can return any primitive type
>>>>>>> 18b1314af4e0ead5a2b10bb4bacd24cecbb3f18e

هناك شئ مهم يجب أن تعرفه وهو أن كل طرق التحويل إلى قيم مفرده لا يجب بالضروره أن تقوم بإرجاع نفس نوع القيمه المفرده المحوَّله إليه.

<<<<<<< HEAD
فلا يوجد ضمانه إذا كانت `toString` ستقوم بإرجاع نص بالتحديد أو حتى `Symbol.toPrimitive` ستقوم بإرجاع رقم فى طريقة `"الرقم"`.
=======
There is no control whether `toString` returns exactly a string, or whether `Symbol.toPrimitive` method returns a number for the hint `"number"`.
>>>>>>> 18b1314af4e0ead5a2b10bb4bacd24cecbb3f18e

الأمر الوحيد الذى يمكن ضمانه والإلزامى هو أن هذه الدوال يجب أن تقوم بإرجاع يمة مفردة لا كائنًا.

```smart header="ملاحظات متأصله"
لأسباب قديمه historical reasons فإنه فى حالة أن الدوال
`toString` or `valueOf`
قامت بإرجاع كائن، فلا يوجد خطأ يظهر، بل يتم تجاه النتيجه فقط كأن شيئًا لم يكن. وذلك لأنه فى الماضي لم يكن هناك مفهوم جيد للخطأ فى جافا سكريبت.

<<<<<<< HEAD
على النقيض، فإن `Symbol.toPrimitive` *يجب* أن تقوم بإرجاع قيمة مفرده، وإلا سيكون هناك خطأ.
=======
In contrast, `Symbol.toPrimitive` is stricter, it *must* return a primitive, otherwise there will be an error.
>>>>>>> 18b1314af4e0ead5a2b10bb4bacd24cecbb3f18e
```

## التحويلات الإضافيه

كما نعرف بالفعل أن الكثير من العلامات والدوال تقوم بتحويل الأنواع, مثال على ذلك علامة `*` تقوم بتحويل العاملين إلى أرقام.

إذا استخدمنا كائنين كعملين رياضيين فسيكون هناك مرحلتين:

<<<<<<< HEAD
1. تحويل إلى الكائن إلى قيمه مفردة.
2. إذا كانت نتيجة التحويل ليست من النوع الصحيح فسيتم تحويلها.
=======
If we pass an object as an argument, then there are two stages of calculations:
1. The object is converted to a primitive (using the rules described above).
2. If the necessary for further calculations, the resulting primitive is also converted.
>>>>>>> 18b1314af4e0ead5a2b10bb4bacd24cecbb3f18e

على سبيل المثال:

```js run
let obj = {
  // toString handles all conversions in the absence of other methods
  toString() {
    return '2';
  },
};

alert(obj * 2); // 4, object converted to primitive "2", then multiplication made it a number
```

1. عملية الضرب `obj * 2` تقوم أولا بتحويل الكائن إلى قيمة مفرده (والذي هو النص `"2"`).
2. ثم بعد ذلك فإن الجمله `"2" * 2` تتحول إلى `2 * 2` (يتحول النص إلى رقم).

علامة الجمع `+` ستقوم بإضافة النصوص فى نفس هذا الموقف لأنها تعمل مع النصوص:

```js run
let obj = {
  toString() {
    return '2';
  },
};

alert(obj + 2); // 22 ("2" + 2), conversion to primitive returned a string => concatenation
```

## الملخص

التحويل من كائن إلى قيمة مفردة يحدث تلقائيا عن طريق الكثير من الدوال الموجوده بالفعل والعمليات التى تُجرى والتى تعمل فقط على قيم مفردة وليس كائنات.

هناك 3 أنواع من طرق التحويل:

<<<<<<< HEAD
- `"النص"` (ويحدث ذلك عند استخدام دالة التنبيه `alert` والتى تتوقع نصًا).
- `"الرقم"` (فى العمليات الحسابيه).
- `"الطريقة الإفتراضيه"` (فى بعض العمليات).

يوضح المصدر أى عملية تستخدم أى طريقه. وهناك القليل من العمليات التي
"لا تعلم ما نوع العامل الذي ستستقبله"
وتستخدم `"الطريقه الإفتراضيه"`. وعادةً ما يتم استخدام `"الطريقة الإفتراضيه"` مع الكائنات الموجوده بالفعل كما يتم التعامل مع `"الأرقام"`, ولذلك عمليا فإن الطريقتين الأخيرتين يمكن ضمهما معًا.
=======
There are 3 types (hints) of it:
- `"string"` (for `alert` and other operations that need a string)
- `"number"` (for maths)
- `"default"` (few operators, usually objects implement it the same way as `"number"`)

The specification describes explicitly which operator uses which hint.
>>>>>>> 18b1314af4e0ead5a2b10bb4bacd24cecbb3f18e

تتم طريقة التحويل كالآتى:

<<<<<<< HEAD
1. استدعاء الداله `obj[Symbol.toPrimitive](hint)` فى حالة وجودها,
2. غير ذلك إذا كانت الظريقه `"نصًا"`
   - استخدام `obj.toString()` و `obj.valueOf()` فى حالة وجود أي منهم.
3. غير ذلك إذا كانت الطريقة `"رقمًا"` أو `"الطريقة الإفتراضيه"`
   - استخدام `obj.valueOf()` أو `obj.toString()` فى حالة وجود أى منهم.

ويكفى عمليًا استخدام `obj.toString()` لكل التحويلات والتى تقوم بإرجاع قيمة يمكن قرائتها من أجل الطباعة أو البحث عن الأخطاء.
=======
1. Call `obj[Symbol.toPrimitive](hint)` if the method exists,
2. Otherwise if hint is `"string"`
    - try calling `obj.toString()` or `obj.valueOf()`, whatever exists.
3. Otherwise if hint is `"number"` or `"default"`
    - try calling `obj.valueOf()` or `obj.toString()`, whatever exists.

All these methods must return a primitive to work (if defined).

In practice, it's often enough to implement only `obj.toString()` as a "catch-all" method for string conversions that should return a "human-readable" representation of an object, for logging or debugging purposes.
>>>>>>> 18b1314af4e0ead5a2b10bb4bacd24cecbb3f18e
