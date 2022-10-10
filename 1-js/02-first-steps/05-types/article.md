# أنماط البيانات

القيمة في جافا سكربت دائما تكون من نوع معين . على سبيل المثال نص أو رقم.

توجد 8 أنواع بيانات أساسية في جافا سكريبت . هنا سوف نغطيهم بشكل عام وفي الفصول القادمة سنتكلم عن كل نوع بالتفصيل.

نستطيع أن نضع أي نوع في متغير . على سبيل المثال  المتغير قد يكون في لحظة ما نص ثم يتم تخزين رقم فيه: 

```js
// لا يوجد خطأ
let message = "hello";
message = 123456;
```

لغات البرمجة التي تسمح بذلك مثل جافا سكريبت يطلق عليها 
"dynamically typed" يعني أنه يوجد أنواع بيانات محددة لكن المتغيرات غير مقيدة بهم .

## الرقم

```js
let n = 123;
n = 12.345;
```

النوع *رقم* يمثل الأرقام الصحيحة والعشرية.

توجد عمليات كثيرة تتم على الأرقام مثل الضرب `*`والقسمة `/` والإضافة `+` و الطرح `-`وهكذا.

بجانب الأرقام الطبيعية هناك ما يسمى "قيم رقمية خاصة" التي أيضاً تنضم لهذا النوع من البيانات: `Infinity`و `-Infinity` و `NaN`.

- `Infinity` تمثل التعبير الرياضي [مالانهاية](https://en.wikipedia.org/wiki/Infinity) ∞. وهي قيمة خاصة أكبر من أي رقم.

    نستطيع أن نحصل عليها نتيجة القسمة على صفر:

    ```js run
    alert( 1 / 0 ); // مالا نهاية
    ```

    أو يتم الرجوع إليها مباشرة:

    ```js run
    alert( Infinity ); // مالانهاية
    ```
- `NaN` تعبر عن خطأ حسابي. نتيجة عملية حسابية خاطئة أو غير معروفة  على سبيل المثال:

    ```js run
    alert( "not a number" / 2 ); // NaN مثل هذه القسمة خاطئة
    ```

<<<<<<< HEAD
    `NaN` لزجة. أي عملية تتم على  `NaN` ترجع `NaN`:
=======
    `NaN` is sticky. Any further mathematical operation on `NaN` returns `NaN`:
>>>>>>> 18b1314af4e0ead5a2b10bb4bacd24cecbb3f18e

    ```js run
    alert( NaN + 1 ); // NaN
    alert( 3 * NaN ); // NaN
    alert( "not a number" / 2 - 1 ); // NaN
    ```

<<<<<<< HEAD
    لذلك إذا وجدت `NaN` في أي مكان في تعبير حسابي تنتشر في النتيجة بأكملها.
=======
    So, if there's a `NaN` somewhere in a mathematical expression, it propagates to the whole result (there's only one exception to that: `NaN ** 0` is `1`).
>>>>>>> 18b1314af4e0ead5a2b10bb4bacd24cecbb3f18e

```smart header="العمليات الرياضية أمنة"
القيام بالرياضيات "أمن" في جافا سكربت. نستطيع القيام بأي شئ: القسمة على صفر و معاملة النصوص الغير الرقمية على أنها أرقام و إلخ.

الكود لن يتوقف بخطأ قاتل ("موت"). في أسوأ الأحوال  سوف نحصل على `NaN` كنتيجة.
```

القيم العددية الخاصة رسمياً هي تعتبر من النوع "رقم" . بالطبع هم ليس أرقام بالمعنى المنطقي للكلمة.

سنرى المزيد من التعامل مع الأرقام خلال هذا الفصل <info:number>.

## BigInt [#bigint-type]

<<<<<<< HEAD
في جافا سكريبت، النوع "number"  لا يمثل الأعداد الصحيحة أكبر من <code>(2<sup>53</sup>-1)</code> (و هو `9007199254740991`)، أو أقل من <code>-(-2<sup>53</sup>-1)</code> للأرقام السالبة. إنها قيود فنية ناتجة عن تمثيلهم الداخلي.

لمعظم الأغراض هذا يكفي، لكن في بعض الأحيان نحتاج لأرقام كبيرة حقاً ، على سبيل المثال. للتشفير أو الطوابع الزمنية الدقيقة للميكرو ثانية.
=======
In JavaScript, the "number" type cannot safely represent integer values larger than <code>(2<sup>53</sup>-1)</code> (that's `9007199254740991`), or less than <code>-(2<sup>53</sup>-1)</code> for negatives.

To be really precise, the "number" type can store larger integers (up to <code>1.7976931348623157 * 10<sup>308</sup></code>), but outside of the safe integer range <code>±(2<sup>53</sup>-1)</code> there'll be a precision error, because not all digits fit into the fixed 64-bit storage. So an "approximate" value may be stored.

For example, these two numbers (right above the safe range) are the same:

```js
console.log(9007199254740991 + 1); // 9007199254740992
console.log(9007199254740991 + 2); // 9007199254740992
```

So to say, all odd integers greater than <code>(2<sup>53</sup>-1)</code> can't be stored at all in the "number" type.

For most purposes <code>±(2<sup>53</sup>-1)</code> range is quite enough, but sometimes we need the entire range of really big integers, e.g. for cryptography or microsecond-precision timestamps.
>>>>>>> 18b1314af4e0ead5a2b10bb4bacd24cecbb3f18e

`BigInt` تمت إضافة النوع مؤخرًا إلى اللغة لتمثيل الأعداد الصحيحة ذات الطول الكبير.

  قيمة `BigInt` تنشأ بإلحاق حرف `n` إلى نهاية الرقم الصحيح:

```js
//  "n" في النهاية تعني أنه من نوع BigInt
const bigInt = 1234567890123456789012345678901234567890n;
```

بما أن أرقام من نوع `BigInt` نحتاجها نادراً ، لن يتم تغطيتها هنا ، لكن سيفرد لها فصل مخصص  <info:bigint>. اقرأه عندما تحتاج لمثل هذه الأرقام الكبيرة.

```smart header="مشاكل توافقية"
الأن `BigInt` متوافق مع فايرفوكس/كروم/ايدج/سفاري ،لكن ليست متوافقة مع  إنترنت اكسبلورر
```

You can check [*MDN* BigInt compatibility table](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt#Browser_compatibility) to know which versions of a browser are supported.

## النص

النص في جافا سكريبت يتم إحاطته بعلامات تنصيص.

```js
let str = "Hello";
let str2 = 'Single quotes are ok too';
let phrase = `can embed another ${str}`;
```

In JavaScript, there are 3 types of quotes.

1. علامات التنصيص المزدوجة: `"Hello"`.
2. علامات التنصيص المفردة: `'Hello'`.
3. الباك تيك: <code>&#96;Hello&#96;</code>.

علامات التنصيص المزدوجة والمفردة هما علامات تنصيص "بسيطة" . عملياً لا يوجد بينهم فرق في جافا سكريبت.

الباك تيك عبارة عن علامات تنصيص "ممتدة وظيفياً" . تسمح لنا بتضمين متغيرات وتعبيرات داخل النص عن طريق إحاطتهم ب  `${…}`، على سبيل المثال:

```js run
let name = "John";

// تضمين متغير
alert( `Hello, *!*${name}*/!*!` ); // Hello, John!

// تضمين تعبير
alert( `the result is *!*${1 + 2}*/!*` ); // the result is 3
```

التعبير داخل `${…}` يتم تقييمه والنتيجة تصبح جزء من النص. نستطيع أن نضع أي شئ هناك: متغير مثل `name` أو تعبير رياضي مثل `1 + 2` أو شئ أكثر تعقيداً.

من فضلك تذكر الباك تيك وحدها هي من تستطيع فعل ذلك. علامات التنصيص الأخرى لا تحتوي على مثل تلك الوظيفة!
```js run
alert( "the result is ${1 + 2}" ); // the result is ${1 + 2} (علامات التنصيص المزدوجة لا تفعل شئ)
```

سنغطي النصوص بشئ من التفصيل في هذا الفصل <info:string>.

```smart header="لا يوجد نوع *character* ."
في بعض اللغات، يوجد نوع خاص "character" يعبر عن الحرف الواحد. For example,على سبيل المثال، في لغة سي وجافا يدعى "char".

في جافا سكريبت، لا يوجد مثل هذا النوع. يوجد نوع واحد فقط: `string`. النص قد يتكون من صفر حرف (نص فارغ), حرف واحد أو أكثر.
```

## Boolean (logical type)

النوع boolean لديه قيمتين فقط: `صواب` and `خطأ`.

هذا النوع غالباً يستخدم لتخزين قيم نعم/لا : `true` تعني "نعم ، صحيح"، و `false` تعني "لا، خطأ".

على سبيل المثال:

```js
let nameFieldChecked = true; // نعم، حقل الإسم تم التأشير عليه
let ageFieldChecked = false; // لا، حقل العمر لم يتم التأشير عليه
```

القيم المنطقية تأتي أيضاً نتيجة المقارنة:

```js run
let isGreater = 4 > 1;

alert( isGreater ); // نعم (نتيجة المقارنة هي "نعم")
```

سنغطي القيم المنطقية بشكل أعمق في الفصل <info:logical-operators>.

## The "null" value

القيمة الخاصة `null` لا ينتمي إلى أي نوع تم شرحه بالأعلى.

إنه يكون نوع منفصل خاص من نفسه يحتوي على قيمة واحدة هي `null`:

```js
let age = null;
```

في جافا سكريبت ، `null` ليست "مرجع لكائن غير موجود" أو "null pointer" مثل الموجود في لغات أخرى.

إنها مجرد قيمة خاصة تعبر عن "لا شئ" أو "فارغ" أو "قيمة غير معروفة".

الكود أعلاه يوضح أن `age` غير معروفة.

## The "undefined" value

القيمة الخاصة `undefined` أيضاً قيمة محايدة. أنها تصنع نوع من نفسها مثل `null`.

معنى `undefined` أن "القيمة لم يتم تعيينها".

عندما يتم تعريف متغير، لكنه غير معين القيمة، عندها تكون قيمته هي `undefined`:

```js run
let age;

alert(age); // تظهر "undefined"
```

فنياً، يمكن التصريح بتعيين قيمة `undefined` لمتغير:

```js run
let age = 100;

// تغيير القيمة إلى undefined
age = undefined;

alert(age); // "undefined"
```

...لكن لا ننصح بذلك. في الطبيعي، الشخص يستخدم `null` لتعيين قيمة "فارغ" أو "غير معروف" لمتغير، بينما `undefined` محجوزة كقيمة إفتراضية أساسية للأشياء غير المعينة.

## Objects and Symbols

النوع `كائن` هو نوع خاص.

كل الأنواع الأخرى تدعي "بدائية" لأن قيمها تستطيع فقط أن تخزن شئ واحد (قد يكون نص أو رقم أو أي شئ). في المقابل، الكائنات تستخدم لتخزين مجموعة من  للبيانات و كيانات أكثر تعقيداً.

لكونها بهذه الأهمية ، الكائنات تستحق معاملة خاصة. سيتم التعامل معهم لاحقاً في هذا الفصل <info:object>، بعد أن نتعلم أكثر عن الأنواع البدائية.

النوع `symbol` يستخدم لإنشاء معرفات خاصة من الكائنات. يجب أن نذكرهم هنا من أجل الإكتمال،لكن سنؤجل التفاصيل حتى نعرف الكائنات.

## The typeof operator [#type-typeof]

معامل `typeof` يرجع نوع قيمة المدخلات. إنه مفيد عندما نريد معالجة قيم من أنواع مختلفة بإختلاف أو لمجرد إجراد فحص سريع للنوع .

<<<<<<< HEAD
إنه يدعم نوعين من بناء الكود:

1. كمعامل: `typeof x`.
2. كدالة: `typeof(x)`.

بكلمات أخرى ، إنها تعمل بأقواس أو بدون أقواس. النتيجة ستكون واحدة.

إستدعاء `typeof x` يرجع نص بإسم نوع القيمة:
=======
A call to `typeof x` returns a string with the type name:
>>>>>>> 18b1314af4e0ead5a2b10bb4bacd24cecbb3f18e

```js
typeof undefined // "undefined"

typeof 0 // "number"

typeof 10n // "bigint"

typeof true // "boolean"

typeof "foo" // "string"

typeof Symbol("id") // "symbol"

*!*
typeof Math // "object"  (1)
*/!*

*!*
typeof null // "object"  (2)
*/!*

*!*
typeof alert // "function"  (3)
*/!*
```

الثلاث سطور الأخيرة قد تحتاج لتوضيح إضافي:

<<<<<<< HEAD
1. `Math` كائن مدمج داخلياً لتدعيم العمليات الرياضية. سنتعلمه في الفصل <info:number>. هنا، يخدم فقط كمثال للكائن.
2. نتيجة `typeof null` هي `"object"`. هذا رسمياً يعتبر خطأ في سلوك `typeof` ، يأتي من الأيام الأولى لجافا سكربت وتم الحفاظ عليه من أجل التوافقية. قطعاً `null` ليس كائن. إنه قيمة خاصة بنوع منفصل خاص.
3. نتيجة `typeof alert` هي `"function"`، لأن `alert` دالة. سندرس الدوال في الفصول القادمة وهناك سنرى أنه لا توجد نوع خاص  "دالة" في جافا سكربت. الدوال الدوال تنتمي للنوع كائن. لكن `typeof` تعاملهم بشكل مختلف، يرجع `"دالة"`. هذا أيضاً يأتي من الأيام الأولى لجافا سكربت. فنياً، مثل هذا السلوك غير صحيح، لكن قد يكون ملائم في الممارسة.

## خلاصة
=======
1. `Math` is a built-in object that provides mathematical operations. We will learn it in the chapter <info:number>. Here, it serves just as an example of an object.
2. The result of `typeof null` is `"object"`. That's an officially recognized error in `typeof`, coming from very early days of JavaScript and kept for compatibility. Definitely, `null` is not an object. It is a special value with a separate type of its own. The behavior of `typeof` is wrong here.
3. The result of `typeof alert` is `"function"`, because `alert` is a function. We'll study functions in the next chapters where we'll also see that there's no special "function" type in JavaScript. Functions belong to the object type. But `typeof` treats them differently, returning `"function"`. That also comes from the early days of JavaScript. Technically, such behavior isn't correct, but can be convenient in practice.

```smart header="The `typeof(x)` syntax"
You may also come across another syntax: `typeof(x)`. It's the same as `typeof x`.

To put it clear: `typeof` is an operator, not a function. The parentheses here aren't a part of `typeof`. It's the kind of parentheses used for mathematical grouping.

Usually, such parentheses contain a mathematical expression, such as `(2 + 2)`, but here they contain only one argument `(x)`. Syntactically, they allow to avoid a space between the `typeof` operator and its argument, and some people like it.

Some people prefer `typeof(x)`, although the `typeof x` syntax is much more common.
```

## Summary
>>>>>>> 18b1314af4e0ead5a2b10bb4bacd24cecbb3f18e

يوجد 8 أنواع للبيانات في جافا سكربت.

<<<<<<< HEAD
- `number` للأرقام من أي نوع: صحيح أو عشري، الأعداد الصحيحة محدودة ب <code>±(2<sup>53</sup>-1)</code>.
- `bigint` هو عدد صحيح طوله كبير.
- `string` للنصوص. النص قد يحتوي على صفر حرف أو أكثر، لا يوجد نوع منفصل للحرف الواحد.
- `boolean` من أجل `صواب`/`خطأ`.
- `null` للقيم غير المعروفة -- نوع قائم بذاته له قيمة واحدة فقط `null`.
- `undefined` للقيم غير المعينة -- نوع قائم بذاته له قيمة واحدة فقط `undefined`.
- `object` من أجل هياكل بيانات معقدة.
- `symbol` من أجل معرفات فريدة.
=======
- Seven primitive data types:
    - `number` for numbers of any kind: integer or floating-point, integers are limited by <code>±(2<sup>53</sup>-1)</code>.
    - `bigint` for integer numbers of arbitrary length.
    - `string` for strings. A string may have zero or more characters, there's no separate single-character type.
    - `boolean` for `true`/`false`.
    - `null` for unknown values -- a standalone type that has a single value `null`.
    - `undefined` for unassigned values -- a standalone type that has a single value `undefined`.
    - `symbol` for unique identifiers.
- And one non-primitive data type:
    - `object` for more complex data structures.
>>>>>>> 18b1314af4e0ead5a2b10bb4bacd24cecbb3f18e

معامل `typeof` يسمح لنا بمعرفة نوع البيانات الموجودة بداخل المتغيرة.

<<<<<<< HEAD
- له شكلان: `typeof x` أو `typeof(x)`.
- يرجع نص بإسم نوع البيانات، مثل  `"string"`.
- من أجل `null` يرجع `"object"` - هذا خطأ في اللغة، إنه ليس في الحقيقة كائن.
=======
- Usually used as `typeof x`, but `typeof(x)` is also possible.
- Returns a string with the name of the type, like `"string"`.
- For `null` returns `"object"` -- this is an error in the language, it's not actually an object.
>>>>>>> 18b1314af4e0ead5a2b10bb4bacd24cecbb3f18e

في الفصول القادمة سنركز على القيم البدائية وعندما نكون متألفين معاهم، سنتجه للكائنات.
