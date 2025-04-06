import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useResumeInfo } from "@/context/ResumeInfoProvider";
import { LoaderCircle } from "lucide-react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import React, { useState } from "react";
import toast from "react-hot-toast";
import API from "@/lib/ServerAPI";

const skillField = {
  name: "",
  rating: 0,
};

const Skills = ({
  enabledNext,
  resumeId,
}: {
  enabledNext: React.Dispatch<boolean>;
  resumeId: string;
}) => {
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useResumeInfo();

  //handling the change in input
  const handleChange = (
    index: number,
    name: string,
    value: number | string
  ) => {
    enabledNext(false);
    const newEntries = resumeInfo?.skills.slice()!;
    if (name == "rating") {
      value = (Number(value) / 5) * 100;
    }
    if (name in newEntries[index]) {
      newEntries[index] = {
        ...newEntries[index],
        [name]: value,
      };
    }
    setResumeInfo((prev: IResumeInfo | undefined) => {
      return { ...prev, skills: newEntries } as IResumeInfo;
    });
  };

  //adding skill
  const AddNewSkills = () => {
    const newEntries = resumeInfo?.skills.slice()!;
    newEntries.push(skillField);
    setResumeInfo((prev: IResumeInfo | undefined) => {
      return { ...prev, skills: newEntries } as IResumeInfo;
    });
  };

  //removing last indexed skill
  const RemoveSkills = async() => {
    let newEntries = resumeInfo?.skills!;
    const removedSkill = newEntries[newEntries.length-1];
    try {
      setLoading(true);
      if (removedSkill.id) {
        console.log(removedSkill.id)
        const skillId = removedSkill.id
        await API.delete(
          "/delete-skills",
          { data: { skillId } },
        );
      }
      newEntries = newEntries.slice(0, -1);
      setResumeInfo((prev: IResumeInfo | undefined) => {
        return { ...prev, skills: newEntries } as IResumeInfo;
      });
      setLoading(false);
      toast.success("Removed");
    } catch (error) {
      setLoading(false);
      toast.error("Please try again");
    }
  
  };

  //saving the changes on db
  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const skillList = resumeInfo?.skills.slice()!;
    const hasEmptyFields = skillList.some((sk) =>
      Object.values(sk).some(
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
        "/update-skills",
        { data: skillList, resumeId },
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
    <form
      onSubmit={onSave}
      className="bg-accent-2/60 p-5 shadow-lg rounded-lg border-t-accent-1 border-t-4 mt-10"
    >
      <h2 className="font-bold text-lg">Skills</h2>
      <p>Add Your top professional key skills</p>

      <div>
        {resumeInfo?.skills.map((item, index) => (
          <div className="flex justify-between mb-2 border rounded-lg p-3 ">
            <div>
              <label className="text-xs">Name</label>
              <Input
                className="w-full"
                defaultValue={item.name}
                onChange={(e) => handleChange(index, "name", e.target.value)}
              />
            </div>
            <Rating
              style={{ maxWidth: 120 }}
              value={(item.rating / 100) * 5}
              onChange={(v: number) => handleChange(index, "rating", v)}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={AddNewSkills}
            className="text-primary bg-primary-1"
          >
            {" "}
            + Add More Skill
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={RemoveSkills}
            className="text-primary bg-accent-1"
          >
            {" "}
            - Remove
          </Button>
        </div>
        <Button type="submit" disabled={loading} className="bg-primary-1 hover:bg-primary-1">
          {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </form>
  );
};

export default Skills;
