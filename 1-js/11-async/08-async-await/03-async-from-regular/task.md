
# استدعاء غير متزامن من غير متزامن

<<<<<<< HEAD
لدينا وظيفة "عادية". كيفية استدعاء "غير متزامن" منه واستخدام نتائجه؟
=======
We have a "regular" function called `f`. How can you call the `async` function `wait()` and use its result inside of `f`?
>>>>>>> 3a0b3f4e31d4c4bbe90ed4c9c6e676a888ad8311

```js
async function wait() {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return 10;
}

function f() {
  // ...what should you write here?
  // we need to call async wait() and wait to get 10
  // remember, we can't use "await"
}
```

ملاحظة. المهمة بسيطة من الناحية الفنية ، ولكن السؤال شائع جدًا للمطورين الجدد على عدم المزامنة / الانتظار.