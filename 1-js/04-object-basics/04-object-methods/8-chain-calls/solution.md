الحل هو إرجاع الكائن نفسه من كل استدعاء.

```js run demo
let ladder = {
  step: 0,
  up() {
    this.step++;
*!*
    return this;
*/!*
  },
  down() {
    this.step--;
*!*
    return this;
*/!*
  },
  showStep() {
    alert( this.step );
*!*
    return this;
*/!*
  }
}

ladder.up().up().down().up().down().showStep(); // 1
```

يمكننا أيضا كتابة استدعاء مستقل في كل سطر ليصبح سهل القراءة بالنسبة للسلاسل الأطول

```js
ladder
  .up()
  .up()
  .down()
  .up()
  .down()
  .showStep(); // 1
```
