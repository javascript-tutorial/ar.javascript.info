#دوال الRegular Expressions والكلمات 
Regular Expressions  تعني سلسلة من الرموز والأحرف التي تعبر عن سلسلة أو نقش ليتم البحث عنها ضمن نص أطول.
في هذه المقالة سنغطي الطرق المختلفة التي تعمل مع regexps بتعمق.

## str.match(regexp)

تبحث الطريقة `str.match (regexp)` عن تطابقات لـ `regexp` في السلسلة` str`.

لديها 3 طرق:

1. إذا كان "regexp" لا يحتوي على علامة `نقش` g: g` ، فإنه يُرجع المطابقة الأولى كمصفوفة مع مجموعات التقاط وخصائص `index` (موضع المطابقة) ،` الإدخال` (سلسلة الإدخال ، يساوي `str`):

    ```js run
    let str = "I love JavaScript";

    let result = str.match(/Java(Script)/);

    alert( result[0] );     // JavaScript (full match)
    alert( result[1] );     // Script (first capturing group)
    alert( result.length ); // 2

    // Additional information:
    alert( result.index );  // 0 (match position)
    alert( result.input );  // I love JavaScript (source string)
    ```

2. إذا كان "regexp" يحتوي على نمط "flag: g" ، فسيُرجع مصفوفة من جميع المطابقات على شكل سلاسل ، دون التقاط مجموعات وتفاصيل أخرى.
    ```js run
    let str = "I love JavaScript";

    let result = str.match(/Java(Script)/g);

    alert( result[0] ); // JavaScript
    alert( result.length ); // 1
    ```

3. إذا لم تكن هناك تطابقات ، بغض النظر عما إذا كان هناك علامة `pattern: g` أم لا ، فسيتم إرجاع` null`.

     هذا فارق بسيط مهم. إذا لم تكن هناك تطابقات ، فلن نحصل على مصفوفة فارغة ، ولكن `لاغية`. من السهل ارتكاب خطأ نسيان ذلك ، على سبيل المثال:

    ```js run
    let str = "I love JavaScript";

    let result = str.match(/HTML/);

    alert(result); // null
    alert(result.length); // Error: Cannot read property 'length' of null
    ```

إذا أردنا أن تكون النتيجة مصفوفة ، فيمكننا الكتابة على النحو التالي:

    ```js
    let result = str.match(regexp) || [];
    ```

## str.matchAll(regexp)

[recent browser="new"]

الطريقة `str.matchAll (regexp)` هي متغير "أحدث ، ومحسن" لـ "str.match".

يتم استخدامه بشكل أساسي للبحث عن جميع التطابقات مع جميع المجموعات.

هناك 3 اختلافات عن "المباراة":

1. تقوم بإرجاع كائن قابل للتكرار مع تطابقات بدلاً من صفيف. يمكننا عمل مصفوفة منتظمة منه باستخدام `Array.from`.
2. يتم إرجاع كل تطابق كمصفوفة مع مجموعات التقاط (نفس تنسيق `str.match` بدون علامة` pattern: g`).
3. إذا لم تكن هناك نتائج ، فإنها لا تُرجع "null" ، ولكنها تُرجع كائنًا فارغًا قابلًا للتكرار.

مثال للاستخدام:

```js run
let str = '<h1>Hello, world!</h1>';
let regexp = /<(.*?)>/g;

let matchAll = str.matchAll(regexp);

alert(matchAll); // [object RegExp String Iterator], not array, but an iterable

matchAll = Array.from(matchAll); // array now

let firstMatch = matchAll[0];
alert( firstMatch[0] );  // <h1>
alert( firstMatch[1] );  // h1
alert( firstMatch.index );  // 0
alert( firstMatch.input );  // <h1>Hello, world!</h1>
```

إذا استخدمنا "for..of" للتكرار فوق تطابقات `matchAll` ، فلن نحتاج بعد ذلك إلى" Array.from` ".

## str.split(regexp|substr, limit)

تقسيم السلسلة باستخدام regexp (أو سلسلة فرعية) كمحدد.

يمكننا استخدام `الانقسام` مع السلاسل ، مثل هذا:

```js run
alert('12-34-56'.split('-')) // array of [12, 34, 56]
```

لكن يمكننا تقسيمها بتعبير عادي ، بالطريقة نفسها:

```js run
alert('12, 34, 56'.split(/,\s*/)) // array of [12, 34, 56]
```

## str.search(regexp)

تعرض الطريقة `str.search (regexp)` موضع التطابق الأول أو `-1` إذا لم يتم العثور على:

```js run
let str = "A drop of ink may make a million think";

alert( str.search( /ink/i ) ); // 10 (first match position)
```

** القيد المهم: "البحث" يعثر على المطابقة الأولى فقط. **

إذا احتجنا إلى مواضع لمطابقات أخرى ، فيجب أن نستخدم وسائل أخرى ، مثل العثور عليها جميعًا باستخدام `str.matchAll (regexp)`.

## str.replace(str|regexp, str|func)

هذه طريقة عامة للبحث والاستبدال ، واحدة من أكثرها فائدة. سكين الجيش السويسري للبحث والاستبدال.

يمكننا استخدامه بدون regexps للبحث عن سلسلة فرعية واستبدالها:

```js run
// replace a dash by a colon
alert('12-34-56'.replace("-", ":")) // 12:34-56
```

هناك مأزق بالرغم من ذلك.

** عندما تكون الوسيطة الأولى لـ `replace` عبارة عن سلسلة ، فإنها تحل محل المطابقة الأولى فقط. **

يمكنك أن ترى ذلك في المثال أعلاه: فقط أول "" - "" يتم استبداله بـ "": "".

للعثور على جميع الواصلات ، لا نحتاج إلى استخدام السلسلة "" - "` ، ولكن نمط regexp `: / - / g` ، مع العلامة` pattern: g` الإلزامية:

```js run
// replace all dashes by a colon
alert( '12-34-56'.replace( *!*/-/g*/!*, ":" ) )  // 12:34:56
```

الُمدخَل الثاني هو سلسلة بديلة. يمكننا استخدام حرف خاص فيه:

| الرموز | الإجراء في سلسلة الاستبدال |
|--------|--------|
|`$&`|إدراج التطابق كاملا |

|<code>$&#096;</code>|إدراج جزء من السلسلة قبل التطابق
|
|`$'`|إدراج جزء من السلسلة بعد المباراة
|
|`$n`|إذا كان `n` رقمًا مكونًا من رقم أو رقمين ، يتم إدراج محتويات مجموعة الالتقاط n ، للحصول على التفاصيل ، راجع [] (info: regexp-groups)|
|`$<name>`|إدراج محتويات الأقواس مع "الاسم" المحدد ، للحصول على التفاصيل ، انظر [] (info: regexp-groups)|
|`$$`|إدراج حرف `$` |

فمثلا:

```js run
let str = "John Smith";

// swap first and last name
alert(str.replace(/(john) (smith)/i, '$2, $1')) // Smith, John
```

** بالنسبة للمواقف التي تتطلب بدائل "ذكية" ، يمكن أن تكون الوسيطة الثانية دالة. **

سيتم استدعاؤها لكل مباراة ، وسيتم إدراج القيمة المرتجعة كبديل.

يتم استدعاء الوظيفة مع الوسيطات `func (match، p1، p2، ...، pn، offset، input، groups)`:

1. "المباراة" - المباراة ،
2. `p1، p2، ...، pn` - محتويات مجموعات الالتقاط (إن وجدت) ،
3. "تعويض" - موقع المباراة ،
4. "الإدخال" - سلسلة المصدر ،
5. `المجموعات` - كائن له مجموعات مسماة.

إذا لم تكن هناك أقواس في regexp ، فهناك 3 وسيطات فقط: `func (str ، offset ، input)`.

على سبيل المثال ، دعنا نطابق جميع المطابقات بأحرف كبيرة:

```js run
let str = "html and css";

let result = str.replace(/html|css/gi, str => str.toUpperCase());

alert(result); // HTML and CSS
```

يسبتدل كل التطابقات في مكانها في الكلمة :

```js run
alert("Ho-Ho-ho".replace(/ho/gi, (match, offset) => offset)); // 0-3-6
```

Iفي المثال أدناه يوجد قوسين ، لذلك يتم استدعاء وظيفة الاستبدال بخمس وسيطات: الأولى هي التطابق الكامل ، ثم قوسين ، وبعدها (غير مستخدمة في المثال) موضع المطابقة وسلسلة المصدر:

```js run
let str = "John Smith";

let result = str.replace(/(\w+) (\w+)/, (match, name, surname) => `${surname}, ${name}`);

alert(result); // Smith, John
```

إذا كان هناك العديد من المجموعات ، فمن المناسب استخدام معلمات الراحة للوصول إليها:

```js run
let str = "John Smith";

let result = str.replace(/(\w+) (\w+)/, (...match) => `${match[2]}, ${match[1]}`);

alert(result); // Smith, John
```

أو ، إذا كنا نستخدم مجموعات مسماة ، فإن كائن `groups` معهم يكون دائمًا هو الأخير ، لذا يمكننا الحصول عليه كما يلي:

```js run
let str = "John Smith";

let result = str.replace(/(?<name>\w+) (?<surname>\w+)/, (...match) => {
  let groups = match.pop();

  return `${groups.surname}, ${groups.name}`;
});

alert(result); // Smith, John
```

يمنحنا استخدام دالة الطاقة البديلة القصوى ، لأنها تحصل على جميع المعلومات حول المباراة ، ولديها إمكانية الوصول إلى المتغيرات الخارجية ويمكنها القيام بكل شيء.

## regexp.exec(str)

تُظهر الطريقة `regexp.exec (str)` مطابقة لـ `regexp` في السلسلة` str`. على عكس الطرق السابقة ، يتم استدعاء regexp ، وليس على سلسلة.

يتصرف بشكل مختلف اعتمادًا على ما إذا كان regexp يحتوي على علامة `pattern: g`.

إذا لم يكن هناك `pattern: g` ، فإن` regexp.exec (str) `تُرجع المطابقة الأولى كما` str.match (regexp) `. هذا السلوك لا يجلب أي شيء جديد.

ولكن إذا كان هناك علامة `pattern: g` ، فعندئذٍ:
- يؤدي استدعاء "regexp.exec (str)` إلى إرجاع المباراة الأولى وحفظ المركز فورًا في الخاصية `regexp.lastIndex".
- تبدأ هذه المكالمة التالية البحث من الموضع `regexp.lastIndex` ، وتعيد المباراة التالية وتحفظ المركز بعدها في` regexp.lastIndex`.
- ...وما إلى ذلك وهلم جرا.
- في حالة عدم وجود تطابقات ، يُرجع `regexp.exec`` null` ويعيد تعيين `regexp.lastIndex` إلى` 0`.

لذا ، تعيد المكالمات المتكررة جميع التطابقات الواحدة تلو الأخرى ، باستخدام الخاصية `regexp.lastIndex` لتتبع موضع البحث الحالي.

في الماضي ، قبل إضافة الأسلوب `str.matchAll` إلى جافا سكريبت ، تم استخدام مكالمات` regexp.exec` في الحلقة للحصول على جميع التطابقات مع المجموعات:

```js run
let str = 'More about JavaScript at https://javascript.info';
let regexp = /javascript/ig;

let result;

while (result = regexp.exec(str)) {
  alert( `Found ${result[0]} at position ${result.index}` );
  // Found JavaScript at position 11, then
  // Found javascript at position 33
}
```

يعمل هذا الآن أيضًا ، على الرغم من أن المتصفحات الأحدث `str.matchAll` تكون عادةً أكثر ملاءمة.

** يمكننا استخدام "regexp.exec" للبحث من موضع معين عن طريق تعيين "lastIndex" يدويًا. **

على سبيل المثال:

```js run
let str = 'Hello, world!';

let regexp = /\w+/g; // without flag "g", lastIndex property is ignored
regexp.lastIndex = 5; // search from 5th position (from the comma)

alert( regexp.exec(str) ); // world
```

إذا كان regexp يحتوي على علامة `pattern: y` ، فسيتم إجراء البحث تمامًا في الموضع` regexp.lastIndex` ، وليس بعد ذلك.

لنستبدل العلامة `pattern: g` بـ` pattern: y` في المثال أعلاه. لن تكون هناك تطابقات ، حيث لا توجد كلمة في الموضع `5`:

```js run
let str = 'Hello, world!';

let regexp = /\w+/y;
regexp.lastIndex = 5; // search exactly at position 5

alert( regexp.exec(str) ); // null
```

هذا مناسب للحالات التي نحتاج فيها إلى "قراءة" شيء ما من السلسلة عن طريق التعبير العادي في الموضع المحدد ، وليس في مكان آخر.

## regexp.test(str)

تبحث الطريقة `regexp.test (str)` عن تطابق وتعرض `true / false` سواء كانت موجودة.

على سبيل المثال:

```js run
let str = "I love JavaScript";

// these two tests do the same
alert( *!*/love/i*/!*.test(str) ); // true
alert( str.search(*!*/love/i*/!*) != -1 ); // true
```

مثال بالإجابة السلبية:

```js run
let str = "Bla-bla-bla";

alert( *!*/love/i*/!*.test(str) ); // false
alert( str.search(*!*/love/i*/!*) != -1 ); // false
```

إذا كان regexp يحتوي على علامة `pattern: g` ، فسيظهر` regexp.test` من خاصية `regexp.lastIndex` ويحدث هذه الخاصية ، مثل` regexp.exec` تمامًا.

لذا يمكننا استخدامه للبحث من موضع معين:

```js run
let regexp = /love/gi;

let str = "I love JavaScript";

// start the search from position 10:
regexp.lastIndex = 10;
alert( regexp.test(str) ); // false (no match)
```

````warn header="regexp نفسه الذي تم اختباره بشكل متكرر على مصادر مختلفة قد يفشل"
إذا طبقنا نفس regexp العام على المدخلات المختلفة ، فقد يؤدي ذلك إلى نتيجة خاطئة ، لأن استدعاء `regexp.test` يُقدم خاصية` regexp.lastIndex` ، لذلك قد يبدأ البحث في سلسلة أخرى من موضع غير صفري.

على سبيل المثال ، هنا نسمي "regexp.test" مرتين على نفس النص ، وتفشل المرة الثانية:

تشغيل شبيبة
let regexp = / javascript / g ؛ // (regexp الذي تم إنشاؤه للتو: regexp.lastIndex = 0)

تنبيه (regexp.test ("javascript")) ؛ // true (regexp.lastIndex = 10 الآن)
تنبيه (regexp.test ("javascript")) ؛ // خاطئة
``

هذا بالضبط لأن "regexp.lastIndex" ليس صفراً في الاختبار الثاني.

للتغلب على ذلك ، يمكننا تعيين `regexp.lastIndex = 0` قبل كل بحث. أو بدلاً من استدعاء طرق على regexp ، استخدم أساليب السلسلة `str.match / search / ...` ، ولا يستخدمون `lastIndex`.
````

