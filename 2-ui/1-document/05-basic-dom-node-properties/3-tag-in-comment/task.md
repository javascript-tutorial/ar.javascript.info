درجة الأهمية: 3

---

# تاج في تعليق

ماذا يبين هذا الكود؟ 

```html
<script>
  let body = document.body;

  body.innerHTML = "<!--" + body.tagName + "-->";

  alert( body.firstChild.data ); // what's here?
</script>
```
