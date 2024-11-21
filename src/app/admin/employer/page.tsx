import { cookies } from "next/headers";
import EmployerPage from "../_components/EmployerPage";

export default function Employer() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken")?.value || "";
    return (
      <>
        <EmployerPage
        sessionToken={sessionToken}
        />
      </>
    );
  }
  