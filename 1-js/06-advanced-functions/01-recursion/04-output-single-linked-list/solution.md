# حل مبني علي الحلقة

الحل:

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

function printList(list) {
  let tmp = list;

  while (tmp) {
    alert(tmp.value);
    tmp = tmp.next;
  }

}

printList(list);
```
يرجي ملاحظة أننا نستخدم المتغير المؤقت `tmp` للمرور خلال القائمة. من الناحية الفنية, يمكن أن نستخدم عامل الدالة `list`:


```js
function printList(list) {

  while(*!*list*/!*) {
    alert(list.value);
    list = list.next;
  }

}
```

لكن هذا لن يكون محبذاً في المستقبل لأنه بسبب ما من الممكن أن نمد الدالة لفعل شئ أخر للقائمة.

لو غيرنا الـ `list` سنخسر هذه الميزة.

بمناسبة الحديث عن التسمية الجيدة للمتغيرات, `list` تعتبر الـ القائمة نفسها. بمعني أدق العنصر الأول فيها. وهو يجب أن يبقي هكذا.

علي صعيد أخر, دور `tmp` يهتم فقط بالانتقال بين عناصر القائمة, مثل `i` الموجود في حلقة `for`

From the other side, the role of `tmp` is exclusively a list traversal, like `i` in the `for` loop.

# الحل التكراري

الحل التكراري للدالة `printList(list)` يتبع منطق بسيط لطباعة القائمة: يجب طباعة العنصر الحالي `list` ثم إعادة الموضوع للباقي `list.next` حتي تنتهي القائمة :


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

function printList(list) {

  alert(list.value); // output the current item

  if (list.next) {
    printList(list.next); // do the same for the rest of the list
  }

}

printList(list);
```

الأن من هو الأفضل؟

عملياً الحلقة أكثر كفاءة بالرغم من أنهم يقومون بنفس المهمة, لكن الحلقة لا تستطيع عمل أكثر من نداء متداخل.

علي الجانب الأخر التكرار يعتبر أسهل للفهم وأقصر
