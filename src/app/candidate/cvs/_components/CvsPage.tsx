"use client";
import cvApiRequest from "@/app/apiRequest/cv";
import { CvListResType } from "@/app/schemaValidations/cv.schema";
import Alert from "@/components/Alert";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CvsPage({
  cvList,
}: {
  cvList: CvListResType["data"] | null;
}) {
  const router = useRouter();
  const handleDelete = async (id: number) => {
    const confirmed = window.confirm("Bạn có chắc chắn muốn xóa CV này không?");
    if (!confirmed) return;
  
    try {
      const result = await cvApiRequest.deleteCv(id);
  
      Alert.success("Thành công!", result.payload.message);
      router.push("/candidate/cvs");
      router.refresh();
    } catch (error) {
      Alert.error("Lỗi", "Lỗi khi xóa hồ sơ");
    }
  };
  

  return (
    <div className="relative flex min-h-screen flex-col bg-gray-50 p-6 sm:p-12">
      <div className="flex justify-center">
        <div className="flex flex-col sm:flex-row gap-0 w-full max-w-screen-xl justify-center">
          {/* Cột danh sách file CV */}
          <div className="bg-white shadow-xl shadow-gray-100 mx-auto w-full max-w-2xl p-6 rounded-md">
            {/* Button thêm CV mới */}
            <div className="mb-6">
              <Link
                href="cvs/add"
                className="bg-purple-900 text-white font-medium px-4 py-2 rounded-md flex-auto gap-1 items-center hover:bg-purple-700 transition-colors"
              >
                + Tạo CV mới
              </Link>
            </div>

            {/* Flex hiển thị danh sách CV */}
            <div className="flex flex-col gap-6">
              {cvList && cvList.length > 0 ? (
                cvList.map((cv, index) => (
                  <div
                    key={index} // Đảm bảo mỗi phần tử có key duy nhất
                    className="w-full bg-white border border-gray-300 shadow-md rounded-md p-4 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex justify-between items-center">
                      <Link href={`cvs/${cv.candidateCvId}`} className="flex-1">
                        <h3 className="font-bold text-lg">{cv.title}</h3>
                      </Link>
                      <div className="flex gap-2">
                        <Link
                          href={`cvs/${cv.candidateCvId}/edit`}
                          className="bg-blue-500 text-white font-medium px-4 py-2 rounded-md hover:bg-blue-400 transition-colors"
                        >
                          Sửa
                        </Link>
                        <button
                          onClick={() => handleDelete(cv.candidateCvId)}
                          className="bg-red-500 text-white font-medium px-4 py-2 rounded-md hover:bg-red-400 transition-colors"
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                    <p className="text-slate-600 text-sm">
                      Kinh nghiệm: {cv.experience} năm
                    </p>
                    <p className="text-slate-600 text-sm">Vị trí: {cv.level}</p>
                  </div>
                ))
              ) : (
                <li className="text-gray-600">Chưa có CV nào được tải lên.</li>
              )}

              {/* Thêm nhiều CV hơn ở đây */}
            </div>
          </div>

          {/* Cột danh sách công việc đề xuất */}
          <div className="bg-white shadow-xl shadow-gray-100 w-full max-w-xl p-6 rounded-md">
            <h2 className="text-lg font-semibold text-purple-800 mb-4">
              Đề xuất công việc
            </h2>
            <ul className="space-y-4">
              <li className="border-b pb-2">
                <Link
                  href="/jobs/frontend-developer"
                  className="hover:underline"
                >
                  <h4 className="font-bold">Frontend Developer</h4>
                  <p className="text-slate-600 text-sm">Remote, US</p>
                  <span className="bg-purple-100 text-purple-700 rounded-full px-3 py-1 text-sm">
                    Part-time
                  </span>
                </Link>
              </li>
              <li className="border-b pb-2">
                <Link href="/jobs/ui-ux-designer" className="hover:underline">
                  <h4 className="font-bold">UI/UX Designer</h4>
                  <p className="text-slate-600 text-sm">Hybrid, Canada</p>
                  <span className="bg-purple-100 text-purple-700 rounded-full px-3 py-1 text-sm">
                    Full-time
                  </span>
                </Link>
              </li>
              <li className="border-b pb-2">
                <Link href="/jobs/devops-engineer" className="hover:underline">
                  <h4 className="font-bold">DevOps Engineer</h4>
                  <p className="text-slate-600 text-sm">On-site, UK</p>
                  <span className="bg-purple-100 text-purple-700 rounded-full px-3 py-1 text-sm">
                    Full-time
                  </span>
                </Link>
              </li>
              <li className="border-b pb-2">
                <Link
                  href="/jobs/backend-developer"
                  className="hover:underline"
                >
                  <h4 className="font-bold">Backend Developer</h4>
                  <p className="text-slate-600 text-sm">Remote, Australia</p>
                  <span className="bg-purple-100 text-purple-700 rounded-full px-3 py-1 text-sm">
                    Full-time
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
