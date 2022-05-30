import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import PostModel from "../../models/post";
import { useNavigate } from "react-router";
import "./PostBody.css";

type Props = {
  onConfirm: (config: PostModel) => void;
  onCancel: () => void;
  title: string;
  post?: PostModel | null;
  isEditable?: boolean;
};

const NewPost: React.FC<Props> = (props) => {
  const [form, setForm] = useState<any>({
    title: {
      type: "input",
      title: "Title:",
      value: "",
      valid: false,
      touched: false,
    },
    body: {
      title: "Description:",
      type: "textarea",
      value: "",
      valid: false,
      touched: false,
    },
  });

  const [formValid, setFormValid] = useState<boolean>(false);

  const navigate = useNavigate();

  //UseEffect for Edit page for set form on post details values
  useEffect(() => {
    if (props.post !== null && props.post !== undefined) {
      settingForm();
    }
  }, [props.post]);

  const settingForm = () => {
    const newForm = {
      title: {
        ...form.title,
        value: props.post!.title,
        touched: true,
        valid: true,
      },
      body: {
        ...form.body,
        value: props.post!.body,
        touched: true,
        valid: true,
      },
    };
    
    setForm(newForm);
  };

  //Function for handle Change on form inputs
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newForm = {
      ...form,
      [e.target.name]: {
        ...form[e.target.name],
        value: e.target.value,
        touched: true,
        valid: e.target.value.trim().length > 0,
      },
    };
    setForm(newForm);

    let checkFormValidity = newForm.title.valid && newForm.body.valid;
    setFormValid(checkFormValidity);
  };

  //Function for handle submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data: PostModel = {
      userId: 1,
      title: form.title.value,
      body: form.body.value,
    };

    props.onConfirm(data);
  };

  //Funciton for cancel editing post
  const handleCancel = () => {
    settingForm();
    props.onCancel();
  }

  //converting form object to array for map
  const formArray = [];
  for (let i in form) {
    const element = {
      id: i,
      value: form[i],
    };

    formArray.push(element);
  };

  //Check if the component is used on the change page
  const isEditPage = props.isEditable !== undefined;

  return (
    <div className="form_wrapper">
      <h1>{props.title}</h1>
      <form id="form" onSubmit={handleSubmit}>
        {formArray.map((element) => {
          return (
            <div key={element.id} className="item">
              <label>{element.value.title}</label>
              <textarea
                name={element.id}
                maxLength={element.id === 'title' ? 100 : 300}
                className={
                  form.body.touched && !form.body.valid
                    ? "input invalid"
                    : `input ${element.id === 'body' ? 'textarea' : ''}`
                }
                readOnly={props.isEditable === false}
                value={form[element.id].value}
                onChange={handleChange}
              />
              {!element.value.valid && element.value.touched && (
                <span className="err_msg">This field is required!</span>
              )}
            </div>
          );
        })}
        <div className="btns_container">
          {(props.isEditable === true || !isEditPage)? (
            <div className='btns_wrapper'>
              <Button type="submit" variant="contained" disabled={!formValid}>
                Confirm
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={isEditPage == true ? handleCancel : props.onCancel}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <Button variant="contained" onClick={() => navigate('/home')}>
              Go to home page
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default NewPost;