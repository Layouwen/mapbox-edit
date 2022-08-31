export default {
  version: 8,
  name: "tilesStyle",
  sources: {
    "outDoor-poi": {
      type: "vector",
      maxzoom: 18,
      tiles: ["http://localhost:5173/tile-map/map/poi/{z}/{x}/{y}.pbf"],
    },
    "outDoor-region": {
      type: "vector",
      maxzoom: 18,
      tiles: ["http://localhost:5173/tile-map/map/region/{z}/{x}/{y}.pbf"],
    },
    "1": {
      type: "vector",
      maxzoom: 19,
      tiles: [
        "https://map-1258113332.cos.ap-guangzhou.myqcloud.com/tiles/花都人医（地图配色测试）/1/{z}/{x}/{y}.pbf?version=1661911359120",
      ],
    },
    "-20": {
      type: "vector",
      maxzoom: 19,
      tiles: [
        "https://map-1258113332.cos.ap-guangzhou.myqcloud.com/tiles/花都人医（地图配色测试）/-20/{z}/{x}/{y}.pbf?version=1661911359120",
      ],
    },
  },
  bearing: 15.1,
  pitch: 45,
  light: {
    anchor: "viewport",
    color: "white",
    intensity: 0.3,
  },
  sprite:
    "https://map-1258113332.cos.ap-guangzhou.myqcloud.com/sprites/1221/sprite",
  glyphs:
    "https://map-1258113332.cos.ap-guangzhou.myqcloud.com/fonts/{fontstack}/{range}.pbf",
  layers: [
    {
      id: "background",
      type: "background",
      paint: { "background-color": "#000001" },
    },
    {
      id: "region",
      type: "fill",
      source: "outDoor-region",
      "source-layer": "region",
      filter: ["!in", "levelName", "water", "regions:subway"],
      paint: {
        "fill-color": [
          "match",
          ["get", "levelName"],
          "regions:green",
          "#071738",
          "regions:edu",
          "#07173A",
          "regions:public",
          "#07173A",
          "regions:traffic",
          "#07173A",
          "regions:scenicSpot",
          "#07173A",
          "regions:culture",
          "#07173A",
          "regions:health",
          "#07173A",
          "regions:business",
          "#07173A",
          "#0f0",
        ],
      },
    },
    {
      id: "region_subway",
      type: "fill",
      source: "outDoor-region",
      "source-layer": "region",
      filter: ["==", "levelName", "regions:subway"],
      paint: { "fill-color": "#36b6ab", "fill-opacity": 0.28 },
    },
    {
      id: "region_parkingLot",
      type: "fill",
      source: "outDoor-region",
      "source-layer": "region",
      filter: ["==", "levelName", "regions:parkingLot"],
      paint: { "fill-color": "#07173A" },
    },
    {
      id: "region_water",
      type: "fill",
      source: "outDoor-region",
      "source-layer": "region",
      filter: ["==", "levelName", "water"],
      paint: { "fill-color": "#09152A" },
    },
    {
      id: "roads:other_dash",
      type: "line",
      source: "outDoor-region",
      "source-layer": "road",
      filter: [
        "all",
        ["==", "levelName", "roads:other"],
        ["==", "levelId", "20011:1"],
      ],
      paint: {
        "line-color": "#0A1A29",
        "line-width": 2,
        "line-dasharray": [2, 2],
      },
      layout: { "line-join": "round" },
    },
    {
      id: "roads:other",
      type: "line",
      source: "outDoor-region",
      "source-layer": "road",
      filter: [
        "all",
        ["==", "levelName", "roads:other"],
        ["!=", "levelId", "20011:1"],
      ],
      paint: { "line-color": "#0A1A29", "line-width": 2 },
      layout: { "line-join": "round" },
    },
    {
      id: "roads:guideBoards_solid",
      type: "line",
      source: "outDoor-region",
      "source-layer": "road",
      minzoom: 9,
      filter: ["==", "levelName", "roads:guideBoards"],
      paint: {
        "line-color": "#0A1A29",
        "line-width": ["interpolate", ["linear"], ["zoom"], 8, 2, 9, 3, 20, 3],
      },
      layout: { "line-cap": "round", "line-join": "round" },
    },
    {
      id: "roads:guideBoards",
      type: "line",
      source: "outDoor-region",
      "source-layer": "road",
      minzoom: 9,
      filter: ["==", "levelName", "roads:guideBoards"],
      paint: {
        "line-color": "#0A1A29",
        "line-width": ["interpolate", ["linear"], ["zoom"], 8, 1, 9, 2, 20, 2],
      },
      layout: { "line-cap": "round", "line-join": "round" },
    },
    {
      id: "roads:roadsBeingBuilt_solid",
      type: "line",
      source: "outDoor-region",
      "source-layer": "road",
      minzoom: 14,
      filter: ["==", "levelName", "roads:roadsBeingBuilt"],
      paint: {
        "line-color": "#0A1A29",
        "line-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          14,
          2,
          15,
          2,
          16,
          4,
          17,
          5,
          18,
          6,
          19,
          6,
          20,
          7,
        ],
      },
      layout: { "line-cap": "round", "line-join": "round" },
    },
    {
      id: "roads:roadsBeingBuilt",
      type: "line",
      source: "outDoor-region",
      "source-layer": "road",
      minzoom: 14,
      filter: ["==", "levelName", "roads:roadsBeingBuilt"],
      paint: {
        "line-color": "#0A1A29",
        "line-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          14,
          1,
          15,
          1,
          16,
          3,
          17,
          4,
          18,
          5,
          19,
          5,
          20,
          6,
        ],
        "line-dasharray": [2, 2],
      },
      layout: { "line-cap": "round", "line-join": "round" },
    },
    {
      id: "roads:highSpeedRailway_solid",
      type: "line",
      source: "outDoor-region",
      "source-layer": "road",
      minzoom: 14,
      filter: ["==", "levelName", "roads:highSpeedRailway"],
      paint: {
        "line-color": "#0A1A29",
        "line-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          14,
          2,
          15,
          3,
          16,
          4,
          17,
          5,
          18,
          6,
          19,
          6,
          20,
          7,
        ],
      },
      layout: { "line-cap": "round", "line-join": "round" },
    },
    {
      id: "roads:highSpeedRailway",
      type: "line",
      source: "outDoor-region",
      "source-layer": "road",
      minzoom: 14,
      filter: ["==", "levelName", "roads:highSpeedRailway"],
      paint: {
        "line-color": "#0A1A29",
        "line-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          14,
          1,
          15,
          2,
          16,
          3,
          17,
          4,
          18,
          5,
          19,
          5,
          20,
          6,
        ],
      },
      layout: { "line-cap": "round", "line-join": "round" },
    },
    {
      id: "roads:railway_solid",
      type: "line",
      source: "outDoor-region",
      "source-layer": "road",
      minzoom: 7,
      filter: ["==", "levelName", "roads:railway"],
      paint: {
        "line-color": "#0A1A29",
        "line-width": ["interpolate", ["linear"], ["zoom"], 8, 2, 9, 3],
      },
      layout: { "line-join": "round" },
    },
    {
      id: "roads:railway",
      type: "line",
      source: "outDoor-region",
      "source-layer": "road",
      minzoom: 7,
      filter: ["==", "levelName", "roads:railway"],
      paint: {
        "line-color": "#0A1A29",
        "line-width": ["interpolate", ["linear"], ["zoom"], 8, 1, 9, 2],
        "line-dasharray": [12, 12],
      },
      layout: { "line-join": "round" },
    },
    {
      id: "roads:levelFourRoad_solid",
      type: "line",
      source: "outDoor-region",
      "source-layer": "road",
      minzoom: 15,
      filter: ["==", "levelName", "roads:levelFourRoad"],
      paint: {
        "line-color": "#0A1A29",
        "line-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          16,
          3,
          17,
          5,
          18,
          6,
        ],
      },
      layout: { "line-cap": "round", "line-join": "round" },
    },
    {
      id: "roads:levelFourRoad",
      type: "line",
      source: "outDoor-region",
      "source-layer": "road",
      minzoom: 15,
      filter: ["==", "levelName", "roads:levelFourRoad"],
      paint: {
        "line-color": "#0A1A29",
        "line-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          16,
          2,
          17,
          4,
          18,
          5,
        ],
      },
      layout: { "line-cap": "round", "line-join": "round" },
    },
    {
      id: "roads:levelThreeRoad_solid",
      type: "line",
      source: "outDoor-region",
      "source-layer": "road",
      minzoom: 14,
      filter: ["==", "levelName", "roads:levelThreeRoad"],
      paint: {
        "line-color": "#0A1A29",
        "line-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          14,
          2,
          15,
          3,
          16,
          4,
          17,
          5,
          18,
          6,
          19,
          6,
          20,
          7,
        ],
      },
      layout: { "line-cap": "round", "line-join": "round" },
    },
    {
      id: "roads:levelThreeRoad",
      type: "line",
      source: "outDoor-region",
      "source-layer": "road",
      minzoom: 14,
      filter: ["==", "levelName", "roads:levelThreeRoad"],
      paint: {
        "line-color": "#0A1A29",
        "line-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          14,
          1,
          15,
          2,
          16,
          3,
          17,
          4,
          18,
          5,
          19,
          5,
          20,
          6,
        ],
      },
      layout: { "line-cap": "round", "line-join": "round" },
    },
    {
      id: "roads:secondaryRoad_solid",
      type: "line",
      source: "outDoor-region",
      "source-layer": "road",
      minzoom: 11,
      filter: ["==", "levelName", "roads:secondaryRoad"],
      paint: {
        "line-color": "#0A1A29",
        "line-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          11,
          2,
          12,
          2,
          13,
          3,
          14,
          3,
          15,
          4,
          16,
          6,
          17,
          10,
        ],
      },
      layout: { "line-cap": "round", "line-join": "round" },
    },
    {
      id: "roads:secondaryRoad",
      type: "line",
      source: "outDoor-region",
      "source-layer": "road",
      minzoom: 11,
      filter: ["==", "levelName", "roads:secondaryRoad"],
      paint: {
        "line-color": "#0A1A29",
        "line-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          11,
          1,
          12,
          1,
          13,
          2,
          14,
          2,
          15,
          3,
          16,
          5,
          17,
          9,
        ],
      },
      layout: { "line-cap": "round", "line-join": "round" },
    },
    {
      id: "roads:nationalRoad_solid",
      type: "line",
      source: "outDoor-region",
      "source-layer": "road",
      minzoom: 7,
      filter: ["==", "levelName", "roads:nationalRoad"],
      paint: {
        "line-color": "#0A1A29",
        "line-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          7,
          2,
          9,
          2,
          10,
          3,
          11,
          3,
          12,
          4,
          13,
          4,
          14,
          6,
          15,
          6,
          16,
          11,
          17,
          11,
          18,
          13,
        ],
      },
      layout: { "line-cap": "round", "line-join": "round" },
    },
    {
      id: "roads:nationalRoad",
      type: "line",
      source: "outDoor-region",
      "source-layer": "road",
      minzoom: 7,
      filter: ["==", "levelName", "roads:nationalRoad"],
      paint: {
        "line-color": "#0A1A29",
        "line-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          7,
          1,
          9,
          1,
          10,
          2,
          11,
          2,
          12,
          3,
          13,
          3,
          14,
          5,
          15,
          5,
          16,
          10,
          17,
          10,
          18,
          12,
        ],
      },
      layout: { "line-cap": "round", "line-join": "round" },
    },
    {
      id: "roads:provincialRoad_solid",
      type: "line",
      source: "outDoor-region",
      "source-layer": "road",
      minzoom: 9,
      filter: ["==", "levelName", "roads:provincialRoad"],
      paint: {
        "line-color": "#0A1A29",
        "line-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          10,
          2,
          11,
          3,
          12,
          4,
          13,
          4,
          14,
          5,
          15,
          6,
          16,
          6,
          17,
          9,
          19,
          9,
          20,
          11,
        ],
      },
      layout: { "line-cap": "round", "line-join": "round" },
    },
    {
      id: "roads:provincialRoad",
      type: "line",
      source: "outDoor-region",
      "source-layer": "road",
      minzoom: 9,
      filter: ["==", "levelName", "roads:provincialRoad"],
      paint: {
        "line-color": "#0A1A29",
        "line-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          10,
          1,
          11,
          2,
          12,
          3,
          13,
          3,
          14,
          4,
          15,
          5,
          16,
          5,
          17,
          8,
          19,
          8,
          20,
          10,
        ],
      },
      layout: { "line-cap": "round", "line-join": "round" },
    },
    {
      id: "roads:ringRoad_solid",
      type: "line",
      source: "outDoor-region",
      "source-layer": "road",
      minzoom: 6,
      filter: ["==", "levelName", "roads:ringRoad"],
      paint: {
        "line-color": "#0A1A29",
        "line-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          6,
          6,
          7,
          2,
          8,
          3,
          9,
          2,
          10,
          3,
          11,
          4,
          12,
          4,
          13,
          4,
          14,
          7,
          15,
          7,
          16,
          11,
          17,
          11,
          18,
          11,
          19,
          13,
          20,
          13,
        ],
      },
      layout: { "line-cap": "round", "line-join": "round" },
    },
    {
      id: "roads:ringRoad",
      type: "line",
      source: "outDoor-region",
      "source-layer": "road",
      minzoom: 6,
      filter: ["==", "levelName", "roads:ringRoad"],
      paint: {
        "line-color": "#0A1A29",
        "line-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          6,
          5,
          7,
          1,
          8,
          2,
          9,
          1,
          10,
          2,
          11,
          3,
          12,
          3,
          13,
          3,
          14,
          6,
          15,
          6,
          16,
          10,
          17,
          10,
          18,
          10,
          19,
          12,
          20,
          12,
        ],
      },
      layout: { "line-cap": "round", "line-join": "round" },
    },
    {
      id: "roads:highWay_solid",
      type: "line",
      source: "outDoor-region",
      "source-layer": "road",
      minzoom: 6,
      filter: ["==", "levelName", "roads:highWay"],
      paint: {
        "line-color": "#0A1A29",
        "line-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          7,
          2,
          8,
          3,
          10,
          3,
          11,
          5,
          12,
          7,
          13,
          8,
          14,
          9,
          15,
          10,
          16,
          12,
          17,
          13,
          18,
          13,
          19,
          15,
        ],
      },
      layout: { "line-cap": "round", "line-join": "round" },
    },
    {
      id: "roads:highWay",
      type: "line",
      source: "outDoor-region",
      "source-layer": "road",
      minzoom: 6,
      filter: ["==", "levelName", "roads:highWay"],
      paint: {
        "line-color": "#0A1A29",
        "line-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          7,
          1,
          8,
          2,
          10,
          2,
          11,
          4,
          12,
          6,
          13,
          7,
          14,
          8,
          15,
          8,
          16,
          11,
          17,
          12,
          18,
          12,
          19,
          14,
        ],
      },
      layout: { "line-cap": "round", "line-join": "round" },
    },
    {
      id: "roads:subwayBeingBuilt",
      type: "line",
      source: "outDoor-region",
      "source-layer": "road",
      minzoom: 13,
      filter: ["==", "levelName", "roads:subwayBeingBuilt"],
      paint: {
        "line-color": "#0A1A29",
        "line-width": 2,
        "line-dasharray": [2, 2],
      },
      layout: { "line-join": "round" },
    },
    {
      id: "roads:subway",
      type: "line",
      source: "outDoor-region",
      "source-layer": "road",
      minzoom: 11,
      filter: ["==", "levelName", "roads:subway"],
      paint: {
        "line-color": "#0A1A29",
        "line-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          11,
          1,
          12,
          2,
          20,
          2,
        ],
      },
      layout: { "line-join": "round" },
    },
    {
      id: "roads:water",
      type: "line",
      source: "outDoor-region",
      "source-layer": "road",
      filter: ["==", "levelName", "water"],
      paint: {
        "line-color": "#09152A",
        "line-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          4,
          1,
          5,
          2,
          7,
          2,
          8,
          3,
          20,
          3,
        ],
      },
      layout: { "line-join": "round" },
    },
    {
      id: "roads:underPass_solid",
      type: "line",
      source: "outDoor-region",
      "source-layer": "road",
      filter: ["==", "levelName", "roads:underPass"],
      paint: {
        "line-color": "#0A1A29",
        "line-width": ["interpolate", ["linear"], ["zoom"], 17, 6, 18, 8],
      },
      layout: { "line-join": "round" },
    },
    {
      id: "roads:underPass",
      type: "line",
      source: "outDoor-region",
      "source-layer": "road",
      filter: ["==", "levelName", "roads:underPass"],
      paint: {
        "line-color": "#0A1A29",
        "line-width": 2,
        "line-dasharray": [2, 2],
      },
      layout: { "line-join": "round" },
    },
    {
      id: "roads:overPass_solid",
      type: "line",
      source: "outDoor-region",
      "source-layer": "road",
      minzoom: 17,
      filter: ["==", "levelName", "roads:overPass"],
      paint: {
        "line-color": "#0A1A29",
        "line-width": ["interpolate", ["linear"], ["zoom"], 17, 6, 18, 8],
      },
      layout: { "line-join": "round" },
    },
    {
      id: "roads:overPass",
      type: "line",
      source: "outDoor-region",
      "source-layer": "road",
      minzoom: 17,
      filter: ["==", "levelName", "roads:overPass"],
      paint: {
        "line-color": "#0A1A29",
        "line-width": ["interpolate", ["linear"], ["zoom"], 17, 6, 18, 8],
      },
      layout: { "line-join": "round" },
    },
    {
      id: "roads:test",
      type: "line",
      source: "outDoor-region",
      "source-layer": "road",
      minzoom: 6,
      filter: [
        "!in",
        "levelName",
        "water",
        "borders:China",
        "borders:foreign",
        "borders:provincial",
        "roads:overPass",
        "roads:underPass",
        "roads:subway",
        "roads:subwayBeingBuilt",
        "roads:highWay",
        "roads:ringRoad",
        "roads:provincialRoad",
        "roads:nationalRoad",
        "roads:subway",
        "roads:overPass",
        "roads:secondaryRoad",
        "roads:levelThreeRoad",
        "roads:levelFourRoad",
        "roads:railway",
        "roads:highSpeedRailway",
        "roads:roadsBeingBuilt",
        "roads:guideBoards",
        "roads:other",
      ],
      paint: { "line-color": "#0A1A29", "line-width": 3 },
      layout: { "line-cap": "round", "line-join": "round" },
    },
    {
      id: "borders:provincial_solid",
      type: "line",
      source: "outDoor-region",
      "source-layer": "road",
      minzoom: 3,
      filter: ["==", "levelName", "borders:provincial"],
      paint: { "line-color": "#2B3A7C", "line-width": 2 },
    },
    {
      id: "borders:provincial",
      type: "line",
      source: "outDoor-region",
      "source-layer": "road",
      minzoom: 3,
      filter: ["==", "levelName", "borders:provincial"],
      paint: { "line-color": "#2B3A7C", "line-width": 1 },
    },
    {
      id: "borders:foreign_solid",
      type: "line",
      source: "outDoor-region",
      "source-layer": "road",
      minzoom: 3,
      filter: ["==", "levelName", "borders:foreign"],
      paint: { "line-color": "#2B3A7C", "line-width": 2 },
    },
    {
      id: "borders:foreign",
      type: "line",
      source: "outDoor-region",
      "source-layer": "road",
      minzoom: 3,
      filter: ["==", "levelName", "borders:foreign"],
      paint: { "line-color": "#2B3A7C", "line-width": 1 },
    },
    {
      id: "borders:China_solid",
      type: "line",
      source: "outDoor-region",
      "source-layer": "road",
      minzoom: 3,
      filter: ["==", "levelName", "borders:China"],
      paint: {
        "line-opacity": 0.2,
        "line-color": "#0A1A29",
        "line-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          3,
          2,
          4,
          2,
          5,
          3,
          6,
          4,
          7,
          4,
          8,
          5,
          9,
          5,
        ],
      },
    },
    {
      id: "borders:China",
      type: "line",
      source: "outDoor-region",
      "source-layer": "road",
      minzoom: 3,
      filter: ["==", "levelName", "borders:China"],
      paint: {
        "line-color": "#0A1A29",
        "line-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          3,
          1,
          4,
          1,
          5,
          2,
          6,
          3,
          7,
          3,
          8,
          4,
          9,
          4,
        ],
      },
    },
    {
      id: "building",
      type: "fill",
      source: "outDoor-region",
      "source-layer": "building",
      paint: { "fill-color": "#07172A", "fill-opacity": 0.67 },
    },
    {
      id: "roadlabel",
      type: "symbol",
      source: "outDoor-poi",
      "source-layer": "roadlabel",
      filter: ["!in", "levelName", "roads:guideBoards"],
      layout: {
        "text-allow-overlap": true,
        "text-ignore-placement": true,
        "text-rotation-alignment": "map",
        "text-rotate": { type: "identity", property: "i2" },
        "text-font": ["notosansscregular"],
        "text-field": "{name}",
        "text-size": 13,
        "icon-allow-overlap": true,
        "icon-ignore-placement": true,
        "icon-image": "{icon}",
        "icon-size": 1.2,
      },
      paint: {
        "text-color": "#00A7D2",
        "text-halo-color": "#000000",
        "text-halo-width": 1,
      },
    },
    {
      id: "roadlabel_guideBoards",
      type: "symbol",
      source: "outDoor-poi",
      "source-layer": "roadlabel",
      filter: ["in", "levelName", "roads:guideBoards"],
      layout: {
        "text-rotate": { type: "identity", property: "i2" },
        "text-font": ["notosansscregular"],
        "text-field": "{name}",
        "text-size": 10,
        "icon-image": "{icon}",
        "icon-size": 1.5,
      },
      paint: {
        "text-color": [
          "match",
          ["get", "levelId"],
          "40001:110100",
          "#ffffff",
          "40001:110101",
          "#ffffff",
          "40001:110102",
          "#4a4a4a",
          "40001:110103",
          "#4a4a4a",
          "40001:110104",
          "#4a4a4a",
          "40001:110105",
          "#ffffff",
          "#ffffff",
        ],
      },
    },
    {
      id: "poilabel",
      type: "symbol",
      source: "outDoor-poi",
      "source-layer": "poilabel",
      layout: {
        "text-font": ["notosansscregular"],
        "text-field": "{name}",
        "text-size": 13,
        "text-anchor": "top",
        "text-offset": [0, -0.2],
        "icon-image": "{icon}",
        "icon-anchor": "bottom",
        "icon-size": 1.2,
      },
      paint: {
        "text-color": "#00A7D2",
        "text-halo-color": "#000000",
        "text-halo-width": 1,
      },
    },
    {
      id: "base_fill_ground",
      type: "fill",
      source: "-20",
      "source-layer": "ground",
      filter: ["==", "render", "院内马路"],
      paint: {
        "fill-color": "#F6F6F6",
        "fill-opacity": ["get", "fill-opacity"],
      },
    },
    {
      id: "base_fill",
      type: "fill",
      source: "-20",
      "source-layer": "ground",
      filter: ["!=", "render", "院内马路"],
      paint: {
        "fill-color": [
          "match",
          ["get", "render"],
          "中空",
          "#F3F3F3",
          "停车",
          "#F1C3CA",
          "公共",
          "#E4C89C",
          "图标-大门",
          "#50A294",
          "图标-门",
          "#FFFFFF",
          "墙",
          "#F8F8F8",
          "外框",
          "#FFFFFF",
          "建筑",
          "#B8C8CE",
          "河",
          "#B9E3EC",
          "科室",
          "#50A294",
          "绿地",
          "#DDE6E9",
          "行政",
          "#9FDEDC",
          "覆盖",
          "#F3F3F3",
          "诊疗",
          "#9ECDF2",
          "转换",
          "#FFD6CE",
          "醒目",
          "#EDBECE",
          "醒目1",
          "#50A294",
          "院内马路",
          "#F6F6F6",
          "院外马路",
          "#A8B0B5",
          "隐藏区",
          "#D5DEE1",
          "#747474",
        ],
        "fill-opacity": ["get", "fill-opacity"],
      },
    },
    {
      id: "background_boundary",
      type: "line",
      source: "1",
      "source-layer": "outline",
      minzoom: 17,
      filter: ["all", ["!=", "show_region", "false"], ["==", "render", "外框"]],
      paint: {
        "line-color": "#7C8CAC",
        "line-opacity": {
          stops: [
            [17.5, 0],
            [18, 1],
          ],
        },
        "line-width": ["interpolate", ["linear"], ["zoom"], 0, 3, 15, 4, 22, 2],
      },
    },
    {
      id: "background_line",
      type: "line",
      source: "1",
      "source-layer": "outline",
      minzoom: 17.5,
      filter: ["all", ["!=", "show_region", "false"], ["==", "render", "外框"]],
      paint: {
        "line-color": "hsl(0, 0, 20%)",
        "line-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          5,
          15,
          5,
          22,
          30,
        ],
        "line-blur": 50,
      },
    },
    {
      id: "background_fill",
      type: "fill-extrusion",
      source: "1",
      "source-layer": "outline",
      minzoom: 17,
      filter: ["!=", "show_region", "false"],
      paint: {
        "fill-extrusion-color": "#FFFFFF",
        "fill-extrusion-opacity": {
          stops: [
            [17, 0],
            [17.5, 1],
          ],
        },
      },
    },
    {
      id: "common_fill",
      type: "fill",
      source: "1",
      "source-layer": "plane",
      minzoom: 17,
      filter: [
        "all",
        ["==", "$type", "Polygon"],
        [
          "all",
          ["!=", "show_region", "false"],
          ["!=", "show_3D", true],
          ["!=", "fill-opacity", 0],
        ],
      ],
      paint: {
        "fill-color": [
          "match",
          ["get", "render"],
          "中空",
          "#F3F3F3",
          "停车",
          "#F1C3CA",
          "公共",
          "#E4C89C",
          "图标-大门",
          "#50A294",
          "图标-门",
          "#FFFFFF",
          "墙",
          "#F8F8F8",
          "外框",
          "#FFFFFF",
          "建筑",
          "#B8C8CE",
          "河",
          "#B9E3EC",
          "科室",
          "#50A294",
          "绿地",
          "#DDE6E9",
          "行政",
          "#9FDEDC",
          "覆盖",
          "#F3F3F3",
          "诊疗",
          "#9ECDF2",
          "转换",
          "#FFD6CE",
          "醒目",
          "#EDBECE",
          "醒目1",
          "#50A294",
          "院内马路",
          "#F6F6F6",
          "院外马路",
          "#A8B0B5",
          "隐藏区",
          "#D5DEE1",
          "#747474",
        ],
        "fill-opacity": {
          stops: [
            [17, 0],
            [17.5, 1],
          ],
        },
      },
    },
    {
      id: "zk_blur",
      type: "line",
      source: "1",
      "source-layer": "plane",
      minzoom: 17,
      filter: ["==", "render", "中空"],
      paint: {
        "line-color": "hsl(0, 0, 20%)",
        "line-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          1,
          15,
          1,
          22,
          20,
        ],
        "line-blur": 50,
        "line-offset": 3,
        "line-opacity": {
          stops: [
            [17, 0],
            [17.5, 1],
          ],
        },
      },
    },
    {
      id: "common_line",
      type: "line",
      source: "1",
      "source-layer": "plane",
      minzoom: 17,
      filter: ["all", ["!=", "show_region", "false"], ["==", "render", "停车"]],
      paint: {
        "line-color": "#EEEEEE",
      },
    },
    {
      id: "3D_line",
      type: "line",
      source: "1",
      "source-layer": "room",
      minzoom: 18,
      filter: [
        "all",
        ["!=", "show_region", "false"],
        ["==", "show_3D", true],
        ["in", "$type", "LineString", "Polygon"],
      ],
      paint: {
        "line-color": "#000",
        "line-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          15,
          0,
          18,
          1,
          22,
          12,
        ],
        "line-blur": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          15,
          0,
          18,
          30,
          22,
          80,
        ],
        "line-height": 0,
      },
    },
    {
      id: "3D_fill",
      type: "fill-extrusion",
      source: "1",
      "source-layer": "room",
      minzoom: 17,
      filter: [
        "all",
        ["==", "$type", "Polygon"],
        ["all", ["!=", "show_region", "false"], ["==", "show_3D", true]],
      ],
      paint: {
        "fill-extrusion-color": [
          "match",
          ["get", "render"],
          "中空",
          "#F3F3F3",
          "停车",
          "#F1C3CA",
          "公共",
          "#E4C89C",
          "图标-大门",
          "#50A294",
          "图标-门",
          "#FFFFFF",
          "墙",
          "#F8F8F8",
          "外框",
          "#FFFFFF",
          "建筑",
          "#B8C8CE",
          "河",
          "#B9E3EC",
          "科室",
          "#50A294",
          "绿地",
          "#DDE6E9",
          "行政",
          "#9FDEDC",
          "覆盖",
          "#F3F3F3",
          "诊疗",
          "#9ECDF2",
          "转换",
          "#FFD6CE",
          "醒目",
          "#EDBECE",
          "醒目1",
          "#50A294",
          "院内马路",
          "#F6F6F6",
          "院外马路",
          "#A8B0B5",
          "隐藏区",
          "#D5DEE1",
          "#747474",
        ],
        "fill-extrusion-opacity": {
          stops: [
            [17, 0],
            [17.5, 0.9],
          ],
        },
        "fill-extrusion-height": ["get", "fill-3D-height"],
        "fill-extrusion-base": 0,
      },
    },
    {
      id: "textIcon_symbol",
      type: "symbol",
      source: "1",
      "source-layer": "symbol",
      minzoom: 18.5,
      filter: ["all", ["==", "$type", "Point"], ["!=", "show_3D", true]],
      layout: {
        "text-font": ["notosansscregular"],
        "text-field": "{label}",
        "text-size": 12,
        "icon-image": "{icon_sails}",
        "icon-size": 0.8,
        "icon-offset": [0, -20],
      },
      paint: {
        "text-color": "#747474",
        "text-halo-width": 1.5,
        "text-halo-color": "#FFFFFF",
      },
    },
    {
      id: "3D_textIcon_symbol",
      type: "symbol",
      source: "1",
      "source-layer": "symbol",
      minzoom: 18.5,
      filter: ["all", ["==", "$type", "Point"], ["==", "show_3D", true]],
      layout: {
        "text-font": ["notosansscregular"],
        "text-field": "{label}",
        "text-size": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          10,
          18,
          11,
          22,
          16,
        ],
        "icon-image": "{icon_sails}",
        "icon-size": 0.8,
        "icon-offset": [0, -20],
      },
      paint: {
        "text-color": "#747474",
        "text-halo-width": 1.5,
        "text-halo-color": "#FFFFFF",
        "text-height": 0.9,
        "icon-height": 0.9,
      },
    },
    {
      id: "area_symbol",
      type: "symbol",
      source: "1",
      "source-layer": "area",
      minzoom: 17,
      maxzoom: 18.5,
      layout: {
        "text-font": ["notosansscregular"],
        "text-field": "{label}",
        "text-size": 14,
        "icon-image": "{icon_sails}",
        "icon-size": 0.8,
        "icon-offset": [0, -20],
      },
      paint: {
        "text-color": "#747474",
        "text-halo-width": 1.5,
        "text-halo-blur": 2,
        "text-halo-color": "#FFFFFF",
        "text-opacity": {
          stops: [
            [17, 0],
            [17.5, 1],
          ],
        },
      },
    },
    {
      id: "base_symbol",
      type: "symbol",
      source: "-20",
      "source-layer": "symbol",
      minzoom: 15,
      filter: ["all", ["==", "$type", "Point"], ["!=", "render", "建筑"]],
      layout: {
        "text-font": ["notosansscregular"],
        "text-field": "{label}",
        "text-size": 15,
        "icon-image": "{icon_sails}",
        "icon-size": 0.8,
        "icon-offset": [0, -20],
      },
      paint: {
        "text-color": {
          type: "categorical",
          property: "render",
          stops: [
            ["公共", "#697B8D"],
            ["图标-大门", "#656E85"],
            ["图标-门", "#656E85"],
            ["建筑", "#74879B"],
            ["行政", "#4F929F"],
            ["诊疗", "#3D82A5"],
            ["醒目", "#D267A7"],
            ["院外马路", "#868686"],
          ],
          default: "#747474",
        },
        "text-halo-width": 1.5,
        "text-halo-blur": 0.5,
        "text-halo-color": "#FFFFFF",
      },
    },
    {
      id: "base_3D",
      type: "fill-extrusion",
      source: "-20",
      "source-layer": "ground",
      maxzoom: 17.5,
      filter: ["==", "show_3D", true],
      paint: {
        "fill-extrusion-color": "#C6DAED",
        "fill-extrusion-opacity": {
          stops: [
            [17, 0.93],
            [17.5, 0],
          ],
        },
        "fill-extrusion-height": ["get", "fill-3D-height"],
        "fill-extrusion-base": 0,
      },
    },
    {
      id: "building_symbol",
      type: "symbol",
      source: "-20",
      "source-layer": "symbol",
      minzoom: 14,
      maxzoom: 18.5,
      filter: ["all", ["==", "$type", "Point"], ["==", "render", "建筑"]],
      layout: {
        "text-font": ["notosansscregular"],
        "text-field": "{label}",
        "text-size": 16.5,
        "icon-image": "{icon_sails}",
        "icon-size": 0.8,
        "icon-offset": [0, -20],
      },
      paint: {
        "text-color": "#74879B",
        "text-halo-width": 1.5,
        "text-halo-blur": 2,
        "text-halo-color": "#FFFFFF",
      },
    },
  ],
  zoom: 17.4,
  center: [113.20658142022563, 23.376015016923034],
};
