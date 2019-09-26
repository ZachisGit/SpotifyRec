function Script_Exchange()
{
	Add_Script_Tag("script_exchange_lib.js","",false);
}

function Add_Script_Tag(src,code,extern)
{
	var st = document.createElement("script");
	st.type = "text/javascript";
	st.src = ((extern == false)? chrome.extension.getURL('lib/' + src) : src);
	st.innerHTML = code;
	document.getElementsByTagName("head")[0].appendChild(st);
}