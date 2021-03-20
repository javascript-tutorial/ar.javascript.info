importance: 5

---

### فحص وجود شيء مزعج

اكتب دالة باسم `checkSpam(str)‎` تُرجِع `true` إن كان `str` يحوي 'viagra' أو 'XXX'، وإلا فتُرجِع `false`. يجب أن لا تكون الدالة حساسة لحالة الأحرف:

```js
checkSpam('buy ViAgRA now') == true
checkSpam('free xxxxx') == true
checkSpam("innocent rabbit") == false
```

