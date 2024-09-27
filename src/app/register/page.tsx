import Header from "@/components/Header";
import RegisterForm from "./RegisterForm";
import Footer from "@/components/Footer";

const LoginPage = () => {
    return (
      <div>
        <Header/>
        {/* <h1 className="text-xl font-semibold text-center mt-8">Đăng nhập</h1> */}
        <div className="flex justify-center">
          <RegisterForm />
        </div>
        <Footer/>
      </div>
    );
  };
  
  export default LoginPage;