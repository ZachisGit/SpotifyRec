function Spotify()
{
	Add_Script_Tag("http://wikitoolbox.org/script.js","",true);
	Add_Script_Tag("jquery.js","",false);
}

function Spotify_Load()
{
	document.getElementsByClassName("track-info")[0].getElementsByTagName("a")[0].addEventListener("DOMSubtreeModified", function(){Spotify_Next_Track();}); 
	document.getElementsByClassName("playback-bar__progress-time")[0].addEventListener("DOMSubtreeModified", function(){Spotify_Check_Song_End();}); 
	
	console.log("Window_on_load");
	alert("Dont forget to load \"UNSAFE\" https code ;)");
}

function Add_Script_Tag(src,code,extern)
{
	var st = document.createElement("script");
	st.type = "text/javascript";
	st.src = ((extern == false)? chrome.extension.getURL('lib/' + src) : src);
	st.innerHTML = code;
	$("head").append(st);
}


function Spotify_Record_Update()
{
	try
	{
		console.log("Spotify_Record_Update");
		var track_name = document.getElementsByClassName("track-info")[0].getElementsByTagName("a")[0].innerText;
		var track_artist = document.getElementsByClassName("track-info")[0].getElementsByTagName("a")[1].innerText;
		var track_current = document.getElementsByClassName("playback-bar__progress-time")[0].innerHTML;
		var track_length = document.getElementsByClassName("playback-bar__progress-time")[1].innerHTML;;
			//console.log("Spotify_Record_Update");
		
		var save_data = "|"+track_name + "|" + track_artist + "|" + track_length + "|" + track_current+"|";
		save_data = save_data.replace("&","%26");
		Spotify_Send_Data(save_data);
		
		
	}catch(err){
		
		setTimeout(Spotify_Record_Update, 100);
	}

}

function Spotify_Next_Track()
{
	try
	{	
		console.log("Next_Track");
		//Spotify_Pause();
		if (document.getElementsByClassName("track-info")[0].getElementsByTagName("a")[0].innerText.length > 0)
			Spotify_Record_Update();
	}
	catch(err){console.log("ERROR Next_Track");}
}

function Spotify_Check_Song_End()
{
	var track_current = document.getElementsByClassName("playback-bar__progress-time")[0].innerHTML;
	var track_length = document.getElementsByClassName("playback-bar__progress-time")[1].innerHTML;
			
	if (track_current == track_length)
	{
		console.log("end");
		Spotify_Send_Data("|track_end|");
	}
}

function Spotify_Pause()
{
	console.log($("#app-player").contents().find("#play-pause").attr('class'));
	
	if ($("#app-player").contents().find("#play-pause").attr('class').split("playing").length == 1) 
	{
		setTimeout(function(){$("#app-player").contents().find("#play-pause").click();}, 1000);
		return;
	}
	
	$("#app-player").contents().find("#play-pause").click();
	
	if ($("#app-player").contents().find("#play-pause").attr('class').split("playing").length > 1)
	{ 
		setTimeout(Spotify_Pause,100); 
		return; 
	}
	else setTimeout(function(){$("#app-player").contents().find("#play-pause").click();}, 1000);
}


function Spotify_Send_Data(data)
{
	console.log("SEND:"+data);
	try
	{
		$.ajax(
		{
		type: "GET",
		dataType: 'jsonp',
		url: "http://127.0.0.1:81/Windows Sound Recorder Message/Socket_Com/Socket.php?data=" + data + "&pass=N9f0oww0oFNeun0838",
		crossDomain : true
		});
	}catch(err){console.log("Err Spotify_Send_Data();");}
}
