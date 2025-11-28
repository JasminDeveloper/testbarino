
let currentFormat = Fingerprint.SampleFormat.PngImage;

let FingerprintSdkTest = (function () {
    function FingerprintSdkTest() {
        let _instance = this;
        this.operationToRestart = null;
        this.acquisitionStarted = false;
        this.deviceConnected = false; // Flag to track device connection status
        // instantiating the fingerprint sdk here
        this.sdk = new Fingerprint.WebApi;

        this.sdk.onDeviceConnected = function (e) {
            _instance.deviceConnected = true;
            console.log("Device Connected:", e);
            if (_instance.currentStatusField) {
                document.getElementById(_instance.currentStatusField).innerText = "Device Connected";
            }
            window.deviceStatus(true);

            // Perform additional actions if needed
        };

        this.sdk.onDeviceDisconnected = function (e) {
            _instance.deviceConnected = false;
            console.log("Device Disconnected:", e);
            if (_instance.currentStatusField) {
                document.getElementById(_instance.currentStatusField).innerText = "Device Disconnected";
            }
           window.deviceStatus(false);

            // Perform additional actions if needed
        };

        this.sdk.onCommunicationFailed = function (e) {
            console.log("Communication Failed:", e);
            if (_instance.currentStatusField) {
                document.getElementById(_instance.currentStatusField).innerText = "Communication Failed";
            }
             window.deviceStatus(null);
            // Perform additional actions if needed
        };

        this.sdk.onSamplesAcquired = function (s) {
            storeSample(s);
        };

        this.sdk.onQualityReported = function (e) {
            console.log("Quality Reported:", e);
        }

    }

    FingerprintSdkTest.prototype.startCapture = function () {
        console.log(this);
        let _instance = this;
        this.operationToRestart = this.startCapture;


        this.sdk.startAcquisition(currentFormat, "").then(function () {
            _instance.acquisitionStarted = true;
            console.log("Capture Started");
        }, function (error) {
            showMessage(error.message);
        });
    };

    FingerprintSdkTest.prototype.stopCapture = function () {
        if (!this.acquisitionStarted) //Monitor if already stopped capturing
            return;
        let _instance = this;
        this.sdk.stopAcquisition().then(function () {
            _instance.acquisitionStarted = false;
            console.log("Capture Stopped");
        }, function (error) {
            showMessage(error.message);
        });
    };

    FingerprintSdkTest.prototype.getInfo = function () {
        return this.sdk.enumerateDevices();
    };

    FingerprintSdkTest.prototype.getDeviceInfoWithID = function (uid) {
        return this.sdk.getDeviceInfo(uid);
    };

    return FingerprintSdkTest;
})();


class Reader{
    constructor(){
        this.reader = new FingerprintSdkTest();
        this.readerList=null;
        this.selectFieldID = null;
        this.currentStatusField = null;
        /**
         * @type {Hand}
         */
        this.currentHand = null;
    }

    readerSelectField(selectFieldID){
        this.selectFieldID = selectFieldID;
    }

    setStatusField(statusFieldID){
        this.currentStatusField = statusFieldID;
    }

    async getList() {
        try {
            let availableReaders_all = await this.reader.getInfo();  // wait for the promise to resolve
            console.log(availableReaders_all,"Reader");
            let availableReaders = await this.reader.getInfo();  // wait for the promise to resolve
            this.readerList = availableReaders;
            return availableReaders;
        } catch (error) {
            console.error('Error fetching reader list:', error);
        }
    }

}

let myReader = new Reader();

function showMessage(message, message_type="error"){
    window.deviceStatus(message);
}


function storeSample(sample){
    samplesAcquired(sample);
    console.log(sample);
}

function samplesAcquired(s){
    localStorage.setItem("imageSrc", "");
    let samples = JSON.parse(s.samples);
    var image = Fingerprint.b64UrlTo64(samples[0]);
    
    // Convert portrait image to 1:1 (square) aspect ratio
    convertToSquareImage(image).then(squareImage => {
        localStorage.setItem("imageSrc", "data:image/png;base64," + squareImage);
        console.log(squareImage);
        window.onImageReceive(squareImage);
    }).catch(error => {
        console.error("Error converting image to square:", error);
        // Fallback to original image if conversion fails
        localStorage.setItem("imageSrc", "data:image/png;base64," + image);
        window.onImageReceive(image);
    });
}

// Function to convert portrait image to specific output size
// Set your desired output size here (width x height in pixels)
const OUTPUT_WIDTH = 500;  // Change this to your desired width
const OUTPUT_HEIGHT = 350; // Change this to your desired height

function convertToSquareImage(base64Image) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = function() {
            // Create a canvas element with desired output size
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            canvas.width = OUTPUT_WIDTH;
            canvas.height = OUTPUT_HEIGHT;
            
            // Calculate aspect ratios
            const imgAspect = img.width / img.height;
            const outputAspect = OUTPUT_WIDTH / OUTPUT_HEIGHT;
            
            let sourceX = 0, sourceY = 0, sourceWidth = img.width, sourceHeight = img.height;
            
            // Crop to fit the output aspect ratio (center crop)
            if (imgAspect > outputAspect) {
                // Image is wider, crop width
                sourceWidth = img.height * outputAspect;
                sourceX = (img.width - sourceWidth) / 2;
            } else {
                // Image is taller, crop height
                sourceHeight = img.width / outputAspect;
                sourceY = (img.height - sourceHeight) / 2;
            }
            
            // Draw the image with scaling and cropping
            ctx.drawImage(img, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, OUTPUT_WIDTH, OUTPUT_HEIGHT);
            
            // Convert canvas back to base64 (without the data:image/png;base64, prefix)
            const resizedBase64 = canvas.toDataURL('image/png').split(',')[1];
            resolve(resizedBase64);
        };
        img.onerror = function(error) {
            reject(error);
        };
        img.src = 'data:image/png;base64,' + base64Image;
    });
}
class Base64Converter {
    static base64ToByteArray() {
        const binaryString = atob('SGVsbG8=');
        const byteArray = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            byteArray[i] = binaryString.charCodeAt(i);
        }

        return byteArray;
    }
}
async function scan(){

    if( isWindows()){
      let list=await myReader.getList().then(function(){
            InitDevice();
            myReader.reader.startCapture();
            console.log("start cap");
        });
    }else{
            window.deviceStatus(false);

    }


}
function isWindows() {
    return navigator.platform.indexOf('Win') !== -1;
}
function GetobjLog(){
    console.warn(myReader);
}
function JScapture(){
    myReader.reader.startCapture();
    console.warn(myReader);
}
function JSSTcapture(){
    myReader.reader.stopCapture();
    console.warn(myReader);
}
function InitDevice(){
    myReader.getList();
    if (myReader.reader.deviceConnected) {
        window.deviceStatus(true);
    } else {
        window.deviceStatus(false);
    }
    console.warn(myReader);
}

function createFolderStructure(userName) {
  return (async () => {
    if (!userName) {
      console.error("Folder name is required.");
      return "Folder name is required.";
    }

    try {
      const response = await fetch("http://192.168.9.123:5000/create-folder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName }),
      });

      const data = await response.json();
      console.log(data.message);
      return data.message;
    } catch (error) {
      console.error("Error:", error);
      return "Failed to create folder structure.";
    }
  })();
}