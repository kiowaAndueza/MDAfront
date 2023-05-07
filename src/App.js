import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import RegistrationSelection from './components/RegistrationSelection/RegistrationSelection';
import LoginForm from './components/LoginForm/LoginForm';
import ParticularForm from './components/ParticularForm/ParticularForm';
import CompanyForm from './components/CompanyForm/CompanyForm';
import AdoptionForm from './components/AdoptionForm/AdoptionForm';
import PageNotFound from './components/PageNotFound/PageNotFound';
import MyAnnoucements from './components/MyAnnouncement/MyAnnouncements';
import EditAdoptionForm from './components/EditAdoptionForm/EditAdoptionForm';

function App() {
    return (
      <div className='app'>
          <Navbar />
          <main>
            <Router>
                <Routes>
                    <Route path='/' element={ <Navigate to="/home" /> }/>
                    <Route path="*" element={<PageNotFound />} />
                    <Route exact path='/home' element={<Home />}></Route>
                    <Route exact path="/register" element={ <RegistrationSelection /> } />
                    <Route exact path="/register/particular" element={ <ParticularForm/> } />
                    <Route exact path="/register/company" element={ <CompanyForm /> } />
                    <Route exact path="/login" element={ <LoginForm /> } />
                    <Route exact path="/announcement/adoption/createAdoption" element={ <AdoptionForm /> } />
                    <Route exact path="/myAnnouncements" element={ <MyAnnoucements /> } />
                    <Route exact path="/advertisement/adoption/editAnnoucement/:id" element={<EditAdoptionForm />} />

                </Routes>
            </Router>
          </main>
          <Footer />
      </div >
    );
  }  

export default App;
