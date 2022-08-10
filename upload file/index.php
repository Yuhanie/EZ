<?php
if(isset($_POST['submit']))
{
    $title = $_POST["title"]; 
?>
<!-- <script>//script可以寫在同一頁的任何地方。
    function print(title){//在javacript的函式寫說要接一個變數，然後以彈跳式式窗alert顯示。
        alert(title);//以彈跳式式窗alert顯示。
    }
</script> -->
<?php } ?>

<!-- <body onload="getdb()"> -->
<body>
    <!-- <script src="https://www.gstatic.com/firebasejs/7.0.0/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/7.0.0/firebase-firestore.js"></script>
    <script type="text/javascript" src="upload.js"></script> -->

    <div>
    <center>
        <!-- <form method="post" enctype="multipart/form-data" action="index2.php?title=<?php //echo $title?>"> -->
        <form method="post">
            <div><textarea id="demo" placeholder="請輸入文章標題..." name="title"></textarea></div>
            <br>
            <input type="submit" value="確認" name="submit" onclick="print(<?php echo $title; ?>)">
            <!-- <input type="button", value="click" onclick = "print(<?php //echo $title; ?>)"> -->
	<!-- <script>//script可以寫在同一頁的任何地方。
        function print(title){//在javacript的函式寫說要接一個變數，然後以彈跳式式窗alert顯示。
            alert(title);//以彈跳式式窗alert顯示。
        }
	</script> -->
            <!-- <input type="button", value="確認"> -->
            
<script>//script可以寫在同一頁的任何地方。
    function print(title){//在javacript的函式寫說要接一個變數，然後以彈跳式式窗alert顯示。
        title = document.getElementById("demo").value
        console.log(title)
        alert(title);//以彈跳式式窗alert顯示。
    }
</script>
        </form>
    </center>
    </div>
</body>

<!-- <script>//script可以寫在同一頁的任何地方。
    function print(title){//在javacript的函式寫說要接一個變數，然後以彈跳式式窗alert顯示。
        alert(title);//以彈跳式式窗alert顯示。
    }
</script> -->