chrome.browserAction.onClicked.addListener(function (tab) 
{ 
	if (tab.url.substring(0,24) == "https://open.spotify.com")
	{
		console.log("Spotify loaded");  
		chrome.tabs.executeScript(null,{code: "Spotify_Load();"});
	}	
});
