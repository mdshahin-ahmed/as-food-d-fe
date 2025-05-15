import { Icon, Pagination } from "semantic-ui-react";

const CustomPagination = ({
  totalPages = 1,
  activePage = 1,
  onPageChange = () => {},
}) => {
  if (totalPages === 1) return null;

  return (
    <Pagination
      floated="right"
      className="mb-3"
      activePage={activePage}
      boundaryRange={1}
      onPageChange={(e, value) => {
        onPageChange(value.activePage);
      }}
      size="mini"
      siblingRange={1}
      totalPages={totalPages}
      ellipsisItem={null}
      firstItem={
        totalPages > 3
          ? {
              content: <Icon name="angle double left" />,
              icon: true,
            }
          : null
      }
      lastItem={
        totalPages > 3
          ? {
              content: <Icon name="angle double right" />,
              icon: true,
            }
          : null
      }
      prevItem={
        totalPages > 1
          ? {
              content: <Icon name="angle left" />,
              icon: true,
            }
          : null
      }
      nextItem={
        totalPages > 1
          ? {
              content: <Icon name="angle right" />,
              icon: true,
            }
          : null
      }
    />
  );
};

export default CustomPagination;
