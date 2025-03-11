import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle } from "lucide-react";
import React, {
  useState,
} from "react";
import { useResumeInfo } from "@/context/ResumeInfoProvider";
import toast from "react-hot-toast";
import API from "@/lib/ServerAPI";

const educationField = {
  universityName: "",
  degree: "",
  major: "",
  startDate: "",
  endDate: "",
  description: "",
};

const Education = ({
  enabledNext,
  resumeId,
}: {
  enabledNext: React.Dispatch<boolean>;
  resumeId: string;
}) => {
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useResumeInfo();


  //handling the change in all input fields other than RichTextEditor
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    enabledNext(false);
    const newEntries = resumeInfo?.education.slice()!;
    const { name, value } = e.target;
    if (name in newEntries[index]) {
      newEntries[index] = {
        ...newEntries[index],
        [name]: value,
      };
    }
    console.log(newEntries);
    setResumeInfo((prev: IResumeInfo | undefined) => {
      return { ...prev, education: newEntries } as IResumeInfo;
    });
  };

  // Adding new education
  const AddNewEducation = () => {
    const newEntries = resumeInfo?.education.slice()!;
    newEntries.push(educationField);
    setResumeInfo((prev: IResumeInfo | undefined) => {
      return { ...prev, education: newEntries } as IResumeInfo;
    });
  };

  // Removing experince from the last index of the array
  const RemoveEducation = () => {
    let newEntries = resumeInfo?.education!;
    newEntries = newEntries.slice(0, -1);
    setResumeInfo((prev: IResumeInfo | undefined) => {
      return { ...prev, education: newEntries } as IResumeInfo;
    });
  };
  
   // Saving in the db
   const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const educationList = resumeInfo?.education.slice()!;
    const hasEmptyFields = educationList.some((exp) =>
      Object.values(exp).some(
        (value) => typeof value === "string" && value.trim() === ""
      )
    );

    if (hasEmptyFields) {
      toast.error("please fill in all fields before saving");
      return;
    }

    try {
      setLoading(true);

      const response = await API.put(
        "/update-education",
        { data: educationList, resumeId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      enabledNext(true);
      setLoading(false);
      toast.success(response.data.message);
    } catch (error: any) {
      console.log("sdd", error?.response.data);
      setLoading(false);
      toast.error(error.response.data);
    }
  };

  return (
    <form className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10" onSubmit={onSave}>
      <h2 className="font-bold text-lg">Education</h2>
      <p>Add Your educational details</p>

      <div>
        {resumeInfo?.education.map((item, index) => (
          <div>
            <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
              <div className="col-span-2">
                <label>University Name</label>
                <Input
                  name="universityName"
                  onChange={(e) => handleChange(e, index)}
                  value={item?.universityName}
                  required
                />
              </div>
              <div>
                <label>Degree</label>
                <Input
                  name="degree"
                  onChange={(e) => handleChange(e, index)}
                  value={item?.degree}
                  required
                />
              </div>
              <div>
                <label>Major</label>
                <Input
                  name="major"
                  onChange={(e) => handleChange(e, index)}
                  value={item?.major}
                  required
                />
              </div>
              <div>
                <label>Start Date</label>
                <Input
                  type="text"
                  name="startDate"
                  onChange={(e) => handleChange(e, index)}
                  value={item?.startDate}
                  required
                />
              </div>
              <div>
                <label>End Date</label>
                <Input
                  type="text"
                  name="endDate"
                  onChange={(e) => handleChange(e, index)}
                  value={item?.endDate}
                  required
                />
              </div>
              <div className="col-span-2">
                <label>Description</label>
                <Textarea
                  className="p-2 h-20 resize-none"
                  name="description"
                  onChange={(e) => handleChange(e, index)}
                  value={item?.description}
                  required
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={AddNewEducation}
            className="text-primary"
          >
            {" "}
            + Add More Education
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={RemoveEducation}
            className="text-primary"
          >
            {" "}
            - Remove
          </Button>
        </div>
        <Button disabled={loading} type="submit">
          {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </form>
  );
};

export default Education;
