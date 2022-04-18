# Lookahead و lookbehind

Sometimes we need to find only those matches for a pattern that are followed or preceded by another pattern.

هناك صيغة خاصة لذلك ، تسمى "lookahead" و "lookbehind" ، يشار إليها معًا باسم "lookaround".

في البداية ، دعنا نجد السعر من السلسلة مثل `الموضوع: 1 ديك رومي يكلف 30 يورو`. أي: رقم متبوعًا بعلامة `subject: €`.

## Lookahead

الصيغة هي: `pattern: X (؟ = Y)` ، وتعني "ابحث عن` pattern: X` ، لكن تطابق فقط إذا تبعها "pattern: Y`". قد يكون هناك أي نمط بدلاً من `pattern:X`و`pattern:Y`.

بالنسبة لرقم صحيح متبوعًا بـ`subject:€`, سيكون regexp
`pattern:\d+(?=€)`:

```js run
let str = '1 turkey costs 30€';

alert(str.match(/\d+(?=€)/)); // 30, the number 1 is ignored, as it's not followed by €
```

يرجى ملاحظة: lookahead هو مجرد اختبار ، ومحتويات "نمط قوسين: (؟ = ...)`غير مدرجة في النتيجة`match:30`.

عندما نبحث عن "pattern: X (؟ = Y)` ، يعثر محرك التعبير العادي على "pattern: X" ثم يتحقق مما إذا كان هناك "pattern: Y" بعده مباشرة. إذا لم يكن الأمر كذلك ، يتم تخطي المطابقة المحتملة ، ويستمر البحث.

من الممكن إجراء اختبارات أكثر تعقيدًا ، على سبيل المثال `النمط: X (؟ = Y) (؟ = Z)` يعني:

1. ابحث عن `النمط: X`.
2. تحقق مما إذا كان "النمط: Y" مباشرةً بعد "النمط: X" (يمكنك التخطي إذا لم يكن كذلك).
3. تحقق مما إذا كان "النمط: Z" هو أيضًا مباشرةً بعد "النمط: X" (يمكنك التخطي إذا لم يكن كذلك).
4. في حالة اجتياز كلا الاختبارين ، فإن "النمط: X" هو تطابق ، وإلا فتابع البحث.

بمعنى آخر ، يعني هذا النمط أننا نبحث عن `pattern: X` متبوعًا بـ` pattern: Y` و `pattern: Z` في نفس الوقت.

هذا ممكن فقط إذا كان النموذجان "pattern: Y" و "pattern: Z" لا يستبعد أحدهما الآخر.

على سبيل المثال ، `pattern: \ d + (؟ = \ s) (؟ =. * 30)` يبحث عن `pattern: \ d +` فقط إذا كان متبوعًا بمسافة ، ويوجد `30` في مكان ما بعده:

For example, `pattern:\d+(?=\s)(?=.*30)` looks for `pattern:\d+` that is followed by a space `pattern:(?=\s)`, and there's `30` somewhere after it `pattern:(?=.*30)`:

```js run
let str = '1 turkey costs 30€';

alert(str.match(/\d+(?=\s)(?=.*30)/)); // 1
```

في سلسلتنا التي تتطابق تمامًا مع الرقم `1`.

## Negative lookahead

لنفترض أننا نريد كمية بدلاً من ذلك ، وليس سعرًا من نفس السلسلة. هذا رقم `نمط: \ d +` ، وليس متبوعًا بـ `الموضوع: €`.

لذلك ، يمكن تطبيق lookahead سلبي.

الصيغة هي: `pattern: X (؟! Y)` ، وتعني "search` pattern: X` ، ولكن فقط إذا لم يتبعها "pattern: Y`".

```js run
let str = '2 turkeys cost 60€';

alert(str.match(/\d+\b(?!€)/g)); // 2 (the price is not matched)
```

## Lookbehind

<<<<<<< HEAD
يسمح Lookahead بإضافة شرط لـ "ما يلي".

Lookbehind مشابه ، لكنه يبدو في الخلف. أي أنه يسمح بمطابقة النمط فقط إذا كان هناك شيء قبله.
=======
```warn header="Lookbehind browser compatibility"
Please Note: Lookbehind is not supported in non-V8 browsers, such as Safari, Internet Explorer.
```

Lookahead allows to add a condition for "what follows".
>>>>>>> 291b5c05b99452cf8a0d32bd32426926dbcc0ce0

الصيغة هي:

- نظرة إيجابية خلف: `pattern: (؟ <= Y) X` ، تطابق` pattern: X` ، ولكن فقط في حالة وجود "pattern: Y` قبلها.
- مظهر سلبي خلف: `pattern: (؟ <! Y) X` ، يطابق` pattern: X` ، ولكن فقط في حالة عدم وجود `pattern: Y` قبله.

على سبيل المثال ، دعنا نغير السعر إلى الدولار الأمريكي. عادةً ما تكون علامة الدولار قبل الرقم ، لذلك للبحث عن `$ 30` ، سنستخدم` `النمط: (؟ <= \ $) \ d +`- مبلغ يسبقه`الموضوع: $`:

```js run
let str = '1 turkey costs $30';

// the dollar sign is escaped \$
alert(str.match(/(?<=\$)\d+/)); // 30 (skipped the sole number)
```

وإذا احتجنا إلى الكمية - رقمًا ، لا يسبقه "الموضوع: $` ، فيمكننا استخدام النمط السلبي خلف ": (؟ <! \ $) \ d +`:

```js run
let str = '2 turkeys cost $60';

alert(str.match(/(?<!\$)\b\d+/g)); // 2 (the price is not matched)
```

## التقاط المجموعات

بشكل عام ، لا تصبح المحتويات الموجودة داخل الأقواس حول جزء من النتيجة.

على سبيل المثال في النموذج `pattern: \ d + (؟ = €)` ، لا يتم التقاط علامة `pattern: €` كجزء من المباراة. هذا طبيعي: نحن نبحث عن رقم `نقش: \ d +` ، بينما `نقش: (؟ = €)` هو مجرد اختبار يجب أن يتبعه `الموضوع: €`.

ولكن في بعض المواقف ، قد نرغب في التقاط تعبير lookaround أيضًا ، أو جزء منه. أن من الممكن. ما عليك سوى لف هذا الجزء بأقواس إضافية.

في المثال أدناه ، تم تسجيل "نمط علامة العملة: (€ | kr)" ، بالإضافة إلى المبلغ:

```js run
let str = '1 turkey costs 30€';
let regexp = /\d+(?=(€|kr))/; // extra parentheses around €|kr

alert(str.match(regexp)); // 30, €
```

وإليك نفس الشيء بالنسبة إلى: lookbehind:

```js run
let str = '1 turkey costs $30';
let regexp = /(?<=(\$|£))\d+/;

alert(str.match(regexp)); // 30, $
```

## ملخص

Lookahead و lookbehind (يشار إليهما عادةً باسم "lookaround") مفيدان عندما نرغب في مطابقة شيء ما اعتمادًا على السياق قبله / بعده.

بالنسبة إلى regexps البسيطة ، يمكننا القيام بنفس الشيء يدويًا. هذا هو: مطابقة كل شيء ، في أي سياق ، ثم التصفية حسب السياق في الحلقة.

تذكر أن `str.match` (بدون العلامة` pattern: g`) و `str.matchAll` (دائمًا) ترجع التطابقات كمصفوفات مع خاصية` index` ، حتى نعرف مكانها بالضبط في النص ، ويمكننا التحقق من سياق الكلام.

لكن بشكل عام يكون البحث أكثر ملاءمة.

أنواع Lookaround:

| النمط     | النوع               | التطابق                                 |
| --------- | ------------------- | --------------------------------------- |
| `X(?=Y)`  | Positive lookahead  | `pattern: X` إذا تبعه` pattern: Y`      |
| `X(?!Y)`  | Negative lookahead  | ``pattern: X` إذا لم يتبعه` pattern: Y` |
| `(?<=Y)X` | Positive lookbehind | `pattern: X` إذا بعده` pattern: Y`      |
| `(?<!Y)X` | Negative lookbehind | `pattern:X` إذا لم يكن بعده `pattern:Y` |
