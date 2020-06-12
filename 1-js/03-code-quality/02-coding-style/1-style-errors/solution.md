
لاحظ التالي:

```js no-beautify
function pow(x,n)  // <- لا مسافات بين المعطيات
{  // <- القوس المعقوف في سطر جديد وحده
  let result=1;   // <- لا مسافة قبل = 
  for(let i=0;i<n;i++) {result*=x;}   // <- لا مسافة
  // محتوي { ... } يجب ان يكون علي سطر جديد
  return result;
}

let x=prompt("x?",''), n=prompt("n?",'') // <-- ممكن تقنيا,
// ولكن من الأفضل جعلها سطرين ، كما أنه لا توجد مسافات أو مفقودة ؛
if (n<0)  // <- لا مسافات داخل (n < 0), و يجب ان يكون هنالك سطر فوقه
{   // <- القوس المعقوف في سطر جديد وحده
  // أدناه - يمكن تقسيم الخطوط الطويلة إلى خطوط متعددة لتحسين القراءة
  alert(`Power ${n} is not supported, please enter an integer number greater than zero`);
}
else // <- يمكن أن يكتب على سطر واحد مثل "} else {"
{
  alert(pow(x,n))  // لا مسافات و  ; مفقودة
}
```

التصحيح المفضل:

```js
function pow(x, n) {
  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}

let x = prompt("x?", "");
let n = prompt("n?", "");

if (n < 0) {
  alert(`Power ${n} is not supported,
    please enter an integer number greater than zero`);
} else {
  alert( pow(x, n) );
}
```
