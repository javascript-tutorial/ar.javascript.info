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
>>>>>>> d5e8b6d308869738bd1f08dde62b64c969b0673e
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
