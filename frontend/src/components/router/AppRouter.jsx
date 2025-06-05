import React from 'react';
import {createBrowserRouter, Navigate, Route, RouterProvider, Routes} from "react-router-dom";
import DashboardPage from "../../features/finance/pages/Dashboard/DashboardPage.jsx";
import BillPage from "../../features/finance/modules/bill/pages/BillPage.jsx";
import CreateBillPage from "../../features/finance/modules/bill/pages/CreateBillPage.jsx";
import CreateTransactionPage from "../../features/finance/modules/transaction/pages/CreateTransactionPage.jsx";
import BudgetsPage from "../../features/finance/modules/budget/pages/BudgetsPage.jsx";
import CreateBudgetPage from "../../features/finance/modules/budget/pages/CreateBudgetPage.jsx";
import GoalsPage from "../../features/finance/modules/goal/pages/GoalsPage.jsx";
import CreateGoalPage from "../../features/finance/modules/goal/pages/CreateGoalPage.jsx";
import CreateCategoryPage from "../../features/finance/modules/category/pages/CreateCategoryPage.jsx";
import Signup from "../../features/authentication/pages/Signup/Signup.jsx";
import Login from "../../features/authentication/pages/Login/Login.jsx";
import ResetPassword from "../../features/authentication/pages/RessetPassword/ResetPassword.jsx";
import AuthenticationContextProvider from "../../features/authentication/context/AuthenticationContextProvider.jsx";
import VerifyEmail from "../../features/authentication/pages/VerifyEmail/VerifyEmail.jsx";
import AuthenticationLayout from "../../features/authentication/components/UI/Layout/AuthenticationLayout.jsx";
import UserData from "../../features/authentication/pages/UserData/UserData.jsx";
import ApplicationLayout from "../../features/finance/components/layout/ApplicationLayout.jsx";
import TransactionsPage from "../../features/finance/modules/transaction/pages/TransactionsPage.jsx";
import EditBillPage from "../../features/finance/modules/bill/pages/EditBillPage.jsx";
import GoalPage from "../../features/finance/modules/goal/pages/GoalPage.jsx";
import EditGoalPage from "../../features/finance/modules/goal/pages/EditGoalPage.jsx";
import BudgetPage from "../../features/finance/modules/budget/pages/BudgetPage.jsx";
import BudgetHistoryPage from "../../features/finance/modules/budget/pages/BudgetHistoryPage.jsx";
import BudgetPeriodPage from "../../features/finance/modules/budget/pages/BudgetPeriodPage.jsx";
import EditBudgetPage from "../../features/finance/modules/budget/pages/EditBudgetPage.jsx";
import EditTransactionPage from "../../features/finance/modules/transaction/pages/EditTransactionPage.jsx";
import BillsPage from "../../features/finance/modules/bill/pages/BillsPage.jsx";
import CategoriesPage from "../../features/finance/modules/category/pages/CategoriesPage.jsx";
import EditCategoryPage from "../../features/finance/modules/category/pages/EditCategoryPage.jsx";
import SettingPage from "../../features/finance/pages/Setting/SettingPage.jsx";

const router = createBrowserRouter([
    {
        element: <AuthenticationContextProvider/>,
        children: [
            {
                path: "/authentication",
                element: <AuthenticationLayout/>,
                children: [
                    {
                        path: "sign-up",
                        element: <Signup/>,
                    },
                    {
                        path: "login",
                        element: <Login/>,
                    },
                    {
                        path: "request-password-reset",
                        element: <ResetPassword/>,
                    },
                    {
                        path: "verify-email",
                        element: <VerifyEmail/>,
                    },
                    {
                        path: "user-data/:id",
                        element: <UserData/>,
                    },
                ],
            },
            {
                path: "/",
                element: <ApplicationLayout/>,
                children: [
                    {
                        path: "dashboard",
                        element: <DashboardPage/>,
                    },
                    {
                        path: "bills",
                        element: <BillsPage/>,
                    },
                    {
                        path: "bills/:id",
                        element: <BillPage/>,
                    },
                    {
                        path: "bills/create",
                        element: <CreateBillPage/>,
                    },
                    {
                        path: "bills/edit/:id",
                        element: <EditBillPage/>,
                    },
                    {
                        path: "transactions",
                        element: <TransactionsPage/>,
                    },
                    {
                        path: "transactions/create",
                        element: <CreateTransactionPage/>,
                    },
                    {
                        path: "transactions/edit/:id",
                        element: <EditTransactionPage/>,
                    },
                    {
                        path: "budgets",
                        element: <BudgetsPage/>,
                    },
                    {
                        path: "budgets/:id",
                        element: <BudgetPage/>,
                    },
                    {
                        path: "budgets/create",
                        element: <CreateBudgetPage/>,
                    },
                    {
                        path: "budgets/edit/:id",
                        element: <EditBudgetPage/>,
                    },
                    {
                        path: "budgets/:id/history",
                        element: <BudgetHistoryPage/>,
                    },
                    {
                        path: "budgets/:budgetId/period/:periodId",
                        element: <BudgetPeriodPage/>,
                    },
                    {
                        path: "goals",
                        element: <GoalsPage/>,
                    },
                    {
                        path: "goals/:id",
                        element: <GoalPage/>,
                    },
                    {
                        path: "goals/create",
                        element: <CreateGoalPage/>,
                    },
                    {
                        path: "goals/edit/:id",
                        element: <EditGoalPage/>
                    },
                    {
                        path: "categories",
                        element: <CategoriesPage/>,
                    },
                    {
                        path: "categories/create",
                        element: <CreateCategoryPage/>,
                    },
                    {
                        path: "categories/edit/:id",
                        element: <EditCategoryPage/>,
                    },
                    {
                        path: "user-setting/:id",
                        element: <SettingPage/>,
                    }
                ],

            },
            {
                path: "*",
                element: <Navigate to="/dashboard"/>,
            },
        ],
    },
]);

export const AppRouter = () => {
    return <RouterProvider router={router}/>;
};

export default AppRouter;