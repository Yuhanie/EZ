<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>使用者註冊</title>
    <link rel="stylesheet" href="register.css">
</head>

<body>

    <!-- 輸入頁面 -->
    <div class="userLogin">
        <form method="post" action="login.php">
            使用者名稱：
            <input type="text" name="username" placeholder="(日後可更改)"><br><br>
            常用信箱：
            <input type="text" name="account" placeholder="請輸入信箱"><br><br>
            密碼：
            <input type="password" name="password" placeholder="請輸入密碼"><br><br>
            確認密碼：
            <input type="password" name="password_check" placeholder="再次輸入密碼"><br><br>
            <input type="submit" name="register_btn" value="註冊"> <br>
            已經有帳號了嗎？
            <a href="login.php">點此登入</a>
        </form>
    </div>
</body>

</html>