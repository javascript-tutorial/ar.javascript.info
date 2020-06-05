
# استدعاء غير متزامن من غير متزامن

لدينا وظيفة "عادية". كيفية استدعاء "غير متزامن" منه واستخدام نتائجه؟

```js
async function wait() {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return 10;
}

function f() {
  // ...what to write here?
  // we need to call async wait() and wait to get 10
  // remember, we can't use "await"
}
```

ملاحظة. المهمة بسيطة من الناحية الفنية ، ولكن السؤال شائع جدًا للمطورين الجدد على عدم المزامنة / الانتظار.