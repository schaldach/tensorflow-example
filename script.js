const playButton = document.querySelector('[name=play]')
const detectorConfig = {
    modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
    enableTracking: true,
    trackerType: poseDetection.TrackerType.BoundingBox
};
const video = document.querySelector('video')
const canvas = document.querySelector('canvas')
playButton.onclick = async () => {
    try {
        if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
            const videoStream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: {
                        min: 400,
                        ideal: 400,
                        max: 400,
                    },
                    height: {
                        min: 400,
                        ideal: 400,
                        max: 400,
                    }
                }
            })
            video.srcObject = videoStream
            video.addEventListener('loadeddata', predictWebcam);
        }
    }
    catch (e) {
        console.log(e)
    }

}
let drawn = true
async function predictWebcam() {
    if(drawn){
        drawn = false
        const detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, detectorConfig);
        await detector.estimatePoses(video, {}).then(poses => {
            drawResults(canvas, poses)
        })
        window.requestAnimationFrame(predictWebcam);
    }
    
}


function drawResults(canvas, poses) {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = "green"
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    poses.forEach((pose) => {
        drawKeypoints(pose.keypoints, ctx);
        console.log(pose)
    })
}
function drawKeypoints(keypoints, ctx) {
    for (let i = 0; i < keypoints.length; i++) {
        const keypoint = keypoints[i];
        console.log(keypoint)
        const { x, y, score } = keypoint
        if(score>0.2){
            ctx.fillRect(x, y, 5, 5);
        }
        
    }
    drawn = true
}