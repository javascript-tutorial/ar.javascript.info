هناك صيد هنا.

في وقت تنفيذ `<script>` ، كانت العقدة DOM الأخيرة هي `<script>` بالضبط ، لأن المستعرض لم يقم بمعالجة باقي الصفحة بعد.

لذلك تكون النتيجة `1` (عقدة العنصر).

```html run height=60
<html>

<body>
  <script>
    alert(document.body.lastChild.nodeType);
  </script>
</body>

</html>
```
