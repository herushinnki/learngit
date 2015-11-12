var fruitObj = function()
{
    this.alive=[];//bool
    this.x=[];
    this.y=[];
    this.aneNo=[];
    this.l=[];
    this.spd=[];
    this.fruitType=[];
    this.orange=new Image();
    this.blue=new Image();
}
fruitObj.prototype.num=30;
fruitObj.prototype.init=function()
{
    for(var i=0;i<this.num;i++)
        {
            this.alive[i]=false;
            this.x[i]=0;
            this.y[i]=0;
            this.aneNo[i]=0;
            this.l[i]=0;
            this.spd[i]=Math.random()*0.017+0.003;///[0.003,0.02)
            this.fruitType[i]=""; 
        }
    this.orange.src="./src/fruit.png";
    this.blue.src="./src/blue.png";
}
fruitObj.prototype.draw=function()
{
    for (var i=0;i<this.num;i++)
        {
            //draw
            //find a ane, grow, fly up
            if (this.alive[i])
            {
                if(this.fruitType[i]=="blue")
                {
                    var pic=this.blue;        
                }
                else
                {
                    var pic=this.orange;
                }
                if (this.l[i]<=14)
                {
                    var No=this.aneNo[i];
                    this.x[i]=ane.headx[No];
                    this.y[i]=ane.heady[No];
                    this.l[i]+=this.spd[i]*deltaTime;
                }
                else
                {
                    this.y[i]-=this.spd[i]*7*deltaTime;
                }
                ctx2.drawImage(pic,this.x[i]-this.l[i]*0.5,this.y[i]-this.l[i]*0.5,this.l[i],this.l[i]); //drawImage从（0,0,）开始绘制，为了位置准确需要减去图片宽高的一半     
                if(this.y[i]<10)
                {
                    this.alive[i]=false;
                }
            }
        }
}
fruitObj.prototype.born=function(i)
{
    
    this.aneNo[i]=Math.floor(Math.random()*ane.num);//可能重复
    this.l[i]=0;
    this.alive[i]=true;
    var ran=Math.random();
    if (ran<0.1)
    {
        this.fruitType[i]="blue";//orange,blue
    }
    else
    {
        this.fruitType[i]="orange";    
    }
}
fruitObj.prototype.dead=function(i)
{
    this.alive[i]=false;
}
function fruitMonitor()
{
    var num=0;
    for (var i=0;i<fruit.num;i++)
    {
        if (fruit.alive[i]) num++;
    }
    if(num<15)
        {
            sendFruit();
            return;
        }
    
}

function sendFruit()
{
    for (var i=0;i<fruit.num;i++)
    {
        if (!fruit.alive[i])
            {
                fruit.born(i);
                return;
            }
    }
}


fruitObj.prototype.update=function()
{
    var num=0;
    for(var i=0;i<this.num;i++)
    {
        if(this.alive[i]) num++;
    }
}