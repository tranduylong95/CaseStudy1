var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
const spriteWidth=156;
const spriteHeight=130;

// let frameX=0; 
// let x =0;
// let y =6;
// let a=0;
// let x1 =0;
// let x2=900;
//animation1();
// animation2();
// animation3();

// function animation1(){
//     ctx.clearRect(0, 0, 900, 600);
//     let image = new Image();
//     image.src='shadow_dog.png';
//     let image1 =new Image();
//     image1.src='istockphoto-888699018-612x612.png';
//     let image2 =new Image();
//     image2.src='istockphoto-888699018-612x612.png';
//     ctx.drawImage(image1,--x1,0);
//     ctx.drawImage(image2,--x2,0);
//     console.log(x1);
    
//     ctx.fillStyle="#FF0000";
//     ctx.drawImage(image,frameX*spriteWidth,3*spriteHeight,spriteWidth,spriteHeight,a,470,156,130);
//     if(a<canvas.width-156) requestAnimationFrame(animation1);
//     if(x % y==0){
//         if(frameX<8) frameX++;
//         else frameX=0;
//     }
    
//     x++;
//     a=a+0.1;
// }
// function animation2(){
    
//     let image = new Image();
//     image.src='shadow_dog.png';
//     ctx.fillStyle="#FF0000";
//     ctx.drawImage(image,frameX*spriteWidth,3*spriteHeight,spriteWidth,spriteHeight,a,200,156,130);
//     if(a<canvas.width-156) requestAnimationFrame(animation2);
//     if(x % y==0){
//         if(frameX<8) frameX++;
//         else frameX=0;
//     }
//     console.log(x);
//     x++;
//     a++;
// }
// function animation3(){
    
//     let image = new Image();
//     image.src='shadow_dog.png';
//     ctx.fillStyle="#FF0000";
//     ctx.drawImage(image,frameX*spriteWidth,3*spriteHeight,spriteWidth,spriteHeight,a,0,156,130);
//     if(a<canvas.width-156) requestAnimationFrame(animation3);
//     if(x % y==0){
//         if(frameX<8) frameX++;
//         else frameX=0;
//     }
 
//     x++;
//     a++;
// }
class Background {
    constructor(game){
        this.game=game;
        this.postionX=0;
    }
    draw(){
        let image1 =new Image();
        image1.src='istockphoto-888699018-612x612.png';
        let image2 =new Image();
        image2.src='istockphoto-888699018-612x612.png';
        this.game.ctx.drawImage(image1,0,0,900,600,this.postionX,0,900,600);
        this.game.ctx.drawImage(image2,0,0,900,600,this.postionX+this.game.width,0,900,600);
        if(this.postionX<-this.game.width)this.postionX=0;
        if(this.game.start){
            this.postionX-=2;
        }
        
    }
}
class Animal{
    constructor(name,game,image){
        this.game=game;
        this.name=name;
        this.spriteWidth=156;
        this.spriteHeight=130;
        this.frameX=0;
        this.status=false;
        this.postionX=0;
        this.postionY=0;
        this.postionYinBackground=350+Math.floor(Math.random() * 101);
        this.speed=0;
        this.img=image;
    }
    draw(){
        let image= new Image();
        image.src=this.img;
        image.crossOrigin = "Anonymous";
       
        if(this.status){
            this.postionY=3;
            if(this.postionX%8==0) 
            { 
                if(this.frameX <8) this.frameX++;
                else this.frameX=0;
            }   
            this.game.ctx.drawImage(image,this.frameX*this.spriteWidth,this.postionY*this.spriteHeight,this.spriteWidth,this.spriteHeight,this.speed,this.postionYinBackground,this.spriteWidth,this.spriteHeight);
            this.speed=this.speed+_.shuffle([-1,-2,-3,0,1,2,3])[0];   
        }
        else {
            this.postionY=0;
            if(this.postionX%6==0) 
            { 
                if(this.frameX <6) this.frameX++;
                else this.frameX=0
            } 
            this.game.ctx.drawImage(image,this.frameX*this.spriteWidth,this.postionY*this.spriteHeight,this.spriteWidth,this.spriteHeight,this.speed,this.postionYinBackground,this.spriteWidth,this.spriteHeight);
        }
        this.postionX++;
        
       
        }
       
        
}
class UI{
    constructor(game){
        this.game=game;
        this.postionX=130;
        this.status=0;
        this.width=66;
        this.player=new Player(game,this);
    }
    draw(){
        let image =new Image();
        image.src='2023-03-26-222237.png';
        image.crossOrigin = "Anonymous";
        this.game.ctx.drawImage(image,0,0,66,100,this.postionX,470,66,100);
        if(this.game.start)
        {
            this.postionX-=2;
        }
        if(this.postionX<-this.width){
            this.postionX=this.game.width*3-130;
            this.status=1;
        }
       this.player.draw();
       
    }
}
class Player{
    constructor(game,UI) {
        this.game=game;
        this.animal=[];
        this.UI=UI;
    }
    draw(){
        this.animal.forEach(function(item){
            item.draw();
        });
    }
    checkAnimalWin(){
        if(this.UI.status==1){
            for(let i=0;i<this.animal.length;i++){
                if((this.animal[i].speed+this.animal[i].spriteWidth)>this.UI.postionX+10) return true; 
            }
        }
        return false;
    }
}
class Game {
    constructor(width,height,ctx){
        this.width=width;
        this.height=height;
        this.postionX=0;
        this.ctx=ctx;
        this.background= new Background(this);
        this.UI=new UI(this);
        this.start=false;
        this.win=false;
    }
    draw(){
        ctx.clearRect(0, 0, this.width, this.height);
        this.background.draw();
        this.UI.draw();
       
        if(!this.UI.player.checkAnimalWin())
        {
            requestAnimationFrame(this.draw.bind(this));
            this.win=true;
        }
        else {
           
            ctx.font = "30px Comic Sans MS";
            ctx.fillStyle = "red";
            ctx.textAlign = "center";
            let i=0;
            for(;i<this.UI.player.animal.length;i++){
                if((this.UI.player.animal[i].speed+this.UI.player.animal[i].spriteWidth)>this.UI.postionX+10) break;
                
            }
            ctx.fillText(this.UI.player.animal[i].name+" là người chiến thắng", this.width/2, this.height/2);
            
        }
        
        
    }
}
const color=["#910302","#000000","#59254C","#716911","#CD00A2","#2552BD"];
let gamebord= new Game(900,600,ctx);
gamebord.draw();

function createNumberObject(){
    let number =document.getElementById("numberObject").value;
    gamebord.UI.player=new Player(gamebord,gamebord.UI);
    for (let i=0;i<number;i++){
        gamebord.UI.player.animal.push(new Animal(`${i}`,gamebord,`shadow-dog-${i+1}.png`));
        gamebord.UI.player.animal[i].postionYinBackground=350+Math.ceil(100*(i+1)/number);
        loadArrayObject();
    }

}
function loadArrayObject(){
    let tableTbody =document.getElementById("listtable");
    tableTbody.innerHTML="";
    gamebord.UI.player.animal.forEach((item,index,arr) => {
        let string=`<tr>
                        <td style="vertical-align: middle;background-color:${color[index]};color:white;">${index+1}</td>
                        <td ><input value="${item.name}" class="form-control" style="border: 0px; background-color: transparent;" onkeyup="setObjectAnimal(${index},event)"></td>
                   </tr>`;
        tableTbody.innerHTML +=string;
    });
}
function setObjectAnimal(index,e){
    gamebord.UI.player.animal[index].name=e.target.value;
}
function StartBoardGame(){
    gamebord.start=true;
    gamebord.UI.player.animal.forEach(item=>{
        item.status=true;
    })
    document.querySelector(".btn-warning").style.display="inline-block"; 
    document.querySelector(".btn-success").style.display="none";
}
function restGameboard(){
    if(gamebord.UI.player.checkAnimalWin()||gamebord.win){
        gamebord= new Game(900,600,ctx);
        gamebord.UI.player=new Player(gamebord,gamebord.UI);
        let number =document.getElementById("numberObject").value;
        let listName=document.getElementById("listtable").getElementsByTagName("input");
        for (let i=0;i<number;i++){
            gamebord.UI.player.animal.push(new Animal(`${listName[i].value}`,gamebord,`shadow-dog-${i+1}.png`));
            gamebord.UI.player.animal[i].postionYinBackground=350+Math.ceil(100*(i+1)/number);
           
        }
        gamebord.draw();
        document.querySelector(".btn-warning").style.display="none"; 
        document.querySelector(".btn-success").style.display="inline-block";
    }
    
}