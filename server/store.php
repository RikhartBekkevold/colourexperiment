<?php

    //when the file is called, make sure var is set. which it will always be though
    if(isset($_POST['participant'])) {



        $data = $_POST['participant'];
        // $data = json_decode($data);
        $file = 'data/data.json';

        // and the LOCK_EX flag to prevent anyone else writing to the file at the same time
        file_put_contents($file, $data . ",\n", FILE_APPEND | LOCK_EX);

        //push into array



        // {$file}

        //add {and add all content to this, in the file}
        // convert string to json first with a fucntion

        // add id her before saving instead

        // $people = file_get_contents($file);
        // json_decode($people); //becuse its a string, and we expect the correct format
        // echo current($people) . "<br>";
        // echo end($people);

    }

    // $data[] = $_POST['data'];
    //
    // $inp = file_get_contents('results.json');
    // $tempArray = json_decode($inp);
    // array_push($tempArray, $data);
    // $jsonData = json_encode($tempArray);
    // file_put_contents('results.json', $jsonData);

?>
