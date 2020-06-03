

```js run
Function.prototype.defer = function(ms) {
  let f = this;
  return function(...args) {
    setTimeout(() => f.apply(this, args), ms);
  }
};

// اختبر
function f(a, b) {
  alert( a + b );
}

f.defer(1000)(1, 2); // تعرض 3 بعد ثانية واحدة
```

لاحظ: استخدمنا `this` فى `f.apply` لتعمل مع دوال الكائنات.

ولذلك إذا تم استدعاء دالة كدالة كائن (method) فإن `this` سيتم تمرريرها إلى الدالة الأصلية `f`.

```js run
Function.prototype.defer = function(ms) {
  let f = this;
  return function(...args) {
    setTimeout(() => f.apply(this, args), ms);
  }
};

let user = {
  name: "John",
  sayHi() {
    alert(this.name);
  }
}

user.sayHi = user.sayHi.defer(1000);

user.sayHi();
```
