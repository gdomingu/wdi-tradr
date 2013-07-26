$(document).ready(function(){
  // Refresh stocks table with latest data.
  if ($("#stocks").length) {
    var refresh_stocks_table = function(){
      $.ajax({
        dataType: "script",
        type: "get",
        url: "/users/refresh_table"
      });
    };

    $("#refresh_stocks").on('click', refresh_stocks_table);

    // setInterval(refresh_stocks_table, 1000);
  }

  // Initialize a global variable to track graph reloaders.
  window.reloaders = [];

  var update_all_graphs = function(){
    if(window.reloaders.length > 0){
      console.log("Updating graphs for " + window.reloaders.join(", "));

      $.each(window.reloaders, function(i, symbol){
        window.do_graph(symbol);
      });
    }
  };
  setInterval(update_all_graphs, 2000);

  // Request a new graph is generated for a given symbol.
  window.do_graph = function(symbol){
    var graph_request = $.ajax({
      dataType: "script",
      type: "get",
      url: "/stocks/data/" + symbol
    });

    // After making the AJAX request to generate the graph,
    // set a reloader to live-update the graph's data.
    graph_request.done(function(){
      // But only add the reloader if it's not already present.
      if(window.reloaders.indexOf(symbol) < 0){
        window.reloaders.push(symbol);
      }
    });
  };

  // Handle the click of a checkbox.
  var process_checkbox = function(){
    var clicked_symbol = $(this).val();

    if($(this).is(':checked')){
      window.do_graph(clicked_symbol);
    }

    // If the checkbox was just unchecked, remove the symbol from the list of reloaders
    // and remove the graph from the page.
    else{
      index_of_clicked_symbol = window.reloaders.indexOf(clicked_symbol);
      window.reloaders.splice(index_of_clicked_symbol, 1);

      $("#" + clicked_symbol + "_graph").remove();
    }
  };

  $("#checkboxes").on("click", ".company_checkbox", process_checkbox);
});