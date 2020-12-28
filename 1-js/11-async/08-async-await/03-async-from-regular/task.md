
# استدعاء غير متزامن من غير متزامن

<<<<<<< HEAD
لدينا وظيفة "عادية". كيفية استدعاء "غير متزامن" منه واستخدام نتائجه؟
=======
We have a "regular" function called `f`. How can you call the `async` function `wait()` and use its result inside of `f`?
>>>>>>> 13da056653754765b50aa5a9f706f84a4a0d6293

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