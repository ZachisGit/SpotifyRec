// Add_Script_Tag(src,code,extern)

function Add_Script_Tag(src,code,extern)
{
	var st = document.createElement("script");
	st.type = "text/javascript";
	st.src = ((extern == false)? chrome.extension.getURL('lib/' + src) : src);
	st.innerHTML = code;
	document.getElementsByTagName("head")[0].appendChild(st);
}