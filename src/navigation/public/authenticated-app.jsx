import { Route, Routes } from "react-router-dom";
import Home from "../../components/Home/Home";

import AnalyticsPage from "../../components/Analytics/AnalyticsPage";
import Profile from "../../components/Profile/Profile";
import AppLayout from "../../layouts/AppLayout";
import AuthorizedRoute from "../AuthorizedRoute";
import BillListPage from "../../components/Bill/BillListPage";
import UsersList from "../../components/Users/UsersList";
import ManageUser from "../../components/Users/ManageUser";
import MBillPaidList from "../../components/MBillPaid/MBillPaidList";
import MBillPendingList from "../../components/MBillPending/MBillPendingList";
import MBillApprovedList from "../../components/MBillApproved/MBillApprovedList";
import AreaListPage from "../../components/Area/AreaListPage";
import CustomTable from "../../components/Area/CustomTable";

function AuthenticatedApp() {
  return (
    <Routes>
      <Route
        path="/home"
        element={
          <AppLayout>
            <Home />
          </AppLayout>
        }
      />
      <Route
        path="/table"
        element={
          <AuthorizedRoute permissions={["admin"]}>
            <AppLayout>
              <CustomTable />
            </AppLayout>
          </AuthorizedRoute>
        }
      />
      <Route
        path="/manage-bill"
        element={
          <AuthorizedRoute permissions={["admin"]}>
            <AppLayout>
              <BillListPage />
            </AppLayout>
          </AuthorizedRoute>
        }
      />

      <Route
        path="/pending-bills"
        element={
          <AuthorizedRoute permissions={["admin", "employee", "user"]}>
            <AppLayout>
              <MBillPendingList />
            </AppLayout>
          </AuthorizedRoute>
        }
      />
      <Route
        path="/paid-bills"
        element={
          <AuthorizedRoute permissions={["admin"]}>
            <AppLayout>
              <MBillPaidList />
            </AppLayout>
          </AuthorizedRoute>
        }
      />
      <Route
        path="/approved-bills"
        element={
          <AuthorizedRoute permissions={["admin"]}>
            <AppLayout>
              <MBillApprovedList />
            </AppLayout>
          </AuthorizedRoute>
        }
      />

      <Route
        path="/users"
        element={
          <AuthorizedRoute permissions={["admin"]}>
            <AppLayout>
              <UsersList />
            </AppLayout>
          </AuthorizedRoute>
        }
      />
      <Route
        path="/area"
        element={
          <AuthorizedRoute permissions={["admin"]}>
            <AppLayout>
              <AreaListPage />
            </AppLayout>
          </AuthorizedRoute>
        }
      />
      <Route
        path="/users/add"
        element={
          <AuthorizedRoute permissions={["admin"]}>
            <AppLayout>
              <ManageUser />
            </AppLayout>
          </AuthorizedRoute>
        }
      />
      <Route
        path="/users/edit/:id"
        element={
          <AuthorizedRoute permissions={["admin"]}>
            <AppLayout>
              <ManageUser />
            </AppLayout>
          </AuthorizedRoute>
        }
      />

      <Route
        path="/analytics"
        element={
          <AuthorizedRoute permissions={["admin"]}>
            <AppLayout>
              <AnalyticsPage />
            </AppLayout>
          </AuthorizedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <AuthorizedRoute permissions={["admin", "user", "employee"]}>
            <AppLayout>
              <Profile />
            </AppLayout>
          </AuthorizedRoute>
        }
      />

      <Route
        path="*"
        element={
          <AppLayout>
            <Home />
          </AppLayout>
        }
      />
    </Routes>
  );
}

export default AuthenticatedApp;
