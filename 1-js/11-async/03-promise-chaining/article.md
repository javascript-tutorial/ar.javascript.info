# الوعود Promises chaining
طرحناها في الفصل "[مقدمة إلى ردود النداء
callbacks](https://academy.hsoub.com/programming/javascript/%D9%85%D9%82%D8%AF
%D9%85%D8%A9-%D8%A5%D9%84%D9%89-%D8%B1%D8%AF%D9%88%D8%AF-
%D8%A7%D9%84%D9%86%D8%AF%D8%A7%D8%A1-callbacks-%D9%81%D9%8A-
%D8%AC%D8%A7%D9%81%D8%A7%D8%B3%D9%83%D8%B1%D8%A8%D8%AA-
r914/)" مشكلةً ألا وهي أنّ لدينا تسلسلًا من المهام غير المتزامنة ويجب أن تُجرى واحدةً بعد الأخرى، مثلًا تحميل السكربتات.
كيف نكتب شيفرة ... لهذه المشكلة؟
تقدّم لنا الوعود طرائق مختلفة لهذا الغرض. وفي هذا الفصل سنتكلّم عن سَلسلة الوعود فقط.
هكذا تكون:
```
new Promise(function(resolve, reject) {
setTimeout(() => resolve(1), 1000); // (*)
}).then(function(result) { // (**)
alert(result); // 1
return result * 2;
}).then(function(result) { // (***)
alert(result); // 2
return result * 2;
}).then(function(result) {
alert(result); // 4
return result * 2;
});
```
الفكرة وما فيها هي تمرير الناتج في سلسلة توابِع `‎.then` تابعًا تابعًا.
هكذا تكون:
1. يبدأ الوعد الأوّل ويُنجز خلال ثانية واحدة (*).
2. بعدها يُستدعى معالج `‎.then` `(**)`.
3. النتيجة التي ستعود ستمرر إلى معالج `‎.then` التالي `(***)`.
4. وهكذا… .
نظرًا لتمرير النتيجة على طول سلسلة المعالجات، يمكننا رؤية سلسلة من استدعاءات `alert` هكذا: 1 ← 2 ← 4.

[promise-then-chain.png]
ويعود سبب هذا كلّه إلى أنّ استدعاء `promise.then` يُعيد وعدًا هو الآخر، بذلك يمكننا استدعاء التابِع `‎.then` التالي على
ذلك الوعد، وهكذا.
حين تُعيد دالة المُعاملة قيمةً ما، تصير القيمة ناتج ذلك الوعد، بذلك يمكن استدعاء `‎.then` عليه.
**خطأ شائع بين المبتدئين: تقنيًا يمكننا إضافة أكثر من تابِع `‎.then` إلى وعد واحد. لا يُعدّ هذا سَلسلة وعود**.
مثلًا:
```
let promise = new Promise(function(resolve, reject) {
setTimeout(() => resolve(1), 1000);
});
promise.then(function(result) {
alert(result); // 1
return result * 2;
});
promise.then(function(result) {
alert(result); // 1
return result * 2;
});
promise.then(function(result) {
alert(result); // 1
return result * 2;
});
```
هنا كتبنا أكثر من دالة مُعاملة لوعد واحد، وهذه التوابِع لا تمرّر القيمة إلى بعضها البعض، بل كلّ تعالجها على حدة.
إليك الصورة (ووازِن بينها وبين السلسلة أعلاه):
[promise-then-many.png]
تتلقّى كلّ توابِع `‎.then` في نفس الوعد ذات الناتج (أي ناتج الوعد) بذلك تعرض الشيفرة أعلاه نتائج `alert` متطابقة: `1`.
أمّا عمليًا فنادرًا ما نستعمل أكثر من دالة مُعاملة واحدة لكلّ وعد، على عكس السَلسلة التي يشيع استعمالها.
## إعادة الوعود
يمكن لدالة المُعاملة (المستعملة في `‎.then(handler)‎`) إنشاء وعد وإعادته.
هنا تنتظر دوال المُعاملة الأخرى حتّى يكتمل الوعد وتستلم ناتجه.
مثال على هذا:

```
new Promise(function(resolve, reject) {
setTimeout(() => resolve(1), 1000);
}).then(function(result) {
alert(result); // 1
// لاحِظ
return new Promise((resolve, reject) => { // (*)
setTimeout(() => resolve(result * 2), 1000);
});
}).then(function(result) { // (**)
alert(result); // 2
return new Promise((resolve, reject) => {
setTimeout(() => resolve(result * 2), 1000);
});
}).then(function(result) {
alert(result); // 4
});
```
هنا يعرض أوّل تابِع `.then` القيمة `1` ويُعيد `new Promise(…)‎` في السطر `(*)`. بعد ثانية واحدة، ... الوعد ويُمرّر
ناتجه (أي وسيط التابِع `resolve`، في حالتنا هو `result * 2`) إلى دالة المُعاملة التالية في تابِع `.then` التالي. نرى كيف أنّ
الدالة في السطر `(**)` تعرض `2` وتؤدّي ما أدّته دالة المُعاملة السابقة.
بذلك نحصل على ما حصلنا عليه في المثال السابق: 1 ثمّ 2 ثمّ 4، الفرق هو التأخير لمدّة ثانية بين كلّ استدعاء من استدعاءات
`alert`.
بإعادة الوعود يمكننا بناء سلسلة من الإجراءات غير المتزامنة.
## مثال: loadScript
لنستعمل هذه الميزة مع دالة `loadScript` (التي كتبناها في الفصل السابق) لنُحمّل النصوص البرمجية واحدًا تلو الآخر:
```
loadScript("/article/promise-chaining/one.js")
.then(function(script) {
return loadScript("/article/promise-chaining/two.js");
})

.then(function(script) {
return loadScript("/article/promise-chaining/three.js");
})
.then(function(script) {
// نستعمل الدوال المعرّف عنها في النصوص البرمجية
// ونتأكّد تمامًا بأنّها حُمّلت
one();
two();
three();
});
```
يمكننا أيضًا تقصير الشيفرة قليلًا باستعمال الدوال السهميّة:
```
loadScript("/article/promise-chaining/one.js")
.then(script => loadScript("/article/promise-chaining/two.js"))
.then(script => loadScript("/article/promise-chaining/three.js"))
.then(script => {
// اكتمل تحميل النصوص، يمكننا استعمال الدوال فيها الآن
one();
two();
three();
});
```

نرى هنا أنّ كلّ استدعاء من استدعاءات `loadScript` يُعيد وعدًا، ويعمل تابِع `‎.then` التالي في السلسلة متى ... الوعد. بعدها
تبدأ الدالة بتحميل النص البرمجي التالي، وهكذا تُحمّل كلّ النصوص واحدًا بعد آخر.
ويمكننا إضافة ما نريد من إجراءات غير متزامنة إلى السلسلة، ولن يزيد طول الشيفرة إلى اليمين، بل إلى أسفل، ولن نُقابل وجه ...
ثانيةً.
يمكننا تقنيًا إضافة تابِع `‎.then` داخل دوال `loadScript` مباشرةً هكذا:
```
loadScript("/article/promise-chaining/one.js").then(script1 => {
loadScript("/article/promise-chaining/two.js").then(script2 => {
loadScript("/article/promise-chaining/three.js").then(script3 => {
// ‫يمكن أن تصل هذه الدالة إلى المتغيّرات script1 وscript2 وscript3
one();
two();
three();
});
});
});
```

وتؤدّي الشيفرة نفس العمل: تُحمّل 3 نصوص برمجية بالترتيب. المشكلة هي أنّ طولها يزيد نحو اليمين وهي نفس مشكلة ردود
النداء.
عادةً ما يجهل المبرمجون الجدد الذين يستعملون الوعود ميزة السَلسلة، فيكتبون الشيفرات هكذا. لكنّ سَلسلة الوعود هي الأمثل
وغالبًا الأفضل.
ولكنّ استعمال `.then` مباشرةً أحيانًا لا يكون بالمشكلة الكبيرة، إذ يمكن للدوال المتداخلة الوصول إلى ... الخارجي. في المثال
أعلاه مثلًا يمكن لآخر ردّ نداء متداخل الوصول إلى كلّ المتغيّرات `script1` و`script2` و`script3`، إلّا أنّ هذا استثناء عن
القاعدة وليس قاعدة بحدّ ذاتها.
**ملاحظة**: كائنات Thenables
على وجه الدقة، لا تعيد المعالجات وعودًا وإنما تعيد كائن thenable - وهو كائن عشوائي له نفس توابع `.then`. ويتعامل معه
بنفس طريقة التعامل مع الوعد.
الفكرة أن مكتبات الخارجية تنفذ كائنات خاصة بها &quot;متوافقة مع الوعد&quot;. ويمكن أن يملكوا مجموعة توابع موسّعة. ولكن يجب أن
يتوافقوا مع الوعود الأصيلة، لأنهم ينفذون `.then`.
وإليك مثالًا على كائن thenable:
```
class Thenable {
constructor(num) {
this.num = num;
}
then(resolve, reject) {
alert(resolve); // function() { native code }
// ‫إنجاز الوعد وتحقيقه مع this.num*2 بعد ثانية
setTimeout(() => resolve(this.num * 2), 1000); // (**)
}
}
new Promise(resolve => resolve(1))
.then(result => {
return new Thenable(result); // (*)
})
.then(alert); // shows 2 after 1000ms
```
تتحقق جافاسكربت من الكائن المُعاد من معالج `.then` في السطر `(*)`: إن لديه تابع قابل للاستدعاء يدعى `then` عندها
سيستدعي ذاك التابع مزودًا بذلك بالتوابع الأصيلة مثل: `resolve` و `reject` كوسطاء (مشابه للمنفذ) وينتظر حتى يستدعى
واحدًا منهم. في المثال أعلاه تستدعى `resolve(2)` بعد ثانية انظر `(**)`. بعدها تمرر النتيجة إلى أسفل السلسلة.
تتيح لنا هذه المميزات دمج الكائنات المخصصة مع سلاسل الوعود دون الحاجة إلى الوراثة من الوعد `Promise`.
## مثال أضخم: fetch

عادةً ما نستعمل الوعود في برمجة الواجهات الرسومية لطلبات الشبكة. لنرى الآن مثالًا أوسع مجالًا قليلًا.
سنستعمل التابِع []() لتحميل بعض المعلومات التي تخصّ المستخدم من الخادوم البعيد. لهذا التابِع معاملات كثيرة اختيارية كتبنا عنا
في فصول مختلفة، إلّا أنّ صياغته الأساسية بسيطة إلى حدّ ما:
```
let promise = fetch(url);
```
هكذا نُرسل طلبًا شبكيًا إلى العنوان `url` ونستلم وعدًا. ...... ما إن يردّ الخادم البعيد بترويسات الطلب، ولكن *قبل تنزيل الردّ
كاملًا*.
علينا استدعاء التابِع `response.text()‎` لقراءة الردّ كاملًا، وهو يُعيد وعدًا ... متى نُزّل النص الكامل من الخادوم البعيد،
وناتجه يكون ذلك النص.
تُرسل الشيفرة أسفله طلبًا إلى `user.json` وتحمّل نصّه من الخادوم:
```
fetch("/article/promise-chaining/user.json")
// ‫إن ‎.then تعمل عندما يستجيب الخادم البعيد
.then(function(response) {
// ‫إن التابع response.text()‎ يُعيد وعدًا جديدًا والذي يعاد مع كامل نص الاستجابة
// عندما يُحمّل
return response.text();
})
.then(function(text) {
// ‫...وهنا سيكون محتوى الملف البعيد
alert(text); // {"name": "iliakan", isAdmin: true}
});
```
كما أنّ هناك التابِع `response.json()‎` والذي يقرأ البيانات المستلمة البعيدة ويحلّلها على أنّها JSON. في حالتنا هذا أفضل
وأسهل فهيًا نستعمله.
كما وسنستعمل الدوال السهميّة للاختصار قليلًا:
```
// ‫مشابه للمثال أعلاه ولكن التابع response.json()‎ يحلل المحتوى البعيد كملف JSON
fetch('/article/promise-chaining/user.json')
.then(response => response.json())
.then(user => alert(user.name)); // iliakan, got user name
```
الآن لنصنع شيئًا بهذا المستخدم الذي حمّلناه.
يمكننا مثلًا إجراء طلبات أكثر من غِت‎هَب وتحميل ملف المستخدم الشخصي وعرض صورته:

```
// ‫أنشئ طلب لـِuser.json
fetch('/article/promise-chaining/user.json')
// ‫حمله وكأنه ملف json
.then(response => response.json())
// ‫أنشئ طلب لـِ GitHub
.then(user => fetch(`https://api.github.com/users/${user.name}`))
// ‫حمّل الرد كملف json
.then(response => response.json())
// ‫أظهر الصورة الرمزية (avatar) من (githubUser.avatar_url) لمدة 3 ثواني
.then(githubUser => {
let img = document.createElement('img');
img.src = githubUser.avatar_url;
img.className = 'promise-avatar-example';
document.body.append(img);
setTimeout(() => img.remove(), 3000); // (*)
});
```
الشيفرة تعمل على أكمل وجه (طالِع التعليقات لتعرف التفاصيل). ولكن هناك مشكلة فيه قد تحدث، وهي خطأ شائع يقع فيه من
يستعمل الوعود أوّل مرّة.
طالِع السطر `(*)`: كيف يمكن أن نفعل مهمّة معينة *متى* اكتمل عرض الصورة وأُزيلت؟ فلنقل مثلًا سنعرض استمارة لتحرير
ذلك المستخدم أو أيّ شيء آخر. حاليًا... ذلك مستحيل.
لنقدر على مواصلة السلسلة علينا إعادة وعد المُنجز متى اكتمل عرض الصورة.
هكذا:
```
fetch('/article/promise-chaining/user.json')
.then(response => response.json())
.then(user => fetch(`https://api.github.com/users/${user.name}`))
.then(response => response.json())
// هنا
.then(githubUser => new Promise(function(resolve, reject) { // (*)
let img = document.createElement('img');
img.src = githubUser.avatar_url;
img.className = "promise-avatar-example";
document.body.append(img);
setTimeout(() => {
img.remove();
resolve(githubUser); // (**)
}, 3000);
}))
// يحدث بعد 3 ثوانٍ

.then(githubUser => alert(`Finished showing ${githubUser.name}`));
```
هكذا صارت تُعيد دالة المُعاملة في `.then` عند السطر `(*)` كائنَ `new Promise` لا ... إلّا بعد استدعاء
`resolve(githubUser)‎` في `setTimeout` عند `(**)`.
وسينتظر تابِع `‎.then` التالي في السلسلة اكتمال ذلك.
تُعد إعادة الإجراءات غير المتزامنة للوعود دومًا إحدى الممارسات الصحيحة في البرمجة.
هكذا يسهّل علينا التخطيط للإجراءات التي ستصير بعد هذا، فحتّى لو لم نريد توسعة السلسلة الآن لربّما احتجنا إلى ذلك لاحقًا.
وأخيرًا، يمكننا أيضًا تقسيم الشيفرة إلى دوال يمكن إعادة استعمالها:
```
function loadJson(url) {
return fetch(url)
.then(response => response.json());
}
function loadGithubUser(name) {
return fetch(`https://api.github.com/users/${name}`)
.then(response => response.json());
}
function showAvatar(githubUser) {
return new Promise(function(resolve, reject) {
let img = document.createElement('img');
img.src = githubUser.avatar_url;
img.className = "promise-avatar-example";
document.body.append(img);
setTimeout(() => {
img.remove();
resolve(githubUser);
}, 3000);
});
}
// نستعملها الآن:
loadJson('/article/promise-chaining/user.json')
.then(user => loadGithubUser(user.name))
.then(showAvatar)
.then(githubUser => alert(`Finished showing ${githubUser.name}`));
// اكتمل عرض كذا // ...
```
## خلاصة

إن أعادت دالة مُعاملة `‎.then` (أو `catch/finally`، لا يهمّ حقًا) وعدًا، فتنتظر بقية السلسلة حتّى تُنجز متى حدث ذلك يُمرّر
الناتج (أو الخطأ) إلى التي بعدها.
إليك الصورة الكاملة:
[promise-handler-variants.png]
## تمارين
# الوعد: then وcatch
هل تؤدّي هاتين الشيفرتين نفس الغرض؟ أي هل يتطابق سلوكهما في الحالات المختلفة، وأيّما كانت دوال المُعاملة؟
```
promise.then(f1).catch(f2);
```
مقابل:
```
promise.then(f1, f2);
```
#### الحل
الجواب المختصر: ** لا ليسا متساويين**:
الفرق أنه إن حدث خطأ في `f1` فستعالجها `‎.catch` هنا:
```
promise
.then(f1)
.catch(f2);
```
...لكن ليس هنا:
```
promise
.then(f1, f2);
```
وذلك بسبب تمرير الخطأ لأسفل السلسلة، وفي الجزء الثاني من الشيفرة لا يوجد سلسلة أقل من `f1`.
بمعنى آخر يمرر `‎.then` النتيجة أو الخطأ إلى `‎.then/catch` التالية. لذا في المثال الأول يوجد `catch` بينما في المثال
الثاني لا يوجد. ولذلك لم يعالج الخطأ.
ترجمة -وبتصرف- للفصل [Promises chaining](https://javascript.info/promise-chaining) من
كتاب [The JavaScript language](https://javascript.info/js)