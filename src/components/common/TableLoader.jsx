import {
  Placeholder,
  PlaceholderLine,
  PlaceholderParagraph,
} from "semantic-ui-react";

const TableLoader = ({ columns = 5, rows = 5, lines = 2 }) => {
  return Array.from({ length: rows }, (_, rowIndex) => {
    return (
      <tr key={`row-${rowIndex}`}>
        {Array.from({ length: columns }, (_, columnIndex) => (
          <td key={`cell-${rowIndex}-${columnIndex}`}>
            <Placeholder>
              <PlaceholderParagraph>
                {Array.from({ length: lines }, (_, lineIndex) => (
                  <PlaceholderLine
                    key={`line-${rowIndex}-${columnIndex}-${lineIndex}`}
                  />
                ))}
              </PlaceholderParagraph>
            </Placeholder>
          </td>
        ))}
      </tr>
    );
  });
};

export default TableLoader;
