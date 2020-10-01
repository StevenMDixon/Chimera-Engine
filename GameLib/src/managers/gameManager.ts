// //import DataManager from './dataManager';
// import SoundManager from '../systems/sound_handler';
// import ImageManager from './imageManager';
// import DataManager from '../modules/store'


// import Controller from '../modules/inputController';

// import Camera from '../classes/camera';

// import Screen from '../classes/scene';

// interface isScreens {
//    [key: string]: Screen
// }
 
// class Game {
//         scale: number;
//         ctx: CanvasRenderingContext2D;
//         screens: isScreens;
//         currentScreen: string;
//         dataManager: any;
//         soundManager: SoundManager;
//         imageManager: any;
//         controller: Controller;
//         controllerEnabled: boolean;
//         controllerMap: object;
//         enableDebug: boolean;
//         camera: Camera;
//         totalTime: number;

//     constructor() {
//         this.scale = 1;
//         this.ctx = null;
//         this.screens = {};
//         this.currentScreen = '';
//         this.dataManager = DataManager({});
//         this.soundManager = new SoundManager({});
//         this.imageManager = new ImageManager();
//         this.controller = new Controller();
//         this.controllerMap = {};
//         this.controllerEnabled = false;
//         this.enableDebug = false;
//         this.camera = null;
//         this.totalTime = 0;
//     }
//     setup({target, scale, startingScreen, size, useController, debug}): void {

//         let canvas = document.getElementById(target) as any;
//         this.ctx = canvas.getContext('2d');

//         if(typeof size == 'object')   {
//             this.ctx.canvas.width  = size.w;
//             this.ctx.canvas.height = size.h;
//         } else if(size == 'full'){
//             this.ctx.canvas.width  = window.innerWidth;
//             this.ctx.canvas.height = window.innerHeight;
//         }


//         this.ctx.imageSmoothingEnabled = false;
//         this.scale = scale;
//         this.ctx.scale(scale, scale);


//         this.currentScreen = startingScreen;
//         this.controllerEnabled = useController;
//         // give image manager the context and canvas for use in drawing sprites
//         this.imageManager.setup(this.ctx, this.scale);

//         this.camera = new Camera(0, 0, this.ctx.canvas.width / this.scale, this.ctx.canvas.height/ this.scale);
//         //debug options
//         if(debug){
//             this.enableDebug = debug;
//             this.imageManager.debug(this.enableDebug);
//         }

//         window.addEventListener('resize', (e) => this.resize(e));
//         this.resize();
//     }

//     async start(): Promise<object>{
//         let ready = await this.imageManager.loadImages();
//         if(ready){
//             this.handleInput();
//             this.update();
//         }else {
//             throw new Error('Image loader failed to load images');
//         }
//         return
//     }

//     update(time: number = 0): void{
//         const now = performance.now();
//         const deltaTime =  now - time;
//         this.totalTime += deltaTime;

//         this.screens[this.currentScreen].updateGameData(this.dataManager.store);
//         this.screens[this.currentScreen].update(
//             deltaTime, 
//             this.dataManager.getDataTools(), 
//             this.soundManager.getAudioTools(),
//             this.camera.getCameraTools()
//         );

//         this.camera.updateCamera();
//         this.draw(deltaTime);   

//         requestAnimationFrame(() => this.update(now));
//     }
//     draw(deltaTime): void{
       
//        // draw background
//         this.ctx.clearRect(0,0,this.ctx.canvas.clientWidth, this.ctx.canvas.height)
//         this.ctx.fillStyle = '#000';
//         this.ctx.fillRect(0,0, this.ctx.canvas.clientWidth, this.ctx.canvas.height);
//         //draw current scene

//         let LeveltoDraw = this.screens[this.currentScreen].getLevel()
//         if(LeveltoDraw){
//             LeveltoDraw.draw(deltaTime, this.totalTime, this.imageManager.getLevelRenderer(), this.camera);
//         }


//         this.screens[this.currentScreen].draw(
//             deltaTime, 
//             this.imageManager.getRenderer(),
//             this.camera.getCameraTools()
//         );
        
//         // draw debug info
//         if (this.enableDebug){
//             this.ctx.font = '10px Arial';
//             this.ctx.fillStyle = 'red';
//             this.ctx.fillText(`FPS: ${Math.floor(1/( deltaTime/1000))}`, this.ctx.canvas.width - 40, 10);
//         }
        
        
//     }
//     handleInput(): void{
//         // document.addEventListener('keydown', event => {this.screens[this.currentScreen].handleInput(event)});
//         // if(this.controllerEnabled){
//         //     this.controller.listenForGamePad(event => this.screens[this.currentScreen].handleInput(event));
//         // }
//     }
//     addScreens(screens): void{
//         this.setupScreens(screens);
//     }

//     setupScreens(screens): void{
//         for(let screen in screens){
//             this.screens[screen] = new screens[screen](
//                 {
//                     ctx: this.ctx, 
//                     scale: this.scale, 
//                     gotoScreen: this.gotoScreen.bind(this),
//                     data: this.dataManager.store
//                 })
//             this.screens[screen].setup(this.soundManager.getAudioTools());

           

//             if(this.screens[screen]['player']){
//                this.camera.attach(this.screens[screen]['player']);
//             }
//         }
//         this.controller.setup(this.screens[this.currentScreen].handleInput.bind(this.screens[this.currentScreen]), this.controllerEnabled);
//     }
//     gotoScreen(target: string): void{
//         this.currentScreen = target;
//         this.controller.changeFn(this.screens[this.currentScreen].handleInput.bind(this.screens[this.currentScreen]));
//     }
    
   
//     addImages(name, imageSrc, imageInfo: object){
//         this.imageManager.addImages(name, imageSrc, imageInfo);
//     }
    
//     addSprites(...data){
//         this.imageManager.addSprites(data);
//     }

//     useCustomControllerMap(map){
//         this.controller.overrideControllerMapping(map)
//     }

//     resize(event?) {

//         // Get the height and width of the window
//         var height = document.documentElement.clientHeight;
//         var width  = document.documentElement.clientWidth;
//         // This makes sure the DISPLAY canvas is resized in a way that maintains the MAP's width / height ratio.
//         if (width / height < 1){
//             height = Math.floor(width  / 1);
//         }   
//         else  {
//             width  = Math.floor(height * 1);
//         }
//         // This sets the CSS of the DISPLAY canvas to resize it to the scaled height and width.
//         this.ctx.canvas.style.height = height + 'px';
//         this.ctx.canvas.style.width  = width  + 'px';
    
//     }

//     setImageRoot(path: string){
//         this.imageManager.setImageRoot(path);
//     }


// }

// export default new Game();