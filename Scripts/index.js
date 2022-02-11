const input = document.getElementById('input');
const myul = document.getElementsByClassName('todolist');
const addButton = document.getElementById('add');
const editButton = document.getElementsByClassName('editBtn');

addTask = () =>
{
    var myinput = input.value;
    var todoArray = JSON.parse(localStorage.getItem("todo")) || [];
    todoArray.push(myinput);
    var li = document.createElement('li');
    var text = document.createTextNode(myinput);
    li.appendChild(text);

    var removeBtn = document.createElement('button');
    var editBtn = document.createElement('button');

    var removeText = document.createTextNode('Remove');
    removeBtn.className = "removeBtn";
    removeBtn.append(removeText);

    var editText = document.createTextNode('Edit');
    editBtn.className = "editBtn";
    editBtn.appendChild(editText);

    li.appendChild(editBtn);
    li.appendChild(removeBtn);
    myul[0].appendChild(li);
    input.value = "";
    localStorage.setItem("todo", JSON.stringify(todoArray));
}

function display()
{
    var todoArray= JSON.parse(localStorage.getItem("todo")) || [];
    todoArray.forEach((currentElement, currentIndex) =>  {
        var li = document.createElement('li');
        var text = document.createTextNode(todoArray[currentIndex]);
        li.appendChild(text);
 
       var removeBtn = document.createElement('button');
       var editBtn = document.createElement('button');

       var removeText = document.createTextNode('Remove');
       removeBtn.className = "removeBtn";
       removeBtn.append(removeText);

       var editText = document.createTextNode('Edit');
       editBtn.className = "editBtn";
       editBtn.appendChild(editText);

      li.appendChild(editBtn);
      li.appendChild(removeBtn);
      myul[0].appendChild(li);
    });
}


addButton.addEventListener("click", () => {
    if(input.value == "")
    {
        return; 
    }
    addTask();
});

input.addEventListener("keypress", (event) => {
    if(input.value == "")
    {
        return;
    }
    if(event.which === 13)
    {
        addTask();
    }
});


myul[0].addEventListener('click', function(ev) 
{
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);


function removeItem(e) 
{
    e.preventDefault();
    if (e.target.classList.contains("removeBtn")) 
    {
        var text = e.target.parentNode.childNodes[0].data;
        var todoArray = JSON.parse(localStorage.getItem("todo"));
        var index =todoArray.indexOf(text);
        if(index !== -1)
        {
            todoArray.splice(index,1);
        }
        localStorage.setItem("todo",JSON.stringify(todoArray));
        let li = e.target.parentNode;
        myul[0].removeChild(li);
        e.target.style.display = "none";
    }

}

myul[0].addEventListener("click", removeItem);

function editTask(e)
{
    e.preventDefault();
    if(e.target.classList.contains("editBtn"))
    {
        var text = e.target.parentNode.childNodes[0].data;
        input.value = text;

        var todoArray = JSON.parse(localStorage.getItem("todo"));
        var index = todoArray.indexOf(text);

        addButton.value= "Edit";
        if(index !== -1)
        {
           todoArray.splice(index,1);
        }
        localStorage.setItem("todo", JSON.stringify(todoArray));
        
        addButton.addEventListener('click', () => 
        {
            e.target.parentNode.style.display = 'none';
            addButton.value = "Add";
        });

        input.addEventListener("keypress", (event) => {
            if(event.which ===13)
            {
                e.target.parentNode.style.display = 'none';
                addButton.value = "Add";
            }
        });
    }
}

myul[0].addEventListener("click",editTask);
