


function toCommas(num) {
    var int = parseInt(num)
    return int.toLocaleString("en-US")
}

function capitalize(name) {
  return name.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
} 

function toMils(num) {
  var str = num.toString()
  var digits = str.length
  var toReturn = ""
  if (digits == 8) {
    toReturn = str.substring(0, 2)
  } else if (digits == 9) {
    toReturn = str.substring(0, 3)
  }
  var rounded = parseInt(toReturn)
  var final = Math.floor(rounded / 5) * 5
  return final
}

$( document ).ready(function() {
  d3.csv("Creators.csv").then(data => {
    console.log(data)
    d3.shuffle(data)
    var follows = 0
    data.forEach(d => {
      follows += parseInt(d.Following)
      $(".marquee-content").append(`<div class="marquee-item"><img src="${d.ProfilePicture}"/><h6>@${d.Handle}</h6><p>${toCommas(d.Following)}</p></div>`)
      $(".signs").append(`<li>${capitalize(d.Name)}</li>`)
    })
    data.forEach(d => {
      $(".marquee-content").append(`<div class="marquee-item"><img src="${d.ProfilePicture}"/><h6>@${d.Handle}<h6><p>${toCommas(d.Following)}</p></div>`)
    })
    $(".following").text(toMils(follows)) 
    var items = $('.signs > li').get();
    items.sort(function(a,b){
      var keyA = $(a).text();
      var keyB = $(b).text();
    
      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    });
    var ul = $('.signs');
    $.each(items, function(i, li){
      ul.append(li); /* This removes li from the old spot and moves it */
    });
  })
  
})