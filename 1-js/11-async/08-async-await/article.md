# Async/await (غير المتزامن /الانتظار)

هناك بنية خاصة للعمل مع الوعود بطريقة أكثر راحة ، تسمى "غير متزامن / انتظار". من السهل جدًا فهمها واستخدامها.

## الدوال غير المتزامنة

لنبدأ بالكلمة الرئيسية `async`. يمكن وضعها قبل دالة ، مثل هذا:

```js
async function f() {
  return 1;
}
```

تعني كلمة "غير متزامن" قبل دالة شيء واحد بسيط: ترجع الدالة دائمًا الوعد. يتم تغليف القيم الأخرى في وعد تم حله تلقائيًا.

على سبيل المثال ، ترجع هذه الوظيفة وعدًا تم حله بنتيجة `1` ؛ دعنا نختبره:

```js run
async function f() {
  return 1;
}

f().then(alert); // 1
```

... يمكن أن نعيد وعدًا صريحًا ، والذي سيكون نفسه:

```js run
async function f() {
  return Promise.resolve(1);
}

f().then(alert); // 1
```

لذا ، يضمن `غير متزامن '' أن ترجع الدالة promise ، وتلف غير وعود فيه. بسيطة بما يكفي ، أليس كذلك؟ ولكن ليس هذا فقط. هناك كلمة رئيسية أخرى` تنتظر '' تعمل فقط داخل وظائف `غير متزامن '، وهي رائعة جدًا.

## Await

الصيغة:

```js
// works only inside async functions
let value = await promise;
```

تجعل الكلمة الرئيسية "في انتظار" جافا سكريبت تنتظر حتى يستقر هذا الوعد ويعيد نتيجته.

في ما يلي مثال بوعد يتم حله في ثانية واحدة:

```js run
async function f() {

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done!"), 1000)
  });

*!*
  let result = await promise; // wait until the promise resolves (*)
*/!*

  alert(result); // "done!"
}

f();
```

تنفيذ الوظيفة "يتوقف" عند السطر `(*)` ويستأنف عندما يستقر الوعد ، ويصبح "النتيجة" نتيجته. لذلك يظهر الرمز أعلاه "تم!" في ثانية واحدة.

دعونا نؤكد: `` انتظارًا '' يجعل جافا سكريبت تنتظر حتى يستقر الوعد ، ثم استمر في النتيجة. هذا لا يكلف أي موارد وحدة المعالجة المركزية ، لأن المحرك يمكنه القيام بمهام أخرى في الوقت نفسه: تنفيذ البرامج النصية الأخرى ، والتعامل مع الأحداث ، وما إلى ذلك.

<<<<<<< HEAD
Let's emphasize: `await` literally suspends the function execution until the promise settles, and then resumes it with the promise result. That doesn't cost any CPU resources, because the JavaScript engine can do other jobs in the meantime: execute other scripts, handle events, etc.

```` warn header="لا يمكن استخدام` انتظار 'في الوظائف العادية " إذا حاولنا استخدام `` انتظار '' في وظيفة غير متزامنة ، فسيكون هناك خطأ في بناء الجملة:
=======
It's just a more elegant syntax of getting the promise result than `promise.then`. And, it's easier to read and write.

````warn header="Can't use `await` in regular functions"
If we try to use `await` in a non-async function, there would be a syntax error:
>>>>>>> 741d90ce8a730d66e987bff5e9794d6e41cb2f05

```js run
function f() {
  let promise = Promise.resolve(1);
*!*
  let result = await promise; // Syntax error
*/!*
}
```

<<<<<<< HEAD
We may get this error if we forget to put `async` before a function. As said, `await` only works inside an `async` function.
=======
We may get this error if we forget to put `async` before a function. As stated earlier, `await` only works inside an `async` function.
````
>>>>>>> 741d90ce8a730d66e987bff5e9794d6e41cb2f05

`````

لنأخذ مثال `showAvatar ()` من الفصل <info: prom-chaining> ونعيد كتابته باستخدام `async / await`:

1. سنحتاج إلى استبدال مكالمات ".then" بـ "ينتظر".
2. كما يجب أن نجعل الوظيفة "غير متزامنة" حتى تعمل.

```js run
async function showAvatar() {

  // read our JSON
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();

  // read github user
  let githubResponse = await fetch(`https://api.github.com/users/${user.name}`);
  let githubUser = await githubResponse.json();

  // show the avatar
  let img = document.createElement('img');
  img.src = githubUser.avatar_url;
  img.className = "promise-avatar-example";
  document.body.append(img);

  // wait 3 seconds
  await new Promise((resolve, reject) => setTimeout(resolve, 3000));

  img.remove();

  return githubUser;
}

showAvatar();
```

نظيفة جدا وسهلة القراءة ، أليس كذلك؟ أفضل بكثير من ذي قبل.

<<<<<<< HEAD
````smart header="` `انتظار '' لن يعمل في رمز المستوى الأعلى"
يميل الأشخاص الذين بدأوا للتو في استخدام `` انتظار '' إلى نسيان حقيقة أنه لا يمكننا استخدام `` انتظار '' في رمز المستوى الأعلى. على سبيل المثال ، لن يعمل هذا:
=======
````smart header="Modern browsers allow top-level `await` in modules"
In modern browsers, `await` on top level works just fine, when we're inside a module. We'll cover modules in article <info:modules-intro>.
>>>>>>> 741d90ce8a730d66e987bff5e9794d6e41cb2f05

For instance:

```js run module
// we assume this code runs at top level, inside a module
let response = await fetch('/article/promise-chaining/user.json');
let user = await response.json();

console.log(user);
```

If we're not using modules, or [older browsers](https://caniuse.com/mdn-javascript_operators_await_top_level) must be supported, there's a universal recipe: wrapping into an anonymous async function.

Like this:

```js
(async () => {
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();
  ...
})();
```

<<<<<<< HEAD
P.S. New feature: starting from V8 engine version 8.9+, top-level await works in [modules](info:modules).
`````

````smart header="`await`accepts \"thenables\"" Like`promise.then`, `await`allows us to use thenable objects (those with a callable`then`method). The idea is that a third-party object may not be a promise, but promise-compatible: if it supports`.then`, that's enough to use it with `await`.
=======
````
>>>>>>> 741d90ce8a730d66e987bff5e9794d6e41cb2f05

````smart header="` `في انتظار` يقبل \" ثماني \ ""
مثل "prom.then`" ، يتيح لنا "await" استخدام العناصر القابلة للاستعمال (تلك التي تستخدم طريقة `ثم`القابلة للاستدعاء). الفكرة هي أن كائن طرف ثالث قد لا يكون وعدًا ، ولكنه متوافق مع الوعد: إذا كان يدعم`.then` ، فهذا يكفي لاستخدامه مع` `بانتظار ''.

إليك فئة `` Thenable` التجريبية ؛ تقبل "الانتظار" أدناه حالاتها:

```js run
class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    alert(resolve);
    // resolve with this.num*2 after 1000ms
    setTimeout(() => resolve(this.num * 2), 1000); // (*)
  }
}

async function f() {
  // waits for 1 second, then result becomes 2
  let result = await new Thenable(1);
  alert(result);
}

f();
```

إذا حصل `await` على كائن غير مبشر باستخدام` .then` ، فإنه يستدعي هذه الطريقة التي توفر الوظائف المضمنة `حل 'و'رفض` كوسيطات (تمامًا مثلما يفعل لمنفذ`وعد عادي'). ثم تنتظر`انتظار 'حتى يتم استدعاء أحدهم (في المثال أعلاه يحدث في السطر`(*)`) ثم يواصل النتيجة.

`````

````smart header="أساليب فئة Async"
للإعلان عن أسلوب فئة غير متزامن ، ما عليك سوى إلحاقها بـ `غير متزامن ':

```js run
class Waiter {
*!*
  async wait() {
*/!*
    return await Promise.resolve(1);
  }
}

new Waiter()
  .wait()
  .then(alert); // 1 (this is the same as (result => alert(result)))
```
The meaning is the same: it ensures that the returned value is a promise and enables `await`.

`````

## معالجة الأخطاء

إذا تم حل الـ `promise` بشكل طبيعي ، فإن "انتظار الوعد" يُرجع النتيجة. ولكن في حالة الرفض ، فإنه يلقي الخطأ ، كما لو كان هناك بيان `رمي 'في ذلك السطر.

هذا الكود:

```js
async function f() {
*!*
  await Promise.reject(new Error("Whoops!"));
*/!*
}
```

...is the same as this:

```js
async function f() {
*!*
  throw new Error("Whoops!");
*/!*
}
```

في المواقف الحقيقية ، قد يستغرق الوعد بعض الوقت قبل أن يرفض. في هذه الحالة ، سيكون هناك تأخير قبل أن يطرح "انتظار" خطأ.

يمكننا اكتشاف هذا الخطأ باستخدام `try..catch` ، بالطريقة نفسها التي تستخدمها` رمية` عادية:

```js run
async function f() {

  try {
    let response = await fetch('http://no-such-url');
  } catch(err) {
*!*
    alert(err); // TypeError: failed to fetch
*/!*
  }
}

f();
```

في حالة حدوث خطأ ، ينتقل عنصر التحكم إلى كتلة "الالتقاط". يمكننا أيضًا لف خطوط متعددة:

```js run
async function f() {
  try {
    let response = await fetch('/no-user-here');
    let user = await response.json();
  } catch (err) {
    // catches errors both in fetch and response.json
    alert(err);
  }
}

f();
```

إذا لم يكن لدينا "try..catch" ، فسيتم رفض الوعد الذي تم إنشاؤه بواسطة استدعاء دالة async `f ()`. يمكننا إلحاق ".catch" للتعامل معها:

```js run
async function f() {
  let response = await fetch('http://no-such-url');
}

// f() becomes a rejected promise
*!*
f().catch(alert); // TypeError: failed to fetch // (*)
*/!*
```

إذا نسينا إضافة ".catch" هناك ، فإننا نتلقى خطأ وعد غير معالج (قابل للعرض في وحدة التحكم). يمكننا اكتشاف مثل هذه الأخطاء باستخدام معالج الأحداث `unhandledrejection` العالمي كما هو موضح في الفصل <info: prom-error-handling>.

```smart header=" `async / await` و` prom.then / catch` " عندما نستخدم "غير متزامن / انتظار" ، نادرًا ما نحتاج إلى ". ثم" ، لأن "انتظار" يتعامل مع الانتظار. ويمكننا استخدام 'try..catch` العادية بدلاً من `.atch'. هذا عادة (ولكن ليس دائما) أكثر ملاءمة.

ولكن في المستوى العلوي من الشفرة ، عندما نكون خارج أي وظيفة "غير متزامن" ، يتعذر علينا استخدام "انتظار" من الناحية النحوية ، لذلك من المعتاد إضافة ".then / catch" للتعامل مع النتيجة النهائية أو خطأ السقوط ، كما هو الحال في السطر `(*)` من المثال أعلاه.

````

```smart header=" `async / await` يعمل بشكل جيد مع" Promise.all` "
عندما نحتاج إلى انتظار وعود متعددة ، يمكننا أن نلفها في "Promise.all" ثم "انتظر":

```js
// wait for the array of results
let results = await Promise.all([
  fetch(url1),
  fetch(url2),
  ...
]);
````

في حالة وجود خطأ ، يتم نشره كالمعتاد ، من الوعد الفاشل إلى "Promise.all" ، ثم يصبح استثناء يمكننا التقاطه باستخدام "try..catch" حول المكالمة.

```

## ملخص

الكلمة الأساسية `غير متزامن 'قبل دالة لها تأثيران:

1. يجعلها دائما تعيد الوعد.
2. يسمح باستخدام "ينتظر" لاستخدامه.

تجعل الكلمة الرئيسية "في انتظار" قبل الوعد جافا سكريبت تنتظر حتى يستقر هذا الوعد ، ثم:

<<<<<<< HEAD
1. إذا كان هناك خطأ ، فسيتم إنشاء الاستثناء - مثل استدعاء "خطأ في الخطأ" في ذلك المكان.
2. وإلا ، فإنها ترجع النتيجة.
=======
1. If it's an error, an exception is generated — same as if `throw error` were called at that very place.
2. Otherwise, it returns the result.
>>>>>>> 741d90ce8a730d66e987bff5e9794d6e41cb2f05

يوفرون معًا إطارًا رائعًا لكتابة رمز غير متزامن يسهل قراءته وكتابته.

باستخدام "غير متزامن / انتظار" ، نادرًا ما نحتاج إلى كتابة "وعد. ثم / التقاط" ، ولكن لا يزال يتعين علينا ألا ننسى أنها تستند إلى الوعود ، لأنه في بعض الأحيان (على سبيل المثال في النطاق الخارجي) علينا استخدام هذه الأساليب. كما أن "Promise.all" جميل عندما ننتظر العديد من المهام في وقت واحد.
```
