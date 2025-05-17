import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { RoleOptions } from "../../constant/common.constant";
import { useClient } from "../../hooks/pure/useClient";
import { updateUserSchema, userSchema } from "../../validations/user.schema";
import AsToast from "../common/AsToast";
import { AsForm, AsInput, AsSelect } from "../common/form";

const ManageUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const client = useClient();
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      address: "",
      area: "",
      role: "",
    },
    resolver: joiResolver(id ? updateUserSchema : userSchema),
  });

  const { data, isFetching } = useQuery({
    queryKey: [`${id}`],
    queryFn: () => client(`user/${id}`), // Fetch function
    enabled: Boolean(id), // Run the query only if the token is available
  });
  useEffect(() => {
    if (data && id) {
      const { name, email, area, address, role, mobile } = data;
      reset({
        name,
        email,
        address,
        area,
        role,
        mobile,
      });
    }
  }, [data]);

  const { mutate: addUserMutate, isPending } = useMutation({
    mutationFn: (data) => client("auth/signup-admin", { data: data }),
    onSuccess: () => {
      navigate("/users");
      AsToast.success(
        <div className="errorToast">
          <AiOutlineCheckCircle /> &nbsp;
          <span>User Registered Successfully!</span>
        </div>
      );
    },
  });
  const { mutate: updateMutateUser, isPending: isUpdatePending } = useMutation({
    mutationFn: (data) => client(`user/${id}`, { data: data, method: "PATCH" }),
    onSuccess: () => {
      AsToast.success(
        <div className="errorToast">
          <AiOutlineCheckCircle /> &nbsp;
          <span>User Updated Successfully!</span>
        </div>
      );
    },
  });

  const handleUserSubmit = (data) => {
    if (id) {
      updateMutateUser(data);
    } else {
      addUserMutate(data);
    }
  };

  return (
    <div className="previewLayout">
      <h2 className="mb-4"> {id ? "Update" : "Create"} User</h2>
      {isFetching ? (
        <span>Loading...</span>
      ) : (
        <>
          <AsForm control={control} errors={errors} size="large">
            <AsInput
              maxLength={30}
              name="name"
              required
              label="Name"
              placeholder="Enter your name"
              computer={8}
            />
            <AsInput
              name="mobile"
              required
              label="Mobile"
              placeholder="Enter your mobile number"
              computer={8}
              maxLength={11}
            />
            <AsInput
              disabled={id}
              maxLength={30}
              name="password"
              required
              label="Password"
              placeholder="Enter a password"
              computer={8}
              type="password"
            />
            <AsInput
              maxLength={100}
              name="email"
              // required
              label="Email"
              placeholder="Enter your email"
              computer={8}
            />
            <AsInput
              maxLength={50}
              name="address"
              // required
              label="Address"
              placeholder="Enter your address"
              computer={8}
            />

            <AsSelect
              name="area"
              required
              label="Area"
              placeholder="Select area"
              options={[
                {
                  key: "karatiya",
                  text: "Karatiya",
                  value: "karatiya",
                },
                {
                  key: "tangail",
                  text: "Tangail",
                  value: "tangail",
                },
              ]}
            />

            <AsSelect
              name="role"
              required
              label="Role"
              placeholder="Select Role"
              options={RoleOptions}
            />
          </AsForm>
          <Button
            className="mt-5"
            loading={isPending || isUpdatePending}
            disabled={isPending || isUpdatePending}
            onClick={handleSubmit(handleUserSubmit)}
            primary
          >
            {id ? "Update" : "Create"}
          </Button>
        </>
      )}
    </div>
  );
};

export default ManageUser;
