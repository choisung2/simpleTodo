//date display
const inputLabel = document.querySelector('.label')

const today = new Date();
const yaer = today.getFullYear();
const month = today.getMonth() + 1;
const date = today.getDate();
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const day = weekday[today.getDay()];

inputLabel.innerText = yaer + '/' + month + '/' + date + '/' + day;
// inputLabel.innerText = today.toLocaleDateString();


//formTag auto submit prohibit
const formWrap = document.querySelector('.input-wrap')

formWrap.addEventListener("submit", (e) => {
  e.preventDefault()
})


//localStorage
const storage = {
  setLocalStorage(list) {
    localStorage.setItem("list", JSON.stringify(list))
  },
  getLocalStorage() {
    return JSON.parse (localStorage.getItem("list"))
  } 
}

function App() {
  //localStorage render
  this.list = {
    important: [],
    study: [],
    life: [],
  }

  this.currentMenu = "important"

  this.init = () => {
    if(storage.getLocalStorage()) {
      this.list = storage.getLocalStorage()
    }
    render()
  }
//✅item.done ternary if+
  const render = () => {
    const template = this.list[this.currentMenu].map((item, index) => {
      return `
      <li data-list-id="${index}" class="todo-item">
        <span class="${item.done ? 'done' : ''} item-name">${item.title}</span>
        <div class="item-btn">
          <button type="button" class="done-btn">완료</button>
          <button type="button" class="edit-btn">수정</button>
          <button type="button" class="remove-btn">삭제</button>
        </div>
      </li>`
    }).join(" ")

    toDoList.innerHTML = template

    //list count
    updatedListCount()
  }


  //toDo list add
  const listInput = document.querySelector('#list')
  const toDoList = document.querySelector('#todo-list')
  const listCount = document.querySelector('.list-count')
  const submitBtn = document.querySelector('.submit')

  const updatedListCount = () => {
    // const listCountValue = toDoList.querySelectorAll("li").length
    const listCountValue = this.list[this.currentMenu].length
    listCount.innerText = `${listCountValue}`
  }

  const addToDoList = () => {
    
    const listInputValue = listInput.value

    if(listInputValue === "") {
      alert("입력해주세요")
      return
    }

    //list add
    this.list[this.currentMenu].push({ title: listInputValue})
    storage.setLocalStorage(this.list)

    render()

    //inputValue reset
    listInput.value = ""
  }

  submitBtn.addEventListener("click", addToDoList)

  listInput.addEventListener("keypress", (e) => {
    if(e.key !== "Enter") {
      return
    }
    addToDoList()
  })


  //toDo list modify & toDo list delete
  const editToDoList = (e) => {
    //list modify
    const itemName = e.target.closest('li').querySelector('.item-name') 
    const updatedItemName = prompt("수정하세요", itemName.innerText)

    const listId = e.target.closest('li').dataset.listId
    this.list[this.currentMenu][listId].title = updatedItemName
    storage.setLocalStorage(this.list)

    //rendering
    itemName.innerText = updatedItemName
  }

  const removeToDoList = (e) => {
    //list delete
    const listId = e.target.closest('li').dataset.listId
    this.list[this.currentMenu].splice(listId, 1)
    storage.setLocalStorage(this.list)
    e.target.closest('li').remove()
    //list count
    render()
  }

  //✅toDo list complete
  const doneToDoList = (e) => {
    const listId = e.target.closest('li').dataset.listId
    this.list[this.currentMenu][listId].done = !this.list[this.currentMenu][listId].done
    storage.setLocalStorage(this.list)
    render()
  }

  toDoList.addEventListener("click", (e) => {
    if(e.target.classList.contains("edit-btn")) {
      editToDoList(e)
      return
    }

    if(e.target.classList.contains("remove-btn")) {
      removeToDoList(e)
      return
    }

    if(e.target.classList.contains("done-btn")) {
      doneToDoList(e)
      return
    }
  })


  const menuBtn = document.querySelector('.btn-wrap')

  menuBtn.addEventListener("click", (e) => {
    const isMenuBtn = e.target.classList.contains("menu-btn")
    if(isMenuBtn) {
      const menuName = e.target.dataset.menuName
      this.currentMenu = menuName
      render()
    }
  })
}

const app = new App();
app.init()
