export interface Backup {
    library:             LibraryManga[];
    sourceMangas:        SourceManga[];
    chapterMarkers:      ChapterMarker[];
    backupSchemaVersion: number;
    date:                number;
    tabs:                LibraryTab[];
    version:             string;
    sourceRepositories:  SourceRepository[];
    activeSources:       ActiveSource[];
}

export interface LibraryManga {
    lastRead:       number;
    manga:          MangaInfo;
    lastUpdated:    number;
    dateBookmarked: number;
    libraryTabs:    LibraryTab[];
    updates:        number;
}

export interface SourceManga {
    mangaId:      string;
    id:           string;
    manga:        MangaInfo;
    originalInfo: MangaInfo;
    sourceId:     string;
}

export interface ChapterMarker {
    totalPages: number;
    lastPage:   number;
    chapter?:   ChapterInfo;
    completed:  boolean;
    time:       number;
    hidden:     boolean;
}

export interface MangaInfo {
    id:             string;
    rating?:        number;
    covers:         string[];
    author:         string;
    tags:           MangaInfoTag[];
    desc:           string;
    titles:         string[];
    image:          string;
    additionalInfo: MangaInfoAdditionalInfo;
    hentai:         boolean;
    artist:         string;
    status:         string;
}

export interface ChapterInfo {
    chapNum:      number;
    mangaId:      string;
    volume:       number;
    id:           string;
    time:         number;
    sortingIndex: number;
    sourceId:     string;
    group:        string;
    langCode:     string;
    name:         string;
}

export interface LibraryTab {
    id:        string;
    name:      string;
    sortOrder: number;
}

export interface MangaInfoTag {
    id:    string;
    label: string;
    tags:  {id: string, value: string}[];
}

export interface MangaInfoAdditionalInfo {
    langFlag:  string;
    users:     string;
    langName:  string;
    avgRating: string;
    views:     string;
    follows:   string;
}

export interface SourceRepository {
    name: string;
    url:  string;
}

export interface ActiveSource {
    author:         string;
    desc:           string;
    website:        string;
    id:             string;
    tags:           SourceTag[];
    contentRating:  string;
    websiteBaseURL: string;
    repo:           string;
    version:        string;
    icon:           string;
    name:           string;
}

export interface SourceTag {
    type: string;
    text: string;
}