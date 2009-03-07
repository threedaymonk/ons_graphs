// ==UserScript==
// @name           ONS Graphs
// @namespace      http://rewiredstate.org/
// @include        http://www.statistics.gov.uk/*
// ==/UserScript==

ONSGraphs = {
  loadScripts: function(){
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://po-ru.com/ons-graph/monster.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);
  },

  waitForScriptsToLoad: function() {
    if(typeof unsafeWindow.jQuery == 'undefined') {
      window.setTimeout(ONSGraphs.waitForScriptsToLoad,100);
    } else {
      ONSGraphs.drawGraph();
      ONSGraphs.addLabelTranslations();
    }
  },

  go: function(){
    ONSGraphs.loadScripts();
    ONSGraphs.waitForScriptsToLoad();
  },

  drawGraph: function(){
    ONSGraphs.dataTableElement().graphTable({ series: 'columns',
                                              position: 'before',
                                              height: '400' });
  },

  addLabelTranslations: function(){
    var table = document.createElement('table');
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
