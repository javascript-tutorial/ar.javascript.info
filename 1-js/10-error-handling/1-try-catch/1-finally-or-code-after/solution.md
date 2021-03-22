يصبح الفرق واضحًا عندما ننظر إلى الكود داخل دالة.

<<<<<<< HEAD
يختلف السلوك إذا كان هناك "خروج" من `try..catch`.

على سبيل المثال ، عندما يكون هناك `return` داخل `try..catch`. يعمل `finally` في حالة *أي* خروج من `try..catch`, حتى عبر عبارة `return`: مباشرة بعد الانتهاء من `try..catch`,  ولكن قبل أن يحصل الكود الذي قمنا بالاتصال به على التحكم.
=======
The behavior is different if there's a "jump out" of `try...catch`.

For instance, when there's a `return` inside `try...catch`. The `finally` clause works in case of *any* exit from `try...catch`, even via the `return` statement: right after `try...catch` is done, but before the calling code gets the control.
>>>>>>> d4b3c135ccf80914f59677803e64ebc832d165e3

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
