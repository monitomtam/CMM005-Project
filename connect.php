
<?php
if (isset($_POST['submit'])) {
    $firstname = $_POST['firstname'];
    $lastname = $_POST['lastname'];
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

    $db_host = "localhost";
    $db_user = "root";
    $db_pass = "";
    $db_name = "newsletter";

    $conn = mysqli_connect($db_host, $db_user, $db_pass, $db_name);

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $sql = "INSERT INTO users (firstname, lastname, email, password) VALUES ('$firstname', '$lastname', '$email', '$password')";

    if (mysqli_query($conn, $sql)) {
        echo "Registration successful!";
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }

    mysqli_close($conn);
}
?>









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