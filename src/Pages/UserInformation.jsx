import React from "react";
import NavigationDawer from "../Components/NavigationDrawer";
import { useForm } from "react-hook-form";
import TabsUserInformation from "../Components/TabsUserInformation";
import Headers from "../Components/Headers";

const UserInformation = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    console.log(formDataObject);
    const form = event.target;
    form.reset();
  };

  const fields = [
    {
      name: "username",
      label: "Username",
      type: "text",
      required: true,
      maxLength: 20,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      required: true,
      maxLength: 50,
    },
  ];

  return (
    <div className="flex flex-row min-h-full">
      <NavigationDawer />
      <div className=" bg-[#F0F0F0] flex flex-grow w-full min-h-screen  flex-col">
      <Headers
          header="User Information"
          showBackButton={true}
          Linkbackto="/UserTracker"
        />
        <TabsUserInformation />
      </div>
    </div>
  );
};

export default UserInformation;
