`4`:الناتج


```js run
let fruits = ["البرتقال", "الكمثري", "التفاح"];

let shoppingCart = fruits;

shoppingCart.push("الموز");

*!*
alert( fruits.length ); // 4
*/!*
```

هذا لان المصفوفات تعتبر كائنات. لذا كلا من `shoppingCart` و `fruits` يعدوا كمرجع لنفس المصفوفه.

