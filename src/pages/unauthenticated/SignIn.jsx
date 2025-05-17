import logo from "@/assets/logo.png";
import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button, Grid, GridColumn, Image } from "semantic-ui-react";
import { AsForm, AsInput } from "../../components/common/form";
import SendOtpModal from "../../components/ForgotModals/SendOTPModal";
import UpdatePasswordModal from "../../components/ForgotModals/UpdatePasswordModal";
import VerifyOtpModal from "../../components/ForgotModals/VerifyOtpModal";
import { useAuth } from "../../context/app/useAuth";
import { useDisclosure } from "../../hooks/pure/useDisclosure";
import { login } from "../../utils/auth/auth-methods";
import { setToken } from "../../utils/auth/auth-utils";
import { signinSchema } from "../../validations/signin/signin.schema";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      mobile: "",
      password: "",
    },
    resolver: joiResolver(signinSchema),
  });

  const {
    isOpen: isEmailOpen,
    onClose: onEmailClose,
    setCustom: setEmailCustom,
  } = useDisclosure();
  const {
    isOpen: isOtpOpen,
    onClose: onOtpClose,
    setCustom: setOtpCustom,
  } = useDisclosure();
  const {
    isOpen: isPasswordOpen,
    onClose: onPasswordClose,
    setCustom: setPasswordCustom,
  } = useDisclosure();

  const { mutate: mutateLogin, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setToken(data?.token);
      setUser(data?.isUserExists);
      navigate("/home");
    },
    onError: () => {},
  });

  const handleSignin = (data) => {
    mutateLogin(data);
  };

  return (
    <>
      <SendOtpModal
        setEmail={setEmail}
        setOtpCustom={setOtpCustom}
        onClose={onEmailClose}
        open={isEmailOpen}
      />
      <VerifyOtpModal
        setOtp={setOtp}
        onClose={onOtpClose}
        open={isOtpOpen}
        email={email}
        setPasswordCustom={setPasswordCustom}
      />
      <UpdatePasswordModal
        otp={otp}
        setOtp={setOtp}
        email={email}
        setEmail={setEmail}
        onClose={onPasswordClose}
        open={isPasswordOpen}
      />
      <div className="loginPageWrap d-flex jcc aic">
        <Grid
          textAlign="center"
          style={{ height: "100%" }}
          verticalAlign="middle"
        >
          <Grid.Column className="loginCardWrap">
            <Image src={logo} />
            <h3 color="teal" className="mt-3 mb-4">
              Log-in to your account
            </h3>
            <AsForm control={control} errors={errors} size="large">
              <AsInput
                maxLength={100}
                name="mobile"
                required
                label="Mobile"
                placeholder="Enter your mobile"
                computer={16}
              />
              <AsInput
                maxLength={100}
                name="password"
                required
                label="Password"
                placeholder="Enter your password"
                computer={16}
                type="password"
              />
              <span
                onClick={() => setEmailCustom(true)}
                className="forgotPassword"
              >
                Forgot Password?
              </span>
              <GridColumn width={16}>
                <Button
                  className="mb-3"
                  loading={isPending}
                  disabled={isPending}
                  onClick={handleSubmit(handleSignin)}
                  primary
                  fluid
                >
                  Sign In
                </Button>
              </GridColumn>
              {/* <span className="mx-auto pb-2">
              Don&apos;t have an account?{" "}
              <span
                className="c-primary c-pointer"
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Sign Up
              </span>
            </span> */}
            </AsForm>
          </Grid.Column>
        </Grid>
      </div>
    </>
  );
};

export default SignIn;
