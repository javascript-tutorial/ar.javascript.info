# المتغيرات

:معظم الوقت, تطبيق جافا سكريبت يحتاج للعمل مع معلومات. يوجد هنا مثالان
1. متجر علي الانترنت -- المعلومات قد تتضمن السلع التي يتم بيعها و عربة التسوق
2. تطبيق دردشه -- المعلومات قد تتضمن المستخدمين والرسائل والمزيد

المتغيرات تُستخدم لتخزين المعلومات.

## المتغير

[المتغير](https://en.wikipedia.org/wiki/Variable_(computer_science))  "يُسمي مخزن" للبيانات. نحن نستطيع استخدام المتغيرات لتخزين السلع والزائرين والبيانات الاخري

لأنشاء متغير في جافا سكريبت, نستخدم الكلمه 
 `let`

الجمله بالاسفل تُنشئ (بعباره اخري: *تعلن*) متغير يأخذ اسم "message"

```js
let message;
```

الان, نستطيع وضع بعض البيانات في هذا المتغير بأستخدام الرمز 
`=`:

```js
let message;

*!*
<<<<<<< HEAD
message = 'Hello'; // تخزين النص
=======
message = 'Hello'; // store the string 'Hello' in the variable named message
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11
*/!*
```

النص تم حفظه الان في منطقة الذاكره المرتبطه بالمتغير. نستطيع الان الوصول اليه وأستخدامه بأسم المتغير:


```js run
let message;
message = 'Hello!';

*!*
alert(message); // يعرض محتوي المتغير
*/!*
```

ولكي نختصر عدد السطور, نستطيع دمج تعريف المتغير وتخزين القيمه به في سطر واحد:

```js run
let message = 'Hello!'; // تعريف المتغير و تخزين القيمه به

alert(message); // Hello!
```

نستطيع ايضا الاعلان عن اكثر من متغير في سطر واحد:

```js no-beautify
let user = 'John', age = 25, message = 'Hello';
```

قد يبدو اقل في عدد السطور, ولكن لا نوصي بهذه الطريقه. من أجل قراءة أفضل, من فضلك أستخدم سطر واحد لكل متغير.

أستخدام المتغير لكل سطر يكون أطول قليلا, ولكن أسهل للقراءة:

```js
let user = 'John';
let age = 25;
let message = 'Hello';
```

<<<<<<< HEAD
بعض الناس ايضا يُعرفون المتغيرات بهذه الطريقه:
=======
Some people also define multiple variables in this multiline style:

>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11
```js no-beautify
let user = 'John',
  age = 25,
  message = 'Hello';
```

...او حتي يكتب الفاصله في اول السطر

```js no-beautify
let user = 'John'
  , age = 25
  , message = 'Hello';
```

تقنيا, كل هذه الطرق تؤدي لنفس الشئ. لذلك, انها مسألة ذوق وجمال شخصي.

````smart header="`var` بدلا من `let`"
في الاصدارات الاقدم, قد تجد ايضا كلمة اخري: `var` بدلا من `let`:

```js
*!*var*/!* message = 'Hello';
```

<<<<<<< HEAD
الكلمة `var` تكون *غالبا* نفس الكلمه `let`. وهي ايضا تعلن عن متغير, ولكن في مظهر مختلف, طريقة "مدرسه قديمه".

هناك اختلافات دقيقه بين `let` و `var` , ولكن لا تُهمنا بعد. نحن سوف نغطي هذه الاختلافات بتفصيل في الفصل <info:var>.
=======
The `var` keyword is *almost* the same as `let`. It also declares a variable but in a slightly different, "old-school" way.

There are subtle differences between `let` and `var`, but they do not matter to us yet. We'll cover them in detail in the chapter <info:var>.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11
````

## التجانس الحقيقي

<<<<<<< HEAD
نحن نستطيع بسهوله أستيعاب مفهوم المتغير لو تخيلنا انه عباره عن صندوق لتخزين البيانات, ملصوق عليه اسم مخصص له فقط ويحتوي بداخله علي قيمه اهلا بداخله.
=======
We can easily grasp the concept of a "variable" if we imagine it as a "box" for data, with a uniquely-named sticker on it.

For instance, the variable `message` can be imagined as a box labelled `"message"` with the value `"Hello!"` in it:
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

![](variable.svg)

نستطيع أن نضع أي قيمة بداخل الصندوق.

<<<<<<< HEAD
ونستطيع أيضا تغيير قيمته أكثر من مره كما نريد.
=======
We can also change it as many times as we want:

>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11
```js run
let message;

message = 'Hello!';

message = 'World!'; // القيمة أتغيرت

alert(message);
```

عندما تتغير القيمة, البيانات القديمه تُحذف من المتغير:

![](variable-change.svg)

ونستطيع أيضا تعريف متغيرين و ننسخ القيمه من أحداهما ونضعها في الأخر.

```js run
let hello = 'Hello world!';

let message;

*!*
// نسخ القيمة "hello world" من المتغير "hello" الي المتغير "message"
message = hello;
*/!*

// الان المتغييرين يوجد بداخلهم نفس البيانات
alert(hello); // Hello world!
alert(message); // Hello world!
```

````warn header="Declaring twice triggers an error"
A variable should be declared only once.

A repeated declaration of the same variable is an error:

```js run
let message = "This";

// repeated 'let' leads to an error
let message = "That"; // SyntaxError: 'message' has already been declared
```
So, we should declare a variable once and then refer to it without `let`.
````

```smart header="Functional languages"
<<<<<<< HEAD
من المثير للاهتمام ملاحظة وجود [وظيفي](https://en.wikipedia.org/wiki/Functional_programming) لغات برمجه, مثل [Scala](http://www.scala-lang.org/) او [Erlang](http://www.erlang.org/) تمنع تغيير قيم المتغير.
=======
It's interesting to note that there exist so-called [pure functional](https://en.wikipedia.org/wiki/Purely_functional_programming) programming languages, such as [Haskell](https://en.wikipedia.org/wiki/Haskell), that forbid changing variable values.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

في هذه اللغات, القيمه الاولي تُخزن في الصندوق, وتكون للابد. و اذا أردنا تخزين قيمه غيرها, اللغه تُنشئ لنا صندوق جديد (تعريف متغير جديد). ولا نستطيع أعاده استخدام المتغير القديم.

<<<<<<< HEAD
علي الرغم من أنه قد يبدوا غريبا للوهلة الاولي, هذه اللغات قادرة علي التطور الجاد. أكثر من ذلك, هناك مجالات مثل الحسابات المتوازية حيث يمنح هذا القيد فوائد معينة. يُوصي بدراسة مثل هذه اللغة لتوسيع العقل.
=======
Though it may seem a little odd at first sight, these languages are quite capable of serious development. More than that, there are areas like parallel computations where this limitation confers certain benefits.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11
```

## تسمية المتغير [#variable-naming]

هناك طريقتان فقط لتسمية المتغير في جافا سكريبت

1. يجب أن يحتوي الاسم على أحرف أو أرقام أو الرموز `$` و` _` فقط.
2. الحرف الاول من الاسم يجب ألا يكون رقم.

أمثله علي الاسماء الصحيحة :

```js
let userName;
let test123;
```

<<<<<<< HEAD
عندما يحتوي الاسم علي أكثر من كلمة, [camelCase](https://en.wikipedia.org/wiki/CamelCase) تكون الطريقة الشائعه للاستخدام. ويكون كذلك: الكلمات تُرتب واحده تلو الاخري, كل كلمه ما عدا الكلمه الاولي تبدأ بحرف كبير:`myVeryLongName`.
=======
When the name contains multiple words, [camelCase](https://en.wikipedia.org/wiki/CamelCase) is commonly used. That is: words go one after another, with each word except the first starting with a capital letter: `myVeryLongName`.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

ما المثير للأهتمام -- علامة الدولار `'$'` والتسطير `'_'` نستطيع أيضا استخدامهم في الاسماء. أنها رموز عاديه, فقط مثل الحروف,وبدون أي معني أخر.

هذه الاسماء تكون صحيحة الكتابة:

```js run untrusted
let $ = 1; // تعريف متغير يُسمي "$"
let _ = 2; // وتعريف متغير يُسمي "_"

alert($ + _); // 3
```

أمثلة لأسماء المتغير الخاطئة:

```js no-beautify
let 1a; // لا نستطيع نبدأ الاسم برقم

let my-name; // الواصلات '-' غير مسموح بها في التسمية
```

<<<<<<< HEAD
```smart header="الملاحظه المهمه"
المتغيرات التي تُسمي `apple` و `AppLE` يكونوا متغيريين مختلفين تماما
```

````smart header="يُسمح باستخدام الأحرف غير اللاتينية ، ولكن لا يُنصح بها"
من الممكن أستخدام أي لغة, بما في ذلك الحروف السيريلية أو حتى الحروف الهيروغليفية, مثل هذه :
=======
```smart header="Case matters"
Variables named `apple` and `APPLE` are two different variables.
```

````smart header="Non-Latin letters are allowed, but not recommended"
It is possible to use any language, including Cyrillic letters, Chinese logograms and so on, like this:
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

```js
let имя = '...';
let 我 = '...';
```

<<<<<<< HEAD
تقنياً, لا يوجد خطأ هنا, مثل هذه الاسماء مسموح بها, ولكن هناك تقاليد عالميه لأستخدام اللغه الانجليزيه في أسماء المتغيرات. حتي لو كنا نكتب نصاً صغيراً, قد يكون لها حياة طويله في المستقبل. الناس من مختلف البلاد ربما يحتاجوا لقرأءتها لبعض الوقت.

=======
Technically, there is no error here. Such names are allowed, but there is an international convention to use English in variable names. Even if we're writing a small script, it may have a long life ahead. People from other countries may need to read it sometime.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11
````

````warn header="الأسماء المحجوزه"
هناك [قائمة من الكلمات المحجوزه](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Keywords), التي لانستطيع أستخدامها كأسماء متغيرات لأنها تُستخدم بواسطة اللغه نفسها.

علي سبيل المثال: `let`, `class`, `return`, و `function` تكون كلمات محجوزة

الكود بالأسفل يعطي خطأ كتابي:

```js run no-beautify
let let = 5; // لا تستطيع تسمية المتغير  "let", خطأ!
let return = 5; // وأيضا لا تستطيع تسميته "return", خطأ!
```
````

````warn header="تخزين القيم بدون `use strict`"

بشكل طبيعي, نحن نحتاج تعريف المتغير قبل أستخدامه. ولكن في الماضي ، كان من الممكن من الناحية الفنية إنشاء متغير بمجرد تخصيص القيمة بدون استخدام `let`. وهذه الطريقة مازالت تعمل حتي الان أذا لم نكتب `use strict` في الملفات ولكن للحصول علي توافق مع الكتابة القديمة.

```js run no-strict
// note: no "use strict" in this example

num = 5; // المتغير "num" أنشئ ولم يكن موجود

alert(num); // 5
```

هذا تمرين سئ و يسبب خطأ في هذ الوضع:

```js
"use strict";

*!*
num = 5; // خطأ: num غير متعرف
*/!*
```
````

## الثوابت

لتعريف ثابت (غير متغير), نستخدم `const` بدلاً من `let`:

```js
const myBirthday = '18.04.1982';
```

المتغيرات التي تُعرف بأستخدام `const` تُسمي "ثوابت". لا نستطيع أن نغير قيمتها. أذا فعلنا ذلك يحدث خطأ

```js run
const myBirthday = '18.04.1982';

myBirthday = '01.01.2001'; // خطأ, لاتستطيع تغيير قيمة الثابت
```

<<<<<<< HEAD
عندما المبرمج يكون متأكد أن المتغير لن يتغير أبداً, فيجب عليه تعريف المتغير بأستخدام `const` لضمان هذه الحقيقة وإبلاغها بوضوح للجميع.

=======
When a programmer is sure that a variable will never change, they can declare it with `const` to guarantee and communicate that fact to everyone.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

### ثوابت ذات الحروف الكبيره

<<<<<<< HEAD
هناك ممارسة شائعة لاستخدام الثوابت كأسماء مستعارة للقيم التي يصعب تذكرها والمعروفة قبل التنفيذ.
=======
There is a widespread practice to use constants as aliases for difficult-to-remember values that are known before execution.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

تتم تسمية هذه الثوابت باستخدام الأحرف الكبيرة والشرطات السفلية.

علي سبيل المثال, هيا ننشئ ثوابت للألوان في مسميتها "الويب" (السداسي عشري):

```js run
const COLOR_RED = "#F00";
const COLOR_GREEN = "#0F0";
const COLOR_BLUE = "#00F";
const COLOR_ORANGE = "#FF7F00";

// ...عندما نحتاج الي أختيار اللون
let color = COLOR_ORANGE;
alert(color); // #FF7F00
```

الفوائد:

- `COLOR_ORANGE` يكون أسهل بكثير لتزكره عن `"#FF7F00"`.
- سهل أن تؤدي للخطأ `"#FF7F00"` اكثر من  `COLOR_ORANGE`.
- عند قرأءة الكود, `COLOR_ORANGE` يكون له أكثر معني من `#FF7F00`.

متي يجب أن نستخدم الحروف الكبيره في تسمية الثوابت ومتي نستخدم الحروف العاديه؟ هيا بنا نوضح ذلك.

<<<<<<< HEAD
الثابت يعني أن قيمة المتغير لن تتغير أبداً. ولكن هناك ثوابت معرفة قبل التنفيذ (مثل الرقم السداسي العشري للون الاحمر) وهناك ثوابت *محسوبة* في حالة التشغيل, أثناء التنفيذ, ولكن لا تتغير قيمتها الاولية.

علي سبيل المثال:
=======
Being a "constant" just means that a variable's value never changes. But some constants are known before execution (like a hexadecimal value for red) and some constants are *calculated* in run-time, during the execution, but do not change after their initial assignment.

For instance:

>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11
```js
const pageLoadTime = /* الوقت اللازم لتحضير صفحة الويب */;
```

<<<<<<< HEAD
قيمة `pageLoadTime` غير معرفه في بداية تحضير الصفحة, لذلك من الطبيعي تسميتها. ولكنها مازالت ثابت لانها لم تتغير بعد التعريف.

بمعنى آخر ، تُستخدم الثوابت التي تحمل أسماء كبيرة فقط كأسماء مستعارة لقيم "الثابت الترميز".
=======
The value of `pageLoadTime` is not known before the page load, so it's named normally. But it's still a constant because it doesn't change after the assignment.

In other words, capital-named constants are only used as aliases for "hard-coded" values.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

## تسمية الاشياء بشكل صحيح

الحديث حول المتغيرات, هناك شئ أخر مهم للغاية.

يجب أن يكون لاسم متغير معنى واضح وواضح يصف البيانات التي يخزنها.

<<<<<<< HEAD
تسمية المتغيرات تكون واحدة من أهم وأعقد المهارات في البرمجه. يمكن أن تكشف لمحة سريعة عن الأسماء المتغيرة الرمز الذي كتبه مبتدئ مقابل مطور متمرس.

خلال مشروع حقيقي, يتم قضاء معظم الوقت في تعديل وتوسيع قاعدة التعليمات البرمجية الحالية بدلاً من كتابة شيء منفصل تمامًا عن نقطة الصفر. عندما نعود إلى بعض التعليمات البرمجية بعد القيام بشيء آخر لفترة من الوقت ، يكون من الأسهل بكثير العثور على المعلومات المصنفة جيدًا. أو بمعنى آخر ، عندما يكون للمتغيرات أسماء جيدة.
=======
Variable naming is one of the most important and complex skills in programming. A glance at variable names can reveal which code was written by a beginner versus an experienced developer.

In a real project, most of the time is spent modifying and extending an existing code base rather than writing something completely separate from scratch. When we return to some code after doing something else for a while, it's much easier to find information that is well-labelled. Or, in other words, when the variables have good names.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

من فضلك خذ وقتك في اختيار اسم  صحيح للمتغير قبل تعريفه. القيام بذلك سوف يسدد لك بسخاء

بعض القواعد الجيدة لأتباعها وهي :

<<<<<<< HEAD
- أستخدم أسماء متعارف الانسان عليها مثل `userName` او `shoppingCart`.
- الابتعاد عن الاختصارات أو الأسماء القصيرة مثل `a`, `b`, `c`, ألا اذا كنت تعلم ماذا تفعل.
- اجعل الأسماء وصفية وموجزة إلى أقصى حد. أمثلة لأسماء سيئة  `data` و `value`. الاسماء هذه لا تعبر عن شئ. من المقبول استخدامها فقط إذا كان سياق الكود يجعل من الواضح بشكل استثنائي البيانات أو القيمة التي يشير إليها المتغير.
- وافق على الشروط داخل فريقك وفي ذهنك. إذا كان زائر الموقع يسمى "مستخدم" ، فيجب علينا تسمية المتغيرات ذات الصلة `currentUser` او `newUser` بدلا من `currentVisitor` او `newManInTown`
=======
- Use human-readable names like `userName` or `shoppingCart`.
- Stay away from abbreviations or short names like `a`, `b`, and `c`, unless you know what you're doing.
- Make names maximally descriptive and concise. Examples of bad names are `data` and `value`. Such names say nothing. It's only okay to use them if the context of the code makes it exceptionally obvious which data or value the variable is referencing.
- Agree on terms within your team and in your mind. If a site visitor is called a "user" then we should name related variables `currentUser` or `newUser` instead of `currentVisitor` or `newManInTown`.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

تبدو بسيطة؟ في الواقع ، ولكن إنشاء أسماء متغيرة وصفية وموجزة ليس كذلك. أذهب خلفها.

```smart header="أعادة أستخدام او أنشاء"
وأخر ملاحظه. هناك بعض المبرمجين الكسولين الذين يتجهوا الي اعادة استخام المتغيرات الموجوده بدلا من تعريف متغيرات جديده

ونتيجة لذلك ، فإن متغيراتها تشبه الصناديق التي يرمي فيها الناس أشياء مختلفة دون تغيير ملصقاتهم. ماذا يوجد داخل الصندوق الآن؟ من تعرف؟ نحن بحاجة إلى الاقتراب والتحقق.

مثل هؤلاء المبرمجين يوفرون القليل على الإعلان عن المتغير ولكنهم يفقدون عشرة أضعاف أكثر عند اختبار الكود.

المتغير الإضافي جيد ، وليس شرًا.

تعمل متصفحات ومتصفحات جافا سكريبت الحديثة على تحسين الشفرة بشكل جيد بما فيه الكفاية ، لذلك لن تخلق مشاكل في الأداء. يمكن أن يساعد استخدام متغيرات مختلفة لقيم مختلفة المحرك في تحسين التعليمات البرمجية الخاصة بك.
```

## الملخص

نحن نستطيع تعريف المتغيرات لتخزين البيانات بأستخدام الكلمات `var`, `let`, او `const`

- `let` -- كتابة حديثة للأعلان عن متغير
- `var` -- طريقة قديمه للأعلان عن متغير. فطبيعياً نحن لا نستخدمها كثيراً, وبكن تم الشرح بوضوح `let` في الفصل <info:var>, فقط في الحالة التي تحتاجها.
- `const` -- يكون مثل `let`, ولكن قيمة المتغير لا نستطيع تغييرها.

يجب علينا تسمية المتغيرات بطريقة تسمح لنا التعرف علي ما بداخلها بسهولة.
