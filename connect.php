<?php
$firstname = $_POST['firstname'];
$lastname = $_POST['lastname'];
$email = $_POST['email'];
$password = $_POST['password'];
$confirm_password = ['confirm_password'];

//Database connection
$conn = new mysqli('localhost', 'root', '','test');
if($conn->connect_error){
    die('connection failed : '.$conn->connect_error);
} else{
    $stmt = $conn->prepare("insert into signup(firstName, lastName, email, password, confirm_password)
    values(?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss",$firstname, $lastname, $email, $password, $confirm_password);
    $stmt->execute();
    echo "signup Successful";
    $stmt->close();
    $conn->close();
}
?>