استخدام عامل علامة الاستفهام `'?'`:

```js
function checkAge(age) {
    return age > 18 ? true : confirm("Did parents allow you?");
}
```

Using OR `||` (the shortest variant):

```js
function checkAge(age) {
    return age > 18 || confirm("Did parents allow you?");
}
```

<<<<<<< HEAD
لاحظ أن الأقواس حول `age > 18` غير مطلوبة ولكن تم وضعها لزيادة القدرة على قراءة الكود.
=======
Note that the parentheses around `age > 18` are not required here. They exist for better readability.
>>>>>>> 8d9ecb724c7df59774d1e5ffb5e5167740b7d321
