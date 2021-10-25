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
>>>>>>> 3699f73b4ccb2a57ac5ef990d2687bf31ccf564c
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
