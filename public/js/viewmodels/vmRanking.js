var ranking = ko.observableArray([]);//needed historical ranking
var weekly_ranking = ko.observableArray([]);//needed for a weekly ranking
var position_ranking=ko.observable(1);
var position_wranking=ko.observable(1);


function RankingViewModel() {
    var self = this;
    //parameters of historical ranking
    self.selected_weekly_hero = ko.observable();
    self.ranking_page_number = 1;
    self.ranking_page_size = 10;
    self.ranking_is_lastpage = ko.observable(true);
    self.value=1;

    //parameters of weekly ranking
    self.weekly_hero = ko.observable();
    self.weekly_ranking_page_number = 1;
    self.weekly_ranking_page_size = 10;
    self.weekly_ranking_is_lastpage = ko.observable(true);
    self.wvalue=1;
    position_ranking=1;


    HistoricalRanking = function() {
        Dajaxice.bee.dajax_bee_historical_ranking(HistoricalRankingCallback,{'page_number': self.ranking_page_number,
			                                                                 'page_size'  : self.ranking_page_size});
    };

    function HistoricalRankingCallback(data) {
        var ranking_index=0;
        var id_bee=data.id_bee;
        var avatar_src = default_avatar_large; //default avatar
        self.ranking_page_number++;
        self.ranking_is_lastpage(data.last_page);
        data.content.forEach(function(data_ranking){
            ranking.push(new Person(null,null,data_ranking.name,null, avatar_src,null,null,data_ranking.love_score,null,null, data_ranking.short_url));
            if (data_ranking.id_bee==id_bee){
                ranking()[ranking_index].full_name("You");
            };
            ranking_index++;
            position_ranking=1+self.value++;
            // Validate if have avatar:
		    if(data_ranking.id_avatar != null && data_ranking.id_avatar != "") {
                findRankingOwnerAvatar(ranking().length-1, data_ranking.id_avatar);
		    };
        });
    };

     WeeklylRanking = function() {
         Dajaxice.bee.dajax_bee_weekly_ranking(WeeklyRankingCallback,{'page_number': self.weekly_ranking_page_number,
			                                                          'page_size'  : self.weekly_ranking_page_size});
     };

    function WeeklyRankingCallback(data){
        var wranking_index=0;
        var avatar_src = default_avatar_large;//default avatar
        var id_bee=data.id_bee;
        self.weekly_ranking_page_number++;
        data.content.forEach(function(data_wranking){
            weekly_ranking.push(new Person(data_wranking.id_bee,null,data_wranking.name,null, avatar_src,null,null,data_wranking.love_score,null,null,data_wranking.short_url));

            if (data_wranking.id_bee==id_bee){
                weekly_ranking()[wranking_index].full_name("You");
            };
            wranking_index++;
            position_wranking=1+self.wvalue++;

            // Validate if have avatar:
		    if(data_wranking.id_avatar != null && data_wranking.id_avatar != "") {
                findRankingAvatar(weekly_ranking().length-1, data_wranking.id_avatar);
		    };
        });
        self.weekly_hero(weekly_ranking()[0]);//this is temporal
    };


     //find Avatar
     findRankingOwnerAvatar = function(ranking_index, id_avatar){
		        Dajaxice.resource.dajax_resource_find(findRankingOwnerAvatarCallback, {'id_resource' : id_avatar, 'array_index': ranking_index,
                                                                                      'resource_width': 40, 'resource_height': 40});
	 };

	 function findRankingOwnerAvatarCallback(data){
                //set data to avatar_src
		        ranking()[data.array_index].avatar_src('data:'+data.content_type+';base64,'+data.binary_content);
	 };

     //find Avatar
     findRankingAvatar = function(wranking_index, id_avatar){
		        Dajaxice.resource.dajax_resource_find(findRankingAvatarCallback, {'id_resource' : id_avatar, 'array_index': wranking_index,
                                                                                  'resource_width': 40, 'resource_height': 40});
	 };

	 function findRankingAvatarCallback(data){
                //set data to avatar_src
		        weekly_ranking()[data.array_index].avatar_src('data:'+data.content_type+';base64,'+data.binary_content);
	 };


}
//apply bindind to RankingViewModel to class
//http://stackoverflow.com/questions/8662743/can-i-applybindings-to-more-than-one-dom-element-using-knockout
$(".bindableRanking").each(function(){
    ko.applyBindings(RankingViewModel(), $(this).get(0));
});
//ko.applyBindings(RankingViewModel(), document.getElementById("divRankingViewModel"));