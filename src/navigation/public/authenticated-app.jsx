import { Route, Routes } from "react-router-dom";
import Home from "../../components/Home/Home";

import AnalyticsPage from "../../components/Analytics/AnalyticsPage";
import Profile from "../../components/Profile/Profile";
import AppLayout from "../../layouts/AppLayout";
import AuthorizedRoute from "../AuthorizedRoute";
import BillListPage from "../../components/Bill/BillListPage";
import MBillList from "../../components/MBill/MBillList";
import UsersList from "../../components/Users/UsersList";
import ManageUser from "../../components/Users/ManageUser";

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
              <MBillList />
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
          <AuthorizedRoute permissions={["admin", "user", "manager"]}>
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
