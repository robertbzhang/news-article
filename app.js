(function() {
'use strict';

angular.module('ArticleListApp', [])
.controller('ArticleListController', ArticleListController);

ArticleListController.$inject = ['$http'];
function ArticleListController($http) {
  var list = this;
  list.url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

  list.input = "";
  list.articles = [];
  list.page = 1;
  list.submitted = false;

  list.getData = function (input) {
    if (input.length !== 0) {
      list.submitted = true;
      var key = "86bc5f68262843459494141a48ffdcef";
      var input = input.toLowerCase();

      return $http({
        method: "GET",
        url: list.url + "?q=" + input + "&api-key=" + key + "&sort=newest&page=" + list.page
      }).then(function (response) {
        list.articles = response.data.response.docs;
        console.log(response.data.response.docs);
      })
    }
  }

  list.previous = function () {
    list.page--;
    list.getData(list.input);
    console.log(list.page);
  }

  list.next = function () {
    list.page++;
    list.getData(list.input);
    console.log(list.page);
  }
}
})();
