<?php


$recepient = "smartwheel7@yandex.ru";
$sitename = "giroskuterkupitminsk";

$name = trim($_POST["name"]);
$phone = trim($_POST["phone"]);
$text = trim($_POST["question"]);
$message = "Имя: $name \nТелефон: $phone \nВопрос: $text";

$pagetitle = "Новая заявка с сайта \"$sitename\"";
mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient")
 ?>
