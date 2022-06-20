export const SELECTED_COLOR = "SELECTED_COLOR";
export const SELECTED_MIN_MAX = "SELECTED_MIN_MAX";
export const SELECTED_SIZEID = "SELECTED_SIZEID";

export const selectedColor = (colorId) => {
    return {
        type: SELECTED_COLOR,
        payload: colorId
    }
}

export const selectedMinMax = (minVal, maxVal) => {
    return {
        type: SELECTED_MIN_MAX,
        payload: {minVal, maxVal}
    }
}

export const selectedSizeId = (sizeId) => {
    return {
        type: SELECTED_SIZEID,
        payload: sizeId
    }
}