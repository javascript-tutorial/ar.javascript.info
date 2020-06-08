# Promisification

"Promisification" هي كلمة طويلة للتحول البسيط. إنه تحويل دالة تقبل رد الاتصال إلى دالة ترجع promise.

غالبًا ما تكون هذه التحولات مطلوبة في الحياة الواقعية ، حيث تعتمد العديد من الوظائف والمكتبات على رد الاتصال. لكن الوعود أكثر ملاءمة ، لذلك من المنطقي أن نعدها.

على سبيل المثال ، لدينا `loadScript (src ، callback)` من الفصل <info:callbacks>.

```js run
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));

  document.head.append(script);
}

// usage:
// loadScript('path/script.js', (err, script) => {...})
```

لنحولها إلى promise. تحقق وظيفة `تحميل loadScriptPromise (src)` نفس النتيجة ، لكنها تقبل `src` فقط (لا` رد اتصال`) وتعيد promise.

```js
let loadScriptPromise = function(src) {
  return new Promise((resolve, reject) => {
    loadScript(src, (err, script) => {
      if (err) reject(err)
      else resolve(script);
    });
  })
}

// usage:
// loadScriptPromise('path/script.js').then(...)
```

الآن يتلاءم `loadScriptPromise` جيدًا مع التعليمات البرمجية المستندة إلى promises.

كما نرى ، فإنه يفوض كل العمل إلى `تحميل` الأصلي `، مما يوفر رد الاتصال الخاص به الذي يترجم إلى الوعد` حل / رفض`.

من الناحية العملية ، ربما نحتاج إلى الوعد بالعديد من الوظائف ، لذلك من المنطقي استخدام المساعد. سنطلق عليه `promisify (f)`: يقبل وظيفة to-promisify `f` ويعيد دالة مجمعة.

يعمل هذا المجمّع كما هو الحال في الرمز أعلاه: إرجاع وعد وتمرير المكالمة إلى `f` الأصلي ، وتتبع النتيجة في رد اتصال مخصص:

```js
function promisify(f) {
  return function (...args) { // return a wrapper-function
    return new Promise((resolve, reject) => {
      function callback(err, result) { // our custom callback for f
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }

      args.push(callback); // append our custom callback to the end of f arguments

      f.call(this, ...args); // call the original function
    });
  };
};

// usage:
let loadScriptPromise = promisify(loadScript);
loadScriptPromise(...).then(...);
```

هنا نفترض أن الوظيفة الأصلية تتوقع رد اتصال بحججتين `(خطأ ، نتيجة)`. هذا ما نواجهه في أغلب الأحيان. ثم يكون رد الاتصال المخصص الخاص بنا بالتنسيق الصحيح تمامًا ، ويعمل `promisify` بشكل رائع لمثل هذه الحالة.

ولكن ماذا لو توقع `f` الأصلي رد اتصال به المزيد من الوسائط` callback  (err ، res1 ، res2 ، ...) `؟

في ما يلي نسخة أكثر تقدمًا من "promisify": إذا تم تسميتها باسم "promisify (f، true)` ، فستكون نتيجة الوعد مجموعة من نتائج الاستدعاء`[res1, res2, ...]`:

```js
// promisify(f, true) to get array of results
function promisify(f, manyArgs = false) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      function *!*callback(err, ...results*/!*) { // our custom callback for f
        if (err) {
          reject(err);
        } else {
          // resolve with all callback results if manyArgs is specified
          *!*resolve(manyArgs ? results : results[0]);*/!*
        }
      }

      args.push(callback);

      f.call(this, ...args);
    });
  };
};

// usage:
f = promisify(f, true);
f(...).then(arrayOfResults => ..., err => ...)
```

لمزيد من تنسيقات رد الاتصال الغريبة ، مثل تلك التي لا تحتوي على `err` على الإطلاق:` رد الاتصال (النتيجة) `، يمكننا أن نعد هذه الوظائف يدويًا دون استخدام المساعد.

هناك أيضًا وحدات ذات وظائف واعدة أكثر مرونة قليلاً ، على سبيل المثال [es6-promisify] (https://github.com/digitaldesignlabs/es6-promisify). في Node.js ، توجد وظيفة `` use.promisify` مضمنة لذلك.

`` ذكي
يعد Promisification نهجًا رائعًا ، خاصة عند استخدام `async / await` (انظر الفصل التالي) ، ولكن ليس بديلاً كليًا لعمليات الاسترجاعات.

تذكر أن الوعد قد يكون له نتيجة واحدة فقط ، ولكن قد يتم استدعاء الاستدعاء من الناحية الفنية عدة مرات.

لذا فإن Promisification مخصص فقط للوظائف التي تستدعي الاستدعاء مرة واحدة. سيتم تجاهل مكالمات أخرى.
``