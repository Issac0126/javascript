// 불판에 고기 존재 여부
const grill = {
    '1': false,
    '2': false,
    '3': false,
    '4': false,
    '5': false,
    '6': false,
    '7': false,
    '8': false
}

// 고기 익혀졌는지 여부
const grilled = {
    '1': false,
    '2': false,
    '3': false,
    '4': false,
    '5': false,
    '6': false,
    '7': false,
    '8': false
}

// 고기가 탔는지 여부
const burned = {
    '1': false,
    '2': false,
    '3': false,
    '4': false,
    '5': false,
    '6': false,
    '7': false,
    '8': false
}

let score = 0;

const $btn = document.querySelector('.start-btn');
const $seconds = document.querySelector('.seconds');
let sec = 60;
$seconds.textContent = sec;
const $box = document.querySelectorAll('.box > img');
const $meatBox = document.querySelector('.area');

//고기생성함수
function randomMeat(e) {
    let meatNum = Math.floor(Math.random() * 8 + 1);
    if (!grill[meatNum] && !grilled[meatNum] && !burned[meatNum]) {
        grill[meatNum] = true;
        $box[meatNum-1].classList.toggle('show');
        meatRipened(meatNum);
    } else {
        meatNum = Math.floor(Math.random() * 8 + 1);
    }
}

//고기익기함수
function meatRipened(meatNum) {
    if(grill[meatNum] && !grilled[meatNum] && !burned[meatNum]) {
        let ripen = (Math.floor(Math.random() * 8 + 1)) * 1000;
        // console.log(ripen);
        setTimeout(() => {
            grilled[meatNum] = true;
            $box[meatNum-1].src = "./img/grilled.png";
            if(grill[meatNum] && grilled[meatNum] && !burned[meatNum]) {
                setTimeout(() => {
                    meatBurned(meatNum);
                }, 1000);
            }
        }, ripen);
    }
    else {
        // console.log('고기가 안 구워졌어.');
        return;
    }
};

//고기태우기함수
function meatBurned(meatNum) {
    if(grill[meatNum] && grilled[meatNum] && !burned[meatNum]) {
    let burnedTime = (Math.floor(Math.random() * 8 + 1)) * 500;
        // console.log("탔니..?"+burned);
        setTimeout(() => {
            burned[meatNum] = true;
            $box[meatNum-1].src = "./img/burned.png";
        }, burnedTime);
    }
    else {
        // console.log('고기가 안 구워졌어.');
        return;
    }
};


//불판에 이벤트리스너 추가
$meatBox.addEventListener('click', e => {
    // console.log('뭔가 클릭됨');
    //고기를 클릭했을 때만 동작하도록 조건문 설정
    if(e.target.matches('img')) {
        const $score = document.querySelector('.myScore .score');
        //고기가 익은 상태이면서 타지는 않았을 때 점수 +3
        if(grilled[e.target.parentNode.classList.item(0)] && !burned[e.target.parentNode.classList.item(0)]) {
            score += 3;
        }
        //고기가 타버렸을때 점수 -5
        else if(grilled[e.target.parentNode.classList.item(0)] && burned[e.target.parentNode.classList.item(0)]) {
            score -= 5;
        }
        //생고기일 때 점수 -1
        else if(!grilled[e.target.parentNode.classList.item(0)] && !burned[e.target.parentNode.classList.item(0)]){
            score -= 1;
        }
        //사용자에게 보여지는 화면에 점수 적용
        $score.textContent = score;
        //고기 상태 초기화
        grill[e.target.parentNode.classList.item(0)] = false;
        grilled[e.target.parentNode.classList.item(0)] = false;
        burned[e.target.parentNode.classList.item(0)] = false;
        //img 사진 초기화 및 숨김 처리
        $box[e.target.parentNode.classList.item(0)-1].src = './img/row.png';
        $box[e.target.parentNode.classList.item(0)-1].classList.toggle('show');
    } else {
        return;
    }
});

const $grade = document.querySelector('.grade');

$btn.onclick = function (e) {
    e.target.parentNode.classList.toggle('hide');
    setTimeout(() => {
        e.target.parentNode.style.display = 'none';
    }, 1001);


    //시작버튼 누르면 
    function TIMER() {

        //랜덤하게 고기 생성
        const func2 = setInterval(function () {
            randomMeat();
        }, Math.floor(Math.random() * 2 + 1) * 1000);

        //남은시간 60초에서 0초까지 줄어듦
        const func = setInterval(function () {
            if (sec > 0) {
                sec = sec - 1;
                $seconds.textContent = sec;
            }
            if (sec === 0) {
                $seconds.textContent = '0'
                end(e);
            }
        }, 1000);
        //게임종료함수
        function end(e) {
            clearInterval(func);
            clearInterval(func2);
            document.querySelector('.background').classList.toggle('hide');
            $grade.parentNode.classList.add('show');
            if(score <= 0) {
                $grade.textContent = (`${score}점\n와우 MZ시군요!`);
            } else if(score > 0 && score <=10) {
                $grade.textContent = (`${score}점\n허 ㅋ 접 ㅋ 이시군요!`);
            } else if(score > 10 && score <=20) {
                $grade.textContent = (`${score}점\n좀 굽네?시군요!`);
            } else if(score > 20) {
                $grade.textContent = (`${score}점\n올ㅋ 이시군요!`);
            }
        };
    }
    TIMER();
}




// const func = setInterval(function() {

// }
// }, 300);