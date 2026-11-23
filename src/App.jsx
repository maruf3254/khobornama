import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// User Pages
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import Career from './pages/Career'
import Latest from './pages/Latest'
import Popular from './pages/Popular'

import NewsDetail from './pages/NewsDetail'
import Category from './pages/Category'
import Favorites from './pages/Favorites'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'

// Admin Pages
import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/Dashboard'
import NewsList from './pages/admin/NewsList'
import NewsForm from './pages/admin/NewsForm'
import Users from './pages/admin/Users.jsx'

import SubEditorLayout from './components/subeditor/SubEditorLayout'
import SubEditorDashboard from './pages/subeditor/SubEditorDashboard.jsx'
import MyNews from './pages/subeditor/MyNews'
import NewsFormEditor from './pages/subeditor/NewsForm'

function App () {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Admin Routes */}
          <Route path='/admin' element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path='news' element={<NewsList />} />
            <Route path='news/create' element={<NewsForm />} />
            <Route path='news/:id' element={<NewsForm />} />
            <Route path='users' element={<Users />} />
          </Route>

          <Route path='/sub-editor' element={<SubEditorLayout />}>
            <Route index element={<SubEditorDashboard />} />
            <Route path='news' element={<MyNews />} />
            <Route path='news/create' element={<NewsFormEditor />} />
            <Route path='news/edit/:id' element={<NewsFormEditor />} />
          </Route>

          {/* User Routes */}
          <Route
            path='*'
            element={
              <div className='min-h-screen flex flex-col bg-gray-50'>
                <Navbar />
                <main className='flex-1'>
                  <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/contact' element={<Contact />} />
                    <Route path='/terms' element={<Terms />} />
                    <Route path='/privacy' element={<Privacy />} />
                    <Route path='/career' element={<Career />} />
                    <Route path='/popular' element={<Popular />} />
                    <Route path='/latest' element={<Latest />} />

                    <Route path='/news/:slug' element={<NewsDetail />} />
                    <Route path='/category/:category' element={<Category />} />
                    <Route path='/favorites' element={<Favorites />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='*' element={<NotFound />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            }
          />
        </Routes>

        <ToastContainer
          position='top-right'
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
          toastClassName="!bg-[#F8F7F4] !text-[#202020] !border !border-[#34483C]/15 !rounded-lg !shadow-lg !font-['Inter']"
          progressClassName='!bg-[#34483C]'
          bodyClassName='!font-medium !text-sm'
        />
      </Router>
    </AuthProvider>
  )
}

export default App
