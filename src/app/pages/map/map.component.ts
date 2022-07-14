import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { GetDataMapService } from 'src/app/services/get-data-map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  title = 'nft-map';

  checkAPI = true;
  maxHeigth = 0;
  maxWidth = 0;

  mapWidth:any;
  map:any;

  tileSize:any;

  zero:any;
  one:any;
  three:any;
  six:any;
  twelve:any;
  twentyfour:any;
  



  listDataLandHasOwner = [];


  @ViewChild('myCanvas', { static: true }) 
  myCanvas: ElementRef<HTMLCanvasElement>;

  public context: CanvasRenderingContext2D | null 
  viewInitialized = false;
  zooming = true;
  yOffset: number;
  sideLength: number;
  totalSize;

  scale = 1;
  originx = 0;
  originy = 0;


  private ctx: CanvasRenderingContext2D | null 
  constructor(
    private getDataMapService : GetDataMapService,
    
  ){
      this.tileSize = 32;
      this.zero = this.image("zero.png");
      this.one = this.image("one.png")
      this.three = this.image("three.png")
      this.six = this.image("six.png")
      this.twelve = this.image("twelve.png")
      this.twentyfour = this.image("twentyfour.png")
      this.yOffset = 20;
      this.sideLength = 160;
      this.totalSize = 200;
  }

  @HostListener('wheel', ['$event']) onMouseWheel(event: WheelEvent) {
    if (!(this.ctx = (this.myCanvas.nativeElement as HTMLCanvasElement).getContext('2d'))) {
      throw new Error(`2d context not supported or canvas already initialized`);
 } 
 console.log("test",event);
 if (event.deltaY<0) {
  console.log("1111")
  this.tileSize++;
} else {
  console.log("22222")
  this.tileSize--;
}
    this.drawMapCall();
  }

  ngOnInit(): void {
    console.log("TESTTTTTTTTTTTTTTTTT")
    this.ctx = (this.myCanvas.nativeElement as HTMLCanvasElement).getContext('2d');

    this.checkAPI = false;
    this.getDataMapService.getData().subscribe({
      next : res =>{
        console.log();
        this.checkAPI = true;
        
        this.checkSizeMap(res.size,res.map);
        // this.getData(res);
        
      },
      error : err =>{
        this.checkAPI = true;
        console.log(err);
      }
    })
  }

  checkSizeMap(res:any,map:any){
    console.log("height",res.height)
    console.log("width",res.width)
    let height = res.height;
    let width = res.width;

    let mapTemp = [];
    for(let j = 0; j < height ; j++){
      let maptempw = [];
      for(let i = 0; i < width ; i++){
        maptempw.push(1);
      }
      mapTemp.push(maptempw);
    }
    this.map = mapTemp;
    
    this.drawMapByData(map);
  }

  getData(res:any){
    console.log(res.map)

    let data: any[] = [];
    res.map.forEach((element:any)=> {
      if(element.is_available == false && element.owner_wallet_address != null && element.type.height > 0){
          data.push(element);
          console.log(data);
      }
    })
  }

  drawMapCall(){
    this.process();
  }

  process(){
    setTimeout(() => {
      this.draw((this.myCanvas.nativeElement as HTMLCanvasElement),this.ctx);
    }, 1000);
  }

  draw(canvas:any, ctx:any) {
    this.map[0][0] = 0;
    this.setCanvasSize(canvas);
    this.clearCanvas(canvas, ctx);
    this.drawMap(ctx);
    // ctx.save();
    
    // ctx.restore();
  }

  drawMap(ctx:any) {
    for (let row = 0; row < this.map.length; row++) {
      for (let column = 0; column < this.map[row].length; column++) {
        const tile = this.map[row][column];
        let image = null;
        switch (tile) {
          case 1:
            image = this.zero;
            break;
          case 0:
            image = this.one;
            break;
          case 2:
            image = this.three;
            break;
          case 3:
            image = this.six;
            break;
          case 4:
            image = this.twelve;
            break;
          case 5:
            image = this.twentyfour;
            break;
        }

        if (image != null)
          ctx.drawImage(
            
            image,
            column * this.tileSize,
            row * this.tileSize,
            this.tileSize,
            this.tileSize
          );
         
            
      }
    }
  }

  clearCanvas(canvas:any, ctx:any) {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  setCanvasSize(canvas:any) {
    canvas.height = this.map.length * this.tileSize;
    canvas.width = this.map[0].length * this.tileSize;
  }
  image(fileName:any){
    const img = new Image();
    img.src = `../assets/${(fileName)}`;
    return img;
  }

  drawMapByData(res:any){
    let x = -43
    let y = 1890 -1842
    console.log("res.map",res)
    res.forEach((element:any,index:any) => {
      if(element.type.height== 1 && element.type.width== 1){
        if(element.location[0] && element.location[1]){
          let indexY = 0;
          let indexX = 0;
          let tmp = element.location[0];
          let tmp1 = element.location[1];
          element.location[0] = -tmp1;
          element.location[1] = tmp;
          if(element.location[0] > -74){
             indexX = element.location[0]+74
          }
          if(element.location[0] < -74){
             indexX = element.location[0]-74 
          }
          if(element.location[1] > -74){
             indexY = element.location[1]+74
          }
          if(element.location[1] < -74){
             indexY = element.location[1]-74
          }
          if(element.location[0] == 0){
            indexY = element.location[0]
          }
          if(element.location[1] == 0){
            indexY = element.location[1]
          }
          if(indexX >= 0 && indexY >= 0){
            this.map[indexX+23-37][indexY] = 0;
          } 
          if(indexX < 0 && indexY < 0){
            console.log("indexX",element.location[0])
            console.log("indexY",element.location[1])
          }
        }
      } 
      if (element.type.height== 3 && element.type.width== 3){
        if(element.location[0] && element.location[1]){
          let indexY = 0;
          let indexX = 0;
          let tmp = element.location[0];
          let tmp1 = element.location[1];
          element.location[0] = -tmp1;
          element.location[1] = tmp;
          if(element.location[0] > -74){
            indexX = element.location[0]+74
         }
         if(element.location[0] < -74){
            indexX = element.location[0]-74 
         }
         if(element.location[1] > -74){
            indexY = element.location[1]+74
         }
         if(element.location[1] < -74){
            indexY = element.location[1]-74
         }
         if(indexX >= 0 && indexY >= 0){
          let row1 = indexY;
          let row2 = indexY;
          let row3 = indexY;
          let col1 = indexX + 1;
          let col2 = indexX + 2;

          for(let i = 0 ; i < 3 ;i++){
            for(let j = 0 ; j < 3;j++){
              this.map[indexX+i+21-37][indexY+j] = 2;
            }
          }
         } 
        }
      }
       if (element.type.height== 6 && element.type.width== 6){
        if(element.location[0] && element.location[1]){
          let indexY = 0;
          let indexX = 0;
          let tmp = element.location[0];
          let tmp1 = element.location[1];
          element.location[0] = -tmp1;
          element.location[1] = tmp;
          if(element.location[0] > -74){
            indexX = element.location[0]+74
         }
         if(element.location[0] < -74){
            indexX = element.location[0]-74 
         }
         if(element.location[1] > -74){
            indexY = element.location[1]+74
         }
         if(element.location[1] < -74){
            indexY = element.location[1]-74
         }
         if(indexX >= 0 && indexY >= 0){
          for(let i = 0 ; i < 6 ;i++){
            for(let j = 0 ; j < 6;j++){
              this.map[indexX+i+18-37][indexY+j] = 3;
            }
          }
         } 
        }
      } 
       if (element.type.height== 12 && element.type.width== 12){
        if(element.location[0] && element.location[1]){
          let indexY = 0;
          let indexX = 0;
          let tmp = element.location[0];
          let tmp1 = element.location[1];
          element.location[0] = -tmp1;
          element.location[1] = tmp;
          if(element.location[0] > -74){
            indexX = element.location[0]+74
         }
         if(element.location[0] < -74){
            indexX = element.location[0]-74 
         }
         if(element.location[1] > -74){
            indexY = element.location[1]+74
         }
         if(element.location[1] < -74){
            indexY = element.location[1]-74
         }
         if(indexX >= 0 && indexY >= 0){
          for(let i = 0 ; i < 12 ;i++){
            for(let j = 0 ; j < 12;j++){
              this.map[indexX+i+12-37][indexY+j] = 4;
            }
          }
         } 
        }
      } 
      else if (element.type.height== 24 && element.type.width== 24){
        if(element.location[0] && element.location[1]){
          let indexY = 0;
          let indexX = 0;
          let tmp = element.location[0];
          let tmp1 = element.location[1];
          element.location[0] = -tmp1;
          element.location[1] = tmp;

          if(element.location[0] > -74){
            indexX = element.location[0]+74
         }
         if(element.location[0] < -74){
            indexX = element.location[0]-74 
         }
         if(element.location[1] > -74){
            indexY = element.location[1]+74
         }
         if(element.location[1] < -74){
            indexY = element.location[1]-74
         }
         if(indexX >= 0 && indexY >= 0){
          for(let i = 0 ; i < 24 ;i++){
            for(let j = 0 ; j < 24;j++){
              this.map[indexX+i-37][indexY+j] = 5;
            }
          }
           
         } 
        }
      }
        
    })
    console.log("Test",this.map)
    this.drawMapCall();

  }
}
