# coco-message


coco-message 是一个简单实用的javascript信息提示插件， 兼容主流浏览器，兼容至ie9 (ie没有svg动画)


 
## Usage

install via cnpm:

```
cnpm install coco-message -S
```

```
import cocoMessage from 'coco-message'
  
cocoMessage('hello world')
or
cocoMessage.info('hello world')
```

```
<script src="https://unpkg.com/coco-message/coco-message.min.js"></script>
```
## 暗黑模式

```
<html class="dark">

在html标签上添加dark样式名即可
```

## Examples


[在线示例](https://unpkg.com/coco-message/example.html)



## 基本用法 

对参数没有顺序要求，cocoMessage会根据参数的数据类型进行解析
  
```javascript
  cocoMessage.config({       //全局配置
    duration: 10000,         //消息显示时长
  });
      
  const close = cocoMessage.info(
   "请先登录！",            //消息文本
   3000,                    //消息显示时长
    ()=> {                  //回调函数
     console.log("close");
    }
  );
  
  close();                  //关闭消息方法
  
            
  var div = document.createElement("div");
  div.innerText = "修改成功！";
  cocoMessage.success(
    ()=>{
      console.log("close");
    },
    div
  );
  
```
