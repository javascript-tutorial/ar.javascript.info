درجة الأهمية: 5

---

# الفرق بين الإستدعاءات

هيا نقوم بإنشاء كائن جديد يسمي `rabbit`:

```js
function Rabbit(name) {
  this.name = name;
}
Rabbit.prototype.sayHi = function() {
  alert(this.name);
};

let rabbit = new Rabbit("Rabbit");
```

هل هذه الإستدعاءات تقوم بنفس الوظيفة أم لا؟

```js
rabbit.sayHi();
Rabbit.prototype.sayHi();
Object.getPrototypeOf(rabbit).sayHi();
rabbit.__proto__.sayHi();
```
