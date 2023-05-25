يصبح الفرق واضحًا عندما ننظر إلى الكود داخل دالة.

السلوك يختلف إذا كان هناك "الانتقال" من `try...catch`.

على سبيل المثال، عند وجود `return` داخل `try...catch`. الشرط `finally` يعمل في حالة أي خروج من `try...catch`، حتى عند استخدام عبارة `return`: مباشرة بعد انتهاء `try...catch`، ولكن قبل أن يستعيد الكود السيطرة.

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
