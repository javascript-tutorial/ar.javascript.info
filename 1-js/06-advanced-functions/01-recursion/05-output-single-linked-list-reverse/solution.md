# حل التكرار

منطق التكرار هنا يعتبر مخادع قليلاً.

هنا نحن نحتاج أولاً أن نطبع بقية القائمة ثم بعد ذلك نطبع العنصر الحالي. هل فهمتها؟


```js run
let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};

function printReverseList(list) {

  if (list.next) {
    printReverseList(list.next);
  }

  alert(list.value);
}

printReverseList(list);
```

# حل الحلقة

حل الحلقة هو الاخر يعتبر معقد قليلاً بالنسبة إلي الطباعة المباشرة.

نحن لا نمتلك طرييقة للحصول علي القيمة الأخيرة في القائمة ولا نستطيع العودة للخلف.

إذا ماذا نفعل؟ نستطيع أولاً أن نمر خلال العناصر بالطريقة المباشرة ونتذكرهم عن طريق تخزينهم في ترتيب Array, ثم نطبع الترتيب الذي تذكرناه ولكن بشكل عكسي:


```js run
let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};

function printReverseList(list) {
  let arr = [];
  let tmp = list;

  while (tmp) {
    arr.push(tmp.value);
    tmp = tmp.next;
  }

  for (let i = arr.length - 1; i >= 0; i--) {
    alert( arr[i] );
  }
}

printReverseList(list);
```

يرجي ملاحظة أن الحل المتكرر هنا فعل المثل تماماً: لقد أتبع العناصر في السلسلة عن طريق المنادايات المتداخلة ثم طباعتهم.

