$(document).ready(function(){
  var refresh_stocks_table = function(){
    $.ajax({
      dataType: "script",
      type: "get",
      url: "/users/refresh_table"
    });
  };

  // $("#refresh_stocks").on('click', refresh_stocks_table);

  setInterval(refresh_stocks_table, 1000);
});