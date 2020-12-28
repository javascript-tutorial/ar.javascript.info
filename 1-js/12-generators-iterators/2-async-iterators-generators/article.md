# الـgenerators والتكرار الغير متزامن

<<<<<<< HEAD
تسمح لنا المتكررات الغير متزامنة (Asynchronous iterators) أن نقوم بالتكرار على بيانات تأتى بشكل غير متزامن. على سبيل المثال عندما نقوم بتحميل شيئ ما من الشبكة جزءًا بعد جزء. والـgenerators الغير متزامنة تجعل ذلك مناسبًا أكثر.

هيا نرى مثالًا لنتعلم الشكل ثم نرى حالة استخدام حقيقية.
=======
# Async iteration and generators

Asynchronous iteration allow us to iterate over data that comes asynchronously, on-demand. Like, for instance, when we download something chunk-by-chunk over a network. And asynchronous generators make it even more convenient.
>>>>>>> 13da056653754765b50aa5a9f706f84a4a0d6293

## المتكررات الغير متزامنة Async iterators

<<<<<<< HEAD
الـAsynchronous iterators تشبه المتكررات العادية مع قليل من الإختلافات فى التركيب.

الكائن المتكرر iterable object "العادى" تم وصفه فى فصل <info:iterable> وهو يكون كالآتى:
=======
## Recall iterables

Let's recall the topic about iterables. 

The idea is that we have an object, such as `range` here:
```js
let range = {
  from: 1,
  to: 5
};
```

...And we'd like to use `for..of` loop on it, such as `for(value of range)`, to get values from `1` to `5`.

In other words, we want to add an *iteration ability* to the object.

That can be implemented using a special method with the name `Symbol.iterator`:

- This method is called in by the `for..of` construct when the loop is started, and it should return an object with the `next` method.
- For each iteration, the `next()` method is invoked for the next value.
- The `next()` should return a value in the form `{done: true/false, value:<loop value>}`, where `done:true` means the end of the loop.

Here's an implementation for the iterable `range`:
>>>>>>> 13da056653754765b50aa5a9f706f84a4a0d6293

```js run
let range = {
  from: 1,
  to: 5,

<<<<<<< HEAD
  // يستدعى التكرار for..of هذه الدالة مرة واحده فى البداية
=======
>>>>>>> 13da056653754765b50aa5a9f706f84a4a0d6293
*!*
  [Symbol.iterator]() { // called once, in the beginning of for..of
*/!*
<<<<<<< HEAD
    // ...تقوم بإرجاع الـiterator object:
    // يعمل التكرار مع هذا الكائن فقط,
    // ويتوقع منه القيم التالية باستخدام next()
=======
>>>>>>> 13da056653754765b50aa5a9f706f84a4a0d6293
    return {
      current: this.from,
      last: this.to,

<<<<<<< HEAD
      // next() يتم استدعاؤها فى كل دورة من قبل التكرار
*!*
      next() { // (2)
        // يجب أن ترجع القيمة كـ {done:.., value :...}
=======
*!*
      next() { // called every iteration, to get the next value
>>>>>>> 13da056653754765b50aa5a9f706f84a4a0d6293
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

<<<<<<< HEAD
أنظر إلى فصل [المتكررات](info:iterable) لمزيد من التفاصيل عن المتكررات العادية.

لجعل الكائن (object) متكررًا بشكل غير متزامن:

1. نحتاج إلى أن نستعمل `Symbol.asyncIterator` بدلًا من `Symbol.iterator`.
2. يجب أن ترجع الدالة `next()` كائن promise.
3. للتكرار على كائن كهذا يجب أن نستخدم التكرار `for await (let item of iterable)`

هيا ننشئ متكرر `range` مثل السابق ولكن الآن سيقوم بإرجاع القيم بشكل غير متزامن، قيمة كل ثانية:
=======
If anything is unclear, please visit the chapter [](info:iterable), it gives all the details about regular iterables.

## Async iterables

Asynchronous iteration is needed when values come asynchronously: after `setTimeout` or another kind of delay. 

The most common case is that the object needs to make a network request to deliver the next value, we'll see a real-life example of it a bit later.

To make an object iterable asynchronously:

1. Use `Symbol.asyncIterator` instead of `Symbol.iterator`.
2. The `next()` method should return a promise (to be fulfilled with the next value).
    - The `async` keyword handles it, we can simply make `async next()`.
3. To iterate over such an object, we should use a `for await (let item of iterable)` loop.
    - Note the `await` word.

As a starting example, let's make an iterable `range` object, similar like the one before, but now it will return values asynchronously, one per second.

All we need to do is to perform a few replacements in the code above:
>>>>>>> 13da056653754765b50aa5a9f706f84a4a0d6293

```js run
let range = {
  from: 1,
  to: 5,

<<<<<<< HEAD
  // يستدعى التكرار هذه الدالة مرة واحدة فى البداية
*!*
  [Symbol.asyncIterator]() { // (1)
*/!*
    // ...تقوم بإرجاع iterator object:
    // ويعمل التكرار for await..of مع هذا الكائن فقط,
    // سائلًا إياه عن القيمة التاالية باستخدام next()
=======
*!*
  [Symbol.asyncIterator]() { // (1)
*/!*
>>>>>>> 13da056653754765b50aa5a9f706f84a4a0d6293
    return {
      current: this.from,
      last: this.to,

<<<<<<< HEAD
      // next() يتم استدعاؤها فى كل دورة
*!*
      async next() { // (2)
        // يجب أن تقوم بإرجاع النتيجة كالآتى {done:.., value :...}
        // (وتُحاط تلقائيًا بـ promise عند استخدام async)
*/!*

*!*
        // يمكن استخدام await:
=======
*!*
      async next() { // (2)
*/!*

*!*
        // note: we can use "await" inside the async next:
>>>>>>> 13da056653754765b50aa5a9f706f84a4a0d6293
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

<<<<<<< HEAD
هنا ملخص بسيط:
=======
Here's a small table with the differences:
>>>>>>> 13da056653754765b50aa5a9f706f84a4a0d6293

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

<<<<<<< HEAD
وهذا طبيعى، لأنها تتوقع وجود الدالة `Symbol.iterator` مثل التكرار `for..of` من غير الكلمة `await` وليس `Symbol.asyncIterator`.
````

## الـgenerators الغير متزامنة

كما نعلم بالفعل أن الجافاسكريبت تدعم الـgenerators وهم أيضا iterables.

هيا نقوم باسترجاع التسلسل الذي أنشأناه فى الفصل [](info:generators). هذه الدالة تقوم بإنشاء تسلسل من القيم من `start` إلى `end`:
=======
That's natural, as it expects to find `Symbol.iterator`, not `Symbol.asyncIterator`.

It's also the case for `for..of`: the syntax without `await` needs `Symbol.iterator`.
````

## Recall generators

Now let's recall generators, as they allow to make iteration code much shorter. Most of the time, when we'd like to make an iterable, we'll use generators.

For sheer simplicity, omitting some important stuff, they are "functions that generate (yield) values". They are explained in detail in the chapter [](info:generators).

Generators are labelled with `function*` (note the star) and use `yield` to generate a value, then we can use `for..of` to loop over them.

This example generates a sequence of values from `start` to `end`:
>>>>>>> 13da056653754765b50aa5a9f706f84a4a0d6293

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

<<<<<<< HEAD
فى الـgenerators العادية لا يمكننا استخدام االكلمة `await`. فكل القيم تأتي بشكل متزامن: لا يوجد مكان للتأخير فى التكرار `for..of` فهي متزامنة.

ولكن ماذا إذا أردنا أن نستخدم الكلمة `await` فى الـgenerator؟ للقيام بطلبات من الشبكة على سبيل المثال.

لا توجد مشكلة سنضع الكلمة `async` فى البداية كالآتى:
=======
As we already know, to make an object iterable, we should add `Symbol.iterator` to it.

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

A common practice for `Symbol.iterator` is to return a generator, it makes the code shorter, as you can see:

```js run
let range = {
  from: 1,
  to: 5,

  *[Symbol.iterator]() { // a shorthand for [Symbol.iterator]: function*()
    for(let value = this.from; value <= this.to; value++) {
      yield value;
    }
  }
};

for(let value of range) {
  alert(value); // 1, then 2, then 3, then 4, then 5
}
```

Please see the chapter [](info:generators) if you'd like more details.

In regular generators we can't use `await`. All values must come synchronously, as required by the `for..of` construct.

What if we'd like to generate values asynchronously? From network requests, for instance. 

Let's switch to asynchronous generators to make it possible.

## Async generators (finally)

For most practical applications, when we'd like to make an object that asynchronously generates a sequence of values, we can use an asynchronous generator.

The syntax is simple: prepend `function*` with `async`. That makes the generator asynchronous.

And then use `for await (...)` to iterate over it, like this:
>>>>>>> 13da056653754765b50aa5a9f706f84a4a0d6293

```js run
*!*async*/!* function* generateSequence(start, end) {

  for (let i = start; i <= end; i++) {

*!*
<<<<<<< HEAD
    // يمكنك استخدام await!
=======
    // Wow, can use await!
>>>>>>> 13da056653754765b50aa5a9f706f84a4a0d6293
    await new Promise(resolve => setTimeout(resolve, 1000));
*/!*

    yield i;
  }

}

(async () => {

  let generator = generateSequence(1, 5);
  for *!*await*/!* (let value of generator) {
    alert(value); // 1, then 2, then 3, then 4, then 5 (with delay between)
  }

})();
```

<<<<<<< HEAD
لدينا الآن async generator و أيضًا قابل للتكرار iterable باستخدام `for await...of`.

هذا سهل جدًا. نضيف الكلمة `async` ويمكن للـgenerator الآن أن يستخدم الكلمة `await` بداخله ومعتمدًا على الـpromises وغيره من الدوال الغير متزامنة.

عمليًا يوجد اختلاف آخر فى الـasync generator وهو أن `generator.next()` أصبحت غير متزامنة asynchronous أيضًا وتقوم بإرجاع promises.
=======
As the generator is asynchronous, we can use `await` inside it, rely on promises, perform network requests and so on.

````smart header="Under-the-hood difference"
Technically, if you're an advanced reader who remembers the details about generators, there's an internal difference.

For async generators, the `generator.next()` method is asynchronous, it returns promises.
>>>>>>> 13da056653754765b50aa5a9f706f84a4a0d6293

فى أى generator عادي يمكن أن نستخدم `result = generator.next()` للحصول على القيم. وفى الـasync generator يجب أن نستخدم `await` كالآتى:

```js
result = await generator.next(); // result = {value: ..., done: true/false}
```
That's why async generators work with `for await...of`.
````

<<<<<<< HEAD
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
=======
### Async iterable range
>>>>>>> 13da056653754765b50aa5a9f706f84a4a0d6293

Regular generators can be used as `Symbol.iterator` to make the iteration code shorter.

<<<<<<< HEAD
هنا الكائن `range` متكرر والـgenerator `*[Symbol.iterator]` يصنع المنطق لعرض القيم كقائمة.

إذا أردنا أن نضيف أفعالًا غير متزامنة للـgenerator إذًا يجب أن نستبدل `Symbol.iterator` بالدالة `Symbol.asyncIterator`:
=======
Similar to that, async generators can be used as `Symbol.asyncIterator` to implement the asynchronous iteration.

For instance, we can make the `range` object generate values asynchronously, once per second, by replacing synchronous `Symbol.iterator` with asynchronous `Symbol.asyncIterator`:
>>>>>>> 13da056653754765b50aa5a9f706f84a4a0d6293

```js run
let range = {
  from: 1,
  to: 5,

  // this line is same as [Symbol.asyncIterator]: async function*() {
*!*
<<<<<<< HEAD
  async *[Symbol.asyncIterator]() { // هو نفسه [Symbol.asyncIterator]: async function*()
=======
  async *[Symbol.asyncIterator]() {
>>>>>>> 13da056653754765b50aa5a9f706f84a4a0d6293
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

<<<<<<< HEAD
## مثال عملي

لقد رأينا حتي الآن أمثلة بسيطة لفهم الأساسيات والآن هيا نري مثالًا عمليًا.
=======
```smart
Technically, we can add both `Symbol.iterator` and `Symbol.asyncIterator` to the object, so it's both synchronously (`for..of`) and asynchronously (`for await..of`) iterable.

In practice though, that would be a weird thing to do.
```

## Real-life example: paginated data

So far we've seen basic examples, to gain understanding. Now let's review a real-life use case.
>>>>>>> 13da056653754765b50aa5a9f706f84a4a0d6293

توجد الكثير من الخدمات التي تقدم بيانات متجزئة. على سبيل المثال عندما نريد قائمة من المستخدمين فإن الطلب يقوم بإرجاع رقم مُعطي سابقًا (مثلا 100 مستخدم) - فى الصفحة الواحدة وتعطي رابط للصفحة التالية.

<<<<<<< HEAD
هذا النمط شائع جدًا. وهذا ليس مع المستخدمين فقط ولكن مع كل شيئ. على سبيل المثال يمكننا موقع جيتهاب أن نسترجع الـcommits علي نفس التجزئة:

- يجب أن نقوم بطلب على رابط بهذا الشكل `https://api.github.com/repos/<repo>/commits`.
- فتقوم بالرد بـ JSON يتكون من 30 commits وأيضًا تعطي رابطًا للصفحة التالية فى الـ`Link` header.
- بعد ذلك يمكننا أن نستخدم هذا الرابط للطلب التالى للحصول على المزيد من الـcommits وهكذا.

ولكن نود أن نحصل على API أبسط: كائن قابل للتكرار يتكون من commits ولذلك يمكننا أن نكرر عليهم كالآتى:
=======
This pattern is very common. It's not about users, but just about anything. 

For instance, GitHub allows us to retrieve commits in the same, paginated fashion:

- We should make a request to `fetch` in the form `https://api.github.com/repos/<repo>/commits`.
- It responds with a JSON of 30 commits, and also provides a link to the next page in the `Link` header.
- Then we can use that link for the next request, to get more commits, and so on.

For our code, we'd like to have a simpler way to get commits.
>>>>>>> 13da056653754765b50aa5a9f706f84a4a0d6293

Let's make a function `fetchCommits(repo)` that gets commits for us, making requests whenever needed. And let it care about all pagination stuff. For us it'll be a simple async iteration `for await..of`.

So the usage will be like this:

```js
for await (let commit of fetchCommits("username/repository")) {
  // process commit
}
```

<<<<<<< HEAD
نود أن ننشئ دالة `fetchCommits(repo)` بتجلب لنا الـcommits وترسل الطلبات عند الحاجة. وتهتم هي بالتجزئة وبالنسبة لنا ستكون مجرد `for await..of`.

وهذا سهل باستخدام الـasync generators:
=======
Here's such function, implemented as async generator:
>>>>>>> 13da056653754765b50aa5a9f706f84a4a0d6293

```js
async function* fetchCommits(repo) {
  let url = `https://api.github.com/repos/${repo}/commits`;

  while (url) {
    const response = await fetch(url, { // (1)
<<<<<<< HEAD
      headers: {'User-Agent': 'Our script'}, // هذا ضرورى من أجل جيتهاب
=======
      headers: {'User-Agent': 'Our script'}, // github needs any user-agent header
>>>>>>> 13da056653754765b50aa5a9f706f84a4a0d6293
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

<<<<<<< HEAD
1. استخدمنا الدالة [fetch](info:fetch) الموجودة فى المتصفح للتحميل من رابط بعيد. فهي تسمح لنا بأن نضع هيدرز للطلب كما نريد وهنا يحتاج جيتهاب إلى الهيدر `User-Agent`.
2. نتيجة الـfetch هي JSON مُحوَّل وهذه أيضًا دالة تخص الfetch.
3. ويجب أن نحصل على رابط الصفحة التالية\الجزء التالي من الهيدر المسمّي `Link` والموجود فى هيدرز الرد. وهذا شكل خاص لذلك سنحتاج إلى استخدام regexp من أجل ذلك. وسيكون رابط الجزء التالى كهذا `https://api.github.com/repositories/93253246/commits?page=2`. وهو هكذا من قبل جيتهاب.
4. بعد ذلك نقوم بإنتاج كل الـcommits التى وصلت إلينا وعندما ينتهون سيتم تنفيذ الدورة التالية من `while(url)` لعمل طلب آخر.
=======
More explanations about how it works:

1. We use the browser [fetch](info:fetch) method to download the commits.

    - The initial URL is `https://api.github.com/repos/<repo>/commits`, and the next page will be in the `Link` header of the response.
    - The `fetch` method allows us to supply authorization and other headers if needed -- here GitHub requires `User-Agent`.
2. The commits are returned in JSON format.
3. We should get the next page URL from the `Link` header of the response. It has a special format, so we use a regular expression for that (we will learn this feature in [Regular expressions](info:regular-expressions)).
    - The next page URL may look like `https://api.github.com/repositories/93253246/commits?page=2`. It's generated by GitHub itself.
4. Then we yield the received commits one by one, and when they finish, the next `while(url)` iteration will trigger, making one more request.
>>>>>>> 13da056653754765b50aa5a9f706f84a4a0d6293

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

<<<<<<< HEAD
هذا ما أردناه فقط. وما يحدث داخليًا هو غير مرئي. وما نعرفه أنه مجرد async generator يقوم بإرجاع commits.
=======
That's just what we wanted. 

The internal mechanics of paginated requests is invisible from the outside. For us it's just an async generator that returns commits.
>>>>>>> 13da056653754765b50aa5a9f706f84a4a0d6293

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
