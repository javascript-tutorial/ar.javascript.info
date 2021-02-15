# التناوب (أو) |

البديل هو المصطلح في التعبير العادي وهو في الواقع "OR" بسيط.

في التعبير العادي ، يُشار إليه بحرف السطر العمودي `pattern: |`.

على سبيل المثال ، نحتاج إلى العثور على لغات البرمجة: HTML أو PHP أو Java أو JavaScript.

التعبير العادي المقابل: `pattern: html | php | java (script)؟`.

مثال للاستخدام:

```js run
let regexp = /html|php|css|java(script)?/gi;

let str = "First HTML appeared, then CSS, then JavaScript";

alert( str.match(regexp) ); // 'HTML', 'CSS', 'JavaScript'
```

لقد رأينا بالفعل شيئًا مشابهًا - الأقواس المربعة. تسمح بالاختيار بين عدة أحرف ، على سبيل المثال `pattern: gr [ae] y` يطابق` match: gre` أو `match: grey`.

<<<<<<< HEAD
تسمح الأقواس المربعة باستخدام الأحرف أو مجموعات الأحرف فقط. يسمح التناوب بأي تعبيرات. نمط regexp `: A | B | C` يعني أحد التعبيرات` A` أو `B` أو` C`.
=======
Square brackets allow only characters or character classes. Alternation allows any expressions. A regexp `pattern:A|B|C` means one of expressions `A`, `B` or `C`.
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c

على سبيل المثال:

- `pattern: gr (a | e) y` يعني تمامًا مثل` pattern: gr [ae] y`.
- `pattern: gra | ey` تعني` match: gra` أو `match: ey`.

لتطبيق التناوب على جزء مختار من النمط ، يمكننا تضمينه بين قوسين:
- `النمط: أحب HTML | CSS` يطابق` مطابقة: أنا أحب HTML` أو `تطابق: CSS`.
- `pattern: I love (HTML | CSS)` يتطابق مع `match: I love HTML` أو` match: I love CSS`.

## مثال: regexp للوقت

<<<<<<< HEAD
في المقالات السابقة ، كانت هناك مهمة لبناء regexp لوقت البحث في شكل `hh: mm` ، على سبيل المثال` 12: 00`. لكن `` النمط البسيط: \ d \ d: \ d \ d` غامض للغاية. يقبل `25: 99` كوقت (حيث تتطابق 99 ثانية مع النمط ، لكن ذلك الوقت غير صالح).
=======
In previous articles there was a task to build a regexp for searching time in the form `hh:mm`, for instance `12:00`. But a simple `pattern:\d\d:\d\d` is too vague. It accepts `25:99` as the time (as 99 minutes match the pattern, but that time is invalid).
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c

كيف يمكننا صنع نمط أفضل؟

يمكننا استخدام مطابقة أكثر دقة. اولا الساعات:

- إذا كان الرقم الأول هو "0" أو "1" ، فيمكن أن يكون الرقم التالي أي: `pattern: [01] \ d`.
- وإلا ، إذا كان الرقم الأول هو "2" ، فيجب أن يكون الرقم التالي "pattern: [0-3]`.
- (غير مسموح بالرقم الأول الآخر)

يمكننا كتابة كلا المتغيرين في regexp باستخدام البديل: `pattern: [01] \ d | 2 [0-3]`.

بعد ذلك ، يجب أن تكون الدقائق من `00` إلى` 59`. في لغة التعبير العادي التي يمكن كتابتها كـ `pattern: [0-5] \ d`: الرقم الأول` 0-5` ، ثم أي رقم.

<<<<<<< HEAD
إذا صقنا الدقائق والثواني معًا ، نحصل على النمط: `pattern: [01] \ d | 2 [0-3]: [0-5] \ d`.
=======
If we glue hours and minutes together, we get the pattern: `pattern:[01]\d|2[0-3]:[0-5]\d`.
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c

لقد انتهينا تقريبًا ، ولكن هناك مشكلة. يحدث "النمط البديل": | `الآن بين` النمط: [01] \ d` و "النمط: 2 [0-3]: [0-5] \ d`.

أي: تمت إضافة الدقائق إلى البديل الثاني ، إليك صورة واضحة:

``
[01] \ d | 2 [0-3]: [0-5] \ د
``

يبحث هذا النمط عن `النمط: [01] \ d` أو` النمط: 2 [0-3]: [0-5] \ d`.

ولكن هذا خطأ ، يجب استخدام التناوب فقط في جزء "الساعات" من التعبير العادي ، للسماح بـ "pattern: [01] \ d` OR` pattern: 2 [0-3] `. دعنا نصحح ذلك عن طريق وضع "ساعات" بين قوسين: `النمط: ([01] \ d | 2 [0-3]): [0-5] \ d`.

الحل النهائي:

```js run
let regexp = /([01]\d|2[0-3]):[0-5]\d/g;

alert("00:00 10:10 23:59 25:99 1:2".match(regexp)); // 00:00,10:10,23:59
```

