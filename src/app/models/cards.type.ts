export type Cards = {
    has_more: boolean;
    next_page: string;
    data: Card[];
}

type Card = {
    id: string;
    name: string;
    set: string;
    set_name: string;
    uri: string;
    scryfall_uri: string;
    layout: string;
    image_uris?: {
        small: string;
        normal: string;
        large: string;
        png: string;
        art_crop: string;
        border_crop: string;
    };
}