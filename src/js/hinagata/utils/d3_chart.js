// D3 chart
var d3 = require('../../../../lib/components/d3/d3');
require('../../../../lib/components/d3/d3.tip');
var moment = require('../../../../lib/components/jquery/moment.js');

module.exports = (function () {

    var D3ChartsUtil = {
        generateDonutPieChart: function(options) {
            var width = options.widthChart,
                height = options.widthChart,
                radius = Math.min(width, height) / 2,
                donutWidth = 20;
            var dataset = options.dataset;
            var valueUnitArr = options.valueUnitArr;
            var totalText = App.appModel.getLanguageType().dashboard.main.total;
            var chartId = options.container.split(" ")[0];
            var chartParentId = options.chartId;
            if ( $("#" + options.container).length <= 0 ) {
                return;
            }

            if ( options.container.indexOf("zoom-chart") >= 0 ) {
                donutWidth = 25;                
            }           

            var color = d3.scale.category10();
            var svg = d3.select("#" + options.container)
                .append('svg')
                .attr('width', width)
                .attr('height', height)
                .append('g')
                .attr('transform', 'translate(' + (width / 2) +
                ',' + (height / 2) + ')');
            
            var arcOver = d3.svg.arc();
            var arc = d3.svg.arc();
            if ( options.type === "donut") {
                arc.innerRadius(radius - donutWidth)
                   .outerRadius(radius);  
                arcOver.innerRadius(60).outerRadius(80);
                if ( options.container.indexOf("zoom-chart") >= 0 ) {
                    arcOver.innerRadius(90).outerRadius(120);
                }
                
            } else if ( options.type === "pie" ) {
                arc.innerRadius(0)
                   .outerRadius(radius);
                arcOver.innerRadius(0).outerRadius(80);
                if ( options.container.indexOf("zoom-chart") >= 0 ) {
                    arcOver.innerRadius(0).outerRadius(120);
                }             
            }
            var pie = d3.layout.pie()
                .value(function(d) { 
                    if (d.count === null){
                        return 0;
                    } else {
                        return d.count;
                    }
                    })
                .sort(null);   
            var g = svg.selectAll(".arc")
                .data(pie(dataset))
                .enter().append("g")
                .attr("class", "arc");
                g.append("path")
                // .attr("d", arc)
                .style("fill", function(d) { return color(d.data.label); })
                .on("contextmenu", function(d) { 
                        var elementG = this.parentElement.parentElement.parentElement.parentElement;
                        var idParent = $(elementG).attr('id');
                        var parentObj = this.parentElement;
                        var index = $(parentObj).index() + 1;  
                        $('#' + chartParentId + ' .listbtnact button').removeClass('hider');
                        $('#' + chartParentId + ' .viewall').hide(); 
                        $('#' + chartParentId + ' .listbtnact button').removeClass('hider');
                        $('#' + chartParentId + ' .listbtnact button:nth-child(' + index + ')').addClass('hider');
                        $('#' + chartParentId + ' .viewall').show();
                        var valueTooltip = $(objG).find('text').text();
                        $(this.parentElement.parentElement.parentElement.parentElement).find('.label .total1').text(valueTooltip).show();
                        $(this.parentElement.parentElement.parentElement.parentElement).find('.label .total').hide();
                        if ( options.type === "donut") { 
                            arcOver.innerRadius(60).outerRadius(80);
                        } else {
                            arcOver.innerRadius(0).outerRadius(80);
                        }
                        
                        if ( options.container.indexOf("zoom-chart") >= 0 ) {
                            $('#modal-zoom-chart .listbtnact button').removeClass('hider');
                            var parentClass = $('#modal-zoom-chart').find('svg').parent().parent().parent();
                            var indexParent = $(parentClass).attr('class');
                            var objG = this.parentElement;
                            var indexG = $(objG).index() + 1;
                            if ( options.type === "donut") { 
                                arcOver.innerRadius(90).outerRadius(110);
                            } else {
                                arcOver.innerRadius(0).outerRadius(110);
                            }
                            
                            var valueTooltip = $(objG).find('text').text();
                            $(this.parentElement.parentElement.parentElement.parentElement).find('.label .total1').text(valueTooltip).show();
                            $(this.parentElement.parentElement.parentElement.parentElement).find('.label .total').hide();
                       
                                                       
                            $('#modal-zoom-chart .listbtnact button:nth-child(' + indexG + ')').addClass('hider');         
                        }  
                        d3.select(this).transition()
                           .duration(100)
                           .attr("d", arcOver).attr('id', 'trueSelect');              
                     })
                        .on("click", function(d) {
                        if ( $(this).attr('id') === 'trueSelect' ){
                            $('#modal-zoom-chart .tooltip .label .total').show();
                            $('#modal-zoom-chart .tooltip .label .total1').hide();
                            var chartTarget = $('#' + chartParentId).children().children().attr('class');
                            if ( options.type === "donut") { 
                                arcOver.innerRadius(45).outerRadius(65);
                            } else {
                                arcOver.innerRadius(0).outerRadius(65);
                            }
                            if ( options.container.indexOf("zoom-chart") >= 0 ) {
                                if ( options.type === "donut") { 
                                    arcOver.innerRadius(55).outerRadius(80);
                                } else {
                                    arcOver.innerRadius(0).outerRadius(80);
                                }
                            }
                            d3.select(this).transition()
                               .duration(100)
                               .attr("d", arc).attr('id', 'falseSelect');
                            $('#' + chartParentId + ' .viewall').hide();
                            $('#' + chartParentId + ' .listbtnact button').removeClass('hider'); 
                        } else {    
                            resetPieDonut();                       
                            var elementG = this.parentElement.parentElement.parentElement.parentElement;
                            var idParent = $(elementG).attr('id');
                            var parentObj = this.parentElement;
                            var index = $(parentObj).index() + 1;  
                            $('#' + chartParentId + ' .listbtnact button').removeClass('hider');
                            $('#' + chartParentId + ' .viewall').hide(); 
                            $('#' + chartParentId + ' .listbtnact button:nth-child(' + index + ')').addClass('hider');
                            $('#' + chartParentId + ' .viewall').show();
                            var valueTooltip = $(objG).find('text').text();
                            $(this.parentElement.parentElement.parentElement.parentElement).find('.label .total1').text(valueTooltip).show();
                            $(this.parentElement.parentElement.parentElement.parentElement).find('.label .total').hide();

                            if ( options.type === "donut") { 
                                arcOver.innerRadius(60).outerRadius(80);
                            } else {
                                arcOver.innerRadius(0).outerRadius(80);
                            }

                            if ( options.container.indexOf("zoom-chart") >= 0 ) {
                                $('#modal-zoom-chart .listbtnact button').removeClass('hider');
                                var parentClass = $('#modal-zoom-chart').find('svg').parent().parent().parent();
                                var indexParent = $(parentClass).attr('class');
                                var objG = this.parentElement;
                                var indexG = $(objG).index() + 1;
                                if ( options.type === "donut") { 
                                    arcOver.innerRadius(90).outerRadius(110);
                                } else {
                                    arcOver.innerRadius(0).outerRadius(110);
                                }                

                                var valueTooltip = $(objG).find('text').text();
                                $(this.parentElement.parentElement.parentElement.parentElement).find('.label .total1').text(valueTooltip).show();
                                $(this.parentElement.parentElement.parentElement.parentElement).find('.label .total').hide();
                                $('#modal-zoom-chart .listbtnact button:nth-child(' + indexG + ')').addClass('hider');         
                        }  
                        d3.select(this).transition()
                           .duration(100)
                           .attr("d", arcOver).attr('id', 'trueSelect');
                        $('#' + chartParentId + ' .viewall').show();                        
                        }                 
                     })
                .transition().delay(function(d, i) { return i * 20; }).duration(20)
                .attrTween('d', function(d) {
                    var i = d3.interpolate(d.startAngle+0.1, d.endAngle);
                    return function(t) {
                        d.endAngle = i(t);
                        return arc(d);
                    }
                });
            
            function resetPieDonut (){
                var classLength = $('.selectPath').length;
                                var pathLength = $('#' + chartParentId + ' .listbtnact button').length;
                                var parentPath = $('#' + chartParentId).children().children().attr('class');
                                for(var i=0;i<classLength; i++){
                                    var indexC = i + 1;

                                    $('#' + chartParentId + ' .active_chart #' + chartParentId + indexC + ' .selectPath').attr('id', 'removePath').removeClass('selectPath');
                                    var path = document.getElementById('removePath');
                                    if(parentPath === 'donut-inner'){
                                        arc.innerRadius(45).outerRadius(65); 
                                    } else if (parentPath === 'pie-inner'){
                                        arc.innerRadius(0).outerRadius(65);
                                    }
                                    if ( options.container.indexOf("zoom-chart") >= 0 ) {
                                         if(parentPath === 'donut-inner'){
                                            arc.innerRadius(55).outerRadius(80); 
                                        } else if (parentPath === 'pie-inner'){
                                           arc.innerRadius(0).outerRadius(80);
                                        }        
                                    }
                                    d3.select(path).transition()
                                       .duration(100)
                                       .attr("d", arc);
                                    $('#' + chartParentId + indexC + ' .tooltip .label .total').show();
                                    $('#' + chartParentId + indexC + ' .tooltip .label .total1').hide();
                                    $('#removePath').attr('id', '');
                                    
                                }
                                $('#' + chartParentId + ' .listbtnact button').removeClass('hider');
                                $('.viewall').hide();
             }
            var total = d3.sum(dataset.map(function(d) {
                return d.count;
            }));

            var setTooltipValue = function( value, i ) {
                var valueUnit = valueUnitArr[0];
                var value = value;
                if ( valueUnit === "percent" ) {
                    if ( i === dataset.length - 1 ) {
                        var beforCount = 0;
                        var lastCount = 0;
                        dataset.forEach(function(d, index) {
                            if ( i === index ) {
                                lastCount = 100 - beforCount;
                            } else {
                                beforCount += Math.round(App.util.text.parseNumberToPercent(d.count, total));
                            }
                        });
                        value = lastCount;
                    } else {
                        value = Math.round(App.util.text.parseNumberToPercent(value, total));
                    }
                    value += "%";
                }
                return value;
            };
                g.append("text")
                    .attr("dy", ".35em")
                    .attr("text-anchor", "middle")
                    .style("display", "none")
                    .attr("transform", function(d) {
                        return "translate(" + arc.centroid(d) + ")";
                    })
                    .text(function(d, i, j) {
                        return setTooltipValue( d.data.count, i );
                    })
                    .style('fill', function(d){
                        return color(d.data.label);
                    });

            
            var setLegend = function(element) {
                var w_chart = $("#" + chartParentId + element).width();
                var classLength = dataset.length;
                var w_legend = 14;
                if ( options.container.indexOf("zoom-chart") >= 0 ) {
                    w_legend = 18;
                }
                for(var i = 0; i < classLength; i++) {
                    var index = i + 1;
                    
                    $('#' + chartParentId + element + ' .listbtnact').append('<button data-chart-id="'+ chartId +'""><em></em></button>');
                    $('#' + chartParentId + element + ' .listbtnact button:nth-child(' + index + ') em').css({'background': color(dataset[i].label)});
                    $('#' + chartParentId + element + ' .listbtnact button:nth-child(' + index + ')').append('<span>' + dataset[i].label + '</span>');
                    if ( classLength <= 5 ){
                        // $('#' + chartParentId + element + ' .listbtnact button:nth-child(' + index + ')').css({'max-width': 140 + 'px'});
                    } else {
                        $('#' + chartParentId + element + ' .listbtnact button:nth-child(' + index + ')').css({'max-width': w_chart/3 + 'px'});
                    }
                }
                function resetSingle(){ 
                    var path = document.getElementById('trueSelect');
                    var parentChart = $('#trueSelect').parents().eq(5).attr('class');
                    console.log(parentChart);
                    if ( options.container.indexOf("zoom-chart") >= 0 ) {
                         if ( options.type === "donut") {   
                          arc.innerRadius(55).outerRadius(80); 
                         }else{
                            //pie
                             arc.innerRadius(0).outerRadius(80); 
                         }
                           
                    }else {
                         if ( parentChart === "donut-inner") {   
                            arc.innerRadius(45).outerRadius(65);
                         }else{
                            //pie
                             arc.innerRadius(0).outerRadius(65); 
                         }
                            
                    } 
                        

                d3.select(path).transition()
                   .duration(100)
                   .attr("d", arc).attr('id', 'falseSelect');
                }
                var btnIndex = $('#' + chartParentId + ' .listbtnact button');
                            btnIndex
                            .on("click", function(e){                                
                                var _this = $(e.currentTarget);              
                                resetSingle();
                                if ( $(_this).attr('class') !== 'hider' ){                                   
                                resetPieDonut();
                                var indexM = _this.index();
                                var idSelector = _this.parent().parent().attr('class');
                                var parentSelector = _this.parent().parent().parent().addClass('active_chart');                                                         
                                var index = indexM + 1;                                
                                $('#' + chartParentId + ' .arc path').attr('id', '');
                                $('#' + chartParentId + ' .listbtnact button').removeClass('hider');
                                $('#' + chartParentId + ' .active_chart .listbtnact button:nth-child(' + index + ')').addClass('hider');
                                if (idSelector != "chartLine"){
                                    var chartLength = $('#' + chartParentId + ' .donut_chart').length;
                                    var path, dataC;
                                        
                                        for(var b=0; b < chartLength; b++){
                                            var indexC = b + 1;
                                            $('#' + chartParentId + ' .active_chart #' + chartParentId + indexC + ' .arc:nth-child(' + index + ') path').removeClass('selectPath');
                                            $('#' + chartParentId + ' .active_chart #' + chartParentId + indexC + ' .arc:nth-child(' + index + ') path').attr('id', 'selectPath').attr("class", "selectPath");
                                            path = document.getElementById('selectPath'); 

                                        if ( idSelector === "donut-inner" ) {
                                            arcOver.innerRadius(60).outerRadius(80);  
                                            if ( options.container.indexOf("zoom-chart") >= 0 ) {
                                                arcOver.innerRadius(90).outerRadius(120);
                                            }
                                        } 
                                        else if ( idSelector === "pie-inner" ) {
                                            arcOver.innerRadius(0).outerRadius(80); 
                                            if ( options.container.indexOf("zoom-chart") >= 0 ) {
                                                arcOver.innerRadius(0).outerRadius(120);
                                            }                              
                                        }   
                                    
                                        d3.select(path).transition()
                                       .duration(100)
                                       .attr("d", arcOver);
                                       $('#selectPath').attr('id', '');
                                       var valueTooltip = $(path).parent().find('text').text();
                                       $('#' + chartParentId + ' .active_chart #' + chartParentId + indexC + ' .label .total').hide();
                                       $('#' + chartParentId + ' .active_chart #' + chartParentId + indexC + ' .label .total1').text(valueTooltip).show();
                                        }
                                }
                                var colorTooltip = $(_this).find('em').attr('background');
                                if ( options.container.indexOf("zoom-chart") >= 0 ) {
                                    var hiderLength = $('#modal-zoom-chart .listbtnact .hider');
                                    var typeChart = _this.parent().parent().attr('class');
                                    $('#modal-zoom-chart .listbtnact button').removeClass('hider');
                                    $('#modal-zoom-chart .listbtnact button:nth-child(' + index + ')').addClass('hider');
                                    switch (typeChart) {
                                        case 'donut_chart_board':
                                        arcOver.innerRadius(90).outerRadius(120);
                                        break;
                                        case 'pie_chart_board':
                                        arcOver.innerRadius(0).outerRadius(120);
                                        break;
                                    }

                                    if ( hiderLength ) {
                                            $('#modal-zoom-chart .viewall').show();
                                    }
                                }                             
                                $(_this).parent().parent().find('.viewall').show();
                                $('#' + chartParentId + ' .tooltip .total').css({'color': 'rgb(46, 48, 146)'});
                                $('#' + chartParentId + ' .tooltip .total1').css({'color': 'rgb(46, 48, 146)'});
                                }
                                else if ($(_this).attr('class') === 'hider'){
                                    resetPieDonut();
                                    var parentSelect = $('#trueSelect').parents().eq(3).attr('id');
                                    $('#' + parentSelect + ' .tooltip .total').show();
                                    $('#' + parentSelect + ' .tooltip .total1').hide();
                                    $('#' + chartParentId + ' .tooltip .total').css({'color': 'rgb(46, 48, 146)'});
                                    $('#' + chartParentId + ' .tooltip .total1').css({'color': 'rgb(46, 48, 146)'});
                                }
                            });
             
                var viewAllBtn = $('#' + chartParentId + ' .viewall');
                        viewAllBtn.on("click", function(){
                        var parentPath = $('#selectPath').parent().parent().parent().parent().attr('id');
                        resetPieDonut();
                        resetSingle();
                        $('#' + chartParentId + ' .listbtnact button').removeClass('hider');
                        $('#' + chartParentId + ' .tooltip .total').show();
                        $('#' + chartParentId + ' .tooltip .total1').hide();
                        $('#' + chartParentId + ' .tooltip .label').css({'color': 'rgb(46, 48, 146)'});
                 });
            };
            if ( options.type === "pie" && options.legend ) {
                setLegend(" .pie_chart_board");
            } else if ( options.type === "donut" && options.legend ) {
                setLegend(" .donut_chart_board");
            }

            
            var tooltip = d3.select('#' + options.container)
                .append('div')
                .attr('class', 'tooltip');
                tooltip.append('div') // NEW
                .attr('class', 'label');
            var label = d3.select('#' + options.container + ' .tooltip .label')
                .append('span')
                .attr('class','total');
                label.append('span')
                .attr('class','total1');

            // display total
            
            var setTooltipValueUnit = function(d) {
                tooltip.select('.label')
                        .style('color', "#2e3092")
                        .html("<span class='total'>" + totalText + "<span style='display: block;'>" + total + "</span></span><span class='total1'></span>");
                tooltip.style('display', 'block');
            }
                
            setTooltipValueUnit();
            if ( options.container.indexOf("zoom-chart") === -1 ) {

                g.on('contextmenu', function(obj, i , j) {
                    var percent = Math.round(1000 * obj.data.count / total) / 10;
                        tooltip.select('.total1').html(obj.data.count);
                    
                    tooltip.select('.label').style('color', function(d){
                        return color(obj.data.label);
                    });
                    tooltip.style('display', 'block');
                });

                    g.on('click', function(obj, i , j) {
                        if ( $(this).children().attr('id') === 'trueSelect'){
                            setTooltipValueUnit();
                        } else {
                            tooltip.select('.total1').html(obj.data.count);
                    
                            tooltip.select('.label').style('color', function(d){
                                return color(obj.data.label);
                            });
                            tooltip.style('display', 'block');
                        }
                        
                    });
                // }
            }
        },
        generateGroupedBarChart: function(options) {            
            var _this = this;
            var series = this.setSeriesGroupedBarChart(options);
            var valueUnitArr = options.valueUnitArr;
            var maxCountArr = options.maxCountArr;
            var typeMenu = options.typeMenu;
            var chartId = options.container.split(" ")[0];
            if ( options.chartFlg === "detail" ) {
                var margin = {top: 10, right: 10, bottom: 30, left: 40},
                    colors = ( options.type === "F" ) ? ["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"] : ["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"],
                    colorsTouch = ( options.type === "F" ) ? ["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"] : ["#191991","#8b19a6"];
            } else if ( options.chartFlg === "zoom" ) {
                var margin = {top: 0, right: 5, bottom: 10, left: 40},
                    colors = ["#000078", "#00a7bc", "#6C04A3", "#8C0098","#26A65B","#E87ED4", '#8870FF','#3E4651','#025159','#5659C9','#E7F76D','#92F22A',"#FD5B03", "#FEC606", "#3D8EB9", '#4572A7', '#63393E','#D33257', '#AA4643', '#89A54E', '#EBBD63','#80699B', '#3D96AE', '#DB843D','#CF000F', '#92A8CD', '#A47D7C', '#B5CA92', '#722809', '#B17E22', '#EEFF6B', '##BFE6EC'],
                    colorsTouch = ["#000078", "#00a7bc", "#6C04A3", "#8C0098","#26A65B","#E87ED4", '#8870FF','#3E4651','#025159','#5659C9','#E7F76D','#92F22A',"#FD5B03", "#FEC606", "#3D8EB9", '#4572A7', '#63393E','#D33257', '#AA4643', '#89A54E', '#EBBD63','#80699B', '#3D96AE', '#DB843D','#CF000F', '#92A8CD', '#A47D7C', '#B5CA92', '#722809', '#B17E22', '#EEFF6B', '##BFE6EC'];

                if(options.type === "C") {
                    colors = ["#000078"];
                    colorsTouch = ["#000078"];
                }
                margin.bottom = 65;
            } else {
                var margin = {top: 0, right: 5, bottom: 0, left: 40};
                if(options.type === "C"){
                    colors      = ["#000078"],
                    colorsTouch = ["#000078"];
                } else {
                    colors = ["#000078", "#00a7bc", "#6C04A3", "#8C0098","#26A65B","#E87ED4", '#8870FF','#3E4651','#025159','#5659C9','#E7F76D','#92F22A',"#FD5B03", "#FEC606", "#3D8EB9", '#4572A7', '#63393E','#D33257', '#AA4643', '#89A54E', '#EBBD63','#80699B', '#3D96AE', '#DB843D','#CF000F', '#92A8CD', '#A47D7C', '#B5CA92', '#722809', '#B17E22', '#EEFF6B', '##BFE6EC'],
                    colorsTouch = ["#000078", "#00a7bc", "#6C04A3", "#8C0098","#26A65B","#E87ED4", '#8870FF','#3E4651','#025159','#5659C9','#E7F76D','#92F22A',"#FD5B03", "#FEC606", "#3D8EB9", '#4572A7', '#63393E','#D33257', '#AA4643', '#89A54E', '#EBBD63','#80699B', '#3D96AE', '#DB843D','#CF000F', '#92A8CD', '#A47D7C', '#B5CA92', '#722809', '#B17E22', '#EEFF6B', '##BFE6EC'];
                }
            }

            var width = options.chartWidth - margin.left - margin.right, height = options.chartHeight - margin.top - margin.bottom;
            if ( series.length > 30 && options.chartFlg === "zoom") {
                var width2 = ( series.length * 60 ) - margin.left - margin.right;
                if(width2>width){
                    width = width2;
                   $('#' + options.container).css({'overflow-y': 'hidden', 'overflow-x': 'auto'});
                }
            }
            var x0 = d3.scale.ordinal()
                .rangeRoundBands([0, width], .1);

            var x1 = d3.scale.ordinal();

            var y = d3.scale.linear()
                .range([height, 0]);

            var color = d3.scale.ordinal()
                .range(colors);
            // var color = d3.scale.category10();
            var xAxis = d3.svg.axis()
                .scale(x0)
                .orient("bottom")
                .outerTickSize(1);

            var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left")
                .ticks(4)
                .tickSize(-width, 0, 0)
                .tickFormat(function(d) { if(d != 0) return parseInt(d, 10); });

            var groupNames = d3.keys(options.data);

            var tooltip = d3.select("#"+options.container).html("").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

            if ( options.chartFlg === "zoom" ) {                
                var list_legend = d3.select("#"+options.container).html("").append("div")
                .attr("class", "list_legend column");
            }

            var svg = d3.select("#"+options.container).append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .style('font-size', '12px')
                .style('font-weight', 'bold')
                .attr("fill", "#000078")
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            if ( options.chartFlg === "zoom" ) {               
                if ( options.displayValueFlg !== 2 && series.length < 30 ) {
                    // svg.style('font-size', '16px');
                }
            }

            function make_y_axis() {
              return d3.svg.axis()
                  .scale(y)
                  .orient("left")
                  .ticks(9)
            }
            //////////Draw/////////
            x0.domain(series.map(function(d) { return d.category; }));
            
            x1.domain(groupNames).rangeRoundBands([0, x0.rangeBand()]);
            y.domain([0, d3.max(series, function(d) {return 100; })]);


            if ( options.chartFlg === "detail" ) {
                svg.append("g")
                    .attr("class", "grid")
                    .call(make_y_axis()
                        .tickSize(-width, 0, 0)
                        .tickFormat("")
                    );

                svg.append("g")
                  .attr("class", "x axis")
                  .attr("transform", "translate(0," + height + ")")
                  .call(xAxis);

                svg.append("g")
                  .attr("class", "y axis")
                  .attr("transform", "translate(0," + width + ")")
                  .call(yAxis);
            } else if(options.chartFlg === "zoom" ) {
                svg.append("g")
                    .attr("class", "x axis")
                    // .attr('id', 'chartZoom')
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis)
                    .selectAll("text")
                    .style("text-anchor", "end")
                    .style("display", "none")
                    .style("font-size", "12px")
                    .attr("dx", "-.8em")
                    .attr("dy", ".15em")
                    .attr("transform", function(d) {
                        return "rotate(-65)" 
                    });
                    svg.append("g")
                      .attr("class", "y axis")
                      .call(yAxis)
                      .selectAll("text")
                      .attr("transform", "rotate(0)")
                      .attr("y", 6)
                      .attr("dy", ".71em")
                      .style("stroke-dasharray", ("3, 3"))
                      .style('fill', '#333')
                      .style("text-anchor", "end")
                    .text(function(d) {
                        var numValue = Math.round((d*options.maxValue)/100*(100/options.newPercent));
                        if (options.typeValue === 'number'){
                            // $('#' + chartId + ' .unit').hide();
                            // $('#modal-zoom-chart .unit').hide();
                            return numValue;
                        } else if (options.typeValue === 'thousand'){
                            $('#' + chartId + ' .unit').text('千');
                            $('#modal-zoom-chart .unit').text('千');
                            return  numValue/1000 ;
                        } else if (options.typeValue === 'tenThousand'){
                            $('#' + chartId + ' .unit').text('万');
                            $('#modal-zoom-chart .unit').text('万');
                            return  numValue/10000;
                        } else if (options.typeValue === 'billion'){
                            $('#' + chartId + ' .unit').text('億');
                            $('#modal-zoom-chart .unit').text('億');
                            return numValue/1000000000;
                        }
                        });
   
            } else if((options.chartFlg === "dashboard" && series.length <= 62 && options.displayValueFlg === 1) || (options.chartFlg === "dashboard" && series.length <= 20 && options.displayValueFlg === 0)) {
                svg.append("g")
                  .attr("class", "x axis")
                  .attr("transform", "translate(0," + height + ")")

                  .call(xAxis)
                  .selectAll("text")
                    .style("text-anchor", "end")
                    .style("display", "none")
                    .style("font-size", "12px")
                    .attr("dx", "15")
                    .attr("dy", "10")
                    .attr("transform", function(d) {
                        return "rotate(0)" 
                    });
                    svg.append("g")
                      .attr("class", "y axis")
                      .call(yAxis)
                      .selectAll("text")
                      .attr("transform", "rotate(0)")
                      .attr("y", 6)
                      .attr("dy", ".71em")
                      .style("stroke-dasharray", ("3, 3"))
                      .style('fill', '#333')
                      .style("text-anchor", "end")
                    .text(function(d) { 
                        var numValue = Math.round((d*options.maxValue)/100*(100/options.newPercent));
                        if (options.typeValue === 'number'){
                            return numValue;
                        } else if (options.typeValue === 'thousand'){
                            $('#' + chartId + ' .unit').text('千');
                            $('#modal-zoom-chart .unit').text('千');
                            return  numValue/1000 ;
                        } else if (options.typeValue === 'tenThousand'){
                            $('#' + chartId + ' .unit').text('万');
                            $('#modal-zoom-chart .unit').text('万');
                            return  numValue/10000;
                        } else if (options.typeValue === 'billion'){
                            $('#' + chartId + ' .unit').text('億');
                            $('#modal-zoom-chart .unit').text('億');
                            return numValue/1000000000;
                        }
                    
                    });
            } else if (( options.chartFlg === "dashboard" && series.length > 62 &&  options.displayValueFlg === 1 ) || ( options.chartFlg === "dashboard" && series.length > 20 &&  options.displayValueFlg === 0 )){

                svg.append("g")
                  .attr("class", "x axis")
                  .attr("transform", "translate(0," + height + ")")
                  .call(xAxis)
                  .selectAll("text")
                    .style("text-anchor", "end")
                    .style("display", "none")
                    .attr("dx", "15")
                    .attr("dy", "10")
                    .attr("transform", function(d) {
                        return "rotate(0)" 
                    });
                    svg.append("g")
                      .attr("class", "y axis")
                      .call(yAxis)
                      .selectAll("text")
                      .attr("transform", "rotate(0)")
                      .attr("y", 6)
                      .attr("dy", ".71em")
                      .style("stroke-dasharray", ("3, 3"))
                      .style('fill', '#333')
                      .style("text-anchor", "end")
                    .text(function(d) { 
                        var numValue = Math.round((d*options.maxValue)/100*(100/options.newPercent));
                        if (options.typeValue === 'number'){
                            return numValue;
                        } else if (options.typeValue === 'thousand'){
                            $('#' + chartId + ' .unit').text('千');
                            $('#modal-zoom-chart .unit').text('千');
                            return  numValue/1000 ;
                        } else if (options.typeValue === 'tenThousand'){
                            $('#' + chartId + ' .unit').text('万');
                            $('#modal-zoom-chart .unit').text('万');
                            return  numValue/10000;
                        } else if (options.typeValue === 'billion'){
                            $('#' + chartId + ' .unit').text('億');
                            $('#modal-zoom-chart .unit').text('億');
                            return numValue/1000000000;
                        }
                    });
                    $('#' + options.container).css({'padding-bottom': 0});
            }

            var category = svg.selectAll(".category")
            .data(series)
            .enter().append("g")
              .attr("class", "category")
              .attr("transform", function(d) { return "translate(" + x0(d.category) + ",0)"; });

            category.selectAll("rect")
              .data(function(d) { return d.dataset; })
              .enter().append("rect")
              .attr("width", x1.rangeBand()-3)
              .attr("x", function(d) { return x1(d.name); })
              .attr("y", function(d) {
                if ( d.percent === null || isNaN(d.percent) ){
                    return 0;
                } else {
                    return height; 
                }
                })
              .attr("height", 0)
              .transition().duration(500)
              .attr("y", function(d) { 
                if(d.percent === null || isNaN(d.percent)){
                    return 0;
                } else {
                    return y(d.percent);   
                }
                 })
              .attr("height", function(d) { 
                if(d.percent === null || isNaN(d.percent) ){
                    return 0;
                } else {
                    return height - y(d.percent);
                }
                })
              .style("fill", function(d) {
                    return color(d.name);

                 });
            if ( ( options.chartFlg === "dashboard" && options.displayValueFlg === 1 && series.length <=  62 ) || options.chartFlg === "zoom" || options.chartFlg === "dashboard" && options.displayValueFlg === 0 && series.length <=  23) {
                // var beforePercent = "";
                category.selectAll("text")
                    // .data(function(d) { return d.dataset; })
                    .data(function(d ) { return options.toolTipData[d.dataset[0].name+d.dataset[0].percent]; })
                    .enter().append("text")
                    .attr("class", "bar")
                    .attr("text-anchor", "middle")
                    .attr("x", function(d) { return x1(d.name) + (x1.rangeBand()-3)/2; })
                    .transition().duration(500)
                    .attr("y", function(d) { 
                         if(options.chartFlg === "zoom"){
                            if (d.percent === null || isNaN(d.percent)){
                                return 0;
                            } else {
                                return height - ((options.percentData[d.percent] * height)/100) -10;
                            }
                            
                         } else if (options.chartFlg === "dashboard"){
                            if (d.percent === null || isNaN(d.percent)){                            
                                return 0 + '%';
                            } else {
                                return 100 - 5 -  options.percentData[d.percent] + "%";
                            }
                         }
                         
                         })
                    .style("fill", function(d) { if(d.percent === null || isNaN(d.percent) ){return 'transparent'} else {return color(d.name);} })
                    .text(function(d, i, j) {
                        var s = d.percent;
                        // if ( s > 0 ) {
                            var valueUnit = valueUnitArr[i];
                            var maxCountTmp = maxCountArr[0];
                            if ( valueUnit === "percent" ) {
                                s = Math.round(s);
                                s += '%';
                            }                            
                            return s;
   
                    });
            }
            category.selectAll("span")
                      .data(function(d) { return d.dataset; })
                      .enter().append("span")
                      .attr("class", "name")
                      .text(function(d, i, j) {
                        var s = d.name;
                        return s;
                      });
                      category.selectAll("em")
                      .data(function(d) { return d.dataset; })
                      .enter().append("span")
                      .attr("class", "group")
                      .text(function(d, i, j) {
                        var s = d.cate;
                        return s;
                      })

            if ( options.chartFlg === "detail" ) {
                category.selectAll("rect")
                    .on("mouseover", function(d) {
                        d3.select(this).style("fill", function(d) { return colorsTouch[groupNames.indexOf(d.name)]; });
                        tooltip.transition().duration(200).style("opacity", .9);      
                        tooltip.html(_this.setTooltipsGroupedBarChart( options, color(d.name), d.percent))  
                        .style("left",(x1.rangeBand()-3)/2 - 30 + parseInt(margin.left) + parseInt(d3.select(this).attr("x")) + parseInt(d3.transform(d3.select(this.parentNode).attr("transform")).translate[0])+ "px")     
                        .style("top", parseInt(margin.top) + parseInt(d3.select(this).attr("y")) - 68 + "px");
                    })
                    .on("mouseout", function(d) {       
                        d3.select(this).style("fill", function(d) { return color(d.name); })
                        tooltip.transition().duration(500).style("opacity", 0);   
                    });
            } else if(  (options.displayValueFlg === 1 && series.length > 62 && options.chartFlg !== "zoom") || (options.displayValueFlg === 0 && series.length > 20 && options.chartFlg !== "zoom") ) {
                category.selectAll("rect")
                    .on("mouseover", function(d, i, j) {

                        // d3.select(this).style("fill", function(d) { return colorsTouch[groupNames.indexOf(d.name)]; });
                        tooltip.transition().duration(200).style("opacity", 0.9);
                        tooltip.html(_this.setTooltipsGroupedBarChartDashboard( options, color(d.name),d.name, d.percent, i, series ))
                        // tooltip.html(_this.setTooltipsGroupedBarChartDashboard( options, color(d.name), d.percent, j, series ))
                        .style("left",(x1.rangeBand()-3)/2 + 7 + parseInt(margin.left) + parseInt(d3.select(this).attr("x")) + parseInt(d3.transform(d3.select(this.parentNode).attr("transform")).translate[0])+"px")
                        .style("top", parseInt(margin.top) + parseInt(d3.select(this).attr("y")) - 75 + "px");
                        if ( options.chartWidth > 360 ) {
                            tooltip.style("left",(x1.rangeBand()-3)/2 - 25 + parseInt(margin.left) + parseInt(d3.select(this).attr("x")) + parseInt(d3.transform(d3.select(this.parentNode).attr("transform")).translate[0])-10 +"px");
                        }
                    })
                    .on("mouseout", function(d) {
                        // d3.select(this).style("fill", function(d) { return color(d.name); })
                        tooltip.transition().duration(500).style("opacity", 0);
                    });                
            }

        },
        setSeriesGroupedBarChart: function(options) {
            var series = [];
            var i = 0;     

            switch ( options.topMenuType ) {
                case "groupedChartDashBoard":
                    for (var i = 0; i < options.categories.length; i++) {
                        var categoryTmp = options.categories[i];
                        for(var j=0; j< options.dataName.length; j++){
                            var name = options.dataName[j];
                            series.push({
                            category    : categoryTmp,
                            dataset     : [{name: name, percent: options.data[name][i], cate: options.categories[i]}]
                        });
                        }
                    }
                    break;
            };
            return series;
        },
        setSeries: function(options) {
            var series = [];
            var i = 0;    
            switch ( options.topMenuType ) {
                case "monetary":
                    switch ( options.type ) {
                        case "all":
                            for (var i = 0; i < options.categories.length; i++) {
                                var moneyFull = this.formatMoney(options.categories[i]);
                                series.push({
                                    category  : moneyFull, 
                                    dataset   : [{name: "dataArrM", percent: options.data.dataArrM[i]},
                                               {name: "dataArrF", percent: options.data.dataArrF[i]}]
                                });
                            }
                            break;
                        case "M":
                            for (var i = 0; i < options.categories.length; i++) {
                                var moneyFull = this.formatMoney(options.categories[i]);
                                series.push({
                                    category  : moneyFull, 
                                    dataset   : [{name: "dataArrM", percent: options.data.dataArrM[i]}]
                                });
                            }
                            break;
                    case "F":
                        for (var i = 0; i < options.categories.length; i++) {
                            var moneyFull = this.formatMoney(options.categories[i]);
                            series.push({
                                category  : moneyFull, 
                                dataset   : [{name: "dataArrF", percent: options.data.dataArrF[i]}]
                            });
                        }
                        break;
                    case "C":
                        for (var i = 0; i < options.categories.length; i++) {
                        // var moneyFull = this.formatMoney(options.categories[i]);
                            series.push({
                                category  : options.categories[i], 
                                dataset   : [{name: "dataArrC", percent: options.data.dataArrC[i]}]
                            });
                        }
                        break;
                    };
                break;
            };
            return series;
        },
        formatMoney: function(category){
            var moneyFull = "";
            var amari = category % 10000;
            var money = parseInt(category / 10000)
            if ( money > 0 ) {
                moneyFull = money + "万";
                if ( amari > 0 ) {
                    moneyFull = moneyFull + amari + "円";
                } else {
                    moneyFull = moneyFull + "円";
                }
            } else {
                moneyFull = category + "円";
            } 
            return moneyFull;
        },
        setTooltipsGroupedBarChart: function(options, color, value) {
            var s;
            s = "<span style='color:" + color + ";border-color:" + color + ";'>";
            switch ( options.topMenuType ) {
                case "demoGraphics":
                case "growth":
                case "store":
                    s += value;
                    break;
                default:
                    s += App.util.text.parsePercentToNumber(value, options.maxCount);
                    break;
            };
            s += "</span><i class='arrdown' style = 'border-top: 10px solid " + color + ";'></i>";
            return s;
        },
        setTooltipsGroupedBarChartDashboard: function(options, color, name, value, index, series, type) {
            var valueUnitArr = options.valueUnitArr;
            var maxCountArr = options.maxCountArr;
            var valueUnit = valueUnitArr[index];
            var maxCountTmp = maxCountArr[0];
             var s;
            s = "<span style='color:" + color + ";border-color:" + color + ";'>";
            s += options.toolTipData[name+value][0].percent;
            s += "</span>";
            return s;
        },
        generateAreaChart: function(options){ 
            var _this = this;
            // _this.circle = "";
            if ( $("#" + options.container).length <= 0 ) {
                return;
            }
            var margin = {top: 0, right: 0, bottom: 0, left: 0},
                width = options.chartWidth - margin.left - margin.right,
                height = options.chartHeight - margin.top - margin.bottom;

            var parseDate = d3.time.format("%Y-%m-%d").parse;
                bisectDate = d3.bisector(function(d) { return d.date; }).left;

            var x = d3.time.scale().range([0, width]);
            var y = d3.scale.linear().range([height, 0]);

            var color = d3.scale.category10();

            var stack = d3.layout.stack()
                .offset("zero")
                .values(function(d) { return d.values; })
                .x(function(d) { return d.date; })
                .y(function(d) { var total = d.open + d.click + d.use;return total; });

            var nest = d3.nest()
                .key(function(d) { return d.key; });

            var area = d3.svg.area()
                .interpolate("cardinal")
                .x(function(d) { return x(d.date); })
                .y0(function(d) { return y(d.y0); })
                .y1(function(d) { return y(d.y0 + d.y); });


            var svg = d3.select("#" + options.container)
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            var dataset = options.dataset;
            var dateNullCount = 0;
            dataset.forEach(function(d) {
                d.date = parseDate(d.date);
                if ( d.date === null ) {
                    dateNullCount++;
                }
                d.open = +d.open;
                d.click = +d.click;
                d.use = +d.use;
            });
            if ( dateNullCount > 0 ) {
                return;
            }
            var layers = stack(nest.entries(dataset));

            x.domain(d3.extent(dataset, function(d) { return d.date; }));
            // y.domain([0, 100]);
            y.domain([0, d3.max(dataset, function(d) { return d.y0 + d.y; })]);

            var path = svg.selectAll(".layer")
                .data(layers)
                .enter().append("path")
                .attr("class", "layer")
                .attr("d", function(d) { return area(d.values); })
                .style("fill", function(d, i) { return color(i); })
                .on("mousemove", function(d, i) {
                    tooltip.style("display", "block");
                    var x0 = x.invert(d3.mouse(this)[0]);
                    var xPosition = d3.mouse(this)[0] - 15;
                    var yPosition = d3.mouse(this)[1] - 25;
                        
                    var xPositionTmp = xPosition;
                    var arr = d.values;
                    var i = bisectDate(arr, x0 , 1);
                    var d0 = arr[i - 1];
                    var d1 = arr[i];
                    var objTmp = x0 - d0.date > d1.date - x0 ? d1 : d0;

                    tooltip.style('color', function(d){ return color(i) });

                    var openVal = 0;
                    var clickVal = 0;
                    var useVal = 0;
                    var total = 0;
                    if ( objTmp ) {
                        openVal = objTmp.open;
                        clickVal = objTmp.click;
                        useVal = objTmp.use;
                        total = objTmp.y;
                        if ( width < 500 ) {
                            tooltip.style('top', y(total) - 60 + 'px');
                        } else {
                            tooltip.style('top', y(total) + 195 + 'px');
                        }
                        var xPosition1 = x(objTmp.date);
                        var xPositionTmp1 = xPosition1 + 210;
                        if ( openVal > 1000 || clickVal > 1000 || useVal > 1000 ) {
                            xPositionTmp1 = xPosition1 + 225;
                            if ( xPositionTmp1 > width ) {
                                tooltip.style('left', xPosition1 - 235 + 'px');
                            } else {
                                tooltip.style('left', xPosition1 + 'px');
                            }
                        } else {
                            if ( xPositionTmp1 > width ) {
                                tooltip.style('left', xPosition1 - 170 + 'px');
                            } else {
                                tooltip.style('left', xPosition1 + 'px');
                            }
                        }
                        var datasetCircle = [];
                        var dataCircle = {
                            x: Math.round( xPosition ),
                            y: Math.round( yPosition )
                        };
                        datasetCircle.push(dataCircle);

                        if ( $("#" + options.container + " svg circle").length > 0 ) {
                            $("#" + options.container + " svg circle").attr("r", 7.5)
                                .attr("cx", x(objTmp.date))
                                .attr("cy", y(total));
                        } else {
                            var circle = svg.selectAll("circle")
                            .data(datasetCircle);

                            circle.enter().append("circle")
                            .attr("r", 7.5)
                            .attr("cx", x(objTmp.date))
                            .attr("cy", y(total))
                            .attr("fill", "none")
                            .style("stroke-width", 4)
                            .style("stroke", "#00A1B9");
                        }

                        var openTitle = App.appModel.getLanguageType().dashboard.main.open;
                        var clickTitle = App.appModel.getLanguageType().dashboard.main.click;
                        var useTitle = App.appModel.getLanguageType().dashboard.main.use;
                        tooltip.html( "<p class='val-area'><span><b>" + openVal +"</b><br>" + openTitle + " </span><span><b>" + clickVal + "</b><br>" + clickTitle + " </span><span><b>" + useVal +"</b><br>" + useTitle + " </span></p>");
                        if ( openVal > 1000 || clickVal > 1000 || useVal > 1000 ) {
                            $("#" + options.container + " .tooltip-area .val-area span").css({"width": "65px"});                        }
                
                        tooltip.style('display', 'block');
                    }
                })
                .on("mouseout", function(d) {
                    if ( $("#" + options.container + " svg circle").length > 0 ) {
                        $("#" + options.container + " svg circle").attr("r", 0);
                    }
                    tooltip.style("display", "none");
                });


            var tooltip = d3.select("#" + options.container)
                .append('div')
                .attr('class','tooltip-area');
        },
        generateLineChart: function(options) {
            var chartId = options.container.split(" ")[0];
            var type = options.type;
            var pointArr = options.pointArr;
            if ( $("#" + options.container).length <= 0 ) {
                return;
            }
            if ( options.chartFlg === "zoom" ) {
                var margin = {top: 0, right: 20, bottom: 40, left: 50};
            } else {
                var margin = {top: 40, right: 20, bottom: 20, left: 30};                
            }

            var width = options.chartWidth - margin.left - margin.right,
                height = options.chartHeight - margin.top - margin.bottom;
                if( $(pointArr).length > 23 && options.chartFlg === "zoom"){
                    width = ($(pointArr).length * 50) - margin.left - margin.right;
                    $('#' + chartId + ' #chartLine').css({'overflow-x': 'auto', 'overflow-y': 'hidden', 'height': 270});
                    $('#' + chartId + ' .listbtnact').css({'margin-top': 0});
                }
            var parseDate = d3.time.format("%Y-%m-%d").parse;
                bisectDate = d3.bisector(function(d) { return d.date; }).left;

            var x = d3.time.scale().range([0, width]);
            var y = d3.scale.linear().range([height, 0]);

            var oldDate = "";
            var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom")
                .outerTickSize(0)
                .tickFormat(function(d) {
                    var format = "YYYY-MM-DD";
                    if ( type === "year" || type === "quarter" ) {
                        format = "YYYY-MM";
                    }
                    var newDate = App.util.date.convertDate1(new Date(d), "", format);
                    if ( oldDate ) {
                        if ( oldDate === newDate ) {
                            newDate = "";
                        } else {
                            oldDate = newDate;
                        }
                    } else {
                        oldDate = newDate;
                    }

                    if ( type === "quarter" ) {
                        newDate = App.util.text.setTitleQuarter1(newDate);
                    }
                    return newDate;
                });
            var yAxis = d3.svg.axis().scale(y)
           .orient("left").ticks(5).tickSize(-width, 0, 0).outerTickSize(0);
            

            // Define the line
            var valueline = d3.svg.line()
                .x(function(d) { return x(d.date); })
                .y(function(d) { return y(d.open); })
                .interpolate('linear');

            // Adds the svg canvas
            var svg = d3.select("#" + options.container)
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            var color = d3.scale.ordinal()
                            .range(options.colors);
            var dataset = options.dataset;
            color.domain(d3.keys(dataset[0]).filter(function(key) { return key !== 'date'; }));

            var dateNullCount = 0;
            var minDate;
            var maxDate;
            dataset.forEach(function(d, i) {
                if ( type === "type" ) {
                    if ( i === 0 ) {
                        var dateTmp1 = d.date.split("-");
                        switch ( parseInt(dateTmp1[1]) ) {
                            case 3:
                                minDate = dateTmp1[0] + "-01-01";
                                d.date = parseDate(minDate);
                                break;
                            case 6:
                                minDate = dateTmp1[0] + "-04-01";
                                d.date = parseDate(minDate);
                                break;
                            case 9:
                                minDate = dateTmp1[0] + "-07-01";
                                d.date = parseDate(minDate);
                                break;
                        };
                        if ( minDate ) {
                            d.date = parseDate(minDate);
                        }
                    } else {
                        d.date = parseDate(d.date);
                    }
                } else {
                    d.date = parseDate(d.date);
                }
                if ( d.date === null ) {
                    dateNullCount++;
                }
            });

            if ( dateNullCount > 0 ) {
                return;
            }
            
            var titleArr = options.titleArr;
            var openValues = color.domain().map(function(name, i) {
                return {
                    name: titleArr[i],
                    values: dataset.map(function(d) {
                        return { date: d.date, open: d[name] };
                    })
                };
            });

            x.domain(d3.extent(dataset, function(d) { return d.date; }));
            y.domain([
                0,
                d3.max(openValues, function(c) { return d3.max(c.values, function(v) { 
                    if(v.open === 0){
                        return 10;
                    }
                    return v.open * 1.5;

                    }); 
                })

            ]);

            var segChart = svg.selectAll(".seg")
                .data(openValues)
                .enter().append("g")
                .attr("class", "seg")
                .attr('transform', 'translate(0,0)');

            // Add the valueline path.
            segChart.append("path")
                .attr("class", "line")

                .transition().duration(500)
                .attr("d", function(d) {  
                    return valueline(d.values);
                })
                .attr('stroke', function(d, i) {
                    if (d.name === null){
                        return color(d.name);
                    } else {
                        return color(d.name);
                    }
                    
                })
                .attr('stroke-width', 2)
                .attr('fill', 'none');
                

            // Add the scatterplot
            segChart.selectAll("circle")
                .data(function(d){return d.values;})
                .enter().append("circle")
                .attr("r", 7.5)
                .transition().duration(500)
                .attr('fill', function(d, i, j) {
                    if ( d.open === null ){
                        return 'transparent';
                    } else {
                        return color(openValues[j].name);
                    }
                    
                })
                .attr("cx", function(d) { 
                    $('#modal-zoom-chart .zoom-chart .title_line_chart').append("<span style='left:"+x(d.date)+"px'></span>"); 
                    return x(d.date); })
                .attr("cy", function(d) { 
                    if ( d.open === null ){
                        return 0;
                    } else {
                        return y(d.open);
                    }
                    });

            if ( options.chartFlg === "zoom" ) {
                segChart.selectAll("text")
                    .data(function(d){return d.values})
                    .enter().append("text")
                    .attr("x", function(d) { return x(d.date) - 15; })
                    .attr("y", function(d) { return y(d.open) - 15; })
                    .style('fill', function(d, i, j) {
                        if ( d.open === null ){
                        return '#ffffff';
                        } else {
                        return color(openValues[j].name);
                        }
                    })
                    .text(function(d) { return d.open; });

                if ( type === "month" ) {
                    segChart.selectAll("text").style("font-size", "11px");
                }

                svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis)
                    .selectAll("text")
                    .style("display", "none")
                    .style("text-anchor", "end")
                    .style("font-size", "12px")
                    .attr("dx", "-.8em")
                    .attr("dy", ".15em")
                    .transition().duration(500)
                    .attr("transform", function(d) {
                        return "rotate(-65)";
                    })
                    .attr("fill", "#000078");

                svg.append("g")     
                     .attr("class", "y axis")
                     .call(yAxis).selectAll("text")
                     .attr("x", -15).text(function(d) {
                        if (options.typeValue === 'number'){
                            return d;
                        } else if (options.typeValue === 'thousand'){
                            $('#' + chartId + ' .unit').text('千');
                            $('#modal-zoom-chart .unit').text('千');
                            return  d/1000 ;
                        } else if (options.typeValue === 'tenThousand'){
                            $('#' + chartId + ' .unit').text('万');
                            $('#modal-zoom-chart .unit').text('万');
                            return  d/10000;
                        } else if (options.typeValue === 'billion'){
                            $('#' + chartId + ' .unit').text('億');
                            $('#modal-zoom-chart .unit').text('億');
                            return d/1000000000;
                        }
                    });
                    } else {
                segChart.selectAll("text")
                    .data(function(d){return d.values})
                    .enter().append("text")
                    .attr("x", function(d) { return x(d.date) - 15; })
                    .attr("y", function(d) { 
                        if( d.open === null ) { 
                            return 0 ;
                        } else {
                            return y(d.open) - 15;
                            } 
                        })
                    .style("display", "none")
                    .style('fill', function(d, i, j) {
                        return color(openValues[j].name);
                    })
                    .text(function(d) {
                        if ( d.open === null ) {
                            return 0;
                        } else {
                            return d.open;
                        }
                         
                    });

                if ( type === "month" ) {
                    segChart.selectAll("text").style("font-size", "11px");
                }

                svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis)
                    .selectAll("text")
                    .style("display", "none")
                    .style("text-anchor", "end")
                    .style("font-size", "12px")
                    .attr("dx", "-.8em")
                    .attr("dy", ".15em")
                    .transition().duration(500)
                    .attr("transform", function(d) {
                        return "rotate(-65)";
                    })
                    .attr("fill", "#000078");

                svg.append("g")     
                     .attr("class", "y axis")
                     .call(yAxis).selectAll("text")
                     .attr("x", -5).text(function(d) {
                        if (options.typeValue === 'number'){
                            return d;
                        } else if (options.typeValue === 'thousand'){
                            $('#' + chartId + ' .unit').text('千');
                            $('#modal-zoom-chart .unit').text('千');
                            return  d/1000 ;
                        } else if (options.typeValue === 'tenThousand'){
                            $('#' + chartId + ' .unit').text('万');
                            $('#modal-zoom-chart .unit').text('万');
                            return  d/10000;
                        } else if (options.typeValue === 'billion'){
                            $('#' + chartId + ' .unit').text('億');
                            $('#modal-zoom-chart .unit').text('億');
                            return d/1000000000;
                        }
                    });
                    }

            var setLegend = function() {
                var w_chart = $("#" + chartId).width();
                var classLength = titleArr.length;

                var w_legend = 14;
                if ( options.container.indexOf("zoom-chart") >= 0 ) {
                    w_legend = 18;
                }
                for(var i = 0; i < classLength; i++) {
                    var index = i + 1;
                    $('#' + chartId + ' .listbtnact').append('<button data-chart-id="'+ chartId +'""><em></em></button>');
                    $('#' + chartId + ' .listbtnact button:nth-child(' + index + ') em').css({'background-color': color(openValues[i].name)});
                    $('#' + chartId + ' .listbtnact button:nth-child(' + index + ')').append('<span>' + openValues[i].name + '</span>');
                    if ( classLength === 2 ){
                      $('#' + chartId + ' .listbtnact button:nth-child(' + index + ')').css({'max-width': w_chart/2 + 'px'});
                      $('#' + chartId + ' .listbtnact button:nth-child(' + index + ') span').css({'max-width': (w_chart/2) - w_legend - 6 - 20 + 'px'});
                    } else if ( classLength === 3 ) {
                      $('#' + chartId + ' .listbtnact button:nth-child(' + index + ')').css({'max-width': w_chart/3 + 'px'});
                      $('#' + chartId + ' .listbtnact button:nth-child(' + index + ') span').css({'max-width': (w_chart/3) - w_legend - 6 - 15 + 'px'});
                    } else if (classLength > 3){
                      $('#' + chartId + ' .listbtnact button:nth-child(' + index + ')').css({'max-width': w_chart/classLength + 'px'});
                      $('#' + chartId + ' .listbtnact button:nth-child(' + index + ') span').css({'max-width': (w_chart/classLength) - w_legend - 6 - 15 + 'px'});
                    }
                }
            };
            setLegend();

            // Add line
            var mouseG = svg.append("g").attr("class", "mouse-over-effects");
            var classLength = titleArr.length;
            mouseG.append("path") // this is the black vertical line to follow mouse
                .attr("class", "mouse-line")
                .transition().duration(500)
                .style("stroke", "#000")
                .style("shape-rendering", "crispEdges")
                .style("stroke-width", "1px")
                .style("opacity", "0");

            
            

            //drop SHADOW
            if ( options.chartFlg !== "zoom" ) {
                var defs = mouseG.append("defs");
                var filter = defs.append("filter")
                    .attr("id", "drop-shadow")
                    .attr("height", "130%");
                filter.append("feGaussianBlur")
                    .attr("in", "SourceAlpha")
                    .attr("stdDeviation", 2)
                    .attr("result", "blur");
                filter.append("feOffset")
                    .attr("in", "blur")
                    .attr("dx", 0)
                    .attr("dy", 2)
                    .attr("result", "offsetBlur");
                var feMerge = filter.append("feMerge");
                feMerge.append("feMergeNode")
                    .attr("in", "offsetBlur")
                feMerge.append("feMergeNode")
                    .attr("in", "SourceGraphic");
                
                if (classLength === 1){
                    mouseG.append("rect")
                    .attr("class", "mouse-box")
                    .attr("height", 50).attr("rx", 20).attr("ry", 20)              
                    .style("padding", "5px")
                    .style("fill", "#fff")
                    .style("opacity", "0")
                    .style("filter", "url(#drop-shadow)");
                    var mousePerLine = mouseG.selectAll('.mouse-per-line')
                    .data(openValues)
                    .enter().append("g")
                    .attr("class", "mouse-per-line")
                    .each(function(d, i) {
                        var gLine = d3.select(this);
                        var lineText = gLine.append("text")
                        .attr("class", "firstValue")
                        .attr("transform", "translate(30,8)");
                    });

                } else if (classLength === 2) {
                    mouseG.append("rect")
                    .attr("class", "mouse-box")
                    .attr("height", 50)                    
                    .attr("rx", 20).attr("ry", 20)
                    .style("padding", "5px")           
                    .style("fill", "#ffffff")                    
                    .style("opacity", "0")
                    .style("filter", "url(#drop-shadow)");

                    var mousePerLine = mouseG.selectAll('.mouse-per-line')
                    .data(openValues)
                    .enter().append("g")
                    .attr("class", "mouse-per-line")
                    .each(function(d, i) {
                        var gLine = d3.select(this);
                        var lineText = gLine.append("text");
                        if ( i === 0 ) {
                            lineText.attr("class", "firstValue")
                            .attr("transform", "translate(10,8)");
                        } else if ( i === 1 ) {
                            lineText.attr("class", "secondValue")
                            .attr("transform", "translate(10,8)");
                        }
                    });

                } else if (classLength === 3){
                    mouseG.append("rect")
                    .attr("class", "mouse-box")
                    .attr("height", 50).attr("rx", 20).attr("ry", 20)               
                    .style("padding", "5px")
                    .style("fill", "#fff")
                    .style("opacity", "0")
                    .style("filter", "url(#drop-shadow)");

                    var mousePerLine = mouseG.selectAll('.mouse-per-line')
                    .data(openValues)
                    .enter().append("g")
                    .attr("class", "mouse-per-line")
                    .each(function(d, i) {
                        var gLine = d3.select(this);
                        var lineText = gLine.append("text");

                        if ( i === 0 ) {
                            lineText.attr("class", "firstValue")
                            .attr("transform", "translate(10,8)");
                        } else if ( i === 1 ) {
                            lineText.attr("class", "secondValue")
                            .attr("transform", "translate(10,8)");
                        } else if ( i === 2 ) {
                            lineText.attr("class", "thirdValue")
                            .attr("transform", "translate(10,8)");
                        }
                    });
                } else if ( classLength === 4){
                    mouseG.append("rect")
                    .attr("class", "mouse-box")
                    .attr("height", 50).attr("rx", 20).attr("ry", 20)              
                    .style("padding", "5px")
                    .style("fill", "#fff")
                    .style("opacity", "0")
                    .style("filter", "url(#drop-shadow)");

                    var mousePerLine = mouseG.selectAll('.mouse-per-line')
                    .data(openValues)
                    .enter().append("g")
                    .attr("class", "mouse-per-line")
                    .each(function(d, i) {
                        var gLine = d3.select(this);
                        var lineText = gLine.append("text");

                        if ( i === 0 ) {
                            lineText.attr("class", "firstValue")
                            .attr("transform", "translate(15,8)");
                        } else if ( i === 1 ) {
                            lineText.attr("class", "secondValue")
                            .attr("transform", "translate(15,8)");
                        } else if ( i === 2 ) {
                            lineText.attr("class", "thirdValue")
                            .attr("transform", "translate(15,8)");
                        } else if ( i === 3 ) {
                            lineText.attr("class", "fourValue")
                            .attr("transform", "translate(15,8)");
                        }
                    });
                } else if ( classLength === 5){
                    mouseG.append("rect")
                    .attr("class", "mouse-box")
                    .attr("height", 50).attr("rx", 20).attr("ry", 20)              
                    .style("padding", "5px")
                    .style("fill", "#fff")
                    .style("opacity", "0")
                    .style("filter", "url(#drop-shadow)");



                    var mousePerLine = mouseG.selectAll('.mouse-per-line')
                    .data(openValues)
                    .enter().append("g")
                    .attr("class", "mouse-per-line")
                    .each(function(d, i) {
                        var gLine = d3.select(this);
                        var lineText = gLine.append("text");
                        if ( i === 0 ) {
                            lineText.attr("class", "firstValue")
                            .attr("transform", "translate(10,8)");
                        } else if ( i === 1 ) {
                            lineText.attr("class", "secondValue")
                            .attr("transform", "translate(10,8)");
                        } else if ( i === 2 ) {
                            lineText.attr("class", "thirdValue")
                            .attr("transform", "translate(10,8)");
                        } else if ( i === 3 ) {
                            lineText.attr("class", "fourValue")
                            .attr("transform", "translate(10,8)");
                        } else if ( i === 4) {
                            lineText.attr("class", "fiveValue")
                            .attr("transform", "translate(10,8)");
                        }
                    });
                } else if ( classLength === 6){
                    mouseG.append("rect")
                    .attr("class", "mouse-box")
                    .attr("width", 360).attr("height", 50).attr("rx", 20).attr("ry", 20)             
                    .style("padding", "5px")
                    .style("fill", "#fff")
                    .style("opacity", "0")
                    .style("filter", "url(#drop-shadow)");



                    var mousePerLine = mouseG.selectAll('.mouse-per-line')
                    .data(openValues)
                    .enter().append("g")
                    .attr("class", "mouse-per-line")
                    .each(function(d, i) {
                        var gLine = d3.select(this);
                        var lineText = gLine.append("text");
                        if ( i === 0 ) {
                            lineText.attr("class", "firstValue")
                            .attr("transform", "translate(10,8)");
                        } else if ( i === 1 ) {
                            lineText.attr("class", "secondValue")
                            .attr("transform", "translate(10,8)");
                        } else if ( i === 2 ) {
                            lineText.attr("class", "thirdValue")
                            .attr("transform", "translate(10,8)");
                        } else if ( i === 3 ) {
                            lineText.attr("class", "fourValue")
                            .attr("transform", "translate(10,8)");
                        } else if ( i === 4) {
                            lineText.attr("class", "fiveValue")
                            .attr("transform", "translate(10,8)");
                        } else if ( i === 5) {
                            lineText.attr("class", "sixValue")
                            .attr("transform", "translate(10,8)");
                        }
                    });
                }

                mouseG.append("text")
                    .data(openValues)
                    .attr("class", "valueTitle")
                    // .text(pointArr[0])
                    .style("opacity", "0")
                    .style("font-size", "12px")
                    .attr('fill', "#333");

                var firstColor = $('#' + chartId + ' .listbtnact button:nth-child(1) em').css('background-color');
                var secondColor = $('#' + chartId + ' .listbtnact button:nth-child(2) em').css('background-color');
                var thirdColor = $('#' + chartId + ' .listbtnact button:nth-child(3) em').css('background-color');
                var fourthColor = $('#' + chartId + ' .listbtnact button:nth-child(4) em').css('background-color');
                var fiveColor = $('#' + chartId + ' .listbtnact button:nth-child(5) em').css('background-color');
                var sixColor = $('#' + chartId + ' .listbtnact button:nth-child(6) em').css('background-color');
                // hexc(firstColor);
                $('#' + chartId + ' #chartLine svg .firstValue').css({'fill': firstColor});
                $('#' + chartId + ' #chartLine svg .secondValue').css({'fill': secondColor});
                $('#' + chartId + ' #chartLine svg .thirdValue').css({'fill': thirdColor});
                $('#' + chartId + ' #chartLine svg .fourValue').css({'fill': fourthColor});
                $('#' + chartId + ' #chartLine svg .fiveValue').css({'fill': fiveColor});
                $('#' + chartId + ' #chartLine svg .sixValue').css({'fill': sixColor});

                mouseG.append('svg:rect')
                .attr('width', width)
                .attr('height', height)
                .attr('fill', 'none')
                .attr('pointer-events', 'all')
                .on('mouseout', function() {
                    mouseG.select(".mouse-line")
                        .style("opacity", "0");
                    mouseG.selectAll(".mouse-box")
                        .style("opacity", '0');
                    mouseG.selectAll(".mouse-per-line")
                        .style("opacity", "0");
                    mouseG.selectAll(".mouse-horizontal")
                        .style("opacity", "0");
                    mouseG.selectAll(".valueTitle")
                        .style("opacity", "0");    
                })
                .on('mouseover', function() {
                    mouseG.select(".mouse-line")
                        .style("opacity", "1");
                    mouseG.selectAll(".mouse-box")
                        .style("opacity", '1');
                    mouseG.selectAll(".mouse-per-line")
                        .style("opacity", "1");
                    mouseG.selectAll(".mouse-horizontal")
                        .style("opacity", "1");
                    mouseG.selectAll(".valueTitle")
                        .style("opacity", "1"); 
                })
                .on('mousemove', function(d,i) {
                    var mouse = d3.mouse(this);
                    mouseG.select(".mouse-line")
                        .attr("d", function() {
                            var d = "M" + mouse[0] + "," + height;
                            d += " " + mouse[0] + "," + -45;
                            return d;
                        });
                    if ( classLength === 1){
                        mouseG.select(".mouse-box")
                        .attr("x", mouse[0] - 40)
                        .attr("y", -45);
                        mouseG.select(".valueTitle")
                            .attr("x", mouse[0] - 20)
                            .attr("y", -3);
                        } else if ( classLength === 2){
                            mouseG.select(".mouse-box")
                            .attr("x", mouse[0] - 60)
                            .attr("y", -45);
                            mouseG.select(".valueTitle")
                            .attr("x", mouse[0] - 20)
                            .attr("y", -3);
                        } else if ( classLength === 3){
                            mouseG.select(".mouse-box")
                        .attr("x", mouse[0] - 100)
                        .attr("y", -45);
                        mouseG.select(".valueTitle")
                            .attr("x", mouse[0] - 20)
                            .attr("y", -3);
                        } else if ( classLength === 4){
                        mouseG.select(".mouse-box")
                        .attr("x", mouse[0] - 120)
                        .attr("y", -45);
                        mouseG.select(".valueTitle")
                            .attr("x", mouse[0] - 20)
                            .attr("y", -3);
                        } else if ( classLength === 5){
                            mouseG.select(".mouse-box")
                            .attr("x", mouse[0] - 150)
                            .attr("y", -45);
                            mouseG.select(".valueTitle")
                            .attr("x", mouse[0] - 20)
                            .attr("y", -3);
                        }else if ( classLength === 6){
                            mouseG.select(".mouse-box")
                            .attr("x", mouse[0] - 180)
                            .attr("y", -45);
                            mouseG.select(".valueTitle")
                            .attr("x", mouse[0] - 20)
                            .attr("y", -3);
                        }

                    var format = "YYYYMMDD";
                    switch ( options.type ) {
                        case "year":
                        case "quarter":
                            format = "YYYYMM";
                            break;
                    };
                    mousePerLine.attr("transform", function(d, i) {
                        var t = d3.select(this).select('text');                    
                        var xDate = x.invert(mouse[0]);
                        var arr = d.values;
                        var index = bisectDate(arr, xDate, 1);
                        var indexX = index - 1;
                        var d0 = arr[index - 1];
                        var d1 = arr[index];
                        var objTmp = xDate - d0.date > d1.date - xDate ? d1 : d0;

                        t.selectAll('tspan').remove();
                            if(objTmp === d0){
                                $('.valueTitle').text(pointArr[indexX]);
                            } else if ( objTmp === d1){
                            $('.valueTitle').text(pointArr[index]);
                        }
                        t.append('tspan')
                            .text(function(d, i) {
                                var open, newOpen;
                                if ( objTmp ) {
                                    open = objTmp.open;                                    
                                }
                                if(d.name.length>5){
                                    newOpen = d.name.substring(0, 5) + '...: ' + open;
                                } else{
                                    newOpen = d.name.substring(0, 5) + ': ' + open;
                                }
                                return open == null? '-': newOpen;
                            })
                            .style("font-size", "14px")
                            .attr('fill', color[i])
                            .attr('x', function(){
                                if ( objTmp.open > 999 ) {
                                    return 0;
                                } else {
                                    return 4;
                                }
                            });

                        var posX = (i==0) ? 50 : 0;
                            posX = parseInt(mouse[0]) - posX; 
                        return "translate(" + posX + "," + -30 + ")";
                    });
                var w0 = 0, w1 = 0, w2 =0, w3 = 0, w4 = 0, w5 = 0, w6 =0;
                if( $('#' + chartId + ' svg .mouse-per-line .firstValue tspan' ).text().length > 0 ){
                    var a1 = $('#' + chartId + ' svg .mouse-per-line .firstValue')[0];
                    w1 =a1.getBoundingClientRect().width;
                }
                if( $('#' + chartId + ' svg .mouse-per-line .secondValue tspan' ).text().length > 0 ){
                    var a2 = $('#' + chartId + ' svg .mouse-per-line .secondValue tspan')[0];
                    w2 =a2.getBoundingClientRect().width;
                } 
                if( $('#' + chartId + ' svg .mouse-per-line .thirdValue tspan' ).text().length > 0 ){
                    var a3 = $('#' + chartId + ' svg .mouse-per-line .thirdValue tspan')[0];
                    w3 =a3.getBoundingClientRect().width;
                }    
                if( $('#' + chartId + ' svg .mouse-per-line .fourValue tspan' ).text().length > 0 ){
                    var a4 = $('#' + chartId + ' svg .mouse-per-line .fourValue tspan')[0];
                    w4 =a4.getBoundingClientRect().width;
                }  
                if( $('#' + chartId + ' svg .mouse-per-line .fiveValue tspan' ).text().length > 0 ){
                    var a5 = $('#' + chartId + ' svg .mouse-per-line .fiveValue tspan')[0];
                    w5 =a5.getBoundingClientRect().width;
                }
                if( $('#' + chartId + ' svg .mouse-per-line .sixValue tspan' ).text().length > 0 ){
                    var a6 = $('#' + chartId + ' svg .mouse-per-line .sixValue tspan')[0];
                    w6 =a6.getBoundingClientRect().width;
                }  

                if (classLength === 1 || classLength === 2 || classLength === 3){
                    $('#' + chartId + ' svg .mouse-box').attr('width', w1 + w2 + w3 + w4 + w5 + w6 + 60);
                    $(".mouse-box").attr('x', mouse[0] - ((w1 + w2 + w3 + w4 + w5 + w6 + 60)/2) );
                } else if (classLength === 4 || classLength === 5 ){
                    $('#' + chartId + ' svg .mouse-box').attr('width', w1 + w2 + w3 + w4 + w5 + w6 + 100);
                    $(".mouse-box").attr('x', mouse[0] - ((w1 + w2 + w3 + w4 + w5 + w6 + 100)/2) );
                } else {
                    $('#' + chartId + ' svg .mouse-box').attr('width', w1 + w2 + w3 + w4 + w5 + w6 + 140);
                    $(".mouse-box").attr('x', mouse[0] - ((w1 + w2 + w3 + w4 + w5 + w6 + 140)/2) );
                }
                    
                var position, k, getTick, subTick, numX;    
                    for(var i=0; i< classLength; i++){
                        if (i === 0){
                            position = parseInt($('#' + chartId + ' svg .mouse-box').attr('x')) + parseInt((eval('w'+i) + 20) * i);
                        }
                        else {
                            k = i -1;
                            getTick = $('#' + chartId + ' svg .mouse-per-line:eq('+k+')').attr('transform');
                            subTick = getTick.split('(')[1];
                            numX = subTick.split(',')[0];
                            position = parseInt(numX) + parseInt((eval('w'+i) + 20));    
                        }                        
                        $('#' + chartId + ' svg .mouse-over-effects .mouse-per-line:eq('+i+')').attr("transform", "translate("+ position +",-30)");
                    }
                });
            }
        }
  
    };
    return D3ChartsUtil;

})();
