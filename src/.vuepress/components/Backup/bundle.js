(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.BackupConverter = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PaperToTachiBackupConverter = void 0;
    var PaperbackBackup_1 = require("../Paperback/PaperbackBackup");
    var ConversionSources_1 = require("../ConversionSources/ConversionSources");
    var uuid_1 = require("uuid");
    var TachiyomiBackupManager_1 = require("../Tachiyomi/TachiyomiBackupManager");
    /*
        WORK IN PROGRESS
    */
    /**
     * Manage conversion from {@link PaperbackBackup.Backup} to {@link TachiyomiObjectModel.Backup}
     *
     * @param tachiyomiBackup - The Tachiyomi backup object that should be converted
     */
    var PaperToTachiBackupConverter = /** @class */ (function () {
        /**
         * @param paperbackBackup - The Paperback backup object that should be converted
         */
        function PaperToTachiBackupConverter(paperbackBackup) {
            // TODO: change default date
            this.defaultPaperbackDate = 650645332.25231397;
            this.defaultTachiyomiDate = 1629031544315;
            this.paperbackBackup = paperbackBackup;
        }
        /**
         * Handle the conversion of {@link paperbackBackup}
         *
         * @returns the converted Tachiyomi backup object
         */
        PaperToTachiBackupConverter.prototype.conversion = function () {
            return __awaiter(this, void 0, void 0, function () {
                var tachiyomiBackupManager, conversionSourcesDict, usedSources, categories, unconvertedMangas, _i, _a, tab, _b, _c, libraryManga, _d, _e, sourceManga, sourceConverter, backupManga;
                return __generator(this, function (_f) {
                    tachiyomiBackupManager = new TachiyomiBackupManager_1.TachiyomiBackupManager();
                    conversionSourcesDict = this.createConversionSourcesDict();
                    usedSources = new Set();
                    categories = {};
                    unconvertedMangas = [];
                    // We will first create the list of all categories in the original backup
                    // and add them to the converted one
                    for (_i = 0, _a = this.paperbackBackup.tabs; _i < _a.length; _i++) {
                        tab = _a[_i];
                        // We will use tabs.length as sortOrder
                        categories[tab.id] = tab.sortOrder;
                        tachiyomiBackupManager.appendCategory({
                            name: tab.name,
                            order: tab.sortOrder
                        });
                    }
                    // Then we convert all manga from the Tachiyomi backup
                    // They are stored in tachiyomiBackup.backupManga
                    for (_b = 0, _c = this.paperbackBackup.library; _b < _c.length; _b++) {
                        libraryManga = _c[_b];
                        // Each manga contains data in three places
                        // - libraryManga
                        // - sourceManga
                        // - chapterMarkers
                        // this manga is the base and independent from the source
                        // We add a title for each pair (libraryManga, sourceManga) as there may be merged sources
                        for (_d = 0, _e = this.paperbackBackup.sourceMangas; _d < _e.length; _d++) {
                            sourceManga = _e[_d];
                            if (libraryManga.manga.id == sourceManga.manga.id) {
                                sourceConverter = conversionSourcesDict[sourceManga.sourceId];
                                if (sourceConverter === undefined) {
                                    unconvertedMangas.push(sourceManga);
                                    console.log("Unsupported source " + sourceManga.sourceId.toString());
                                }
                                else {
                                    // We convert the title
                                    usedSources.add(sourceManga.sourceId);
                                    backupManga = this.parseBackupManga(libraryManga, sourceManga, categories, sourceConverter);
                                    tachiyomiBackupManager.appendBackupManga(backupManga);
                                    /*// We need to parse mangaInfo only *one* time
                                    // in order to use the same UUID for libraryManga and sourceManga
                                    const mangaInfo = this.parseMangaInfo(manga)
                                
                                    const libraryManga = this.parseLibraryManga(manga, mangaInfo, tabs)
                                    paperbackBackupManager.appendLibraryManga(libraryManga)
                    
                                    const sourceManga = this.parseSourceManga(manga, mangaInfo, sourceConverter)
                                    paperbackBackupManager.appendSourceManga(sourceManga)
                    
                                    const chapterMarkers = this.parseChapterMarkers(manga, sourceConverter)
                                    paperbackBackupManager.appendChapterMarkers(chapterMarkers)
                                    */
                                }
                            }
                        }
                        // If it does not exist, we wont be able to convert the manga
                    }
                    /*
                    // Then we add activeSources we found and their corresponding repositories
                    for (const tachiyomiSourceId of usedSources) {
            
                        const converter = conversionSourcesDict[tachiyomiSourceId]
            
                        const paperbackSourceId = converter.paperbackSourceId
                        const paperbackSourceRepository = converter.paperbackSourceRepository
            
                        let versioning = repositoriesDict[paperbackSourceRepository.url]
            
                        // We first check if the versioning file of the repository is already already fetched
                        if (versioning === undefined) {
                            // If it is not, we make a request to get it
                            versioning = await PaperbackRepository.getRepositoryVersioning(paperbackSourceRepository.url)
            
                            repositoriesDict[paperbackSourceRepository.url] = versioning
            
                            paperbackBackupManager.appendSourceRepository(converter.paperbackSourceRepository)
                        }
            
                        // We need to find the right source in the versioning file, construct the ActiveSource object and append it to the backup
                        for (const sourceData of versioning.sources) {
                            if (sourceData.id === paperbackSourceId) {
                                const activeSource = this.parseActiveSource(sourceData, paperbackSourceRepository)
                                paperbackBackupManager.appendActiveSource(activeSource)
                            }
                        }
                    }
                    */
                    return [2 /*return*/, tachiyomiBackupManager.exportBackup()];
                });
            });
        };
        /**
         * Generate a dictionary using tachiyomiSourceIds as keys
         * @returns A dictionary containing available conversionSources
         */
        PaperToTachiBackupConverter.prototype.createConversionSourcesDict = function () {
            var converters = ConversionSources_1.getConversionSourcesList();
            console.log(converters);
            var migrationSources = {};
            for (var _i = 0, converters_1 = converters; _i < converters_1.length; _i++) {
                var converter = converters_1[_i];
                migrationSources[converter.paperbackSourceId] = converter;
            }
            return migrationSources;
        };
        /**
         * Convert the date elements used in Tachiyomi to
         * @param tachiyomiDate a string representing a timestamp (in milliseconds since 1970?) (ex: 1606427053160)
         * @return The converted for Paperback timestamp (in seconds since 2001?) (ex: 650645332.25231397)
         */
        PaperToTachiBackupConverter.prototype.convertTachiyomiDate = function (tachiyomiDate) {
            /*
             * Tachiyomi backup seems to be using a timestamp in milliseconds since 1970 while Paperback accept a timestamp in seconds since 2001
             */
            var date = Number(tachiyomiDate);
            if (isNaN(date)) {
                // Default value
                // TODO: change to the current date
                return this.defaultPaperbackDate;
            }
            // We convert the date in seconds
            date = date / 1000;
            // We add 31 years
            return date - 31556926 * 31;
        };
        // UNUSED
        /*
        parseCategory(category: TachiyomiObjectModel.IBackupCategory, sortOrder: number): PaperbackBackup.LibraryTab {
            // TODO: Should we use category.order?
            return  {
                id: uuidv4().toUpperCase(),
                name: category.name ?? "unnamed",
                sortOrder: sortOrder
            }
        }
        */
        // UNUSED
        /**
         * **Warning**: the method generate a new UUID to represent the manga.
         * It should thus only be called **once** per title
         * @param manga a {@link TachiyomiObjectModel.IBackupManga} object
         * @returns the generated {@link PaperbackBackup.MangaInfo} object
         */
        /*
        private parseMangaInfo(manga: TachiyomiObjectModel.IBackupManga): PaperbackBackup.MangaInfo {
    
            // These elements does not exist in Tachiyomi backups
            const mangaInfoAdditionalInfo: PaperbackBackup.MangaInfoAdditionalInfo = {
                langFlag:  "_unknown",
                users:     "0",
                langName:  "Unknown",
                avgRating: "0.0",
                views:     "0",
                follows:   "0",
            }
    
            // Grab all of the tags
            let tags: {id: string, value: string}[] = []
            for (let genre of manga.genre) {
                tags.push({id: genre, value: genre})
            }
    
            let mangaInfoTag: PaperbackBackup.MangaInfoTag[] = [{
                id:    "0",
                label: "genres",
                tags:  tags
            }]
    
            return {
                id:             uuidv4().toUpperCase(),
                rating:         0,                          // Ratings do not exist in Tachiyomi backups
                covers:         [],
                author:         manga.author ?? "",
                tags:           mangaInfoTag,
                desc:           manga.description ?? "",
                titles:         [manga.title ?? ""],
                image:          manga.thumbnailUrl ?? "",
                additionalInfo: mangaInfoAdditionalInfo,
                hentai:         false,                      // Not supported, which is kinda awkward, so flag everything as false so nothing is hidden by default
                artist:         manga.artist ?? "",
                status:         this.parseStatus(manga.status)
            }
        }
        */
        PaperToTachiBackupConverter.prototype.parseStatus = function (tachiyomiStatus) {
            // Tachiyomi status are defined here:
            // https://github.com/tachiyomiorg/tachiyomi/blob/master/app/src/main/java/eu/kanade/tachiyomi/source/model/SManga.kt
            // Paperback status here:
            // https://github.com/Paperback-iOS/extensions-common/blob/master/src/models/Manga/index.ts
            // The status can be a long so we need to convert it to a number
            switch (Number(tachiyomiStatus)) {
                case 0: {
                    return PaperbackBackup_1.PaperbackBackup.MangaStatus.UNKNOWN;
                }
                case 1: {
                    return PaperbackBackup_1.PaperbackBackup.MangaStatus.ONGOING;
                }
                case 2: {
                    return PaperbackBackup_1.PaperbackBackup.MangaStatus.COMPLETED;
                }
                case 3: {
                    // LICENSED is not supported by Paperback
                    return PaperbackBackup_1.PaperbackBackup.MangaStatus.UNKNOWN;
                }
                default: {
                    return PaperbackBackup_1.PaperbackBackup.MangaStatus.UNKNOWN;
                }
            }
        };
        /**
         * @param manga the Tachiyomi {@link TachiyomiObjectModel.IBackupManga} object
         * @param mangaInfo the Paperback object, which should be generated using {@link parseMangaInfo}
         * @param tabs the list of all tabs present in the backup, identifiables by index
         * @returns The generated {@link PaperbackBackup.LibraryManga} object
         */
        PaperToTachiBackupConverter.prototype.parseBackupManga = function (libraryManga, sourceManga, categories, converter) {
            console.log("parsing source id");
            console.log(converter.getMainTachiyomiSourceId());
            console.log(sourceManga.sourceId);
            return {
                source: Number(converter.getMainTachiyomiSourceId()),
                url: sourceManga.mangaId,
                title: (libraryManga.manga.titles.length > 0) ? libraryManga.manga.titles[0] : "untitled",
                artist: libraryManga.manga.artist,
                author: libraryManga.manga.author,
                description: libraryManga.manga.desc,
                genre: [],
                status: 1,
                thumbnailUrl: libraryManga.manga.image,
                dateAdded: 1629031544315,
                chapters: [],
                categories: [],
                history: []
            };
            /*
          // The date conversion may fail if there is no history elements
          try {
              var lastRead = this.convertTachiyomiDate(manga.history[0].lastRead)
          } catch {
              var lastRead = this.defaultPaperbackDate
          }
    
          // The date conversion may fail if there is no history elements
          try {
              // We use the fetch date of the latest chapter (position 0) assuming it should be the more recent
              var lastUpdated = this.convertTachiyomiDate(manga.chapters[0].dateFetch)
          } catch {
              var lastUpdated = this.defaultPaperbackDate
          }
    
          // We need to parse categories/tabs for this manga
          let libraryTabs: PaperbackBackup.LibraryTab[] = []
          for (const tachiyomiCategoryIndex of manga.categories) {
              if (tachiyomiCategoryIndex < tabs.length) {
                  libraryTabs.push(tabs[tachiyomiCategoryIndex])
              } else {
                  console.log(`The index ${tachiyomiCategoryIndex} does not exist in tabs`)
              }
          }
    
          return {
              lastRead:       lastRead,                       // There may be no last read chapters
              manga:          mangaInfo,
              lastUpdated:    lastUpdated,
              dateBookmarked: this.defaultPaperbackDate,      // Does not exist in Tachiyomi backup
              libraryTabs:    libraryTabs,
              updates:        0                               // Does not exist
          }
          */
        };
        /**
         * @param manga the Tachiyomi {@linkcode TachiyomiObjectModel.IBackupManga} object
         * @param mangaInfo the Paperback object, which should be generated using {@linkcode parseMangaInfo}
         * @param sourceConverter a conversionSource that should handle the source the manga come from
         * @returns The generated {@linkcode PaperbackBackup.SourceManga} object
         */
        PaperToTachiBackupConverter.prototype.parseSourceManga = function (manga, mangaInfo, sourceConverter) {
            var _a;
            return {
                mangaId: sourceConverter.parseTachiyomiMangaId((_a = manga.url) !== null && _a !== void 0 ? _a : "undefined", manga),
                id: uuid_1.v4().toUpperCase(),
                manga: mangaInfo,
                originalInfo: mangaInfo,
                sourceId: sourceConverter.paperbackSourceId
            };
        };
        return PaperToTachiBackupConverter;
    }());
    exports.PaperToTachiBackupConverter = PaperToTachiBackupConverter;
    
    },{"../ConversionSources/ConversionSources":4,"../Paperback/PaperbackBackup":10,"../Tachiyomi/TachiyomiBackupManager":13,"uuid":77}],2:[function(require,module,exports){
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
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TachiToPaperBackupConverter = void 0;
    var PaperbackBackup_1 = require("../Paperback/PaperbackBackup");
    var PaperbackBackupManager_1 = require("../Paperback/PaperbackBackupManager");
    var ConversionSources_1 = require("../ConversionSources/ConversionSources");
    var uuid_1 = require("uuid");
    /**
     * Manage conversion from {@link TachiyomiObjectModel.Backup} to {@link PaperbackBackup.Backup}
     *
     * @param tachiyomiBackup - The Tachiyomi backup object that should be converted
     */
    var TachiToPaperBackupConverter = /** @class */ (function () {
        /**
         * @param tachiyomiBackup - The Tachiyomi backup object that should be converted
         */
        function TachiToPaperBackupConverter(tachiyomiBackup) {
            // TODO: change default date
            this.defaultPaperbackDate = 650645332.25231397;
            this.tachiyomiBackup = tachiyomiBackup;
        }
        /**
         * Handle the conversion of {@link tachiyomiBackup}
         *
         * @returns the a promise resolving into the converted Paperback backup object
         */
        TachiToPaperBackupConverter.prototype.conversion = function () {
            var _a;
            return __awaiter(this, void 0, void 0, function () {
                var paperbackBackupManager, conversionSourcesDict, usedSources, repositoriesDict, tabs, unconvertedMangas, _i, _b, category, paperbackTab, _c, _d, manga, sourceConverter, mangaInfo, libraryManga, sourceManga, chapterMarkers;
                return __generator(this, function (_e) {
                    paperbackBackupManager = new PaperbackBackupManager_1.PaperbackBackupManager();
                    conversionSourcesDict = this.createConversionSourcesDict();
                    usedSources = new Set();
                    repositoriesDict = {};
                    tabs = [];
                    unconvertedMangas = [];
                    // We will first create the list of all categories in the original backup
                    // and add them to the converted one
                    for (_i = 0, _b = this.tachiyomiBackup.backupCategories; _i < _b.length; _i++) {
                        category = _b[_i];
                        paperbackTab = this.parseCategory(category, tabs.length);
                        tabs.push(paperbackTab);
                        paperbackBackupManager.appendLibraryTab(paperbackTab);
                    }
                    // Then we convert all manga from the Tachiyomi backup
                    // They are stored in tachiyomiBackup.backupManga
                    for (_c = 0, _d = this.tachiyomiBackup.backupManga; _c < _d.length; _c++) {
                        manga = _d[_c];
                        sourceConverter = (manga.source === undefined || manga.source === null) ? undefined : conversionSourcesDict[manga.source.toString()] // If source is undefined, we return undefined as we will never find a converter
                        ;
                        // If it does not exist, we wont be able to convert the manga
                        if (sourceConverter === undefined) {
                            unconvertedMangas.push(manga);
                            console.log("Unsupported source " + ((_a = manga.source) === null || _a === void 0 ? void 0 : _a.toString()));
                        }
                        else {
                            // We convert the title
                            usedSources.add(manga.source.toString()); // We known here that the source is not undefined
                            mangaInfo = this.parseMangaInfo(manga);
                            libraryManga = this.parseLibraryManga(manga, mangaInfo, tabs);
                            paperbackBackupManager.appendLibraryManga(libraryManga);
                            sourceManga = this.parseSourceManga(manga, mangaInfo, sourceConverter);
                            paperbackBackupManager.appendSourceManga(sourceManga);
                            chapterMarkers = this.parseChapterMarkers(manga, sourceConverter);
                            paperbackBackupManager.appendChapterMarkers(chapterMarkers);
                        }
                    }
                    // Then we add activeSources we found and their corresponding repositories
                    /*
                    for (const tachiyomiSourceId of usedSources) {
            
                        const converter = conversionSourcesDict[tachiyomiSourceId]
            
                        const paperbackSourceId = converter.paperbackSourceId
                        const paperbackSourceRepository = converter.paperbackSourceRepository
            
                        let versioning = repositoriesDict[paperbackSourceRepository.url]
            
                        // We first check if the versioning file of the repository is already already fetched
                        if (versioning === undefined) {
                            // If it is not, we make a request to get it
                            versioning = await PaperbackRepository.getRepositoryVersioning(paperbackSourceRepository.url)
            
                            repositoriesDict[paperbackSourceRepository.url] = versioning
            
                            paperbackBackupManager.appendSourceRepository(converter.paperbackSourceRepository)
                        }
            
                        // We need to find the right source in the versioning file, construct the ActiveSource object and append it to the backup
                        for (const sourceData of versioning.sources) {
                            if (sourceData.id === paperbackSourceId) {
                                const activeSource = this.parseActiveSource(sourceData, paperbackSourceRepository)
                                paperbackBackupManager.appendActiveSource(activeSource)
                            }
                        }
                    }
                    */
                    return [2 /*return*/, paperbackBackupManager.exportBackup()];
                });
            });
        };
        /**
         * Generate a dictionary using tachiyomiSourceIds as keys
         * @returns A dictionary containing available conversionSources
         */
        TachiToPaperBackupConverter.prototype.createConversionSourcesDict = function () {
            var converters = ConversionSources_1.getConversionSourcesList();
            console.log(converters);
            var migrationSources = {};
            for (var _i = 0, converters_1 = converters; _i < converters_1.length; _i++) {
                var converter = converters_1[_i];
                // The conversionSource define a list of Tachiyomi ids, on per language.
                // We will create an entry in migrationSources for each id
                for (var _a = 0, _b = converter.tachiyomiSourceIds; _a < _b.length; _a++) {
                    var tachiyomiSourceId = _b[_a];
                    migrationSources[tachiyomiSourceId] = converter;
                }
            }
            return migrationSources;
        };
        /**
         * Convert the date elements used in Tachiyomi to
         * @param tachiyomiDate a string representing a timestamp (in milliseconds since 1970?) (ex: 1606427053160)
         * @return The converted for Paperback timestamp (in seconds since 2001?) (ex: 650645332.25231397)
         */
        TachiToPaperBackupConverter.prototype.convertTachiyomiDate = function (tachiyomiDate) {
            /*
             * Tachiyomi backup seems to be using a timestamp in milliseconds since 1970 while Paperback accept a timestamp in seconds since 2001
             */
            var date = Number(tachiyomiDate);
            if (isNaN(date)) {
                // Default value
                // TODO: change to the current date
                return this.defaultPaperbackDate;
            }
            // We convert the date in seconds
            date = date / 1000;
            // We add 31 years
            return date - 31556926 * 31;
        };
        TachiToPaperBackupConverter.prototype.parseCategory = function (category, sortOrder) {
            var _a;
            // TODO: Should we use category.order?
            return {
                id: uuid_1.v4().toUpperCase(),
                name: (_a = category.name) !== null && _a !== void 0 ? _a : "unnamed",
                sortOrder: sortOrder
            };
        };
        /**
         * **Warning**: the method generate a new UUID to represent the manga.
         * It should thus only be called **once** per title
         * @param manga a {@link TachiyomiObjectModel.IBackupManga} object
         * @returns the generated {@link PaperbackBackup.MangaInfo} object
         */
        TachiToPaperBackupConverter.prototype.parseMangaInfo = function (manga) {
            var _a, _b, _c, _d, _e, _f;
            // These elements does not exist in Tachiyomi backups
            var mangaInfoAdditionalInfo = {
                langFlag: "_unknown",
                users: "0",
                langName: "Unknown",
                avgRating: "0.0",
                views: "0",
                follows: "0",
            };
            // Grab all of the tags
            var tags = [];
            for (var _i = 0, _g = ((_a = manga.genre) !== null && _a !== void 0 ? _a : []); _i < _g.length; _i++) {
                var genre = _g[_i];
                tags.push({ id: genre, value: genre });
            }
            var mangaInfoTag = [{
                    id: "0",
                    label: "genres",
                    tags: tags
                }];
            return {
                id: uuid_1.v4().toUpperCase(),
                rating: 0,
                covers: [],
                author: (_b = manga.author) !== null && _b !== void 0 ? _b : "",
                tags: mangaInfoTag,
                desc: (_c = manga.description) !== null && _c !== void 0 ? _c : "",
                titles: [(_d = manga.title) !== null && _d !== void 0 ? _d : ""],
                image: (_e = manga.thumbnailUrl) !== null && _e !== void 0 ? _e : "",
                additionalInfo: mangaInfoAdditionalInfo,
                hentai: false,
                artist: (_f = manga.artist) !== null && _f !== void 0 ? _f : "",
                status: this.parseStatus(manga.status)
            };
        };
        TachiToPaperBackupConverter.prototype.parseStatus = function (tachiyomiStatus) {
            // Tachiyomi status are defined here:
            // https://github.com/tachiyomiorg/tachiyomi/blob/master/app/src/main/java/eu/kanade/tachiyomi/source/model/SManga.kt
            // Paperback status here:
            // https://github.com/Paperback-iOS/extensions-common/blob/master/src/models/Manga/index.ts
            // The status can be a long so we need to convert it to a number
            // If the status is undefined, `Number(tachiyomiStatus)` will be NaN, the switch will use the default value
            switch (Number(tachiyomiStatus)) {
                case 0: {
                    return PaperbackBackup_1.PaperbackBackup.MangaStatus.UNKNOWN;
                }
                case 1: {
                    return PaperbackBackup_1.PaperbackBackup.MangaStatus.ONGOING;
                }
                case 2: {
                    return PaperbackBackup_1.PaperbackBackup.MangaStatus.COMPLETED;
                }
                case 3: {
                    // LICENSED is not supported by Paperback
                    return PaperbackBackup_1.PaperbackBackup.MangaStatus.UNKNOWN;
                }
                default: {
                    return PaperbackBackup_1.PaperbackBackup.MangaStatus.UNKNOWN;
                }
            }
        };
        /**
         * @param manga the Tachiyomi {@link TachiyomiObjectModel.IBackupManga} object
         * @param mangaInfo the Paperback object, which should be generated using {@link parseMangaInfo}
         * @param tabs the list of all tabs present in the backup, identifiables by index
         * @returns The generated {@link PaperbackBackup.LibraryManga} object
         */
        TachiToPaperBackupConverter.prototype.parseLibraryManga = function (manga, mangaInfo, tabs) {
            var _a;
            // The date conversion may fail if there is no history elements
            try {
                var lastRead = this.convertTachiyomiDate(manga.history[0].lastRead);
            }
            catch (_b) {
                var lastRead = this.defaultPaperbackDate;
            }
            // The date conversion may fail if there is no history elements
            try {
                // We use the fetch date of the latest chapter (position 0) assuming it should be the more recent
                var lastUpdated = this.convertTachiyomiDate(manga.chapters[0].dateFetch);
            }
            catch (_c) {
                var lastUpdated = this.defaultPaperbackDate;
            }
            // We need to parse categories/tabs for this manga
            var libraryTabs = [];
            for (var _i = 0, _d = ((_a = manga.categories) !== null && _a !== void 0 ? _a : []); _i < _d.length; _i++) {
                var tachiyomiCategoryIndex = _d[_i];
                if (tachiyomiCategoryIndex < tabs.length) {
                    libraryTabs.push(tabs[tachiyomiCategoryIndex]);
                }
                else {
                    console.log("The index " + tachiyomiCategoryIndex + " does not exist in tabs");
                }
            }
            return {
                lastRead: lastRead,
                manga: mangaInfo,
                lastUpdated: lastUpdated,
                dateBookmarked: this.defaultPaperbackDate,
                libraryTabs: libraryTabs,
                updates: 0 // Does not exist
            };
        };
        /**
         * @param manga the Tachiyomi {@linkcode TachiyomiObjectModel.IBackupManga} object
         * @param mangaInfo the Paperback object, which should be generated using {@linkcode parseMangaInfo}
         * @param sourceConverter a conversionSource that should handle the source the manga come from
         * @returns The generated {@linkcode PaperbackBackup.SourceManga} object
         */
        TachiToPaperBackupConverter.prototype.parseSourceManga = function (manga, mangaInfo, sourceConverter) {
            var _a;
            return {
                mangaId: sourceConverter.parseTachiyomiMangaId((_a = manga.url) !== null && _a !== void 0 ? _a : "", manga),
                id: uuid_1.v4().toUpperCase(),
                manga: mangaInfo,
                originalInfo: mangaInfo,
                sourceId: sourceConverter.paperbackSourceId
            };
        };
        /**
         * @param manga the Tachiyomi {@linkcode TachiyomiObjectModel.IBackupManga} object
         * @param sourceConverter a conversionSource that should handle the source the manga come from
         * @returns The generated {@linkcode PaperbackBackup.ChapterMarker} list
         */
        TachiToPaperBackupConverter.prototype.parseChapterMarkers = function (manga, sourceConverter) {
            var _a;
            var chapterMarkers = [];
            for (var _i = 0, _b = ((_a = manga.history) !== null && _a !== void 0 ? _a : []); _i < _b.length; _i++) {
                var chapterHistory = _b[_i];
                var chapterMarker = this.parseChapterMarker(chapterHistory, manga, sourceConverter);
                if (chapterMarker !== undefined) {
                    chapterMarkers.push(chapterMarker);
                }
            }
            return chapterMarkers;
        };
        TachiToPaperBackupConverter.prototype.parseChapterMarker = function (chapterHistory, manga, sourceConverter) {
            // Get the corresponding chapter details for this history element `chapterHistory`
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            var chapter;
            for (var _i = 0, _l = ((_a = manga.chapters) !== null && _a !== void 0 ? _a : []); _i < _l.length; _i++) {
                var obj = _l[_i];
                if (chapterHistory.url == obj.url) {
                    chapter = obj;
                    break;
                }
            }
            // You should never hit this error, but if Tachiyomi somehow has a history element without a corresponding chapter, don't fill data
            if (chapter === undefined) {
                return undefined;
            }
            var dateUpload;
            try {
                dateUpload = this.convertTachiyomiDate(chapter.dateUplaod);
            }
            catch (error) {
                dateUpload = this.defaultPaperbackDate;
            }
            var dateFetch;
            try {
                dateFetch = this.convertTachiyomiDate(chapter.dateFetch);
            }
            catch (error) {
                dateFetch = this.defaultPaperbackDate;
            }
            var chapterInfo = {
                chapNum: (_b = chapter.chapterNumber) !== null && _b !== void 0 ? _b : -2,
                mangaId: sourceConverter.parseTachiyomiMangaId((_c = manga.url) !== null && _c !== void 0 ? _c : "", manga),
                volume: -2,
                id: sourceConverter.parseTachiyomiChapterId((_d = chapter.url) !== null && _d !== void 0 ? _d : "", manga),
                time: dateUpload,
                sortingIndex: (_e = chapter.sourceOrder) !== null && _e !== void 0 ? _e : -2,
                sourceId: sourceConverter.paperbackSourceId,
                group: (_f = chapter.scanlator) !== null && _f !== void 0 ? _f : "",
                langCode: "_unknown",
                name: (_g = chapter.name) !== null && _g !== void 0 ? _g : ""
            };
            var chapterMarker = {
                totalPages: (_h = chapter.lastPageRead) !== null && _h !== void 0 ? _h : 0,
                lastPage: (_j = chapter.lastPageRead) !== null && _j !== void 0 ? _j : 0,
                chapter: chapterInfo,
                completed: (_k = chapter.read) !== null && _k !== void 0 ? _k : false,
                time: dateFetch,
                hidden: false
            };
            return chapterMarker;
        };
        TachiToPaperBackupConverter.prototype.parseActiveSource = function (sourceData, repository) {
            /*
                We may want to use:
                    contentRating:  sourceData.contentRating ?? "EVERYONE",
                We will assume that all sources included in the Tachiyomi backup should be added to the Paperback backup
                and should be restored by the app even is content settings are not set in the app, we will thus use:
                    contentRating:  "EVERYONE",
                for every sources
            */
            return {
                author: sourceData.author,
                desc: sourceData.desc,
                website: sourceData.desc,
                id: sourceData.id,
                tags: sourceData.tags,
                contentRating: "EVERYONE",
                websiteBaseURL: sourceData.websiteBaseURL,
                repo: repository.url,
                version: sourceData.version,
                icon: sourceData.icon,
                name: sourceData.name
            };
        };
        return TachiToPaperBackupConverter;
    }());
    exports.TachiToPaperBackupConverter = TachiToPaperBackupConverter;
    
    },{"../ConversionSources/ConversionSources":4,"../Paperback/PaperbackBackup":10,"../Paperback/PaperbackBackupManager":11,"uuid":77}],3:[function(require,module,exports){
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AbstractConversionSource = void 0;
    /**
     * An abstract class which facilitates a proper migration between a Tachiyomi and a Paperback source
     *
     * The function {@link getConversionSourcesList} should be modified when a new source converter is added
     */
    var AbstractConversionSource = /** @class */ (function () {
        function AbstractConversionSource() {
        }
        // TODO: handle languages better?
        AbstractConversionSource.prototype.getMainTachiyomiSourceId = function () {
            return this.tachiyomiSourceIds[0];
        };
        return AbstractConversionSource;
    }());
    exports.AbstractConversionSource = AbstractConversionSource;
    
    },{}],4:[function(require,module,exports){
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getConversionSourcesList = void 0;
    var GuyaConversionSource_1 = require("./GuyaConversionSource");
    var MangadexConversionSource_1 = require("./MangadexConversionSource");
    var MangaLifeConversionSource_1 = require("./MangaLifeConversionSource");
    var ManganeloConversionSource_1 = require("./ManganeloConversionSource");
    var MangaseeConversionSource_1 = require("./MangaseeConversionSource");
    /**
     * A function that return a list of all available source converters.
     * It is used by backup converters to be able to access all existing source converters
     */
    function getConversionSourcesList() {
        /*
            This function should be updated when a new source converter is added
        */
        return [
            new GuyaConversionSource_1.GuyaConversionSource(),
            new MangadexConversionSource_1.MangaDexConversionSource(),
            new MangaLifeConversionSource_1.MangaLifeConversionSource(),
            new ManganeloConversionSource_1.ManganeloConversionSource(),
            new MangaseeConversionSource_1.MangaseeConversionSource(),
        ];
    }
    exports.getConversionSourcesList = getConversionSourcesList;
    
    },{"./GuyaConversionSource":5,"./MangaLifeConversionSource":6,"./MangadexConversionSource":7,"./ManganeloConversionSource":8,"./MangaseeConversionSource":9}],5:[function(require,module,exports){
    "use strict";
    var __extends = (this && this.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            if (typeof b !== "function" && b !== null)
                throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GuyaConversionSource = void 0;
    var PaperbackRepository_1 = require("../Paperback/PaperbackRepository");
    var AbstractConversionSource_1 = require("./AbstractConversionSource");
    var GuyaConversionSource = /** @class */ (function (_super) {
        __extends(GuyaConversionSource, _super);
        function GuyaConversionSource() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            // Only an `en` source exist for Guya
            _this.tachiyomiSourceIds = ["4637971935551651734"];
            _this.paperbackSourceId = "Guya"; // In this case, the source ID in Paperback is also Guya!
            _this.tachiyomiSourceName = "Guya"; // A user friendly identifier for this tachiyomi source
            _this.paperbackSourceName = "Guya";
            _this.paperbackSourceRepository = PaperbackRepository_1.PaperbackRepository.PROMISES;
            return _this;
        }
        /*
            mangaID:
                Tachiyomi: "Kaguya-Wants-To-Be-Confessed-To"
                Paperback: "Kaguya-Wants-To-Be-Confessed-To"
            chapterId:
                Tachiyomi: "Kaguya-Wants-To-Be-Confessed-To/172.1/3"
                Paperback: "172.1|3"
            Guya API:
                manga id: Kaguya-Wants-To-Be-Confessed-To
                chapter id: 172.1
                group id: 3
        */
        GuyaConversionSource.prototype.parseTachiyomiMangaId = function (tachiyomiId, mangaInfo) {
            return tachiyomiId;
        };
        GuyaConversionSource.prototype.parseTachiyomiChapterId = function (tachiyomiId, mangaInfo) {
            var _a = tachiyomiId.split("/"), mangaId = _a[0], chapterId = _a[1], group = _a[2];
            return chapterId + "|" + group;
        };
        GuyaConversionSource.prototype.parsePaperbackMangaId = function (paperbackId, mangaInfo) {
            return paperbackId;
        };
        GuyaConversionSource.prototype.parsePaperbackChapterId = function (paperbackId, mangaInfo) {
            var _a = paperbackId.split("|"), chapterId = _a[0], group = _a[1];
            var mangaId = mangaInfo.mangaId;
            return mangaId + "/" + chapterId + "/" + group;
        };
        return GuyaConversionSource;
    }(AbstractConversionSource_1.AbstractConversionSource));
    exports.GuyaConversionSource = GuyaConversionSource;
    
    },{"../Paperback/PaperbackRepository":12,"./AbstractConversionSource":3}],6:[function(require,module,exports){
    "use strict";
    var __extends = (this && this.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            if (typeof b !== "function" && b !== null)
                throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MangaLifeConversionSource = void 0;
    var PaperbackRepository_1 = require("../Paperback/PaperbackRepository");
    var AbstractConversionSource_1 = require("./AbstractConversionSource");
    var MangaLifeConversionSource = /** @class */ (function (_super) {
        __extends(MangaLifeConversionSource, _super);
        function MangaLifeConversionSource() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            // Only an `en` source exist for MangaLife
            _this.tachiyomiSourceIds = ["7798162483793432927"];
            _this.paperbackSourceId = "MangaLife"; // In this case, the source ID in Paperback is also MangaLife!
            _this.tachiyomiSourceName = "MangaLife"; // A user friendly identifier for this tachiyomi source
            _this.paperbackSourceName = "MangaLife";
            _this.paperbackSourceRepository = PaperbackRepository_1.PaperbackRepository.PROMISES;
            return _this;
        }
        /*
            mangaID:
                Tachiyomi: "/manga/One-Piece"
                Paperback: "One-Piece"
            chapterId:
                Tachiyomi: "/read-online/One-Piece-chapter-1020.html"
                Paperback: "One-Piece-chapter-1020.html"
        */
        MangaLifeConversionSource.prototype.parseTachiyomiMangaId = function (tachiyomiId, mangaInfo) {
            return tachiyomiId.replace('/manga/', '');
        };
        MangaLifeConversionSource.prototype.parseTachiyomiChapterId = function (tachiyomiId, mangaInfo) {
            return tachiyomiId.replace('/read-online/', '');
        };
        MangaLifeConversionSource.prototype.parsePaperbackMangaId = function (paperbackId, mangaInfo) {
            return '/manga/' + paperbackId;
        };
        MangaLifeConversionSource.prototype.parsePaperbackChapterId = function (paperbackId, mangaInfo) {
            return '/read-online/' + paperbackId;
        };
        return MangaLifeConversionSource;
    }(AbstractConversionSource_1.AbstractConversionSource));
    exports.MangaLifeConversionSource = MangaLifeConversionSource;
    
    },{"../Paperback/PaperbackRepository":12,"./AbstractConversionSource":3}],7:[function(require,module,exports){
    "use strict";
    var __extends = (this && this.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            if (typeof b !== "function" && b !== null)
                throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MangaDexConversionSource = void 0;
    var PaperbackRepository_1 = require("../Paperback/PaperbackRepository");
    var AbstractConversionSource_1 = require("./AbstractConversionSource");
    var MangaDexConversionSource = /** @class */ (function (_super) {
        __extends(MangaDexConversionSource, _super);
        function MangaDexConversionSource() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            // There is no `all` source but only a `en` source: "2499283573021220255", used as default
            _this.tachiyomiSourceIds = ["2499283573021220255", "1411768577036936240", "8033579885162383068", "4710920497926776490", "6750440049024086587", "1952071260038453057", "2098905203823335614", "5098537545549490547", "4284949320785450865", "4505830566611664829", "8254121249433835847", "9194073792736219759", "3260701926561129943", "5463447640980279236", "6400665728063187402", "2655149515337070132", "5189216366882819742", "1145824452519314725", "3339599426223341161", "425785191804166217", "5148895169070562838", "4150470519566206911", "4774459486579224459", "3578612018159256808", "5967745367608513818", "3846770256925560569", "3807502156582598786", "3285208643537017688", "4938773340256184018", "3781216447842245147", "1471784905273036181", "1713554459881080228", "5860541308324630662", "8578871918181236609", "1493666528525752601", "5779037855201976894", "1347402746269051958", "737986167355114438", "1424273154577029558", "6840513937945146538", "4872213291993424667"];
            _this.paperbackSourceId = "MangaDex"; // In this case, the source ID in Paperback is also MangaDex!
            _this.tachiyomiSourceName = "MangaDex"; // A user friendly identifier for this tachiyomi source
            _this.paperbackSourceName = "MangaDex";
            _this.paperbackSourceRepository = PaperbackRepository_1.PaperbackRepository.STATEFUL;
            return _this;
        }
        /*
            mangaID:
                Tachiyomi: "/manga/090ea171-2896-42b9-b29f-03f92d88d3af"
                Paperback: "090ea171-2896-42b9-b29f-03f92d88d3af"
            chapterId
                Tachiyomi: "/chapter/4199cec7-28cd-4dd2-8df1-31f1f4d6d2f4"
                Paperback: "4199cec7-28cd-4dd2-8df1-31f1f4d6d2f4"
        */
        MangaDexConversionSource.prototype.parseTachiyomiMangaId = function (tachiyomiId, mangaInfo) {
            return tachiyomiId.replace('/manga/', '');
        };
        MangaDexConversionSource.prototype.parseTachiyomiChapterId = function (tachiyomiId, mangaInfo) {
            return tachiyomiId.replace('/chapter/', '');
        };
        MangaDexConversionSource.prototype.parsePaperbackMangaId = function (paperbackId, mangaInfo) {
            return "/manga/" + paperbackId;
        };
        MangaDexConversionSource.prototype.parsePaperbackChapterId = function (paperbackId, mangaInfo) {
            return "/chapter/" + paperbackId;
        };
        return MangaDexConversionSource;
    }(AbstractConversionSource_1.AbstractConversionSource));
    exports.MangaDexConversionSource = MangaDexConversionSource;
    
    },{"../Paperback/PaperbackRepository":12,"./AbstractConversionSource":3}],8:[function(require,module,exports){
    "use strict";
    var __extends = (this && this.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            if (typeof b !== "function" && b !== null)
                throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ManganeloConversionSource = void 0;
    var PaperbackRepository_1 = require("../Paperback/PaperbackRepository");
    var AbstractConversionSource_1 = require("./AbstractConversionSource");
    var ManganeloConversionSource = /** @class */ (function (_super) {
        __extends(ManganeloConversionSource, _super);
        function ManganeloConversionSource() {
            // Manganelo and Manganato represent the same source
            var _this = _super !== null && _super.apply(this, arguments) || this;
            // Only an `en` source exist for Manganelo
            _this.tachiyomiSourceIds = ["1024627298672457456"];
            _this.paperbackSourceId = "Manganelo"; // In this case, the source ID in Paperback is also Manganelo!
            _this.tachiyomiSourceName = "Manganato"; // A user friendly identifier for this tachiyomi source
            _this.paperbackSourceName = "Manganelo";
            _this.paperbackSourceRepository = PaperbackRepository_1.PaperbackRepository.PROMISES;
            return _this;
        }
        /*
            mangaID:
                Tachiyomi: "/manga/dj919202"
                Paperback: "dj919202"
            chapterId:
                Tachiyomi: "/chapter/dj919202/chapter_9"
                Paperback: "chapter_9"
        */
        ManganeloConversionSource.prototype.parseTachiyomiMangaId = function (tachiyomiId, mangaInfo) {
            // Tachiyomi for this source returns things of format '/manga/dj919202' where paperback just needs the 'dj919202' bits
            return tachiyomiId.replace('/manga/', '');
        };
        ManganeloConversionSource.prototype.parseTachiyomiChapterId = function (tachiyomiId, mangaInfo) {
            // '/chapter/dj919202/chapter_4' is an example of what we might see
            return tachiyomiId.replace(/(.+)\//, '');
        };
        ManganeloConversionSource.prototype.parsePaperbackMangaId = function (paperbackId, mangaInfo) {
            return '/manga/' + paperbackId;
        };
        ManganeloConversionSource.prototype.parsePaperbackChapterId = function (paperbackId, mangaInfo) {
            return '/chapter/' + mangaInfo.mangaId + paperbackId;
        };
        return ManganeloConversionSource;
    }(AbstractConversionSource_1.AbstractConversionSource));
    exports.ManganeloConversionSource = ManganeloConversionSource;
    
    },{"../Paperback/PaperbackRepository":12,"./AbstractConversionSource":3}],9:[function(require,module,exports){
    "use strict";
    var __extends = (this && this.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            if (typeof b !== "function" && b !== null)
                throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MangaseeConversionSource = void 0;
    var PaperbackRepository_1 = require("../Paperback/PaperbackRepository");
    var AbstractConversionSource_1 = require("./AbstractConversionSource");
    var MangaseeConversionSource = /** @class */ (function (_super) {
        __extends(MangaseeConversionSource, _super);
        function MangaseeConversionSource() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            // Only an `en` source exist for Mangasee
            _this.tachiyomiSourceIds = ["9"]; // Tachiyomi calls MangaReader this value - Yeah, 9 is kinda wild
            _this.paperbackSourceId = "Mangasee"; // In this case, the source ID in Paperback is also Mangasee!
            _this.tachiyomiSourceName = "Mangasee"; // A user friendly identifier for this tachiyomi source
            _this.paperbackSourceName = "Mangasee";
            _this.paperbackSourceRepository = PaperbackRepository_1.PaperbackRepository.PROMISES;
            return _this;
        }
        /*
            mangaID:
                Tachiyomi: "/manga/Martial-Peak"
                Paperback: "Martial-Peak"
            chapterId:
                Tachiyomi: "/read-online/Martial-Peak-chapter-1406-index-2.html"
                Paperback: "Martial-Peak-chapter-1406-index-2.html"
        */
        MangaseeConversionSource.prototype.parseTachiyomiMangaId = function (tachiyomiId, mangaInfo) {
            return tachiyomiId.replace('/manga/', '');
        };
        MangaseeConversionSource.prototype.parseTachiyomiChapterId = function (tachiyomiId, mangaInfo) {
            return tachiyomiId.replace('/read-online/', '');
        };
        MangaseeConversionSource.prototype.parsePaperbackMangaId = function (paperbackId, mangaInfo) {
            return '/manga/' + paperbackId;
        };
        MangaseeConversionSource.prototype.parsePaperbackChapterId = function (paperbackId, mangaInfo) {
            return '/read-online/' + paperbackId;
        };
        return MangaseeConversionSource;
    }(AbstractConversionSource_1.AbstractConversionSource));
    exports.MangaseeConversionSource = MangaseeConversionSource;
    
    },{"../Paperback/PaperbackRepository":12,"./AbstractConversionSource":3}],10:[function(require,module,exports){
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PaperbackBackup = void 0;
    var PaperbackBackup;
    (function (PaperbackBackup) {
        var MangaStatus;
        (function (MangaStatus) {
            MangaStatus["ONGOING"] = "Ongoing";
            MangaStatus["COMPLETED"] = "Completed";
            MangaStatus["UNKNOWN"] = "Unknown";
            MangaStatus["ABANDONED"] = "Abandoned";
            MangaStatus["HIATUS"] = "Hiatus";
        })(MangaStatus = PaperbackBackup.MangaStatus || (PaperbackBackup.MangaStatus = {}));
    })(PaperbackBackup = exports.PaperbackBackup || (exports.PaperbackBackup = {}));
    
    },{}],11:[function(require,module,exports){
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PaperbackBackupManager = void 0;
    /**
     * TODO: info about the version
     */
    var PaperbackBackupManager = /** @class */ (function () {
        function PaperbackBackupManager() {
            //this.backup = this.returnEmptyBackup()
            this.backup = {
                library: [],
                sourceMangas: [],
                chapterMarkers: [],
                backupSchemaVersion: 3,
                date: 650282810.89528203,
                tabs: [],
                version: "v0.6.0-b1.0.5",
                sourceRepositories: [],
                activeSources: []
            };
        }
        PaperbackBackupManager.prototype.returnEmptyBackup = function () {
            return {
                library: [],
                sourceMangas: [],
                chapterMarkers: [],
                backupSchemaVersion: 3,
                date: 650282810.89528203,
                tabs: [],
                version: "v0.6.0-b1.0.5",
                sourceRepositories: [],
                activeSources: []
            };
        };
        /* Loading a backup */
        /**
         * Load a Paperback backup
         * @param backup the {@link PaperbackBackup.Backup} object
         */
        PaperbackBackupManager.prototype.loadBackup = function (backup) {
            this.backup = backup;
        };
        /**
         * Parse a stringified {@link PaperbackBackup.Backup} object and load it
         * @param text the `string` containing a Paperback backup
         * @note The function will throw if the `backupSchemaVersion` is unsupported
         */
        PaperbackBackupManager.prototype.loadText = function (text) {
            var backup = JSON.parse(text);
            if (backup.backupSchemaVersion !== 3) {
                throw new Error("Unsupported backupSchemaVersion: " + backup.backupSchemaVersion);
            }
            this.loadBackup(backup);
        };
        // TODO: add loadBuffer
        /* Exporting a backup */
        PaperbackBackupManager.prototype.exportBackup = function () {
            return this.backup;
        };
        /**
         * @returns A {@link LightRepresentation} of the backup, easily exploitable to display the main content of the backup.
         */
        PaperbackBackupManager.prototype.exportLightRepresentation = function () {
            var library = [];
            var tabs = {};
            var sources = {};
            // Manga parsing
            for (var _i = 0, _a = this.backup.library; _i < _a.length; _i++) {
                var libraryManga = _a[_i];
                var tabsIds = [];
                for (var _b = 0, _c = libraryManga.libraryTabs; _b < _c.length; _b++) {
                    var libraryTab = _c[_b];
                    tabsIds.push(libraryTab.id);
                }
                // There can be multiple merged sources for this title
                // We will find these sources in `this.backup.sourceMangas`
                var sourcesIds = [];
                for (var _d = 0, _e = this.backup.sourceMangas; _d < _e.length; _d++) {
                    var sourceManga = _e[_d];
                    // The correspondance is in sourceManga.manga.id and libraryManga.manga.id
                    if (sourceManga.manga.id === libraryManga.manga.id) {
                        sourcesIds.push(sourceManga.sourceId);
                    }
                }
                library.push({
                    id: libraryManga.manga.id,
                    titles: libraryManga.manga.titles,
                    author: libraryManga.manga.author,
                    artist: libraryManga.manga.artist,
                    description: libraryManga.manga.desc,
                    cover: libraryManga.manga.image,
                    hentai: libraryManga.manga.hentai,
                    tabsIds: tabsIds,
                    sourcesIds: sourcesIds
                });
            }
            // Tabs parsing
            for (var _f = 0, _g = this.backup.tabs; _f < _g.length; _f++) {
                var tab = _g[_f];
                tabs[tab.id] = tab.name;
            }
            // Sources parsing
            for (var _h = 0, _j = this.backup.activeSources; _h < _j.length; _h++) {
                var source = _j[_h];
                sources[source.id] = source.name;
            }
            return {
                library: library,
                tabs: tabs,
                sources: sources
            };
        };
        /* Helper functions */
        PaperbackBackupManager.prototype.appendLibraryManga = function (libraryManga) {
            this.backup.library.push(libraryManga);
        };
        PaperbackBackupManager.prototype.appendSourceManga = function (sourceManga) {
            this.backup.sourceMangas.push(sourceManga);
        };
        PaperbackBackupManager.prototype.appendChapterMarker = function (chapterMarker) {
            this.backup.chapterMarkers.push(chapterMarker);
        };
        PaperbackBackupManager.prototype.appendChapterMarkers = function (chapterMarkers) {
            for (var _i = 0, chapterMarkers_1 = chapterMarkers; _i < chapterMarkers_1.length; _i++) {
                var chapterMarker = chapterMarkers_1[_i];
                this.appendChapterMarker(chapterMarker);
            }
        };
        PaperbackBackupManager.prototype.appendLibraryTab = function (tab) {
            this.backup.tabs.push(tab);
        };
        PaperbackBackupManager.prototype.appendSourceRepository = function (repository) {
            this.backup.sourceRepositories.push(repository);
        };
        PaperbackBackupManager.prototype.appendActiveSource = function (source) {
            // If this source is already registered, do not apply a duplicate
            if (this.backup.activeSources.some(function (x) { return source.id === x.id; })) {
                return;
            }
            this.backup.activeSources.push(source);
        };
        return PaperbackBackupManager;
    }());
    exports.PaperbackBackupManager = PaperbackBackupManager;
    
    },{}],12:[function(require,module,exports){
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
    var __importDefault = (this && this.__importDefault) || function (mod) {
        return (mod && mod.__esModule) ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PaperbackRepository = void 0;
    var axios_1 = __importDefault(require("axios"));
    var PaperbackRepository;
    (function (PaperbackRepository) {
        /*
            Some known Paperback repositories that can be used for conversionSources
        */
        PaperbackRepository.STATEFUL = {
            name: "Extensions Primary",
            url: "https://paperback-ios.github.io/extensions-sources/primary"
        };
        PaperbackRepository.PROMISES = {
            name: "Extensions Promises",
            url: "https://paperback-ios.github.io/extensions-promises"
        };
        /**
         * Fetch the repository versioning.json file
         * @param url the repository base URL
         * @returns a `Promise<versioningFile>`
         */
        function getRepositoryVersioning(baseURL) {
            return __awaiter(this, void 0, void 0, function () {
                var response, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, axios_1.default.get(baseURL + "/versioning.json")];
                        case 1:
                            response = _a.sent();
                            return [2 /*return*/, response.data];
                        case 2:
                            error_1 = _a.sent();
                            // On error, we return an empty repository to prevent the converter from retrying to fetch the repository for every sources
                            console.log("Failed to fetch repository : " + baseURL);
                            console.log(error_1);
                            return [2 /*return*/, {
                                    buildTime: "2021-08-09T14:19:47.235Z",
                                    sources: []
                                }];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        }
        PaperbackRepository.getRepositoryVersioning = getRepositoryVersioning;
    })(PaperbackRepository = exports.PaperbackRepository || (exports.PaperbackRepository = {}));
    
    },{"axios":23}],13:[function(require,module,exports){
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TachiyomiBackupManager = void 0;
    var TachiyomiObjectModel_1 = require("./proto/TachiyomiObjectModel");
    var pako = require('pako');
    var TachiyomiBackupManager = /** @class */ (function () {
        function TachiyomiBackupManager() {
            this.backup = this.returnEmptyBackup();
        }
        TachiyomiBackupManager.prototype.returnEmptyBackup = function () {
            return new TachiyomiObjectModel_1.TachiyomiObjectModel.Backup();
        };
        /* Loading a backup */
        TachiyomiBackupManager.prototype.loadBackup = function (backup) {
            this.backup = backup;
        };
        TachiyomiBackupManager.prototype.loadIBackup = function (iBackup) {
            var backup = new TachiyomiObjectModel_1.TachiyomiObjectModel.Backup(iBackup);
            this.loadBackup(backup);
        };
        /**
         * Decode and load a `.proto` buffered backup
         * @param protoBackup a `Reader | Uint8Array` object
         */
        TachiyomiBackupManager.prototype.loadProto = function (protoBackup) {
            var backup = TachiyomiObjectModel_1.TachiyomiObjectModel.Backup.decode(protoBackup);
            this.loadBackup(backup);
        };
        /**
         * Inflate, decode and load a `.proto.gz` buffered backup
         * @param protoBackup a `Reader | Uint8Array` object
         */
        TachiyomiBackupManager.prototype.loadProtoGz = function (protoGzBackup) {
            var protoBackup = pako.inflate(protoGzBackup);
            this.loadProto(protoBackup);
        };
        /* Exporting a backup */
        TachiyomiBackupManager.prototype.exportBackup = function () {
            return this.backup;
        };
        TachiyomiBackupManager.prototype.exportIBackup = function () {
            return TachiyomiObjectModel_1.TachiyomiObjectModel.Backup.toObject(this.backup);
        };
        TachiyomiBackupManager.prototype.exportProto = function () {
            // WARNING including non empty backupManga.categories result in an error
            // "Expecting wire type 0 byt found 2"
            var writer = TachiyomiObjectModel_1.TachiyomiObjectModel.Backup.encode(this.backup);
            // We must call finish() to obtain an usable Buffer
            // https://github.com/protobufjs/protobuf.js/#using-proto-files
            var buffer = writer.finish();
            return buffer;
        };
        TachiyomiBackupManager.prototype.exportProtoGz = function () {
            var protoBackup = this.exportProto();
            var protoGzBackup = pako.gzip(protoBackup);
            return protoGzBackup;
        };
        /**
         * @returns A {@link LightRepresentation} of the backup, easily exploitable to display the main content of the backup.
         */
        TachiyomiBackupManager.prototype.exportLightRepresentation = function () {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            var library = [];
            var tabs = {};
            var sources = {};
            // Manga parsing
            for (var _i = 0, _j = this.backup.backupManga; _i < _j.length; _i++) {
                var manga = _j[_i];
                var tabsIds = [];
                if (manga.categories != undefined) {
                    tabsIds = manga.categories.map(function (id) { return id.toString(); });
                }
                // In the backup, a Tachiyomi manga is associated with an unique source
                var sourcesIds = (manga.source) ? [manga.source.toString()] : [""];
                library.push({
                    id: (_a = manga.url) !== null && _a !== void 0 ? _a : "",
                    titles: [(_b = manga.title) !== null && _b !== void 0 ? _b : ""],
                    author: (_c = manga.author) !== null && _c !== void 0 ? _c : "",
                    artist: (_d = manga.artist) !== null && _d !== void 0 ? _d : "",
                    description: (_e = manga.description) !== null && _e !== void 0 ? _e : "",
                    cover: (_f = manga.thumbnailUrl) !== null && _f !== void 0 ? _f : "",
                    hentai: false,
                    tabsIds: tabsIds,
                    sourcesIds: sourcesIds
                });
            }
            // Tabs/categories parsing
            for (var index = 0; index < this.backup.backupCategories.length; index++) {
                tabs[index] = (_g = this.backup.backupCategories[index].name) !== null && _g !== void 0 ? _g : "unnamed";
            }
            // Sources parsing
            for (var _k = 0, _l = this.backup.backupSources; _k < _l.length; _k++) {
                var source = _l[_k];
                if (source.sourceId != undefined) {
                    var id = source.sourceId.toString();
                    sources[id] = (_h = source.name) !== null && _h !== void 0 ? _h : id; // If the source name does not exist, we use its id
                }
            }
            return {
                library: library,
                tabs: tabs,
                sources: sources
            };
        };
        /* Helper functions */
        TachiyomiBackupManager.prototype.appendBackupManga = function (backupManga) {
            var backupMangaObject = TachiyomiObjectModel_1.TachiyomiObjectModel.BackupManga.create(backupManga);
            this.backup.backupManga.push(backupMangaObject);
        };
        TachiyomiBackupManager.prototype.appendCategory = function (category) {
            var categoryObject = TachiyomiObjectModel_1.TachiyomiObjectModel.BackupCategory.create(category);
            this.backup.backupCategories.push(categoryObject);
        };
        return TachiyomiBackupManager;
    }());
    exports.TachiyomiBackupManager = TachiyomiBackupManager;
    
    },{"./proto/TachiyomiObjectModel":14,"pako":50}],14:[function(require,module,exports){
    /*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
    "use strict";
    var $protobuf = require("protobufjs/minimal");
    // Common aliases
    var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;
    // Exported root namespace
    var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
    $root.TachiyomiObjectModel = (function () {
        /**
         * Namespace TachiyomiObjectModel.
         * @exports TachiyomiObjectModel
         * @namespace
         */
        var TachiyomiObjectModel = {};
        TachiyomiObjectModel.BackupManga = (function () {
            /**
             * Properties of a BackupManga.
             * @memberof TachiyomiObjectModel
             * @interface IBackupManga
             * @property {number|Long|null} [source] BackupManga source
             * @property {string|null} [url] BackupManga url
             * @property {string|null} [title] BackupManga title
             * @property {string|null} [artist] BackupManga artist
             * @property {string|null} [author] BackupManga author
             * @property {string|null} [description] BackupManga description
             * @property {Array.<string>|null} [genre] BackupManga genre
             * @property {number|Long|null} [status] BackupManga status
             * @property {string|null} [thumbnailUrl] BackupManga thumbnailUrl
             * @property {number|Long|null} [dateAdded] BackupManga dateAdded
             * @property {number|null} [viewer] BackupManga viewer
             * @property {Array.<TachiyomiObjectModel.IBackupChapter>|null} [chapters] BackupManga chapters
             * @property {Array.<number>|null} [categories] BackupManga categories
             * @property {Array.<TachiyomiObjectModel.IBackupTracking>|null} [tracking] BackupManga tracking
             * @property {boolean|null} [favorite] BackupManga favorite
             * @property {number|null} [chapterFlags] BackupManga chapterFlags
             * @property {Array.<TachiyomiObjectModel.IBackupHistory>|null} [history] BackupManga history
             */
            /**
             * Constructs a new BackupManga.
             * @memberof TachiyomiObjectModel
             * @classdesc Represents a BackupManga.
             * @implements IBackupManga
             * @constructor
             * @param {TachiyomiObjectModel.IBackupManga=} [properties] Properties to set
             */
            function BackupManga(properties) {
                this.genre = [];
                this.chapters = [];
                this.categories = [];
                this.tracking = [];
                this.history = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
            /**
             * BackupManga source.
             * @member {number|Long} source
             * @memberof TachiyomiObjectModel.BackupManga
             * @instance
             */
            BackupManga.prototype.source = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
            /**
             * BackupManga url.
             * @member {string} url
             * @memberof TachiyomiObjectModel.BackupManga
             * @instance
             */
            BackupManga.prototype.url = "";
            /**
             * BackupManga title.
             * @member {string} title
             * @memberof TachiyomiObjectModel.BackupManga
             * @instance
             */
            BackupManga.prototype.title = "";
            /**
             * BackupManga artist.
             * @member {string} artist
             * @memberof TachiyomiObjectModel.BackupManga
             * @instance
             */
            BackupManga.prototype.artist = "";
            /**
             * BackupManga author.
             * @member {string} author
             * @memberof TachiyomiObjectModel.BackupManga
             * @instance
             */
            BackupManga.prototype.author = "";
            /**
             * BackupManga description.
             * @member {string} description
             * @memberof TachiyomiObjectModel.BackupManga
             * @instance
             */
            BackupManga.prototype.description = "";
            /**
             * BackupManga genre.
             * @member {Array.<string>} genre
             * @memberof TachiyomiObjectModel.BackupManga
             * @instance
             */
            BackupManga.prototype.genre = $util.emptyArray;
            /**
             * BackupManga status.
             * @member {number|Long} status
             * @memberof TachiyomiObjectModel.BackupManga
             * @instance
             */
            BackupManga.prototype.status = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
            /**
             * BackupManga thumbnailUrl.
             * @member {string} thumbnailUrl
             * @memberof TachiyomiObjectModel.BackupManga
             * @instance
             */
            BackupManga.prototype.thumbnailUrl = "";
            /**
             * BackupManga dateAdded.
             * @member {number|Long} dateAdded
             * @memberof TachiyomiObjectModel.BackupManga
             * @instance
             */
            BackupManga.prototype.dateAdded = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
            /**
             * BackupManga viewer.
             * @member {number} viewer
             * @memberof TachiyomiObjectModel.BackupManga
             * @instance
             */
            BackupManga.prototype.viewer = 0;
            /**
             * BackupManga chapters.
             * @member {Array.<TachiyomiObjectModel.IBackupChapter>} chapters
             * @memberof TachiyomiObjectModel.BackupManga
             * @instance
             */
            BackupManga.prototype.chapters = $util.emptyArray;
            /**
             * BackupManga categories.
             * @member {Array.<number>} categories
             * @memberof TachiyomiObjectModel.BackupManga
             * @instance
             */
            BackupManga.prototype.categories = $util.emptyArray;
            /**
             * BackupManga tracking.
             * @member {Array.<TachiyomiObjectModel.IBackupTracking>} tracking
             * @memberof TachiyomiObjectModel.BackupManga
             * @instance
             */
            BackupManga.prototype.tracking = $util.emptyArray;
            /**
             * BackupManga favorite.
             * @member {boolean} favorite
             * @memberof TachiyomiObjectModel.BackupManga
             * @instance
             */
            BackupManga.prototype.favorite = false;
            /**
             * BackupManga chapterFlags.
             * @member {number} chapterFlags
             * @memberof TachiyomiObjectModel.BackupManga
             * @instance
             */
            BackupManga.prototype.chapterFlags = 0;
            /**
             * BackupManga history.
             * @member {Array.<TachiyomiObjectModel.IBackupHistory>} history
             * @memberof TachiyomiObjectModel.BackupManga
             * @instance
             */
            BackupManga.prototype.history = $util.emptyArray;
            /**
             * Creates a new BackupManga instance using the specified properties.
             * @function create
             * @memberof TachiyomiObjectModel.BackupManga
             * @static
             * @param {TachiyomiObjectModel.IBackupManga=} [properties] Properties to set
             * @returns {TachiyomiObjectModel.BackupManga} BackupManga instance
             */
            BackupManga.create = function create(properties) {
                return new BackupManga(properties);
            };
            /**
             * Encodes the specified BackupManga message. Does not implicitly {@link TachiyomiObjectModel.BackupManga.verify|verify} messages.
             * @function encode
             * @memberof TachiyomiObjectModel.BackupManga
             * @static
             * @param {TachiyomiObjectModel.IBackupManga} message BackupManga message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BackupManga.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.source != null && Object.hasOwnProperty.call(message, "source"))
                    writer.uint32(/* id 1, wireType 0 =*/ 8).int64(message.source);
                if (message.url != null && Object.hasOwnProperty.call(message, "url"))
                    writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.url);
                if (message.title != null && Object.hasOwnProperty.call(message, "title"))
                    writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.title);
                if (message.artist != null && Object.hasOwnProperty.call(message, "artist"))
                    writer.uint32(/* id 4, wireType 2 =*/ 34).string(message.artist);
                if (message.author != null && Object.hasOwnProperty.call(message, "author"))
                    writer.uint32(/* id 5, wireType 2 =*/ 42).string(message.author);
                if (message.description != null && Object.hasOwnProperty.call(message, "description"))
                    writer.uint32(/* id 6, wireType 2 =*/ 50).string(message.description);
                if (message.genre != null && message.genre.length)
                    for (var i = 0; i < message.genre.length; ++i)
                        writer.uint32(/* id 7, wireType 2 =*/ 58).string(message.genre[i]);
                if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                    writer.uint32(/* id 8, wireType 0 =*/ 64).int64(message.status);
                if (message.thumbnailUrl != null && Object.hasOwnProperty.call(message, "thumbnailUrl"))
                    writer.uint32(/* id 9, wireType 2 =*/ 74).string(message.thumbnailUrl);
                if (message.dateAdded != null && Object.hasOwnProperty.call(message, "dateAdded"))
                    writer.uint32(/* id 13, wireType 0 =*/ 104).int64(message.dateAdded);
                if (message.viewer != null && Object.hasOwnProperty.call(message, "viewer"))
                    writer.uint32(/* id 14, wireType 0 =*/ 112).int32(message.viewer);
                if (message.chapters != null && message.chapters.length)
                    for (var i = 0; i < message.chapters.length; ++i)
                        $root.TachiyomiObjectModel.BackupChapter.encode(message.chapters[i], writer.uint32(/* id 16, wireType 2 =*/ 130).fork()).ldelim();
                if (message.categories != null && message.categories.length) {
                    writer.uint32(/* id 17, wireType 2 =*/ 138).fork();
                    for (var i = 0; i < message.categories.length; ++i)
                        writer.int32(message.categories[i]);
                    writer.ldelim();
                }
                if (message.tracking != null && message.tracking.length)
                    for (var i = 0; i < message.tracking.length; ++i)
                        $root.TachiyomiObjectModel.BackupTracking.encode(message.tracking[i], writer.uint32(/* id 18, wireType 2 =*/ 146).fork()).ldelim();
                if (message.favorite != null && Object.hasOwnProperty.call(message, "favorite"))
                    writer.uint32(/* id 100, wireType 0 =*/ 800).bool(message.favorite);
                if (message.chapterFlags != null && Object.hasOwnProperty.call(message, "chapterFlags"))
                    writer.uint32(/* id 101, wireType 0 =*/ 808).int32(message.chapterFlags);
                if (message.history != null && message.history.length)
                    for (var i = 0; i < message.history.length; ++i)
                        $root.TachiyomiObjectModel.BackupHistory.encode(message.history[i], writer.uint32(/* id 102, wireType 2 =*/ 818).fork()).ldelim();
                return writer;
            };
            /**
             * Encodes the specified BackupManga message, length delimited. Does not implicitly {@link TachiyomiObjectModel.BackupManga.verify|verify} messages.
             * @function encodeDelimited
             * @memberof TachiyomiObjectModel.BackupManga
             * @static
             * @param {TachiyomiObjectModel.IBackupManga} message BackupManga message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BackupManga.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            /**
             * Decodes a BackupManga message from the specified reader or buffer.
             * @function decode
             * @memberof TachiyomiObjectModel.BackupManga
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {TachiyomiObjectModel.BackupManga} BackupManga
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            BackupManga.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.TachiyomiObjectModel.BackupManga();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                        case 1:
                            message.source = reader.int64();
                            break;
                        case 2:
                            message.url = reader.string();
                            break;
                        case 3:
                            message.title = reader.string();
                            break;
                        case 4:
                            message.artist = reader.string();
                            break;
                        case 5:
                            message.author = reader.string();
                            break;
                        case 6:
                            message.description = reader.string();
                            break;
                        case 7:
                            if (!(message.genre && message.genre.length))
                                message.genre = [];
                            message.genre.push(reader.string());
                            break;
                        case 8:
                            message.status = reader.int64();
                            break;
                        case 9:
                            message.thumbnailUrl = reader.string();
                            break;
                        case 13:
                            message.dateAdded = reader.int64();
                            break;
                        case 14:
                            message.viewer = reader.int32();
                            break;
                        case 16:
                            if (!(message.chapters && message.chapters.length))
                                message.chapters = [];
                            message.chapters.push($root.TachiyomiObjectModel.BackupChapter.decode(reader, reader.uint32()));
                            break;
                        case 17:
                            if (!(message.categories && message.categories.length))
                                message.categories = [];
                            if ((tag & 7) === 2) {
                                var end2 = reader.uint32() + reader.pos;
                                while (reader.pos < end2)
                                    message.categories.push(reader.int32());
                            }
                            else
                                message.categories.push(reader.int32());
                            break;
                        case 18:
                            if (!(message.tracking && message.tracking.length))
                                message.tracking = [];
                            message.tracking.push($root.TachiyomiObjectModel.BackupTracking.decode(reader, reader.uint32()));
                            break;
                        case 100:
                            message.favorite = reader.bool();
                            break;
                        case 101:
                            message.chapterFlags = reader.int32();
                            break;
                        case 102:
                            if (!(message.history && message.history.length))
                                message.history = [];
                            message.history.push($root.TachiyomiObjectModel.BackupHistory.decode(reader, reader.uint32()));
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            /**
             * Decodes a BackupManga message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof TachiyomiObjectModel.BackupManga
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {TachiyomiObjectModel.BackupManga} BackupManga
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            BackupManga.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            /**
             * Verifies a BackupManga message.
             * @function verify
             * @memberof TachiyomiObjectModel.BackupManga
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            BackupManga.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.source != null && message.hasOwnProperty("source"))
                    if (!$util.isInteger(message.source) && !(message.source && $util.isInteger(message.source.low) && $util.isInteger(message.source.high)))
                        return "source: integer|Long expected";
                if (message.url != null && message.hasOwnProperty("url"))
                    if (!$util.isString(message.url))
                        return "url: string expected";
                if (message.title != null && message.hasOwnProperty("title"))
                    if (!$util.isString(message.title))
                        return "title: string expected";
                if (message.artist != null && message.hasOwnProperty("artist"))
                    if (!$util.isString(message.artist))
                        return "artist: string expected";
                if (message.author != null && message.hasOwnProperty("author"))
                    if (!$util.isString(message.author))
                        return "author: string expected";
                if (message.description != null && message.hasOwnProperty("description"))
                    if (!$util.isString(message.description))
                        return "description: string expected";
                if (message.genre != null && message.hasOwnProperty("genre")) {
                    if (!Array.isArray(message.genre))
                        return "genre: array expected";
                    for (var i = 0; i < message.genre.length; ++i)
                        if (!$util.isString(message.genre[i]))
                            return "genre: string[] expected";
                }
                if (message.status != null && message.hasOwnProperty("status"))
                    if (!$util.isInteger(message.status) && !(message.status && $util.isInteger(message.status.low) && $util.isInteger(message.status.high)))
                        return "status: integer|Long expected";
                if (message.thumbnailUrl != null && message.hasOwnProperty("thumbnailUrl"))
                    if (!$util.isString(message.thumbnailUrl))
                        return "thumbnailUrl: string expected";
                if (message.dateAdded != null && message.hasOwnProperty("dateAdded"))
                    if (!$util.isInteger(message.dateAdded) && !(message.dateAdded && $util.isInteger(message.dateAdded.low) && $util.isInteger(message.dateAdded.high)))
                        return "dateAdded: integer|Long expected";
                if (message.viewer != null && message.hasOwnProperty("viewer"))
                    if (!$util.isInteger(message.viewer))
                        return "viewer: integer expected";
                if (message.chapters != null && message.hasOwnProperty("chapters")) {
                    if (!Array.isArray(message.chapters))
                        return "chapters: array expected";
                    for (var i = 0; i < message.chapters.length; ++i) {
                        var error = $root.TachiyomiObjectModel.BackupChapter.verify(message.chapters[i]);
                        if (error)
                            return "chapters." + error;
                    }
                }
                if (message.categories != null && message.hasOwnProperty("categories")) {
                    if (!Array.isArray(message.categories))
                        return "categories: array expected";
                    for (var i = 0; i < message.categories.length; ++i)
                        if (!$util.isInteger(message.categories[i]))
                            return "categories: integer[] expected";
                }
                if (message.tracking != null && message.hasOwnProperty("tracking")) {
                    if (!Array.isArray(message.tracking))
                        return "tracking: array expected";
                    for (var i = 0; i < message.tracking.length; ++i) {
                        var error = $root.TachiyomiObjectModel.BackupTracking.verify(message.tracking[i]);
                        if (error)
                            return "tracking." + error;
                    }
                }
                if (message.favorite != null && message.hasOwnProperty("favorite"))
                    if (typeof message.favorite !== "boolean")
                        return "favorite: boolean expected";
                if (message.chapterFlags != null && message.hasOwnProperty("chapterFlags"))
                    if (!$util.isInteger(message.chapterFlags))
                        return "chapterFlags: integer expected";
                if (message.history != null && message.hasOwnProperty("history")) {
                    if (!Array.isArray(message.history))
                        return "history: array expected";
                    for (var i = 0; i < message.history.length; ++i) {
                        var error = $root.TachiyomiObjectModel.BackupHistory.verify(message.history[i]);
                        if (error)
                            return "history." + error;
                    }
                }
                return null;
            };
            /**
             * Creates a BackupManga message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof TachiyomiObjectModel.BackupManga
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {TachiyomiObjectModel.BackupManga} BackupManga
             */
            BackupManga.fromObject = function fromObject(object) {
                if (object instanceof $root.TachiyomiObjectModel.BackupManga)
                    return object;
                var message = new $root.TachiyomiObjectModel.BackupManga();
                if (object.source != null)
                    if ($util.Long)
                        (message.source = $util.Long.fromValue(object.source)).unsigned = false;
                    else if (typeof object.source === "string")
                        message.source = parseInt(object.source, 10);
                    else if (typeof object.source === "number")
                        message.source = object.source;
                    else if (typeof object.source === "object")
                        message.source = new $util.LongBits(object.source.low >>> 0, object.source.high >>> 0).toNumber();
                if (object.url != null)
                    message.url = String(object.url);
                if (object.title != null)
                    message.title = String(object.title);
                if (object.artist != null)
                    message.artist = String(object.artist);
                if (object.author != null)
                    message.author = String(object.author);
                if (object.description != null)
                    message.description = String(object.description);
                if (object.genre) {
                    if (!Array.isArray(object.genre))
                        throw TypeError(".TachiyomiObjectModel.BackupManga.genre: array expected");
                    message.genre = [];
                    for (var i = 0; i < object.genre.length; ++i)
                        message.genre[i] = String(object.genre[i]);
                }
                if (object.status != null)
                    if ($util.Long)
                        (message.status = $util.Long.fromValue(object.status)).unsigned = false;
                    else if (typeof object.status === "string")
                        message.status = parseInt(object.status, 10);
                    else if (typeof object.status === "number")
                        message.status = object.status;
                    else if (typeof object.status === "object")
                        message.status = new $util.LongBits(object.status.low >>> 0, object.status.high >>> 0).toNumber();
                if (object.thumbnailUrl != null)
                    message.thumbnailUrl = String(object.thumbnailUrl);
                if (object.dateAdded != null)
                    if ($util.Long)
                        (message.dateAdded = $util.Long.fromValue(object.dateAdded)).unsigned = false;
                    else if (typeof object.dateAdded === "string")
                        message.dateAdded = parseInt(object.dateAdded, 10);
                    else if (typeof object.dateAdded === "number")
                        message.dateAdded = object.dateAdded;
                    else if (typeof object.dateAdded === "object")
                        message.dateAdded = new $util.LongBits(object.dateAdded.low >>> 0, object.dateAdded.high >>> 0).toNumber();
                if (object.viewer != null)
                    message.viewer = object.viewer | 0;
                if (object.chapters) {
                    if (!Array.isArray(object.chapters))
                        throw TypeError(".TachiyomiObjectModel.BackupManga.chapters: array expected");
                    message.chapters = [];
                    for (var i = 0; i < object.chapters.length; ++i) {
                        if (typeof object.chapters[i] !== "object")
                            throw TypeError(".TachiyomiObjectModel.BackupManga.chapters: object expected");
                        message.chapters[i] = $root.TachiyomiObjectModel.BackupChapter.fromObject(object.chapters[i]);
                    }
                }
                if (object.categories) {
                    if (!Array.isArray(object.categories))
                        throw TypeError(".TachiyomiObjectModel.BackupManga.categories: array expected");
                    message.categories = [];
                    for (var i = 0; i < object.categories.length; ++i)
                        message.categories[i] = object.categories[i] | 0;
                }
                if (object.tracking) {
                    if (!Array.isArray(object.tracking))
                        throw TypeError(".TachiyomiObjectModel.BackupManga.tracking: array expected");
                    message.tracking = [];
                    for (var i = 0; i < object.tracking.length; ++i) {
                        if (typeof object.tracking[i] !== "object")
                            throw TypeError(".TachiyomiObjectModel.BackupManga.tracking: object expected");
                        message.tracking[i] = $root.TachiyomiObjectModel.BackupTracking.fromObject(object.tracking[i]);
                    }
                }
                if (object.favorite != null)
                    message.favorite = Boolean(object.favorite);
                if (object.chapterFlags != null)
                    message.chapterFlags = object.chapterFlags | 0;
                if (object.history) {
                    if (!Array.isArray(object.history))
                        throw TypeError(".TachiyomiObjectModel.BackupManga.history: array expected");
                    message.history = [];
                    for (var i = 0; i < object.history.length; ++i) {
                        if (typeof object.history[i] !== "object")
                            throw TypeError(".TachiyomiObjectModel.BackupManga.history: object expected");
                        message.history[i] = $root.TachiyomiObjectModel.BackupHistory.fromObject(object.history[i]);
                    }
                }
                return message;
            };
            /**
             * Creates a plain object from a BackupManga message. Also converts values to other types if specified.
             * @function toObject
             * @memberof TachiyomiObjectModel.BackupManga
             * @static
             * @param {TachiyomiObjectModel.BackupManga} message BackupManga
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            BackupManga.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults) {
                    object.genre = [];
                    object.chapters = [];
                    object.categories = [];
                    object.tracking = [];
                    object.history = [];
                }
                if (options.defaults) {
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.source = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    }
                    else
                        object.source = options.longs === String ? "0" : 0;
                    object.url = "";
                    object.title = "";
                    object.artist = "";
                    object.author = "";
                    object.description = "";
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.status = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    }
                    else
                        object.status = options.longs === String ? "0" : 0;
                    object.thumbnailUrl = "";
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.dateAdded = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    }
                    else
                        object.dateAdded = options.longs === String ? "0" : 0;
                    object.viewer = 0;
                    object.favorite = false;
                    object.chapterFlags = 0;
                }
                if (message.source != null && message.hasOwnProperty("source"))
                    if (typeof message.source === "number")
                        object.source = options.longs === String ? String(message.source) : message.source;
                    else
                        object.source = options.longs === String ? $util.Long.prototype.toString.call(message.source) : options.longs === Number ? new $util.LongBits(message.source.low >>> 0, message.source.high >>> 0).toNumber() : message.source;
                if (message.url != null && message.hasOwnProperty("url"))
                    object.url = message.url;
                if (message.title != null && message.hasOwnProperty("title"))
                    object.title = message.title;
                if (message.artist != null && message.hasOwnProperty("artist"))
                    object.artist = message.artist;
                if (message.author != null && message.hasOwnProperty("author"))
                    object.author = message.author;
                if (message.description != null && message.hasOwnProperty("description"))
                    object.description = message.description;
                if (message.genre && message.genre.length) {
                    object.genre = [];
                    for (var j = 0; j < message.genre.length; ++j)
                        object.genre[j] = message.genre[j];
                }
                if (message.status != null && message.hasOwnProperty("status"))
                    if (typeof message.status === "number")
                        object.status = options.longs === String ? String(message.status) : message.status;
                    else
                        object.status = options.longs === String ? $util.Long.prototype.toString.call(message.status) : options.longs === Number ? new $util.LongBits(message.status.low >>> 0, message.status.high >>> 0).toNumber() : message.status;
                if (message.thumbnailUrl != null && message.hasOwnProperty("thumbnailUrl"))
                    object.thumbnailUrl = message.thumbnailUrl;
                if (message.dateAdded != null && message.hasOwnProperty("dateAdded"))
                    if (typeof message.dateAdded === "number")
                        object.dateAdded = options.longs === String ? String(message.dateAdded) : message.dateAdded;
                    else
                        object.dateAdded = options.longs === String ? $util.Long.prototype.toString.call(message.dateAdded) : options.longs === Number ? new $util.LongBits(message.dateAdded.low >>> 0, message.dateAdded.high >>> 0).toNumber() : message.dateAdded;
                if (message.viewer != null && message.hasOwnProperty("viewer"))
                    object.viewer = message.viewer;
                if (message.chapters && message.chapters.length) {
                    object.chapters = [];
                    for (var j = 0; j < message.chapters.length; ++j)
                        object.chapters[j] = $root.TachiyomiObjectModel.BackupChapter.toObject(message.chapters[j], options);
                }
                if (message.categories && message.categories.length) {
                    object.categories = [];
                    for (var j = 0; j < message.categories.length; ++j)
                        object.categories[j] = message.categories[j];
                }
                if (message.tracking && message.tracking.length) {
                    object.tracking = [];
                    for (var j = 0; j < message.tracking.length; ++j)
                        object.tracking[j] = $root.TachiyomiObjectModel.BackupTracking.toObject(message.tracking[j], options);
                }
                if (message.favorite != null && message.hasOwnProperty("favorite"))
                    object.favorite = message.favorite;
                if (message.chapterFlags != null && message.hasOwnProperty("chapterFlags"))
                    object.chapterFlags = message.chapterFlags;
                if (message.history && message.history.length) {
                    object.history = [];
                    for (var j = 0; j < message.history.length; ++j)
                        object.history[j] = $root.TachiyomiObjectModel.BackupHistory.toObject(message.history[j], options);
                }
                return object;
            };
            /**
             * Converts this BackupManga to JSON.
             * @function toJSON
             * @memberof TachiyomiObjectModel.BackupManga
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            BackupManga.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            return BackupManga;
        })();
        TachiyomiObjectModel.BackupChapter = (function () {
            /**
             * Properties of a BackupChapter.
             * @memberof TachiyomiObjectModel
             * @interface IBackupChapter
             * @property {string|null} [url] BackupChapter url
             * @property {string|null} [name] BackupChapter name
             * @property {string|null} [scanlator] BackupChapter scanlator
             * @property {boolean|null} [read] BackupChapter read
             * @property {boolean|null} [bookmark] BackupChapter bookmark
             * @property {number|null} [lastPageRead] BackupChapter lastPageRead
             * @property {number|Long|null} [dateFetch] BackupChapter dateFetch
             * @property {number|Long|null} [dateUplaod] BackupChapter dateUplaod
             * @property {number|null} [chapterNumber] BackupChapter chapterNumber
             * @property {number|null} [sourceOrder] BackupChapter sourceOrder
             */
            /**
             * Constructs a new BackupChapter.
             * @memberof TachiyomiObjectModel
             * @classdesc Represents a BackupChapter.
             * @implements IBackupChapter
             * @constructor
             * @param {TachiyomiObjectModel.IBackupChapter=} [properties] Properties to set
             */
            function BackupChapter(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
            /**
             * BackupChapter url.
             * @member {string} url
             * @memberof TachiyomiObjectModel.BackupChapter
             * @instance
             */
            BackupChapter.prototype.url = "";
            /**
             * BackupChapter name.
             * @member {string} name
             * @memberof TachiyomiObjectModel.BackupChapter
             * @instance
             */
            BackupChapter.prototype.name = "";
            /**
             * BackupChapter scanlator.
             * @member {string} scanlator
             * @memberof TachiyomiObjectModel.BackupChapter
             * @instance
             */
            BackupChapter.prototype.scanlator = "";
            /**
             * BackupChapter read.
             * @member {boolean} read
             * @memberof TachiyomiObjectModel.BackupChapter
             * @instance
             */
            BackupChapter.prototype.read = false;
            /**
             * BackupChapter bookmark.
             * @member {boolean} bookmark
             * @memberof TachiyomiObjectModel.BackupChapter
             * @instance
             */
            BackupChapter.prototype.bookmark = false;
            /**
             * BackupChapter lastPageRead.
             * @member {number} lastPageRead
             * @memberof TachiyomiObjectModel.BackupChapter
             * @instance
             */
            BackupChapter.prototype.lastPageRead = 0;
            /**
             * BackupChapter dateFetch.
             * @member {number|Long} dateFetch
             * @memberof TachiyomiObjectModel.BackupChapter
             * @instance
             */
            BackupChapter.prototype.dateFetch = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
            /**
             * BackupChapter dateUplaod.
             * @member {number|Long} dateUplaod
             * @memberof TachiyomiObjectModel.BackupChapter
             * @instance
             */
            BackupChapter.prototype.dateUplaod = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
            /**
             * BackupChapter chapterNumber.
             * @member {number} chapterNumber
             * @memberof TachiyomiObjectModel.BackupChapter
             * @instance
             */
            BackupChapter.prototype.chapterNumber = 0;
            /**
             * BackupChapter sourceOrder.
             * @member {number} sourceOrder
             * @memberof TachiyomiObjectModel.BackupChapter
             * @instance
             */
            BackupChapter.prototype.sourceOrder = 0;
            /**
             * Creates a new BackupChapter instance using the specified properties.
             * @function create
             * @memberof TachiyomiObjectModel.BackupChapter
             * @static
             * @param {TachiyomiObjectModel.IBackupChapter=} [properties] Properties to set
             * @returns {TachiyomiObjectModel.BackupChapter} BackupChapter instance
             */
            BackupChapter.create = function create(properties) {
                return new BackupChapter(properties);
            };
            /**
             * Encodes the specified BackupChapter message. Does not implicitly {@link TachiyomiObjectModel.BackupChapter.verify|verify} messages.
             * @function encode
             * @memberof TachiyomiObjectModel.BackupChapter
             * @static
             * @param {TachiyomiObjectModel.IBackupChapter} message BackupChapter message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BackupChapter.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.url != null && Object.hasOwnProperty.call(message, "url"))
                    writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.url);
                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                    writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.name);
                if (message.scanlator != null && Object.hasOwnProperty.call(message, "scanlator"))
                    writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.scanlator);
                if (message.read != null && Object.hasOwnProperty.call(message, "read"))
                    writer.uint32(/* id 4, wireType 0 =*/ 32).bool(message.read);
                if (message.bookmark != null && Object.hasOwnProperty.call(message, "bookmark"))
                    writer.uint32(/* id 5, wireType 0 =*/ 40).bool(message.bookmark);
                if (message.lastPageRead != null && Object.hasOwnProperty.call(message, "lastPageRead"))
                    writer.uint32(/* id 6, wireType 0 =*/ 48).int32(message.lastPageRead);
                if (message.dateFetch != null && Object.hasOwnProperty.call(message, "dateFetch"))
                    writer.uint32(/* id 7, wireType 0 =*/ 56).int64(message.dateFetch);
                if (message.dateUplaod != null && Object.hasOwnProperty.call(message, "dateUplaod"))
                    writer.uint32(/* id 8, wireType 0 =*/ 64).int64(message.dateUplaod);
                if (message.chapterNumber != null && Object.hasOwnProperty.call(message, "chapterNumber"))
                    writer.uint32(/* id 9, wireType 5 =*/ 77).float(message.chapterNumber);
                if (message.sourceOrder != null && Object.hasOwnProperty.call(message, "sourceOrder"))
                    writer.uint32(/* id 10, wireType 0 =*/ 80).int32(message.sourceOrder);
                return writer;
            };
            /**
             * Encodes the specified BackupChapter message, length delimited. Does not implicitly {@link TachiyomiObjectModel.BackupChapter.verify|verify} messages.
             * @function encodeDelimited
             * @memberof TachiyomiObjectModel.BackupChapter
             * @static
             * @param {TachiyomiObjectModel.IBackupChapter} message BackupChapter message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BackupChapter.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            /**
             * Decodes a BackupChapter message from the specified reader or buffer.
             * @function decode
             * @memberof TachiyomiObjectModel.BackupChapter
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {TachiyomiObjectModel.BackupChapter} BackupChapter
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            BackupChapter.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.TachiyomiObjectModel.BackupChapter();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                        case 1:
                            message.url = reader.string();
                            break;
                        case 2:
                            message.name = reader.string();
                            break;
                        case 3:
                            message.scanlator = reader.string();
                            break;
                        case 4:
                            message.read = reader.bool();
                            break;
                        case 5:
                            message.bookmark = reader.bool();
                            break;
                        case 6:
                            message.lastPageRead = reader.int32();
                            break;
                        case 7:
                            message.dateFetch = reader.int64();
                            break;
                        case 8:
                            message.dateUplaod = reader.int64();
                            break;
                        case 9:
                            message.chapterNumber = reader.float();
                            break;
                        case 10:
                            message.sourceOrder = reader.int32();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            /**
             * Decodes a BackupChapter message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof TachiyomiObjectModel.BackupChapter
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {TachiyomiObjectModel.BackupChapter} BackupChapter
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            BackupChapter.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            /**
             * Verifies a BackupChapter message.
             * @function verify
             * @memberof TachiyomiObjectModel.BackupChapter
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            BackupChapter.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.url != null && message.hasOwnProperty("url"))
                    if (!$util.isString(message.url))
                        return "url: string expected";
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.scanlator != null && message.hasOwnProperty("scanlator"))
                    if (!$util.isString(message.scanlator))
                        return "scanlator: string expected";
                if (message.read != null && message.hasOwnProperty("read"))
                    if (typeof message.read !== "boolean")
                        return "read: boolean expected";
                if (message.bookmark != null && message.hasOwnProperty("bookmark"))
                    if (typeof message.bookmark !== "boolean")
                        return "bookmark: boolean expected";
                if (message.lastPageRead != null && message.hasOwnProperty("lastPageRead"))
                    if (!$util.isInteger(message.lastPageRead))
                        return "lastPageRead: integer expected";
                if (message.dateFetch != null && message.hasOwnProperty("dateFetch"))
                    if (!$util.isInteger(message.dateFetch) && !(message.dateFetch && $util.isInteger(message.dateFetch.low) && $util.isInteger(message.dateFetch.high)))
                        return "dateFetch: integer|Long expected";
                if (message.dateUplaod != null && message.hasOwnProperty("dateUplaod"))
                    if (!$util.isInteger(message.dateUplaod) && !(message.dateUplaod && $util.isInteger(message.dateUplaod.low) && $util.isInteger(message.dateUplaod.high)))
                        return "dateUplaod: integer|Long expected";
                if (message.chapterNumber != null && message.hasOwnProperty("chapterNumber"))
                    if (typeof message.chapterNumber !== "number")
                        return "chapterNumber: number expected";
                if (message.sourceOrder != null && message.hasOwnProperty("sourceOrder"))
                    if (!$util.isInteger(message.sourceOrder))
                        return "sourceOrder: integer expected";
                return null;
            };
            /**
             * Creates a BackupChapter message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof TachiyomiObjectModel.BackupChapter
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {TachiyomiObjectModel.BackupChapter} BackupChapter
             */
            BackupChapter.fromObject = function fromObject(object) {
                if (object instanceof $root.TachiyomiObjectModel.BackupChapter)
                    return object;
                var message = new $root.TachiyomiObjectModel.BackupChapter();
                if (object.url != null)
                    message.url = String(object.url);
                if (object.name != null)
                    message.name = String(object.name);
                if (object.scanlator != null)
                    message.scanlator = String(object.scanlator);
                if (object.read != null)
                    message.read = Boolean(object.read);
                if (object.bookmark != null)
                    message.bookmark = Boolean(object.bookmark);
                if (object.lastPageRead != null)
                    message.lastPageRead = object.lastPageRead | 0;
                if (object.dateFetch != null)
                    if ($util.Long)
                        (message.dateFetch = $util.Long.fromValue(object.dateFetch)).unsigned = false;
                    else if (typeof object.dateFetch === "string")
                        message.dateFetch = parseInt(object.dateFetch, 10);
                    else if (typeof object.dateFetch === "number")
                        message.dateFetch = object.dateFetch;
                    else if (typeof object.dateFetch === "object")
                        message.dateFetch = new $util.LongBits(object.dateFetch.low >>> 0, object.dateFetch.high >>> 0).toNumber();
                if (object.dateUplaod != null)
                    if ($util.Long)
                        (message.dateUplaod = $util.Long.fromValue(object.dateUplaod)).unsigned = false;
                    else if (typeof object.dateUplaod === "string")
                        message.dateUplaod = parseInt(object.dateUplaod, 10);
                    else if (typeof object.dateUplaod === "number")
                        message.dateUplaod = object.dateUplaod;
                    else if (typeof object.dateUplaod === "object")
                        message.dateUplaod = new $util.LongBits(object.dateUplaod.low >>> 0, object.dateUplaod.high >>> 0).toNumber();
                if (object.chapterNumber != null)
                    message.chapterNumber = Number(object.chapterNumber);
                if (object.sourceOrder != null)
                    message.sourceOrder = object.sourceOrder | 0;
                return message;
            };
            /**
             * Creates a plain object from a BackupChapter message. Also converts values to other types if specified.
             * @function toObject
             * @memberof TachiyomiObjectModel.BackupChapter
             * @static
             * @param {TachiyomiObjectModel.BackupChapter} message BackupChapter
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            BackupChapter.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.url = "";
                    object.name = "";
                    object.scanlator = "";
                    object.read = false;
                    object.bookmark = false;
                    object.lastPageRead = 0;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.dateFetch = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    }
                    else
                        object.dateFetch = options.longs === String ? "0" : 0;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.dateUplaod = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    }
                    else
                        object.dateUplaod = options.longs === String ? "0" : 0;
                    object.chapterNumber = 0;
                    object.sourceOrder = 0;
                }
                if (message.url != null && message.hasOwnProperty("url"))
                    object.url = message.url;
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.scanlator != null && message.hasOwnProperty("scanlator"))
                    object.scanlator = message.scanlator;
                if (message.read != null && message.hasOwnProperty("read"))
                    object.read = message.read;
                if (message.bookmark != null && message.hasOwnProperty("bookmark"))
                    object.bookmark = message.bookmark;
                if (message.lastPageRead != null && message.hasOwnProperty("lastPageRead"))
                    object.lastPageRead = message.lastPageRead;
                if (message.dateFetch != null && message.hasOwnProperty("dateFetch"))
                    if (typeof message.dateFetch === "number")
                        object.dateFetch = options.longs === String ? String(message.dateFetch) : message.dateFetch;
                    else
                        object.dateFetch = options.longs === String ? $util.Long.prototype.toString.call(message.dateFetch) : options.longs === Number ? new $util.LongBits(message.dateFetch.low >>> 0, message.dateFetch.high >>> 0).toNumber() : message.dateFetch;
                if (message.dateUplaod != null && message.hasOwnProperty("dateUplaod"))
                    if (typeof message.dateUplaod === "number")
                        object.dateUplaod = options.longs === String ? String(message.dateUplaod) : message.dateUplaod;
                    else
                        object.dateUplaod = options.longs === String ? $util.Long.prototype.toString.call(message.dateUplaod) : options.longs === Number ? new $util.LongBits(message.dateUplaod.low >>> 0, message.dateUplaod.high >>> 0).toNumber() : message.dateUplaod;
                if (message.chapterNumber != null && message.hasOwnProperty("chapterNumber"))
                    object.chapterNumber = options.json && !isFinite(message.chapterNumber) ? String(message.chapterNumber) : message.chapterNumber;
                if (message.sourceOrder != null && message.hasOwnProperty("sourceOrder"))
                    object.sourceOrder = message.sourceOrder;
                return object;
            };
            /**
             * Converts this BackupChapter to JSON.
             * @function toJSON
             * @memberof TachiyomiObjectModel.BackupChapter
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            BackupChapter.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            return BackupChapter;
        })();
        TachiyomiObjectModel.BackupTracking = (function () {
            /**
             * Properties of a BackupTracking.
             * @memberof TachiyomiObjectModel
             * @interface IBackupTracking
             * @property {number|null} [syncId] BackupTracking syncId
             * @property {number|Long|null} [libraryId] BackupTracking libraryId
             * @property {number|null} [mediaId] BackupTracking mediaId
             * @property {string|null} [trackingUrl] BackupTracking trackingUrl
             * @property {string|null} [title] BackupTracking title
             * @property {number|null} [lastChapterRead] BackupTracking lastChapterRead
             * @property {number|null} [totalChapters] BackupTracking totalChapters
             * @property {number|null} [score] BackupTracking score
             * @property {number|null} [status] BackupTracking status
             * @property {number|Long|null} [startedReadingDate] BackupTracking startedReadingDate
             * @property {number|Long|null} [finishedReadingDate] BackupTracking finishedReadingDate
             */
            /**
             * Constructs a new BackupTracking.
             * @memberof TachiyomiObjectModel
             * @classdesc Represents a BackupTracking.
             * @implements IBackupTracking
             * @constructor
             * @param {TachiyomiObjectModel.IBackupTracking=} [properties] Properties to set
             */
            function BackupTracking(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
            /**
             * BackupTracking syncId.
             * @member {number} syncId
             * @memberof TachiyomiObjectModel.BackupTracking
             * @instance
             */
            BackupTracking.prototype.syncId = 0;
            /**
             * BackupTracking libraryId.
             * @member {number|Long} libraryId
             * @memberof TachiyomiObjectModel.BackupTracking
             * @instance
             */
            BackupTracking.prototype.libraryId = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
            /**
             * BackupTracking mediaId.
             * @member {number} mediaId
             * @memberof TachiyomiObjectModel.BackupTracking
             * @instance
             */
            BackupTracking.prototype.mediaId = 0;
            /**
             * BackupTracking trackingUrl.
             * @member {string} trackingUrl
             * @memberof TachiyomiObjectModel.BackupTracking
             * @instance
             */
            BackupTracking.prototype.trackingUrl = "";
            /**
             * BackupTracking title.
             * @member {string} title
             * @memberof TachiyomiObjectModel.BackupTracking
             * @instance
             */
            BackupTracking.prototype.title = "";
            /**
             * BackupTracking lastChapterRead.
             * @member {number} lastChapterRead
             * @memberof TachiyomiObjectModel.BackupTracking
             * @instance
             */
            BackupTracking.prototype.lastChapterRead = 0;
            /**
             * BackupTracking totalChapters.
             * @member {number} totalChapters
             * @memberof TachiyomiObjectModel.BackupTracking
             * @instance
             */
            BackupTracking.prototype.totalChapters = 0;
            /**
             * BackupTracking score.
             * @member {number} score
             * @memberof TachiyomiObjectModel.BackupTracking
             * @instance
             */
            BackupTracking.prototype.score = 0;
            /**
             * BackupTracking status.
             * @member {number} status
             * @memberof TachiyomiObjectModel.BackupTracking
             * @instance
             */
            BackupTracking.prototype.status = 0;
            /**
             * BackupTracking startedReadingDate.
             * @member {number|Long} startedReadingDate
             * @memberof TachiyomiObjectModel.BackupTracking
             * @instance
             */
            BackupTracking.prototype.startedReadingDate = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
            /**
             * BackupTracking finishedReadingDate.
             * @member {number|Long} finishedReadingDate
             * @memberof TachiyomiObjectModel.BackupTracking
             * @instance
             */
            BackupTracking.prototype.finishedReadingDate = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
            /**
             * Creates a new BackupTracking instance using the specified properties.
             * @function create
             * @memberof TachiyomiObjectModel.BackupTracking
             * @static
             * @param {TachiyomiObjectModel.IBackupTracking=} [properties] Properties to set
             * @returns {TachiyomiObjectModel.BackupTracking} BackupTracking instance
             */
            BackupTracking.create = function create(properties) {
                return new BackupTracking(properties);
            };
            /**
             * Encodes the specified BackupTracking message. Does not implicitly {@link TachiyomiObjectModel.BackupTracking.verify|verify} messages.
             * @function encode
             * @memberof TachiyomiObjectModel.BackupTracking
             * @static
             * @param {TachiyomiObjectModel.IBackupTracking} message BackupTracking message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BackupTracking.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.syncId != null && Object.hasOwnProperty.call(message, "syncId"))
                    writer.uint32(/* id 1, wireType 0 =*/ 8).int32(message.syncId);
                if (message.libraryId != null && Object.hasOwnProperty.call(message, "libraryId"))
                    writer.uint32(/* id 2, wireType 0 =*/ 16).int64(message.libraryId);
                if (message.mediaId != null && Object.hasOwnProperty.call(message, "mediaId"))
                    writer.uint32(/* id 3, wireType 0 =*/ 24).int32(message.mediaId);
                if (message.trackingUrl != null && Object.hasOwnProperty.call(message, "trackingUrl"))
                    writer.uint32(/* id 4, wireType 2 =*/ 34).string(message.trackingUrl);
                if (message.title != null && Object.hasOwnProperty.call(message, "title"))
                    writer.uint32(/* id 5, wireType 2 =*/ 42).string(message.title);
                if (message.lastChapterRead != null && Object.hasOwnProperty.call(message, "lastChapterRead"))
                    writer.uint32(/* id 6, wireType 5 =*/ 53).float(message.lastChapterRead);
                if (message.totalChapters != null && Object.hasOwnProperty.call(message, "totalChapters"))
                    writer.uint32(/* id 7, wireType 0 =*/ 56).int32(message.totalChapters);
                if (message.score != null && Object.hasOwnProperty.call(message, "score"))
                    writer.uint32(/* id 8, wireType 5 =*/ 69).float(message.score);
                if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                    writer.uint32(/* id 9, wireType 0 =*/ 72).int32(message.status);
                if (message.startedReadingDate != null && Object.hasOwnProperty.call(message, "startedReadingDate"))
                    writer.uint32(/* id 10, wireType 0 =*/ 80).int64(message.startedReadingDate);
                if (message.finishedReadingDate != null && Object.hasOwnProperty.call(message, "finishedReadingDate"))
                    writer.uint32(/* id 11, wireType 0 =*/ 88).int64(message.finishedReadingDate);
                return writer;
            };
            /**
             * Encodes the specified BackupTracking message, length delimited. Does not implicitly {@link TachiyomiObjectModel.BackupTracking.verify|verify} messages.
             * @function encodeDelimited
             * @memberof TachiyomiObjectModel.BackupTracking
             * @static
             * @param {TachiyomiObjectModel.IBackupTracking} message BackupTracking message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BackupTracking.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            /**
             * Decodes a BackupTracking message from the specified reader or buffer.
             * @function decode
             * @memberof TachiyomiObjectModel.BackupTracking
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {TachiyomiObjectModel.BackupTracking} BackupTracking
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            BackupTracking.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.TachiyomiObjectModel.BackupTracking();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                        case 1:
                            message.syncId = reader.int32();
                            break;
                        case 2:
                            message.libraryId = reader.int64();
                            break;
                        case 3:
                            message.mediaId = reader.int32();
                            break;
                        case 4:
                            message.trackingUrl = reader.string();
                            break;
                        case 5:
                            message.title = reader.string();
                            break;
                        case 6:
                            message.lastChapterRead = reader.float();
                            break;
                        case 7:
                            message.totalChapters = reader.int32();
                            break;
                        case 8:
                            message.score = reader.float();
                            break;
                        case 9:
                            message.status = reader.int32();
                            break;
                        case 10:
                            message.startedReadingDate = reader.int64();
                            break;
                        case 11:
                            message.finishedReadingDate = reader.int64();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            /**
             * Decodes a BackupTracking message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof TachiyomiObjectModel.BackupTracking
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {TachiyomiObjectModel.BackupTracking} BackupTracking
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            BackupTracking.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            /**
             * Verifies a BackupTracking message.
             * @function verify
             * @memberof TachiyomiObjectModel.BackupTracking
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            BackupTracking.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.syncId != null && message.hasOwnProperty("syncId"))
                    if (!$util.isInteger(message.syncId))
                        return "syncId: integer expected";
                if (message.libraryId != null && message.hasOwnProperty("libraryId"))
                    if (!$util.isInteger(message.libraryId) && !(message.libraryId && $util.isInteger(message.libraryId.low) && $util.isInteger(message.libraryId.high)))
                        return "libraryId: integer|Long expected";
                if (message.mediaId != null && message.hasOwnProperty("mediaId"))
                    if (!$util.isInteger(message.mediaId))
                        return "mediaId: integer expected";
                if (message.trackingUrl != null && message.hasOwnProperty("trackingUrl"))
                    if (!$util.isString(message.trackingUrl))
                        return "trackingUrl: string expected";
                if (message.title != null && message.hasOwnProperty("title"))
                    if (!$util.isString(message.title))
                        return "title: string expected";
                if (message.lastChapterRead != null && message.hasOwnProperty("lastChapterRead"))
                    if (typeof message.lastChapterRead !== "number")
                        return "lastChapterRead: number expected";
                if (message.totalChapters != null && message.hasOwnProperty("totalChapters"))
                    if (!$util.isInteger(message.totalChapters))
                        return "totalChapters: integer expected";
                if (message.score != null && message.hasOwnProperty("score"))
                    if (typeof message.score !== "number")
                        return "score: number expected";
                if (message.status != null && message.hasOwnProperty("status"))
                    if (!$util.isInteger(message.status))
                        return "status: integer expected";
                if (message.startedReadingDate != null && message.hasOwnProperty("startedReadingDate"))
                    if (!$util.isInteger(message.startedReadingDate) && !(message.startedReadingDate && $util.isInteger(message.startedReadingDate.low) && $util.isInteger(message.startedReadingDate.high)))
                        return "startedReadingDate: integer|Long expected";
                if (message.finishedReadingDate != null && message.hasOwnProperty("finishedReadingDate"))
                    if (!$util.isInteger(message.finishedReadingDate) && !(message.finishedReadingDate && $util.isInteger(message.finishedReadingDate.low) && $util.isInteger(message.finishedReadingDate.high)))
                        return "finishedReadingDate: integer|Long expected";
                return null;
            };
            /**
             * Creates a BackupTracking message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof TachiyomiObjectModel.BackupTracking
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {TachiyomiObjectModel.BackupTracking} BackupTracking
             */
            BackupTracking.fromObject = function fromObject(object) {
                if (object instanceof $root.TachiyomiObjectModel.BackupTracking)
                    return object;
                var message = new $root.TachiyomiObjectModel.BackupTracking();
                if (object.syncId != null)
                    message.syncId = object.syncId | 0;
                if (object.libraryId != null)
                    if ($util.Long)
                        (message.libraryId = $util.Long.fromValue(object.libraryId)).unsigned = false;
                    else if (typeof object.libraryId === "string")
                        message.libraryId = parseInt(object.libraryId, 10);
                    else if (typeof object.libraryId === "number")
                        message.libraryId = object.libraryId;
                    else if (typeof object.libraryId === "object")
                        message.libraryId = new $util.LongBits(object.libraryId.low >>> 0, object.libraryId.high >>> 0).toNumber();
                if (object.mediaId != null)
                    message.mediaId = object.mediaId | 0;
                if (object.trackingUrl != null)
                    message.trackingUrl = String(object.trackingUrl);
                if (object.title != null)
                    message.title = String(object.title);
                if (object.lastChapterRead != null)
                    message.lastChapterRead = Number(object.lastChapterRead);
                if (object.totalChapters != null)
                    message.totalChapters = object.totalChapters | 0;
                if (object.score != null)
                    message.score = Number(object.score);
                if (object.status != null)
                    message.status = object.status | 0;
                if (object.startedReadingDate != null)
                    if ($util.Long)
                        (message.startedReadingDate = $util.Long.fromValue(object.startedReadingDate)).unsigned = false;
                    else if (typeof object.startedReadingDate === "string")
                        message.startedReadingDate = parseInt(object.startedReadingDate, 10);
                    else if (typeof object.startedReadingDate === "number")
                        message.startedReadingDate = object.startedReadingDate;
                    else if (typeof object.startedReadingDate === "object")
                        message.startedReadingDate = new $util.LongBits(object.startedReadingDate.low >>> 0, object.startedReadingDate.high >>> 0).toNumber();
                if (object.finishedReadingDate != null)
                    if ($util.Long)
                        (message.finishedReadingDate = $util.Long.fromValue(object.finishedReadingDate)).unsigned = false;
                    else if (typeof object.finishedReadingDate === "string")
                        message.finishedReadingDate = parseInt(object.finishedReadingDate, 10);
                    else if (typeof object.finishedReadingDate === "number")
                        message.finishedReadingDate = object.finishedReadingDate;
                    else if (typeof object.finishedReadingDate === "object")
                        message.finishedReadingDate = new $util.LongBits(object.finishedReadingDate.low >>> 0, object.finishedReadingDate.high >>> 0).toNumber();
                return message;
            };
            /**
             * Creates a plain object from a BackupTracking message. Also converts values to other types if specified.
             * @function toObject
             * @memberof TachiyomiObjectModel.BackupTracking
             * @static
             * @param {TachiyomiObjectModel.BackupTracking} message BackupTracking
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            BackupTracking.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.syncId = 0;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.libraryId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    }
                    else
                        object.libraryId = options.longs === String ? "0" : 0;
                    object.mediaId = 0;
                    object.trackingUrl = "";
                    object.title = "";
                    object.lastChapterRead = 0;
                    object.totalChapters = 0;
                    object.score = 0;
                    object.status = 0;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.startedReadingDate = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    }
                    else
                        object.startedReadingDate = options.longs === String ? "0" : 0;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.finishedReadingDate = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    }
                    else
                        object.finishedReadingDate = options.longs === String ? "0" : 0;
                }
                if (message.syncId != null && message.hasOwnProperty("syncId"))
                    object.syncId = message.syncId;
                if (message.libraryId != null && message.hasOwnProperty("libraryId"))
                    if (typeof message.libraryId === "number")
                        object.libraryId = options.longs === String ? String(message.libraryId) : message.libraryId;
                    else
                        object.libraryId = options.longs === String ? $util.Long.prototype.toString.call(message.libraryId) : options.longs === Number ? new $util.LongBits(message.libraryId.low >>> 0, message.libraryId.high >>> 0).toNumber() : message.libraryId;
                if (message.mediaId != null && message.hasOwnProperty("mediaId"))
                    object.mediaId = message.mediaId;
                if (message.trackingUrl != null && message.hasOwnProperty("trackingUrl"))
                    object.trackingUrl = message.trackingUrl;
                if (message.title != null && message.hasOwnProperty("title"))
                    object.title = message.title;
                if (message.lastChapterRead != null && message.hasOwnProperty("lastChapterRead"))
                    object.lastChapterRead = options.json && !isFinite(message.lastChapterRead) ? String(message.lastChapterRead) : message.lastChapterRead;
                if (message.totalChapters != null && message.hasOwnProperty("totalChapters"))
                    object.totalChapters = message.totalChapters;
                if (message.score != null && message.hasOwnProperty("score"))
                    object.score = options.json && !isFinite(message.score) ? String(message.score) : message.score;
                if (message.status != null && message.hasOwnProperty("status"))
                    object.status = message.status;
                if (message.startedReadingDate != null && message.hasOwnProperty("startedReadingDate"))
                    if (typeof message.startedReadingDate === "number")
                        object.startedReadingDate = options.longs === String ? String(message.startedReadingDate) : message.startedReadingDate;
                    else
                        object.startedReadingDate = options.longs === String ? $util.Long.prototype.toString.call(message.startedReadingDate) : options.longs === Number ? new $util.LongBits(message.startedReadingDate.low >>> 0, message.startedReadingDate.high >>> 0).toNumber() : message.startedReadingDate;
                if (message.finishedReadingDate != null && message.hasOwnProperty("finishedReadingDate"))
                    if (typeof message.finishedReadingDate === "number")
                        object.finishedReadingDate = options.longs === String ? String(message.finishedReadingDate) : message.finishedReadingDate;
                    else
                        object.finishedReadingDate = options.longs === String ? $util.Long.prototype.toString.call(message.finishedReadingDate) : options.longs === Number ? new $util.LongBits(message.finishedReadingDate.low >>> 0, message.finishedReadingDate.high >>> 0).toNumber() : message.finishedReadingDate;
                return object;
            };
            /**
             * Converts this BackupTracking to JSON.
             * @function toJSON
             * @memberof TachiyomiObjectModel.BackupTracking
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            BackupTracking.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            return BackupTracking;
        })();
        TachiyomiObjectModel.BackupHistory = (function () {
            /**
             * Properties of a BackupHistory.
             * @memberof TachiyomiObjectModel
             * @interface IBackupHistory
             * @property {string|null} [url] BackupHistory url
             * @property {number|Long|null} [lastRead] BackupHistory lastRead
             */
            /**
             * Constructs a new BackupHistory.
             * @memberof TachiyomiObjectModel
             * @classdesc Represents a BackupHistory.
             * @implements IBackupHistory
             * @constructor
             * @param {TachiyomiObjectModel.IBackupHistory=} [properties] Properties to set
             */
            function BackupHistory(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
            /**
             * BackupHistory url.
             * @member {string} url
             * @memberof TachiyomiObjectModel.BackupHistory
             * @instance
             */
            BackupHistory.prototype.url = "";
            /**
             * BackupHistory lastRead.
             * @member {number|Long} lastRead
             * @memberof TachiyomiObjectModel.BackupHistory
             * @instance
             */
            BackupHistory.prototype.lastRead = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
            /**
             * Creates a new BackupHistory instance using the specified properties.
             * @function create
             * @memberof TachiyomiObjectModel.BackupHistory
             * @static
             * @param {TachiyomiObjectModel.IBackupHistory=} [properties] Properties to set
             * @returns {TachiyomiObjectModel.BackupHistory} BackupHistory instance
             */
            BackupHistory.create = function create(properties) {
                return new BackupHistory(properties);
            };
            /**
             * Encodes the specified BackupHistory message. Does not implicitly {@link TachiyomiObjectModel.BackupHistory.verify|verify} messages.
             * @function encode
             * @memberof TachiyomiObjectModel.BackupHistory
             * @static
             * @param {TachiyomiObjectModel.IBackupHistory} message BackupHistory message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BackupHistory.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.url != null && Object.hasOwnProperty.call(message, "url"))
                    writer.uint32(/* id 0, wireType 2 =*/ 2).string(message.url);
                if (message.lastRead != null && Object.hasOwnProperty.call(message, "lastRead"))
                    writer.uint32(/* id 1, wireType 0 =*/ 8).int64(message.lastRead);
                return writer;
            };
            /**
             * Encodes the specified BackupHistory message, length delimited. Does not implicitly {@link TachiyomiObjectModel.BackupHistory.verify|verify} messages.
             * @function encodeDelimited
             * @memberof TachiyomiObjectModel.BackupHistory
             * @static
             * @param {TachiyomiObjectModel.IBackupHistory} message BackupHistory message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BackupHistory.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            /**
             * Decodes a BackupHistory message from the specified reader or buffer.
             * @function decode
             * @memberof TachiyomiObjectModel.BackupHistory
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {TachiyomiObjectModel.BackupHistory} BackupHistory
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            BackupHistory.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.TachiyomiObjectModel.BackupHistory();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                        case 0:
                            message.url = reader.string();
                            break;
                        case 1:
                            message.lastRead = reader.int64();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            /**
             * Decodes a BackupHistory message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof TachiyomiObjectModel.BackupHistory
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {TachiyomiObjectModel.BackupHistory} BackupHistory
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            BackupHistory.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            /**
             * Verifies a BackupHistory message.
             * @function verify
             * @memberof TachiyomiObjectModel.BackupHistory
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            BackupHistory.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.url != null && message.hasOwnProperty("url"))
                    if (!$util.isString(message.url))
                        return "url: string expected";
                if (message.lastRead != null && message.hasOwnProperty("lastRead"))
                    if (!$util.isInteger(message.lastRead) && !(message.lastRead && $util.isInteger(message.lastRead.low) && $util.isInteger(message.lastRead.high)))
                        return "lastRead: integer|Long expected";
                return null;
            };
            /**
             * Creates a BackupHistory message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof TachiyomiObjectModel.BackupHistory
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {TachiyomiObjectModel.BackupHistory} BackupHistory
             */
            BackupHistory.fromObject = function fromObject(object) {
                if (object instanceof $root.TachiyomiObjectModel.BackupHistory)
                    return object;
                var message = new $root.TachiyomiObjectModel.BackupHistory();
                if (object.url != null)
                    message.url = String(object.url);
                if (object.lastRead != null)
                    if ($util.Long)
                        (message.lastRead = $util.Long.fromValue(object.lastRead)).unsigned = false;
                    else if (typeof object.lastRead === "string")
                        message.lastRead = parseInt(object.lastRead, 10);
                    else if (typeof object.lastRead === "number")
                        message.lastRead = object.lastRead;
                    else if (typeof object.lastRead === "object")
                        message.lastRead = new $util.LongBits(object.lastRead.low >>> 0, object.lastRead.high >>> 0).toNumber();
                return message;
            };
            /**
             * Creates a plain object from a BackupHistory message. Also converts values to other types if specified.
             * @function toObject
             * @memberof TachiyomiObjectModel.BackupHistory
             * @static
             * @param {TachiyomiObjectModel.BackupHistory} message BackupHistory
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            BackupHistory.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.url = "";
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.lastRead = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    }
                    else
                        object.lastRead = options.longs === String ? "0" : 0;
                }
                if (message.url != null && message.hasOwnProperty("url"))
                    object.url = message.url;
                if (message.lastRead != null && message.hasOwnProperty("lastRead"))
                    if (typeof message.lastRead === "number")
                        object.lastRead = options.longs === String ? String(message.lastRead) : message.lastRead;
                    else
                        object.lastRead = options.longs === String ? $util.Long.prototype.toString.call(message.lastRead) : options.longs === Number ? new $util.LongBits(message.lastRead.low >>> 0, message.lastRead.high >>> 0).toNumber() : message.lastRead;
                return object;
            };
            /**
             * Converts this BackupHistory to JSON.
             * @function toJSON
             * @memberof TachiyomiObjectModel.BackupHistory
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            BackupHistory.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            return BackupHistory;
        })();
        TachiyomiObjectModel.BackupCategory = (function () {
            /**
             * Properties of a BackupCategory.
             * @memberof TachiyomiObjectModel
             * @interface IBackupCategory
             * @property {string|null} [name] BackupCategory name
             * @property {number|null} [order] BackupCategory order
             * @property {number|null} [flags] BackupCategory flags
             */
            /**
             * Constructs a new BackupCategory.
             * @memberof TachiyomiObjectModel
             * @classdesc Represents a BackupCategory.
             * @implements IBackupCategory
             * @constructor
             * @param {TachiyomiObjectModel.IBackupCategory=} [properties] Properties to set
             */
            function BackupCategory(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
            /**
             * BackupCategory name.
             * @member {string} name
             * @memberof TachiyomiObjectModel.BackupCategory
             * @instance
             */
            BackupCategory.prototype.name = "";
            /**
             * BackupCategory order.
             * @member {number} order
             * @memberof TachiyomiObjectModel.BackupCategory
             * @instance
             */
            BackupCategory.prototype.order = 0;
            /**
             * BackupCategory flags.
             * @member {number} flags
             * @memberof TachiyomiObjectModel.BackupCategory
             * @instance
             */
            BackupCategory.prototype.flags = 0;
            /**
             * Creates a new BackupCategory instance using the specified properties.
             * @function create
             * @memberof TachiyomiObjectModel.BackupCategory
             * @static
             * @param {TachiyomiObjectModel.IBackupCategory=} [properties] Properties to set
             * @returns {TachiyomiObjectModel.BackupCategory} BackupCategory instance
             */
            BackupCategory.create = function create(properties) {
                return new BackupCategory(properties);
            };
            /**
             * Encodes the specified BackupCategory message. Does not implicitly {@link TachiyomiObjectModel.BackupCategory.verify|verify} messages.
             * @function encode
             * @memberof TachiyomiObjectModel.BackupCategory
             * @static
             * @param {TachiyomiObjectModel.IBackupCategory} message BackupCategory message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BackupCategory.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                    writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.name);
                if (message.order != null && Object.hasOwnProperty.call(message, "order"))
                    writer.uint32(/* id 2, wireType 0 =*/ 16).int32(message.order);
                if (message.flags != null && Object.hasOwnProperty.call(message, "flags"))
                    writer.uint32(/* id 100, wireType 0 =*/ 800).int32(message.flags);
                return writer;
            };
            /**
             * Encodes the specified BackupCategory message, length delimited. Does not implicitly {@link TachiyomiObjectModel.BackupCategory.verify|verify} messages.
             * @function encodeDelimited
             * @memberof TachiyomiObjectModel.BackupCategory
             * @static
             * @param {TachiyomiObjectModel.IBackupCategory} message BackupCategory message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BackupCategory.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            /**
             * Decodes a BackupCategory message from the specified reader or buffer.
             * @function decode
             * @memberof TachiyomiObjectModel.BackupCategory
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {TachiyomiObjectModel.BackupCategory} BackupCategory
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            BackupCategory.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.TachiyomiObjectModel.BackupCategory();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                        case 1:
                            message.name = reader.string();
                            break;
                        case 2:
                            message.order = reader.int32();
                            break;
                        case 100:
                            message.flags = reader.int32();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            /**
             * Decodes a BackupCategory message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof TachiyomiObjectModel.BackupCategory
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {TachiyomiObjectModel.BackupCategory} BackupCategory
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            BackupCategory.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            /**
             * Verifies a BackupCategory message.
             * @function verify
             * @memberof TachiyomiObjectModel.BackupCategory
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            BackupCategory.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.order != null && message.hasOwnProperty("order"))
                    if (!$util.isInteger(message.order))
                        return "order: integer expected";
                if (message.flags != null && message.hasOwnProperty("flags"))
                    if (!$util.isInteger(message.flags))
                        return "flags: integer expected";
                return null;
            };
            /**
             * Creates a BackupCategory message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof TachiyomiObjectModel.BackupCategory
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {TachiyomiObjectModel.BackupCategory} BackupCategory
             */
            BackupCategory.fromObject = function fromObject(object) {
                if (object instanceof $root.TachiyomiObjectModel.BackupCategory)
                    return object;
                var message = new $root.TachiyomiObjectModel.BackupCategory();
                if (object.name != null)
                    message.name = String(object.name);
                if (object.order != null)
                    message.order = object.order | 0;
                if (object.flags != null)
                    message.flags = object.flags | 0;
                return message;
            };
            /**
             * Creates a plain object from a BackupCategory message. Also converts values to other types if specified.
             * @function toObject
             * @memberof TachiyomiObjectModel.BackupCategory
             * @static
             * @param {TachiyomiObjectModel.BackupCategory} message BackupCategory
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            BackupCategory.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.name = "";
                    object.order = 0;
                    object.flags = 0;
                }
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.order != null && message.hasOwnProperty("order"))
                    object.order = message.order;
                if (message.flags != null && message.hasOwnProperty("flags"))
                    object.flags = message.flags;
                return object;
            };
            /**
             * Converts this BackupCategory to JSON.
             * @function toJSON
             * @memberof TachiyomiObjectModel.BackupCategory
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            BackupCategory.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            return BackupCategory;
        })();
        TachiyomiObjectModel.BackupSource = (function () {
            /**
             * Properties of a BackupSource.
             * @memberof TachiyomiObjectModel
             * @interface IBackupSource
             * @property {string|null} [name] BackupSource name
             * @property {number|Long|null} [sourceId] BackupSource sourceId
             */
            /**
             * Constructs a new BackupSource.
             * @memberof TachiyomiObjectModel
             * @classdesc Represents a BackupSource.
             * @implements IBackupSource
             * @constructor
             * @param {TachiyomiObjectModel.IBackupSource=} [properties] Properties to set
             */
            function BackupSource(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
            /**
             * BackupSource name.
             * @member {string} name
             * @memberof TachiyomiObjectModel.BackupSource
             * @instance
             */
            BackupSource.prototype.name = "";
            /**
             * BackupSource sourceId.
             * @member {number|Long} sourceId
             * @memberof TachiyomiObjectModel.BackupSource
             * @instance
             */
            BackupSource.prototype.sourceId = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
            /**
             * Creates a new BackupSource instance using the specified properties.
             * @function create
             * @memberof TachiyomiObjectModel.BackupSource
             * @static
             * @param {TachiyomiObjectModel.IBackupSource=} [properties] Properties to set
             * @returns {TachiyomiObjectModel.BackupSource} BackupSource instance
             */
            BackupSource.create = function create(properties) {
                return new BackupSource(properties);
            };
            /**
             * Encodes the specified BackupSource message. Does not implicitly {@link TachiyomiObjectModel.BackupSource.verify|verify} messages.
             * @function encode
             * @memberof TachiyomiObjectModel.BackupSource
             * @static
             * @param {TachiyomiObjectModel.IBackupSource} message BackupSource message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BackupSource.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                    writer.uint32(/* id 0, wireType 2 =*/ 2).string(message.name);
                if (message.sourceId != null && Object.hasOwnProperty.call(message, "sourceId"))
                    writer.uint32(/* id 1, wireType 0 =*/ 8).int64(message.sourceId);
                return writer;
            };
            /**
             * Encodes the specified BackupSource message, length delimited. Does not implicitly {@link TachiyomiObjectModel.BackupSource.verify|verify} messages.
             * @function encodeDelimited
             * @memberof TachiyomiObjectModel.BackupSource
             * @static
             * @param {TachiyomiObjectModel.IBackupSource} message BackupSource message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BackupSource.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            /**
             * Decodes a BackupSource message from the specified reader or buffer.
             * @function decode
             * @memberof TachiyomiObjectModel.BackupSource
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {TachiyomiObjectModel.BackupSource} BackupSource
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            BackupSource.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.TachiyomiObjectModel.BackupSource();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                        case 0:
                            message.name = reader.string();
                            break;
                        case 1:
                            message.sourceId = reader.int64();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            /**
             * Decodes a BackupSource message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof TachiyomiObjectModel.BackupSource
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {TachiyomiObjectModel.BackupSource} BackupSource
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            BackupSource.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            /**
             * Verifies a BackupSource message.
             * @function verify
             * @memberof TachiyomiObjectModel.BackupSource
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            BackupSource.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.sourceId != null && message.hasOwnProperty("sourceId"))
                    if (!$util.isInteger(message.sourceId) && !(message.sourceId && $util.isInteger(message.sourceId.low) && $util.isInteger(message.sourceId.high)))
                        return "sourceId: integer|Long expected";
                return null;
            };
            /**
             * Creates a BackupSource message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof TachiyomiObjectModel.BackupSource
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {TachiyomiObjectModel.BackupSource} BackupSource
             */
            BackupSource.fromObject = function fromObject(object) {
                if (object instanceof $root.TachiyomiObjectModel.BackupSource)
                    return object;
                var message = new $root.TachiyomiObjectModel.BackupSource();
                if (object.name != null)
                    message.name = String(object.name);
                if (object.sourceId != null)
                    if ($util.Long)
                        (message.sourceId = $util.Long.fromValue(object.sourceId)).unsigned = false;
                    else if (typeof object.sourceId === "string")
                        message.sourceId = parseInt(object.sourceId, 10);
                    else if (typeof object.sourceId === "number")
                        message.sourceId = object.sourceId;
                    else if (typeof object.sourceId === "object")
                        message.sourceId = new $util.LongBits(object.sourceId.low >>> 0, object.sourceId.high >>> 0).toNumber();
                return message;
            };
            /**
             * Creates a plain object from a BackupSource message. Also converts values to other types if specified.
             * @function toObject
             * @memberof TachiyomiObjectModel.BackupSource
             * @static
             * @param {TachiyomiObjectModel.BackupSource} message BackupSource
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            BackupSource.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.name = "";
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.sourceId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    }
                    else
                        object.sourceId = options.longs === String ? "0" : 0;
                }
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.sourceId != null && message.hasOwnProperty("sourceId"))
                    if (typeof message.sourceId === "number")
                        object.sourceId = options.longs === String ? String(message.sourceId) : message.sourceId;
                    else
                        object.sourceId = options.longs === String ? $util.Long.prototype.toString.call(message.sourceId) : options.longs === Number ? new $util.LongBits(message.sourceId.low >>> 0, message.sourceId.high >>> 0).toNumber() : message.sourceId;
                return object;
            };
            /**
             * Converts this BackupSource to JSON.
             * @function toJSON
             * @memberof TachiyomiObjectModel.BackupSource
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            BackupSource.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            return BackupSource;
        })();
        TachiyomiObjectModel.Backup = (function () {
            /**
             * Properties of a Backup.
             * @memberof TachiyomiObjectModel
             * @interface IBackup
             * @property {Array.<TachiyomiObjectModel.IBackupManga>|null} [backupManga] Backup backupManga
             * @property {Array.<TachiyomiObjectModel.IBackupCategory>|null} [backupCategories] Backup backupCategories
             * @property {Array.<TachiyomiObjectModel.IBackupSource>|null} [backupSources] Backup backupSources
             */
            /**
             * Constructs a new Backup.
             * @memberof TachiyomiObjectModel
             * @classdesc Represents a Backup.
             * @implements IBackup
             * @constructor
             * @param {TachiyomiObjectModel.IBackup=} [properties] Properties to set
             */
            function Backup(properties) {
                this.backupManga = [];
                this.backupCategories = [];
                this.backupSources = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
            /**
             * Backup backupManga.
             * @member {Array.<TachiyomiObjectModel.IBackupManga>} backupManga
             * @memberof TachiyomiObjectModel.Backup
             * @instance
             */
            Backup.prototype.backupManga = $util.emptyArray;
            /**
             * Backup backupCategories.
             * @member {Array.<TachiyomiObjectModel.IBackupCategory>} backupCategories
             * @memberof TachiyomiObjectModel.Backup
             * @instance
             */
            Backup.prototype.backupCategories = $util.emptyArray;
            /**
             * Backup backupSources.
             * @member {Array.<TachiyomiObjectModel.IBackupSource>} backupSources
             * @memberof TachiyomiObjectModel.Backup
             * @instance
             */
            Backup.prototype.backupSources = $util.emptyArray;
            /**
             * Creates a new Backup instance using the specified properties.
             * @function create
             * @memberof TachiyomiObjectModel.Backup
             * @static
             * @param {TachiyomiObjectModel.IBackup=} [properties] Properties to set
             * @returns {TachiyomiObjectModel.Backup} Backup instance
             */
            Backup.create = function create(properties) {
                return new Backup(properties);
            };
            /**
             * Encodes the specified Backup message. Does not implicitly {@link TachiyomiObjectModel.Backup.verify|verify} messages.
             * @function encode
             * @memberof TachiyomiObjectModel.Backup
             * @static
             * @param {TachiyomiObjectModel.IBackup} message Backup message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Backup.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.backupManga != null && message.backupManga.length)
                    for (var i = 0; i < message.backupManga.length; ++i)
                        $root.TachiyomiObjectModel.BackupManga.encode(message.backupManga[i], writer.uint32(/* id 1, wireType 2 =*/ 10).fork()).ldelim();
                if (message.backupCategories != null && message.backupCategories.length)
                    for (var i = 0; i < message.backupCategories.length; ++i)
                        $root.TachiyomiObjectModel.BackupCategory.encode(message.backupCategories[i], writer.uint32(/* id 2, wireType 2 =*/ 18).fork()).ldelim();
                if (message.backupSources != null && message.backupSources.length)
                    for (var i = 0; i < message.backupSources.length; ++i)
                        $root.TachiyomiObjectModel.BackupSource.encode(message.backupSources[i], writer.uint32(/* id 100, wireType 2 =*/ 802).fork()).ldelim();
                return writer;
            };
            /**
             * Encodes the specified Backup message, length delimited. Does not implicitly {@link TachiyomiObjectModel.Backup.verify|verify} messages.
             * @function encodeDelimited
             * @memberof TachiyomiObjectModel.Backup
             * @static
             * @param {TachiyomiObjectModel.IBackup} message Backup message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Backup.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
            /**
             * Decodes a Backup message from the specified reader or buffer.
             * @function decode
             * @memberof TachiyomiObjectModel.Backup
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {TachiyomiObjectModel.Backup} Backup
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Backup.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.TachiyomiObjectModel.Backup();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                        case 1:
                            if (!(message.backupManga && message.backupManga.length))
                                message.backupManga = [];
                            message.backupManga.push($root.TachiyomiObjectModel.BackupManga.decode(reader, reader.uint32()));
                            break;
                        case 2:
                            if (!(message.backupCategories && message.backupCategories.length))
                                message.backupCategories = [];
                            message.backupCategories.push($root.TachiyomiObjectModel.BackupCategory.decode(reader, reader.uint32()));
                            break;
                        case 100:
                            if (!(message.backupSources && message.backupSources.length))
                                message.backupSources = [];
                            message.backupSources.push($root.TachiyomiObjectModel.BackupSource.decode(reader, reader.uint32()));
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };
            /**
             * Decodes a Backup message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof TachiyomiObjectModel.Backup
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {TachiyomiObjectModel.Backup} Backup
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Backup.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
            /**
             * Verifies a Backup message.
             * @function verify
             * @memberof TachiyomiObjectModel.Backup
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Backup.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.backupManga != null && message.hasOwnProperty("backupManga")) {
                    if (!Array.isArray(message.backupManga))
                        return "backupManga: array expected";
                    for (var i = 0; i < message.backupManga.length; ++i) {
                        var error = $root.TachiyomiObjectModel.BackupManga.verify(message.backupManga[i]);
                        if (error)
                            return "backupManga." + error;
                    }
                }
                if (message.backupCategories != null && message.hasOwnProperty("backupCategories")) {
                    if (!Array.isArray(message.backupCategories))
                        return "backupCategories: array expected";
                    for (var i = 0; i < message.backupCategories.length; ++i) {
                        var error = $root.TachiyomiObjectModel.BackupCategory.verify(message.backupCategories[i]);
                        if (error)
                            return "backupCategories." + error;
                    }
                }
                if (message.backupSources != null && message.hasOwnProperty("backupSources")) {
                    if (!Array.isArray(message.backupSources))
                        return "backupSources: array expected";
                    for (var i = 0; i < message.backupSources.length; ++i) {
                        var error = $root.TachiyomiObjectModel.BackupSource.verify(message.backupSources[i]);
                        if (error)
                            return "backupSources." + error;
                    }
                }
                return null;
            };
            /**
             * Creates a Backup message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof TachiyomiObjectModel.Backup
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {TachiyomiObjectModel.Backup} Backup
             */
            Backup.fromObject = function fromObject(object) {
                if (object instanceof $root.TachiyomiObjectModel.Backup)
                    return object;
                var message = new $root.TachiyomiObjectModel.Backup();
                if (object.backupManga) {
                    if (!Array.isArray(object.backupManga))
                        throw TypeError(".TachiyomiObjectModel.Backup.backupManga: array expected");
                    message.backupManga = [];
                    for (var i = 0; i < object.backupManga.length; ++i) {
                        if (typeof object.backupManga[i] !== "object")
                            throw TypeError(".TachiyomiObjectModel.Backup.backupManga: object expected");
                        message.backupManga[i] = $root.TachiyomiObjectModel.BackupManga.fromObject(object.backupManga[i]);
                    }
                }
                if (object.backupCategories) {
                    if (!Array.isArray(object.backupCategories))
                        throw TypeError(".TachiyomiObjectModel.Backup.backupCategories: array expected");
                    message.backupCategories = [];
                    for (var i = 0; i < object.backupCategories.length; ++i) {
                        if (typeof object.backupCategories[i] !== "object")
                            throw TypeError(".TachiyomiObjectModel.Backup.backupCategories: object expected");
                        message.backupCategories[i] = $root.TachiyomiObjectModel.BackupCategory.fromObject(object.backupCategories[i]);
                    }
                }
                if (object.backupSources) {
                    if (!Array.isArray(object.backupSources))
                        throw TypeError(".TachiyomiObjectModel.Backup.backupSources: array expected");
                    message.backupSources = [];
                    for (var i = 0; i < object.backupSources.length; ++i) {
                        if (typeof object.backupSources[i] !== "object")
                            throw TypeError(".TachiyomiObjectModel.Backup.backupSources: object expected");
                        message.backupSources[i] = $root.TachiyomiObjectModel.BackupSource.fromObject(object.backupSources[i]);
                    }
                }
                return message;
            };
            /**
             * Creates a plain object from a Backup message. Also converts values to other types if specified.
             * @function toObject
             * @memberof TachiyomiObjectModel.Backup
             * @static
             * @param {TachiyomiObjectModel.Backup} message Backup
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Backup.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults) {
                    object.backupManga = [];
                    object.backupCategories = [];
                    object.backupSources = [];
                }
                if (message.backupManga && message.backupManga.length) {
                    object.backupManga = [];
                    for (var j = 0; j < message.backupManga.length; ++j)
                        object.backupManga[j] = $root.TachiyomiObjectModel.BackupManga.toObject(message.backupManga[j], options);
                }
                if (message.backupCategories && message.backupCategories.length) {
                    object.backupCategories = [];
                    for (var j = 0; j < message.backupCategories.length; ++j)
                        object.backupCategories[j] = $root.TachiyomiObjectModel.BackupCategory.toObject(message.backupCategories[j], options);
                }
                if (message.backupSources && message.backupSources.length) {
                    object.backupSources = [];
                    for (var j = 0; j < message.backupSources.length; ++j)
                        object.backupSources[j] = $root.TachiyomiObjectModel.BackupSource.toObject(message.backupSources[j], options);
                }
                return object;
            };
            /**
             * Converts this Backup to JSON.
             * @function toJSON
             * @memberof TachiyomiObjectModel.Backup
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Backup.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
            return Backup;
        })();
        return TachiyomiObjectModel;
    })();
    module.exports = $root;
    
    },{"protobufjs/minimal":66}],15:[function(require,module,exports){
    "use strict";
    var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
    }) : (function(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
    }));
    var __exportStar = (this && this.__exportStar) || function(m, exports) {
        for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require("./Tachiyomi/TachiyomiBackupManager"), exports);
    __exportStar(require("./Paperback/PaperbackBackupManager"), exports);
    __exportStar(require("./BackupConverters/TachiToPaperBackupConverter"), exports);
    __exportStar(require("./BackupConverters/PaperToTachiBackupConverter"), exports);
    
    },{"./BackupConverters/PaperToTachiBackupConverter":1,"./BackupConverters/TachiToPaperBackupConverter":2,"./Paperback/PaperbackBackupManager":11,"./Tachiyomi/TachiyomiBackupManager":13}],16:[function(require,module,exports){
    "use strict";
    module.exports = asPromise;
    
    /**
     * Callback as used by {@link util.asPromise}.
     * @typedef asPromiseCallback
     * @type {function}
     * @param {Error|null} error Error, if any
     * @param {...*} params Additional arguments
     * @returns {undefined}
     */
    
    /**
     * Returns a promise from a node-style callback function.
     * @memberof util
     * @param {asPromiseCallback} fn Function to call
     * @param {*} ctx Function context
     * @param {...*} params Function arguments
     * @returns {Promise<*>} Promisified function
     */
    function asPromise(fn, ctx/*, varargs */) {
        var params  = new Array(arguments.length - 1),
            offset  = 0,
            index   = 2,
            pending = true;
        while (index < arguments.length)
            params[offset++] = arguments[index++];
        return new Promise(function executor(resolve, reject) {
            params[offset] = function callback(err/*, varargs */) {
                if (pending) {
                    pending = false;
                    if (err)
                        reject(err);
                    else {
                        var params = new Array(arguments.length - 1),
                            offset = 0;
                        while (offset < params.length)
                            params[offset++] = arguments[offset];
                        resolve.apply(null, params);
                    }
                }
            };
            try {
                fn.apply(ctx || null, params);
            } catch (err) {
                if (pending) {
                    pending = false;
                    reject(err);
                }
            }
        });
    }
    
    },{}],17:[function(require,module,exports){
    "use strict";
    
    /**
     * A minimal base64 implementation for number arrays.
     * @memberof util
     * @namespace
     */
    var base64 = exports;
    
    /**
     * Calculates the byte length of a base64 encoded string.
     * @param {string} string Base64 encoded string
     * @returns {number} Byte length
     */
    base64.length = function length(string) {
        var p = string.length;
        if (!p)
            return 0;
        var n = 0;
        while (--p % 4 > 1 && string.charAt(p) === "=")
            ++n;
        return Math.ceil(string.length * 3) / 4 - n;
    };
    
    // Base64 encoding table
    var b64 = new Array(64);
    
    // Base64 decoding table
    var s64 = new Array(123);
    
    // 65..90, 97..122, 48..57, 43, 47
    for (var i = 0; i < 64;)
        s64[b64[i] = i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i - 59 | 43] = i++;
    
    /**
     * Encodes a buffer to a base64 encoded string.
     * @param {Uint8Array} buffer Source buffer
     * @param {number} start Source start
     * @param {number} end Source end
     * @returns {string} Base64 encoded string
     */
    base64.encode = function encode(buffer, start, end) {
        var parts = null,
            chunk = [];
        var i = 0, // output index
            j = 0, // goto index
            t;     // temporary
        while (start < end) {
            var b = buffer[start++];
            switch (j) {
                case 0:
                    chunk[i++] = b64[b >> 2];
                    t = (b & 3) << 4;
                    j = 1;
                    break;
                case 1:
                    chunk[i++] = b64[t | b >> 4];
                    t = (b & 15) << 2;
                    j = 2;
                    break;
                case 2:
                    chunk[i++] = b64[t | b >> 6];
                    chunk[i++] = b64[b & 63];
                    j = 0;
                    break;
            }
            if (i > 8191) {
                (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
                i = 0;
            }
        }
        if (j) {
            chunk[i++] = b64[t];
            chunk[i++] = 61;
            if (j === 1)
                chunk[i++] = 61;
        }
        if (parts) {
            if (i)
                parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
            return parts.join("");
        }
        return String.fromCharCode.apply(String, chunk.slice(0, i));
    };
    
    var invalidEncoding = "invalid encoding";
    
    /**
     * Decodes a base64 encoded string to a buffer.
     * @param {string} string Source string
     * @param {Uint8Array} buffer Destination buffer
     * @param {number} offset Destination offset
     * @returns {number} Number of bytes written
     * @throws {Error} If encoding is invalid
     */
    base64.decode = function decode(string, buffer, offset) {
        var start = offset;
        var j = 0, // goto index
            t;     // temporary
        for (var i = 0; i < string.length;) {
            var c = string.charCodeAt(i++);
            if (c === 61 && j > 1)
                break;
            if ((c = s64[c]) === undefined)
                throw Error(invalidEncoding);
            switch (j) {
                case 0:
                    t = c;
                    j = 1;
                    break;
                case 1:
                    buffer[offset++] = t << 2 | (c & 48) >> 4;
                    t = c;
                    j = 2;
                    break;
                case 2:
                    buffer[offset++] = (t & 15) << 4 | (c & 60) >> 2;
                    t = c;
                    j = 3;
                    break;
                case 3:
                    buffer[offset++] = (t & 3) << 6 | c;
                    j = 0;
                    break;
            }
        }
        if (j === 1)
            throw Error(invalidEncoding);
        return offset - start;
    };
    
    /**
     * Tests if the specified string appears to be base64 encoded.
     * @param {string} string String to test
     * @returns {boolean} `true` if probably base64 encoded, otherwise false
     */
    base64.test = function test(string) {
        return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(string);
    };
    
    },{}],18:[function(require,module,exports){
    "use strict";
    module.exports = EventEmitter;
    
    /**
     * Constructs a new event emitter instance.
     * @classdesc A minimal event emitter.
     * @memberof util
     * @constructor
     */
    function EventEmitter() {
    
        /**
         * Registered listeners.
         * @type {Object.<string,*>}
         * @private
         */
        this._listeners = {};
    }
    
    /**
     * Registers an event listener.
     * @param {string} evt Event name
     * @param {function} fn Listener
     * @param {*} [ctx] Listener context
     * @returns {util.EventEmitter} `this`
     */
    EventEmitter.prototype.on = function on(evt, fn, ctx) {
        (this._listeners[evt] || (this._listeners[evt] = [])).push({
            fn  : fn,
            ctx : ctx || this
        });
        return this;
    };
    
    /**
     * Removes an event listener or any matching listeners if arguments are omitted.
     * @param {string} [evt] Event name. Removes all listeners if omitted.
     * @param {function} [fn] Listener to remove. Removes all listeners of `evt` if omitted.
     * @returns {util.EventEmitter} `this`
     */
    EventEmitter.prototype.off = function off(evt, fn) {
        if (evt === undefined)
            this._listeners = {};
        else {
            if (fn === undefined)
                this._listeners[evt] = [];
            else {
                var listeners = this._listeners[evt];
                for (var i = 0; i < listeners.length;)
                    if (listeners[i].fn === fn)
                        listeners.splice(i, 1);
                    else
                        ++i;
            }
        }
        return this;
    };
    
    /**
     * Emits an event by calling its listeners with the specified arguments.
     * @param {string} evt Event name
     * @param {...*} args Arguments
     * @returns {util.EventEmitter} `this`
     */
    EventEmitter.prototype.emit = function emit(evt) {
        var listeners = this._listeners[evt];
        if (listeners) {
            var args = [],
                i = 1;
            for (; i < arguments.length;)
                args.push(arguments[i++]);
            for (i = 0; i < listeners.length;)
                listeners[i].fn.apply(listeners[i++].ctx, args);
        }
        return this;
    };
    
    },{}],19:[function(require,module,exports){
    "use strict";
    
    module.exports = factory(factory);
    
    /**
     * Reads / writes floats / doubles from / to buffers.
     * @name util.float
     * @namespace
     */
    
    /**
     * Writes a 32 bit float to a buffer using little endian byte order.
     * @name util.float.writeFloatLE
     * @function
     * @param {number} val Value to write
     * @param {Uint8Array} buf Target buffer
     * @param {number} pos Target buffer offset
     * @returns {undefined}
     */
    
    /**
     * Writes a 32 bit float to a buffer using big endian byte order.
     * @name util.float.writeFloatBE
     * @function
     * @param {number} val Value to write
     * @param {Uint8Array} buf Target buffer
     * @param {number} pos Target buffer offset
     * @returns {undefined}
     */
    
    /**
     * Reads a 32 bit float from a buffer using little endian byte order.
     * @name util.float.readFloatLE
     * @function
     * @param {Uint8Array} buf Source buffer
     * @param {number} pos Source buffer offset
     * @returns {number} Value read
     */
    
    /**
     * Reads a 32 bit float from a buffer using big endian byte order.
     * @name util.float.readFloatBE
     * @function
     * @param {Uint8Array} buf Source buffer
     * @param {number} pos Source buffer offset
     * @returns {number} Value read
     */
    
    /**
     * Writes a 64 bit double to a buffer using little endian byte order.
     * @name util.float.writeDoubleLE
     * @function
     * @param {number} val Value to write
     * @param {Uint8Array} buf Target buffer
     * @param {number} pos Target buffer offset
     * @returns {undefined}
     */
    
    /**
     * Writes a 64 bit double to a buffer using big endian byte order.
     * @name util.float.writeDoubleBE
     * @function
     * @param {number} val Value to write
     * @param {Uint8Array} buf Target buffer
     * @param {number} pos Target buffer offset
     * @returns {undefined}
     */
    
    /**
     * Reads a 64 bit double from a buffer using little endian byte order.
     * @name util.float.readDoubleLE
     * @function
     * @param {Uint8Array} buf Source buffer
     * @param {number} pos Source buffer offset
     * @returns {number} Value read
     */
    
    /**
     * Reads a 64 bit double from a buffer using big endian byte order.
     * @name util.float.readDoubleBE
     * @function
     * @param {Uint8Array} buf Source buffer
     * @param {number} pos Source buffer offset
     * @returns {number} Value read
     */
    
    // Factory function for the purpose of node-based testing in modified global environments
    function factory(exports) {
    
        // float: typed array
        if (typeof Float32Array !== "undefined") (function() {
    
            var f32 = new Float32Array([ -0 ]),
                f8b = new Uint8Array(f32.buffer),
                le  = f8b[3] === 128;
    
            function writeFloat_f32_cpy(val, buf, pos) {
                f32[0] = val;
                buf[pos    ] = f8b[0];
                buf[pos + 1] = f8b[1];
                buf[pos + 2] = f8b[2];
                buf[pos + 3] = f8b[3];
            }
    
            function writeFloat_f32_rev(val, buf, pos) {
                f32[0] = val;
                buf[pos    ] = f8b[3];
                buf[pos + 1] = f8b[2];
                buf[pos + 2] = f8b[1];
                buf[pos + 3] = f8b[0];
            }
    
            /* istanbul ignore next */
            exports.writeFloatLE = le ? writeFloat_f32_cpy : writeFloat_f32_rev;
            /* istanbul ignore next */
            exports.writeFloatBE = le ? writeFloat_f32_rev : writeFloat_f32_cpy;
    
            function readFloat_f32_cpy(buf, pos) {
                f8b[0] = buf[pos    ];
                f8b[1] = buf[pos + 1];
                f8b[2] = buf[pos + 2];
                f8b[3] = buf[pos + 3];
                return f32[0];
            }
    
            function readFloat_f32_rev(buf, pos) {
                f8b[3] = buf[pos    ];
                f8b[2] = buf[pos + 1];
                f8b[1] = buf[pos + 2];
                f8b[0] = buf[pos + 3];
                return f32[0];
            }
    
            /* istanbul ignore next */
            exports.readFloatLE = le ? readFloat_f32_cpy : readFloat_f32_rev;
            /* istanbul ignore next */
            exports.readFloatBE = le ? readFloat_f32_rev : readFloat_f32_cpy;
    
        // float: ieee754
        })(); else (function() {
    
            function writeFloat_ieee754(writeUint, val, buf, pos) {
                var sign = val < 0 ? 1 : 0;
                if (sign)
                    val = -val;
                if (val === 0)
                    writeUint(1 / val > 0 ? /* positive */ 0 : /* negative 0 */ 2147483648, buf, pos);
                else if (isNaN(val))
                    writeUint(2143289344, buf, pos);
                else if (val > 3.4028234663852886e+38) // +-Infinity
                    writeUint((sign << 31 | 2139095040) >>> 0, buf, pos);
                else if (val < 1.1754943508222875e-38) // denormal
                    writeUint((sign << 31 | Math.round(val / 1.401298464324817e-45)) >>> 0, buf, pos);
                else {
                    var exponent = Math.floor(Math.log(val) / Math.LN2),
                        mantissa = Math.round(val * Math.pow(2, -exponent) * 8388608) & 8388607;
                    writeUint((sign << 31 | exponent + 127 << 23 | mantissa) >>> 0, buf, pos);
                }
            }
    
            exports.writeFloatLE = writeFloat_ieee754.bind(null, writeUintLE);
            exports.writeFloatBE = writeFloat_ieee754.bind(null, writeUintBE);
    
            function readFloat_ieee754(readUint, buf, pos) {
                var uint = readUint(buf, pos),
                    sign = (uint >> 31) * 2 + 1,
                    exponent = uint >>> 23 & 255,
                    mantissa = uint & 8388607;
                return exponent === 255
                    ? mantissa
                    ? NaN
                    : sign * Infinity
                    : exponent === 0 // denormal
                    ? sign * 1.401298464324817e-45 * mantissa
                    : sign * Math.pow(2, exponent - 150) * (mantissa + 8388608);
            }
    
            exports.readFloatLE = readFloat_ieee754.bind(null, readUintLE);
            exports.readFloatBE = readFloat_ieee754.bind(null, readUintBE);
    
        })();
    
        // double: typed array
        if (typeof Float64Array !== "undefined") (function() {
    
            var f64 = new Float64Array([-0]),
                f8b = new Uint8Array(f64.buffer),
                le  = f8b[7] === 128;
    
            function writeDouble_f64_cpy(val, buf, pos) {
                f64[0] = val;
                buf[pos    ] = f8b[0];
                buf[pos + 1] = f8b[1];
                buf[pos + 2] = f8b[2];
                buf[pos + 3] = f8b[3];
                buf[pos + 4] = f8b[4];
                buf[pos + 5] = f8b[5];
                buf[pos + 6] = f8b[6];
                buf[pos + 7] = f8b[7];
            }
    
            function writeDouble_f64_rev(val, buf, pos) {
                f64[0] = val;
                buf[pos    ] = f8b[7];
                buf[pos + 1] = f8b[6];
                buf[pos + 2] = f8b[5];
                buf[pos + 3] = f8b[4];
                buf[pos + 4] = f8b[3];
                buf[pos + 5] = f8b[2];
                buf[pos + 6] = f8b[1];
                buf[pos + 7] = f8b[0];
            }
    
            /* istanbul ignore next */
            exports.writeDoubleLE = le ? writeDouble_f64_cpy : writeDouble_f64_rev;
            /* istanbul ignore next */
            exports.writeDoubleBE = le ? writeDouble_f64_rev : writeDouble_f64_cpy;
    
            function readDouble_f64_cpy(buf, pos) {
                f8b[0] = buf[pos    ];
                f8b[1] = buf[pos + 1];
                f8b[2] = buf[pos + 2];
                f8b[3] = buf[pos + 3];
                f8b[4] = buf[pos + 4];
                f8b[5] = buf[pos + 5];
                f8b[6] = buf[pos + 6];
                f8b[7] = buf[pos + 7];
                return f64[0];
            }
    
            function readDouble_f64_rev(buf, pos) {
                f8b[7] = buf[pos    ];
                f8b[6] = buf[pos + 1];
                f8b[5] = buf[pos + 2];
                f8b[4] = buf[pos + 3];
                f8b[3] = buf[pos + 4];
                f8b[2] = buf[pos + 5];
                f8b[1] = buf[pos + 6];
                f8b[0] = buf[pos + 7];
                return f64[0];
            }
    
            /* istanbul ignore next */
            exports.readDoubleLE = le ? readDouble_f64_cpy : readDouble_f64_rev;
            /* istanbul ignore next */
            exports.readDoubleBE = le ? readDouble_f64_rev : readDouble_f64_cpy;
    
        // double: ieee754
        })(); else (function() {
    
            function writeDouble_ieee754(writeUint, off0, off1, val, buf, pos) {
                var sign = val < 0 ? 1 : 0;
                if (sign)
                    val = -val;
                if (val === 0) {
                    writeUint(0, buf, pos + off0);
                    writeUint(1 / val > 0 ? /* positive */ 0 : /* negative 0 */ 2147483648, buf, pos + off1);
                } else if (isNaN(val)) {
                    writeUint(0, buf, pos + off0);
                    writeUint(2146959360, buf, pos + off1);
                } else if (val > 1.7976931348623157e+308) { // +-Infinity
                    writeUint(0, buf, pos + off0);
                    writeUint((sign << 31 | 2146435072) >>> 0, buf, pos + off1);
                } else {
                    var mantissa;
                    if (val < 2.2250738585072014e-308) { // denormal
                        mantissa = val / 5e-324;
                        writeUint(mantissa >>> 0, buf, pos + off0);
                        writeUint((sign << 31 | mantissa / 4294967296) >>> 0, buf, pos + off1);
                    } else {
                        var exponent = Math.floor(Math.log(val) / Math.LN2);
                        if (exponent === 1024)
                            exponent = 1023;
                        mantissa = val * Math.pow(2, -exponent);
                        writeUint(mantissa * 4503599627370496 >>> 0, buf, pos + off0);
                        writeUint((sign << 31 | exponent + 1023 << 20 | mantissa * 1048576 & 1048575) >>> 0, buf, pos + off1);
                    }
                }
            }
    
            exports.writeDoubleLE = writeDouble_ieee754.bind(null, writeUintLE, 0, 4);
            exports.writeDoubleBE = writeDouble_ieee754.bind(null, writeUintBE, 4, 0);
    
            function readDouble_ieee754(readUint, off0, off1, buf, pos) {
                var lo = readUint(buf, pos + off0),
                    hi = readUint(buf, pos + off1);
                var sign = (hi >> 31) * 2 + 1,
                    exponent = hi >>> 20 & 2047,
                    mantissa = 4294967296 * (hi & 1048575) + lo;
                return exponent === 2047
                    ? mantissa
                    ? NaN
                    : sign * Infinity
                    : exponent === 0 // denormal
                    ? sign * 5e-324 * mantissa
                    : sign * Math.pow(2, exponent - 1075) * (mantissa + 4503599627370496);
            }
    
            exports.readDoubleLE = readDouble_ieee754.bind(null, readUintLE, 0, 4);
            exports.readDoubleBE = readDouble_ieee754.bind(null, readUintBE, 4, 0);
    
        })();
    
        return exports;
    }
    
    // uint helpers
    
    function writeUintLE(val, buf, pos) {
        buf[pos    ] =  val        & 255;
        buf[pos + 1] =  val >>> 8  & 255;
        buf[pos + 2] =  val >>> 16 & 255;
        buf[pos + 3] =  val >>> 24;
    }
    
    function writeUintBE(val, buf, pos) {
        buf[pos    ] =  val >>> 24;
        buf[pos + 1] =  val >>> 16 & 255;
        buf[pos + 2] =  val >>> 8  & 255;
        buf[pos + 3] =  val        & 255;
    }
    
    function readUintLE(buf, pos) {
        return (buf[pos    ]
              | buf[pos + 1] << 8
              | buf[pos + 2] << 16
              | buf[pos + 3] << 24) >>> 0;
    }
    
    function readUintBE(buf, pos) {
        return (buf[pos    ] << 24
              | buf[pos + 1] << 16
              | buf[pos + 2] << 8
              | buf[pos + 3]) >>> 0;
    }
    
    },{}],20:[function(require,module,exports){
    "use strict";
    module.exports = inquire;
    
    /**
     * Requires a module only if available.
     * @memberof util
     * @param {string} moduleName Module to require
     * @returns {?Object} Required module if available and not empty, otherwise `null`
     */
    function inquire(moduleName) {
        try {
            var mod = eval("quire".replace(/^/,"re"))(moduleName); // eslint-disable-line no-eval
            if (mod && (mod.length || Object.keys(mod).length))
                return mod;
        } catch (e) {} // eslint-disable-line no-empty
        return null;
    }
    
    },{}],21:[function(require,module,exports){
    "use strict";
    module.exports = pool;
    
    /**
     * An allocator as used by {@link util.pool}.
     * @typedef PoolAllocator
     * @type {function}
     * @param {number} size Buffer size
     * @returns {Uint8Array} Buffer
     */
    
    /**
     * A slicer as used by {@link util.pool}.
     * @typedef PoolSlicer
     * @type {function}
     * @param {number} start Start offset
     * @param {number} end End offset
     * @returns {Uint8Array} Buffer slice
     * @this {Uint8Array}
     */
    
    /**
     * A general purpose buffer pool.
     * @memberof util
     * @function
     * @param {PoolAllocator} alloc Allocator
     * @param {PoolSlicer} slice Slicer
     * @param {number} [size=8192] Slab size
     * @returns {PoolAllocator} Pooled allocator
     */
    function pool(alloc, slice, size) {
        var SIZE   = size || 8192;
        var MAX    = SIZE >>> 1;
        var slab   = null;
        var offset = SIZE;
        return function pool_alloc(size) {
            if (size < 1 || size > MAX)
                return alloc(size);
            if (offset + size > SIZE) {
                slab = alloc(SIZE);
                offset = 0;
            }
            var buf = slice.call(slab, offset, offset += size);
            if (offset & 7) // align to 32 bit
                offset = (offset | 7) + 1;
            return buf;
        };
    }
    
    },{}],22:[function(require,module,exports){
    "use strict";
    
    /**
     * A minimal UTF8 implementation for number arrays.
     * @memberof util
     * @namespace
     */
    var utf8 = exports;
    
    /**
     * Calculates the UTF8 byte length of a string.
     * @param {string} string String
     * @returns {number} Byte length
     */
    utf8.length = function utf8_length(string) {
        var len = 0,
            c = 0;
        for (var i = 0; i < string.length; ++i) {
            c = string.charCodeAt(i);
            if (c < 128)
                len += 1;
            else if (c < 2048)
                len += 2;
            else if ((c & 0xFC00) === 0xD800 && (string.charCodeAt(i + 1) & 0xFC00) === 0xDC00) {
                ++i;
                len += 4;
            } else
                len += 3;
        }
        return len;
    };
    
    /**
     * Reads UTF8 bytes as a string.
     * @param {Uint8Array} buffer Source buffer
     * @param {number} start Source start
     * @param {number} end Source end
     * @returns {string} String read
     */
    utf8.read = function utf8_read(buffer, start, end) {
        var len = end - start;
        if (len < 1)
            return "";
        var parts = null,
            chunk = [],
            i = 0, // char offset
            t;     // temporary
        while (start < end) {
            t = buffer[start++];
            if (t < 128)
                chunk[i++] = t;
            else if (t > 191 && t < 224)
                chunk[i++] = (t & 31) << 6 | buffer[start++] & 63;
            else if (t > 239 && t < 365) {
                t = ((t & 7) << 18 | (buffer[start++] & 63) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63) - 0x10000;
                chunk[i++] = 0xD800 + (t >> 10);
                chunk[i++] = 0xDC00 + (t & 1023);
            } else
                chunk[i++] = (t & 15) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63;
            if (i > 8191) {
                (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
                i = 0;
            }
        }
        if (parts) {
            if (i)
                parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
            return parts.join("");
        }
        return String.fromCharCode.apply(String, chunk.slice(0, i));
    };
    
    /**
     * Writes a string as UTF8 bytes.
     * @param {string} string Source string
     * @param {Uint8Array} buffer Destination buffer
     * @param {number} offset Destination offset
     * @returns {number} Bytes written
     */
    utf8.write = function utf8_write(string, buffer, offset) {
        var start = offset,
            c1, // character 1
            c2; // character 2
        for (var i = 0; i < string.length; ++i) {
            c1 = string.charCodeAt(i);
            if (c1 < 128) {
                buffer[offset++] = c1;
            } else if (c1 < 2048) {
                buffer[offset++] = c1 >> 6       | 192;
                buffer[offset++] = c1       & 63 | 128;
            } else if ((c1 & 0xFC00) === 0xD800 && ((c2 = string.charCodeAt(i + 1)) & 0xFC00) === 0xDC00) {
                c1 = 0x10000 + ((c1 & 0x03FF) << 10) + (c2 & 0x03FF);
                ++i;
                buffer[offset++] = c1 >> 18      | 240;
                buffer[offset++] = c1 >> 12 & 63 | 128;
                buffer[offset++] = c1 >> 6  & 63 | 128;
                buffer[offset++] = c1       & 63 | 128;
            } else {
                buffer[offset++] = c1 >> 12      | 224;
                buffer[offset++] = c1 >> 6  & 63 | 128;
                buffer[offset++] = c1       & 63 | 128;
            }
        }
        return offset - start;
    };
    
    },{}],23:[function(require,module,exports){
    module.exports = require('./lib/axios');
    },{"./lib/axios":25}],24:[function(require,module,exports){
    'use strict';
    
    var utils = require('./../utils');
    var settle = require('./../core/settle');
    var cookies = require('./../helpers/cookies');
    var buildURL = require('./../helpers/buildURL');
    var buildFullPath = require('../core/buildFullPath');
    var parseHeaders = require('./../helpers/parseHeaders');
    var isURLSameOrigin = require('./../helpers/isURLSameOrigin');
    var createError = require('../core/createError');
    
    module.exports = function xhrAdapter(config) {
      return new Promise(function dispatchXhrRequest(resolve, reject) {
        var requestData = config.data;
        var requestHeaders = config.headers;
    
        if (utils.isFormData(requestData)) {
          delete requestHeaders['Content-Type']; // Let the browser set it
        }
    
        var request = new XMLHttpRequest();
    
        // HTTP basic authentication
        if (config.auth) {
          var username = config.auth.username || '';
          var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
          requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
        }
    
        var fullPath = buildFullPath(config.baseURL, config.url);
        request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);
    
        // Set the request timeout in MS
        request.timeout = config.timeout;
    
        // Listen for ready state
        request.onreadystatechange = function handleLoad() {
          if (!request || request.readyState !== 4) {
            return;
          }
    
          // The request errored out and we didn't get a response, this will be
          // handled by onerror instead
          // With one exception: request that using file: protocol, most browsers
          // will return status as 0 even though it's a successful request
          if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
            return;
          }
    
          // Prepare the response
          var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
          var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
          var response = {
            data: responseData,
            status: request.status,
            statusText: request.statusText,
            headers: responseHeaders,
            config: config,
            request: request
          };
    
          settle(resolve, reject, response);
    
          // Clean up request
          request = null;
        };
    
        // Handle browser request cancellation (as opposed to a manual cancellation)
        request.onabort = function handleAbort() {
          if (!request) {
            return;
          }
    
          reject(createError('Request aborted', config, 'ECONNABORTED', request));
    
          // Clean up request
          request = null;
        };
    
        // Handle low level network errors
        request.onerror = function handleError() {
          // Real errors are hidden from us by the browser
          // onerror should only fire if it's a network error
          reject(createError('Network Error', config, null, request));
    
          // Clean up request
          request = null;
        };
    
        // Handle timeout
        request.ontimeout = function handleTimeout() {
          var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
          if (config.timeoutErrorMessage) {
            timeoutErrorMessage = config.timeoutErrorMessage;
          }
          reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',
            request));
    
          // Clean up request
          request = null;
        };
    
        // Add xsrf header
        // This is only done if running in a standard browser environment.
        // Specifically not if we're in a web worker, or react-native.
        if (utils.isStandardBrowserEnv()) {
          // Add xsrf header
          var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
            cookies.read(config.xsrfCookieName) :
            undefined;
    
          if (xsrfValue) {
            requestHeaders[config.xsrfHeaderName] = xsrfValue;
          }
        }
    
        // Add headers to the request
        if ('setRequestHeader' in request) {
          utils.forEach(requestHeaders, function setRequestHeader(val, key) {
            if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
              // Remove Content-Type if data is undefined
              delete requestHeaders[key];
            } else {
              // Otherwise add header to the request
              request.setRequestHeader(key, val);
            }
          });
        }
    
        // Add withCredentials to request if needed
        if (!utils.isUndefined(config.withCredentials)) {
          request.withCredentials = !!config.withCredentials;
        }
    
        // Add responseType to request if needed
        if (config.responseType) {
          try {
            request.responseType = config.responseType;
          } catch (e) {
            // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
            // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
            if (config.responseType !== 'json') {
              throw e;
            }
          }
        }
    
        // Handle progress if needed
        if (typeof config.onDownloadProgress === 'function') {
          request.addEventListener('progress', config.onDownloadProgress);
        }
    
        // Not all browsers support upload events
        if (typeof config.onUploadProgress === 'function' && request.upload) {
          request.upload.addEventListener('progress', config.onUploadProgress);
        }
    
        if (config.cancelToken) {
          // Handle cancellation
          config.cancelToken.promise.then(function onCanceled(cancel) {
            if (!request) {
              return;
            }
    
            request.abort();
            reject(cancel);
            // Clean up request
            request = null;
          });
        }
    
        if (!requestData) {
          requestData = null;
        }
    
        // Send the request
        request.send(requestData);
      });
    };
    
    },{"../core/buildFullPath":31,"../core/createError":32,"./../core/settle":36,"./../helpers/buildURL":40,"./../helpers/cookies":42,"./../helpers/isURLSameOrigin":45,"./../helpers/parseHeaders":47,"./../utils":49}],25:[function(require,module,exports){
    'use strict';
    
    var utils = require('./utils');
    var bind = require('./helpers/bind');
    var Axios = require('./core/Axios');
    var mergeConfig = require('./core/mergeConfig');
    var defaults = require('./defaults');
    
    /**
     * Create an instance of Axios
     *
     * @param {Object} defaultConfig The default config for the instance
     * @return {Axios} A new instance of Axios
     */
    function createInstance(defaultConfig) {
      var context = new Axios(defaultConfig);
      var instance = bind(Axios.prototype.request, context);
    
      // Copy axios.prototype to instance
      utils.extend(instance, Axios.prototype, context);
    
      // Copy context to instance
      utils.extend(instance, context);
    
      return instance;
    }
    
    // Create the default instance to be exported
    var axios = createInstance(defaults);
    
    // Expose Axios class to allow class inheritance
    axios.Axios = Axios;
    
    // Factory for creating new instances
    axios.create = function create(instanceConfig) {
      return createInstance(mergeConfig(axios.defaults, instanceConfig));
    };
    
    // Expose Cancel & CancelToken
    axios.Cancel = require('./cancel/Cancel');
    axios.CancelToken = require('./cancel/CancelToken');
    axios.isCancel = require('./cancel/isCancel');
    
    // Expose all/spread
    axios.all = function all(promises) {
      return Promise.all(promises);
    };
    axios.spread = require('./helpers/spread');
    
    // Expose isAxiosError
    axios.isAxiosError = require('./helpers/isAxiosError');
    
    module.exports = axios;
    
    // Allow use of default import syntax in TypeScript
    module.exports.default = axios;
    
    },{"./cancel/Cancel":26,"./cancel/CancelToken":27,"./cancel/isCancel":28,"./core/Axios":29,"./core/mergeConfig":35,"./defaults":38,"./helpers/bind":39,"./helpers/isAxiosError":44,"./helpers/spread":48,"./utils":49}],26:[function(require,module,exports){
    'use strict';
    
    /**
     * A `Cancel` is an object that is thrown when an operation is canceled.
     *
     * @class
     * @param {string=} message The message.
     */
    function Cancel(message) {
      this.message = message;
    }
    
    Cancel.prototype.toString = function toString() {
      return 'Cancel' + (this.message ? ': ' + this.message : '');
    };
    
    Cancel.prototype.__CANCEL__ = true;
    
    module.exports = Cancel;
    
    },{}],27:[function(require,module,exports){
    'use strict';
    
    var Cancel = require('./Cancel');
    
    /**
     * A `CancelToken` is an object that can be used to request cancellation of an operation.
     *
     * @class
     * @param {Function} executor The executor function.
     */
    function CancelToken(executor) {
      if (typeof executor !== 'function') {
        throw new TypeError('executor must be a function.');
      }
    
      var resolvePromise;
      this.promise = new Promise(function promiseExecutor(resolve) {
        resolvePromise = resolve;
      });
    
      var token = this;
      executor(function cancel(message) {
        if (token.reason) {
          // Cancellation has already been requested
          return;
        }
    
        token.reason = new Cancel(message);
        resolvePromise(token.reason);
      });
    }
    
    /**
     * Throws a `Cancel` if cancellation has been requested.
     */
    CancelToken.prototype.throwIfRequested = function throwIfRequested() {
      if (this.reason) {
        throw this.reason;
      }
    };
    
    /**
     * Returns an object that contains a new `CancelToken` and a function that, when called,
     * cancels the `CancelToken`.
     */
    CancelToken.source = function source() {
      var cancel;
      var token = new CancelToken(function executor(c) {
        cancel = c;
      });
      return {
        token: token,
        cancel: cancel
      };
    };
    
    module.exports = CancelToken;
    
    },{"./Cancel":26}],28:[function(require,module,exports){
    'use strict';
    
    module.exports = function isCancel(value) {
      return !!(value && value.__CANCEL__);
    };
    
    },{}],29:[function(require,module,exports){
    'use strict';
    
    var utils = require('./../utils');
    var buildURL = require('../helpers/buildURL');
    var InterceptorManager = require('./InterceptorManager');
    var dispatchRequest = require('./dispatchRequest');
    var mergeConfig = require('./mergeConfig');
    
    /**
     * Create a new instance of Axios
     *
     * @param {Object} instanceConfig The default config for the instance
     */
    function Axios(instanceConfig) {
      this.defaults = instanceConfig;
      this.interceptors = {
        request: new InterceptorManager(),
        response: new InterceptorManager()
      };
    }
    
    /**
     * Dispatch a request
     *
     * @param {Object} config The config specific for this request (merged with this.defaults)
     */
    Axios.prototype.request = function request(config) {
      /*eslint no-param-reassign:0*/
      // Allow for axios('example/url'[, config]) a la fetch API
      if (typeof config === 'string') {
        config = arguments[1] || {};
        config.url = arguments[0];
      } else {
        config = config || {};
      }
    
      config = mergeConfig(this.defaults, config);
    
      // Set config.method
      if (config.method) {
        config.method = config.method.toLowerCase();
      } else if (this.defaults.method) {
        config.method = this.defaults.method.toLowerCase();
      } else {
        config.method = 'get';
      }
    
      // Hook up interceptors middleware
      var chain = [dispatchRequest, undefined];
      var promise = Promise.resolve(config);
    
      this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
        chain.unshift(interceptor.fulfilled, interceptor.rejected);
      });
    
      this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
        chain.push(interceptor.fulfilled, interceptor.rejected);
      });
    
      while (chain.length) {
        promise = promise.then(chain.shift(), chain.shift());
      }
    
      return promise;
    };
    
    Axios.prototype.getUri = function getUri(config) {
      config = mergeConfig(this.defaults, config);
      return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
    };
    
    // Provide aliases for supported request methods
    utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
      /*eslint func-names:0*/
      Axios.prototype[method] = function(url, config) {
        return this.request(mergeConfig(config || {}, {
          method: method,
          url: url,
          data: (config || {}).data
        }));
      };
    });
    
    utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
      /*eslint func-names:0*/
      Axios.prototype[method] = function(url, data, config) {
        return this.request(mergeConfig(config || {}, {
          method: method,
          url: url,
          data: data
        }));
      };
    });
    
    module.exports = Axios;
    
    },{"../helpers/buildURL":40,"./../utils":49,"./InterceptorManager":30,"./dispatchRequest":33,"./mergeConfig":35}],30:[function(require,module,exports){
    'use strict';
    
    var utils = require('./../utils');
    
    function InterceptorManager() {
      this.handlers = [];
    }
    
    /**
     * Add a new interceptor to the stack
     *
     * @param {Function} fulfilled The function to handle `then` for a `Promise`
     * @param {Function} rejected The function to handle `reject` for a `Promise`
     *
     * @return {Number} An ID used to remove interceptor later
     */
    InterceptorManager.prototype.use = function use(fulfilled, rejected) {
      this.handlers.push({
        fulfilled: fulfilled,
        rejected: rejected
      });
      return this.handlers.length - 1;
    };
    
    /**
     * Remove an interceptor from the stack
     *
     * @param {Number} id The ID that was returned by `use`
     */
    InterceptorManager.prototype.eject = function eject(id) {
      if (this.handlers[id]) {
        this.handlers[id] = null;
      }
    };
    
    /**
     * Iterate over all the registered interceptors
     *
     * This method is particularly useful for skipping over any
     * interceptors that may have become `null` calling `eject`.
     *
     * @param {Function} fn The function to call for each interceptor
     */
    InterceptorManager.prototype.forEach = function forEach(fn) {
      utils.forEach(this.handlers, function forEachHandler(h) {
        if (h !== null) {
          fn(h);
        }
      });
    };
    
    module.exports = InterceptorManager;
    
    },{"./../utils":49}],31:[function(require,module,exports){
    'use strict';
    
    var isAbsoluteURL = require('../helpers/isAbsoluteURL');
    var combineURLs = require('../helpers/combineURLs');
    
    /**
     * Creates a new URL by combining the baseURL with the requestedURL,
     * only when the requestedURL is not already an absolute URL.
     * If the requestURL is absolute, this function returns the requestedURL untouched.
     *
     * @param {string} baseURL The base URL
     * @param {string} requestedURL Absolute or relative URL to combine
     * @returns {string} The combined full path
     */
    module.exports = function buildFullPath(baseURL, requestedURL) {
      if (baseURL && !isAbsoluteURL(requestedURL)) {
        return combineURLs(baseURL, requestedURL);
      }
      return requestedURL;
    };
    
    },{"../helpers/combineURLs":41,"../helpers/isAbsoluteURL":43}],32:[function(require,module,exports){
    'use strict';
    
    var enhanceError = require('./enhanceError');
    
    /**
     * Create an Error with the specified message, config, error code, request and response.
     *
     * @param {string} message The error message.
     * @param {Object} config The config.
     * @param {string} [code] The error code (for example, 'ECONNABORTED').
     * @param {Object} [request] The request.
     * @param {Object} [response] The response.
     * @returns {Error} The created error.
     */
    module.exports = function createError(message, config, code, request, response) {
      var error = new Error(message);
      return enhanceError(error, config, code, request, response);
    };
    
    },{"./enhanceError":34}],33:[function(require,module,exports){
    'use strict';
    
    var utils = require('./../utils');
    var transformData = require('./transformData');
    var isCancel = require('../cancel/isCancel');
    var defaults = require('../defaults');
    
    /**
     * Throws a `Cancel` if cancellation has been requested.
     */
    function throwIfCancellationRequested(config) {
      if (config.cancelToken) {
        config.cancelToken.throwIfRequested();
      }
    }
    
    /**
     * Dispatch a request to the server using the configured adapter.
     *
     * @param {object} config The config that is to be used for the request
     * @returns {Promise} The Promise to be fulfilled
     */
    module.exports = function dispatchRequest(config) {
      throwIfCancellationRequested(config);
    
      // Ensure headers exist
      config.headers = config.headers || {};
    
      // Transform request data
      config.data = transformData(
        config.data,
        config.headers,
        config.transformRequest
      );
    
      // Flatten headers
      config.headers = utils.merge(
        config.headers.common || {},
        config.headers[config.method] || {},
        config.headers
      );
    
      utils.forEach(
        ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
        function cleanHeaderConfig(method) {
          delete config.headers[method];
        }
      );
    
      var adapter = config.adapter || defaults.adapter;
    
      return adapter(config).then(function onAdapterResolution(response) {
        throwIfCancellationRequested(config);
    
        // Transform response data
        response.data = transformData(
          response.data,
          response.headers,
          config.transformResponse
        );
    
        return response;
      }, function onAdapterRejection(reason) {
        if (!isCancel(reason)) {
          throwIfCancellationRequested(config);
    
          // Transform response data
          if (reason && reason.response) {
            reason.response.data = transformData(
              reason.response.data,
              reason.response.headers,
              config.transformResponse
            );
          }
        }
    
        return Promise.reject(reason);
      });
    };
    
    },{"../cancel/isCancel":28,"../defaults":38,"./../utils":49,"./transformData":37}],34:[function(require,module,exports){
    'use strict';
    
    /**
     * Update an Error with the specified config, error code, and response.
     *
     * @param {Error} error The error to update.
     * @param {Object} config The config.
     * @param {string} [code] The error code (for example, 'ECONNABORTED').
     * @param {Object} [request] The request.
     * @param {Object} [response] The response.
     * @returns {Error} The error.
     */
    module.exports = function enhanceError(error, config, code, request, response) {
      error.config = config;
      if (code) {
        error.code = code;
      }
    
      error.request = request;
      error.response = response;
      error.isAxiosError = true;
    
      error.toJSON = function toJSON() {
        return {
          // Standard
          message: this.message,
          name: this.name,
          // Microsoft
          description: this.description,
          number: this.number,
          // Mozilla
          fileName: this.fileName,
          lineNumber: this.lineNumber,
          columnNumber: this.columnNumber,
          stack: this.stack,
          // Axios
          config: this.config,
          code: this.code
        };
      };
      return error;
    };
    
    },{}],35:[function(require,module,exports){
    'use strict';
    
    var utils = require('../utils');
    
    /**
     * Config-specific merge-function which creates a new config-object
     * by merging two configuration objects together.
     *
     * @param {Object} config1
     * @param {Object} config2
     * @returns {Object} New object resulting from merging config2 to config1
     */
    module.exports = function mergeConfig(config1, config2) {
      // eslint-disable-next-line no-param-reassign
      config2 = config2 || {};
      var config = {};
    
      var valueFromConfig2Keys = ['url', 'method', 'data'];
      var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params'];
      var defaultToConfig2Keys = [
        'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
        'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
        'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress',
        'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent',
        'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'
      ];
      var directMergeKeys = ['validateStatus'];
    
      function getMergedValue(target, source) {
        if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
          return utils.merge(target, source);
        } else if (utils.isPlainObject(source)) {
          return utils.merge({}, source);
        } else if (utils.isArray(source)) {
          return source.slice();
        }
        return source;
      }
    
      function mergeDeepProperties(prop) {
        if (!utils.isUndefined(config2[prop])) {
          config[prop] = getMergedValue(config1[prop], config2[prop]);
        } else if (!utils.isUndefined(config1[prop])) {
          config[prop] = getMergedValue(undefined, config1[prop]);
        }
      }
    
      utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
        if (!utils.isUndefined(config2[prop])) {
          config[prop] = getMergedValue(undefined, config2[prop]);
        }
      });
    
      utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);
    
      utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
        if (!utils.isUndefined(config2[prop])) {
          config[prop] = getMergedValue(undefined, config2[prop]);
        } else if (!utils.isUndefined(config1[prop])) {
          config[prop] = getMergedValue(undefined, config1[prop]);
        }
      });
    
      utils.forEach(directMergeKeys, function merge(prop) {
        if (prop in config2) {
          config[prop] = getMergedValue(config1[prop], config2[prop]);
        } else if (prop in config1) {
          config[prop] = getMergedValue(undefined, config1[prop]);
        }
      });
    
      var axiosKeys = valueFromConfig2Keys
        .concat(mergeDeepPropertiesKeys)
        .concat(defaultToConfig2Keys)
        .concat(directMergeKeys);
    
      var otherKeys = Object
        .keys(config1)
        .concat(Object.keys(config2))
        .filter(function filterAxiosKeys(key) {
          return axiosKeys.indexOf(key) === -1;
        });
    
      utils.forEach(otherKeys, mergeDeepProperties);
    
      return config;
    };
    
    },{"../utils":49}],36:[function(require,module,exports){
    'use strict';
    
    var createError = require('./createError');
    
    /**
     * Resolve or reject a Promise based on response status.
     *
     * @param {Function} resolve A function that resolves the promise.
     * @param {Function} reject A function that rejects the promise.
     * @param {object} response The response.
     */
    module.exports = function settle(resolve, reject, response) {
      var validateStatus = response.config.validateStatus;
      if (!response.status || !validateStatus || validateStatus(response.status)) {
        resolve(response);
      } else {
        reject(createError(
          'Request failed with status code ' + response.status,
          response.config,
          null,
          response.request,
          response
        ));
      }
    };
    
    },{"./createError":32}],37:[function(require,module,exports){
    'use strict';
    
    var utils = require('./../utils');
    
    /**
     * Transform the data for a request or a response
     *
     * @param {Object|String} data The data to be transformed
     * @param {Array} headers The headers for the request or response
     * @param {Array|Function} fns A single function or Array of functions
     * @returns {*} The resulting transformed data
     */
    module.exports = function transformData(data, headers, fns) {
      /*eslint no-param-reassign:0*/
      utils.forEach(fns, function transform(fn) {
        data = fn(data, headers);
      });
    
      return data;
    };
    
    },{"./../utils":49}],38:[function(require,module,exports){
    (function (process){(function (){
    'use strict';
    
    var utils = require('./utils');
    var normalizeHeaderName = require('./helpers/normalizeHeaderName');
    
    var DEFAULT_CONTENT_TYPE = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    
    function setContentTypeIfUnset(headers, value) {
      if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
        headers['Content-Type'] = value;
      }
    }
    
    function getDefaultAdapter() {
      var adapter;
      if (typeof XMLHttpRequest !== 'undefined') {
        // For browsers use XHR adapter
        adapter = require('./adapters/xhr');
      } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
        // For node use HTTP adapter
        adapter = require('./adapters/http');
      }
      return adapter;
    }
    
    var defaults = {
      adapter: getDefaultAdapter(),
    
      transformRequest: [function transformRequest(data, headers) {
        normalizeHeaderName(headers, 'Accept');
        normalizeHeaderName(headers, 'Content-Type');
        if (utils.isFormData(data) ||
          utils.isArrayBuffer(data) ||
          utils.isBuffer(data) ||
          utils.isStream(data) ||
          utils.isFile(data) ||
          utils.isBlob(data)
        ) {
          return data;
        }
        if (utils.isArrayBufferView(data)) {
          return data.buffer;
        }
        if (utils.isURLSearchParams(data)) {
          setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
          return data.toString();
        }
        if (utils.isObject(data)) {
          setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
          return JSON.stringify(data);
        }
        return data;
      }],
    
      transformResponse: [function transformResponse(data) {
        /*eslint no-param-reassign:0*/
        if (typeof data === 'string') {
          try {
            data = JSON.parse(data);
          } catch (e) { /* Ignore */ }
        }
        return data;
      }],
    
      /**
       * A timeout in milliseconds to abort a request. If set to 0 (default) a
       * timeout is not created.
       */
      timeout: 0,
    
      xsrfCookieName: 'XSRF-TOKEN',
      xsrfHeaderName: 'X-XSRF-TOKEN',
    
      maxContentLength: -1,
      maxBodyLength: -1,
    
      validateStatus: function validateStatus(status) {
        return status >= 200 && status < 300;
      }
    };
    
    defaults.headers = {
      common: {
        'Accept': 'application/json, text/plain, */*'
      }
    };
    
    utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
      defaults.headers[method] = {};
    });
    
    utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
      defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
    });
    
    module.exports = defaults;
    
    }).call(this)}).call(this,require('_process'))
    },{"./adapters/http":24,"./adapters/xhr":24,"./helpers/normalizeHeaderName":46,"./utils":49,"_process":82}],39:[function(require,module,exports){
    'use strict';
    
    module.exports = function bind(fn, thisArg) {
      return function wrap() {
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i];
        }
        return fn.apply(thisArg, args);
      };
    };
    
    },{}],40:[function(require,module,exports){
    'use strict';
    
    var utils = require('./../utils');
    
    function encode(val) {
      return encodeURIComponent(val).
        replace(/%3A/gi, ':').
        replace(/%24/g, '$').
        replace(/%2C/gi, ',').
        replace(/%20/g, '+').
        replace(/%5B/gi, '[').
        replace(/%5D/gi, ']');
    }
    
    /**
     * Build a URL by appending params to the end
     *
     * @param {string} url The base of the url (e.g., http://www.google.com)
     * @param {object} [params] The params to be appended
     * @returns {string} The formatted url
     */
    module.exports = function buildURL(url, params, paramsSerializer) {
      /*eslint no-param-reassign:0*/
      if (!params) {
        return url;
      }
    
      var serializedParams;
      if (paramsSerializer) {
        serializedParams = paramsSerializer(params);
      } else if (utils.isURLSearchParams(params)) {
        serializedParams = params.toString();
      } else {
        var parts = [];
    
        utils.forEach(params, function serialize(val, key) {
          if (val === null || typeof val === 'undefined') {
            return;
          }
    
          if (utils.isArray(val)) {
            key = key + '[]';
          } else {
            val = [val];
          }
    
          utils.forEach(val, function parseValue(v) {
            if (utils.isDate(v)) {
              v = v.toISOString();
            } else if (utils.isObject(v)) {
              v = JSON.stringify(v);
            }
            parts.push(encode(key) + '=' + encode(v));
          });
        });
    
        serializedParams = parts.join('&');
      }
    
      if (serializedParams) {
        var hashmarkIndex = url.indexOf('#');
        if (hashmarkIndex !== -1) {
          url = url.slice(0, hashmarkIndex);
        }
    
        url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
      }
    
      return url;
    };
    
    },{"./../utils":49}],41:[function(require,module,exports){
    'use strict';
    
    /**
     * Creates a new URL by combining the specified URLs
     *
     * @param {string} baseURL The base URL
     * @param {string} relativeURL The relative URL
     * @returns {string} The combined URL
     */
    module.exports = function combineURLs(baseURL, relativeURL) {
      return relativeURL
        ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
        : baseURL;
    };
    
    },{}],42:[function(require,module,exports){
    'use strict';
    
    var utils = require('./../utils');
    
    module.exports = (
      utils.isStandardBrowserEnv() ?
    
      // Standard browser envs support document.cookie
        (function standardBrowserEnv() {
          return {
            write: function write(name, value, expires, path, domain, secure) {
              var cookie = [];
              cookie.push(name + '=' + encodeURIComponent(value));
    
              if (utils.isNumber(expires)) {
                cookie.push('expires=' + new Date(expires).toGMTString());
              }
    
              if (utils.isString(path)) {
                cookie.push('path=' + path);
              }
    
              if (utils.isString(domain)) {
                cookie.push('domain=' + domain);
              }
    
              if (secure === true) {
                cookie.push('secure');
              }
    
              document.cookie = cookie.join('; ');
            },
    
            read: function read(name) {
              var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
              return (match ? decodeURIComponent(match[3]) : null);
            },
    
            remove: function remove(name) {
              this.write(name, '', Date.now() - 86400000);
            }
          };
        })() :
    
      // Non standard browser env (web workers, react-native) lack needed support.
        (function nonStandardBrowserEnv() {
          return {
            write: function write() {},
            read: function read() { return null; },
            remove: function remove() {}
          };
        })()
    );
    
    },{"./../utils":49}],43:[function(require,module,exports){
    'use strict';
    
    /**
     * Determines whether the specified URL is absolute
     *
     * @param {string} url The URL to test
     * @returns {boolean} True if the specified URL is absolute, otherwise false
     */
    module.exports = function isAbsoluteURL(url) {
      // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
      // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
      // by any combination of letters, digits, plus, period, or hyphen.
      return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
    };
    
    },{}],44:[function(require,module,exports){
    'use strict';
    
    /**
     * Determines whether the payload is an error thrown by Axios
     *
     * @param {*} payload The value to test
     * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
     */
    module.exports = function isAxiosError(payload) {
      return (typeof payload === 'object') && (payload.isAxiosError === true);
    };
    
    },{}],45:[function(require,module,exports){
    'use strict';
    
    var utils = require('./../utils');
    
    module.exports = (
      utils.isStandardBrowserEnv() ?
    
      // Standard browser envs have full support of the APIs needed to test
      // whether the request URL is of the same origin as current location.
        (function standardBrowserEnv() {
          var msie = /(msie|trident)/i.test(navigator.userAgent);
          var urlParsingNode = document.createElement('a');
          var originURL;
    
          /**
        * Parse a URL to discover it's components
        *
        * @param {String} url The URL to be parsed
        * @returns {Object}
        */
          function resolveURL(url) {
            var href = url;
    
            if (msie) {
            // IE needs attribute set twice to normalize properties
              urlParsingNode.setAttribute('href', href);
              href = urlParsingNode.href;
            }
    
            urlParsingNode.setAttribute('href', href);
    
            // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
            return {
              href: urlParsingNode.href,
              protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
              host: urlParsingNode.host,
              search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
              hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
              hostname: urlParsingNode.hostname,
              port: urlParsingNode.port,
              pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                urlParsingNode.pathname :
                '/' + urlParsingNode.pathname
            };
          }
    
          originURL = resolveURL(window.location.href);
    
          /**
        * Determine if a URL shares the same origin as the current location
        *
        * @param {String} requestURL The URL to test
        * @returns {boolean} True if URL shares the same origin, otherwise false
        */
          return function isURLSameOrigin(requestURL) {
            var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
            return (parsed.protocol === originURL.protocol &&
                parsed.host === originURL.host);
          };
        })() :
    
      // Non standard browser envs (web workers, react-native) lack needed support.
        (function nonStandardBrowserEnv() {
          return function isURLSameOrigin() {
            return true;
          };
        })()
    );
    
    },{"./../utils":49}],46:[function(require,module,exports){
    'use strict';
    
    var utils = require('../utils');
    
    module.exports = function normalizeHeaderName(headers, normalizedName) {
      utils.forEach(headers, function processHeader(value, name) {
        if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
          headers[normalizedName] = value;
          delete headers[name];
        }
      });
    };
    
    },{"../utils":49}],47:[function(require,module,exports){
    'use strict';
    
    var utils = require('./../utils');
    
    // Headers whose duplicates are ignored by node
    // c.f. https://nodejs.org/api/http.html#http_message_headers
    var ignoreDuplicateOf = [
      'age', 'authorization', 'content-length', 'content-type', 'etag',
      'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
      'last-modified', 'location', 'max-forwards', 'proxy-authorization',
      'referer', 'retry-after', 'user-agent'
    ];
    
    /**
     * Parse headers into an object
     *
     * ```
     * Date: Wed, 27 Aug 2014 08:58:49 GMT
     * Content-Type: application/json
     * Connection: keep-alive
     * Transfer-Encoding: chunked
     * ```
     *
     * @param {String} headers Headers needing to be parsed
     * @returns {Object} Headers parsed into an object
     */
    module.exports = function parseHeaders(headers) {
      var parsed = {};
      var key;
      var val;
      var i;
    
      if (!headers) { return parsed; }
    
      utils.forEach(headers.split('\n'), function parser(line) {
        i = line.indexOf(':');
        key = utils.trim(line.substr(0, i)).toLowerCase();
        val = utils.trim(line.substr(i + 1));
    
        if (key) {
          if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
            return;
          }
          if (key === 'set-cookie') {
            parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
          } else {
            parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
          }
        }
      });
    
      return parsed;
    };
    
    },{"./../utils":49}],48:[function(require,module,exports){
    'use strict';
    
    /**
     * Syntactic sugar for invoking a function and expanding an array for arguments.
     *
     * Common use case would be to use `Function.prototype.apply`.
     *
     *  ```js
     *  function f(x, y, z) {}
     *  var args = [1, 2, 3];
     *  f.apply(null, args);
     *  ```
     *
     * With `spread` this example can be re-written.
     *
     *  ```js
     *  spread(function(x, y, z) {})([1, 2, 3]);
     *  ```
     *
     * @param {Function} callback
     * @returns {Function}
     */
    module.exports = function spread(callback) {
      return function wrap(arr) {
        return callback.apply(null, arr);
      };
    };
    
    },{}],49:[function(require,module,exports){
    'use strict';
    
    var bind = require('./helpers/bind');
    
    /*global toString:true*/
    
    // utils is a library of generic helper functions non-specific to axios
    
    var toString = Object.prototype.toString;
    
    /**
     * Determine if a value is an Array
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is an Array, otherwise false
     */
    function isArray(val) {
      return toString.call(val) === '[object Array]';
    }
    
    /**
     * Determine if a value is undefined
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if the value is undefined, otherwise false
     */
    function isUndefined(val) {
      return typeof val === 'undefined';
    }
    
    /**
     * Determine if a value is a Buffer
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a Buffer, otherwise false
     */
    function isBuffer(val) {
      return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
        && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
    }
    
    /**
     * Determine if a value is an ArrayBuffer
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is an ArrayBuffer, otherwise false
     */
    function isArrayBuffer(val) {
      return toString.call(val) === '[object ArrayBuffer]';
    }
    
    /**
     * Determine if a value is a FormData
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is an FormData, otherwise false
     */
    function isFormData(val) {
      return (typeof FormData !== 'undefined') && (val instanceof FormData);
    }
    
    /**
     * Determine if a value is a view on an ArrayBuffer
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
     */
    function isArrayBufferView(val) {
      var result;
      if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
        result = ArrayBuffer.isView(val);
      } else {
        result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
      }
      return result;
    }
    
    /**
     * Determine if a value is a String
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a String, otherwise false
     */
    function isString(val) {
      return typeof val === 'string';
    }
    
    /**
     * Determine if a value is a Number
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a Number, otherwise false
     */
    function isNumber(val) {
      return typeof val === 'number';
    }
    
    /**
     * Determine if a value is an Object
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is an Object, otherwise false
     */
    function isObject(val) {
      return val !== null && typeof val === 'object';
    }
    
    /**
     * Determine if a value is a plain Object
     *
     * @param {Object} val The value to test
     * @return {boolean} True if value is a plain Object, otherwise false
     */
    function isPlainObject(val) {
      if (toString.call(val) !== '[object Object]') {
        return false;
      }
    
      var prototype = Object.getPrototypeOf(val);
      return prototype === null || prototype === Object.prototype;
    }
    
    /**
     * Determine if a value is a Date
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a Date, otherwise false
     */
    function isDate(val) {
      return toString.call(val) === '[object Date]';
    }
    
    /**
     * Determine if a value is a File
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a File, otherwise false
     */
    function isFile(val) {
      return toString.call(val) === '[object File]';
    }
    
    /**
     * Determine if a value is a Blob
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a Blob, otherwise false
     */
    function isBlob(val) {
      return toString.call(val) === '[object Blob]';
    }
    
    /**
     * Determine if a value is a Function
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a Function, otherwise false
     */
    function isFunction(val) {
      return toString.call(val) === '[object Function]';
    }
    
    /**
     * Determine if a value is a Stream
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a Stream, otherwise false
     */
    function isStream(val) {
      return isObject(val) && isFunction(val.pipe);
    }
    
    /**
     * Determine if a value is a URLSearchParams object
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a URLSearchParams object, otherwise false
     */
    function isURLSearchParams(val) {
      return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
    }
    
    /**
     * Trim excess whitespace off the beginning and end of a string
     *
     * @param {String} str The String to trim
     * @returns {String} The String freed of excess whitespace
     */
    function trim(str) {
      return str.replace(/^\s*/, '').replace(/\s*$/, '');
    }
    
    /**
     * Determine if we're running in a standard browser environment
     *
     * This allows axios to run in a web worker, and react-native.
     * Both environments support XMLHttpRequest, but not fully standard globals.
     *
     * web workers:
     *  typeof window -> undefined
     *  typeof document -> undefined
     *
     * react-native:
     *  navigator.product -> 'ReactNative'
     * nativescript
     *  navigator.product -> 'NativeScript' or 'NS'
     */
    function isStandardBrowserEnv() {
      if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                               navigator.product === 'NativeScript' ||
                                               navigator.product === 'NS')) {
        return false;
      }
      return (
        typeof window !== 'undefined' &&
        typeof document !== 'undefined'
      );
    }
    
    /**
     * Iterate over an Array or an Object invoking a function for each item.
     *
     * If `obj` is an Array callback will be called passing
     * the value, index, and complete array for each item.
     *
     * If 'obj' is an Object callback will be called passing
     * the value, key, and complete object for each property.
     *
     * @param {Object|Array} obj The object to iterate
     * @param {Function} fn The callback to invoke for each item
     */
    function forEach(obj, fn) {
      // Don't bother if no value provided
      if (obj === null || typeof obj === 'undefined') {
        return;
      }
    
      // Force an array if not already something iterable
      if (typeof obj !== 'object') {
        /*eslint no-param-reassign:0*/
        obj = [obj];
      }
    
      if (isArray(obj)) {
        // Iterate over array values
        for (var i = 0, l = obj.length; i < l; i++) {
          fn.call(null, obj[i], i, obj);
        }
      } else {
        // Iterate over object keys
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            fn.call(null, obj[key], key, obj);
          }
        }
      }
    }
    
    /**
     * Accepts varargs expecting each argument to be an object, then
     * immutably merges the properties of each object and returns result.
     *
     * When multiple objects contain the same key the later object in
     * the arguments list will take precedence.
     *
     * Example:
     *
     * ```js
     * var result = merge({foo: 123}, {foo: 456});
     * console.log(result.foo); // outputs 456
     * ```
     *
     * @param {Object} obj1 Object to merge
     * @returns {Object} Result of all merge properties
     */
    function merge(/* obj1, obj2, obj3, ... */) {
      var result = {};
      function assignValue(val, key) {
        if (isPlainObject(result[key]) && isPlainObject(val)) {
          result[key] = merge(result[key], val);
        } else if (isPlainObject(val)) {
          result[key] = merge({}, val);
        } else if (isArray(val)) {
          result[key] = val.slice();
        } else {
          result[key] = val;
        }
      }
    
      for (var i = 0, l = arguments.length; i < l; i++) {
        forEach(arguments[i], assignValue);
      }
      return result;
    }
    
    /**
     * Extends object a by mutably adding to it the properties of object b.
     *
     * @param {Object} a The object to be extended
     * @param {Object} b The object to copy properties from
     * @param {Object} thisArg The object to bind function to
     * @return {Object} The resulting value of object a
     */
    function extend(a, b, thisArg) {
      forEach(b, function assignValue(val, key) {
        if (thisArg && typeof val === 'function') {
          a[key] = bind(val, thisArg);
        } else {
          a[key] = val;
        }
      });
      return a;
    }
    
    /**
     * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
     *
     * @param {string} content with BOM
     * @return {string} content value without BOM
     */
    function stripBOM(content) {
      if (content.charCodeAt(0) === 0xFEFF) {
        content = content.slice(1);
      }
      return content;
    }
    
    module.exports = {
      isArray: isArray,
      isArrayBuffer: isArrayBuffer,
      isBuffer: isBuffer,
      isFormData: isFormData,
      isArrayBufferView: isArrayBufferView,
      isString: isString,
      isNumber: isNumber,
      isObject: isObject,
      isPlainObject: isPlainObject,
      isUndefined: isUndefined,
      isDate: isDate,
      isFile: isFile,
      isBlob: isBlob,
      isFunction: isFunction,
      isStream: isStream,
      isURLSearchParams: isURLSearchParams,
      isStandardBrowserEnv: isStandardBrowserEnv,
      forEach: forEach,
      merge: merge,
      extend: extend,
      trim: trim,
      stripBOM: stripBOM
    };
    
    },{"./helpers/bind":39}],50:[function(require,module,exports){
    // Top level file is just a mixin of submodules & constants
    'use strict';
    
    const { Deflate, deflate, deflateRaw, gzip } = require('./lib/deflate');
    
    const { Inflate, inflate, inflateRaw, ungzip } = require('./lib/inflate');
    
    const constants = require('./lib/zlib/constants');
    
    module.exports.Deflate = Deflate;
    module.exports.deflate = deflate;
    module.exports.deflateRaw = deflateRaw;
    module.exports.gzip = gzip;
    module.exports.Inflate = Inflate;
    module.exports.inflate = inflate;
    module.exports.inflateRaw = inflateRaw;
    module.exports.ungzip = ungzip;
    module.exports.constants = constants;
    
    },{"./lib/deflate":51,"./lib/inflate":52,"./lib/zlib/constants":56}],51:[function(require,module,exports){
    'use strict';
    
    
    const zlib_deflate = require('./zlib/deflate');
    const utils        = require('./utils/common');
    const strings      = require('./utils/strings');
    const msg          = require('./zlib/messages');
    const ZStream      = require('./zlib/zstream');
    
    const toString = Object.prototype.toString;
    
    /* Public constants ==========================================================*/
    /* ===========================================================================*/
    
    const {
      Z_NO_FLUSH, Z_SYNC_FLUSH, Z_FULL_FLUSH, Z_FINISH,
      Z_OK, Z_STREAM_END,
      Z_DEFAULT_COMPRESSION,
      Z_DEFAULT_STRATEGY,
      Z_DEFLATED
    } = require('./zlib/constants');
    
    /* ===========================================================================*/
    
    
    /**
     * class Deflate
     *
     * Generic JS-style wrapper for zlib calls. If you don't need
     * streaming behaviour - use more simple functions: [[deflate]],
     * [[deflateRaw]] and [[gzip]].
     **/
    
    /* internal
     * Deflate.chunks -> Array
     *
     * Chunks of output data, if [[Deflate#onData]] not overridden.
     **/
    
    /**
     * Deflate.result -> Uint8Array
     *
     * Compressed result, generated by default [[Deflate#onData]]
     * and [[Deflate#onEnd]] handlers. Filled after you push last chunk
     * (call [[Deflate#push]] with `Z_FINISH` / `true` param).
     **/
    
    /**
     * Deflate.err -> Number
     *
     * Error code after deflate finished. 0 (Z_OK) on success.
     * You will not need it in real life, because deflate errors
     * are possible only on wrong options or bad `onData` / `onEnd`
     * custom handlers.
     **/
    
    /**
     * Deflate.msg -> String
     *
     * Error message, if [[Deflate.err]] != 0
     **/
    
    
    /**
     * new Deflate(options)
     * - options (Object): zlib deflate options.
     *
     * Creates new deflator instance with specified params. Throws exception
     * on bad params. Supported options:
     *
     * - `level`
     * - `windowBits`
     * - `memLevel`
     * - `strategy`
     * - `dictionary`
     *
     * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
     * for more information on these.
     *
     * Additional options, for internal needs:
     *
     * - `chunkSize` - size of generated data chunks (16K by default)
     * - `raw` (Boolean) - do raw deflate
     * - `gzip` (Boolean) - create gzip wrapper
     * - `header` (Object) - custom header for gzip
     *   - `text` (Boolean) - true if compressed data believed to be text
     *   - `time` (Number) - modification time, unix timestamp
     *   - `os` (Number) - operation system code
     *   - `extra` (Array) - array of bytes with extra data (max 65536)
     *   - `name` (String) - file name (binary string)
     *   - `comment` (String) - comment (binary string)
     *   - `hcrc` (Boolean) - true if header crc should be added
     *
     * ##### Example:
     *
     * ```javascript
     * const pako = require('pako')
     *   , chunk1 = new Uint8Array([1,2,3,4,5,6,7,8,9])
     *   , chunk2 = new Uint8Array([10,11,12,13,14,15,16,17,18,19]);
     *
     * const deflate = new pako.Deflate({ level: 3});
     *
     * deflate.push(chunk1, false);
     * deflate.push(chunk2, true);  // true -> last chunk
     *
     * if (deflate.err) { throw new Error(deflate.err); }
     *
     * console.log(deflate.result);
     * ```
     **/
    function Deflate(options) {
      this.options = utils.assign({
        level: Z_DEFAULT_COMPRESSION,
        method: Z_DEFLATED,
        chunkSize: 16384,
        windowBits: 15,
        memLevel: 8,
        strategy: Z_DEFAULT_STRATEGY
      }, options || {});
    
      let opt = this.options;
    
      if (opt.raw && (opt.windowBits > 0)) {
        opt.windowBits = -opt.windowBits;
      }
    
      else if (opt.gzip && (opt.windowBits > 0) && (opt.windowBits < 16)) {
        opt.windowBits += 16;
      }
    
      this.err    = 0;      // error code, if happens (0 = Z_OK)
      this.msg    = '';     // error message
      this.ended  = false;  // used to avoid multiple onEnd() calls
      this.chunks = [];     // chunks of compressed data
    
      this.strm = new ZStream();
      this.strm.avail_out = 0;
    
      let status = zlib_deflate.deflateInit2(
        this.strm,
        opt.level,
        opt.method,
        opt.windowBits,
        opt.memLevel,
        opt.strategy
      );
    
      if (status !== Z_OK) {
        throw new Error(msg[status]);
      }
    
      if (opt.header) {
        zlib_deflate.deflateSetHeader(this.strm, opt.header);
      }
    
      if (opt.dictionary) {
        let dict;
        // Convert data if needed
        if (typeof opt.dictionary === 'string') {
          // If we need to compress text, change encoding to utf8.
          dict = strings.string2buf(opt.dictionary);
        } else if (toString.call(opt.dictionary) === '[object ArrayBuffer]') {
          dict = new Uint8Array(opt.dictionary);
        } else {
          dict = opt.dictionary;
        }
    
        status = zlib_deflate.deflateSetDictionary(this.strm, dict);
    
        if (status !== Z_OK) {
          throw new Error(msg[status]);
        }
    
        this._dict_set = true;
      }
    }
    
    /**
     * Deflate#push(data[, flush_mode]) -> Boolean
     * - data (Uint8Array|ArrayBuffer|String): input data. Strings will be
     *   converted to utf8 byte sequence.
     * - flush_mode (Number|Boolean): 0..6 for corresponding Z_NO_FLUSH..Z_TREE modes.
     *   See constants. Skipped or `false` means Z_NO_FLUSH, `true` means Z_FINISH.
     *
     * Sends input data to deflate pipe, generating [[Deflate#onData]] calls with
     * new compressed chunks. Returns `true` on success. The last data block must
     * have `flush_mode` Z_FINISH (or `true`). That will flush internal pending
     * buffers and call [[Deflate#onEnd]].
     *
     * On fail call [[Deflate#onEnd]] with error code and return false.
     *
     * ##### Example
     *
     * ```javascript
     * push(chunk, false); // push one of data chunks
     * ...
     * push(chunk, true);  // push last chunk
     * ```
     **/
    Deflate.prototype.push = function (data, flush_mode) {
      const strm = this.strm;
      const chunkSize = this.options.chunkSize;
      let status, _flush_mode;
    
      if (this.ended) { return false; }
    
      if (flush_mode === ~~flush_mode) _flush_mode = flush_mode;
      else _flush_mode = flush_mode === true ? Z_FINISH : Z_NO_FLUSH;
    
      // Convert data if needed
      if (typeof data === 'string') {
        // If we need to compress text, change encoding to utf8.
        strm.input = strings.string2buf(data);
      } else if (toString.call(data) === '[object ArrayBuffer]') {
        strm.input = new Uint8Array(data);
      } else {
        strm.input = data;
      }
    
      strm.next_in = 0;
      strm.avail_in = strm.input.length;
    
      for (;;) {
        if (strm.avail_out === 0) {
          strm.output = new Uint8Array(chunkSize);
          strm.next_out = 0;
          strm.avail_out = chunkSize;
        }
    
        // Make sure avail_out > 6 to avoid repeating markers
        if ((_flush_mode === Z_SYNC_FLUSH || _flush_mode === Z_FULL_FLUSH) && strm.avail_out <= 6) {
          this.onData(strm.output.subarray(0, strm.next_out));
          strm.avail_out = 0;
          continue;
        }
    
        status = zlib_deflate.deflate(strm, _flush_mode);
    
        // Ended => flush and finish
        if (status === Z_STREAM_END) {
          if (strm.next_out > 0) {
            this.onData(strm.output.subarray(0, strm.next_out));
          }
          status = zlib_deflate.deflateEnd(this.strm);
          this.onEnd(status);
          this.ended = true;
          return status === Z_OK;
        }
    
        // Flush if out buffer full
        if (strm.avail_out === 0) {
          this.onData(strm.output);
          continue;
        }
    
        // Flush if requested and has data
        if (_flush_mode > 0 && strm.next_out > 0) {
          this.onData(strm.output.subarray(0, strm.next_out));
          strm.avail_out = 0;
          continue;
        }
    
        if (strm.avail_in === 0) break;
      }
    
      return true;
    };
    
    
    /**
     * Deflate#onData(chunk) -> Void
     * - chunk (Uint8Array): output data.
     *
     * By default, stores data blocks in `chunks[]` property and glue
     * those in `onEnd`. Override this handler, if you need another behaviour.
     **/
    Deflate.prototype.onData = function (chunk) {
      this.chunks.push(chunk);
    };
    
    
    /**
     * Deflate#onEnd(status) -> Void
     * - status (Number): deflate status. 0 (Z_OK) on success,
     *   other if not.
     *
     * Called once after you tell deflate that the input stream is
     * complete (Z_FINISH). By default - join collected chunks,
     * free memory and fill `results` / `err` properties.
     **/
    Deflate.prototype.onEnd = function (status) {
      // On success - join
      if (status === Z_OK) {
        this.result = utils.flattenChunks(this.chunks);
      }
      this.chunks = [];
      this.err = status;
      this.msg = this.strm.msg;
    };
    
    
    /**
     * deflate(data[, options]) -> Uint8Array
     * - data (Uint8Array|String): input data to compress.
     * - options (Object): zlib deflate options.
     *
     * Compress `data` with deflate algorithm and `options`.
     *
     * Supported options are:
     *
     * - level
     * - windowBits
     * - memLevel
     * - strategy
     * - dictionary
     *
     * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
     * for more information on these.
     *
     * Sugar (options):
     *
     * - `raw` (Boolean) - say that we work with raw stream, if you don't wish to specify
     *   negative windowBits implicitly.
     *
     * ##### Example:
     *
     * ```javascript
     * const pako = require('pako')
     * const data = new Uint8Array([1,2,3,4,5,6,7,8,9]);
     *
     * console.log(pako.deflate(data));
     * ```
     **/
    function deflate(input, options) {
      const deflator = new Deflate(options);
    
      deflator.push(input, true);
    
      // That will never happens, if you don't cheat with options :)
      if (deflator.err) { throw deflator.msg || msg[deflator.err]; }
    
      return deflator.result;
    }
    
    
    /**
     * deflateRaw(data[, options]) -> Uint8Array
     * - data (Uint8Array|String): input data to compress.
     * - options (Object): zlib deflate options.
     *
     * The same as [[deflate]], but creates raw data, without wrapper
     * (header and adler32 crc).
     **/
    function deflateRaw(input, options) {
      options = options || {};
      options.raw = true;
      return deflate(input, options);
    }
    
    
    /**
     * gzip(data[, options]) -> Uint8Array
     * - data (Uint8Array|String): input data to compress.
     * - options (Object): zlib deflate options.
     *
     * The same as [[deflate]], but create gzip wrapper instead of
     * deflate one.
     **/
    function gzip(input, options) {
      options = options || {};
      options.gzip = true;
      return deflate(input, options);
    }
    
    
    module.exports.Deflate = Deflate;
    module.exports.deflate = deflate;
    module.exports.deflateRaw = deflateRaw;
    module.exports.gzip = gzip;
    module.exports.constants = require('./zlib/constants');
    
    },{"./utils/common":53,"./utils/strings":54,"./zlib/constants":56,"./zlib/deflate":58,"./zlib/messages":63,"./zlib/zstream":65}],52:[function(require,module,exports){
    'use strict';
    
    
    const zlib_inflate = require('./zlib/inflate');
    const utils        = require('./utils/common');
    const strings      = require('./utils/strings');
    const msg          = require('./zlib/messages');
    const ZStream      = require('./zlib/zstream');
    const GZheader     = require('./zlib/gzheader');
    
    const toString = Object.prototype.toString;
    
    /* Public constants ==========================================================*/
    /* ===========================================================================*/
    
    const {
      Z_NO_FLUSH, Z_FINISH,
      Z_OK, Z_STREAM_END, Z_NEED_DICT, Z_STREAM_ERROR, Z_DATA_ERROR, Z_MEM_ERROR
    } = require('./zlib/constants');
    
    /* ===========================================================================*/
    
    
    /**
     * class Inflate
     *
     * Generic JS-style wrapper for zlib calls. If you don't need
     * streaming behaviour - use more simple functions: [[inflate]]
     * and [[inflateRaw]].
     **/
    
    /* internal
     * inflate.chunks -> Array
     *
     * Chunks of output data, if [[Inflate#onData]] not overridden.
     **/
    
    /**
     * Inflate.result -> Uint8Array|String
     *
     * Uncompressed result, generated by default [[Inflate#onData]]
     * and [[Inflate#onEnd]] handlers. Filled after you push last chunk
     * (call [[Inflate#push]] with `Z_FINISH` / `true` param).
     **/
    
    /**
     * Inflate.err -> Number
     *
     * Error code after inflate finished. 0 (Z_OK) on success.
     * Should be checked if broken data possible.
     **/
    
    /**
     * Inflate.msg -> String
     *
     * Error message, if [[Inflate.err]] != 0
     **/
    
    
    /**
     * new Inflate(options)
     * - options (Object): zlib inflate options.
     *
     * Creates new inflator instance with specified params. Throws exception
     * on bad params. Supported options:
     *
     * - `windowBits`
     * - `dictionary`
     *
     * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
     * for more information on these.
     *
     * Additional options, for internal needs:
     *
     * - `chunkSize` - size of generated data chunks (16K by default)
     * - `raw` (Boolean) - do raw inflate
     * - `to` (String) - if equal to 'string', then result will be converted
     *   from utf8 to utf16 (javascript) string. When string output requested,
     *   chunk length can differ from `chunkSize`, depending on content.
     *
     * By default, when no options set, autodetect deflate/gzip data format via
     * wrapper header.
     *
     * ##### Example:
     *
     * ```javascript
     * const pako = require('pako')
     * const chunk1 = new Uint8Array([1,2,3,4,5,6,7,8,9])
     * const chunk2 = new Uint8Array([10,11,12,13,14,15,16,17,18,19]);
     *
     * const inflate = new pako.Inflate({ level: 3});
     *
     * inflate.push(chunk1, false);
     * inflate.push(chunk2, true);  // true -> last chunk
     *
     * if (inflate.err) { throw new Error(inflate.err); }
     *
     * console.log(inflate.result);
     * ```
     **/
    function Inflate(options) {
      this.options = utils.assign({
        chunkSize: 1024 * 64,
        windowBits: 15,
        to: ''
      }, options || {});
    
      const opt = this.options;
    
      // Force window size for `raw` data, if not set directly,
      // because we have no header for autodetect.
      if (opt.raw && (opt.windowBits >= 0) && (opt.windowBits < 16)) {
        opt.windowBits = -opt.windowBits;
        if (opt.windowBits === 0) { opt.windowBits = -15; }
      }
    
      // If `windowBits` not defined (and mode not raw) - set autodetect flag for gzip/deflate
      if ((opt.windowBits >= 0) && (opt.windowBits < 16) &&
          !(options && options.windowBits)) {
        opt.windowBits += 32;
      }
    
      // Gzip header has no info about windows size, we can do autodetect only
      // for deflate. So, if window size not set, force it to max when gzip possible
      if ((opt.windowBits > 15) && (opt.windowBits < 48)) {
        // bit 3 (16) -> gzipped data
        // bit 4 (32) -> autodetect gzip/deflate
        if ((opt.windowBits & 15) === 0) {
          opt.windowBits |= 15;
        }
      }
    
      this.err    = 0;      // error code, if happens (0 = Z_OK)
      this.msg    = '';     // error message
      this.ended  = false;  // used to avoid multiple onEnd() calls
      this.chunks = [];     // chunks of compressed data
    
      this.strm   = new ZStream();
      this.strm.avail_out = 0;
    
      let status  = zlib_inflate.inflateInit2(
        this.strm,
        opt.windowBits
      );
    
      if (status !== Z_OK) {
        throw new Error(msg[status]);
      }
    
      this.header = new GZheader();
    
      zlib_inflate.inflateGetHeader(this.strm, this.header);
    
      // Setup dictionary
      if (opt.dictionary) {
        // Convert data if needed
        if (typeof opt.dictionary === 'string') {
          opt.dictionary = strings.string2buf(opt.dictionary);
        } else if (toString.call(opt.dictionary) === '[object ArrayBuffer]') {
          opt.dictionary = new Uint8Array(opt.dictionary);
        }
        if (opt.raw) { //In raw mode we need to set the dictionary early
          status = zlib_inflate.inflateSetDictionary(this.strm, opt.dictionary);
          if (status !== Z_OK) {
            throw new Error(msg[status]);
          }
        }
      }
    }
    
    /**
     * Inflate#push(data[, flush_mode]) -> Boolean
     * - data (Uint8Array|ArrayBuffer): input data
     * - flush_mode (Number|Boolean): 0..6 for corresponding Z_NO_FLUSH..Z_TREE
     *   flush modes. See constants. Skipped or `false` means Z_NO_FLUSH,
     *   `true` means Z_FINISH.
     *
     * Sends input data to inflate pipe, generating [[Inflate#onData]] calls with
     * new output chunks. Returns `true` on success. If end of stream detected,
     * [[Inflate#onEnd]] will be called.
     *
     * `flush_mode` is not needed for normal operation, because end of stream
     * detected automatically. You may try to use it for advanced things, but
     * this functionality was not tested.
     *
     * On fail call [[Inflate#onEnd]] with error code and return false.
     *
     * ##### Example
     *
     * ```javascript
     * push(chunk, false); // push one of data chunks
     * ...
     * push(chunk, true);  // push last chunk
     * ```
     **/
    Inflate.prototype.push = function (data, flush_mode) {
      const strm = this.strm;
      const chunkSize = this.options.chunkSize;
      const dictionary = this.options.dictionary;
      let status, _flush_mode, last_avail_out;
    
      if (this.ended) return false;
    
      if (flush_mode === ~~flush_mode) _flush_mode = flush_mode;
      else _flush_mode = flush_mode === true ? Z_FINISH : Z_NO_FLUSH;
    
      // Convert data if needed
      if (toString.call(data) === '[object ArrayBuffer]') {
        strm.input = new Uint8Array(data);
      } else {
        strm.input = data;
      }
    
      strm.next_in = 0;
      strm.avail_in = strm.input.length;
    
      for (;;) {
        if (strm.avail_out === 0) {
          strm.output = new Uint8Array(chunkSize);
          strm.next_out = 0;
          strm.avail_out = chunkSize;
        }
    
        status = zlib_inflate.inflate(strm, _flush_mode);
    
        if (status === Z_NEED_DICT && dictionary) {
          status = zlib_inflate.inflateSetDictionary(strm, dictionary);
    
          if (status === Z_OK) {
            status = zlib_inflate.inflate(strm, _flush_mode);
          } else if (status === Z_DATA_ERROR) {
            // Replace code with more verbose
            status = Z_NEED_DICT;
          }
        }
    
        // Skip snyc markers if more data follows and not raw mode
        while (strm.avail_in > 0 &&
               status === Z_STREAM_END &&
               strm.state.wrap > 0 &&
               data[strm.next_in] !== 0)
        {
          zlib_inflate.inflateReset(strm);
          status = zlib_inflate.inflate(strm, _flush_mode);
        }
    
        switch (status) {
          case Z_STREAM_ERROR:
          case Z_DATA_ERROR:
          case Z_NEED_DICT:
          case Z_MEM_ERROR:
            this.onEnd(status);
            this.ended = true;
            return false;
        }
    
        // Remember real `avail_out` value, because we may patch out buffer content
        // to align utf8 strings boundaries.
        last_avail_out = strm.avail_out;
    
        if (strm.next_out) {
          if (strm.avail_out === 0 || status === Z_STREAM_END) {
    
            if (this.options.to === 'string') {
    
              let next_out_utf8 = strings.utf8border(strm.output, strm.next_out);
    
              let tail = strm.next_out - next_out_utf8;
              let utf8str = strings.buf2string(strm.output, next_out_utf8);
    
              // move tail & realign counters
              strm.next_out = tail;
              strm.avail_out = chunkSize - tail;
              if (tail) strm.output.set(strm.output.subarray(next_out_utf8, next_out_utf8 + tail), 0);
    
              this.onData(utf8str);
    
            } else {
              this.onData(strm.output.length === strm.next_out ? strm.output : strm.output.subarray(0, strm.next_out));
            }
          }
        }
    
        // Must repeat iteration if out buffer is full
        if (status === Z_OK && last_avail_out === 0) continue;
    
        // Finalize if end of stream reached.
        if (status === Z_STREAM_END) {
          status = zlib_inflate.inflateEnd(this.strm);
          this.onEnd(status);
          this.ended = true;
          return true;
        }
    
        if (strm.avail_in === 0) break;
      }
    
      return true;
    };
    
    
    /**
     * Inflate#onData(chunk) -> Void
     * - chunk (Uint8Array|String): output data. When string output requested,
     *   each chunk will be string.
     *
     * By default, stores data blocks in `chunks[]` property and glue
     * those in `onEnd`. Override this handler, if you need another behaviour.
     **/
    Inflate.prototype.onData = function (chunk) {
      this.chunks.push(chunk);
    };
    
    
    /**
     * Inflate#onEnd(status) -> Void
     * - status (Number): inflate status. 0 (Z_OK) on success,
     *   other if not.
     *
     * Called either after you tell inflate that the input stream is
     * complete (Z_FINISH). By default - join collected chunks,
     * free memory and fill `results` / `err` properties.
     **/
    Inflate.prototype.onEnd = function (status) {
      // On success - join
      if (status === Z_OK) {
        if (this.options.to === 'string') {
          this.result = this.chunks.join('');
        } else {
          this.result = utils.flattenChunks(this.chunks);
        }
      }
      this.chunks = [];
      this.err = status;
      this.msg = this.strm.msg;
    };
    
    
    /**
     * inflate(data[, options]) -> Uint8Array|String
     * - data (Uint8Array): input data to decompress.
     * - options (Object): zlib inflate options.
     *
     * Decompress `data` with inflate/ungzip and `options`. Autodetect
     * format via wrapper header by default. That's why we don't provide
     * separate `ungzip` method.
     *
     * Supported options are:
     *
     * - windowBits
     *
     * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
     * for more information.
     *
     * Sugar (options):
     *
     * - `raw` (Boolean) - say that we work with raw stream, if you don't wish to specify
     *   negative windowBits implicitly.
     * - `to` (String) - if equal to 'string', then result will be converted
     *   from utf8 to utf16 (javascript) string. When string output requested,
     *   chunk length can differ from `chunkSize`, depending on content.
     *
     *
     * ##### Example:
     *
     * ```javascript
     * const pako = require('pako');
     * const input = pako.deflate(new Uint8Array([1,2,3,4,5,6,7,8,9]));
     * let output;
     *
     * try {
     *   output = pako.inflate(input);
     * } catch (err) {
     *   console.log(err);
     * }
     * ```
     **/
    function inflate(input, options) {
      const inflator = new Inflate(options);
    
      inflator.push(input);
    
      // That will never happens, if you don't cheat with options :)
      if (inflator.err) throw inflator.msg || msg[inflator.err];
    
      return inflator.result;
    }
    
    
    /**
     * inflateRaw(data[, options]) -> Uint8Array|String
     * - data (Uint8Array): input data to decompress.
     * - options (Object): zlib inflate options.
     *
     * The same as [[inflate]], but creates raw data, without wrapper
     * (header and adler32 crc).
     **/
    function inflateRaw(input, options) {
      options = options || {};
      options.raw = true;
      return inflate(input, options);
    }
    
    
    /**
     * ungzip(data[, options]) -> Uint8Array|String
     * - data (Uint8Array): input data to decompress.
     * - options (Object): zlib inflate options.
     *
     * Just shortcut to [[inflate]], because it autodetects format
     * by header.content. Done for convenience.
     **/
    
    
    module.exports.Inflate = Inflate;
    module.exports.inflate = inflate;
    module.exports.inflateRaw = inflateRaw;
    module.exports.ungzip = inflate;
    module.exports.constants = require('./zlib/constants');
    
    },{"./utils/common":53,"./utils/strings":54,"./zlib/constants":56,"./zlib/gzheader":59,"./zlib/inflate":61,"./zlib/messages":63,"./zlib/zstream":65}],53:[function(require,module,exports){
    'use strict';
    
    
    const _has = (obj, key) => {
      return Object.prototype.hasOwnProperty.call(obj, key);
    };
    
    module.exports.assign = function (obj /*from1, from2, from3, ...*/) {
      const sources = Array.prototype.slice.call(arguments, 1);
      while (sources.length) {
        const source = sources.shift();
        if (!source) { continue; }
    
        if (typeof source !== 'object') {
          throw new TypeError(source + 'must be non-object');
        }
    
        for (const p in source) {
          if (_has(source, p)) {
            obj[p] = source[p];
          }
        }
      }
    
      return obj;
    };
    
    
    // Join array of chunks to single array.
    module.exports.flattenChunks = (chunks) => {
      // calculate data length
      let len = 0;
    
      for (let i = 0, l = chunks.length; i < l; i++) {
        len += chunks[i].length;
      }
    
      // join chunks
      const result = new Uint8Array(len);
    
      for (let i = 0, pos = 0, l = chunks.length; i < l; i++) {
        let chunk = chunks[i];
        result.set(chunk, pos);
        pos += chunk.length;
      }
    
      return result;
    };
    
    },{}],54:[function(require,module,exports){
    // String encode/decode helpers
    'use strict';
    
    
    // Quick check if we can use fast array to bin string conversion
    //
    // - apply(Array) can fail on Android 2.2
    // - apply(Uint8Array) can fail on iOS 5.1 Safari
    //
    let STR_APPLY_UIA_OK = true;
    
    try { String.fromCharCode.apply(null, new Uint8Array(1)); } catch (__) { STR_APPLY_UIA_OK = false; }
    
    
    // Table with utf8 lengths (calculated by first byte of sequence)
    // Note, that 5 & 6-byte values and some 4-byte values can not be represented in JS,
    // because max possible codepoint is 0x10ffff
    const _utf8len = new Uint8Array(256);
    for (let q = 0; q < 256; q++) {
      _utf8len[q] = (q >= 252 ? 6 : q >= 248 ? 5 : q >= 240 ? 4 : q >= 224 ? 3 : q >= 192 ? 2 : 1);
    }
    _utf8len[254] = _utf8len[254] = 1; // Invalid sequence start
    
    
    // convert string to array (typed, when possible)
    module.exports.string2buf = (str) => {
      if (typeof TextEncoder === 'function' && TextEncoder.prototype.encode) {
        return new TextEncoder().encode(str);
      }
    
      let buf, c, c2, m_pos, i, str_len = str.length, buf_len = 0;
    
      // count binary size
      for (m_pos = 0; m_pos < str_len; m_pos++) {
        c = str.charCodeAt(m_pos);
        if ((c & 0xfc00) === 0xd800 && (m_pos + 1 < str_len)) {
          c2 = str.charCodeAt(m_pos + 1);
          if ((c2 & 0xfc00) === 0xdc00) {
            c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
            m_pos++;
          }
        }
        buf_len += c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4;
      }
    
      // allocate buffer
      buf = new Uint8Array(buf_len);
    
      // convert
      for (i = 0, m_pos = 0; i < buf_len; m_pos++) {
        c = str.charCodeAt(m_pos);
        if ((c & 0xfc00) === 0xd800 && (m_pos + 1 < str_len)) {
          c2 = str.charCodeAt(m_pos + 1);
          if ((c2 & 0xfc00) === 0xdc00) {
            c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
            m_pos++;
          }
        }
        if (c < 0x80) {
          /* one byte */
          buf[i++] = c;
        } else if (c < 0x800) {
          /* two bytes */
          buf[i++] = 0xC0 | (c >>> 6);
          buf[i++] = 0x80 | (c & 0x3f);
        } else if (c < 0x10000) {
          /* three bytes */
          buf[i++] = 0xE0 | (c >>> 12);
          buf[i++] = 0x80 | (c >>> 6 & 0x3f);
          buf[i++] = 0x80 | (c & 0x3f);
        } else {
          /* four bytes */
          buf[i++] = 0xf0 | (c >>> 18);
          buf[i++] = 0x80 | (c >>> 12 & 0x3f);
          buf[i++] = 0x80 | (c >>> 6 & 0x3f);
          buf[i++] = 0x80 | (c & 0x3f);
        }
      }
    
      return buf;
    };
    
    // Helper
    const buf2binstring = (buf, len) => {
      // On Chrome, the arguments in a function call that are allowed is `65534`.
      // If the length of the buffer is smaller than that, we can use this optimization,
      // otherwise we will take a slower path.
      if (len < 65534) {
        if (buf.subarray && STR_APPLY_UIA_OK) {
          return String.fromCharCode.apply(null, buf.length === len ? buf : buf.subarray(0, len));
        }
      }
    
      let result = '';
      for (let i = 0; i < len; i++) {
        result += String.fromCharCode(buf[i]);
      }
      return result;
    };
    
    
    // convert array to string
    module.exports.buf2string = (buf, max) => {
      const len = max || buf.length;
    
      if (typeof TextDecoder === 'function' && TextDecoder.prototype.decode) {
        return new TextDecoder().decode(buf.subarray(0, max));
      }
    
      let i, out;
    
      // Reserve max possible length (2 words per char)
      // NB: by unknown reasons, Array is significantly faster for
      //     String.fromCharCode.apply than Uint16Array.
      const utf16buf = new Array(len * 2);
    
      for (out = 0, i = 0; i < len;) {
        let c = buf[i++];
        // quick process ascii
        if (c < 0x80) { utf16buf[out++] = c; continue; }
    
        let c_len = _utf8len[c];
        // skip 5 & 6 byte codes
        if (c_len > 4) { utf16buf[out++] = 0xfffd; i += c_len - 1; continue; }
    
        // apply mask on first byte
        c &= c_len === 2 ? 0x1f : c_len === 3 ? 0x0f : 0x07;
        // join the rest
        while (c_len > 1 && i < len) {
          c = (c << 6) | (buf[i++] & 0x3f);
          c_len--;
        }
    
        // terminated by end of string?
        if (c_len > 1) { utf16buf[out++] = 0xfffd; continue; }
    
        if (c < 0x10000) {
          utf16buf[out++] = c;
        } else {
          c -= 0x10000;
          utf16buf[out++] = 0xd800 | ((c >> 10) & 0x3ff);
          utf16buf[out++] = 0xdc00 | (c & 0x3ff);
        }
      }
    
      return buf2binstring(utf16buf, out);
    };
    
    
    // Calculate max possible position in utf8 buffer,
    // that will not break sequence. If that's not possible
    // - (very small limits) return max size as is.
    //
    // buf[] - utf8 bytes array
    // max   - length limit (mandatory);
    module.exports.utf8border = (buf, max) => {
    
      max = max || buf.length;
      if (max > buf.length) { max = buf.length; }
    
      // go back from last position, until start of sequence found
      let pos = max - 1;
      while (pos >= 0 && (buf[pos] & 0xC0) === 0x80) { pos--; }
    
      // Very small and broken sequence,
      // return max, because we should return something anyway.
      if (pos < 0) { return max; }
    
      // If we came to start of buffer - that means buffer is too small,
      // return max too.
      if (pos === 0) { return max; }
    
      return (pos + _utf8len[buf[pos]] > max) ? pos : max;
    };
    
    },{}],55:[function(require,module,exports){
    'use strict';
    
    // Note: adler32 takes 12% for level 0 and 2% for level 6.
    // It isn't worth it to make additional optimizations as in original.
    // Small size is preferable.
    
    // (C) 1995-2013 Jean-loup Gailly and Mark Adler
    // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
    //
    // This software is provided 'as-is', without any express or implied
    // warranty. In no event will the authors be held liable for any damages
    // arising from the use of this software.
    //
    // Permission is granted to anyone to use this software for any purpose,
    // including commercial applications, and to alter it and redistribute it
    // freely, subject to the following restrictions:
    //
    // 1. The origin of this software must not be misrepresented; you must not
    //   claim that you wrote the original software. If you use this software
    //   in a product, an acknowledgment in the product documentation would be
    //   appreciated but is not required.
    // 2. Altered source versions must be plainly marked as such, and must not be
    //   misrepresented as being the original software.
    // 3. This notice may not be removed or altered from any source distribution.
    
    const adler32 = (adler, buf, len, pos) => {
      let s1 = (adler & 0xffff) |0,
          s2 = ((adler >>> 16) & 0xffff) |0,
          n = 0;
    
      while (len !== 0) {
        // Set limit ~ twice less than 5552, to keep
        // s2 in 31-bits, because we force signed ints.
        // in other case %= will fail.
        n = len > 2000 ? 2000 : len;
        len -= n;
    
        do {
          s1 = (s1 + buf[pos++]) |0;
          s2 = (s2 + s1) |0;
        } while (--n);
    
        s1 %= 65521;
        s2 %= 65521;
      }
    
      return (s1 | (s2 << 16)) |0;
    };
    
    
    module.exports = adler32;
    
    },{}],56:[function(require,module,exports){
    'use strict';
    
    // (C) 1995-2013 Jean-loup Gailly and Mark Adler
    // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
    //
    // This software is provided 'as-is', without any express or implied
    // warranty. In no event will the authors be held liable for any damages
    // arising from the use of this software.
    //
    // Permission is granted to anyone to use this software for any purpose,
    // including commercial applications, and to alter it and redistribute it
    // freely, subject to the following restrictions:
    //
    // 1. The origin of this software must not be misrepresented; you must not
    //   claim that you wrote the original software. If you use this software
    //   in a product, an acknowledgment in the product documentation would be
    //   appreciated but is not required.
    // 2. Altered source versions must be plainly marked as such, and must not be
    //   misrepresented as being the original software.
    // 3. This notice may not be removed or altered from any source distribution.
    
    module.exports = {
    
      /* Allowed flush values; see deflate() and inflate() below for details */
      Z_NO_FLUSH:         0,
      Z_PARTIAL_FLUSH:    1,
      Z_SYNC_FLUSH:       2,
      Z_FULL_FLUSH:       3,
      Z_FINISH:           4,
      Z_BLOCK:            5,
      Z_TREES:            6,
    
      /* Return codes for the compression/decompression functions. Negative values
      * are errors, positive values are used for special but normal events.
      */
      Z_OK:               0,
      Z_STREAM_END:       1,
      Z_NEED_DICT:        2,
      Z_ERRNO:           -1,
      Z_STREAM_ERROR:    -2,
      Z_DATA_ERROR:      -3,
      Z_MEM_ERROR:       -4,
      Z_BUF_ERROR:       -5,
      //Z_VERSION_ERROR: -6,
    
      /* compression levels */
      Z_NO_COMPRESSION:         0,
      Z_BEST_SPEED:             1,
      Z_BEST_COMPRESSION:       9,
      Z_DEFAULT_COMPRESSION:   -1,
    
    
      Z_FILTERED:               1,
      Z_HUFFMAN_ONLY:           2,
      Z_RLE:                    3,
      Z_FIXED:                  4,
      Z_DEFAULT_STRATEGY:       0,
    
      /* Possible values of the data_type field (though see inflate()) */
      Z_BINARY:                 0,
      Z_TEXT:                   1,
      //Z_ASCII:                1, // = Z_TEXT (deprecated)
      Z_UNKNOWN:                2,
    
      /* The deflate compression method */
      Z_DEFLATED:               8
      //Z_NULL:                 null // Use -1 or null inline, depending on var type
    };
    
    },{}],57:[function(require,module,exports){
    'use strict';
    
    // Note: we can't get significant speed boost here.
    // So write code to minimize size - no pregenerated tables
    // and array tools dependencies.
    
    // (C) 1995-2013 Jean-loup Gailly and Mark Adler
    // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
    //
    // This software is provided 'as-is', without any express or implied
    // warranty. In no event will the authors be held liable for any damages
    // arising from the use of this software.
    //
    // Permission is granted to anyone to use this software for any purpose,
    // including commercial applications, and to alter it and redistribute it
    // freely, subject to the following restrictions:
    //
    // 1. The origin of this software must not be misrepresented; you must not
    //   claim that you wrote the original software. If you use this software
    //   in a product, an acknowledgment in the product documentation would be
    //   appreciated but is not required.
    // 2. Altered source versions must be plainly marked as such, and must not be
    //   misrepresented as being the original software.
    // 3. This notice may not be removed or altered from any source distribution.
    
    // Use ordinary array, since untyped makes no boost here
    const makeTable = () => {
      let c, table = [];
    
      for (var n = 0; n < 256; n++) {
        c = n;
        for (var k = 0; k < 8; k++) {
          c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
        }
        table[n] = c;
      }
    
      return table;
    };
    
    // Create table on load. Just 255 signed longs. Not a problem.
    const crcTable = new Uint32Array(makeTable());
    
    
    const crc32 = (crc, buf, len, pos) => {
      const t = crcTable;
      const end = pos + len;
    
      crc ^= -1;
    
      for (let i = pos; i < end; i++) {
        crc = (crc >>> 8) ^ t[(crc ^ buf[i]) & 0xFF];
      }
    
      return (crc ^ (-1)); // >>> 0;
    };
    
    
    module.exports = crc32;
    
    },{}],58:[function(require,module,exports){
    'use strict';
    
    // (C) 1995-2013 Jean-loup Gailly and Mark Adler
    // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
    //
    // This software is provided 'as-is', without any express or implied
    // warranty. In no event will the authors be held liable for any damages
    // arising from the use of this software.
    //
    // Permission is granted to anyone to use this software for any purpose,
    // including commercial applications, and to alter it and redistribute it
    // freely, subject to the following restrictions:
    //
    // 1. The origin of this software must not be misrepresented; you must not
    //   claim that you wrote the original software. If you use this software
    //   in a product, an acknowledgment in the product documentation would be
    //   appreciated but is not required.
    // 2. Altered source versions must be plainly marked as such, and must not be
    //   misrepresented as being the original software.
    // 3. This notice may not be removed or altered from any source distribution.
    
    const { _tr_init, _tr_stored_block, _tr_flush_block, _tr_tally, _tr_align } = require('./trees');
    const adler32 = require('./adler32');
    const crc32   = require('./crc32');
    const msg     = require('./messages');
    
    /* Public constants ==========================================================*/
    /* ===========================================================================*/
    
    const {
      Z_NO_FLUSH, Z_PARTIAL_FLUSH, Z_FULL_FLUSH, Z_FINISH, Z_BLOCK,
      Z_OK, Z_STREAM_END, Z_STREAM_ERROR, Z_DATA_ERROR, Z_BUF_ERROR,
      Z_DEFAULT_COMPRESSION,
      Z_FILTERED, Z_HUFFMAN_ONLY, Z_RLE, Z_FIXED, Z_DEFAULT_STRATEGY,
      Z_UNKNOWN,
      Z_DEFLATED
    } = require('./constants');
    
    /*============================================================================*/
    
    
    const MAX_MEM_LEVEL = 9;
    /* Maximum value for memLevel in deflateInit2 */
    const MAX_WBITS = 15;
    /* 32K LZ77 window */
    const DEF_MEM_LEVEL = 8;
    
    
    const LENGTH_CODES  = 29;
    /* number of length codes, not counting the special END_BLOCK code */
    const LITERALS      = 256;
    /* number of literal bytes 0..255 */
    const L_CODES       = LITERALS + 1 + LENGTH_CODES;
    /* number of Literal or Length codes, including the END_BLOCK code */
    const D_CODES       = 30;
    /* number of distance codes */
    const BL_CODES      = 19;
    /* number of codes used to transfer the bit lengths */
    const HEAP_SIZE     = 2 * L_CODES + 1;
    /* maximum heap size */
    const MAX_BITS  = 15;
    /* All codes must not exceed MAX_BITS bits */
    
    const MIN_MATCH = 3;
    const MAX_MATCH = 258;
    const MIN_LOOKAHEAD = (MAX_MATCH + MIN_MATCH + 1);
    
    const PRESET_DICT = 0x20;
    
    const INIT_STATE = 42;
    const EXTRA_STATE = 69;
    const NAME_STATE = 73;
    const COMMENT_STATE = 91;
    const HCRC_STATE = 103;
    const BUSY_STATE = 113;
    const FINISH_STATE = 666;
    
    const BS_NEED_MORE      = 1; /* block not completed, need more input or more output */
    const BS_BLOCK_DONE     = 2; /* block flush performed */
    const BS_FINISH_STARTED = 3; /* finish started, need only more output at next deflate */
    const BS_FINISH_DONE    = 4; /* finish done, accept no more input or output */
    
    const OS_CODE = 0x03; // Unix :) . Don't detect, use this default.
    
    const err = (strm, errorCode) => {
      strm.msg = msg[errorCode];
      return errorCode;
    };
    
    const rank = (f) => {
      return ((f) << 1) - ((f) > 4 ? 9 : 0);
    };
    
    const zero = (buf) => {
      let len = buf.length; while (--len >= 0) { buf[len] = 0; }
    };
    
    
    /* eslint-disable new-cap */
    let HASH_ZLIB = (s, prev, data) => ((prev << s.hash_shift) ^ data) & s.hash_mask;
    // This hash causes less collisions, https://github.com/nodeca/pako/issues/135
    // But breaks binary compatibility
    //let HASH_FAST = (s, prev, data) => ((prev << 8) + (prev >> 8) + (data << 4)) & s.hash_mask;
    let HASH = HASH_ZLIB;
    
    /* =========================================================================
     * Flush as much pending output as possible. All deflate() output goes
     * through this function so some applications may wish to modify it
     * to avoid allocating a large strm->output buffer and copying into it.
     * (See also read_buf()).
     */
    const flush_pending = (strm) => {
      const s = strm.state;
    
      //_tr_flush_bits(s);
      let len = s.pending;
      if (len > strm.avail_out) {
        len = strm.avail_out;
      }
      if (len === 0) { return; }
    
      strm.output.set(s.pending_buf.subarray(s.pending_out, s.pending_out + len), strm.next_out);
      strm.next_out += len;
      s.pending_out += len;
      strm.total_out += len;
      strm.avail_out -= len;
      s.pending -= len;
      if (s.pending === 0) {
        s.pending_out = 0;
      }
    };
    
    
    const flush_block_only = (s, last) => {
      _tr_flush_block(s, (s.block_start >= 0 ? s.block_start : -1), s.strstart - s.block_start, last);
      s.block_start = s.strstart;
      flush_pending(s.strm);
    };
    
    
    const put_byte = (s, b) => {
      s.pending_buf[s.pending++] = b;
    };
    
    
    /* =========================================================================
     * Put a short in the pending buffer. The 16-bit value is put in MSB order.
     * IN assertion: the stream state is correct and there is enough room in
     * pending_buf.
     */
    const putShortMSB = (s, b) => {
    
      //  put_byte(s, (Byte)(b >> 8));
    //  put_byte(s, (Byte)(b & 0xff));
      s.pending_buf[s.pending++] = (b >>> 8) & 0xff;
      s.pending_buf[s.pending++] = b & 0xff;
    };
    
    
    /* ===========================================================================
     * Read a new buffer from the current input stream, update the adler32
     * and total number of bytes read.  All deflate() input goes through
     * this function so some applications may wish to modify it to avoid
     * allocating a large strm->input buffer and copying from it.
     * (See also flush_pending()).
     */
    const read_buf = (strm, buf, start, size) => {
    
      let len = strm.avail_in;
    
      if (len > size) { len = size; }
      if (len === 0) { return 0; }
    
      strm.avail_in -= len;
    
      // zmemcpy(buf, strm->next_in, len);
      buf.set(strm.input.subarray(strm.next_in, strm.next_in + len), start);
      if (strm.state.wrap === 1) {
        strm.adler = adler32(strm.adler, buf, len, start);
      }
    
      else if (strm.state.wrap === 2) {
        strm.adler = crc32(strm.adler, buf, len, start);
      }
    
      strm.next_in += len;
      strm.total_in += len;
    
      return len;
    };
    
    
    /* ===========================================================================
     * Set match_start to the longest match starting at the given string and
     * return its length. Matches shorter or equal to prev_length are discarded,
     * in which case the result is equal to prev_length and match_start is
     * garbage.
     * IN assertions: cur_match is the head of the hash chain for the current
     *   string (strstart) and its distance is <= MAX_DIST, and prev_length >= 1
     * OUT assertion: the match length is not greater than s->lookahead.
     */
    const longest_match = (s, cur_match) => {
    
      let chain_length = s.max_chain_length;      /* max hash chain length */
      let scan = s.strstart; /* current string */
      let match;                       /* matched string */
      let len;                           /* length of current match */
      let best_len = s.prev_length;              /* best match length so far */
      let nice_match = s.nice_match;             /* stop if match long enough */
      const limit = (s.strstart > (s.w_size - MIN_LOOKAHEAD)) ?
          s.strstart - (s.w_size - MIN_LOOKAHEAD) : 0/*NIL*/;
    
      const _win = s.window; // shortcut
    
      const wmask = s.w_mask;
      const prev  = s.prev;
    
      /* Stop when cur_match becomes <= limit. To simplify the code,
       * we prevent matches with the string of window index 0.
       */
    
      const strend = s.strstart + MAX_MATCH;
      let scan_end1  = _win[scan + best_len - 1];
      let scan_end   = _win[scan + best_len];
    
      /* The code is optimized for HASH_BITS >= 8 and MAX_MATCH-2 multiple of 16.
       * It is easy to get rid of this optimization if necessary.
       */
      // Assert(s->hash_bits >= 8 && MAX_MATCH == 258, "Code too clever");
    
      /* Do not waste too much time if we already have a good match: */
      if (s.prev_length >= s.good_match) {
        chain_length >>= 2;
      }
      /* Do not look for matches beyond the end of the input. This is necessary
       * to make deflate deterministic.
       */
      if (nice_match > s.lookahead) { nice_match = s.lookahead; }
    
      // Assert((ulg)s->strstart <= s->window_size-MIN_LOOKAHEAD, "need lookahead");
    
      do {
        // Assert(cur_match < s->strstart, "no future");
        match = cur_match;
    
        /* Skip to next match if the match length cannot increase
         * or if the match length is less than 2.  Note that the checks below
         * for insufficient lookahead only occur occasionally for performance
         * reasons.  Therefore uninitialized memory will be accessed, and
         * conditional jumps will be made that depend on those values.
         * However the length of the match is limited to the lookahead, so
         * the output of deflate is not affected by the uninitialized values.
         */
    
        if (_win[match + best_len]     !== scan_end  ||
            _win[match + best_len - 1] !== scan_end1 ||
            _win[match]                !== _win[scan] ||
            _win[++match]              !== _win[scan + 1]) {
          continue;
        }
    
        /* The check at best_len-1 can be removed because it will be made
         * again later. (This heuristic is not always a win.)
         * It is not necessary to compare scan[2] and match[2] since they
         * are always equal when the other bytes match, given that
         * the hash keys are equal and that HASH_BITS >= 8.
         */
        scan += 2;
        match++;
        // Assert(*scan == *match, "match[2]?");
    
        /* We check for insufficient lookahead only every 8th comparison;
         * the 256th check will be made at strstart+258.
         */
        do {
          /*jshint noempty:false*/
        } while (_win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
                 _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
                 _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
                 _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
                 scan < strend);
    
        // Assert(scan <= s->window+(unsigned)(s->window_size-1), "wild scan");
    
        len = MAX_MATCH - (strend - scan);
        scan = strend - MAX_MATCH;
    
        if (len > best_len) {
          s.match_start = cur_match;
          best_len = len;
          if (len >= nice_match) {
            break;
          }
          scan_end1  = _win[scan + best_len - 1];
          scan_end   = _win[scan + best_len];
        }
      } while ((cur_match = prev[cur_match & wmask]) > limit && --chain_length !== 0);
    
      if (best_len <= s.lookahead) {
        return best_len;
      }
      return s.lookahead;
    };
    
    
    /* ===========================================================================
     * Fill the window when the lookahead becomes insufficient.
     * Updates strstart and lookahead.
     *
     * IN assertion: lookahead < MIN_LOOKAHEAD
     * OUT assertions: strstart <= window_size-MIN_LOOKAHEAD
     *    At least one byte has been read, or avail_in == 0; reads are
     *    performed for at least two bytes (required for the zip translate_eol
     *    option -- not supported here).
     */
    const fill_window = (s) => {
    
      const _w_size = s.w_size;
      let p, n, m, more, str;
    
      //Assert(s->lookahead < MIN_LOOKAHEAD, "already enough lookahead");
    
      do {
        more = s.window_size - s.lookahead - s.strstart;
    
        // JS ints have 32 bit, block below not needed
        /* Deal with !@#$% 64K limit: */
        //if (sizeof(int) <= 2) {
        //    if (more == 0 && s->strstart == 0 && s->lookahead == 0) {
        //        more = wsize;
        //
        //  } else if (more == (unsigned)(-1)) {
        //        /* Very unlikely, but possible on 16 bit machine if
        //         * strstart == 0 && lookahead == 1 (input done a byte at time)
        //         */
        //        more--;
        //    }
        //}
    
    
        /* If the window is almost full and there is insufficient lookahead,
         * move the upper half to the lower one to make room in the upper half.
         */
        if (s.strstart >= _w_size + (_w_size - MIN_LOOKAHEAD)) {
    
          s.window.set(s.window.subarray(_w_size, _w_size + _w_size), 0);
          s.match_start -= _w_size;
          s.strstart -= _w_size;
          /* we now have strstart >= MAX_DIST */
          s.block_start -= _w_size;
    
          /* Slide the hash table (could be avoided with 32 bit values
           at the expense of memory usage). We slide even when level == 0
           to keep the hash table consistent if we switch back to level > 0
           later. (Using level 0 permanently is not an optimal usage of
           zlib, so we don't care about this pathological case.)
           */
    
          n = s.hash_size;
          p = n;
    
          do {
            m = s.head[--p];
            s.head[p] = (m >= _w_size ? m - _w_size : 0);
          } while (--n);
    
          n = _w_size;
          p = n;
    
          do {
            m = s.prev[--p];
            s.prev[p] = (m >= _w_size ? m - _w_size : 0);
            /* If n is not on any hash chain, prev[n] is garbage but
             * its value will never be used.
             */
          } while (--n);
    
          more += _w_size;
        }
        if (s.strm.avail_in === 0) {
          break;
        }
    
        /* If there was no sliding:
         *    strstart <= WSIZE+MAX_DIST-1 && lookahead <= MIN_LOOKAHEAD - 1 &&
         *    more == window_size - lookahead - strstart
         * => more >= window_size - (MIN_LOOKAHEAD-1 + WSIZE + MAX_DIST-1)
         * => more >= window_size - 2*WSIZE + 2
         * In the BIG_MEM or MMAP case (not yet supported),
         *   window_size == input_size + MIN_LOOKAHEAD  &&
         *   strstart + s->lookahead <= input_size => more >= MIN_LOOKAHEAD.
         * Otherwise, window_size == 2*WSIZE so more >= 2.
         * If there was sliding, more >= WSIZE. So in all cases, more >= 2.
         */
        //Assert(more >= 2, "more < 2");
        n = read_buf(s.strm, s.window, s.strstart + s.lookahead, more);
        s.lookahead += n;
    
        /* Initialize the hash value now that we have some input: */
        if (s.lookahead + s.insert >= MIN_MATCH) {
          str = s.strstart - s.insert;
          s.ins_h = s.window[str];
    
          /* UPDATE_HASH(s, s->ins_h, s->window[str + 1]); */
          s.ins_h = HASH(s, s.ins_h, s.window[str + 1]);
    //#if MIN_MATCH != 3
    //        Call update_hash() MIN_MATCH-3 more times
    //#endif
          while (s.insert) {
            /* UPDATE_HASH(s, s->ins_h, s->window[str + MIN_MATCH-1]); */
            s.ins_h = HASH(s, s.ins_h, s.window[str + MIN_MATCH - 1]);
    
            s.prev[str & s.w_mask] = s.head[s.ins_h];
            s.head[s.ins_h] = str;
            str++;
            s.insert--;
            if (s.lookahead + s.insert < MIN_MATCH) {
              break;
            }
          }
        }
        /* If the whole input has less than MIN_MATCH bytes, ins_h is garbage,
         * but this is not important since only literal bytes will be emitted.
         */
    
      } while (s.lookahead < MIN_LOOKAHEAD && s.strm.avail_in !== 0);
    
      /* If the WIN_INIT bytes after the end of the current data have never been
       * written, then zero those bytes in order to avoid memory check reports of
       * the use of uninitialized (or uninitialised as Julian writes) bytes by
       * the longest match routines.  Update the high water mark for the next
       * time through here.  WIN_INIT is set to MAX_MATCH since the longest match
       * routines allow scanning to strstart + MAX_MATCH, ignoring lookahead.
       */
    //  if (s.high_water < s.window_size) {
    //    const curr = s.strstart + s.lookahead;
    //    let init = 0;
    //
    //    if (s.high_water < curr) {
    //      /* Previous high water mark below current data -- zero WIN_INIT
    //       * bytes or up to end of window, whichever is less.
    //       */
    //      init = s.window_size - curr;
    //      if (init > WIN_INIT)
    //        init = WIN_INIT;
    //      zmemzero(s->window + curr, (unsigned)init);
    //      s->high_water = curr + init;
    //    }
    //    else if (s->high_water < (ulg)curr + WIN_INIT) {
    //      /* High water mark at or above current data, but below current data
    //       * plus WIN_INIT -- zero out to current data plus WIN_INIT, or up
    //       * to end of window, whichever is less.
    //       */
    //      init = (ulg)curr + WIN_INIT - s->high_water;
    //      if (init > s->window_size - s->high_water)
    //        init = s->window_size - s->high_water;
    //      zmemzero(s->window + s->high_water, (unsigned)init);
    //      s->high_water += init;
    //    }
    //  }
    //
    //  Assert((ulg)s->strstart <= s->window_size - MIN_LOOKAHEAD,
    //    "not enough room for search");
    };
    
    /* ===========================================================================
     * Copy without compression as much as possible from the input stream, return
     * the current block state.
     * This function does not insert new strings in the dictionary since
     * uncompressible data is probably not useful. This function is used
     * only for the level=0 compression option.
     * NOTE: this function should be optimized to avoid extra copying from
     * window to pending_buf.
     */
    const deflate_stored = (s, flush) => {
    
      /* Stored blocks are limited to 0xffff bytes, pending_buf is limited
       * to pending_buf_size, and each stored block has a 5 byte header:
       */
      let max_block_size = 0xffff;
    
      if (max_block_size > s.pending_buf_size - 5) {
        max_block_size = s.pending_buf_size - 5;
      }
    
      /* Copy as much as possible from input to output: */
      for (;;) {
        /* Fill the window as much as possible: */
        if (s.lookahead <= 1) {
    
          //Assert(s->strstart < s->w_size+MAX_DIST(s) ||
          //  s->block_start >= (long)s->w_size, "slide too late");
    //      if (!(s.strstart < s.w_size + (s.w_size - MIN_LOOKAHEAD) ||
    //        s.block_start >= s.w_size)) {
    //        throw  new Error("slide too late");
    //      }
    
          fill_window(s);
          if (s.lookahead === 0 && flush === Z_NO_FLUSH) {
            return BS_NEED_MORE;
          }
    
          if (s.lookahead === 0) {
            break;
          }
          /* flush the current block */
        }
        //Assert(s->block_start >= 0L, "block gone");
    //    if (s.block_start < 0) throw new Error("block gone");
    
        s.strstart += s.lookahead;
        s.lookahead = 0;
    
        /* Emit a stored block if pending_buf will be full: */
        const max_start = s.block_start + max_block_size;
    
        if (s.strstart === 0 || s.strstart >= max_start) {
          /* strstart == 0 is possible when wraparound on 16-bit machine */
          s.lookahead = s.strstart - max_start;
          s.strstart = max_start;
          /*** FLUSH_BLOCK(s, 0); ***/
          flush_block_only(s, false);
          if (s.strm.avail_out === 0) {
            return BS_NEED_MORE;
          }
          /***/
    
    
        }
        /* Flush if we may have to slide, otherwise block_start may become
         * negative and the data will be gone:
         */
        if (s.strstart - s.block_start >= (s.w_size - MIN_LOOKAHEAD)) {
          /*** FLUSH_BLOCK(s, 0); ***/
          flush_block_only(s, false);
          if (s.strm.avail_out === 0) {
            return BS_NEED_MORE;
          }
          /***/
        }
      }
    
      s.insert = 0;
    
      if (flush === Z_FINISH) {
        /*** FLUSH_BLOCK(s, 1); ***/
        flush_block_only(s, true);
        if (s.strm.avail_out === 0) {
          return BS_FINISH_STARTED;
        }
        /***/
        return BS_FINISH_DONE;
      }
    
      if (s.strstart > s.block_start) {
        /*** FLUSH_BLOCK(s, 0); ***/
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
        /***/
      }
    
      return BS_NEED_MORE;
    };
    
    /* ===========================================================================
     * Compress as much as possible from the input stream, return the current
     * block state.
     * This function does not perform lazy evaluation of matches and inserts
     * new strings in the dictionary only for unmatched strings or for short
     * matches. It is used only for the fast compression options.
     */
    const deflate_fast = (s, flush) => {
    
      let hash_head;        /* head of the hash chain */
      let bflush;           /* set if current block must be flushed */
    
      for (;;) {
        /* Make sure that we always have enough lookahead, except
         * at the end of the input file. We need MAX_MATCH bytes
         * for the next match, plus MIN_MATCH bytes to insert the
         * string following the next match.
         */
        if (s.lookahead < MIN_LOOKAHEAD) {
          fill_window(s);
          if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
            return BS_NEED_MORE;
          }
          if (s.lookahead === 0) {
            break; /* flush the current block */
          }
        }
    
        /* Insert the string window[strstart .. strstart+2] in the
         * dictionary, and set hash_head to the head of the hash chain:
         */
        hash_head = 0/*NIL*/;
        if (s.lookahead >= MIN_MATCH) {
          /*** INSERT_STRING(s, s.strstart, hash_head); ***/
          s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + MIN_MATCH - 1]);
          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = s.strstart;
          /***/
        }
    
        /* Find the longest match, discarding those <= prev_length.
         * At this point we have always match_length < MIN_MATCH
         */
        if (hash_head !== 0/*NIL*/ && ((s.strstart - hash_head) <= (s.w_size - MIN_LOOKAHEAD))) {
          /* To simplify the code, we prevent matches with the string
           * of window index 0 (in particular we have to avoid a match
           * of the string with itself at the start of the input file).
           */
          s.match_length = longest_match(s, hash_head);
          /* longest_match() sets match_start */
        }
        if (s.match_length >= MIN_MATCH) {
          // check_match(s, s.strstart, s.match_start, s.match_length); // for debug only
    
          /*** _tr_tally_dist(s, s.strstart - s.match_start,
                         s.match_length - MIN_MATCH, bflush); ***/
          bflush = _tr_tally(s, s.strstart - s.match_start, s.match_length - MIN_MATCH);
    
          s.lookahead -= s.match_length;
    
          /* Insert new strings in the hash table only if the match length
           * is not too large. This saves time but degrades compression.
           */
          if (s.match_length <= s.max_lazy_match/*max_insert_length*/ && s.lookahead >= MIN_MATCH) {
            s.match_length--; /* string at strstart already in table */
            do {
              s.strstart++;
              /*** INSERT_STRING(s, s.strstart, hash_head); ***/
              s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + MIN_MATCH - 1]);
              hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
              s.head[s.ins_h] = s.strstart;
              /***/
              /* strstart never exceeds WSIZE-MAX_MATCH, so there are
               * always MIN_MATCH bytes ahead.
               */
            } while (--s.match_length !== 0);
            s.strstart++;
          } else
          {
            s.strstart += s.match_length;
            s.match_length = 0;
            s.ins_h = s.window[s.strstart];
            /* UPDATE_HASH(s, s.ins_h, s.window[s.strstart+1]); */
            s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + 1]);
    
    //#if MIN_MATCH != 3
    //                Call UPDATE_HASH() MIN_MATCH-3 more times
    //#endif
            /* If lookahead < MIN_MATCH, ins_h is garbage, but it does not
             * matter since it will be recomputed at next deflate call.
             */
          }
        } else {
          /* No match, output a literal byte */
          //Tracevv((stderr,"%c", s.window[s.strstart]));
          /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
          bflush = _tr_tally(s, 0, s.window[s.strstart]);
    
          s.lookahead--;
          s.strstart++;
        }
        if (bflush) {
          /*** FLUSH_BLOCK(s, 0); ***/
          flush_block_only(s, false);
          if (s.strm.avail_out === 0) {
            return BS_NEED_MORE;
          }
          /***/
        }
      }
      s.insert = ((s.strstart < (MIN_MATCH - 1)) ? s.strstart : MIN_MATCH - 1);
      if (flush === Z_FINISH) {
        /*** FLUSH_BLOCK(s, 1); ***/
        flush_block_only(s, true);
        if (s.strm.avail_out === 0) {
          return BS_FINISH_STARTED;
        }
        /***/
        return BS_FINISH_DONE;
      }
      if (s.last_lit) {
        /*** FLUSH_BLOCK(s, 0); ***/
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
        /***/
      }
      return BS_BLOCK_DONE;
    };
    
    /* ===========================================================================
     * Same as above, but achieves better compression. We use a lazy
     * evaluation for matches: a match is finally adopted only if there is
     * no better match at the next window position.
     */
    const deflate_slow = (s, flush) => {
    
      let hash_head;          /* head of hash chain */
      let bflush;              /* set if current block must be flushed */
    
      let max_insert;
    
      /* Process the input block. */
      for (;;) {
        /* Make sure that we always have enough lookahead, except
         * at the end of the input file. We need MAX_MATCH bytes
         * for the next match, plus MIN_MATCH bytes to insert the
         * string following the next match.
         */
        if (s.lookahead < MIN_LOOKAHEAD) {
          fill_window(s);
          if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
            return BS_NEED_MORE;
          }
          if (s.lookahead === 0) { break; } /* flush the current block */
        }
    
        /* Insert the string window[strstart .. strstart+2] in the
         * dictionary, and set hash_head to the head of the hash chain:
         */
        hash_head = 0/*NIL*/;
        if (s.lookahead >= MIN_MATCH) {
          /*** INSERT_STRING(s, s.strstart, hash_head); ***/
          s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + MIN_MATCH - 1]);
          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = s.strstart;
          /***/
        }
    
        /* Find the longest match, discarding those <= prev_length.
         */
        s.prev_length = s.match_length;
        s.prev_match = s.match_start;
        s.match_length = MIN_MATCH - 1;
    
        if (hash_head !== 0/*NIL*/ && s.prev_length < s.max_lazy_match &&
            s.strstart - hash_head <= (s.w_size - MIN_LOOKAHEAD)/*MAX_DIST(s)*/) {
          /* To simplify the code, we prevent matches with the string
           * of window index 0 (in particular we have to avoid a match
           * of the string with itself at the start of the input file).
           */
          s.match_length = longest_match(s, hash_head);
          /* longest_match() sets match_start */
    
          if (s.match_length <= 5 &&
             (s.strategy === Z_FILTERED || (s.match_length === MIN_MATCH && s.strstart - s.match_start > 4096/*TOO_FAR*/))) {
    
            /* If prev_match is also MIN_MATCH, match_start is garbage
             * but we will ignore the current match anyway.
             */
            s.match_length = MIN_MATCH - 1;
          }
        }
        /* If there was a match at the previous step and the current
         * match is not better, output the previous match:
         */
        if (s.prev_length >= MIN_MATCH && s.match_length <= s.prev_length) {
          max_insert = s.strstart + s.lookahead - MIN_MATCH;
          /* Do not insert strings in hash table beyond this. */
    
          //check_match(s, s.strstart-1, s.prev_match, s.prev_length);
    
          /***_tr_tally_dist(s, s.strstart - 1 - s.prev_match,
                         s.prev_length - MIN_MATCH, bflush);***/
          bflush = _tr_tally(s, s.strstart - 1 - s.prev_match, s.prev_length - MIN_MATCH);
          /* Insert in hash table all strings up to the end of the match.
           * strstart-1 and strstart are already inserted. If there is not
           * enough lookahead, the last two strings are not inserted in
           * the hash table.
           */
          s.lookahead -= s.prev_length - 1;
          s.prev_length -= 2;
          do {
            if (++s.strstart <= max_insert) {
              /*** INSERT_STRING(s, s.strstart, hash_head); ***/
              s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + MIN_MATCH - 1]);
              hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
              s.head[s.ins_h] = s.strstart;
              /***/
            }
          } while (--s.prev_length !== 0);
          s.match_available = 0;
          s.match_length = MIN_MATCH - 1;
          s.strstart++;
    
          if (bflush) {
            /*** FLUSH_BLOCK(s, 0); ***/
            flush_block_only(s, false);
            if (s.strm.avail_out === 0) {
              return BS_NEED_MORE;
            }
            /***/
          }
    
        } else if (s.match_available) {
          /* If there was no match at the previous position, output a
           * single literal. If there was a match but the current match
           * is longer, truncate the previous match to a single literal.
           */
          //Tracevv((stderr,"%c", s->window[s->strstart-1]));
          /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
          bflush = _tr_tally(s, 0, s.window[s.strstart - 1]);
    
          if (bflush) {
            /*** FLUSH_BLOCK_ONLY(s, 0) ***/
            flush_block_only(s, false);
            /***/
          }
          s.strstart++;
          s.lookahead--;
          if (s.strm.avail_out === 0) {
            return BS_NEED_MORE;
          }
        } else {
          /* There is no previous match to compare with, wait for
           * the next step to decide.
           */
          s.match_available = 1;
          s.strstart++;
          s.lookahead--;
        }
      }
      //Assert (flush != Z_NO_FLUSH, "no flush?");
      if (s.match_available) {
        //Tracevv((stderr,"%c", s->window[s->strstart-1]));
        /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
        bflush = _tr_tally(s, 0, s.window[s.strstart - 1]);
    
        s.match_available = 0;
      }
      s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
      if (flush === Z_FINISH) {
        /*** FLUSH_BLOCK(s, 1); ***/
        flush_block_only(s, true);
        if (s.strm.avail_out === 0) {
          return BS_FINISH_STARTED;
        }
        /***/
        return BS_FINISH_DONE;
      }
      if (s.last_lit) {
        /*** FLUSH_BLOCK(s, 0); ***/
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
        /***/
      }
    
      return BS_BLOCK_DONE;
    };
    
    
    /* ===========================================================================
     * For Z_RLE, simply look for runs of bytes, generate matches only of distance
     * one.  Do not maintain a hash table.  (It will be regenerated if this run of
     * deflate switches away from Z_RLE.)
     */
    const deflate_rle = (s, flush) => {
    
      let bflush;            /* set if current block must be flushed */
      let prev;              /* byte at distance one to match */
      let scan, strend;      /* scan goes up to strend for length of run */
    
      const _win = s.window;
    
      for (;;) {
        /* Make sure that we always have enough lookahead, except
         * at the end of the input file. We need MAX_MATCH bytes
         * for the longest run, plus one for the unrolled loop.
         */
        if (s.lookahead <= MAX_MATCH) {
          fill_window(s);
          if (s.lookahead <= MAX_MATCH && flush === Z_NO_FLUSH) {
            return BS_NEED_MORE;
          }
          if (s.lookahead === 0) { break; } /* flush the current block */
        }
    
        /* See how many times the previous byte repeats */
        s.match_length = 0;
        if (s.lookahead >= MIN_MATCH && s.strstart > 0) {
          scan = s.strstart - 1;
          prev = _win[scan];
          if (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan]) {
            strend = s.strstart + MAX_MATCH;
            do {
              /*jshint noempty:false*/
            } while (prev === _win[++scan] && prev === _win[++scan] &&
                     prev === _win[++scan] && prev === _win[++scan] &&
                     prev === _win[++scan] && prev === _win[++scan] &&
                     prev === _win[++scan] && prev === _win[++scan] &&
                     scan < strend);
            s.match_length = MAX_MATCH - (strend - scan);
            if (s.match_length > s.lookahead) {
              s.match_length = s.lookahead;
            }
          }
          //Assert(scan <= s->window+(uInt)(s->window_size-1), "wild scan");
        }
    
        /* Emit match if have run of MIN_MATCH or longer, else emit literal */
        if (s.match_length >= MIN_MATCH) {
          //check_match(s, s.strstart, s.strstart - 1, s.match_length);
    
          /*** _tr_tally_dist(s, 1, s.match_length - MIN_MATCH, bflush); ***/
          bflush = _tr_tally(s, 1, s.match_length - MIN_MATCH);
    
          s.lookahead -= s.match_length;
          s.strstart += s.match_length;
          s.match_length = 0;
        } else {
          /* No match, output a literal byte */
          //Tracevv((stderr,"%c", s->window[s->strstart]));
          /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
          bflush = _tr_tally(s, 0, s.window[s.strstart]);
    
          s.lookahead--;
          s.strstart++;
        }
        if (bflush) {
          /*** FLUSH_BLOCK(s, 0); ***/
          flush_block_only(s, false);
          if (s.strm.avail_out === 0) {
            return BS_NEED_MORE;
          }
          /***/
        }
      }
      s.insert = 0;
      if (flush === Z_FINISH) {
        /*** FLUSH_BLOCK(s, 1); ***/
        flush_block_only(s, true);
        if (s.strm.avail_out === 0) {
          return BS_FINISH_STARTED;
        }
        /***/
        return BS_FINISH_DONE;
      }
      if (s.last_lit) {
        /*** FLUSH_BLOCK(s, 0); ***/
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
        /***/
      }
      return BS_BLOCK_DONE;
    };
    
    /* ===========================================================================
     * For Z_HUFFMAN_ONLY, do not look for matches.  Do not maintain a hash table.
     * (It will be regenerated if this run of deflate switches away from Huffman.)
     */
    const deflate_huff = (s, flush) => {
    
      let bflush;             /* set if current block must be flushed */
    
      for (;;) {
        /* Make sure that we have a literal to write. */
        if (s.lookahead === 0) {
          fill_window(s);
          if (s.lookahead === 0) {
            if (flush === Z_NO_FLUSH) {
              return BS_NEED_MORE;
            }
            break;      /* flush the current block */
          }
        }
    
        /* Output a literal byte */
        s.match_length = 0;
        //Tracevv((stderr,"%c", s->window[s->strstart]));
        /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
        bflush = _tr_tally(s, 0, s.window[s.strstart]);
        s.lookahead--;
        s.strstart++;
        if (bflush) {
          /*** FLUSH_BLOCK(s, 0); ***/
          flush_block_only(s, false);
          if (s.strm.avail_out === 0) {
            return BS_NEED_MORE;
          }
          /***/
        }
      }
      s.insert = 0;
      if (flush === Z_FINISH) {
        /*** FLUSH_BLOCK(s, 1); ***/
        flush_block_only(s, true);
        if (s.strm.avail_out === 0) {
          return BS_FINISH_STARTED;
        }
        /***/
        return BS_FINISH_DONE;
      }
      if (s.last_lit) {
        /*** FLUSH_BLOCK(s, 0); ***/
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
        /***/
      }
      return BS_BLOCK_DONE;
    };
    
    /* Values for max_lazy_match, good_match and max_chain_length, depending on
     * the desired pack level (0..9). The values given below have been tuned to
     * exclude worst case performance for pathological files. Better values may be
     * found for specific files.
     */
    function Config(good_length, max_lazy, nice_length, max_chain, func) {
    
      this.good_length = good_length;
      this.max_lazy = max_lazy;
      this.nice_length = nice_length;
      this.max_chain = max_chain;
      this.func = func;
    }
    
    const configuration_table = [
      /*      good lazy nice chain */
      new Config(0, 0, 0, 0, deflate_stored),          /* 0 store only */
      new Config(4, 4, 8, 4, deflate_fast),            /* 1 max speed, no lazy matches */
      new Config(4, 5, 16, 8, deflate_fast),           /* 2 */
      new Config(4, 6, 32, 32, deflate_fast),          /* 3 */
    
      new Config(4, 4, 16, 16, deflate_slow),          /* 4 lazy matches */
      new Config(8, 16, 32, 32, deflate_slow),         /* 5 */
      new Config(8, 16, 128, 128, deflate_slow),       /* 6 */
      new Config(8, 32, 128, 256, deflate_slow),       /* 7 */
      new Config(32, 128, 258, 1024, deflate_slow),    /* 8 */
      new Config(32, 258, 258, 4096, deflate_slow)     /* 9 max compression */
    ];
    
    
    /* ===========================================================================
     * Initialize the "longest match" routines for a new zlib stream
     */
    const lm_init = (s) => {
    
      s.window_size = 2 * s.w_size;
    
      /*** CLEAR_HASH(s); ***/
      zero(s.head); // Fill with NIL (= 0);
    
      /* Set the default configuration parameters:
       */
      s.max_lazy_match = configuration_table[s.level].max_lazy;
      s.good_match = configuration_table[s.level].good_length;
      s.nice_match = configuration_table[s.level].nice_length;
      s.max_chain_length = configuration_table[s.level].max_chain;
    
      s.strstart = 0;
      s.block_start = 0;
      s.lookahead = 0;
      s.insert = 0;
      s.match_length = s.prev_length = MIN_MATCH - 1;
      s.match_available = 0;
      s.ins_h = 0;
    };
    
    
    function DeflateState() {
      this.strm = null;            /* pointer back to this zlib stream */
      this.status = 0;            /* as the name implies */
      this.pending_buf = null;      /* output still pending */
      this.pending_buf_size = 0;  /* size of pending_buf */
      this.pending_out = 0;       /* next pending byte to output to the stream */
      this.pending = 0;           /* nb of bytes in the pending buffer */
      this.wrap = 0;              /* bit 0 true for zlib, bit 1 true for gzip */
      this.gzhead = null;         /* gzip header information to write */
      this.gzindex = 0;           /* where in extra, name, or comment */
      this.method = Z_DEFLATED; /* can only be DEFLATED */
      this.last_flush = -1;   /* value of flush param for previous deflate call */
    
      this.w_size = 0;  /* LZ77 window size (32K by default) */
      this.w_bits = 0;  /* log2(w_size)  (8..16) */
      this.w_mask = 0;  /* w_size - 1 */
    
      this.window = null;
      /* Sliding window. Input bytes are read into the second half of the window,
       * and move to the first half later to keep a dictionary of at least wSize
       * bytes. With this organization, matches are limited to a distance of
       * wSize-MAX_MATCH bytes, but this ensures that IO is always
       * performed with a length multiple of the block size.
       */
    
      this.window_size = 0;
      /* Actual size of window: 2*wSize, except when the user input buffer
       * is directly used as sliding window.
       */
    
      this.prev = null;
      /* Link to older string with same hash index. To limit the size of this
       * array to 64K, this link is maintained only for the last 32K strings.
       * An index in this array is thus a window index modulo 32K.
       */
    
      this.head = null;   /* Heads of the hash chains or NIL. */
    
      this.ins_h = 0;       /* hash index of string to be inserted */
      this.hash_size = 0;   /* number of elements in hash table */
      this.hash_bits = 0;   /* log2(hash_size) */
      this.hash_mask = 0;   /* hash_size-1 */
    
      this.hash_shift = 0;
      /* Number of bits by which ins_h must be shifted at each input
       * step. It must be such that after MIN_MATCH steps, the oldest
       * byte no longer takes part in the hash key, that is:
       *   hash_shift * MIN_MATCH >= hash_bits
       */
    
      this.block_start = 0;
      /* Window position at the beginning of the current output block. Gets
       * negative when the window is moved backwards.
       */
    
      this.match_length = 0;      /* length of best match */
      this.prev_match = 0;        /* previous match */
      this.match_available = 0;   /* set if previous match exists */
      this.strstart = 0;          /* start of string to insert */
      this.match_start = 0;       /* start of matching string */
      this.lookahead = 0;         /* number of valid bytes ahead in window */
    
      this.prev_length = 0;
      /* Length of the best match at previous step. Matches not greater than this
       * are discarded. This is used in the lazy match evaluation.
       */
    
      this.max_chain_length = 0;
      /* To speed up deflation, hash chains are never searched beyond this
       * length.  A higher limit improves compression ratio but degrades the
       * speed.
       */
    
      this.max_lazy_match = 0;
      /* Attempt to find a better match only when the current match is strictly
       * smaller than this value. This mechanism is used only for compression
       * levels >= 4.
       */
      // That's alias to max_lazy_match, don't use directly
      //this.max_insert_length = 0;
      /* Insert new strings in the hash table only if the match length is not
       * greater than this length. This saves time but degrades compression.
       * max_insert_length is used only for compression levels <= 3.
       */
    
      this.level = 0;     /* compression level (1..9) */
      this.strategy = 0;  /* favor or force Huffman coding*/
    
      this.good_match = 0;
      /* Use a faster search when the previous match is longer than this */
    
      this.nice_match = 0; /* Stop searching when current match exceeds this */
    
                  /* used by trees.c: */
    
      /* Didn't use ct_data typedef below to suppress compiler warning */
    
      // struct ct_data_s dyn_ltree[HEAP_SIZE];   /* literal and length tree */
      // struct ct_data_s dyn_dtree[2*D_CODES+1]; /* distance tree */
      // struct ct_data_s bl_tree[2*BL_CODES+1];  /* Huffman tree for bit lengths */
    
      // Use flat array of DOUBLE size, with interleaved fata,
      // because JS does not support effective
      this.dyn_ltree  = new Uint16Array(HEAP_SIZE * 2);
      this.dyn_dtree  = new Uint16Array((2 * D_CODES + 1) * 2);
      this.bl_tree    = new Uint16Array((2 * BL_CODES + 1) * 2);
      zero(this.dyn_ltree);
      zero(this.dyn_dtree);
      zero(this.bl_tree);
    
      this.l_desc   = null;         /* desc. for literal tree */
      this.d_desc   = null;         /* desc. for distance tree */
      this.bl_desc  = null;         /* desc. for bit length tree */
    
      //ush bl_count[MAX_BITS+1];
      this.bl_count = new Uint16Array(MAX_BITS + 1);
      /* number of codes at each bit length for an optimal tree */
    
      //int heap[2*L_CODES+1];      /* heap used to build the Huffman trees */
      this.heap = new Uint16Array(2 * L_CODES + 1);  /* heap used to build the Huffman trees */
      zero(this.heap);
    
      this.heap_len = 0;               /* number of elements in the heap */
      this.heap_max = 0;               /* element of largest frequency */
      /* The sons of heap[n] are heap[2*n] and heap[2*n+1]. heap[0] is not used.
       * The same heap array is used to build all trees.
       */
    
      this.depth = new Uint16Array(2 * L_CODES + 1); //uch depth[2*L_CODES+1];
      zero(this.depth);
      /* Depth of each subtree used as tie breaker for trees of equal frequency
       */
    
      this.l_buf = 0;          /* buffer index for literals or lengths */
    
      this.lit_bufsize = 0;
      /* Size of match buffer for literals/lengths.  There are 4 reasons for
       * limiting lit_bufsize to 64K:
       *   - frequencies can be kept in 16 bit counters
       *   - if compression is not successful for the first block, all input
       *     data is still in the window so we can still emit a stored block even
       *     when input comes from standard input.  (This can also be done for
       *     all blocks if lit_bufsize is not greater than 32K.)
       *   - if compression is not successful for a file smaller than 64K, we can
       *     even emit a stored file instead of a stored block (saving 5 bytes).
       *     This is applicable only for zip (not gzip or zlib).
       *   - creating new Huffman trees less frequently may not provide fast
       *     adaptation to changes in the input data statistics. (Take for
       *     example a binary file with poorly compressible code followed by
       *     a highly compressible string table.) Smaller buffer sizes give
       *     fast adaptation but have of course the overhead of transmitting
       *     trees more frequently.
       *   - I can't count above 4
       */
    
      this.last_lit = 0;      /* running index in l_buf */
    
      this.d_buf = 0;
      /* Buffer index for distances. To simplify the code, d_buf and l_buf have
       * the same number of elements. To use different lengths, an extra flag
       * array would be necessary.
       */
    
      this.opt_len = 0;       /* bit length of current block with optimal trees */
      this.static_len = 0;    /* bit length of current block with static trees */
      this.matches = 0;       /* number of string matches in current block */
      this.insert = 0;        /* bytes at end of window left to insert */
    
    
      this.bi_buf = 0;
      /* Output buffer. bits are inserted starting at the bottom (least
       * significant bits).
       */
      this.bi_valid = 0;
      /* Number of valid bits in bi_buf.  All bits above the last valid bit
       * are always zero.
       */
    
      // Used for window memory init. We safely ignore it for JS. That makes
      // sense only for pointers and memory check tools.
      //this.high_water = 0;
      /* High water mark offset in window for initialized bytes -- bytes above
       * this are set to zero in order to avoid memory check warnings when
       * longest match routines access bytes past the input.  This is then
       * updated to the new high water mark.
       */
    }
    
    
    const deflateResetKeep = (strm) => {
    
      if (!strm || !strm.state) {
        return err(strm, Z_STREAM_ERROR);
      }
    
      strm.total_in = strm.total_out = 0;
      strm.data_type = Z_UNKNOWN;
    
      const s = strm.state;
      s.pending = 0;
      s.pending_out = 0;
    
      if (s.wrap < 0) {
        s.wrap = -s.wrap;
        /* was made negative by deflate(..., Z_FINISH); */
      }
      s.status = (s.wrap ? INIT_STATE : BUSY_STATE);
      strm.adler = (s.wrap === 2) ?
        0  // crc32(0, Z_NULL, 0)
      :
        1; // adler32(0, Z_NULL, 0)
      s.last_flush = Z_NO_FLUSH;
      _tr_init(s);
      return Z_OK;
    };
    
    
    const deflateReset = (strm) => {
    
      const ret = deflateResetKeep(strm);
      if (ret === Z_OK) {
        lm_init(strm.state);
      }
      return ret;
    };
    
    
    const deflateSetHeader = (strm, head) => {
    
      if (!strm || !strm.state) { return Z_STREAM_ERROR; }
      if (strm.state.wrap !== 2) { return Z_STREAM_ERROR; }
      strm.state.gzhead = head;
      return Z_OK;
    };
    
    
    const deflateInit2 = (strm, level, method, windowBits, memLevel, strategy) => {
    
      if (!strm) { // === Z_NULL
        return Z_STREAM_ERROR;
      }
      let wrap = 1;
    
      if (level === Z_DEFAULT_COMPRESSION) {
        level = 6;
      }
    
      if (windowBits < 0) { /* suppress zlib wrapper */
        wrap = 0;
        windowBits = -windowBits;
      }
    
      else if (windowBits > 15) {
        wrap = 2;           /* write gzip wrapper instead */
        windowBits -= 16;
      }
    
    
      if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || method !== Z_DEFLATED ||
        windowBits < 8 || windowBits > 15 || level < 0 || level > 9 ||
        strategy < 0 || strategy > Z_FIXED) {
        return err(strm, Z_STREAM_ERROR);
      }
    
    
      if (windowBits === 8) {
        windowBits = 9;
      }
      /* until 256-byte window bug fixed */
    
      const s = new DeflateState();
    
      strm.state = s;
      s.strm = strm;
    
      s.wrap = wrap;
      s.gzhead = null;
      s.w_bits = windowBits;
      s.w_size = 1 << s.w_bits;
      s.w_mask = s.w_size - 1;
    
      s.hash_bits = memLevel + 7;
      s.hash_size = 1 << s.hash_bits;
      s.hash_mask = s.hash_size - 1;
      s.hash_shift = ~~((s.hash_bits + MIN_MATCH - 1) / MIN_MATCH);
    
      s.window = new Uint8Array(s.w_size * 2);
      s.head = new Uint16Array(s.hash_size);
      s.prev = new Uint16Array(s.w_size);
    
      // Don't need mem init magic for JS.
      //s.high_water = 0;  /* nothing written to s->window yet */
    
      s.lit_bufsize = 1 << (memLevel + 6); /* 16K elements by default */
    
      s.pending_buf_size = s.lit_bufsize * 4;
    
      //overlay = (ushf *) ZALLOC(strm, s->lit_bufsize, sizeof(ush)+2);
      //s->pending_buf = (uchf *) overlay;
      s.pending_buf = new Uint8Array(s.pending_buf_size);
    
      // It is offset from `s.pending_buf` (size is `s.lit_bufsize * 2`)
      //s->d_buf = overlay + s->lit_bufsize/sizeof(ush);
      s.d_buf = 1 * s.lit_bufsize;
    
      //s->l_buf = s->pending_buf + (1+sizeof(ush))*s->lit_bufsize;
      s.l_buf = (1 + 2) * s.lit_bufsize;
    
      s.level = level;
      s.strategy = strategy;
      s.method = method;
    
      return deflateReset(strm);
    };
    
    const deflateInit = (strm, level) => {
    
      return deflateInit2(strm, level, Z_DEFLATED, MAX_WBITS, DEF_MEM_LEVEL, Z_DEFAULT_STRATEGY);
    };
    
    
    const deflate = (strm, flush) => {
    
      let beg, val; // for gzip header write only
    
      if (!strm || !strm.state ||
        flush > Z_BLOCK || flush < 0) {
        return strm ? err(strm, Z_STREAM_ERROR) : Z_STREAM_ERROR;
      }
    
      const s = strm.state;
    
      if (!strm.output ||
          (!strm.input && strm.avail_in !== 0) ||
          (s.status === FINISH_STATE && flush !== Z_FINISH)) {
        return err(strm, (strm.avail_out === 0) ? Z_BUF_ERROR : Z_STREAM_ERROR);
      }
    
      s.strm = strm; /* just in case */
      const old_flush = s.last_flush;
      s.last_flush = flush;
    
      /* Write the header */
      if (s.status === INIT_STATE) {
    
        if (s.wrap === 2) { // GZIP header
          strm.adler = 0;  //crc32(0L, Z_NULL, 0);
          put_byte(s, 31);
          put_byte(s, 139);
          put_byte(s, 8);
          if (!s.gzhead) { // s->gzhead == Z_NULL
            put_byte(s, 0);
            put_byte(s, 0);
            put_byte(s, 0);
            put_byte(s, 0);
            put_byte(s, 0);
            put_byte(s, s.level === 9 ? 2 :
                        (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ?
                         4 : 0));
            put_byte(s, OS_CODE);
            s.status = BUSY_STATE;
          }
          else {
            put_byte(s, (s.gzhead.text ? 1 : 0) +
                        (s.gzhead.hcrc ? 2 : 0) +
                        (!s.gzhead.extra ? 0 : 4) +
                        (!s.gzhead.name ? 0 : 8) +
                        (!s.gzhead.comment ? 0 : 16)
            );
            put_byte(s, s.gzhead.time & 0xff);
            put_byte(s, (s.gzhead.time >> 8) & 0xff);
            put_byte(s, (s.gzhead.time >> 16) & 0xff);
            put_byte(s, (s.gzhead.time >> 24) & 0xff);
            put_byte(s, s.level === 9 ? 2 :
                        (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ?
                         4 : 0));
            put_byte(s, s.gzhead.os & 0xff);
            if (s.gzhead.extra && s.gzhead.extra.length) {
              put_byte(s, s.gzhead.extra.length & 0xff);
              put_byte(s, (s.gzhead.extra.length >> 8) & 0xff);
            }
            if (s.gzhead.hcrc) {
              strm.adler = crc32(strm.adler, s.pending_buf, s.pending, 0);
            }
            s.gzindex = 0;
            s.status = EXTRA_STATE;
          }
        }
        else // DEFLATE header
        {
          let header = (Z_DEFLATED + ((s.w_bits - 8) << 4)) << 8;
          let level_flags = -1;
    
          if (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2) {
            level_flags = 0;
          } else if (s.level < 6) {
            level_flags = 1;
          } else if (s.level === 6) {
            level_flags = 2;
          } else {
            level_flags = 3;
          }
          header |= (level_flags << 6);
          if (s.strstart !== 0) { header |= PRESET_DICT; }
          header += 31 - (header % 31);
    
          s.status = BUSY_STATE;
          putShortMSB(s, header);
    
          /* Save the adler32 of the preset dictionary: */
          if (s.strstart !== 0) {
            putShortMSB(s, strm.adler >>> 16);
            putShortMSB(s, strm.adler & 0xffff);
          }
          strm.adler = 1; // adler32(0L, Z_NULL, 0);
        }
      }
    
    //#ifdef GZIP
      if (s.status === EXTRA_STATE) {
        if (s.gzhead.extra/* != Z_NULL*/) {
          beg = s.pending;  /* start of bytes to update crc */
    
          while (s.gzindex < (s.gzhead.extra.length & 0xffff)) {
            if (s.pending === s.pending_buf_size) {
              if (s.gzhead.hcrc && s.pending > beg) {
                strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
              }
              flush_pending(strm);
              beg = s.pending;
              if (s.pending === s.pending_buf_size) {
                break;
              }
            }
            put_byte(s, s.gzhead.extra[s.gzindex] & 0xff);
            s.gzindex++;
          }
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          if (s.gzindex === s.gzhead.extra.length) {
            s.gzindex = 0;
            s.status = NAME_STATE;
          }
        }
        else {
          s.status = NAME_STATE;
        }
      }
      if (s.status === NAME_STATE) {
        if (s.gzhead.name/* != Z_NULL*/) {
          beg = s.pending;  /* start of bytes to update crc */
          //int val;
    
          do {
            if (s.pending === s.pending_buf_size) {
              if (s.gzhead.hcrc && s.pending > beg) {
                strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
              }
              flush_pending(strm);
              beg = s.pending;
              if (s.pending === s.pending_buf_size) {
                val = 1;
                break;
              }
            }
            // JS specific: little magic to add zero terminator to end of string
            if (s.gzindex < s.gzhead.name.length) {
              val = s.gzhead.name.charCodeAt(s.gzindex++) & 0xff;
            } else {
              val = 0;
            }
            put_byte(s, val);
          } while (val !== 0);
    
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          if (val === 0) {
            s.gzindex = 0;
            s.status = COMMENT_STATE;
          }
        }
        else {
          s.status = COMMENT_STATE;
        }
      }
      if (s.status === COMMENT_STATE) {
        if (s.gzhead.comment/* != Z_NULL*/) {
          beg = s.pending;  /* start of bytes to update crc */
          //int val;
    
          do {
            if (s.pending === s.pending_buf_size) {
              if (s.gzhead.hcrc && s.pending > beg) {
                strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
              }
              flush_pending(strm);
              beg = s.pending;
              if (s.pending === s.pending_buf_size) {
                val = 1;
                break;
              }
            }
            // JS specific: little magic to add zero terminator to end of string
            if (s.gzindex < s.gzhead.comment.length) {
              val = s.gzhead.comment.charCodeAt(s.gzindex++) & 0xff;
            } else {
              val = 0;
            }
            put_byte(s, val);
          } while (val !== 0);
    
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          if (val === 0) {
            s.status = HCRC_STATE;
          }
        }
        else {
          s.status = HCRC_STATE;
        }
      }
      if (s.status === HCRC_STATE) {
        if (s.gzhead.hcrc) {
          if (s.pending + 2 > s.pending_buf_size) {
            flush_pending(strm);
          }
          if (s.pending + 2 <= s.pending_buf_size) {
            put_byte(s, strm.adler & 0xff);
            put_byte(s, (strm.adler >> 8) & 0xff);
            strm.adler = 0; //crc32(0L, Z_NULL, 0);
            s.status = BUSY_STATE;
          }
        }
        else {
          s.status = BUSY_STATE;
        }
      }
    //#endif
    
      /* Flush as much pending output as possible */
      if (s.pending !== 0) {
        flush_pending(strm);
        if (strm.avail_out === 0) {
          /* Since avail_out is 0, deflate will be called again with
           * more output space, but possibly with both pending and
           * avail_in equal to zero. There won't be anything to do,
           * but this is not an error situation so make sure we
           * return OK instead of BUF_ERROR at next call of deflate:
           */
          s.last_flush = -1;
          return Z_OK;
        }
    
        /* Make sure there is something to do and avoid duplicate consecutive
         * flushes. For repeated and useless calls with Z_FINISH, we keep
         * returning Z_STREAM_END instead of Z_BUF_ERROR.
         */
      } else if (strm.avail_in === 0 && rank(flush) <= rank(old_flush) &&
        flush !== Z_FINISH) {
        return err(strm, Z_BUF_ERROR);
      }
    
      /* User must not provide more input after the first FINISH: */
      if (s.status === FINISH_STATE && strm.avail_in !== 0) {
        return err(strm, Z_BUF_ERROR);
      }
    
      /* Start a new block or continue the current one.
       */
      if (strm.avail_in !== 0 || s.lookahead !== 0 ||
        (flush !== Z_NO_FLUSH && s.status !== FINISH_STATE)) {
        let bstate = (s.strategy === Z_HUFFMAN_ONLY) ? deflate_huff(s, flush) :
          (s.strategy === Z_RLE ? deflate_rle(s, flush) :
            configuration_table[s.level].func(s, flush));
    
        if (bstate === BS_FINISH_STARTED || bstate === BS_FINISH_DONE) {
          s.status = FINISH_STATE;
        }
        if (bstate === BS_NEED_MORE || bstate === BS_FINISH_STARTED) {
          if (strm.avail_out === 0) {
            s.last_flush = -1;
            /* avoid BUF_ERROR next call, see above */
          }
          return Z_OK;
          /* If flush != Z_NO_FLUSH && avail_out == 0, the next call
           * of deflate should use the same flush parameter to make sure
           * that the flush is complete. So we don't have to output an
           * empty block here, this will be done at next call. This also
           * ensures that for a very small output buffer, we emit at most
           * one empty block.
           */
        }
        if (bstate === BS_BLOCK_DONE) {
          if (flush === Z_PARTIAL_FLUSH) {
            _tr_align(s);
          }
          else if (flush !== Z_BLOCK) { /* FULL_FLUSH or SYNC_FLUSH */
    
            _tr_stored_block(s, 0, 0, false);
            /* For a full flush, this empty block will be recognized
             * as a special marker by inflate_sync().
             */
            if (flush === Z_FULL_FLUSH) {
              /*** CLEAR_HASH(s); ***/             /* forget history */
              zero(s.head); // Fill with NIL (= 0);
    
              if (s.lookahead === 0) {
                s.strstart = 0;
                s.block_start = 0;
                s.insert = 0;
              }
            }
          }
          flush_pending(strm);
          if (strm.avail_out === 0) {
            s.last_flush = -1; /* avoid BUF_ERROR at next call, see above */
            return Z_OK;
          }
        }
      }
      //Assert(strm->avail_out > 0, "bug2");
      //if (strm.avail_out <= 0) { throw new Error("bug2");}
    
      if (flush !== Z_FINISH) { return Z_OK; }
      if (s.wrap <= 0) { return Z_STREAM_END; }
    
      /* Write the trailer */
      if (s.wrap === 2) {
        put_byte(s, strm.adler & 0xff);
        put_byte(s, (strm.adler >> 8) & 0xff);
        put_byte(s, (strm.adler >> 16) & 0xff);
        put_byte(s, (strm.adler >> 24) & 0xff);
        put_byte(s, strm.total_in & 0xff);
        put_byte(s, (strm.total_in >> 8) & 0xff);
        put_byte(s, (strm.total_in >> 16) & 0xff);
        put_byte(s, (strm.total_in >> 24) & 0xff);
      }
      else
      {
        putShortMSB(s, strm.adler >>> 16);
        putShortMSB(s, strm.adler & 0xffff);
      }
    
      flush_pending(strm);
      /* If avail_out is zero, the application will call deflate again
       * to flush the rest.
       */
      if (s.wrap > 0) { s.wrap = -s.wrap; }
      /* write the trailer only once! */
      return s.pending !== 0 ? Z_OK : Z_STREAM_END;
    };
    
    
    const deflateEnd = (strm) => {
    
      if (!strm/*== Z_NULL*/ || !strm.state/*== Z_NULL*/) {
        return Z_STREAM_ERROR;
      }
    
      const status = strm.state.status;
      if (status !== INIT_STATE &&
        status !== EXTRA_STATE &&
        status !== NAME_STATE &&
        status !== COMMENT_STATE &&
        status !== HCRC_STATE &&
        status !== BUSY_STATE &&
        status !== FINISH_STATE
      ) {
        return err(strm, Z_STREAM_ERROR);
      }
    
      strm.state = null;
    
      return status === BUSY_STATE ? err(strm, Z_DATA_ERROR) : Z_OK;
    };
    
    
    /* =========================================================================
     * Initializes the compression dictionary from the given byte
     * sequence without producing any compressed output.
     */
    const deflateSetDictionary = (strm, dictionary) => {
    
      let dictLength = dictionary.length;
    
      if (!strm/*== Z_NULL*/ || !strm.state/*== Z_NULL*/) {
        return Z_STREAM_ERROR;
      }
    
      const s = strm.state;
      const wrap = s.wrap;
    
      if (wrap === 2 || (wrap === 1 && s.status !== INIT_STATE) || s.lookahead) {
        return Z_STREAM_ERROR;
      }
    
      /* when using zlib wrappers, compute Adler-32 for provided dictionary */
      if (wrap === 1) {
        /* adler32(strm->adler, dictionary, dictLength); */
        strm.adler = adler32(strm.adler, dictionary, dictLength, 0);
      }
    
      s.wrap = 0;   /* avoid computing Adler-32 in read_buf */
    
      /* if dictionary would fill window, just replace the history */
      if (dictLength >= s.w_size) {
        if (wrap === 0) {            /* already empty otherwise */
          /*** CLEAR_HASH(s); ***/
          zero(s.head); // Fill with NIL (= 0);
          s.strstart = 0;
          s.block_start = 0;
          s.insert = 0;
        }
        /* use the tail */
        // dictionary = dictionary.slice(dictLength - s.w_size);
        let tmpDict = new Uint8Array(s.w_size);
        tmpDict.set(dictionary.subarray(dictLength - s.w_size, dictLength), 0);
        dictionary = tmpDict;
        dictLength = s.w_size;
      }
      /* insert dictionary into window and hash */
      const avail = strm.avail_in;
      const next = strm.next_in;
      const input = strm.input;
      strm.avail_in = dictLength;
      strm.next_in = 0;
      strm.input = dictionary;
      fill_window(s);
      while (s.lookahead >= MIN_MATCH) {
        let str = s.strstart;
        let n = s.lookahead - (MIN_MATCH - 1);
        do {
          /* UPDATE_HASH(s, s->ins_h, s->window[str + MIN_MATCH-1]); */
          s.ins_h = HASH(s, s.ins_h, s.window[str + MIN_MATCH - 1]);
    
          s.prev[str & s.w_mask] = s.head[s.ins_h];
    
          s.head[s.ins_h] = str;
          str++;
        } while (--n);
        s.strstart = str;
        s.lookahead = MIN_MATCH - 1;
        fill_window(s);
      }
      s.strstart += s.lookahead;
      s.block_start = s.strstart;
      s.insert = s.lookahead;
      s.lookahead = 0;
      s.match_length = s.prev_length = MIN_MATCH - 1;
      s.match_available = 0;
      strm.next_in = next;
      strm.input = input;
      strm.avail_in = avail;
      s.wrap = wrap;
      return Z_OK;
    };
    
    
    module.exports.deflateInit = deflateInit;
    module.exports.deflateInit2 = deflateInit2;
    module.exports.deflateReset = deflateReset;
    module.exports.deflateResetKeep = deflateResetKeep;
    module.exports.deflateSetHeader = deflateSetHeader;
    module.exports.deflate = deflate;
    module.exports.deflateEnd = deflateEnd;
    module.exports.deflateSetDictionary = deflateSetDictionary;
    module.exports.deflateInfo = 'pako deflate (from Nodeca project)';
    
    /* Not implemented
    module.exports.deflateBound = deflateBound;
    module.exports.deflateCopy = deflateCopy;
    module.exports.deflateParams = deflateParams;
    module.exports.deflatePending = deflatePending;
    module.exports.deflatePrime = deflatePrime;
    module.exports.deflateTune = deflateTune;
    */
    
    },{"./adler32":55,"./constants":56,"./crc32":57,"./messages":63,"./trees":64}],59:[function(require,module,exports){
    'use strict';
    
    // (C) 1995-2013 Jean-loup Gailly and Mark Adler
    // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
    //
    // This software is provided 'as-is', without any express or implied
    // warranty. In no event will the authors be held liable for any damages
    // arising from the use of this software.
    //
    // Permission is granted to anyone to use this software for any purpose,
    // including commercial applications, and to alter it and redistribute it
    // freely, subject to the following restrictions:
    //
    // 1. The origin of this software must not be misrepresented; you must not
    //   claim that you wrote the original software. If you use this software
    //   in a product, an acknowledgment in the product documentation would be
    //   appreciated but is not required.
    // 2. Altered source versions must be plainly marked as such, and must not be
    //   misrepresented as being the original software.
    // 3. This notice may not be removed or altered from any source distribution.
    
    function GZheader() {
      /* true if compressed data believed to be text */
      this.text       = 0;
      /* modification time */
      this.time       = 0;
      /* extra flags (not used when writing a gzip file) */
      this.xflags     = 0;
      /* operating system */
      this.os         = 0;
      /* pointer to extra field or Z_NULL if none */
      this.extra      = null;
      /* extra field length (valid if extra != Z_NULL) */
      this.extra_len  = 0; // Actually, we don't need it in JS,
                           // but leave for few code modifications
    
      //
      // Setup limits is not necessary because in js we should not preallocate memory
      // for inflate use constant limit in 65536 bytes
      //
    
      /* space at extra (only when reading header) */
      // this.extra_max  = 0;
      /* pointer to zero-terminated file name or Z_NULL */
      this.name       = '';
      /* space at name (only when reading header) */
      // this.name_max   = 0;
      /* pointer to zero-terminated comment or Z_NULL */
      this.comment    = '';
      /* space at comment (only when reading header) */
      // this.comm_max   = 0;
      /* true if there was or will be a header crc */
      this.hcrc       = 0;
      /* true when done reading gzip header (not used when writing a gzip file) */
      this.done       = false;
    }
    
    module.exports = GZheader;
    
    },{}],60:[function(require,module,exports){
    'use strict';
    
    // (C) 1995-2013 Jean-loup Gailly and Mark Adler
    // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
    //
    // This software is provided 'as-is', without any express or implied
    // warranty. In no event will the authors be held liable for any damages
    // arising from the use of this software.
    //
    // Permission is granted to anyone to use this software for any purpose,
    // including commercial applications, and to alter it and redistribute it
    // freely, subject to the following restrictions:
    //
    // 1. The origin of this software must not be misrepresented; you must not
    //   claim that you wrote the original software. If you use this software
    //   in a product, an acknowledgment in the product documentation would be
    //   appreciated but is not required.
    // 2. Altered source versions must be plainly marked as such, and must not be
    //   misrepresented as being the original software.
    // 3. This notice may not be removed or altered from any source distribution.
    
    // See state defs from inflate.js
    const BAD = 30;       /* got a data error -- remain here until reset */
    const TYPE = 12;      /* i: waiting for type bits, including last-flag bit */
    
    /*
       Decode literal, length, and distance codes and write out the resulting
       literal and match bytes until either not enough input or output is
       available, an end-of-block is encountered, or a data error is encountered.
       When large enough input and output buffers are supplied to inflate(), for
       example, a 16K input buffer and a 64K output buffer, more than 95% of the
       inflate execution time is spent in this routine.
    
       Entry assumptions:
    
            state.mode === LEN
            strm.avail_in >= 6
            strm.avail_out >= 258
            start >= strm.avail_out
            state.bits < 8
    
       On return, state.mode is one of:
    
            LEN -- ran out of enough output space or enough available input
            TYPE -- reached end of block code, inflate() to interpret next block
            BAD -- error in block data
    
       Notes:
    
        - The maximum input bits used by a length/distance pair is 15 bits for the
          length code, 5 bits for the length extra, 15 bits for the distance code,
          and 13 bits for the distance extra.  This totals 48 bits, or six bytes.
          Therefore if strm.avail_in >= 6, then there is enough input to avoid
          checking for available input while decoding.
    
        - The maximum bytes that a single length/distance pair can output is 258
          bytes, which is the maximum length that can be coded.  inflate_fast()
          requires strm.avail_out >= 258 for each loop to avoid checking for
          output space.
     */
    module.exports = function inflate_fast(strm, start) {
      let _in;                    /* local strm.input */
      let last;                   /* have enough input while in < last */
      let _out;                   /* local strm.output */
      let beg;                    /* inflate()'s initial strm.output */
      let end;                    /* while out < end, enough space available */
    //#ifdef INFLATE_STRICT
      let dmax;                   /* maximum distance from zlib header */
    //#endif
      let wsize;                  /* window size or zero if not using window */
      let whave;                  /* valid bytes in the window */
      let wnext;                  /* window write index */
      // Use `s_window` instead `window`, avoid conflict with instrumentation tools
      let s_window;               /* allocated sliding window, if wsize != 0 */
      let hold;                   /* local strm.hold */
      let bits;                   /* local strm.bits */
      let lcode;                  /* local strm.lencode */
      let dcode;                  /* local strm.distcode */
      let lmask;                  /* mask for first level of length codes */
      let dmask;                  /* mask for first level of distance codes */
      let here;                   /* retrieved table entry */
      let op;                     /* code bits, operation, extra bits, or */
                                  /*  window position, window bytes to copy */
      let len;                    /* match length, unused bytes */
      let dist;                   /* match distance */
      let from;                   /* where to copy match from */
      let from_source;
    
    
      let input, output; // JS specific, because we have no pointers
    
      /* copy state to local variables */
      const state = strm.state;
      //here = state.here;
      _in = strm.next_in;
      input = strm.input;
      last = _in + (strm.avail_in - 5);
      _out = strm.next_out;
      output = strm.output;
      beg = _out - (start - strm.avail_out);
      end = _out + (strm.avail_out - 257);
    //#ifdef INFLATE_STRICT
      dmax = state.dmax;
    //#endif
      wsize = state.wsize;
      whave = state.whave;
      wnext = state.wnext;
      s_window = state.window;
      hold = state.hold;
      bits = state.bits;
      lcode = state.lencode;
      dcode = state.distcode;
      lmask = (1 << state.lenbits) - 1;
      dmask = (1 << state.distbits) - 1;
    
    
      /* decode literals and length/distances until end-of-block or not enough
         input data or output space */
    
      top:
      do {
        if (bits < 15) {
          hold += input[_in++] << bits;
          bits += 8;
          hold += input[_in++] << bits;
          bits += 8;
        }
    
        here = lcode[hold & lmask];
    
        dolen:
        for (;;) { // Goto emulation
          op = here >>> 24/*here.bits*/;
          hold >>>= op;
          bits -= op;
          op = (here >>> 16) & 0xff/*here.op*/;
          if (op === 0) {                          /* literal */
            //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
            //        "inflate:         literal '%c'\n" :
            //        "inflate:         literal 0x%02x\n", here.val));
            output[_out++] = here & 0xffff/*here.val*/;
          }
          else if (op & 16) {                     /* length base */
            len = here & 0xffff/*here.val*/;
            op &= 15;                           /* number of extra bits */
            if (op) {
              if (bits < op) {
                hold += input[_in++] << bits;
                bits += 8;
              }
              len += hold & ((1 << op) - 1);
              hold >>>= op;
              bits -= op;
            }
            //Tracevv((stderr, "inflate:         length %u\n", len));
            if (bits < 15) {
              hold += input[_in++] << bits;
              bits += 8;
              hold += input[_in++] << bits;
              bits += 8;
            }
            here = dcode[hold & dmask];
    
            dodist:
            for (;;) { // goto emulation
              op = here >>> 24/*here.bits*/;
              hold >>>= op;
              bits -= op;
              op = (here >>> 16) & 0xff/*here.op*/;
    
              if (op & 16) {                      /* distance base */
                dist = here & 0xffff/*here.val*/;
                op &= 15;                       /* number of extra bits */
                if (bits < op) {
                  hold += input[_in++] << bits;
                  bits += 8;
                  if (bits < op) {
                    hold += input[_in++] << bits;
                    bits += 8;
                  }
                }
                dist += hold & ((1 << op) - 1);
    //#ifdef INFLATE_STRICT
                if (dist > dmax) {
                  strm.msg = 'invalid distance too far back';
                  state.mode = BAD;
                  break top;
                }
    //#endif
                hold >>>= op;
                bits -= op;
                //Tracevv((stderr, "inflate:         distance %u\n", dist));
                op = _out - beg;                /* max distance in output */
                if (dist > op) {                /* see if copy from window */
                  op = dist - op;               /* distance back in window */
                  if (op > whave) {
                    if (state.sane) {
                      strm.msg = 'invalid distance too far back';
                      state.mode = BAD;
                      break top;
                    }
    
    // (!) This block is disabled in zlib defaults,
    // don't enable it for binary compatibility
    //#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
    //                if (len <= op - whave) {
    //                  do {
    //                    output[_out++] = 0;
    //                  } while (--len);
    //                  continue top;
    //                }
    //                len -= op - whave;
    //                do {
    //                  output[_out++] = 0;
    //                } while (--op > whave);
    //                if (op === 0) {
    //                  from = _out - dist;
    //                  do {
    //                    output[_out++] = output[from++];
    //                  } while (--len);
    //                  continue top;
    //                }
    //#endif
                  }
                  from = 0; // window index
                  from_source = s_window;
                  if (wnext === 0) {           /* very common case */
                    from += wsize - op;
                    if (op < len) {         /* some from window */
                      len -= op;
                      do {
                        output[_out++] = s_window[from++];
                      } while (--op);
                      from = _out - dist;  /* rest from output */
                      from_source = output;
                    }
                  }
                  else if (wnext < op) {      /* wrap around window */
                    from += wsize + wnext - op;
                    op -= wnext;
                    if (op < len) {         /* some from end of window */
                      len -= op;
                      do {
                        output[_out++] = s_window[from++];
                      } while (--op);
                      from = 0;
                      if (wnext < len) {  /* some from start of window */
                        op = wnext;
                        len -= op;
                        do {
                          output[_out++] = s_window[from++];
                        } while (--op);
                        from = _out - dist;      /* rest from output */
                        from_source = output;
                      }
                    }
                  }
                  else {                      /* contiguous in window */
                    from += wnext - op;
                    if (op < len) {         /* some from window */
                      len -= op;
                      do {
                        output[_out++] = s_window[from++];
                      } while (--op);
                      from = _out - dist;  /* rest from output */
                      from_source = output;
                    }
                  }
                  while (len > 2) {
                    output[_out++] = from_source[from++];
                    output[_out++] = from_source[from++];
                    output[_out++] = from_source[from++];
                    len -= 3;
                  }
                  if (len) {
                    output[_out++] = from_source[from++];
                    if (len > 1) {
                      output[_out++] = from_source[from++];
                    }
                  }
                }
                else {
                  from = _out - dist;          /* copy direct from output */
                  do {                        /* minimum length is three */
                    output[_out++] = output[from++];
                    output[_out++] = output[from++];
                    output[_out++] = output[from++];
                    len -= 3;
                  } while (len > 2);
                  if (len) {
                    output[_out++] = output[from++];
                    if (len > 1) {
                      output[_out++] = output[from++];
                    }
                  }
                }
              }
              else if ((op & 64) === 0) {          /* 2nd level distance code */
                here = dcode[(here & 0xffff)/*here.val*/ + (hold & ((1 << op) - 1))];
                continue dodist;
              }
              else {
                strm.msg = 'invalid distance code';
                state.mode = BAD;
                break top;
              }
    
              break; // need to emulate goto via "continue"
            }
          }
          else if ((op & 64) === 0) {              /* 2nd level length code */
            here = lcode[(here & 0xffff)/*here.val*/ + (hold & ((1 << op) - 1))];
            continue dolen;
          }
          else if (op & 32) {                     /* end-of-block */
            //Tracevv((stderr, "inflate:         end of block\n"));
            state.mode = TYPE;
            break top;
          }
          else {
            strm.msg = 'invalid literal/length code';
            state.mode = BAD;
            break top;
          }
    
          break; // need to emulate goto via "continue"
        }
      } while (_in < last && _out < end);
    
      /* return unused bytes (on entry, bits < 8, so in won't go too far back) */
      len = bits >> 3;
      _in -= len;
      bits -= len << 3;
      hold &= (1 << bits) - 1;
    
      /* update state and return */
      strm.next_in = _in;
      strm.next_out = _out;
      strm.avail_in = (_in < last ? 5 + (last - _in) : 5 - (_in - last));
      strm.avail_out = (_out < end ? 257 + (end - _out) : 257 - (_out - end));
      state.hold = hold;
      state.bits = bits;
      return;
    };
    
    },{}],61:[function(require,module,exports){
    'use strict';
    
    // (C) 1995-2013 Jean-loup Gailly and Mark Adler
    // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
    //
    // This software is provided 'as-is', without any express or implied
    // warranty. In no event will the authors be held liable for any damages
    // arising from the use of this software.
    //
    // Permission is granted to anyone to use this software for any purpose,
    // including commercial applications, and to alter it and redistribute it
    // freely, subject to the following restrictions:
    //
    // 1. The origin of this software must not be misrepresented; you must not
    //   claim that you wrote the original software. If you use this software
    //   in a product, an acknowledgment in the product documentation would be
    //   appreciated but is not required.
    // 2. Altered source versions must be plainly marked as such, and must not be
    //   misrepresented as being the original software.
    // 3. This notice may not be removed or altered from any source distribution.
    
    const adler32       = require('./adler32');
    const crc32         = require('./crc32');
    const inflate_fast  = require('./inffast');
    const inflate_table = require('./inftrees');
    
    const CODES = 0;
    const LENS = 1;
    const DISTS = 2;
    
    /* Public constants ==========================================================*/
    /* ===========================================================================*/
    
    const {
      Z_FINISH, Z_BLOCK, Z_TREES,
      Z_OK, Z_STREAM_END, Z_NEED_DICT, Z_STREAM_ERROR, Z_DATA_ERROR, Z_MEM_ERROR, Z_BUF_ERROR,
      Z_DEFLATED
    } = require('./constants');
    
    
    /* STATES ====================================================================*/
    /* ===========================================================================*/
    
    
    const    HEAD = 1;       /* i: waiting for magic header */
    const    FLAGS = 2;      /* i: waiting for method and flags (gzip) */
    const    TIME = 3;       /* i: waiting for modification time (gzip) */
    const    OS = 4;         /* i: waiting for extra flags and operating system (gzip) */
    const    EXLEN = 5;      /* i: waiting for extra length (gzip) */
    const    EXTRA = 6;      /* i: waiting for extra bytes (gzip) */
    const    NAME = 7;       /* i: waiting for end of file name (gzip) */
    const    COMMENT = 8;    /* i: waiting for end of comment (gzip) */
    const    HCRC = 9;       /* i: waiting for header crc (gzip) */
    const    DICTID = 10;    /* i: waiting for dictionary check value */
    const    DICT = 11;      /* waiting for inflateSetDictionary() call */
    const        TYPE = 12;      /* i: waiting for type bits, including last-flag bit */
    const        TYPEDO = 13;    /* i: same, but skip check to exit inflate on new block */
    const        STORED = 14;    /* i: waiting for stored size (length and complement) */
    const        COPY_ = 15;     /* i/o: same as COPY below, but only first time in */
    const        COPY = 16;      /* i/o: waiting for input or output to copy stored block */
    const        TABLE = 17;     /* i: waiting for dynamic block table lengths */
    const        LENLENS = 18;   /* i: waiting for code length code lengths */
    const        CODELENS = 19;  /* i: waiting for length/lit and distance code lengths */
    const            LEN_ = 20;      /* i: same as LEN below, but only first time in */
    const            LEN = 21;       /* i: waiting for length/lit/eob code */
    const            LENEXT = 22;    /* i: waiting for length extra bits */
    const            DIST = 23;      /* i: waiting for distance code */
    const            DISTEXT = 24;   /* i: waiting for distance extra bits */
    const            MATCH = 25;     /* o: waiting for output space to copy string */
    const            LIT = 26;       /* o: waiting for output space to write literal */
    const    CHECK = 27;     /* i: waiting for 32-bit check value */
    const    LENGTH = 28;    /* i: waiting for 32-bit length (gzip) */
    const    DONE = 29;      /* finished check, done -- remain here until reset */
    const    BAD = 30;       /* got a data error -- remain here until reset */
    const    MEM = 31;       /* got an inflate() memory error -- remain here until reset */
    const    SYNC = 32;      /* looking for synchronization bytes to restart inflate() */
    
    /* ===========================================================================*/
    
    
    
    const ENOUGH_LENS = 852;
    const ENOUGH_DISTS = 592;
    //const ENOUGH =  (ENOUGH_LENS+ENOUGH_DISTS);
    
    const MAX_WBITS = 15;
    /* 32K LZ77 window */
    const DEF_WBITS = MAX_WBITS;
    
    
    const zswap32 = (q) => {
    
      return  (((q >>> 24) & 0xff) +
              ((q >>> 8) & 0xff00) +
              ((q & 0xff00) << 8) +
              ((q & 0xff) << 24));
    };
    
    
    function InflateState() {
      this.mode = 0;             /* current inflate mode */
      this.last = false;          /* true if processing last block */
      this.wrap = 0;              /* bit 0 true for zlib, bit 1 true for gzip */
      this.havedict = false;      /* true if dictionary provided */
      this.flags = 0;             /* gzip header method and flags (0 if zlib) */
      this.dmax = 0;              /* zlib header max distance (INFLATE_STRICT) */
      this.check = 0;             /* protected copy of check value */
      this.total = 0;             /* protected copy of output count */
      // TODO: may be {}
      this.head = null;           /* where to save gzip header information */
    
      /* sliding window */
      this.wbits = 0;             /* log base 2 of requested window size */
      this.wsize = 0;             /* window size or zero if not using window */
      this.whave = 0;             /* valid bytes in the window */
      this.wnext = 0;             /* window write index */
      this.window = null;         /* allocated sliding window, if needed */
    
      /* bit accumulator */
      this.hold = 0;              /* input bit accumulator */
      this.bits = 0;              /* number of bits in "in" */
    
      /* for string and stored block copying */
      this.length = 0;            /* literal or length of data to copy */
      this.offset = 0;            /* distance back to copy string from */
    
      /* for table and code decoding */
      this.extra = 0;             /* extra bits needed */
    
      /* fixed and dynamic code tables */
      this.lencode = null;          /* starting table for length/literal codes */
      this.distcode = null;         /* starting table for distance codes */
      this.lenbits = 0;           /* index bits for lencode */
      this.distbits = 0;          /* index bits for distcode */
    
      /* dynamic table building */
      this.ncode = 0;             /* number of code length code lengths */
      this.nlen = 0;              /* number of length code lengths */
      this.ndist = 0;             /* number of distance code lengths */
      this.have = 0;              /* number of code lengths in lens[] */
      this.next = null;              /* next available space in codes[] */
    
      this.lens = new Uint16Array(320); /* temporary storage for code lengths */
      this.work = new Uint16Array(288); /* work area for code table building */
    
      /*
       because we don't have pointers in js, we use lencode and distcode directly
       as buffers so we don't need codes
      */
      //this.codes = new Int32Array(ENOUGH);       /* space for code tables */
      this.lendyn = null;              /* dynamic table for length/literal codes (JS specific) */
      this.distdyn = null;             /* dynamic table for distance codes (JS specific) */
      this.sane = 0;                   /* if false, allow invalid distance too far */
      this.back = 0;                   /* bits back of last unprocessed length/lit */
      this.was = 0;                    /* initial length of match */
    }
    
    
    const inflateResetKeep = (strm) => {
    
      if (!strm || !strm.state) { return Z_STREAM_ERROR; }
      const state = strm.state;
      strm.total_in = strm.total_out = state.total = 0;
      strm.msg = ''; /*Z_NULL*/
      if (state.wrap) {       /* to support ill-conceived Java test suite */
        strm.adler = state.wrap & 1;
      }
      state.mode = HEAD;
      state.last = 0;
      state.havedict = 0;
      state.dmax = 32768;
      state.head = null/*Z_NULL*/;
      state.hold = 0;
      state.bits = 0;
      //state.lencode = state.distcode = state.next = state.codes;
      state.lencode = state.lendyn = new Int32Array(ENOUGH_LENS);
      state.distcode = state.distdyn = new Int32Array(ENOUGH_DISTS);
    
      state.sane = 1;
      state.back = -1;
      //Tracev((stderr, "inflate: reset\n"));
      return Z_OK;
    };
    
    
    const inflateReset = (strm) => {
    
      if (!strm || !strm.state) { return Z_STREAM_ERROR; }
      const state = strm.state;
      state.wsize = 0;
      state.whave = 0;
      state.wnext = 0;
      return inflateResetKeep(strm);
    
    };
    
    
    const inflateReset2 = (strm, windowBits) => {
      let wrap;
    
      /* get the state */
      if (!strm || !strm.state) { return Z_STREAM_ERROR; }
      const state = strm.state;
    
      /* extract wrap request from windowBits parameter */
      if (windowBits < 0) {
        wrap = 0;
        windowBits = -windowBits;
      }
      else {
        wrap = (windowBits >> 4) + 1;
        if (windowBits < 48) {
          windowBits &= 15;
        }
      }
    
      /* set number of window bits, free window if different */
      if (windowBits && (windowBits < 8 || windowBits > 15)) {
        return Z_STREAM_ERROR;
      }
      if (state.window !== null && state.wbits !== windowBits) {
        state.window = null;
      }
    
      /* update state and reset the rest of it */
      state.wrap = wrap;
      state.wbits = windowBits;
      return inflateReset(strm);
    };
    
    
    const inflateInit2 = (strm, windowBits) => {
    
      if (!strm) { return Z_STREAM_ERROR; }
      //strm.msg = Z_NULL;                 /* in case we return an error */
    
      const state = new InflateState();
    
      //if (state === Z_NULL) return Z_MEM_ERROR;
      //Tracev((stderr, "inflate: allocated\n"));
      strm.state = state;
      state.window = null/*Z_NULL*/;
      const ret = inflateReset2(strm, windowBits);
      if (ret !== Z_OK) {
        strm.state = null/*Z_NULL*/;
      }
      return ret;
    };
    
    
    const inflateInit = (strm) => {
    
      return inflateInit2(strm, DEF_WBITS);
    };
    
    
    /*
     Return state with length and distance decoding tables and index sizes set to
     fixed code decoding.  Normally this returns fixed tables from inffixed.h.
     If BUILDFIXED is defined, then instead this routine builds the tables the
     first time it's called, and returns those tables the first time and
     thereafter.  This reduces the size of the code by about 2K bytes, in
     exchange for a little execution time.  However, BUILDFIXED should not be
     used for threaded applications, since the rewriting of the tables and virgin
     may not be thread-safe.
     */
    let virgin = true;
    
    let lenfix, distfix; // We have no pointers in JS, so keep tables separate
    
    
    const fixedtables = (state) => {
    
      /* build fixed huffman tables if first call (may not be thread safe) */
      if (virgin) {
        lenfix = new Int32Array(512);
        distfix = new Int32Array(32);
    
        /* literal/length table */
        let sym = 0;
        while (sym < 144) { state.lens[sym++] = 8; }
        while (sym < 256) { state.lens[sym++] = 9; }
        while (sym < 280) { state.lens[sym++] = 7; }
        while (sym < 288) { state.lens[sym++] = 8; }
    
        inflate_table(LENS,  state.lens, 0, 288, lenfix,   0, state.work, { bits: 9 });
    
        /* distance table */
        sym = 0;
        while (sym < 32) { state.lens[sym++] = 5; }
    
        inflate_table(DISTS, state.lens, 0, 32,   distfix, 0, state.work, { bits: 5 });
    
        /* do this just once */
        virgin = false;
      }
    
      state.lencode = lenfix;
      state.lenbits = 9;
      state.distcode = distfix;
      state.distbits = 5;
    };
    
    
    /*
     Update the window with the last wsize (normally 32K) bytes written before
     returning.  If window does not exist yet, create it.  This is only called
     when a window is already in use, or when output has been written during this
     inflate call, but the end of the deflate stream has not been reached yet.
     It is also called to create a window for dictionary data when a dictionary
     is loaded.
    
     Providing output buffers larger than 32K to inflate() should provide a speed
     advantage, since only the last 32K of output is copied to the sliding window
     upon return from inflate(), and since all distances after the first 32K of
     output will fall in the output data, making match copies simpler and faster.
     The advantage may be dependent on the size of the processor's data caches.
     */
    const updatewindow = (strm, src, end, copy) => {
    
      let dist;
      const state = strm.state;
    
      /* if it hasn't been done already, allocate space for the window */
      if (state.window === null) {
        state.wsize = 1 << state.wbits;
        state.wnext = 0;
        state.whave = 0;
    
        state.window = new Uint8Array(state.wsize);
      }
    
      /* copy state->wsize or less output bytes into the circular window */
      if (copy >= state.wsize) {
        state.window.set(src.subarray(end - state.wsize, end), 0);
        state.wnext = 0;
        state.whave = state.wsize;
      }
      else {
        dist = state.wsize - state.wnext;
        if (dist > copy) {
          dist = copy;
        }
        //zmemcpy(state->window + state->wnext, end - copy, dist);
        state.window.set(src.subarray(end - copy, end - copy + dist), state.wnext);
        copy -= dist;
        if (copy) {
          //zmemcpy(state->window, end - copy, copy);
          state.window.set(src.subarray(end - copy, end), 0);
          state.wnext = copy;
          state.whave = state.wsize;
        }
        else {
          state.wnext += dist;
          if (state.wnext === state.wsize) { state.wnext = 0; }
          if (state.whave < state.wsize) { state.whave += dist; }
        }
      }
      return 0;
    };
    
    
    const inflate = (strm, flush) => {
    
      let state;
      let input, output;          // input/output buffers
      let next;                   /* next input INDEX */
      let put;                    /* next output INDEX */
      let have, left;             /* available input and output */
      let hold;                   /* bit buffer */
      let bits;                   /* bits in bit buffer */
      let _in, _out;              /* save starting available input and output */
      let copy;                   /* number of stored or match bytes to copy */
      let from;                   /* where to copy match bytes from */
      let from_source;
      let here = 0;               /* current decoding table entry */
      let here_bits, here_op, here_val; // paked "here" denormalized (JS specific)
      //let last;                   /* parent table entry */
      let last_bits, last_op, last_val; // paked "last" denormalized (JS specific)
      let len;                    /* length to copy for repeats, bits to drop */
      let ret;                    /* return code */
      const hbuf = new Uint8Array(4);    /* buffer for gzip header crc calculation */
      let opts;
    
      let n; // temporary variable for NEED_BITS
    
      const order = /* permutation of code lengths */
        new Uint8Array([ 16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15 ]);
    
    
      if (!strm || !strm.state || !strm.output ||
          (!strm.input && strm.avail_in !== 0)) {
        return Z_STREAM_ERROR;
      }
    
      state = strm.state;
      if (state.mode === TYPE) { state.mode = TYPEDO; }    /* skip check */
    
    
      //--- LOAD() ---
      put = strm.next_out;
      output = strm.output;
      left = strm.avail_out;
      next = strm.next_in;
      input = strm.input;
      have = strm.avail_in;
      hold = state.hold;
      bits = state.bits;
      //---
    
      _in = have;
      _out = left;
      ret = Z_OK;
    
      inf_leave: // goto emulation
      for (;;) {
        switch (state.mode) {
          case HEAD:
            if (state.wrap === 0) {
              state.mode = TYPEDO;
              break;
            }
            //=== NEEDBITS(16);
            while (bits < 16) {
              if (have === 0) { break inf_leave; }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            //===//
            if ((state.wrap & 2) && hold === 0x8b1f) {  /* gzip header */
              state.check = 0/*crc32(0L, Z_NULL, 0)*/;
              //=== CRC2(state.check, hold);
              hbuf[0] = hold & 0xff;
              hbuf[1] = (hold >>> 8) & 0xff;
              state.check = crc32(state.check, hbuf, 2, 0);
              //===//
    
              //=== INITBITS();
              hold = 0;
              bits = 0;
              //===//
              state.mode = FLAGS;
              break;
            }
            state.flags = 0;           /* expect zlib header */
            if (state.head) {
              state.head.done = false;
            }
            if (!(state.wrap & 1) ||   /* check if zlib header allowed */
              (((hold & 0xff)/*BITS(8)*/ << 8) + (hold >> 8)) % 31) {
              strm.msg = 'incorrect header check';
              state.mode = BAD;
              break;
            }
            if ((hold & 0x0f)/*BITS(4)*/ !== Z_DEFLATED) {
              strm.msg = 'unknown compression method';
              state.mode = BAD;
              break;
            }
            //--- DROPBITS(4) ---//
            hold >>>= 4;
            bits -= 4;
            //---//
            len = (hold & 0x0f)/*BITS(4)*/ + 8;
            if (state.wbits === 0) {
              state.wbits = len;
            }
            else if (len > state.wbits) {
              strm.msg = 'invalid window size';
              state.mode = BAD;
              break;
            }
    
            // !!! pako patch. Force use `options.windowBits` if passed.
            // Required to always use max window size by default.
            state.dmax = 1 << state.wbits;
            //state.dmax = 1 << len;
    
            //Tracev((stderr, "inflate:   zlib header ok\n"));
            strm.adler = state.check = 1/*adler32(0L, Z_NULL, 0)*/;
            state.mode = hold & 0x200 ? DICTID : TYPE;
            //=== INITBITS();
            hold = 0;
            bits = 0;
            //===//
            break;
          case FLAGS:
            //=== NEEDBITS(16); */
            while (bits < 16) {
              if (have === 0) { break inf_leave; }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            //===//
            state.flags = hold;
            if ((state.flags & 0xff) !== Z_DEFLATED) {
              strm.msg = 'unknown compression method';
              state.mode = BAD;
              break;
            }
            if (state.flags & 0xe000) {
              strm.msg = 'unknown header flags set';
              state.mode = BAD;
              break;
            }
            if (state.head) {
              state.head.text = ((hold >> 8) & 1);
            }
            if (state.flags & 0x0200) {
              //=== CRC2(state.check, hold);
              hbuf[0] = hold & 0xff;
              hbuf[1] = (hold >>> 8) & 0xff;
              state.check = crc32(state.check, hbuf, 2, 0);
              //===//
            }
            //=== INITBITS();
            hold = 0;
            bits = 0;
            //===//
            state.mode = TIME;
            /* falls through */
          case TIME:
            //=== NEEDBITS(32); */
            while (bits < 32) {
              if (have === 0) { break inf_leave; }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            //===//
            if (state.head) {
              state.head.time = hold;
            }
            if (state.flags & 0x0200) {
              //=== CRC4(state.check, hold)
              hbuf[0] = hold & 0xff;
              hbuf[1] = (hold >>> 8) & 0xff;
              hbuf[2] = (hold >>> 16) & 0xff;
              hbuf[3] = (hold >>> 24) & 0xff;
              state.check = crc32(state.check, hbuf, 4, 0);
              //===
            }
            //=== INITBITS();
            hold = 0;
            bits = 0;
            //===//
            state.mode = OS;
            /* falls through */
          case OS:
            //=== NEEDBITS(16); */
            while (bits < 16) {
              if (have === 0) { break inf_leave; }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            //===//
            if (state.head) {
              state.head.xflags = (hold & 0xff);
              state.head.os = (hold >> 8);
            }
            if (state.flags & 0x0200) {
              //=== CRC2(state.check, hold);
              hbuf[0] = hold & 0xff;
              hbuf[1] = (hold >>> 8) & 0xff;
              state.check = crc32(state.check, hbuf, 2, 0);
              //===//
            }
            //=== INITBITS();
            hold = 0;
            bits = 0;
            //===//
            state.mode = EXLEN;
            /* falls through */
          case EXLEN:
            if (state.flags & 0x0400) {
              //=== NEEDBITS(16); */
              while (bits < 16) {
                if (have === 0) { break inf_leave; }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              //===//
              state.length = hold;
              if (state.head) {
                state.head.extra_len = hold;
              }
              if (state.flags & 0x0200) {
                //=== CRC2(state.check, hold);
                hbuf[0] = hold & 0xff;
                hbuf[1] = (hold >>> 8) & 0xff;
                state.check = crc32(state.check, hbuf, 2, 0);
                //===//
              }
              //=== INITBITS();
              hold = 0;
              bits = 0;
              //===//
            }
            else if (state.head) {
              state.head.extra = null/*Z_NULL*/;
            }
            state.mode = EXTRA;
            /* falls through */
          case EXTRA:
            if (state.flags & 0x0400) {
              copy = state.length;
              if (copy > have) { copy = have; }
              if (copy) {
                if (state.head) {
                  len = state.head.extra_len - state.length;
                  if (!state.head.extra) {
                    // Use untyped array for more convenient processing later
                    state.head.extra = new Uint8Array(state.head.extra_len);
                  }
                  state.head.extra.set(
                    input.subarray(
                      next,
                      // extra field is limited to 65536 bytes
                      // - no need for additional size check
                      next + copy
                    ),
                    /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
                    len
                  );
                  //zmemcpy(state.head.extra + len, next,
                  //        len + copy > state.head.extra_max ?
                  //        state.head.extra_max - len : copy);
                }
                if (state.flags & 0x0200) {
                  state.check = crc32(state.check, input, copy, next);
                }
                have -= copy;
                next += copy;
                state.length -= copy;
              }
              if (state.length) { break inf_leave; }
            }
            state.length = 0;
            state.mode = NAME;
            /* falls through */
          case NAME:
            if (state.flags & 0x0800) {
              if (have === 0) { break inf_leave; }
              copy = 0;
              do {
                // TODO: 2 or 1 bytes?
                len = input[next + copy++];
                /* use constant limit because in js we should not preallocate memory */
                if (state.head && len &&
                    (state.length < 65536 /*state.head.name_max*/)) {
                  state.head.name += String.fromCharCode(len);
                }
              } while (len && copy < have);
    
              if (state.flags & 0x0200) {
                state.check = crc32(state.check, input, copy, next);
              }
              have -= copy;
              next += copy;
              if (len) { break inf_leave; }
            }
            else if (state.head) {
              state.head.name = null;
            }
            state.length = 0;
            state.mode = COMMENT;
            /* falls through */
          case COMMENT:
            if (state.flags & 0x1000) {
              if (have === 0) { break inf_leave; }
              copy = 0;
              do {
                len = input[next + copy++];
                /* use constant limit because in js we should not preallocate memory */
                if (state.head && len &&
                    (state.length < 65536 /*state.head.comm_max*/)) {
                  state.head.comment += String.fromCharCode(len);
                }
              } while (len && copy < have);
              if (state.flags & 0x0200) {
                state.check = crc32(state.check, input, copy, next);
              }
              have -= copy;
              next += copy;
              if (len) { break inf_leave; }
            }
            else if (state.head) {
              state.head.comment = null;
            }
            state.mode = HCRC;
            /* falls through */
          case HCRC:
            if (state.flags & 0x0200) {
              //=== NEEDBITS(16); */
              while (bits < 16) {
                if (have === 0) { break inf_leave; }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              //===//
              if (hold !== (state.check & 0xffff)) {
                strm.msg = 'header crc mismatch';
                state.mode = BAD;
                break;
              }
              //=== INITBITS();
              hold = 0;
              bits = 0;
              //===//
            }
            if (state.head) {
              state.head.hcrc = ((state.flags >> 9) & 1);
              state.head.done = true;
            }
            strm.adler = state.check = 0;
            state.mode = TYPE;
            break;
          case DICTID:
            //=== NEEDBITS(32); */
            while (bits < 32) {
              if (have === 0) { break inf_leave; }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            //===//
            strm.adler = state.check = zswap32(hold);
            //=== INITBITS();
            hold = 0;
            bits = 0;
            //===//
            state.mode = DICT;
            /* falls through */
          case DICT:
            if (state.havedict === 0) {
              //--- RESTORE() ---
              strm.next_out = put;
              strm.avail_out = left;
              strm.next_in = next;
              strm.avail_in = have;
              state.hold = hold;
              state.bits = bits;
              //---
              return Z_NEED_DICT;
            }
            strm.adler = state.check = 1/*adler32(0L, Z_NULL, 0)*/;
            state.mode = TYPE;
            /* falls through */
          case TYPE:
            if (flush === Z_BLOCK || flush === Z_TREES) { break inf_leave; }
            /* falls through */
          case TYPEDO:
            if (state.last) {
              //--- BYTEBITS() ---//
              hold >>>= bits & 7;
              bits -= bits & 7;
              //---//
              state.mode = CHECK;
              break;
            }
            //=== NEEDBITS(3); */
            while (bits < 3) {
              if (have === 0) { break inf_leave; }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            //===//
            state.last = (hold & 0x01)/*BITS(1)*/;
            //--- DROPBITS(1) ---//
            hold >>>= 1;
            bits -= 1;
            //---//
    
            switch ((hold & 0x03)/*BITS(2)*/) {
              case 0:                             /* stored block */
                //Tracev((stderr, "inflate:     stored block%s\n",
                //        state.last ? " (last)" : ""));
                state.mode = STORED;
                break;
              case 1:                             /* fixed block */
                fixedtables(state);
                //Tracev((stderr, "inflate:     fixed codes block%s\n",
                //        state.last ? " (last)" : ""));
                state.mode = LEN_;             /* decode codes */
                if (flush === Z_TREES) {
                  //--- DROPBITS(2) ---//
                  hold >>>= 2;
                  bits -= 2;
                  //---//
                  break inf_leave;
                }
                break;
              case 2:                             /* dynamic block */
                //Tracev((stderr, "inflate:     dynamic codes block%s\n",
                //        state.last ? " (last)" : ""));
                state.mode = TABLE;
                break;
              case 3:
                strm.msg = 'invalid block type';
                state.mode = BAD;
            }
            //--- DROPBITS(2) ---//
            hold >>>= 2;
            bits -= 2;
            //---//
            break;
          case STORED:
            //--- BYTEBITS() ---// /* go to byte boundary */
            hold >>>= bits & 7;
            bits -= bits & 7;
            //---//
            //=== NEEDBITS(32); */
            while (bits < 32) {
              if (have === 0) { break inf_leave; }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            //===//
            if ((hold & 0xffff) !== ((hold >>> 16) ^ 0xffff)) {
              strm.msg = 'invalid stored block lengths';
              state.mode = BAD;
              break;
            }
            state.length = hold & 0xffff;
            //Tracev((stderr, "inflate:       stored length %u\n",
            //        state.length));
            //=== INITBITS();
            hold = 0;
            bits = 0;
            //===//
            state.mode = COPY_;
            if (flush === Z_TREES) { break inf_leave; }
            /* falls through */
          case COPY_:
            state.mode = COPY;
            /* falls through */
          case COPY:
            copy = state.length;
            if (copy) {
              if (copy > have) { copy = have; }
              if (copy > left) { copy = left; }
              if (copy === 0) { break inf_leave; }
              //--- zmemcpy(put, next, copy); ---
              output.set(input.subarray(next, next + copy), put);
              //---//
              have -= copy;
              next += copy;
              left -= copy;
              put += copy;
              state.length -= copy;
              break;
            }
            //Tracev((stderr, "inflate:       stored end\n"));
            state.mode = TYPE;
            break;
          case TABLE:
            //=== NEEDBITS(14); */
            while (bits < 14) {
              if (have === 0) { break inf_leave; }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            //===//
            state.nlen = (hold & 0x1f)/*BITS(5)*/ + 257;
            //--- DROPBITS(5) ---//
            hold >>>= 5;
            bits -= 5;
            //---//
            state.ndist = (hold & 0x1f)/*BITS(5)*/ + 1;
            //--- DROPBITS(5) ---//
            hold >>>= 5;
            bits -= 5;
            //---//
            state.ncode = (hold & 0x0f)/*BITS(4)*/ + 4;
            //--- DROPBITS(4) ---//
            hold >>>= 4;
            bits -= 4;
            //---//
    //#ifndef PKZIP_BUG_WORKAROUND
            if (state.nlen > 286 || state.ndist > 30) {
              strm.msg = 'too many length or distance symbols';
              state.mode = BAD;
              break;
            }
    //#endif
            //Tracev((stderr, "inflate:       table sizes ok\n"));
            state.have = 0;
            state.mode = LENLENS;
            /* falls through */
          case LENLENS:
            while (state.have < state.ncode) {
              //=== NEEDBITS(3);
              while (bits < 3) {
                if (have === 0) { break inf_leave; }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              //===//
              state.lens[order[state.have++]] = (hold & 0x07);//BITS(3);
              //--- DROPBITS(3) ---//
              hold >>>= 3;
              bits -= 3;
              //---//
            }
            while (state.have < 19) {
              state.lens[order[state.have++]] = 0;
            }
            // We have separate tables & no pointers. 2 commented lines below not needed.
            //state.next = state.codes;
            //state.lencode = state.next;
            // Switch to use dynamic table
            state.lencode = state.lendyn;
            state.lenbits = 7;
    
            opts = { bits: state.lenbits };
            ret = inflate_table(CODES, state.lens, 0, 19, state.lencode, 0, state.work, opts);
            state.lenbits = opts.bits;
    
            if (ret) {
              strm.msg = 'invalid code lengths set';
              state.mode = BAD;
              break;
            }
            //Tracev((stderr, "inflate:       code lengths ok\n"));
            state.have = 0;
            state.mode = CODELENS;
            /* falls through */
          case CODELENS:
            while (state.have < state.nlen + state.ndist) {
              for (;;) {
                here = state.lencode[hold & ((1 << state.lenbits) - 1)];/*BITS(state.lenbits)*/
                here_bits = here >>> 24;
                here_op = (here >>> 16) & 0xff;
                here_val = here & 0xffff;
    
                if ((here_bits) <= bits) { break; }
                //--- PULLBYTE() ---//
                if (have === 0) { break inf_leave; }
                have--;
                hold += input[next++] << bits;
                bits += 8;
                //---//
              }
              if (here_val < 16) {
                //--- DROPBITS(here.bits) ---//
                hold >>>= here_bits;
                bits -= here_bits;
                //---//
                state.lens[state.have++] = here_val;
              }
              else {
                if (here_val === 16) {
                  //=== NEEDBITS(here.bits + 2);
                  n = here_bits + 2;
                  while (bits < n) {
                    if (have === 0) { break inf_leave; }
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  //===//
                  //--- DROPBITS(here.bits) ---//
                  hold >>>= here_bits;
                  bits -= here_bits;
                  //---//
                  if (state.have === 0) {
                    strm.msg = 'invalid bit length repeat';
                    state.mode = BAD;
                    break;
                  }
                  len = state.lens[state.have - 1];
                  copy = 3 + (hold & 0x03);//BITS(2);
                  //--- DROPBITS(2) ---//
                  hold >>>= 2;
                  bits -= 2;
                  //---//
                }
                else if (here_val === 17) {
                  //=== NEEDBITS(here.bits + 3);
                  n = here_bits + 3;
                  while (bits < n) {
                    if (have === 0) { break inf_leave; }
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  //===//
                  //--- DROPBITS(here.bits) ---//
                  hold >>>= here_bits;
                  bits -= here_bits;
                  //---//
                  len = 0;
                  copy = 3 + (hold & 0x07);//BITS(3);
                  //--- DROPBITS(3) ---//
                  hold >>>= 3;
                  bits -= 3;
                  //---//
                }
                else {
                  //=== NEEDBITS(here.bits + 7);
                  n = here_bits + 7;
                  while (bits < n) {
                    if (have === 0) { break inf_leave; }
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  //===//
                  //--- DROPBITS(here.bits) ---//
                  hold >>>= here_bits;
                  bits -= here_bits;
                  //---//
                  len = 0;
                  copy = 11 + (hold & 0x7f);//BITS(7);
                  //--- DROPBITS(7) ---//
                  hold >>>= 7;
                  bits -= 7;
                  //---//
                }
                if (state.have + copy > state.nlen + state.ndist) {
                  strm.msg = 'invalid bit length repeat';
                  state.mode = BAD;
                  break;
                }
                while (copy--) {
                  state.lens[state.have++] = len;
                }
              }
            }
    
            /* handle error breaks in while */
            if (state.mode === BAD) { break; }
    
            /* check for end-of-block code (better have one) */
            if (state.lens[256] === 0) {
              strm.msg = 'invalid code -- missing end-of-block';
              state.mode = BAD;
              break;
            }
    
            /* build code tables -- note: do not change the lenbits or distbits
               values here (9 and 6) without reading the comments in inftrees.h
               concerning the ENOUGH constants, which depend on those values */
            state.lenbits = 9;
    
            opts = { bits: state.lenbits };
            ret = inflate_table(LENS, state.lens, 0, state.nlen, state.lencode, 0, state.work, opts);
            // We have separate tables & no pointers. 2 commented lines below not needed.
            // state.next_index = opts.table_index;
            state.lenbits = opts.bits;
            // state.lencode = state.next;
    
            if (ret) {
              strm.msg = 'invalid literal/lengths set';
              state.mode = BAD;
              break;
            }
    
            state.distbits = 6;
            //state.distcode.copy(state.codes);
            // Switch to use dynamic table
            state.distcode = state.distdyn;
            opts = { bits: state.distbits };
            ret = inflate_table(DISTS, state.lens, state.nlen, state.ndist, state.distcode, 0, state.work, opts);
            // We have separate tables & no pointers. 2 commented lines below not needed.
            // state.next_index = opts.table_index;
            state.distbits = opts.bits;
            // state.distcode = state.next;
    
            if (ret) {
              strm.msg = 'invalid distances set';
              state.mode = BAD;
              break;
            }
            //Tracev((stderr, 'inflate:       codes ok\n'));
            state.mode = LEN_;
            if (flush === Z_TREES) { break inf_leave; }
            /* falls through */
          case LEN_:
            state.mode = LEN;
            /* falls through */
          case LEN:
            if (have >= 6 && left >= 258) {
              //--- RESTORE() ---
              strm.next_out = put;
              strm.avail_out = left;
              strm.next_in = next;
              strm.avail_in = have;
              state.hold = hold;
              state.bits = bits;
              //---
              inflate_fast(strm, _out);
              //--- LOAD() ---
              put = strm.next_out;
              output = strm.output;
              left = strm.avail_out;
              next = strm.next_in;
              input = strm.input;
              have = strm.avail_in;
              hold = state.hold;
              bits = state.bits;
              //---
    
              if (state.mode === TYPE) {
                state.back = -1;
              }
              break;
            }
            state.back = 0;
            for (;;) {
              here = state.lencode[hold & ((1 << state.lenbits) - 1)];  /*BITS(state.lenbits)*/
              here_bits = here >>> 24;
              here_op = (here >>> 16) & 0xff;
              here_val = here & 0xffff;
    
              if (here_bits <= bits) { break; }
              //--- PULLBYTE() ---//
              if (have === 0) { break inf_leave; }
              have--;
              hold += input[next++] << bits;
              bits += 8;
              //---//
            }
            if (here_op && (here_op & 0xf0) === 0) {
              last_bits = here_bits;
              last_op = here_op;
              last_val = here_val;
              for (;;) {
                here = state.lencode[last_val +
                        ((hold & ((1 << (last_bits + last_op)) - 1))/*BITS(last.bits + last.op)*/ >> last_bits)];
                here_bits = here >>> 24;
                here_op = (here >>> 16) & 0xff;
                here_val = here & 0xffff;
    
                if ((last_bits + here_bits) <= bits) { break; }
                //--- PULLBYTE() ---//
                if (have === 0) { break inf_leave; }
                have--;
                hold += input[next++] << bits;
                bits += 8;
                //---//
              }
              //--- DROPBITS(last.bits) ---//
              hold >>>= last_bits;
              bits -= last_bits;
              //---//
              state.back += last_bits;
            }
            //--- DROPBITS(here.bits) ---//
            hold >>>= here_bits;
            bits -= here_bits;
            //---//
            state.back += here_bits;
            state.length = here_val;
            if (here_op === 0) {
              //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
              //        "inflate:         literal '%c'\n" :
              //        "inflate:         literal 0x%02x\n", here.val));
              state.mode = LIT;
              break;
            }
            if (here_op & 32) {
              //Tracevv((stderr, "inflate:         end of block\n"));
              state.back = -1;
              state.mode = TYPE;
              break;
            }
            if (here_op & 64) {
              strm.msg = 'invalid literal/length code';
              state.mode = BAD;
              break;
            }
            state.extra = here_op & 15;
            state.mode = LENEXT;
            /* falls through */
          case LENEXT:
            if (state.extra) {
              //=== NEEDBITS(state.extra);
              n = state.extra;
              while (bits < n) {
                if (have === 0) { break inf_leave; }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              //===//
              state.length += hold & ((1 << state.extra) - 1)/*BITS(state.extra)*/;
              //--- DROPBITS(state.extra) ---//
              hold >>>= state.extra;
              bits -= state.extra;
              //---//
              state.back += state.extra;
            }
            //Tracevv((stderr, "inflate:         length %u\n", state.length));
            state.was = state.length;
            state.mode = DIST;
            /* falls through */
          case DIST:
            for (;;) {
              here = state.distcode[hold & ((1 << state.distbits) - 1)];/*BITS(state.distbits)*/
              here_bits = here >>> 24;
              here_op = (here >>> 16) & 0xff;
              here_val = here & 0xffff;
    
              if ((here_bits) <= bits) { break; }
              //--- PULLBYTE() ---//
              if (have === 0) { break inf_leave; }
              have--;
              hold += input[next++] << bits;
              bits += 8;
              //---//
            }
            if ((here_op & 0xf0) === 0) {
              last_bits = here_bits;
              last_op = here_op;
              last_val = here_val;
              for (;;) {
                here = state.distcode[last_val +
                        ((hold & ((1 << (last_bits + last_op)) - 1))/*BITS(last.bits + last.op)*/ >> last_bits)];
                here_bits = here >>> 24;
                here_op = (here >>> 16) & 0xff;
                here_val = here & 0xffff;
    
                if ((last_bits + here_bits) <= bits) { break; }
                //--- PULLBYTE() ---//
                if (have === 0) { break inf_leave; }
                have--;
                hold += input[next++] << bits;
                bits += 8;
                //---//
              }
              //--- DROPBITS(last.bits) ---//
              hold >>>= last_bits;
              bits -= last_bits;
              //---//
              state.back += last_bits;
            }
            //--- DROPBITS(here.bits) ---//
            hold >>>= here_bits;
            bits -= here_bits;
            //---//
            state.back += here_bits;
            if (here_op & 64) {
              strm.msg = 'invalid distance code';
              state.mode = BAD;
              break;
            }
            state.offset = here_val;
            state.extra = (here_op) & 15;
            state.mode = DISTEXT;
            /* falls through */
          case DISTEXT:
            if (state.extra) {
              //=== NEEDBITS(state.extra);
              n = state.extra;
              while (bits < n) {
                if (have === 0) { break inf_leave; }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              //===//
              state.offset += hold & ((1 << state.extra) - 1)/*BITS(state.extra)*/;
              //--- DROPBITS(state.extra) ---//
              hold >>>= state.extra;
              bits -= state.extra;
              //---//
              state.back += state.extra;
            }
    //#ifdef INFLATE_STRICT
            if (state.offset > state.dmax) {
              strm.msg = 'invalid distance too far back';
              state.mode = BAD;
              break;
            }
    //#endif
            //Tracevv((stderr, "inflate:         distance %u\n", state.offset));
            state.mode = MATCH;
            /* falls through */
          case MATCH:
            if (left === 0) { break inf_leave; }
            copy = _out - left;
            if (state.offset > copy) {         /* copy from window */
              copy = state.offset - copy;
              if (copy > state.whave) {
                if (state.sane) {
                  strm.msg = 'invalid distance too far back';
                  state.mode = BAD;
                  break;
                }
    // (!) This block is disabled in zlib defaults,
    // don't enable it for binary compatibility
    //#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
    //          Trace((stderr, "inflate.c too far\n"));
    //          copy -= state.whave;
    //          if (copy > state.length) { copy = state.length; }
    //          if (copy > left) { copy = left; }
    //          left -= copy;
    //          state.length -= copy;
    //          do {
    //            output[put++] = 0;
    //          } while (--copy);
    //          if (state.length === 0) { state.mode = LEN; }
    //          break;
    //#endif
              }
              if (copy > state.wnext) {
                copy -= state.wnext;
                from = state.wsize - copy;
              }
              else {
                from = state.wnext - copy;
              }
              if (copy > state.length) { copy = state.length; }
              from_source = state.window;
            }
            else {                              /* copy from output */
              from_source = output;
              from = put - state.offset;
              copy = state.length;
            }
            if (copy > left) { copy = left; }
            left -= copy;
            state.length -= copy;
            do {
              output[put++] = from_source[from++];
            } while (--copy);
            if (state.length === 0) { state.mode = LEN; }
            break;
          case LIT:
            if (left === 0) { break inf_leave; }
            output[put++] = state.length;
            left--;
            state.mode = LEN;
            break;
          case CHECK:
            if (state.wrap) {
              //=== NEEDBITS(32);
              while (bits < 32) {
                if (have === 0) { break inf_leave; }
                have--;
                // Use '|' instead of '+' to make sure that result is signed
                hold |= input[next++] << bits;
                bits += 8;
              }
              //===//
              _out -= left;
              strm.total_out += _out;
              state.total += _out;
              if (_out) {
                strm.adler = state.check =
                    /*UPDATE(state.check, put - _out, _out);*/
                    (state.flags ? crc32(state.check, output, _out, put - _out) : adler32(state.check, output, _out, put - _out));
    
              }
              _out = left;
              // NB: crc32 stored as signed 32-bit int, zswap32 returns signed too
              if ((state.flags ? hold : zswap32(hold)) !== state.check) {
                strm.msg = 'incorrect data check';
                state.mode = BAD;
                break;
              }
              //=== INITBITS();
              hold = 0;
              bits = 0;
              //===//
              //Tracev((stderr, "inflate:   check matches trailer\n"));
            }
            state.mode = LENGTH;
            /* falls through */
          case LENGTH:
            if (state.wrap && state.flags) {
              //=== NEEDBITS(32);
              while (bits < 32) {
                if (have === 0) { break inf_leave; }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              //===//
              if (hold !== (state.total & 0xffffffff)) {
                strm.msg = 'incorrect length check';
                state.mode = BAD;
                break;
              }
              //=== INITBITS();
              hold = 0;
              bits = 0;
              //===//
              //Tracev((stderr, "inflate:   length matches trailer\n"));
            }
            state.mode = DONE;
            /* falls through */
          case DONE:
            ret = Z_STREAM_END;
            break inf_leave;
          case BAD:
            ret = Z_DATA_ERROR;
            break inf_leave;
          case MEM:
            return Z_MEM_ERROR;
          case SYNC:
            /* falls through */
          default:
            return Z_STREAM_ERROR;
        }
      }
    
      // inf_leave <- here is real place for "goto inf_leave", emulated via "break inf_leave"
    
      /*
         Return from inflate(), updating the total counts and the check value.
         If there was no progress during the inflate() call, return a buffer
         error.  Call updatewindow() to create and/or update the window state.
         Note: a memory error from inflate() is non-recoverable.
       */
    
      //--- RESTORE() ---
      strm.next_out = put;
      strm.avail_out = left;
      strm.next_in = next;
      strm.avail_in = have;
      state.hold = hold;
      state.bits = bits;
      //---
    
      if (state.wsize || (_out !== strm.avail_out && state.mode < BAD &&
                          (state.mode < CHECK || flush !== Z_FINISH))) {
        if (updatewindow(strm, strm.output, strm.next_out, _out - strm.avail_out)) {
          state.mode = MEM;
          return Z_MEM_ERROR;
        }
      }
      _in -= strm.avail_in;
      _out -= strm.avail_out;
      strm.total_in += _in;
      strm.total_out += _out;
      state.total += _out;
      if (state.wrap && _out) {
        strm.adler = state.check = /*UPDATE(state.check, strm.next_out - _out, _out);*/
          (state.flags ? crc32(state.check, output, _out, strm.next_out - _out) : adler32(state.check, output, _out, strm.next_out - _out));
      }
      strm.data_type = state.bits + (state.last ? 64 : 0) +
                        (state.mode === TYPE ? 128 : 0) +
                        (state.mode === LEN_ || state.mode === COPY_ ? 256 : 0);
      if (((_in === 0 && _out === 0) || flush === Z_FINISH) && ret === Z_OK) {
        ret = Z_BUF_ERROR;
      }
      return ret;
    };
    
    
    const inflateEnd = (strm) => {
    
      if (!strm || !strm.state /*|| strm->zfree == (free_func)0*/) {
        return Z_STREAM_ERROR;
      }
    
      let state = strm.state;
      if (state.window) {
        state.window = null;
      }
      strm.state = null;
      return Z_OK;
    };
    
    
    const inflateGetHeader = (strm, head) => {
    
      /* check state */
      if (!strm || !strm.state) { return Z_STREAM_ERROR; }
      const state = strm.state;
      if ((state.wrap & 2) === 0) { return Z_STREAM_ERROR; }
    
      /* save header structure */
      state.head = head;
      head.done = false;
      return Z_OK;
    };
    
    
    const inflateSetDictionary = (strm, dictionary) => {
      const dictLength = dictionary.length;
    
      let state;
      let dictid;
      let ret;
    
      /* check state */
      if (!strm /* == Z_NULL */ || !strm.state /* == Z_NULL */) { return Z_STREAM_ERROR; }
      state = strm.state;
    
      if (state.wrap !== 0 && state.mode !== DICT) {
        return Z_STREAM_ERROR;
      }
    
      /* check for correct dictionary identifier */
      if (state.mode === DICT) {
        dictid = 1; /* adler32(0, null, 0)*/
        /* dictid = adler32(dictid, dictionary, dictLength); */
        dictid = adler32(dictid, dictionary, dictLength, 0);
        if (dictid !== state.check) {
          return Z_DATA_ERROR;
        }
      }
      /* copy dictionary to window using updatewindow(), which will amend the
       existing dictionary if appropriate */
      ret = updatewindow(strm, dictionary, dictLength, dictLength);
      if (ret) {
        state.mode = MEM;
        return Z_MEM_ERROR;
      }
      state.havedict = 1;
      // Tracev((stderr, "inflate:   dictionary set\n"));
      return Z_OK;
    };
    
    
    module.exports.inflateReset = inflateReset;
    module.exports.inflateReset2 = inflateReset2;
    module.exports.inflateResetKeep = inflateResetKeep;
    module.exports.inflateInit = inflateInit;
    module.exports.inflateInit2 = inflateInit2;
    module.exports.inflate = inflate;
    module.exports.inflateEnd = inflateEnd;
    module.exports.inflateGetHeader = inflateGetHeader;
    module.exports.inflateSetDictionary = inflateSetDictionary;
    module.exports.inflateInfo = 'pako inflate (from Nodeca project)';
    
    /* Not implemented
    module.exports.inflateCopy = inflateCopy;
    module.exports.inflateGetDictionary = inflateGetDictionary;
    module.exports.inflateMark = inflateMark;
    module.exports.inflatePrime = inflatePrime;
    module.exports.inflateSync = inflateSync;
    module.exports.inflateSyncPoint = inflateSyncPoint;
    module.exports.inflateUndermine = inflateUndermine;
    */
    
    },{"./adler32":55,"./constants":56,"./crc32":57,"./inffast":60,"./inftrees":62}],62:[function(require,module,exports){
    'use strict';
    
    // (C) 1995-2013 Jean-loup Gailly and Mark Adler
    // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
    //
    // This software is provided 'as-is', without any express or implied
    // warranty. In no event will the authors be held liable for any damages
    // arising from the use of this software.
    //
    // Permission is granted to anyone to use this software for any purpose,
    // including commercial applications, and to alter it and redistribute it
    // freely, subject to the following restrictions:
    //
    // 1. The origin of this software must not be misrepresented; you must not
    //   claim that you wrote the original software. If you use this software
    //   in a product, an acknowledgment in the product documentation would be
    //   appreciated but is not required.
    // 2. Altered source versions must be plainly marked as such, and must not be
    //   misrepresented as being the original software.
    // 3. This notice may not be removed or altered from any source distribution.
    
    const MAXBITS = 15;
    const ENOUGH_LENS = 852;
    const ENOUGH_DISTS = 592;
    //const ENOUGH = (ENOUGH_LENS+ENOUGH_DISTS);
    
    const CODES = 0;
    const LENS = 1;
    const DISTS = 2;
    
    const lbase = new Uint16Array([ /* Length codes 257..285 base */
      3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31,
      35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0
    ]);
    
    const lext = new Uint8Array([ /* Length codes 257..285 extra */
      16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18,
      19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78
    ]);
    
    const dbase = new Uint16Array([ /* Distance codes 0..29 base */
      1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193,
      257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145,
      8193, 12289, 16385, 24577, 0, 0
    ]);
    
    const dext = new Uint8Array([ /* Distance codes 0..29 extra */
      16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22,
      23, 23, 24, 24, 25, 25, 26, 26, 27, 27,
      28, 28, 29, 29, 64, 64
    ]);
    
    const inflate_table = (type, lens, lens_index, codes, table, table_index, work, opts) =>
    {
      const bits = opts.bits;
          //here = opts.here; /* table entry for duplication */
    
      let len = 0;               /* a code's length in bits */
      let sym = 0;               /* index of code symbols */
      let min = 0, max = 0;          /* minimum and maximum code lengths */
      let root = 0;              /* number of index bits for root table */
      let curr = 0;              /* number of index bits for current table */
      let drop = 0;              /* code bits to drop for sub-table */
      let left = 0;                   /* number of prefix codes available */
      let used = 0;              /* code entries in table used */
      let huff = 0;              /* Huffman code */
      let incr;              /* for incrementing code, index */
      let fill;              /* index for replicating entries */
      let low;               /* low bits for current root entry */
      let mask;              /* mask for low root bits */
      let next;             /* next available space in table */
      let base = null;     /* base value table to use */
      let base_index = 0;
    //  let shoextra;    /* extra bits table to use */
      let end;                    /* use base and extra for symbol > end */
      const count = new Uint16Array(MAXBITS + 1); //[MAXBITS+1];    /* number of codes of each length */
      const offs = new Uint16Array(MAXBITS + 1); //[MAXBITS+1];     /* offsets in table for each length */
      let extra = null;
      let extra_index = 0;
    
      let here_bits, here_op, here_val;
    
      /*
       Process a set of code lengths to create a canonical Huffman code.  The
       code lengths are lens[0..codes-1].  Each length corresponds to the
       symbols 0..codes-1.  The Huffman code is generated by first sorting the
       symbols by length from short to long, and retaining the symbol order
       for codes with equal lengths.  Then the code starts with all zero bits
       for the first code of the shortest length, and the codes are integer
       increments for the same length, and zeros are appended as the length
       increases.  For the deflate format, these bits are stored backwards
       from their more natural integer increment ordering, and so when the
       decoding tables are built in the large loop below, the integer codes
       are incremented backwards.
    
       This routine assumes, but does not check, that all of the entries in
       lens[] are in the range 0..MAXBITS.  The caller must assure this.
       1..MAXBITS is interpreted as that code length.  zero means that that
       symbol does not occur in this code.
    
       The codes are sorted by computing a count of codes for each length,
       creating from that a table of starting indices for each length in the
       sorted table, and then entering the symbols in order in the sorted
       table.  The sorted table is work[], with that space being provided by
       the caller.
    
       The length counts are used for other purposes as well, i.e. finding
       the minimum and maximum length codes, determining if there are any
       codes at all, checking for a valid set of lengths, and looking ahead
       at length counts to determine sub-table sizes when building the
       decoding tables.
       */
    
      /* accumulate lengths for codes (assumes lens[] all in 0..MAXBITS) */
      for (len = 0; len <= MAXBITS; len++) {
        count[len] = 0;
      }
      for (sym = 0; sym < codes; sym++) {
        count[lens[lens_index + sym]]++;
      }
    
      /* bound code lengths, force root to be within code lengths */
      root = bits;
      for (max = MAXBITS; max >= 1; max--) {
        if (count[max] !== 0) { break; }
      }
      if (root > max) {
        root = max;
      }
      if (max === 0) {                     /* no symbols to code at all */
        //table.op[opts.table_index] = 64;  //here.op = (var char)64;    /* invalid code marker */
        //table.bits[opts.table_index] = 1;   //here.bits = (var char)1;
        //table.val[opts.table_index++] = 0;   //here.val = (var short)0;
        table[table_index++] = (1 << 24) | (64 << 16) | 0;
    
    
        //table.op[opts.table_index] = 64;
        //table.bits[opts.table_index] = 1;
        //table.val[opts.table_index++] = 0;
        table[table_index++] = (1 << 24) | (64 << 16) | 0;
    
        opts.bits = 1;
        return 0;     /* no symbols, but wait for decoding to report error */
      }
      for (min = 1; min < max; min++) {
        if (count[min] !== 0) { break; }
      }
      if (root < min) {
        root = min;
      }
    
      /* check for an over-subscribed or incomplete set of lengths */
      left = 1;
      for (len = 1; len <= MAXBITS; len++) {
        left <<= 1;
        left -= count[len];
        if (left < 0) {
          return -1;
        }        /* over-subscribed */
      }
      if (left > 0 && (type === CODES || max !== 1)) {
        return -1;                      /* incomplete set */
      }
    
      /* generate offsets into symbol table for each length for sorting */
      offs[1] = 0;
      for (len = 1; len < MAXBITS; len++) {
        offs[len + 1] = offs[len] + count[len];
      }
    
      /* sort symbols by length, by symbol order within each length */
      for (sym = 0; sym < codes; sym++) {
        if (lens[lens_index + sym] !== 0) {
          work[offs[lens[lens_index + sym]]++] = sym;
        }
      }
    
      /*
       Create and fill in decoding tables.  In this loop, the table being
       filled is at next and has curr index bits.  The code being used is huff
       with length len.  That code is converted to an index by dropping drop
       bits off of the bottom.  For codes where len is less than drop + curr,
       those top drop + curr - len bits are incremented through all values to
       fill the table with replicated entries.
    
       root is the number of index bits for the root table.  When len exceeds
       root, sub-tables are created pointed to by the root entry with an index
       of the low root bits of huff.  This is saved in low to check for when a
       new sub-table should be started.  drop is zero when the root table is
       being filled, and drop is root when sub-tables are being filled.
    
       When a new sub-table is needed, it is necessary to look ahead in the
       code lengths to determine what size sub-table is needed.  The length
       counts are used for this, and so count[] is decremented as codes are
       entered in the tables.
    
       used keeps track of how many table entries have been allocated from the
       provided *table space.  It is checked for LENS and DIST tables against
       the constants ENOUGH_LENS and ENOUGH_DISTS to guard against changes in
       the initial root table size constants.  See the comments in inftrees.h
       for more information.
    
       sym increments through all symbols, and the loop terminates when
       all codes of length max, i.e. all codes, have been processed.  This
       routine permits incomplete codes, so another loop after this one fills
       in the rest of the decoding tables with invalid code markers.
       */
    
      /* set up for code type */
      // poor man optimization - use if-else instead of switch,
      // to avoid deopts in old v8
      if (type === CODES) {
        base = extra = work;    /* dummy value--not used */
        end = 19;
    
      } else if (type === LENS) {
        base = lbase;
        base_index -= 257;
        extra = lext;
        extra_index -= 257;
        end = 256;
    
      } else {                    /* DISTS */
        base = dbase;
        extra = dext;
        end = -1;
      }
    
      /* initialize opts for loop */
      huff = 0;                   /* starting code */
      sym = 0;                    /* starting code symbol */
      len = min;                  /* starting code length */
      next = table_index;              /* current table to fill in */
      curr = root;                /* current table index bits */
      drop = 0;                   /* current bits to drop from code for index */
      low = -1;                   /* trigger new sub-table when len > root */
      used = 1 << root;          /* use root table entries */
      mask = used - 1;            /* mask for comparing low */
    
      /* check available table space */
      if ((type === LENS && used > ENOUGH_LENS) ||
        (type === DISTS && used > ENOUGH_DISTS)) {
        return 1;
      }
    
      /* process all codes and make table entries */
      for (;;) {
        /* create table entry */
        here_bits = len - drop;
        if (work[sym] < end) {
          here_op = 0;
          here_val = work[sym];
        }
        else if (work[sym] > end) {
          here_op = extra[extra_index + work[sym]];
          here_val = base[base_index + work[sym]];
        }
        else {
          here_op = 32 + 64;         /* end of block */
          here_val = 0;
        }
    
        /* replicate for those indices with low len bits equal to huff */
        incr = 1 << (len - drop);
        fill = 1 << curr;
        min = fill;                 /* save offset to next table */
        do {
          fill -= incr;
          table[next + (huff >> drop) + fill] = (here_bits << 24) | (here_op << 16) | here_val |0;
        } while (fill !== 0);
    
        /* backwards increment the len-bit code huff */
        incr = 1 << (len - 1);
        while (huff & incr) {
          incr >>= 1;
        }
        if (incr !== 0) {
          huff &= incr - 1;
          huff += incr;
        } else {
          huff = 0;
        }
    
        /* go to next symbol, update count, len */
        sym++;
        if (--count[len] === 0) {
          if (len === max) { break; }
          len = lens[lens_index + work[sym]];
        }
    
        /* create new sub-table if needed */
        if (len > root && (huff & mask) !== low) {
          /* if first time, transition to sub-tables */
          if (drop === 0) {
            drop = root;
          }
    
          /* increment past last table */
          next += min;            /* here min is 1 << curr */
    
          /* determine length of next table */
          curr = len - drop;
          left = 1 << curr;
          while (curr + drop < max) {
            left -= count[curr + drop];
            if (left <= 0) { break; }
            curr++;
            left <<= 1;
          }
    
          /* check for enough space */
          used += 1 << curr;
          if ((type === LENS && used > ENOUGH_LENS) ||
            (type === DISTS && used > ENOUGH_DISTS)) {
            return 1;
          }
    
          /* point entry in root table to sub-table */
          low = huff & mask;
          /*table.op[low] = curr;
          table.bits[low] = root;
          table.val[low] = next - opts.table_index;*/
          table[low] = (root << 24) | (curr << 16) | (next - table_index) |0;
        }
      }
    
      /* fill in remaining table entry if code is incomplete (guaranteed to have
       at most one remaining entry, since if the code is incomplete, the
       maximum code length that was allowed to get this far is one bit) */
      if (huff !== 0) {
        //table.op[next + huff] = 64;            /* invalid code marker */
        //table.bits[next + huff] = len - drop;
        //table.val[next + huff] = 0;
        table[next + huff] = ((len - drop) << 24) | (64 << 16) |0;
      }
    
      /* set return parameters */
      //opts.table_index += used;
      opts.bits = root;
      return 0;
    };
    
    
    module.exports = inflate_table;
    
    },{}],63:[function(require,module,exports){
    'use strict';
    
    // (C) 1995-2013 Jean-loup Gailly and Mark Adler
    // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
    //
    // This software is provided 'as-is', without any express or implied
    // warranty. In no event will the authors be held liable for any damages
    // arising from the use of this software.
    //
    // Permission is granted to anyone to use this software for any purpose,
    // including commercial applications, and to alter it and redistribute it
    // freely, subject to the following restrictions:
    //
    // 1. The origin of this software must not be misrepresented; you must not
    //   claim that you wrote the original software. If you use this software
    //   in a product, an acknowledgment in the product documentation would be
    //   appreciated but is not required.
    // 2. Altered source versions must be plainly marked as such, and must not be
    //   misrepresented as being the original software.
    // 3. This notice may not be removed or altered from any source distribution.
    
    module.exports = {
      2:      'need dictionary',     /* Z_NEED_DICT       2  */
      1:      'stream end',          /* Z_STREAM_END      1  */
      0:      '',                    /* Z_OK              0  */
      '-1':   'file error',          /* Z_ERRNO         (-1) */
      '-2':   'stream error',        /* Z_STREAM_ERROR  (-2) */
      '-3':   'data error',          /* Z_DATA_ERROR    (-3) */
      '-4':   'insufficient memory', /* Z_MEM_ERROR     (-4) */
      '-5':   'buffer error',        /* Z_BUF_ERROR     (-5) */
      '-6':   'incompatible version' /* Z_VERSION_ERROR (-6) */
    };
    
    },{}],64:[function(require,module,exports){
    'use strict';
    
    // (C) 1995-2013 Jean-loup Gailly and Mark Adler
    // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
    //
    // This software is provided 'as-is', without any express or implied
    // warranty. In no event will the authors be held liable for any damages
    // arising from the use of this software.
    //
    // Permission is granted to anyone to use this software for any purpose,
    // including commercial applications, and to alter it and redistribute it
    // freely, subject to the following restrictions:
    //
    // 1. The origin of this software must not be misrepresented; you must not
    //   claim that you wrote the original software. If you use this software
    //   in a product, an acknowledgment in the product documentation would be
    //   appreciated but is not required.
    // 2. Altered source versions must be plainly marked as such, and must not be
    //   misrepresented as being the original software.
    // 3. This notice may not be removed or altered from any source distribution.
    
    /* eslint-disable space-unary-ops */
    
    /* Public constants ==========================================================*/
    /* ===========================================================================*/
    
    
    //const Z_FILTERED          = 1;
    //const Z_HUFFMAN_ONLY      = 2;
    //const Z_RLE               = 3;
    const Z_FIXED               = 4;
    //const Z_DEFAULT_STRATEGY  = 0;
    
    /* Possible values of the data_type field (though see inflate()) */
    const Z_BINARY              = 0;
    const Z_TEXT                = 1;
    //const Z_ASCII             = 1; // = Z_TEXT
    const Z_UNKNOWN             = 2;
    
    /*============================================================================*/
    
    
    function zero(buf) { let len = buf.length; while (--len >= 0) { buf[len] = 0; } }
    
    // From zutil.h
    
    const STORED_BLOCK = 0;
    const STATIC_TREES = 1;
    const DYN_TREES    = 2;
    /* The three kinds of block type */
    
    const MIN_MATCH    = 3;
    const MAX_MATCH    = 258;
    /* The minimum and maximum match lengths */
    
    // From deflate.h
    /* ===========================================================================
     * Internal compression state.
     */
    
    const LENGTH_CODES  = 29;
    /* number of length codes, not counting the special END_BLOCK code */
    
    const LITERALS      = 256;
    /* number of literal bytes 0..255 */
    
    const L_CODES       = LITERALS + 1 + LENGTH_CODES;
    /* number of Literal or Length codes, including the END_BLOCK code */
    
    const D_CODES       = 30;
    /* number of distance codes */
    
    const BL_CODES      = 19;
    /* number of codes used to transfer the bit lengths */
    
    const HEAP_SIZE     = 2 * L_CODES + 1;
    /* maximum heap size */
    
    const MAX_BITS      = 15;
    /* All codes must not exceed MAX_BITS bits */
    
    const Buf_size      = 16;
    /* size of bit buffer in bi_buf */
    
    
    /* ===========================================================================
     * Constants
     */
    
    const MAX_BL_BITS = 7;
    /* Bit length codes must not exceed MAX_BL_BITS bits */
    
    const END_BLOCK   = 256;
    /* end of block literal code */
    
    const REP_3_6     = 16;
    /* repeat previous bit length 3-6 times (2 bits of repeat count) */
    
    const REPZ_3_10   = 17;
    /* repeat a zero length 3-10 times  (3 bits of repeat count) */
    
    const REPZ_11_138 = 18;
    /* repeat a zero length 11-138 times  (7 bits of repeat count) */
    
    /* eslint-disable comma-spacing,array-bracket-spacing */
    const extra_lbits =   /* extra bits for each length code */
      new Uint8Array([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0]);
    
    const extra_dbits =   /* extra bits for each distance code */
      new Uint8Array([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13]);
    
    const extra_blbits =  /* extra bits for each bit length code */
      new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7]);
    
    const bl_order =
      new Uint8Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]);
    /* eslint-enable comma-spacing,array-bracket-spacing */
    
    /* The lengths of the bit length codes are sent in order of decreasing
     * probability, to avoid transmitting the lengths for unused bit length codes.
     */
    
    /* ===========================================================================
     * Local data. These are initialized only once.
     */
    
    // We pre-fill arrays with 0 to avoid uninitialized gaps
    
    const DIST_CODE_LEN = 512; /* see definition of array dist_code below */
    
    // !!!! Use flat array instead of structure, Freq = i*2, Len = i*2+1
    const static_ltree  = new Array((L_CODES + 2) * 2);
    zero(static_ltree);
    /* The static literal tree. Since the bit lengths are imposed, there is no
     * need for the L_CODES extra codes used during heap construction. However
     * The codes 286 and 287 are needed to build a canonical tree (see _tr_init
     * below).
     */
    
    const static_dtree  = new Array(D_CODES * 2);
    zero(static_dtree);
    /* The static distance tree. (Actually a trivial tree since all codes use
     * 5 bits.)
     */
    
    const _dist_code    = new Array(DIST_CODE_LEN);
    zero(_dist_code);
    /* Distance codes. The first 256 values correspond to the distances
     * 3 .. 258, the last 256 values correspond to the top 8 bits of
     * the 15 bit distances.
     */
    
    const _length_code  = new Array(MAX_MATCH - MIN_MATCH + 1);
    zero(_length_code);
    /* length code for each normalized match length (0 == MIN_MATCH) */
    
    const base_length   = new Array(LENGTH_CODES);
    zero(base_length);
    /* First normalized length for each code (0 = MIN_MATCH) */
    
    const base_dist     = new Array(D_CODES);
    zero(base_dist);
    /* First normalized distance for each code (0 = distance of 1) */
    
    
    function StaticTreeDesc(static_tree, extra_bits, extra_base, elems, max_length) {
    
      this.static_tree  = static_tree;  /* static tree or NULL */
      this.extra_bits   = extra_bits;   /* extra bits for each code or NULL */
      this.extra_base   = extra_base;   /* base index for extra_bits */
      this.elems        = elems;        /* max number of elements in the tree */
      this.max_length   = max_length;   /* max bit length for the codes */
    
      // show if `static_tree` has data or dummy - needed for monomorphic objects
      this.has_stree    = static_tree && static_tree.length;
    }
    
    
    let static_l_desc;
    let static_d_desc;
    let static_bl_desc;
    
    
    function TreeDesc(dyn_tree, stat_desc) {
      this.dyn_tree = dyn_tree;     /* the dynamic tree */
      this.max_code = 0;            /* largest code with non zero frequency */
      this.stat_desc = stat_desc;   /* the corresponding static tree */
    }
    
    
    
    const d_code = (dist) => {
    
      return dist < 256 ? _dist_code[dist] : _dist_code[256 + (dist >>> 7)];
    };
    
    
    /* ===========================================================================
     * Output a short LSB first on the stream.
     * IN assertion: there is enough room in pendingBuf.
     */
    const put_short = (s, w) => {
    //    put_byte(s, (uch)((w) & 0xff));
    //    put_byte(s, (uch)((ush)(w) >> 8));
      s.pending_buf[s.pending++] = (w) & 0xff;
      s.pending_buf[s.pending++] = (w >>> 8) & 0xff;
    };
    
    
    /* ===========================================================================
     * Send a value on a given number of bits.
     * IN assertion: length <= 16 and value fits in length bits.
     */
    const send_bits = (s, value, length) => {
    
      if (s.bi_valid > (Buf_size - length)) {
        s.bi_buf |= (value << s.bi_valid) & 0xffff;
        put_short(s, s.bi_buf);
        s.bi_buf = value >> (Buf_size - s.bi_valid);
        s.bi_valid += length - Buf_size;
      } else {
        s.bi_buf |= (value << s.bi_valid) & 0xffff;
        s.bi_valid += length;
      }
    };
    
    
    const send_code = (s, c, tree) => {
    
      send_bits(s, tree[c * 2]/*.Code*/, tree[c * 2 + 1]/*.Len*/);
    };
    
    
    /* ===========================================================================
     * Reverse the first len bits of a code, using straightforward code (a faster
     * method would use a table)
     * IN assertion: 1 <= len <= 15
     */
    const bi_reverse = (code, len) => {
    
      let res = 0;
      do {
        res |= code & 1;
        code >>>= 1;
        res <<= 1;
      } while (--len > 0);
      return res >>> 1;
    };
    
    
    /* ===========================================================================
     * Flush the bit buffer, keeping at most 7 bits in it.
     */
    const bi_flush = (s) => {
    
      if (s.bi_valid === 16) {
        put_short(s, s.bi_buf);
        s.bi_buf = 0;
        s.bi_valid = 0;
    
      } else if (s.bi_valid >= 8) {
        s.pending_buf[s.pending++] = s.bi_buf & 0xff;
        s.bi_buf >>= 8;
        s.bi_valid -= 8;
      }
    };
    
    
    /* ===========================================================================
     * Compute the optimal bit lengths for a tree and update the total bit length
     * for the current block.
     * IN assertion: the fields freq and dad are set, heap[heap_max] and
     *    above are the tree nodes sorted by increasing frequency.
     * OUT assertions: the field len is set to the optimal bit length, the
     *     array bl_count contains the frequencies for each bit length.
     *     The length opt_len is updated; static_len is also updated if stree is
     *     not null.
     */
    const gen_bitlen = (s, desc) =>
    //    deflate_state *s;
    //    tree_desc *desc;    /* the tree descriptor */
    {
      const tree            = desc.dyn_tree;
      const max_code        = desc.max_code;
      const stree           = desc.stat_desc.static_tree;
      const has_stree       = desc.stat_desc.has_stree;
      const extra           = desc.stat_desc.extra_bits;
      const base            = desc.stat_desc.extra_base;
      const max_length      = desc.stat_desc.max_length;
      let h;              /* heap index */
      let n, m;           /* iterate over the tree elements */
      let bits;           /* bit length */
      let xbits;          /* extra bits */
      let f;              /* frequency */
      let overflow = 0;   /* number of elements with bit length too large */
    
      for (bits = 0; bits <= MAX_BITS; bits++) {
        s.bl_count[bits] = 0;
      }
    
      /* In a first pass, compute the optimal bit lengths (which may
       * overflow in the case of the bit length tree).
       */
      tree[s.heap[s.heap_max] * 2 + 1]/*.Len*/ = 0; /* root of the heap */
    
      for (h = s.heap_max + 1; h < HEAP_SIZE; h++) {
        n = s.heap[h];
        bits = tree[tree[n * 2 + 1]/*.Dad*/ * 2 + 1]/*.Len*/ + 1;
        if (bits > max_length) {
          bits = max_length;
          overflow++;
        }
        tree[n * 2 + 1]/*.Len*/ = bits;
        /* We overwrite tree[n].Dad which is no longer needed */
    
        if (n > max_code) { continue; } /* not a leaf node */
    
        s.bl_count[bits]++;
        xbits = 0;
        if (n >= base) {
          xbits = extra[n - base];
        }
        f = tree[n * 2]/*.Freq*/;
        s.opt_len += f * (bits + xbits);
        if (has_stree) {
          s.static_len += f * (stree[n * 2 + 1]/*.Len*/ + xbits);
        }
      }
      if (overflow === 0) { return; }
    
      // Trace((stderr,"\nbit length overflow\n"));
      /* This happens for example on obj2 and pic of the Calgary corpus */
    
      /* Find the first bit length which could increase: */
      do {
        bits = max_length - 1;
        while (s.bl_count[bits] === 0) { bits--; }
        s.bl_count[bits]--;      /* move one leaf down the tree */
        s.bl_count[bits + 1] += 2; /* move one overflow item as its brother */
        s.bl_count[max_length]--;
        /* The brother of the overflow item also moves one step up,
         * but this does not affect bl_count[max_length]
         */
        overflow -= 2;
      } while (overflow > 0);
    
      /* Now recompute all bit lengths, scanning in increasing frequency.
       * h is still equal to HEAP_SIZE. (It is simpler to reconstruct all
       * lengths instead of fixing only the wrong ones. This idea is taken
       * from 'ar' written by Haruhiko Okumura.)
       */
      for (bits = max_length; bits !== 0; bits--) {
        n = s.bl_count[bits];
        while (n !== 0) {
          m = s.heap[--h];
          if (m > max_code) { continue; }
          if (tree[m * 2 + 1]/*.Len*/ !== bits) {
            // Trace((stderr,"code %d bits %d->%d\n", m, tree[m].Len, bits));
            s.opt_len += (bits - tree[m * 2 + 1]/*.Len*/) * tree[m * 2]/*.Freq*/;
            tree[m * 2 + 1]/*.Len*/ = bits;
          }
          n--;
        }
      }
    };
    
    
    /* ===========================================================================
     * Generate the codes for a given tree and bit counts (which need not be
     * optimal).
     * IN assertion: the array bl_count contains the bit length statistics for
     * the given tree and the field len is set for all tree elements.
     * OUT assertion: the field code is set for all tree elements of non
     *     zero code length.
     */
    const gen_codes = (tree, max_code, bl_count) =>
    //    ct_data *tree;             /* the tree to decorate */
    //    int max_code;              /* largest code with non zero frequency */
    //    ushf *bl_count;            /* number of codes at each bit length */
    {
      const next_code = new Array(MAX_BITS + 1); /* next code value for each bit length */
      let code = 0;              /* running code value */
      let bits;                  /* bit index */
      let n;                     /* code index */
    
      /* The distribution counts are first used to generate the code values
       * without bit reversal.
       */
      for (bits = 1; bits <= MAX_BITS; bits++) {
        next_code[bits] = code = (code + bl_count[bits - 1]) << 1;
      }
      /* Check that the bit counts in bl_count are consistent. The last code
       * must be all ones.
       */
      //Assert (code + bl_count[MAX_BITS]-1 == (1<<MAX_BITS)-1,
      //        "inconsistent bit counts");
      //Tracev((stderr,"\ngen_codes: max_code %d ", max_code));
    
      for (n = 0;  n <= max_code; n++) {
        let len = tree[n * 2 + 1]/*.Len*/;
        if (len === 0) { continue; }
        /* Now reverse the bits */
        tree[n * 2]/*.Code*/ = bi_reverse(next_code[len]++, len);
    
        //Tracecv(tree != static_ltree, (stderr,"\nn %3d %c l %2d c %4x (%x) ",
        //     n, (isgraph(n) ? n : ' '), len, tree[n].Code, next_code[len]-1));
      }
    };
    
    
    /* ===========================================================================
     * Initialize the various 'constant' tables.
     */
    const tr_static_init = () => {
    
      let n;        /* iterates over tree elements */
      let bits;     /* bit counter */
      let length;   /* length value */
      let code;     /* code value */
      let dist;     /* distance index */
      const bl_count = new Array(MAX_BITS + 1);
      /* number of codes at each bit length for an optimal tree */
    
      // do check in _tr_init()
      //if (static_init_done) return;
    
      /* For some embedded targets, global variables are not initialized: */
    /*#ifdef NO_INIT_GLOBAL_POINTERS
      static_l_desc.static_tree = static_ltree;
      static_l_desc.extra_bits = extra_lbits;
      static_d_desc.static_tree = static_dtree;
      static_d_desc.extra_bits = extra_dbits;
      static_bl_desc.extra_bits = extra_blbits;
    #endif*/
    
      /* Initialize the mapping length (0..255) -> length code (0..28) */
      length = 0;
      for (code = 0; code < LENGTH_CODES - 1; code++) {
        base_length[code] = length;
        for (n = 0; n < (1 << extra_lbits[code]); n++) {
          _length_code[length++] = code;
        }
      }
      //Assert (length == 256, "tr_static_init: length != 256");
      /* Note that the length 255 (match length 258) can be represented
       * in two different ways: code 284 + 5 bits or code 285, so we
       * overwrite length_code[255] to use the best encoding:
       */
      _length_code[length - 1] = code;
    
      /* Initialize the mapping dist (0..32K) -> dist code (0..29) */
      dist = 0;
      for (code = 0; code < 16; code++) {
        base_dist[code] = dist;
        for (n = 0; n < (1 << extra_dbits[code]); n++) {
          _dist_code[dist++] = code;
        }
      }
      //Assert (dist == 256, "tr_static_init: dist != 256");
      dist >>= 7; /* from now on, all distances are divided by 128 */
      for (; code < D_CODES; code++) {
        base_dist[code] = dist << 7;
        for (n = 0; n < (1 << (extra_dbits[code] - 7)); n++) {
          _dist_code[256 + dist++] = code;
        }
      }
      //Assert (dist == 256, "tr_static_init: 256+dist != 512");
    
      /* Construct the codes of the static literal tree */
      for (bits = 0; bits <= MAX_BITS; bits++) {
        bl_count[bits] = 0;
      }
    
      n = 0;
      while (n <= 143) {
        static_ltree[n * 2 + 1]/*.Len*/ = 8;
        n++;
        bl_count[8]++;
      }
      while (n <= 255) {
        static_ltree[n * 2 + 1]/*.Len*/ = 9;
        n++;
        bl_count[9]++;
      }
      while (n <= 279) {
        static_ltree[n * 2 + 1]/*.Len*/ = 7;
        n++;
        bl_count[7]++;
      }
      while (n <= 287) {
        static_ltree[n * 2 + 1]/*.Len*/ = 8;
        n++;
        bl_count[8]++;
      }
      /* Codes 286 and 287 do not exist, but we must include them in the
       * tree construction to get a canonical Huffman tree (longest code
       * all ones)
       */
      gen_codes(static_ltree, L_CODES + 1, bl_count);
    
      /* The static distance tree is trivial: */
      for (n = 0; n < D_CODES; n++) {
        static_dtree[n * 2 + 1]/*.Len*/ = 5;
        static_dtree[n * 2]/*.Code*/ = bi_reverse(n, 5);
      }
    
      // Now data ready and we can init static trees
      static_l_desc = new StaticTreeDesc(static_ltree, extra_lbits, LITERALS + 1, L_CODES, MAX_BITS);
      static_d_desc = new StaticTreeDesc(static_dtree, extra_dbits, 0,          D_CODES, MAX_BITS);
      static_bl_desc = new StaticTreeDesc(new Array(0), extra_blbits, 0,         BL_CODES, MAX_BL_BITS);
    
      //static_init_done = true;
    };
    
    
    /* ===========================================================================
     * Initialize a new block.
     */
    const init_block = (s) => {
    
      let n; /* iterates over tree elements */
    
      /* Initialize the trees. */
      for (n = 0; n < L_CODES;  n++) { s.dyn_ltree[n * 2]/*.Freq*/ = 0; }
      for (n = 0; n < D_CODES;  n++) { s.dyn_dtree[n * 2]/*.Freq*/ = 0; }
      for (n = 0; n < BL_CODES; n++) { s.bl_tree[n * 2]/*.Freq*/ = 0; }
    
      s.dyn_ltree[END_BLOCK * 2]/*.Freq*/ = 1;
      s.opt_len = s.static_len = 0;
      s.last_lit = s.matches = 0;
    };
    
    
    /* ===========================================================================
     * Flush the bit buffer and align the output on a byte boundary
     */
    const bi_windup = (s) =>
    {
      if (s.bi_valid > 8) {
        put_short(s, s.bi_buf);
      } else if (s.bi_valid > 0) {
        //put_byte(s, (Byte)s->bi_buf);
        s.pending_buf[s.pending++] = s.bi_buf;
      }
      s.bi_buf = 0;
      s.bi_valid = 0;
    };
    
    /* ===========================================================================
     * Copy a stored block, storing first the length and its
     * one's complement if requested.
     */
    const copy_block = (s, buf, len, header) =>
    //DeflateState *s;
    //charf    *buf;    /* the input data */
    //unsigned len;     /* its length */
    //int      header;  /* true if block header must be written */
    {
      bi_windup(s);        /* align on byte boundary */
    
      if (header) {
        put_short(s, len);
        put_short(s, ~len);
      }
    //  while (len--) {
    //    put_byte(s, *buf++);
    //  }
      s.pending_buf.set(s.window.subarray(buf, buf + len), s.pending);
      s.pending += len;
    };
    
    /* ===========================================================================
     * Compares to subtrees, using the tree depth as tie breaker when
     * the subtrees have equal frequency. This minimizes the worst case length.
     */
    const smaller = (tree, n, m, depth) => {
    
      const _n2 = n * 2;
      const _m2 = m * 2;
      return (tree[_n2]/*.Freq*/ < tree[_m2]/*.Freq*/ ||
             (tree[_n2]/*.Freq*/ === tree[_m2]/*.Freq*/ && depth[n] <= depth[m]));
    };
    
    /* ===========================================================================
     * Restore the heap property by moving down the tree starting at node k,
     * exchanging a node with the smallest of its two sons if necessary, stopping
     * when the heap property is re-established (each father smaller than its
     * two sons).
     */
    const pqdownheap = (s, tree, k) =>
    //    deflate_state *s;
    //    ct_data *tree;  /* the tree to restore */
    //    int k;               /* node to move down */
    {
      const v = s.heap[k];
      let j = k << 1;  /* left son of k */
      while (j <= s.heap_len) {
        /* Set j to the smallest of the two sons: */
        if (j < s.heap_len &&
          smaller(tree, s.heap[j + 1], s.heap[j], s.depth)) {
          j++;
        }
        /* Exit if v is smaller than both sons */
        if (smaller(tree, v, s.heap[j], s.depth)) { break; }
    
        /* Exchange v with the smallest son */
        s.heap[k] = s.heap[j];
        k = j;
    
        /* And continue down the tree, setting j to the left son of k */
        j <<= 1;
      }
      s.heap[k] = v;
    };
    
    
    // inlined manually
    // const SMALLEST = 1;
    
    /* ===========================================================================
     * Send the block data compressed using the given Huffman trees
     */
    const compress_block = (s, ltree, dtree) =>
    //    deflate_state *s;
    //    const ct_data *ltree; /* literal tree */
    //    const ct_data *dtree; /* distance tree */
    {
      let dist;           /* distance of matched string */
      let lc;             /* match length or unmatched char (if dist == 0) */
      let lx = 0;         /* running index in l_buf */
      let code;           /* the code to send */
      let extra;          /* number of extra bits to send */
    
      if (s.last_lit !== 0) {
        do {
          dist = (s.pending_buf[s.d_buf + lx * 2] << 8) | (s.pending_buf[s.d_buf + lx * 2 + 1]);
          lc = s.pending_buf[s.l_buf + lx];
          lx++;
    
          if (dist === 0) {
            send_code(s, lc, ltree); /* send a literal byte */
            //Tracecv(isgraph(lc), (stderr," '%c' ", lc));
          } else {
            /* Here, lc is the match length - MIN_MATCH */
            code = _length_code[lc];
            send_code(s, code + LITERALS + 1, ltree); /* send the length code */
            extra = extra_lbits[code];
            if (extra !== 0) {
              lc -= base_length[code];
              send_bits(s, lc, extra);       /* send the extra length bits */
            }
            dist--; /* dist is now the match distance - 1 */
            code = d_code(dist);
            //Assert (code < D_CODES, "bad d_code");
    
            send_code(s, code, dtree);       /* send the distance code */
            extra = extra_dbits[code];
            if (extra !== 0) {
              dist -= base_dist[code];
              send_bits(s, dist, extra);   /* send the extra distance bits */
            }
          } /* literal or match pair ? */
    
          /* Check that the overlay between pending_buf and d_buf+l_buf is ok: */
          //Assert((uInt)(s->pending) < s->lit_bufsize + 2*lx,
          //       "pendingBuf overflow");
    
        } while (lx < s.last_lit);
      }
    
      send_code(s, END_BLOCK, ltree);
    };
    
    
    /* ===========================================================================
     * Construct one Huffman tree and assigns the code bit strings and lengths.
     * Update the total bit length for the current block.
     * IN assertion: the field freq is set for all tree elements.
     * OUT assertions: the fields len and code are set to the optimal bit length
     *     and corresponding code. The length opt_len is updated; static_len is
     *     also updated if stree is not null. The field max_code is set.
     */
    const build_tree = (s, desc) =>
    //    deflate_state *s;
    //    tree_desc *desc; /* the tree descriptor */
    {
      const tree     = desc.dyn_tree;
      const stree    = desc.stat_desc.static_tree;
      const has_stree = desc.stat_desc.has_stree;
      const elems    = desc.stat_desc.elems;
      let n, m;          /* iterate over heap elements */
      let max_code = -1; /* largest code with non zero frequency */
      let node;          /* new node being created */
    
      /* Construct the initial heap, with least frequent element in
       * heap[SMALLEST]. The sons of heap[n] are heap[2*n] and heap[2*n+1].
       * heap[0] is not used.
       */
      s.heap_len = 0;
      s.heap_max = HEAP_SIZE;
    
      for (n = 0; n < elems; n++) {
        if (tree[n * 2]/*.Freq*/ !== 0) {
          s.heap[++s.heap_len] = max_code = n;
          s.depth[n] = 0;
    
        } else {
          tree[n * 2 + 1]/*.Len*/ = 0;
        }
      }
    
      /* The pkzip format requires that at least one distance code exists,
       * and that at least one bit should be sent even if there is only one
       * possible code. So to avoid special checks later on we force at least
       * two codes of non zero frequency.
       */
      while (s.heap_len < 2) {
        node = s.heap[++s.heap_len] = (max_code < 2 ? ++max_code : 0);
        tree[node * 2]/*.Freq*/ = 1;
        s.depth[node] = 0;
        s.opt_len--;
    
        if (has_stree) {
          s.static_len -= stree[node * 2 + 1]/*.Len*/;
        }
        /* node is 0 or 1 so it does not have extra bits */
      }
      desc.max_code = max_code;
    
      /* The elements heap[heap_len/2+1 .. heap_len] are leaves of the tree,
       * establish sub-heaps of increasing lengths:
       */
      for (n = (s.heap_len >> 1/*int /2*/); n >= 1; n--) { pqdownheap(s, tree, n); }
    
      /* Construct the Huffman tree by repeatedly combining the least two
       * frequent nodes.
       */
      node = elems;              /* next internal node of the tree */
      do {
        //pqremove(s, tree, n);  /* n = node of least frequency */
        /*** pqremove ***/
        n = s.heap[1/*SMALLEST*/];
        s.heap[1/*SMALLEST*/] = s.heap[s.heap_len--];
        pqdownheap(s, tree, 1/*SMALLEST*/);
        /***/
    
        m = s.heap[1/*SMALLEST*/]; /* m = node of next least frequency */
    
        s.heap[--s.heap_max] = n; /* keep the nodes sorted by frequency */
        s.heap[--s.heap_max] = m;
    
        /* Create a new node father of n and m */
        tree[node * 2]/*.Freq*/ = tree[n * 2]/*.Freq*/ + tree[m * 2]/*.Freq*/;
        s.depth[node] = (s.depth[n] >= s.depth[m] ? s.depth[n] : s.depth[m]) + 1;
        tree[n * 2 + 1]/*.Dad*/ = tree[m * 2 + 1]/*.Dad*/ = node;
    
        /* and insert the new node in the heap */
        s.heap[1/*SMALLEST*/] = node++;
        pqdownheap(s, tree, 1/*SMALLEST*/);
    
      } while (s.heap_len >= 2);
    
      s.heap[--s.heap_max] = s.heap[1/*SMALLEST*/];
    
      /* At this point, the fields freq and dad are set. We can now
       * generate the bit lengths.
       */
      gen_bitlen(s, desc);
    
      /* The field len is now set, we can generate the bit codes */
      gen_codes(tree, max_code, s.bl_count);
    };
    
    
    /* ===========================================================================
     * Scan a literal or distance tree to determine the frequencies of the codes
     * in the bit length tree.
     */
    const scan_tree = (s, tree, max_code) =>
    //    deflate_state *s;
    //    ct_data *tree;   /* the tree to be scanned */
    //    int max_code;    /* and its largest code of non zero frequency */
    {
      let n;                     /* iterates over all tree elements */
      let prevlen = -1;          /* last emitted length */
      let curlen;                /* length of current code */
    
      let nextlen = tree[0 * 2 + 1]/*.Len*/; /* length of next code */
    
      let count = 0;             /* repeat count of the current code */
      let max_count = 7;         /* max repeat count */
      let min_count = 4;         /* min repeat count */
    
      if (nextlen === 0) {
        max_count = 138;
        min_count = 3;
      }
      tree[(max_code + 1) * 2 + 1]/*.Len*/ = 0xffff; /* guard */
    
      for (n = 0; n <= max_code; n++) {
        curlen = nextlen;
        nextlen = tree[(n + 1) * 2 + 1]/*.Len*/;
    
        if (++count < max_count && curlen === nextlen) {
          continue;
    
        } else if (count < min_count) {
          s.bl_tree[curlen * 2]/*.Freq*/ += count;
    
        } else if (curlen !== 0) {
    
          if (curlen !== prevlen) { s.bl_tree[curlen * 2]/*.Freq*/++; }
          s.bl_tree[REP_3_6 * 2]/*.Freq*/++;
    
        } else if (count <= 10) {
          s.bl_tree[REPZ_3_10 * 2]/*.Freq*/++;
    
        } else {
          s.bl_tree[REPZ_11_138 * 2]/*.Freq*/++;
        }
    
        count = 0;
        prevlen = curlen;
    
        if (nextlen === 0) {
          max_count = 138;
          min_count = 3;
    
        } else if (curlen === nextlen) {
          max_count = 6;
          min_count = 3;
    
        } else {
          max_count = 7;
          min_count = 4;
        }
      }
    };
    
    
    /* ===========================================================================
     * Send a literal or distance tree in compressed form, using the codes in
     * bl_tree.
     */
    const send_tree = (s, tree, max_code) =>
    //    deflate_state *s;
    //    ct_data *tree; /* the tree to be scanned */
    //    int max_code;       /* and its largest code of non zero frequency */
    {
      let n;                     /* iterates over all tree elements */
      let prevlen = -1;          /* last emitted length */
      let curlen;                /* length of current code */
    
      let nextlen = tree[0 * 2 + 1]/*.Len*/; /* length of next code */
    
      let count = 0;             /* repeat count of the current code */
      let max_count = 7;         /* max repeat count */
      let min_count = 4;         /* min repeat count */
    
      /* tree[max_code+1].Len = -1; */  /* guard already set */
      if (nextlen === 0) {
        max_count = 138;
        min_count = 3;
      }
    
      for (n = 0; n <= max_code; n++) {
        curlen = nextlen;
        nextlen = tree[(n + 1) * 2 + 1]/*.Len*/;
    
        if (++count < max_count && curlen === nextlen) {
          continue;
    
        } else if (count < min_count) {
          do { send_code(s, curlen, s.bl_tree); } while (--count !== 0);
    
        } else if (curlen !== 0) {
          if (curlen !== prevlen) {
            send_code(s, curlen, s.bl_tree);
            count--;
          }
          //Assert(count >= 3 && count <= 6, " 3_6?");
          send_code(s, REP_3_6, s.bl_tree);
          send_bits(s, count - 3, 2);
    
        } else if (count <= 10) {
          send_code(s, REPZ_3_10, s.bl_tree);
          send_bits(s, count - 3, 3);
    
        } else {
          send_code(s, REPZ_11_138, s.bl_tree);
          send_bits(s, count - 11, 7);
        }
    
        count = 0;
        prevlen = curlen;
        if (nextlen === 0) {
          max_count = 138;
          min_count = 3;
    
        } else if (curlen === nextlen) {
          max_count = 6;
          min_count = 3;
    
        } else {
          max_count = 7;
          min_count = 4;
        }
      }
    };
    
    
    /* ===========================================================================
     * Construct the Huffman tree for the bit lengths and return the index in
     * bl_order of the last bit length code to send.
     */
    const build_bl_tree = (s) => {
    
      let max_blindex;  /* index of last bit length code of non zero freq */
    
      /* Determine the bit length frequencies for literal and distance trees */
      scan_tree(s, s.dyn_ltree, s.l_desc.max_code);
      scan_tree(s, s.dyn_dtree, s.d_desc.max_code);
    
      /* Build the bit length tree: */
      build_tree(s, s.bl_desc);
      /* opt_len now includes the length of the tree representations, except
       * the lengths of the bit lengths codes and the 5+5+4 bits for the counts.
       */
    
      /* Determine the number of bit length codes to send. The pkzip format
       * requires that at least 4 bit length codes be sent. (appnote.txt says
       * 3 but the actual value used is 4.)
       */
      for (max_blindex = BL_CODES - 1; max_blindex >= 3; max_blindex--) {
        if (s.bl_tree[bl_order[max_blindex] * 2 + 1]/*.Len*/ !== 0) {
          break;
        }
      }
      /* Update opt_len to include the bit length tree and counts */
      s.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
      //Tracev((stderr, "\ndyn trees: dyn %ld, stat %ld",
      //        s->opt_len, s->static_len));
    
      return max_blindex;
    };
    
    
    /* ===========================================================================
     * Send the header for a block using dynamic Huffman trees: the counts, the
     * lengths of the bit length codes, the literal tree and the distance tree.
     * IN assertion: lcodes >= 257, dcodes >= 1, blcodes >= 4.
     */
    const send_all_trees = (s, lcodes, dcodes, blcodes) =>
    //    deflate_state *s;
    //    int lcodes, dcodes, blcodes; /* number of codes for each tree */
    {
      let rank;                    /* index in bl_order */
    
      //Assert (lcodes >= 257 && dcodes >= 1 && blcodes >= 4, "not enough codes");
      //Assert (lcodes <= L_CODES && dcodes <= D_CODES && blcodes <= BL_CODES,
      //        "too many codes");
      //Tracev((stderr, "\nbl counts: "));
      send_bits(s, lcodes - 257, 5); /* not +255 as stated in appnote.txt */
      send_bits(s, dcodes - 1,   5);
      send_bits(s, blcodes - 4,  4); /* not -3 as stated in appnote.txt */
      for (rank = 0; rank < blcodes; rank++) {
        //Tracev((stderr, "\nbl code %2d ", bl_order[rank]));
        send_bits(s, s.bl_tree[bl_order[rank] * 2 + 1]/*.Len*/, 3);
      }
      //Tracev((stderr, "\nbl tree: sent %ld", s->bits_sent));
    
      send_tree(s, s.dyn_ltree, lcodes - 1); /* literal tree */
      //Tracev((stderr, "\nlit tree: sent %ld", s->bits_sent));
    
      send_tree(s, s.dyn_dtree, dcodes - 1); /* distance tree */
      //Tracev((stderr, "\ndist tree: sent %ld", s->bits_sent));
    };
    
    
    /* ===========================================================================
     * Check if the data type is TEXT or BINARY, using the following algorithm:
     * - TEXT if the two conditions below are satisfied:
     *    a) There are no non-portable control characters belonging to the
     *       "black list" (0..6, 14..25, 28..31).
     *    b) There is at least one printable character belonging to the
     *       "white list" (9 {TAB}, 10 {LF}, 13 {CR}, 32..255).
     * - BINARY otherwise.
     * - The following partially-portable control characters form a
     *   "gray list" that is ignored in this detection algorithm:
     *   (7 {BEL}, 8 {BS}, 11 {VT}, 12 {FF}, 26 {SUB}, 27 {ESC}).
     * IN assertion: the fields Freq of dyn_ltree are set.
     */
    const detect_data_type = (s) => {
      /* black_mask is the bit mask of black-listed bytes
       * set bits 0..6, 14..25, and 28..31
       * 0xf3ffc07f = binary 11110011111111111100000001111111
       */
      let black_mask = 0xf3ffc07f;
      let n;
    
      /* Check for non-textual ("black-listed") bytes. */
      for (n = 0; n <= 31; n++, black_mask >>>= 1) {
        if ((black_mask & 1) && (s.dyn_ltree[n * 2]/*.Freq*/ !== 0)) {
          return Z_BINARY;
        }
      }
    
      /* Check for textual ("white-listed") bytes. */
      if (s.dyn_ltree[9 * 2]/*.Freq*/ !== 0 || s.dyn_ltree[10 * 2]/*.Freq*/ !== 0 ||
          s.dyn_ltree[13 * 2]/*.Freq*/ !== 0) {
        return Z_TEXT;
      }
      for (n = 32; n < LITERALS; n++) {
        if (s.dyn_ltree[n * 2]/*.Freq*/ !== 0) {
          return Z_TEXT;
        }
      }
    
      /* There are no "black-listed" or "white-listed" bytes:
       * this stream either is empty or has tolerated ("gray-listed") bytes only.
       */
      return Z_BINARY;
    };
    
    
    let static_init_done = false;
    
    /* ===========================================================================
     * Initialize the tree data structures for a new zlib stream.
     */
    const _tr_init = (s) =>
    {
    
      if (!static_init_done) {
        tr_static_init();
        static_init_done = true;
      }
    
      s.l_desc  = new TreeDesc(s.dyn_ltree, static_l_desc);
      s.d_desc  = new TreeDesc(s.dyn_dtree, static_d_desc);
      s.bl_desc = new TreeDesc(s.bl_tree, static_bl_desc);
    
      s.bi_buf = 0;
      s.bi_valid = 0;
    
      /* Initialize the first block of the first file: */
      init_block(s);
    };
    
    
    /* ===========================================================================
     * Send a stored block
     */
    const _tr_stored_block = (s, buf, stored_len, last) =>
    //DeflateState *s;
    //charf *buf;       /* input block */
    //ulg stored_len;   /* length of input block */
    //int last;         /* one if this is the last block for a file */
    {
      send_bits(s, (STORED_BLOCK << 1) + (last ? 1 : 0), 3);    /* send block type */
      copy_block(s, buf, stored_len, true); /* with header */
    };
    
    
    /* ===========================================================================
     * Send one empty static block to give enough lookahead for inflate.
     * This takes 10 bits, of which 7 may remain in the bit buffer.
     */
    const _tr_align = (s) => {
      send_bits(s, STATIC_TREES << 1, 3);
      send_code(s, END_BLOCK, static_ltree);
      bi_flush(s);
    };
    
    
    /* ===========================================================================
     * Determine the best encoding for the current block: dynamic trees, static
     * trees or store, and output the encoded block to the zip file.
     */
    const _tr_flush_block = (s, buf, stored_len, last) =>
    //DeflateState *s;
    //charf *buf;       /* input block, or NULL if too old */
    //ulg stored_len;   /* length of input block */
    //int last;         /* one if this is the last block for a file */
    {
      let opt_lenb, static_lenb;  /* opt_len and static_len in bytes */
      let max_blindex = 0;        /* index of last bit length code of non zero freq */
    
      /* Build the Huffman trees unless a stored block is forced */
      if (s.level > 0) {
    
        /* Check if the file is binary or text */
        if (s.strm.data_type === Z_UNKNOWN) {
          s.strm.data_type = detect_data_type(s);
        }
    
        /* Construct the literal and distance trees */
        build_tree(s, s.l_desc);
        // Tracev((stderr, "\nlit data: dyn %ld, stat %ld", s->opt_len,
        //        s->static_len));
    
        build_tree(s, s.d_desc);
        // Tracev((stderr, "\ndist data: dyn %ld, stat %ld", s->opt_len,
        //        s->static_len));
        /* At this point, opt_len and static_len are the total bit lengths of
         * the compressed block data, excluding the tree representations.
         */
    
        /* Build the bit length tree for the above two trees, and get the index
         * in bl_order of the last bit length code to send.
         */
        max_blindex = build_bl_tree(s);
    
        /* Determine the best encoding. Compute the block lengths in bytes. */
        opt_lenb = (s.opt_len + 3 + 7) >>> 3;
        static_lenb = (s.static_len + 3 + 7) >>> 3;
    
        // Tracev((stderr, "\nopt %lu(%lu) stat %lu(%lu) stored %lu lit %u ",
        //        opt_lenb, s->opt_len, static_lenb, s->static_len, stored_len,
        //        s->last_lit));
    
        if (static_lenb <= opt_lenb) { opt_lenb = static_lenb; }
    
      } else {
        // Assert(buf != (char*)0, "lost buf");
        opt_lenb = static_lenb = stored_len + 5; /* force a stored block */
      }
    
      if ((stored_len + 4 <= opt_lenb) && (buf !== -1)) {
        /* 4: two words for the lengths */
    
        /* The test buf != NULL is only necessary if LIT_BUFSIZE > WSIZE.
         * Otherwise we can't have processed more than WSIZE input bytes since
         * the last block flush, because compression would have been
         * successful. If LIT_BUFSIZE <= WSIZE, it is never too late to
         * transform a block into a stored block.
         */
        _tr_stored_block(s, buf, stored_len, last);
    
      } else if (s.strategy === Z_FIXED || static_lenb === opt_lenb) {
    
        send_bits(s, (STATIC_TREES << 1) + (last ? 1 : 0), 3);
        compress_block(s, static_ltree, static_dtree);
    
      } else {
        send_bits(s, (DYN_TREES << 1) + (last ? 1 : 0), 3);
        send_all_trees(s, s.l_desc.max_code + 1, s.d_desc.max_code + 1, max_blindex + 1);
        compress_block(s, s.dyn_ltree, s.dyn_dtree);
      }
      // Assert (s->compressed_len == s->bits_sent, "bad compressed size");
      /* The above check is made mod 2^32, for files larger than 512 MB
       * and uLong implemented on 32 bits.
       */
      init_block(s);
    
      if (last) {
        bi_windup(s);
      }
      // Tracev((stderr,"\ncomprlen %lu(%lu) ", s->compressed_len>>3,
      //       s->compressed_len-7*last));
    };
    
    /* ===========================================================================
     * Save the match info and tally the frequency counts. Return true if
     * the current block must be flushed.
     */
    const _tr_tally = (s, dist, lc) =>
    //    deflate_state *s;
    //    unsigned dist;  /* distance of matched string */
    //    unsigned lc;    /* match length-MIN_MATCH or unmatched char (if dist==0) */
    {
      //let out_length, in_length, dcode;
    
      s.pending_buf[s.d_buf + s.last_lit * 2]     = (dist >>> 8) & 0xff;
      s.pending_buf[s.d_buf + s.last_lit * 2 + 1] = dist & 0xff;
    
      s.pending_buf[s.l_buf + s.last_lit] = lc & 0xff;
      s.last_lit++;
    
      if (dist === 0) {
        /* lc is the unmatched char */
        s.dyn_ltree[lc * 2]/*.Freq*/++;
      } else {
        s.matches++;
        /* Here, lc is the match length - MIN_MATCH */
        dist--;             /* dist = match distance - 1 */
        //Assert((ush)dist < (ush)MAX_DIST(s) &&
        //       (ush)lc <= (ush)(MAX_MATCH-MIN_MATCH) &&
        //       (ush)d_code(dist) < (ush)D_CODES,  "_tr_tally: bad match");
    
        s.dyn_ltree[(_length_code[lc] + LITERALS + 1) * 2]/*.Freq*/++;
        s.dyn_dtree[d_code(dist) * 2]/*.Freq*/++;
      }
    
    // (!) This block is disabled in zlib defaults,
    // don't enable it for binary compatibility
    
    //#ifdef TRUNCATE_BLOCK
    //  /* Try to guess if it is profitable to stop the current block here */
    //  if ((s.last_lit & 0x1fff) === 0 && s.level > 2) {
    //    /* Compute an upper bound for the compressed length */
    //    out_length = s.last_lit*8;
    //    in_length = s.strstart - s.block_start;
    //
    //    for (dcode = 0; dcode < D_CODES; dcode++) {
    //      out_length += s.dyn_dtree[dcode*2]/*.Freq*/ * (5 + extra_dbits[dcode]);
    //    }
    //    out_length >>>= 3;
    //    //Tracev((stderr,"\nlast_lit %u, in %ld, out ~%ld(%ld%%) ",
    //    //       s->last_lit, in_length, out_length,
    //    //       100L - out_length*100L/in_length));
    //    if (s.matches < (s.last_lit>>1)/*int /2*/ && out_length < (in_length>>1)/*int /2*/) {
    //      return true;
    //    }
    //  }
    //#endif
    
      return (s.last_lit === s.lit_bufsize - 1);
      /* We avoid equality with lit_bufsize because of wraparound at 64K
       * on 16 bit machines and because stored blocks are restricted to
       * 64K-1 bytes.
       */
    };
    
    module.exports._tr_init  = _tr_init;
    module.exports._tr_stored_block = _tr_stored_block;
    module.exports._tr_flush_block  = _tr_flush_block;
    module.exports._tr_tally = _tr_tally;
    module.exports._tr_align = _tr_align;
    
    },{}],65:[function(require,module,exports){
    'use strict';
    
    // (C) 1995-2013 Jean-loup Gailly and Mark Adler
    // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
    //
    // This software is provided 'as-is', without any express or implied
    // warranty. In no event will the authors be held liable for any damages
    // arising from the use of this software.
    //
    // Permission is granted to anyone to use this software for any purpose,
    // including commercial applications, and to alter it and redistribute it
    // freely, subject to the following restrictions:
    //
    // 1. The origin of this software must not be misrepresented; you must not
    //   claim that you wrote the original software. If you use this software
    //   in a product, an acknowledgment in the product documentation would be
    //   appreciated but is not required.
    // 2. Altered source versions must be plainly marked as such, and must not be
    //   misrepresented as being the original software.
    // 3. This notice may not be removed or altered from any source distribution.
    
    function ZStream() {
      /* next input byte */
      this.input = null; // JS specific, because we have no pointers
      this.next_in = 0;
      /* number of bytes available at input */
      this.avail_in = 0;
      /* total number of input bytes read so far */
      this.total_in = 0;
      /* next output byte should be put there */
      this.output = null; // JS specific, because we have no pointers
      this.next_out = 0;
      /* remaining free space at output */
      this.avail_out = 0;
      /* total number of bytes output so far */
      this.total_out = 0;
      /* last error message, NULL if no error */
      this.msg = ''/*Z_NULL*/;
      /* not visible by applications */
      this.state = null;
      /* best guess about the data type: binary or text */
      this.data_type = 2/*Z_UNKNOWN*/;
      /* adler32 value of the uncompressed data */
      this.adler = 0;
    }
    
    module.exports = ZStream;
    
    },{}],66:[function(require,module,exports){
    // minimal library entry point.
    
    "use strict";
    module.exports = require("./src/index-minimal");
    
    },{"./src/index-minimal":67}],67:[function(require,module,exports){
    "use strict";
    var protobuf = exports;
    
    /**
     * Build type, one of `"full"`, `"light"` or `"minimal"`.
     * @name build
     * @type {string}
     * @const
     */
    protobuf.build = "minimal";
    
    // Serialization
    protobuf.Writer       = require("./writer");
    protobuf.BufferWriter = require("./writer_buffer");
    protobuf.Reader       = require("./reader");
    protobuf.BufferReader = require("./reader_buffer");
    
    // Utility
    protobuf.util         = require("./util/minimal");
    protobuf.rpc          = require("./rpc");
    protobuf.roots        = require("./roots");
    protobuf.configure    = configure;
    
    /* istanbul ignore next */
    /**
     * Reconfigures the library according to the environment.
     * @returns {undefined}
     */
    function configure() {
        protobuf.util._configure();
        protobuf.Writer._configure(protobuf.BufferWriter);
        protobuf.Reader._configure(protobuf.BufferReader);
    }
    
    // Set up buffer utility according to the environment
    configure();
    
    },{"./reader":68,"./reader_buffer":69,"./roots":70,"./rpc":71,"./util/minimal":74,"./writer":75,"./writer_buffer":76}],68:[function(require,module,exports){
    "use strict";
    module.exports = Reader;
    
    var util      = require("./util/minimal");
    
    var BufferReader; // cyclic
    
    var LongBits  = util.LongBits,
        utf8      = util.utf8;
    
    /* istanbul ignore next */
    function indexOutOfRange(reader, writeLength) {
        return RangeError("index out of range: " + reader.pos + " + " + (writeLength || 1) + " > " + reader.len);
    }
    
    /**
     * Constructs a new reader instance using the specified buffer.
     * @classdesc Wire format reader using `Uint8Array` if available, otherwise `Array`.
     * @constructor
     * @param {Uint8Array} buffer Buffer to read from
     */
    function Reader(buffer) {
    
        /**
         * Read buffer.
         * @type {Uint8Array}
         */
        this.buf = buffer;
    
        /**
         * Read buffer position.
         * @type {number}
         */
        this.pos = 0;
    
        /**
         * Read buffer length.
         * @type {number}
         */
        this.len = buffer.length;
    }
    
    var create_array = typeof Uint8Array !== "undefined"
        ? function create_typed_array(buffer) {
            if (buffer instanceof Uint8Array || Array.isArray(buffer))
                return new Reader(buffer);
            throw Error("illegal buffer");
        }
        /* istanbul ignore next */
        : function create_array(buffer) {
            if (Array.isArray(buffer))
                return new Reader(buffer);
            throw Error("illegal buffer");
        };
    
    var create = function create() {
        return util.Buffer
            ? function create_buffer_setup(buffer) {
                return (Reader.create = function create_buffer(buffer) {
                    return util.Buffer.isBuffer(buffer)
                        ? new BufferReader(buffer)
                        /* istanbul ignore next */
                        : create_array(buffer);
                })(buffer);
            }
            /* istanbul ignore next */
            : create_array;
    };
    
    /**
     * Creates a new reader using the specified buffer.
     * @function
     * @param {Uint8Array|Buffer} buffer Buffer to read from
     * @returns {Reader|BufferReader} A {@link BufferReader} if `buffer` is a Buffer, otherwise a {@link Reader}
     * @throws {Error} If `buffer` is not a valid buffer
     */
    Reader.create = create();
    
    Reader.prototype._slice = util.Array.prototype.subarray || /* istanbul ignore next */ util.Array.prototype.slice;
    
    /**
     * Reads a varint as an unsigned 32 bit value.
     * @function
     * @returns {number} Value read
     */
    Reader.prototype.uint32 = (function read_uint32_setup() {
        var value = 4294967295; // optimizer type-hint, tends to deopt otherwise (?!)
        return function read_uint32() {
            value = (         this.buf[this.pos] & 127       ) >>> 0; if (this.buf[this.pos++] < 128) return value;
            value = (value | (this.buf[this.pos] & 127) <<  7) >>> 0; if (this.buf[this.pos++] < 128) return value;
            value = (value | (this.buf[this.pos] & 127) << 14) >>> 0; if (this.buf[this.pos++] < 128) return value;
            value = (value | (this.buf[this.pos] & 127) << 21) >>> 0; if (this.buf[this.pos++] < 128) return value;
            value = (value | (this.buf[this.pos] &  15) << 28) >>> 0; if (this.buf[this.pos++] < 128) return value;
    
            /* istanbul ignore if */
            if ((this.pos += 5) > this.len) {
                this.pos = this.len;
                throw indexOutOfRange(this, 10);
            }
            return value;
        };
    })();
    
    /**
     * Reads a varint as a signed 32 bit value.
     * @returns {number} Value read
     */
    Reader.prototype.int32 = function read_int32() {
        return this.uint32() | 0;
    };
    
    /**
     * Reads a zig-zag encoded varint as a signed 32 bit value.
     * @returns {number} Value read
     */
    Reader.prototype.sint32 = function read_sint32() {
        var value = this.uint32();
        return value >>> 1 ^ -(value & 1) | 0;
    };
    
    /* eslint-disable no-invalid-this */
    
    function readLongVarint() {
        // tends to deopt with local vars for octet etc.
        var bits = new LongBits(0, 0);
        var i = 0;
        if (this.len - this.pos > 4) { // fast route (lo)
            for (; i < 4; ++i) {
                // 1st..4th
                bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
                if (this.buf[this.pos++] < 128)
                    return bits;
            }
            // 5th
            bits.lo = (bits.lo | (this.buf[this.pos] & 127) << 28) >>> 0;
            bits.hi = (bits.hi | (this.buf[this.pos] & 127) >>  4) >>> 0;
            if (this.buf[this.pos++] < 128)
                return bits;
            i = 0;
        } else {
            for (; i < 3; ++i) {
                /* istanbul ignore if */
                if (this.pos >= this.len)
                    throw indexOutOfRange(this);
                // 1st..3th
                bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
                if (this.buf[this.pos++] < 128)
                    return bits;
            }
            // 4th
            bits.lo = (bits.lo | (this.buf[this.pos++] & 127) << i * 7) >>> 0;
            return bits;
        }
        if (this.len - this.pos > 4) { // fast route (hi)
            for (; i < 5; ++i) {
                // 6th..10th
                bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
                if (this.buf[this.pos++] < 128)
                    return bits;
            }
        } else {
            for (; i < 5; ++i) {
                /* istanbul ignore if */
                if (this.pos >= this.len)
                    throw indexOutOfRange(this);
                // 6th..10th
                bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
                if (this.buf[this.pos++] < 128)
                    return bits;
            }
        }
        /* istanbul ignore next */
        throw Error("invalid varint encoding");
    }
    
    /* eslint-enable no-invalid-this */
    
    /**
     * Reads a varint as a signed 64 bit value.
     * @name Reader#int64
     * @function
     * @returns {Long} Value read
     */
    
    /**
     * Reads a varint as an unsigned 64 bit value.
     * @name Reader#uint64
     * @function
     * @returns {Long} Value read
     */
    
    /**
     * Reads a zig-zag encoded varint as a signed 64 bit value.
     * @name Reader#sint64
     * @function
     * @returns {Long} Value read
     */
    
    /**
     * Reads a varint as a boolean.
     * @returns {boolean} Value read
     */
    Reader.prototype.bool = function read_bool() {
        return this.uint32() !== 0;
    };
    
    function readFixed32_end(buf, end) { // note that this uses `end`, not `pos`
        return (buf[end - 4]
              | buf[end - 3] << 8
              | buf[end - 2] << 16
              | buf[end - 1] << 24) >>> 0;
    }
    
    /**
     * Reads fixed 32 bits as an unsigned 32 bit integer.
     * @returns {number} Value read
     */
    Reader.prototype.fixed32 = function read_fixed32() {
    
        /* istanbul ignore if */
        if (this.pos + 4 > this.len)
            throw indexOutOfRange(this, 4);
    
        return readFixed32_end(this.buf, this.pos += 4);
    };
    
    /**
     * Reads fixed 32 bits as a signed 32 bit integer.
     * @returns {number} Value read
     */
    Reader.prototype.sfixed32 = function read_sfixed32() {
    
        /* istanbul ignore if */
        if (this.pos + 4 > this.len)
            throw indexOutOfRange(this, 4);
    
        return readFixed32_end(this.buf, this.pos += 4) | 0;
    };
    
    /* eslint-disable no-invalid-this */
    
    function readFixed64(/* this: Reader */) {
    
        /* istanbul ignore if */
        if (this.pos + 8 > this.len)
            throw indexOutOfRange(this, 8);
    
        return new LongBits(readFixed32_end(this.buf, this.pos += 4), readFixed32_end(this.buf, this.pos += 4));
    }
    
    /* eslint-enable no-invalid-this */
    
    /**
     * Reads fixed 64 bits.
     * @name Reader#fixed64
     * @function
     * @returns {Long} Value read
     */
    
    /**
     * Reads zig-zag encoded fixed 64 bits.
     * @name Reader#sfixed64
     * @function
     * @returns {Long} Value read
     */
    
    /**
     * Reads a float (32 bit) as a number.
     * @function
     * @returns {number} Value read
     */
    Reader.prototype.float = function read_float() {
    
        /* istanbul ignore if */
        if (this.pos + 4 > this.len)
            throw indexOutOfRange(this, 4);
    
        var value = util.float.readFloatLE(this.buf, this.pos);
        this.pos += 4;
        return value;
    };
    
    /**
     * Reads a double (64 bit float) as a number.
     * @function
     * @returns {number} Value read
     */
    Reader.prototype.double = function read_double() {
    
        /* istanbul ignore if */
        if (this.pos + 8 > this.len)
            throw indexOutOfRange(this, 4);
    
        var value = util.float.readDoubleLE(this.buf, this.pos);
        this.pos += 8;
        return value;
    };
    
    /**
     * Reads a sequence of bytes preceeded by its length as a varint.
     * @returns {Uint8Array} Value read
     */
    Reader.prototype.bytes = function read_bytes() {
        var length = this.uint32(),
            start  = this.pos,
            end    = this.pos + length;
    
        /* istanbul ignore if */
        if (end > this.len)
            throw indexOutOfRange(this, length);
    
        this.pos += length;
        if (Array.isArray(this.buf)) // plain array
            return this.buf.slice(start, end);
        return start === end // fix for IE 10/Win8 and others' subarray returning array of size 1
            ? new this.buf.constructor(0)
            : this._slice.call(this.buf, start, end);
    };
    
    /**
     * Reads a string preceeded by its byte length as a varint.
     * @returns {string} Value read
     */
    Reader.prototype.string = function read_string() {
        var bytes = this.bytes();
        return utf8.read(bytes, 0, bytes.length);
    };
    
    /**
     * Skips the specified number of bytes if specified, otherwise skips a varint.
     * @param {number} [length] Length if known, otherwise a varint is assumed
     * @returns {Reader} `this`
     */
    Reader.prototype.skip = function skip(length) {
        if (typeof length === "number") {
            /* istanbul ignore if */
            if (this.pos + length > this.len)
                throw indexOutOfRange(this, length);
            this.pos += length;
        } else {
            do {
                /* istanbul ignore if */
                if (this.pos >= this.len)
                    throw indexOutOfRange(this);
            } while (this.buf[this.pos++] & 128);
        }
        return this;
    };
    
    /**
     * Skips the next element of the specified wire type.
     * @param {number} wireType Wire type received
     * @returns {Reader} `this`
     */
    Reader.prototype.skipType = function(wireType) {
        switch (wireType) {
            case 0:
                this.skip();
                break;
            case 1:
                this.skip(8);
                break;
            case 2:
                this.skip(this.uint32());
                break;
            case 3:
                while ((wireType = this.uint32() & 7) !== 4) {
                    this.skipType(wireType);
                }
                break;
            case 5:
                this.skip(4);
                break;
    
            /* istanbul ignore next */
            default:
                throw Error("invalid wire type " + wireType + " at offset " + this.pos);
        }
        return this;
    };
    
    Reader._configure = function(BufferReader_) {
        BufferReader = BufferReader_;
        Reader.create = create();
        BufferReader._configure();
    
        var fn = util.Long ? "toLong" : /* istanbul ignore next */ "toNumber";
        util.merge(Reader.prototype, {
    
            int64: function read_int64() {
                return readLongVarint.call(this)[fn](false);
            },
    
            uint64: function read_uint64() {
                return readLongVarint.call(this)[fn](true);
            },
    
            sint64: function read_sint64() {
                return readLongVarint.call(this).zzDecode()[fn](false);
            },
    
            fixed64: function read_fixed64() {
                return readFixed64.call(this)[fn](true);
            },
    
            sfixed64: function read_sfixed64() {
                return readFixed64.call(this)[fn](false);
            }
    
        });
    };
    
    },{"./util/minimal":74}],69:[function(require,module,exports){
    "use strict";
    module.exports = BufferReader;
    
    // extends Reader
    var Reader = require("./reader");
    (BufferReader.prototype = Object.create(Reader.prototype)).constructor = BufferReader;
    
    var util = require("./util/minimal");
    
    /**
     * Constructs a new buffer reader instance.
     * @classdesc Wire format reader using node buffers.
     * @extends Reader
     * @constructor
     * @param {Buffer} buffer Buffer to read from
     */
    function BufferReader(buffer) {
        Reader.call(this, buffer);
    
        /**
         * Read buffer.
         * @name BufferReader#buf
         * @type {Buffer}
         */
    }
    
    BufferReader._configure = function () {
        /* istanbul ignore else */
        if (util.Buffer)
            BufferReader.prototype._slice = util.Buffer.prototype.slice;
    };
    
    
    /**
     * @override
     */
    BufferReader.prototype.string = function read_string_buffer() {
        var len = this.uint32(); // modifies pos
        return this.buf.utf8Slice
            ? this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + len, this.len))
            : this.buf.toString("utf-8", this.pos, this.pos = Math.min(this.pos + len, this.len));
    };
    
    /**
     * Reads a sequence of bytes preceeded by its length as a varint.
     * @name BufferReader#bytes
     * @function
     * @returns {Buffer} Value read
     */
    
    BufferReader._configure();
    
    },{"./reader":68,"./util/minimal":74}],70:[function(require,module,exports){
    "use strict";
    module.exports = {};
    
    /**
     * Named roots.
     * This is where pbjs stores generated structures (the option `-r, --root` specifies a name).
     * Can also be used manually to make roots available accross modules.
     * @name roots
     * @type {Object.<string,Root>}
     * @example
     * // pbjs -r myroot -o compiled.js ...
     *
     * // in another module:
     * require("./compiled.js");
     *
     * // in any subsequent module:
     * var root = protobuf.roots["myroot"];
     */
    
    },{}],71:[function(require,module,exports){
    "use strict";
    
    /**
     * Streaming RPC helpers.
     * @namespace
     */
    var rpc = exports;
    
    /**
     * RPC implementation passed to {@link Service#create} performing a service request on network level, i.e. by utilizing http requests or websockets.
     * @typedef RPCImpl
     * @type {function}
     * @param {Method|rpc.ServiceMethod<Message<{}>,Message<{}>>} method Reflected or static method being called
     * @param {Uint8Array} requestData Request data
     * @param {RPCImplCallback} callback Callback function
     * @returns {undefined}
     * @example
     * function rpcImpl(method, requestData, callback) {
     *     if (protobuf.util.lcFirst(method.name) !== "myMethod") // compatible with static code
     *         throw Error("no such method");
     *     asynchronouslyObtainAResponse(requestData, function(err, responseData) {
     *         callback(err, responseData);
     *     });
     * }
     */
    
    /**
     * Node-style callback as used by {@link RPCImpl}.
     * @typedef RPCImplCallback
     * @type {function}
     * @param {Error|null} error Error, if any, otherwise `null`
     * @param {Uint8Array|null} [response] Response data or `null` to signal end of stream, if there hasn't been an error
     * @returns {undefined}
     */
    
    rpc.Service = require("./rpc/service");
    
    },{"./rpc/service":72}],72:[function(require,module,exports){
    "use strict";
    module.exports = Service;
    
    var util = require("../util/minimal");
    
    // Extends EventEmitter
    (Service.prototype = Object.create(util.EventEmitter.prototype)).constructor = Service;
    
    /**
     * A service method callback as used by {@link rpc.ServiceMethod|ServiceMethod}.
     *
     * Differs from {@link RPCImplCallback} in that it is an actual callback of a service method which may not return `response = null`.
     * @typedef rpc.ServiceMethodCallback
     * @template TRes extends Message<TRes>
     * @type {function}
     * @param {Error|null} error Error, if any
     * @param {TRes} [response] Response message
     * @returns {undefined}
     */
    
    /**
     * A service method part of a {@link rpc.Service} as created by {@link Service.create}.
     * @typedef rpc.ServiceMethod
     * @template TReq extends Message<TReq>
     * @template TRes extends Message<TRes>
     * @type {function}
     * @param {TReq|Properties<TReq>} request Request message or plain object
     * @param {rpc.ServiceMethodCallback<TRes>} [callback] Node-style callback called with the error, if any, and the response message
     * @returns {Promise<Message<TRes>>} Promise if `callback` has been omitted, otherwise `undefined`
     */
    
    /**
     * Constructs a new RPC service instance.
     * @classdesc An RPC service as returned by {@link Service#create}.
     * @exports rpc.Service
     * @extends util.EventEmitter
     * @constructor
     * @param {RPCImpl} rpcImpl RPC implementation
     * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
     * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
     */
    function Service(rpcImpl, requestDelimited, responseDelimited) {
    
        if (typeof rpcImpl !== "function")
            throw TypeError("rpcImpl must be a function");
    
        util.EventEmitter.call(this);
    
        /**
         * RPC implementation. Becomes `null` once the service is ended.
         * @type {RPCImpl|null}
         */
        this.rpcImpl = rpcImpl;
    
        /**
         * Whether requests are length-delimited.
         * @type {boolean}
         */
        this.requestDelimited = Boolean(requestDelimited);
    
        /**
         * Whether responses are length-delimited.
         * @type {boolean}
         */
        this.responseDelimited = Boolean(responseDelimited);
    }
    
    /**
     * Calls a service method through {@link rpc.Service#rpcImpl|rpcImpl}.
     * @param {Method|rpc.ServiceMethod<TReq,TRes>} method Reflected or static method
     * @param {Constructor<TReq>} requestCtor Request constructor
     * @param {Constructor<TRes>} responseCtor Response constructor
     * @param {TReq|Properties<TReq>} request Request message or plain object
     * @param {rpc.ServiceMethodCallback<TRes>} callback Service callback
     * @returns {undefined}
     * @template TReq extends Message<TReq>
     * @template TRes extends Message<TRes>
     */
    Service.prototype.rpcCall = function rpcCall(method, requestCtor, responseCtor, request, callback) {
    
        if (!request)
            throw TypeError("request must be specified");
    
        var self = this;
        if (!callback)
            return util.asPromise(rpcCall, self, method, requestCtor, responseCtor, request);
    
        if (!self.rpcImpl) {
            setTimeout(function() { callback(Error("already ended")); }, 0);
            return undefined;
        }
    
        try {
            return self.rpcImpl(
                method,
                requestCtor[self.requestDelimited ? "encodeDelimited" : "encode"](request).finish(),
                function rpcCallback(err, response) {
    
                    if (err) {
                        self.emit("error", err, method);
                        return callback(err);
                    }
    
                    if (response === null) {
                        self.end(/* endedByRPC */ true);
                        return undefined;
                    }
    
                    if (!(response instanceof responseCtor)) {
                        try {
                            response = responseCtor[self.responseDelimited ? "decodeDelimited" : "decode"](response);
                        } catch (err) {
                            self.emit("error", err, method);
                            return callback(err);
                        }
                    }
    
                    self.emit("data", response, method);
                    return callback(null, response);
                }
            );
        } catch (err) {
            self.emit("error", err, method);
            setTimeout(function() { callback(err); }, 0);
            return undefined;
        }
    };
    
    /**
     * Ends this service and emits the `end` event.
     * @param {boolean} [endedByRPC=false] Whether the service has been ended by the RPC implementation.
     * @returns {rpc.Service} `this`
     */
    Service.prototype.end = function end(endedByRPC) {
        if (this.rpcImpl) {
            if (!endedByRPC) // signal end to rpcImpl
                this.rpcImpl(null, null, null);
            this.rpcImpl = null;
            this.emit("end").off();
        }
        return this;
    };
    
    },{"../util/minimal":74}],73:[function(require,module,exports){
    "use strict";
    module.exports = LongBits;
    
    var util = require("../util/minimal");
    
    /**
     * Constructs new long bits.
     * @classdesc Helper class for working with the low and high bits of a 64 bit value.
     * @memberof util
     * @constructor
     * @param {number} lo Low 32 bits, unsigned
     * @param {number} hi High 32 bits, unsigned
     */
    function LongBits(lo, hi) {
    
        // note that the casts below are theoretically unnecessary as of today, but older statically
        // generated converter code might still call the ctor with signed 32bits. kept for compat.
    
        /**
         * Low bits.
         * @type {number}
         */
        this.lo = lo >>> 0;
    
        /**
         * High bits.
         * @type {number}
         */
        this.hi = hi >>> 0;
    }
    
    /**
     * Zero bits.
     * @memberof util.LongBits
     * @type {util.LongBits}
     */
    var zero = LongBits.zero = new LongBits(0, 0);
    
    zero.toNumber = function() { return 0; };
    zero.zzEncode = zero.zzDecode = function() { return this; };
    zero.length = function() { return 1; };
    
    /**
     * Zero hash.
     * @memberof util.LongBits
     * @type {string}
     */
    var zeroHash = LongBits.zeroHash = "\0\0\0\0\0\0\0\0";
    
    /**
     * Constructs new long bits from the specified number.
     * @param {number} value Value
     * @returns {util.LongBits} Instance
     */
    LongBits.fromNumber = function fromNumber(value) {
        if (value === 0)
            return zero;
        var sign = value < 0;
        if (sign)
            value = -value;
        var lo = value >>> 0,
            hi = (value - lo) / 4294967296 >>> 0;
        if (sign) {
            hi = ~hi >>> 0;
            lo = ~lo >>> 0;
            if (++lo > 4294967295) {
                lo = 0;
                if (++hi > 4294967295)
                    hi = 0;
            }
        }
        return new LongBits(lo, hi);
    };
    
    /**
     * Constructs new long bits from a number, long or string.
     * @param {Long|number|string} value Value
     * @returns {util.LongBits} Instance
     */
    LongBits.from = function from(value) {
        if (typeof value === "number")
            return LongBits.fromNumber(value);
        if (util.isString(value)) {
            /* istanbul ignore else */
            if (util.Long)
                value = util.Long.fromString(value);
            else
                return LongBits.fromNumber(parseInt(value, 10));
        }
        return value.low || value.high ? new LongBits(value.low >>> 0, value.high >>> 0) : zero;
    };
    
    /**
     * Converts this long bits to a possibly unsafe JavaScript number.
     * @param {boolean} [unsigned=false] Whether unsigned or not
     * @returns {number} Possibly unsafe number
     */
    LongBits.prototype.toNumber = function toNumber(unsigned) {
        if (!unsigned && this.hi >>> 31) {
            var lo = ~this.lo + 1 >>> 0,
                hi = ~this.hi     >>> 0;
            if (!lo)
                hi = hi + 1 >>> 0;
            return -(lo + hi * 4294967296);
        }
        return this.lo + this.hi * 4294967296;
    };
    
    /**
     * Converts this long bits to a long.
     * @param {boolean} [unsigned=false] Whether unsigned or not
     * @returns {Long} Long
     */
    LongBits.prototype.toLong = function toLong(unsigned) {
        return util.Long
            ? new util.Long(this.lo | 0, this.hi | 0, Boolean(unsigned))
            /* istanbul ignore next */
            : { low: this.lo | 0, high: this.hi | 0, unsigned: Boolean(unsigned) };
    };
    
    var charCodeAt = String.prototype.charCodeAt;
    
    /**
     * Constructs new long bits from the specified 8 characters long hash.
     * @param {string} hash Hash
     * @returns {util.LongBits} Bits
     */
    LongBits.fromHash = function fromHash(hash) {
        if (hash === zeroHash)
            return zero;
        return new LongBits(
            ( charCodeAt.call(hash, 0)
            | charCodeAt.call(hash, 1) << 8
            | charCodeAt.call(hash, 2) << 16
            | charCodeAt.call(hash, 3) << 24) >>> 0
        ,
            ( charCodeAt.call(hash, 4)
            | charCodeAt.call(hash, 5) << 8
            | charCodeAt.call(hash, 6) << 16
            | charCodeAt.call(hash, 7) << 24) >>> 0
        );
    };
    
    /**
     * Converts this long bits to a 8 characters long hash.
     * @returns {string} Hash
     */
    LongBits.prototype.toHash = function toHash() {
        return String.fromCharCode(
            this.lo        & 255,
            this.lo >>> 8  & 255,
            this.lo >>> 16 & 255,
            this.lo >>> 24      ,
            this.hi        & 255,
            this.hi >>> 8  & 255,
            this.hi >>> 16 & 255,
            this.hi >>> 24
        );
    };
    
    /**
     * Zig-zag encodes this long bits.
     * @returns {util.LongBits} `this`
     */
    LongBits.prototype.zzEncode = function zzEncode() {
        var mask =   this.hi >> 31;
        this.hi  = ((this.hi << 1 | this.lo >>> 31) ^ mask) >>> 0;
        this.lo  = ( this.lo << 1                   ^ mask) >>> 0;
        return this;
    };
    
    /**
     * Zig-zag decodes this long bits.
     * @returns {util.LongBits} `this`
     */
    LongBits.prototype.zzDecode = function zzDecode() {
        var mask = -(this.lo & 1);
        this.lo  = ((this.lo >>> 1 | this.hi << 31) ^ mask) >>> 0;
        this.hi  = ( this.hi >>> 1                  ^ mask) >>> 0;
        return this;
    };
    
    /**
     * Calculates the length of this longbits when encoded as a varint.
     * @returns {number} Length
     */
    LongBits.prototype.length = function length() {
        var part0 =  this.lo,
            part1 = (this.lo >>> 28 | this.hi << 4) >>> 0,
            part2 =  this.hi >>> 24;
        return part2 === 0
             ? part1 === 0
               ? part0 < 16384
                 ? part0 < 128 ? 1 : 2
                 : part0 < 2097152 ? 3 : 4
               : part1 < 16384
                 ? part1 < 128 ? 5 : 6
                 : part1 < 2097152 ? 7 : 8
             : part2 < 128 ? 9 : 10;
    };
    
    },{"../util/minimal":74}],74:[function(require,module,exports){
    (function (global){(function (){
    "use strict";
    var util = exports;
    
    // used to return a Promise where callback is omitted
    util.asPromise = require("@protobufjs/aspromise");
    
    // converts to / from base64 encoded strings
    util.base64 = require("@protobufjs/base64");
    
    // base class of rpc.Service
    util.EventEmitter = require("@protobufjs/eventemitter");
    
    // float handling accross browsers
    util.float = require("@protobufjs/float");
    
    // requires modules optionally and hides the call from bundlers
    util.inquire = require("@protobufjs/inquire");
    
    // converts to / from utf8 encoded strings
    util.utf8 = require("@protobufjs/utf8");
    
    // provides a node-like buffer pool in the browser
    util.pool = require("@protobufjs/pool");
    
    // utility to work with the low and high bits of a 64 bit value
    util.LongBits = require("./longbits");
    
    /**
     * Whether running within node or not.
     * @memberof util
     * @type {boolean}
     */
    util.isNode = Boolean(typeof global !== "undefined"
                       && global
                       && global.process
                       && global.process.versions
                       && global.process.versions.node);
    
    /**
     * Global object reference.
     * @memberof util
     * @type {Object}
     */
    util.global = util.isNode && global
               || typeof window !== "undefined" && window
               || typeof self   !== "undefined" && self
               || this; // eslint-disable-line no-invalid-this
    
    /**
     * An immuable empty array.
     * @memberof util
     * @type {Array.<*>}
     * @const
     */
    util.emptyArray = Object.freeze ? Object.freeze([]) : /* istanbul ignore next */ []; // used on prototypes
    
    /**
     * An immutable empty object.
     * @type {Object}
     * @const
     */
    util.emptyObject = Object.freeze ? Object.freeze({}) : /* istanbul ignore next */ {}; // used on prototypes
    
    /**
     * Tests if the specified value is an integer.
     * @function
     * @param {*} value Value to test
     * @returns {boolean} `true` if the value is an integer
     */
    util.isInteger = Number.isInteger || /* istanbul ignore next */ function isInteger(value) {
        return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
    };
    
    /**
     * Tests if the specified value is a string.
     * @param {*} value Value to test
     * @returns {boolean} `true` if the value is a string
     */
    util.isString = function isString(value) {
        return typeof value === "string" || value instanceof String;
    };
    
    /**
     * Tests if the specified value is a non-null object.
     * @param {*} value Value to test
     * @returns {boolean} `true` if the value is a non-null object
     */
    util.isObject = function isObject(value) {
        return value && typeof value === "object";
    };
    
    /**
     * Checks if a property on a message is considered to be present.
     * This is an alias of {@link util.isSet}.
     * @function
     * @param {Object} obj Plain object or message instance
     * @param {string} prop Property name
     * @returns {boolean} `true` if considered to be present, otherwise `false`
     */
    util.isset =
    
    /**
     * Checks if a property on a message is considered to be present.
     * @param {Object} obj Plain object or message instance
     * @param {string} prop Property name
     * @returns {boolean} `true` if considered to be present, otherwise `false`
     */
    util.isSet = function isSet(obj, prop) {
        var value = obj[prop];
        if (value != null && obj.hasOwnProperty(prop)) // eslint-disable-line eqeqeq, no-prototype-builtins
            return typeof value !== "object" || (Array.isArray(value) ? value.length : Object.keys(value).length) > 0;
        return false;
    };
    
    /**
     * Any compatible Buffer instance.
     * This is a minimal stand-alone definition of a Buffer instance. The actual type is that exported by node's typings.
     * @interface Buffer
     * @extends Uint8Array
     */
    
    /**
     * Node's Buffer class if available.
     * @type {Constructor<Buffer>}
     */
    util.Buffer = (function() {
        try {
            var Buffer = util.inquire("buffer").Buffer;
            // refuse to use non-node buffers if not explicitly assigned (perf reasons):
            return Buffer.prototype.utf8Write ? Buffer : /* istanbul ignore next */ null;
        } catch (e) {
            /* istanbul ignore next */
            return null;
        }
    })();
    
    // Internal alias of or polyfull for Buffer.from.
    util._Buffer_from = null;
    
    // Internal alias of or polyfill for Buffer.allocUnsafe.
    util._Buffer_allocUnsafe = null;
    
    /**
     * Creates a new buffer of whatever type supported by the environment.
     * @param {number|number[]} [sizeOrArray=0] Buffer size or number array
     * @returns {Uint8Array|Buffer} Buffer
     */
    util.newBuffer = function newBuffer(sizeOrArray) {
        /* istanbul ignore next */
        return typeof sizeOrArray === "number"
            ? util.Buffer
                ? util._Buffer_allocUnsafe(sizeOrArray)
                : new util.Array(sizeOrArray)
            : util.Buffer
                ? util._Buffer_from(sizeOrArray)
                : typeof Uint8Array === "undefined"
                    ? sizeOrArray
                    : new Uint8Array(sizeOrArray);
    };
    
    /**
     * Array implementation used in the browser. `Uint8Array` if supported, otherwise `Array`.
     * @type {Constructor<Uint8Array>}
     */
    util.Array = typeof Uint8Array !== "undefined" ? Uint8Array /* istanbul ignore next */ : Array;
    
    /**
     * Any compatible Long instance.
     * This is a minimal stand-alone definition of a Long instance. The actual type is that exported by long.js.
     * @interface Long
     * @property {number} low Low bits
     * @property {number} high High bits
     * @property {boolean} unsigned Whether unsigned or not
     */
    
    /**
     * Long.js's Long class if available.
     * @type {Constructor<Long>}
     */
    util.Long = /* istanbul ignore next */ util.global.dcodeIO && /* istanbul ignore next */ util.global.dcodeIO.Long
             || /* istanbul ignore next */ util.global.Long
             || util.inquire("long");
    
    /**
     * Regular expression used to verify 2 bit (`bool`) map keys.
     * @type {RegExp}
     * @const
     */
    util.key2Re = /^true|false|0|1$/;
    
    /**
     * Regular expression used to verify 32 bit (`int32` etc.) map keys.
     * @type {RegExp}
     * @const
     */
    util.key32Re = /^-?(?:0|[1-9][0-9]*)$/;
    
    /**
     * Regular expression used to verify 64 bit (`int64` etc.) map keys.
     * @type {RegExp}
     * @const
     */
    util.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;
    
    /**
     * Converts a number or long to an 8 characters long hash string.
     * @param {Long|number} value Value to convert
     * @returns {string} Hash
     */
    util.longToHash = function longToHash(value) {
        return value
            ? util.LongBits.from(value).toHash()
            : util.LongBits.zeroHash;
    };
    
    /**
     * Converts an 8 characters long hash string to a long or number.
     * @param {string} hash Hash
     * @param {boolean} [unsigned=false] Whether unsigned or not
     * @returns {Long|number} Original value
     */
    util.longFromHash = function longFromHash(hash, unsigned) {
        var bits = util.LongBits.fromHash(hash);
        if (util.Long)
            return util.Long.fromBits(bits.lo, bits.hi, unsigned);
        return bits.toNumber(Boolean(unsigned));
    };
    
    /**
     * Merges the properties of the source object into the destination object.
     * @memberof util
     * @param {Object.<string,*>} dst Destination object
     * @param {Object.<string,*>} src Source object
     * @param {boolean} [ifNotSet=false] Merges only if the key is not already set
     * @returns {Object.<string,*>} Destination object
     */
    function merge(dst, src, ifNotSet) { // used by converters
        for (var keys = Object.keys(src), i = 0; i < keys.length; ++i)
            if (dst[keys[i]] === undefined || !ifNotSet)
                dst[keys[i]] = src[keys[i]];
        return dst;
    }
    
    util.merge = merge;
    
    /**
     * Converts the first character of a string to lower case.
     * @param {string} str String to convert
     * @returns {string} Converted string
     */
    util.lcFirst = function lcFirst(str) {
        return str.charAt(0).toLowerCase() + str.substring(1);
    };
    
    /**
     * Creates a custom error constructor.
     * @memberof util
     * @param {string} name Error name
     * @returns {Constructor<Error>} Custom error constructor
     */
    function newError(name) {
    
        function CustomError(message, properties) {
    
            if (!(this instanceof CustomError))
                return new CustomError(message, properties);
    
            // Error.call(this, message);
            // ^ just returns a new error instance because the ctor can be called as a function
    
            Object.defineProperty(this, "message", { get: function() { return message; } });
    
            /* istanbul ignore next */
            if (Error.captureStackTrace) // node
                Error.captureStackTrace(this, CustomError);
            else
                Object.defineProperty(this, "stack", { value: new Error().stack || "" });
    
            if (properties)
                merge(this, properties);
        }
    
        (CustomError.prototype = Object.create(Error.prototype)).constructor = CustomError;
    
        Object.defineProperty(CustomError.prototype, "name", { get: function() { return name; } });
    
        CustomError.prototype.toString = function toString() {
            return this.name + ": " + this.message;
        };
    
        return CustomError;
    }
    
    util.newError = newError;
    
    /**
     * Constructs a new protocol error.
     * @classdesc Error subclass indicating a protocol specifc error.
     * @memberof util
     * @extends Error
     * @template T extends Message<T>
     * @constructor
     * @param {string} message Error message
     * @param {Object.<string,*>} [properties] Additional properties
     * @example
     * try {
     *     MyMessage.decode(someBuffer); // throws if required fields are missing
     * } catch (e) {
     *     if (e instanceof ProtocolError && e.instance)
     *         console.log("decoded so far: " + JSON.stringify(e.instance));
     * }
     */
    util.ProtocolError = newError("ProtocolError");
    
    /**
     * So far decoded message instance.
     * @name util.ProtocolError#instance
     * @type {Message<T>}
     */
    
    /**
     * A OneOf getter as returned by {@link util.oneOfGetter}.
     * @typedef OneOfGetter
     * @type {function}
     * @returns {string|undefined} Set field name, if any
     */
    
    /**
     * Builds a getter for a oneof's present field name.
     * @param {string[]} fieldNames Field names
     * @returns {OneOfGetter} Unbound getter
     */
    util.oneOfGetter = function getOneOf(fieldNames) {
        var fieldMap = {};
        for (var i = 0; i < fieldNames.length; ++i)
            fieldMap[fieldNames[i]] = 1;
    
        /**
         * @returns {string|undefined} Set field name, if any
         * @this Object
         * @ignore
         */
        return function() { // eslint-disable-line consistent-return
            for (var keys = Object.keys(this), i = keys.length - 1; i > -1; --i)
                if (fieldMap[keys[i]] === 1 && this[keys[i]] !== undefined && this[keys[i]] !== null)
                    return keys[i];
        };
    };
    
    /**
     * A OneOf setter as returned by {@link util.oneOfSetter}.
     * @typedef OneOfSetter
     * @type {function}
     * @param {string|undefined} value Field name
     * @returns {undefined}
     */
    
    /**
     * Builds a setter for a oneof's present field name.
     * @param {string[]} fieldNames Field names
     * @returns {OneOfSetter} Unbound setter
     */
    util.oneOfSetter = function setOneOf(fieldNames) {
    
        /**
         * @param {string} name Field name
         * @returns {undefined}
         * @this Object
         * @ignore
         */
        return function(name) {
            for (var i = 0; i < fieldNames.length; ++i)
                if (fieldNames[i] !== name)
                    delete this[fieldNames[i]];
        };
    };
    
    /**
     * Default conversion options used for {@link Message#toJSON} implementations.
     *
     * These options are close to proto3's JSON mapping with the exception that internal types like Any are handled just like messages. More precisely:
     *
     * - Longs become strings
     * - Enums become string keys
     * - Bytes become base64 encoded strings
     * - (Sub-)Messages become plain objects
     * - Maps become plain objects with all string keys
     * - Repeated fields become arrays
     * - NaN and Infinity for float and double fields become strings
     *
     * @type {IConversionOptions}
     * @see https://developers.google.com/protocol-buffers/docs/proto3?hl=en#json
     */
    util.toJSONOptions = {
        longs: String,
        enums: String,
        bytes: String,
        json: true
    };
    
    // Sets up buffer utility according to the environment (called in index-minimal)
    util._configure = function() {
        var Buffer = util.Buffer;
        /* istanbul ignore if */
        if (!Buffer) {
            util._Buffer_from = util._Buffer_allocUnsafe = null;
            return;
        }
        // because node 4.x buffers are incompatible & immutable
        // see: https://github.com/dcodeIO/protobuf.js/pull/665
        util._Buffer_from = Buffer.from !== Uint8Array.from && Buffer.from ||
            /* istanbul ignore next */
            function Buffer_from(value, encoding) {
                return new Buffer(value, encoding);
            };
        util._Buffer_allocUnsafe = Buffer.allocUnsafe ||
            /* istanbul ignore next */
            function Buffer_allocUnsafe(size) {
                return new Buffer(size);
            };
    };
    
    }).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    },{"./longbits":73,"@protobufjs/aspromise":16,"@protobufjs/base64":17,"@protobufjs/eventemitter":18,"@protobufjs/float":19,"@protobufjs/inquire":20,"@protobufjs/pool":21,"@protobufjs/utf8":22}],75:[function(require,module,exports){
    "use strict";
    module.exports = Writer;
    
    var util      = require("./util/minimal");
    
    var BufferWriter; // cyclic
    
    var LongBits  = util.LongBits,
        base64    = util.base64,
        utf8      = util.utf8;
    
    /**
     * Constructs a new writer operation instance.
     * @classdesc Scheduled writer operation.
     * @constructor
     * @param {function(*, Uint8Array, number)} fn Function to call
     * @param {number} len Value byte length
     * @param {*} val Value to write
     * @ignore
     */
    function Op(fn, len, val) {
    
        /**
         * Function to call.
         * @type {function(Uint8Array, number, *)}
         */
        this.fn = fn;
    
        /**
         * Value byte length.
         * @type {number}
         */
        this.len = len;
    
        /**
         * Next operation.
         * @type {Writer.Op|undefined}
         */
        this.next = undefined;
    
        /**
         * Value to write.
         * @type {*}
         */
        this.val = val; // type varies
    }
    
    /* istanbul ignore next */
    function noop() {} // eslint-disable-line no-empty-function
    
    /**
     * Constructs a new writer state instance.
     * @classdesc Copied writer state.
     * @memberof Writer
     * @constructor
     * @param {Writer} writer Writer to copy state from
     * @ignore
     */
    function State(writer) {
    
        /**
         * Current head.
         * @type {Writer.Op}
         */
        this.head = writer.head;
    
        /**
         * Current tail.
         * @type {Writer.Op}
         */
        this.tail = writer.tail;
    
        /**
         * Current buffer length.
         * @type {number}
         */
        this.len = writer.len;
    
        /**
         * Next state.
         * @type {State|null}
         */
        this.next = writer.states;
    }
    
    /**
     * Constructs a new writer instance.
     * @classdesc Wire format writer using `Uint8Array` if available, otherwise `Array`.
     * @constructor
     */
    function Writer() {
    
        /**
         * Current length.
         * @type {number}
         */
        this.len = 0;
    
        /**
         * Operations head.
         * @type {Object}
         */
        this.head = new Op(noop, 0, 0);
    
        /**
         * Operations tail
         * @type {Object}
         */
        this.tail = this.head;
    
        /**
         * Linked forked states.
         * @type {Object|null}
         */
        this.states = null;
    
        // When a value is written, the writer calculates its byte length and puts it into a linked
        // list of operations to perform when finish() is called. This both allows us to allocate
        // buffers of the exact required size and reduces the amount of work we have to do compared
        // to first calculating over objects and then encoding over objects. In our case, the encoding
        // part is just a linked list walk calling operations with already prepared values.
    }
    
    var create = function create() {
        return util.Buffer
            ? function create_buffer_setup() {
                return (Writer.create = function create_buffer() {
                    return new BufferWriter();
                })();
            }
            /* istanbul ignore next */
            : function create_array() {
                return new Writer();
            };
    };
    
    /**
     * Creates a new writer.
     * @function
     * @returns {BufferWriter|Writer} A {@link BufferWriter} when Buffers are supported, otherwise a {@link Writer}
     */
    Writer.create = create();
    
    /**
     * Allocates a buffer of the specified size.
     * @param {number} size Buffer size
     * @returns {Uint8Array} Buffer
     */
    Writer.alloc = function alloc(size) {
        return new util.Array(size);
    };
    
    // Use Uint8Array buffer pool in the browser, just like node does with buffers
    /* istanbul ignore else */
    if (util.Array !== Array)
        Writer.alloc = util.pool(Writer.alloc, util.Array.prototype.subarray);
    
    /**
     * Pushes a new operation to the queue.
     * @param {function(Uint8Array, number, *)} fn Function to call
     * @param {number} len Value byte length
     * @param {number} val Value to write
     * @returns {Writer} `this`
     * @private
     */
    Writer.prototype._push = function push(fn, len, val) {
        this.tail = this.tail.next = new Op(fn, len, val);
        this.len += len;
        return this;
    };
    
    function writeByte(val, buf, pos) {
        buf[pos] = val & 255;
    }
    
    function writeVarint32(val, buf, pos) {
        while (val > 127) {
            buf[pos++] = val & 127 | 128;
            val >>>= 7;
        }
        buf[pos] = val;
    }
    
    /**
     * Constructs a new varint writer operation instance.
     * @classdesc Scheduled varint writer operation.
     * @extends Op
     * @constructor
     * @param {number} len Value byte length
     * @param {number} val Value to write
     * @ignore
     */
    function VarintOp(len, val) {
        this.len = len;
        this.next = undefined;
        this.val = val;
    }
    
    VarintOp.prototype = Object.create(Op.prototype);
    VarintOp.prototype.fn = writeVarint32;
    
    /**
     * Writes an unsigned 32 bit value as a varint.
     * @param {number} value Value to write
     * @returns {Writer} `this`
     */
    Writer.prototype.uint32 = function write_uint32(value) {
        // here, the call to this.push has been inlined and a varint specific Op subclass is used.
        // uint32 is by far the most frequently used operation and benefits significantly from this.
        this.len += (this.tail = this.tail.next = new VarintOp(
            (value = value >>> 0)
                    < 128       ? 1
            : value < 16384     ? 2
            : value < 2097152   ? 3
            : value < 268435456 ? 4
            :                     5,
        value)).len;
        return this;
    };
    
    /**
     * Writes a signed 32 bit value as a varint.
     * @function
     * @param {number} value Value to write
     * @returns {Writer} `this`
     */
    Writer.prototype.int32 = function write_int32(value) {
        return value < 0
            ? this._push(writeVarint64, 10, LongBits.fromNumber(value)) // 10 bytes per spec
            : this.uint32(value);
    };
    
    /**
     * Writes a 32 bit value as a varint, zig-zag encoded.
     * @param {number} value Value to write
     * @returns {Writer} `this`
     */
    Writer.prototype.sint32 = function write_sint32(value) {
        return this.uint32((value << 1 ^ value >> 31) >>> 0);
    };
    
    function writeVarint64(val, buf, pos) {
        while (val.hi) {
            buf[pos++] = val.lo & 127 | 128;
            val.lo = (val.lo >>> 7 | val.hi << 25) >>> 0;
            val.hi >>>= 7;
        }
        while (val.lo > 127) {
            buf[pos++] = val.lo & 127 | 128;
            val.lo = val.lo >>> 7;
        }
        buf[pos++] = val.lo;
    }
    
    /**
     * Writes an unsigned 64 bit value as a varint.
     * @param {Long|number|string} value Value to write
     * @returns {Writer} `this`
     * @throws {TypeError} If `value` is a string and no long library is present.
     */
    Writer.prototype.uint64 = function write_uint64(value) {
        var bits = LongBits.from(value);
        return this._push(writeVarint64, bits.length(), bits);
    };
    
    /**
     * Writes a signed 64 bit value as a varint.
     * @function
     * @param {Long|number|string} value Value to write
     * @returns {Writer} `this`
     * @throws {TypeError} If `value` is a string and no long library is present.
     */
    Writer.prototype.int64 = Writer.prototype.uint64;
    
    /**
     * Writes a signed 64 bit value as a varint, zig-zag encoded.
     * @param {Long|number|string} value Value to write
     * @returns {Writer} `this`
     * @throws {TypeError} If `value` is a string and no long library is present.
     */
    Writer.prototype.sint64 = function write_sint64(value) {
        var bits = LongBits.from(value).zzEncode();
        return this._push(writeVarint64, bits.length(), bits);
    };
    
    /**
     * Writes a boolish value as a varint.
     * @param {boolean} value Value to write
     * @returns {Writer} `this`
     */
    Writer.prototype.bool = function write_bool(value) {
        return this._push(writeByte, 1, value ? 1 : 0);
    };
    
    function writeFixed32(val, buf, pos) {
        buf[pos    ] =  val         & 255;
        buf[pos + 1] =  val >>> 8   & 255;
        buf[pos + 2] =  val >>> 16  & 255;
        buf[pos + 3] =  val >>> 24;
    }
    
    /**
     * Writes an unsigned 32 bit value as fixed 32 bits.
     * @param {number} value Value to write
     * @returns {Writer} `this`
     */
    Writer.prototype.fixed32 = function write_fixed32(value) {
        return this._push(writeFixed32, 4, value >>> 0);
    };
    
    /**
     * Writes a signed 32 bit value as fixed 32 bits.
     * @function
     * @param {number} value Value to write
     * @returns {Writer} `this`
     */
    Writer.prototype.sfixed32 = Writer.prototype.fixed32;
    
    /**
     * Writes an unsigned 64 bit value as fixed 64 bits.
     * @param {Long|number|string} value Value to write
     * @returns {Writer} `this`
     * @throws {TypeError} If `value` is a string and no long library is present.
     */
    Writer.prototype.fixed64 = function write_fixed64(value) {
        var bits = LongBits.from(value);
        return this._push(writeFixed32, 4, bits.lo)._push(writeFixed32, 4, bits.hi);
    };
    
    /**
     * Writes a signed 64 bit value as fixed 64 bits.
     * @function
     * @param {Long|number|string} value Value to write
     * @returns {Writer} `this`
     * @throws {TypeError} If `value` is a string and no long library is present.
     */
    Writer.prototype.sfixed64 = Writer.prototype.fixed64;
    
    /**
     * Writes a float (32 bit).
     * @function
     * @param {number} value Value to write
     * @returns {Writer} `this`
     */
    Writer.prototype.float = function write_float(value) {
        return this._push(util.float.writeFloatLE, 4, value);
    };
    
    /**
     * Writes a double (64 bit float).
     * @function
     * @param {number} value Value to write
     * @returns {Writer} `this`
     */
    Writer.prototype.double = function write_double(value) {
        return this._push(util.float.writeDoubleLE, 8, value);
    };
    
    var writeBytes = util.Array.prototype.set
        ? function writeBytes_set(val, buf, pos) {
            buf.set(val, pos); // also works for plain array values
        }
        /* istanbul ignore next */
        : function writeBytes_for(val, buf, pos) {
            for (var i = 0; i < val.length; ++i)
                buf[pos + i] = val[i];
        };
    
    /**
     * Writes a sequence of bytes.
     * @param {Uint8Array|string} value Buffer or base64 encoded string to write
     * @returns {Writer} `this`
     */
    Writer.prototype.bytes = function write_bytes(value) {
        var len = value.length >>> 0;
        if (!len)
            return this._push(writeByte, 1, 0);
        if (util.isString(value)) {
            var buf = Writer.alloc(len = base64.length(value));
            base64.decode(value, buf, 0);
            value = buf;
        }
        return this.uint32(len)._push(writeBytes, len, value);
    };
    
    /**
     * Writes a string.
     * @param {string} value Value to write
     * @returns {Writer} `this`
     */
    Writer.prototype.string = function write_string(value) {
        var len = utf8.length(value);
        return len
            ? this.uint32(len)._push(utf8.write, len, value)
            : this._push(writeByte, 1, 0);
    };
    
    /**
     * Forks this writer's state by pushing it to a stack.
     * Calling {@link Writer#reset|reset} or {@link Writer#ldelim|ldelim} resets the writer to the previous state.
     * @returns {Writer} `this`
     */
    Writer.prototype.fork = function fork() {
        this.states = new State(this);
        this.head = this.tail = new Op(noop, 0, 0);
        this.len = 0;
        return this;
    };
    
    /**
     * Resets this instance to the last state.
     * @returns {Writer} `this`
     */
    Writer.prototype.reset = function reset() {
        if (this.states) {
            this.head   = this.states.head;
            this.tail   = this.states.tail;
            this.len    = this.states.len;
            this.states = this.states.next;
        } else {
            this.head = this.tail = new Op(noop, 0, 0);
            this.len  = 0;
        }
        return this;
    };
    
    /**
     * Resets to the last state and appends the fork state's current write length as a varint followed by its operations.
     * @returns {Writer} `this`
     */
    Writer.prototype.ldelim = function ldelim() {
        var head = this.head,
            tail = this.tail,
            len  = this.len;
        this.reset().uint32(len);
        if (len) {
            this.tail.next = head.next; // skip noop
            this.tail = tail;
            this.len += len;
        }
        return this;
    };
    
    /**
     * Finishes the write operation.
     * @returns {Uint8Array} Finished buffer
     */
    Writer.prototype.finish = function finish() {
        var head = this.head.next, // skip noop
            buf  = this.constructor.alloc(this.len),
            pos  = 0;
        while (head) {
            head.fn(head.val, buf, pos);
            pos += head.len;
            head = head.next;
        }
        // this.head = this.tail = null;
        return buf;
    };
    
    Writer._configure = function(BufferWriter_) {
        BufferWriter = BufferWriter_;
        Writer.create = create();
        BufferWriter._configure();
    };
    
    },{"./util/minimal":74}],76:[function(require,module,exports){
    "use strict";
    module.exports = BufferWriter;
    
    // extends Writer
    var Writer = require("./writer");
    (BufferWriter.prototype = Object.create(Writer.prototype)).constructor = BufferWriter;
    
    var util = require("./util/minimal");
    
    /**
     * Constructs a new buffer writer instance.
     * @classdesc Wire format writer using node buffers.
     * @extends Writer
     * @constructor
     */
    function BufferWriter() {
        Writer.call(this);
    }
    
    BufferWriter._configure = function () {
        /**
         * Allocates a buffer of the specified size.
         * @function
         * @param {number} size Buffer size
         * @returns {Buffer} Buffer
         */
        BufferWriter.alloc = util._Buffer_allocUnsafe;
    
        BufferWriter.writeBytesBuffer = util.Buffer && util.Buffer.prototype instanceof Uint8Array && util.Buffer.prototype.set.name === "set"
            ? function writeBytesBuffer_set(val, buf, pos) {
              buf.set(val, pos); // faster than copy (requires node >= 4 where Buffers extend Uint8Array and set is properly inherited)
              // also works for plain array values
            }
            /* istanbul ignore next */
            : function writeBytesBuffer_copy(val, buf, pos) {
              if (val.copy) // Buffer values
                val.copy(buf, pos, 0, val.length);
              else for (var i = 0; i < val.length;) // plain array values
                buf[pos++] = val[i++];
            };
    };
    
    
    /**
     * @override
     */
    BufferWriter.prototype.bytes = function write_bytes_buffer(value) {
        if (util.isString(value))
            value = util._Buffer_from(value, "base64");
        var len = value.length >>> 0;
        this.uint32(len);
        if (len)
            this._push(BufferWriter.writeBytesBuffer, len, value);
        return this;
    };
    
    function writeStringBuffer(val, buf, pos) {
        if (val.length < 40) // plain js is faster for short strings (probably due to redundant assertions)
            util.utf8.write(val, buf, pos);
        else if (buf.utf8Write)
            buf.utf8Write(val, pos);
        else
            buf.write(val, pos);
    }
    
    /**
     * @override
     */
    BufferWriter.prototype.string = function write_string_buffer(value) {
        var len = util.Buffer.byteLength(value);
        this.uint32(len);
        if (len)
            this._push(writeStringBuffer, len, value);
        return this;
    };
    
    
    /**
     * Finishes the write operation.
     * @name BufferWriter#finish
     * @function
     * @returns {Buffer} Finished buffer
     */
    
    BufferWriter._configure();
    
    },{"./util/minimal":74,"./writer":75}],77:[function(require,module,exports){
    var v1 = require('./v1');
    var v4 = require('./v4');
    
    var uuid = v4;
    uuid.v1 = v1;
    uuid.v4 = v4;
    
    module.exports = uuid;
    
    },{"./v1":80,"./v4":81}],78:[function(require,module,exports){
    /**
     * Convert array of 16 byte values to UUID string format of the form:
     * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
     */
    var byteToHex = [];
    for (var i = 0; i < 256; ++i) {
      byteToHex[i] = (i + 0x100).toString(16).substr(1);
    }
    
    function bytesToUuid(buf, offset) {
      var i = offset || 0;
      var bth = byteToHex;
      // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
      return ([
        bth[buf[i++]], bth[buf[i++]],
        bth[buf[i++]], bth[buf[i++]], '-',
        bth[buf[i++]], bth[buf[i++]], '-',
        bth[buf[i++]], bth[buf[i++]], '-',
        bth[buf[i++]], bth[buf[i++]], '-',
        bth[buf[i++]], bth[buf[i++]],
        bth[buf[i++]], bth[buf[i++]],
        bth[buf[i++]], bth[buf[i++]]
      ]).join('');
    }
    
    module.exports = bytesToUuid;
    
    },{}],79:[function(require,module,exports){
    // Unique ID creation requires a high quality random # generator.  In the
    // browser this is a little complicated due to unknown quality of Math.random()
    // and inconsistent support for the `crypto` API.  We do the best we can via
    // feature-detection
    
    // getRandomValues needs to be invoked in a context where "this" is a Crypto
    // implementation. Also, find the complete implementation of crypto on IE11.
    var getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)) ||
                          (typeof(msCrypto) != 'undefined' && typeof window.msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto));
    
    if (getRandomValues) {
      // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
      var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef
    
      module.exports = function whatwgRNG() {
        getRandomValues(rnds8);
        return rnds8;
      };
    } else {
      // Math.random()-based (RNG)
      //
      // If all else fails, use Math.random().  It's fast, but is of unspecified
      // quality.
      var rnds = new Array(16);
    
      module.exports = function mathRNG() {
        for (var i = 0, r; i < 16; i++) {
          if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
          rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
        }
    
        return rnds;
      };
    }
    
    },{}],80:[function(require,module,exports){
    var rng = require('./lib/rng');
    var bytesToUuid = require('./lib/bytesToUuid');
    
    // **`v1()` - Generate time-based UUID**
    //
    // Inspired by https://github.com/LiosK/UUID.js
    // and http://docs.python.org/library/uuid.html
    
    var _nodeId;
    var _clockseq;
    
    // Previous uuid creation time
    var _lastMSecs = 0;
    var _lastNSecs = 0;
    
    // See https://github.com/uuidjs/uuid for API details
    function v1(options, buf, offset) {
      var i = buf && offset || 0;
      var b = buf || [];
    
      options = options || {};
      var node = options.node || _nodeId;
      var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;
    
      // node and clockseq need to be initialized to random values if they're not
      // specified.  We do this lazily to minimize issues related to insufficient
      // system entropy.  See #189
      if (node == null || clockseq == null) {
        var seedBytes = rng();
        if (node == null) {
          // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
          node = _nodeId = [
            seedBytes[0] | 0x01,
            seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]
          ];
        }
        if (clockseq == null) {
          // Per 4.2.2, randomize (14 bit) clockseq
          clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
        }
      }
    
      // UUID timestamps are 100 nano-second units since the Gregorian epoch,
      // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
      // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
      // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
      var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();
    
      // Per 4.2.1.2, use count of uuid's generated during the current clock
      // cycle to simulate higher resolution clock
      var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;
    
      // Time since last uuid creation (in msecs)
      var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;
    
      // Per 4.2.1.2, Bump clockseq on clock regression
      if (dt < 0 && options.clockseq === undefined) {
        clockseq = clockseq + 1 & 0x3fff;
      }
    
      // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
      // time interval
      if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
        nsecs = 0;
      }
    
      // Per 4.2.1.2 Throw error if too many uuids are requested
      if (nsecs >= 10000) {
        throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
      }
    
      _lastMSecs = msecs;
      _lastNSecs = nsecs;
      _clockseq = clockseq;
    
      // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
      msecs += 12219292800000;
    
      // `time_low`
      var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
      b[i++] = tl >>> 24 & 0xff;
      b[i++] = tl >>> 16 & 0xff;
      b[i++] = tl >>> 8 & 0xff;
      b[i++] = tl & 0xff;
    
      // `time_mid`
      var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
      b[i++] = tmh >>> 8 & 0xff;
      b[i++] = tmh & 0xff;
    
      // `time_high_and_version`
      b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
      b[i++] = tmh >>> 16 & 0xff;
    
      // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
      b[i++] = clockseq >>> 8 | 0x80;
    
      // `clock_seq_low`
      b[i++] = clockseq & 0xff;
    
      // `node`
      for (var n = 0; n < 6; ++n) {
        b[i + n] = node[n];
      }
    
      return buf ? buf : bytesToUuid(b);
    }
    
    module.exports = v1;
    
    },{"./lib/bytesToUuid":78,"./lib/rng":79}],81:[function(require,module,exports){
    var rng = require('./lib/rng');
    var bytesToUuid = require('./lib/bytesToUuid');
    
    function v4(options, buf, offset) {
      var i = buf && offset || 0;
    
      if (typeof(options) == 'string') {
        buf = options === 'binary' ? new Array(16) : null;
        options = null;
      }
      options = options || {};
    
      var rnds = options.random || (options.rng || rng)();
    
      // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
      rnds[6] = (rnds[6] & 0x0f) | 0x40;
      rnds[8] = (rnds[8] & 0x3f) | 0x80;
    
      // Copy bytes to buffer, if provided
      if (buf) {
        for (var ii = 0; ii < 16; ++ii) {
          buf[i + ii] = rnds[ii];
        }
      }
    
      return buf || bytesToUuid(rnds);
    }
    
    module.exports = v4;
    
    },{"./lib/bytesToUuid":78,"./lib/rng":79}],82:[function(require,module,exports){
    // shim for using process in browser
    var process = module.exports = {};
    
    // cached from whatever global is present so that test runners that stub it
    // don't break things.  But we need to wrap it in a try catch in case it is
    // wrapped in strict mode code which doesn't define any globals.  It's inside a
    // function because try/catches deoptimize in certain engines.
    
    var cachedSetTimeout;
    var cachedClearTimeout;
    
    function defaultSetTimout() {
        throw new Error('setTimeout has not been defined');
    }
    function defaultClearTimeout () {
        throw new Error('clearTimeout has not been defined');
    }
    (function () {
        try {
            if (typeof setTimeout === 'function') {
                cachedSetTimeout = setTimeout;
            } else {
                cachedSetTimeout = defaultSetTimout;
            }
        } catch (e) {
            cachedSetTimeout = defaultSetTimout;
        }
        try {
            if (typeof clearTimeout === 'function') {
                cachedClearTimeout = clearTimeout;
            } else {
                cachedClearTimeout = defaultClearTimeout;
            }
        } catch (e) {
            cachedClearTimeout = defaultClearTimeout;
        }
    } ())
    function runTimeout(fun) {
        if (cachedSetTimeout === setTimeout) {
            //normal enviroments in sane situations
            return setTimeout(fun, 0);
        }
        // if setTimeout wasn't available but was latter defined
        if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
            cachedSetTimeout = setTimeout;
            return setTimeout(fun, 0);
        }
        try {
            // when when somebody has screwed with setTimeout but no I.E. maddness
            return cachedSetTimeout(fun, 0);
        } catch(e){
            try {
                // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
                return cachedSetTimeout.call(null, fun, 0);
            } catch(e){
                // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
                return cachedSetTimeout.call(this, fun, 0);
            }
        }
    
    
    }
    function runClearTimeout(marker) {
        if (cachedClearTimeout === clearTimeout) {
            //normal enviroments in sane situations
            return clearTimeout(marker);
        }
        // if clearTimeout wasn't available but was latter defined
        if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
            cachedClearTimeout = clearTimeout;
            return clearTimeout(marker);
        }
        try {
            // when when somebody has screwed with setTimeout but no I.E. maddness
            return cachedClearTimeout(marker);
        } catch (e){
            try {
                // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
                return cachedClearTimeout.call(null, marker);
            } catch (e){
                // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
                // Some versions of I.E. have different rules for clearTimeout vs setTimeout
                return cachedClearTimeout.call(this, marker);
            }
        }
    
    
    
    }
    var queue = [];
    var draining = false;
    var currentQueue;
    var queueIndex = -1;
    
    function cleanUpNextTick() {
        if (!draining || !currentQueue) {
            return;
        }
        draining = false;
        if (currentQueue.length) {
            queue = currentQueue.concat(queue);
        } else {
            queueIndex = -1;
        }
        if (queue.length) {
            drainQueue();
        }
    }
    
    function drainQueue() {
        if (draining) {
            return;
        }
        var timeout = runTimeout(cleanUpNextTick);
        draining = true;
    
        var len = queue.length;
        while(len) {
            currentQueue = queue;
            queue = [];
            while (++queueIndex < len) {
                if (currentQueue) {
                    currentQueue[queueIndex].run();
                }
            }
            queueIndex = -1;
            len = queue.length;
        }
        currentQueue = null;
        draining = false;
        runClearTimeout(timeout);
    }
    
    process.nextTick = function (fun) {
        var args = new Array(arguments.length - 1);
        if (arguments.length > 1) {
            for (var i = 1; i < arguments.length; i++) {
                args[i - 1] = arguments[i];
            }
        }
        queue.push(new Item(fun, args));
        if (queue.length === 1 && !draining) {
            runTimeout(drainQueue);
        }
    };
    
    // v8 likes predictible objects
    function Item(fun, array) {
        this.fun = fun;
        this.array = array;
    }
    Item.prototype.run = function () {
        this.fun.apply(null, this.array);
    };
    process.title = 'browser';
    process.browser = true;
    process.env = {};
    process.argv = [];
    process.version = ''; // empty string to avoid regexp issues
    process.versions = {};
    
    function noop() {}
    
    process.on = noop;
    process.addListener = noop;
    process.once = noop;
    process.off = noop;
    process.removeListener = noop;
    process.removeAllListeners = noop;
    process.emit = noop;
    process.prependListener = noop;
    process.prependOnceListener = noop;
    
    process.listeners = function (name) { return [] }
    
    process.binding = function (name) {
        throw new Error('process.binding is not supported');
    };
    
    process.cwd = function () { return '/' };
    process.chdir = function (dir) {
        throw new Error('process.chdir is not supported');
    };
    process.umask = function() { return 0; };
    
    },{}]},{},[15])(15)
    });
    