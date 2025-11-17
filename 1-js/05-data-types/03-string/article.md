# السلاسل النصية

تُخَزَّن النصوص في JavaScript كسلاسل نصية أي سلاسل من المحارف (string of charecter). لا يوجد نوع بيانات مستقل للحرف الواحد (char).


الصيغة الداخلية للنصوص هي دائمًا [UTF-16](https://en.wikipedia.org/wiki/UTF-16),ولا تكون مرتبطة بتشفير الصفحة.

## علامات التنصيص ""

لنراجع أنواع علامات التنصيص (الاقتباس).

يمكن تضمين النصوص إما في علامات الاقتباس الأحادية، أو الثنائية أو الفاصلة العليا المائلة:

```js
let single = 'single-quoted';
let double = "double-quoted";

let backticks = `backticks`;
```

علامات التنصيص الفردية والثنائية تكون متماثلة. أما الفاصلة العليا المائلة، فَتُتيح لنا تضمين أي تعبير في السلسلة النصية، عبر تضمينها في `‎${…}‎`:

```js run
function sum(a, b) {
  return a + b;
}

alert(`1 + 2 = ${sum(1, 2)}.`); // 1 + 2 = 3.
```

الميزة الأخرى لاستخدام الفاصلة العلوية المائلة هي إمكانية فصل السلسلة النصية إلى عدة أسطر:

```js run
let guestList = `Guests:
 * John
 * Pete
 * Mary
`;

alert(guestList); // قائمة بالضيوف في أسطر منفصلة
```

يبدو الأمر طبيعيًا أليس كذلك؟ لكن علامات التنصيص الفردية والثنائية لا تعمل بهذه الطريقة. إن حاولنا استخدامها في نص متعدد الأسطر، سنحصل على خطأ:

```js run
let guestList = "Guests: // Error: Unexpected token ILLEGAL
  * John";
```

<<<<<<< HEAD
أتى استخدام علامات الاقتباس الفردية والثنائية في أوقات مبكرة من إنشاء اللغة، عندما لم يُؤخَذ بالحسبان الحاجة إلى نص متعدد الأسطر. ظهرت الفاصلة العلوية المائلة مؤخرًا ولذا فإنها متعددة الاستعمالات.
=======
Single and double quotes come from ancient times of language creation, when the need for multiline strings was not taken into account. Backticks appeared much later and thus are more versatile.
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

Backticks also allow us to specify a "template function" before the first backtick. The syntax is: <code>func&#96;string&#96;</code>. The function `func` is called automatically, receives the string and embedded expressions and can process them. This feature is called "tagged templates", it's rarely seen, but you can read about it in the MDN: [Template literals](mdn:/JavaScript/Reference/Template_literals#Tagged_templates).

## الرموز الخاصة
ما زال بالإمكان كتابة نصوص متعددة الأسطر باستخدام علامات الاقتباس الأحادية والثنائية باستخدام ما يسمى ب "رمز السطر الجديد"، والذي يُكتَب `‎\n`، ويرمز لسطر جديد:


```js run
let guestList = "Guests:\n * John\n * Pete\n * Mary";

<<<<<<< HEAD
alert(guestList);  // قائمة متعددة الأسطر بالضيوف
```

مثلًا، السطرين التاليين متماثلان، لكنهما مكتوبين بطريقة مختلفة:
=======
alert(guestList); // a multiline list of guests, same as above
```

As a simpler example, these two lines are equal, just written differently:
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

```js run
let str1 = "Hello\nWorld"; // سطران باستخدام "رمز السطر الجديد"

// سطران باستخدام سطر جديد عادي والفواصل العليا المائلة 
let str2 = `Hello
World`;

alert(str1 == str2); // true
```

<<<<<<< HEAD
يوجد رموز خاصة أخرى أقل انتشارًا.

هذه القائمة كاملة:

| المحرف           | الوصف                                                        |
| ---------------- | ------------------------------------------------------------ |
| `‎\n`             | محرف السطر الجديد (Line Feed).                               |
| `‎\r`             | محرف العودة إلى بداية السطر (Carriage Return)، ولا يستخدم بمفرده. تستخدم ملفات ويندوز النصية تركيبة من رمزين ‎`\r\n` لتمثيل سطر جديد. |
| ‎`'\` , `"\`      | علامة اقتباس مزدوجة ومفردة.                                  |
| `\\`             | شرطة مائلة خلفية                                             |
| `‎\t`             | مسافة جدولة "Tab"                                            |
| ‎`\b`, `\f`, `\v` | فراغ خلفي (backspace)، محرف الانتقال إلى صفحة جديد (Form Feed)، مسافة جدولة أفقية (Vertical Tab) على التوالي – تُستعمَل للتوافق، ولم تعد مستخدمة. |
| `‎\xXX`           | صيغة رمز يونيكود مع عدد ست عشري مُعطى `XX`، مثال: `'‎ \x7A'` هي نفسها `'z'`. |
| `‎\uXXXX`         | صيغة رمز يونيكود مع عدد ست عشرية `XXXX` في تشفير UTF-16، مثلًا، `‎\u00A9` – هو اليونيكود لرمز حقوق النسخ `©`. يجب أن يكون مكون من 6 خانات ست عشرية. |
| ‎`\u{X…XXXXXX}‎`   | (1 إلى 6 أحرف ست عشرية) رمز يونيكود مع تشفير UTF-32 المعطى. تُشَفَّر بعض الرموز الخاصة برمزي يونيكود، فتأخذ 4 بايت. هكذا يمكننا إدخال شيفرات طويلة. |
=======
There are other, less common special characters:
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

| Character | Description |
|-----------|-------------|
|`\n`|New line|
|`\r`|In Windows text files a combination of two characters `\r\n` represents a new break, while on non-Windows OS it's just `\n`. That's for historical reasons, most Windows software also understands `\n`. |
|`\'`,&nbsp;`\"`,&nbsp;<code>\\`</code>|Quotes|
|`\\`|Backslash|
|`\t`|Tab|
|`\b`, `\f`, `\v`| Backspace, Form Feed, Vertical Tab -- mentioned for completeness, coming from old times, not used nowadays (you can forget them right now). |

As you can see, all special characters start with a backslash character `\`. It is also called an "escape character".

Because it's so special, if we need to show an actual backslash `\` within the string, we need to double it:

```js run
alert( `The backslash: \\` ); // The backslash: \
```

<<<<<<< HEAD
// (رمز نادر من الهيروغليفية الصينية (يونيكود طويل
alert( "\u{20331}" ); // 佫

// (رمز وجه مبتسم (يونيكود طويل آخر
alert( "\u{1F60D}" ); // 😍
=======
So-called "escaped" quotes `\'`, `\"`, <code>\\`</code> are used to insert a quote into the same-quoted string.
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

```

لاحظ بدء جميع الرموز الخاصة بشرطة مائلة خلفية `\`. تدعى أيضا ب "محرف التهريب" (escape character). يمكننا استخدامها أيضًا إن أردنا تضمين علامة اقتباس في النص: مثلًا:

```js run
alert( 'I*!*\'*/!*m the Walrus!' ); // *!*I'm*/!* the Walrus!
```

يجب إلحاق علامة الاقتباس الداخلية بالشرطة المائلة الخلفية `‎\'‎`، وإلا فستُعتَبر نهاية السلسلة النصية. لاحظ أن الشرطة المائلة الخلفية `\` تعمل من أجل تصحيح قراءة السلسلة النصية بواسطة JavaScript. ومن ثم تختفي، لذا فإن النص في الذاكرة لا يحتوي على `\`. يمكننا رؤية ذلك بوضوح باستخدام `alert` على المثال السابق.

Of course, only the quotes that are the same as the enclosing ones need to be escaped. So, as a more elegant solution, we could switch to double quotes or backticks instead:

```js run
alert( "I'm the Walrus!" ); // I'm the Walrus!
```

<<<<<<< HEAD
لكن ماذا إن أردنا عرض شرطة مائلة خلفية ضمن النص؟ يمكن ذلك، لكننا نحتاج إلى تكرارها هكذا `\\`:

```js run
alert( `The backslash: \\` ); // The backslash: \
```
=======
Besides these special characters, there's also a special notation for Unicode codes `\u…`, it's rarely used and is covered in the optional chapter about [Unicode](info:unicode).
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

## طول النص
تحمل الخاصية `length` طول النص:


```js run
alert( `My\n`.length ); // 3
```

لاحظ أن `n\` هو رمز خاص، لذا يكون طول السلسلة الفعلي هو `3`.

<<<<<<< HEAD
```warn header="**`length` هي خاصية**"
يُخطِئ بعض الأشخاص ذوي الخلفيات بلغات برمجية أخرى و يستدعون `str.length()‎ ` بدلًا من استدعاء `str.length` فقط. لذا لا يعمل هذا التابع لعدم وجوده. فلاحظ أن `str.length` هي خاصية عددية، وليس تابعًا ولا حاجة لوضع قوسين بعدها.
=======
```warn header="`length` is a property"
People with a background in some other languages sometimes mistype by calling `str.length()` instead of just `str.length`. That doesn't work.

Please note that `str.length` is a numeric property, not a function. There is no need to add parenthesis after it. Not `.length()`, but `.length`.
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
```

## الوصول إلى محارف سلسلة

<<<<<<< HEAD
للحصول على حرف في مكان معين من السلسلة النصية `pos`، استخدم الأقواس المعقوفة `[pos]` أو استدعِ التابع [str.charAt(pos)](mdn:js/String/charAt). يبدأ أول حرف في الموضع رقم صفر:
=======
To get a character at position `pos`, use square brackets `[pos]` or call the method [str.at(pos)](mdn:js/String/at). The first character starts from the zero position:
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

```js run
let str = `Hello`;

// the first character
alert( str[0] ); // H
alert( str.at(0) ); // H

// the last character
alert( str[str.length - 1] ); // o
alert( str.at(-1) );
```

<<<<<<< HEAD
الأقواس المعقوفة هي طريقة جديدة للحصول على حرف، بينما التابع `charAt` موجود لأسباب تاريخية. الاختلاف الوحيد بينهما هو إن لم تجد الأقواس المربعة `[]` الحرف تُرجِع القيمة `undefined` بينما يُرجِع `charAt` نصًا فارغًا:
=======
As you can see, the `.at(pos)` method has a benefit of allowing negative position. If `pos` is negative, then it's counted from the end of the string.

So `.at(-1)` means the last character, and `.at(-2)` is the one before it, etc.

The square brackets always return `undefined` for negative indexes, for instance:
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

```js run
let str = `Hello`;

<<<<<<< HEAD
alert( str[1000] ); // undefined
alert( str.charAt(1000) ); // '' (سلسلة نصية فارغ)
=======
alert( str[-2] ); // undefined
alert( str.at(-2) ); // l
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
```

يمكننا أيضا التنقل خلال جميع محارف سلسلة باستخدام `for..of`:

```js run
for (let char of "Hello") {
  alert(char); // H,e,l,l,o (char becomes "H", then "e", then "l" etc)
}
```

## النصوص ثابتة

لا يمكن تغيير النصوص في JavaScript، فمن المستحيل تغيير حرف داخل سلسلة نصية فقط. لنجرب الأمر للتأكد من أنه لن يعمل:

```js run

let str = 'Hi';

str[0] = 'h'; // خطأ
alert( str[0] ); // لا تعمل

```

الطريقة المعتادة هي إنشاء نص جديد وإسناده للمتغير `str` بدلًا من النص السابق. مثلًا:

```js run

let str = 'Hi';

str = 'h' + str[1]; // تستبدل كامل السلسلة النصية

alert( str ); // hi

```

سنرى المزيد من الأمثلة عن ذلك في الأجزاء التالية.

## تغيير حالة الأحرف الأجنبية

يقوم التابع  [toLowerCase()](mdn:js/String/toLowerCase) والتابع [toUpperCase()](mdn:js/String/toUpperCase) بِتغيير حالة الأحرف الأجنبية:

```js run
alert( 'Interface'.toUpperCase() ); // INTERFACE
alert( 'Interface'.toLowerCase() ); // interface
```

أو إن أردنا بتغيير حالة حرف واحد فقط:


```js run
alert( 'Interface'[0].toLowerCase() ); // 'i'
```

## البحث عن جزء من النص

يوجد العديد من الطرق للبحث عن جزء من النص ضمن السلسلة النصية.

### str.indexOf

التابع الأول هو  [str.indexOf(substr, pos)](mdn:js/String/indexOf).

يبحث التابع عن `substr` في `str` بدءًا من الموضع المحدد `pos`، ثم يُرجِع الموضع الذي تطابق مع النص أو يُرجِع `‎ -1` إن لم تعثر على تطابق. مثلًا:

```js run
let str = 'Widget with id';

alert( str.indexOf('Widget') ); // 0, because 'Widget' is found at the beginning
alert( str.indexOf('widget') ); // -1, not found, the search is case-sensitive

alert( str.indexOf("id") ); // 1, "id" is found at the position 1 (..idget with id)
```

The optional second parameter allows us to start searching from a given position.

For instance, the first occurrence of `"id"` is at position `1`. To look for the next occurrence, let's start the search from position `2`:

```js run
let str = 'Widget with id';

alert( str.indexOf('id', 2) ) // 12
```

إن كنت مهتمًا بجميع المواضع التي يظهر فيها نص معين، يمكنك استخدام `indexOf` في حلقة. يتم كل استدعاء جديد من الموضِع التالي لِلموضع السابق الذي تطابق مع النص:

```js run
let str = 'As sly as a fox, as strong as an ox';

let target = 'as'; // let's look for it

let pos = 0;
while (true) {
  let foundPos = str.indexOf(target, pos);
  if (foundPos == -1) break;

  alert( `Found at ${foundPos}` );
  pos = foundPos + 1; // continue the search from the next position
}
```

يمكن تقصير الخوارزمية:

```js run
let str = "As sly as a fox, as strong as an ox";
let target = "as";

*!*
let pos = -1;
while ((pos = str.indexOf(target, pos + 1)) != -1) {
  alert( pos );
}
*/!*
```

```smart header="`str.lastIndexOf(substr, position)`"
يوجد أيضًا تابع مشابه  [str.lastIndexOf(substr, position)](mdn:js/String/lastIndexOf) والذي يبدأ البحث من نهاية السلسلة النصية حتى بدايتها. أي أنه يعيد موضع ظهور النص المبحوث عنه انطلاقًا من نهاية السلسلة.
```

يوجد خلل طفيف عند استخدام `indexOf` في `if`. فلا يمكن وضعها بداخل `if` بالطريقة التالية:

```js run
let str = "Widget with id";

if (str.indexOf("Widget")) {
    alert("We found it");  // لا تعمل!
}
```

لا يتحقق الشرط في المثال السابق لأن `str.indexOf("Widget")‎` يُرجِع `0` (ما يعني وجود تطابق في الموضع الأول) رغم عثور التابع على الكلمة، لكن `if` تعد القيمة `0` على أنها `false`. لذا يجب أن نفحص عدم وجود القيمة `-‎ 1` هكذا:

```js run
let str = "Widget with id";

*!*
if (str.indexOf("Widget") != -1) {
*/!*
    alert("We found it"); // works now!
}
```

<<<<<<< HEAD
#### The bitwise NOT trick

One of the old tricks used here is the [bitwise NOT](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_NOT) `~` operator. It converts the number to a 32-bit integer (removes the decimal part if exists) and then reverses all bits in its binary representation.

In practice, that means a simple thing: for 32-bit integers `~n` equals `-(n+1)`.

إحدى الخدع القديمة هي [لعامل الثنائي ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Bitwise_NOT) `~` الذي تعمل على مستوى البِت. فهو يُحَوِّل العدد إلى عدد صحيح بصيغة 32-بِت (يحذف الجزء العشري إن وجد) ثم يُحوِّل جميع  البتات إلى تمثيلها الثنائي. عمليًا، يعني ذلك شيئًا بسيطًا: بالنسبة للأعداد الصحيحة بصيغة 32-بِت `‎~n` تساوي `‎-(n+1)‎`. مثلًا:

```js run
alert( ~2 ); // -3, the same as -(2+1)
alert( ~1 ); // -2, the same as -(1+1)
alert( ~0 ); // -1, the same as -(0+1)
*!*
alert( ~-1 ); // 0, the same as -(-1+1)
*/!*
```

كما نرى، يكون `‎~‎n` صفرًا فقط عندما تكون `n == -1` (وذلك لأي عدد صحيح `n` ذي إشارة). لذا، يكون ناتج الفحص `if ( ~str.indexOf("...") )‎` صحيحًا إذا كانت نتيجة `indexOf` لا تساوي `‎-1`. بمعنى آخر تكون القيمة `true` إذا وُجِد تطابق.

الآن، يمكن استخدام هذه الحيلة لتقصير الفحص باستخدام `indexOf`:


```js run
let str = "Widget";

if (~str.indexOf("Widget")) {
  alert( 'Found it!' ); // works
}
```

لا يكون من المستحسن غالبًا استخدام ميزات اللغة بطريقة غير واضحة، لكن هذه الحيلة تُستخدم بكثرة في الشيفرات القديمة، لذا يجب أن نفهمها.

تذكر أن الشرط `if (~str.indexOf(...))‎` يعمل بالصيغة «إن وُجِد».

To be precise though, as big numbers are truncated to 32 bits by `~` operator, there exist other numbers that give `0`, the smallest is `~4294967295=0`. That makes such check correct only if a string is not that long.

لا نجد هذه الخدعة حاليًا سوى في الشيفرات القديمة، وذلك لأن JavaScript وفرت التابع `‎.includes` (ستجدها في الأسفل).

=======
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
### includes, startsWith, endsWith

يُرجِع التابع الأحدث  [str.includes(substr, pos)](mdn:js/String/includes) القيمة المنطقية `true` أو `false` وفقًا لما إن كانت السلسلة النصية `str` تحتوي على السلسلة النصية الفرعية `substr`. هذه هي الطريقة الصحيحة في حال أردنا التأكد من وجود تطابق جزء من سلسلة ضمن سلسلة أخرى، ولا يهمنا موضعه:

```js run
alert( "Widget with id".includes("Widget") ); // true

alert( "Hello".includes("Bye") ); // false
```

المُعامِل الثاني الاختياري للتابع `str.includes` هو الموضع المراد بدء البحث منه:

```js run
alert( "Widget".includes("id") ); // true
alert( "Widget".includes("id", 3) ); // false, from position 3 there is no "id"
```

يعمل التابعان  [str.startsWith](mdn:js/String/startsWith) و [str.endsWith](mdn:js/String/endsWith) بما هو واضح من مسمياتهما، "سلسلة نصية تبدأ بـ"، و "سلسلة نصية تنتهي بـ" على التوالي:

```js run
alert( "*!*Wid*/!*get".startsWith("Wid") ); // true, "Widget" starts with "Wid"
alert( "Wid*!*get*/!*".endsWith("get") ); // true, "Widget" ends with "get"
```

## جلب جزء من نص

There are 3 methods in JavaScript to get a substring: `substring`, `substr` and `slice`.

### **`str.slice(start [, end])‎`** 
يُرجِع جزءًا من النص بدءًا من الموضع `start` وحتى الموضع `end` (بما لا يتضمن `end`). 

    مثلًا:

    ```js run
    let str = "stringify";
    alert( str.slice(0, 5) ); // 'strin', the substring from 0 to 5 (not including 5)
    alert( str.slice(0, 1) ); // 's', from 0 to 1, but not including 1, so only character at 0
    ```

    إن لم يكن هناك مُعامل ثانٍ، فسيقتطع التابع`slice` الجزء المحدد من الموضع `start` وحتى نهاية النص:

    ```js run
    let str = "st*!*ringify*/!*";
    alert( str.slice(2) ); // 'ringify', from the 2nd position till the end
    ```

    يمكن أيضًا استخدام عدد سالبًا مع `start` أو `end`، وذلك يعني أن الموضع يُحسَب بدءًا من نهاية السلسلة النصية:

    ```js run
    let str = "strin*!*gif*/!*y";

    // start at the 4th position from the right, end at the 1st from the right
    alert( str.slice(-4, -1) ); // 'gif'
    ```

<<<<<<< HEAD
### **`str.substring(start [, end])‎`**
يُرجِع هذا التابع جزءًا من النص الواقع بين الموضع `start` والموضع `end`. 

    `. يشبه هذا التابع تقريبًا التابع `slice`، لكنه يسمح بكون المعامل `start` أكبر من `end`.
=======
`str.substring(start [, end])`
: Returns the part of the string *between* `start` and `end` (not including `end`).

    This is almost the same as `slice`, but it allows `start` to be greater than `end` (in this case it simply swaps `start` and `end` values).
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

    مثلًا:

    ```js run
    
    let str = "stringify";

    // substring الأمرين التاليين متماثلين بالنسبة لـ 
    alert( str.substring(2, 6) ); // "ring"
    alert( str.substring(6, 2) ); // "ring"

    // slice لكن ليس مع
    alert( str.slice(2, 6) ); // "ring" (نفس النتيجة السابقة)
    alert( str.slice(6, 2) ); // "" (نص فارغ)


    ```

    بعكس `slice`، القيم السالبة غير مدعومة ضمن المعاملات، وتقيَّم إلى `0` إن مُرِّرت إليه.

### **`str.substr(start [, length])‎`**
يُرجِع هذا التابع الجزء المطلوب من النص، بدءًا من `start` وبالطول `length` المُعطى

     بعكس التوابع السابقة، يتيح لنا هذا التابع تحديد طول النص المطلوب بدلًا من موضع نهايته:

    ```js run
    
    let str = "stringify";

    // خذ 4 أحرف من الموضع 2
    alert( str.substr(2, 4) ); // ring

    ```

    يمكن أن يكون المُعامِل الأول سالبًا لتحديد الموضع بدءًا من النهاية:

    ```js run
    let str = "strin*!*gi*/!*fy";
    alert( str.substr(-4, 2) ); // حرفين ابتداءًا من الموضع الرابع
    ```

<<<<<<< HEAD
لِنُلَخِّص هذه التوابع لتجنب الخلط بينها:

| التابع                  | يقتطع ...                                               | المواضع السالبة        |
| ----------------------- | ------------------------------------------------------- | ---------------------- |
| `slice(start, end)‎`     | من الموضع `start` إلى الموضع `end` (بما لا يتضمن `end`) | مسموحة لكلا المعاملين  |
| `substring(start, end)‎` | ما بين الموضع `start` والموضع `end`                     | غير مسموحة وتصبح `0`   |
| `substr(start, length)‎` | أرجع الأحرف بطول `length` بدءًا من `start`               | مسموحة للمعامل `start` |
=======
    This method resides in the [Annex B](https://tc39.es/ecma262/#sec-string.prototype.substr) of the language specification. It means that only browser-hosted Javascript engines should support it, and it's not recommended to use it. In practice, it's supported everywhere.

Let's recap these methods to avoid any confusion:

| method | selects... | negatives |
|--------|-----------|-----------|
| `slice(start, end)` | from `start` to `end` (not including `end`) | allows negatives |
| `substring(start, end)` | between `start` and `end` (not including `end`)| negative values mean `0` |
| `substr(start, length)` | from `start` get `length` characters | allows negative `start` |
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533


<<<<<<< HEAD
```smart header="**أيهما تختار؟**"
يمكن لجميع التوابع تنفيذ الغرض المطلوب. لدى التابع `substr` قصور بسيط رسميًا: فهو غير ذكورة في توثيق JavaScript الرسمي، بل في Annex B والذي يغطي ميزات مدعومة في المتصفحات فقط لأسباب تاريخية، لذا فإن أي بيئة لا تعمل على المتصفح ستفشل في دعم هذا التابع، لكنه يعمل عمليًا في كل مكان.

ما بين الخيارين الآخرين، `slice` هو أكثر مرونة، فهو يسمح بتمرير مُعامِلات سالبة كما أنه أقصر في الكتابة. لذا، من الكافِ تذكر `slice` فقط من هذه التوابع الثلاث.
=======
Of the other two variants, `slice` is a little bit more flexible, it allows negative arguments and shorter to write.

So, for practical use it's enough to remember only `slice`.
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
```

## موازنة النصوص

توازن السلاسل النصية حرفًا حرفًا بترتيب أبجدي كما عرفنا في فصل  <info:comparison>, strings are compared character-by-character in alphabetical order.

بالرغم من ذلك، يوجد بعض الحالات الشاذة.

1- الحرف الأجنبي الصغير دائما أكبر من الحرف الكبير:

    ```js run
    alert( 'a' > 'Z' ); // true
    ```

2- الأحرف المُشَكَلَة خارج النطاق:

    ```js run
    alert( 'Österreich' > 'Zealand' ); // true
    ```

قد يقود ذلك إلى نتائج غريبة إن رتبنا مثلًا بين أسماء بلدان، فيتوقع الناس دائمًا أن `Zealand` تأتي بعد `Österreich` في القائمة وأن تونس تأتي قبل سوريا وهكذا. لفهم ما يحدث، لنراجع تمثيل النصوص الداخلي في JavaScript.

<<<<<<< HEAD
جميع النصوص مشفرة باستخدام  [UTF-16](https://en.wikipedia.org/wiki/UTF-16). يعني أن: لكل حرف رمز عددي مقابل له. يوجد دوال خاصة تسمح بالحصول على الحرف من رمزه والعكس.

### **`str.codePointAt(pos)‎`**
يُرجِع هذا التابع الرمز العددي الخاص بالحرف المعطى في الموضع `pos`:


    ```js run
    // لدى الأحرف المختلفة في الحالة رموز مختلفة
    alert( "z".codePointAt(0) ); // 122
=======
To understand what happens, we should be aware that strings in Javascript are encoded using [UTF-16](https://en.wikipedia.org/wiki/UTF-16). That is: each character has a corresponding numeric code.

There are special methods that allow to get the character for the code and back:

`str.codePointAt(pos)`
: Returns a decimal number representing the code for the character at position `pos`:

    ```js run
    // different case letters have different codes
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
    alert( "Z".codePointAt(0) ); // 90
    alert( "z".codePointAt(0) ); // 122
    alert( "z".codePointAt(0).toString(16) ); // 7a (if we need a hexadecimal value)
    ```

### **`String.fromCodePoint(code)‎`**
يُنشِئ حرفًا من رمزه العددي `code`:


    ```js run
    alert( String.fromCodePoint(90) ); // Z
<<<<<<< HEAD
    ```

    We can also add Unicode characters by their codes using `\u` followed by the hex code:

    ```js run
    // يُمثَّل العدد العشري 90 بالعدد 5a في النظام الست عشري.
    alert( '\u005a' ); // Z
=======
    alert( String.fromCodePoint(0x5a) ); // Z (we can also use a hex value as an argument)
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
    ```

لنرَ الآن الأحرف ذات الرموز `65..220` (الأحرف اللاتينية وأشياء إضافية) عبر إنشاء نصوص منها:

```js run
let str = '';

for (let i = 65; i <= 220; i++) {
  str += String.fromCodePoint(i);
}
alert( str );
// Output:
// ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~
// ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜ
```

تبدأ الأحرف الكبيرة كما ترى، ثم أحرف خاصة، ثم الأحرف الصغيرة، ثم `Ö` بالقرب من نهاية المخرجات.

يصبح الآن واضحًا لم `a > Z`. أي توازن الأحرف بواسطة قيمها العددية. فالرمز العددي الأكبر يعني أن الحرف أكبر. الرمز للحرف `a` هو 97‎ وهو أكبر من الرمز العددي للحرف `Z` الذي هو 90.

- تأتي الأحرف الصغيرة بعد الأحرف الكبيرة دائمًا لأن رموزها العددية دائمًا أكبر.
- تكون بعض الأحرف مثل `Ö` بعيدة عن الأحرف الهجائية. هنا، قيمة الحرف هذا أكبر من أي حرف بين `a` و `z`.

<<<<<<< HEAD
### موازنات صحيحة
=======
- All lowercase letters go after uppercase letters because their codes are greater.
- Some letters like `Ö` stand apart from the main alphabet. Here, its code is greater than anything from `a` to `z`.
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

### Correct comparisons [#correct-comparisons]

لحسن الحظ، تدعم جميع المتصفحات الحديثة المعيار العالمي [ECMA 402](http://www.ecma-international.org/ecma-402/1.0/ECMA-402.pdf)(IE10- الذي يتطلب المكتبة الاضافية [Intl.JS](https://github.com/andyearnshaw/Intl.js/))، إذ يوفر تابعًا خاصًا لموازنة النصوص بلغات متعددة، وفقًا لقواعدها.


<<<<<<< HEAD
يُرجِع استدعاء التابع [`str.localeCompare(str2)‎`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare) عددًا يحدد ما إن كان النص `str` أصغر، أو يساوي، أو أكبر من النص `str2` وفقًا لقواعد اللغة المحلية:
=======
Luckily, modern browsers support the internationalization standard [ECMA-402](https://www.ecma-international.org/publications-and-standards/standards/ecma-402/).
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

- يُرجِع قيمة سالبة إن كان `str` أصغر من `str2`.
- يُرجِع قيمة موجبة إن كان `str` أكبر من `str2`.
- يُرجِع `0` إن كانا متساويين.

إليك المثال التالي:


```js run
alert( 'Österreich'.localeCompare('Zealand') ); // -1
```
mdn:js/String/localeCompare

في الحقيقة، لهذه الدالة مُعامِلين إضافيين كما في [توثيقها على MDN](mdn:js/String/localeCompare)، إذ يسمح هذان المُعاملان بتحديد اللغة (تؤخذ من بيئة العمل تلقائيًا، ويعتمد ترتيب الأحرف على اللغة) بالإضافة إلى إعداد قواعد أخرى مثل الحساسية تجاه حالة الأحرف، أو ما إن كان يجب معاملة `"a"` و `"á"` بالطريقة نفسها ...الخ.

<<<<<<< HEAD
## ما خلف الستار، يونيكود

```warn header="**معلومات متقدمة**"
يتعمق الجزء التالي في ما يقبع خلف ستار النصوص التي تراها، وهذه المعلومات ستكون قيمة إن كنت تخطط للتعامل مع الرموز التعبيرية، أو الأحرف الرياضية النادرة أو الهيروغليفية أو أي رموز نادرة أخرى. يمكنك تخطي هذا الجزء إن لم تكن مهتمًا به.
```

### أزواج بديلة (Surrogate pairs)

لكل الأحرف المستخدمة بكثرة رموز عددية (code) مؤلفة من 2-بايت. لدى أحرف اللغات الأوروبية، والأرقام، وحتى معظم الرموز الهيروغليفية تمثيل من 2-بايت.

لكن، نحصل من 2-بايت 65536 على تركيبًا فقط وذلك غير كافٍ لكل الرموز (symbol) المُحتَمَلَة، لذا فإن الرموز (symbol) النادرة مرمزة بزوج من المحارف بحجم 2-بايت يسمى "أزواج بديلة" (Surrogate pairs).

طول كل رمز هو `2`:


```js run

// في الرياضيات X الحرف 
alert( '𝒳'.length ); // 2

// وجه ضاحك بدموع
alert( '😂'.length ); // 2

// حرف صيني هيروغليفي نادر
alert( '𩷶'.length ); // 2

```

لاحظ أن الأزواج البديلة لم تكن موجودة منذ إنشاء JavaScript، ولذا لا تعالج بشكل صحيح بواسطة اللغة. في النصوص السابقة لدينا رمز واحد فقط، لكن طول النص `length` ظهر على أنه `2`.

التابعان `String.fromCodePoint` و `str.codePointAt` نادران وقليلا الاستخدام، إذ يتعاملان مع الأزواج البديلة بصحة. وقد ظهرت مؤخرًا في اللغة. في السابق كان هنالك التابعان `String.fromCharCode` و `str.charCodeAt` فقط. هذان التابعان يشبهان `fromCodePoint` و `codePointAt`، لكنهما لا يتعاملان مع الأزواج البديلة.

قد يكون الحصول على رمز (symbol) واحد صعبًا، لأن الأزواج البديلة تُعامَل معاملة حرفين:

```js run
alert( '𝒳'[0] ); // رموز غريبة.
alert( '𝒳'[1] ); // أجزاء من الزوج البديل
```

لاحظ أن أجزاء الزوج البديل لا تحمل أي معنى إذا كانت منفصلة عن بعضها البعض. لذا فإن ما يعرضه مر `alert` في الأعلى هو شيء غير مفيد.

يمكن تَوَقُّع الأزواج البديلة عمليًا بواسطة رموزها: إن كان الرمز العددي لحرف يقع في المدى `0xd800..0xdbff`، فإنه الجزء الأول من الزوج البديل. أما الجزء الثاني فيجب أن يكون في المدى `0xdc00..0xdfff`. هذا المدى محجوز للأزواج البديلة وفقًا للمعايير المتبعة.

وفقًا للحالة السابقة، سنستعمل التابع `charCodeAt` الذي 
:

```js run
// لا يتعامل مع الأزواج البديلة، لذا فإنه يُرجِع أجزاء الرمز

alert( '𝒳'.charCodeAt(0).toString(16) ); // d835, between 0xd800 and 0xdbff
alert( '𝒳'.charCodeAt(1).toString(16) ); // dcb3, between 0xdc00 and 0xdfff
```

ستجد المزيد من الطرق للتعامل مع الأزواج البديلة لاحقًا في الفصل  <info:iterable>. يوجد أيضًا مكاتب خاصة لذلك، لكن لا يوجد شيء شهير محدد لِاقتراحه هنا.

### علامات التشكيل وتوحيد الترميز

يوجد حروف مركبة في الكثير من اللغات والتي تتكون من الحرف الرئيسي مع علامة فوقه/تحته. مثلًا، يمكن للحرف `a` أن يكون أساسًا للأحرف التالية: `àáâäãåā`. لدى معظم الحروف المركبة رمزها الخاص بها في جدول UTF-16. لكن ليس جميعها، وذلك لوجود الكثير من الاحتمالات.


To support arbitrary compositions, UTF-16 allows us to use several Unicode characters: the base character followed by one or many "mark" characters that "decorate" it.


```js run
alert( 'S\u0307' ); // Ṡ
```

إن احتجنا إلى رمز آخر فوق أو تحت الحرف فلا مشكلة، أضِف العلامة المطلوبة فقط. مثلًا، إن ألحقنا حرف "نقطة بالأسفل" (رمزها `‎ \u0323`)، فسنحصل على "S بنقاط فوقه وتحته"، `Ṩ`:

```js run
alert( 'S\u0307\u0323' ); // Ṩ
```

This provides great flexibility, but also an interesting problem: two characters may visually look the same, but be represented with different Unicode compositions.

For instance:

```js run

// S + نقطة في الأعلى + نقطة في الأسفل
let s1 = 'S\u0307\u0323'; // Ṩ

// S + نقطة في الأسفل + نقطة في الأعلى
let s2 = 'S\u0323\u0307'; // Ṩ, 

alert( `s1: ${s1}, s2: ${s2}` );

alert( s1 == s2 ); // خطأ بالرغم من أن الحرفين متساويان ظاهريًا

```

To solve this, there exists a "Unicode normalization" algorithm that brings each string to the single "normal" form.

هذه الخوارزمية مُضَمَّنة في التابع [str.normalize()](mdn:js/String/normalize).

```js run
alert( "S\u0307\u0323".normalize() == "S\u0323\u0307".normalize() ); // true
```

من المضحك في حالتنا أن `normalize()‎ ` تجمع سلسلة من 3 أحرف مع بعضها بعضًا إلى حرف واحد: `‎ \u1e68` (الحرف S مع النقطتين).

```js run
alert( "S\u0307\u0323".normalize().length ); // 1

alert( "S\u0307\u0323".normalize() == "\u1e68" ); // true
```

في الواقع، هذه ليست الحالة دائمًا. وذلك لأن الرمز `Ṩ` متعارف بكثرة، فضَمَّنّهُ مُنشِئوا UTF-16 في الجدول الرئيسي وأعطوه رمزًا خاصًا.

إن أردت تعلم المزيد عن قواعد التوحيد واختلافاتها - فستجدها في ملحق معايير اليونيكود: [نماذج توحيد ترميز اليونيكود](http://www.unicode.org/reports/tr15/),  لكن للأغراض العملية المتعارفة فالمعلومات السابقة تفي بالغرض.

## المُلخص
=======
## Summary
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

- There are 3 types of quotes. Backticks allow a string to span multiple lines and embed expressions `${…}`.
- We can use special characters, such as a line break `\n`.
- To get a character, use: `[]` or `at` method.
- To get a substring, use: `slice` or `substring`.
- To lowercase/uppercase a string, use: `toLowerCase/toUpperCase`.
- To look for a substring, use: `indexOf`, or `includes/startsWith/endsWith` for simple checks.
- To compare strings according to the language, use: `localeCompare`, otherwise they are compared by character codes.


يوجد الكثير من التوابع الأخرى المفيدة في النصوص:
- `str.trim()‎` تحذف ("تقتطع") المسافات الفارغة من بداية ونهاية النص.
- `str.repeat(n)‎ ` تُكرِّر النص `n` مرة.
- والمزيد، يمكن الاطلاع عليها في  [manual](mdn:js/String).

<<<<<<< HEAD
هنالك توابع أخرى للنصوص أيضًا تعمل على البحث/الاستبدال مع التعابير النمطية (regular expressions). لكن ذلك موضوع كبير، لذا فقد شُرِحَ في فصل مستقل، <info:regular-expressions>.
=======
Strings also have methods for doing search/replace with regular expressions. But that's big topic, so it's explained in a separate tutorial section <info:regular-expressions>.

Also, as of now it's important to know that strings are based on Unicode encoding, and hence there're issues with comparisons. There's more about Unicode in the chapter <info:unicode>.
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
