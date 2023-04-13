// 시작을 눌렀을 때 메인화면 제거 이벤트
const $start = document.getElementById('start');
const $startBtn = document.getElementById('start-btn');
const $gameOn = document.getElementById('gameOn');

$gameOn.style.display = 'none';

$startBtn.addEventListener('click', e => {
    $start.classList.toggle('hide');
    $start.style.transition = '1s';
    $gameOn.style.transition = '1s';
    $gameOn.style.display = 'flex';
})


// 포카드
const gameData = {
    card: Math.floor(Math.random() * 40) + 1,
    dealCard: 0, // 딜러 카드의 총합
    myCard: 0, // 내 카드의 총합
    myMoney: 500, // 내 현재 금액
    myBetting: 0, // 내 배팅 합계
    myScore: 0 // 나의 점수
}


const $playerUl = document.getElementById('player-card');
const $dealerUl = document.getElementById('dealer-card');
let standFlag = false;
// 카드 뽑기 함수 (40개 중 랜덤) 
let cardNum = 0;
let poCard = 0; // 카드 모양 나타내기 위해 만든 변수
function randomCard() {
    let rCard = [];
    let random = Math.floor(Math.random() * 40) + 1;
    while (rCard.includes(random)) {
        random = Math.floor(Math.random() * 40) + 1;
        if (random == 0) continue;
    }
    rCard.push(random);
    cardNum = random;

    if (random >= 1 && random <= 10) {
        poCard = '♠' + random;
    } else if (random >= 11 && random <= 20) {
        poCard = '♣' + (random - 10);
        cardNum -= 10;
    } else if (random >= 21 && random <= 30) {
        poCard = '♥' + (random - 20);
        cardNum -= 20;
    } else if (random >= 31 && random <= 40) {
        poCard = '⧫' + (random - 30);
        cardNum -= 30;
    };

    const $randomCardImg = document.createElement('li');
    $randomCardImg.style.backgroundImage = 'url(./img/1-40card/'+random+'.png)'
    if(!standFlag){
        $playerUl.appendChild($randomCardImg);
    } else{
        $dealerUl.appendChild($randomCardImg);
    }
    
    return cardNum;
}



let $betting = document.querySelector('#betting')
let $betMoney = document.getElementById('betting-text-money');
let $poMoney = document.getElementById('pocket-text-money');

// 배팅 실시간 설정
$betting.addEventListener('click', e => {
    if (!e.target.matches('input')) return;
    if (e.target.value > gameData.myMoney) return;

    gameData.myBetting += (+e.target.value);
    gameData.myMoney -= (+e.target.value);
    console.log('배팅금액: '+gameData.myBetting); //확인용
    console.log('내 돈: '+gameData.myMoney); //확인용

    $betMoney.textContent = gameData.myBetting;
    $poMoney.textContent = gameData.myMoney;
})


let $shuffleBtn = document.getElementById('shuffleBtn');
const $shuffleText = document.getElementById('shuff-text');
const $shuffle = document.querySelector('.blackJack');
let $myPoint = document.querySelector('#myCard-sum > h3');
let $youPoint = document.querySelector('#youCard-sum > h3');
const $hitStand = document.querySelector('#card-sum')

let flag = false;
// 셔플 진행!!
$shuffleBtn.addEventListener('click', e => {
    console.log('셔플진행버튼');
    if (gameData.myBetting === 0) {
        $shuffleText.classList.add('shake'); //배팅금액을 확인해주세요 반복
        if($shuffleText.classList.contains('shake')) {
            $shuffleText.classList.remove('shake');
            $shuffleText.offsetWidth;
            $shuffleText.classList.add('shake');
        }
        return;
    } else if (flag) {
        return;
    }

    $betting.classList.add('hide')
    gameData.myCard += (+randomCard());
    gameData.myCard += (+randomCard());
    $myPoint.textContent = gameData.myCard;
    
    standFlag = true;
    gameData.dealCard += (+randomCard());
    $youPoint.textContent = gameData.dealCard;
    standFlag = false;

    $shuffle.style.display = 'none';
    $shuffleText.classList.remove('shake');
    $hitStand.classList.add('on');
    flag = true;

})



const $hitBtn = document.getElementById('hitBtn');
const $standBtn = document.getElementById('standBtn');

// hit를 눌러서 게임 진행하는 함수
$hitBtn.addEventListener('click', e => {
    if (gameData.myCard === 0) {
        alert('셔플부터 진행해주세요.')
        return;
    } else if (gameData.myCard > 21) {
        return;
    }

    let hitCard = randomCard();
    gameData.myCard += (+hitCard); //내 카드의 총합 더하기
    $myPoint.textContent = gameData.myCard;

    if (gameData.myCard > 21) {
        setTimeout(e=>{
            alert('딜러 승리!')
            loseCheck();
            roundReset()
            return;
        }, 900)
    }
})


// stand를 눌러서 딜러의 차례가 시작되는 함수
const $endgame = document.querySelector('#end')

$standBtn.addEventListener('click', e => {
    if (gameData.myCard === 0) { //카드를 안뽑고 멈추면 안됨.
        return;
    } else if(gameData.myCard > 21) return;
    
    standFlag = true;
    let func = setInterval(() => {

        let standCard = randomCard();
        gameData.dealCard += (+standCard);
        console.log(standCard);

        $youPoint.textContent = gameData.dealCard
        if (gameData.dealCard >= 17) {
            setTimeout(e=>{
                if (gameData.dealCard > 21 || gameData.dealCard < gameData.myCard) {
                    alert('플레이어 승리!')
                    $poMoney.textContent = gameData.myMoney + gameData.myBetting * 2;
                    gameData.myMoney += gameData.myBetting * 2;
    
                } else if (gameData.dealCard > gameData.myCard) {
                    alert('딜러 승리!')
    
                } else if (gameData.dealCard === gameData.myCard) {
                    alert('비겼음')
                    gameData.myMoney += gameData.myBetting;
                    $poMoney.textContent = gameData.myMoney;
                }
                clearInterval(func);
                roundReset();
                loseCheck();
                return;
            }, 900)
        }
    }, 1000);

})

const $reStart = document.getElementById('end-btn');


//지는 조건을 체크
function loseCheck(){
    if (gameData.myMoney <= 0) {
        $gameOn.style.transition = '1.5s'
        $gameOn.style.opacity = '0.2';
        $gameOn.style.backgroundColor = '#000000';
        $endgame.classList.toggle('hide');
    }
}

//라운드 종료시 초기화하는 함수
function roundReset() { 
    $hitStand.classList.remove('on');
    $betMoney.textContent = 0;
    gameData.myBetting = 0;
    gameData.dealCard = 0;
    gameData.myCard = 0;
    $myPoint.textContent = 0;
    $youPoint.textContent = 0;
    setTimeout(e=>{
        $betting.style.display = 'block';
        $shuffle.style.display = 'block';
    }, 400)
    $hitStand.classList.toggle = ('on');
    flag = false;
    standFlag = false;

    while($playerUl.firstChild){
        $playerUl.removeChild($playerUl.firstChild);
    }
    while($dealerUl.firstChild){
        // $dealerUl.firstChild.style.animation = 'dealer-card-down 0.5s cubic-bezier(0.33, 1, 0.68, 1) 0.2s both';
        $dealerUl.removeChild($dealerUl.firstChild);
    }

    $betting.classList.remove('hide');
    

}


$reStart.addEventListener('click', e => {
    location.reload();
})