

```js run
let styles = ["البلوز", "موسيقي الجاز"];
styles.push("موسيقى الروك آند رول");
styles[Math.floor((styles.length - 1) / 2)] = "كلاسيكيات";
alert( styles.shift() );
styles.unshift("موسيقي الريغي", "موسيقى الراب");
```

