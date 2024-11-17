'use strict';

const NoteVis = function (toggle) {
  document.querySelector('.task-box').classList.remove('isHidden'); //none, block
};

const task = {
  tasks: [],

  addTask: function (content) {
    this.tasks.push({
      date: new Date().toLocaleDateString('en-GB'),
      content: content,
      isDeleted: false,
      isDone: false,
    });
    page = this.tasks.length - 1;
    NoteVis('block');
    this.NoteColor('active');
  },

  delTask: function (id) {
    this.tasks[id - 1].isDeleted = true;
    console.log(`Object state: ${this.tasks[id - 1]}`);
    // document.querySelector('.del-task').style.backgroundColor =
    //   'rgb(209, 143, 123)';
    NoteVis('none');
  },

  noteDone: function (id) {
    this.tasks[id].isDone = true;
    this.NoteColor('done');
  },

  NoteColor: function (color) {
    if (color == 'active') {
      document.querySelector('.task-date').style.color = '748067';
      document.querySelector('.task-con').style.color = '#0b0a07';
      document.querySelector('.task-con').style.backgroundColor = '#f0ec57';
      document.querySelector('.task-con').style.textDecoration = 'none';
    } else if (color == 'done') {
      document.querySelector('.task-con').style.backgroundColor =
        'rgb(132, 183, 108)';
      document.querySelector('.task-con').style.textDecoration = 'line-through';
    }
  },

  Display2: function (page, dir) {
    if (dir == 'left') {
      if (page == 0) return this.tasks[page].content;
      else if (page > 0) {
        page--;
        if (this.tasks[page].isDone === true) this.NoteColor('done');
        if (this.tasks[page].isDeleted === true && page > 0) page--;
        console.log(this.tasks[page].content);
        //wyświetlenie danej notatki
        document.querySelector('.task-text').textContent =
          this.tasks[page].content;
        document.querySelector(
          '.task-date'
        ).textContent = `[${this.tasks[page].date}]`;
        return page;
      }
      //Dokończ ----------------------------------------------------------------
    }
    if (dir == 'done') {
      if ((this.tasks[page].isDone = 1)) this.noteDone(page);
    }
    // if (dir === 'right') {
    //   if (this.tasks[page].isDeleted === true)
    //   //Dokończ ----------------------------------------------------------------
    // };
    //Tutaj nie możesz zrobić tak że jeśli jest deleted to wyświetlisz
    //tylko musisz ominąć tą stronę - czyli page+1|page-1, ale by to nie wymagało potem ponownego wciśnięcia przycisku by przejść. Czyli lepiej wyświetl jeden do przodu a następnie dodaj/odejmij. Kurwa, to bardziej skomplikowane niż myślałem :D Fajnie...
  },

  Display: function (page, dir) {
    if (dir == 'left') {
      console.log(`page to ${page}`);
    } else if (dir == 'right') {
      console.log(`page to ${page}`);
    }
  },
  //Funkcja do strzałek
  Disable: function () {
    // document.querySelector('.swipe-left').style.backgroundColor = 'rgb(132, 183, 108)';
  },
};

let noteId = 0;

let page = 0;

let leftArrow = document.querySelector('.swipe-left');
//EVENTS
document.querySelector('.add-task').addEventListener('click', function () {
  let taskText = document.querySelector('.task').value;
  task.addTask(taskText);

  // if (!task) {
  //   document.querySelector('.task').textContent =
  //     'A task desciption is required...';
  // }
  //Jeśli będzie brak treści podświetl na sekundę plus na czerwono
  let currentData = `[${task.tasks[noteId].date}] `;
  document.querySelector('.task-date').textContent = currentData;
  document.querySelector('.task-text').textContent = task.tasks[noteId].content;

  NoteVis('block');

  console.log(`Note added: ${task.tasks[noteId].content}`);
  noteId++;
});

document.querySelector('.task-con').addEventListener('click', function () {
  task.Display(page, 'done');
});

document.querySelector('.del-task').addEventListener('click', function () {
  task.delTask(noteId);
});

document.querySelector('.swipe-left').addEventListener('click', function () {
  //
  if (page > 0) {
    page--;
    document.querySelector('.task-text').textContent = task.tasks[page].content;
    console.log(`Note displayed: ${page}`);
  }
});
document.querySelector('.swipe-right').addEventListener('click', function () {
  if (page < task.tasks.length - 1) {
    page++;
    if (task.tasks[page - 1].isDone == true) noteDone(page - 1);
    else if (task.tasks[page - 1].isDeleted == true) page++;
    else
      document.querySelector('.task-text').textContent =
        task.tasks[page].content; //Te ify do naprawienia

    document.querySelector('.task-text').textContent = task.tasks[page].content;
    console.log(`Note displayed: ${page}`);
  }
});
