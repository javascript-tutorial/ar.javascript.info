# الـgenerators والتكرار الغير متزامن

# التكرار اللامتزامن والمولدات

يسمح لنا التكرار اللامتزامن بالتكرار على البيانات التي تأتي بشكل لامتزامن، حسب الطلب. مثل، على سبيل المثال، عندما نقوم بتنزيل شيء تدريجيًا عبر الشبكة. وتجعل المولدات اللامتزامنة ذلك أكثر ملاءمة.


## المتكررات الغير متزامنة Async iterators

## تذكر المتكررات

دعنا نستدعي الموضوع حول المتكررات.

الفكرة هي أن لدينا كائنًا، مثل `range` هنا:

```js
let range = {
  from: 1,
  to: 5,
};
```

... ونريد استخدام حلقة `for..of` عليه، مثل `for(value of range)`، للحصول على القيم من `1` إلى `5`.

بعبارة أخرى، نريد إضافة "قابلية التكرار" إلى الكائن.

يمكن تنفيذ ذلك باستخدام طريقة خاصة بالاسم `Symbol.iterator`:

- يتم استدعاء هذه الطريقة من قبل بناء `for..of` عند بدء الحلقة، ويجب أن تعيد كائنًا يحتوي على الطريقة `next`.
- في كل تكرار، ييتم استدعاء طريقة `next()` للحصول على القيمة التالية.
- يجب أن ترجع الطريقة `next()` قيمة في الشكل `{done: true/false, value:<loop value>}`، حيث يعني `done:true` نهاية الحلقة.

هنا تنفيذ للمتكرر `range`:

```js run
let range = {
  from: 1,
  to: 5,

*!*
  [Symbol.iterator]() { // يستدعى مرة واحدة، في بداية for..of
*/!*
    return {
      current: this.from,
      last: this.to,

*!*
      next() { // يستدعى في كل تكرار، للحصول على القيمة التالية
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
  alert(value); // 1 ثم 2، ثم 3، ثم 4،ثم 5
}
```

إذا كانت هناك أي عدم وضوح، يرجى زيارة الفصل [](info:iterable)، حيث يوفر كافة التفاصيل حول المتكررات العادية.

## المتكررات الأسنكرونية

التكرار الأسنكروني يُحتاج عندما تأتي القيم بشكل أسنكروني: بعد `setTimeout` أو نوع آخر من التأخير.

الحالة الأكثر شيوعًا هي أن الكائن يحتاج إلى إجراء طلب شبكة لتسليم القيمة التالية، وسنرى مثالًا حيًا عليه لاحقًا.

لجعل كائن قابلًا للتكرار بشكل أسنكروني:

1. استخدم `Symbol.asyncIterator` بدلاً من `Symbol.iterator`.
2. يجب أن ترجع التابع `next()` وعدًا (ليتم الوفاء به بالقيمة التالية).
   - يتعامل الكلمة `async` مع ذلك، لذلك يمكننا ببساطة جعل `next()` مُشار إليها بـ `async`.
3. لتكرار مثل هذا الكائن، يجب علينا استخدام حلقة `for await (let item of iterable)`، حيث يتم استخدام كلمة `await`.
   
لنبدأ بمثال لجعل كائن `range` قابلًا للتكرار بشكل أسنكروني، وشبيه بالذي سبق، ولكنه الآن سيعيد القيم بشكل أسنكروني، واحدة في الثانية.

كل ما نحتاج إلى فعله هو إجراء بعض الاستبدالات في الشفرة أعلاه:

```js run
let range = {
  from: 1,
  to: 5,

*!*
  [Symbol.asyncIterator]() { // (1)
*/!*
    return {
      current: this.from,
      last: this.to,

*!*
      async next() { // (2)
*/!*

*!*
        // ملاحظة: يمكننا استخدام "await" داخل next ويتم التعامل معها باستخدام async:
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

هذا جدول صغير يوضح الفروقات:

|                              | Iterators         | Async iterators        |
| ---------------------------- | ----------------- | ---------------------- |
| الدوال لإنشاء متكرر          | `Symbol.iterator` | `Symbol.asyncIterator` |
| القيمة التى تُرجعها `next()` | أى فيمة           | `Promise`              |
| للتكرار، نستخدم              | `for..of`         | `for await..of`        |

````warn header="شكل الإنتشار `...` لا تعمل بشكل غير متزامن"
الأشياء التي تتطلب iterators عادية ومتزامنة synchronous لا تعمل فى المناطق الغير متزامنة.

على سبيل المثال، لا تعمل الـspread syntax:

```js
alert([...range]); // خطأ، لا يوجد Symbol.iterator
```

هذا طبيعي، حيث يتوقع العثور على `Symbol.iterator` وليس `Symbol.asyncIterator`.

هذا أيضًا الحال بالنسبة لـ `for..of`: الصيغة بدون `await` تحتاج إلى `Symbol.iterator`.

`````

## إستدعاء المولدات

دعونا نستدعي المولدات، حيث تسمح بجعل كود التكرار أقصر بكثير. في معظم الأحيان، عندما نريد جعل شيء مكرر، سنستخدم المولدات.

للبساطة، بدون بعض الأشياء المهمة، فإنها "دوال تنتج (تصدر) قيمًا". لقد تم شرحها بالتفصيل في الفصل [](info:generators).

تتم وسم المولدات باستخدام `function*` (لاحظ النجمة) واستخدام `yield` لإصدار قيمة، ثم يمكننا استخدام `for..of` للحلقة عليها.

يقوم هذا المثال بتوليد سلسلة من القيم من `start` إلى `end`:

```js run
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

for(let value of generateSequence(1, 5)) {
  alert(value); // 1، ثم 2، ثم 3، ثم 4، ثم 5
}
```

كما نعلم بالفعل، لجعل كائن مكرر، يجب أن نضيف `Symbol.iterator` إليه.

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

الممارسة الشائعة لـ `Symbol.iterator` هي إرجاع مولد، حيث يجعل الكود أقصر، كما يمكنك ملاحظته:

```js run
let range = {
  from: 1,
  to: 5,

  *[Symbol.iterator]() { // اختصار لـ [Symbol.iterator]: function*()
    for(let value = this.from; value <= this.to; value++) {
      yield value;
    }
  }
};

for(let value of range) {
  alert(value); // 1، ثم 2، ثم 3، ثم 4، ثم 5
}
```

يرجى الرجوع إلى الفصل [](info:generators) إذا كنت ترغب في المزيد من التفاصيل.

في المولدات العادية، لا يمكننا استخدام `await`. يجب أن تأتي كافة القيم بنفس المزامنة كما هو مطلوب من بناء الحلقة `for..of`.

ماذا لو كنا نريد إنشاء قيم بشكل غير متزامن؟ من طلبات الشبكة، على سبيل المثال.

دعونا ننتقل إلى المولدات الغير متزامنة لجعل ذلك ممكناً.

## المولدات الغير متزامنة (أخيراً)

لمعظم التطبيقات العملية، عندمانريد جعل كائن يولد سلسلة من القيم بشكل غير متزامن، يمكننا استخدام مولد غير متزامن.

الصيغة بسيطة: نقوم بإضافة `async` قبل `function*` وذلك يجعل المولد غير متزامن.

ثم نستخدم `for await (...)` للتكرار عليه، كما يلي:

```js run
*!*async*/!* function* generateSequence(start, end) {

  for (let i = start; i <= end; i++) {

*!*
    // مذهل، يمكن الاستفادة من await!
    await new Promise(resolve => setTimeout(resolve, 1000));
*/!*

    yield i;
  }

}

(async () => {

  let generator = generateSequence(1, 5);
  for *!*await*/!* (let value of generator) {
    alert(value); // 1، ثم 2، ثم 3، ثم 4، ثم 5 (مع تأخير بينها)
  }

})();
```

ونظراً لأن المولد هو غير متزامن، يمكننا استخدام `await` داخله، والاعتماد على الوعود، والقيام بطلبات الشبكة وهكذا.

````smart header="الفروقات تحت الغطاء"
في الجوانب التقنية، إذا كنت قارئًا متقدمًا يتذكر تفاصيل المولدات، فهناك فرقًا داخليًا.

بالنسبة للمولدات الغير متزامنة، فإن طريقة `generator.next()` هي غير متزامنة، حيث تعيد الوعود.

في المولدات العادية يمكننا استخدام `result = generator.next()` للحصول على القيم. وفي المولدات الغير متزامنة، يجب أن نستخدم `await` كما يلي:

```js
result = await generator.next(); // result = {value: ..., done: true/false}
```
That's why async generators work with `for await...of`.
`````

### Async iterable range

يمكن استخدام المولدات العادية كـ `Symbol.iterator` لجعل رمز التكرار أقصر.

بالمثل، يمكن استخدام المولدات الغير متزامنة كـ `Symbol.asyncIterator` لتنفيذ التكرار الغير متزامن.

على سبيل المثال، يمكننا جعل كائن `range` يولد القيم بشكل غير متزامن، مرة كل ثانية، عن طريق استبدال `Symbol.iterator` الغير متزامن بـ `Symbol.asyncIterator` الغير متزامن:

```js run
let range = {
  from: 1,
  to: 5,

  // this line is same as [Symbol.asyncIterator]: async function*() {
*!*
  async *[Symbol.asyncIterator]() {
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

وبهذا، تأتي القيم بتأخير ثانية بين كل قيمة.

```smart
من الناحية التقنية، يمكننا إضافة كل من `Symbol.iterator` و `Symbol.asyncIterator` إلى الكائن، لذلك يمكن تكراره بشكل متزامن (`for..of`) وغير متزامن (`for await..of`).

على الرغم من ذلك، في الممارسة العملية، سيكون ذلك أمرًا غريبًا.
```

## مثال حي: بيانات متجزئة

حتى الآن رأينا أمثلة أساسية، لتحقيق الفهم. الآن دعونا نستعرض حالة استخدام حقيقية.

توجد العديد من الخدمات التي توفر البيانات بشكل متجزئ. على سبيل المثال، عندما نريد الحصول على قائمة مستخدمين، يتم إرجاع عدد محدد مسبقًا من المستخدمين (مثلاً 100 مستخدم) في كل صفحة، ويتم توفير رابط للصفحة التالية.

هذا النمط شائع جداً، وليس مقتصراً على الأمور المتعلقة بالمستخدمين فقط، بل يمكن استخدامه في أي شيء آخر.

على سبيل المثال، يسمح GitHub لنا بالحصول على Commits بنفس النمط المقسم:

- يجب علينا إجراء طلب `fetch` باستخدام الرابط `https://api.github.com/repos/<repo>/commits`.
- يتم الرد علينا بـ JSON يحتوي على 30 Commit، ويتم توفير رابط للصفحة التالية في رأس `Link`.
- يمكننا استخدام هذا الرابط في الطلب التالي للحصول على المزيد من Commits وهكذا.

بالنسبة لشفرتنا، نود أن يكون لدينا طريقة أبسط للحصول على التزامات.

للحصول على Commits بطريقة أبسط، سنقوم بإنشاء دالة `fetchCommits(repo)` التي تحصل على Commits بالنسبة لنا، وتقوم بإجراء الطلبات كلما دعت الحاجة، وتهتم بجميع أمور التجزئة. بالنسبة لنا، سيكون ذلك تكرارًا غير متزامن وبسيط باستخدام `for await..of`.

لذلك، سيكون الاستخدام على النحو التالي:

```js
for await (let commit of fetchCommits('username/repository')) {
  // process commit
}
```

هذه هي الدالة، التي تم تنفيذها كمولد غير متزامن:

```js
async function* fetchCommits(repo) {
  let url = `https://api.github.com/repos/${repo}/commits`;

  while (url) {
    const response = await fetch(url, {
      // (1)
      headers: { 'User-Agent': 'Our script' }, // github needs any user-agent header
    });

    const body = await response.json(); // (2) response is JSON (array of commits)

    // (3) رابط الصفحة التالية موجود فى الهيدرز فنستخرجه
    let nextPage = response.headers.get('Link').match(/<(.*?)>; rel="next"/);
    nextPage = nextPage?.[1];

    url = nextPage;

    for (let commit of body) {
      // (4) yield commits one by one, until the page ends
      yield commit;
    }
  }
}
```

مزيد من التفسيرات حول كيفية عملها:

1. نستخدم طريقة [fetch](info:fetch) للمتصفح لتنزيل التزامات.

 - العنوان الأولي هو `https://api.github.com/repos/<repo>/commits`، وستكون الصفحة التالية في رأس `Link` للرد.
 - تسمح لنا طريقة `fetch` بتوفير التفويض ورؤوس أخرى إذا لزم الأمر - هنا يتطلب GitHub `User-Agent`.

2. يتم إرجاع التزامات بتنسيق JSON.
3. يجب علينا الحصول على عنوان URL للصفحة التالية من رأس `Link` للرد. لديه تنسيق خاص، لذلك نستخدم تعبيرًا عاديًا لذلك (سنتعلم هذه الميزة في [Regular expressions](info:regular-expressions)).
 - قد يبدو عنوان URL للصفحة التالية مثل `https://api.github.com/repositories/93253246/commits?page=2`. يتم إنشاؤه بواسطة GitHub نفسه.
4. ثم نُظهِر التزامات المستلمة واحدًا تلو الآخر، وعندما تنتهي، ستُطلِق تكرار `while(url)` التالي، مما يجعل طلبًا آخر.

ومثال على الإستخدام:

```js run
(async () => {
  let count = 0;

  for await (const commit of fetchCommits('javascript-tutorial/en.javascript.info')) {
    console.log(commit.author.login);

    if (++count == 100) {
      // let's stop at 100 commits
      break;
    }
  }
})();

// Note: If you are running this in an external sandbox, you'll need to paste here the function fetchCommits described above 
```

هذا ما نريده.

آليات الطلبات المتجزئة الداخلية غير مرئية من الخارج. بالنسبة لأجلنا هو مجرد مولد غير متزامن يعيد التزامات.

## الملخص

المتكررات الطبيعية Regular iterators والـ generators تعمل جيدًا مع البيانات التي لا تأخذ وقتًا ليتم إنتاجها.

عندما نتوقع أن تأتى البينات بشكل غير متزامن asynchronously بتأخير فيمكن عندئذ استخدام قدراتهم الغير متزامنة واستخدام التكرار `for await..of` بدلًا من `for..of`.

اختلاف الشكل ما بين المتكررات الطبيعية والغير متزامنه:

|                                    | Iterable                      | Async Iterable                                        |
| ---------------------------------- | ----------------------------- | ----------------------------------------------------- |
| الدالة لإنشاء متكرر                | `Symbol.iterator`             | `Symbol.asyncIterator`                                |
| القيمة التى تقوم بإرجاعها `next()` | `{value:…, done: true/false}` | `Promise` والذي يصل إلى `{value:…, done: true/false}` |

الإختلاف فى الشكل بين الـasync و regular generators:

|                             | Generators                    | Async generators                                      |
| --------------------------- | ----------------------------- | ----------------------------------------------------- |
| التعريف                     | `function*`                   | `async function*`                                     |
| القيمة التى ترجعها `next()` | `{value:…, done: true/false}` | `Promise` والذي يصل إلى `{value:…, done: true/false}` |

فى برمجة الويب نقابل غالبًا تدفقات من البيانات، عندما تأتى جزءًا بعد جزء. على سبيل المثال، تحميل أو رفع ملف كبير الحجم.

يمكننا استخدام الـasync generators لاستعمال بيانات كهذه. وجدير بالذكر أنه فى بعض البيئات مثل المتصفحات هناك أيضًا وسائل أخرى تسمي Streams والتى تعطي أشكالًا خاصة للتعامل مع التدفقات لتحويل البيانات وتمريرها من تدفق إلى آخر (مثل التحميل من مكان وإرساله فورًا إلى مكان آخر).
