const playButton = document.querySelector('[name=play]')
const restartButton = document.querySelector('[name=restart]')
const detectorConfig = {
    modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
    enableTracking: true,
    trackerType: poseDetection.TrackerType.BoundingBox
};
const video = document.querySelector('video')
const canvas = document.querySelector('canvas')
restartButton.onclick = () => { location.reload() }
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
async function predictWebcam() {
    const detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, detectorConfig);
    await detector.estimatePoses(video, {}).then(poses => {
        drawResults(canvas, poses)
    })
    window.requestAnimationFrame(predictWebcam);
}

const facePath = [4, 2, 0, 1, 3]
const upperBodyPath = [10, 8, 6, 5, 7, 9]
const bodyPath = [6, 5, 11, 12, 6]
const lowerBodyPath = [16, 14, 12, 11, 13, 15]


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
    ctx.beginPath()
    ctx.lineWidth = "5"
    ctx.strokeStyle = "red"
    for (i = 0; i < facePath.length; i++) {
        let rightKeyPoint = keypoints[facePath[i]]
        if (rightKeyPoint.score > 0.2) {
            if (i == 0) {
                ctx.moveTo(rightKeyPoint.x, rightKeyPoint.y)
            }
            else {
                ctx.lineTo(rightKeyPoint.x, rightKeyPoint.y)
            }
        }
    }
    ctx.stroke()
    ctx.closePath()
    ctx.beginPath()
    for (i = 0; i < upperBodyPath.length; i++) {
        let rightKeyPoint = keypoints[upperBodyPath[i]]
        if (rightKeyPoint.score > 0.2) {
            if (i == 0) {
                ctx.moveTo(rightKeyPoint.x, rightKeyPoint.y)
            }
            else {
                ctx.lineTo(rightKeyPoint.x, rightKeyPoint.y)
            }
        }
    }
    ctx.stroke()
    ctx.closePath()
    ctx.beginPath()
    for (i = 0; i < bodyPath.length; i++) {
        let rightKeyPoint = keypoints[bodyPath[i]]
        if (rightKeyPoint.score > 0.2) {
            if (i == 0) {
                ctx.moveTo(rightKeyPoint.x, rightKeyPoint.y)
            }
            else {
                ctx.lineTo(rightKeyPoint.x, rightKeyPoint.y)
            }
        }
    }
    ctx.stroke()
    ctx.closePath()
    ctx.beginPath()
    for (i = 0; i < lowerBodyPath.length; i++) {
        let rightKeyPoint = keypoints[lowerBodyPath[i]]
        if (rightKeyPoint.score > 0.2) {
            if (i == 0) {
                ctx.moveTo(rightKeyPoint.x, rightKeyPoint.y)
            }
            else {
                ctx.lineTo(rightKeyPoint.x, rightKeyPoint.y)
            }
        }
    }
    ctx.stroke()
    ctx.closePath()
}