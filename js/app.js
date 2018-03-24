    var selectedColor = "000000FF";

    // change this one to your bulb mac address
    var bulbMacAddress = "5CCF7FA0B34D";

    // change this one to your bulb ip address
    var bulbIpAddress = "192.168.4.186";

    var isModalActive = true;
    var activeStep = 0;
    var selectedColors = [];

    function httpRequest(data) {
        var xmlHttpObj = new XMLHttpRequest();

        xmlHttpObj.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
               return this.responseText;
            }
        };
        xmlHttpObj.open("POST","api.php",true);
        xmlHttpObj.send(data);
    }

    function changeBulbColor(colorCode = selectedColor) {
        let data = JSON.stringify({
                // myStrom bulb mac address
                mac : bulbMacAddress,
                ip : bulbIpAddress,
                action : "on",
                ramp: 100,
                color: colorCode
            });
            
        httpRequest(data);
    }

    function toggleTheBulb() {
      let data = JSON.stringify({
              // myStrom bulb mac address
              mac : bulbMacAddress,
              ip : bulbIpAddress,
              action : "toggle",
              ramp: 10,
          });
      httpRequest(data);
    }
    function updateColors(event) {
        console.log(event);
        // the first 00 are the Alpha and can be increased to FF
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

    function setColor(picker) {
        console.log(picker.toString());
		document.getElementsByTagName('body')[0].style.backgroundColor = '#' + picker.toString()
    }

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


