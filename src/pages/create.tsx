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

      <svg width="197" height="33" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m43.112 30.904 1.479-1.251L22.502 2.388A5.784 5.784 0 0 0 20.76.94a5.64 5.64 0 0 0-4.388-.422 5.72 5.72 0 0 0-1.976 1.092L12.916 2.86l22.088 27.265a5.787 5.787 0 0 0 1.744 1.449 5.64 5.64 0 0 0 4.388.422 5.72 5.72 0 0 0 1.976-1.092z" fill="#EA3569"></path><path d="M1.725 30.904.246 29.653 22.335 2.388A5.785 5.785 0 0 1 24.078.94a5.64 5.64 0 0 1 4.388-.422 5.72 5.72 0 0 1 1.976 1.092l1.479 1.251L9.832 30.125a5.786 5.786 0 0 1-1.743 1.449 5.64 5.64 0 0 1-4.388.422 5.72 5.72 0 0 1-1.976-1.092z" fill="#02D3D7"></path><path d="m22.485 25.817 4.314 5.575c.286.37.72.585 1.18.585h1.56c1.262 0 1.965-1.495 1.18-2.51l-7.053-9.116a1.484 1.484 0 0 0-2.362 0l-7.054 9.117c-.785 1.014-.081 2.51 1.18 2.51h1.56c.46 0 .895-.216 1.18-.586l4.315-5.575z" fill="#FBDD3F"></path><path d="M68.813 23.285a8.584 8.584 0 0 1-2.634 1.555 8.607 8.607 0 0 1-3.022.541c-.8 0-1.572-.106-2.317-.318a8.844 8.844 0 0 1-2.081-.871 9.055 9.055 0 0 1-1.764-1.378 9.064 9.064 0 0 1-1.376-1.767 9.247 9.247 0 0 1-.882-2.084 8.761 8.761 0 0 1-.305-2.32c0-.8.102-1.574.305-2.32.212-.746.506-1.44.882-2.084a8.91 8.91 0 0 1 1.376-1.778 8.708 8.708 0 0 1 3.845-2.25 8.42 8.42 0 0 1 2.317-.318c1.042 0 2.05.18 3.022.542.972.353 1.85.872 2.634 1.555l-1.788 2.944a4.985 4.985 0 0 0-1.752-1.225 5.294 5.294 0 0 0-2.116-.436c-.745 0-1.443.142-2.093.424a5.459 5.459 0 0 0-1.705 1.154 5.29 5.29 0 0 0-1.153 1.708 5.186 5.186 0 0 0-.423 2.084c0 .738.141 1.433.423 2.085a5.457 5.457 0 0 0 2.857 2.85c.651.282 1.35.423 2.094.423.737 0 1.442-.14 2.116-.424a5.12 5.12 0 0 0 1.752-1.236l1.788 2.944zM82.16 18.598c0 .942-.17 1.822-.506 2.638a6.672 6.672 0 0 1-1.376 2.108 6.547 6.547 0 0 1-2.046 1.401 6.21 6.21 0 0 1-2.505.507c-.886 0-1.72-.17-2.505-.507a6.733 6.733 0 0 1-2.046-1.401 6.672 6.672 0 0 1-1.375-2.108 6.844 6.844 0 0 1-.506-2.638c0-.958.168-1.845.506-2.661a6.501 6.501 0 0 1 1.375-2.108 6.465 6.465 0 0 1 2.046-1.402 6.265 6.265 0 0 1 2.505-.506c.894 0 1.729.16 2.505.483a5.938 5.938 0 0 1 2.046 1.354 6.337 6.337 0 0 1 1.376 2.108c.337.816.505 1.727.505 2.732zm-3.234 0c0-.518-.087-.985-.26-1.401a3.185 3.185 0 0 0-.681-1.084 2.854 2.854 0 0 0-1.023-.694 3.096 3.096 0 0 0-1.235-.248c-.439 0-.854.083-1.246.248a2.88 2.88 0 0 0-1.012.694c-.282.299-.505.66-.67 1.084a3.782 3.782 0 0 0-.247 1.401c0 .487.082.938.247 1.354.165.416.388.778.67 1.084.29.306.628.55 1.012.73.392.173.807.259 1.246.259.44 0 .85-.082 1.235-.247a3.072 3.072 0 0 0 1.023-.695c.29-.298.517-.66.682-1.084.172-.423.258-.89.258-1.4zM96.105 25.016h-.776l-1.246-1.731a10.59 10.59 0 0 1-.976.777 7.617 7.617 0 0 1-1.07.624 6.84 6.84 0 0 1-1.164.413 4.738 4.738 0 0 1-1.2.153c-.886 0-1.72-.165-2.504-.495a6.563 6.563 0 0 1-2.046-1.39 6.672 6.672 0 0 1-1.376-2.108 6.906 6.906 0 0 1-.506-2.66c0-.95.169-1.834.506-2.65a6.64 6.64 0 0 1 1.376-2.12 6.465 6.465 0 0 1 2.046-1.402 6.264 6.264 0 0 1 2.504-.506c.282 0 .573.023.87.07.306.048.6.126.882.236.29.102.56.24.812.412.25.173.462.385.635.636V7.387h3.233v17.63zm-3.233-6.418c0-.44-.087-.863-.259-1.272a3.49 3.49 0 0 0-.682-1.095 3.27 3.27 0 0 0-1.023-.765 2.675 2.675 0 0 0-1.235-.295 3.32 3.32 0 0 0-1.246.236 2.956 2.956 0 0 0-1.012.683c-.282.29-.505.647-.67 1.071a3.945 3.945 0 0 0-.247 1.437 3.608 3.608 0 0 0 .917 2.414c.29.314.628.562 1.012.742.392.18.807.271 1.246.271.44 0 .85-.094 1.235-.283a3.53 3.53 0 0 0 1.023-.765c.29-.322.517-.687.682-1.095.172-.416.259-.844.259-1.284zM103.572 21.93c.126.04.251.067.377.083.125.008.25.012.376.012.313 0 .615-.043.905-.13a3.092 3.092 0 0 0 1.494-.954c.204-.235.368-.494.494-.777l2.351 2.367a6.225 6.225 0 0 1-1.034 1.143 6.281 6.281 0 0 1-1.259.86 5.948 5.948 0 0 1-1.422.53 6.183 6.183 0 0 1-1.529.188 6.396 6.396 0 0 1-2.505-.495 6.396 6.396 0 0 1-2.046-1.378 6.533 6.533 0 0 1-1.376-2.096c-.337-.816-.505-1.711-.505-2.685 0-.997.168-1.908.505-2.732a6.337 6.337 0 0 1 1.376-2.108 6.331 6.331 0 0 1 2.046-1.354 6.53 6.53 0 0 1 2.505-.483 6.343 6.343 0 0 1 2.963.73c.455.236.878.526 1.27.872.392.337.737.718 1.035 1.142l-6.021 7.266zm1.647-6.63a1.846 1.846 0 0 0-.447-.105 4.043 4.043 0 0 0-.447-.024c-.439 0-.855.083-1.247.248a2.954 2.954 0 0 0-1.011.683c-.282.298-.505.659-.67 1.083a3.808 3.808 0 0 0-.247 1.413c0 .118.004.251.012.4.015.15.035.303.059.46.031.149.066.294.105.436.04.14.09.266.153.376l3.74-4.97zM118.636 25.016h-3.364V11.51h-5.068v-3.38h13.488v3.38h-5.056v13.507zM127.243 25.016h-3.21V12.404h.776l1.058 1.495a5.53 5.53 0 0 1 1.764-1.083 5.544 5.544 0 0 1 2.046-.389h2.834v3.203h-2.834a2.425 2.425 0 0 0-1.728.707 2.444 2.444 0 0 0-.706 1.731v6.948zM137.791 8.977c0 .298-.059.577-.177.836-.109.259-.262.487-.458.683a2.368 2.368 0 0 1-.694.46c-.259.11-.537.164-.835.164-.298 0-.58-.055-.846-.165a2.417 2.417 0 0 1-.682-.46 2.418 2.418 0 0 1-.459-.682 2.117 2.117 0 0 1-.165-.836c0-.29.055-.565.165-.825a2.13 2.13 0 0 1 1.141-1.142c.266-.118.548-.177.846-.177.298 0 .576.06.835.177.267.11.498.263.694.46.196.188.349.416.458.682.118.26.177.534.177.825zm-.553 16.04h-3.234V12.403h3.234v12.612zM152.301 18.598c0 .99-.168 1.892-.505 2.709a6.5 6.5 0 0 1-1.376 2.108 6.167 6.167 0 0 1-2.046 1.354 6.472 6.472 0 0 1-2.505.483 6.39 6.39 0 0 1-2.504-.495 6.388 6.388 0 0 1-2.046-1.378 6.517 6.517 0 0 1-1.376-2.096c-.337-.816-.506-1.711-.506-2.685V7.387h3.222v5.888c.173-.22.38-.416.623-.589.251-.172.518-.314.8-.424.29-.11.588-.192.894-.247.305-.063.603-.094.893-.094a6.21 6.21 0 0 1 2.505.506 6.14 6.14 0 0 1 2.046 1.39 6.639 6.639 0 0 1 1.376 2.12c.337.808.505 1.695.505 2.661zm-3.233 0a3.51 3.51 0 0 0-.259-1.354 3.326 3.326 0 0 0-.682-1.095 3.134 3.134 0 0 0-2.258-.978c-.439 0-.854.098-1.246.295a3.315 3.315 0 0 0-1.011.765 3.46 3.46 0 0 0-.682 1.095 3.363 3.363 0 0 0-.247 1.272c0 .487.082.938.247 1.354a3.321 3.321 0 0 0 1.693 1.814c.392.173.807.259 1.246.259.439 0 .851-.086 1.235-.26a3.29 3.29 0 0 0 1.023-.73c.29-.305.517-.667.682-1.083a3.51 3.51 0 0 0 .259-1.354zM159.098 21.93c.126.04.251.067.376.083.126.008.251.012.377.012.313 0 .615-.043.905-.13.29-.086.561-.208.811-.365a3.094 3.094 0 0 0 1.176-1.366l2.352 2.367a6.23 6.23 0 0 1-1.035 1.143 6.246 6.246 0 0 1-1.258.86 5.955 5.955 0 0 1-1.423.53 6.175 6.175 0 0 1-1.528.188 6.396 6.396 0 0 1-2.505-.495 6.4 6.4 0 0 1-2.046-1.378 6.534 6.534 0 0 1-1.376-2.096c-.337-.816-.505-1.711-.505-2.685 0-.997.168-1.908.505-2.732a6.337 6.337 0 0 1 1.376-2.108 6.334 6.334 0 0 1 2.046-1.354 6.53 6.53 0 0 1 2.505-.483 6.343 6.343 0 0 1 2.963.73c.455.236.878.526 1.27.872.392.337.737.718 1.035 1.142l-6.021 7.266zm1.646-6.63a1.85 1.85 0 0 0-.446-.105 4.07 4.07 0 0 0-.447-.024c-.439 0-.855.083-1.247.248a2.954 2.954 0 0 0-1.011.683 3.28 3.28 0 0 0-.67 1.083 3.808 3.808 0 0 0-.247 1.413c0 .118.004.251.012.4.015.15.035.303.058.46.032.149.067.294.106.436.039.14.09.266.153.376l3.739-4.97zM168.442 25.643a.72.72 0 0 1-.53-.216.724.724 0 0 1-.217-.531c0-.21.073-.386.217-.53a.721.721 0 0 1 .53-.218c.201 0 .369.073.506.217a.724.724 0 0 1 .216.53.724.724 0 0 1-.216.532.668.668 0 0 1-.506.216zM170.211 22.255c0-.683.137-1.278.41-1.785a2.95 2.95 0 0 1 1.132-1.194c.489-.281 1.047-.422 1.673-.422.811 0 1.477.197 1.999.591.53.394.879.94 1.048 1.64h-1.18a1.69 1.69 0 0 0-.662-.952c-.322-.233-.723-.35-1.205-.35-.626 0-1.131.217-1.517.651-.385.426-.578 1.033-.578 1.821 0 .796.193 1.41.578 1.845.386.434.891.651 1.517.651.482 0 .883-.112 1.205-.338.321-.225.541-.546.662-.964h1.18a2.938 2.938 0 0 1-1.06 1.628c-.53.402-1.192.603-1.987.603-.626 0-1.184-.141-1.673-.422a2.95 2.95 0 0 1-1.132-1.194c-.273-.515-.41-1.118-.41-1.809zM180.813 25.68a3.41 3.41 0 0 1-1.686-.422 3.064 3.064 0 0 1-1.18-1.194c-.281-.523-.421-1.126-.421-1.809 0-.675.144-1.27.433-1.785.297-.522.698-.92 1.204-1.194a3.434 3.434 0 0 1 1.698-.422c.626 0 1.192.141 1.698.422.505.274.903.668 1.192 1.182.297.515.445 1.114.445 1.797 0 .683-.152 1.286-.457 1.809a3.107 3.107 0 0 1-1.216 1.194 3.503 3.503 0 0 1-1.71.422zm0-.965c.393 0 .762-.092 1.108-.277.345-.185.622-.463.83-.832.217-.37.326-.82.326-1.351 0-.53-.105-.98-.314-1.35a2.006 2.006 0 0 0-.818-.82 2.247 2.247 0 0 0-1.096-.278c-.401 0-.771.093-1.108.277-.329.177-.594.45-.795.82-.2.37-.301.82-.301 1.351 0 .539.097.993.289 1.363.201.37.466.647.795.832.329.177.69.265 1.084.265zM193.572 18.842c.514 0 .971.109 1.373.326.401.209.718.527.951.953.233.426.349.944.349 1.555v3.895h-1.083v-3.738c0-.66-.165-1.162-.494-1.507-.321-.354-.759-.531-1.313-.531-.57 0-1.023.185-1.36.555-.337.361-.506.888-.506 1.58v3.641h-1.084v-3.738c0-.66-.164-1.162-.493-1.507-.321-.354-.759-.531-1.313-.531-.57 0-1.023.185-1.36.555-.338.361-.506.888-.506 1.58v3.641h-1.096v-6.608h1.096v.953a2.18 2.18 0 0 1 .867-.796 2.675 2.675 0 0 1 1.216-.278c.554 0 1.043.125 1.469.374.425.25.742.615.951 1.098a2.17 2.17 0 0 1 .915-1.086 2.694 2.694 0 0 1 1.421-.386z" fill="#013536"></path></svg>

      </div>
        <nav class="nav">
            <a href="#features"></a>
            <a href="#features"></a>

        </nav>
        <a href="/auth/on-boarding/student" class="login-button">Student Login</a>
    </header>
       </br>
  <div style="margin-left: 26vw; margin-top: 20px; border-radius: 30px; font-size: 1rem; background: rgba(255, 169, 221, 0.45);  padding: 0.4rem 0.8rem; ">
            <a href="/student/courses"  style="text-decoration: none; color: white; display: inline-block; ">
                👋🏼 Hey Students, Enter platform <u>here</u>. 🚀
            </a>
        </div>

    <!-- Main Headline Section -->
    <section class="headline">

        <h1>
            <span class="line1">Create Coding Lessons</span><br>
            <span class="line2">with A.I.</span>
        </h1>
        <div class="sub-text">Empower your teaching with AI-generated lessons tailored to your needs.</div>
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
</html>`
  return <div dangerouslySetInnerHTML={{ __html: page }}></div>
}
