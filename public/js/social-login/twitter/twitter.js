  function reward_user( event ) {
           if ( event ) {//if event ='tweet'
        	  if(object_type=="BEE") {
                  operationFly(self.selected_cause().id_cause, "BEE", causeFlyActionWithTwitterCallback, causes().indexOf(self.selected_cause()))  
        	  }
        	  else if(object_type=="POST"){
                  operationFly(self.selected_post().id_post, "POST", postFlyActionWithTwitterCallback, posts().indexOf(self.selected_post()))
        	  }
        	  else
        	  {
        		  operationFly(awardSelected().id_award, "AWARD", awardFlyActionWithTwitterCallback, awards().indexOf(awardSelected()))
        	  }
            }
  }
  
  //Fly Action Cause With Twitter Callback 
  function causeFlyActionWithTwitterCallback(data){
      if ("error" in data){
          alert(data.error);
      }
      else{
    	  if(location.href.indexOf("/show?id=") == -1){
              causes()[data.array_index].fly_counter(causes()[data.array_index].fly_counter() + 1);
    	  }
    	  else{
    		  self.selected_cause().fly_counter(self.selected_cause().fly_counter() + 1);
    	  }
      }
  }
  
  //Fly Action Post With Twitter Callback 
  function postFlyActionWithTwitterCallback(data){
	  console.log(data);
      if ("error" in data){
          alert(data.error);
      }
      else{
          posts()[data.array_index].fly_counter(posts()[data.array_index].fly_counter() + 1);
      }
  }
  
  //Fly Action Post With Twitter Callback 
  function awardFlyActionWithTwitterCallback(data){
	  console.log(data);
      if ("error" in data){
          alert(data.error);
      }
      else{
    	  awards()[data.array_index].fly_counter(awards()[data.array_index].fly_counter() + 1);
      }
  }
  
  window.twttr = (function (d,s,id) {
  var t, js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return; js=d.createElement(s); js.id=id;
  js.src="//platform.twitter.com/widgets.js"; fjs.parentNode.insertBefore(js, fjs);
  return window.twttr || (t = { _e: [], ready: function(f){ t._e.push(f) } });
  }(document, "script", "twitter-wjs"));
      twttr.ready(function (twttr) {
         twttr.events.bind('tweet', reward_user);
   });