الإجابة: **`BODY`**.

```html run
<script>
  let body = document.body;

  body.innerHTML = "<!--" + body.tagName + "-->";

  alert( body.firstChild.data ); // BODY
</script>
```

ما يحدث خطوة بخطوة:

1. يتم استبدال محتوى "<body>" بالتعليق. التعليق هو `<! - BODY ->` ، لأن `body.tagName ==" BODY "`. كما نتذكر ، فإن `tagName` دائمًا ما تكون أحرفًا كبيرة بتنسيق HTML.
2. التعليق هو الآن العقدة الفرعية الوحيدة ، لذلك نحصل عليه في `body.firstChild`.
3. خاصية "البيانات" للتعليق هي محتوياته (داخل `<! --...-->`): "" BODY "`.
