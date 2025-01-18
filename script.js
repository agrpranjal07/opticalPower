async function setupFaceDetection() {
    await Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromUri('/weights'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/weights'),
        faceapi.nets.faceRecognitionNet.loadFromUri('/weights')
    ]);

    const video = document.getElementById('video');
    const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
    video.srcObject = stream;

    video.onplaying = () => {
        setInterval(async () => {
            const detections = await faceapi.detectAllFaces(video)
                .withFaceLandmarks()
                .withFaceDescriptors();

            if (detections.length > 0) {
                const box = detections[0].detection.box;
                const canvas = document.getElementById('canvasElement');
                const ctx = canvas.getContext('2d');
                ctx.strokeStyle = 'red';
                ctx.lineWidth = 2;
                
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.strokeRect(box.x, box.y, box.width, box.height);

                const distance = estimateDistance(box);
                
                const videoAndCanvas = document.getElementById('video');
                const canvasElement = document.getElementById('canvasElement');
                const Snellen = document.getElementById('dynamic-text');
                if (distance >= 45 && distance <= 55) {
                    videoAndCanvas.style.visibility = "hidden";
                    canvasElement.style.visibility = "hidden";
                    Snellen.style.removeProperty('visibility');
                } else {
                    
                    videoAndCanvas.style.removeProperty('visibility');
                    canvasElement.style.removeProperty('visibility');
                    Snellen.style.visibility = "hidden"
                    if(distance > 55){
                        document.getElementsByTagName("p").innerHTML = "Too far from the camera";
                    }
                    else if(distance < 45){
                        document.getElementsByTagName("p").innerHTML = "Too far from the camera";
                    }
                }

                console.log("Box:", box.width, box.height, 'Estimated Distance: ', distance, 'cm');
            }
        }, 100);
    };
}

function estimateDistance(faceBox) {
    const realFaceWidth = 20; // cm (width of an average human face)
    const focalLength = 500;  // Placeholder value, needs to be calibrated

    const faceWidthPixels = faceBox.width;

    const distance = (realFaceWidth * focalLength) / faceWidthPixels;

    return distance;
}

setupFaceDetection();

function generateSnellenChart() {
    let fontSize = 50;
    let columnsPerRow = window.matchMedia('(max-width: 768px)').matches ? 3 : 5;
    let letterIndex = 3; // Start at 'D'
    let counter = 0;
    const dynamicTextContainer = document.getElementById('dynamic-text');

    while (fontSize >= 10) {
        if (counter === columnsPerRow) {
            fontSize -= 1;  // Decrease font size after each row
            counter = 0;    // Reset the column counter for the next row
        }

        const span = document.createElement('span');
        span.style.fontSize = `${fontSize}px`;
        span.textContent = `${String.fromCharCode(65 + letterIndex)} ${fontSize}`;

        dynamicTextContainer.appendChild(span);

        letterIndex = (letterIndex + (Math.random()*10)) % 26; // Move by 4 letters each time
        counter++;
    }
}

generateSnellenChart();

