import React from "react";

export const hashMap = (eventType => new Map(JSON.parse(eventType)));
export const setHashMap = (hashMap => JSON.stringify(Array.from(hashMap)))

