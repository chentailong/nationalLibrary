window.onload = function load() {
    let user = getCookie('uname');
    if (user !== null) {
        document.getElementById('login_reg').style.display = "none"
        document.getElementById('personal').style.display = 'block'
        document.getElementById('cUser').innerText = user
        document.getElementById('personal').href = '../personal.html'

    } else {
        document.getElementById('login_reg').style.display = "block"
        document.getElementById('personal').style.display = 'none'
    }
}

function getCookie(name)//取cookies函数
{
    let arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return (arr[2]);
    return null;
}