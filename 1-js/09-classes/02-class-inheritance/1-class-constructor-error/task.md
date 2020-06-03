درجة الأهمية : 5

---

# خطأ في إنشاء مثيل

إليك الرمز الذي يحتوي على "أرنب" يمتد "حيوان".

لسوء الحظ ، لا يمكن إنشاء كائنات "أرنب". ماالخطب؟ اصلحه.
```js run
class Animal {

  constructor(name) {
    this.name = name;
  }

}

class Rabbit extends Animal {
  constructor(name) {  
    this.name = name;
    this.created = Date.now();
  }
}

*!*
let rabbit = new Rabbit("White Rabbit"); // Error: this is not defined
*/!*
alert(rabbit.name);
```
