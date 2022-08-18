
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>登入</title>
    <link rel="stylesheet" href="login.css">
</head>

<body>
    <!-- 介紹頁面 -->
    <div class="introduce">
        <img src="pic/welcome.png" width="300px" />
        <input type="submit" name="lookArticle" value="先看看其他文章">
    </div>
    <!-- 輸入登入資料 -->
    <div class="enter">
        <form method="post" action="login.php">
            常用信箱：
            <input type="text" name="username" placeholder="請輸入信箱"><br><br>
            密碼：
            <input type="password" name="password" placeholder="請輸入密碼"><br><br>
            <input type="submit" value="登入" name="submit"><br><br>
            <a href="">忘記密碼</a><br><br>
            沒有帳號？現在就加入我們吧！
            <a href="register.php">點此註冊</a>
        </form>

    </div>
</body>

</html>