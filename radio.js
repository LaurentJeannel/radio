exports.action = (data)=>{

var request = require('request'); var cheerio = require('cheerio'); var exec = require('child_process').exec;
        
try{
     var reg="/"+data.radio+"(.+)/i" ; var rgxp = eval(reg) ; var temp = JarvisIA.reco.match(rgxp) ; console.log(temp)
     var radio=temp[1].trim()
}catch(err){console.log('rien en 1, erreur de reco !');JarvisIARadio('');return}

if(radio.search('nrj')>-1){radio=radio+" france"}
radio=radio.replace(new RegExp(" ","gi"),"-")

request({'uri':'http://fluxradios.blogspot.com/2014/07/flux-url-'+radio+'.html', 'headers':{'Accept-Charset': 'UTF-8'},'encoding':'binary' },  (error, response, html) =>{

  try{
    var $ = cheerio.load(html,{ xmlMode: true, ignoreWhitespace: true, lowerCaseTags: false });
    var url1 = $( '#Blog1 > div.blog-posts.hfeed > div > div > div > div.post.hentry.uncustomized-post-template').text()//;
    url1=url1.split('Les flux') ; url1=url1[1].split(' ') ; //console.log(url1)

    for(var i=0;i<url1.length;i++){
        if(url1[i].search('htt')>-1){
          var radiourl=url1[i]
          radiourl=radiourl.split('\\n')
          radiourl=radiourl[0]
          radiourl=radiourl.trim()
          radiourl=JSON.stringify(radiourl)
          console.log(radiourl,' trouvé')
          JarvisIARadio(radiourl)
          return
      }
     
    }
   JarvisIARadio('') 
  }
  catch(err){console.log('rien en 2, on coupe par defaut');JarvisIARadio('');return}  
})
return   
}