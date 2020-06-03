
Backticks تضمن التعبير داخل `${...}` في داخل النص.

```js run
let name = "Ilya";

// التعبير هو رقم 1
alert( `hello ${1}` ); // hello 1

// التعبير هو نص "name"
alert( `hello ${"name"}` ); // hello name

// التعبير هو متغير ، يتضمنه
alert( `hello ${name}` ); // hello Ilya
```
