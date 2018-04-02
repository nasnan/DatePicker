

function oneMonth(date,theMonth,theYear){

	let theMonthFirstday=new Date(theMonth+"/"+"1"+"/"+theYear);
	let theMonthLastday=new Date(theYear,theMonth,0);
	let theMonthFirstdayWeek=theMonthFirstday.getDay();
	if(theMonthFirstdayWeek==0) theMonthFirstdayWeek=7;
	let theMonthLastdayWeek=theMonthLastday.getDay();

	let lastMonthLastday=new Date(theYear,theMonth-1,0);

	let nextMonthToday=new Date(date.setMonth(theMonth));
	let nextMonthFirstDay=new Date((nextMonthToday.getMonth()+1)+"/1/"+(nextMonthToday.getFullYear()));



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
		days=[];
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
			temp=allDays.slice(-1)[0];
			for(let i=allDays.length;i<=42;i++){
				nextDays.push(temp);
				temp+=1;
			}
		}
		return [lastDays,thedays,nextDays];
	}
	return getAllDays();
}


function writeMonthToCalendar(lastDays,thedays,nextDays){
	let calendarTabel=document.getElementsByTagName("table")[0];
	let daysBlock=calendarTabel.getElementsByTagName("td");

	for(let i=0;i<lastDays.length;i++){
		daysBlock[i].innerHTML=lastDays[i];
		daysBlock[i].className+="last";
	}
	for(let i=0;i<thedays.length;i++){
		daysBlock[i+lastDays.length].innerHTML=thedays[i];
		daysBlock[i+lastDays.length].className+="these";
	}
	for(let i=0;i<nextDays.length;i++){
		daysBlock[i+lastDays.length+thedays.length].innerHTML=nextDays[i];
		daysBlock[i+lastDays.length+thedays.length].className+="next";
	}
}

function YearAndMonth(){
	let date=new Date("4/20/2018");
	let theMonth=date.getMonth()+1;
	let theYear=date.getFullYear();

	return [date,theMonth,theYear];
	console.log(date)
}

function initialization(){
	let [date,theMonth,theYear]=YearAndMonth();
	let [lastDays,thedays,nextDays]=oneMonth(date,theMonth,theYear);
	writeTitleToCalendar(date,theMonth,theYear);
	writeMonthToCalendar(lastDays,thedays,nextDays);
}

function writeTitleToCalendar(date,theMonth,theYear){
	let wpheader=document.getElementsByClassName("wpheader")[0];
	let content=wpheader.getElementsByTagName("span")[0];
	// let [date,theMonth,theYear]=YearAndMonth();
	if(theMonth<10) theMonth=" "+theMonth;
	let contentStr=theYear+"年"+theMonth+"月";
	content.innerHTML=contentStr;
}

function chooseMonth(){
	let wpheader=document.getElementsByClassName("wpheader")[0].getElementsByTagName("span")[0];
	let wpcontent=document.getElementsByClassName("wpcontent")[0];
	let monthList=document.getElementsByClassName("monthList")[0];
	let [date,theMonth,theYear]=YearAndMonth();
	//日历改成月份选择
	wpheader.addEventListener("click",function(){
		wpcontent.style.display="none";
		monthList.style.display="block";
		wpheader.innerHTML=theYear+"年";
	})

	let monthes=monthList.getElementsByTagName("li");
	for(let i=0;i<monthes.length;i++){
		monthes[i].addEventListener("click",function(e){
			theMonth=parseInt(e.target.innerHTML);
			wpcontent.style.display="block";
			monthList.style.display="none";
		})
	}
	console.log(date)
}



initialization();

chooseMonth();