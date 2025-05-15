import { useState } from "react";
import { FiX } from "react-icons/fi";
import { Input } from "semantic-ui-react";

const SearchBar = ({
  onSuccess,
  stillTime,
  placeholder,
  iconPosition,
  fluid,
}) => {
  const [time, setTime] = useState(0);
  const [searchText, setSearchText] = useState("");

  const doSearch = (event) => {
    const { value } = event.target;
    if (time) clearTimeout(time);
    setTime(
      setTimeout(() => {
        onSuccess(value);
      }, stillTime)
    );
  };

  return (
    <Input
      type="search"
      fluid={fluid}
      onChange={(e) => {
        doSearch(e);
        setSearchText(e.target.value);
      }}
      value={searchText}
      iconPosition={iconPosition}
      placeholder={placeholder}
      icon={
        searchText.length > 0 ? (
          <i className="link icon">
            <FiX
              style={{ marginTop: "13px" }}
              onClick={() => {
                setSearchText("");
                onSuccess("");
              }}
            />
          </i>
        ) : (
          "search"
        )
      }
    />
  );
};

export default SearchBar;
