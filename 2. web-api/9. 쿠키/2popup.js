
function createCookie(name) {
    const date = new Date();
    date.setDate(date.getDate+1); //수명을 하루로 설정
    
    let cookie = '';
    cookie += `${name} = true;`; //문자열에 세미콜론은 필수!!! 
    cookie += 'expires=' + date.toUTCString();
    document.cookie = cookie;
}

function getCookie(name){
    const cookies = document.cookie.split(';');
    for(let c of cookies){
        if(c.search(name) !== -1){
            return true;
        }
    }
    return false;  //어차피 null이 리턴되기 때문에 굳이 쓸 필요 X.
}



// function createCookie(name) {
//     const date = new Date();
//     date.setDate(date.getDate + 1); //수명을 하루로.
//     let cookie = '';
//     cookie += `${name}=true;`; //세미콜론을 반드시 찍으세요.
//     cookie += 'expires=' + date.toUTCString();
//     document.cookie = cookie;
// }

// function getCookie(name) {
//     const cookies = document.cookie.split(';');

//     for(let c of cookies) {
//         if(c.search(name) !== -1) {
//             return true;
//         }
//     }
//     // return false;
// }