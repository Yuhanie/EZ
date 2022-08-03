<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>新增文章</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    <script defer src="https://use.fontawesome.com/releases/v5.0.10/js/all.js" integrity="sha384-slN8GvtUJGnv6ca26v8EzVaR9DC58QEwsIk9q1QXdCU8Yu8ck/tL/5szYlBbqmS+" crossorigin="anonymous"></script>  
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="addArticle.css">

</head>

<body>
    <!--bar-->

    <nav class="navbar-expand-lg">
        <div class="container-fluid bar navbar">
            <!--logo -->
            <a class="navbar-brand" href="#"><img width="175px" height="60px" src="pic/ezlogo.png"></a>
            <!-- 手機版 -->
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#linkbar">
                <span class="navbar-toggler-icon"></span>
            </button>
            <!-- 電腦版 -->
            <div class="collapse navbar-collapse" id="linkbar">
                <!-- 列出內容 -->
                <ul class="navbar-nav me-auto">

                    <form class="form-inline" role="search" action="/Search/SearchList" method="get" target="_blank">
                        <div class="form-group">
                            <input class="navbar-beauty" list="theme" id="choice" name="choice" placeholder="搜尋標籤..." />
                            <datalist id="theme">
                                <option value="Python">
                                <option value="Php">
                                <option value="Java">

                            </datalist>
                        </div>


                    </form>
                    <li class="nav-item">
                        <button class="nav-link search-btn" type="submit"><i class="fas fa-search"></i></button>
                    </li>
                </ul>

                <!-- 列在右邊 -->
                <ul class="navbar-nav nav-right">
                    <li class="nav-item">
                        <a class="nav-link" style="position:absolute; bottom:5px; left:1100px; font-weight:bold; font-size:20px;" href="#">問答區</a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" style="position:absolute;  bottom:5px; left:1210px; font-weight:bold; font-size:20px;" href="#">我的角色</a>
                    </li>

                    <li class="nav-item">
                        <button class="btn add-post-btn" type="submit" href="#">+</button>
                    </li>
                </ul>
            </div>

        </div>
    </nav><br><br><br>

    <!-- 新增文章 -->
    <div class="addArticle_container">
        <div class="addArticle_bar">
            <div class="user_box">
                <div><img class="user_image" src="pic/test1.jpeg"></div>
                <div class="user_name"></div>
                <!-- 這邊還沒接質 -->
            </div>
            
        </div>
        <!-- 文章內容 -->
        <div>
            <div><textarea class="addArticle_contectTitle" placeholder="請輸入文章標題..." name="title"></textarea></div>
            <div>
                <div contenteditable="true" class="addArticle_content" placeholder="請輸入文章內容..." name="content" >
                    <br><br><br><br><br><br><br><br><br><br><br>
                </div>
                <br><br>
                <div style="text-align:left"><input  type="text" placeholder="筆記標籤">
            </div>
        </div>
        <br><br><br><br><br>
        
        
            <div class="addArticle_function">
                <!-- 上傳檔案 -->
                <div class="upload_file">
                    <Button variant="contained" component="label">
                        上傳檔案
                        <input hidden accept="image/*" multiple type="file" />
                    </Button>
                </div>
                <div class="addArticle_function_btn">
                    <button class="btn" type="submit">發布</button>
                    <button class="btn" type="submit">取消</button>
                </div>
            </div>
        </div>
    </div>
</body>

</html>