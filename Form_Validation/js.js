var form = document.querySelector('#form-1');
var username = document.querySelector('#fullname');
var email = document.querySelector('#Email');
var password = document.querySelector('#Password');
var passwordConfirm = document.querySelector('#Password-confirm');
var formControl = document.querySelectorAll(".form-control");

 Run();

//Kiểm tra toàn bộ form
function Run(){
    for (var i = 0; i < formControl.length; i++) {
        checkOnblur(formControl[i]);
        onInput(formControl[i]);
    }
    form.onsubmit = function(e){
        var result=true;
        e.preventDefault();
        for (var i = 0; i < formControl.length; i++) {
            checkInputs(formControl[i]);
            result= checkInputs(formControl[i])&&result;
        }
        if(result){
            console.log(getInfo(formControl[0],formControl[1], formControl[2]));
        }
    }
}

//Kiểm tra khi blur 
function checkOnblur(option) {
    option.onblur = function () {
        checkInputs(option);
    }
}

//Kiểm tra input
function checkInputs(option) {
    var result = false ;
    if (isBlank(option)) {
        setErrorFor(option, "This field can not be blank!");
        result = false ;
    }
    else if (option === email) {
        if (isEmail(option)) {
            setSuccessFor(option);
            result = true ;
        } else {
            setErrorFor(option, "Couldn't find your email!");
            result= false ;
        }
    }
    else if (option === password) {
        if (!setMinLength(option, 8)) {
            setErrorFor(option, "Use 8 characters or more for your password!");
            result= false ;
        }
        else {
            setSuccessFor(option);
            result = true ;
        }
    }
    else if (option === passwordConfirm) {
        if (!checkPasswordConfirm(option, password)) {
            setErrorFor(option, "Those passwords didn't match!");
            result= false ;
        }
        else {
            setSuccessFor(option);
            result = true ;
        }
    }
    else {
        setSuccessFor(option);
        result = true ;
    }
    return result;
}

//Kiểm tra trường có để trống 
function isBlank(option) {
    return (option.value.trim() === '');
}

//Kiểm tra có phải là email
function isEmail(option) {
    var check = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return check.test(option.value.trim());
}

//khi bắt đầu nhập thì bỏ lỗi
function onInput(option) {
    option.oninput = function () {
        var formGroup = option.parentElement;
        var formMessage = formGroup.querySelector(".form-message");
        formMessage.innerText = "";
        formGroup.classList.remove("error");
    }
}

function setMinLength(option, minLength) {
    return option.value.trim().length >= minLength;
}

function checkPasswordConfirm(option, option1) {
    return option.value.trim() === option1.value.trim();
}

//add class error khi co loi
function setErrorFor(input, message) {
    var formGroup = input.parentElement;
    var formMessage = formGroup.querySelector(".form-message");
    formMessage.innerText = message;
    formGroup.className = 'form-group error';
}

//add class success khi khong co loi
function setSuccessFor(input) {
    var formGroup = input.parentElement;
    var formMessage = formGroup.querySelector(".form-message");
    formMessage.innerText = '';
    formGroup.className = 'form-group success';
}

function getInfo(name, email, password){
    var info = {
        name : name.value,
        email : email.value,
        password : password.value
    };
    return info;
}