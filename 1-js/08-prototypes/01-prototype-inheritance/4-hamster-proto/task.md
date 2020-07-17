_الأهمية: 5_

---

# لماذا أصابت التخمة كِلا الهامسترين؟

لدينا هامسترين، واحد سريع `speedy` وآخر كسول `lazy`، والاثنين يرثان كائن الهامستر العمومي `hamster`.

حين نُعطي أحدهما الطعام، نجد الآخر أُتخم أيضًا. لماذا ذلك؟ كيف نُصلح المشكلة؟


```js run
let hamster = {
  stomach: [],

  eat(food) {
    this.stomach.push(food);
  }
};

let speedy = {
  __proto__: hamster
};

let lazy = {
  __proto__: hamster
};

// وجد هذا الهامستر الطعامَ قبل الآخر
speedy.eat("apple");
alert( speedy.stomach ); // apple

// هذا أيضًا وجده. لماذا؟ أصلِح الشيفرة.
alert( lazy.stomach ); // apple
```

