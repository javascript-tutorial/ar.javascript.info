# Observable

قم بإنشاء الدالة `makeObservable(target)` والتي تقوم بجعل الأوبجكت observable عن طريق إرجاع بروكسي.

هنا كيف تعمل:

```js run
function makeObservable(target) {
  /* your code */
}

let user = {};
user = makeObservable(user);

user.observe((key, value) => {
  alert(`SET ${key}=${value}`);
});

user.name = "John"; // alerts: SET name=John
```

بعبارات أخري، الأوبجكت الذي يتم استرجاعه بواسطة `makeObservable` هو مثل الأوبجكت الأصلي ولكن يحتوي أيضًا علي الدالة `observe(handler)` والتي تنشئ `handler` يتم استدعاؤه في كل تغير لخاصية.

عند تغير أي خاصية، يتم استدعاء `handler(key, value)` بإسم وقيمة الخاصية.

ملاحظه: في هذا التكليف، اهتم فقط بعملية التعديل علي الخاصية. العمليات الأخري يمكن تطبيقها بنفس الطريقة.
