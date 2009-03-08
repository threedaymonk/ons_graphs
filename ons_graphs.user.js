// ONS Graphs
//
// Generate graphs in the browser for "timeline
// datasets":http://www.statistics.gov.uk/statbase/tsdtimezone.asp on the UK
// "Office for National Statistics":http://www.statistics.gov.uk/ website.
//
// See http://github.com/threedaymonk/ons_graphs for more information.
//
// ==UserScript==
// @name           ONS Graphs
// @namespace      http://rewiredstate.org/
// @description    Generate graphs in the browser for timeline datasets on the Office for National Statistics website.
// @include        http://www.statistics.gov.uk/statbase/*
// ==/UserScript==

ONSGraphs = {
  loadJQuery: function(){
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);
  },

  waitForJQueryToLoad: function() {
    if(typeof unsafeWindow.jQuery == 'undefined'){
      window.setTimeout(ONSGraphs.waitForJQueryToLoad,100);
    } else {
      var $ = unsafeWindow.jQuery;
      $.getScript('http://flot.googlecode.com/svn/trunk/excanvas.js', function(){
        $.getScript('http://flot.googlecode.com/svn/trunk/jquery.flot.js', function(){
          $.getScript('http://plugins.jquery.com/files/jquery.graphTable-0.2.js.txt', function(){
            ONSGraphs.drawGraph();
            ONSGraphs.addLabelTranslations();
            ONSGraphs.loadCustomCss();
          })
        })
      })
    }
  },

  go: function(){
    ONSGraphs.loadJQuery();
    ONSGraphs.waitForJQueryToLoad();
  },

  drawGraph: function(){
    ONSGraphs.dataTableElement().graphTable({ series:   'columns',
                                              position: 'before',
                                              height:   '400' });
  },

  addLabelTranslations: function(){
    var table = document.createElement('table');
    table.setAttribute('class', 'seriesLabels');
    unsafeWindow.jQuery.each(ONSGraphs.seriesLabelTranslations(), function(key, value){
      var tr = document.createElement('tr');
      var th = document.createElement('th');
      th.appendChild(document.createTextNode(key));
      tr.appendChild(th);
      var td = document.createElement('td');
      td.appendChild(document.createTextNode(value));
      tr.appendChild(td);
      table.appendChild(tr);
    });
    ONSGraphs.dataTableElement().before(table);
  },

  loadCustomCss: function(){
    GM_addStyle('.seriesLabels tr, .seriesLabels td { font-size: 10px; } .seriesLabels { margin: 1em 0; }');
  },

  dataTableElement: function(){
    return unsafeWindow.jQuery('table[rules=all]');
  },

  seriesLabelTranslations: function(){
    var translations = {};
    var $ = unsafeWindow.jQuery;
    $('p>table>tbody>tr').each(function(){
      var key = $(this).find('td:first').text();
      if (key != ''){
        var value = $(this).find('td:last').text();
        translations[key] = value;
      }
    });
    return translations;
  }
}
ONSGraphs.go();
