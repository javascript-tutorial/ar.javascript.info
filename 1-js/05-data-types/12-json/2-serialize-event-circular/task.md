درجة الأهمية: 5

---

# استثناء المراجع لكائنات أخرى

فى بعض الحالات البسيطة من المرجعية الثنائية (circular references)، يمكننا أن نستبعد الخاصية الغير مرغوبة من التحويل عن طريق اسمها.

ولكن فى بعض الأوقات لا يمكننا أن نستخدم الإسم فقط، حيث أنها يمكن أن تكون مستخدمه فى مرجعية ثنائية وفى خاصية عادية، ولذلك يمكننا أن نختبر الخاصية عن طريق اسمها.

قم بإنشاء الدالة `replacer` لتحويل كل شيئ إلى نص ولكن تقوم بحذف الخصائص التى تحتوى على مرجع للكائن `meetup`:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  occupiedBy: [{name: "John"}, {name: "Alice"}],
  place: room
};

*!*
// circular references
room.occupiedBy = meetup;
meetup.self = meetup;
*/!*

alert( JSON.stringify(meetup, function replacer(key, value) {
  /* الحل الخاص بك */
}));

/* يجب أن تكون النتيجة كالآتي:
{
  "title":"Conference",
  "occupiedBy":[{"name":"John"},{"name":"Alice"}],
  "place":{"number":23}
}
*/
```
