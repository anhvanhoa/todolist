// const content_todo = document.querySelector('.content-todo');
// let listTodo = JSON.parse(localStorage.getItem('Todo'));
// const itemActive = document.querySelector('.todo-active');
// const itemTodo = document.querySelector('.todo');
// const itemAll = document.querySelector('.todo-all');
// const btn_delete = document.querySelector('.icon-delete');
// let listItem = document.querySelectorAll('.content-todo-item');
// let itemRemove;
// function funcItemAll() {
//     const html = listTodo
//         .map(
//             (item) =>
//                 `
//                 <div class="content-todo-item" draggable="true" data-id="${item.id}">
//                 <a href="./detail.html?id=${item.id}" >
//                         <div class="content-todo-heading">
//                             <div class="status ${item.status ? 'status-complete' : ''}"></div>
//                             <h2 class="content-todo-title">${item.title}</h2>
//                         </div>
//                         <pre>${item.content}</pre>
//                         </a>
//                     </div>
//                 `,
//         )
//         .join('');
//     content_todo.innerHTML = html;
//     listItem = document.querySelectorAll('.content-todo-item');
//     a();
// }
// funcItemAll();
// itemAll.addEventListener('click', funcItemAll);

// itemActive.addEventListener('click', () => {
//     const html = listTodo
//         .map((item) => {
//             if (item.status) {
//                 return `<div class="content-todo-item" draggable="true" data-id="${item.id}">
//                         <div class="content-todo-heading">
//                             <div class="status ${item.status ? 'status-complete' : ''}"></div>
//                             <h2 class="content-todo-title">${item.title}</h2>
//                         </div>
//                         <pre>${item.content}</pre>
//                     </div>
//                     `;
//             }
//         })
//         .join('');
//     content_todo.innerHTML = html;
//     listItem = document.querySelectorAll('.content-todo-item');
//     a();
// });

// itemTodo.addEventListener('click', () => {
//     const html = listTodo
//         .map((item) => {
//             if (!item.status) {
//                 return `<div class="content-todo-item" draggable="true" data-id="${item.id}">
//                         <div class="content-todo-heading">
//                             <div class="status ${item.status ? 'status-complete' : ''}"></div>
//                             <h2 class="content-todo-title">${item.title}</h2>
//                         </div>
//                         <pre>${item.content}</pre>
//                     </div>
//                     `;
//             }
//         })
//         .join('');
//     content_todo.innerHTML = html;
//     listItem = document.querySelectorAll('.content-todo-item');
//     a();
// });
// function a() {
//     listItem.forEach((item) => {
//         item.addEventListener('dragstart', (e) => {
//             itemRemove = e.currentTarget;
//         });
//     });
// }

// btn_delete.addEventListener('dragover', (event) => {
//     event.preventDefault();
//     itemRemove.setAttribute('itemRemove', false);
//     itemRemove.remove();
//     let newListTodo = listTodo.filter((item) => item.id != itemRemove.getAttribute('data-id'));
//     listTodo = newListTodo;
//     console.log();
//     localStorage.setItem('Todo', JSON.stringify(newListTodo));
// });

let itemDragStart;
const listTodo = document.querySelector('.list-todo');
const btn_complete = document.querySelector('.btn-complete');
const btn_pending = document.querySelector('.btn-pending');
const btn_all = document.querySelector('.btn-all');
const btn_delete = document.querySelector('.btn-delete');
const btn_add = document.querySelector('.btn-add');
const valueTitle = document.querySelector('.add-todo input');

let data = JSON.parse(localStorage.getItem('todo')) ? JSON.parse(localStorage.getItem('todo')) : [];
function addItemTodo() {
    listTodo.innerHTML = '';
    if (!data.length) {
        listTodo.innerHTML = '<h2 class="no-data">There are no records yet!!!</h2>';
    }
    data.forEach((element) => {
        const html = `
                    <div class="list-todo-item" draggable="true" data-id="${element.id}">
                        <div class="status ${element.status ? 'status-complete' : ''}"></div>
                        <h2 class="list-todo-item-title">${element.title}</h2>
                    </div>
                    `;
        listTodo.insertAdjacentHTML('afterbegin', html);
    });
    dragStart();
    switchStatus();
}
addItemTodo();
function getItemComplete() {
    const html = data.map((element) => {
        if (element.status) {
            return `
            <div class="list-todo-item" draggable="true" data-id="${element.id}">
                <div class="status ${element.status ? 'status-complete' : ''}"></div>
                <h2 class="list-todo-item-title">${element.title}</h2>
            </div>
            `;
        }
    });
    listTodo.innerHTML = html.join('');
    dragStart();
    switchStatus();
}
btn_complete.addEventListener('click', getItemComplete);

function getItemPending() {
    const html = data.map((element) => {
        if (!element.status) {
            return `
            <div class="list-todo-item" draggable="true" data-id="${element.id}">
                <div class="status ${element.status ? 'status-complete' : ''}"></div>
                <h2 class="list-todo-item-title">${element.title}</h2>
            </div>
            `;
        }
    });
    listTodo.innerHTML = html.join('');
    dragStart();
    switchStatus();
}
btn_pending.addEventListener('click', getItemPending);
btn_all.addEventListener('click', addItemTodo);
function dragStart() {
    const itemTodo = document.querySelectorAll('.list-todo-item');
    itemTodo.forEach((item) => {
        item.addEventListener('dragstart', (e) => {
            itemDragStart = e.currentTarget;
        });
    });
}

btn_delete.addEventListener('dragenter', () => {
    itemDragStart.remove();
    const newData = data.filter((element) => element.id != itemDragStart.getAttribute('data-id'));
    data = newData;
    localStorage.setItem('todo', JSON.stringify(data));
});

btn_add.addEventListener('click', () => {
    if (!valueTitle.value.trim().length > 0) {
        return;
    }
    let lastId = data[data.length - 1];
    const itemAdd = {
        title: valueTitle.value,
        status: false,
        id: data.length ? lastId.id + 1 : 1,
    };
    data.push(itemAdd);
    addItemTodo();
    valueTitle.value = '';
    valueTitle.focus();
    localStorage.setItem('todo', JSON.stringify(data));
});

function switchStatus() {
    const status = document.querySelectorAll('.status');
    status.forEach((element1) => {
        element1.onclick = () => {
            const id = element1.parentElement.getAttribute('data-id');
            const newData = data.map((element) => {
                if (element.id == id) {
                    setTimeout(() => {
                        element1.classList.toggle('status-complete');
                    }, 2000);
                    return { ...element, status: element.status ? false : true };
                }
                return element;
            });
            data = newData;
            localStorage.setItem('todo', JSON.stringify(newData));
        };
    });
}
