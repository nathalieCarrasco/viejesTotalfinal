import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout(props){

    return(
        <>
            <Navbar></Navbar>
            { props.children}
            <Footer></Footer>
        </>
    )
}