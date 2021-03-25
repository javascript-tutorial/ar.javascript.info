
# علم ثابت "y" ، البحث في الموضع

تسمح العلامة `pattern: y` بالبحث في الموضع المحدد في السلسلة المصدر.

To grasp the use case of `pattern:y` flag, and better understand the ways of regexps, let's explore a practical example.

One of common tasks for regexps is "lexical analysis": we get a text, e.g. in a programming language, and need to find its structural elements. For instance, HTML has tags and attributes, JavaScript code has functions, variables, and so on.

تعد كتابة المحللات المعجمية مجالًا خاصًا ، مع أدواته وخوارزمياته الخاصة ، لذلك لا نتعمق في ذلك ، ولكن هناك مهمة مشتركة: قراءة شيء ما في الموضع المحدد.

على سبيل المثال لدينا سلسلة التعليمات البرمجية `subject: let varName =" value "` ، ونحتاج إلى قراءة اسم المتغير منه ، الذي يبدأ في الموضع `4`.

سنبحث عن اسم متغير باستخدام نمط regexp `: \ w +`. في الواقع ، تحتاج أسماء متغيرات جافا سكريبت إلى regexp أكثر تعقيدًا قليلاً لمطابقة دقيقة ، ولكن هنا لا يهم.

- A call to `str.match(/\w+/)` will find only the first word in the line (`let`). That's not it.
- We can add the flag `pattern:g`. But then the call `str.match(/\w+/g)` will look for all words in the text, while we need one word at position `4`. Again, not what we need.

**So, how to search for a regexp exactly at the given position?**

Let's try using method `regexp.exec(str)`.

For a `regexp` without flags `pattern:g` and `pattern:y`, this method looks only for the first match, it works exactly like `str.match(regexp)`.

...But if there's flag `pattern:g`, then it performs the search in `str`, starting from position stored in the `regexp.lastIndex` property. And, if it finds a match, then sets `regexp.lastIndex` to the index immediately after the match.

In other words, `regexp.lastIndex` serves as a starting point for the search, that each `regexp.exec(str)` call resets to the new value ("after the last match"). That's only if there's `pattern:g` flag, of course.

لذلك ، المكالمات المتتالية لعودة `regexp.exec (str)` تتطابق واحدة تلو الأخرى.

Here's an example of such calls:

```js run
let str = 'let varName'; // Let's find all words in this string
let regexp = /\w+/g;

alert(regexp.lastIndex); // 0 (initially lastIndex=0)

let word1 = regexp.exec(str);
alert(word1[0]); // let (1st word)
alert(regexp.lastIndex); // 3 (position after the match)

let word2 = regexp.exec(str);
alert(word2[0]); // varName (2nd word)
alert(regexp.lastIndex); // 11 (position after the match)

let word3 = regexp.exec(str);
alert(word3); // null (no more matches)
alert(regexp.lastIndex); // 0 (resets at search end)
```

We can get all matches in the loop:

```js run
let str = 'let varName';
let regexp = /\w+/g;

let result;

while (result = regexp.exec(str)) {
  alert( `Found ${result[0]} at position ${result.index}` );
  // Found let at position 0, then
  // Found varName at position 4
}
```

Such use of `regexp.exec` is an alternative to method `str.matchAll`, with a bit more control over the process.

Let's go back to our task.

We can manually set `lastIndex` to `4`, to start the search from the given position!

Like this:

```js run
let str = 'let varName = "value"';

let regexp = /\w+/g; // without flag "g", property lastIndex is ignored

*!*
regexp.lastIndex = 4;
*/!*

let word = regexp.exec(str);
alert(word); // varName
```

Hooray! Problem solved! 

We performed a search of `pattern:\w+`, starting from position `regexp.lastIndex = 4`.

The result is correct.

...But wait, not so fast.

Please note: the `regexp.exec` call starts searching at position `lastIndex` and then goes further. If there's no word at position `lastIndex`, but it's somewhere after it, then it will be found:

```js run
let str = 'let varName = "value"';

let regexp = /\w+/g;

*!*
// start the search from position 3
regexp.lastIndex = 3;
*/!*

let word = regexp.exec(str); 
// found the match at position 4
alert(word[0]); // varName
alert(word.index); // 4
```

For some tasks, including the lexical analysis, that's just wrong. We need to find a match exactly at the given position at the text, not somewhere after it. And that's what the flag `y` is for.

**The flag `pattern:y` makes `regexp.exec` to search exactly at position `lastIndex`, not "starting from" it.**

هذا هو نفس البحث مع العلم `pattern: y`:

```js run
let str = 'let varName = "value"';

let regexp = /\w+/y;

regexp.lastIndex = 3;
alert( regexp.exec(str) ); // null (there's a space at position 3, not a word)

regexp.lastIndex = 4;
alert( regexp.exec(str) ); // varName (word at position 4)
```

كما نرى ، لا يتطابق regexp `pattern: / \ w + / y` في الموضع` 3` (على عكس العلم `pattern: g`) ، ولكنه يتطابق في الموضع` 4`.

Not only that's what we need, there's an important performance gain when using flag `pattern:y`.

Imagine, we have a long text, and there are no matches in it, at all. Then a search with flag `pattern:g` will go till the end of the text and find nothing, and this will take significantly more time than the search with flag `pattern:y`, that checks only the exact position.

In tasks like lexical analysis, there are usually many searches at an exact position, to check what we have there. Using flag `pattern:y` is the key for correct implementations and a good performance.
