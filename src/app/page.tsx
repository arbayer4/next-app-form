"use client";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import styles from "./page.module.css";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";

interface FormInputs {
  firstName: string;
  lastName: string;
  email: string;
  interest: string;
  mainInterest: string;
  terms: boolean;
}

const interestDictionary = {
  cars: ["Convertible", "Sedan", "SUV"],
  music: ["Folk", "Jazz", "Punk"],
  sport: ["Baseball", "Basketball", "Football", "Ice Hockey"],
};

export default function Home() {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    resetField,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      interest: "",
      mainInterest: "",
      terms: false,
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    if (step === 1) {
      setStep(2);
    } else {
      setSubmitting(true);
      console.log(data);
    }
  };

  const formatTypeString = (type: string) => {
    console.log(type.charAt(-1));
    return removePlural(type.charAt(0).toUpperCase() + type.slice(1));
  };

  const removePlural = (type: string) => {
    if (type.charAt(type.length - 1) === "s") {
      return type.slice(0, -1);
    }
    return type;
  };

  return (
    <main className={styles.main}>
      <Card sx={{ padding: "24px", minWidth: "450px" }}>
        <div style={{ fontWeight: 700, fontSize: "32px" }}>Create Account</div>
        <form className={styles.mainForm} onSubmit={handleSubmit(onSubmit)}>
          {step === 1 && (
            <>
              <FormGroup style={{ paddingTop: "10px" }}>
                <InputLabel
                  className={`${styles.label} ${styles.noMargin}`}
                  htmlFor="email"
                >
                  Email
                </InputLabel>
                <InputLabel
                  className={styles.labelSecondary}
                  htmlFor="secondary"
                >
                  How we will notify you
                </InputLabel>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: true,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid Email",
                    },
                  }}
                  render={({ field: { ref, ...field } }) => (
                    <TextField
                      {...field}
                      inputRef={ref}
                      id="email"
                      autoComplete="email"
                      variant="outlined"
                      fullWidth
                      size="small"
                      placeholder="i.e. johndoe@email.com"
                      error={!!errors.email}
                    />
                  )}
                />
                <p className={errors.email ? styles.error : styles.hidden}>
                  Invalid Email
                </p>
              </FormGroup>

              <InputLabel className={styles.label} htmlFor="firstName">
                First Name
              </InputLabel>
              <Controller
                name="firstName"
                control={control}
                rules={{ required: true }}
                render={({ field: { ref, ...field } }) => (
                  <TextField
                    {...field}
                    inputRef={ref}
                    id="firstName"
                    autoComplete="fname"
                    variant="outlined"
                    fullWidth
                    size="small"
                    placeholder="John"
                    error={!!errors.firstName}
                  />
                )}
              />
              <p className={errors.firstName ? styles.error : styles.hidden}>
                First name is required
              </p>
              <InputLabel className={styles.label} htmlFor="lastName">
                Last Name
              </InputLabel>
              <Controller
                name="lastName"
                control={control}
                rules={{ required: true }}
                render={({ field: { ref, ...field } }) => (
                  <TextField
                    {...field}
                    inputRef={ref}
                    id="lastName"
                    autoComplete="lname"
                    variant="outlined"
                    fullWidth
                    size="small"
                    placeholder="Smith"
                    error={!!errors.lastName}
                  />
                )}
              />
              <p className={errors.lastName ? styles.error : styles.hidden}>
                Last name is required
              </p>

              <InputLabel className={styles.label} htmlFor="interest">
                Notify me about...
              </InputLabel>
              <Controller
                name="interest"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <RadioGroup row {...field}>
                    <FormControlLabel
                      value="cars"
                      control={<Radio />}
                      label="Cars"
                    />
                    <FormControlLabel
                      value="music"
                      control={<Radio />}
                      label="Music"
                    />
                    <FormControlLabel
                      value="sport"
                      control={<Radio />}
                      label="Sport"
                    />
                  </RadioGroup>
                )}
              />
              <p className={errors.interest ? styles.error : styles.hidden}>
                You need to select an interest
              </p>
              <Button
                variant="contained"
                sx={{ width: "80px", alignSelf: "flex-end" }}
                endIcon={<ArrowForwardIcon />}
                type="submit"
              >
                Next
              </Button>
            </>
          )}
          {step === 2 && (
            <>
              <FormGroup style={{ paddingTop: "10px" }}>
                <InputLabel
                  className={`${styles.label} ${styles.noMargin}`}
                  htmlFor="mainInterest"
                >
                  Favorite {formatTypeString(getValues("interest"))} Type
                </InputLabel>
                <InputLabel
                  className={styles.labelSecondary}
                  htmlFor="secondary"
                >
                  Tell us more about your interest
                </InputLabel>
                <Controller
                  name="mainInterest"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel id="mainInterest">
                        Select a {removePlural(getValues("interest"))} type
                      </InputLabel>
                      <Select
                        id="mainInterest"
                        error={!!errors.mainInterest}
                        // size="small"
                        label={`Select a ${removePlural(
                          getValues("interest")
                        )} type`}
                        {...field}
                      >
                        {interestDictionary[
                          getValues(
                            "interest"
                          ) as keyof typeof interestDictionary
                        ].map((interest, index) => (
                          <MenuItem key={index} value={interest}>
                            {interest}
                          </MenuItem>
                        ))}
                        <MenuItem value="other">Other</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
                <p
                  className={errors.mainInterest ? styles.error : styles.hidden}
                >
                  Field is required
                </p>
              </FormGroup>

              <Controller
                name="terms"
                control={control}
                rules={{ required: true }}
                render={({ field: props }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...props}
                        checked={props.value}
                        onChange={(e) => props.onChange(e.target.checked)}
                      />
                    }
                    label={
                      <div>
                        I accept the{" "}
                        <Link className={styles.link} href="#">
                          Terms and Conditions
                        </Link>
                      </div>
                    }
                  />
                )}
              />
              <p className={errors.terms ? styles.error : styles.hidden}>
                You must accept the terms and conditions
              </p>

              <div className={styles.buttonGroup}>
                <Button
                  disabled={submitting}
                  style={{
                    backgroundColor: "#f1f3f5",
                    border: "1px solid #7e868c",
                    color: submitting ? "#7e868c" : "#11181c",
                  }}
                  size="medium"
                  startIcon={<ArrowBackIcon />}
                  type="button"
                  onClick={() => {
                    resetField("mainInterest");
                    setStep(1);
                  }}
                >
                  Go Back
                </Button>
                <Button
                  disabled={submitting}
                  style={
                    submitting
                      ? {
                          backgroundColor: "#f1f3f5",
                          border: "1px solid #7e868c",
                          color: "#7e868c",
                        }
                      : {}
                  }
                  variant="contained"
                  size="medium"
                  type="submit"
                >
                  {submitting ? "Please Wait..." : "Submit"}
                </Button>
              </div>
            </>
          )}
        </form>
      </Card>
    </main>
  );
}
