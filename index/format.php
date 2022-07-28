<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <title>筆記分享區</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    
    <link rel="stylesheet" href="index.css">
</head>
<body>


<!--bar-->
<nav class="navbar navbar-expand-lg navbar-light">
        <div class ="container-fluid">
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
                        <input style="position:absolute; bottom:15px; left:300px; width: 700px; height:40px; border:2px solid #FFE66F;" list="theme" id="choice" name="choice" placeholder="搜尋標籤..."/>
                        <datalist id="theme">
                            <option value="Python">
                            <option value="Php">
                            <option value="Java">
                                            
                        </datalist>
                        <button class="btn my-5 my-sm-0" type="submit" style="background:none; margin-left:-3rem; color:cornflowerblue" >
                        <i class="zi zi_search" ></i></button>
                        </div>
                        
                        
                    </form>
                    
                    
                    
                </ul>

                <!-- 列在右邊 -->
                <ul class="navbar-nav nav-right" >
                <li class="nav-item">
                    <a class="nav-link" style="position:absolute; bottom:5px; left:1100px;" href="#">問答區</a>
                </li>

                <li class="nav-item">
                    <a class="nav-link" style="position:absolute;  bottom:5px; left:1210px;" href="#">我的角色</a>
                </li>

                <li class="nav-item">
                    <button class="btn btn-success" style="position:absolute;  bottom:10px; left:1350px;" type="submit" href="#">+</button>
                </li>
                </ul>
            </div>


        </div>
    </nav><br><br>














<div class="card1">
    <h1 class="post-header" style="left:40px;">爬蟲實作教學</h1> 
    <div class="post-body"> 
        <text>Python網路爬蟲就是利用撰寫Python程式碼去對網路資訊進行擷取，例如蒐集匯率的歷史走勢、熱門議題的輿情...等等</text>
    </div>
    <div class="user-info-box">
        <img class="user-pic user-info-pic-posi" src="pic/test1.jpeg">
        <div class="user-name user-info-name-posi">
            <text >victoria</text>
        </div>
        <div>
            <span class="heart" id="heart"></span>
        </div>   
        <div>
            <span class="five-star" id="five-star"></span>
        </div>
    </div>
</div><br><br><br><br>



<div class="card1">
    <h1 class="post-header" style="left:40px;">title</h1>  
        <div class="post-pic post-pic-posi">
            <img src="pic/example1.jpeg" width=420px>
        </div>
        <div class="user-info-box">
            <img class="user-pic user-info-pic-posi" src="pic/test1.jpeg">
            <div class="user-name user-info-name-posi">
                <text >user_name</text>
            </div>
            <div>
                <span class="heart" id="heart"></span>
            </div>   
            <div>
                <span class="five-star" id="five-star"></span>
            </div>
        </div>
</div><br><br><br><br>




<div class="card1">
    <h1 class="post-header" style="left:40px;">title</h1> 
    <div class="post-body"> 
        <text>content</text>
    </div>
    <div class="user-info-box">
        <img class="user-pic user-info-pic-posi" src="pic/test1.jpeg">
        <div class="user-name user-info-name-posi">
            <text >user_name</text>
        </div>
        <div>
            <span class="heart" id="heart"></span>
        </div>   
        <div>
            <span class="five-star" id="five-star"></span>
        </div>
    </div>
</div>




<div class="card2">
    <h1 class="post-header" style="left:40px;">java物件導向筆記</h1>
    <div class="post-body">  
        <text>一般來說，討及「物件導向」（object-oriented）總是會提供及：物件、抽象、封裝、繼承、多型等 關於封裝 在解釋封裝概念之前，我們先得來解釋什麼是「物件」（object）。在物件導向的觀念中，將世界萬物皆視為物件，物件是一個具體事物的描述，例如一隻鳥、一條魚、一個人、一輛車、一棟房子等等，這些具體事物以物件導向的觀點來說...</text>
    </div>
    <div class="user-info-box">
        <img class="user-pic user-info-pic-posi" src="pic/test1.jpeg">
        <text class="user-name user-info-name-posi">EvonnePeng</text>
        <div>
            <span class="heart" id="heart"></span>
        </div>   
        <div>
            <span class="five-star" id="five-star"></span>
        </div>
    </div>
</div><br><br><br><br>



<div class="card2">
    <h1 class="post-header" style="left:40px;">title</h1> 
    <div class="post-body"> 
        <text>content</text>
    </div>
    <div class="user-info-box">
        <img class="user-pic user-info-pic-posi" src="pic/test1.jpeg">
        <div class="user-name user-info-name-posi">
            <text >user_name</text>  
        </div>
        <div>
            <span class="heart" id="heart"></span>
        </div>   
        <div>
            <span class="five-star" id="five-star"></span>
        </div>
    </div>
</div><br><br><br><br>



<div class="card2">
    <h1 class="post-header" style="left:40px;">title</h1> 
    <div class="post-body"> 
        <text>content</text>
    </div>
    <div class="user-info-box">
        <img class="user-pic user-info-pic-posi" src="pic/test1.jpeg">
        <div class="user-name user-info-name-posi">
            <text >user_name</text>
        </div>
        <div>
            <span class="heart" id="heart"></span>
        </div>   
        <div>
            <span class="five-star" id="five-star"></span>
        </div>
    </div>
</div>


</body>
</html>
	
