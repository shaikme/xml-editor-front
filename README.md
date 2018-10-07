# xml-editor
Веб интерфейс - https://front-xml.herokuapp.com

Бекенд - https://github.com/shaikme/xml-editor-server

# Структура стора 
Обьект где ключами выступают id xml-документа и значениями обьект вида
```js
{
  'ID документа' {
      loading: Boolean,
      loaded: Boolean,
      error: Boolean,
      uploading: Boolean,
      uploaded: Boolean,
      id: String,
      name: String,
      body: Object,
      closedTags: Array of TagID
    }
}
```

Каждый тег xml-документа имеет свой id, при изменении передаем на сервере массив изменненых тегов c новыми значениями, вида
```js
[
  {
    "id":"9x6kk0zw0",
    "text":"test"
  },
  { 
    "id":"miaitbnuz",
    "attributes":{"anotheOne":"attr"},
    "text":"newText"
  }
]
```
далее локально и на сервере обоходим документ находим ноды с нужными id и вносим изменения.

