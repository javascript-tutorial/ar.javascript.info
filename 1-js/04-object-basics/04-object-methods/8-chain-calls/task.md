الأهمية: 2

---

# التسلسل

<<<<<<< HEAD
لدينا الكائن `ladder` (سُلَّم) الذي يتيح الصعود والنزول:
=======
There's a `ladder` object that allows you to go up and down:
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf

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

<<<<<<< HEAD
الآن، إن أردنا القيام بعدة استدعاءات متتالية، يمكننا القيام بما يلي:
=======
Now, if we need to make several calls in sequence, we can do it like this:
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf

```js
ladder.up();
ladder.up();
ladder.down();
ladder.showStep(); // 1
ladder.down();
ladder.showStep(); // 0
```

<<<<<<< HEAD
عَدِّل الشيفرة الخاصة بالدوال `up`، و `down`، و `showStep` لجعل الاستدعاءات متسلسلة كما يلي:
=======
Modify the code of `up`, `down`, and `showStep` to make the calls chainable, like this:
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf

```js
ladder.up().up().down().showStep().down().showStep(); // shows 1 then 0
```

<<<<<<< HEAD
يُستخدم هذا النمط بنطاق واسع في مكتبات JavaScript
=======
Such an approach is widely used across JavaScript libraries.
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf
