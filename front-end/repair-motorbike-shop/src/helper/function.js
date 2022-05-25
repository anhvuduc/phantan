import React from "react";

export const showPrice = (value) => {
    if (value) {
        return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }
    return 0;
    return value;
};

export const sorterNumber = (a, b, keyCompare) => {
    return a[keyCompare] - b[keyCompare];
};


