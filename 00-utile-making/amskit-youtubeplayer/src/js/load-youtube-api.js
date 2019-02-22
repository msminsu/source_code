const loadYoutubeApi = () => {
  if(window.loadYoutubeApi) return;
  window.loadYoutubeApi = true;
  
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  
  const firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  
  window.onYouTubeIframeAPIReady = () => {
    window.loadedYoutubeApi = true;
    $(window).trigger("readyYoutubeApi");
  };
};

export default loadYoutubeApi;
