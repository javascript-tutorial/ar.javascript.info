# الـgenerators والتكرار الغير متزامن

# Async iteration and generators

Asynchronous iteration allow us to iterate over data that comes asynchronously, on-demand. Like, for instance, when we download something chunk-by-chunk over a network. And asynchronous generators make it even more convenient.

## المتكررات الغير متزامنة Async iterators

## Recall iterables

Let's recall the topic about iterables.

The idea is that we have an object, such as `range` here:

```js
let range = {
  from: 1,
  to: 5,
};
```

...And we'd like to use `for..of` loop on it, such as `for(value of range)`, to get values from `1` to `5`.

In other words, we want to add an _iteration ability_ to the object.

That can be implemented using a special method with the name `Symbol.iterator`:

- This method is called in by the `for..of` construct when the loop is started, and it should return an object with the `next` method.
- For each iteration, the `next()` method is invoked for the next value.
- The `next()` should return a value in the form `{done: true/false, value:<loop value>}`, where `done:true` means the end of the loop.

Here's an implementation for the iterable `range`:

```js run
let range = {
  from: 1,
  to: 5,

*!*
  [Symbol.iterator]() { // called once, in the beginning of for..of
*/!*
    return {
      current: this.from,
      last: this.to,

*!*
      next() { // called every iteration, to get the next value
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
        // note: we can use "await" inside the async next:
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

Here's a small table with the differences:

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

That's natural, as it expects to find `Symbol.iterator`, not `Symbol.asyncIterator`.

It's also the case for `for..of`: the syntax without `await` needs `Symbol.iterator`.

`````

## Recall generators

Now let's recall generators, as they allow to make iteration code much shorter. Most of the time, when we'd like to make an iterable, we'll use generators.

For sheer simplicity, omitting some important stuff, they are "functions that generate (yield) values". They are explained in detail in the chapter [](info:generators).

Generators are labelled with `function*` (note the star) and use `yield` to generate a value, then we can use `for..of` to loop over them.

This example generates a sequence of values from `start` to `end`:

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

```js run
*!*async*/!* function* generateSequence(start, end) {

  for (let i = start; i <= end; i++) {

*!*
    // Wow, can use await!
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

As the generator is asynchronous, we can use `await` inside it, rely on promises, perform network requests and so on.

````smart header="Under-the-hood difference"
Technically, if you're an advanced reader who remembers the details about generators, there's an internal difference.

For async generators, the `generator.next()` method is asynchronous, it returns promises.

فى أى generator عادي يمكن أن نستخدم `result = generator.next()` للحصول على القيم. وفى الـasync generator يجب أن نستخدم `await` كالآتى:

```js
result = await generator.next(); // result = {value: ..., done: true/false}
```
That's why async generators work with `for await...of`.
`````

### Async iterable range

Regular generators can be used as `Symbol.iterator` to make the iteration code shorter.

Similar to that, async generators can be used as `Symbol.asyncIterator` to implement the asynchronous iteration.

For instance, we can make the `range` object generate values asynchronously, once per second, by replacing synchronous `Symbol.iterator` with asynchronous `Symbol.asyncIterator`:

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

والآن تأتى القيم بتأخير ثانية بين كل قيمة.

```smart
Technically, we can add both `Symbol.iterator` and `Symbol.asyncIterator` to the object, so it's both synchronously (`for..of`) and asynchronously (`for await..of`) iterable.

In practice though, that would be a weird thing to do.
```

## Real-life example: paginated data

So far we've seen basic examples, to gain understanding. Now let's review a real-life use case.

توجد الكثير من الخدمات التي تقدم بيانات متجزئة. على سبيل المثال عندما نريد قائمة من المستخدمين فإن الطلب يقوم بإرجاع رقم مُعطي سابقًا (مثلا 100 مستخدم) - فى الصفحة الواحدة وتعطي رابط للصفحة التالية.

This pattern is very common. It's not about users, but just about anything.

For instance, GitHub allows us to retrieve commits in the same, paginated fashion:

- We should make a request to `fetch` in the form `https://api.github.com/repos/<repo>/commits`.
- It responds with a JSON of 30 commits, and also provides a link to the next page in the `Link` header.
- Then we can use that link for the next request, to get more commits, and so on.

For our code, we'd like to have a simpler way to get commits.

Let's make a function `fetchCommits(repo)` that gets commits for us, making requests whenever needed. And let it care about all pagination stuff. For us it'll be a simple async iteration `for await..of`.

So the usage will be like this:

```js
for await (let commit of fetchCommits('username/repository')) {
  // process commit
}
```

Here's such function, implemented as async generator:

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

More explanations about how it works:

1. We use the browser [fetch](info:fetch) method to download the commits.

   - The initial URL is `https://api.github.com/repos/<repo>/commits`, and the next page will be in the `Link` header of the response.
   - The `fetch` method allows us to supply authorization and other headers if needed -- here GitHub requires `User-Agent`.

2. The commits are returned in JSON format.
3. We should get the next page URL from the `Link` header of the response. It has a special format, so we use a regular expression for that (we will learn this feature in [Regular expressions](info:regular-expressions)).
   - The next page URL may look like `https://api.github.com/repositories/93253246/commits?page=2`. It's generated by GitHub itself.
4. Then we yield the received commits one by one, and when they finish, the next `while(url)` iteration will trigger, making one more request.

ومثال على الإستخدام:

```js run
(async () => {
  let count = 0;

  for await (const commit of fetchCommits('javascript-tutorial/en.javascript.info')) {
<<<<<<< HEAD
    console.log(commit.author.login);
=======

    console.log(commit.author.name);
>>>>>>> 0f748275e20a81700c8514f22a7cc80c4422d09c

    if (++count == 100) {
      // let's stop at 100 commits
      break;
    }
  }
})();

// Note: If you are running this in an external sandbox, you'll need to paste here the function fetchCommits described above 
```

That's just what we wanted.

The internal mechanics of paginated requests is invisible from the outside. For us it's just an async generator that returns commits.

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
