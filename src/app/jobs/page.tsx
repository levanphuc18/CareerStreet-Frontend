// import { JobProvider } from "../context/JobContext";
import JobsPage from "./_components/JobsPage";

export default async function Jobs() {
  return (
    <div>
        <JobsPage />
    </div>
    // <JobProvider>
    //   <JobsPage />
    // </JobProvider>
  );
}
