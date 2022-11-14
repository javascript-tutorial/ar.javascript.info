# الحل الأبطئ

يمكننا حساب جميع الفئات الفرعية الممكنة.

إن أبسط طريقة هي أخذ كل عنصر وحساب جميع المصفوفات الفرعية بدءًا منها.

علي سبيل المثال, for `[-1, 2, 3, -9, 11]`:

```js no-beautify
// البدء من -1:
-1 - 1 + 2 - 1 + 2 + 3 - 1 + 2 + 3 + -9 - 1 + 2 + 3 + -9 + 11;

// البدء من 2:
2;
2 + 3;
2 + 3 + -9;
2 + 3 + -9 + 11;

// البدء من 3:
3;
3 + -9;
3 +
  -9 +
  11 -
  // البدء من -9
  9 -
  9 +
  11;

// البدء من 11
11;
```

الكود هو في الواقع حلقة متداخلة: الحلقة الخارجية فوق عناصر المصفوفه ، والعد الداخلي يحسب الفئات الفرعية التي تبدأ بالعنصر الحالي.

```js run
function getMaxSubSum(arr) {
  let maxSum = 0; // إذا لم نأخذ أي عناصر ، فسيتم إرجاع الصفر

  for (let i = 0; i < arr.length; i++) {
    let sumFixedStart = 0;
    for (let j = i; j < arr.length; j++) {
      sumFixedStart += arr[j];
      maxSum = Math.max(maxSum, sumFixedStart);
    }
  }

  return maxSum;
}

alert(getMaxSubSum([-1, 2, 3, -9])); // 5
alert(getMaxSubSum([-1, 2, 3, -9, 11])); // 11
alert(getMaxSubSum([-2, -1, 1, 2])); // 3
alert(getMaxSubSum([1, 2, 3])); // 6
alert(getMaxSubSum([100, -9, 2, -3, 5])); // 100
```

The solution has a time complexity of [O(n<sup>2</sup>)](https://en.wikipedia.org/wiki/Big_O_notation). In other words, if we increase the array size 2 times, the algorithm will work 4 times longer.

<<<<<<< HEAD
# الحل الأسرع
=======
For big arrays (1000, 10000 or more items) such algorithms can lead to serious sluggishness.
>>>>>>> 8d9ecb724c7df59774d1e5ffb5e5167740b7d321

دعنا نسير في المصفوفة ونحتفظ بالمجموع الجزئي الحالي للعناصر في المتغير `s`. إذا أصبحت `s` سالبة في وقت ما ، قم بتعيين` s = 0`. سيكون الحد الأقصى لكل هذه الإجابات هو الإجابة.

إذا كان الوصف غامضًا جدًا ، فيرجى الاطلاع على الكود ، فهو قصير بما يكفي:

```js run demo
function getMaxSubSum(arr) {
  let maxSum = 0;
  let partialSum = 0;

  for (let item of arr) {
    // لكل عنصر في المصفوفه
    partialSum += item; // أضفه إلى مجموع الجزئي
    maxSum = Math.max(maxSum, partialSum); // تذكر الحد الأقصى
    if (partialSum < 0) partialSum = 0; // صفر إذا كانت سلبية
  }

  return maxSum;
}

alert(getMaxSubSum([-1, 2, 3, -9])); // 5
alert(getMaxSubSum([-1, 2, 3, -9, 11])); // 11
alert(getMaxSubSum([-2, -1, 1, 2])); // 3
alert(getMaxSubSum([100, -9, 2, -3, 5])); // 100
alert(getMaxSubSum([1, 2, 3])); // 6
alert(getMaxSubSum([-1, -2, -3])); // 0
```

تتطلب الخوارزمية تمريراً مصفوفه واحده ، لذا فإن تعقيد الوقت هو O (n).

<<<<<<< HEAD
يمكنك العثور على مزيد من المعلومات التفصيلية حول الخوارزمية هنا: [Maximum subarray problem](http://en.wikipedia.org/wiki/Maximum_subarray_problem). إذا كان لا يزال من غير الواضح سبب نجاح ذلك ، فالرجاء تتبع الخوارزمية في الأمثلة أعلاه ، ومعرفة كيفية عملها ، وهذا أفضل من أي كلمات.
=======
You can find more detailed information about the algorithm here: [Maximum subarray problem](http://en.wikipedia.org/wiki/Maximum_subarray_problem). If it's still not obvious why that works, then please trace the algorithm on the examples above, see how it works, that's better than any words.
>>>>>>> 8d9ecb724c7df59774d1e5ffb5e5167740b7d321
