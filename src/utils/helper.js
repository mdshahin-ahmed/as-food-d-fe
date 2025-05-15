import _ from "lodash";
import moment from "moment-timezone";
import { useEffect, useState } from "react";

function toDropdownOption(key, value, text) {
  return {
    key,
    value,
    text,
  };
}

// const __DEV__ = process.env.NODE_ENV !== "production";

const capitalize = (str) =>
  `${str?.charAt(0).toUpperCase()}${str.slice(1).toLowerCase()}`;
const cleanUpObject = (jsonObject) => {
  Object.keys(jsonObject).forEach(function (key) {
    const currentObj = jsonObject[key];

    if (_.isNull(currentObj) || currentObj === "") {
      delete jsonObject[key];
    } else if (_.isObject(currentObj)) {
      if (_.isArray(currentObj)) {
        if (!currentObj.length) {
          delete jsonObject[key];
        } else {
          const cleanupArrayObj = [];
          for (const obj of currentObj) {
            if (!_.isNull(obj) || currentObj !== "") {
              const cleanObj = cleanUpObject(obj);
              if (!_.isEmpty(cleanObj)) {
                cleanupArrayObj.push(cleanObj);
              }
            }
          }
          if (!cleanupArrayObj.length) {
            delete jsonObject[key];
          } else {
            jsonObject[key] = cleanupArrayObj;
          }
        }
      } else if (_.isEmpty(Object.keys(jsonObject[key]))) {
        delete jsonObject[key];
      } else {
        jsonObject[key] = cleanUpObject(currentObj);

        if (_.isEmpty(Object.keys(jsonObject[key]))) {
          delete jsonObject[key];
        }
      }
    }
  });

  return jsonObject;
};
function convertDateStructureString(dateStructure, dateSeparator) {
  return dateStructure
    .replace(/(.)\1*/g, (match, group) => {
      return match.length > 1
        ? group.repeat(match.length) + dateSeparator
        : group.repeat(match.length);
    })
    .slice(0, -1);
}
const startCase = (string) => {
  if (!string) {
    return "";
  }
  return string
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .split(" ")
    .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
    .join(" ");
};
const removeDoubleQuotes = (string) => {
  return capitalize(string.replace(/"/g, ""));
};

function makeOptions(data) {
  return data?.map((data) => ({
    value: data,
    text: capitalize(data),
    key: data,
  }));
}

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [value, delay]);

  return debouncedValue;
};

const getFormattedDateTime = (time) => {
  return moment(time).format("DD-MM-YYYY h:mm a");
};

const copyToClipboard = (e, textAreaRef, setCopySuccess) => {
  if (textAreaRef.current) {
    textAreaRef.current.select();

    try {
      document.execCommand("copy");
      setCopySuccess("Copied");
    } catch (err) {
      //
    }
    // This is just personal preference.
    // I prefer to not show the the whole text area selected.
    e.target.focus();
  }
};

export {
  // __DEV__,
  capitalize,
  cleanUpObject,
  convertDateStructureString,
  makeOptions,
  removeDoubleQuotes,
  startCase,
  toDropdownOption,
  useDebounce,
  copyToClipboard,
  getFormattedDateTime,
};
