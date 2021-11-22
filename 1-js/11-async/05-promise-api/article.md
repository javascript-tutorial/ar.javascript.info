# Promise API

There are 6 static methods in the `Promise` class. We'll quickly cover their use cases here.

## Promise.all

لنفترض أننا نريد تنفيذ العديد من الوعود بالتوازي والانتظار حتى تصبح جميعها جاهزة.

على سبيل المثال ، قم بتنزيل العديد من عناوين URL بالتوازي وقم بمعالجة المحتوى بمجرد الانتهاء منها.

هذا هو الغرض من "Promise.all".

يكتب على النحو التالي:

```js
let promise = Promise.all([...promises...]);
```

يأخذ `Promise.all` مجموعة من الوعود (من الناحية التقنية يمكن أن تكون قابلة للتكرار ، ولكن عادة ما تكون صفيفًا) ويعيد وعدًا جديدًا.

<<<<<<< HEAD
يتم حل الوعد الجديد عندما تتم تسوية جميع الوعود المدرجة ، وتصبح مجموعة نتائجها نتاجها.
=======
The new promise resolves when all listed promises are resolved, and the array of their results becomes its result.
>>>>>>> a82915575863d33db6b892087975f84dea6cb425

على سبيل المثال ، يستقر "Promise.all" أدناه بعد 3 ثوانٍ ، ومن ثم تكون نتائجه مصفوفة `[1 ، 2 ، 3]`:

```js run
Promise.all([
  new Promise((resolve) => setTimeout(() => resolve(1), 3000)), // 1
  new Promise((resolve) => setTimeout(() => resolve(2), 2000)), // 2
  new Promise((resolve) => setTimeout(() => resolve(3), 1000)), // 3
]).then(alert); // 1,2,3 when promises are ready: each promise contributes an array member
```

يرجى ملاحظة أن ترتيب أعضاء الصفيف الناتج هو نفسه كما في وعود المصدر. على الرغم من أن الوعد الأول يستغرق وقتًا أطول للحل ، إلا أنه لا يزال الأول في مجموعة النتائج.

الحيلة الشائعة هي تعيين مصفوفة من بيانات العمل إلى مجموعة من promises ، ثم لفها في `Promise.all`.

على سبيل المثال ، إذا كان لدينا مجموعة من عناوين URL ، فيمكننا جلبها جميعًا مثل هذا:

```js run
let urls = ['https://api.github.com/users/iliakan', 'https://api.github.com/users/remy', 'https://api.github.com/users/jeresig'];

// map every url to the promise of the fetch
let requests = urls.map((url) => fetch(url));

// Promise.all waits until all jobs are resolved
Promise.all(requests).then((responses) => responses.forEach((response) => alert(`${response.url}: ${response.status}`)));
```

مثال أكبر على جلب معلومات المستخدم لمجموعة من مستخدمي GitHub بأسمائهم (يمكننا جلب مجموعة من السلع حسب معرفاتهم ، المنطق متطابق):

```js run
let names = ['iliakan', 'remy', 'jeresig'];

let requests = names.map((name) => fetch(`https://api.github.com/users/${name}`));

Promise.all(requests)
  .then((responses) => {
    // all responses are resolved successfully
    for (let response of responses) {
      alert(`${response.url}: ${response.status}`); // shows 200 for every url
    }

    return responses;
  })
  // map array of responses into an array of response.json() to read their content
  .then((responses) => Promise.all(responses.map((r) => r.json())))
  // all JSON answers are parsed: "users" is the array of them
  .then((users) => users.forEach((user) => alert(user.name)));
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

````smart header="`Promise.all(iterable)`يسمح بقيم ليست promise في "قابل للتكرار" " عادة ، يقبل`Promise.all (...)` الوعود (في معظم الحالات مجموعة) من الوعود. ولكن إذا لم يكن أي من هذه الأشياء وعدًا ، فسيتم تمريره إلى الصفيف الناتج "كما هو".

على سبيل المثال ، هنا النتائج هي "[1 ، 2 ، 3]`:

```js run
Promise.all([
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000);
  }),
  2,
  3,
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
if (!Promise.allSettled) {
  const rejectHandler = reason => ({ status: 'rejected', reason });

  const resolveHandler = value => ({ status: 'fulfilled', value });

  Promise.allSettled = function (promises) {
    const convertedPromises = promises.map(p => Promise.resolve(p).then(resolveHandler, rejectHandler));
    return Promise.all(convertedPromises);
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


## Promise.any

Similar to `Promise.race`, but waits only for the first fulfilled promise and gets its result. If all of the given promises are rejected, then the returned promise is rejected with [`AggregateError`](mdn:js/AggregateError) - a special error object that stores all promise errors in its `errors` property.

The syntax is:

```js
let promise = Promise.any(iterable);
```

For instance, here the result will be `1`:

```js run
Promise.any([
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 1000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(alert); // 1
```

The first promise here was fastest, but it was rejected, so the second promise became the result. After the first fulfilled promise "wins the race", all further results are ignored.

Here's an example when all promises fail:

```js run
Promise.any([
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Ouch!")), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Error!")), 2000))
]).catch(error => {
  console.log(error.constructor.name); // AggregateError
  console.log(error.errors[0]); // Error: Ouch!
  console.log(error.errors[1]); // Error: Error
});
```

As you can see, error objects for failed promises are available in the `errors` property of the `AggregateError` object.

## Promise.resolve/reject

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

There are 6 static methods of `Promise` class:

1. `Promise.all(promises)` -- waits for all promises to resolve and returns an array of their results. If any of the given promises rejects, it becomes the error of `Promise.all`, and all other results are ignored.
2. `Promise.allSettled(promises)` (recently added method) -- waits for all promises to settle and returns their results as an array of objects with:
    - `status`: `"fulfilled"` or `"rejected"`
    - `value` (if fulfilled) or `reason` (if rejected).
3. `Promise.race(promises)` -- waits for the first promise to settle, and its result/error becomes the outcome.
4. `Promise.any(promises)` (recently added method) -- waits for the first promise to fulfill, and its result becomes the outcome. If all of the given promises are rejected, [`AggregateError`](mdn:js/AggregateError) becomes the error of `Promise.any`.
5. `Promise.resolve(value)` -- makes a resolved promise with the given value.
6. `Promise.reject(error)` -- makes a rejected promise with the given error.

Of all these, `Promise.all` is probably the most common in practice.
````
