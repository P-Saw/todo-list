/* THEME CHANGE */
const themeButton = document.querySelector('.switch');
const docBody = document.body;
const docHeader = document.querySelector('header')

document.addEventListener("DOMContentLoaded", () =>{
    if(localStorage.getItem('theme')){
        darkThemeSwitch();
    }
})

themeButton.addEventListener('click', () =>{
    docBody.classList.contains("light-theme") ? darkThemeSwitch() : lightThemeSwitch()
})

const darkThemeSwitch = () =>{
    docBody.classList.remove("light-theme");
    docBody.classList.add("dark-theme");
    themeButton.classList.add("dark-active");
    docHeader.classList.add("dark-header");
    localStorage.setItem('theme', 'dark');
}
const lightThemeSwitch = () =>{
    docBody.classList.remove("dark-theme");
    docBody.classList.add("light-theme");
    themeButton.classList.remove("dark-active");
    docHeader.classList.remove("dark-header");
    localStorage.removeItem('theme');
}

/* TODO LIST */
const inputValue = document.querySelector('[data-input]');
const inputForm = document.querySelector('.input-form');
const todoList = document.querySelector('.todo-list');
const toggleButtons = document.querySelectorAll('.toggle');

inputForm.addEventListener('submit', (event) =>{
    event.preventDefault();
    makeListItem(inputValue.value);
    countElem();
    inputValue.value = '';
})
/* ADD LIST ITEM FUNCTION */
const makeListItem = (input) =>{
    if(input !== ''){
        const listItem = document.createElement('li');
        listItem.className = 'todo-list-item';
        listItem.dataset.status = 'undone';
        /* toggle */
        const toggleDiv = document.createElement('div');
        toggleDiv.className = 'toggle';
        toggleDiv.addEventListener('click', ()=>{
            toggleDiv.classList.toggle('checked');
            pharagraph.classList.toggle('done');
            listItem.dataset.status = 'done'
            countElem();
        })
        /* pharagraph */
        const pharagraph = document.createElement('p');
        pharagraph.className = 'task';
        pharagraph.innerHTML = input;
        /* delete */
        const deleteDiv = document.createElement('div');
        deleteDiv.className = 'delete';
        deleteDiv.addEventListener('click', ()=>{
            deleteDiv.parentElement.remove();
            countElem();
        })
        listItem.appendChild(toggleDiv);
        listItem.appendChild(pharagraph);
        listItem.appendChild(deleteDiv);

        todoList.appendChild(listItem);
    }
}

/* Interactive section */
/* count items left */
const itemsLeft = document.querySelector('.items-left');
const countElem = () =>{
    const number = todoList.querySelectorAll("li[data-status='undone']").length;
    itemsLeft.innerHTML = number;
}

/* Clear Completed */
const clearBtn = document.querySelector('.clear');
clearBtn.addEventListener('click', () =>{
    todoList.querySelectorAll("p.done").forEach(p =>{
        p.parentElement.remove();
    })
})

/* Sorting */
const allBtn = document.querySelector('[data-all]');
const activeBtn = document.querySelector('[data-active]');
const completedBtn = document.querySelector('[data-completed]');

allBtn.addEventListener('click', ()=>{
    allBtn.classList.add('active');
    activeBtn.classList.remove('active');
    completedBtn.classList.remove('active');
    todoList.querySelectorAll('li').forEach(li =>{
        li.style.display = 'flex'
    })
})

activeBtn.addEventListener('click', ()=>{
    allBtn.classList.remove('active');
    activeBtn.classList.add('active');
    completedBtn.classList.remove('active');
    todoList.querySelectorAll("li[data-status='done']").forEach(li =>{
        li.style.display = 'none';
    })
    todoList.querySelectorAll("li[data-status='undone']").forEach(li =>{
        li.style.display = 'flex';
    })
})

completedBtn.addEventListener('click', ()=>{
    allBtn.classList.remove('active');
    activeBtn.classList.remove('active');
    completedBtn.classList.add('active');
    todoList.querySelectorAll("li[data-status='undone']").forEach(li =>{
        li.style.display = 'none';
    })
    todoList.querySelectorAll("li[data-status='done']").forEach(li =>{
        li.style.display = 'flex';
    })
})

/* DRAGGING */
new Sortable(todoList, {
    animation: 150,
    filter: 'div'
});