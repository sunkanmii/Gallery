<?php
    $servername = 'remotemysql.com';
    $username = 'fH63Tna4XP';
    $password = 'QMSIi0oiTQ';

    $conn = mysqli_connect($servername, $username, $password);

    if (!$conn){
        die("Connection failed: " . mysqli_connect_error());
    }
?>