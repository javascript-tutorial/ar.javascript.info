الحل باستخدام `if`:

```js
function min(a, b) {
    if (a < b) {
        return a;
    } else {
        return b;
    }
}
```

الحل باستخدام عامل علامة الاستفهام `'?'`:

```js
function min(a, b) {
    return a < b ? a : b;
}
```

لاحظ أن في حالة إذا كان `a == b` لا يهم أي قيمة نرجع.
