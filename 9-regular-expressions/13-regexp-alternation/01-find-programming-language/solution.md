
يمكن أن تكون الفكرة الأولى هي سرد اللغات التي يوجد بها "|" في الوسط.

لكن هذا لا يعمل بشكل صحيح:

```js run
let regexp = /Java|JavaScript|PHP|C|C\+\+/g;

let str = "Java, JavaScript, PHP, C, C++";

alert( str.match(regexp) ); // Java,Java,PHP,C,C
```

يبحث محرك التعبير العادي عن البدائل واحدة تلو الأخرى. هذا هو: أولاً يتحقق مما إذا كان لدينا `match: Java` ، وإلا - يبحث عن` match: JavaScript` وما إلى ذلك.

ونتيجة لذلك ، لا يمكن العثور على `match: JavaScript` مطلقًا ، فقط لأنه يتم تحديد` match: Java` أولاً.

نفس الشيء مع `match: C` و` match: C ++ `.

هناك حلان لهذه المشكلة:

1. قم بتغيير الترتيب للتحقق من المطابقة الأطول أولاً: `pattern: JavaScript | Java | C \ + \ + | C | PHP`.
2. دمج المتغيرات بنفس البداية: `pattern: Java (Script)؟ | C (\ + \ +)؟ | PHP`.

بشكل عملي: 

```js run
let regexp = /Java(Script)?|C(\+\+)?|PHP/g;

let str = "Java, JavaScript, PHP, C, C++";

alert( str.match(regexp) ); // Java,JavaScript,PHP,C,C++
```

