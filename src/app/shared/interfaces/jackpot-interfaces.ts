export interface LobbyItem {
    name: string;
    weighting: number;
    colour: string;
}

export enum GAME_STATE {
    LOBBY,
    LOADING,
    PLAYING,
    END
}

export enum JP_DEFAULT {
    SPINNER_ITEMS = 150,
    BOX_SIZE = 100,
    BOX_MARGIN = 10
}