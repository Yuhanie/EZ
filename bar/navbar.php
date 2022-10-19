<!DOCTYPE html>  
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>navbar</title>

  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

  <!--連結css -->
  <link rel="stylesheet" href="navbar.css">

</head>
<body>
    
    <nav class="navbar navbar-expand-lg navbar-light">
        <div class ="container-fluid">
            <!--logo -->
            <a class="navbar-brand" href="#"><img width="175px" height="60px" src="images/ezlogo.png"></a>
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
                        <input style="width: 900px; height:35px" list="theme" id="choice" name="choice" placeholder="Search..."/>
                        <datalist id="theme">
                            <option value="Python">
                            <option value="Php">
                            <option value="Java">
                                            
                        </datalist>
                        <button class="btn my-5 my-sm-0" type="submit" style="background:none; margin-left:-3rem; color:cornflowerblue" ><i class="zi zi_search" ></i></button>
                        </div>
                        
                        
                    </form>
                    
                    
                    
                </ul>

                <!-- 列在右邊 -->
                <ul class="navbar-nav nav-right">
                <li class="nav-item">
                    <a class="nav-link" href="#">問答區</a>
                </li>

                <li class="nav-item">
                    <a class="nav-link" href="#">我的角色</a>
                </li>

                <li class="nav-item">
                    <button class="btn btn-success" type="submit" href="#">+</button>
                </li>
                </ul>
            </div>


        </div>
    </nav>

</body>
</html>