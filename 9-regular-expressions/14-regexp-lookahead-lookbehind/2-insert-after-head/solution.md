<<<<<<< HEAD
للإدراج بعد علامة `<body>` ، يجب أن نجدها أولاً. يمكننا استخدام `نمط النقش العادي: <body. *>` لذلك.
=======
In order to insert after the `<body>` tag, we must first find it. We can use the regular expression pattern `pattern:<body.*?>` for that.
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f

في هذه المهمة ، لا نحتاج إلى تعديل علامة `<body>`. نحتاج فقط لإضافة النص بعده.

إليك كيفية القيام بذلك:

```js run
let str = '...<body style="...">...';
str = str.replace(/<body.*?>/, '$&<h1>Hello</h1>');

alert(str); // ...<body style="..."><h1>Hello</h1>...
```

<<<<<<< HEAD
في السلسلة البديلة `$ &` تعني المطابقة نفسها ، أي جزء النص المصدر الذي يتوافق مع `pattern: <body. *>`. يتم استبداله بمفرده بالإضافة إلى `<h1> Hello </h1>`.
=======
In the replacement string `$&` means the match itself, that is, the part of the source text that corresponds to `pattern:<body.*?>`. It gets replaced by itself plus `<h1>Hello</h1>`.
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f

البديل هو استخدام lookbehind:

```js run
let str = '...<body style="...">...';
str = str.replace(/(?<=<body.*?>)/, `<h1>Hello</h1>`);

alert(str); // ...<body style="..."><h1>Hello</h1>...
```

كما ترون ، هناك فقط جزء وراء النظر في هذا التعبير العادي.

<<<<<<< HEAD
يعمل مثل هذا:
- في كل موضع في النص.
- تحقق مما إذا كان مسبوقًا بـ `النمط: <body. *>`.
- إذا كان الأمر كذلك لدينا المباراة.

لن يتم إرجاع العلامة `pattern: <body. *>`. نتيجة هذا التعبير العادي هي حرفيا سلسلة فارغة ، لكنها تتطابق فقط في المواضع التي يسبقها `النمط: <body. *>`.

لذلك نستبدل "السطر الفارغ" ، مسبوقًا بـ "pattern: <body. *>` ، بـ `<h1> Hello </h1>`. هذا هو الإدراج بعد "<body>".

ملاحظة. علامات Regexp ، مثل `pattern: s` و` pattern: i` يمكن أن تكون مفيدة أيضًا: `pattern: / <body. *> / si`. تجعل علامة `pattern: s` علامة` `pattern: .` تتطابق مع حرف سطر جديد ، وعلامة 'pattern: i` تجعل` `pattern: <body>` تتطابق أيضًا مع `match: <BODY>` غير حساس لحالة الأحرف.
=======
It works like this:
- At every position in the text.
- Check if it's preceeded by `pattern:<body.*?>`.
- If it's so then we have the match.

The tag `pattern:<body.*?>` won't be returned. The result of this regexp is literally an empty string, but it matches only at positions preceeded by `pattern:<body.*?>`.

So we replaces the "empty line", preceeded by `pattern:<body.*?>`, with `<h1>Hello</h1>`. That's the insertion after `<body>`.

P.S. Regexp flags, such as `pattern:s` and `pattern:i` can also be useful: `pattern:/<body.*?>/si`. The `pattern:s` flag makes the dot `pattern:.` match a newline character, and `pattern:i` flag makes `pattern:<body>` also match `match:<BODY>` case-insensitively.
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f
