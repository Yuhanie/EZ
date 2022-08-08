<?php
# 檢查檔案是否上傳成功
if ($_FILES['my_file']['error'] === UPLOAD_ERR_OK){
  echo '檔案名稱: ' . $_FILES['my_file']['name'] . '<br/>';
  echo '檔案類型: ' . $_FILES['my_file']['type'] . '<br/>';
  echo '檔案大小: ' . ($_FILES['my_file']['size'] / 1024) . ' KB<br/>';
  echo '暫存名稱: ' . $_FILES['my_file']['tmp_name'] . '<br/>';

  # 檢查檔案是否已經存在
  if (file_exists('試上傳的檔案資料夾/' . $_FILES['my_file']['name'])){
    echo '檔案已存在。<br/>';
  } 
  else {
    $file = $_FILES['my_file']['tmp_name'];
    $dest = '試上傳的檔案資料夾/' . $_FILES['my_file']['name'];

    # 將檔案移至指定位置
    move_uploaded_file($file, $dest);
    header('location:upload file.php?method=message&message=上傳成功');
  }
} else {
  echo '錯誤代碼：' . $_FILES['my_file']['error'] . '<br/>';
}
?>