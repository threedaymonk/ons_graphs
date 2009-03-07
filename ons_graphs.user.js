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
    }
  },

  go: function(){
    ONSGraphs.loadScripts();
    ONSGraphs.waitForScriptsToLoad();
  },

  drawGraph: function(){
    ONSGraphs.dataTableElement().graphTable({series: 'columns', position: 'before', height: '400'});
  },

  dataTableElement: function(){
    return unsafeWindow.jQuery('table[rules=all]');
  },

  mapHeadings: function(){
  }
}
ONSGraphs.go();
