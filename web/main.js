async function solve_system (){
    var system_roots = [];

    //список элементов со значениями
    let rows = document.getElementsByClassName("row value");

    //список значений после =
    let list_equation = [];

    //список коэфициентов
    let list_of_x = [];

    //парсим значения input'ов и закидываем в соответствующий список
    for (let values of rows) {
        let x_values = values.getElementsByTagName("input");
        let list_x = []
        for (let input_value of x_values){
            if (input_value.value == null){
                input_value.value = 0;
            }
            list_x.push(parseFloat(input_value.value).toFixed(2))

        }
    list_of_x.push(list_x);

    //сюда закидываем последнее число, так как оно идёт после =
    list_equation.push(list_x.pop());
    }

    //чекаем есть ли exception
    value_check = await eel.solve_check(list_of_x, list_equation)();

    alert(value_check)

    //если есть exception и в документе нет элемента ошибки, то создаём ошибку
    if (value_check == false && document.getElementsByClassName("alert").length == 0){
        document.getElementById("main").appendChild(create_error());
    }
    //если есть exception и в документе есть элемент ошибки, то ниче не делаем
    else if(value_check == false && document.getElementsByClassName("alert").length != 0){

    }
    //если нет exception и в документе нет элемента ошибки, то записываем корни
    else if(value_check != false && document.getElementsByClassName("alert").length == 0){
        system_roots = await eel.solve_lg(list_of_x, list_equation)();

        let answer_list = document.getElementsByClassName("answer-rd");
    
        for (let i = 0; i < answer_list.length; i++) {
            answer_list[i].value = system_roots.shift();
        }
    }
    //если нет exception и в документе есть элемент ошибки, то удаляем ошибку и записываем корни
    else if(value_check != false && document.getElementsByClassName("alert").length != 0){
        system_roots = await eel.solve_lg(list_of_x, list_equation)();
        document.getElementsByClassName("alert")[0].remove();

        alert(system_roots)

        let answer_list = document.getElementsByClassName("answer-rd");
    
        for (let i = 0; i < answer_list.length; i++) {
            answer_list[i].value = system_roots.shift();
        }
    }
}

function create_error(){
    var div_error = document.createElement("div");
    div_error.className = "alert alert-danger d-flex align-items-center m-auto mt-3";
    div_error.role = "alert";

    var text_error = document.createElement("div");
    text_error.innerHTML = "Error - singular matrix";

    div_error.appendChild(text_error);

    return div_error;
}

function create_row_input(x){

    var div = document.createElement("div");
    div.className = "row value";

    for (var i = 0; i < x; i++){
        var div1 = document.createElement("div");
        div1.className = "input";
        div.appendChild(div1)
        var inpt = document.createElement("input");
        inpt.className = "";
        inpt.type = "number";
        inpt.value = 0;
        div1.appendChild(inpt);
    
        var label = document.createElement("label");
        label.className = "";
        label.innerHTML = "X";
        var sub = document.createElement("sub");
        sub.innerHTML = i+1;
        label.appendChild(sub);
        div.appendChild(label);
        
        if (i+1 == x){
            var span = document.createElement("span");
            span.className = "";
            span.innerHTML = "=";
            div.appendChild(span);

            var inpt = document.createElement("input");
            inpt.className = "";
            inpt.type = "number";
            inpt.value = 0;
            var div2 = document.createElement("div");
            div2.className = "input";
            div2.appendChild(inpt);
            div.appendChild(div2);

            break;
        }

        var span = document.createElement("span");
        span.className = "";
        span.innerHTML = "+"
        div.appendChild(span);
    }
    
    return div;
}

function create_row_answer(x){
    var div = document.createElement("div");
    div.className = "row answer";

    var div1 = document.createElement("div");
    div1.className = "input";
    div.appendChild(div1)
    var inpt = document.createElement("input");
    inpt.className = "answer-rd";
    inpt.type = "number";
    inpt.readOnly = true;
    div1.appendChild(inpt);

    var label = document.createElement("label");
    label.className = "";
    label.innerHTML = "X";
    var sub = document.createElement("sub");
    sub.innerHTML = x;
    label.appendChild(sub);
    div.appendChild(label);
    
    return div;
}

function create_rows(){
    
    document.getElementsByClassName("container")[0].appendChild(create_row_input(5))

}

function redraw_rows(){

    let rows_value = document.getElementById("values");
    let rows_answer = document.getElementById("solutions");

    rows_value.innerHTML = "";
    rows_answer.innerHTML = "";

    for(var i = 0; i < system_size.value; i++){
        document.getElementById("values").appendChild(create_row_input(system_size.value));
        document.getElementById("solutions").appendChild(create_row_answer(i+1));
    }

}

//добавляем строки при загрузке страницы
for(var i = 0; i < 3; i++){
    document.getElementById("values").appendChild(create_row_input(3));
    document.getElementById("solutions").appendChild(create_row_answer(i+1));
}

let system_size = document.getElementById("system_size");

system_size.addEventListener("change", redraw_rows);

document.getElementById("solve_btn").onclick = solve_system;