
# أعد الكتابة باستخدام متزامن / انتظار

أعد كتابة رمز المثال هذا من الفصل <info: prom-chaining> باستخدام `async / await` بدلاً من` .then / catch`:
```js run
function loadJson(url) {
  return fetch(url)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    })
}

loadJson('no-such-user.json')
  .catch(alert); // Error: 404
```
