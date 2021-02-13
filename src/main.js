import paper from 'paper'
import {SVGUtils} from './utils/svgUtils'
import {PoseIllustration} from './illustrationGen/illustration';
import {Skeleton} from './illustrationGen/skeleton';
import boy_svg from '!arraybuffer-loader!../resources/illustration/boy.svg';

const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 1000;

var canvasScope,svgScope,skeleton,illustration;
var animation_index = 0;
function animation(){
    let pose; 
    if (animation_index %2 == 0){
        pose = getInitPose()
    }else{
        pose = getPose1()
    }
    animation_index = animation_index +1;
    skeleton.reset();
    canvasScope.project.clear();
    illustration.updateSkeleton(pose, null);
    illustration.draw();
    setTimeout(animation,1000)
}


window.onload = async function() {
    var canvas = document.getElementById('myCanvas');
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    canvasScope = new paper.PaperScope()
    canvasScope.setup(canvas)

    svgScope = await SVGUtils.importSVG(new TextDecoder("utf-8").decode(boy_svg));
    skeleton = new Skeleton(svgScope);
    illustration = new PoseIllustration(canvasScope);
    illustration.bindSkeleton(skeleton, svgScope);
    
    canvasScope.activate();

    setTimeout(animation,1000)
}

function addKeypoint(array, name,x,y){
   let index = array.findIndex(item=>item['part'] == name);
   if (index > -1){
       array.splice(index,1)
   }

   let keypoint = {}
   keypoint['part'] = name
   keypoint['score'] = 0.99
   keypoint['position'] = {x:x,y:y}
   array.push(keypoint)
}

function getPose1(){
    let pose = getInitPose()
    let index = pose['keypoints'].findIndex(item=>item['part'] == 'rightWrist');
    let rightWrist = pose['keypoints'][index]['position']
    addKeypoint(pose['keypoints'],'rightWrist',rightWrist['x']+50,rightWrist['y']-90);
    return pose;
}

function getInitPose(){
    let pose = {}
    pose['score'] = 0.99
    pose['keypoints'] = []
    let skeletonGroup = SVGUtils.findFirstItemWithPrefix(svgScope.project, 'skeleton');
    // Pose
    let leftAnkle = SVGUtils.findFirstItemWithPrefix(skeletonGroup, 'leftAnkle');
    let leftKnee = SVGUtils.findFirstItemWithPrefix(skeletonGroup, 'leftKnee');
    let leftHip = SVGUtils.findFirstItemWithPrefix(skeletonGroup, 'leftHip');
    let leftWrist = SVGUtils.findFirstItemWithPrefix(skeletonGroup, 'leftWrist');
    let leftElbow = SVGUtils.findFirstItemWithPrefix(skeletonGroup, 'leftElbow');
    let leftShoulder = SVGUtils.findFirstItemWithPrefix(skeletonGroup, 'leftShoulder');
    let rightAnkle = SVGUtils.findFirstItemWithPrefix(skeletonGroup, 'rightAnkle');
    let rightKnee = SVGUtils.findFirstItemWithPrefix(skeletonGroup, 'rightKnee');
    let rightHip = SVGUtils.findFirstItemWithPrefix(skeletonGroup, 'rightHip');
    let rightWrist = SVGUtils.findFirstItemWithPrefix(skeletonGroup, 'rightWrist');
    let rightElbow = SVGUtils.findFirstItemWithPrefix(skeletonGroup, 'rightElbow');
    let rightShoulder = SVGUtils.findFirstItemWithPrefix(skeletonGroup, 'rightShoulder');


    addKeypoint(pose['keypoints'],'leftAnkle',leftAnkle._matrix._tx,leftAnkle._matrix._ty);
    addKeypoint(pose['keypoints'],'leftKnee',leftKnee._matrix._tx,leftKnee._matrix._ty);
    addKeypoint(pose['keypoints'],'leftHip',leftHip._matrix._tx,leftHip._matrix._ty);
    addKeypoint(pose['keypoints'],'leftWrist',leftWrist._matrix._tx,leftWrist._matrix._ty);
    addKeypoint(pose['keypoints'],'leftElbow',leftElbow._matrix._tx,leftElbow._matrix._ty);
    addKeypoint(pose['keypoints'],'leftShoulder',leftShoulder._matrix._tx,leftShoulder._matrix._ty);
    addKeypoint(pose['keypoints'],'rightAnkle',rightAnkle._matrix._tx,rightAnkle._matrix._ty);
    addKeypoint(pose['keypoints'],'rightKnee',rightKnee._matrix._tx,rightKnee._matrix._ty);
    addKeypoint(pose['keypoints'],'rightHip',rightHip._matrix._tx,rightHip._matrix._ty);
    addKeypoint(pose['keypoints'],'rightWrist',rightWrist._matrix._tx,rightWrist._matrix._ty);
    addKeypoint(pose['keypoints'],'rightElbow',rightElbow._matrix._tx,rightElbow._matrix._ty);
    addKeypoint(pose['keypoints'],'rightShoulder',rightShoulder._matrix._tx,rightShoulder._matrix._ty);
    
    addKeypoint(pose['keypoints'],'leftEar',570,150);
    addKeypoint(pose['keypoints'],'rightEar',450,150);
    return pose;
}