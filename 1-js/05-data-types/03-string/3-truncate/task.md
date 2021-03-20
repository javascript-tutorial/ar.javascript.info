importance: 5

---

### قص النص

انشئ دالة باسم `truncate(str, maxlength)‎` تفحص طول النص `str` وتستبدل نهايته التي تتجاوز الحد `maxlength` بالرمز `"…"` لجعل طولها يساوي `maxlength` بالضبط. يجب أن تكون مخرجات الدالة النص المقصوص (في حال حدث ذلك). مثلًا:

```js
truncate("What I'd like to tell on this topic is:", 20) = "What I'd like to te…"

truncate("Hi everyone!", 20) = "Hi everyone!"
```
