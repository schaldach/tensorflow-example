const detectorConfig = {
    modelType: poseDetection.movenet.modelType.MULTIPOSE_LIGHTNING,
    enableTracking: true,
    trackerType: poseDetection.TrackerType.BoundingBox
};
const detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, detectorConfig);

