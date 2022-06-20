
export const CURRENT_POSITION = "CURRENT_POSITION";

export const currentLangLong = (langi,longi) => {
    console.log('lati and longi',langi,longi);
    return {
        type: CURRENT_POSITION,
        payload: {langi,longi}
    }
}