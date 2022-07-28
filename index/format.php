<style>
    .five-star{
        position: absolute;
        top: 20px;
        right: 50px;
        transform: translate(-5%, -50%);
        left:460px;
        display: block;
        border-left: 3.04px solid transparent;
        border-right: 3.24px solid transparent;
        border-bottom: 10px solid;
        color: #8a93a0;
        cursor: pointer;
        transform:scale(1.5);
    }
    .five-star:before{
        content: "";
        position: absolute;
        top: 8.65px;
        left: -8.82px;
        width: 0;
        height: 0;
        color:  #8a93a0;
        display: block;
        border-left: 12.5px solid transparent;
        border-right: 12.5px solid transparent;
        border-bottom: 9.08px solid ;
        transform-origin: top center;
        transform: rotate(36deg);
    }
    .five-star:after{
        content: "";
        position: absolute;
        top: 8.65px;
        left: -15px;
        width: 0;
        height: 0;
        color:  #8a93a0;
        display: block;
        border-left: 12.5px solid transparent;
        border-right: 12.5px solid transparent;
        border-bottom: 9.08px solid;
        transform-origin: top center;
        transform: rotate(-36deg);
    }

    .heart{
        position:absolute;
        top:30px;
        left:400px;
        background-color: #8a93a0;
        height: 20px;
        width: 20px;
        cursor: pointer;
        transform: rotate(-45deg) scale(1);
    }
    .heart::before {
        content: '';
        position: absolute;
        top: -50%;
        left: 0;
        background-color: inherit;
        border-radius: 50%;
        height: 20px;
        width: 20px;
    }
    .heart::after {
        content: '';
        position: absolute;
        top: 0;
        right: -50%;
        background-color: inherit;
        border-radius: 50%;
        height: 20px;
        width: 20px;
    }

    .card1{
        position:relative;
        display:flex;
        background: #ffff;
        width: 500px;
        height: 330px;
        left:130px;
    }
    .card2{
        position:relative;
        display:flex;
        background: #ffff;
        width: 500px;
        height:330px;
        bottom:1170px;
        left:770px;
    }
    
    .post-header{
        position:relative;  
        text-align:center;
        height: 40px;
		border-radius: 10px;
    }

    .post-body{
        position:absolute;
        top:100px;
        left:40px;
        width:430px;
    }
    .post-pic{
        height:160px;
        width:420px;
        overflow:hidden;
        
    }
    .post-pic-posi{
        position:absolute;
        top:100px;
        left:40px;
    }

    .user-info-box{
        position:absolute;
        display:flex;
        width:500px;
        height:70px;
        bottom:0px;
        background:black;
    }

    .user-name{
        color:#ffff;
    }
    .user-pic{
        width:60px;
        height:60px;
        object-fit:cover;
        border-radius:50px;
    }

    .user-info-name-posi{
        position:absolute;
        top:25px;
        left:125px;
    }
    .user-info-pic-posi{
        bottom:5px;
        right:410px;
        position:absolute;
    }
    
    .backdrop-blur{
        backdrop-filter:blur(5px);
    }


</style>

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
<body bgcolor=F0F0F0>



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
	
