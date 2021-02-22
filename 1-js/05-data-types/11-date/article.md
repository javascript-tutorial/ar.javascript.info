
# النوع Date: التاريخ والوقت



حان وقت الحديث عن كائن آخر مضمّن في اللغة: التاريخ [`Date`](https://wiki.hsoub.com/JavaScript/Date). يخزّن هذا الكائن التاريخ والوقت ويقدّم توابِع تُدير أختام التاريخ والوقت. يمكننا مثلًا استعماله لتخزين أوقات الإنشاء/التعديل أو حساب الوقت أو طباعة التاريخ الحالي في الطرفية.

## الإنشاء

استدعِ `new Date()‎` بتمرير واحدًا من الوُسطاء الآتية فتصنع كائن `Date` جديد:

`new Date()`
: بلا وُسطاء: يُنشئ كائن `Date` بالتاريخ والوقت الحاليين

```
    let now = new Date();
    alert( now ); // نعرض التاريخ والوقت الحاليين
```

إليك كيفية إنشاء كائن `Date`:
*`new Date(milliseconds)‎`*
يُنشئ كائن `Date` إذ تساوي قيمته عدد المليثوان الممرّرة (المليثانية هي 1/1000 من الثاني) حسابًا من بعد الأول من يناير عام ١٩٧٠ بتوقيت UTC+0.

```
    // UTC+0
    // 01.01.1970 نعني بـ 0 التاريخ
    let Jan01_1970 = new Date(0);
    alert( Jan01_1970 );

    // نضيف الآن 24 ساعة لنحصل على  02.01.1970 
    let Jan02_1970 = new Date(24 * 3600 * 1000);
    alert( Jan02_1970 );
```


يُسمّى العدد الصحيح الذي يمثّل عدد المليثوان التي مرّت من بداية عام 1970 *بالختم الزمني* (بصمة وقت). وهو يمثّل التاريخ بنحوٍ عددي خفيف (lightweight). يمكننا إنشاء التواريخ من الأختام الزمنية باستعمال `new Date(timestamp)‎` وتحويل كائن التاريخ `Date` الموجود إلى ختم زمني باستعمال التابِع `date.getTime()‎` (طالع أسفله).

والتواريخ قبل الأول من يناير 1970 أختامها سالبة:
```
    // ‫31 ديسمبر 1969
    let Dec31_1969 = new Date(-24 * 3600 * 1000);
    alert( Dec31_1969 );
```

*`new Date(datestring)‎`*
لو كان هناك وسيط واحد وكان سلسلة نصيّة، فسيحلّله المحرّك تلقائيًا. الخوازرمية هنا هي ذات التي يستعملها `Date.parse`. لا تقلق، سنتكلم عنه لاحقًا.

```
    let date = new Date("2017-01-26");
    alert(date);
```
نجد في هذا المثال أن الوقت غير محدد لذا يكون بتوقيت GMT منتصف الليل، ويحدد وفقًا للمنطقة الزمنية التي تنفذ الشيفرة ضمنها، فالنتيجة يمكن أن تكون Thu Jan 26 2017 11:00:00 للبلدان ذات المنطقة الزمنية GMT+1100 أو يمكن أن تكون Wed Jan 25 2017 16:00:00 للبلدان الواقعة في المنطقة الزمنية GMT-0800.

*`new Date(year, month, date, hours, minutes, seconds, ms)‎`*
يُنشئ تاريخًا بالمكوّنات الممرّرة حسب المنطقة الزمنية المحلية. أوّل وسيطين إلزاميين أما البقية اختيارية.


يجب أن يكون العام `year` بأربع خانات: `2013` صح، `98` خطأ.
يبدأ الشهر `month` بالرقم `0` (يناير) وينتهي بالعدد `11` (ديسمبر).
مُعامل التاريخ `date` هو رقم اليوم من الشهر. لو لم يكن موجودًا فسيعدّه الكائن `1`.
لو لم تكن مُعاملات الساعة والدقيقة والثانية والمليثانية `hours/minutes/seconds/ms` موجودة، فسيعدّها الكائن `0`.


مثال:

```
    new Date(2011, 0, 1, 0, 0, 0, 0); // 1 Jan 2011, 00:00:00
    new Date(2011, 0, 1); // نفس تلك. الساعات والدقائق وغيرها 0 مبدئيًا
```


    أدنى دقّة للتاريخ هي مليثانية واحدة (واحد من ألف من الثانية):

```
    let date = new Date(2011, 0, 1, 2, 3, 4, 567);
    alert( date ); // 1.01.2011, 02:03:04.567
```


## الوصول إلى مكوّنات التاريخ


إليك التوابِع التي تتيح لك الوصول إلى العام والشهر وغيرها داخل كائن `Date`:

- [getFullYear()‎](https://wiki.hsoub.com/JavaScript/Date/getFullYear): يجلب العام (٤ خانات)

- [getMonth()‎](https://wiki.hsoub.com/JavaScript/Date/getMonth): يجلب الشهر، **من 0 إلى 11**.

- [getDate()‎](https://wiki.hsoub.com/JavaScript/Date/getDate): يجلب رقم اليوم من الشهر، من 1 إلى 31. قد يبدو الاسم غريبًا قليلًا لك.

- التوابع [getHours()‎](https://wiki.hsoub.com/JavaScript/Date/getHours) و[getMinutes()‎](https://wiki.hsoub.com/JavaScript/Date/getMinutes) و[getSeconds()‎](https://wiki.hsoub.com/JavaScript/Date/getSeconds) و[getMilliseconds()‎](https://wiki.hsoub.com/JavaScript/Date/getMilliseconds)
: تجلب مكوّنات الوقت حسب كل تابِع. (الساعة/الدقيقة/الثانية/المليثانية)

**إياك بـ `getYear()‎` بل `getFullYear()‎`**
تقدّم الكثير من محرّكات جافاسكربت التابِع غير القياسي `getYear()‎`. هذا التابِع أصبح بائدًا، فهو يُعيد العام بخانتين أحيانًا. من فضلك لا تستعمله أبدًا، بل `getFullYear()‎` لتجلب العام.

كما يمكن أيضًا جلب رقم اليوم من الشهر:

*[getDay()‎](https://wiki.hsoub.com/JavaScript/Date/getDay)*
يجلب رقم اليوم من الأسبوع، بدءًا بِـ `0` (الأحد) وحتى `6` (السبت). أوّل يوم هو الأحد دومًا. صحيح أنّ في بعض الدول هذا غير صحيح، لكن لا يمكن تغيير القيمة إطلاقًا.


**تُعيد كلّ التوابِع أعلاه المكوّنات حسب المنطقة الزمنية المحلية.**


توجد أيضًا مثيلاتها بنظام UTC حيث تُعيد اليوم والشهر والعام وغيرها في المنطقة الزمنية UTF+0:‏ [getUTCFullYear()‎](https://wiki.hsoub.com/JavaScript/Date/getUTCFullYear) و[getUTCMonth()‎](https://wiki.hsoub.com/JavaScript/Date/getUTCMonth) و[getUTCDay()‎](https://wiki.hsoub.com/JavaScript/Date/getUTCDay). ضع كلمة `"UTC"` بعد `"get"` وستجد المثيل المناسب.


لو كانت منطقتك الزمنية المحلية بعيدة عن UTC، فستعرض الشيفرة أدناه الساعات مختلفة عن بعضها البعض:

```
// التاريخ الحالي
let date = new Date();

// الساعة حسب المنطقة الزمنية التي أنت فيها
alert( date.getHours() );

// ‫الساعة حسب المنطقة الزمنية بتوقيت UTC+0 (أي توقيت لندن بدون التوقيت الصيفي)
alert( date.getUTCHours() );
```


هناك (إضافةً إلى هذه التوابِع) تابِعان آخران مختلفان قليلًا ليس لهما نُسخ بتوقيت UTC:

*[getTime()‎](https://wiki.hsoub.com/JavaScript/Date/getTime)*
يُعيد ختم التاريخ الزمني، أي عدد المليثوان التي مرّت منذ الأول من يناير عام 1970 بتوقيت UTC+0.

*[getTimezoneOffset()‎](https://wiki.hsoub.com/JavaScript/Date/getTimezoneOffset)*
يُعيد الفرق بين المنطقة الزمنية الحالية وتوقيت UTC (بالدقيقة):

```
    // ‫لو كانت منطقتك الزمنية UTC-1، فالناتج 60
    // لو كانت منطقتك الزمنية ‫UTC+3، فالناتج ‎-180
    alert( new Date().getTimezoneOffset() );

```


## ضبط مكوّنات التاريخ

تتيح لك التوابِع الآتية ضبط مكوّنات التاريخ والوقت:

- العام: [`setFullYear(year, [month], [date])‎`](https://wiki.hsoub.com/JavaScript/Date/setFullYear)
- الشهر: [`setMonth(month, [date])‎`](https://wiki.hsoub.com/JavaScript/Date/setMonth)
- التاريخ: [`setDate(date)‎`](https://wiki.hsoub.com/JavaScript/Date/setDate)
- الساعة: [`setHours(hour, [min], [sec], [ms])‎`](https://wiki.hsoub.com/JavaScript/Date/setHours)
- الدقيقة: [`setMinutes(min, [sec], [ms])‎`](https://wiki.hsoub.com/JavaScript/Date/setMinutes)
- الثانية: [`setSeconds(sec, [ms])‎`](https://wiki.hsoub.com/JavaScript/Date/setSeconds)
- المليثانية: [`setMilliseconds(ms)‎`](https://wiki.hsoub.com/JavaScript/Date/setMilliseconds)
- الوقت بالمليثانية: [`setTime(milliseconds)‎`](https://wiki.hsoub.com/JavaScript/Date/setTime) (تضبط التاريخ كلّه حسب عدد المليثوان منذ 01.01.1970 UTC)


لدى كلّ تابع منها نسخة بتوقيت UTC (عدا `setTime()‎`). مثال: `setUTCHours()‎`.

كما رأيت فيمكن لبعض التوابِع ضبط عدّة مكوّنات في آن واحد مثل `setHours`. المكوّنات التي لا تُمرّر لا تُعدّل.

مثال:

```
let today = new Date();

today.setHours(0);
alert(today); // ما زال اليوم نفسه، ولكن الساعة تغيّرت إلى 0

today.setHours(0, 0, 0, 0);
alert(today); // ما زال اليوم نفسه، ولكنّا عند 00:00:00 تمامًا.
```


## التصحيح التلقائي


ميزة *التصحيح التلقائي* في كائنات التواريخ `Date` مفيدة جدًا لنا، إذ يمكن أن نضع قيم تاريخ لامنطقية (مثل الخمسون من هذا الشهر) وسيُعدّلها الكائن بنفسه.

مثال:

```
let date = new Date(2013, 0, 32); // ‫الثاني والثلاثين من يناير 2013؟!
alert(date); // ‫...آه، تقصد الأول من فبراير 2013!
```

تترتّب المكوّنات اللامنطقية تلقائيًا. فمثلًا لو أضفت على التاريخ ”28 فبراير 2016“ يومين اثنين، فيمكن أن يكون ”الثاني من مارس“ أو ”الأول من مارس“ لو كانت السنة كبيسة. بدل أن نفكّر بهذا الحساب، نُضيف يومين ونترك الباقي على كائن `Date`:

```
let date = new Date(2016, 1, 28);
date.setDate(date.getDate() + 2);

alert( date ); // ‫1 مارس 2016
```


غالبًا ما تُستعمل هذه الميزة لنجلب التاريخ بعد فترة محدّدة من الزمن. فلنقل مثلًا نريد تاريخ ”70 ثانية من الآن“:

```
let date = new Date();
date.setSeconds(date.getSeconds() + 70);

alert( date ); // يعرض التاريخ الصحيح
```
يمكننا أيضًا ضبط القيمة لتكون صفرًا أو حتّى بالسالب. مثال:

```
let date = new Date(2016, 0, 2); // ‫2 يناير 2016

date.setDate(1); // نضبط التاريخ على أول يوم من الشهر
alert( date );

date.setDate(0); // أقل يوم ممكن هو 1، إذًا فيعدّ الكائن أنّ 0 هو آخر يوم من الشهر الماضي
alert( date ); // ‫31 ديسمبر 2015
```


## تحويل التاريخ إلى عدد، والفرق بين تاريخين

حين يتحوّل كائن `Date` إلى عدد يصير ختمًا زمنيًا مطابقًا لختم `date.getTime()‎`:

```
let date = new Date();
alert(+date); // ‫عدد المليثوان، نفس ناتج date.getTime()‎
```


تأثير هذا المهم والخطير هو أنّك تستطيع طرح التواريخ من بعض، والناتج سيكون الفرق بينهما بالمليثانية. يمكن استعمال الطرح لحساب الأوقات:

```
let start = new Date(); // نبدأ قياس الوقت

// إلى العمل
for (let i = 0; i < 100000; i++) {
  let doSomething = i * i * i;
}

let end = new Date(); // ننتهي من قياس الوقت

alert( `The loop took ${end - start} ms` );
```

## التاريخ الآن

لو أردنا قياس الوقت فقط فلا نحتاج كائن `Date`، بل هناك تابِعًا خاصًا باسم `Date.now()‎` يُعيد لنا الختم الزمني الحالي.

يُكافئ هذا التابِع الجملةَ `new Date().getTime()‎` إلّا أنّه لا يُنشئ كائن `Date` يتوسّط العملية، ولهذا هو أسرع ولا يزيد الضغط على عملية كنس المهملات. غالبًا ما يُستعمل التابِع لأنّه أسهل أو لأنّ الأداء في تلك الحالة مهم، مثلما في الألعاب بلغة جافاسكربت أو التطبيقات المتخصّصة الأخرى.

ولهذا قد يكون الأفضل كتابة الشيفرة أدناه بدل تلك:

```
let start = Date.now(); // ‫تبدأ المليثوان من تاريخ 1 يناير 1970

// إلى العمل
for (let i = 0; i < 100000; i++) {
  let doSomething = i * i * i;
}

*!*
let end = Date.now(); // انتهينا
*/!*

alert( `The loop took ${end - start} ms` ); // نطرح الأعداد لا التواريخ
```

## قياس الأداء

لو أردنا قياس أداء دالة شرهة في استعمال المعالج، فعلينا أن نكون حذرين، هذا لو أردنا التعويل على القياس.

فلنقيس مثلًا دالتين اثنتين تحسبان الفرق بين تاريخين: أيهما أسرع؟ نُطلق على قياسات الأداء هذه... قياسات أداء ”Benchmark“.

```
// ‫أمامنا date1 وdate2، أيّ دالة ستُعيد الفرق بينهما (بالمليثانية) أسرع من الأخرى؟‫ هذه...
function diffSubtract(date1, date2) {
  return date2 - date1;
}

// ‫أم هذه...
function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}
```

وظيفة الدالتين متطابقة تمامًا، إلّا أن الثانية تستعمل التابِع `date.getTime()‎` الصريح لتجلب التاريخ بالمليثانية، بينما الأخرى تعتمد على تحويل التاريخ إلى عدد. الناتج متطابق دومًا.

إذًا بهذه المعطيات، أيّ الدالتين أسرع؟

أوّل فكرة تخطر على البال هو تشغيل كلّ واحدة مرات عديدة متتابعة وقياس فرق الوقت. الدوال (في حالتنا هذه) بسيطة جدًا، ولهذا علينا تشغيل كلّ واحدة مئة ألف مرة على الأقل.

هيًا نقيس الأداء:

```
function diffSubtract(date1, date2) {
  return date2 - date1;
}

function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}

function bench(f) {
  let date1 = new Date(0);
  let date2 = new Date();

  let start = Date.now();
  for (let i = 0; i < 100000; i++) f(date1, date2);
  return Date.now() - start;
}

alert( 'Time of diffSubtract: ' + bench(diffSubtract) + 'ms' );
alert( 'Time of diffGetTime: ' + bench(diffGetTime) + 'ms' );
```

عجبًا! استعمال التابِع `getTime()‎` أسرع بكثير! يعزو ذلك بسبب انعدام وجود تحويل للنوع (type conversion)، وهذا يسهّل على المحرّكات تحسين الأداء.

جميل، وصلنا إلى شيء، ولكنّ هذا القياس ليس قياسًا طيبًا بعد. تخيّل أنّ المعالج كان ينفّذ أمرًا ما بالتوازي مع تشغيل `bench(diffSubtract)‎` وكان يستهلك الموارد، وما إن شغّلنا `bench(diffGetTime)‎` كان ذلك الأمر قد اكتمل. هذا التخيّل هو تخيّل طبيعي لأمر واقعيّ جدًا حيث اليوم أنظمة التشغيل متعدّدة المهام. بهذا يكون لمرة القياس الأولى موارد معالجة أقل من المرة الثانية، ما قد يؤدّي إلى نتائج قياس خطأ.

**إن أردنا التعويل على قياس الأداء، علينا إعادة تشغيل كل قياسات الأداء الموجودة أكثر من مرّة.** هكذا مثلًا:

```
function diffSubtract(date1, date2) {
  return date2 - date1;
}

function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}

function bench(f) {
  let date1 = new Date(0);
  let date2 = new Date();

  let start = Date.now();
  for (let i = 0; i < 100000; i++) f(date1, date2);
  return Date.now() - start;
}

let time1 = 0;
let time2 = 0;

// ‫نشغّل bench(upperSlice)‎ وbench(upperLoop)‎ عشر مرات مرّة بمرّة
for (let i = 0; i < 10; i++) {
  time1 += bench(diffSubtract);
  time2 += bench(diffGetTime);
}

alert( 'Total time for diffSubtract: ' + time1 );
alert( 'Total time for diffGetTime: ' + time2 );
```

لا تبدأ محرّكات جافاسكربت الحديثة بتطبيق التحسينات المتقدّمة إلّا على ”الشيفرات الحرجة“ التي تتنفّذ أكثر من مرّة (لا داعٍ بتحسين شيفرة نادرة التنفيذ). بهذا في المثال الأول، قد لا تكون مرات التنفيذ الأولى محسّنة كما يجب، وربما علينا إضافة تحمية سريعة:

```
// أضفناه لـ”تحمية“ المحرّك قبل الحلقة الأساس
bench(diffSubtract);
bench(diffGetTime);

// الآن نقيس
for (let i = 0; i < 10; i++) {
  time1 += bench(diffSubtract);
  time2 += bench(diffGetTime);
}
```

**الزم الحذر متى ما أجريت قياسات أداء على المستوى الذرّي**.

تُنفّذ محرّكات جافاسكربت الحديثة عددًا كبيرًا من التحسينات، وقد تُغيّر نتائج ”الاختبارات الصناعية“ موازنةً ”بالاستعمال الطبيعي لها“، خصوصًا حين نقيس أداء ما هو صغير للغاية مثل طريقة عمل مُعامل رياضي، أو دالة مضمّنة في اللغة نفسها. لهذا، لو كنت تريد حقًا فهم الأداء كما يجب، فمن فضلك تعلّم طريقة عمل محرّك جافاسكربت. حينها ربّما لن تحتاج هذه القياسات على المستوى الذرّي، أبدًا.

يمكنك أن تقرأ بعض المقالات الرائعة حول V8 هنا [http://mrale.ph](mrale.ph).

## تحليل سلسلة نصية باستعمال Date.parse

يمكن أن يقرأ التابِع [Date.parse(str)](https://wiki.hsoub.com/JavaScript/Date/parse) تاريخًا من سلسلة نصية. يجب أن يكون تنسيق تلك السلسلة هكذا: `YYYY-MM-DDTHH:mm:ss.sssZ`، إذ تعني:

- `YYYY-MM-DD` -- التاريخ: اليوم-الشهر-العام.
- يُستعمل المحرف `"T"` فاصِلًا.
- `HH:mm:ss.sss` -- الوقت: المليثانية والثانية والدقيقة والساعة.
- يمثّل الجزء الاختياري `'Z'` المنطقة الزمنية حسب التنسيق `+-hh:mm`. لو وضعت `Z` فقط فذلك يعني UTC+0.

يمكنك أيضًا استعمال تنسيقات أقصر مثل `YYYY-MM-DD` أو `YYYY-MM` أو حتّى `YYYY`.

باستدعاء `Date.parse(str)` فالسلسلة النصية تُحلّل حسب التنسيق فيها ويُعيد التابِع الختم الزمني (رقم المليثوان منذ الأول من يناير 1970 بتوقيت UTC+0). لو كان التنسيق غير صحيح فيُعيد `NaN`.

إليك مثالًا:

```
let ms = Date.parse('2012-01-26T13:51:50.417-07:00');

alert(ms); // ‫1327611110417 (ختم زمني)
```

يمكننا إنشاء كائن `new Date` مباشرةً من الختم الزمني:

```
let date = new Date( Date.parse('2012-01-26T13:51:50.417-07:00') );

alert(date);  
```

## ملخص

- يُمثّل التاريخ والوقت في جافاسكربت بكائن [Date](https://wiki.hsoub.com/JavaScript/Date). لا يمكننا إنشاء ”تاريخ فقط“ أو ”وقتًا فقط“، فعلى كائنات التاريخ `Date` احتواء الاثنين معًا.
- تُعدّ الأشهر بدءًا بالصفر (يناير هو الشهر صفر، نعم).
- يُعدّ رقم اليوم من الأسبوع في `getDay()‎` من الصفر أيضًا (وهو يوم الأحد).
- يصحّح كائن التاريخ نفسه تلقائيًا حين تُضبط مكوّناته بقيم لا منطقية. يفيدنا لجمع/طرح الأيام والأشهر والأعوام.
- يمكن طرح التواريخ ومعرفة الفرق بينها بالمليثانية، ذلك لأنّ كائن التاريخ يتحوّل إلى ختم زمني حين يتحوّل إلى عدد.
- استعمل `Date.now()` لو أردت جلب الختم الزمني الحالي بسرعة.

لاحظ بأنّ الأختام الزمنية في جافاسكربت هي بالمليثانية، على العكس من أنظمة عديدة أخرى.

نجد نفسنا بين الحين والآخر قياسات وقت دقيقة. للأسف فلا توفّر جافاسكربت نفسها طريقة لحساب الوقت بالنانوثانية (1 على مليون من الثانية)، ولكن أغلب بيئاتها توفّر ذلك. فمثلًا تملك المتصفّحات التابِع [performance.now()‎](https://developer.mozilla.org/en-US/docs/Web/API/Performance/now) إذ يُعيد عدد المليثوان منذ بدأ تحميل الصفحة بقدّة تصل إلى المايكروثانية (ثلاث خانات بعد الفاصلة):

```
alert(`Loading started ${performance.now()}ms ago`);
// ت‫ظهر هكذا: "Loading started 34731.26000000001ms ago"
```
تعني ”‎.26“ هنا المايكروثوان (260 مايكروثانية)، فلو زِدت على ثلاث خانات بعد الفاصلة فستجد أخطاءً في دقّة الحساب. أوّل ثلاثة هي الصحيحة فقط.

تملك لغة Node.js أيضًا وحدة `microtime` وأخرى غيرها. يمكن (تقنيًا) لأيّ جهاز أو بيئة أن تعطينا دقّة وقت أعلى، `Date` لا تقدّم ذلك لا أكثر.

## تمارين
### إنشاء تاريخ
_الأهمية: 5_

أنشِئ كائن `Date` لهذا التاريخ: 20 فبراير 2012، 3:12 صباحًا. المنطقة الزمنية هي المحلية. اعرض التاريخ باستعمال `alert`.

#### الحل
يستعمل مُنشِئ `new Date` المنطقة الزمنية الحالية. عليك ألا تنسى بأنّ الأشهر تبدأ من الصفر.

إذًا ففبراير هو الشهر رقم 1.

```
let d = new Date(2012, 1, 20, 3, 12);
alert( d );
```

### اعرض اسم اليوم من الأسبوع
_الأهمية: 5_

اكتب دالة `getWeekDay(date)` تعرض اسم اليوم من الأسبوع بالتنسيق الإنكليزي القصير: 'MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'.

مثال:

```
let date = new Date(2012, 0, 3);  // ‫3 يناير 2012
alert( getWeekDay(date) );        // ي‫جب أن يطبع "TU"
```

#### الحل
يُعيد التابِع `date.getDay()‎` رقم اليوم من الأسبوع، بدءًا من يوم الأحد.

لنصنع مصفوفة فيها أيام الأسبوع لنعرف اليوم الصحيح من رقمه:

```
function getWeekDay(date) {
  let days = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

  return days[date.getDay()];
}

let date = new Date(2014, 0, 3); // ‫3 يناير 2014
alert( getWeekDay(date) ); // FR
```

### اليوم من الأسبوع في أوروبا

_الأهمية: 4_

في الدول الأوروبية، يبدأ الأسبوع بيوم الإثنين (رقم 1) وثمّ الثلاثاء (رقم 2) وحتّى الأحد (رقم 7). اكتب دالة `getLocalDay(date)` تُعيد يوم الأسبوع ”الأوروبي“ من التاريخ `date`.

```
let date = new Date(2012, 0, 3);  // ‫3 يناير 2012
alert( getLocalDay(date) );       // يكون يوم ثلاثاء، يجب أن تعرض 2
```

#### الحل

```
function getLocalDay(date) {

  let day = date.getDay();

  if (day == 0) { 
    // يوم الأحد 0 في أوروبا هو الأخير (7)‏
    day = 7;
  }

  return day;
}
```

### ما هو التاريخ الذي كان قبل كذا يوم؟
_الأهمية: 4_

أنشِئ دالة `getDateAgo(date, days)` تُعيد بتمرير التاريخ `date` اسم اليوم من الشهر قبل فترة `days` يوم.

مثال: لو كان اليوم العشرون من الشهر، فتُعيد `getDateAgo(new Date(),1 )‎` التاسع عشر و`getDateAgo(new Date(), 2)‎` الثامن عشر.

يجب أن نعوّل بأن تعمل الدالة في حال `days=356` وأكثر حتّى:

```
let date = new Date(2015, 0, 2);

alert( getDateAgo(date, 1) ); // ‫1، (1 يناير 2015)
alert( getDateAgo(date, 2) ); // ‫31، (31 ديسمبر 2014)
alert( getDateAgo(date, 365) ); // ‫2، (2 يناير 2014)
```

ملاحظة: يجب ألّا تُعدّل الدالة التاريخ `date` المُمرّر.

#### الحل
الفكرة بسيطة، أن نطرح عدد الأيام من التاريخ `date`:

```
function getDateAgo(date, days) {
  date.setDate(date.getDate() - days);
  return date.getDate();
}
```

ولكن... يجب ألّا تُعدّل الدالة على `date`. هذا مهم إذ أنّ الشيفرة خارج الدالة التي تُعطينا التاريخ لا تريد منّا تغييره. لننفّذ ذلك، علينا نسخ التاريخ هكذا أولًا:

```
function getDateAgo(date, days) {
  let dateCopy = new Date(date);

  dateCopy.setDate(date.getDate() - days);
  return dateCopy.getDate();
}

let date = new Date(2015, 0, 2);

alert( getDateAgo(date, 1) ); // ‫1، (1 يناير 2015)
alert( getDateAgo(date, 2) ); // ‫31، (31 ديسمبر 2014)
alert( getDateAgo(date, 365) ); // ‫2، (2 يناير 2014)
```

### آخر يوم من الشهر كذا؟
_الأهمية: 5_

اكتب دالة `getLastDayOfMonth(year, month)` تُعيد آخر يوم من الشهر. أحيانًا يكون الثلاثين، أو الحادي والثلاثين أو الثامن/التاسع عشر من فبراير.

المُعاملات:

- `year` -- العام بأربع خانات، مثلًا 2012.
- `month` -- الشهر من 0 إلى 11.

مثال: `getLastDayOfMonth(2012, 1) = 29` (سنة كبيسة، فبراير).

#### الحل

فلنصنع تاريخًا باستعمال الشهر التالي، ولكنّ نمرّر الصفر ليكون رقم اليوم:
```
function getLastDayOfMonth(year, month) {
  let date = new Date(year, month + 1, 0);
  return date.getDate();
}

alert( getLastDayOfMonth(2012, 0) ); // 31
alert( getLastDayOfMonth(2012, 1) ); // 29
alert( getLastDayOfMonth(2013, 1) ); // 28
```

عادةً ما تبدأ التواريخ بالواحد، لكن يمكننا (تقنيًا) تمرير أيّ عدد وسيُعدّل التاريخ نفسه. لذا حين نمرّر 0 نعني بذلك ”يومًا واحد قبل الأول من الشهر“، أي ”اليوم الأخير من الشهر الماضي“.

### كم من ثانية مضت اليوم؟
_الأهمية: 5_

اكتب دالة `getSecondsToday()‎` تُعيد عدد الثواني منذ بداية هذا اليوم. فمثلًا لو كانت الساعة الآن `10:00 am`، وبدون التوقيت الصيفي، فستعطينا الدالة:

```
getSecondsToday() == 36000 // (3600 * 10)
```

يجب أن تعمل الدالة مهما كان اليوم. أيّ ألا تحتوي على قيمة داخلها بتاريخ ”اليوم“... اليوم.

#### الحل
لنعرف عدد الثواني يمكننا توليد تاريخًا باستعمال اليوم الحالي والساعة 00:00:00، وثمّ نطرح منها ”الوقت والتاريخ الآن“. سيكون الفرق حينها بعدد المليثوان منذ بداية هذا اليوم، فنقسمه على 1000 لنعرف الثواني فقط:

```
function getSecondsToday() {
  let now = new Date();

  // أنشِئ كائنًا باستعمال اليوم والشهر والسنة حاليًا
  let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  let diff = now - today; // الفرق بالمليثانية
  return Math.round(diff / 1000); // نحوّله إلى ثوان
}

alert( getSecondsToday() );
```

الحل الآخر هو جلب الساعة والدقيقة والثانية وتحويلها إلى عدد الثواني:

```
function getSecondsToday() {
  let d = new Date();
  return d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();
}
```

## كم من ثانية بقت حتّى الغد؟
_الأهمية: 5_

أنشِئ دالة `getSecondsToTomorrow()‎` تُعيد عدد الثواني حتّى يحلّ الغد. فمثلًا لو كان الوقت الآن `23:00`، تُعيد لنا:

```
getSecondsToTomorrow() == 3600
```

ملاحظة: يجب أن تعمل الدالة مهما كان اليوم، وألا تعتبر ”اليوم“ هذا اليوم.

#### الحل
لنعرف عدد المليثوان حتّى قدوم الغد، يمكننا أن نطرح من ”الغد 00:00:00“ التاريخ اليوم. أوّلًا، نولّد هذا ”الغد“ وثمّ ننفّذ الطرح:

```
function getSecondsToTomorrow() {
  let now = new Date();

  // تاريخ الغد
  let tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate()+1);

  let diff = tomorrow - now; // الفرق بالمليثانية
  return Math.round(diff / 1000); // نحوّله إلى ثوان
}
```

حل بديل:

```
function getSecondsToTomorrow() {
  let now = new Date();
  let hour = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let totalSecondsToday = (hour * 60 + minutes) * 60 + seconds;
  let totalSecondsInADay = 86400;

  return totalSecondsInADay - totalSecondsToday;
}
```

لاحظ أنّ هناك دولًا كثيرة تستعمل التوقيت الصيفي، لذا ستجد هناك أيام فيها 23 أو 25 ساعة. يمكن أن نتعامل مع هذه الأيام بنحوٍ منفصل.

### تنسيق التاريخ نسبيًا
_الأهمية: 4_

اكتب دالة `formatDate(date)` تُنسّق التاريخ `date` حسب الآتي:

- لو مرّت أقلّ من ثانية من `date`، فتُعيد `"right now"`.
- وإلّا، لو مرّت أقلّ من دقيقة من `date`، فتُعيد `"n sec. ago"`.
- وإلّا، لو أقل من ساعة، فتُعيد `"m min. ago"`.
- وإلّا، فتُعيد التاريخ كاملًا بالتنسيق `"DD.MM.YY HH:mm"`، أي (شَكلًا): `الدقيقة:الساعة العام:الشهر:اليوم` (كلها بخانتين). مثل: `31.12.16 10:00`.

أمثلة:

```
alert( formatDate(new Date(new Date - 1)) ); // "right now"

alert( formatDate(new Date(new Date - 30 * 1000)) ); // "30 sec. ago"

alert( formatDate(new Date(new Date - 5 * 60 * 1000)) ); // "5 min. ago"

// ‫تاريخ الأمس، مثلًا ‎31.12.16, 20:00
alert( formatDate(new Date(new Date - 86400 * 1000)) );
```

#### الحل
لنجلب الوقت المنقضي منذ `date` وحتّى الآن، سنطرح التاريخين.

```
function formatDate(date) {
  let diff = new Date() - date; // الفرق بالمليثانية

  if (diff < 1000) { // أقل من ثانية واحدة
    return 'right now';
  }

  let sec = Math.floor(diff / 1000); // نحوّل الفرق إلى ثوان

  if (sec < 60) {
    return sec + ' sec. ago';
  }

  let min = Math.floor(diff / 60000); // نحوّل الفرق إلى دقائق
  if (min < 60) {
    return min + ' min. ago';
  }

  // ننسّق التاريخ
  // ونُضيف أصفارًا لو كان اليوم/الشهر/الساعة/الدقيقة بخانة واحدة
  let d = date;
  d = [
    '0' + d.getDate(),
    '0' + (d.getMonth() + 1),
    '' + d.getFullYear(),
    '0' + d.getHours(),
    '0' + d.getMinutes()
  ].map(component => component.slice(-2)); // نأخذ الخانتين الأخيرتين من كلّ مكوّن

  // ندمج المكوّنات في تاريخ
  return d.slice(0, 3).join('.') + ' ' + d.slice(3).join(':');
}

alert( formatDate(new Date(new Date - 1)) ); // "right now"

alert( formatDate(new Date(new Date - 30 * 1000)) ); // "30 sec. ago"

alert( formatDate(new Date(new Date - 5 * 60 * 1000)) ); // "5 min. ago"

// ‫تاريخ الأمس، مثلًا ‎31.12.16, 20:00
alert( formatDate(new Date(new Date - 86400 * 1000)) );
```

حل بديل:

```
function formatDate(date) {
  let dayOfMonth = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let diffMs = new Date() - date;
  let diffSec = Math.round(diffMs / 1000);
  let diffMin = diffSec / 60;
  let diffHour = diffMin / 60;

  // التنسيق
  year = year.toString().slice(-2);
  month = month < 10 ? '0' + month : month;
  dayOfMonth = dayOfMonth < 10 ? '0' + dayOfMonth : dayOfMonth;

  if (diffSec < 1) {
    return 'right now';  
  } else if (diffMin < 1) {
    return `${diffSec} sec. ago`
  } else if (diffHour < 1) {
    return `${diffMin} min. ago`
  } else {
    return `${dayOfMonth}.${month}.${year} ${hour}:${minutes}`
  }
}
```

لاحظ بأنّ هذه الطريقة سيّئة لو أردت دعم اللغات دعمًا صحيحًا (في العربية هناك ثانية واحدة وثانيتين وثلاث ثوان وخمسون ثانية وهكذا).


ترجمة -وبتصرف- للفصل [Date and time](https://javascript.info/date) من كتاب [The JavaScript language](https://javascript.info/js).

