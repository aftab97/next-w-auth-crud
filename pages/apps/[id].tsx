import { createCommentForApp, findAppWComments } from "@/hooks/useAwsMutation";
import { Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { SyntheticEvent, useEffect, useState } from "react";

const App = () => {
  const router = useRouter();
  const { id } = router.query;
  const [appWComment, setAppWComments] = useState<any>();
  const [formInput, setFormInput] = useState<String>("");

  const fetchHandler = async () => {
    if (id) {
      setAppWComments(await findAppWComments(id));
      console.log(await findAppWComments(id));
    }
  };
  useEffect(() => {
    fetchHandler();
  }, []);

  const handleFormSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (id) {
      const resp = await createCommentForApp(id, formInput);
    }
  };

  return (
    <div>
      <div>Comments</div>
      <ul>
        {appWComment?.data.getApps?.comments?.items.length > 0 &&
          appWComment.data.getApp.comments.items.map((item: any) => {
            <li>item.content</li>;
          })}
      </ul>

      <br />
      <br />
      <form>
        <TextField
          style={{ width: "200px", margin: "5px" }}
          type="text"
          label="comment"
          variant="outlined"
          onChange={(e) => setFormInput(e.target.value)}
        />
        <br />
        <Button variant="contained" color="primary" onClick={handleFormSubmit}>
          Add Comment
        </Button>
      </form>
    </div>
  );
};

export default App;
