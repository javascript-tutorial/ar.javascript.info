الأهمية: 4

---

# هل "else" مطلوبة?

الدالة التالية ترجع `true` إذا كانت قيمة `age` أكبر من `18`.

وإلا فهي تطلب تأكيد وترجع نتيجته:

```js
function checkAge(age) {
  if (age > 18) {
    return true;
*!*
  } else {
    // ...
    return confirm('Did parents allow you?');
  }
*/!*
}
```

هل سيحدث اختلاف إذا حذفنا `else` ?

```js
function checkAge(age) {
  if (age > 18) {
    return true;
  }
*!*
  // ...
  return confirm('Did parents allow you?');
*/!*
}
```

هل هناك أي اختلاف في سلوك الدالتين ؟
