import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, FileText } from "lucide-react";


export default function Dashboard() {
  

  // Function to start the resume process
  const startResumeProcess = () => {
    
  };

  return (
    <div className="min-h-screen py-10 px-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Create Resume Card */}
        <Card 
          className="flex items-center justify-center cursor-pointer hover:bg-gray-100 transition"
          onClick={startResumeProcess}
        >
          <CardHeader className="flex flex-col items-center">
            <Plus className="w-12 h-12 text-gray-600" />
            <CardTitle>Create New Resume</CardTitle>
          </CardHeader>
        </Card>

        {/* Existing Resume (Example Cards) */}
        <Card>
          <CardHeader className="flex flex-col items-center">
            <FileText className="w-10 h-10 text-blue-500" />
            <CardTitle>Resume 1</CardTitle>
          </CardHeader>
          <CardContent className="text-center text-gray-600">
            Last edited: Jan 30, 2025
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-col items-center">
            <FileText className="w-10 h-10 text-green-500" />
            <CardTitle>Resume 2</CardTitle>
          </CardHeader>
          <CardContent className="text-center text-gray-600">
            Last edited: Feb 2, 2025
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
