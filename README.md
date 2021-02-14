# coco-message


coco-message 是一个简单实用的javascript信息提示插件， 兼容主流浏览器，兼容至ie9 (ie没有svg动画)

1.0.5以后改为白色背景
 
## Usage

install via cnpm:

```
cnpm install coco-message -S
```

```
import cocoMessage from 'coco-message'
  
cocoMessage.info('hello world')
```

```
<script src="https://unpkg.com/coco-message/coco-message.min.js"></script>
```
## Examples


[在线示例](https://unpkg.com/coco-message/example.html)



## 基本用法 

对参数没有顺序要求，cocoMessage会根据参数的数据类型进行解析
  
```javascript
  cocoMessage.config({
    duration: 10000,
  });
      
  cocoMessage.info(3000, "请先登录！", function () {
    console.log("close");
  });
            
  var div = document.createElement("div");
  div.innerText = "修改成功！";
  cocoMessage.success(
    ()=>{
      console.log("close");
    },
    div
  );
  
```
