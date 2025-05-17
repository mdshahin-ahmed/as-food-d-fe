import nagad from "@/assets/nagad.png";
import bkash from "@/assets/bkash.png";

export const mealNameOptions = [
  {
    key: "menu1",
    text: "মেনু-১",
    value: "মেনু-১",
  },
  {
    key: "menu2",
    text: "মেনু-২",
    value: "মেনু-২",
  },
  {
    key: "menu3",
    text: "মেনু-৩",
    value: "মেনু-৩",
  },
  {
    key: "menu4",
    text: "মেনু-৪",
    value: "মেনু-৪",
  },
];

export const monthsOptions = [
  { key: "jan", value: "January", text: "January" },
  { key: "feb", value: "February", text: "February" },
  { key: "mar", value: "March", text: "March" },
  { key: "apr", value: "April", text: "April" },
  { key: "may", value: "May", text: "May" },
  { key: "jun", value: "June", text: "June" },
  { key: "jul", value: "July", text: "July" },
  { key: "aug", value: "August", text: "August" },
  { key: "sep", value: "September", text: "September" },
  { key: "oct", value: "October", text: "October" },
  { key: "nov", value: "November", text: "November" },
  { key: "dec", value: "December", text: "December" },
];

export const RoleOptions = [
  {
    key: "admin",
    text: "Admin",
    value: "admin",
  },
  {
    key: "employee",
    text: "Employee",
    value: "employee",
  },
  {
    key: "user",
    text: "User",
    value: "user",
  },
];

export const userRoleColor = {
  admin: "green",
  employee: "yellow",
  user: "red",
};

export const adminOrderStatus = [
  {
    key: "delivered",
    text: "Delivered",
    value: "delivered",
  },
  {
    key: "pending",
    text: "Pending",
    value: "pending",
  },
  {
    key: "canceled",
    text: "Canceled",
    value: "canceled",
  },
];
export const cancelRequestStatus = [
  {
    key: "approved",
    text: "Approved",
    value: "approved",
  },
  {
    key: "pending",
    text: "Pending",
    value: "pending",
  },
  {
    key: "canceled",
    text: "Canceled",
    value: "canceled",
  },
];
export const withdrawRequestStatus = [
  {
    key: "approved",
    text: "Approved",
    value: "approved",
  },
  {
    key: "canceled",
    text: "Canceled",
    value: "canceled",
  },
];

export const managerOrderStatus = [
  {
    key: "delivered",
    text: "Delivered",
    value: "delivered",
  },
  {
    key: "pending",
    text: "Pending",
    value: "pending",
  },
];

export const orderTypeOptions = [
  {
    key: "breakfast",
    text: "সকাল",
    value: "সকাল",
  },
  {
    key: "lunch",
    text: "দুপুর",
    value: "দুপুর",
  },
  {
    key: "dinner",
    text: "রাত",
    value: "রাত",
  },
];

export const paymentMethod = [
  {
    key: "nagad",
    text: "Nagad",
    value: "nagad",
    image: { avatar: true, src: nagad },
  },
  {
    key: "bkash",
    text: "B-Kash",
    value: "bkash",
    image: { avatar: true, src: bkash },
  },
];
