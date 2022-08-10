<div>
    <center>
        <form method="post" enctype="multipart/form-data" action="index.php">
            <div><textarea placeholder="請輸入文章標題..." name="title"></textarea></div>
            <br>
            <input type="submit" value="確認" name="submit" onclick = "print(<?php echo $title; ?>)">
            <!-- <input type="button", value="click" onclick = "print(<?php //echo $title; ?>)"> -->
	<!-- <script>//script可以寫在同一頁的任何地方。
        function print(title){//在javacript的函式寫說要接一個變數，然後以彈跳式式窗alert顯示。
            alert(title);//以彈跳式式窗alert顯示。
        }
	</script> -->
            <!-- <input type="button", value="確認"> -->
        </form>
    </center>
    </div>
</body>