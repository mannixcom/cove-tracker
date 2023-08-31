import React from 'react';
import { Vega } from 'react-vega';
import barchart from './barchart.json';

export const BarChart = () => {

    const spec = {
        "$schema": "https://vega.github.io/schema/vega/v5.json",
        "description": "EY Recent Transaction BarChart.",
        "width": 700,
        "height": 405,
        "position": "relative",
        "overflow": "hidden",
        "text-align": "left",
        "padding": 50,
        "background":"black",
        "line-height": "1.5",
         "autosize": "fit",

        "config": {
            "axis": { "labelColor": "white"}
        },
        "data": [
            { "name": "barChart_store" },
            {
                "name": "table",
                "values": barchart,
                "transform": [
                    {
                        "type": "window",
                        "sort": { "field": "Gross", "order": "descending" },
                        "ops": ["row_number"],
                        "as": ["rank"]
                    },
                    { "type": "filter", "expr": "datum.rank <= k" }
                ]
            }
        ],
        "signals": [
            { "name": "k", "value": 35 },
            { "name": "op", "value": "average" },
            {
                "name": "selected",
                "value": "",
                "on": [{ "events": "mouseover", "update": "datum" }]
            },
             {
          "name": "tooltip",
          "value": {},
          "on": [
            {"events": "rect:mouseover", "update": "datum"},
            {"events": "rect:mouseout",  "update": "{}"}
          ]
        }
        ],

        "scales": [
            {
                "name": "x",
                "type": "linear",
                "domain": { "data": "table", "field": "y" },
                "range": "width",
                "nice": true
            },
            {
                "name": "y",
                "type": "band",
                "domain": {
                    "data": "table",
                    "field": "name",
                    "sort": { "op": "max", "field": "y", "order": "descending" }
                },
                "range": "height",
                "padding": 0.5
            },
            {
                "name": "color",
                "type": "ordinal",
                "domain": { "data": "table", "field": "name" },
                "range": ["#8CE8AD",
                "#34C768",
                "#B14891",
                "#189D3E",
                "#724BC3",
                "#FF9831",
                "#87D3F2",
                "#35A4E8",
                "#C981B2",
                "#60E6E1",
                "#FF736A"]
            }
        ],

        "axes": [
            {
                "scale": "y",
                "orient": "left",
                "gridScale": "x",
                "domain": false,
                "labels": false,
                "aria": false,
                "maxExtent": 0,
                "minExtent": 0,
                "ticks": false,
                "zindex": 0
              },
              {
                "scale": "x",
                "orient": "bottom",
                "grid": true,
                "title": "Transaction Volume",
                "titleColor":"white",
                "titleFontSize": 14,
                "labelFontSize": 12,
                 "labelFont": { "value": "'EYInterstate','Segoe UI','sans-serif'" },
                "format": "f",
                "labelFlush": false,
                "titleFontWeight": "normal",
                 "titleFont":"EYInterstate",
                "titlePadding": 20,
                "labelOverlap": true,
                "domain": false,
                "ticks": false,
                "zindex": 0,
                "tickCount": {"signal": "ceil(height/40)"},
              },
              {
                "scale": "y",
                "orient": "left",
                "labelFontSize": 12,
                "labelFont": { "value": "'EYInterstate','Segoe UI','sans-serif'" },
                "grid": false,
                "domain": false,
                "ticks": false,
                "labelPadding": 15,
                "zindex": 0
              }
        ],
        "marks": [
            {
                "type": "group",
                "name": "concat_0_group",
                "update": {
                    "startAngle": {"field": "startAngle"},
                    "endAngle": {"field": "endAngle"},
                    "padAngle": {"signal": "padAngle"},
                    "innerRadius": {"signal": "innerRadius"},
                    "outerRadius": {"signal": "width / 2"},
                    "cornerRadius": {"signal": "cornerRadius"}
                  },
                "signals": [
                    {
                        "name": "mouse__move",
                        "on": [
                            {
                                "events": [
                                    {
                                        "source": "scope",
                                        "type": "mouseover",
                                    }
                                ],
                                "update": "datum && item().mark.marktype !== 'group' ? {unit: \"concat_0\", fields: recentTransaction_name, values: [(item().isVoronoi ? datum.datum : datum)[\"name\"]]} : null",
                                "force": true
                            },
                            {
                                "events": [{ "source": "view", "type": "mouseout" }],
                                "update": "null"
                            }
                        ]
                    },
                    { "name": "recentTransaction_name", "value": [{ "type": "E", "field": "name" }] },
                    {
                        "name": "updated_cityName",
                        "on": [
                            {
                                "events": { "signal": "mouse__move" },
                                "update": "modify(\"barChart_store\", mouse__move, true)"
                            }
                        ]
                    }
                ],
                "marks": [
                    {
                        "type": "rect",
                        "from": { "data": "table" },
                        "encode": {
                            "enter": {
                                "fill": { "scale": "color", "field": "name" },
                                "x": { "field": "x2", "offset": -5 },
                                "y": { "field": "y", "offset": { "field": "height", "mult": 0.5 } },
                                // "tooltip": {"signal": "datum.name+':'+datum.y+' Total Transactions'"},
                            },
                            "update": {
                                // "x": {"scale": "xscale", "signal": "tooltip.category", "band": 0.5},

                                // "y": {"scale": "yscale", "signal": "tooltip.amount", "offset": -2},
              "text":  {"signal": "datum.name+':'+datum.y+' Total Transactions'"},
                                "x": { "scale": "x", "value": 0 },
                                "x2": { "scale": "x", "field": "y" },
                                "y": { "scale": "y", "field": "name", },
                                "height": { "scale": "y", "band": 1 },
                                "opacity": [
                                    {
                                        "test": "!length(data(\"barChart_store\")) || vlSelectionTest(\"barChart_store\", datum)",
                                        "value": 1
                                    },
                                    { "value": 0.2 }
                                ],
                                "fillOpacity": {
                                    "signal": "if(selected && selected.name == datum.name, 1, 1)"
                                },
                            },
                            "hover": {
                                "fillOpacity": { "value": 1 },
                            }
                        }
                    },
                       {
          "type": "text",
          "encode": {
            "update": {
              "y": {"scale": "y", "signal": "tooltip.x", "band": 0.5},
              // "y": {"scale": "y", "signal": "tooltip.y", "offset": -2},
              "text": {"signal": "tooltip.y"},
            }
          }
        }
                ]
            }
        ]
    }
    return (
        <>
            <Vega spec={spec} actions={false}  />
        </>
    )
}

export default BarChart;