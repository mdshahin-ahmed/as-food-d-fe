import MonthLineChart from "./MonthLineChart";

const AnalyticsPage = () => {
  return (
    <>
      {/* <div className="d-flex jcsb">
        <h2 className="previewLayout">Analytics</h2>
        <div className="dateRangePicker">
          <AsDateRangePicker className="rest" />
        </div>
      </div>
      <h4 className="ml-4 mb-0 tac">Analytics By Date Range</h4>
      <div style={{ width: "100vw", height: "300px" }}>
        <ExpenseIncomePieChart />
      </div> */}
      <h4 className="mb-0 mt-4 tac">Analytics Of Last 30 Days</h4>
      <div style={{ width: "95vw", height: "550px" }}>
        <MonthLineChart />
      </div>
      {/* <h4 className="ml-4 mb-0 tac">Analytics By Months</h4>
      <div style={{ width: "95vw", height: "550px" }}>
        <YearLineChart />
      </div> */}
    </>
  );
};

export default AnalyticsPage;
