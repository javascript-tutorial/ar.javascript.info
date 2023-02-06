# Type Conversions

معظم الوقت، المعاملات والدوال تحول أوتوماتيكياً القيم المعطاة لهم للنوع الصحيح.

على سبيل المثال، `alert` تحول أوتوماتيكياً أي قيمة إلى نص لإظهاره. المعاملات الرياضية تحول القيم إلى أرقام.

هناك أيضاً حالات نحتاج إلى تصريح تحويل القيمة إلى النوع المطلوب.

```smart header="Not talking about objects yet"
<<<<<<< HEAD
في هذا الفصل، لن نغطي الكائنات. الآن سوف نتحدث عن الأنواع الأساسية.
=======
In this chapter, we won't cover objects. For now, we'll just be talking about primitives.
>>>>>>> 9e3fa1351f80cfd6353a778a55b2c86bca9e895f

فيما بعد، بعد أن نتعلم عن الكائنات، في هذا الفصل <info:object-toprimitive> سنرى كيف تتلائم الكائنات فيه.
```

## String Conversion

التحويل إلى نص يحدث عندما نحتاج الصورة النصية للقيمة.

على سبيل المثال، `alert(value)` تفعل ذلك لإظهار القيمة.

نستطيع أيضاً استدعاء دالة `String(value)` لكي نحول القيمة إلى نص:

```js run
let value = true;
alert(typeof value); // boolean

*!*
value = String(value); // الأن القيمة هي نص تساوي "true"
alert(typeof value); // string
*/!*
```

التحويل إلى نص واضح جداً.  `false` تصبح `"false"`و `null` تصبح `"null"`، إلخ.

## Numeric Conversion

<<<<<<< HEAD
التحويل إلى رقم يتم أوتوماتيكياً في المعاملات والتعبيرات الرياضية.
=======
Numeric conversion in mathematical functions and expressions happens automatically.
>>>>>>> 9e3fa1351f80cfd6353a778a55b2c86bca9e895f

على سبيل المثال، في حالة القسمة `/` عندما يتم تطبيقها على نوع غير رقمي:

```js run
alert( "6" / "2" ); // 3، النصوص تتحول إلى أرقام
```

نستطيع استخدام دالة `Number(value)` للتصريح بتحويل القيمة `value` إلى رقم:

```js run
let str = "123";
alert(typeof str); // string

let num = Number(str); // تصبح رقم 123

alert(typeof num); // number
```

تصريح التحويل عادة يكون مطلوبا عندما نقرأ قيمة من مصدر يعتمد على النص مثل حقل إدخال في نموذج لكن نتوقع أن يتم إدخال رقم.

لو كان النص ليس رقما صالحا، ستكون النتيجة لمثل هذا التحويل هي `NaN`. على سبيل المثال:

```js run
let age = Number("an arbitrary string instead of a number");

alert(age); // NaN، التحويل فشل
```

قواعد التحويل الرقمي:

| القيمة |  تصبح... |
|-------|-------------|
|`undefined`|`NaN`|
|`null`|`0`|
|<code>true&nbsp;and&nbsp;false</code> | `1` and `0` |
<<<<<<< HEAD
| `string` | المساحات البيضاء في البداية والنهاية يتم إزالتها. لو باقي النص فارغ، النتيجة هي `0`. غير ذلك، الرقم "يتم قرائته" من النص. أي خطأ يعطي`NaN`. |
=======
| `string` | Whitespaces (includes spaces, tabs `\t`, newlines `\n` etc.) from the start and end are removed. If the remaining string is empty, the result is `0`. Otherwise, the number is "read" from the string. An error gives `NaN`. |
>>>>>>> 9e3fa1351f80cfd6353a778a55b2c86bca9e895f

أمثلة:

```js run
alert( Number("   123   ") ); // 123
alert( Number("123z") );      // NaN (خطأ في قراءة الرقم عند "z")
alert( Number(true) );        // 1
alert( Number(false) );       // 0
```

من فضلك لاحظ أن `null` و `undefined` تسلك سلوكا مختلفا هنا: `null` تصبح صفر بينما `undefined` تصبح `NaN`.

معظم المعاملات الرياضية أيضا تقوم بمثل هذا التحويل، سوف نرى ذلك في الفصل القادم.

## Boolean Conversion

التحويل إلى قيم منطقية هو اﻷسهل.

إنه يحدث في معاملات منطقية (فيما بعد سنقابل إختبارات مشروطة وأشياء أخرى مشابهة) لكن أيضاً يمكن تنفيذها تصريحياً عن طريق إستدعاء  `Boolean(value)`.

قاعدة التحويل:

- القيم التي تكون حدسية "فارغة"، مثل `0` ونص فارغ و `null` و`undefined` و `NaN` تصبح `false`.
- كل القيم الأخرى تصبح `true`.

على سبيل المثال:

```js run
alert( Boolean(1) ); // true
alert( Boolean(0) ); // false

alert( Boolean("hello") ); // true
alert( Boolean("") ); // false
```

````warn header="من فضلك لاحظ: النص المكون من صفر `\"0\"` يكون `true`"
بعض اللغات (أعني PHP) تعامل `"0"` على أنه `false`. لكن في جافا سكريبت، النص غير الفارغ دائماً `true`.

```js run
alert( Boolean("0") ); // true
alert( Boolean(" ") ); // المسافات، أيضاً true (أي نص غير فارغ يكون true)
```
````

## Summary

تحويلات الأنواع الثلاثة الأكثر إستخداماً هي إلى نص، رقم، قيمة منطقية.

**`التحويل للنص`** -- يحدث عندما نظهر شيء. يمكن تنفيذه عن طريق `String(value)`. التحويل إلى نص عادة واضح للقيم البسيطة.

**`التحويل إلى رقم`** -- يحدث في المعاملات الرياضية. يمكن تنفيذها عن طريق `Number(value)`.

التحويل يتبع القواعد:

| القيمة |  تصبح... |
|-------|-------------|
|`undefined`|`NaN`|
|`null`|`0`|
|<code>true&nbsp;/&nbsp;false</code> | `1 / 0` |
<<<<<<< HEAD
| `string` | يتم قراءة النص "كما هو"،المسافات البيضاء من الجانبين يتم تجاهلها. النص الفارغ يصبح `0`. الخطأ `NaN`. |
=======
| `string` | The string is read "as is", whitespaces (includes spaces, tabs `\t`, newlines `\n` etc.) from both sides are ignored. An empty string becomes `0`. An error gives `NaN`. |
>>>>>>> 9e3fa1351f80cfd6353a778a55b2c86bca9e895f

**`التحويلات المنطقية`** -- يحدث في المعاملات المنطقية. يتم تنفيذه عن طريق `Boolean(value)`.

يتبع القواعد الأتية:

| القيمة |  تصبح... |
|-------|-------------|
|`0`, `null`, `undefined`, `NaN`, `""` |`false`|
|أي قيمة أخرى| `true` |


معظم هذه القواعد سهل فهمها وحفظها. الإستثناءات الملحوظة عندما يفعل الناس عادة أخطاء وهي:

- `undefined` تكون `NaN` كرقم ليست `0`.
- `"0"` والنصوص التي تحتوي على مسافات فقط `"   "` هي true كقيمة منطقية.

لم يتم تغطية الكائنات هنا. سنعود إليهم لاحقاً في هذا الفصل <info:object-toprimitive> تكون مكرسة حصرياً للكائنات بعد أن تعمل أشياء أساسية أكثر عن جافا سكريبت .
