# البحث عن أزواج bbtag

تبدو علامة "bb-tag" مثل `[tag] ... [/ tag]` ، حيث `tag` هي واحدة من:` b` أو `url` أو` quote`.

على سبيل المثال:
```
[b]text[/b]
[url]http://google.com[/url]
```

يمكن أن تتداخل علامات BB. ولكن لا يمكن إدراج علامة في نفسها ، على سبيل المثال:

```
بشكل طبيعي:
[url] [b]http://google.com[/b] [/url]
[quote] [b]text[/b] [/quote]

لا يمكن حدوثه:
[b][b]text[/b][/b]
```

يمكن أن تحتوي العلامات على فواصل أسطر ، وهذا أمر طبيعي:

```
[quote]
  [b]text[/b]
[/quote]
```

قم بإنشاء التعبير العادي للعثور على جميع علامات BB مع محتوياتها.
على سبيل المثال:


```js
let regexp = /your regexp/flags;

let str = "..[url]http://google.com[/url]..";
alert( str.match(regexp) ); // [url]http://google.com[/url]
```

إذا كانت العلامات متداخلة ، فإننا نحتاج إلى العلامة الخارجية (إذا أردنا ، يمكننا متابعة البحث في محتواها):

```js
let regexp = /your regexp/flags;

let str = "..[url][b]http://google.com[/b][/url]..";
alert( str.match(regexp) ); // [url][b]http://google.com[/b][/url]
```

