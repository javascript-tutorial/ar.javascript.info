importance: 5

---

### جيش من الدوال

تصنع الشيفرة الآتية مصفوفة من مُطلقي النار `‎shooters‎`.

يفترض أن تكتب لنا كلّ دالة رقم هويّتها، ولكن ثمّة خطب ما ...

```js run
function makeArmy() {
  let shooters = [];

  let i = 0;
  while (i < 10) {
<<<<<<< HEAD
    let shooter = function() { // دالة مُطلق النار
      alert( i ); // المفترض أن ترينا رقمها
=======
    let shooter = function() { // create a shooter function,
      alert( i ); // that should show its number
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3
    };
    shooters.push(shooter); // and add it to the array
    i++;
  }

  // ...and return the array of shooters
  return shooters;
}

let army = makeArmy();

<<<<<<< HEAD
army[0](); // مُطلق النار بالهويّة 0 يقول أنّه 10
army[5](); // ‫مُطلق النار بالهويّة 5 يقول أنّه 10...
// ... كلّ مُطلقي النار يقولون 10 بدل هويّاتهم 0 فَـ 1 فَـ 2 فَـ 3...

```

لماذا هويّة كلّ مُطلق نار نفس البقية؟ أصلِح الشيفرة لتعمل كما ينبغي أن تعمل.
=======
*!*
// all shooters show 10 instead of their numbers 0, 1, 2, 3...
army[0](); // 10 from the shooter number 0
army[1](); // 10 from the shooter number 1
army[2](); // 10 ...and so on.
*/!*
```

Why do all of the shooters show the same value? 

Fix the code so that they work as intended.
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3

