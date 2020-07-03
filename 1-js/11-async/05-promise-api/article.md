# Promise API 

هناك خمس دوال ثابتة في `Promise` class. سنغطي بسرعة حالات استخدامهم هنا.

## Promise.all

لنفترض أننا نريد تنفيذ العديد من الوعود بالتوازي والانتظار حتى تصبح جميعها جاهزة.

على سبيل المثال ، قم بتنزيل العديد من عناوين URL بالتوازي وقم بمعالجة المحتوى بمجرد الانتهاء منها.

هذا هو الغرض من "Promise.all".

يكتب على النحو التالي:

```js
let promise = Promise.all([...promises...]);
```

يأخذ `Promise.all` مجموعة من الوعود (من الناحية التقنية يمكن أن تكون قابلة للتكرار ، ولكن عادة ما تكون صفيفًا) ويعيد وعدًا جديدًا.

يتم حل الوعد الجديد عندما تتم تسوية جميع الوعود المدرجة ، وتصبح مجموعة نتائجها نتاجها.

على سبيل المثال ، يستقر "Promise.all" أدناه بعد 3 ثوانٍ ، ومن ثم تكون نتائجه مصفوفة `[1 ، 2 ، 3]`:

```js run
Promise.all([
  new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
  new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
  new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3
]).then(alert); // 1,2,3 when promises are ready: each promise contributes an array member
```

يرجى ملاحظة أن ترتيب أعضاء الصفيف الناتج هو نفسه كما في وعود المصدر. على الرغم من أن الوعد الأول يستغرق وقتًا أطول للحل ، إلا أنه لا يزال الأول في مجموعة النتائج.

الحيلة الشائعة هي تعيين مصفوفة من بيانات العمل إلى مجموعة من promises ، ثم لفها في `Promise.all`.

على سبيل المثال ، إذا كان لدينا مجموعة من عناوين URL ، فيمكننا جلبها جميعًا مثل هذا:

```js run
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://api.github.com/users/jeresig'
];

// map every url to the promise of the fetch
let requests = urls.map(url => fetch(url));

// Promise.all waits until all jobs are resolved
Promise.all(requests)
  .then(responses => responses.forEach(
    response => alert(`${response.url}: ${response.status}`)
  ));
```

مثال أكبر على جلب معلومات المستخدم لمجموعة من مستخدمي GitHub بأسمائهم (يمكننا جلب مجموعة من السلع حسب معرفاتهم ، المنطق متطابق):

```js run
let names = ['iliakan', 'remy', 'jeresig'];

let requests = names.map(name => fetch(`https://api.github.com/users/${name}`));

Promise.all(requests)
  .then(responses => {
    // all responses are resolved successfully
    for(let response of responses) {
      alert(`${response.url}: ${response.status}`); // shows 200 for every url
    }

    return responses;
  })
  // map array of responses into an array of response.json() to read their content
  .then(responses => Promise.all(responses.map(r => r.json())))
  // all JSON answers are parsed: "users" is the array of them
  .then(users => users.forEach(user => alert(user.name)));
```

** إذا تم رفض أي من الوعود ، فإن الوعد الذي تم إرجاعه بواسطة "Promise.all" يرفض على الفور هذا الخطأ. **

على سبيل المثال:

```js run
Promise.all([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
*!*
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
*/!*
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).catch(alert); // Error: Whoops!
```

هنا الوعد الثاني يرفض في ثانيتين. يؤدي ذلك إلى الرفض الفوري لـ "Promise.all" ، وبالتالي يتم تنفيذ ".catch": يصبح خطأ الرفض نتيجة لـ "Promise.all" بالكامل.

```warn header="في حالة حدوث خطأ ، يتم تجاهل الوعود الأخرى"
إذا رفض أحد الوعود ، رفض `Promise.all` على الفور ، متناسين تمامًا الوعود الأخرى في القائمة. يتم تجاهل نتائجهم.

على سبيل المثال ، إذا كان هناك العديد من مكالمات `الجلب` ، كما هو موضح في المثال أعلاه ، وفشل أحدها ، فسيستمر الآخرون في التنفيذ ، ولكن لن يُشاهدهم" الوعد. جميع "بعد الآن. ربما سيستقرون ، ولكن سيتم تجاهل نتائجهم.

لا يقوم "Promise.all" بأي شيء لإلغائها ، حيث لا يوجد مفهوم "الإلغاء" في الوعود. في [فصل آخر] (info: fetch-abort) سنغطي `AbortController` التي يمكن أن تساعد في ذلك ، لكنها ليست جزءًا من Promise API.
```

````smart header="`Promise.all(iterable)` يسمح بقيم ليست promise في "قابل للتكرار" "
عادة ، يقبل `Promise.all (...)` الوعود (في معظم الحالات مجموعة) من الوعود. ولكن إذا لم يكن أي من هذه الأشياء وعدًا ، فسيتم تمريره إلى الصفيف الناتج "كما هو".

على سبيل المثال ، هنا النتائج هي "[1 ، 2 ، 3]`:

```js run
Promise.all([
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000)
  }),
  2,
  3
]).then(alert); // 1, 2, 3
```

حتى نتمكن من تمرير القيم الجاهزة إلى "Promise.all" حيثما يكون ذلك مناسبًا.
````

## Promise.allSettled

[recent browser="new"]

`Promise.all` rيخرج ككل إذا رفض أي وعد. هذا أمر جيد بالنسبة لحالات "الكل أو لا شيء" ، عندما نحتاج إلى * جميع * النتائج الناجحة للمتابعة:

```js
Promise.all([
  fetch('/template.html'),
  fetch('/style.css'),
  fetch('/data.json')
]).then(render); // render method needs results of all fetches
```

`Promise.allSettled` just ينتظر جميع الوعود بتسوية بغض النظر عن النتيجة. المصفوفة الناتجة لها:

- `{الحالة:" تم الوفاء "، القيمة: النتيجة}` للاستجابات الناجحة ،
- `{الحالة:" مرفوض "، السبب: خطأ}` للأخطاء.

على سبيل المثال ، نود جلب المعلومات حول عدة مستخدمين. حتى لو فشل طلب واحد ، ما زلنا مهتمين بالطلبات الأخرى.

دعنا نستخدم `Promise.allSettled`:


```js run
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://no-such-url'
];

Promise.allSettled(urls.map(url => fetch(url)))
  .then(results => { // (*)
    results.forEach((result, num) => {
      if (result.status == "fulfilled") {
        alert(`${urls[num]}: ${result.value.status}`);
      }
      if (result.status == "rejected") {
        alert(`${urls[num]}: ${result.reason}`);
      }
    });
  });
```

ستكون "النتائج" في السطر `(*)` أعلاه:

```js
[
  {status: 'fulfilled', value: ...response...},
  {status: 'fulfilled', value: ...response...},
  {status: 'rejected', reason: ...error object...}
]
```

لذلك لكل promise نحصل على حالته و "القيمة / الخطأ".

### Polyfill

إذا كان المتصفح لا يدعم `Promise.allSettled` ، فمن السهل إعادة الملء:

```js
if(!Promise.allSettled) {
  Promise.allSettled = function(promises) {
    return Promise.all(promises.map(p => Promise.resolve(p).then(value => ({
      status: 'fulfilled',
      value
    }), reason => ({
      status: 'rejected',
      reason
    }))));
  };
}
```

في هذا الرمز ، يأخذ `promises.map` قيم الإدخال ، ويحولها إلى وعود (فقط في حالة تمرير عدم الوعد) مع` p => Promise.resolve (p) `، ثم يضيف معالج` .then` إلى كل واحد.

يحول هذا المعالج نتيجة `القيمة` الناجحة إلى `{status:'fulfilled', value}` والخطأ `reason` إلى `{status:'rejected', reason}`. هذا هو بالضبط تنسيق `Promise.allSettled`.

الآن يمكننا استخدام "Promise.allSettled" للحصول على نتائج * جميع * الوعود المعطاة ، حتى لو رفض بعضها.

## Promise.race

يشبه `Promise.all` ، ولكنه ينتظر فقط الوعد المستقر الأول ويحصل على نتيجته (أو خطأ).

الصيغة هي:

```js
let promise = Promise.race(iterable);
```

For instance, here the result will be `1`:

```js run
Promise.race([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(alert); // 1
```

الوعد الأول هنا كان أسرع ، لذلك أصبح النتيجة. بعد الوعد المستقر الأول "يفوز بالسباق" ، يتم تجاهل جميع النتائج / الأخطاء الأخرى.


## Promise.resolve / reject

نادرًا ما تكون هناك حاجة إلى طريقتين `Promise.resolve` و` Promise.reject` في التعليمات البرمجية الحديثة ، لأن بناء الجملة `async / await` (سنغطيها [بعد قليل] (info: async-await)) يجعلها قديمة إلى حد ما.

نحن نغطيها هنا للاكتمال ولأولئك الذين لا يستطيعون استخدام `` غير متزامن / انتظار '' لسبب ما.

### promise.resolve 

`Promise.resolve (القيمة)` يُنشئ وعدًا تم حله بالنتيجة `value`.

مثل:

```js
let promise = new Promise(resolve => resolve(value));
```

تُستخدم الطريقة للتوافق ، عندما يُتوقع أن تُرجع الدالة الوعد.

على سبيل المثال ، تجلب الوظيفة "loadCached" أدناه عنوان URL وتتذكر (تخبئ) محتواه. بالنسبة للمكالمات المستقبلية التي لها نفس عنوان URL ، تحصل على الفور على المحتوى السابق من ذاكرة التخزين المؤقت ، ولكنها تستخدم `Promise.resolve` لتقديم وعد بها ، لذا فإن القيمة التي تم إرجاعها هي دائمًا promise:

```js
let cache = new Map();

function loadCached(url) {
  if (cache.has(url)) {
*!*
    return Promise.resolve(cache.get(url)); // (*)
*/!*
  }

  return fetch(url)
    .then(response => response.text())
    .then(text => {
      cache.set(url,text);
      return text;
    });
}
```

يمكننا كتابة "loadCached (url) .then (…)` ، لأن الوظيفة مضمونة لإرجاع الوعد. يمكننا دائمًا استخدام `.then` بعد` loadCached`. هذا هو الغرض من "Promise.resolve" في السطر `(*)`.

### وعد.رفض

`Promise.reject (error)` ينشئ وعدًا مرفوضًا بـ `error`.

مثل:

```js
let promise = new Promise((resolve, reject) => reject(error));
```

عمليًا ، لا يتم استخدام هذه الطريقة تقريبًا.

## ملخص

هناك 5 طرق ثابتة لفئة `Promise`:

1. "Promise.all (الوعود)" - تنتظر جميع الوعود لحل وإرجاع مجموعة من نتائجها. إذا تم رفض أي من الوعود المعطاة ، يصبح خطأ "Promise.all" ، ويتم تجاهل جميع النتائج الأخرى.
2. "Promise.allSettled (الوعود)" (الطريقة المضافة حديثًا) - تنتظر جميع الوعود بتسوية نتائجها وإعادتها كمجموعة من الأشياء مع:
     - `الدولة`:` `محقق '' أو` `مرفوض ''
     - "القيمة" (إذا تحققت) أو "السبب" (إذا تم رفضها).
3. "الوعد" (الوعود) - ينتظر الوعد الأول بالاستقرار ، وتصبح نتيجته / خطأه النتيجة.
4. "Promise.resolve (القيمة)" - يقدم وعدًا ثابتًا بقيمة معينة.
5. "Promise.reject (خطأ)" - يقدم وعدًا مرفوضًا مع الخطأ المحدد.

من بين هذه العناصر الخمسة ، يعد "Promise.all" الأكثر شيوعًا في الممارسة.
