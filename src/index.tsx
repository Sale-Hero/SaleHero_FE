import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import {store} from './store';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {Success} from './components/common/Success';
import {NotFoundPage} from './components/common/NotFoundPage';
import {Community} from './components/community/Community';
import {SignIn} from './components/auth/SignIn';
import {HelmetProvider} from 'react-helmet-async';
import {TermsAndConditions} from './components/legal/TermsAndConditions';
import {PrivacyPolicy} from './components/legal/PrivacyPolicy';
import {AdminDashboard} from "./components/admin/AdminDashboard";
import {AdminLayout} from './components/admin/AdminLayout';
import {AdminUserManagement} from "./components/admin/AdminUserManagement";
import {AdminCover} from "./components/admin/AdminCover";
import ProtectedRoute from "./config/ProtectedRoute";
import {AdminCommunityManagement} from "./components/admin/AdminCommunityManagement";
import {AdminNewsletterManagement} from "./components/admin/newsletter/AdminNewsletterManagement";
import Contact from "./components/contactus/Contact";
import {Deals} from "./components/deals/Deals";
import {DealDetail} from 'components/deals/DealDetail';
import {CommunityRegister} from "./components/community/CommunityRegister";
import MainV2 from "./componentsV2/common/MainV2";
import {AdminRawNewsLetterManagement} from "./components/admin/rawnewsletter/AdminRawNewsLetterManagement";
import {CommunityV2} from "./componentsV2/community/CommunityV2";
import {DealsV2} from "./componentsV2/deals/DealsV2";
import {ContactV2} from "./componentsV2/common/ContactV2";
import {CommunityRegisterV2} from "./componentsV2/community/CommunityRegisterV2";
import {DealDetailV2} from "./components/deals/DealDetailV2";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <NotFoundPage/>,
        children: [
            {
                path: "",
                element: <MainV2/>
            },
            //   {
            //   path: "my-page",
            //   element: <MyPage />
            // },
            {
                path: "community",
                element: <CommunityV2/>
            },
            {
                path: "community/register",
                element: <CommunityRegisterV2/>
            },
            // {
            //   path: "community/detail/:id",
            //   element: <CommunityDetail />
            // },
            {
                path: "contact",
                element: <ContactV2/>
            },
            {
                path: "deals",
                element: <DealsV2/>
            },
            {
                path: "deals/:id",
                element: <DealDetailV2/>
            },
            {
                path: "signin",
                element: <SignIn/>
            },
            {
                path: "success",
                element: <Success/>
            },
            {
                path: "terms",
                element: <TermsAndConditions/>
            },
            {
                path: "privacy",
                element: <PrivacyPolicy/>
            },
            {
                path: "admin",
                element:
                    <ProtectedRoute>
                        <AdminLayout/>,
                    </ProtectedRoute>,
                children: [
                    {
                        path: "",
                        element: <AdminDashboard/>
                    },
                    {
                        path: "users",
                        element: <AdminUserManagement/>
                    },
                    {
                        path: "posts",
                        element: <AdminCommunityManagement/>
                    },
                    {
                        path: "raw-newsletter",
                        element: <AdminRawNewsLetterManagement/>
                    },
                    {
                        path: "newsletter",
                        element: <AdminNewsletterManagement/>
                    },
                    {
                        path: "mails",
                        element: <AdminCover/>
                    },
                ]
            }
        ]
    }
]);

const root = createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <HelmetProvider>
            <Provider store={store}>
                <RouterProvider router={router}/>
            </Provider>
        </HelmetProvider>
    </React.StrictMode>
);
