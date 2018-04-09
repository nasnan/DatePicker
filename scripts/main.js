

//返回[上个月最后几天，这个月，下个月前几天]的数组
function oneMonth(date,theMonth,theYear){
	let theMonthFirstday=new Date(theMonth+"/"+"1"+"/"+theYear);
	let theMonthLastday=new Date(theYear,theMonth,0);
	let theMonthFirstdayWeek=theMonthFirstday.getDay();
	if(theMonthFirstdayWeek==0) theMonthFirstdayWeek=7;
	let theMonthLastdayWeek=theMonthLastday.getDay();

	let lastMonthLastday=new Date(theYear,theMonth-1,0);
	let nextMonthFirstDay=new Date(theYear,theMonth,1);

	function lastMonthLastDays(){	//返回上个月最后几天
		let tempLastDays=lastMonthLastday.getDate();
		let days=[];
		for(let i=0;i<theMonthFirstdayWeek-1;i++){
			days.push(tempLastDays);
			tempLastDays-=1;
		}

		return days.sort();	//里面日期降序排列
	}

	function theMonthDays(){	//返回这个月日期
		let days=[];
		for(let i=1;i<=theMonthLastday.getDate();i++){
			days.push(i);
		}
		return days;
	}

	function nextMonthFirstDays(){	//下个月开头几天
		let days=[];
		let d=1;
		for(let i=7;i>=nextMonthFirstDay.getDay();i--){
			days.push(d);
			d++;
		}	
		return days;

	}

	function getAllDays(){
		let lastDays=lastMonthLastDays();
		let thedays=theMonthDays();
		let nextDays=nextMonthFirstDays();

		let allDays=lastDays.concat(thedays,nextDays);
		if(allDays.length<42){
			temp=parseInt(allDays.slice(-1)[0])+1;
			for(let i=allDays.length;i<42;i++){
				nextDays.push(temp);
				temp+=1;
			}
		}
		return [lastDays,thedays,nextDays];
	}
	return getAllDays();
}


//将这个月7*6的日历写入
function writeMonthToCalendar(lastDays,thedays,nextDays){

	let calendarTabel=document.getElementsByTagName("table")[0];
	let daysBlock=calendarTabel.getElementsByTagName("td");

	for(let i=0;i<lastDays.length;i++){
		daysBlock[i].innerHTML=lastDays[i];
		daysBlock[i].className+=" last";
	}
	for(let i=0;i<thedays.length;i++){
		daysBlock[i+lastDays.length].innerHTML=thedays[i];
		daysBlock[i+lastDays.length].className+=" these";
	}
	for(let i=0;i<nextDays.length;i++){
		daysBlock[i+lastDays.length+thedays.length].innerHTML=nextDays[i];

		daysBlock[i+lastDays.length+thedays.length].className+=" next";
	}
	returnDate(daysBlock);
}

function returnDate(daysBlock){
	let  [date,theMonth,theYear]=YearAndMonth(false);
	if(theMonth<=9) theMonth="0"+theMonth;
	let theDay;
	let dateFinally;
	for(let i=0;i<daysBlock.length;i++){
		daysBlock[i].addEventListener("click",function(e){
			theDay=e.target.innerHTML;
			if(theDay.length==1) theDay="0"+theDay;
			dateFinally=theYear+"-"+theMonth+"-"+theDay;
			writeToTextBtn(dateFinally);
		})
	}
}

function writeToTextBtn(dateFinally){
	let chooseDate=document.getElementById("chooseDate");
	let warp=document.getElementById("wrap");
	chooseDate.value=dateFinally;
	wrap.style.display="none";

}

function YearAndMonth(flag){
	let date,theMonth,theYear;
	if (flag==true){
		date=new Date();
		theMonth=date.getMonth()+1;
		theYear=date.getFullYear();
	}
	else{
		let wpheader=document.getElementsByClassName("wpheader")[0].getElementsByTagName("span")[0];
		theYear=parseInt(wpheader.innerHTML);
		theMonth=parseInt(wpheader.innerHTML.slice(-3,-1));
		date=new Date(theYear,theMonth-1,1)
	}
	return [date,theMonth,theYear];

}

//选择新的时初始化日历
function initializationMonth(date,theMonth,theYear){
	let days=document.getElementsByTagName("table")[0].getElementsByTagName("td");
	for (d in days){
		days[d].className="";
	}
	let [lastDays,thedays,nextDays]=oneMonth(date,theMonth,theYear);
	writeTitleToCalendar(date,theMonth,theYear);
	writeMonthToCalendar(lastDays,thedays,nextDays);
}

//初始化全部
function initialization(){
	let [date,theMonth,theYear]=YearAndMonth(true);
	initializationMonth(date,theMonth,theYear);
	buttonChoose();

	chooseMonth();
}

//写日历的标题年月
function writeTitleToCalendar(date,theMonth,theYear){
	let wpheader=document.getElementsByClassName("wpheader")[0];
	let content=wpheader.getElementsByTagName("span")[0];
	if(theMonth<10) theMonth=" "+theMonth;
	let contentStr=theYear+"年"+theMonth+"月";
	content.innerHTML=contentStr;
}

function writeYearToCalendar(theYear){
	let wpheader=document.getElementsByClassName("wpheader")[0].getElementsByTagName("span")[0];
	wpheader.innerHTML=theYear+"年";
}

function chooseMonth(){
	let wpheader=document.getElementsByClassName("wpheader")[0].getElementsByTagName("span")[0];
	let wpcontent=document.getElementsByClassName("wpcontent")[0];
	let monthList=document.getElementsByClassName("monthList")[0];
	let monthbtn=document.getElementsByClassName("monthbtn");

	wpheader.addEventListener("click",function(e){
		if(e.target.className=="yearBtn"){		//当前为月份选择时，点击标题变为年份选择
			e.target.className="yearFixed";
			chooseYear(wpheader,monthList);
		}
		else if(e.target.className=="")		//当前为日历时点击日历标题日历标题改成年份
		{
			let [date,theMonth,theYear]=YearAndMonth(false);
			wpcontent.style.display="none";
			monthList.style.display="block";
			writeYearToCalendar(theYear);
			e.target.className+="yearBtn";
			monthbtn[0].style.display="none";
			monthbtn[1].style.display="none";

		}
		
	})

	//点击月份显示该月日历
	let monthes=monthList.getElementsByTagName("li");
	for(let i=0;i<monthes.length;i++){
		monthes[i].addEventListener("click",function(e){
			let monthNow=parseInt(e.target.innerHTML);
			let yearNow=parseInt(wpheader.innerHTML);
			let dateNow=new Date(monthNow-1+"/1/"+yearNow);
			initializationMonth(dateNow,monthNow,yearNow);
			wpcontent.style.display="block";
			monthList.style.display="none";
			wpheader.className="";
			monthbtn[0].style.display="block";
			monthbtn[1].style.display="block";
		})
	}
}

//年份选择
function chooseYear(wpheader,monthList){
	let theYear=parseInt(wpheader.innerHTML);
	let yearList=document.getElementsByClassName("yearList")[0];
	
	monthList.style.display="none";
	yearList.style.display="block";

	changeYears(wpheader,theYear);

}

function changeYears(wpheader,theYear){
	let yearList=document.getElementsByClassName("yearList")[0];
	let monthList=document.getElementsByClassName("monthList")[0];
	let years=yearList.getElementsByTagName("li");
	let yearA=parseInt(theYear/10)*10;
	let yearB=yearA+9;
	wpheader.innerHTML=yearA+" - "+yearB;
	for(let i=0;i<years.length;i++){
		years[i].innerHTML=yearA+i;

		//当前为年份选择时，点击年份显示月份选择
		years[i].addEventListener("click",function(e){
			wpheader.className="yearBtn";
			let yearNow=e.target.innerHTML;
			writeYearToCalendar(yearNow);
			yearList.style.display="none";
			monthList.style.display="block";
			chooseMonth();
		})
	}
}


function buttonChoose(){
	let wpheader=document.getElementsByClassName("wpheader")[0].getElementsByTagName("span")[0];
	let monthbefore=document.getElementsByClassName("monthbefore")[0];
	let monthafter=document.getElementsByClassName("monthafter")[0];
	let yearbefore=document.getElementsByClassName("yearbefore")[0];
	let yearafter=document.getElementsByClassName("yearafter")[0];
	let monthList=document.getElementsByClassName("monthList")[0];

	monthbefore.addEventListener("click",function(){
		let [date,theMonth,theYear]=YearAndMonth(false);
		
		if(theMonth>1) theMonth-=1;
		else{
			theMonth=12;
			theYear-=1;
		}
		initializationMonth(date,theMonth,theYear);
	});
	monthafter.addEventListener("click",function(){
		let [date,theMonth,theYear]=YearAndMonth(false);
		if(theMonth<12)	theMonth+=1;
		else{
			theMonth=1;
			theYear+=1;
		}
		initializationMonth(date,theMonth,theYear);
	});

	yearbefore.addEventListener("click",function(){
		let [date,theMonth,theYear]=YearAndMonth(false);
		if(wpheader.className==""){
			theYear-=1;
			initializationMonth(date,theMonth,theYear);
		}
		else if(wpheader.className=="yearBtn"){
			theYear-=1;
			writeYearToCalendar(theYear);
		}
		else if(wpheader.className=="yearFixed"){
			theYear-=10;
			changeYears(wpheader,theYear);
		}
	});
	yearafter.addEventListener("click",function(){
		let [date,theMonth,theYear]=YearAndMonth(false);
		if(wpheader.className==""){
			theYear+=1;
			initializationMonth(date,theMonth,theYear);
		}
		else if(wpheader.className=="yearBtn"){
			theYear+=1;
			writeYearToCalendar(theYear);
		}
		else if(wpheader.className=="yearFixed"){
			theYear+=10;
			changeYears(wpheader,theYear);
		}
	})

}

function showDatePicker(){
	initialization();

	let chooseDate=document.getElementById("chooseDate");
	let warp=document.getElementById("wrap");
	chooseDate.addEventListener("click",function(){
		wrap.style.display="block";
	})
}


showDatePicker();


