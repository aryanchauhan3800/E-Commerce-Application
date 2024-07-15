import React from 'react'
import Header from "./header";
import Footer from "./footer";
import {Toaster} from "react-hot-toast"
import {Helmet} from "react-helmet";

const Layout = ({children, title, description, keywords, author }) => {
  return (
    <div>
       <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
       </Helmet>
       <Header/>
       <main style={{minHeight:"70vh"}}>
         <Toaster />
         {children}
       </main>
       <Footer/>
    </div>
  );
};

export default Layout;