
# التعامل مع الأخطاء في الـ `promises` 

سلاسل الـ `promises` رائعة في معالجة الأخطاء. عندما يرفض الوعد ، يقفز عنصر التحكم إلى أقرب معالج رفض. هذا مريح للغاية في الممارسة.

على سبيل المثال ، في التعليمات البرمجية أسفل عنوان URL لـ `جلب 'غير صحيح (لا يوجد مثل هذا الموقع) ويتعامل` .atch' مع الخطأ:

```js run
*!*
fetch('https://no-such-server.blabla') // rejects
*/!*
  .then(response => response.json())
  .catch(err => alert(err)) // TypeError: failed to fetch (the text may vary)
```

كما ترى ، لا يجب أن يكون "الصيد" فوريًا. قد تظهر بعد واحد أو ربما عدة "ثم".

أو ، ربما ، كل شيء على ما يرام مع الموقع ، ولكن الإجابة غير صالحة لـ JSON. أسهل طريقة للقبض على جميع الأخطاء هي إلحاق ".catch" بنهاية السلسلة:

```js run
fetch('/article/promise-chaining/user.json')
  .then(response => response.json())
  .then(user => fetch(`https://api.github.com/users/${user.name}`))
  .then(response => response.json())
  .then(githubUser => new Promise((resolve, reject) => {
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
      resolve(githubUser);
    }, 3000);
  }))
*!*
  .catch(error => alert(error.message));
*/!*
```

عادةً ، لا يتم تشغيل ".catch" على الإطلاق. ولكن إذا رفض أي من الوعود أعلاه (مشكلة في الشبكة أو json غير صالح أو أيا كان) ، فسوف يلتقطها.

## Implicit try..catch

رمز تنفيذ الوعد ومعالجو الوعد يحتوي على "محاولة غير مرئية" غير مرئية حوله. إذا حدث استثناء ، يتم القبض عليه ومعاملته على أنه رفض.

على سبيل المثال ، هذا الكود:

```js run
new Promise((resolve, reject) => {
*!*
  throw new Error("Whoops!");
*/!*
}).catch(alert); // Error: Whoops!
```

... يعمل تمامًا مثل هذا:

```js run
new Promise((resolve, reject) => {
*!*
  reject(new Error("Whoops!"));
*/!*
}).catch(alert); // Error: Whoops!
```

الـ `try..catch` غير المرئية حول المنفذ تقوم بالتقاط الحطأ بشكل أوتوماتيكي ويحوله إلى `rejected promise`. 

يحدث هذا ليس فقط في وظيفة المنفذ ، ولكن في معالجاتها أيضًا. إذا قمنا "بإلقاء" داخل معالج ".then" ، فهذا يعني وعدًا مرفوضًا ، لذلك ينتقل عنصر التحكم إلى أقرب معالج أخطاء.

إليك مثال:

```js run
new Promise((resolve, reject) => {
  resolve("ok");
}).then((result) => {
*!*
  throw new Error("Whoops!"); // rejects the promise
*/!*
}).catch(alert); // Error: Whoops!
```

يحدث هذا لجميع الأخطاء ، وليس فقط تلك التي تسببها عبارة `throw`. على سبيل المثال ، خطأ في البرمجة:

```js run
new Promise((resolve, reject) => {
  resolve("ok");
}).then((result) => {
*!*
  blabla(); // no such function
*/!*
}).catch(alert); // ReferenceError: blabla is not defined
```

لا يكتفي "catch" النهائي برفض صريح فحسب ، بل يشتمل أيضًا على أخطاء عرضية في المعالجات أعلاه.

## إعادة رمي الخطأ

كما لاحظنا بالفعل ، ".catch" في نهاية السلسلة يشبه "try..catch". قد يكون لدينا العدد الذي تريده من معالجات "then`" ، ثم نستخدم ".catch" واحدًا في النهاية للتعامل مع الأخطاء في جميعها.

في "المحاولة .. المصيد" العادية ، يمكننا تحليل الخطأ وربما إعادة ترميمه إذا لم يكن من الممكن معالجته. نفس الشيء ممكن للوعود.

إذا قمنا `بإلقاء` داخل` .catch` ، فسينتقل عنصر التحكم إلى أقرب معالج أخطاء التالي. وإذا تعاملنا مع الخطأ وانتهينا بشكل طبيعي ، فسيستمر إلى أقرب معالج `.then` التالي.

في المثال أدناه يتعامل `catch` بنجاح مع الخطأ:

```js run
// the execution: catch -> then
new Promise((resolve, reject) => {

  throw new Error("Whoops!");

}).catch(function(error) {

  alert("The error is handled, continue normally");

}).then(() => alert("Next successful handler runs"));
```

هنا تنتهي كتلة "الصيد" بشكل طبيعي. لذلك يتم استدعاء معالج ".then" الناجح التالي.

في المثال أدناه نرى الموقف الآخر مع ".catch". معالج `(*)` يمسك الخطأ ولا يمكنه التعامل معه (على سبيل المثال ، فهو يعرف فقط كيفية التعامل مع `URIError`) ، لذا فإنه يرميه مرة أخرى:

```js run
// the execution: catch -> catch -> then
new Promise((resolve, reject) => {

  throw new Error("Whoops!");

}).catch(function(error) { // (*)

  if (error instanceof URIError) {
    // handle it
  } else {
    alert("Can't handle such error");

*!*
    throw error; // throwing this or another error jumps to the next catch
*/!*
  }

}).then(function() {
  /* doesn't run here */
}).catch(error => { // (**)

  alert(`The unknown error has occurred: ${error}`);
  // don't return anything => execution goes the normal way

});
```

يقفز التنفيذ من أول ".catch" `(*)` إلى التالي `(**)` أسفل السلسلة.

## حالات الرفض التي لم تتم معالجتها

ماذا يحدث عندما لا يتم معالجة الخطأ؟ على سبيل المثال ، نسينا إلحاق "الصيد" بنهاية السلسلة ، كما يلي:

```js untrusted run refresh
new Promise(function() {
  noSuchFunction(); // Error here (no such function)
})
  .then(() => {
    // successful promise handlers, one or more
  }); // without .catch at the end!
```

Iفي حالة وجود خطأ ، يصبح الوعد مرفوضًا ، ويجب أن يقفز التنفيذ إلى أقرب معالج رفض. ولكن لا يوجد شيء. لذلك "عالق" الخطأ. لا يوجد رمز للتعامل معها.

من الناحية العملية ، تمامًا كما هو الحال مع الأخطاء العادية التي لم تتم معالجتها في التعليمات البرمجية ، فهذا يعني أن شيئًا ما قد حدث خطأ فادحًا.

ماذا يحدث عند حدوث خطأ عادي ولا يتم اكتشافه بواسطة "try..catch"؟ يموت البرنامج النصي مع رسالة في وحدة التحكم. يحدث شيء مماثل مع رفض الوعد غير المعالج.

يتتبع محرك جافا سكريبت حالات الرفض هذه ويولد خطأً عامًا في هذه الحالة. يمكنك رؤيته في وحدة التحكم إذا قمت بتشغيل المثال أعلاه.

في المتصفح يمكننا اكتشاف مثل هذه الأخطاء باستخدام الحدث `unhandledrejection`:

```js run
*!*
window.addEventListener('unhandledrejection', function(event) {
  // the event object has two special properties:
  alert(event.promise); // [object Promise] - the promise that generated the error
  alert(event.reason); // Error: Whoops! - the unhandled error object
});
*/!*

new Promise(function() {
  throw new Error("Whoops!");
}); // no catch to handle the error
```

الحدث هو جزء من [معيار HTML] (https://html.spec.whatwg.org/multipage/webappapis.html#unhandled-promise-rejections).

إذا حدث خطأ ، ولم يكن هناك "التقاط" ، فسيتم تشغيل معالج "unhandledrejection" ، ويحصل على كائن "الحدث" مع معلومات حول الخطأ ، حتى نتمكن من القيام بشيء ما.

عادة ما تكون مثل هذه الأخطاء غير قابلة للاسترداد ، لذلك أفضل طريقة للخروج هي إبلاغ المستخدم بالمشكلة وربما الإبلاغ عن الحادث إلى الخادم.

في البيئات غير المستعرضة مثل Node.js ، هناك طرق أخرى لتتبع الأخطاء التي لم تتم معالجتها.

## ملخص

- يعالج `.catch` الأخطاء في الوعود بجميع أنواعها: سواء كان استدعاء` `رفض ()` أو خطأ تم طرحه في معالج.
- يجب وضع ".catch" بالضبط في الأماكن التي نرغب في معالجة الأخطاء فيها ومعرفة كيفية التعامل معها. يجب أن يقوم المعالج بتحليل الأخطاء (تساعد فئات الأخطاء المخصصة) وإعادة إنشاء الأخطاء غير المعروفة (ربما تكون أخطاء برمجة).
- لا بأس بعدم استخدام "الصيد" على الإطلاق ، إذا لم تكن هناك طريقة للتعافي من خطأ.
- على أي حال ، يجب أن يكون لدينا معالج الأحداث `unhandledrejection` (للمتصفحات والنظير للبيئات الأخرى) لتتبع الأخطاء التي لم تتم معالجتها وإبلاغ المستخدم (وربما خادمنا) بشأنها ، حتى لا يموت تطبيقنا أبدًا.