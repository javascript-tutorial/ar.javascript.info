درجة الأهمية: 3

---

# اجعل الروابط الخارجية برتقالية

اجعل جميع الروابط الخارجية برتقالية من خلال تعديل خاصية `النمط 'الخاصة بها.

الرابط يعتبر خارجيا إذا:
- Its `href` has `://` in it
- But doesn't start with `http://internal.com`.

Example:

```html run
<a name="list">the list</a>
<ul>
  <li><a href="http://google.com">http://google.com</a></li>
  <li><a href="/tutorial">/tutorial.html</a></li>
  <li><a href="local/path">local/path</a></li>
  <li><a href="ftp://ftp.com/my.zip">ftp://ftp.com/my.zip</a></li>
  <li><a href="http://nodejs.org">http://nodejs.org</a></li>
  <li><a href="http://internal.com/test">http://internal.com/test</a></li>
</ul>

<script>
  // setting style for a single link
  let link = document.querySelector('a');
  link.style.color = 'orange';
</script>
```

النتيجة يجيب أن تكون: 

[iframe border=1 height=180 src="solution"]

