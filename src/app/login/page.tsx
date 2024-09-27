import Header from "@/components/Header";
import LoginForm from "./LoginForm";
import Footer from "@/components/Footer";

const LoginPage = () => {
    return (
      <div>
        <Header/>
        {/* <h1 className="text-xl font-semibold text-center mt-8">Đăng nhập</h1> */}
        <div className="flex justify-center">
          <LoginForm />
        </div>
        <Footer/>
      </div>
    );
  };
  
  export default LoginPage;