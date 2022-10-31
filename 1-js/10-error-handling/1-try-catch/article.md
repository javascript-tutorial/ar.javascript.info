# Error handling, "try...catch"

بغض النظر عن مدى روعتنا في البرمجة ، في بعض الأحيان تحتوي أكوادنا على أخطاء. قد تحدث بسبب أخطائنا ، إدخال المستخدم معلومة غير متوقعة ، واستجابة خاطئة للخادم ، ولآلاف الأسباب الأخرى.

عادة "يتعطل" البرنامج في حالة حدوث خطأ (يتوقف فورًا) ، مع ظهور الخطأ في وحدة التحكم.

But there's a syntax construct `try...catch` that allows us to "catch" errors so the script can, instead of dying, do something more reasonable.

## The "try...catch" syntax

The `try...catch` construct has two main blocks: `try`, and then `catch`:

```js
try {
  // code...
} catch (err) {
  // error handling
}
```

يعمل كالتالي:

1. First, the code in `try {...}` is executed.
2. If there were no errors, then `catch (err)` is ignored: the execution reaches the end of `try` and goes on, skipping `catch`.
3. If an error occurs, then the `try` execution is stopped, and control flows to the beginning of `catch (err)`. The `err` variable (we can use any name for it) will contain an error object with details about what happened.

![](try-catch-flow.svg)

So, an error inside the `try {...}` block does not kill the script -- we have a chance to handle it in `catch`.

دعونا نلقي نظرة على بعض الأمثلة.

- مثال بدون أخطاء: يظهر `alert` `(1)` و `alert` `(2)`:

  ```js run
  try {
    alert('بداية عمل try'); // *!*(1) <--*/!*

    // ...لا توجد أخطاء هنا

    alert('نهاية عمل try'); // *!*(2) <--*/!*
  } catch (err) {
    alert('بما أنه لا توجد أخطاء , تم تجاهل Catch'); // (3)
  }
  ```

- مثال مع وجود خطأ: يظهر `alert` `(1)` و `alert` `(3)`:

  ```js run
  try {

    alert('بداية عمل try');  // *!*(1) <--*/!*

  *!*
    lalala; // خطأ ، لم يتم تعريف المتغير!
  */!*

    alert('نهاية عمل try (لن يشتغل)');  // (2)

  } catch (err) {

    alert(`حدث خطأ !`); // *!*(3) <--*/!*

  }
  ```

````warn header="`try...catch`only works for runtime errors" For`try...catch` to work, the code must be runnable. In other words, it should be valid JavaScript.

لن يعمل إذا كان الكود خاطئًا من الناحية النحوية ، على سبيل المثال يحتوي على أقواس و معقفات ناقصة:

```js run
try {
  {{{{{{{{{{{{
} catch (err) {
  alert("The engine can't understand this code, it's invalid");
}
```

يقرأ محرك JavaScript الكود أولاً ، ثم يشغلها. تسمى الأخطاء التي تحدث في مرحلة القراءة بأخطاء "وقت التحليل" ولا يمكن إصلاحها (من داخل هذا الكود). ذلك لأن المحرك لا يستطيع فهم الكود.

So, `try...catch` can only handle errors that occur in valid code. Such errors are called "runtime errors" or, sometimes, "exceptions".

`````


````warn header="`try...catch` works synchronously"
If an exception happens in "scheduled" code, like in `setTimeout`, then `try...catch` won't catch it:

```js run
try {
  setTimeout(function() {
    noSuchVariable; // سيتوقف البرنامج هنا
  }, 1000);
} catch (err) {
  alert( "won't work" );
}
```

That's because the function itself is executed later, when the engine has already left the `try...catch` construct.

To catch an exception inside a scheduled function, `try...catch` must be inside that function:
```js run
setTimeout(function() {
  try {
    noSuchVariable; // try...catch handles the error!
  } catch {
    alert( "error is caught here!" );
  }
}, 1000);
```
`````

## الكائن الخطأ

عند حدوث خطأ ، يقوم JavaScript بإنشاء كائن يحتوي على تفاصيل خاصة به. ثم يتم تمرير الكائن كوسيطة في `catch`:

```js
try {
  // ...
} catch (err) {
  // <-- the "error object", could use another word instead of err
  // ...
}
```

بالنسبة لجميع الأخطاء المضمنة ، يحتوي هذا الكائن على خاصيتين رئيسيتين:

`name`
: اسم الخطأ. على سبيل المثال ، لمتغير غير محدد ، هذا `"ReferenceError"`.

`message`
: رسالة نصية حول تفاصيل الخطأ.

هناك خصائص أخرى غير قياسية متاحة في معظم البيئات. واحدة من الأكثر استخدامًا ودعمًا هي:

`stack`
: مكدس الاستدعاء الحالي: سلسلة تحتوي على معلومات حول تسلسل الإستدعاءات المتداخلة التي أدت إلى الخطأ. تستخدم لأغراض التصحيح.

على سبيل المثال:

```js run untrusted
try {
*!*
  lalala; // error, variable is not defined!
*/!*
} catch (err) {
  alert(err.name); // ReferenceError
  alert(err.message); // lalala is not defined
  alert(err.stack); // ReferenceError: lalala is not defined at (...call stack)

  // Can also show an error as a whole
  // The error is converted to string as "name: message"
  alert(err); // ReferenceError: lalala is not defined
}
```

## "catch" دون متغير

[recent browser=new]

إذا لم نكن بحاجة إلى تفاصيل الخطأ, `catch` يمكن أن تحثفه:

```js
try {
  // ...
} catch {
  // <-- بدون (err)
  // ...
}
```

## Using "try...catch"

Let's explore a real-life use case of `try...catch`.

كما نعلم بالفعل, JavaScript تدعم [JSON.parse(str)](mdn:js/JSON/parse) لقراءة قيمة JSON-encoded.

عادة يتم استخدامه لفك تشفير البيانات المستلمة عبر الشبكة ، من الخادم أو مصدر آخر.

نتلقى ذلك وندعو `JSON.parse` مثل التالي:

```js run
let json = '{"name":"John", "age": 30}'; // البيانات من الخادم

*!*
let user = JSON.parse(json); // تحويل النص إلى كائن JS
*/!*

// الآن هو كائن له خصائص من النص user
alert( user.name ); // John
alert( user.age );  // 30
```

يمكنك العثور على معلومات أكثر تفصيلاً حول JSON في فصل <info:json>.

**إذا `json` تالف, `JSON.parse` يولد خطأ, و "يتوقف" البرنامج.**

هل يجب أن نكون راضين عن ذلك؟ بالطبع لا!

بهذه الطريقة ، إذا كان هناك خطأ ما في البيانات ، فلن يعرف الزائر مطلقًا ذلك (ما لم يفتح وحدة تحكم مطور البرامج). والناس لا يحبون حقا عندما يتوقف شيء ما دون أي رسالة خطأ.

Let's use `try...catch` to handle the error:

```js run
let json = "{ bad json }";

try {

*!*
  let user = JSON.parse(json); // <-- عندما يحدث خطأ...
*/!*
  alert( user.name ); // لا يعمل

} catch (err) {
*!*
  // ...the execution jumps here
  alert( "Our apologies, the data has errors, we'll try to request it one more time." );
  alert( err.name );
  alert( err.message );
*/!*
}
```

هنا نستخدم `catch` فقط لإظهار الرسالة, كن يمكننا القيام بالمزيد: إرسال طلب شبكة جديد ، اقتراح بديل للزائر ، إرسال معلومات حول الخطأ إلى منشأة تسجيل ، .... كل شيء أفضل من توقف البرنامج.

## صناعة الأخطاء الخاصة

ماذا إذا `json` صحيح من الناحية اللغوية ، ولكن ليس له خاصية `name` ?

مثل هذا:

```js run
let json = '{ "age": 30 }'; // بيانات غير مكتملة

try {

  let user = JSON.parse(json); // <-- لا أخطاء
*!*
  alert( user.name ); // لا يوجد اسم !
*/!*

} catch (err) {
  alert( "doesn't execute" );
}
```

خنا يعمل `JSON.parse` بطريقة عادية, لكن غياب `name` في الواقع هو خطأ بالنسبة لنا.

التوحيد معالجة الأخطاء ، سنستخدم العامل `throw`.

### العامل "Throw"

العامل `throw` يولد خطأ.

نقوم بكتابته كالتالي:

```js
throw <error object>
```

من الناحية التقنية, يمكننا استخدام أي شيء ككائن خطأ. قد يكون حتى بدائيًا مثل رقم أو سلسلة ، ولكن من الأفضل أن يكون كائنًا ، ويفضل أن يكون مع خصائص `name` و `message` (للتوافق مع الأخطاء المضمنة).

يحتوي JavaScript على العديد من المنشئات المدمجة للأخطاء القياسية: `Error`, `SyntaxError`, `ReferenceError`, `TypeError` و اخرين. يمكننا استخدامها لإنشاء كائنات خطأ أيضًا.

نقوم بكتابتهم كالتالي:

```js
let error = new Error(message);
// or
let error = new SyntaxError(message);
let error = new ReferenceError(message);
// ...
```

للأخطاء المضمنة (ليس لأي كائنات ، للأخطاء فقط) ، خاصية `name` هي بالضبط اسم المنشئ. وتأخذ خاصية `message` من العوامل .

على سبيل المثال:

```js run
let error = new Error('حدث شيء ما o_O');

alert(error.name); // خطأ
alert(error.message); // حدث شيء ما o_O
```

دعونا نرى أي نوع من الأخطاء يولد `JSON.parse`:

```js run
try {
  JSON.parse("{ bad json o_O }");
} catch (err) {
*!*
  alert(err.name); // SyntaxError
*/!*
  alert(err.message); // Unexpected token b in JSON at position 2
}
```

كما نرى ، هذا هو `SyntaxError`.

وفي حالتنا غياب `name` خطأ ، حيث يجب أن يكون لدى المستخدمين `name`.

لذا دعونا نضف throw:

```js run
let json = '{ "age": 30 }'; // بيانات غير مكتملة

try {

  let user = JSON.parse(json); // <-- لا اخطاء

  if (!user.name) {
*!*
    throw new SyntaxError("بيانات غير مكتملة: no name"); // (*)
*/!*
  }

  alert( user.name );

} catch (err) {
  alert( "JSON Error: " + err.message ); // JSON Error: Incomplete data: no name
}
```

في السطر `(*)`, `throw` يولد `SyntaxError` مع المعطى `message`, بنفس الطريقة التي تولدها JavaScript بنفسها.
عمل `try` يتوقف على الفور و يتنقل إلى `catch`.

الان `catch` أصبح مكانًا واحدًا لكل معالجة الأخطاء: كلاهما لـ `JSON.parse` وحالات أخرى.

## إعادة رمي الإستثناءات

In the example above we use `try...catch` to handle incorrect data. But is it possible that _another unexpected error_ occurs within the `try {...}` block? Like a programming error (variable is not defined) or something else, not just this "incorrect data" thing.

فمثلا:

```js run
let json = '{ "age": 30 }'; // بيانات غير مكتملة

try {
  user = JSON.parse(json); // <-- user قبل "let" نسيت أن تضع

  // ...
} catch (err) {
  alert('JSON Error: ' + err); // JSON Error: ReferenceError: user is not defined
  // (no JSON Error actually)
}
```

بالطبع ، كل شيء ممكن! المبرمجون يرتكبون الأخطاء. حتى في المرافق المفتوحة المصدر التي يستخدمها الملايين لعقود - فجأة يمكن اكتشاف خطأ يؤدي إلى اختراق رهيب.

In our case, `try...catch` is placed to catch "incorrect data" errors. But by its nature, `catch` gets _all_ errors from `try`. Here it gets an unexpected error, but still shows the same `"JSON Error"` message. That's wrong and also makes the code more difficult to debug.

**يجب أن يقوم Catch بمعالجة الأخطاء التي يعرفها و "إعادة رمي" كل الآخرين فقط.**

يمكن شرح تقنية "إعادة الرمي" بمزيد من التفصيل على النحو التالي:

1. Catch يحصل على جميع الأخطاء.
2. في `catch(err) {...}` نقوم بتحليل كائن الخطأ `err`.
3. إذا لم نكن نعرف كيف نتعامل معها ، فنفعل `throw err`.

4. Catch gets all errors.
5. In the `catch (err) {...}` block we analyze the error object `err`.
6. If we don't know how to handle it, we do `throw err`.

Usually, we can check the error type using the `instanceof` operator:

```js run
try {
  user = { /*...*/ };
} catch (err) {
*!*
  if (err instanceof ReferenceError) {
*/!*
    alert('ReferenceError'); // "ReferenceError" للوصول إلى متغير غير محدد

  }
}
```

يمكننا أيضًا الحصول على اسم فئة الخطأ من خاصية `err.name`. جميع الأخطاء الأصلية لديها هذه الخاصية. خيار آخر هو قراءة err.constructor.name.

في الكود أدناه ، نستخدم إعادة رمي بحيث `catch` يعالج فقط `SyntaxError`:

```js run
let json = '{ "age": 30 }'; // بيانات غير مكتملة
try {

  let user = JSON.parse(json);

  if (!user.name) {
    throw new SyntaxError("بيانات غير مكتملة: لا وجود لي name");
  }

*!*
  blabla(); // خطأ غير متوقع
*/!*

  alert( user.name );

} catch (err) {

*!*
  if (err instanceof SyntaxError) {
    alert( "JSON Error: " + err.message );
  } else {
    throw err; // rethrow (*)
  }
*/!*

}
```

The error throwing on line `(*)` from inside `catch` block "falls out" of `try...catch` and can be either caught by an outer `try...catch` construct (if it exists), or it kills the script.

إذا `catch` تعالج في الواقع الأخطاء التي تعرف كيف تتعامل معها و" تتخطى "جميع الآخرين.

The example below demonstrates how such errors can be caught by one more level of `try...catch`:

```js run
function readData() {
  let json = '{ "age": 30 }';

  try {
    // ...
*!*
    blabla(); // خطأ!
*/!*
  } catch (err) {
    // ...
    if (!(err instanceof SyntaxError)) {
*!*
      throw err; // rethrow (don't know how to deal with it)
*/!*
    }
  }
}

try {
  readData();
} catch (err) {
*!*
  alert( "External catch got: " + err ); // caught it!
*/!*
}
```

Here `readData` only knows how to handle `SyntaxError`, while the outer `try...catch` knows how to handle everything.

## try...catch...finally

انتظر ، هذا ليس كل شيء.

The `try...catch` construct may have one more code clause: `finally`.

إذا كان موجودًا ، فإنه يعمل في جميع الحالات:

- بعد `try`, إذا لم تكن هناك أخطاء ،
- بعد `catch`, إذا كانت هناك أخطاء.

تبدو الصيغة الموسعة كما يلي:

```js
*!*try*/!* {
   ... try to execute the code ...
} *!*catch*/!* (err) {
   ... handle errors ...
} *!*finally*/!* {
   ... يعمل في جميع الحالات ...
}
```

حاول تشغيل هذا الكود:

```js run
try {
  alert('try');
  if (confirm('Make an error?')) BAD_CODE();
} catch (err) {
  alert('catch');
} finally {
  alert('أخيرا');
}
```

يحتوي الكود على طريقتين للتنفيذ:

1. إذا أجبت بـ "نعم" على "أخطأت؟", ثم `try -> catch -> finally`.
2. إذا قلت "لا", ثم `try -> finally`.

غالبًا ما يتم استخدام عبارة `finally` عندما نبدأ في فعل شيء ونريد الانتهاء منه في أي حالة من النتائج.

على سبيل المثال ، نريد قياس الوقت الذي تستغرقه دالة أرقام فيبوناتشي `fib(n)`. بطبيعة الحال ، يمكننا البدء في القياس قبل تشغيلها والانتهاء منها بعد ذلك. ولكن ماذا لو كان هناك خطأ أثناء استدعاء الدالة؟ على وجه الخصوص ، يؤدي تنفيذ `fib(n)` في الكود أدناه إلى إرجاع خطأ للأرقام السالبة أو غير الصحيحة.

عبارة `finally` هي مكان عظيم لإنهاء القياسات مهما كانت.

هنا `finally` يضمن أن الوقت سيتم قياسه بشكل صحيح في كلتا الحالتين - في حالة تنفيذ `fib` بنجاح وفي حالة حدوث خطأ فيه:

```js run
let num = +prompt("أدخل رقم صحيح موجب؟", 35)

let diff, result;

function fib(n) {
  if (n < 0 || Math.trunc(n) != n) {
    throw new Error("يجب ألا تكون سالبة ، وكذلك عددًا صحيحًا.");
  }
  return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

let start = Date.now();

try {
  result = fib(num);
} catch (err) {
  result = 0;
*!*
} finally {
  diff = Date.now() - start;
}
*/!*

alert(result || "حدث خطأ");

alert( `${diff}ms مدة الإشتغال` );
```

يمكنك التحقق عن طريق تشغيل الكود بإدخال `35` في `prompt` -- يتم تنفيذه بشكل طبيعي, `finally` بعد `try`. ثم أدخل `-1` -- سيكون هناك خطأ فوري ، وسيستغرق التنفيذ `0ms`. تم إجراء القياسات بشكل صحيح.

بمعنى آخر ، قد تنتهي الدالة بـ `return` أو `throw`, وهذا لا يهم. تشتغل `finally` في كلتا الحالتين.

```smart header="Variables are local inside `try...catch...finally`" Please note that `result`and`diff`variables in the code above are declared *before*`try...catch`.

وبخلاف ذلك ، إذا أعلنا عن `let` في `try`, فسوف تكون مرئية فقط داخلها.

`````

````smart header="`finally` and `return`"
The `finally` clause works for *any* exit from `try...catch`. That includes an explicit `return`.

في المثال أدناه ، هناك `return` في `try`.  في هذه الحالة ، تعمل `finally` قبل العودة إلى الكود الخارجي مباشرةً.

```js run
function func() {

  try {
*!*
    return 1;
*/!*

  } catch (err) {
    /* ... */
  } finally {
*!*
    alert( 'finally' );
*/!*
  }
}

alert( func() ); // يعمل التنبيه أولاً من finally ، ثم هذا
`````

`````

````smart header="`try...finally`"

The `try...finally` construct, without `catch` clause, is also useful. We apply it when we don't want to handle errors here (let them fall through), but want to be sure that processes that we started are finalized.

```js
function func() {
  // ابدأ في فعل شيء يحتاج إلى إكمال (مثل القياسات)
  try {
    // ...
  } finally {
    // أكمل هذا الشيء حتى لو توقف كل شيء
  }
}
```
في الكود أعلاه ، هناك خطأ داخل `try` دائمًا ما يقع ، لأنه لا يوجد `catch`. ولكن  `finally` يعمل قبل أن يترك التنفيذ الدالة.
`````

## catch شاملة

```warn header="Environment-specific"
المعلومات الواردة في هذا القسم ليست جزءًا من أساسيات JavaScript.
```

Let's imagine we've got a fatal error outside of `try...catch`, and the script died. Like a programming error or some other terrible thing.

هل هناك طريقة للرد على مثل هذه الحوادث؟ قد نرغب في تسجيل الخطأ وإظهار شيء للمستخدم (عادةً لا يرون رسائل خطأ) ، إلخ.

لا يوجد شيء في المواصفات ، ولكن البيئات توفرها عادةً ، لأنها مفيدة حقًا. على سبيل المثال, Node.js له [`process.on("uncaughtException")`](https://nodejs.org/api/process.html#process_event_uncaughtexception) for that. And in the من أجل هذا. وفي المتصفح يمكننا تعيين دالة للعامل الخاص [window.onerror](mdn:api/GlobalEventHandlers/onerror),التي سيتم تشغيلها في حالة وجود خطأ غير معلوم.

بناء الجملة:

```js
window.onerror = function (message, url, line, col, error) {
  // ...
};
```

`message`
: رسالة خطأ.

`url`
: عنوان URL للنص البرمجي حيث حدث خطأ.

`line`, `col`
: أرقام الأسطر والأعمدة حيث حدث الخطأ.

`error`
: كائن خطأ.

على سبيل المثال:

```html run untrusted refresh height=1
<script>
  *!*
    window.onerror = function(message, url, line, col, error) {
      alert(`${message}\n At ${line}:${col} of ${url}`);
    };
  */!*

    function readData() {
      badFunc(); // عفوًا ، حدث خطأ ما!
    }

    readData();
</script>
```

دور المعالج الشامل `window.onerror` ادة لا يكون استرداد تنفيذ البرنامج النصي - ربما يكون ذلك مستحيلًا في حالة وجود أخطاء في البرمجة ، ولكن لإرسال رسالة الخطأ إلى المطورين.

<<<<<<< HEAD
هناك أيضًا خدمات الويب التي توفر تسجيل الأخطاء لمثل هذه الحالات ، مثل <https://errorception.com> أو <http://www.muscula.com>.
=======
There are also web-services that provide error-logging for such cases, like <https://errorception.com> or <https://www.muscula.com>.
>>>>>>> 5dff42ba283bce883428c383c080fa9392b71df8

يعملون على هذا النحو:

1. نسجل في الخدمة ونحصل على جزء JS (أو عنوان URL ) منها لإدراجها في الصفحات.
2. يحدد هذا النص البرمجي لـ JS دالة `window.onerror`.
3. عند حدوث خطأ ، يرسل طلب شبكة حوله إلى الخدمة.
4. يمكننا تسجيل الدخول إلى واجهة ويب الخدمة ونرى الأخطاء.

## الخلاصة

The `try...catch` construct allows to handle runtime errors. It literally allows to "try" running the code and "catch" errors that may occur in it.

الصيغة هي:

```js
try {
  // run this code
} catch (err) {
  // if an error happened, then jump here
  // err is the error object
} finally {
  // تفعل في أي حال بعد try/catch
}
```

There may be no `catch` section or no `finally`, so shorter constructs `try...catch` and `try...finally` are also valid.

كائنات الخطأ لها الخصائص التالية:

- `message` -- رسالة خطأ يمكن قراءتها و فهمها.
- `name` -- اسم الخطأ (اسم مُنشئ الخطأ).
- `stack` (غير قياسي ، ولكنه مدعوم جيدًا) - المجموعة في لحظة إنشاء الخطأ.

If an error object is not needed, we can omit it by using `catch {` instead of `catch (err) {`.

يمكننا أيضًا إنشاء الأخطاء الخاصة بنا باستخدام عامل `throw`. من الناحية التقنية ، يمكن أن يكون محتوى `throw` متكون من أي شيء, ولكنها عادة ما تكون كائن خطأ يرث من فئة `Error`. المزيد عن توسيع الأخطاء في الفصل التالي.

_إعادة الرمي_ هو نمط مهم جدًا في معالجة الأخطاء: عادة ما تتوقع `catch` وتعرف كيفية التعامل مع نوع الخطأ المعين, لذلك يجب أن تقوم بإعادة رمي الأخطاء التي لا تعرفها.

Even if we don't have `try...catch`, most environments allow us to setup a "global" error handler to catch errors that "fall out". In-browser, that's `window.onerror`.
