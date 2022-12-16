//VARIÁVEIS GLOBAIS

var taskId = 0;         
var taskName;       
var taskResponsible;
var taskDescription;
var taskDate;        
var taskPriority;   
var taskStatus;     


function logar() {
    const usuario = 'Cafu';
    const senha = 'escova';
    
    var name = document.getElementById('name').value;
    var pass = document.getElementById('password').value;

    if (usuario === name && senha === pass) {
        var nameUser = document.getElementById('nameUser');
        nameUser.textContent = name;

        document.getElementById('name').classList.add('d-none');
        document.getElementById('password').classList.add('d-none');
        document.getElementById('btnLogin').classList.add('d-none');
        document.getElementById('nameUser').classList.remove('d-none');
        document.getElementById('btnLogout').classList.remove('d-none');

        document.getElementById('name').value = "";
        document.getElementById('password').value = "";

        document.getElementById('new_task').classList.remove('d-none');
    } else {
        document.getElementById('name').style.border = "solid 2px red";
        document.getElementById('password').style.border = "solid 2px red";
        alert('Usuário ou senha inválido.');
    }
}

jQuery(document.body).on('keypress', function(event){
    if(event.keyCode === 13) {
        event.preventDefault();
        $('#btnLogin').trigger("click");
    }
});

function deslogar(){
    document.getElementById('nameUser').classList.add('d-none');
    document.getElementById('btnLogout').classList.add('d-none');
    document.getElementById('name').classList.remove('d-none');
    document.getElementById('password').classList.remove('d-none');
    document.getElementById('btnLogin').classList.remove('d-none');
    document.getElementById('new_task').classList.add('d-none');
}

function saveTask() {
    taskId          = $('#task_id').val();
    taskName        = $('#task_name').val();
    taskResponsible = $('#task_responsible').val();
    taskDescription = $('#task_description').val();
    taskDate        = $('#task_date').val();
    taskPriority    = $('#task_priority').val();
    taskStatus      = $('#task_status').val();

    var statusId = taskStatus;
    var validate = this.formValidate(taskName, taskDate, taskPriority, taskStatus);
    this.formatInputs(taskDate, taskPriority, taskStatus);

    var taskCard = 
    " <div class='card mb-4 text-left p-3 border-0' id=''> " +
    "   <div class='pb-3'> " +
    "       <a href='#' class='text-decoration-none' id='name'> " +
                taskName + 
    "       </a>" +
    "   </div>" +
    
    "   <div class='pb-3 d-none'> " +
    "       <a href='#' class='' id='description'> " +
                taskDescription + 
    "       </a>" +
    "   </div>" +
     
    " <div class='pb-2'> " +
    "       <i class='fa fa-calendar pe-2' id='date'></i> " +
                taskDate + 
    "   </div>" +
    " <div class='pb-3'> " +
    "       <i  class='fa fa-user pe-2' id='responsible'></i> " +
                taskResponsible + 
    "   </div>" +
    " <div id='priority'> " +
                taskPriority + 
    "   </div>" +
    " <div id='status' class='d-none'> " +
                taskStatus + 
    "   </div>" +
    " </div>";


    if (validate) {
        this.setTaskCard(statusId, taskCard);
    } 
}

function setTaskCard(statusId, taskCard) {
    var card;

    switch(statusId) {
        case '1':
            card = $('#do_card_content').append(taskCard);
            break;
        case '2':
            card = $('#doing_card_content').append(taskCard);
            break;
        case '3': 
            card = $('#done_card_content').append(taskCard);
            break;
        default:
            alert('ERRO');
            break;
    }

    return card;
}


function formValidate(taskName, taskDate, taskPriority, taskStatus){
    var result = true;

    if (taskName === '') {
        alert('Digite um nome para a tarefa');
        result = false;
    }

    if (taskDate === '') {
        alert('Digite uma data para a tarefa');
        result = false;
    }

    if (taskPriority === '') {
        alert('Informe uma prioridade');
        result = false;
    }

    if (taskStatus === '') {
        alert('informe um status');
        result = false;
    }

    return result;
}


function formatInputs(taskDate, taskPriority, taskStatus) {
    this.taskDate = taskDate.split('-').reverse().join('/');
    this.taskPriority = this.getPriorityName(taskPriority);
    this.taskStatus = this.getStatusName(taskStatus);
}

//função para pegar texto da prioridade
function getPriorityName(idPriority) {
    var priorityName;
    var classColor;

    switch(idPriority) {
        case '1':
            priorityName = 'Baixa';
            classColor = 'lowPriority';
            break;
        case '2':
            priorityName = 'Média';
            classColor = 'mediumPriority';
            break;
        case '3':
            priorityName = 'Alta';
            classColor = 'highPriority';
            break;
        default:
            priorityName = 'Não definida';
            break;
    }

    return "<span class='badge " + classColor + " '> " + priorityName +" </span>";
}

function getStatusName(taskStatus) {
    switch(taskStatus) {
        case '1':
            return 'Fazer';
        case '2':
            return 'Fazendo';
        case '3':
            return 'Finalizada';
        default:
            return 'Não definida';
    }
}