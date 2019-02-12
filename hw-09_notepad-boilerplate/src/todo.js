/*
Используй заготовку проекта из этой ветки репозитория, обязательно прочитай инструкцию.

Перенеси свой класс Notepad

Сделай экземпляр передав ему начальные заметки

>>> Используй геттер для получения всех заметок. <<<

Напиши функцию createListItem(note) 
  Которая:
    - Создаёт один элемент списка ul.note-list c карточкой заметки.

  Примечaние:
    - Создавай DOM-узлы с помощью document.createElement.

Напиши функцию renderNoteList(listRef, notes)
  Которая:
    - получает ссылку на DOM-узел списка ul.note-list и массив объектов заметок, 
    - вызывает createListItem(note) столько раз, сколько объектов в массиве, 

  После чего:
    -  добавляет все карточки в список.

Элемент списка имеет следующий вид:
  - Используй карты имен иконок и действий заметки для подстановки констант.
  - Обрати внимание на data-атрибут data-id у элемента списка, 
      туда записывай идентификатор заметки, это понадобится в следующих работах.
  - Разметка элемента списка довольно большая,

  Поэтому: 
    - есть смысл не писать все в одной функции createListItem (будет простыня кода), а вынести создание отдельных частей карточки и просто вызывать их в createListItem,

  К примеру:
    - Для div.note__content можно написать функцию createNoteContent.
    - Для footer.note__footer можно написать функцию createNoteFooter.
    - Так как button.action повторяется много раз, можно написать функцию createActionButton.
 */

//  Markup

/*
 <li class="note-list__item" data-id="note object id here">

  <div class="note">

    >>> Для функции createNoteContent()

    <div class="note__content">
      <h2 class="note__title">Lorem, ipsum dolor.</h2>
      <p class="note__body">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus
        libero atque, sint quas impedit est illum labore veniam aspernatur neque
        nostrum aliquam dicta blanditiis. Esse porro impedit ratione soluta
        amet?
      </p>
    </div>

    >>> Для функции createNoteFooter()

    <footer class="note__footer">
      <section class="note__section">

        >>> Все кнопки в функции createActionButton

        <button class="action" data-action="decrease-priority">
          <i class="material-icons action__icon">expand_more</i>
        </button>

        <button class="action" data-action="increase-priority">
          <i class="material-icons action__icon">expand_less</i>
        </button>

        <span class="note__priority">Priority: Low</span>
      </section>

      <section class="note__section">

        <button class="action" data-action="edit-note">
          <i class="material-icons action__icon">edit</i>
        </button>

        <button class="action" data-action="delete-note">
          <i class="material-icons action__icon">delete</i>
        </button>

      </section>
    </footer>

  </div>

</li>
 */

// console.table(notepad.notes);
// console.table(notepad.findNoteById(2));
// console.table(notepad.deleteNote(4));
// console.table(notepad.filterNotesByQuery('Maybe'));
// console.table(notepad.filterNotesByPriority(2));
// console.table(notepad.updateNotePriority(1, Notepad.PRIORITY_TYPES.LOW));
// console.table(
//   notepad.updateNoteContent(1, {
//     title: 'New Table',
//     body: 'New text body...',
//   })
// );
