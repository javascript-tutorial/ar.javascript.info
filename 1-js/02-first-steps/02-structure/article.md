# بنية الشيفرة البرمجية
في هذا المقال، سنبدأ بتعلم أساسيات كتابة الشيفرة البرمجية في لغة JavaScript. هل أنت مستعد؟ لننطلق!

## التعابير البرمجية
التعابير البرمجية هي صياغة التراكيب والأوامر التي تنفذ الأعمال في السكربت. رأيت سابقًا التعبير البرمجي،
`alert('Hello, world!')‎`، الذي يُظهر الرسالة "Hello, world!‎".
بإمكانك استخدام تعابير بقدر ما تريد في شيفرتك البرمجية. ويمكن فصل التعابير البرمجية عن بعضها بالفاصلة المنقوطة
(`;`).
مثلًا، بإمكاننا فصل "Hello World" إلى تنبيهين منفصلين بالشكل التالي:

```
alert('Hello'); alert('World');
```

تُكتب التعابير البرمجية عادةً على أسطر منفصلة لتسهيل قراءة الشيفرة البرمجية:

```
alert('Hello');
alert('World');
```

## الفاصلة المنقوطة
يمكن حذف الفاصلة المنقوطة من آخر التعابير البرمجية في معظم الحالات عند الانتقال إلى سطر جديد. أي أن الشيفرة
البرمجية التالية ستعمل أيضًا بشكل صحيح:

```
alert('Hello')
alert('World')
```
تُفسِّر لغة JavaScript الانتقال إلى سطر جديد بفاصلة منقوطة (ضمنيًا). وهذا ما يُسمى (الاضافة التلقائية للفاصلة
المنقوطة [Automatic semicolon insertion]).

**في معظم الحالات، يتضمن السطر جديد فاصلةً منقوطةً افتراضية في آخره. ولكن هذا لا يشمل جميع الحالات.** هناك
حالات لا يحوي فيها السطر الجديد بالضرورة فاصلةً منقوطةً افتراضية. إليك مثلًا:

```
alert(3+
1
+2);
```
خرج الشيفرة البرمجية السابقة هو 6 لأنَّ لغة JavaScript لا تضيف الفاصلة المنقوطة في هذه الحالة. فمن البديهي أنه عند
انتهاء السطر بإشارة '+' يكون التعبير ناقصًا (incomplete expression)، وبالتالي لا يتطلب وجود فاصلة منقوطة.
لذلك، تعمل الشيفرة البرمجية كما هو مطلوب.
لا تعتمد دائمًا على javaScript لإضافة الفاصلة المنقوطة لأنه **توجد حالات تفشل فيها لغة JavaScript بإضافة
الفاصلة المنقوطة عندما تكون مطلوبة**. والأخطاء التي تحدث نتيجة هذه الحالات صعبة الإيجاد والإصلاح (ستكتشف ذلك
قريبًا خلال الشيفرات التي ستكتبها).
إذا كنت ترغب في الاطلاع على مثال واقعي عن هذه الحالة، إليك الشيفرة البرمجية التالية:

<<<<<<< HEAD
```
[1, 2].foreach(alert)
```
لا تقلق إن كانت هذه الشيفرة صعبة الفهم عليك، فليس هناك حاجة الآن لفهم معنى الأقواس المعقوفة `[]` أو التعبير البرمجي
`forEach`، فسندرسهم لاحقًا. ولكن أبقِ في ذهنك أن خرج هذه الشيفرة البرمجية هو إظهار 1 ثم 2.
سنضيف الآن تنبيهًا (alert) قبل الشيفرة البرمجية السابقة دون وضع الفاصلة المنقوطة في نهاية العبارة البرمجية:
```
alert("There will be an error")
[1 ,2].forEach(alert)
=======
The code outputs `6` because JavaScript does not insert semicolons here. It is intuitively obvious that if the line ends with a plus `"+"`, then it is an "incomplete expression", so a semicolon there would be incorrect. And in this case, that works as intended.

**But there are situations where JavaScript "fails" to assume a semicolon where it is really needed.**

Errors which occur in such cases are quite hard to find and fix.

````smart header="An example of an error"
If you're curious to see a concrete example of such an error, check this code out:

```js run
alert("Hello");

[1, 2].forEach(alert);
```

No need to think about the meaning of the brackets `[]` and `forEach` yet. We'll study them later. For now, just remember the result of running the code: it shows `Hello`, then `1`, then `2`.

Now let's remove the semicolon after the `alert`:

```js run no-beautify
alert("Hello")

[1, 2].forEach(alert);
>>>>>>> 53b35c16835b7020a0a5046da5a47599d313bbb8
```
عند تنفيذ الشيفرة البرمجية آنذاك، سيتم إظهار التنبيه الأول فقط ثم سنحصل على خطأ. تعود الشيفرة البرمجية للعمل بشكل
صحيح مرة أخرى عند إضافة الفاصلة المنقوطة بعد التنبيه الأول:

<<<<<<< HEAD
```
alert("All fine now");
[1 ,2].forEach(alert)
```

تظهر لدينا الآن الرسالة "All fine now"، ثم 1 و 2.
الخطأ الذي حدث في الحالة الأولى (حالة عدم إضافة الفاصلة المنقوطة)، سببه أنَّ لغة JavaScript لا تضيف الفاصلة
المنقوطة تلقائيًا عند الانتقال إلى سطر جديد في حال وجود الأقواس المعقوفة `[…]` في بداية هذا السطر. وبالتالي لن تُضاف
الفاصلة المنقوطة تلقائيًا في الحالة الأولى وسيتم التعامل مع الشيفرة البرمجية كعبارة برمجية واحدة. أي سيراها المحرك
بالشكل التالي:

```
alert("There will be an error")[1, 2].forEach(alert)
=======
The difference compared to the code above is only one character: the semicolon at the end of the first line is gone.

If we run this code, only the first `Hello` shows (and there's an error, you may need to open the console to see it). There are no numbers any more.

That's because JavaScript does not assume a semicolon before square brackets `[...]`. So, the code in the last example is treated as a single statement.

Here's how the engine sees it:

```js run no-beautify
alert("Hello")[1, 2].forEach(alert);
>>>>>>> 53b35c16835b7020a0a5046da5a47599d313bbb8
```
ولكنهما عبارتين برمجيتين منفصلتين وليستا عبارة واحدة، وبالتالي عملية الدمج في هذه الحالة خطأ. من الممكن أن تتكرر
هذه الحالة ضمن شروط أخرى.
بناءً على ما سبق، ننصحك بإضافة الفاصلة المنقوطة بين التعابير البرمجيَّة حتى لو قمت بفصلها بأسطر جديدة. وهذه هي
القاعدة الأكثر اتباعًا بين مستخدمي JavaScript. لنراجع سويةً ما ذُكر سابقًا، من الممكن الاستغناء عن الفاصلة المنقوطة
في معظم الحالات، ولكن من الأفضل إضافتها في آخر العبارة البرمجية - وخاصةً بالنسبة للمبتدئين - تجنبًا للوقوع في أخطاء
عصية التنقيح والتصحيح أنت بغنًى عنها.

## التعليقات
تصبح البرامج أكثر تعقيدًا مع مرور الوقت. ويكون ضروريًا إضافة التعليقات لشرح عمل الشيفرة البرمجية. يمكن وضع
التعليقات في أي مكان ضمن السكربت دون أن تؤثر على تنفيذه، لأنَّ المحرك ببساطة يتجاهل جميع التعليقات.
**التعليقات المكتوبة على سطر واحد تبدأ بخطين مائلين (forward slash) بالشكل `//`**. ويكون الجزء التالي للخطين
المائلين على نفس السطر تعليقًا. ومن الممكن أن يشغل التعليق سطرًا كاملًا أو يأتي التعليق بعد العبارة البرمجية.
إليك المثال التالي الذي يشرح ما سبق:

<<<<<<< HEAD
```
=======
Looks weird, right? Such merging in this case is just wrong. We need to put a semicolon after `alert` for the code to work correctly.

This can happen in other situations also.
````

We recommend putting semicolons between statements even if they are separated by newlines. This rule is widely adopted by the community. Let's note once again -- *it is possible* to leave out semicolons most of the time. But it's safer -- especially for a beginner -- to use them.

## Comments [#code-comments]

As time goes on, programs become more and more complex. It becomes necessary to add *comments* which describe what the code does and why.

Comments can be put into any place of a script. They don't affect its execution because the engine simply ignores them.

**One-line comments start with two forward slash characters `//`.**
>>>>>>> 53b35c16835b7020a0a5046da5a47599d313bbb8

// يمتد هذا التعليق على كامل السطر فقط

alert('Hello');
alert('World'); // هذا تعليق يلي تعبيرًا برمجيًّا
```
**وإن أردت كتابة تعليقات تمتد على عدَّة أسطر، فابدأ التعليق متعدد الأسطر بخط مائل يليه رمز النجمة (أي `‎/*‎`) ، وأنهِ
التعليق برمز النجمة ثم الخط المائل (أي `‎*/‎`) **. إليك المثال التالي:

```
/* يُظهر هذا المثال تنبيهين

وهذا التعليق متعدد
الأسطر
*/
alert('Hello');
alert('World');
```
يجري تجاهل كل ما يقع داخل التعليق متعدد الأسطر، وبالتالي لا تُنفَّذ أية شيفرة برمجية موجودة داخل `/*…*/`.
أحيانًا، يكون من المفيد إلغاء تفعيل جزء من الشيفرة البرمجية مؤقتًا أثناء تنقيح الأخطاء:

```
/* تعليق جزء من الشيفرة
alert('Hello');
*/
alert('World');
```

### استخدام الاختصارات
من الممكن تعليق سطر واحد من الشيفرة البرمجية بالضغط على الاختصار Ctrl+/‎ في معظم المُحرِّرات وبيئات التطوير.
ومن أجل التعليقات متعددة الأسطر من الممكن استخدام الاختصار Ctrl+Shift+/، (عليك أن تحدد جزءًا من الشيفرة
البرمجية ثم الضغط على الاختصار). في الأجهزة التي تعمل على الماك، جرّب Cmd عوضًا عن Ctrl.

**تحذير:** التعليقات المتداخلة متعددة الأسطر غير مدعومة. أي لا يمكنك وضع `/*…*/` داخل
`/*…*/` آخر، إذ ستنتهي هذه الشيفرة البرمجية بخطأ:

```
/*
/*تعليق متشعب*/
*/
alert('World');
```
لا تتردد أبدًا في وضع التعليقات ضمن شيفرتك البرمجية وشرح ما الذي يجري فيها لأنك عندما تعود إليها لاحقًا، ستجد غالبًا
أنك نسيت وظيفة كل جزء من شيفرتك.

قد تزيد التعليقات من حجم الشيفرة ولكن هذه ليست بمشكلة. هناك العديد من الأدوات التي تُقلِّص الشيفرة البرمجية قبل نشرها
على خادم الإنتاج، إذ تَحذِف التعليقات من السكربت نهائيًّا ولا يبقَ لها بذلك أي أثر. في تلك الحالة، لا يكون للتعليقات أي آثار
سلبية عند الإنتاج. لا تقلق مرة أخرى إن لم تتضح لك الصورة ولم تفهم بعض المصطلحات (مثل ما الذي يقصد بالإنتاج) فكل
شيء سيتضح تدريجيًّا.
لاحقًا في هذه السلسلة التعليمية، سيكون هناك فصل عن جودة الشيفرة البرمجية والذي يشرح طريقة كتابة التعليقات بشكل
أفضل.

ترجمة -وبتصرف- للفصل [Code structure](https://javascript.info/structure) من كتاب [The
JavaScript Language](https://javascript.info/js)