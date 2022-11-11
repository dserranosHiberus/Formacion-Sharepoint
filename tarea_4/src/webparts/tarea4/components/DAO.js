"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.GetGruposdeUnidad = exports.getSectoresyUnidades = void 0;
// import * as React from 'react';
var react_1 = require("react");
var pnpjsConfig_1 = require("../../../pnpjsConfig");
var LIST_NAME = "Sectores/Unidades";
var LIST2_NAME = "Grupos de la Unidad X";
// *****Lectura Lista Sectores y Unidades*****
function getSectoresyUnidades(props) {
    return __awaiter(this, void 0, void 0, function () {
        var _sp, _a, sectoresyUnidades, setSectoresyUnidades;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _sp = (0, pnpjsConfig_1.getSP)(props.context);
                    _a = (0, react_1.useState)([]), sectoresyUnidades = _a[0], setSectoresyUnidades = _a[1];
                    console.log("context", _sp);
                    return [4 /*yield*/, _sp.web.lists.getByTitle(LIST_NAME).items().then(function (value) {
                            readSectoresyUnidades(value);
                            function readSectoresyUnidades(lista1) {
                                var listaSectores = lista1.map(function (item) {
                                    return {
                                        ID: item.ID,
                                        CodigoDelSector: item.CodigoDelSector,
                                        Denominacion: item.Denominacion,
                                        URLImagenSector: item.URLImagenSector,
                                        URLListaGrupos: item.URLListaGrupos,
                                        URLListaReuniones: item.URLListaReuniones,
                                        URLBiblioteca: item.URLBiblioteca,
                                        URLGrupoAdmSector: item.URLGrupoAdmSector,
                                        URLGrupoUsuariosSector: item.URLGrupoUsuariosSector
                                    };
                                });
                                setSectoresyUnidades(listaSectores);
                            }
                        })];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.getSectoresyUnidades = getSectoresyUnidades;
// *****Lectura lista Grupos de Unidad X*****
function GetGruposdeUnidad(props) {
    return __awaiter(this, void 0, void 0, function () {
        var _sp, _a, gruposdeUnidad, setGruposdeUnidad;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _sp = (0, pnpjsConfig_1.getSP)(props.context);
                    _a = (0, react_1.useState)([]), gruposdeUnidad = _a[0], setGruposdeUnidad = _a[1];
                    // console.log("context", _sp)
                    return [4 /*yield*/, _sp.web.lists.getByTitle(LIST2_NAME).items.select("*", "SectorAsociado/Denominacion", "TaxCatchAll/Term").expand("TaxCatchAll", "SectorAsociado")().then(function (value) {
                            // console.log("Noticias: ", value);
                            readGruposdeUnidad(value);
                            function readGruposdeUnidad(lista2) {
                                var listaGrupos = lista2.map(function (item) {
                                    return {
                                        ID: item.ID,
                                        CodigoDeGrupo: item.CodigoDeGrupo,
                                        SectorAsociado: item.SectorAsociado.Denominacion,
                                        Denominacion: item.Denominacion,
                                        Descripcion: item.Descripcion,
                                        FechaDeCreacion: new Date(item.FechaDeCreacion).toLocaleDateString('es-ES'),
                                        FechaDeFinalizacion: new Date(item.FechaDeFinalizacion).toLocaleDateString('es-ES'),
                                        Ambito: item.TaxCatchAll[2].Term,
                                        TipoDeGrupo: item.TipoDeGrupo,
                                        Tematica: item.Tematica,
                                        AmbitoGeografico: item.AmbitoGeografico,
                                        AmbitoOrganizativoInternacional: item.AmbitoOrganizativoInternacional,
                                        Estado: item.Estado,
                                        Pais: item.TaxCatchAll[1].Term,
                                        Ciudad: item.TaxCatchAll[0].Term,
                                        Attachments: item.Attachments
                                    };
                                });
                                setGruposdeUnidad(listaGrupos);
                            }
                        })];
                case 1:
                    // console.log("context", _sp)
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.GetGruposdeUnidad = GetGruposdeUnidad;
