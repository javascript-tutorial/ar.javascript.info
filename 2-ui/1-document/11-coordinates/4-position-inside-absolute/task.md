الأهمية: 5

---

# ضع الملاحظة في الداخل (مطلق)

تمديد المهمة السابقة
 <info:task/position-at-absolute>: علم الوظيفة `الموضع (المرساة ، الموضع ، العنصر)` لإدراج `عنصر` داخل` المرساة`.

القيم الجديدة لـ "الموضع":

- `top-out` و` right-out` و` bottom-out` - تعمل كما كانت من قبل ، حيث تقوم بإدخال` elem` over / right / under `anchor`.
- "أعلى" ، "يمين" ، "أسفل" - أدخل "عنصر" داخل "المرساة": ألصقه بالحافة العلوية / اليمنى / السفلية.

على سبيل المثال:

```js
// shows the note above blockquote
positionAt(blockquote, "top-out", note);

// shows the note inside blockquote, at the top
positionAt(blockquote, "top-in", note);
```

النتائج:

[iframe src = "solution" height = "310" border = "1" link]

كرمز المصدر ، خذ حل المهمة <info:task/position-at-absolute>.
