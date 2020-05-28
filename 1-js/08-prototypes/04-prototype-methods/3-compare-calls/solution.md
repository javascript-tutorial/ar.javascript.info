
الإستدعاء الأول تكون `this == rabbit` والآخرين تكون قيمة `this` مساوية لـ `Rabbit.prototype` وذلك لأنه الكائن قبل النقطة.

وبالتالى فإن أول استدعاء فقط يعرض `Rabbit` والباقى يعرضون `undefined`:

```js run
function Rabbit(name) {
  this.name = name;
}
Rabbit.prototype.sayHi = function() {
  alert( this.name );
}

let rabbit = new Rabbit("Rabbit");

rabbit.sayHi();                        // Rabbit
Rabbit.prototype.sayHi();              // undefined
Object.getPrototypeOf(rabbit).sayHi(); // undefined
rabbit.__proto__.sayHi();              // undefined
```
