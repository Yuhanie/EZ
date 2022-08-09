<body onload="getdb()">
    <script src="https://www.gstatic.com/firebasejs/7.0.0/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/7.0.0/firebase-firestore.js"></script>
    <script type="text/javascript" src="upload.js"></script>

    <div>
    <center>
        <form method="post" enctype="multipart/form-data" action="upload.js">
            <input type="file" accept=".pdf,.jpg,.png" name="my_file">
            <input type="submit" value="上傳" class="px-4 py-2 text-sm font-medium">
        </form>
    </center>
    </div>
</body>