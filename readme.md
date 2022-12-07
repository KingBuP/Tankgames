创建： yarn create vite   =>  Vanilla（经典模板） Vanilla-ts





//图片缩略图 画布和图片大小一致  常用手段

function scale(img: HTMLImageElement, el: HTMLCanvasElement) {

 // img.naturalWidth; //原始图片的尺寸

 //取最小是差距大的宽或高

 return Math.min(el.width / img.naturalWidth, el.height / img.naturalHeight); //原始图片的尺寸

}