يصبح الفرق واضحًا عندما ننظر إلى الكود داخل دالة.

The behavior is different if there's a "jump out" of `try...catch`.

For instance, when there's a `return` inside `try...catch`. The `finally` clause works in case of _any_ exit from `try...catch`, even via the `return` statement: right after `try...catch` is done, but before the calling code gets the control.

```js run
function f() {
  try {
    alert('إبدء');
*!*
    return "النتيجة";
*/!*
  } catch (err) {
    /// ...
  } finally {
    alert('نظف!');
  }
}

f(); // نظف!
```

...أو عندما يكون هناك `throw`, مثلما هو الحال هنا:

```js run
function f() {
  try {
    alert('إبدء');
    throw new Error("an error");
  } catch (err) {
    // ...
    if("can't handle the error") {
*!*
      throw err;
*/!*
    }

  } finally {
    alert('نظف!')
  }
}

f(); // نظف!
```

يضمن `finally` التنظيف. إذا وضعنا الكود في نهاية `f`, فلن يتم تشغيلها في هذه المواقف.
