export default function AiGeneratePage(): React.ReactElement {
  const page = `<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Meta tags and title -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Coding Lesson Generator & Platform for Teachers and Schools</title>
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;900&display=swap" rel="stylesheet">
    <!-- CSS Styles -->
    <style>

        *, *::before, *::after {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: "Raleway", sans-serif;
            margin: 0;
            padding: 0;
            background: linear-gradient(135deg, #f09, #5271FF, #444);
            color: #333;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        /* Header */
        .header {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
            padding: 2vw;
            box-sizing: border-box;
        }
        .logo {
            font-size: 24px;
            font-weight: bold;
            color: #fff;
            xmargin-left: 20px;
        }
        .nav {
            display: flex;
            align-items: center;
            gap: 20px;
            flex-grow: 1;
            justify-content: center;
        }
        .nav a {
            text-decoration: none;
            color: #fff;
            font-size: 0.8rem;
            padding: 5px 10px;
            border-radius: 8px;
            background: rgba(255, 255, 255, 0.1);
            transition: background 0.2s ease;
        }
        .nav a:hover {
            background: rgba(255, 255, 255, 0.3); 
        }

        /* Student Login Button */
        .login-button {
            padding: 5px 15px;
            color: #fff;
            border: 2px solid #fff;
            border-radius: 8px;
            background: transparent;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
            xmargin-right: 20px;
        }
        .login-button:hover {
            background: rgba(255, 255, 255, 0.0);
            color: pink;
            border-color: pink;
        }

        /* Responsive Header */
        @media (max-width: 600px) {
            .header {
                flex-wrap: wrap;
            }
            .logo {
                order: 0;
                margin-left: 20px;
            }
            .login-button {
                order: 1;
                margin-right: 20px;
            }
            .nav {
                order: 2;
                width: 100%;
                justify-content: center;
                margin-top: 10px;
            }
        }

        /* Headline Section */
        .headline {
            text-align: center;
            margin-top: 50px;
            font-family: "Raleway", sans-serif;
            color: #fff;
            width: 90%;
        }
        .headline h1 {
            font-size: 3rem;
            line-height: 1.2;
            margin: 0;
        }
        .headline .line1 {
            color: #ffffff;
        }
        .headline .line2 {
            color: pink;
        }
        .sub-text {
            font-size: 16px;
            color: #ddd;
            margin-top: 10px;
        }

        /* Student Message */
        .right-align-flex {
            display: flex;
            flex-direction: row;               
            justify-content: flex-end;
        }

        .message-student-link {
            text-decoration: none; 
            color: white; 
            xxxdisplay: inline-block; 
            margin-right: 16vw; 
            margin-top: 20px; 
            border-radius: 30px; 
            font-size: 1rem; 
            background: rgba(255, 169, 221, 0.45);  
            padding: 0.4rem 0.8rem;
        }
        .message-student-link:hover {
            background: rgba(255, 169, 221, 0.25);
        } 
        
        /* Prompt Section */
        .prompt-section {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 30px;
            flex-wrap: wrap;
            width: 90%;
        }
        .prompt-input {
            padding: 0.8rem;
            font-size: 1.1rem;
            line-height: 1.5rem;
            width: 70vw;
            max-width: 100%;
            border: none;
            border-radius: 10px;
            margin: 0;
            box-sizing: border-box;
            background-color: rgba(255, 255, 255, 0.2);
            outline: none;
        }
        /* Change placeholder color */
        .prompt-input::placeholder {
            color: pink; 
            opacity: 0.6; 
        }
                /* Focused input styling */
        .prompt-input:focus {
            border: 2px solid white; 
            box-shadow: 0 0 5px rgba(255, 0, 127, 0.5); 
        }
        .prompt-button {
            padding: 0.55rem;
            font-size: 1.1rem;
            margin-left: 10px;
            border: 4px solid pink;
            background: transparent;
            cursor: pointer;
            transition: all 0.3s ease;
            color: pink;
            border-radius: 0.8rem;
            display: flex;
            align-items: center;
        }
        .prompt-button:hover {
            border: 5px solid #7ECB7A; 
            color: #7ECB7A;
            xxx---transform: scale(1.05);

        }
        .prompt-button b {
            margin-right: 5px;
        }

        /* Responsive Prompt Section */
        @media (max-width: 600px) {
            .prompt-section {
                flex-direction: column;
                align-items: stretch;
            }
            .prompt-input {
                width: 100%;
                margin-bottom: 10px;
                height: 60px;
            }
            .prompt-button {
                width: 100%;
                margin-left: 0;
                justify-content: center;
            }
        }

        /* Catalog Link */
        .catalog-link {
            display: block;
            margin-top: 40px;
            text-align: center;
            color: #ddd;
            font-size: 16px;
            text-decoration: none;
        }
        .catalog-link:hover {
            color: #fff;
        }

        /* Video Demo Section */
        .video-demo {
            width: 90%;
            max-width: 800px;
            margin: 50px auto;
            text-align: center;
            color: #fff;
        }
        .video-demo h2 {
            font-size: 2em;
            margin-bottom: 10px;
        }
        .video-demo p {
            font-size: 16px;
            margin-bottom: 20px;
            color: #ddd;
        }
        .video-container {
            position: relative;
            padding-bottom: 56.25%;
            height: 0;
            overflow: hidden;
            border-radius: 10px;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
        }
        .video-container iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }

        /* Testimonials */
        .testimonials {
            width: 90%;
            max-width: 800px;
            overflow-x: auto;
            display: flex;
            gap: 15px;
            padding: 20px;
            margin: 40px 0;
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            margin-right: auto; 
            margin-left: auto;
        }
        .testimonial {
            background-color: rgba(255, 255, 255, 0.2);
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
            min-width: 200px;
            color: #333;
        }

        /* Footer */
        .footer {
            width: 100%;
            background-color: #222;
            color: #fff;
            padding: 40px 20px;
            box-sizing: border-box;
        }
        .footer-columns {
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
        }
        .footer-column {
            flex: 1;
            padding: 0 10px;
            min-width: 200px;
            margin-bottom: 20px;
        }
        .footer-bottom {
            text-align: center;
            font-size: 14px;
        }

        /* Side Menu Styles */
        .side-menu {
            position: fixed;
            top: 60%;
            right: -150px; /* Adjust to -50px to make visible */
            transform: translateY(-50%);
            z-index: 1000;  


        }
        .side-menu a {
            display: block;
            margin: 10px 0;
            width: 150px;
            padding: 10px;
            background: rgba(255, 255, 255, 0.1);
            color: #fff;
            text-decoration: none;
            border-radius: 5px 0 0 5px;
            text-align: left;
            transition: transform 0.3s ease;
            transform: translateX(80px); /* Adjusted for partial visibility */

        }
        .side-menu a:hover {
            transform: translateX(0); /* Slides fully into view */
            background: rgba(255, 255, 255, 0.3);
        }
        .side-menu a.icon {
          font-size: 42px; 
          line-height: 24px;
          cursor: pointer;
          transform: translateX(80px);
      }
                /* Extended State */
        .side-menu.extended a:not(.icon) {
           transform: translateX(0);
      }

        /* Responsive Side Menu */
        @media (max-width: 600px) {
            .side-menu {
                right: -40px;
            }
            .side-menu a {
                width: 130px;
                transform: translateX(140px); /* Adjust to -50px to make visible */
            }
        }
    </style>
</head>
<body>
    <!-- Header -->
    <header class="header">
        <div class="logo"> 
            <img width="200px" height="auto" src="https://devnest.s3.amazonaws.com/tenant_7279919a-41cf-492e-a197-b874ca222961/users/1731174395652_img.png">   
      </div>
        <nav class="nav">
            <a href="#features"></a>
            <a href="#features"></a>

        </nav>
        <a href="/auth/on-boarding/student" class="login-button">Student Login</a>
    </header>
       </br>
  <div class="right-align-flex">
            <a href="/student/courses"  class="message-student-link">
                👋🏼 Hey Students, Enter platform <u>here</u>. 🚀
            </a>
        </div>

    <!-- Main Headline Section -->
    <section class="headline">

        <h1>
            <span class="line1">Create Coding Lessons</span><br>
            <span class="line2">with A.I.</span>
        </h1>
        <div class="sub-text">Empower your teaching with colorful, interactive & auto-graded content in any language.</div>
    </section>

    <!-- Input and Button Section -->
    <section class="prompt-section">
        <input type="text" class="prompt-input" placeholder="Enter your lesson prompt here">
        <button class="prompt-button">
            <b class="icon">💡</b> Generate
        </button>
    </section>

    <!-- Catalog Link -->
    <a href="/student/courses" class="catalog-link">Catalog: Explore full courses</a>

    <!-- Video Demo Section -->
    <section class="video-demo">
        <h2>See AI Lesson Generation in Action</h2>
        <p>Watch a quick demo to discover how easy it is to generate coding lessons with AI.</p>
        <div class="video-container">
            <!-- Embed YouTube video -->
            <iframe src="https://www.youtube.com/embed/your-video-id" frameborder="0" allowfullscreen></iframe>
        </div>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials" id="testimonials">
        <div class="testimonial">"This tool has transformed my classroom!" - Teacher A</div>
        <div class="testimonial">"Easy to use and highly effective." - Teacher B</div>
        <div class="testimonial">"I save hours of lesson planning every week!" - Teacher C</div>
        <div class="testimonial">"My students are more engaged than ever." - Teacher D</div>
        <div class="testimonial">"A must-have for modern educators." - Teacher E</div>
    </section>

    <!-- Side Menu -->
    <div class="side-menu" id="sideMenu">
        <a class="icon" id="menuIcon">≡</a>
        <a href="#features">Features</a>
        <a href="#testimonials">Pricing</a>
        <a href="#contact">Contact</a>
    </div>

    <!-- Footer Section -->
    <footer class="footer">
        <div class="footer-columns">
            <div class="footer-column">
                <h3>About</h3>
                <p>Our Vision: Let teachers create coding lessons on-demand in any language.
      <br>
      <br> Generate assessments, interactive activities and practical projects for any topic.</p>
            </div>
            <div class="footer-column">
                <h3>Resources</h3>
                <p>Guides, support, and tutorials coming soon.</p>
            </div>
            <div class="footer-column">
                <h3>Contact</h3>
                <p>Get in touch with our support team: </br>
            hello at codetribe (dot) com</p>
            </div>
        </div>
        <div class="footer-bottom">

  <!-- Auto-updated year copyright line. -->
        © <span id="year-update-copy"></span> CodeTribe - All Rights Reserved.
    <!-- Inline JavaScript to update the year -->
    <script>
        document.getElementById("year-update-copy").textContent = new Date().getFullYear();
    </script>


        </div>
    </footer>
      <!-- JavaScript -->
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const sideMenu = document.getElementById('sideMenu');
            const menuIcon = document.getElementById('menuIcon');
            let menuTimeout;

            menuIcon.addEventListener('click', function() {
                // Add 'extended' class to side menu
                sideMenu.classList.add('extended');

                // Clear any existing timeout
                if (menuTimeout) {
                    clearTimeout(menuTimeout);
                }

                // Remove 'extended' class after 3 seconds
                menuTimeout = setTimeout(function() {
                    sideMenu.classList.remove('extended');
                }, 1500);
            });
        });
    </script>
</body>
</html>
`
  return <div dangerouslySetInnerHTML={{ __html: page }}></div>
}
