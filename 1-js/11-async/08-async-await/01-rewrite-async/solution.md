
الملاحظات أسفل الكود:

```js run
async function loadJson(url) { // (1)
  let response = await fetch(url); // (2)

  if (response.status == 200) {
    let json = await response.json(); // (3)
    return json;
  }

  throw new Error(response.status);
}

loadJson('no-such-user.json')
  .catch(alert); // Error: 404 (4)
```

الملاحظات:

1. تصبح الدالة `loadJson`` غير متزامنة ".
2- يتم استبدال جميع ".then" بالداخل بـ "ينتظر".
3. يمكننا `` response response.json () `بدلاً من انتظارها ، كما يلي:

     شبيبة
     if (response.status == 200) {
       رد العودة. json () ؛ // (3)
     }}
     ``

     ثم يجب أن ينتظر الكود الخارجي `` ينتظر '' حتى يتم حل هذا الوعد. في حالتنا لا يهم.
4. تتم معالجة الخطأ الذي تم طرحه من "loadJson" بواسطة ".catch". لا يمكننا استخدام `` انتظار انتظار Json (...) `، لأننا لسنا في وظيفة` غير متزامن '.