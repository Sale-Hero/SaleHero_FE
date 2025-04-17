import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import {store} from './store';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Main from "./components/common/Main";
import {Success} from './components/common/Success';
import {NotFoundPage} from './components/common/NotFoundPage';
import {Community} from './components/community/Community';
import {CommunityForm} from './components/community/CommunityForm';
import {CommunityDetail} from "./components/community/CommunityDetail";
import {SignIn} from './components/auth/SignIn';
import {HelmetProvider} from 'react-helmet-async';
import {TermsAndConditions} from './components/legal/TermsAndConditions';
import {PrivacyPolicy} from './components/legal/PrivacyPolicy';
import {AdminDashboard} from "./features/admin/AdminDashboard";
import {AdminLayout} from './features/admin/AdminLayout';
import {AdminUserManagement} from "./features/admin/AdminUserManagement";
import {AdminCover} from "./features/admin/AdminCover";
import ProtectedRoute from "./config/ProtectedRoute";
import {AdminCommunityManagement} from "./features/admin/AdminCommunityManagement";
import {AdminCodesManagement} from "./features/admin/AdminCodesManagement";
import {AdminNewsletterManagement} from "./features/admin/AdminNewsletterManagement";
import Contact from "./components/contactus/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "",
        element: <Main />
      },
      //   {
      //   path: "my-page",
      //   element: <MyPage />
      // },
      {
        path: "community",
        element: <Community />
      },
      {
        path: "community/post",
        element: <CommunityForm />
      },
      {
        path: "community/detail/:id",
        element: <CommunityDetail />
      },
      {
        path: "contact",
        element: <Contact />
      },
      {
        path: "signin",
        element: <SignIn />
      },
      {
        path: "success",
        element: <Success />
      },
      {
        path: "terms",
        element: <TermsAndConditions />
      },
      {
        path: "privacy",
        element: <PrivacyPolicy />
      },
      {
        path: "admin",
        element:
            <ProtectedRoute>
              <AdminLayout />,
            </ProtectedRoute>,
        children: [
          {
            path: "",
            element: <AdminDashboard />
          },
          {
            path: "users",
            element: <AdminUserManagement />
          },
          {
            path: "posts",
            element: <AdminCommunityManagement />
          },
          {
            path: "newsletter",
            element: <AdminNewsletterManagement />
          },
          {
            path: "mails",
            element: <AdminCover />
          },
          {
            path: "codes",
            element: <AdminCodesManagement />
          }
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
        <RouterProvider router={router} />
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);
