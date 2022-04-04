1. _أيّما كانت_ الطريقة التي سنستعملها ليعمل هذا الشيء، فلا بدّ أن تُرجع `‎sum‎` دالة.
2. على تلك الدالة أن تحفظ القيمة الحالية بين كلّ استدعاء والآخر داخل الذاكرة.
3. حسب المهمّة المُعطاة، يجب أن تتحول الدالة إلى عدد حين نستعملها في `‎==‎`. الدوال كائنات لذا فعملية التحويل ستنفع كما شرحنا في فصل «التحويل من كائن إلى قيمة أولية»، ويمكن أن نقدّم تابِعًا خاصًا يُعيد ذلك العدد.

إلى الشيفرة:

1. For the whole thing to work _anyhow_, the result of `sum` must be function.
2. That function must keep in memory the current value between calls.
3. According to the task, the function must become the number when used in `==`. Functions are objects, so the conversion happens as described in the chapter <info:object-toprimitive>, and we can provide our own method that returns the number.

Now the code:

```js demo run
function sum(a) {
  let currentSum = a;

  function f(b) {
    currentSum += b;
    return f;
  }

  f.toString = function () {
    return currentSum;
  };

  return f;
}

alert(sum(1)(2)); // 3
alert(sum(5)(-1)(2)); // 6
alert(sum(6)(-1)(-2)(-3)); // 0
alert(sum(0)(1)(2)(3)(4)(5)); // 15
```

لاحظ بأنّ دالة `‎sum‎` تعمل مرّة واحدة فقط لا غير، وتُعيد الدالة `‎f‎`.

وبعدها في كلّ استدعاء يليها، تُضيف `‎f‎` المُعامل إلى المجموع `‎currentSum‎` وتُعيد نفسها.

**لا نستعمل التعاود في آخر سطر من `‎f‎`.**

هذا شكل التعاود:

```js
function f(b) {
  currentSum += b;
  return f(); // <-- استدعاء تعاودي
}
```

بينما في حالتنا نُعيد الدالة دون استدعائها:

```js
function f(b) {
  currentSum += b;
  return f; // <-- لا تستدعي نفسها، بل تُعيد نفسها
}
```

<<<<<<< HEAD
وستُستعمل `‎f‎` هذه في الاستدعاء التالي، وتُعيد نفسها ثانيةً مهما لزم. وبعدها حين نستعمل العدد أو السلسلة النصية، يُعيد التابِع `‎toString‎` المجموع `‎currentSum‎`. يمكن أيضًا أن نستعمل `‎Symbol.toPrimitive‎` أو `‎valueOf‎` لإجراء عملية التحويل.

ترجمة -وبتصرف- للفصل [Function object, NFE](https://javascript.info/function-object) من كتاب [The JavaScript language](https://javascript.info/js)
=======
This `f` will be used in the next call, again return itself, as many times as needed. Then, when used as a number or a string -- the `toString` returns the `currentSum`. We could also use `Symbol.toPrimitive` or `valueOf` here for the conversion.
>>>>>>> 45934debd9bb31376ea5da129e266df5b43e545f
