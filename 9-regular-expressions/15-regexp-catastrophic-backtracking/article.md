# التراجع الكارثي

<<<<<<< HEAD
تبدو بعض التعبيرات العادية بسيطة ، ولكن يمكنها تنفيذ كل وقت طويل ، وحتى "تعليق" محرك جافا سكريبت.

عاجلاً أم آجلاً ، يواجه معظم المطورين أحيانًا مثل هذا السلوك ، لأنه من السهل جدًا إنشاء مثل هذا regexp.

العَرَض النموذجي - يعمل التعبير العادي بشكل جيد في بعض الأحيان ، ولكن بالنسبة لبعض السلاسل "يتوقف" ويستهلك 100٪ من وحدة المعالجة المركزية.
=======
Some regular expressions are looking simple, but can execute a veeeeeery long time, and even "hang" the JavaScript engine.

Sooner or later most developers occasionally face such behavior. The typical symptom -- a regular expression works fine sometimes, but for certain strings it "hangs", consuming 100% of CPU.
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5

في مثل هذه الحالة ، يقترح متصفح الويب إنهاء البرنامج النصي وإعادة تحميل الصفحة. ليس بالشيء الجيد بالتأكيد

<<<<<<< HEAD
بالنسبة لجافا سكريبت من جانب الخادم ، قد تصبح ثغرة أمنية في حالة معالجة التعبيرات العادية لبيانات المستخدم.
=======
For server-side JavaScript such a regexp may hang the server process, that's even worse. So we definitely should take a look at it.
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5

## مثال

<<<<<<< HEAD
لنفترض أن لدينا سلسلة ، ونود أن نتحقق مما إذا كانت تتكون من الكلمات `pattern: \ w +` مع مساحة `اختيارية` `pattern: \ s؟` بعد كل منها.

سنستخدم نمط regexp `: ^ (\ w + \ s؟) * $` ، فهو يحدد 0 أو أكثر من هذه الكلمات.
=======
Let's say we have a string, and we'd like to check if it consists of words `pattern:\w+` with an optional space `pattern:\s?` after each.

An obvious way to construct a regexp would be to take a word followed by an optional space `pattern:\w+\s?` and then repeat it with `*`.

That leads us to the regexp `pattern:^(\w+\s?)*$`, it specifies zero or more such words, that start at the beginning `pattern:^` and finish at the end `pattern:$` of the line.
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5

في العمل:

```js run
let regexp = /^(\w+\s?)*$/;

alert( regexp.test("A good string") ); // true
alert( regexp.test("Bad characters: $@#") ); // false
```

<<<<<<< HEAD
يبدو أنه يعمل. والنتيجة صحيحة. على الرغم من ذلك ، على سلاسل معينة يستغرق الكثير من الوقت. طالما أن محرك جافا سكريبت "توقف" مع استهلاك CPU بنسبة 100٪.

إذا قمت بتشغيل المثال أدناه ، فربما لن ترى أي شيء ، لأن JavaScript سوف "يتعطل" فقط. سيتوقف متصفح الويب عن التفاعل مع الأحداث ، وستتوقف واجهة المستخدم عن العمل. بعد مرور بعض الوقت سيقترح إعادة تحميل الصفحة. لذا كن حذرًا مع هذا:
=======
The regexp seems to work. The result is correct. Although, on certain strings it takes a lot of time. So long that JavaScript engine "hangs" with 100% CPU consumption.

If you run the example below, you probably won't see anything, as JavaScript will just "hang". A web-browser will stop reacting on events, the UI will stop working (most browsers allow only scrolling). After some time it will suggest to reload the page. So be careful with this:
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5

```js run
let regexp = /^(\w+\s?)*$/;
let str = "An input string that takes a long time or even makes this regexp to hang!";

// will take a very long time
alert( regexp.test(str) );
```

<<<<<<< HEAD
يمكن لبعض محركات التعبير العادي معالجة مثل هذا البحث ، ولكن معظمها لا يستطيع ذلك.
=======
To be fair, let's note that some regular expression engines can handle such a search effectively. But most of them can't. Browser engines usually hang.
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5

## مثال مبسط

<<<<<<< HEAD
ما الأمر؟ لماذا "تعليق" التعبير العادي؟
=======
What's the matter? Why the regular expression hangs?
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5

لفهم ذلك ، دعنا نبسط المثال: إزالة المسافات `pattern: \ s؟`. ثم يصبح `النمط: ^ (\ w +) * $`.

ولجعل الأمور أكثر وضوحًا ، دعنا نستبدل `pattern: \ w` بـ` pattern: \ d`. مازال التعبير العادي الناتج معلقًا ، على سبيل المثال:

```js run
let regexp = /^(\d+)*$/;

let str = "012345678901234567890123456789z";

// will take a very long time (careful!)
alert( regexp.test(str) );
```

إذن ما هو الخطأ في regexp؟

أولاً ، قد يلاحظ المرء أن نمط regexp `: (\ d +) *` غريب بعض الشيء. يبدو "نمط محدد الكمية: *` غريبًا. إذا أردنا رقمًا ، فيمكننا استخدام `pattern: \ d +`.

<<<<<<< HEAD
في الواقع ، إن التعبير العادي مصطنع. لكن السبب في أنها بطيئة هو نفسه الذي رأيناه أعلاه. لذلك دعونا نفهمها ، ومن ثم سيصبح المثال السابق واضحًا.

ماذا يحدث أثناء البحث عن `النمط: ^ (\ d +) * $` في السطر `الموضوع: 123456789!` (اختصارًا قليلاً للوضوح) ، لماذا يستغرق وقتًا طويلاً؟

1. أولاً ، يحاول محرك regexp إيجاد رقم `النمط: \ d +`. نمط `plus +: 'جشع افتراضيًا ، لذلك يستهلك جميع الأرقام:
=======
Indeed, the regexp is artificial, we got it by simplifying the previous example. But the reason why it is slow is the same. So let's understand it, and then the previous example will become obvious.

What happens during the search of `pattern:^(\d+)*$` in the line `subject:123456789z` (shortened a bit for clarity, please note a non-digit character `subject:z` at the end, it's important), why does it take so long?

Here's what the regexp engine does:

1. First, the regexp engine tries to find the content of the parentheses: the number `pattern:\d+`. The plus `pattern:+` is greedy by default, so it consumes all digits:
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5

    ``
    \ d + .......
    (123456789) z
    ``

<<<<<<< HEAD
    ثم يحاول تطبيق مقياس كمية النجم ، ولكن لا يوجد المزيد من الأرقام ، لذا فهو لا يعطي أي شيء.

    التالي في النمط هو "نهاية السلسلة": $ `، ولكن في النص لدينا` الموضوع:! `، لذلك لا يوجد تطابق:

    ``
               X
    \ d + ........ $
    (123456789)!
    ``
=======
    After all digits are consumed, `pattern:\d+` is considered found (as `match:123456789`).
    
    Then the star quantifier `pattern:(\d+)*` applies. But there are no more digits in the text, so the star doesn't give anything.

    The next character in the pattern is the string end `pattern:$`. But in the text we have `subject:z` instead, so there's no match:

    ```
               X
    \d+........$
    (123456789)z
    ```
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5

2. نظرًا لعدم وجود تطابق ، فإن نمط المحدد الكمي الجشع `: +` يقلل من عدد التكرار ، ويعيد حرفًا واحدًا إلى الوراء.

<<<<<<< HEAD
    الآن `النمط: \ d +` يأخذ جميع الأرقام باستثناء آخر:
    ``
    \ d + .......
    (12345678) 9!
    ``
3. ثم يحاول المحرك متابعة البحث من الموضع الجديد (`9`).

    يمكن تطبيق النجمة `نمط: (\ d +) *` - تعطي الرقم `تطابق: 9`:
=======
    Now `pattern:\d+` takes all digits except the last one (`match:12345678`):
    ```
    \d+.......
    (12345678)9z
    ```
3. Then the engine tries to continue the search from the next position (right after `match:12345678`).

    The star `pattern:(\d+)*` can be applied -- it gives one more match of `pattern:\d+`, the number `match:9`:
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5

    ``

<<<<<<< HEAD
    \ d + ....... \ d +
    (12345678) (9)!
    ``

    يحاول المحرك مطابقة `النمط: $` مرة أخرى ، لكنه يفشل ، لأنه يلبي `الموضوع:!`:
=======
    \d+.......\d+
    (12345678)(9)z
    ```

    The engine tries to match `pattern:$` again, but fails, because it meets `subject:z` instead:
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5

    ``
                 X
    \ d + ....... \ d +
    (12345678) (9) z
    ``


4. لا يوجد تطابق ، لذلك سيستمر المحرك في التراجع ، مما يقلل من عدد التكرار. يعمل التراجع بشكل عام على هذا النحو: يقلل محدد الكمية الجشع من عدد التكرار حتى يتمكن من ذلك. ثم ينقص محدد الكمية الجشع السابق ، وهكذا.

    تتم محاولة جميع التركيبات الممكنة. هنا أمثلةهم.

    يتكون الرقم الأول من `النمط: \ d +` من 7 أرقام ، ثم عدد من رقمين:

<<<<<<< HEAD
    ``
                 X
    \ d + ...... \ d +
    (1234567) (89)!
    ``
=======
    ```
                 X
    \d+......\d+
    (1234567)(89)z
    ```
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5

    يتكون الرقم الأول من 7 أرقام ، ثم رقمان من رقم واحد لكل منهما:

<<<<<<< HEAD
    ``
                   X
    \ d + ...... \ d + \ d +
    (1234567) (8) (9)!
    ``
=======
    ```
                   X
    \d+......\d+\d+
    (1234567)(8)(9)z
    ```
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5

    يتكون الرقم الأول من 6 أرقام ، ثم عدد 3 أرقام:

<<<<<<< HEAD
    ``
                 X
    \ d + ....... \ d +
    (123456) (789)!
    ``
=======
    ```
                 X
    \d+.......\d+
    (123456)(789)z
    ```
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5

    يتكون الرقم الأول من 6 أرقام ، ثم رقمان:

<<<<<<< HEAD
    ``
                   X
    \ d + ..... \ d + \ d +
    (123456) (78) (9)!
    ``
=======
    ```
                   X
    \d+.....\d+ \d+
    (123456)(78)(9)z
    ```
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5

    ...وما إلى ذلك وهلم جرا.

هناك عدة طرق لتقسيم مجموعة من الأرقام `123456789` إلى أرقام. على وجه الدقة ، هناك <code> 2 <sup> n </sup> -1 </code> ، حيث `n` هو طول المجموعة.

<<<<<<< HEAD
بالنسبة لـ `n = 20` ، هناك حوالي مليون تركيبة ، لـ` n = 30` - ألف مرة أكثر. تجربة كل واحد منهم هو بالضبط السبب في أن البحث يستغرق وقتًا طويلاً.

ماذا أفعل؟

هل يجب تشغيل الوضع الكسول؟

لسوء الحظ ، لن يساعد ذلك: إذا استبدلنا `pattern: \ d +` بـ `pattern: \ d +؟` ، فسيظل regexp معلقًا. سيتغير ترتيب المجموعات ، ولكن ليس العدد الإجمالي لها.

بعض محركات التعبير العادي لديها اختبارات صعبة وأتمتة محدودة تسمح بتجنب المرور عبر جميع التركيبات أو تجعلها أسرع بكثير ، ولكن ليس جميع المحركات ، وليس في جميع الحالات.

## الرجوع إلى الكلمات والسلاسل
=======
There are many ways to split a sequence of digits `123456789` into numbers. To be precise, there are <code>2<sup>n</sup>-1</code>, where `n` is the length of the sequence.

- For `123456789` we have `n=9`, that gives 511 combinations.
- For a longer sequence with `n=20` there are about one million (1048575) combinations.
- For `n=30` - a thousand times more (1073741823 combinations).

Trying each of them is exactly the reason why the search takes so long.
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5

يحدث الشيء نفسه في مثالنا الأول ، عندما ننظر إلى الكلمات حسب النمط `pattern: ^ (\ w + \ s؟) * $` في السلسلة `subject: مدخل معلق!`.

والسبب هو أن الكلمة يمكن تمثيلها كنمط `واحد: \ w +` أو العديد:

```
(input)
(inpu)(t)
(inp)(u)(t)
(in)(p)(ut)
...
```

بالنسبة للإنسان ، من الواضح أنه قد لا يكون هناك تطابق ، لأن السلسلة تنتهي بعلامة تعجب `!` ، لكن التعبير العادي يتوقع حرفًا كلمة `نمط: \ w` أو نمط` مسافة: \ s` في النهاية. لكن المحرك لا يعرف ذلك.

<<<<<<< HEAD
يحاول جميع التركيبات كيف أن نمط regexp `: (\ w + \ s؟) *` يمكن "استهلاك" السلسلة ، بما في ذلك المتغيرات ذات نمط `المسافات: (\ w + \ s) *` وبدونها `نمط: (\ w +) * `(لأن المساحات` pattern: \ s؟ `اختيارية). نظرًا لوجود العديد من هذه المجموعات ، فإن البحث يستغرق الكثير من الوقت.
=======
It tries all combinations of how the regexp `pattern:(\w+\s?)*` can "consume" the string, including variants with spaces `pattern:(\w+\s)*` and without them `pattern:(\w+)*` (because spaces `pattern:\s?` are optional). As there are many such combinations (we've seen it with digits), the search takes a lot of time.

What to do?

Should we turn on the lazy mode?

Unfortunately, that won't help: if we replace `pattern:\w+` with `pattern:\w+?`, the regexp will still hang. The order of combinations will change, but not their total count.

Some regular expression engines have tricky tests and finite automations that allow to avoid going through all combinations or make it much faster, but most engines don't, and it doesn't always help.
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5

## كيفية الإصلاح؟

هناك طريقتان رئيسيتان لإصلاح المشكلة.

الأول هو تقليل عدد التركيبات الممكنة.

<<<<<<< HEAD
دعنا نعيد كتابة التعبير العادي كـ `pattern: ^ (\ w + \ s) * \ w *` - سنبحث عن أي عدد من الكلمات متبوعًا بنمط `المسافة: (\ w + \ s) *` ، ثم ( اختياريًا) كلمة `pattern: \ w *`.
=======
Let's make the space non-optional by rewriting the regular expression as `pattern:^(\w+\s)*\w*$` - we'll look for any number of words followed by a space `pattern:(\w+\s)*`, and then (optionally) a final word `pattern:\w*`.
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5

تعادل regexp هذه السابقة (تتطابق مع نفسها) وتعمل بشكل جيد:

```js run
let regexp = /^(\w+\s)*\w*$/;
let str = "An input string that takes a long time or even makes this regex to hang!";

alert( regexp.test(str) ); // false
```

لماذا اختفت المشكلة؟

<<<<<<< HEAD
الآن النجمة `pattern: *` يذهب بعد `pattern: \ w + \ s` بدلاً من` pattern: \ w + \ s؟ `. أصبح من المستحيل تمثيل كلمة واحدة من السلسلة مع `نمط متعدد متتالي: \ w +`. يتم الآن توفير الوقت اللازم لتجربة هذه المجموعات.

على سبيل المثال ، النقش السابق `pattern: (\ w + \ s؟) *` يمكن أن يتطابق مع الكلمة `subject: string` على هيئة` `pattern: \ w +`:
=======
That's because now the space is mandatory.

The previous regexp, if we omit the space, becomes `pattern:(\w+)*`, leading to many combinations of `\w+` within a single word

So `subject:input` could be matched as two repetitions of `pattern:\w+`, like this:
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5

```
\w+  \w+
(inp)(ut)
```

<<<<<<< HEAD
النمط السابق ، بسبب `` النمط: \ s` الاختياري للمتغيرات المسموح بها `النمط: \ w +` ، `النمط: \ w + \ s` ،` النمط: \ w + \ w + `وما إلى ذلك.

مع النقش المُعاد كتابته `النمط: (\ w + \ s) *` ، هذا مستحيل: قد يكون هناك `نمط: \ w + \ s` أو` النمط: \ w + \ s \ w + \ s` ، ولكن ليس `النمط: \ w + \ w + `. لذلك تم تقليل عدد المجموعات بشكل كبير.
=======
The new pattern is different: `pattern:(\w+\s)*` specifies repetitions of words followed by a space! The `subject:input` string can't be matched as two repetitions of `pattern:\w+\s`, because the space is mandatory.

The time needed to try a lot of (actually most of) combinations is now saved.
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5

## منع التراجع

<<<<<<< HEAD
ليس من المناسب دائمًا إعادة كتابة regexp. وليس من الواضح دائمًا كيفية القيام بذلك.

النهج البديل هو منع التراجع عن المقياس الكمي.

يحاول محرك التعبيرات العادية العديد من المجموعات التي من الواضح أنها خاطئة للإنسان.
=======
It's not always convenient to rewrite a regexp though. In the example above it was easy, but it's not always obvious how to do it. 

Besides, a rewritten regexp is usually more complex, and that's not good. Regexps are complex enough without extra efforts.

Luckily, there's an alternative approach. We can forbid backtracking for the quantifier.

The root of the problem is that the regexp engine tries many combinations that are obviously wrong for a human.
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5

على سبيل المثال في نمط regexp `: (\ d +) * $` من الواضح للإنسان ، أن `النمط: +` لا يجب التراجع عنه. إذا استبدلنا نمطًا `` واحدًا: \ d + `بنمطين` منفصلين: \ d + \ d + `، فلن يتغير شيء:

``
\d+........
(123456789)!

\d+...\d+....
(1234)(56789)!
```

وفي المثال الأصلي `pattern: ^ (\ w + \ s؟) * $` قد نرغب في منع التراجع في `pattern: \ w +`. هذا هو: `النمط: \ w +` يجب أن يتطابق مع كلمة كاملة ، مع أقصى طول ممكن. ليست هناك حاجة لخفض عدد التكرارات في `النمط: \ w +` ، حاول تقسيمه إلى كلمتين `نمط: \ w + \ w +` وما إلى ذلك.

<<<<<<< HEAD
تدعم محركات التعبير العادية الحديثة محددات الكمية الملكية لذلك. إنهم مثل الجشعين ، لكنهم لا يتراجعون (لذلك هم في الواقع أبسط من المحددات الكمية العادية).
=======
Modern regular expression engines support possessive quantifiers for that. Regular quantifiers become possessive if we add `pattern:+` after them. That is, we use `pattern:\d++` instead of `pattern:\d+` to stop `pattern:+` from backtracking.

Possessive quantifiers are in fact simpler than "regular" ones. They just match as many as they can, without any backtracking. The search process without bracktracking is simpler.
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5

هناك أيضًا ما يسمى "مجموعات الالتقاط الذري" - وهي طريقة لتعطيل التراجع داخل الأقواس.

<<<<<<< HEAD
لسوء الحظ ، في JavaScript غير مدعومة. ولكن هناك طريقة أخرى.
=======
...But the bad news is that, unfortunately, in JavaScript they are not supported. 

We can emulate them though using a "lookahead transform".
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5

### انظروا إلى الإنقاذ!

<<<<<<< HEAD
يمكننا منع التراجع باستخدام lookahead.

النمط الذي يجب أن يتكرر من خلال "النمط: \ w" بقدر الإمكان بدون التراجع هو: "النمط: (؟ = (\ w +)) \ 1`.

دعونا نفكها:
- Lookahead `pattern:؟ =` يتطلع لأطول كلمة `pattern: \ w +` بدءًا من الموضع الحالي.
- محتويات الأقواس مع `النمط:؟ = ...` لا يحفظها المحرك ، لذا قم بتغليف `النمط: \ w +` بين قوسين. ثم يقوم المحرك بحفظ محتوياتها
- ... واسمح لنا بالإشارة إليها في النمط باسم "pattern: \ 1".
=======
So we've come to real advanced topics. We'd like a quantifier, such as `pattern:+` not to backtrack, because sometimes backtracking makes no sense.

The pattern to take as much repetitions of `pattern:\w` as possible without backtracking is: `pattern:(?=(\w+))\1`. Of course, we could take another pattern instead of `pattern:\w`.

That may seem odd, but it's actually a very simple transform.

Let's decipher it:

- Lookahead `pattern:?=` looks forward for the longest word `pattern:\w+` starting at the current position.
- The contents of parentheses with `pattern:?=...` isn't memorized by the engine, so wrap `pattern:\w+` into parentheses. Then the engine will memorize their contents
- ...And allow us to reference it in the pattern as `pattern:\1`.
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5

هذا هو: نحن نتطلع إلى المستقبل - وإذا كانت هناك كلمة `pattern: \ w +` ، فقم بمطابقتها كـ `pattern: \ 1`.

لماذا ا؟ ذلك لأن lookahead يعثر على كلمة `pattern: \ w +` ككل ونلتقطها في النمط بـ `pattern: \ 1`. لذا قمنا بتطبيق نمط امتلاك زائد `نمط: +` كمّي. يلتقط فقط الكلمة `نمط: \ w +` ، وليس جزءًا منها.

على سبيل المثال ، في كلمة `subject: JavaScript` ، قد لا تتطابق فقط مع` match: Java` ، ولكن تترك `match: Script` لتتطابق مع باقي النمط.

إليك مقارنة بين نمطين:

```js run
alert( "JavaScript".match(/\w+Script/)); // JavaScript
alert( "JavaScript".match(/(?=(\w+))\1Script/)); // null
```

1. في المتغير الأول `النمط: \ w +` يلتقط أولاً الكلمة `الموضوع: جافا سكريبت` ثم` النمط: + `يتراجع حرفًا بحرف ، في محاولة لمطابقة بقية النمط ، حتى ينجح في النهاية (عندما `pattern: \ w +` يتطابق مع `match: Java`).
2. في المتغير الثاني `النمط: (؟ = (\ w +))` يتطلع إلى الأمام ويجد كلمة `الموضوع: JavaScript` ، المضمنة في النمط ككل بواسطة` النمط: \ 1` ، لذلك لا يزال هناك لا توجد طريقة للعثور على "الموضوع: البرنامج النصي" بعده.

يمكننا وضع تعبير عادي أكثر تعقيدًا في `النمط: (؟ = (\ w +)) \ 1` بدلاً من` النمط: \ w` ، عندما نحتاج إلى منع التراجع عن `النمط: +` بعده.

```smart
هناك المزيد حول العلاقة بين محددات الكمية التملكية و lookahead في المقالات [Regex: Emulate Atomic Grouping (and Possessive Quantifiers) with LookAhead] (http://instanceof.me/post/52245507631/regex-emulate-atomic-grouping-with-lookahead ) و [محاكاة المجموعات الذرية] (http://blog.stevenlevithan.com/archives/mimic-atomic-groups).
``

دعونا نعيد كتابة المثال الأول باستخدام lookahead لمنع التراجع:

```js run
let regexp = /^((?=(\w+))\2\s?)*$/;

alert( regexp.test("A good string") ); // true

let str = "An input string that takes a long time or even makes this regex to hang!";

alert( regexp.test(str) ); // false, works and fast!
```

هنا يُستخدم "النمط: \ 2" بدلاً من "النمط: \ 1" ، نظرًا لوجود أقواس خارجية إضافية. لتجنب العبث بالأرقام ، يمكننا تسمية الأقواس ، على سبيل المثال `نمط :(؟ <word> \ w +)`.

```js run
// parentheses are named ?<word>, referenced as \k<word>
let regexp = /^((?=(?<word>\w+))\k<word>\s?)*$/;

let str = "An input string that takes a long time or even makes this regex to hang!";

alert( regexp.test(str) ); // false

alert( regexp.test("A correct string") ); // true
```

تسمى المشكلة الموضحة في هذه المقالة "التراجع الكارثي".

تناولنا طريقتين لكيفية حلها:
- أعد كتابة regexp لخفض عدد المجموعات الممكنة.
- منع التراجع.
