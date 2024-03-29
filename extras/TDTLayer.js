/**
 * Created by dahua on 2019/5/31.
 */
define([
        "esri/layers/WebTileLayer",
        "esri/geometry/SpatialReference",
        "esri/layers/support/TileInfo",
        "esri/request"],
    function (WebTileLayer, SpatialReference, TileInfo, esriRequest) {
        return WebTileLayer.createSubclass({
            properties: {
                id: "TDTLayer",
                title: "TDTLayer",
                urlTemplate: null,
                subDomains: null,
                spatialReference: new SpatialReference({wkid: 4326}),
                tileInfo: new TileInfo({
                    "dpi": 90.71428571427429,
                    "rows": 256,
                    "cols": 256,
                    "compressionQuality": 0,
                    "origin": {
                        "x": -180,
                        "y": 90
                    },
                    "spatialReference": {
                        "wkid": 4326
                    },
                    "lods": [
                        {level: 2, levelValue: 2, resolution: 0.3515625, scale: 147748796.52937502},
                        {level: 3, levelValue: 3, resolution: 0.17578125, scale: 73874398.264687508},
                        {level: 4, levelValue: 4, resolution: 0.087890625, scale: 36937199.132343754},
                        {level: 5, levelValue: 5, resolution: 0.0439453125, scale: 18468599.566171877},
                        {level: 6, levelValue: 6, resolution: 0.02197265625, scale: 9234299.7830859385},
                        {level: 7, levelValue: 7, resolution: 0.010986328125, scale: 4617149.8915429693},
                        {level: 8, levelValue: 8, resolution: 0.0054931640625, scale: 2308574.9457714846},
                        {level: 9, levelValue: 9, resolution: 0.00274658203125, scale: 1154287.4728857423},
                        {level: 10, levelValue: 10, resolution: 0.001373291015625, scale: 577143.73644287116},
                        {level: 11, levelValue: 11, resolution: 0.0006866455078125, scale: 288571.86822143558},
                        {level: 12, levelValue: 12, resolution: 0.00034332275390625, scale: 144285.93411071779},
                        {level: 13, levelValue: 13, resolution: 0.000171661376953125, scale: 72142.967055358895},
                        {level: 14, levelValue: 14, resolution: 8.58306884765625e-005, scale: 36071.483527679447},
                        {level: 15, levelValue: 15, resolution: 4.291534423828125e-005, scale: 18035.741763839724},
                        {level: 16, levelValue: 16, resolution: 2.1457672119140625e-005, scale: 9017.8708819198619},
                        {level: 17, levelValue: 17, resolution: 1.0728836059570313e-005, scale: 4508.9354409599309},
                        {level: 18, levelValue: 18, resolution: 5.3644180297851563e-006, scale: 2254.4677204799655},
                        {level: 19, levelValue: 19, resolution: 2.68220901489257815e-006, scale: 1127.23386023998275},
                        {level: 20, levelValue: 20, resolution: 1.341104507446289075e-006, scale: 563.616930119991375}
                    ]
                })
            },
            getTileUrl: function (level, row, col) {
                return this.urlTemplate.replace("{level}", level).replace("{row}", row).replace("{col}", col);
            },
            fetchTile: function (level, row, col) {
                var url = this.getTileUrl(level, row, col);
                return esriRequest(url, {
                    responseType: "image"
                })
                .then(function (response) {
                    var image = response.data;
                    var width = this.tileInfo.size[0];
                    var height = this.tileInfo.size[0];

                    var canvas = document.createElement("canvas");
                    var context = canvas.getContext("2d");
                    canvas.width = width;
                    canvas.height = height;

                    context.drawImage(image, 0, 0, width, height);

                    return canvas;
                }.bind(this));
            }
        });
    });