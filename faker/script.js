const randomWords = require('random-words');
const randomWord = require('random-word');

const getRandomId = () => {
  const randomChars = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 
                        'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 
                        'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 
                        'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 
                        'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 
                        'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', 
                        '8', '9' ];
  const randomLength = (Math.random() * (9 - 5) + 5)>>>0;
  let output = `${randomLength}`;
  let i = 0; do {
    const randomIndex = (Math.random() * randomChars.length)>>>0;
    output += randomChars[randomIndex];
    ++i;
  } while (i <= randomLength);
  return output;
};

const getRandomCategory = () => {
  const categories = ["Film & Animation", "Autos & Vehicles", "Music", 
                      "Pets & Animals", "Sports", "Short Movies", 
                      "Travel & Events", "Gaming", "Videoblogging", 
                      "People & Blogs", "Comedy", "Entertainment", 
                      "News & Politics", "Howto & Style", "Education", 
                      "Science & Technology", "Nonprofits & Activism", 
                      "Movies", "Anime/Animation", "Action/Adventure", 
                      "Classics", "Comedy", "Documentary", "Drama", "Family", 
                      "Foreign", "Horror", "Sci-Fi/Fantasy", "Thriller", 
                      "Shorts", "Shows", "Trailers"];
  const randomIndex = (Math.random() * categories.length)>>>0;

  return categories[randomIndex];
};

// sampleAd = {
//   "adId": String,
//   "tags": Array,
//   "img": String,
//   "siteLink": String,
//   "category": String
// };

const getRandomDomain = () => {
  const domains = ["aero","biz","cat","com","coop","edu","gov","info","int","jobs","mil","mobi","museum",
  "name","net","org","travel","ac","ad","ae","af","ag","ai","al","am","an","ao","aq","ar","as","at","au","aw",
  "az","ba","bb","bd","be","bf","bg","bh","bi","bj","bm","bn","bo","br","bs","bt","bv","bw","by","bz","ca",
  "cc","cd","cf","cg","ch","ci","ck","cl","cm","cn","co","cr","cs","cu","cv","cx","cy","cz","de","dj","dk","dm",
  "do","dz","ec","ee","eg","eh","er","es","et","eu","fi","fj","fk","fm","fo","fr","ga","gb","gd","ge","gf","gg","gh",
  "gi","gl","gm","gn","gp","gq","gr","gs","gt","gu","gw","gy","hk","hm","hn","hr","ht","hu","id","ie","il","im",
  "in","io","iq","ir","is","it","je","jm","jo","jp","ke","kg","kh","ki","km","kn","kp","kr","kw","ky","kz","la","lb",
  "lc","li","lk","lr","ls","lt","lu","lv","ly","ma","mc","md","mg","mh","mk","ml","mm","mn","mo","mp","mq",
  "mr","ms","mt","mu","mv","mw","mx","my","mz","na","nc","ne","nf","ng","ni","nl","no","np","nr","nu",
  "nz","om","pa","pe","pf","pg","ph","pk","pl","pm","pn","pr","ps","pt","pw","py","qa","re","ro","ru","rw",
  "sa","sb","sc","sd","se","sg","sh","si","sj","sk","sl","sm","sn","so","sr","st","su","sv","sy","sz","tc","td","tf",
  "tg","th","tj","tk","tm","tn","to","tp","tr","tt","tv","tw","tz","ua","ug","uk","um","us","uy","uz", "va","vc",
  "ve","vg","vi","vn","vu","wf","ws","ye","yt","yu","za","zm","zr","zw"];
  const randomDomainIndex = (Math.random() * domains.length)>>>0;

  return domains[randomDomainIndex];
};

const getRandomPath = () => {
  const randomChars = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 
                        'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 
                        'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 
                        'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 
                        'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 
                        'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', 
                        '8', '9' ];

  let randomLength = (Math.random() * (9 - 5) + 5)>>>0;
  let randomPath = '';
  do {
    const randomIndex = (Math.random() * randomChars.length)>>>0;
    randomPath += randomChars[randomIndex];
    --randomLength;
  } while (randomLength);
  
  return randomPath;
};

const getRandomUrl = () => {
  const url = `http://www.${randomWord()}.${getRandomDomain()}`
  return url;
};

const getRandomImgUrl = () => {
  let url = `http://www.${randomWord()}.${getRandomDomain()}/${getRandomPath()}/${randomWord()}.png`;
  return url;
};

module.exports = () => {
  const sampleAd = {
    id: getRandomId(),
    tags: randomWords({ min: 0, max: 24 }),
    img: getRandomImgUrl(),
    category: getRandomCategory(),
    siteLink: getRandomUrl(),
  };
  
  return sampleAd;
};