importance: 5

---

# Tحوّل «border-left-width» إلى «borderLeftWidth»

اكتب دالة camelize(str)‎ تغيّر الكلمات المقسومة بِشَرطات مثل «my-short-string» إلى عبارات بتنسيق «سنام الجمل»: «myShortString».

بعبارة أخرى: أزِل كلّ الشرطات وحوّل أوّل حرف من كلّ كلمة بعدها إلى الحالة الكبيرة.

أمثلة:

:

```js
camelize("background-color") == "backgroundColor";
camelize("list-style-image") == "listStyleImage";
camelize("-webkit-transition") == "WebkitTransition";
```

تلميح: استعمل split لتقسيم السلسلة النصية إلى مصفوفة، ثمّ عدّل عناصرها وأعِد ربطها بتابِع join.
