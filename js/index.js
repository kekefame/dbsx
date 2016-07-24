/*
技术:本地存储,对数据的操作
	（一）分析:
		 数据如何插入到对应结构，
		 修改数据结构
		 		修改dom
		 		修改存储数据
		 删除
		 		删除ddom
		 		删除数据
		 新增数据
		 		修改dom
		 		dom修改——>数据变
		 		数据变——>bom变
		 		解决办法:所有的dom重写
	（二）思路：
		 1、数据存储方式
		 	list=[{title:123456,status:false},{title:123456,status:false},{title:123456,status:false},{title:123456,status:false}]
		 	title为内容，status为状态(是否完成);
		 	localStorage.setItem("todolist",list);
	--对数据操作和对文档操作分离
*/

/*获取所需元素*/
var input=document.querySelector(".list-text");
var subBtn=document.querySelector(".sub-btn");
var delBtn=document.querySelector(".del-btn");
var now=document.querySelector(".now .list-item");
var before=document.querySelector(".before .list-item");
var nowNum=document.querySelector(".now .list-num");
var beforeNum=document.querySelector(".before .list-num");
/*获取数据 注意:第一次获取的数据有可能为空报错*/
function getData(){
	var data=JSON.parse(localStorage.getItem("todolist"));
	return data || [];
}
/*保存数据*/
function saveDate(data){
	localStorage.setItem("todolist",JSON.stringify(data));
}
/*状态发生变化时*/
function changestatus(index,sta){
	var data=getData();
	data[index].status=sta;
	saveDate(data);
	rewrite();
}
/*内容发生变化时*/
function changeContent(index,cont){
	var data=getData();
	data[index].title=cont;
	saveDate(data);
}
/*删除数据*/
function delData(index){
	var data=getData();
	data.splice(index,1);
	saveDate(data);
	rewrite();
}
/*点击提交事件*/
subBtn.onclick=function(){
	var val=input.value;
	if(val.length==0){
		alert("请输入内容");
		return;
	}
	var data=getData();
	var date=new Date();
		var year=date.getFullYear();
		var month=date.getMonth()+1;
		var day=date.getDate();
		var hours=date.getHours();
		var minutes=date.getMinutes(); 
		var str=year+"-"+month+"-"+day+"-"+hours+":"+minutes;
	data.push({title:val,status:false,date:str});
	input.value="";
	saveDate(data);
	rewrite();

}
/*键盘事件回车*/
input.onkeydown=function(e){
	if (e.keyCode==13)
	{
		var val=this.value;
		if (val.length==0){
			alert("请输入内容")
			return;
		}
		var date=new Date();
		var year=date.getFullYear();
		var month=date.getMonth()+1;
		var day=date.getDate();
		var hours=date.getHours();
		var minutes=date.getMinutes(); 
		var str=year+"-"+month+"-"+day+"-"+hours+":"+minutes;
		var data=getData();
		data.push({title:val,status:false,date:str});
		this.value="";
		saveDate(data);
		rewrite();
	}
}
/*重写数据 将数据添加到dom文档中*/
function rewrite(){
	var data=getData();
	var nowstr="",beforestr="",nownum=0,comnum=0;
	for (var i = 0; i < data.length; i++) {
		if (data[i].status==false)
		{
			nowstr+="<li><span class='line'></span><input type='checkbox' class='item-btn' onclick=changestatus("+i+",true)><i>"+(i+1)+"</i><input type='text' class='list-content' contenteditable=true value='"+data[i].title+"' onblur=changeContent("+i+",this.value)><button class='icon icon-login' onclick=delData("+i+")>&#xe61c;</button><span class='list-data'>"+data[i].date+"</span></li>";
			nownum++;
		}
		else{
			beforestr+="<li><span class='line'></span><input type='checkbox' class='item-btn' onclick=changestatus("+i+",false)><i>"+(i+1)+"</i><input type='text' class='list-content' contenteditable=true value="+data[i].title+" onblur=changeContent("+i+",this.value)><button class='icon icon-login' onclick=delData("+i+")>&#xe61c;</button><span class='list-data'>"+data[i].date+"</span></li>";
			comnum++;
		}
	}
	now.innerHTML=nowstr;
	before.innerHTML=beforestr;
	nowNum.innerHTML=nownum;
	beforeNum.innerHTML=comnum;
}
rewrite();