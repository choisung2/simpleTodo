# simpleTodo
https://choisung2.github.io/simpleTodo/

- [x] need to fix: Adding another word to mac(chrome)

기존 **keydown**을 사용해 toDoList를 추가 👉 맥에서 마지막 글자가 더블링되는 현상 발생 
```javascript
listInput.addEventListener("keydown", (e) => {
    if(e.key !== "Enter") {
      return
    }
    addToDoList()
  })
```
**keypress**로 변경 후 원활하게 작동
```javascript
listInput.addEventListener("keypress", (e) => {
    if(e.key !== "Enter") {
      return
    }
    addToDoList()
  })
```

### keypress vs keydown
- keypress는 입력할 수 있는 키보드를 눌렀을 때에만 반응한다(한글 입력, 방향키 등 입력이 반영되는 키보드가 아닐 경우에는 반응하지 않는다)

- keydown은 키보드의 어떤 키가 눌러지더라도 반응한다(=== keyup)

#### key 이벤트 발생 순서
1. key를 누르면 **keydown**이 발생한다
2. 글자가 입력된 이후 **keypress**가 발생한다
3. 다음 key가 해제되면 **keyup**이 발생한다

**keydown > keypress > keyup** 순으로 이벤트 진행

---

- [ ] need to add: Additional function of nav section
