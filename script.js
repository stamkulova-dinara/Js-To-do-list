let div = document.createElement('div')
div.classList.add('container')
document.body.prepend(div)

let projectName = document.createElement('h1')
projectName.innerHTML = "Let's do it"
div.append(projectName)

let listBlock = document.createElement('div')
listBlock.id = 'divBlock'
div.append(listBlock)

let childDiv = document.createElement('div')
listBlock.append(childDiv)

let input = document.createElement('input')
input.id = 'textInput'
input.setAttribute('placeholder', 'Gonna do ...')
childDiv.append(input)

let setDate = document.createElement('input')
setDate.setAttribute('type', 'date')
childDiv.append(setDate)

let addButton = document.createElement('button')
addButton.innerHTML = 'Add'
addButton.id = 'btn'
childDiv.append(addButton)

let list = document.createElement('ul')
listBlock.append(list)

let todoArray = localStorage.getItem('todos') == null
    ? []
    :[...JSON.parse(localStorage.getItem('todos'))]

const addTodo = () => {
    let newTask = input.value
    let date = setDate.value
    if (newTask != '') {
        todoArray.push({
            text: newTask,
            checked: false,
            date
        })

        localStorage.setItem('todos', JSON.stringify(todoArray))
        renderTodoItems()

        input.value = ''
        setDate.value = ''
    }
}

const deleteTodo = (e) => {
    let index = parseInt(e.target.parentNode.id)
    todoArray.splice(index, 1)
    localStorage.setItem('todos', JSON.stringify(todoArray))
    renderTodoItems()
}

const doneTodo = (e) => {
    let todoTemporary = [...todoArray]

    let index = parseInt(e.target.parentNode.id)
    let objElement = todoTemporary[index].checked
    todoTemporary[index].checked = !objElement

    localStorage.setItem('todos', JSON.stringify(todoTemporary))

    let isDone = e.currentTarget.parentNode.classList.contains('done')

    isDone
    ?
    e.currentTarget.parentNode.classList.remove('done'):
    e.currentTarget.parentNode.classList.add('done')
}

addButton.addEventListener('click', addTodo);

const renderTodoItems = () => {
    list.innerHTML = ''

    todoArray.map((item, id) => {
        let li = document.createElement('li')
        li.className = item.checked ? 'taskItem done' : 'taskItem'
        li.id = id

        let doneIcon = document.createElement('img')
        doneIcon.src = 'done.png'
        doneIcon.className = 'button'
        doneIcon.addEventListener('click', doneTodo)

        let deleteButton = document.createElement('img')
        deleteButton.src = 'delete.png'
        deleteButton.className = 'button'
        deleteButton.addEventListener('click', deleteTodo)

        let label = document.createElement('label')
        label.append(item.text + ' ' + item.date)

        li.append(label)
        li.append(doneIcon)
        li.append(deleteButton)

        list.prepend(li)
    })
}

renderTodoItems()