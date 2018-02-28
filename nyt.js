var term;
var limit;
var startDate;
var endDate;
//40a0d8e56ff84c42ae6b9d78e99bcc95
$(document).ready(function(){
$('#search').on('click', function(){
    event.preventDefault();
    term = $('#search-term').val();
    limit = $('#records-num').val();
    if($('#start-year').val() === ""){
        startDate = 1851;
    } else {
        startDate = $('#start-year').val();
    }
    if($('#end-year').val() === ""){
        endDate = 2020;
    } else {
        endDate = $('#end-year').val();
    }
    console.log(term);
    console.log(startDate);
    console.log(endDate);
    var queryUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=40a0d8e56ff84c42ae6b9d78e99bcc95&q=" + term + "&begin_date=" + startDate + "0101&end_date=" + endDate +"0101";
    
    $.ajax({
        url: queryUrl,
        method: 'GET'
    }).then(function(info){
        console.log(info);
        for (var i = 0; i < limit; i++){
            var article = $('<div></div>').addClass('final-article');
            var numTitle = $('<div></div>');
            var title = $('<span></span>');
            console.log(info.response.docs[i].headline.main);
            title.text(info.response.docs[i].headline.main);
            var num = $('<span></span>').addClass('number');
            num.text(i+1);
            numTitle.append(title).prepend(num);
            var author = $('<p></p>');
            author.text(info.response.docs[i].byline.original);
            var date = $('<p></p>');
            date.text(info.response.docs[i].pub_date);
            var url = $('<a></a>').attr('href', info.response.docs[i].web_url);
            url.text(info.response.docs[i].web_url);
            article.append(numTitle).append(author).append(date).append(url);
            $('.articles-here').append(article);
        }
        
        
    });
});
});

// year: 1851