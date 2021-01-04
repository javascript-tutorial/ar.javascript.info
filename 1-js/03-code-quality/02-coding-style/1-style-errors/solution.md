
لاحظ التالي:

```js no-beautify
function pow(x,n)  // <- لا مسافات بين المعطيات
{  // <- القوس المعقوف في سطر جديد وحده
  let result=1;   // <- لا مسافة قبل او بعد = 
  for(let i=0;i<n;i++) {result*=x;}   // <- لا مسافة
  // المحتوي { ... } يجب ان يكون علي سطر جديد
  return result;
}

<<<<<<< HEAD
let x=prompt("x?",''), n=prompt("n?",'') // <-- ممكن تقنيا,
// ولكن من الأفضل جعلها سطرين ، كما أنه لا توجد مسافات أو مفقودة ;
if (n<0)  // <- لا مسافات داخل (n < 0), و يجب ان يكون هنالك سطر فوقه
{   // <- القوس المعقوف في سطر جديد وحده
  // أدناه - يمكن تقسيم الخطوط الطويلة إلى خطوط متعددة لتحسين القراءة
=======
let x=prompt("x?",''), n=prompt("n?",'') // <-- technically possible,
// but better make it 2 lines, also there's no spaces and missing ;
if (n<=0)  // <- no spaces inside (n <= 0), and should be extra line above it
{   // <- figure bracket on a separate line
  // below - long lines can be split into multiple lines for improved readability
>>>>>>> 039716de8a96f49b5fccd7aed5effff2e719dfe5
  alert(`Power ${n} is not supported, please enter an integer number greater than zero`);
}
else // <- يمكن أن يكتب على سطر واحد مثل "} else {"
{
  alert(pow(x,n))  // لا مسافات و مفقودة ;
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

if (n <= 0) {
  alert(`Power ${n} is not supported,
    please enter an integer number greater than zero`);
} else {
  alert( pow(x, n) );
}
```
