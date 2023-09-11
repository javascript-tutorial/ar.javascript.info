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
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c
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
