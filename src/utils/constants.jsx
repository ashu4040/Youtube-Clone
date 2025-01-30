const Api_key = "AIzaSyCYTtmURKjHc8r-czlOFt_va7qa-ebUDQE";

export const Youtube_Api =
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=50&regionCode=IN&key=" +
  Api_key;

export const getCommentKey = (videoId) => {
  return `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${Api_key}`;
};

export const Search_Api =
  "https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=";

export const Search_Result = `https://www.googleapis.com/youtube/v3/search?key=${Api_key}&part=snippet&type=video`;
