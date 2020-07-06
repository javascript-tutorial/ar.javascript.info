الأهمية: 2

---

# التسلسل

لدينا الكائن `ladder` (سُلَّم) الذي يتيح الصعود والنزول:

```js
let ladder = {
  step: 0,
  up() { 
    this.step++;
  },
  down() { 
    this.step--;
  },
  showStep: function() { // shows the current step
    alert( this.step );
  }
};
```

الآن، إن أردنا القيام بعدة استدعاءات متتالية، يمكننا القيام بما يلي:

```js
ladder.up();
ladder.up();
ladder.down();
ladder.showStep(); // 1
```

عَدِّل الشيفرة الخاصة بالدوال `up`، و `down`، و `showStep` لجعل الاستدعاءات متسلسلة كما يلي:

```js
ladder.up().up().down().showStep(); // 1
```

يُستخدم هذا النمط بنطاق واسع في مكتبات JavaScript
