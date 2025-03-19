import { RichTextEditor } from "@/components/custom/RichTextEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useResumeInfo } from "@/context/ResumeInfoProvider";
import API from "@/lib/ServerAPI";
import {  LoaderCircle } from "lucide-react";
import React, {  useState } from "react";
import toast from "react-hot-toast";


const formField = {
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  workSummery: "",
};


const Experience = ({
  enabledNext,
  resumeId,
}: {
  enabledNext: React.Dispatch<boolean>;
  resumeId: string;
}) => {
  const { resumeInfo, setResumeInfo } = useResumeInfo();

  const [loading, setLoading] = useState(false);

  //handling the change in all input fields other than RichTextEditor
  const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    enabledNext(false);
    const newEntries = resumeInfo?.experiences.slice()!;
    const { name, value } = event.target;
    if (name in newEntries[index]) {
      newEntries[index] = {
        ...newEntries[index],
        [name]: value,
      };
    }
    console.log(newEntries);
    setResumeInfo((prev: IResumeInfo | undefined) => {
      return { ...prev, experiences: newEntries } as IResumeInfo;
    });
  };

  //handling the change for the RichTextEditor
  const handleRichTextEditor = (
    value: string,
    name: string,
    index: number
  ) => {
    enabledNext(false);
    const newEntries = resumeInfo?.experiences.slice()!;
    if (name in newEntries[index]) {
      newEntries[index] = {
        ...newEntries[index],
        [name]: value,
      };
    }
    setResumeInfo((prev: IResumeInfo | undefined) => {
      return { ...prev, experiences: newEntries } as IResumeInfo;
    });
  };

  // Adding new experience
  const AddNewExperience = () => {
    const newEntries = resumeInfo?.experiences.slice()!;
    newEntries.push(formField);
    setResumeInfo((prev: IResumeInfo | undefined) => {
      return { ...prev, experiences: newEntries } as IResumeInfo;
    });
  };

  // Removing experince from the last index of the array
  const RemoveExperience = () => {
    let newEntries = resumeInfo?.experiences!;
    newEntries = newEntries.slice(0, -1);
    setResumeInfo((prev: IResumeInfo | undefined) => {
      return { ...prev, experiences: newEntries } as IResumeInfo;
    });
  };

  // Saving in the db
  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const experienceList = resumeInfo?.experiences.slice()!;
    const hasEmptyFields = experienceList.some((exp) =>
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
        "/update-experience",
        { data: experienceList, resumeId },
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
    <div>
      <form
        className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10"
        onSubmit={onSave}
      >
        <h2 className="font-bold text-lg">Professional Experience</h2>
        <p>Add Your previous Job experience</p>
        <div>
          {resumeInfo?.experiences.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                <div>
                  <label className="text-xs">Position Title</label>
                  <Input
                    name="title"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.title}
                    required
                  />
                </div>
                <div>
                  <label className="text-xs">Company Name</label>
                  <Input
                    name="companyName"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.companyName}
                    required
                  />
                </div>
                <div>
                  <label className="text-xs">City</label>
                  <Input
                    name="city"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.city}
                    required
                  />
                </div>
                <div>
                  <label className="text-xs">State</label>
                  <Input
                    name="state"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.state}
                    required
                  />
                </div>
                <div>
                  <label className="text-xs">Start Date</label>
                  <Input
                    name="startDate"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.startDate}
                    required
                  />
                </div>
                <div>
                  <label className="text-xs">End Date</label>
                  <Input
                    name="endDate"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.endDate}
                    required
                  />
                </div>
                <div className="col-span-2">
                  {/* Work Summery  */}
                  <RichTextEditor
                    index={index}
                    defaultValue={item?.workSummery || ""}
                    onRichTextEditorChange={(value: string) =>
                      handleRichTextEditor(value, "workSummery", index)
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={AddNewExperience}
              className="text-primary"
              type="button"
            >
              {" "}
              + Add More Experience
            </Button>
            <Button
              variant="outline"
              onClick={RemoveExperience}
              className="text-primary"
              type="button"
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
    </div>
  );
};

export default Experience;
