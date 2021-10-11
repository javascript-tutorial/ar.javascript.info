# اعد الكتابة باستخدام arrow functions

استبدل Function Expressions ب arrow functions في الكود التالي:

```js run
function ask(question, yes, no) {
<<<<<<< HEAD
    if (confirm(question)) yes();
    else no();
=======
  if (confirm(question)) yes();
  else no();
>>>>>>> 193319c963b9ba86ac7d9590f7261a36ecdcc4d2
}

ask(
    "Do you agree?",
    function () {
        alert("You agreed.");
    },
    function () {
        alert("You canceled the execution.");
    }
);
```
