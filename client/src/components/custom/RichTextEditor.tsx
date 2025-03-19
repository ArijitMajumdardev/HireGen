import { useResumeInfo } from "@/context/ResumeInfoProvider";
import { useState } from "react";
import {
  BtnBold,
  BtnBulletList,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnStrikeThrough,
  BtnUnderline,
  Editor,
  EditorProvider,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { AIChatSession } from "@/services/AiModel";
import { Brain, LoaderCircle } from "lucide-react";

const PROMPT =
  "position titile: {positionTitle} , Depends on position title give me 3-4 bullet points for my experience in resume (Please do not add experince level and No JSON array) , give me the bullet points in HTML tags inside a div tag with unorderd lists and give me the div as text in object summary as value to key bulletpoints";

export const RichTextEditor = ({
  index,
  defaultValue,
  onRichTextEditorChange,
}: {
  index: number;
  defaultValue: string;
  onRichTextEditorChange: (value: string) => void;
}) => {
  const [value, setValue] = useState(defaultValue);
  const { resumeInfo} = useResumeInfo();
  const [loading, setLoading] = useState(false);

  const GenerateSummeryFromAI = async () => {
    if (!resumeInfo?.experiences[index]?.title) {
      toast("Please Add Position Title");
      return;
    }
    setLoading(true);
    const prompt = PROMPT.replace(
      "{positionTitle}",
      resumeInfo.experiences[index].title
    );

    const result = await AIChatSession.sendMessage(prompt);
    const responseText = await result.response.text();
    const resp = JSON.parse(responseText)
    console.log(resp)
    setValue(resp["bulletpoints"]);
    onRichTextEditorChange(resp["bulletpoints"]);
    setLoading(false);
  };

  return (
    <div>
      <div className="flex justify-between my-2">
        <label className="text-xs">Summery</label>
        <Button
          variant="outline"
          size="sm"
          onClick={GenerateSummeryFromAI}
          disabled={loading}
          className="flex gap-2 border-primary text-primary"
        >
          {loading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <>
              <Brain className="h-4 w-4" /> Generate from AI
            </>
          )}
        </Button>
      </div>
      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            console.log(e.target.value);
            setValue(e.target.value);
            onRichTextEditorChange(e.target.value);
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
};
