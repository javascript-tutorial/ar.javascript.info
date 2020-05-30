# الـgenerators والتكرار الغير متزامن

تسمح لنا المتكررات الغير متزامنة (Asynchronous iterators) أن نقوم بالتكرار على بيانات تأتى بشكل غير متزامن. على سبيل المثال عندما نقوم بتحميل شيئ ما من الشبكة جزءًا بعد جزء. والـgenerators الغير متزامنة تجعل ذلك مناسبًا أكثر.

هيا نرى مثالًا لنتعلم الشكل ثم نرى حالة استخدام حقيقية.

## المتكررات الغير متزامنة Async iterators

الـAsynchronous iterators تشبه المتكررات العادية مع قليل من الإختلافات فى التركيب.

الكائن المتكرر iterable object "العادى" تم وصفه فى فصل <info:iterable> وهو يكون كالآتى:

```js run
let range = {
  from: 1,
  to: 5,

  // يستدعى التكرار for..of هذه الدالة مرة واحده فى البداية
*!*
  [Symbol.iterator]() {
*/!*
    // ...تقوم بإرجاع الـiterator object:
    // يعمل التكرار مع هذا الكائن فقط,
    // ويتوقع منه القيم التالية باستخدام next()
    return {
      current: this.from,
      last: this.to,

      // next() يتم استدعاؤها فى كل دورة من قبل التكرار
*!*
      next() { // (2)
        // يجب أن ترجع القيمة كـ {done:.., value :...}
*/!*
        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};

for(let value of range) {
  alert(value); // 1 then 2, then 3, then 4, then 5
}
```

أنظر إلى فصل [المتكررات](info:iterable) لمزيد من التفاصيل عن المتكررات العادية.

لجعل الكائن (object) متكررًا بشكل غير متزامن:

1. نحتاج إلى أن نستعمل `Symbol.asyncIterator` بدلًا من `Symbol.iterator`.
2. يجب أن ترجع الدالة `next()` كائن promise.
3. للتكرار على كائن كهذا يجب أن نستخدم التكرار `for await (let item of iterable)`

هيا ننشئ متكرر `range` مثل السابق ولكن الآن سيقوم بإرجاع القيم بشكل غير متزامن، قيمة كل ثانية:

```js run
let range = {
  from: 1,
  to: 5,

  // يستدعى التكرار هذه الدالة مرة واحدة فى البداية
*!*
  [Symbol.asyncIterator]() { // (1)
*/!*
    // ...تقوم بإرجاع iterator object:
    // ويعمل التكرار for await..of مع هذا الكائن فقط,
    // سائلًا إياه عن القيمة التاالية باستخدام next()
    return {
      current: this.from,
      last: this.to,

      // next() يتم استدعاؤها فى كل دورة
*!*
      async next() { // (2)
        // يجب أن تقوم بإرجاع النتيجة كالآتى {done:.., value :...}
        // (وتُحاط تلقائيًا بـ promise عند استخدام async)
*/!*

*!*
        // يمكن استخدام await:
        await new Promise(resolve => setTimeout(resolve, 1000)); // (3)
*/!*

        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};

(async () => {

*!*
  for await (let value of range) { // (4)
    alert(value); // 1,2,3,4,5
  }
*/!*

})()
```

كما نرى فإن الشكل والتركيب مثل الـiterators العادية:

1. لجعل الكائن iterable بشكل غير متزامن، يجب أن يحتوى على الدالة `Symbol.asyncIterator` `(1)`.
2. هذه الدالة يجب أن تقوم بإرجاع الكائن باستخدام `next()` والتى تقوم بإرجاع promise `(2)`.
3. لا يجب أن تكون الدالة `next()` عباره عن `async` ويمكن أن تكون دالة عادية تُرجع promise ولكن الكلمة `async` تمكننا من استخدام الكلمة `await` وهذا مناسب. وهنا يمكننا التأخير ثانية `(3)`.
4. للقيام بالتكرار نستخدم التكرار `for await(let value of range)` `(4)` ونضع الكلمة "await" بعد "for". وهي تستدعي الدالة `range[Symbol.asyncIterator]()` مرة واحدة وثم الدالة `next()` من أجل القيم.

هنا ملخص بسيط:

|                              | Iterators         | Async iterators        |
| ---------------------------- | ----------------- | ---------------------- |
| الدوال لإنشاء متكرر          | `Symbol.iterator` | `Symbol.asyncIterator` |
| القيمة التى تُرجعها `next()` | أى فيمة           | `Promise`              |
| للتكرار، نستخدم              | `for..of`         | `for await..of`        |

````warn header="شكل الإنتشار `...` لا تعمل بشكل غير متزامن"
الأشياء التي تتطلب iterators عادية ومتزامنة synchronous لا تعمل فى المناطق الغير متزامنة.

على سبيل المثال، لا تعمل الـspread syntax:

```js
alert([...range]); // Error, no Symbol.iterator
```

وهذا طبيعى، لأنها تتوقع وجود الدالة `Symbol.iterator` مثل التكرار `for..of` من غير الكلمة `await` وليس `Symbol.asyncIterator`.
````

## الـgenerators الغير متزامنة

كما نعلم بالفعل أن الجافاسكريبت تدعم الـgenerators وهم أيضا iterables.

هيا نقوم باسترجاع التسلسل الذي أنشأناه فى الفصل [](info:generators). هذه الدالة تقوم بإنشاء تسلسل من القيم من `start` إلى `end`:

```js run
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

for(let value of generateSequence(1, 5)) {
  alert(value); // 1, then 2, then 3, then 4, then 5
}
```

فى الـgenerators العادية لا يمكننا استخدام االكلمة `await`. فكل القيم تأتي بشكل متزامن: لا يوجد مكان للتأخير فى التكرار `for..of` فهي متزامنة.

ولكن ماذا إذا أردنا أن نستخدم الكلمة `await` فى الـgenerator؟ للقيام بطلبات من الشبكة على سبيل المثال.

لا توجد مشكلة سنضع الكلمة `async` فى البداية كالآتى:

```js run
*!*async*/!* function* generateSequence(start, end) {

  for (let i = start; i <= end; i++) {

*!*
    // يمكنك استخدام await!
    await new Promise(resolve => setTimeout(resolve, 1000));
*/!*

    yield i;
  }

}

(async () => {

  let generator = generateSequence(1, 5);
  for *!*await*/!* (let value of generator) {
    alert(value); // 1, then 2, then 3, then 4, then 5
  }

})();
```

لدينا الآن async generator و أيضًا قابل للتكرار iterable باستخدام `for await...of`.

هذا سهل جدًا. نضيف الكلمة `async` ويمكن للـgenerator الآن أن يستخدم الكلمة `await` بداخله ومعتمدًا على الـpromises وغيره من الدوال الغير متزامنة.

عمليًا يوجد اختلاف آخر فى الـasync generator وهو أن `generator.next()` أصبحت غير متزامنة asynchronous أيضًا وتقوم بإرجاع promises.

فى أى generator عادي يمكن أن نستخدم `result = generator.next()` للحصول على القيم. وفى الـasync generator يجب أن نستخدم `await` كالآتى:

```js
result = await generator.next(); // result = {value: ..., done: true/false}
```

## المتكررات الغير متزامنة Async iterables

كما علمنا فإنه لجعل الكائن قابل للتكرار iterable فيجب أن نضيف له `Symbol.iterator`.

```js
let range = {
  from: 1,
  to: 5,
*!*
  [Symbol.iterator]() {
    return <object with next to make range iterable>
  }
*/!*
}
```

ومن الشائع أن تقوم `Symbol.iterator` بإرجاع generator بدلًا من كائن عادى باستخدام الدالة `next` كما فى مثال سابق.

هيا نسترجع مثالًا من فصل [](info:generators):

```js run
let range = {
  from: 1,
  to: 5,

  *[Symbol.iterator]() { // اختصارًا لـ [Symbol.iterator]: function*()
    for(let value = this.from; value <= this.to; value++) {
      yield value;
    }
  }
};

for(let value of range) {
  alert(value); // 1, then 2, then 3, then 4, then 5
}
```

هنا الكائن `range` متكرر والـgenerator `*[Symbol.iterator]` يصنع المنطق لعرض القيم كقائمة.

إذا أردنا أن نضيف أفعالًا غير متزامنة للـgenerator إذًا يجب أن نستبدل `Symbol.iterator` بالدالة `Symbol.asyncIterator`:

```js run
let range = {
  from: 1,
  to: 5,

*!*
  async *[Symbol.asyncIterator]() { // هو نفسه [Symbol.asyncIterator]: async function*()
*/!*
    for(let value = this.from; value <= this.to; value++) {

      // make a pause between values, wait for something
      await new Promise(resolve => setTimeout(resolve, 1000));

      yield value;
    }
  }
};

(async () => {

  for *!*await*/!* (let value of range) {
    alert(value); // 1, then 2, then 3, then 4, then 5
  }

})();
```

والآن تأتى القيم بتأخير ثانية بين كل قيمة.

## مثال عملي

لقد رأينا حتي الآن أمثلة بسيطة لفهم الأساسيات والآن هيا نري مثالًا عمليًا.

توجد الكثير من الخدمات التي تقدم بيانات متجزئة. على سبيل المثال عندما نريد قائمة من المستخدمين فإن الطلب يقوم بإرجاع رقم مُعطي سابقًا (مثلا 100 مستخدم) - فى الصفحة الواحدة وتعطي رابط للصفحة التالية.

هذا النمط شائع جدًا. وهذا ليس مع المستخدمين فقط ولكن مع كل شيئ. على سبيل المثال يمكننا موقع جيتهاب أن نسترجع الـcommits علي نفس التجزئة:

- يجب أن نقوم بطلب على رابط بهذا الشكل `https://api.github.com/repos/<repo>/commits`.
- فتقوم بالرد بـ JSON يتكون من 30 commits وأيضًا تعطي رابطًا للصفحة التالية فى الـ`Link` header.
- بعد ذلك يمكننا أن نستخدم هذا الرابط للطلب التالى للحصول على المزيد من الـcommits وهكذا.

ولكن نود أن نحصل على API أبسط: كائن قابل للتكرار يتكون من commits ولذلك يمكننا أن نكرر عليهم كالآتى:

```js
let repo = 'javascript-tutorial/en.javascript.info'; // GitHub repository to get commits from

for await (let commit of fetchCommits(repo)) {
  // process commit
}
```

نود أن ننشئ دالة `fetchCommits(repo)` بتجلب لنا الـcommits وترسل الطلبات عند الحاجة. وتهتم هي بالتجزئة وبالنسبة لنا ستكون مجرد `for await..of`.

وهذا سهل باستخدام الـasync generators:

```js
async function* fetchCommits(repo) {
  let url = `https://api.github.com/repos/${repo}/commits`;

  while (url) {
    const response = await fetch(url, { // (1)
      headers: {'User-Agent': 'Our script'}, // هذا ضرورى من أجل جيتهاب
    });

    const body = await response.json(); // (2) response is JSON (array of commits)

    // (3) رابط الصفحة التالية موجود فى الهيدرز فنستخرجه
    let nextPage = response.headers.get('Link').match(/<(.*?)>; rel="next"/);
    nextPage = nextPage?.[1];

    url = nextPage;

    for(let commit of body) { // (4) yield commits one by one, until the page ends
      yield commit;
    }
  }
}
```

1. استخدمنا الدالة [fetch](info:fetch) الموجودة فى المتصفح للتحميل من رابط بعيد. فهي تسمح لنا بأن نضع هيدرز للطلب كما نريد وهنا يحتاج جيتهاب إلى الهيدر `User-Agent`.
2. نتيجة الـfetch هي JSON مُحوَّل وهذه أيضًا دالة تخص الfetch.
3. ويجب أن نحصل على رابط الصفحة التالية\الجزء التالي من الهيدر المسمّي `Link` والموجود فى هيدرز الرد. وهذا شكل خاص لذلك سنحتاج إلى استخدام regexp من أجل ذلك. وسيكون رابط الجزء التالى كهذا `https://api.github.com/repositories/93253246/commits?page=2`. وهو هكذا من قبل جيتهاب.
4. بعد ذلك نقوم بإنتاج كل الـcommits التى وصلت إلينا وعندما ينتهون سيتم تنفيذ الدورة التالية من `while(url)` لعمل طلب آخر.

ومثال على الإستخدام:

```js run
(async () => {

  let count = 0;

  for await (const commit of fetchCommits('javascript-tutorial/en.javascript.info')) {

    console.log(commit.author.login);

    if (++count == 100) { // let's stop at 100 commits
      break;
    }
  }

})();
```

هذا ما أردناه فقط. وما يحدث داخليًا هو غير مرئي. وما نعرفه أنه مجرد async generator يقوم بإرجاع commits.

## الملخص

المتكررات الطبيعية Regular iterators والـ generators تعمل جيدًا مع البيانات التي لا تأخذ وقتًا ليتم إنتاجها.

عندما نتوقع أن تأتى البينات بشكل غير متزامن asynchronously بتأخير فيمكن عندئذ استخدام قدراتهم الغير متزامنة واستخدام التكرار `for await..of` بدلًا من `for..of`.

اختلاف الشكل ما بين المتكررات الطبيعية والغير متزامنه:

|       | Iterable | Async Iterable |
|-------|-----------|-----------------|
| الدالة لإنشاء متكرر | `Symbol.iterator` | `Symbol.asyncIterator` |
| القيمة التى تقوم بإرجاعها `next()`          | `{value:…, done: true/false}`         | `Promise` والذي يصل إلى `{value:…, done: true/false}`  |

الإختلاف فى الشكل بين الـasync و regular generators:

|       | Generators | Async generators |
|-------|-----------|-----------------|
| التعريف | `function*` | `async function*` |
| القيمة التى ترجعها `next()`          | `{value:…, done: true/false}`         | `Promise` والذي يصل إلى `{value:…, done: true/false}`  |


فى برمجة الويب نقابل غالبًا تدفقات من البيانات، عندما تأتى جزءًا بعد جزء. على سبيل المثال، تحميل أو رفع ملف كبير الحجم.

يمكننا استخدام الـasync generators لاستعمال بيانات كهذه. وجدير بالذكر أنه فى بعض البيئات مثل المتصفحات هناك أيضًا وسائل أخرى تسمي Streams والتى تعطي أشكالًا خاصة للتعامل مع التدفقات لتحويل البيانات وتمريرها من تدفق إلى آخر (مثل التحميل من مكان وإرساله فورًا إلى مكان آخر).
