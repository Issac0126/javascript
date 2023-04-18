// 새로운 일정 추가하기
const $todoInput = document.getElementById('todo-input');
const $plusbtn = document.querySelector('.plusbtn');
const $list = document.querySelector('#list');
const $todoList = document.querySelector('.todo-list');
let $value = document.querySelector('.real .todo').getAttribute('textContent');

//+버튼 눌렸을 때
$plusbtn.onclick = function (e) {
    //입력값이 없는 경우
    if ($todoInput.value == '') {
        $todoInput.setAttribute('placeholder', '필수 입력사항입니다!');
        $todoInput.classList.toggle('orange');
        return;
    }

    //입력값 있는 경우
    if ($todoInput.value !== '' && $todoInput.classList.contains('orange')) {
        $todoInput.classList.toggle('orange');
        $todoInput.setAttribute('placeholder', '할 일을 입력하세요.');
    }
    $value = $todoInput.value;
    let $realtodo = document.querySelector('.real .todo');
    $realtodo.textContent = $value;
    const $deepClone = $todoList.cloneNode(true)
    $deepClone.classList.add('show');
    $list.appendChild($deepClone);
    $todoInput.value = '';
}

//할 일 입력하고 엔터 치면 직접 클릭한 것 같은 효과를 줌
$todoInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        $plusbtn.click();
        $todoInput.focus(); //커서가 계속 input에 머무르도록 포커싱.
    }
});


//일정 수정하기
const $modibtn = document.querySelectorAll('.modi');

[...$modibtn].forEach($btn => {
    $btn.addEventListener('click', function (e) {
        $btn.classList.toggle('lnr-undo');
        $btn.classList.toggle('lnr-checkmark-circle');
        if ($btn.classList.contains('lnr-checkmark-circle')) {
            const $modiInput = document.createElement('input');
            $modiInput.value = e.target.parentNode.previousElementSibling.textContent;
            e.target.parentNode.previousElementSibling.remove();
            e.target.parentNode.parentNode.insertBefore($modiInput, e.target.parentNode);
        }
        //일정 수정 완료하기
        else if ($btn.classList.contains('lnr-undo')) {
            const $modiDone = document.createElement('span');
            $modiDone.classList.add('todo');
            $modiDone.textContent = e.target.parentNode.previousElementSibling.value;
            e.target.parentNode.previousElementSibling.remove();
            e.target.parentNode.parentNode.insertBefore($modiDone, e.target.parentNode);
        }
    });
});



//일정 삭제하기
const $delbtn = document.querySelectorAll('.del');
[...$delbtn].forEach($btn => {
    $btn.onclick = function (e) {
        e.target.parentNode.parentNode.classList.toggle('delMoving');
        const func = setTimeout(() => {
            e.target.parentNode.parentNode.remove();
        }, 500);

        
    }
});


//일정 완료하기
const $checkbox = document.querySelectorAll('.check');
[...$checkbox].forEach($box => {
    $box.addEventListener('change', (e) => {
        if ($box.checked) {
            $box.nextElementSibling.style.textDecoration = 'line-through';
            $box.nextElementSibling.style.opacity = 0.3;
        } else {
            $box.nextElementSibling.style.textDecoration = 'none';
            $box.nextElementSibling.style.opacity = 1;
        }
    })

});