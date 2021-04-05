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
>>>>>>> 7b76185892aa9798c3f058256aed44a9fb413cc3
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
