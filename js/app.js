    var selectedColor = "000000FF";

    // change this one to your bulb mac address
    var bulbMacAddress = "6001942C4BAA";
    var secondMac = "6001942C52BA";

    // change this one to your bulb ip address
    var bulbIpAddress = "192.168.1.23";
    var secondIp = "192.168.1.24";

    // declaring global variables
    var isModalActive = true;
    var activeStep = 0;
    var selectedColors = [];

    // retrieve Data
    function httpRequest(data) {
        var xmlHttpObj = new XMLHttpRequest(); //function is called when readystate changes
        xmlHttpObj.onreadystatechange = function() {
            //Below the onreadystatechange event is triggered four times (1-4), one time for each change in the readyState.
            if (this.readyState == 4 && this.status == 200) {
                //returns the text received from a server following a request being sent.
               return this.responseText;
            }
        };
        //gets information from api.php
        xmlHttpObj.open("POST","api.php",true);
        xmlHttpObj.send(data);
    }
    function changeBulbColor(colorCode = selectedColor) {
        //converts a JavaScript value to a JSON string
        //let declares a block scope local variable
        //FOR FIRST BULB
        // let data = JSON.stringify({
        //         // myStrom bulb mac address
        //         mac : bulbMacAddress,
        //         // myStrom bulb IP address
        //         ip : bulbIpAddress,
        //         action : "on",
        //         ramp: 100,
        //         color: colorCode
        //     });
            //FOR SECOND BULB
        let data = JSON.stringify({
                // myStrom bulb mac address
                mac : secondMac,
                // myStrom bulb IP address
                ip : secondIp,
                action : "on",
                ramp: 100,
                color: colorCode
            });
            //sendt data from a web server
        httpRequest(data);
    }
//toggle the bulb
    function toggleTheBulb() {
    //   let data = JSON.stringify({
    //           // myStrom bulb mac address
    //           mac : bulbMacAddress,
    //           ip : bulbIpAddress,
    //           action : "toggle",
    //           ramp: 10,
    //       });
        let data = JSON.stringify({
              // myStrom bulb mac address
              mac : secondMac,
              ip : secondIp,
              action : "toggle",
              ramp: 10,
          });
      httpRequest(data);
    }
//change the color of the bulb
    function updateColors(event) {
        //Outputs a message to the Web Console
        console.log(event);
        // the first 00 are the Alpha and can be increased to FF
        //returns the element that triggered the event and returns the first to seventh number the capitalizes it
        selectedColor = '00' + event.target.value.substr(1,7).toUpperCase();
        changeBulbColor(selectedColor);
    }


    // this function returns a Promise : Learn more at https://scotch.io/tutorials/javascript-promises-for-dummies
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function decimalToHexString(number)
    {
        if (number < 0)
        {
            number = 0xFFFFFFFF + number + 1;
        }

        return number.toString(16).toUpperCase();
    }

    // a async function
    // crazy mode with random actions lol
    async function crazyMode() {
        for (let i = 0; i <= 1000; i++) {
            var randNumber = Math.floor((Math.random() * 16000000) + 0000000);
            randNumber = decimalToHexString(randNumber);
            console.log(randNumber);
            randNumber = '00' + randNumber;
            changeBulbColor(randNumber);
            var randTime = Math.floor((Math.random() * 300) + 100);
            await sleep(randTime);  
        }
    }
//gets the color that is picked and turn it to hex
    function setColor(picker) {
        console.log(picker.toString());
		document.getElementsByTagName('body')[0].style.backgroundColor = '#' + picker.toString()
    }
//opens and closes the color picker
    function toggleColorPickerModal(step) {
        activeStep = step;
        if (isModalActive == false) {
            $("#colorPickerModal").show();
            isModalActive = true;
        } else {
            $("#colorPickerModal").hide();
            isModalActive = false;
        }
    }
//turn the selected field the same color as the selected color
    function selectColor(colorCode){
        selectedColors[activeStep] = colorCode;
        $("#colorPickerModal").hide();
        isModalActive = false;
        document.getElementById("step_"+activeStep).style.backgroundColor = '#'+colorCode;
    }
    
    async function run() {
        console.log(selectedColors.length);
        for (let i = 0; i <= 6; i++) {
            if (selectedColors[i] == null){
                    // 00000000 is turned off 
                colorCode = '00000000'; 
            } else {
                colorCode = '00' + selectedColors[i];
            }
            changeBulbColor(colorCode);
            // var sleepTime = Math.floor((Math.random() * 3000) + 1000);
            var sleepTime = 1000;
            await sleep(sleepTime);  
        }
        $('#music')[0].play();
        crazyMode();
    }

    toggleColorPickerModal();


