import React, { Suspense } from 'react'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link, createBrowserRouter, RouterProvider, useLoaderData, Await, Navigate } from "react-router";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { AuthProvider } from './providers/AuthProvider.tsx';
import { URL } from './constants/constants.ts';
import ProtectedRoute from './hocs/ProtectedRoute.tsx';
import Loader from './components/ui/Loader.tsx';
import '@xyflow/react/dist/style.css';
import './index.css'
import PublicRoute from './hocs/PublicRoute.tsx';
import AccountLayouts from './layouts/AccountLayouts.tsx';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';
import { RegisterForm } from './components/forms/auth/register-form.tsx';
import { LoginForm } from './components/forms/auth/login-form.tsx';
import { PasswordResetForm } from './components/forms/auth/password-reset-form.tsx';
import SetNewPasswordForm from './components/forms/auth/set-new-password-form.tsx';
import ConfirmPage from './pages/auth/confirm.tsx';
import NavigateDashboard from './components/navigate/NavigateDashboard.tsx';
import ReportProject from './pages/report-project.tsx';
import ReleaseProject from './pages/release-project.tsx';
import ComponentsProject from './pages/components-project.tsx';
import SettingsProject from './pages/settings/project/settings-project.tsx';
import ProjectSettingsLayout from './layouts/ProjectSettingsLayout.tsx';
import SettingsSummary from './pages/settings/project/settings-summary.tsx';
import SettingsWorkflow from './pages/settings/project/settings-workflow.tsx';
import EmptySettingsPlaceholder from './components/placeholders/EmptySettingsPlaceholder.tsx';

const MainLayout = React.lazy(() => import('@/layouts/MainLayout.tsx'))
const AuthLayout = React.lazy(() => import('@/layouts/AuthLayout.tsx'))

const Dashboard = React.lazy(() => import('@/pages/dashboard.tsx'))
const AvailableProjects = React.lazy(() => import('@/pages/available-projects.tsx'))
const Profile = React.lazy(() => import('@/pages/settings/profile/profile.tsx'))
const ProfileSecurity = React.lazy(() => import('@/pages/settings/profile/profile-security.tsx'))
const NotFound = React.lazy(() => import('@/pages/not-found.tsx'))
const Project = React.lazy(() => import('@/pages/project.tsx'))


export const client = new ApolloClient({
  cache: new InMemoryCache({
    addTypename: false,
  }),
  link: createUploadLink({ uri: URL, credentials: "include", }),
});
const root = document.getElementById("root")!;
ReactDOM.createRoot(root).render(
  <ApolloProvider client={client}>
    <AuthProvider >
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute />} >
            <Route element={(
              <Suspense fallback={<Loader />}>
                <MainLayout />
              </Suspense>)
            }>
              <Route path='/details' element={(
                <Suspense fallback={<Loader />}>
                  <AvailableProjects />
                </Suspense>)} />

              <Route path='/' index element={(
                <Suspense fallback={<Loader />}>
                  <NavigateDashboard />
                </Suspense>)}>
              </Route>
              <Route path='/project/:id/dashboard' index element={(
                <Suspense fallback={<Loader />}>
                  <Dashboard />
                </Suspense>)}>
              </Route>
              <Route path='/project/:id/reports' index element={(
                <Suspense fallback={<Loader />}>
                  <ReportProject />
                </Suspense>)}>
              </Route>
              <Route path='/project/:id/release' index element={(
                <Suspense fallback={<Loader />}>
                  <ReleaseProject />
                </Suspense>)}>
              </Route>
              <Route path='/project/:id/components' index element={(
                <Suspense fallback={<Loader />}>
                  <ComponentsProject />
                </Suspense>)}>
              </Route>


              <Route path='/available-projects' element={(
                <Suspense fallback={<Loader />}>
                  <AvailableProjects />
                </Suspense>)} />

              <Route path='/project/:id/issues' element={(
                <Suspense fallback={<Loader />}>
                  <Project />
                </Suspense>)} />
              {/* ////////////////////////////////////// */}
              <Route
                path='/project/:id/settings'
                element={(
                  <Suspense fallback={<Loader />} >
                    <ProjectSettingsLayout />
                  </Suspense>)
                }>
                <Route
                  index
                  element={(
                    <EmptySettingsPlaceholder />
                  )
                  }>
                </Route>

                <Route
                  path='summary' element={(
                    <Suspense
                      fallback={<Loader />}>
                      <SettingsSummary />
                    </Suspense>)}>
                </Route>
                <Route
                  path='issue-types' element={(
                    <Suspense
                      fallback={<Loader />}>
                      <SettingsProject />
                    </Suspense>)}>
                </Route>
                <Route
                  index
                  path='details' element={(
                    <Suspense
                      fallback={<Loader />}>
                      <SettingsProject />
                    </Suspense>)}>
                </Route>
                <Route
                  path='workflows' element={(
                    <Suspense
                      fallback={<Loader />}>
                      <SettingsWorkflow />
                    </Suspense>)}>
                </Route>
                <Route
                  index
                  path='permissions' element={(
                    <Suspense
                      fallback={<Loader />}>
                      <SettingsProject />
                    </Suspense>)}>
                </Route>
                <Route
                  path='components' element={(
                    <Suspense
                      fallback={<Loader />}>
                      <SettingsProject />
                    </Suspense>)}>
                </Route>
                <Route
                  path='notifications' element={(
                    <Suspense
                      fallback={<Loader />}>
                      <SettingsProject />
                    </Suspense>)}>
                </Route>
                <Route
                  path='release' element={(
                    <Suspense
                      fallback={<Loader />}>
                      <SettingsProject />
                    </Suspense>)}>
                </Route>
                <Route
                  path='priorities' element={(
                    <Suspense
                      fallback={<Loader />}>
                      <SettingsProject />
                    </Suspense>)}>
                </Route>
                <Route
                  path='role' element={(
                    <Suspense
                      fallback={<Loader />}>
                      <SettingsProject />
                    </Suspense>)}>
                </Route>

              </Route>
              {/* ////////////////////////////////////// */}
              <Route element={(
                <Suspense fallback={<Loader />} >
                  <AccountLayouts />
                </Suspense>)
              }>
                <Route path='/account/:id/profile' element={(
                  <Suspense fallback={<Loader />}>
                    <Profile />
                  </Suspense>)} />
                <Route path='/account/:id/security' element={(
                  <Suspense fallback={<Loader />}>
                    <ProfileSecurity />
                  </Suspense>)}
                />
              </Route>
              {/* ///////////////////////////////////////////// */}
              <Route path='*' element={<NotFound />} />
            </Route>
          </Route>
          <Route element={<AuthLayout />}>
            <Route element={<PublicRoute />}>
              <Route path='/login' element={<LoginForm />} />
              <Route path='/register' element={<RegisterForm />} />
              <Route path='/forgot' element={<PasswordResetForm />} />
              <Route path='/set-new-password' element={<SetNewPasswordForm />} />
              <Route path='/confirm' element={<ConfirmPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </ApolloProvider>
)
