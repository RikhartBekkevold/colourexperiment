<?php
    if(isset($_POST['participant'])) {
        $data = $_POST['participant'];
        $file = 'data/data.json';
        file_put_contents($file, $data . ",\n", FILE_APPEND | LOCK_EX);
    }
?>
