import logo from "@/assets/logo.png";
import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Button, Grid, GridColumn, Header, Image } from "semantic-ui-react";
import AsToast from "../../components/common/AsToast";
import { AsForm, AsInput } from "../../components/common/form";
import { signUp } from "../../utils/auth/auth-methods";
import { signupSchema } from "../../validations/signin/signin.schema";
const SignUp = () => {
  const navigate = useNavigate();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      hostel: "",
      room: "",
      password: "",
    },
    resolver: joiResolver(signupSchema),
  });
  const { mutate: mutateSignUp, isPending } = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      navigate("/signin");
      AsToast.success(
        <div className="errorToast">
          <AiOutlineCheckCircle /> &nbsp;
          <span>User registration successfully!</span>
        </div>
      );
    },
    onError: () => {},
  });
  const handleSignUp = (data) => {
    mutateSignUp(data);
  };

  return (
    <div className="loginPageWrap d-flex jcc aic">
      <Grid
        textAlign="center"
        style={{ height: "100%" }}
        verticalAlign="middle"
      >
        <Grid.Column className="loginCardWrap signupCard">
          <Image src={logo} />
          <Header as="h3" color="teal" textAlign="center">
            Create an account!
          </Header>
          <AsForm control={control} errors={errors} size="large">
            <AsInput
              maxLength={30}
              name="name"
              required
              label="Name"
              placeholder="Enter your name"
              computer={16}
            />
            <AsInput
              maxLength={100}
              name="email"
              required
              label="Email"
              placeholder="Enter your email"
              computer={16}
            />
            <AsInput
              maxLength={30}
              name="password"
              required
              label="Password"
              placeholder="Enter a password"
              computer={16}
              type="password"
            />
            <AsInput
              name="mobile"
              required
              label="Mobile"
              placeholder="Enter your mobile number"
              computer={16}
            />
            <AsInput
              maxLength={30}
              name="hostel"
              required
              label="Hostel Name"
              placeholder="Enter your hall name"
              computer={16}
            />
            <AsInput
              maxLength={4}
              name="room"
              required
              label="Room Number"
              placeholder="Room number"
              computer={16}
            />

            <GridColumn width={16}>
              <Button
                loading={isPending}
                disabled={isPending}
                onClick={handleSubmit(handleSignUp)}
                primary
                fluid
              >
                Sign Up
              </Button>
            </GridColumn>
            <span className="mx-auto pb-2">
              Already have an account?{" "}
              <span
                className="c-primary c-pointer"
                onClick={() => navigate("/signin")}
              >
                Sign In
              </span>
            </span>
          </AsForm>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default SignUp;
