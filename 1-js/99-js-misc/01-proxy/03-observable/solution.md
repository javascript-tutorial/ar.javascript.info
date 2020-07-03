يتكون الحل من جزئين:

1. عند استدعاء `.observe(handler)` في أى وقت، نحتاج إلي أن نتذكر الـ handler فس أي مكان، لنكون قادرين علي استدعاءه لاحقًا. يمكن تخزين الـhandler في الأوبجكت باستخدام الرمز كاسم للخاصية.
2. نحتاج إلي بروكسي يحتوي علي الtrap `set` لاستدعاء الhandlers في حالة التغيير.

```js run
let handlers = Symbol('handlers');

function makeObservable(target) {
  // 1. Initialize handlers store
  target[handlers] = [];

  // Store the handler function in array for future calls
  target.observe = function(handler) {
    this[handlers].push(handler);
  };

  // 2. Create a proxy to handle changes
  return new Proxy(target, {
    set(target, property, value, receiver) {
      let success = Reflect.set(...arguments); // forward the operation to object
      if (success) { // if there were no error while setting the property
        // call all handlers
        target[handlers].forEach(handler => handler(property, value));
      }
      return success;
    }
  });
}

let user = {};

user = makeObservable(user);

user.observe((key, value) => {
  alert(`SET ${key}=${value}`);
});

user.name = "John";
```
