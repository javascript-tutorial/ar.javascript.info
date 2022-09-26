مهم: 4

---

# الثابت ذات الحرف الكبيره؟

أفحص الكود التالي:

```js
const birthday = '18.04.1982';

const age = someCode(birthday);
```

<<<<<<< HEAD
هنا نحن نمتلك ثابت يحزن قيمة التاريخ `birthday` و ثابت أخر يسمي `age` يحسب قيمة العمر من الثابت `birthday` مع مساعدة الداله بعض الكود (لم يتم توفيرها لتصغيرها ، ولأن التفاصيل لا تهم هنا)
=======
Here we have a constant `birthday` for the date, and also the `age` constant.

The `age` is calculated from `birthday` using `someCode()`, which means a function call that we didn't explain yet (we will soon!), but the details don't matter here, the point is that `age` is calculated somehow based on the `birthday`.
>>>>>>> ff4ef57c8c2fd20f4a6aa9032ad37ddac93aa3c4

هل من الصحيح أستخدام الحروف الكبيره للثابت `birthday` ؟ او للثابت `age`؟ او حتي لكليهما؟

```js
<<<<<<< HEAD
const BIRTHDAY = '18.04.1982'; // هل نجعل الاسم ذات حروف كبيره؟

const AGE = someCode(BIRTHDAY); // هل نجعل الاسم ذات حروف كبيره؟
=======
const BIRTHDAY = '18.04.1982'; // make birthday uppercase?

const AGE = someCode(BIRTHDAY); // make age uppercase?
>>>>>>> ff4ef57c8c2fd20f4a6aa9032ad37ddac93aa3c4
```
