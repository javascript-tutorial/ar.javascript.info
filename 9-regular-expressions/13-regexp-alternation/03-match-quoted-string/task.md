# البحث عن سلاسل الاقتباس

قم بإنشاء regexp للعثور على سلاسل في علامات اقتباس مزدوجة `الموضوع:" ... "`.

<<<<<<< HEAD
يجب أن تدعم السلاسل الهروب ، بنفس الطريقة التي تدعمها سلاسل JavaScript. على سبيل المثال ، يمكن إدراج علامات الاقتباس كـ `subject: \" `سطر جديد مثل` subject: \ n` ، والشرطة نفسها كـ `subject: \\`.
=======
The strings should support escaping, the same way as JavaScript strings do. For instance, quotes can be inserted as `subject:\"` a newline as `subject:\n`, and the backslash itself as `subject:\\`.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
let str = "Just like \"here\".";
```

يرجى ملاحظة ، على وجه الخصوص ، أن الاقتباس الهارب `موضوع: \" `لا ينهي سلسلة.

لذلك يجب علينا البحث من اقتباس واحد إلى الآخر تجاهل علامات الاقتباس الهاربة على الطريق.

هذا هو الجزء الأساسي من المهمة ، وإلا سيكون تافها.

أمثلة على السلاسل المراد مطابقتها:
```js
.. *!*"test me"*/!* ..  
.. *!*"Say \"Hello\"!"*/!* ... (escaped quotes inside)
.. *!*"\\"*/!* ..  (double backslash inside)
.. *!*"\\ \""*/!* ..  (double backslash and an escaped quote inside)
```

<<<<<<< HEAD
في جافا سكريبت ، نحتاج إلى مضاعفة الخطوط المائلة لتمريرها مباشرة في السلسلة ، مثل هذا:
=======
In JavaScript we need to double the backslashes to pass them right into the string, like this:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let str = ' .. "test me" .. "Say \\"Hello\\"!" .. "\\\\ \\"" .. ';

// the in-memory string
alert(str); //  .. "test me" .. "Say \"Hello\"!" .. "\\ \"" ..
```

