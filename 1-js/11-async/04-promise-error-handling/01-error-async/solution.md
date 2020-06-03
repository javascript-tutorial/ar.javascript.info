الإجابة هي **no, it won't**:

```js run
new Promise(function(resolve, reject) {
  setTimeout(() => {
    throw new Error("Whoops!");
  }, 1000);
}).catch(alert);
```

كما ذكر في الفصل ، هناك "try...catch" ضمنية حول رمز الوظيفة. لذلك يتم التعامل مع جميع الأخطاء المتزامنة.

ولكن هنا يتم إنشاء الخطأ ليس أثناء تشغيل المنفذ ، ولكن في وقت لاحق. لذا الوعد لا يمكن أن ينفذ به.
