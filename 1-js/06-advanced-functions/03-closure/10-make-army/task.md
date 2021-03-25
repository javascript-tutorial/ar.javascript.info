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
    let shooter = function() { // create a shooter function,
      alert( i ); // that should show its number
    };
    shooters.push(shooter); // and add it to the array
    i++;
  }

  // ...and return the array of shooters
  return shooters;
}

let army = makeArmy();

*!*
// all shooters show 10 instead of their numbers 0, 1, 2, 3...
army[0](); // 10 from the shooter number 0
army[1](); // 10 from the shooter number 1
army[2](); // 10 ...and so on.
*/!*
```

Why do all of the shooters show the same value?

Fix the code so that they work as intended.
