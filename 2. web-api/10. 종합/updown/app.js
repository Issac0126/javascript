
//게임에 필요한 데이터 객체
const gameData = {
    secret : Math.floor((Math.random()*100)+1),
    answer : null, //사용자가 클릭한 숫자
    min : 1,
    max : 100, //현재 상태. 달라질 예정.

};

//숫자 아이콘 생성 함수
function makeNumberIcons() {
    //id=numbers인 div 태그 안에다 숫자 아이콘을 배치해야 한다.
    //아이콘의 개수는 객체가 가지고 있는 min과 max에 따라 달라진다.
    //숫자 아이콘은 div태그이고, 클래스 이름은 icon으로 매긴다.
    const $numbers = document.getElementById('numbers');
    const $frag = document.createDocumentFragment();

    console.log('min&max: '+gameData.min + ' ' +gameData.max)
    for(let i = gameData.min; i<=gameData.max; i++){
        const $icon = document.createElement('div');
        $icon.classList.add('icon');
        $icon.textContent = i;
        $frag.appendChild($icon);
    }
    // console.log($frag)
    $numbers.appendChild($frag);
    return $numbers;
}


//up, down 애니메이션을 작동시킬 클래스 추가/제거 함수 정의
function executeUpDownAnimation(isUp){
    document.getElementById('up').classList.toggle('selected', isUp);
    document.getElementById('down').classList.toggle('selected', !isUp);
};




//정답을 판별해 주는 함수 정의
function cheakAnswer($numbers, $target){
    //객체에서 정답과 사용자의 선택값 가져오기
    const {secret, answer} = gameData; //객체 디스트럭쳐링으로 가져오기
    console.log(secret);

    //숫자 범위를 화면에 표시하기 위한 요소 취득
    const $begin = document.getElementById('begin');
    const $end = document.getElementById('end');

    //정답을 맞췄을 때는 정답처리를 하는 함수 processCorrect 호출
    //up 또는 down일 경우에는 min과 max값 변경.
    //begin과 end 값도 변경.
    //aside 태그의 애니메이션을 담당할 executeUpDownAnimation 호출
    if(secret === answer){ //정답일 경우
        processCorrect($target);
        return;
    } else if(secret < answer){ //down일 경우
        gameData.max = answer-1;
        $end.textContent = answer-1;
        executeUpDownAnimation(false); //다운이면 false 업이면 true
    } else{ //up일 경우
        gameData.min = answer+1;
        $begin.textContent = answer+1;
        executeUpDownAnimation(true); 
    };


    //판별 후에는 아이콘을 재배치.
    clearNumberIcons($numbers); //현재 렌더링 되어있는 아이콘들을 전체 삭제
    makeNumberIcons() //min, max가 변경되었기 때문에 그에 맞춰서 아이콘을 다시 배치
};


//아이콘 전체 삭제 함수
function clearNumberIcons($numbers){
    console.log('아이콘 전체 삭제합니다.');
    [...$numbers.children].forEach($icon => $numbers.removeChild($icon));
}



//정답을 맞췄을 시 처리를 수행할 함수 정의
function processCorrect($target) {
    //축하 메세지 박스를 나타나게 하는 코드.
    //축하 박스는 평소에는 숨겨져 있음. 이제 드러나도 된다는 신호.
    const $finish = document.getElementById('finish');
    $finish.classList.add('show');

    //정답 아이콘을 움직이게 하는 코드
    $target.setAttribute('id', 'move');

}


//핵심 실행 로직 즉시 실행 함수 (main 역할)
(function(){
    //생성된 아이콘들에게 이벤트를 걸어주기 위해
    //아이콘 생성 후 아이콘들의 부모 요소를 리턴받을 예정.
    const $numbers = makeNumberIcons();
    
    //숫자 아이콘을 클릭 (선택) 했을 때의 이벤트 
    //(부모 요소에 이벤트를 설정해서 전파)

    $numbers.addEventListener('click', function(e) {
        if(!e.target.matches('#numbers > .icon')){
            return;
        }
        console.log(e.target.textContent+'제대로 클릭됨!')
        gameData.answer = +e.target.textContent;
    
        //정답 체크 함수 호출!
        cheakAnswer($numbers, e.target);

    })


})();

