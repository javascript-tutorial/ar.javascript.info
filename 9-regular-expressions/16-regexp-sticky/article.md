
# علم ثابت "y" ، البحث في الموضع

تسمح العلامة `pattern: y` بالبحث في الموضع المحدد في السلسلة المصدر.

لفهم حالة استخدام علامة "pattern: y" ، ومعرفة مدى روعتها ، دعنا نستكشف حالة استخدام عملية.

إحدى المهام الشائعة لـ regexps هي "التحليل المعجمي": نحصل على نص ، على سبيل المثال في لغة البرمجة ، وتحليلها للعناصر الهيكلية.

على سبيل المثال ، يحتوي HTML على علامات وسمات ، وشفرة JavaScript لها وظائف ، ومتغيرات ، وما إلى ذلك.

تعد كتابة المحللات المعجمية مجالًا خاصًا ، مع أدواته وخوارزمياته الخاصة ، لذلك لا نتعمق في ذلك ، ولكن هناك مهمة مشتركة: قراءة شيء ما في الموضع المحدد.

على سبيل المثال لدينا سلسلة التعليمات البرمجية `subject: let varName =" value "` ، ونحتاج إلى قراءة اسم المتغير منه ، الذي يبدأ في الموضع `4`.

سنبحث عن اسم متغير باستخدام نمط regexp `: \ w +`. في الواقع ، تحتاج أسماء متغيرات جافا سكريبت إلى regexp أكثر تعقيدًا قليلاً لمطابقة دقيقة ، ولكن هنا لا يهم.

استدعاء `str.match (/ \ w + /)` سيجد الكلمة الأولى فقط في السطر. أو جميع الكلمات التي تحمل علامة `pattern: g`. ولكننا نحتاج إلى كلمة واحدة فقط في الموضع `4`.

للبحث من الموضع المحدد ، يمكننا استخدام الطريقة `regexp.exec (str)`.

إذا كان "regexp" لا يحتوي على علامات `pattern: g` أو` pattern: y` ، فإن هذه الطريقة تبحث عن المطابقة الأولى في السلسلة `str` ، تمامًا مثل` str.match (regexp) `. لا تثير اهتمامنا مثل هذه الحالة البسيطة التي لا توجد أعلام فيها.

إذا كان هناك علامة `pattern: g` ، فسيتم البحث في السلسلة` str` ، بدءًا من الموضع المخزن في خاصية `regexp.lastIndex`. وإذا وجد تطابقًا ، فعيّن "regexp.lastIndex" إلى الفهرس بعد المباراة مباشرة.

عند إنشاء regexp ، يكون "lastIndex" هو "0".

لذلك ، المكالمات المتتالية لعودة `regexp.exec (str)` تتطابق واحدة تلو الأخرى.

مثال (بعلامة `pattern: g`):

```js run
let str = 'let varName';

let regexp = /\w+/g;
alert(regexp.lastIndex); // 0 (initially lastIndex=0)

let word1 = regexp.exec(str);
alert(word1[0]); // let (1st word)
alert(regexp.lastIndex); // 3 (position after the match)

let word2 = regexp.exec(str);
alert(word2[0]); // varName (2nd word)
alert(regexp.lastIndex); // 11 (position after the match)

let word3 = regexp.exec(str);
alert(word3); // null (no more matches)
alert(regexp.lastIndex); // 0 (resets at search end)
```

يتم إرجاع كل مباراة كمصفوفة بمجموعات وخصائص إضافية.

يمكننا الحصول على جميع المباريات في الحلقة:

```js run
let str = 'let varName';
let regexp = /\w+/g;

let result;

while (result = regexp.exec(str)) {
  alert( `Found ${result[0]} at position ${result.index}` );
  // Found let at position 0, then
  // Found varName at position 4
}
```

يعد استخدام `regexp.exec` بديلاً للطريقة` str.matchAll`.

على عكس الطرق الأخرى ، يمكننا تعيين "lastIndex" الخاص بنا لبدء البحث من الموضع المحدد.

على سبيل المثال ، دعنا نجد كلمة ، بدءًا من الموضع `4`:

```js run
let str = 'let varName = "value"';

let regexp = /\w+/g; // without flag "g", property lastIndex is ignored

*!*
regexp.lastIndex = 4;
*/!*

let word = regexp.exec(str);
alert(word); // varName
```

أجرينا بحثًا عن `النمط: \ w +` ، بدءًا من الموضع `regexp.lastIndex = 4`.

يرجى ملاحظة: يبدأ البحث في الموضع `lastIndex` ثم يذهب إلى أبعد من ذلك. إذا لم يكن هناك كلمة في الموضع `lastIndex` ، لكنها موجودة في مكان ما بعدها ، فسيتم العثور عليها:

```js run
let str = 'let varName = "value"';

let regexp = /\w+/g;

*!*
regexp.lastIndex = 3;
*/!*

let word = regexp.exec(str);
alert(word[0]); // varName
alert(word.index); // 4
```

...So ، مع وضع علامة `pattern: g` خاصية` lastIndex` تحدد موضع البداية للبحث.

** وضع علامة على "النمط: y" يجعل "regexp.exec" ينظر بالضبط إلى الموضع "lastIndex" ، ليس قبله وليس بعده. **

هذا هو نفس البحث مع العلم `pattern: y`:

```js run
let str = 'let varName = "value"';

let regexp = /\w+/y;

regexp.lastIndex = 3;
alert( regexp.exec(str) ); // null (there's a space at position 3, not a word)

regexp.lastIndex = 4;
alert( regexp.exec(str) ); // varName (word at position 4)
```

كما نرى ، لا يتطابق regexp `pattern: / \ w + / y` في الموضع` 3` (على عكس العلم `pattern: g`) ، ولكنه يتطابق في الموضع` 4`.

تخيل ، لدينا نص طويل ، ولا يوجد تطابق على الإطلاق. ثم البحث باستخدام العلامة `نقش: g` سيستمر حتى نهاية النص ، وسيستغرق هذا وقتًا أكثر بكثير من البحث باستخدام العلم` نقش: ص`.

في مثل هذه المهام مثل التحليل المعجمي ، عادة ما تكون هناك العديد من عمليات البحث في موضع محدد. إن استخدام العلم `pattern: y` هو مفتاح الأداء الجيد.
