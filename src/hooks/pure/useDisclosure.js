import { useReducer } from "react";

const actionTypes = {
  toggle: "TOGGLE",
  on: "ON",
  off: "OFF",
  custom: "CUSTOM",
};

function toggleReducer(state, action) {
  switch (action.type) {
    case actionTypes.custom: {
      return { on: action.payload };
    }
    case actionTypes.toggle: {
      return { on: !state.on };
    }
    case actionTypes.on: {
      return { on: true };
    }
    case actionTypes.off: {
      return { on: false };
    }
    default: {
      throw new Error(`Unhandled type: ${action.type}`);
    }
  }
}

function useDisclosure({ reducer = toggleReducer, defaultValue = false } = {}) {
  const [{ on: isOpen }, dispatch] = useReducer(reducer, { on: defaultValue });

  // TODO:  to find whether I should `useCallback` all this functions or not
  const onToggle = () => dispatch({ type: actionTypes.toggle });
  const onOpen = () => dispatch({ type: actionTypes.on });
  const onClose = () => dispatch({ type: actionTypes.off });
  const setCustom = (val) =>
    dispatch({ type: actionTypes.custom, payload: val });

  return { isOpen, onToggle, onClose, onOpen, setCustom };
}

export { useDisclosure };
