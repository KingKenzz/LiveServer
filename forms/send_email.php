<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Load PHPMailer Autoload
require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

// Function to sanitize form values
function sanitize_input($input)
{
    return htmlspecialchars(trim($input), ENT_QUOTES, 'UTF-8');
}

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['recaptcha-response'])) {
        $recaptchaSecretKey = '6LfGnUYpAAAAAE0VZoIxyhwgf9UM5AB0dEfJW-TH';
        $recaptchaResponse = $_POST['recaptcha-response'];

        $recaptchaVerifyUrl = "https://www.google.com/recaptcha/api/siteverify?secret=$recaptchaSecretKey&response=$recaptchaResponse";
        $recaptchaVerification = json_decode(file_get_contents($recaptchaVerifyUrl));

        if (!$recaptchaVerification->success) {
            // reCAPTCHA verification failed
            echo "Captcha hasn't been resolved!";
            exit();
        }
    } else {
        // Captcha response is not set
        echo "Captcha hasn't been resolved!";
        exit();
    }

    $name = sanitize_input($_POST["name"]);
    $email = sanitize_input($_POST["email"]);
    $subject = sanitize_input($_POST["subject"]);
    $message = nl2br(sanitize_input($_POST["message"])); // Convert new lines to <br>

    $recipient_email = "theprogamer.gameplayz@gmail.com";
    $cc_email = "kennethivan.ramos@gmail.com"; // Replace with the actual CC recipient's email

    // Create PHPMailer instance for the main email
    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com'; // SMTP server
        $mail->SMTPAuth   = true;
        $mail->Username   = 'pemiparts@gmail.com'; // SMTP username
        $mail->Password   = 'rkwh qjur uqfg mzkj'; // SMTP password
        $mail->SMTPSecure = 'tls';
        $mail->Port       = 587;

        // Set UTF-8 character set
        $mail->CharSet = 'UTF-8';

        $mail->setFrom($email, $name);
        $mail->addAddress($recipient_email);
        $mail->addCC($cc_email);

        $mail->isHTML(true);
        $mail->Subject = $subject;

        // HTML content with inline styles
        $mail->Body = "<html>
                         <head>
                           <meta charset='UTF-8'>
                           <style>
                             body { color: #000000; } /* Set your desired color */
                           </style>
                         </head>
                         <body>
                           $message
                           <p>Sent by: $email</p>
                         </body>
                       </html>";

        $mail->AltBody = strip_tags("Sent by: $email\n\n" . $message);

        // Send the email
        $mail->send();

        // Create PHPMailer instance for the confirmation email
        $confirmationMail = new PHPMailer(true);

        $confirmationMail->isSMTP();
        $confirmationMail->Host       = 'smtp.gmail.com'; // SMTP server
        $confirmationMail->SMTPAuth   = true;
        $confirmationMail->Username   = 'pemiparts@gmail.com'; // SMTP username
        $confirmationMail->Password   = 'rkwh qjur uqfg mzkj'; // SMTP password
        $confirmationMail->SMTPSecure = 'tls';
        $confirmationMail->Port       = 587;

        // Set UTF-8 character set
        $confirmationMail->CharSet = 'UTF-8';

        $confirmationMail->setFrom('your_email@example.com', 'Pemi Parts');
        $confirmationMail->addAddress($email);
        $confirmationMail->addCC($email);

        $confirmationMail->isHTML(true);
        $confirmationMail->Subject = 'Your Inquiry Has Been Received';
        $confirmationMail->Body = '<html>
        <head>
          <meta charset="UTF-8">
          <style>
            body {
              font-family: Arial, sans-serif;
              font-size: 16px;
              margin: 0;
              padding: 0;
              color: #000000;
            }
            .container {
              max-width: 600px;
              margin: 0;
              padding: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <p style="text-align: left;">Dear ' . $name . ',</p>
            <p style="text-align: left;">Thank you for contacting us. We have received your inquiry and our team will review it shortly. Please allow us some time to respond to your message.</p>
            <p style="text-align: left;">Best regards,</p>
            <p style="text-align: left;">Pemi Parts</p>
          </div>
        </body>
      </html>';

        // Send the confirmation email
        $confirmationMail->send();

        // Output success message
        echo "OK";
    } catch (Exception $e) {
        // Output error message
        echo "Error: {$mail->ErrorInfo}";
    }
} else {
    // If the form is not submitted, redirect to the homepage or display an error message
    header("Location: /");
    exit();
}
?>
